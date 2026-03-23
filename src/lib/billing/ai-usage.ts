import { prisma } from "@/lib/prisma";

const FREE_DAILY_LIMIT = 1;
const FREE_MONTHLY_LIMIT = 5;

export type AiLessonGate =
  | { allowed: true; usedToday: number; limit: number }
  | {
      allowed: false;
      usedToday: number;
      limit: number;
      reason: string;
      type: "daily" | "monthly";
    };

export async function countAiLessonsToday(userId: string): Promise<number> {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  return prisma.lesson.count({
    where: {
      aiGenerated: true,
      generatedForUserId: userId,
      createdAt: { gte: twentyFourHoursAgo },
    },
  });
}

export async function countAiLessonsThisMonth(userId: string): Promise<number> {
  const startOfMonth = new Date();
  startOfMonth.setUTCDate(1);
  startOfMonth.setUTCHours(0, 0, 0, 0);
  
  return prisma.lesson.count({
    where: {
      aiGenerated: true,
      generatedForUserId: userId,
      createdAt: { gte: startOfMonth },
    },
  });
}

/**
 * Free tier strategy: 1 AI lesson / day.
 * Pro strategy: Unlimited.
 */
export async function evaluateAiLessonGate(
  userId: string,
  isPro: boolean
): Promise<AiLessonGate> {
  if (isPro) {
    const used = await countAiLessonsToday(userId);
    return {
      allowed: true,
      usedToday: used,
      limit: Infinity,
    };
  }

  const usedToday = await countAiLessonsToday(userId);
  if (usedToday >= FREE_DAILY_LIMIT) {
    return {
      allowed: false,
      usedToday,
      limit: FREE_DAILY_LIMIT,
      type: "daily",
      reason: "You've reached your free daily limit for AI lessons. Deep Dives require a deep focus—and Pro access.",
    };
  }

  const usedThisMonth = await countAiLessonsThisMonth(userId);
  if (usedThisMonth >= FREE_MONTHLY_LIMIT) {
     return {
      allowed: false,
      usedToday: usedThisMonth,
      limit: FREE_MONTHLY_LIMIT,
      type: "monthly",
      reason: "You've used all 5 free AI lessons for this month. Upgrade to Pro for unlimited deeper insights.",
    };
  }

  return {
    allowed: true,
    usedToday,
    limit: FREE_DAILY_LIMIT,
  };
}
