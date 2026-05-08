// POST /api/geo/lyzr-dream/run
//
// Weekly cron that runs "dreaming" across all Lyzr GEO agents.
// Each agent receives a reflection prompt asking it to deduplicate,
// resolve contradictions, and surface new insights from its KB knowledge.
// The primary Lyzr KB (pm_streak_shared_kb) is NEVER deleted or overwritten.
// Outputs are saved to .lyzr-dream-cache/ and written to the Claude memory store.
//
// Auth: x-vercel-cron: 1  OR  Authorization: Bearer $CRON_SECRET

import { NextResponse } from "next/server";
import { runLyzrDream } from "@/lib/geo/lyzr-dream-worker";

export const runtime = "nodejs";

const isAllowed = (req: Request) =>
  req.headers.get("x-vercel-cron") === "1" ||
  req.headers.get("authorization") === `Bearer ${process.env.CRON_SECRET}`;

export async function POST(req: Request) {
  if (!isAllowed(req)) return NextResponse.json({ ok: false }, { status: 401 });

  try {
    const result = await runLyzrDream();
    const okCount = result.results.filter((r) => r.status === "ok").length;
    const errCount = result.results.filter((r) => r.status === "error").length;
    return NextResponse.json({
      ok: true,
      ranAt: result.ranAt,
      agentsProcessed: result.results.length,
      okCount,
      errCount,
      memoryEntriesWritten: result.memoryEntriesWritten,
      results: result.results.map((r) => ({
        agent: r.agent,
        status: r.status,
        summary: r.summary,
        ...(r.error ? { error: r.error } : {}),
      })),
    });
  } catch (e) {
    const message = e instanceof Error ? e.message.slice(0, 500) : String(e);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
