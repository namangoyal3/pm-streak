import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { generateLesson } from "@/lib/lesson-generator";
import {
  evaluateAiLessonGate,
  FREE_AI_LESSONS_PER_MONTH,
} from "@/lib/billing/ai-usage";
import { isUserPro } from "@/lib/entitlements";

export async function POST(req: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { topic, generationMode, sourceLessonId } = await req.json();
  if (!topic || topic.length < 2) {
    return NextResponse.json({ error: "Topic is required (min 2 chars)" }, { status: 400 });
  }

  const isPro = await isUserPro(userId);
  const gate = await evaluateAiLessonGate(userId, isPro);
  if (!gate.allowed) {
    return NextResponse.json(
      {
        error: gate.reason,
        paywall: { hard: true },
        aiUsage: {
          usedThisMonth: gate.usedThisMonth,
          limit: gate.limit,
        },
      },
      { status: 402 }
    );
  }

  try {
    const lesson = await generateLesson({
      topic,
      userId,
      generationMode: generationMode === "deep_dive" ? "deep_dive" : "explore",
      sourceLessonId: typeof sourceLessonId === "string" ? sourceLessonId : null,
    });
    return NextResponse.json({
      lesson,
      aiUsage: {
        usedThisMonth: gate.usedThisMonth,
        softPaywall: gate.softPaywall,
        monthlyFreeLimit: isPro ? null : FREE_AI_LESSONS_PER_MONTH,
        unlimited: isPro,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to generate lesson: ${err instanceof Error ? err.message : "Unknown error"}` },
      { status: 500 }
    );
  }
}
