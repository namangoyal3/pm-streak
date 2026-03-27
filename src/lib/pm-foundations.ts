export const LESSON_TYPES = [
  "product_sense",
  "metrics",
  "execution",
  "strategy",
  "behavioral",
] as const;

export type LessonType = (typeof LESSON_TYPES)[number];

export type ParsedJd = {
  skills: string[];
  level: string;
  domain: string;
  mustHave: string[];
  niceToHave: string[];
  estimatedInterviewFocus: Record<LessonType, number>;
};

export type JDParseResult = ParsedJd;

export const PM_DIMENSIONS = [
  "user_focus",
  "structure",
  "data_thinking",
  "tradeoffs",
] as const;

export type PmDimension = (typeof PM_DIMENSIONS)[number];

export const PM_SKILL_KEYS = [
  "product_sense",
  "data_thinking",
  "execution",
  "communication",
  "prioritization",
  "tradeoffs",
  "experimentation",
] as const;

export const CRITICAL_FEEDBACK_MIN = 2;
export const CRITICAL_FEEDBACK_MAX = 3;

export const DEFAULT_FOCUS: Record<LessonType, number> = {
  product_sense: 0.24,
  metrics: 0.22,
  execution: 0.22,
  strategy: 0.16,
  behavioral: 0.16,
};

export function clampScore1to5(value: unknown): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return 1;
  const rounded = Math.round(parsed);
  if (rounded < 1) return 1;
  if (rounded > 5) return 5;
  return rounded;
}

export function mapFivePointToHundred(score: number): number {
  const normalized = clampScore1to5(score);
  return Math.round(((normalized - 1) / 4) * 100);
}

export function normalizeFocus(
  focus: Partial<Record<LessonType, number>> | null | undefined
): Record<LessonType, number> {
  const raw: Record<LessonType, number> = { ...DEFAULT_FOCUS };
  if (focus) {
    for (const key of LESSON_TYPES) {
      const value = Number(focus[key]);
      if (Number.isFinite(value) && value > 0) {
        raw[key] = value;
      }
    }
  }

  const sum = Object.values(raw).reduce((acc, value) => acc + value, 0);
  if (!sum || !Number.isFinite(sum)) return { ...DEFAULT_FOCUS };

  const normalized = {} as Record<LessonType, number>;
  for (const key of LESSON_TYPES) {
    normalized[key] = raw[key] / sum;
  }
  return normalized;
}

export function pickTopSkills(skills: string[], max = 4): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of skills) {
    const value = raw.trim().toLowerCase();
    if (!value || seen.has(value)) continue;
    seen.add(value);
    out.push(value);
    if (out.length >= max) break;
  }
  return out;
}

export function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.max(min, Math.min(max, value));
}

export function estimateDaysUntilTarget(targetDate: Date): number {
  const now = new Date();
  const diffMs = targetDate.getTime() - now.getTime();
  return Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
}

const DIMENSION_TO_SKILL: Record<PmDimension, (typeof PM_SKILL_KEYS)[number]> = {
  user_focus: "product_sense",
  structure: "communication",
  data_thinking: "data_thinking",
  tradeoffs: "tradeoffs",
};

export function ensureCanonicalSkills(scores: Record<PmDimension, number>): Record<string, number> {
  const mapped: Record<string, number> = {};
  for (const dimension of PM_DIMENSIONS) {
    mapped[DIMENSION_TO_SKILL[dimension]] = clampScore1to5(scores[dimension]);
  }
  return mapped;
}

import { prisma } from "@/lib/prisma";

export async function ensureSkillRows(): Promise<void> {
  await Promise.all(
    PM_SKILL_KEYS.map((key) =>
      prisma.skill.upsert({
        where: { key },
        update: {},
        create: {
          key,
          displayName: key
            .split("_")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" "),
        },
      })
    )
  );
}

export const LEGACY_FOCUS_KEYS = [
  "user_focus",
  "structure",
  "data_thinking",
  "tradeoffs",
] as const;

export type LegacyFocus = Record<(typeof LEGACY_FOCUS_KEYS)[number], number>;

export function mapPlanFocusToLegacy(
  focus: Record<LessonType, number>
): LegacyFocus {
  return {
    user_focus: focus.product_sense,
    structure: focus.execution,
    data_thinking: focus.metrics,
    tradeoffs: focus.strategy + focus.behavioral,
  };
}
