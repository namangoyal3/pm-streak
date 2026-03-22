import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const [user, categories] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId }, select: { unlockedBatch: true } }),
    prisma.category.findMany({
      orderBy: { sortOrder: "asc" },
      include: {
        lessons: {
          orderBy: { dayNumber: "asc" },
          include: {
            completedLessons: {
              where: { userId },
              select: { score: true, xpEarned: true },
            },
          },
        },
      },
    }),
  ]);

  const unlockedBatch = user?.unlockedBatch ?? 0;

  // Gather locked lessons sorted by dayNumber to determine which batches are unlocked
  const allLockedLessons = categories
    .flatMap((c) => c.lessons.filter((l) => l.isLocked))
    .sort((a, b) => a.dayNumber - b.dayNumber);

  // First unlockedBatch * 5 locked lessons are treated as unlocked for this user
  const unlockedLockedIds = new Set(
    allLockedLessons.slice(0, unlockedBatch * 5).map((l) => l.id)
  );

  // Next 5 (preview batch) are shown as locked previews
  const previewIds = new Set(
    allLockedLessons
      .slice(unlockedBatch * 5, unlockedBatch * 5 + 5)
      .map((l) => l.id)
  );

  const result = categories.map((cat) => ({
    ...cat,
    lessons: cat.lessons
      .filter((lesson) => !lesson.isLocked || unlockedLockedIds.has(lesson.id) || previewIds.has(lesson.id))
      .map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        slug: lesson.slug,
        description: lesson.description,
        xpReward: lesson.xpReward,
        difficulty: lesson.difficulty,
        dayNumber: lesson.dayNumber,
        completed: lesson.completedLessons.length > 0,
        isLocked: lesson.isLocked && !unlockedLockedIds.has(lesson.id),
        score: lesson.completedLessons[0]?.score ?? null,
      })),
  })).filter((cat) => cat.lessons.length > 0);

  return NextResponse.json({ categories: result, unlockedBatch });
}
