import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function isAdmin(email: string): boolean {
  const adminEmail = process.env.ADMIN_EMAIL || "namangoyal21197@gmail.com";
  return email === adminEmail;
}

function getDateString(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split("T")[0];
}

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const currentUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true },
  });

  if (!currentUser || !isAdmin(currentUser.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const today = getDateString(0);
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  weekAgo.setHours(0, 0, 0, 0);

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  // Basic counts
  const totalUsers = await prisma.user.count();

  // Active today: users who completed a lesson today or have a streakDay today
  const activeTodayUsers = await prisma.user.findMany({
    where: {
      OR: [
        {
          completedLessons: {
            some: {
              completedAt: { gte: todayStart },
            },
          },
        },
        {
          streakHistory: {
            some: {
              date: today,
              completed: true,
            },
          },
        },
      ],
    },
    select: { id: true },
  });
  const activeToday = activeTodayUsers.length;

  const newUsersThisWeek = await prisma.user.count({
    where: { createdAt: { gte: weekAgo } },
  });

  const newUsersToday = await prisma.user.count({
    where: { createdAt: { gte: todayStart } },
  });

  const totalLessonsCompleted = await prisma.completedLesson.count();

  // Aggregate XP and streak stats
  const userAggregates = await prisma.user.aggregate({
    _avg: { xp: true, streakCount: true },
    _max: { streakCount: true },
  });

  const avgXP = Math.round(userAggregates._avg.xp ?? 0);
  const avgStreak = Math.round((userAggregates._avg.streakCount ?? 0) * 10) / 10;
  const maxStreak = userAggregates._max.streakCount ?? 0;

  const usersWithStreakOver7 = await prisma.user.count({
    where: { streakCount: { gte: 7 } },
  });

  // Streak distribution
  const allUsers = await prisma.user.findMany({
    select: { streakCount: true },
  });

  const streakDist = { "0": 0, "1-3": 0, "4-6": 0, "7-14": 0, "15-30": 0, "30+": 0 };
  for (const u of allUsers) {
    if (u.streakCount === 0) streakDist["0"]++;
    else if (u.streakCount <= 3) streakDist["1-3"]++;
    else if (u.streakCount <= 6) streakDist["4-6"]++;
    else if (u.streakCount <= 14) streakDist["7-14"]++;
    else if (u.streakCount <= 30) streakDist["15-30"]++;
    else streakDist["30+"]++;
  }

  const streakDistribution = Object.entries(streakDist).map(([range, count]) => ({ range, count }));

  // Top 5 lessons by completion
  const lessonCompletionCounts = await prisma.completedLesson.groupBy({
    by: ["lessonId"],
    _count: { lessonId: true },
    orderBy: { _count: { lessonId: "desc" } },
    take: 5,
  });

  const topLessonIds = lessonCompletionCounts.map((l) => l.lessonId);
  const topLessonDetails = await prisma.lesson.findMany({
    where: { id: { in: topLessonIds } },
    select: { id: true, title: true },
  });

  const topLessons = lessonCompletionCounts.map((lc) => {
    const detail = topLessonDetails.find((l) => l.id === lc.lessonId);
    return {
      title: detail?.title ?? "Unknown",
      completionCount: lc._count.lessonId,
    };
  });

  // Lesson funnel: all lessons with completions
  const allLessons = await prisma.lesson.findMany({
    where: { isLocked: false },
    select: { id: true, title: true, dayNumber: true },
    orderBy: { dayNumber: "asc" },
  });

  const allLessonCompletions = await prisma.completedLesson.groupBy({
    by: ["lessonId"],
    _count: { lessonId: true },
  });

  const completionMap = new Map(allLessonCompletions.map((lc) => [lc.lessonId, lc._count.lessonId]));

  const lessonFunnel = allLessons.map((lesson) => {
    const completedCount = completionMap.get(lesson.id) ?? 0;
    const completionPct = totalUsers > 0 ? Math.round((completedCount / totalUsers) * 100) : 0;
    return {
      title: lesson.title,
      dayNumber: lesson.dayNumber,
      completedCount,
      completionPct,
    };
  });

  // Recent users (last 25)
  const recentUsersRaw = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 25,
    select: {
      name: true,
      email: true,
      xp: true,
      streakCount: true,
      createdAt: true,
    },
  });

  const recentUsers = recentUsersRaw.map((u) => ({
    name: u.name,
    email: u.email,
    xp: u.xp,
    streakCount: u.streakCount,
    createdAt: u.createdAt.toISOString(),
  }));

  // Daily signups & completions — single query each using raw grouping
  const fourteenDaysAgo = new Date();
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 13);
  fourteenDaysAgo.setHours(0, 0, 0, 0);

  const [rawSignups, rawCompletions] = await Promise.all([
    prisma.$queryRaw<{ date: string; count: bigint }[]>`
      SELECT DATE("createdAt" AT TIME ZONE 'UTC') AS date, COUNT(*)::bigint AS count
      FROM "User"
      WHERE "createdAt" >= ${fourteenDaysAgo}
      GROUP BY DATE("createdAt" AT TIME ZONE 'UTC')
    `,
    prisma.$queryRaw<{ date: string; count: bigint }[]>`
      SELECT DATE("completedAt" AT TIME ZONE 'UTC') AS date, COUNT(*)::bigint AS count
      FROM "CompletedLesson"
      WHERE "completedAt" >= ${fourteenDaysAgo}
      GROUP BY DATE("completedAt" AT TIME ZONE 'UTC')
    `,
  ]);

  const signupMap = new Map(rawSignups.map((r) => [String(r.date), Number(r.count)]));
  const completionDayMap = new Map(rawCompletions.map((r) => [String(r.date), Number(r.count)]));

  const dailySignups: { date: string; count: number }[] = [];
  const dailyCompletions: { date: string; count: number }[] = [];
  for (let i = 13; i >= 0; i--) {
    const dateStr = getDateString(i);
    dailySignups.push({ date: dateStr, count: signupMap.get(dateStr) ?? 0 });
    dailyCompletions.push({ date: dateStr, count: completionDayMap.get(dateStr) ?? 0 });
  }

  // XP distribution
  const xpUsers = await prisma.user.findMany({ select: { xp: true } });
  const xpDistribution = { level1: 0, level2: 0, level3: 0, level4: 0, level5: 0 };
  for (const u of xpUsers) {
    if (u.xp < 100) xpDistribution.level1++;
    else if (u.xp < 300) xpDistribution.level2++;
    else if (u.xp < 600) xpDistribution.level3++;
    else if (u.xp < 1000) xpDistribution.level4++;
    else xpDistribution.level5++;
  }

  return NextResponse.json({
    totalUsers,
    activeToday,
    newUsersThisWeek,
    newUsersToday,
    totalLessonsCompleted,
    avgXP,
    avgStreak,
    maxStreak,
    usersWithStreakOver7,
    streakDistribution,
    topLessons,
    lessonFunnel,
    recentUsers,
    dailySignups,
    dailyCompletions,
    xpDistribution,
  });
}
