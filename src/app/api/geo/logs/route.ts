import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const isAllowed = (req: NextRequest) =>
  req.headers.get("x-vercel-cron") === "1" ||
  req.headers.get("authorization") === `Bearer ${process.env.CRON_SECRET}`;

export async function GET(req: NextRequest) {
  if (!isAllowed(req)) return NextResponse.json({ ok: false }, { status: 401 });

  const logs = await prisma.geoCronLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    select: { cronId: true, status: true, summary: true, createdAt: true },
  });
  return NextResponse.json(logs);
}
