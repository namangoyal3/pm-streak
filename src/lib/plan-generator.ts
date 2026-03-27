import { JDParseResult, LESSON_TYPES } from "@/lib/pm-foundations";

export type PlanLessonItem = {
  dayIndex: number;
  lessonType: string;
  skillTags: string[];
};

export type GeneratedPlan = {
  planConfig: {
    days: number;
    sessionsPerWeek: number;
    lessonMix: Record<string, number>;
  };
  planLessons: PlanLessonItem[];
  sessionsPerWeek: number;
  weeks: Array<{
    weekIndex: number;
    startDay: number;
    endDay: number;
    lessonMix: Record<string, number>;
  }>;
  days: PlanLessonItem[];
};

export type LearningPlanInput = {
  parsed: {
    skills: string[];
    level: string;
    domain: string;
    estimatedInterviewFocus: Record<string, number>;
  };
  daysUntilTarget: number;
};

const DEFAULT_FOCUS = {
  product_sense: 0.3,
  metrics: 0.25,
  execution: 0.25,
  strategy: 0.1,
  behavioral: 0.1,
};

function normalizeFocus(input?: Record<string, number>): Record<string, number> {
  const source = input && Object.keys(input).length > 0 ? input : DEFAULT_FOCUS;
  const filtered = Object.entries(source)
    .filter(([k, v]) => LESSON_TYPES.includes(k as (typeof LESSON_TYPES)[number]) && Number.isFinite(v) && v > 0)
    .reduce<Record<string, number>>((acc, [k, v]) => {
      acc[k] = v;
      return acc;
    }, {});
  const total = Object.values(filtered).reduce((sum, v) => sum + v, 0);
  if (!total) return DEFAULT_FOCUS;
  const normalized: Record<string, number> = {};
  for (const [k, v] of Object.entries(filtered)) normalized[k] = v / total;
  return normalized;
}

function sessionsPerWeekForDays(daysUntilTarget: number): number {
  if (daysUntilTarget <= 15) return 7;
  if (daysUntilTarget <= 30) return 6;
  if (daysUntilTarget <= 60) return 5;
  return 4;
}

export function generatePlan({
  parsedJD,
  daysUntilTarget,
}: {
  parsedJD: JDParseResult;
  daysUntilTarget: number;
}): GeneratedPlan {
  const days = Math.max(7, Math.min(180, daysUntilTarget));
  const sessionsPerWeek = sessionsPerWeekForDays(days);
  const focus = normalizeFocus(parsedJD.estimatedInterviewFocus);

  const weightedTypes = Object.entries(focus)
    .flatMap(([lessonType, weight]) => {
      const copies = Math.max(1, Math.round(weight * 10));
      return Array.from({ length: copies }, () => lessonType);
    });
  const dayItems: PlanLessonItem[] = [];
  for (let dayIndex = 1; dayIndex <= days; dayIndex++) {
    const lessonType = weightedTypes[(dayIndex - 1) % weightedTypes.length] ?? "product_sense";
    const skillTags = Array.from(
      new Set([
        lessonType,
        ...parsedJD.skills.slice(0, 2),
        ...(lessonType === "metrics" ? ["data_thinking"] : []),
      ])
    );
    dayItems.push({ dayIndex, lessonType, skillTags });
  }

  const weekCount = Math.ceil(days / 7);
  const weeks = Array.from({ length: weekCount }, (_, i) => {
    const startDay = i * 7 + 1;
    const endDay = Math.min((i + 1) * 7, days);
    const mix: Record<string, number> = {};
    for (const d of dayItems) {
      if (d.dayIndex < startDay || d.dayIndex > endDay) continue;
      mix[d.lessonType] = (mix[d.lessonType] ?? 0) + 1;
    }
    return {
      weekIndex: i + 1,
      startDay,
      endDay,
      lessonMix: mix,
    };
  });

  return {
    planConfig: {
      days,
      sessionsPerWeek,
      lessonMix: focus,
    },
    planLessons: dayItems,
    sessionsPerWeek,
    weeks,
    days: dayItems,
  };
}

export function generateLearningPlan(input: LearningPlanInput): GeneratedPlan {
  const focus = Object.entries(input.parsed.estimatedInterviewFocus ?? {}).reduce<
    Record<string, number>
  >((acc, [key, value]) => {
    if (LESSON_TYPES.includes(key as (typeof LESSON_TYPES)[number])) {
      acc[key] = Number(value);
    }
    return acc;
  }, {});

  return generatePlan({
    parsedJD: {
      skills: input.parsed.skills,
      level: input.parsed.level,
      domain: input.parsed.domain,
      mustHave: [],
      niceToHave: [],
      estimatedInterviewFocus: {
        product_sense: focus.product_sense ?? DEFAULT_FOCUS.product_sense,
        metrics: focus.metrics ?? DEFAULT_FOCUS.metrics,
        execution: focus.execution ?? DEFAULT_FOCUS.execution,
        strategy: focus.strategy ?? DEFAULT_FOCUS.strategy,
        behavioral: focus.behavioral ?? DEFAULT_FOCUS.behavioral,
      },
    },
    daysUntilTarget: input.daysUntilTarget,
  });
}
