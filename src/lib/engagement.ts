import { prisma } from "@/lib/prisma";

export interface EngagementSnapshot {
  totalAttempts: number;
  activeDays: number;
  lastShownPaywallAt: Date | null;
  declineCount: number;
}

export interface PaywallState {
  eligible: boolean;
  reason?: string;
  shouldShow: boolean;
}

export async function updateEngagementAfterAttempt(userId: string): Promise<EngagementSnapshot> {
  const today = new Date().toISOString().slice(0, 10);

  const metric = await prisma.userEngagementMetric.upsert({
    where: { userId },
    create: {
      userId,
      totalAttempts: 1,
      activeDays: 1,
      lastAttemptDate: today,
    },
    update: {},
  });

  if (metric.totalAttempts === 1 && metric.activeDays === 1) {
    return metric;
  }

  const isNewDay = metric.lastAttemptDate !== today;

  return prisma.userEngagementMetric.update({
    where: { userId },
    data: {
      totalAttempts: { increment: 1 },
      ...(isNewDay ? { activeDays: { increment: 1 }, lastAttemptDate: today } : {}),
    },
  });
}

export function evaluatePaywallState(input: {
  totalAttempts: number;
  activeDays: number;
  credits: number;
  declineCount: number;
  lastShownPaywallAt: Date | null;
}): PaywallState {
  if (input.credits > 0) {
    return { eligible: false, reason: "has_credits", shouldShow: false };
  }
  if (input.totalAttempts < 10) {
    return { eligible: false, reason: "insufficient_attempts", shouldShow: false };
  }
  if (input.activeDays < 4) {
    return { eligible: false, reason: "insufficient_active_days", shouldShow: false };
  }

  const eligible = true;
  const now = Date.now();
  const shownRecently =
    input.lastShownPaywallAt &&
    now - new Date(input.lastShownPaywallAt).getTime() < 1000 * 60 * 60 * 24;
  const shouldShow = !shownRecently && input.declineCount < 3;
  return { eligible, shouldShow };
}

export async function getPaywallState(userId: string): Promise<PaywallState & EngagementSnapshot> {
  const [metric, user] = await Promise.all([
    prisma.userEngagementMetric.findUnique({ where: { userId } }),
    prisma.user.findUnique({ where: { id: userId }, select: { credits: true } }),
  ]);

  const snapshot: EngagementSnapshot = {
    totalAttempts: metric?.totalAttempts ?? 0,
    activeDays: metric?.activeDays ?? 0,
    lastShownPaywallAt: metric?.lastShownPaywallAt ?? null,
    declineCount: metric?.declineCount ?? 0,
  };

  const state = evaluatePaywallState({
    ...snapshot,
    credits: user?.credits ?? 0,
  });

  return { ...snapshot, ...state };
}

export async function markPaywallShown(userId: string): Promise<void> {
  await prisma.userEngagementMetric.upsert({
    where: { userId },
    create: {
      userId,
      totalAttempts: 0,
      activeDays: 0,
      lastAttemptDate: null,
      lastShownPaywallAt: new Date(),
      declineCount: 0,
    },
    update: {
      lastShownPaywallAt: new Date(),
    },
  });
}

export async function incrementPaywallDecline(userId: string): Promise<void> {
  await prisma.userEngagementMetric.upsert({
    where: { userId },
    create: {
      userId,
      totalAttempts: 0,
      activeDays: 0,
      lastAttemptDate: null,
      declineCount: 1,
    },
    update: {
      declineCount: { increment: 1 },
    },
  });
}

export async function incrementEngagementOnAttempt(userId: string): Promise<{
  totalAttempts: number;
  activeDays: number;
  paywallEligible: boolean;
}> {
  const metric = await updateEngagementAfterAttempt(userId);
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { credits: true, plan: true },
  });
  const paywallEligible =
    (metric.totalAttempts ?? 0) >= 10 &&
    (metric.activeDays ?? 0) >= 4 &&
    (user?.credits ?? 0) <= 0 &&
    user?.plan !== "pro";
  return {
    totalAttempts: metric.totalAttempts,
    activeDays: metric.activeDays,
    paywallEligible,
  };
}
