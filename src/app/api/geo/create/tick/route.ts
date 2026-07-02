import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { runCreateTick } from "@/lib/geo/create-worker";
import { writeCronLog } from "@/lib/geo/safe-prisma";

export const maxDuration = 300;

const isAllowed = (req: Request) =>
  req.headers.get("x-vercel-cron") === "1" ||
  req.headers.get("authorization") === `Bearer ${process.env.CRON_SECRET}`;

const DEFAULT_QUOTA = Number(process.env.GEO_CREATE_DAILY_QUOTA ?? 5);

export async function POST(req: Request) {
  if (!isAllowed(req)) return NextResponse.json({ ok: false }, { status: 401 });

  const url = new URL(req.url);
  const quota = Math.min(20, Math.max(1, Number(url.searchParams.get("quota") ?? DEFAULT_QUOTA)));
  const dryRun = url.searchParams.get("dryRun") === "1";

  try {
    const result = await runCreateTick(prisma, { quota, dryRun });
    if (!dryRun) {
      await writeCronLog({
        cronId: "create/tick",
        status: result.created > 0 || result.drafted > 0 ? "ok" : result.failed > 0 ? "error" : "empty",
        summary: `Created ${result.created}, drafted ${result.drafted}, failed ${result.failed}, skipped ${result.skipped} of ${result.picked}`,
        details: { quota, picked: result.picked, created: result.created, drafted: result.drafted, failed: result.failed, skipped: result.skipped, errors: result.errors.slice(0, 10) },
      });
    }
    return NextResponse.json({
      ok: true,
      quota,
      dryRun,
      picked: result.picked,
      created: result.created,
      drafted: result.drafted,
      failed: result.failed,
      skipped: result.skipped,
      errors: result.errors.slice(0, 5),
      decisions: result.decisions.slice(0, 10),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

// Vercel cron invocations are GET — this must run the REAL tick, not a dry-run
// (the old dry-run GET made the scheduled cron a no-op). Humans can still
// dry-run with ?dryRun=1, which POST already honors.
export async function GET(req: Request) {
  return POST(req);
}
