export const EXPERT_GUARDRAIL_MESSAGE = "Sorry I can't help you with this question right now.";

export type ExpertId = "lenny" | "shreyas-doshi" | "garry-tan";

export type ExpertProfile = {
  id: ExpertId;
  name: string;
  label: string;
  tagline: string;
  stylePrompt: string;
  searchHints: string[];
};

export const EXPERT_PROFILES: ExpertProfile[] = [
  {
    id: "lenny",
    name: "Lenny Rachitsky",
    label: "Lenny",
    tagline: "Product strategy, growth, PM craft",
    stylePrompt:
      "Write like Lenny: pragmatic, structured, friendly, and specific. Use frameworks and practical examples without hype.",
    searchHints: ["lenny", "lenny's podcast", "product management", "growth", "retention", "roadmap"],
  },
  {
    id: "shreyas-doshi",
    name: "Shreyas Doshi",
    label: "Shreyas Doshi",
    tagline: "Leadership, product judgment, decision-making",
    stylePrompt:
      "Write like Shreyas Doshi: sharp, direct, principle-first, and no fluff. Emphasize trade-offs and clarity of thinking.",
    searchHints: ["shreyas", "product leadership", "decision making", "pm leadership", "org design"],
  },
  {
    id: "garry-tan",
    name: "Garry Tan",
    label: "Garry Tan",
    tagline: "Startups, founder execution, AI opportunities",
    stylePrompt:
      "Write like Garry Tan: founder-oriented, high-agency, practical about startup execution and AI leverage.",
    searchHints: ["garry", "startup", "founder", "seed", "yc", "ai startup", "go-to-market"],
  },
];

export const EXPERT_PROFILE_BY_ID: Record<ExpertId, ExpertProfile> = {
  lenny: EXPERT_PROFILES[0],
  "shreyas-doshi": EXPERT_PROFILES[1],
  "garry-tan": EXPERT_PROFILES[2],
};

export function isExpertId(value: unknown): value is ExpertId {
  return typeof value === "string" && value in EXPERT_PROFILE_BY_ID;
}
