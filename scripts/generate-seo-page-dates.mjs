#!/usr/bin/env node
/**
 * scripts/generate-seo-page-dates.mjs — git-derived lastModified manifest.
 *
 * Scans src/app/<slug>/page.tsx (single-slug marketing/SEO pages) plus the
 * root src/app/page.tsx, asks git for the commits that touched each file,
 * and writes scripts/seo-page-dates.json as
 * { "/<slug>": { "published": "YYYY-MM-DD", "modified": "YYYY-MM-DD" } }.
 *
 * - published: the oldest commit that touched the file — the real creation date.
 * - modified:  the newest non-bulk commit (bulk = mechanical sweeps touching
 *   >BULK_FILE_THRESHOLD files), falling back to the newest commit when every
 *   commit was bulk. Bulk restyles genuinely modified the files, so this is
 *   an honest lastModified.
 *
 * src/app/sitemap.ts imports this manifest so the sitemap reports real
 * content-commit dates instead of `new Date()` on every request — a fake
 * freshness signal search engines learn to distrust.
 *
 * Excluded: app routes (dashboard, admin, api, learn, login, signup,
 * onboarding, settings, checkout*, reset-password) and any page.tsx that is
 * a client component ("use client") — those are app surfaces, not content.
 *
 * Usage: node scripts/generate-seo-page-dates.mjs
 * Run after adding or meaningfully editing SEO pages; commit the JSON.
 */

import { execSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const APP_DIR = join(ROOT, "src", "app");
const OUT_FILE = join(ROOT, "scripts", "seo-page-dates.json");

const EXCLUDED_DIRS = new Set([
  "dashboard",
  "admin",
  "api",
  "learn",
  "login",
  "signup",
  "onboarding",
  "settings",
  "reset-password",
]);
const EXCLUDED_PREFIXES = ["checkout"];

const USE_CLIENT_RE = /^\s*["']use client["'];?\s*$/m;

function isClientComponent(pagePath) {
  // The directive must be at the top of the file; checking the first 500
  // chars avoids false positives from "use client" in page body copy.
  return USE_CLIENT_RE.test(readFileSync(pagePath, "utf8").slice(0, 500));
}

// Commits touching more than this many files are treated as bulk/mechanical
// (formatting passes, a11y sweeps) and skipped as freshness signals.
const BULK_FILE_THRESHOLD = 50;

// hash -> number of files the commit touched. Bulk commits repeat across
// hundreds of pages, so caching turns O(pages × commits) git shows into
// O(unique commits).
const commitFileCounts = new Map();

function commitFileCount(hash) {
  const cached = commitFileCounts.get(hash);
  if (cached !== undefined) return cached;
  const out = execSync(`git show --name-only --format= ${hash}`, {
    cwd: ROOT,
    encoding: "utf8",
    maxBuffer: 16 * 1024 * 1024,
  });
  const count = out.split("\n").filter(Boolean).length;
  commitFileCounts.set(hash, count);
  return count;
}

function commitDates(relPath) {
  const log = execSync(`git log --format="%H %aI" -- "${relPath}"`, {
    cwd: ROOT,
    encoding: "utf8",
    maxBuffer: 16 * 1024 * 1024,
  }).trim();
  if (!log) return null; // never committed

  const commits = log.split("\n").map((line) => {
    const [hash, iso] = line.split(" ");
    return { hash, date: iso.slice(0, 10) }; // YYYY-MM-DD
  });

  // Log is newest-first, so the last entry is the oldest commit — the real
  // creation date.
  const published = commits[commits.length - 1].date;

  // Newest-first: first commit that isn't a bulk/mechanical sweep wins.
  // Falls back to the newest commit date when every commit was bulk (e.g.
  // page created in a bulk commit).
  let modified = commits[0].date;
  for (const { hash, date } of commits) {
    if (commitFileCount(hash) <= BULK_FILE_THRESHOLD) {
      modified = date;
      break;
    }
  }

  return { published, modified };
}

function collectRoutes() {
  const routes = new Map();

  // Root route "/" from src/app/page.tsx.
  if (existsSync(join(APP_DIR, "page.tsx"))) {
    routes.set("/", "src/app/page.tsx");
  }

  for (const entry of readdirSync(APP_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const slug = entry.name;
    if (EXCLUDED_DIRS.has(slug)) continue;
    if (EXCLUDED_PREFIXES.some((p) => slug.startsWith(p))) continue;

    const pagePath = join(APP_DIR, slug, "page.tsx");
    if (!existsSync(pagePath)) continue;
    if (isClientComponent(pagePath)) continue;

    routes.set(`/${slug}`, `src/app/${slug}/page.tsx`);
  }

  return routes;
}

function main() {
  const routes = collectRoutes();
  const dates = {};
  let uncommitted = 0;

  for (const [route, relPath] of routes) {
    const entry = commitDates(relPath);
    if (!entry) {
      uncommitted += 1;
      continue; // sitemap.ts falls back to `now` for missing keys
    }
    dates[route] = entry;
  }

  const sorted = Object.fromEntries(
    Object.entries(dates).sort(([a], [b]) => a.localeCompare(b)),
  );
  writeFileSync(OUT_FILE, `${JSON.stringify(sorted, null, 2)}\n`);

  const skipped = uncommitted ? ` (${uncommitted} uncommitted skipped)` : "";
  console.log(
    `Wrote ${Object.keys(sorted).length} route dates to scripts/seo-page-dates.json${skipped}`,
  );
}

main();
