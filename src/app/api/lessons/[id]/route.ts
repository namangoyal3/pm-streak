import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  getCoreLessonAccess,
  getRelatedCoreLessons,
} from "@/lib/lesson-access";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = await params;
  const access = await getCoreLessonAccess(id, userId);

  if (!access.exists) {
    return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
  }

  if (!access.canAccess) {
    return NextResponse.json(
      { error: access.lockedReason ?? "Lesson is not available" },
      { status: 403 }
    );
  }

  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: {
      category: true,
      questions: { orderBy: { sortOrder: "asc" } },
      completedLessons: {
        where: { userId },
        select: { score: true, xpEarned: true },
      },
    },
  });

  if (!lesson) {
    return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
  }

  const sourceLesson =
    lesson.aiGenerated && lesson.sourceLessonId
      ? await prisma.lesson.findUnique({
          where: { id: lesson.sourceLessonId },
          select: { id: true, categoryId: true, title: true },
        })
      : null;

  const relatedLessons =
    !lesson.aiGenerated || sourceLesson
      ? await getRelatedCoreLessons(
          sourceLesson?.categoryId ?? lesson.categoryId,
          userId,
          [lesson.id, sourceLesson?.id ?? ""].filter(Boolean)
        )
      : [];

  const goDeeperSourceLessonId = sourceLesson?.id ?? lesson.id;
  const goDeeperTopic = lesson.title.replace(/\s+—\s+(Custom Lesson|Deeper Dive)$/, "");

  return NextResponse.json({
    lesson: {
      ...lesson,
      aiGenerated: lesson.aiGenerated,
      sourceTranscript: lesson.sourceTranscript,
      goDeeperTopic,
      goDeeperSourceLessonId,
      relatedLessons,
      lockedReason: access.lockedReason,
      completed: lesson.completedLessons.length > 0,
      previousScore: lesson.completedLessons[0]?.score ?? null,
      questions: lesson.questions.map((q) => ({
        id: q.id,
        questionText: q.questionText,
        questionType: q.questionType,
        options: JSON.parse(q.options),
        correctIndex: q.correctIndex,
        explanation: q.explanation,
        xpReward: q.xpReward,
      })),
    },
  });
}
