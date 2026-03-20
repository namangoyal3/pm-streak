import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const categories = await prisma.category.findMany({
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
  });

  const result = categories.map((cat) => ({
    ...cat,
    lessons: cat.lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      slug: lesson.slug,
      description: lesson.description,
      xpReward: lesson.xpReward,
      difficulty: lesson.difficulty,
      dayNumber: lesson.dayNumber,
      completed: lesson.completedLessons.length > 0,
      isLocked: lesson.isLocked,
      score: lesson.completedLessons[0]?.score ?? null,
    })),
  }));

  return NextResponse.json({ categories: result });
}
