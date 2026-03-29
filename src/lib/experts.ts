export const EXPERT_GUARDRAIL_MESSAGE = "Sorry I can't help you with this question right now.";

export type ExpertId = "lenny" | "shreyas-doshi" | "garry-tan";

export type ExpertOnlineSource = {
  platform: "youtube" | "twitter" | "linkedin" | "blog";
  url: string;
  label: string;
};

export type ExpertProfile = {
  id: ExpertId;
  name: string;
  label: string;
  tagline: string;
  stylePrompt: string;
  searchHints: string[];
  onlineSources: ExpertOnlineSource[];
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
    onlineSources: [
      {
        platform: "youtube",
        url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCaEq8_cRdwbqp2JiDeSXuuA",
        label: "Lenny YouTube",
      },
      {
        platform: "twitter",
        url: "https://nitter.net/lennysan/rss",
        label: "Lenny on X/Twitter",
      },
      {
        platform: "linkedin",
        url: "https://rsshub.app/linkedin/posts/lennyrachitsky",
        label: "Lenny on LinkedIn",
      },
      {
        platform: "blog",
        url: "https://www.lennysnewsletter.com/feed",
        label: "Lenny Newsletter",
      },
    ],
  },
  {
    id: "shreyas-doshi",
    name: "Shreyas Doshi",
    label: "Shreyas Doshi",
    tagline: "Leadership, product judgment, decision-making",
    stylePrompt:
      "Write like Shreyas Doshi: sharp, direct, principle-first, and no fluff. Emphasize trade-offs and clarity of thinking.",
    searchHints: ["shreyas", "product leadership", "decision making", "pm leadership", "org design"],
    onlineSources: [
      {
        platform: "twitter",
        url: "https://nitter.net/shreyas/rss",
        label: "Shreyas on X/Twitter",
      },
      {
        platform: "linkedin",
        url: "https://rsshub.app/linkedin/posts/shreyasdoshi",
        label: "Shreyas on LinkedIn",
      },
      {
        platform: "blog",
        url: "https://shreyasdoshi.substack.com/feed",
        label: "Shreyas Substack",
      },
    ],
  },
  {
    id: "garry-tan",
    name: "Garry Tan",
    label: "Garry Tan",
    tagline: "Startups, founder execution, AI opportunities",
    stylePrompt:
      "Write like Garry Tan: founder-oriented, high-agency, practical about startup execution and AI leverage.",
    searchHints: ["garry", "startup", "founder", "seed", "yc", "ai startup", "go-to-market"],
    onlineSources: [
      {
        platform: "youtube",
        url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCcefcZRL2oaA_uBNeo5UOWg",
        label: "Garry Tan YouTube",
      },
      {
        platform: "twitter",
        url: "https://nitter.net/garrytan/rss",
        label: "Garry on X/Twitter",
      },
      {
        platform: "linkedin",
        url: "https://rsshub.app/linkedin/posts/garrytan",
        label: "Garry on LinkedIn",
      },
      {
        platform: "blog",
        url: "https://www.ycombinator.com/blog/rss/",
        label: "Y Combinator Blog",
      },
    ],
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
