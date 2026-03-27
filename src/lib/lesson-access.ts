import { prisma } from "./prisma";
import { isGenericLessonContent, isWeakQuestionSet } from "./lesson-quality";
import { spendCredits, CREDIT_COSTS } from "./credits";
import { isUserPro } from "./entitlements";

const CORE_LESSON_WHERE = { aiGenerated: false } as const;
const ARCHIVE_UNLOCK_BATCH_SIZE = 5;
const MIN_OPEN_ARCHIVE_WINDOW = 10;
const ARCHIVE_LOCKED_REASON =
  "Complete all currently available lessons to unlock the next podcast batch.";

type CompletedLessonSummary = {
  score: number;
  xpEarned: number;
};

type LessonWithCompletion = {
  id: string;
  title: string;
  slug: string;
  description: string;
  xpReward: number;
  difficulty: number;
  dayNumber: number;
  isLocked: boolean;
  completedLessons: CompletedLessonSummary[];
};

type CategoryWithLessons = {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  sortOrder: number;
  lessons: LessonWithCompletion[];
};

type ArchiveVisibility = {
  lockedLessons: Array<Pick<LessonWithCompletion, "id" | "title" | "dayNumber">>;
  unlockedLockedIds: Set<string>;
  previewIds: Set<string>;
  proLockedIds: Set<string>;
};

export type CurriculumLesson = {
  id: string;
  title: string;
  slug: string;
  description: string;
  xpReward: number;
  difficulty: number;
  dayNumber: number;
  completed: boolean;
  isLocked: boolean;
  score: number | null;
  lockedReason: string | null;
  prerequisiteLessonId: string | null;
  prerequisiteLessonTitle: string | null;
};

export type CurriculumCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  sortOrder: number;
  lessons: CurriculumLesson[];
  /** Number of lessons hidden behind the pro gate (free users only; 0 for pro). */
  proGatedCount: number;
};

export type LessonAccess = {
  exists: boolean;
  canAccess: boolean;
  isCustomLesson: boolean;
  isLocked: boolean;
  lockedReason: string | null;
  prerequisiteLessonId: string | null;
  prerequisiteLessonTitle: string | null;
};

export type ArchiveUnlockResult = {
  count: number;
  lessons: Array<{ id: string; title: string }>;
} | null;

/** Progress toward unlocking the next podcast batch (core curriculum only). */
export type ArchiveUnlockProgress = {
  unlockedBatchCount: number;
  batchSize: number;
  availableLessonTotal: number;
  completedAvailable: number;
  remainingToNextUnlock: number;
  hasLockedArchiveRemaining: boolean;
};

function sortLessonsByDayNumber<T extends { dayNumber: number }>(a: T, b: T) {
  return a.dayNumber - b.dayNumber;
}

// Lessons beyond the preview batch shown as "upgrade to pro" teasers
const PRO_PREVIEW_WINDOW = 5;
/** Lesson lockedReason value indicating pro-gate (UI renders upgrade CTA). */
export const PRO_GATE_REASON = "UPGRADE_TO_PRO";
/** Free users see this many lessons per category; the rest are pro-gated. */
const FREE_LESSONS_PER_CATEGORY = 5;
/**
 * These categories are entirely premium for free users (show 0 free lessons,
 * full pro-gate card regardless of how many lessons they contain).
 *
 * We gate any `pm-leader-*` category by default so newly added PM leaders
 * automatically appear as paid content without requiring code updates.
 */
const FULLY_PREMIUM_CATEGORY_SLUG_PREFIXES = ["pm-leader-"] as const;
const FULLY_PREMIUM_CATEGORY_SLUGS = new Set<string>();

function isFullyPremiumCategorySlug(slug: string): boolean {
  return (
    FULLY_PREMIUM_CATEGORY_SLUGS.has(slug) ||
    FULLY_PREMIUM_CATEGORY_SLUG_PREFIXES.some((prefix) =>
      slug.startsWith(prefix)
    )
  );
}

