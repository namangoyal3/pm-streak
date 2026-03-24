/**
 * Scrapes PM jobs from Himalayas.app public API and stores them in the DB.
 * Safe to re-run — deduplicates by applyUrl.
 *
 * Usage:
 *   npx tsx scripts/scrape-pm-jobs.ts           # live run
 *   npx tsx scripts/scrape-pm-jobs.ts --dry-run # preview only
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { PrismaClient } from "@prisma/client";

for (const p of [".env.local", ".env", ".env.production"].map((f) => resolve(process.cwd(), f))) {
  if (!existsSync(p)) continue;
  const text = readFileSync(p, "utf8");
  for (const line of text.split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq === -1) continue;
    const k = t.slice(0, eq).trim();
    let v = t.slice(eq + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    if (process.env[k] === undefined) process.env[k] = v;
  }
}

const prisma = new PrismaClient();
const dryRun = process.argv.includes("--dry-run");

interface HimalayasJob {
  guid?: string;
  title: string;
  companyName: string;
  applicationLink: string;
  excerpt?: string | null;
  description?: string | null;
  categories?: string[];
  seniority?: string[];
  pubDate?: string | null;
  locationRestrictions?: string[];
}

async function fetchHimalayasJobs(): Promise<HimalayasJob[]> {
  const queries = ["product manager", "product management", "senior PM"];
  const seen = new Set<string>();
  const all: HimalayasJob[] = [];

  for (const q of queries) {
    const url = `https://himalayas.app/jobs/api?q=${encodeURIComponent(q)}&limit=30`;
    console.log(`  Fetching: ${url}`);
    try {
      const res = await fetch(url, { headers: { "User-Agent": "pm-streak-job-scraper/1.0" } });
      if (!res.ok) {
        console.warn(`  ⚠ Himalayas API returned ${res.status} for query "${q}"`);
        continue;
      }
      const data = await res.json() as { jobs?: HimalayasJob[] };
      for (const job of data.jobs ?? []) {
        const key = job.applicationLink ?? job.guid ?? job.title;
        if (!seen.has(key)) {
          seen.add(key);
          all.push(job);
        }
      }
    } catch (err) {
      console.warn(`  ⚠ Failed to fetch query "${q}":`, err instanceof Error ? err.message : String(err));
    }
  }
  return all;
}

function extractTags(job: HimalayasJob): string[] {
  const tags = new Set<string>(job.categories?.slice(0, 3) ?? []);
  const title = job.title.toLowerCase();
  if (title.includes("senior") || title.includes("sr.")) tags.add("Senior PM");
  if (title.includes("principal")) tags.add("Principal PM");
  if (title.includes("group") || title.includes("director")) tags.add("Director PM");
  if (title.includes("growth")) tags.add("Growth PM");
  if (title.includes("data") || title.includes("analytics")) tags.add("Data PM");
  if (title.includes("platform")) tags.add("Platform PM");
  if (job.seniority?.length) job.seniority.slice(0, 2).forEach((s) => tags.add(s));
  if (!tags.size) tags.add("PM");
  return Array.from(tags).slice(0, 5);
}

/**
 * Returns true only if the job title looks like a genuine PM role.
 * Filters out false positives from broad keyword searches.
 */
function isPMJob(title: string): boolean {
  const t = title.toLowerCase();
  const PM_TITLE_PATTERNS = [
    "product manager", "product management", "product lead",
    "head of product", "vp of product", "vp, product",
    "director of product", "director, product",
    "principal pm", "group pm", "staff pm",
    "associate product", "senior pm", "sr. pm",
    "product operations", "product strategy",
  ];
  return PM_TITLE_PATTERNS.some((p) => t.includes(p));
}

async function main() {
  console.log(`\n[scrape-pm-jobs] Starting${dryRun ? " (dry-run)" : ""}…\n`);

  const allJobs = await fetchHimalayasJobs();
  const jobs = allJobs.filter((j) => isPMJob(j.title));
  console.log(`\nFetched ${allJobs.length} raw jobs → ${jobs.length} valid PM jobs after title filter\n`);

  let created = 0;
  let skipped = 0;

  for (const job of jobs) {
    const applyUrl = job.applicationLink;
    if (!applyUrl) { skipped++; continue; }

    const isRemote = !job.locationRestrictions?.length;
    const desc = (job.excerpt ?? job.description ?? null);

    if (dryRun) {
      console.log(`  [dry-run] ${job.title} @ ${job.companyName} (${isRemote ? "remote" : "location-restricted"}) → ${applyUrl}`);
      continue;
    }

    const existing = await prisma.job.findFirst({ where: { applyUrl } });
    if (existing) {
      await prisma.job.update({ where: { id: existing.id }, data: { isActive: true, scrapedAt: new Date() } });
      skipped++;
      continue;
    }

    await prisma.job.create({
      data: {
        title: job.title,
        company: job.companyName,
        location: null,
        remote: isRemote,
        applyUrl,
        description: desc ? desc.slice(0, 500) : null,
        tags: extractTags(job),
        source: "himalayas",
        postedAt: job.pubDate ? new Date(job.pubDate) : null,
      },
    });
    console.log(`  ✅ ${job.title} @ ${job.companyName}`);
    created++;
  }

  if (!dryRun) {
    // Mark old jobs inactive (not seen in this scrape)
    const scrapedUrls = jobs.map((j) => j.applicationLink).filter(Boolean);
    const deactivated = await prisma.job.updateMany({
      where: { source: "himalayas", applyUrl: { notIn: scrapedUrls } },
      data: { isActive: false },
    });
    console.log(`\nDone. Created: ${created} | Refreshed: ${skipped} | Deactivated stale: ${deactivated.count}`);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
