/**
 * Multi-source PM job scraper — CLI runner.
 * Imports source fetchers from src/lib/job-scraper.ts (shared with Vercel cron).
 *
 * Sources: Himalayas · Remotive · We Work Remotely · Remote OK ·
 *          Indeed · LinkedIn (needs RAPIDAPI_KEY) · YC Work at a Startup ·
 *          Greenhouse (Stripe, Notion, Figma, Airbnb + 9 more)
 *
 * Usage:
 *   npx tsx scripts/scrape-pm-jobs.ts                    # all sources
 *   npx tsx scripts/scrape-pm-jobs.ts --dry-run          # preview only
 *   npx tsx scripts/scrape-pm-jobs.ts --source linkedin  # one source
 *   npx tsx scripts/scrape-pm-jobs.ts --source greenhouse
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { PrismaClient } from "@prisma/client";
import { JOB_SOURCES, isPMJob } from "../src/lib/job-scraper";

// Load env files (not needed in Next.js but required for standalone script runs)
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
const sourceArg = process.argv.find((a, i) => process.argv[i - 1] === "--source");

async function main() {
  console.log(`\n[scrape-pm-jobs] Starting${dryRun ? " (dry-run)" : ""}${sourceArg ? ` — source: ${sourceArg}` : " — all sources"}…\n`);

  const activeSources = sourceArg
    ? Object.entries(JOB_SOURCES).filter(([k]) => k === sourceArg)
    : Object.entries(JOB_SOURCES);

  const totals: Record<string, { fetched: number; valid: number; created: number; skipped: number }> = {};
  const allActiveUrls: string[] = [];

  for (const [name, fetchFn] of activeSources) {
    console.log(`\n── ${name.toUpperCase()} ──`);
    let raw;
    try {
      raw = await fetchFn();
    } catch (err) {
      console.error(`  ✗ ${name} threw:`, err instanceof Error ? err.message : String(err));
      totals[name] = { fetched: 0, valid: 0, created: 0, skipped: 0 };
      continue;
    }
    const valid = raw.filter((j) => isPMJob(j.title));
    totals[name] = { fetched: raw.length, valid: valid.length, created: 0, skipped: 0 };
    console.log(`  ${raw.length} raw → ${valid.length} valid PM/builder jobs`);

    for (const job of valid) {
      allActiveUrls.push(job.applyUrl);
      if (dryRun) {
        console.log(`  [dry-run] ${job.title} @ ${job.company} (${job.remote ? "remote" : job.location ?? "?"}) [${name}]`);
        continue;
      }
      const existing = await prisma.job.findFirst({ where: { applyUrl: job.applyUrl } });
      if (existing) {
        await prisma.job.update({ where: { id: existing.id }, data: { isActive: true, scrapedAt: new Date() } });
        totals[name].skipped++;
        continue;
      }
      await prisma.job.create({ data: { ...job, isActive: true } });
      console.log(`  ✅ ${job.title} @ ${job.company}`);
      totals[name].created++;
    }
  }

  if (!dryRun && allActiveUrls.length > 0) {
    const sourceNames = activeSources.map(([k]) => k);
    const deactivated = await prisma.job.updateMany({
      where: { source: { in: sourceNames }, applyUrl: { notIn: allActiveUrls } },
      data: { isActive: false },
    });
    console.log(`\nDeactivated stale: ${deactivated.count}`);
  }

  console.log("\n── SUMMARY ──");
  let grandCreated = 0;
  for (const [name, t] of Object.entries(totals)) {
    console.log(`  ${name.padEnd(16)} fetched: ${String(t.fetched).padStart(3)}  valid: ${String(t.valid).padStart(3)}  created: ${String(t.created).padStart(3)}  refreshed: ${t.skipped}`);
    grandCreated += t.created;
  }
  console.log(`\n  Total new jobs added: ${grandCreated}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