function getArchiveVisibility(
  lessons: Pick<LessonWithCompletion, "id" | "title" | "dayNumber" | "isLocked">[],
  unlockedBatch: number,
  isPro = false
): ArchiveVisibility {
  const lockedLessons = lessons
    .filter((lesson) => lesson.isLocked)
    .sort(sortLessonsByDayNumber);

  if (isPro) {
    // Pro users: all locked lessons are unlocked
    return {
      lockedLessons,
      unlockedLockedIds: new Set(lockedLessons.map((lesson) => lesson.id)),
      previewIds: new Set(),
      proLockedIds: new Set(),
    };
  }

  // Keep a steady "few lessons open" feel even when a user is early in progression.
  const unlockedCount = Math.max(
    unlockedBatch * ARCHIVE_UNLOCK_BATCH_SIZE,
    MIN_OPEN_ARCHIVE_WINDOW
  );

  return {
    lockedLessons,
    unlockedLockedIds: new Set(
      lockedLessons.slice(0, unlockedCount).map((lesson) => lesson.id)
    ),
    previewIds: new Set(
      lockedLessons
        .slice(unlockedCount, unlockedCount + ARCHIVE_UNLOCK_BATCH_SIZE)
        .map((lesson) => lesson.id)
    ),
    proLockedIds: new Set(
      lockedLessons
        .slice(
          unlockedCount + ARCHIVE_UNLOCK_BATCH_SIZE,
          unlockedCount + ARCHIVE_UNLOCK_BATCH_SIZE + PRO_PREVIEW_WINDOW
        )
        .map((lesson) => lesson.id)
    ),
  };
}

function mapCurriculumCategory(
  category: CategoryWithLessons,
  visibility: ArchiveVisibility,
  isPro: boolean
): CurriculumCategory {
  const sortedLessons = [...category.lessons].sort(sortLessonsByDayNumber);

  // Free-tier enforcement: cap visible lessons per category regardless of DB isLocked.
  // Pro users always see every lesson. Fully premium categories (e.g. thought-leader
  // specific categories) show 0 free lessons regardless of total count.
  const isFullyPremium = !isPro && isFullyPremiumCategorySlug(category.slug);
  const freeLimit = isPro ? sortedLessons.length : isFullyPremium ? 0 : FREE_LESSONS_PER_CATEGORY;
  const freeLessons = sortedLessons.slice(0, freeLimit);
  const proGatedCount = Math.max(0, sortedLessons.length - freeLimit);

  const mappedLessons = freeLessons
    .filter(
      (lesson) =>
        !lesson.isLocked ||
        visibility.unlockedLockedIds.has(lesson.id) ||
        visibility.previewIds.has(lesson.id) ||
        visibility.proLockedIds.has(lesson.id)
    )
    .map((lesson) => {
      const isAccessible = visibility.unlockedLockedIds.has(lesson.id);
      const isProLocked = lesson.isLocked && visibility.proLockedIds.has(lesson.id);
      const isLocked = lesson.isLocked && !isAccessible;

      let lockedReason: string | null = null;
      if (isProLocked) {
        lockedReason = PRO_GATE_REASON;
      } else if (isLocked) {
        lockedReason = ARCHIVE_LOCKED_REASON;
      }

      return {
        id: lesson.id,
        title: lesson.title,
        slug: lesson.slug,
        description: lesson.description,
        xpReward: lesson.xpReward,
        difficulty: lesson.difficulty,
        dayNumber: lesson.dayNumber,
        completed: lesson.completedLessons.length > 0,
        isLocked,
        score: lesson.completedLessons[0]?.score ?? null,
        lockedReason,
        prerequisiteLessonId: null,
        prerequisiteLessonTitle: null,
      };
    });

  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
    icon: category.icon,
    color: category.color,
    sortOrder: category.sortOrder,
    lessons: mappedLessons,
    proGatedCount,
  };
}

async function getUserUnlockedBatch(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { unlockedBatch: true },
  });

  return user?.unlockedBatch ?? 0;
}

