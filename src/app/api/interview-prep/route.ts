import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { groqCreate } from "@/lib/groq";
import { spendCredits, interviewPrepSessionCredits } from "@/lib/credits";
import { isUserPro } from "@/lib/entitlements";

export interface InterviewQuestion {
  question: string;
  framework: string;
  keyPoints: string[];
  commonMistakes: string[];
}

const PROMPT_SYSTEM = `You are a senior PM interviewer at a top tech company. Generate exactly 5 PM interview questions for the given topic and level.

Ground every question in real interview practice: reference concrete frameworks where useful (CIRCLES, RICE, HEART, metric trees, trade-off matrices, STAR for behavioral, discovery vs delivery) — name the framework in the "framework" field when relevant.

Return ONLY valid JSON in this format:
{
  "questions": [
    {
      "question": "...",
      "framework": "...",
      "keyPoints": ["...", "..."],
      "commonMistakes": ["...", "..."]
    }
  ]
}

Rules:
- Questions must be specific, scenario-based, and tied to the topic/level — avoid vague prompts like "tell me about a time you..."
- Each question should feel like something asked at a strong tech company for this level
- Framework: 2-3 sentence answer structure / approach (name frameworks explicitly)
- keyPoints: 3-4 bullet points of what a great answer covers
- commonMistakes: 2-3 things weak candidates do wrong
- Vary question types: product sense, metrics, execution, strategy, behavioral`;

const ALLOWED_TOPICS = new Set([
  "Product Sense", "Metrics & Analytics", "Execution",
  "Strategy", "Behavioral", "Estimation", "General PM",
]);
const ALLOWED_LEVELS = new Set(["APM", "PM", "Senior PM", "Group PM / Director"]);

export async function POST(req: Request) {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  // Validate against allowlists to prevent prompt injection
  const rawTopic = (body.topic as string) || "General PM";
  const rawLevel = (body.level as string) || "PM";
  const topic = ALLOWED_TOPICS.has(rawTopic) ? rawTopic : "General PM";
  const level = ALLOWED_LEVELS.has(rawLevel) ? rawLevel : "PM";

  const sessionCost = interviewPrepSessionCredits();
  const pro = await isUserPro(userId);
  if (!pro) {
    const ok = await spendCredits(userId, sessionCost, "interview_prep");
    if (!ok) {
      const user = await prisma.user.findUnique({ where: { id: userId }, select: { credits: true } });
      return NextResponse.json({
        error: "insufficient_credits",
        credits: user?.credits ?? 0,
        needed: sessionCost,
      }, { status: 402 });
    }
  }

  const targetPack = await prisma.userJobTarget.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: { interviewPrepContext: true, job: { select: { title: true, company: true } } },
  });
  const ctx = targetPack?.interviewPrepContext;
  const ctxStr =
    ctx && typeof ctx === "object"
      ? JSON.stringify(ctx).slice(0, 4500)
      : "";

  const result = await groqCreate({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: PROMPT_SYSTEM },
      {
        role: "user",
        content: [
          `Topic: ${topic}`,
          `Level: ${level}`,
          targetPack?.job
            ? `User's target role context (from Jobs / JD flow): ${targetPack.job.title} at ${targetPack.job.company}.`
            : "",
          ctxStr
            ? `Enriched prep context (frameworks, company signals, archetype themes — use to make questions less generic):\n${ctxStr}`
            : "",
          "\nGenerate 5 PM interview questions that align with this context when provided.",
        ]
          .filter(Boolean)
          .join("\n"),
      },
    ],
    temperature: 0.7,
    max_tokens: 2048,
    response_format: { type: "json_object" },
  });

  const raw = result.choices[0]?.message?.content ?? "";
  let parsed: { questions: InterviewQuestion[] };
  try {
    const match = raw.match(/\{[\s\S]*\}/);
    parsed = JSON.parse(match?.[0] ?? raw);
  } catch {
    return NextResponse.json({ error: "Failed to parse interview questions" }, { status: 500 });
  }

  // Return updated credits balance for UI
  const updatedUser = await prisma.user.findUnique({ where: { id: userId }, select: { credits: true } });

  return NextResponse.json({
    questions: parsed.questions,
    credits: updatedUser?.credits ?? 0,
  });
}
