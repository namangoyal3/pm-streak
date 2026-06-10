import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { recordLessonCompletion } from "@/lib/streak";
import {
  getCoreLessonAccess,
  syncArchiveUnlocksForUser,
} from "@/lib/lesson-access";
import { maybeGrantProTrial } from "@/lib/billing/trial";

export async function POST(
  req: NextRequest,
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

  const { score, answers } = await req.json();

  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: { questions: true },
  });

  if (!lesson) {
    return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
  }

  let correctCount = 0;

  if (answers && Array.isArray(answers)) {
    for (const answer of answers) {
      const question = lesson.questions.find((q) => q.id === answer.questionId);
      if (!question) continue;

      const correct = question.correctIndex === answer.selectedIndex;
      if (correct) {
        correctCount++;
      }

      await prisma.quizAttempt.create({
        data: {
          userId,
          questionId: question.id,
          selectedIndex: answer.selectedIndex,
          correct,
          xpEarned: correct ? question.xpReward : 0,
        },
      });
    }
  }

  const existing = await prisma.completedLesson.findUnique({
    where: { userId_lessonId: { userId, lessonId: id } },
  });

  // On re-submit return early with zeros — no XP, no gems, no level change
  if (existing) {
    return NextResponse.json({
      xpEarned: 0,
      correctCount,
      totalQuestions: lesson.questions.length,
      gemsEarned: 0,
      xpBoostApplied: false,
      newBatchUnlocked: false,
      newBatchCount: 0,
      unlockedLessons: [],
      newStreak: null,
      newXP: null,
      newLevel: null,
      perfectStreak: null,
      milestone: null,
      milestoneGems: 0,
    });
  }

  // First completion — calculate XP (with optional boost), award gems, update streak
  let totalXP = lesson.xpReward;
  if (answers && Array.isArray(answers)) {
    for (const answer of answers) {
      const question = lesson.questions.find((q) => q.id === answer.questionId);
      if (question && question.correctIndex === answer.selectedIndex) {
        totalXP += question.xpReward;
      }
    }
  }

  // Apply XP boost if active (2× XP, then clear it)
  const userForBoost = await prisma.user.findUnique({
    where: { id: userId },
    select: { xpBoostActive: true },
  });
  const boostApplied = userForBoost?.xpBoostActive ?? false;
  if (boostApplied) {
    totalXP = totalXP * 2;
  }

  // +5 gems for completing a lesson
  let gemsEarned = 5;

  // +10 bonus gems for a perfect score
  const totalQuestions = lesson.questions.length;
  if (totalQuestions > 0 && correctCount === totalQuestions) {
    gemsEarned += 10;
  }

  // Wrap the core completion writes in a transaction so a mid-failure doesn't
  // leave partial state (e.g. completedLesson created but gems not awarded).
  // NOTE: recordLessonCompletion, maybeGrantProTrial, and syncArchiveUnlocksForUser
  // manage their own db operations; they cannot accept a tx client without
  // broader refactoring, so they run outside this transaction.
  try {
    await prisma.$transaction(async (tx) => {
      await tx.completedLesson.create({
        data: {
          userId,
          lessonId: id,
          score: score ?? correctCount,
          xpEarned: totalXP,
        },
      });

      if (boostApplied) {
        await tx.user.update({ where: { id: userId }, data: { xpBoostActive: false } });
      }

      await tx.user.update({
        where: { id: userId },
        data: { gems: { increment: gemsEarned } },
      });
    });
  } catch (err) {
    // P2002 = unique constraint violation on userId_lessonId: already completed in a race
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return NextResponse.json({
        xpEarned: 0,
        correctCount,
        totalQuestions: lesson.questions.length,
        gemsEarned: 0,
        xpBoostApplied: false,
        newBatchUnlocked: false,
        newBatchCount: 0,
        unlockedLessons: [],
        newStreak: null,
        newXP: null,
        newLevel: null,
        perfectStreak: null,
        milestone: null,
        milestoneGems: 0,
      });
    }
    throw err;
  }

  const streakResult = await recordLessonCompletion(userId, totalXP);
  const totalGemsEarned = gemsEarned + (streakResult.milestoneGems ?? 0);

  if (!lesson.aiGenerated) {
    await maybeGrantProTrial(userId);
  }

  const archiveUnlock = !lesson.aiGenerated
    ? await syncArchiveUnlocksForUser(userId)
    : null;

  return NextResponse.json({
    xpEarned: totalXP,
    correctCount,
    totalQuestions: lesson.questions.length,
    gemsEarned: totalGemsEarned,
    xpBoostApplied: boostApplied,
    newBatchUnlocked: Boolean(archiveUnlock),
    newBatchCount: archiveUnlock?.count ?? 0,
    unlockedLessons: archiveUnlock?.lessons ?? [],
    ...streakResult,
  });
}
