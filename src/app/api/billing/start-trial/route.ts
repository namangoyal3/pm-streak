import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { serverEvents } from "@/lib/ga4-server";
import { recordAcquisitionEvent } from "@/lib/acquisition";
import type { NextRequest } from "next/server";

const MARKETING_TRIAL_DAYS = 3;

/**
 * POST /api/billing/start-trial
 * Grants a 3-day Pro marketing trial. Requires the user to be signed in.
 * Idempotent — if trial is already active, returns success with remaining time.
 */
export async function POST(req: NextRequest) {
  const userId = await getCurrentUserId();
  // Fire trial_start_attempt at the entry of every POST so we can measure
  // how many requests reach the route vs. how many succeed downstream.
  await serverEvents.trialStartAttempt(userId);

  if (!userId) {
    await serverEvents.trialStartBlocked(null, "not_authenticated");
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { plan: true, trialEndsAt: true, proPreviewConsumed: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Already on paid Pro — no trial needed
  if (user.plan === "pro") {
    return NextResponse.json({ ok: true, alreadyPro: true });
  }

  // Trial already active
  if (user.trialEndsAt && user.trialEndsAt > new Date()) {
    return NextResponse.json({ ok: true, trialEndsAt: user.trialEndsAt.toISOString() });
  }

  // Already consumed a trial — don't grant a second one
  if (user.proPreviewConsumed) {
    await serverEvents.trialStartBlocked(userId, "trial_already_used");
    return NextResponse.json({ error: "Trial already used" }, { status: 403 });
  }

  const trialEndsAt = new Date();
  trialEndsAt.setUTCDate(trialEndsAt.getUTCDate() + MARKETING_TRIAL_DAYS);

  await prisma.user.update({
    where: { id: userId },
    data: {
      trialEndsAt,
      proPreviewConsumed: true,
      billingStatus: "trialing",
    },
  });

  await serverEvents.trialStartSuccess(userId, MARKETING_TRIAL_DAYS);
  await recordAcquisitionEvent({
    userId,
    eventName: "trial_started",
    req,
    metadata: {
      trialDays: MARKETING_TRIAL_DAYS,
    },
  });
  return NextResponse.json({ ok: true, trialEndsAt: trialEndsAt.toISOString() });
}
