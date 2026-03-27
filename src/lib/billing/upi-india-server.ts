import { randomUUID } from "crypto";
import { prisma } from "@/lib/prisma";

const PRO_KEYS = [
  "unlimited_ai_lessons",
  "deep_dives",
  "interview_sprint",
  "role_roadmaps",
  "saved_notes",
  "premium_recaps",
] as const;

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/** Monthly UPI plan: exactly 30 days from the paid-from instant. */
function addMonthlyPeriod(from: Date): Date {
  return new Date(from.getTime() + 30 * MS_PER_DAY);
}

/** Quarterly UPI plan: exactly 90 days from the paid-from instant. */
function addQuarterlyPeriod(from: Date): Date {
  return new Date(from.getTime() + 90 * MS_PER_DAY);
}

/** Yearly UPI plan: one calendar year from the paid-from instant. */
function addYearlyPeriod(from: Date): Date {
  const d = new Date(from.getTime());
  d.setFullYear(d.getFullYear() + 1);
  return d;
}

export function computeUpiPeriodEnd(
  paidFrom: Date,
  interval: "month" | "quarter" | "year",
): Date {
  if (interval === "month") return addMonthlyPeriod(paidFrom);
  if (interval === "quarter") return addQuarterlyPeriod(paidFrom);
  return addYearlyPeriod(paidFrom);
}

export async function getActiveUpiSubscription(userId: string) {
  const now = new Date();
  return prisma.subscription.findFirst({
    where: {
      userId,
      provider: "upi_india",
      status: "active",
      currentPeriodEnd: { gt: now },
    },
    orderBy: { currentPeriodEnd: "desc" },
  });
}

/**
 * Mark expired UPI rows; if user was Pro only via UPI, flip back to free.
 * Does not call RevenueCat (avoid recursion); RC sync handles RC-backed Pro.
 */
export async function expireStaleUpiAndReconcileUser(userId: string): Promise<void> {
  const now = new Date();

  await prisma.subscription.updateMany({
    where: {
      userId,
      provider: "upi_india",
      status: "active",
      currentPeriodEnd: { lte: now },
    },
    data: { status: "expired" },
  });

  const stillActive = await getActiveUpiSubscription(userId);
  if (stillActive) return;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { plan: true, billingProvider: true },
  });
  if (!user || user.plan !== "pro") return;

  if (user.billingProvider !== "upi_india") return;

  await prisma.user.update({
    where: { id: userId },
    data: {
      plan: "free",
      billingStatus: "none",
      billingProvider: null,
      renewsAt: null,
      cancelsAt: null,
    },
  });

  await prisma.entitlement.deleteMany({
    where: { userId, source: "upi_india" },
  });
}

export async function applyProEntitlementsForUpi(userId: string, expiresAt: Date) {
  for (const key of PRO_KEYS) {
    await prisma.entitlement.upsert({
      where: { userId_key: { userId, key } },
      create: { userId, key, source: "upi_india", expiresAt },
      update: { source: "upi_india", expiresAt },
    });
  }
}

async function upsertProEntitlements(userId: string, expiresAt: Date) {
  await applyProEntitlementsForUpi(userId, expiresAt);
}

/**
 * After you confirm an India UPI payment (bank/UPI app, email, UTR), call this
 * to activate Pro until period end. Renewals extend from the current period end
 * when still active.
 */
export async function grantUpiIndiaPro(opts: {
  userId: string;
  interval: "month" | "quarter" | "year";
  /** When the payment applies from (default: now). */
  paidAt?: Date;
}): Promise<{ currentPeriodEnd: Date; subscriptionId: string }> {
  const paidAt = opts.paidAt ?? new Date();

  const existing = await prisma.subscription.findFirst({
    where: {
      userId: opts.userId,
      provider: "upi_india",
      status: "active",
      currentPeriodEnd: { gt: new Date() },
    },
    orderBy: { currentPeriodEnd: "desc" },
  });

  const base =
    existing?.currentPeriodEnd && existing.currentPeriodEnd > paidAt
      ? existing.currentPeriodEnd
      : paidAt;
  const periodEnd = computeUpiPeriodEnd(base, opts.interval);

  const billingInterval = opts.interval === "year" ? "year" : "month";

  let subId: string;
  if (existing) {
    await prisma.subscription.update({
      where: { id: existing.id },
      data: {
        billingInterval,
        currentPeriodEnd: periodEnd,
        status: "active",
      },
    });
    subId = existing.id;
  } else {
    const sub = await prisma.subscription.create({
      data: {
        userId: opts.userId,
        provider: "upi_india",
        paddleSubscriptionId: `upi_${randomUUID()}`,
        billingInterval,
        status: "active",
        currentPeriodEnd: periodEnd,
      },
    });
    subId = sub.id;
  }

  await upsertProEntitlements(opts.userId, periodEnd);

  await prisma.user.update({
    where: { id: opts.userId },
    data: {
      plan: "pro",
      billingStatus: "active",
      billingProvider: "upi_india",
      renewsAt: periodEnd,
      cancelsAt: null,
    },
  });

  return { currentPeriodEnd: periodEnd, subscriptionId: subId };
}
