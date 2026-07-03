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
 * Usage: node scripts/seo-pipeline.mjs [--no-indexnow] [--no-google]
 *
 * Google is checked with a real headless Chrome via the repo's playwright dep
 * (plain fetch gets an instant CAPTCHA; chrome channel + AutomationControlled
 * off passes). Auto-skips when playwright/Chrome is missing or Google serves
 * /sorry/ — e.g. in the cloud cron, where a datacenter IP would be walled
 * anyway; there Bing/Mojeek carry the trend and Google fills in on local runs.
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
  const organic = links.filter(
    (u) => !/mojeek\.com|bing\.com|microsoft|go\.microsoft|google\.[a-z.]+\/|translate\.goog/.test(u)
  );
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

// ── Google via real browser ──────────────────────────────────────────────────
// Returns { ranks: {kw: rank|null}, indexed: number|null, ok: boolean }.
// ponytail: top-10 only (1 page per keyword) — paginating to 30 triples the
// request volume and is what gets an IP flagged.
async function googleCheck(keywords) {
  let browser;
  try {
    const { chromium } = await import("playwright");
    browser = await chromium.launch({
      headless: true,
      channel: "chrome",
      args: ["--disable-blink-features=AutomationControlled"],
    });
  } catch (e) {
    console.error(`Google check skipped (no playwright/Chrome): ${e.message.split("\n")[0]}`);
    return { ranks: {}, indexed: null, ok: false };
  }
  const out = { ranks: {}, indexed: null, ok: true };
  try {
    const ctx = await browser.newContext({
      locale: "en-IN",
      viewport: { width: 1440, height: 900 },
      userAgent: UA.replace(/Chrome\/[\d.]+/, "Chrome/131.0.0.0"),
    });
    await ctx.addInitScript(() =>
      Object.defineProperty(navigator, "webdriver", { get: () => undefined })
    );
    const page = await ctx.newPage();

    const serp = async (q) => {
      await page.goto(
        `https://www.google.com/search?q=${encodeURIComponent(q)}&hl=en&gl=in`,
        { waitUntil: "domcontentloaded", timeout: 30000 }
      );
      if (page.url().includes("/sorry/")) throw new Error("CAPTCHA");
      return page.$$eval("#search a:has(h3)", (as) => as.map((a) => a.href)).catch(() => []);
    };

    for (const kw of keywords) {
      try {
        out.ranks[kw] = rankFromLinks(await serp(kw));
      } catch (e) {
        if (e.message === "CAPTCHA") {
          console.error(`Google: CAPTCHA wall at "${kw}" — aborting remaining Google checks`);
          out.ok = false;
          break; // don't keep hammering a flagged IP
        }
        console.error(`google "${kw}": ${e.message}`);
        out.ranks[kw] = null;
      }
      await sleep(4000 + Math.random() * 3000);
    }

    if (out.ok) {
      try {
        const links = await serp(`site:${HOST}`);
        out.indexed = links.filter((u) => u.includes(HOST)).length; // first-page count, floor not total
      } catch {
        /* keep null */
      }
    }
  } finally {
    await browser.close();
  }
  return out;
}

async function bingIndexedCount() {
  try {
    const html = await fetchText(`https://www.bing.com/search?q=${encodeURIComponent(`site:${HOST}`)}`);
    const m = html.match(/([\d,]+)\s+results/i);
    if (m) return parseInt(m[1].replace(/,/g, ""), 10);
    return /b_no|no results found for/i.test(html) ? 0 : null;
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
  await sleep(4000); // mojeek 403s ~8 rapid queries; 4s keeps it under the limit
}

const google = process.argv.includes("--no-google")
  ? { ranks: {}, indexed: null, ok: false }
  : await googleCheck(KEYWORDS);
for (const kw of KEYWORDS) ranks[kw].google = google.ranks[kw] ?? null;

const indexed = await bingIndexedCount();

// Real Google Search Console truth (indexed count + impressions); null if creds absent.
const { gscMetrics } = await import("./gsc-metrics.mjs");
const gsc = await gscMetrics();

const run = {
  ts: new Date().toISOString(),
  sitemapUrls: urls.length,
  sitemapHash: indexnow.hash,
  indexnowSubmitted: indexnow.submitted,
  bingIndexed: indexed,
  googleChecked: google.ok,
  googleIndexedFirstPage: google.indexed,
  gsc,
  ranks,
};
history.runs.push(run);
if (history.runs.length > 500) history.runs = history.runs.slice(-500);
writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));

// ── report ───────────────────────────────────────────────────────────────────
console.log(`\n=== SEO pipeline run ${run.ts} ===`);
console.log(`Bing indexed (site:): ${indexed ?? "unknown"}${prev?.bingIndexed != null && indexed != null ? ` (was ${prev.bingIndexed})` : ""}`);
console.log(
  `Google indexed, page 1 of site: ${google.ok ? google.indexed ?? "unknown" : "not checked"}${prev?.googleIndexedFirstPage != null && google.indexed != null ? ` (was ${prev.googleIndexedFirstPage})` : ""}`
);
if (gsc) {
  const pg = prev?.gsc;
  console.log(
    `GSC (real): sitemap indexed ${gsc.sitemapIndexed}/${gsc.sitemapSubmitted}${pg?.sitemapIndexed != null ? ` (was ${pg.sitemapIndexed})` : ""} · 28d impressions ${gsc.impressions}${pg?.impressions != null ? ` (was ${pg.impressions})` : ""} · clicks ${gsc.clicks}${gsc.topQuery ? ` · top "${gsc.topQuery.q}" pos ${gsc.topQuery.pos}` : ""}`
  );
} else {
  console.log(`GSC (real): not checked (no creds in this env)`);
}
console.log(`\n${"keyword".padEnd(42)} ${"Google".padEnd(14)} ${"Bing".padEnd(14)} Mojeek`);
for (const kw of KEYWORDS) {
  const p = prev?.ranks?.[kw];
  const c = ranks[kw];
  const g = google.ok ? fmt(c.google) + delta(p?.google, c.google) : "n/a";
  console.log(
    `${kw.padEnd(42)} ${g.padEnd(14)} ${(fmt(c.bing) + delta(p?.bing, c.bing)).padEnd(14)} ${fmt(c.mojeek)}${delta(p?.mojeek, c.mojeek)}`
  );
}
const ranked = KEYWORDS.filter(
  (k) => ranks[k].bing != null || ranks[k].mojeek != null || ranks[k].google != null
).length;
console.log(`\nRanked in top ${MAX_RANK}: ${ranked}/${KEYWORDS.length} keywords · history: ${history.runs.length} runs → ${HISTORY_FILE}`);
