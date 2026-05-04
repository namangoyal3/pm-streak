import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { runTick } from "@/lib/geo/retrofit-worker";
import { writeCronLog } from "@/lib/geo/safe-prisma";

const isAllowed = (req: Request) =>
  req.headers.get("x-vercel-cron") === "1" ||
  req.headers.get("authorization") === `Bearer ${process.env.CRON_SECRET}`;

// Daily quotas keep us inside Lyzr's 5-hour rate limit and Vercel's serverless budget.
// Override via ?quota=N (admin only — same auth header).
const DEFAULT_QUOTA = Number(process.env.GEO_RETROFIT_DAILY_QUOTA ?? 20);

export async function POST(req: Request) {
  if (!isAllowed(req)) return NextResponse.json({ ok: false }, { status: 401 });

  const url = new URL(req.url);
  const quota = Math.min(
    100,
    Math.max(1, Number(url.searchParams.get("quota") ?? DEFAULT_QUOTA))
  );
  const dryRun = url.searchParams.get("dryRun") === "1";

  try {
    const result = await runTick(prisma, { quota, dryRun });
    if (!dryRun) {
      await writeCronLog({
        cronId: "retrofit/tick",
        status: result.shipped > 0 ? "ok" : "empty",
        summary: `Shipped ${result.shipped}, failed ${result.failed}, skipped ${result.skipped} of ${result.picked}`,
        details: { shipped: result.shipped, failed: result.failed, skipped: result.skipped, picked: result.picked, errors: result.errors.slice(0, 10) },
      });
    }
    return NextResponse.json({
      ok: true,
      quota,
      dryRun,
      picked: result.picked,
      shipped: result.shipped,
      failed: result.failed,
      skipped: result.skipped,
      errors: result.errors.slice(0, 5),
      decisions_preview: result.decisions.slice(0, 5),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

// GET → dry-run convenience for humans.
export async function GET(req: Request) {
  if (!isAllowed(req)) return NextResponse.json({ ok: false }, { status: 401 });
  const url = new URL(req.url);
  const quota = Math.min(50, Math.max(1, Number(url.searchParams.get("quota") ?? 5)));
  const result = await runTick(prisma, { quota, dryRun: true });
  return NextResponse.json({
    ok: true,
    quota,
    dryRun: true,
    decisions: result.decisions,
  });
}
