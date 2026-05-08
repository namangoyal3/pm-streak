// GET /api/geo/dream/status?id=<dreamId>
//
// Returns the current status of a dream created by /api/geo/dream/run.
// When status === "completed", outputStoreId contains the new consolidated
// memory store ID. Attach it to future Claude sessions or review it in
// the Anthropic Console.

import { NextResponse } from "next/server";
import { getDreamStatus } from "@/lib/claude-memory";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ ok: false, error: "Missing ?id=" }, { status: 400 });

  try {
    const snap = await getDreamStatus(id);
    return NextResponse.json({ ok: true, ...snap });
  } catch (e) {
    const message = e instanceof Error ? e.message.slice(0, 500) : String(e);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
