import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const isAllowed = (req: Request) =>
  req.headers.get("authorization") === `Bearer ${process.env.CRON_SECRET}`;

export async function GET(req: Request) {
  if (!isAllowed(req)) return NextResponse.json({ ok: false }, { status: 401 });

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [total, unaddressed, addressed, recentlyCreated, failed, exhausted] =
    await Promise.all([
      prisma.geoOpportunity.count(),
      prisma.geoOpportunity.count({ where: { addressed: false, attempts: { lt: 3 } } }),
      prisma.geoOpportunity.count({ where: { addressed: true } }),
      prisma.geoOpportunity.count({
        where: { addressed: true, updatedAt: { gte: sevenDaysAgo } },
      }),
      prisma.geoOpportunity.count({
        where: { addressed: false, attempts: { gt: 0, lt: 3 } },
      }),
      prisma.geoOpportunity.count({ where: { addressed: false, attempts: { gte: 3 } } }),
    ]);

  const recentErrors = await prisma.geoOpportunity.findMany({
    where: { addressed: false, attempts: { gt: 0 } },
    orderBy: { updatedAt: "desc" },
    take: 5,
    select: { query: true, attempts: true, lastError: true, updatedAt: true },
  });

  return NextResponse.json({
    ok: true,
    total,
    unaddressed,
    addressed,
    created_last_7d: recentlyCreated,
    failed_with_retries: failed,
    permanently_skipped: exhausted,
    recent_errors: recentErrors,
  });
}
