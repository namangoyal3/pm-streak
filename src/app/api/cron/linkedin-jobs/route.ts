import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { JOB_SOURCES, isPMJob, type NormJob } from "@/lib/job-scraper";

/**
 * LinkedIn / jsearch-mega PM jobs — daily at 6:00 PM IST (12:30 UTC).
 * Requires RAPIDAPI_KEY. Uses same upsert rules as scrape-jobs.
 * GET /api/cron/linkedin-jobs  Authorization: Bearer {CRON_SECRET}
 */
export const maxDuration = 120;

export async function GET(req: Request) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const fetchFn = JOB_SOURCES.linkedin;
  if (!fetchFn) {
    return NextResponse.json({ error: "linkedin source missing" }, { status: 500 });
  }

  let raw: NormJob[] = [];
  try {
    raw = await fetchFn();
  } catch (err) {
    console.error("[linkedin-jobs]", err);
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "fetch failed" },
      { status: 500 }
    );
  }

  const valid = raw.filter((j) => isPMJob(j.title));
  const summary = { fetched: raw.length, valid: valid.length, created: 0, refreshed: 0 };
  const urls: string[] = [];

  for (const job of valid) {
    urls.push(job.applyUrl);
    try {
      const existing = await prisma.job.findFirst({ where: { applyUrl: job.applyUrl } });
      if (existing) {
        await prisma.job.update({
          where: { id: existing.id },
          data: { isActive: true, scrapedAt: new Date() },
        });
        summary.refreshed++;
      } else {
        await prisma.job.create({ data: { ...job, isActive: true } });
        summary.created++;
      }
    } catch (err) {
      console.error(`[linkedin-jobs] DB error for ${job.applyUrl}:`, err);
    }
  }

  if (urls.length > 0) {
    await prisma.job.updateMany({
      where: { source: "linkedin", applyUrl: { notIn: urls } },
      data: { isActive: false },
    });
  }

  console.log(`[linkedin-jobs] Done. ${summary.created} new, ${summary.created + summary.refreshed} touched.`);
  return NextResponse.json({ ok: true, summary, runAt: new Date().toISOString() });
}
