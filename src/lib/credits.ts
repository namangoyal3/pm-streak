import { prisma } from "./prisma";
import type { Prisma } from "@prisma/client";
import {
  INTERVIEW_PREP_PRICING,
  interviewPrepSessionCreditTotal,
} from "./interview-prep-pricing";

export const CREDIT_COSTS = {
  lesson_unlock: 5,
  ai_lesson: 2,
  /** One credit per interview-prep question (billed per revealed/generated question). */
  interview_prep_per_question: INTERVIEW_PREP_PRICING.creditsPerQuestion,
  interview_prep_questions_per_session: INTERVIEW_PREP_PRICING.questionsPerSession,
  /** Daily interview sprint drill submission (non-Pro). */
  daily_drill: 1,
  mock_interview: 5,
  deep_review: 3,
  portfolio_artifact: 4,
} as const;

/** Total credits for one AI Interview Prep session (5 questions). */
export function interviewPrepSessionCredits(): number {
  return interviewPrepSessionCreditTotal();
}

export type CreditReason =
  | "monthly_refresh"
  | "lesson_unlock"
  | "ai_lesson"
  | "interview_prep"
  | "daily_drill"
  | "admin_grant"
  | "purchase"
  | "bonus"
  | "mock_interview"
  | "deep_review"
  | "portfolio_artifact";

/**
 * Atomically deduct credits. Returns true if successful, false if insufficient balance.
 * Pro users bypass credit checks for lesson unlocks and AI lessons.
 */
export async function spendCredits(
  userId: string,
  amount: number,
  reason: CreditReason,
  metadata?: Record<string, unknown>
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
        data: {
          userId,
          amount: -amount,
          reason,
          metadata: metadata as Prisma.InputJsonValue | undefined,
        },
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
    select: { plan: true, trialEndsAt: true, creditsRefreshedAt: true },
  });
  if (!user) return;

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  if (user.creditsRefreshedAt && user.creditsRefreshedAt >= startOfMonth) {
    return; // Already refreshed this month
  }

  const isPro = user.plan === "pro" || (user.trialEndsAt != null && user.trialEndsAt > now);
  const newCredits = isPro ? 50 : 10;

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
  amount: number,
  reason: CreditReason = "admin_grant",
  metadata?: Record<string, unknown>
): Promise<void> {
  await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: { credits: { increment: amount } },
    }),
    prisma.creditTransaction.create({
      data: {
        userId,
        amount,
        reason,
        metadata: metadata as Prisma.InputJsonValue | undefined,
      },
    }),
  ]);
}