async function getCoreCategoriesWithCompletion(userId: string) {
  return prisma.category.findMany({
    where: {
      lessons: {
        some: CORE_LESSON_WHERE,
      },
    },
    orderBy: { sortOrder: "asc" },
    include: {
      lessons: {
        where: CORE_LESSON_WHERE,
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
}

export async function getCoreCurriculumForUser(userId: string) {
  const [unlockedBatch, categories, isPro] = await Promise.all([
    getUserUnlockedBatch(userId),
    getCoreCategoriesWithCompletion(userId),
    isUserPro(userId),
  ]);

  const visibility = getArchiveVisibility(
    categories.flatMap((category) => category.lessons),
    unlockedBatch,
    isPro
  );

  return categories
    .map((category) => mapCurriculumCategory(category, visibility, isPro))
    .filter((category) => category.lessons.length > 0 || category.proGatedCount > 0);
}

export async function getCoreLessonAccess(
  lessonId: string,
  userId: string
): Promise<LessonAccess> {
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    select: {
      id: true,
      aiGenerated: true,
      generatedForUserId: true,
      isLocked: true,
    },
  });

  if (!lesson) {
    return {
      exists: false,
      canAccess: false,
      isCustomLesson: false,
      isLocked: false,
      lockedReason: null,
      prerequisiteLessonId: null,
      prerequisiteLessonTitle: null,
    };
  }

  if (lesson.aiGenerated) {
    const canAccess = lesson.generatedForUserId === userId;

    return {
      exists: true,
      canAccess,
      isCustomLesson: true,
      isLocked: false,
      lockedReason: canAccess
        ? null
        : "This custom lesson belongs to another user.",
      prerequisiteLessonId: null,
      prerequisiteLessonTitle: null,
    };
  }

  if (!lesson.isLocked) {
    return {
      exists: true,
      canAccess: true,
      isCustomLesson: false,
      isLocked: false,
      lockedReason: null,
      prerequisiteLessonId: null,
      prerequisiteLessonTitle: null,
    };
  }

  // Pro users can access any archive lesson regardless of batch unlock
  const userIsPro = await isUserPro(userId);
  if (userIsPro) {
    return {
      exists: true,
      canAccess: true,
      isCustomLesson: false,
      isLocked: false,
      lockedReason: null,
      prerequisiteLessonId: null,
      prerequisiteLessonTitle: null,
    };
  }

  const [unlockedBatch, coreLessons] = await Promise.all([
    getUserUnlockedBatch(userId),
    prisma.lesson.findMany({
      where: CORE_LESSON_WHERE,
      select: {
        id: true,
        title: true,
        dayNumber: true,
        isLocked: true,
      },
      orderBy: { dayNumber: "asc" },
    }),
  ]);

  const visibility = getArchiveVisibility(coreLessons, unlockedBatch);
  const canAccess = visibility.unlockedLockedIds.has(lessonId);

  return {
    exists: true,
    canAccess,
    isCustomLesson: false,
    isLocked: !canAccess,
    lockedReason: canAccess ? null : ARCHIVE_LOCKED_REASON,
    prerequisiteLessonId: null,
    prerequisiteLessonTitle: null,
  };
}

export async function getRelatedCoreLessons(
  categoryId: string,
  userId: string,
  excludeLessonIds: string[],
  limit = 3
) {
  const [unlockedBatch, allCoreLessons, category] = await Promise.all([
    getUserUnlockedBatch(userId),
    prisma.lesson.findMany({
      where: CORE_LESSON_WHERE,
      select: {
        id: true,
        title: true,
        dayNumber: true,
        isLocked: true,
      },
      orderBy: { dayNumber: "asc" },
    }),
    prisma.category.findUnique({
      where: { id: categoryId },
      include: {
        lessons: {
          where: CORE_LESSON_WHERE,
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

  if (!category) return [];

  const visibility = getArchiveVisibility(allCoreLessons, unlockedBatch);

  return mapCurriculumCategory(category, visibility, false).lessons
    .filter((lesson) => !excludeLessonIds.includes(lesson.id))
    .sort((a, b) => {
      if (a.isLocked !== b.isLocked) return a.isLocked ? 1 : -1;
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      return a.dayNumber - b.dayNumber;
    })
    .slice(0, limit);
}

export async function getArchiveUnlockProgressForUser(
  userId: string
): Promise<ArchiveUnlockProgress> {
  const [unlockedBatch, lessons] = await Promise.all([
    getUserUnlockedBatch(userId),
    prisma.lesson.findMany({
      where: CORE_LESSON_WHERE,
      select: {
        id: true,
        title: true,
        dayNumber: true,
        isLocked: true,
      },
      orderBy: { dayNumber: "asc" },
    }),
  ]);

  const visibility = getArchiveVisibility(lessons, unlockedBatch);
  // Only count the currently-unlocked archive window — not the whole core curriculum.
  const availableLessonIds = lessons
    .filter((lesson) => visibility.unlockedLockedIds.has(lesson.id))
    .map((lesson) => lesson.id);

  const completedAvailable =
    availableLessonIds.length === 0
      ? 0
      : await prisma.completedLesson.count({
          where: {
            userId,
            lessonId: { in: availableLessonIds },
          },
        });

  const remainingToNextUnlock = Math.max(
    0,
    availableLessonIds.length - completedAvailable
  );

  const hasLockedArchiveRemaining =
    visibility.lockedLessons.length >
    unlockedBatch * ARCHIVE_UNLOCK_BATCH_SIZE;

  return {
    unlockedBatchCount: unlockedBatch,
    batchSize: ARCHIVE_UNLOCK_BATCH_SIZE,
    availableLessonTotal: availableLessonIds.length,
    completedAvailable,
    remainingToNextUnlock,
    hasLockedArchiveRemaining,
  };
}

/**
 * Unlocks as many archive batches as the user has earned (e.g. after completing
 * all available lessons while the unlock feature was off, or after importing data).
 * Returns a merged result for UI toasts.
 */
export async function syncArchiveUnlocksForUser(
  userId: string
): Promise<ArchiveUnlockResult> {
  const merged: { count: number; lessons: Array<{ id: string; title: string }> } =
    { count: 0, lessons: [] };
  let safety = 0;
  while (safety++ < 200) {
    const batch = await unlockNextArchiveBatchIfReady(userId);
    if (!batch) break;
    merged.count += batch.count;
    merged.lessons.push(...batch.lessons);
  }
  if (merged.count === 0) return null;
  return { count: merged.count, lessons: merged.lessons };
}

export async function unlockNextArchiveBatchIfReady(
  userId: string
): Promise<ArchiveUnlockResult> {
  const [unlockedBatch, lessons] = await Promise.all([
    getUserUnlockedBatch(userId),
    prisma.lesson.findMany({
      where: CORE_LESSON_WHERE,
      select: {
        id: true,
        title: true,
        dayNumber: true,
        isLocked: true,
      },
      orderBy: { dayNumber: "asc" },
    }),
  ]);

  const visibility = getArchiveVisibility(lessons, unlockedBatch);
  // Only require completion of the currently-unlocked archive batch — not the whole core curriculum.
  const availableLessonIds = lessons
    .filter((lesson) => visibility.unlockedLockedIds.has(lesson.id))
    .map((lesson) => lesson.id);

  if (availableLessonIds.length === 0) {
    return null;
  }

  const completedCount = await prisma.completedLesson.count({
    where: {
      userId,
      lessonId: { in: availableLessonIds },
    },
  });

  if (completedCount < availableLessonIds.length) {
    return null;
  }

  const nextBatchStart = unlockedBatch * ARCHIVE_UNLOCK_BATCH_SIZE;
  const nextBatchLessons = visibility.lockedLessons.slice(
    nextBatchStart,
    nextBatchStart + ARCHIVE_UNLOCK_BATCH_SIZE
  );

  if (nextBatchLessons.length === 0) {
    return null;
  }

  // Credit gate: pro users get batches for free; free users spend 5 credits
  const pro = await isUserPro(userId);
  if (!pro) {
    const ok = await spendCredits(userId, CREDIT_COSTS.lesson_unlock, "lesson_unlock");
    if (!ok) return null; // insufficient credits — caller can detect by checking credits balance
  }

  await prisma.user.update({
    where: { id: userId },
    data: { unlockedBatch: unlockedBatch + 1 },
  });

  return {
    count: nextBatchLessons.length,
    lessons: nextBatchLessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
    })),
  };
}

export async function getGeneratedLessonsForUser(userId: string) {
  const lessons = await prisma.lesson.findMany({
    where: {
      aiGenerated: true,
      generatedForUserId: userId,
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      description: true,
      xpReward: true,
      guestName: true,
      episodeTitle: true,
      createdAt: true,
      generationMode: true,
      topicKey: true,
      content: true,
      questions: {
        orderBy: { sortOrder: "asc" },
        select: {
          questionText: true,
          options: true,
        },
      },
      category: {
        select: {
          name: true,
          icon: true,
        },
      },
    },
  });

  return lessons
    .filter((lesson) => {
      try {
        if (isGenericLessonContent(lesson.content)) return false;
        const questionSet = lesson.questions.map((q) => ({
          questionText: q.questionText,
          options: JSON.parse(q.options) as string[],
        }));
        return !isWeakQuestionSet(questionSet);
      } catch {
        return false;
      }
    })
    .map(({ questions: _questions, content: _content, ...lesson }) => lesson);
}

export { ARCHIVE_UNLOCK_BATCH_SIZE, ARCHIVE_LOCKED_REASON, CORE_LESSON_WHERE };
