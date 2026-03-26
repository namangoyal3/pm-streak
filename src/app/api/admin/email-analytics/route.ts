/**
 * GET /api/admin/email-analytics
 * Returns email funnel analytics from EmailLog:
 *   - Per email type: sent, opened, clicked, open rate, CTR, conversion rate
 *   - Overall funnel: sent → opened → clicked
 *   - Unsubscribe count
 *   - Recent sends list (paginated)
 */
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function isAdmin(email: string): boolean {
  return email === (process.env.ADMIN_EMAIL || "namangoyal21197@gmail.com");
}

export async function GET(req: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const currentUser = await prisma.user.findUnique({ where: { id: userId }, select: { email: true } });
  if (!currentUser || !isAdmin(currentUser.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const days = parseInt(searchParams.get("days") || "30");
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  // Per-type stats from EmailLog
  const logs = await prisma.emailLog.findMany({
    where: { sentAt: { gte: since } },
    select: { emailType: true, sentAt: true, openedAt: true, clickedAt: true },
  });

  // Aggregate by email type
  const byType: Record<string, { sent: number; opened: number; clicked: number }> = {};
  let totalSent = 0, totalOpened = 0, totalClicked = 0;

  for (const log of logs) {
    if (!byType[log.emailType]) byType[log.emailType] = { sent: 0, opened: 0, clicked: 0 };
    byType[log.emailType].sent++;
    totalSent++;
    if (log.openedAt) { byType[log.emailType].opened++; totalOpened++; }
    if (log.clickedAt) { byType[log.emailType].clicked++; totalClicked++; }
  }

  const typeStats = Object.entries(byType)
    .map(([type, s]) => ({
      emailType: type,
      sent: s.sent,
      opened: s.opened,
      clicked: s.clicked,
      openRate: s.sent > 0 ? Math.round((s.opened / s.sent) * 100 * 10) / 10 : 0,
      clickThroughRate: s.sent > 0 ? Math.round((s.clicked / s.sent) * 100 * 10) / 10 : 0,
      clickToOpenRate: s.opened > 0 ? Math.round((s.clicked / s.opened) * 100 * 10) / 10 : 0,
    }))
    .sort((a, b) => b.sent - a.sent);

  // Unsubscribe count
  const unsubscribed = await prisma.user.count({
    where: { emailOptOut: true, emailOptOutAt: { gte: since } },
  });
  const totalOptedOut = await prisma.user.count({ where: { emailOptOut: true } });

  // Daily send volume (last N days)
  const dailyVolume: Record<string, number> = {};
  for (const log of logs) {
    const day = log.sentAt.toISOString().slice(0, 10);
    dailyVolume[day] = (dailyVolume[day] || 0) + 1;
  }
  const volumeByDay = Object.entries(dailyVolume)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => ({ date, count }));

  // Recent sends (last 50)
  const recentLogs = await prisma.emailLog.findMany({
    where: { sentAt: { gte: since } },
    orderBy: { sentAt: "desc" },
    take: 50,
    select: {
      id: true, emailType: true, sentAt: true, openedAt: true, clickedAt: true,
      user: { select: { email: true, name: true, plan: true } },
    },
  });

  return NextResponse.json({
    period: { days, since: since.toISOString() },
    funnel: {
      sent: totalSent,
      opened: totalOpened,
      clicked: totalClicked,
      openRate: totalSent > 0 ? Math.round((totalOpened / totalSent) * 100 * 10) / 10 : 0,
      clickThroughRate: totalSent > 0 ? Math.round((totalClicked / totalSent) * 100 * 10) / 10 : 0,
    },
    unsubscribes: { inPeriod: unsubscribed, total: totalOptedOut },
    byType: typeStats,
    volumeByDay,
    recent: recentLogs.map((l) => ({
      id: l.id,
      emailType: l.emailType,
      sentAt: l.sentAt,
      opened: !!l.openedAt,
      clicked: !!l.clickedAt,
      userEmail: l.user.email,
      userName: l.user.name,
      plan: l.user.plan,
    })),
  });
}
