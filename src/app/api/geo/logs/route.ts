import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const logs = await prisma.geoCronLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    select: { cronId: true, status: true, summary: true, createdAt: true },
  });
  return NextResponse.json(logs);
}
