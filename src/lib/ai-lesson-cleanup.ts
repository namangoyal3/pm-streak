import { PrismaClient } from "@prisma/client";
import { isGenericLessonContent, isWeakQuestionSet } from "./lesson-quality";

export type CleanupPreview = {
  scannedLessons: number;
  weakLessonsFound: number;
  affectedUsers: number;
  weakLessonIds: string[];
  sampleTitles: string[];
  regenerationCandidates: Array<{
    userId: string;
    topic: string;
    generationMode: "explore" | "deep_dive";
    sourceLessonId: string | null;
    count: number;
  }>;
};

export type CleanupApplied = {
  deletedLessons: number;
  deletedQuestions: number;
  deletedQuizAttempts: number;
  deletedCompletions: number;
  deletedDailyChallenges: number;
};

function parseOptions(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function extractTopicFromTitle(title: string): string {
  return title.replace(/\s+—\s+(Custom Lesson|Deeper Dive)$/i, "").trim();
}

export async function previewWeakAiLessons(prisma: PrismaClient): Promise<CleanupPreview> {
  const aiLessons = await prisma.lesson.findMany({
    where: { aiGenerated: true },
    select: {
      id: true,
      title: true,
      generatedForUserId: true,
      generationMode: true,
      sourceLessonId: true,
      content: true,
      createdAt: true,
      questions: {
        orderBy: { sortOrder: "asc" },
        select: {
          questionText: true,
          explanation: true,
          options: true,
        },
      },
    },
  });

  const weakLessonIds: string[] = [];
  const sampleTitles: string[] = [];
  const affectedUsers = new Set<string>();
  const candidateCounts = new Map<string, number>();
  const candidateMeta = new Map<
    string,
    {
      userId: string;
      topic: string;
      generationMode: "explore" | "deep_dive";
      sourceLessonId: string | null;
    }
  >();

  for (const lesson of aiLessons) {
    const normalizedQuestions = lesson.questions.map((q) => ({
      questionText: q.questionText,
      explanation: q.explanation,
      options: parseOptions(q.options),
    }));
    const weak =
      isGenericLessonContent(lesson.content) || isWeakQuestionSet(normalizedQuestions);
    if (!weak) continue;

    weakLessonIds.push(lesson.id);
    if (lesson.generatedForUserId) affectedUsers.add(lesson.generatedForUserId);
    if (sampleTitles.length < 12) {
      sampleTitles.push(`${lesson.title} (${lesson.createdAt.toISOString().slice(0, 10)})`);
    }

    if (lesson.generatedForUserId) {
      const topic = extractTopicFromTitle(lesson.title);
      const generationMode =
        lesson.generationMode === "deep_dive" ? "deep_dive" : "explore";
      const sourceLessonId = lesson.sourceLessonId ?? null;
      const key = `${lesson.generatedForUserId}::${topic.toLowerCase()}::${generationMode}::${sourceLessonId ?? "none"}`;
      candidateCounts.set(key, (candidateCounts.get(key) ?? 0) + 1);
      if (!candidateMeta.has(key)) {
        candidateMeta.set(key, {
          userId: lesson.generatedForUserId,
          topic,
          generationMode,
          sourceLessonId,
        });
      }
    }
  }

  const regenerationCandidates = [...candidateCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([key, count]) => {
      const meta = candidateMeta.get(key)!;
      return { ...meta, count };
    });

  return {
    scannedLessons: aiLessons.length,
    weakLessonsFound: weakLessonIds.length,
    affectedUsers: affectedUsers.size,
    weakLessonIds,
    sampleTitles,
    regenerationCandidates,
  };
}

export async function applyWeakAiLessonCleanup(
  prisma: PrismaClient,
  weakLessonIds: string[]
): Promise<CleanupApplied> {
  if (weakLessonIds.length === 0) {
    return {
      deletedLessons: 0,
      deletedQuestions: 0,
      deletedQuizAttempts: 0,
      deletedCompletions: 0,
      deletedDailyChallenges: 0,
    };
  }

  const result = await prisma.$transaction(async (tx) => {
    const deletedQuizAttempts = await tx.quizAttempt.deleteMany({
      where: { question: { lessonId: { in: weakLessonIds } } },
    });
    const deletedCompletions = await tx.completedLesson.deleteMany({
      where: { lessonId: { in: weakLessonIds } },
    });
    const deletedDailyChallenges = await tx.dailyChallenge.deleteMany({
      where: { lessonId: { in: weakLessonIds } },
    });
    const deletedQuestions = await tx.question.deleteMany({
      where: { lessonId: { in: weakLessonIds } },
    });
    const deletedLessons = await tx.lesson.deleteMany({
      where: { id: { in: weakLessonIds } },
    });

    return {
      deletedLessons: deletedLessons.count,
      deletedQuestions: deletedQuestions.count,
      deletedQuizAttempts: deletedQuizAttempts.count,
      deletedCompletions: deletedCompletions.count,
      deletedDailyChallenges: deletedDailyChallenges.count,
    };
  });

  return result;
}
