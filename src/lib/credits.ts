import { prisma } from "./prisma";

export const CREDIT_COSTS = {
  lesson_unlock: 5,
  ai_lesson: 2,
  interview_prep: 5,
} as const;

export type CreditReason = "monthly_refresh" | "lesson_unlock" | "ai_lesson" | "interview_prep" | "admin_grant";

/**
 * Atomically deduct credits. Returns true if successful, false if insufficient balance.
 * Pro users bypass credit checks for lesson unlocks and AI lessons.
 */
export async function spendCredits(
  userId: string,
  amount: number,
  reason: CreditReason
): Promise<boolean> {
  // Use a transaction to atomically check-and-deduct
  try {
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: { credits: true },
      });
      if (!user || user.credits < amount) {
        throw new Error("INSUFFICIENT_CREDITS");
      }
      await tx.user.update({
        where: { id: userId },
        data: { credits: { decrement: amount } },
      });
      await tx.creditTransaction.create({
        data: { userId, amount: -amount, reason },
      });
    });
    return true;
  } catch (err) {
    if (err instanceof Error && err.message === "INSUFFICIENT_CREDITS") {
      return false;
    }
    throw err;
  }
}

/**
 * Refresh monthly credits. Free users get 10, Pro users get 50.
 * Safe to call multiple times — only refreshes once per calendar month.
 */
export async function refreshMonthlyCredits(userId: string): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { plan: true, creditsRefreshedAt: true },
  });
  if (!user) return;

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  if (user.creditsRefreshedAt && user.creditsRefreshedAt >= startOfMonth) {
    return; // Already refreshed this month
  }

  const newCredits = user.plan === "pro" ? 50 : 10;

  await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: { credits: newCredits, creditsRefreshedAt: now },
    }),
    prisma.creditTransaction.create({
      data: { userId, amount: newCredits, reason: "monthly_refresh" },
    }),
  ]);
}

export async function getCreditBalance(userId: string): Promise<number> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { credits: true },
  });
  return user?.credits ?? 0;
}

/**
 * Grant credits to a user (admin / promo use).
 */
export async function grantCredits(
  userId: string,
  amount: number
): Promise<void> {
  await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: { credits: { increment: amount } },
    }),
    prisma.creditTransaction.create({
      data: { userId, amount, reason: "admin_grant" },
    }),
  ]);
}
