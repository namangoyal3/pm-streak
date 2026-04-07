/**
 * Lifecycle email cron — runs daily at 6pm UTC (11:30pm IST)
 * Implements full user state machine with per-type rate limiting via EmailLog.
 *
 * Priority per user (only highest-priority email sends per run):
 *   1. day2_nudge      — signed up 20-50h ago, no lessons yet
 *   2. streak_at_risk  — has streak, hasn't done today's lesson
 *   3. pro_nudge_7d    — free user just hit 7-day streak
 *   4. pro_nudge_14d   — free user just hit 14-day streak
 *   5. reengagement_3d — 3 days inactive, has done at least 1 lesson
 *   6. reengagement_7d — 7 days inactive, has done at least 1 lesson
 *   7. pro_winback     — pro user 5-14 days inactive
 *   8. weekly_digest   — Monday only
 */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  sendDay2NudgeEmail,
  sendStreakAtRiskEmail,
  sendWeeklyDigestEmail,
  sendProNudgeEmail,
  sendReengagementEmail,
  sendProWinbackEmail,
} from "@/lib/email";
import { getToday } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const today = getToday();
  const now = new Date();
  const isMonday = now.getUTCDay() === 1;

  const cutoff30d = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const users = await prisma.user.findMany({
    where: {
      emailOptOut: false,
      OR: [
        // Active users: seen in the last 30 days
        { lastActiveAt: { gte: cutoff30d } },
        // Cold leads: signed up in the last 30 days and never opened the app
        { lastActiveAt: null, createdAt: { gte: cutoff30d } },
      ],
    },
    select: {
      id: true, email: true, name: true, plan: true,
      streakCount: true, xp: true, credits: true,
      createdAt: true, lastActiveAt: true,
      streakHistory: { where: { date: today }, select: { completed: true } },
      completedLessons: { select: { completedAt: true }, orderBy: { completedAt: "desc" }, take: 1 },
    },
  });

  const results = {
    day2Nudge: 0, streakAtRisk: 0,
    proNudge7d: 0, proNudge14d: 0,
    reengagement3d: 0, reengagement7d: 0,
    proWinback: 0, weeklyDigest: 0, skipped: 0,
  };

  for (const user of users) {
    const completedToday = user.streakHistory.length > 0 && user.streakHistory[0].completed;
    const lastActiveAt = user.lastActiveAt ?? user.createdAt;
    const daysInactive = Math.floor((now.getTime() - lastActiveAt.getTime()) / (1000 * 60 * 60 * 24));
    const hoursOld = (now.getTime() - user.createdAt.getTime()) / (1000 * 60 * 60);
    const hasEverDoneLesson = user.completedLessons.length > 0;

    // 1. Day-2 nudge
    if (!hasEverDoneLesson && hoursOld >= 20 && hoursOld <= 50) {
      const sent = await sendDay2NudgeEmail({ userId: user.id, toEmail: user.email, toName: user.name }).catch(() => false);
      if (sent) { results.day2Nudge++; continue; }
    }

    // 2. Streak at-risk
    if (!completedToday && user.streakCount > 0 && daysInactive < 2) {
      const nextLesson = await prisma.lesson.findFirst({ where: { isLocked: false }, orderBy: { dayNumber: "asc" }, select: { title: true } });
      const sent = await sendStreakAtRiskEmail({
        userId: user.id, toEmail: user.email, toName: user.name,
        streakCount: user.streakCount, nextLessonTitle: nextLesson?.title,
      }).catch(() => false);
      if (sent) { results.streakAtRisk++; continue; }
    }

    // 3. Pro nudge (free users only, on streak milestone day)
    if (user.plan === "free" && completedToday && daysInactive < 1) {
      if (user.streakCount === 7) {
        const sent = await sendProNudgeEmail({ userId: user.id, toEmail: user.email, toName: user.name, streakCount: user.streakCount, creditsLeft: user.credits, variant: "7day" }).catch(() => false);
        if (sent) { results.proNudge7d++; continue; }
      } else if (user.streakCount === 14) {
        const sent = await sendProNudgeEmail({ userId: user.id, toEmail: user.email, toName: user.name, streakCount: user.streakCount, creditsLeft: user.credits, variant: "14day" }).catch(() => false);
        if (sent) { results.proNudge14d++; continue; }
      }
    }

    // 4. Re-engagement (also targets cold leads who never did a lesson)
    if (daysInactive === 3) {
      const sent = await sendReengagementEmail({ userId: user.id, toEmail: user.email, toName: user.name, streakCount: user.streakCount, daysInactive, variant: "3day" }).catch(() => false);
      if (sent) { results.reengagement3d++; continue; }
    }
    if (daysInactive === 7) {
      const sent = await sendReengagementEmail({ userId: user.id, toEmail: user.email, toName: user.name, streakCount: user.streakCount, daysInactive, variant: "7day" }).catch(() => false);
      if (sent) { results.reengagement7d++; continue; }
    }

    // 5. Pro win-back
    if (user.plan === "pro" && daysInactive >= 5 && daysInactive <= 14) {
      const sent = await sendProWinbackEmail({ userId: user.id, toEmail: user.email, toName: user.name, daysInactive, creditsLeft: user.credits }).catch(() => false);
      if (sent) { results.proWinback++; continue; }
    }

    results.skipped++;
  }

  // Weekly digest (Monday)
  if (isMonday) {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const digestUsers = await prisma.user.findMany({
      where: { emailOptOut: false, lastActiveAt: { gte: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) } },
      select: {
        id: true, email: true, name: true, plan: true,
        streakCount: true, xp: true, credits: true,
        completedLessons: { where: { completedAt: { gte: weekAgo } }, select: { id: true } },
        following: {
          select: {
            following: {
              select: {
                name: true,
                completedLessons: { where: { completedAt: { gte: weekAgo } }, select: { id: true } },
              },
            },
          },
        },
      },
    });

    for (const u of digestUsers) {
      const friends = u.following
        .map((f) => ({ name: f.following.name, lessonsCompleted: f.following.completedLessons.length }))
        .filter((f) => f.lessonsCompleted > 0)
        .sort((a, b) => b.lessonsCompleted - a.lessonsCompleted);

      const unusedFeature: "interview_prep" | "ai_lessons" | undefined = u.plan === "pro"
        ? (await prisma.emailLog.findFirst({ where: { userId: u.id, emailType: "interview_prep_used" } }))
          ? undefined : "interview_prep"
        : undefined;

      await sendWeeklyDigestEmail({
        userId: u.id, toEmail: u.email, toName: u.name,
        streakCount: u.streakCount, xp: u.xp,
        lessonsThisWeek: u.completedLessons.length,
        plan: u.plan, creditsLeft: u.credits,
        topFriend: friends[0],
        unusedFeature,
      }).catch(() => {});
      results.weeklyDigest++;
    }
  }

  console.log("[daily-emails] Completed:", results);
  return NextResponse.json({ ok: true, ...results, runAt: now.toISOString() });
}
