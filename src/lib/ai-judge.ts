import { groqCreate } from "@/lib/groq";
import {
  CRITICAL_FEEDBACK_MAX,
  CRITICAL_FEEDBACK_MIN,
  PM_DIMENSIONS,
  PM_SKILL_KEYS,
  type PmDimension,
} from "@/lib/pm-foundations";

export type JudgeScores = Record<PmDimension, number>;

export interface JudgeResult {
  scores: JudgeScores;
  feedback_comments: string[];
  skill_deltas: Array<{ skill: string; delta: number }>;
  feedback_summary: string;
}

const SYSTEM_PROMPT = `You are a strict PM interview coach.
Judge the answer and return ONLY valid JSON.

Rules:
- Be direct and critical. Avoid generic praise.
- Score each dimension from 1 to 5 only.
- feedback_comments must be 2-3 short critical sentences.
- skill_deltas must use only these skill keys:
  product_sense, data_thinking, execution, communication, prioritization, tradeoffs, experimentation
- delta range is -10 to +10.

JSON schema:
{
  "scores": {
    "user_focus": 1,
    "structure": 1,
    "data_thinking": 1,
    "tradeoffs": 1
  },
  "feedback_comments": ["...", "..."],
  "skill_deltas": [
    { "skill": "product_sense", "delta": -2 }
  ],
  "feedback_summary": "One short sentence with the main improvement area."
}`;

function safeParseJson(raw: string): unknown {
  const match = raw.match(/\{[\s\S]*\}/);
  const json = match?.[0] ?? raw;
  return JSON.parse(json);
}

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === "string").map((s) => s.trim()).filter(Boolean);
}

function clampScore(value: unknown): number {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return 1;
  return Math.max(1, Math.min(5, Math.round(n)));
}

function validateJudgeResult(parsed: unknown): JudgeResult {
  if (!parsed || typeof parsed !== "object") {
    throw new Error("Invalid judge response: not an object");
  }

  const root = parsed as Record<string, unknown>;
  const rawScores = (root.scores ?? {}) as Record<string, unknown>;
  const scores: JudgeScores = {
    user_focus: clampScore(rawScores.user_focus),
    structure: clampScore(rawScores.structure),
    data_thinking: clampScore(rawScores.data_thinking),
    tradeoffs: clampScore(rawScores.tradeoffs),
  };

  let feedback = normalizeStringArray(root.feedback_comments).slice(
    0,
    CRITICAL_FEEDBACK_MAX
  );
  if (feedback.length < CRITICAL_FEEDBACK_MIN) {
    feedback = [
      "Your answer is too generic and misses specifics from the prompt.",
      "The structure is weak; make your reasoning explicit with clear steps.",
    ];
  }

  const rawDeltas = Array.isArray(root.skill_deltas) ? root.skill_deltas : [];
  const skill_deltas = rawDeltas
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const obj = item as Record<string, unknown>;
      const skill = typeof obj.skill === "string" ? obj.skill : "";
      const deltaNum = typeof obj.delta === "number" ? obj.delta : Number(obj.delta ?? 0);
      if (!PM_SKILL_KEYS.includes(skill as (typeof PM_SKILL_KEYS)[number])) return null;
      if (!Number.isFinite(deltaNum)) return null;
      return {
        skill,
        delta: Math.max(-10, Math.min(10, Math.round(deltaNum))),
      };
    })
    .filter((v): v is { skill: string; delta: number } => !!v);

  const summary =
    typeof root.feedback_summary === "string" && root.feedback_summary.trim().length > 0
      ? root.feedback_summary.trim().slice(0, 280)
      : "Improve structure and support your recommendation with clear user and metric reasoning.";

  return {
    scores,
    feedback_comments: feedback,
    skill_deltas,
    feedback_summary: summary,
  };
}

export async function judgePmAnswer(params: {
  lessonPrompt: string;
  userAnswer: string;
  referenceAnswers?: string[];
}): Promise<JudgeResult> {
  const references =
    params.referenceAnswers && params.referenceAnswers.length > 0
      ? `\nReference strong answers:\n${params.referenceAnswers.map((r, i) => `${i + 1}. ${r}`).join("\n")}`
      : "";

  const response = await groqCreate({
    model: "llama-3.3-70b-versatile",
    temperature: 0.3,
    max_tokens: 1200,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `Prompt:\n${params.lessonPrompt}\n\nUser answer:\n${params.userAnswer}${references}\n\nReturn strict JSON only.`,
      },
    ],
  });

  const raw = response.choices[0]?.message?.content ?? "";
  const parsed = safeParseJson(raw);
  const validated = validateJudgeResult(parsed);

  // Ensure all dimensions are present.
  for (const dimension of PM_DIMENSIONS) {
    if (!validated.scores[dimension]) {
      validated.scores[dimension] = 1;
    }
  }

  return validated;
}

export async function judgeAttempt(params: {
  promptText: string;
  userAnswer: string;
  referenceAnswers?: string[];
}) {
  const judged = await judgePmAnswer({
    lessonPrompt: params.promptText,
    userAnswer: params.userAnswer,
    referenceAnswers: params.referenceAnswers,
  });

  return {
    scores: judged.scores,
    feedback_comments: judged.feedback_comments,
    skill_deltas: judged.skill_deltas,
    feedback_summary: judged.feedback_summary,
  };
}

export function normalizeJudgeResponse(input: Awaited<ReturnType<typeof judgeAttempt>>) {
  const scoreFallback = input.scores;
  const deltaByDimension: Partial<
    Record<"user_focus" | "structure" | "data_thinking" | "tradeoffs", number>
  > = {};
  for (const item of input.skill_deltas) {
    const normalized = Math.max(1, Math.min(5, 3 + Math.round(item.delta / 3)));
    if (item.skill === "product_sense") deltaByDimension.user_focus = normalized;
    if (item.skill === "communication") deltaByDimension.structure = normalized;
    if (item.skill === "data_thinking") deltaByDimension.data_thinking = normalized;
    if (item.skill === "tradeoffs") deltaByDimension.tradeoffs = normalized;
  }

  return {
    scores: scoreFallback,
    feedback_comments: input.feedback_comments.slice(0, CRITICAL_FEEDBACK_MAX),
    skill_deltas: {
      user_focus: deltaByDimension.user_focus,
      structure: deltaByDimension.structure,
      data_thinking: deltaByDimension.data_thinking,
      tradeoffs: deltaByDimension.tradeoffs,
    },
    tomorrow_focus: input.feedback_summary,
  };
}
