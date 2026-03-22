import { prisma } from "./prisma";

const CORE_LESSON_WHERE = { aiGenerated: false } as const;

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

function getSequentialLockState(
  lessons: LessonWithCompletion[],
  lessonIndex: number
) {
  const completed = lessons[lessonIndex].completedLessons.length > 0;
  if (completed || lessonIndex === 0) {
    return {
      isLocked: false,
      lockedReason: null,
      prerequisiteLessonId: null,
      prerequisiteLessonTitle: null,
    };
  }

  const firstIncompletePrior = lessons.find(
    (lesson, index) =>
      index < lessonIndex && lesson.completedLessons.length === 0
  );

  if (!firstIncompletePrior) {
    return {
      isLocked: false,
      lockedReason: null,
      prerequisiteLessonId: null,
      prerequisiteLessonTitle: null,
    };
  }

  return {
    isLocked: true,
    lockedReason: `Complete "${firstIncompletePrior.title}" to unlock this lesson.`,
    prerequisiteLessonId: firstIncompletePrior.id,
    prerequisiteLessonTitle: firstIncompletePrior.title,
  };
}

export function mapCurriculumCategory(
  category: CategoryWithLessons
): CurriculumCategory {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
    icon: category.icon,
    color: category.color,
    sortOrder: category.sortOrder,
    lessons: category.lessons.map((lesson, lessonIndex) => {
      const lockState = getSequentialLockState(category.lessons, lessonIndex);
      return {
        id: lesson.id,
        title: lesson.title,
        slug: lesson.slug,
        description: lesson.description,
        xpReward: lesson.xpReward,
        difficulty: lesson.difficulty,
        dayNumber: lesson.dayNumber,
        completed: lesson.completedLessons.length > 0,
        isLocked: lockState.isLocked,
        score: lesson.completedLessons[0]?.score ?? null,
        lockedReason: lockState.lockedReason,
        prerequisiteLessonId: lockState.prerequisiteLessonId,
        prerequisiteLessonTitle: lockState.prerequisiteLessonTitle,
      };
    }),
  };
}

export async function getCoreCurriculumForUser(userId: string) {
  const categories = await prisma.category.findMany({
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

  return categories
    .map((category) => mapCurriculumCategory(category))
    .filter((category) => category.lessons.length > 0);
}

export async function getCoreLessonAccess(
  lessonId: string,
  userId: string
): Promise<LessonAccess> {
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    select: {
      id: true,
      categoryId: true,
      aiGenerated: true,
      generatedForUserId: true,
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
      lockedReason: canAccess ? null : "This custom lesson belongs to another user.",
      prerequisiteLessonId: null,
      prerequisiteLessonTitle: null,
    };
  }

  const category = await prisma.category.findUnique({
    where: { id: lesson.categoryId },
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

  if (!category) {
    return {
      exists: true,
      canAccess: false,
      isCustomLesson: false,
      isLocked: false,
      lockedReason: null,
      prerequisiteLessonId: null,
      prerequisiteLessonTitle: null,
    };
  }

  const mappedCategory = mapCurriculumCategory(category);
  const mappedLesson = mappedCategory.lessons.find(
    (candidate) => candidate.id === lessonId
  );

  if (!mappedLesson) {
    return {
      exists: true,
      canAccess: false,
      isCustomLesson: false,
      isLocked: false,
      lockedReason: null,
      prerequisiteLessonId: null,
      prerequisiteLessonTitle: null,
    };
  }

  return {
    exists: true,
    canAccess: !mappedLesson.isLocked,
    isCustomLesson: false,
    isLocked: mappedLesson.isLocked,
    lockedReason: mappedLesson.lockedReason,
    prerequisiteLessonId: mappedLesson.prerequisiteLessonId,
    prerequisiteLessonTitle: mappedLesson.prerequisiteLessonTitle,
  };
}

export async function getNextUnlockedCoreLesson(
  categoryId: string,
  userId: string
) {
  const category = await prisma.category.findUnique({
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
  });

  if (!category) return null;

  const mappedCategory = mapCurriculumCategory(category);
  return (
    mappedCategory.lessons.find(
      (lesson) => !lesson.completed && !lesson.isLocked
    ) ?? null
  );
}

export async function getRelatedCoreLessons(
  categoryId: string,
  userId: string,
  excludeLessonIds: string[],
  limit = 3
) {
  const category = await prisma.category.findUnique({
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
  });

  if (!category) return [];

  return mapCurriculumCategory(category).lessons
    .filter((lesson) => !excludeLessonIds.includes(lesson.id))
    .sort((a, b) => {
      if (a.isLocked !== b.isLocked) return a.isLocked ? 1 : -1;
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      return a.dayNumber - b.dayNumber;
    })
    .slice(0, limit);
}

export async function getGeneratedLessonsForUser(userId: string) {
  return prisma.lesson.findMany({
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
      category: {
        select: {
          name: true,
          icon: true,
        },
      },
    },
  });
}

export { CORE_LESSON_WHERE };
