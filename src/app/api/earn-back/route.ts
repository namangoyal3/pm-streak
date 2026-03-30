import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getToday } from "@/lib/utils";

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || !user.streakLostAt || user.lostStreakVal === 0) {
    return NextResponse.json({ eligible: false });
  }

  const hoursSinceLoss = (Date.now() - new Date(user.streakLostAt).getTime()) / 3600000;
  if (hoursSinceLoss > 48) {
    return NextResponse.json({ eligible: false });
  }

  const today = getToday();
  const todayLesson = await prisma.completedLesson.findFirst({
    where: { userId, completedAt: { gte: new Date(today) } },
  });

  return NextResponse.json({
    eligible: true,
    lostStreak: user.lostStreakVal,
    hoursRemaining: Math.max(0, Math.floor(48 - hoursSinceLoss)),
    completedToday: !!todayLesson,
  });
}

export async function POST() {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || !user.streakLostAt || user.lostStreakVal === 0) {
    return NextResponse.json({ error: "Not eligible" }, { status: 400 });
  }

  const hoursSinceLoss = (Date.now() - new Date(user.streakLostAt).getTime()) / 3600000;
  if (hoursSinceLoss > 48) {
    return NextResponse.json({ error: "Window expired" }, { status: 400 });
  }

  const today = getToday();
  const todayLessons = await prisma.completedLesson.count({
    where: { userId, completedAt: { gte: new Date(today) } },
  });

  if (todayLessons < 2) {
    return NextResponse.json({ error: "Complete 2 lessons today to earn back your streak" }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      streakCount: user.lostStreakVal,
      longestStreak: Math.max(user.longestStreak, user.lostStreakVal),
      streakLostAt: null,
      lostStreakVal: 0,
    },
  });

  await prisma.streakDay.create({
    data: { userId, date: today, completed: true },
  });

  return NextResponse.json({ restored: true, streakCount: user.lostStreakVal });
}
