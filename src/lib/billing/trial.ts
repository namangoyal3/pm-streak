import { prisma } from "@/lib/prisma";
import { CORE_LESSON_WHERE } from "@/lib/lesson-access";
import { trackServerEvent } from "@/lib/ga4-server";

const TRIAL_DAYS = 7;

/**
 * 7-day no-card Pro preview after 3 core lessons completed OR 3-day streak (once per account).
 */
export async function maybeGrantProTrial(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      plan: true,
      proPreviewConsumed: true,
      trialEndsAt: true,
      streakCount: true,
    },
  });

  if (!user || user.plan === "pro") return false;
  if (user.proPreviewConsumed) return false;
  if (user.trialEndsAt && user.trialEndsAt > new Date()) return false;

  const coreCompleted = await prisma.completedLesson.count({
    where: {
      userId,
      lesson: { is: CORE_LESSON_WHERE },
    },
  });

  const eligibleByLessons = coreCompleted >= 3;
  const eligibleByStreak = user.streakCount >= 3;

  if (!eligibleByLessons && !eligibleByStreak) return false;

  const trialEndsAt = new Date();
  trialEndsAt.setUTCDate(trialEndsAt.getUTCDate() + TRIAL_DAYS);

  await prisma.user.update({
    where: { id: userId },
    data: {
      trialEndsAt,
      proPreviewConsumed: true,
      billingStatus: "trialing",
    },
  });

  trackServerEvent("trial_auto_granted", {
    user_id: userId,
    reason: eligibleByLessons ? "3_lessons" : "3_day_streak",
    trial_days: TRIAL_DAYS,
  }, userId).catch(() => {});

  return true;
}
