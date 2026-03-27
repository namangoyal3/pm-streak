import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { generateLesson, TranscriptEvidenceError, DailyLimitError } from "@/lib/lesson-generator";

export async function POST(req: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const { topic, generationMode, sourceLessonId } = await req.json();
    if (!topic || topic.length < 2) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const lesson = await generateLesson({
      topic,
      userId,
      generationMode: generationMode === "deep_dive" ? "deep_dive" : "explore",
      sourceLessonId: typeof sourceLessonId === "string" ? sourceLessonId : null,
    });

    return NextResponse.json({
      lesson,
      // The generateLesson function handles credit deduction internally (2 credits)
      // We don't need to return aiUsage here as the client handles the redirection
    });
  } catch (err) {
    console.error("[generate-lesson] Error:", err);
    if (err instanceof DailyLimitError) {
      return NextResponse.json({ error: err.message }, { status: 402 });
    }
    if (err instanceof TranscriptEvidenceError) {
      return NextResponse.json({ error: err.message }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Content generation is currently catching its breath. Try again in a minute." },
      { status: 500 }
    );
  }
}
