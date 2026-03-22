import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { recordLessonCompletion } from "@/lib/streak";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = await params;
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
  const userForBoost = await prisma.user.findUnique({ where: { id: userId }, select: { xpBoostActive: true, unlockedBatch: true } });
  const boostApplied = userForBoost?.xpBoostActive ?? false;
  const currentBatch = userForBoost?.unlockedBatch ?? 0;
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

  // ── Dynamic lesson unlocking ──
  // Check if user has completed all currently available lessons for their batch
  let newBatchUnlocked = false;
  let newBatchCount = 0;

  if (!existing) {
    // Get all available lesson IDs for this user (non-locked + unlocked batches)
    const allLessons = await prisma.lesson.findMany({
      orderBy: { dayNumber: "asc" },
      select: { id: true, isLocked: true, dayNumber: true },
    });

    const lockedLessons = allLessons.filter((l) => l.isLocked).sort((a, b) => a.dayNumber - b.dayNumber);
    const unlockedLockedIds = new Set(lockedLessons.slice(0, currentBatch * 5).map((l) => l.id));
    const availableIds = allLessons
      .filter((l) => !l.isLocked || unlockedLockedIds.has(l.id))
      .map((l) => l.id);

    // Count how many are completed after this completion
    const completedCount = await prisma.completedLesson.count({
      where: { userId, lessonId: { in: availableIds } },
    });

    // All available lessons are now completed — unlock next batch
    if (completedCount >= availableIds.length) {
      const nextBatchStart = currentBatch * 5;
      const nextBatchLessons = lockedLessons.slice(nextBatchStart, nextBatchStart + 5);

      if (nextBatchLessons.length > 0) {
        await prisma.user.update({
          where: { id: userId },
          data: { unlockedBatch: currentBatch + 1 },
        });
        newBatchUnlocked = true;
        newBatchCount = nextBatchLessons.length;
      }
    }
  }

  return NextResponse.json({
    xpEarned: totalXP,
    correctCount,
    totalQuestions: lesson.questions.length,
    gemsEarned: totalGemsEarned,
    xpBoostApplied: boostApplied,
    newBatchUnlocked,
    newBatchCount,
    ...streakResult,
  });
}
