import { prisma } from "@/lib/prisma";
import { reconcileExpiredProAccess } from "@/lib/billing/pro-reconciliation";

export type EntitlementKey =
  | "unlimited_ai_lessons"
  | "deep_dives"
  | "interview_sprint"
  | "role_roadmaps"
  | "saved_notes"
  | "premium_recaps";

type UserRow = {
  plan: string;
  trialEndsAt: Date | null;
  renewsAt?: Date | null;
};

/**
 * Sync check for API routes that already have a user row (no extra DB round-trip for UPI).
 * Prefer `isUserPro` when you need UPI + expiry to be correct.
 */
export function isProEffective(user: UserRow): boolean {
  if (user.trialEndsAt && user.trialEndsAt > new Date()) return true;
  if (user.plan === "pro") {
    if (user.renewsAt && user.renewsAt <= new Date()) return false;
    return true;
  }
  return false;
}

export async function hasEntitlement(
  userId: string,
  key: EntitlementKey
): Promise<boolean> {
  if (await isUserPro(userId)) {
    return true;
  }

  const row = await prisma.entitlement.findUnique({
    where: { userId_key: { userId, key } },
  });
  if (!row) return false;
  if (row.expiresAt && row.expiresAt < new Date()) return false;
  return true;
}

export async function isUserPro(userId: string): Promise<boolean> {
  await reconcileExpiredProAccess(userId);

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { plan: true, trialEndsAt: true, renewsAt: true },
  });
  if (!user) return false;
  if (user.trialEndsAt && user.trialEndsAt > new Date()) return true;

  const upi = await prisma.subscription.findFirst({
    where: {
      userId,
      provider: {
        in: ["upi_india", "razorpay"],
      },
      status: "active",
      currentPeriodEnd: { gt: new Date() },
    },
  });
  if (upi) return true;

  if (user.plan === "pro") {
    if (user.renewsAt && user.renewsAt <= new Date()) return false;
    return true;
  }
  return false;
}
