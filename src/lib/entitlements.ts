import { prisma } from "@/lib/prisma";

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
};

export function isProEffective(user: UserRow): boolean {
  if (user.plan === "pro") return true;
  if (user.trialEndsAt && user.trialEndsAt > new Date()) return true;
  return false;
}

export async function hasEntitlement(
  userId: string,
  key: EntitlementKey
): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { plan: true, trialEndsAt: true },
  });
  if (!user) return false;
  if (isProEffective(user)) {
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
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { plan: true, trialEndsAt: true },
  });
  return user ? isProEffective(user) : false;
}
