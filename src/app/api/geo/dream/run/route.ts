// POST /api/geo/dream/run
//
// Weekly cron that triggers a Dreams consolidation run on the GEO memory store.
// The primary Lyzr KB (pm_streak_shared_kb) is never touched.
//
// Because Dreams can take minutes to tens of minutes, this route creates the
// dream (fire-and-forget) and returns the dream ID. Poll
// GET /api/geo/dream/status?id=<dreamId> to track progress.
//
// Auth: x-vercel-cron: 1  OR  Authorization: Bearer $CRON_SECRET

import { NextResponse } from "next/server";
import { runDream } from "@/lib/geo/dream-worker";

export const runtime = "nodejs";

const isAllowed = (req: Request) =>
  req.headers.get("x-vercel-cron") === "1" ||
  req.headers.get("authorization") === `Bearer ${process.env.CRON_SECRET}`;

export async function POST(req: Request) {
  if (!isAllowed(req)) return NextResponse.json({ ok: false }, { status: 401 });

  if (!process.env.ANTHROPIC_GEO_MEMORY_STORE_ID) {
    return NextResponse.json(
      { ok: false, error: "ANTHROPIC_GEO_MEMORY_STORE_ID not set. Run createGeoMemoryStore() once and store the returned ID." },
      { status: 500 }
    );
  }

  try {
    const result = await runDream({ fireAndForget: true });
    return NextResponse.json({ ok: true, ...result });
  } catch (e) {
    const message = e instanceof Error ? e.message.slice(0, 500) : String(e);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
