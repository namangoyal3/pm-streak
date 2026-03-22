import { NextRequest, NextResponse } from "next/server";
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

  let totalXP = 0;
  let correctCount = 0;

  if (answers && Array.isArray(answers)) {
    for (const answer of answers) {
      const question = lesson.questions.find((q) => q.id === answer.questionId);
      if (!question) continue;

      const correct = question.correctIndex === answer.selectedIndex;
      if (correct) {
        correctCount++;
        totalXP += question.xpReward;
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

  totalXP += lesson.xpReward;

  // Apply XP boost if active (2× XP, then clear it)
  const userForBoost = await prisma.user.findUnique({
    where: { id: userId },
    select: { xpBoostActive: true },
  });
  const boostApplied = userForBoost?.xpBoostActive ?? false;
  if (boostApplied) {
    totalXP = totalXP * 2;
    await prisma.user.update({ where: { id: userId }, data: { xpBoostActive: false } });
  }

  const existing = await prisma.completedLesson.findUnique({
    where: { userId_lessonId: { userId, lessonId: id } },
  });

  // Award gems only on first completion
  let gemsEarned = 0;
  if (!existing) {
    await prisma.completedLesson.create({
      data: {
        userId,
        lessonId: id,
        score: score ?? correctCount,
        xpEarned: totalXP,
      },
    });

    // +5 gems for completing a lesson
    gemsEarned += 5;

    // +10 bonus gems for a perfect score
    const totalQuestions = lesson.questions.length;
    if (totalQuestions > 0 && correctCount === totalQuestions) {
      gemsEarned += 10;
    }

    if (gemsEarned > 0) {
      await prisma.user.update({
        where: { id: userId },
        data: { gems: { increment: gemsEarned } },
      });
    }
  }

  const streakResult = await recordLessonCompletion(userId, totalXP);
  const totalGemsEarned = gemsEarned + (streakResult.milestoneGems ?? 0);

  if (!lesson.aiGenerated) {
    await maybeGrantProTrial(userId);
  }

  let archiveUnlock = null;

  if (!existing && !lesson.aiGenerated) {
    archiveUnlock = await syncArchiveUnlocksForUser(userId);
  }

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
