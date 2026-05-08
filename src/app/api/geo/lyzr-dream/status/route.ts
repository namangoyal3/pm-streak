// GET /api/geo/lyzr-dream/status
//
// Returns the most recent Lyzr dream run summary from GeoCronLog.
// Unlike the Claude Dreams status endpoint (which polls an async job),
// Lyzr dreams run synchronously — this endpoint just surfaces the last log entry.

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  const log = await prisma.geoCronLog.findFirst({
    where: { cronId: "lyzr-dream/run" },
    orderBy: { createdAt: "desc" },
  });

  if (!log) return NextResponse.json({ ok: true, lastRun: null });

  return NextResponse.json({
    ok: true,
    lastRun: {
      ranAt: log.createdAt,
      status: log.status,
      summary: log.summary,
      details: log.details,
    },
  });
}
