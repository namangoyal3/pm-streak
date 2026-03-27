import { prisma } from "@/lib/prisma";

const PRO_KEYS = [
  "unlimited_ai_lessons",
  "deep_dives",
  "interview_sprint",
  "role_roadmaps",
  "saved_notes",
  "premium_recaps",
] as const;

/** Upsert Pro entitlements expiring at a future date. */
async function upsertProEntitlements(userId: string, expiresAt: Date) {
  for (const key of PRO_KEYS) {
    await prisma.entitlement.upsert({
      where: { userId_key: { userId, key } },
      create: { userId, key, source: "subscription", expiresAt },
      update: { source: "subscription", expiresAt },
    });
  }
}

/**
 * Called when Dodo fires onSubscriptionActive or onSubscriptionRenewed.
 * Upserts the subscription row and grants Pro until `nextBillingDate`.
 */
export async function grantDodoPro(opts: {
  userId: string;
  dodoSubscriptionId: string;
  productId: string;
  nextBillingDate: Date;
  customerId: string;
}) {
  const { userId, dodoSubscriptionId, productId, nextBillingDate, customerId } = opts;

  // Upsert subscription row (keyed on paddleSubscriptionId = dodo sub ID)
  const existing = await prisma.subscription.findFirst({
    where: { userId, paddleSubscriptionId: dodoSubscriptionId },
  });

  if (existing) {
    await prisma.subscription.update({
      where: { id: existing.id },
      data: {
        status: "active",
        currentPeriodEnd: nextBillingDate,
        paddlePriceId: productId,
      },
    });
  } else {
    await prisma.subscription.create({
      data: {
        userId,
        provider: "dodo",
        paddleSubscriptionId: dodoSubscriptionId,
        paddlePriceId: productId,
        status: "active",
        currentPeriodEnd: nextBillingDate,
      },
    });
  }

  await upsertProEntitlements(userId, nextBillingDate);

  await prisma.user.update({
    where: { id: userId },
    data: {
      plan: "pro",
      billingStatus: "active",
      billingProvider: "dodo",
      paddleCustomerId: customerId,
      renewsAt: nextBillingDate,
      cancelsAt: null,
    },
  });
}

/**
 * Called on onSubscriptionCancelled — user keeps Pro until nextBillingDate.
 */
export async function setDodoSubscriptionCancelling(opts: {
  userId: string;
  dodoSubscriptionId: string;
  cancelsAt: Date;
}) {
  const { userId, dodoSubscriptionId, cancelsAt } = opts;

  await prisma.subscription.updateMany({
    where: { userId, paddleSubscriptionId: dodoSubscriptionId },
    data: { status: "active" },
  });

  await prisma.user.update({
    where: { id: userId },
    data: { billingStatus: "active", cancelsAt },
  });
}

/**
 * Called on onSubscriptionExpired — revoke Pro.
 */
export async function revokeDodoPro(opts: {
  userId: string;
  dodoSubscriptionId: string;
}) {
  const { userId, dodoSubscriptionId } = opts;

  await prisma.subscription.updateMany({
    where: { userId, paddleSubscriptionId: dodoSubscriptionId },
    data: { status: "expired" },
  });

  // Only revoke if billing is via dodo (don't stomp a UPI or admin grant)
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { billingProvider: true },
  });
  if (!user || user.billingProvider !== "dodo") return;

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
    where: { userId, source: "subscription" },
  });
}

/** Look up a user by email — returns null if not found. */
export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email: email.toLowerCase().trim() },
    select: { id: true, email: true, billingProvider: true, paddleCustomerId: true },
  });
}
