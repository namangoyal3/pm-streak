import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  applyWeakAiLessonCleanup,
  previewWeakAiLessons,
} from "@/lib/ai-lesson-cleanup";
import { generateLesson } from "@/lib/lesson-generator";

function isAdmin(email: string): boolean {
  const adminEmail = process.env.ADMIN_EMAIL || "namangoyal21197@gmail.com";
  return email === adminEmail;
}

export async function POST(req: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const currentUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true },
  });

  if (!currentUser || !isAdmin(currentUser.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = (await req.json().catch(() => ({}))) as {
    apply?: boolean;
    regenerateTopN?: number;
  };
  const apply = body.apply === true;
  const regenerateTopN = Math.max(0, Math.min(Number(body.regenerateTopN ?? 0), 50));

  const preview = await previewWeakAiLessons(prisma);
  if (!apply) {
    return NextResponse.json({ mode: "preview", preview });
  }

  const deleted = await applyWeakAiLessonCleanup(prisma, preview.weakLessonIds);
  const regenerationQueue = preview.regenerationCandidates.slice(0, regenerateTopN);
  let regenerated = 0;
  let regenerationFailed = 0;

  for (const candidate of regenerationQueue) {
    try {
      await generateLesson({
        topic: candidate.topic,
        userId: candidate.userId,
        generationMode: candidate.generationMode,
        sourceLessonId: candidate.sourceLessonId,
        bypassDailyLimit: true,
      });
      regenerated += 1;
    } catch {
      regenerationFailed += 1;
    }
  }

  return NextResponse.json({
    mode: "apply",
    preview,
    deleted,
    regeneration: {
      requestedTopN: regenerateTopN,
      attempted: regenerationQueue.length,
      regenerated,
      failed: regenerationFailed,
    },
    note:
      regenerateTopN > 0
        ? "Weak lessons were removed and top deleted topics were regenerated using stricter quality rules."
        : "Removed weak lessons are not auto-rewritten in place. Fresh generations now use stricter quality rules.",
  });
}
