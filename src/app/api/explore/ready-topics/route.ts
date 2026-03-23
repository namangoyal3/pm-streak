import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { isUserPro } from "@/lib/entitlements";
import { evaluateAiLessonGate } from "@/lib/billing/ai-usage";
import { generateLesson, TranscriptEvidenceError } from "@/lib/lesson-generator";
import { getGeneratedLessonsForUser } from "@/lib/lesson-access";
import { EXPLORE_SEED_TOPICS } from "@/lib/explore-topics";

const TARGET_READY_TOPICS = 6;

function normalizeTopic(s: string) {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}

export async function POST() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const [existingLessons, pro] = await Promise.all([
    getGeneratedLessonsForUser(userId),
    isUserPro(userId),
  ]);

  const existingByTopic = new Map<string, string>();
  for (const lesson of existingLessons) {
    const key = normalizeTopic(lesson.topicKey ?? "");
    if (!key) continue;
    if (!existingByTopic.has(key)) existingByTopic.set(key, lesson.id);
  }

  const ready: Array<{ topic: string; lessonId: string }> = [];

  for (const topic of EXPLORE_SEED_TOPICS) {
    if (ready.length >= TARGET_READY_TOPICS) break;
    const topicKey = normalizeTopic(topic);
    const existingId = existingByTopic.get(topicKey);
    if (existingId) {
      ready.push({ topic, lessonId: existingId });
      continue;
    }

    const gate = await evaluateAiLessonGate(userId, pro);
    if (!gate.allowed) break;

    try {
      const lesson = await generateLesson({
        topic,
        userId,
        generationMode: "explore",
        sourceLessonId: null,
      });
      ready.push({ topic, lessonId: lesson.id });
    } catch (error) {
      if (error instanceof TranscriptEvidenceError) {
        continue;
      }
      break;
    }
  }

  return NextResponse.json({ readyTopics: ready });
}
