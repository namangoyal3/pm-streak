import { groqCreate } from "@/lib/groq";
import { LESSON_TYPES, type JDParseResult } from "@/lib/pm-foundations";

const JD_PARSE_SYSTEM = `You are an expert PM interview prep analyst.
Given a job description, return ONLY valid JSON with this exact shape:
{
  "skills": ["product_sense", "data", "execution", "communication"],
  "level": "APM|PM|Senior PM|Director",
  "domain": "consumer|b2b|platform|fintech|ai|other",
  "must_have": ["..."],
  "nice_to_have": ["..."],
  "estimated_interview_focus": {
    "product_sense": number,
    "metrics": number,
    "execution": number,
    "strategy": number,
    "behavioral": number
  }
}

Rules:
- Use only lowercase snake_case keys.
- estimated_interview_focus values must be decimals between 0 and 1 and sum to 1.
- If unknown, infer best-effort from JD language.
- Return JSON only, no markdown.`;

const DEFAULT_FOCUS: JDParseResult["estimatedInterviewFocus"] = {
  product_sense: 0.24,
  metrics: 0.22,
  execution: 0.22,
  strategy: 0.16,
  behavioral: 0.16,
};

function clamp01(n: number): number {
  if (Number.isNaN(n)) return 0;
  return Math.min(1, Math.max(0, n));
}

function normalizeFocus(
  input: Partial<Record<(typeof LESSON_TYPES)[number], number>> | null | undefined
): JDParseResult["estimatedInterviewFocus"] {
  const raw: JDParseResult["estimatedInterviewFocus"] = { ...DEFAULT_FOCUS };
  for (const key of LESSON_TYPES) {
    const value = Number(input?.[key]);
    if (Number.isFinite(value) && value > 0) {
      raw[key] = clamp01(value);
    }
  }
  const sum = Object.values(raw).reduce((acc, value) => acc + value, 0);
  if (sum <= 0) return { ...DEFAULT_FOCUS };
  return {
    product_sense: raw.product_sense / sum,
    metrics: raw.metrics / sum,
    execution: raw.execution / sum,
    strategy: raw.strategy / sum,
    behavioral: raw.behavioral / sum,
  };
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean)
    .slice(0, 20);
}

function safeParseJson(raw: string): unknown {
  const match = raw.match(/\{[\s\S]*\}/);
  return JSON.parse(match?.[0] ?? raw);
}

function heuristicParse(rawJdText: string): JDParseResult {
  const text = rawJdText.toLowerCase();
  const skills = new Set<string>();

  if (/(metric|analytics|sql|ab test|experiment)/.test(text)) skills.add("data");
  if (/(roadmap|execution|delivery|prioriti)/.test(text)) skills.add("execution");
  if (/(user|customer|research|persona)/.test(text)) skills.add("product_sense");
  if (/(stakeholder|communicat|cross-functional|collaborat)/.test(text)) {
    skills.add("communication");
  }
  if (/(ai|machine learning|llm|genai)/.test(text)) skills.add("ai_pm");
  if (skills.size === 0) {
    skills.add("product_sense");
    skills.add("execution");
  }

  let level = "PM";
  if (/(apm|associate product manager)/.test(text)) level = "APM";
  if (/(senior product manager|sr\.?\s*pm)/.test(text)) level = "Senior PM";
  if (/(director|group product manager|head of product|vp product)/.test(text)) {
    level = "Director";
  }

  let domain = "other";
  if (/(b2b|enterprise|saas)/.test(text)) domain = "b2b";
  else if (/(consumer|b2c|mobile app|growth)/.test(text)) domain = "consumer";
  else if (/(platform|api|infra|developer)/.test(text)) domain = "platform";
  else if (/(fintech|payments|bank|risk)/.test(text)) domain = "fintech";
  else if (/(ai|machine learning|llm|genai)/.test(text)) domain = "ai";

  return {
    skills: Array.from(skills),
    level,
    domain,
    mustHave: [],
    niceToHave: [],
    estimatedInterviewFocus: normalizeFocus(null),
  };
}

export async function parseJdText(rawJdText: string): Promise<JDParseResult> {
  const trimmed = rawJdText.trim().slice(0, 24000);
  if (!trimmed) {
    throw new Error("JD text is empty");
  }

  try {
    const result = await groqCreate({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: JD_PARSE_SYSTEM },
        { role: "user", content: trimmed },
      ],
      temperature: 0.2,
      max_tokens: 1200,
      response_format: { type: "json_object" },
    });

    const raw = result.choices[0]?.message?.content ?? "";
    const parsed = safeParseJson(raw) as Record<string, unknown>;

    return {
      skills: toStringArray(parsed.skills),
      level: typeof parsed.level === "string" ? parsed.level : "PM",
      domain: typeof parsed.domain === "string" ? parsed.domain : "other",
      mustHave: toStringArray(parsed.must_have),
      niceToHave: toStringArray(parsed.nice_to_have),
      estimatedInterviewFocus: normalizeFocus(
        parsed.estimated_interview_focus as Partial<Record<(typeof LESSON_TYPES)[number], number>>
      ),
    };
  } catch {
    return heuristicParse(trimmed);
  }
}

export const parseJobDescription = parseJdText;
