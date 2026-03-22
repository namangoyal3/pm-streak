import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getCoreCurriculumForUser, getCoreLessonAccess } from "@/lib/lesson-access";

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const today = new Date().toISOString().split("T")[0];

  let challenge = await prisma.dailyChallenge.findUnique({
    where: { userId_date: { userId, date: today } },
    include: {
      lesson: {
        include: {
          category: true,
          questions: { orderBy: { sortOrder: "asc" } },
        },
      },
    },
  });

  if (challenge) {
    const access = await getCoreLessonAccess(challenge.lessonId, userId);
    if (challenge.lesson.aiGenerated || !access.canAccess) {
      await prisma.dailyChallenge.delete({ where: { id: challenge.id } });
      challenge = null;
    }
  }

  if (!challenge) {
    const curriculum = await getCoreCurriculumForUser(userId);
    const availableLessons = curriculum
      .flatMap((category) => category.lessons)
      .filter((lesson) => !lesson.isLocked);

    const uncompletedLessons = availableLessons.filter((lesson) => !lesson.completed);
    const lessonCandidate =
      (uncompletedLessons.length > 0 ? uncompletedLessons : availableLessons)[0];
    const lesson = lessonCandidate
      ? await prisma.lesson.findUnique({ where: { id: lessonCandidate.id } })
      : null;

    if (!lesson) {
      return NextResponse.json({ error: "No lessons available" }, { status: 404 });
    }

    challenge = await prisma.dailyChallenge.create({
      data: { userId, lessonId: lesson.id, date: today },
      include: {
        lesson: {
          include: {
            category: true,
            questions: { orderBy: { sortOrder: "asc" } },
          },
        },
      },
    });
  }

  return NextResponse.json({
    challenge: {
      id: challenge.id,
      date: challenge.date,
      completed: challenge.completed,
      score: challenge.score,
      xpEarned: challenge.xpEarned,
      lesson: {
        ...challenge.lesson,
        questions: challenge.lesson.questions.map((q) => ({
          id: q.id,
          questionText: q.questionText,
          questionType: q.questionType,
          options: JSON.parse(q.options),
          correctIndex: q.correctIndex,
          explanation: q.explanation,
          xpReward: q.xpReward,
        })),
      },
    },
  });
}

export async function POST(req: Request) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { challengeId, score, xpEarned } = await req.json();

  await prisma.dailyChallenge.update({
    where: { id: challengeId },
    data: {
      completed: true,
      score,
      xpEarned,
      completedAt: new Date(),
    },
  });

  return NextResponse.json({ ok: true });
}
