import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { checkAndUpdateStreak } from "@/lib/streak";
import { CORE_LESSON_WHERE } from "@/lib/lesson-access";

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const streakInfo = await checkAndUpdateStreak(userId);

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      xp: true,
      level: true,
      streakCount: true,
      longestStreak: true,
      streakFreezes: true,
      gems: true,
    },
  });

  const today = new Date().toISOString().split("T")[0];
  const [completedCount, totalLessons, completedToday] = await Promise.all([
    prisma.completedLesson.count({
      where: {
        userId,
        lesson: { is: CORE_LESSON_WHERE },
      },
    }),
    prisma.lesson.count({ where: CORE_LESSON_WHERE }),
    prisma.completedLesson.count({
      where: {
        userId,
        completedAt: { gte: new Date(today) },
        lesson: { is: CORE_LESSON_WHERE },
      },
    }),
  ]);
  const totalArchive = 289; // Full Lenny's Podcast archive available

  const last30Days: string[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    last30Days.push(d.toISOString().split("T")[0]);
  }

  const streakDays = await prisma.streakDay.findMany({
    where: { userId, date: { in: last30Days } },
  });

  const calendar = last30Days.map((date) => {
    const entry = streakDays.find((s) => s.date === date);
    return {
      date,
      completed: entry?.completed ?? false,
      frozen: entry?.frozen ?? false,
    };
  });

  return NextResponse.json({
    user,
    streak: streakInfo,
    completedCount,
    totalLessons,
    completedToday: completedToday > 0,
    totalArchive,
    calendar,
  });
}
