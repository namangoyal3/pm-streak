import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { groqCreate } from "@/lib/groq";
import { spendCredits, CREDIT_COSTS } from "@/lib/credits";
import { isUserPro } from "@/lib/entitlements";

export interface InterviewQuestion {
  question: string;
  framework: string;
  keyPoints: string[];
  commonMistakes: string[];
}

const PROMPT_SYSTEM = `You are a senior PM interviewer at a top tech company. Generate exactly 5 PM interview questions for the given topic and level.

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
- Questions should be specific, scenario-based, not generic
- Framework: 2-3 sentence answer structure / approach
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

  // Credit gate: pro users skip; free users spend 5 credits
  const pro = await isUserPro(userId);
  if (!pro) {
    const ok = await spendCredits(userId, CREDIT_COSTS.interview_prep, "interview_prep");
    if (!ok) {
      const user = await prisma.user.findUnique({ where: { id: userId }, select: { credits: true } });
      return NextResponse.json({
        error: "insufficient_credits",
        credits: user?.credits ?? 0,
        needed: CREDIT_COSTS.interview_prep,
      }, { status: 402 });
    }
  }

  const result = await groqCreate({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: PROMPT_SYSTEM },
      { role: "user", content: `Topic: ${topic}\nLevel: ${level}\n\nGenerate 5 PM interview questions.` },
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
