#!/usr/bin/env node
/**
 * scripts/seo-pipeline.mjs — SEO automation pipeline, one run = one cycle.
 *
 *   1. Fetch live sitemap (no DB needed).
 *   2. Submit URLs to IndexNow — only when the URL set changed since last run
 *      (resubmitting 1400 unchanged URLs hourly would get the key throttled).
 *   3. Rank-check target keywords on DuckDuckGo + Bing, find our position.
 *   4. Append to scripts/seo-rank-history.json and print trend vs last run.
 *
 * Usage: node scripts/seo-pipeline.mjs [--no-indexnow]
 * ponytail: Bing/Mojeek rank as proxy — Google + DDG block plain-fetch scraping
 * (DDG returns 202 challenges); plug in a SERP API (Serper/DataForSEO) key
 * here if Google-exact rank ever matters.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://learnanything.pro";
const HOST = "learnanything.pro";
const INDEXNOW_KEY = "6c4abe7e9345accd405ac3549b82cd1d"; // public by protocol design (served at /<key>.txt)
const HISTORY_FILE = join(ROOT, "scripts", "seo-rank-history.json");
const MAX_RANK = 30; // how deep we look before calling it unranked

const KEYWORDS = [
  "product manager interview questions",
  "pm interview prep",
  "product sense interview",
  "how to become a product manager",
  "product manager salary india",
  "flipkart pm interview",
  "razorpay pm interview",
  "duolingo for product managers",
];

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchText(url, opts = {}) {
  const res = await fetch(url, {
    headers: { "User-Agent": UA, "Accept-Language": "en-US,en;q=0.9" },
    ...opts,
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
}

// ── 1. Sitemap ───────────────────────────────────────────────────────────────
async function getSitemapUrls() {
  const xml = await fetchText(`${SITE}/sitemap.xml`);
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

// ── 2. IndexNow ──────────────────────────────────────────────────────────────
async function submitIndexNow(urls, prevHash) {
  const hash = createHash("sha256").update(urls.join("\n")).digest("hex");
  if (hash === prevHash) {
    console.log(`IndexNow: URL set unchanged (${urls.length} urls) — skipping submit`);
    return { hash, submitted: 0 };
  }
  let submitted = 0;
  for (let i = 0; i < urls.length; i += 500) {
    const batch = urls.slice(i, i + 500);
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE}/${INDEXNOW_KEY}.txt`,
        urlList: batch,
      }),
    });
    // 200/202 = accepted
    if (res.status === 200 || res.status === 202) submitted += batch.length;
    else console.error(`IndexNow batch ${i / 500 + 1}: HTTP ${res.status}`);
    await sleep(1000);
  }
  console.log(`IndexNow: submitted ${submitted}/${urls.length} urls`);
  return { hash, submitted };
}

// ── 3. Rank checks ───────────────────────────────────────────────────────────
function rankFromLinks(links) {
  const organic = links.filter((u) => !/mojeek\.com|bing\.com|microsoft|go\.microsoft/.test(u));
  const idx = organic.findIndex((u) => u.includes(HOST));
  return idx === -1 || idx >= MAX_RANK ? null : idx + 1;
}

// Bing wraps organic results in /ck/a?...&u=a1<base64url-of-real-url>
function decodeBingUrl(href) {
  const m = href.replace(/&amp;/g, "&").match(/[?&]u=a1([^&]+)/);
  if (!m) return href;
  try {
    return Buffer.from(m[1].replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8");
  } catch {
    return href;
  }
}

async function bingRank(keyword) {
  const html = await fetchText(`https://www.bing.com/search?q=${encodeURIComponent(keyword)}&count=30`);
  const links = [...html.matchAll(/<li class="b_algo"[\s\S]*?<a[^>]*href="([^"]+)"/g)].map((m) =>
    decodeBingUrl(m[1])
  );
  return rankFromLinks(links);
}

async function mojeekRank(keyword) {
  const html = await fetchText(`https://www.mojeek.com/search?q=${encodeURIComponent(keyword)}`);
  const links = [...html.matchAll(/<h2><a[^>]+href="(http[^"]+)"/g)].map((m) => m[1]);
  return rankFromLinks(links);
}

async function bingIndexedCount() {
  try {
    const html = await fetchText(`https://www.bing.com/search?q=${encodeURIComponent(`site:${HOST}`)}`);
    const m = html.match(/([\d,]+)\s+results/i);
    return m ? parseInt(m[1].replace(/,/g, ""), 10) : null;
  } catch {
    return null;
  }
}

// ── 4. History + trend ───────────────────────────────────────────────────────
function loadHistory() {
  return existsSync(HISTORY_FILE) ? JSON.parse(readFileSync(HISTORY_FILE, "utf8")) : { runs: [] };
}

function fmt(rank) {
  return rank === null || rank === undefined ? "—" : `#${rank}`;
}

function delta(prev, cur) {
  if (prev == null && cur == null) return "";
  if (prev == null) return " (NEW ✅)";
  if (cur == null) return " (dropped ❌)";
  if (cur < prev) return ` (▲${prev - cur})`;
  if (cur > prev) return ` (▼${cur - prev})`;
  return " (=)";
}

// ── main ─────────────────────────────────────────────────────────────────────
const history = loadHistory();
const prev = history.runs.at(-1);

const urls = await getSitemapUrls();
console.log(`Sitemap: ${urls.length} urls`);

let indexnow = { hash: prev?.sitemapHash ?? null, submitted: 0 };
if (!process.argv.includes("--no-indexnow")) {
  try {
    indexnow = await submitIndexNow(urls, prev?.sitemapHash);
  } catch (e) {
    console.error(`IndexNow failed: ${e.message}`);
  }
}

const ranks = {};
for (const kw of KEYWORDS) {
  const [bing, mojeek] = [
    await bingRank(kw).catch((e) => (console.error(`bing "${kw}": ${e.message}`), null)),
    await mojeekRank(kw).catch((e) => (console.error(`mojeek "${kw}": ${e.message}`), null)),
  ];
  ranks[kw] = { bing, mojeek };
  await sleep(1500); // ponytail: fixed delay; add jitter/backoff if engines start 429ing
}

const indexed = await bingIndexedCount();

const run = {
  ts: new Date().toISOString(),
  sitemapUrls: urls.length,
  sitemapHash: indexnow.hash,
  indexnowSubmitted: indexnow.submitted,
  bingIndexed: indexed,
  ranks,
};
history.runs.push(run);
if (history.runs.length > 500) history.runs = history.runs.slice(-500);
writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));

// ── report ───────────────────────────────────────────────────────────────────
console.log(`\n=== SEO pipeline run ${run.ts} ===`);
console.log(`Bing indexed (site:): ${indexed ?? "unknown"}${prev?.bingIndexed != null && indexed != null ? ` (was ${prev.bingIndexed})` : ""}`);
console.log(`\n${"keyword".padEnd(42)} ${"Bing".padEnd(14)} Mojeek`);
for (const kw of KEYWORDS) {
  const p = prev?.ranks?.[kw];
  const c = ranks[kw];
  console.log(
    `${kw.padEnd(42)} ${(fmt(c.bing) + delta(p?.bing, c.bing)).padEnd(14)} ${fmt(c.mojeek)}${delta(p?.mojeek, c.mojeek)}`
  );
}
const ranked = KEYWORDS.filter((k) => ranks[k].bing != null || ranks[k].mojeek != null).length;
console.log(`\nRanked in top ${MAX_RANK}: ${ranked}/${KEYWORDS.length} keywords · history: ${history.runs.length} runs → ${HISTORY_FILE}`);
