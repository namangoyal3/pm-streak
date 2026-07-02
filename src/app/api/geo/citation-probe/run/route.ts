import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { runCitationProbe } from "@/lib/geo/citation-probe";
import { writeCronLog } from "@/lib/geo/safe-prisma";

export const maxDuration = 300;

const isAllowed = (req: Request) =>
  req.headers.get("x-vercel-cron") === "1" ||
  req.headers.get("authorization") === `Bearer ${process.env.CRON_SECRET}`;

async function run(req: Request) {
  if (!isAllowed(req)) return NextResponse.json({ ok: false }, { status: 401 });

  if (!process.env.PERPLEXITY_API_KEY) {
    // Not an error — the loop is simply unconfigured. Log and exit clean.
    await writeCronLog({
      cronId: "citation-probe/run",
      status: "empty",
      summary: "Skipped: PERPLEXITY_API_KEY not configured",
    }).catch(() => {});
    return NextResponse.json({ ok: true, skipped: "PERPLEXITY_API_KEY not configured" });
  }

  const url = new URL(req.url);
  const limit = Number(url.searchParams.get("limit") ?? undefined) || undefined;

  try {
    const result = await runCitationProbe(prisma, { limit });
    await writeCronLog({
      cronId: "citation-probe/run",
      status: result.errors > 0 && result.probed === 0 ? "error" : result.probed > 0 ? "ok" : "empty",
      summary: `Probed ${result.probed}, cited ${result.cited}, errors ${result.errors}`,
      details: { outcomes: result.outcomes.slice(0, 25) },
    }).catch(() => {});
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    await writeCronLog({ cronId: "citation-probe/run", status: "error", summary: message.slice(0, 300) }).catch(() => {});
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  return run(req);
}

// Vercel crons call GET.
export async function GET(req: Request) {
  return run(req);
}
