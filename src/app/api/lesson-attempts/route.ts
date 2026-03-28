import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { normalizeJudgeResponse, judgeAttempt } from "@/lib/ai-judge";
import { incrementEngagementOnAttempt } from "@/lib/engagement";
import { ensureCanonicalSkills, ensureSkillRows } from "@/lib/pm-foundations";
import { spendCredits, CREDIT_COSTS } from "@/lib/credits";
import { isUserPro } from "@/lib/entitlements";

function toProfileScore(score1to5: number): number {
  return Math.round(((score1to5 - 1) / 4) * 100);
}

async function applySkillDelta(
  userId: string,
  skillKey: string,
  score1to5: number
) {
  const skill = await prisma.skill.findUnique({ where: { key: skillKey } });
  if (!skill) return;

  const observed = toProfileScore(score1to5);
  const existing = await prisma.userSkillProfile.findUnique({
    where: { userId_skillId: { userId, skillId: skill.id } },
    select: { id: true, score: true },
  });

  if (!existing) {
    await prisma.userSkillProfile.create({
      data: { userId, skillId: skill.id, score: observed },
    });
    return;
  }

  // Weighted moving average: 75% prior, 25% current.
  const updated = Math.round(existing.score * 0.75 + observed * 0.25);
  await prisma.userSkillProfile.update({
    where: { id: existing.id },
    data: { score: updated },
  });
}

export async function POST(req: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const contentLength = Number(req.headers.get("content-length") ?? 0);
  if (contentLength > 32_000) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }

  const body = await req.json().catch(() => ({} as Record<string, unknown>));
  const lessonId = typeof body.lessonId === "string" ? body.lessonId.trim() : "";
  const userAnswer =
    typeof body.userAnswer === "string" ? body.userAnswer.trim() : "";

  if (!lessonId || !userAnswer) {
    return NextResponse.json(
      { error: "lessonId and userAnswer are required" },
      { status: 400 }
    );
  }

  if (userAnswer.length > 8000) {
    return NextResponse.json(
      { error: "Answer too long (max 8000 chars)" },
      { status: 413 }
    );
  }

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    select: {
      id: true,
      title: true,
      promptText: true,
      type: true,
      slug: true,
    },
  });
  if (!lesson || !lesson.promptText) {
    return NextResponse.json({ error: "Lesson prompt not found" }, { status: 404 });
  }

  const isDailyDrill = lesson.slug?.startsWith("daily-drill-") ?? false;
  if (isDailyDrill) {
    const pro = await isUserPro(userId);
    if (!pro) {
      const ok = await spendCredits(userId, CREDIT_COSTS.daily_drill, "daily_drill", {
        lessonId: lesson.id,
      });
      if (!ok) {
        return NextResponse.json(
          {
            error: "insufficient_credits",
            needed: CREDIT_COSTS.daily_drill,
          },
          { status: 402 }
        );
      }
    }
  }

  await ensureSkillRows();
  const judged = await judgeAttempt({
    promptText: lesson.promptText,
    userAnswer,
    referenceAnswers: [],
  });
  const normalized = normalizeJudgeResponse(judged);
  const scores = normalized.scores;

  const attempt = await prisma.lessonAttempt.create({
    data: {
      userId,
      lessonId: lesson.id,
      userAnswer,
      scoreUserFocus: scores.user_focus,
      scoreStructure: scores.structure,
      scoreData: scores.data_thinking,
      scoreTradeoffs: scores.tradeoffs,
      feedbackSummary: normalized.feedback_comments.join(" "),
      feedbackComments: normalized.feedback_comments,
    },
  });

  const deltas = normalized.skill_deltas;
  const skillScores = ensureCanonicalSkills({
    user_focus:
      typeof deltas.user_focus === "number" ? deltas.user_focus : scores.user_focus,
    structure:
      typeof deltas.structure === "number" ? deltas.structure : scores.structure,
    data_thinking:
      typeof deltas.data_thinking === "number"
        ? deltas.data_thinking
        : scores.data_thinking,
    tradeoffs:
      typeof deltas.tradeoffs === "number" ? deltas.tradeoffs : scores.tradeoffs,
  });

  await Promise.all(
    (Object.keys(skillScores) as Array<keyof typeof skillScores>).map((key) =>
      applySkillDelta(userId, key, skillScores[key])
    )
  );

  const engagement = await incrementEngagementOnAttempt(userId);

  return NextResponse.json({
    attemptId: attempt.id,
    scores,
    feedbackComments: normalized.feedback_comments,
    tomorrowFocus: normalized.tomorrow_focus,
    paywallEligible: engagement.paywallEligible,
  });
}
