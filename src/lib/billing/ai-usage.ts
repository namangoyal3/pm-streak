import { prisma } from "@/lib/prisma";

const FREE_AI_LESSONS_PER_MONTH = 5;
const SOFT_THRESHOLD = 3;
const HARD_THRESHOLD = 5;

export type AiLessonGate =
  | { allowed: true; softPaywall: boolean; usedThisMonth: number; limit: number }
  | {
      allowed: false;
      softPaywall: boolean;
      hardPaywall: boolean;
      usedThisMonth: number;
      limit: number;
      reason: string;
    };

function startOfUtcMonth(d: Date): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1, 0, 0, 0, 0));
}

export async function countAiLessonsThisMonth(userId: string): Promise<number> {
  const from = startOfUtcMonth(new Date());
  return prisma.lesson.count({
    where: {
      aiGenerated: true,
      generatedForUserId: userId,
      createdAt: { gte: from },
    },
  });
}

/**
 * Free tier: 5 AI lessons / month. Soft messaging after 3; hard block after 5.
 * Pro / active trial: unlimited.
 */
export async function evaluateAiLessonGate(
  userId: string,
  isPro: boolean
): Promise<AiLessonGate> {
  if (isPro) {
    const used = await countAiLessonsThisMonth(userId);
    return {
      allowed: true,
      softPaywall: false,
      usedThisMonth: used,
      limit: Infinity,
    };
  }

  const used = await countAiLessonsThisMonth(userId);
  if (used >= HARD_THRESHOLD) {
    return {
      allowed: false,
      softPaywall: true,
      hardPaywall: true,
      usedThisMonth: used,
      limit: FREE_AI_LESSONS_PER_MONTH,
      reason:
        "You've used this month's free AI lessons. Upgrade to PM Streak Pro for unlimited Explore & Go Deeper.",
    };
  }

  const softPaywall = used >= SOFT_THRESHOLD;
  return {
    allowed: true,
    softPaywall,
    usedThisMonth: used,
    limit: FREE_AI_LESSONS_PER_MONTH,
  };
}

export { FREE_AI_LESSONS_PER_MONTH, SOFT_THRESHOLD, HARD_THRESHOLD };
