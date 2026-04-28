import { prisma } from "@/lib/prisma";

export const PRO_KEYS = [
  "unlimited_ai_lessons",
  "deep_dives",
  "interview_sprint",
  "role_roadmaps",
  "saved_notes",
  "premium_recaps",
] as const;

const ACTIVE_PROVIDERS = ["dodo", "upi_india", "razorpay"] as const;
const ALL_PRO_ENTITLEMENT_SOURCES = ["subscription", "upi_india", "razorpay"] as const;

function entitlementSourceForProvider(provider: string): (typeof ALL_PRO_ENTITLEMENT_SOURCES)[number] | null {
  if (provider === "dodo") return "subscription";
  if (provider === "upi_india") return "upi_india";
  if (provider === "razorpay") return "razorpay";
  return null;
}

export async function grantProEntitlements(
  db: typeof prisma,
  userId: string,
  expiresAt: Date,
  source: (typeof ALL_PRO_ENTITLEMENT_SOURCES)[number]
) {
  for (const key of PRO_KEYS) {
    await db.entitlement.upsert({
      where: { userId_key: { userId, key } },
      create: { userId, key, source, expiresAt },
      update: { source, expiresAt },
    });
  }
}

export async function deleteProEntitlements(
  db: typeof prisma,
  userId: string,
  source?: (typeof ALL_PRO_ENTITLEMENT_SOURCES)[number]
) {
  if (source) {
    await db.entitlement.deleteMany({
      where: { userId, source },
    });
    return;
  }

  await db.entitlement.deleteMany({
    where: {
      userId,
      source: { in: [...ALL_PRO_ENTITLEMENT_SOURCES] },
    },
  });
}

/**
 * Safety net for subscription-backed Pro access.
 * Keeps `plan`, `billingStatus`, `billingProvider`, `renewsAt`, and entitlements in sync
 * for Dodo, UPI India, and Razorpay purchases.
 */
export async function reconcileExpiredProAccess(userId: string): Promise<void> {
  const now = new Date();

  await prisma.subscription.updateMany({
    where: {
      userId,
      provider: { in: [...ACTIVE_PROVIDERS] },
      status: "active",
      currentPeriodEnd: { lte: now },
    },
    data: { status: "expired" },
  });

  const [user, activeSubscription] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        plan: true,
        billingProvider: true,
        billingStatus: true,
        renewsAt: true,
        trialEndsAt: true,
      },
    }),
    prisma.subscription.findFirst({
      where: {
        userId,
        provider: { in: [...ACTIVE_PROVIDERS] },
        status: "active",
        currentPeriodEnd: { gt: now },
      },
      orderBy: [{ currentPeriodEnd: "desc" }, { updatedAt: "desc" }],
    }),
  ]);

  if (activeSubscription) {
    const source = entitlementSourceForProvider(activeSubscription.provider);
    if (source && activeSubscription.currentPeriodEnd) {
      await grantProEntitlements(prisma, userId, activeSubscription.currentPeriodEnd, source);
    }

    if (
      !user ||
      user.plan !== "pro" ||
      user.billingProvider !== activeSubscription.provider ||
      !user.renewsAt ||
      (activeSubscription.currentPeriodEnd &&
        user.renewsAt.getTime() !== activeSubscription.currentPeriodEnd.getTime())
    ) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          plan: "pro",
          billingStatus: "active",
          billingProvider: activeSubscription.provider,
          renewsAt: activeSubscription.currentPeriodEnd,
          cancelsAt: null,
        },
      });
    }

    return;
  }

  if (!user) return;
  if (user.trialEndsAt && user.trialEndsAt > now) return;

  const provider = user.billingProvider;
  const isSubscriptionProvider = provider != null && ACTIVE_PROVIDERS.includes(provider as (typeof ACTIVE_PROVIDERS)[number]);
  const shouldDemote =
    user.plan === "pro" &&
    isSubscriptionProvider &&
    (!user.renewsAt || user.renewsAt <= now);

  if (!shouldDemote) return;

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

  await deleteProEntitlements(prisma, userId);
}
