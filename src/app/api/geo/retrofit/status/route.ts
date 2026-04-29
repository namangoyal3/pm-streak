import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const isAllowed = (req: Request) =>
  req.headers.get("authorization") === `Bearer ${process.env.CRON_SECRET}`;

export async function GET(req: Request) {
  if (!isAllowed(req)) return NextResponse.json({ ok: false }, { status: 401 });

  const [byStatus, byTier, total, shippedLast7d, recentErrors] = await Promise.all([
    prisma.geoPageTriage.groupBy({ by: ["jobStatus"], _count: { _all: true } }),
    prisma.geoPageTriage.groupBy({ by: ["tier"], _count: { _all: true } }),
    prisma.geoPageTriage.count(),
    prisma.geoPageTriage.count({
      where: {
        jobStatus: "shipped",
        lastShippedAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      },
    }),
    prisma.geoPageTriage.findMany({
      where: { jobStatus: "failed" },
      orderBy: { updatedAt: "desc" },
      take: 5,
      select: { slug: true, tier: true, attempts: true, lastError: true, updatedAt: true },
    }),
  ]);

  return NextResponse.json({
    ok: true,
    total,
    shipped_last_7d: shippedLast7d,
    by_status: Object.fromEntries(
      (byStatus as Array<{ jobStatus: string; _count: { _all: number } }>).map(
        (r) => [r.jobStatus, r._count._all]
      )
    ),
    by_tier: Object.fromEntries(
      (byTier as Array<{ tier: string | null; _count: { _all: number } }>).map(
        (r) => [r.tier ?? "untiered", r._count._all]
      )
    ),
    recent_errors: recentErrors,
  });
}
