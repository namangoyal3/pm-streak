import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isProEffective } from "@/lib/entitlements";
import { getPriceBandFromCountry } from "@/lib/billing/price-bands";
import {
  countAiLessonsThisMonth,
  FREE_AI_LESSONS_PER_MONTH,
} from "@/lib/billing/ai-usage";

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      plan: true,
      billingStatus: true,
      billingProvider: true,
      country: true,
      currency: true,
      priceBand: true,
      trialEndsAt: true,
      renewsAt: true,
      cancelsAt: true,
      paddleCustomerId: true,
      proPreviewConsumed: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const isPro = isProEffective(user);
  const band = user.priceBand ?? getPriceBandFromCountry(user.country);
  const aiUsed = await countAiLessonsThisMonth(userId);

  return NextResponse.json({
    plan: user.plan,
    billingStatus: user.billingStatus ?? "none",
    billingProvider: user.billingProvider,
    country: user.country,
    currency: user.currency,
    priceBand: band,
    trialEndsAt: user.trialEndsAt,
    renewsAt: user.renewsAt,
    cancelsAt: user.cancelsAt,
    paddleCustomerId: user.paddleCustomerId,
    proPreviewConsumed: user.proPreviewConsumed,
    isPro,
    ai: {
      usedThisMonth: aiUsed,
      freeMonthlyLimit: FREE_AI_LESSONS_PER_MONTH,
      unlimited: isPro,
    },
    entitlements: {
      unlimited_ai_lessons: isPro,
      deep_dives: isPro,
      interview_sprint: isPro,
      role_roadmaps: isPro,
      saved_notes: isPro,
      premium_recaps: isPro,
    },
  });
}
