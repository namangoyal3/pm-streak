import { prisma } from "@/lib/prisma";
import { clamp } from "@/lib/pm-foundations";

const DEFAULT_FOCUS: Record<"user_focus" | "structure" | "data_thinking" | "tradeoffs", number> = {
  user_focus: 0.3,
  structure: 0.25,
  data_thinking: 0.25,
  tradeoffs: 0.2,
};

function scoreTo100(score1to5: number): number {
  return clamp(Math.round((score1to5 / 5) * 100), 0, 100);
}

function weightedRecency(index: number): number {
  // Newest gets highest weight.
  return Math.max(0.25, 1 - index * 0.08);
}

function normalizeFocus(raw: unknown) {
  const focus = { ...DEFAULT_FOCUS };
  if (!raw || typeof raw !== "object") return focus;
  const candidate = raw as Record<string, unknown>;
  const keys: Array<keyof typeof DEFAULT_FOCUS> = ["user_focus", "structure", "data_thinking", "tradeoffs"];
  let sum = 0;
  for (const key of keys) {
    const v = candidate[key];
    if (typeof v === "number" && Number.isFinite(v) && v > 0) {
      focus[key] = v;
    }
    sum += focus[key];
  }
  if (sum <= 0) return DEFAULT_FOCUS;
  for (const key of keys) {
    focus[key] = focus[key] / sum;
  }
  return focus;
}

export interface ReadinessPayload {
  overallReadiness: number;
  skillScores: {
    userFocus: number;
    structure: number;
    dataThinking: number;
    tradeoffs: number;
  };
  summary: string;
  sampleSize: number;
  paywallEligible: boolean;
}

export async function computeReadiness(userId: string): Promise<ReadinessPayload> {
  const [target, attempts, metric, user] = await Promise.all([
    prisma.userJobTarget.findFirst({
      where: { userId },
      include: { job: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.lessonAttempt.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
    prisma.userEngagementMetric.findUnique({ where: { userId } }),
    prisma.user.findUnique({ where: { id: userId }, select: { credits: true } }),
  ]);

  if (!attempts.length) {
    return {
      overallReadiness: 0,
      skillScores: { userFocus: 0, structure: 0, dataThinking: 0, tradeoffs: 0 },
      summary: "Complete a few daily cases to compute your readiness.",
      sampleSize: 0,
      paywallEligible: false,
    };
  }

  let userFocusSum = 0;
  let structureSum = 0;
  let dataSum = 0;
  let tradeoffSum = 0;
  let totalWeight = 0;

  attempts.forEach((a, idx) => {
    const w = weightedRecency(idx);
    totalWeight += w;
    userFocusSum += a.scoreUserFocus * w;
    structureSum += a.scoreStructure * w;
    dataSum += a.scoreData * w;
    tradeoffSum += a.scoreTradeoffs * w;
  });

  const avgUserFocus = userFocusSum / totalWeight;
  const avgStructure = structureSum / totalWeight;
  const avgData = dataSum / totalWeight;
  const avgTradeoffs = tradeoffSum / totalWeight;

  const skillScores = {
    userFocus: scoreTo100(avgUserFocus),
    structure: scoreTo100(avgStructure),
    dataThinking: scoreTo100(avgData),
    tradeoffs: scoreTo100(avgTradeoffs),
  };

  const focus = normalizeFocus(target?.job?.estimatedInterviewFocus);
  const overallReadiness = clamp(
    Math.round(
      skillScores.userFocus * focus.user_focus +
        skillScores.structure * focus.structure +
        skillScores.dataThinking * focus.data_thinking +
        skillScores.tradeoffs * focus.tradeoffs
    ),
    0,
    100
  );

  const dimensions = [
    { key: "User focus", value: skillScores.userFocus },
    { key: "Structure", value: skillScores.structure },
    { key: "Data thinking", value: skillScores.dataThinking },
    { key: "Trade-offs", value: skillScores.tradeoffs },
  ];
  dimensions.sort((a, b) => b.value - a.value);
  const strong = dimensions[0]?.key ?? "n/a";
  const weak = dimensions[dimensions.length - 1]?.key ?? "n/a";

  const paywallEligible =
    (metric?.totalAttempts ?? 0) >= 10 &&
    (metric?.activeDays ?? 0) >= 4 &&
    (user?.credits ?? 0) <= 0;

  return {
    overallReadiness,
    skillScores,
    summary: `Strongest: ${strong}. Weakest: ${weak}. Keep practicing to improve your interview readiness.`,
    sampleSize: attempts.length,
    paywallEligible,
  };
}

export async function computeReadinessForUserTarget(
  userId: string,
  userJobTargetId: string
): Promise<ReadinessPayload> {
  const target = await prisma.userJobTarget.findFirst({
    where: { id: userJobTargetId, userId },
    select: { id: true },
  });
  if (!target) {
    return {
      overallReadiness: 0,
      skillScores: { userFocus: 0, structure: 0, dataThinking: 0, tradeoffs: 0 },
      summary: "Target not found for this user.",
      sampleSize: 0,
      paywallEligible: false,
    };
  }
  return computeReadiness(userId);
}
