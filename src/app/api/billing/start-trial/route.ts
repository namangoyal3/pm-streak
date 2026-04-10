import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const MARKETING_TRIAL_DAYS = 3;

/**
 * POST /api/billing/start-trial
 * Grants a 3-day Pro marketing trial. Requires the user to be signed in.
 * Idempotent — if trial is already active, returns success with remaining time.
 */
export async function POST() {
  const userId = await getCurrentUserId();
  if (!userId) {
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

  return NextResponse.json({ ok: true, trialEndsAt: trialEndsAt.toISOString() });
}
