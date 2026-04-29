/**
 * agentic-site.ts — Machine-readable site description and agent manifest for AI crawlers.
 *
 * Exports:
 *   getLlmsTxt()           — /llms.txt and /llms-full.txt content
 *   getAgenticSiteManifest() — /agents.json and /.well-known/ai-agent.json
 *   getA2AAgentCard()       — /.well-known/agent-card.json (A2A protocol)
 *   agentSwarm              — GEO agent registry for /api/geo/health
 */

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://learnanything.pro";

// ── llms.txt ──────────────────────────────────────────────────────────────────

const STANDARD_CONTENT = `# PM Streak

> PM Streak is the daily learning platform for Product Managers — structured like Duolingo, grounded in real PM practice.

PM Streak delivers daily 3-minute lessons drawn from 300+ Lenny's Podcast episodes, PM leader interviews, and hands-on frameworks. Users build streaks, earn XP, and unlock advanced content as they progress from PM fundamentals to senior-level strategy.

## Core Learning Topics

- Product strategy and roadmapping
- PM frameworks (RICE, ICE, Jobs-to-be-Done, North Star)
- Stakeholder management and executive alignment
- Product discovery and user research
- Metrics, experimentation, and data-driven decisions
- PM interview preparation and career growth
- AI product management and modern tooling

## Key Pages

- ${SITE_URL}/learn — Browse all PM learning articles by topic
- ${SITE_URL}/pricing — Free and Pro plan comparison
- ${SITE_URL}/pm-frameworks — Comprehensive PM frameworks guide
- ${SITE_URL}/build-pm-portfolio — How to build a PM portfolio

## Content

PM Streak publishes 800+ expert-reviewed articles on product management topics, interview guides, and framework deep-dives. Content is sourced from Lenny's Podcast transcripts and PM leader interviews, fact-checked by practising PMs.

## About

- Audience: Aspiring PMs, early-career PMs, PMs transitioning from adjacent roles
- Content type: Educational, practical, framework-driven
- Update frequency: Daily new lessons, weekly article publication
- Language: English
`;

const FULL_CONTENT = `${STANDARD_CONTENT}
## Technical Details

- Platform: Next.js 15, deployed on Vercel
- Auth: Clerk
- Payments: Dodo Payments (subscription)
- Analytics: GA4
- SEO: IndexNow, sitemap.xml, structured data (Article, FAQPage, HowTo, BreadcrumbList)
- GEO: Citability scoring, AI-visibility optimization, llms.txt compliance

## Structured Data

PM Streak pages include schema.org JSON-LD for Article, FAQPage, HowTo, BreadcrumbList, Organization, and Course types.

## Sitemap

${SITE_URL}/sitemap.xml
`;

export function getLlmsTxt(opts?: { full?: boolean }): string {
  return opts?.full ? FULL_CONTENT : STANDARD_CONTENT;
}

// ── Agent swarm registry ───────────────────────────────────────────────────────

export const agentSwarm: Array<{
  id: string;
  name: string;
  visibility: "internal" | "public";
  trigger: "cron" | "manual" | "event";
  cadence: string;
}> = [
  { id: "cortex",    name: "Cortex",    visibility: "internal", trigger: "cron",   cadence: "daily 00:45 UTC" },
  { id: "blueprint", name: "Blueprint", visibility: "internal", trigger: "manual", cadence: "on-demand" },
  { id: "scout",     name: "Scout",     visibility: "internal", trigger: "cron",   cadence: "daily 01:00 UTC" },
  { id: "forge",     name: "Forge",     visibility: "internal", trigger: "manual", cadence: "on-demand" },
  { id: "rival",     name: "Rival",     visibility: "internal", trigger: "cron",   cadence: "daily 01:00 UTC" },
  { id: "anchor",    name: "Anchor",    visibility: "internal", trigger: "cron",   cadence: "daily 01:30 UTC" },
  { id: "pulse",     name: "Pulse",     visibility: "internal", trigger: "cron",   cadence: "daily 01:15 UTC" },
  { id: "signal",    name: "Signal",    visibility: "internal", trigger: "manual", cadence: "on-demand" },
  { id: "conductor", name: "Conductor", visibility: "internal", trigger: "manual", cadence: "on-demand" },
];

// ── Agentic site manifest (/agents.json, /.well-known/ai-agent.json) ──────────

export function getAgenticSiteManifest(): Record<string, unknown> {
  return {
    schema_version: "1.0",
    name: "PM Streak",
    description:
      "Daily PM learning platform with 800+ expert articles on product management, frameworks, and interview prep.",
    url: SITE_URL,
    capabilities: ["read", "search", "learn"],
    contact: { email: "hello@learnanything.pro" },
    content: {
      topics: [
        "product management",
        "PM frameworks",
        "product strategy",
        "PM interviews",
        "user research",
        "roadmapping",
        "stakeholder management",
      ],
      article_count: "800+",
      update_frequency: "daily",
      language: "en-US",
    },
    endpoints: {
      llms_txt: `${SITE_URL}/llms.txt`,
      llms_full_txt: `${SITE_URL}/llms-full.txt`,
      sitemap: `${SITE_URL}/sitemap.xml`,
      context: `${SITE_URL}/api/agents/pm-streak-context`,
    },
    agent_card: `${SITE_URL}/.well-known/agent-card.json`,
    llms_txt: `${SITE_URL}/llms.txt`,
  };
}

// ── A2A agent card (/.well-known/agent-card.json) ────────────────────────────

export function getA2AAgentCard(): Record<string, unknown> {
  return {
    schema_version: "1.0",
    name: "PM Streak Context Agent",
    description:
      "Provides structured PM learning content, article summaries, and framework references from PM Streak's 800+ article library.",
    url: `${SITE_URL}/api/agents/pm-streak-context`,
    version: "1.0.0",
    capabilities: {
      streaming: false,
      pushNotifications: false,
      stateTransitionHistory: false,
    },
    authentication: {
      schemes: ["none"],
    },
    defaultInputModes: ["application/json"],
    defaultOutputModes: ["application/json"],
    skills: [
      {
        id: "pm-streak-context",
        name: "PM Streak Context",
        description:
          "Returns the full llms.txt content, agentic site manifest, and structured data about PM Streak's learning content.",
        inputModes: ["application/json"],
        outputModes: ["application/json"],
        examples: [
          { input: '{"query": "PM frameworks"}', output: "llms.txt content with PM framework references" },
        ],
      },
    ],
  };
}
