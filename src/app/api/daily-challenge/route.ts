import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getCoreCurriculumForUser, getCoreLessonAccess } from "@/lib/lesson-access";
import { getToday } from "@/lib/utils";

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const today = getToday();

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

    let lessonCandidate: (typeof availableLessons)[0] | undefined;
    if (uncompletedLessons.length > 0) {
      lessonCandidate = uncompletedLessons[0];
    } else {
      // All lessons completed — pick the one least recently completed so we cycle
      const availableIds = availableLessons.map((l) => l.id);
      const lastCompleted = await prisma.completedLesson.findMany({
        where: { userId, lessonId: { in: availableIds } },
        orderBy: { completedAt: "asc" },
        select: { lessonId: true },
        take: 1,
      });
      const leastRecentId = lastCompleted[0]?.lessonId ?? availableIds[0];
      lessonCandidate = availableLessons.find((l) => l.id === leastRecentId) ?? availableLessons[0];
    }

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

  const challenge = await prisma.dailyChallenge.findUnique({
    where: { id: challengeId },
    select: { userId: true },
  });

  if (!challenge || challenge.userId !== userId) {
    return NextResponse.json({ error: "Challenge not found" }, { status: 404 });
  }

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
