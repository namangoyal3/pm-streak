import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { checkAndUpdateStreak } from "@/lib/streak";
import { getToday } from "@/lib/utils";
import {
  CORE_LESSON_WHERE,
  getArchiveUnlockProgressForUser,
  getCoreCurriculumForUser,
  syncArchiveUnlocksForUser,
} from "@/lib/lesson-access";
import { prisma } from "@/lib/prisma";
import {
  catalogEpisodesNotYetImported,
  LENNY_ARCHIVE_CATEGORY_SLUG,
  LENNY_PODCAST_CATALOG_EPISODES,
} from "@/lib/lenny-catalog";

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const streakInfo = await checkAndUpdateStreak(userId);

  // Catch up archive unlocks if the user already completed all playable lessons
  // (e.g. unlock logic shipped after they finished the curriculum).
  await syncArchiveUnlocksForUser(userId);

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
      dailyGoal: true,
      learningGoal: true,
    },
  });

  const today = getToday();
  const [curriculum, completedToday, archiveUnlockProgress, coreLessonCount] =
    await Promise.all([
      getCoreCurriculumForUser(userId),
      prisma.completedLesson.count({
        where: {
          userId,
          completedAt: { gte: new Date(today) },
          lesson: { is: CORE_LESSON_WHERE },
        },
      }),
      getArchiveUnlockProgressForUser(userId),
      prisma.lesson.count({
        where: {
          ...CORE_LESSON_WHERE,
          category: { slug: LENNY_ARCHIVE_CATEGORY_SLUG },
        },
      }),
    ]);
  const visibleLessons = curriculum.flatMap((category) => category.lessons);
  const completedCount = visibleLessons.filter((lesson) => lesson.completed).length;
  const totalLessons = visibleLessons.length;
  const totalArchive = LENNY_PODCAST_CATALOG_EPISODES;
  const episodesNotYetImported = catalogEpisodesNotYetImported(coreLessonCount);

  // Build last-30-days using the app timezone (IST) so dates align with streakDay records.
  const APP_TIMEZONE = process.env.NEXT_PUBLIC_APP_TIMEZONE || "Asia/Kolkata";
  const last30Days: string[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: APP_TIMEZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(d);
    const year = parts.find((p) => p.type === "year")?.value ?? "0000";
    const month = parts.find((p) => p.type === "month")?.value ?? "01";
    const day = parts.find((p) => p.type === "day")?.value ?? "01";
    last30Days.push(`${year}-${month}-${day}`);
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

  // Path progress calculation
  const LEARNING_GOAL_CONFIG: Record<string, { label: string; icon: string }> = {
    breaking_in: { label: "Breaking into PM", icon: "🚀" },
    interview_prep: { label: "PM Interview Prep", icon: "💼" },
    staying_sharp: { label: "Staying Sharp", icon: "🧠" },
    lead_strategy: { label: "Lead & Strategy", icon: "👑" },
  };

  const goalKey = user?.learningGoal ?? "staying_sharp";
  const goalConfig = LEARNING_GOAL_CONFIG[goalKey] ?? LEARNING_GOAL_CONFIG["staying_sharp"];

  const pathProgress = {
    goalKey,
    goalLabel: goalConfig.label,
    goalIcon: goalConfig.icon,
    completedCount,
    totalLessons,
    progressPct: totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0,
  };

  return NextResponse.json({
    user,
    streak: streakInfo,
    completedCount,
    totalLessons,
    completedToday: completedToday > 0,
    totalArchive,
    coreLessonCount,
    episodesNotYetImported,
    archiveUnlockProgress,
    calendar,
    pathProgress,
    hasExplicitGoal: user?.learningGoal !== null,
  });
}
