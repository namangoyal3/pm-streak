import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { runCreateTick } from "@/lib/geo/create-worker";

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
    return NextResponse.json({
      ok: true,
      quota,
      dryRun,
      picked: result.picked,
      created: result.created,
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

// GET → dry-run convenience (no body needed).
export async function GET(req: Request) {
  if (!isAllowed(req)) return NextResponse.json({ ok: false }, { status: 401 });
  const url = new URL(req.url);
  const quota = Math.min(10, Math.max(1, Number(url.searchParams.get("quota") ?? 3)));
  const result = await runCreateTick(prisma, { quota, dryRun: true });
  return NextResponse.json({ ok: true, dryRun: true, decisions: result.decisions });
}
