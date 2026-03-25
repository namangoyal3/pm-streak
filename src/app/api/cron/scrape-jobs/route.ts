import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { JOB_SOURCES, isPMJob, type NormJob } from "@/lib/job-scraper";

/**
 * PM job scraper cron endpoint.
 * Runs every 6 hours via Vercel Cron (4× daily).
 * Also callable manually: GET /api/cron/scrape-jobs
 *   with Authorization: Bearer {CRON_SECRET}
 *
 * Optional: ?source=linkedin to run a single source.
 */
export async function GET(req: Request) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const sourceArg = searchParams.get("source");

  const activeSources = sourceArg
    ? Object.entries(JOB_SOURCES).filter(([k]) => k === sourceArg)
    : Object.entries(JOB_SOURCES);

  const summary: Record<string, { fetched: number; valid: number; created: number; refreshed: number }> = {};
  const allActiveUrls: string[] = [];

  for (const [name, fetchFn] of activeSources) {
    console.log(`[scrape-jobs] Fetching: ${name}`);
    let raw: NormJob[] = [];
    try {
      raw = await fetchFn();
    } catch (err) {
      console.error(`[scrape-jobs] ${name} threw:`, err);
    }

    const valid = raw.filter((j) => isPMJob(j.title));
    summary[name] = { fetched: raw.length, valid: valid.length, created: 0, refreshed: 0 };

    for (const job of valid) {
      allActiveUrls.push(job.applyUrl);
      try {
        const existing = await prisma.job.findFirst({ where: { applyUrl: job.applyUrl } });
        if (existing) {
          await prisma.job.update({ where: { id: existing.id }, data: { isActive: true, scrapedAt: new Date() } });
          summary[name].refreshed++;
        } else {
          await prisma.job.create({ data: { ...job, isActive: true } });
          summary[name].created++;
        }
      } catch (err) {
        console.error(`[scrape-jobs] DB error for ${job.applyUrl}:`, err);
      }
    }
  }

  // Deactivate stale jobs from the scraped sources
  const sourceNames = activeSources.map(([k]) => k);
  if (allActiveUrls.length > 0) {
    await prisma.job.updateMany({
      where: { source: { in: sourceNames }, applyUrl: { notIn: allActiveUrls } },
      data: { isActive: false },
    });
  }

  const totalCreated = Object.values(summary).reduce((s, v) => s + v.created, 0);
  const totalValid = Object.values(summary).reduce((s, v) => s + v.valid, 0);

  console.log(`[scrape-jobs] Done. ${totalCreated} new jobs, ${totalValid} valid found.`);
  return NextResponse.json({ ok: true, summary, totalCreated, totalValid, runAt: new Date().toISOString() });
}
