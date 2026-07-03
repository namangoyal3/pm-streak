/**
 * Topic map for internal cross-linking of the static SEO landing pages.
 *
 * SINGLE SOURCE OF TRUTH: the slug list below is copied from the
 * `staticRoutes` array in `src/app/sitemap.ts` (the 439 single-slug SEO
 * landing pages; app/utility routes like /pricing, /login, /jobs are excluded).
 * When a new SEO page is added to `staticRoutes`, add its slug to exactly one
 * cluster here (or to "general") so the page joins the internal-linking graph.
 *
 * Every slug appears in exactly ONE cluster. Total slugs: 439.
 */

export interface TopicCluster {
  title: string;
  slugs: string[];
}

export interface RelatedLink {
  slug: string;
  title: string;
}

export const TOPIC_CLUSTERS: Record<string, TopicCluster> = {
  "company-interviews": {
    title: "Company PM Interviews",
    slugs: [
      "google-pm-interview", "flipkart-pm-interview", "razorpay-pm-interview",
      "amazon-pm-interview", "swiggy-pm-interview", "microsoft-pm-interview", "meta-pm-interview",
      "cred-zepto-pm-interview", "zomato-pm-interview", "phonepe-pm-interview",
      "meesho-pm-interview", "uber-ola-pm-interview", "paytm-pm-interview",
      "cars24-cartrade-pm-interview", "stripe-pm-interview", "airbnb-pm-interview",
      "pm-trello-notion-interview", "urban-company-pm-interview", "ixigo-makemytrip-pm-interview",
      "myntra-nykaa-pm-interview", "intuit-adobe-pm-interview", "pm-zepto-pm-interview",
    ],
  },
  "interview-types": {
    title: "PM Interview Rounds & Prep",
    slugs: [
      "pm-interview-prep", "product-manager-interview-questions", "product-sense-interview",
      "pm-metrics-interview", "pm-behavioral-interview", "senior-pm-interview",
      "pm-case-study-interview", "pm-technical-interview", "product-roadmap-interview",
      "pm-execution-interview", "pm-interview-questions-freshers", "pm-interview-preparation-plan",
      "pm-mock-interview", "pm-estimation-questions", "pm-interview-red-flags",
      "pm-interview-follow-up", "pm-remote-interview", "pm-interview-stories", "pm-case-bank",
      "pm-take-home-assignment", "pm-interview-day-checklist", "pm-product-sense-examples",
      "pm-interview-bar-raiser", "pm-interview-cheat-sheet",
    ],
  },
  "career": {
    title: "PM Career Paths & Roles",
    slugs: [
      "how-to-become-a-product-manager", "apm-program-preparation", "product-manager-resume",
      "product-manager-career-path", "transition-to-product-manager", "consumer-vs-b2b-pm",
      "product-manager-vs-project-manager", "fintech-product-manager", "saas-product-manager",
      "pm-portfolio-guide", "pm-cover-letter", "growth-product-manager", "mba-to-product-manager",
      "engineer-to-pm", "pm-consulting-to-pm", "platform-product-manager", "pm-job-search-india",
      "pm-career-mistakes", "healthtech-product-manager", "edtech-product-manager",
      "pm-first-90-days", "pm-networking-guide", "pm-30-60-90-day-plan", "pm-career-transitions",
      "pm-apm-vs-pm", "pm-first-job-guide", "pm-global-vs-india", "pm-measuring-pm-success",
      "pm-founder-vs-pm", "pm-startup-vs-big-tech", "pm-apm-to-senior", "pm-senior-to-principal",
      "pm-to-founder", "pm-manager-path", "pm-cpo-role", "pm-resume-guide", "pm-linkedin-branding",
      "pm-consulting-to-product", "pm-engineer-to-pm", "pm-designer-to-pm", "pm-analyst-to-pm",
      "pm-mba-to-pm", "pm-non-tech-to-pm", "pm-freelance-consulting", "pm-india-startups-2026",
      "pm-bay-area-vs-india",
    ],
  },
  "compensation": {
    title: "PM Salary & Compensation",
    slugs: [
      "product-manager-salary-india", "pm-salary-negotiation", "pm-career-levels-india",
      "pm-offers-multiple", "pm-salary-negotiation-india",
    ],
  },
  "frameworks-skills": {
    title: "PM Frameworks & Core Skills",
    slugs: [
      "product-management-frameworks", "product-manager-skills", "pm-okr-guide", "pm-tools-guide",
      "prd-template-guide", "pm-domain-knowledge", "pm-writing-skills", "pm-communication-skills",
      "pm-storytelling", "pm-decision-making", "pm-mental-models", "pm-cheat-sheet",
      "pm-prioritization-frameworks", "pm-roadmap-template", "pm-glossary", "pm-tech-stack",
      "pm-design-thinking", "pm-critical-thinking", "pm-user-flows", "pm-ambiguity-navigation",
      "pm-prd-examples", "pm-trade-off-analysis", "pm-okr-examples", "pm-prioritization-examples",
      "pm-technical-skills", "pm-roadmapping", "pm-decision-frameworks", "pm-okrs-guide",
      "pm-prd-writing", "pm-roadmap-prioritization", "pm-wireframing", "pm-estimation",
      "pm-personal-okrs", "pm-thinking-in-systems",
    ],
  },
  "metrics-experimentation": {
    title: "Metrics, Analytics & Experimentation",
    slugs: [
      "product-analytics-for-pms", "pm-experiment-design", "pm-north-star-metric",
      "pm-experiment-velocity", "pm-dashboard-design", "pm-kpi-guide", "pm-saas-metrics",
      "pm-kpi-dashboards", "pm-experiment-examples", "pm-ab-test-analysis", "pm-reading-metrics",
      "pm-launch-metrics", "pm-funnel-analysis", "pm-cohort-analysis", "pm-event-tracking",
      "pm-churn-analysis", "pm-experimentation-culture", "pm-mobile-app-metrics",
      "pm-analytics-tools", "pm-data-products", "pm-ab-testing", "pm-product-analytics",
      "pm-experimentation-platform", "pm-attribution-models",
    ],
  },
  "growth-monetization": {
    title: "Growth, Retention & Monetization",
    slugs: [
      "product-growth-loops", "pm-retention-guide", "pm-onboarding-guide", "pm-habit-products",
      "pm-growth-loops", "pm-activation", "pm-notifications-design", "pm-onboarding-examples",
      "pm-referral-programs", "pm-user-retention", "pm-retention-strategies", "pm-cold-start",
      "pm-growth-hacking", "pm-feature-adoption", "pm-viral-features", "pm-search-discovery",
      "pm-notifications-strategy", "pm-onboarding-design", "pm-churn-reduction",
      "pm-referral-loops", "pm-feedback-loops", "pm-product-led-growth", "pm-personalization",
      "pm-growth-experiments", "pm-conversion-optimization", "pm-loyalty-programs",
      "pm-pricing-guide", "pm-pricing-experiments", "pm-freemium", "pm-pricing-strategy",
      "pm-subscription-business", "pm-pricing-page-design", "pm-monetization-models",
      "pm-checkout-design", "pm-paywall-design",
    ],
  },
  "research-discovery": {
    title: "User Research & Product Discovery",
    slugs: [
      "product-discovery-guide", "user-research-for-pms", "pm-competitive-analysis",
      "pm-market-research", "pm-customer-support-insights", "pm-competitor-teardown",
      "pm-customer-segmentation", "pm-empathy-interviews", "pm-user-personas", "pm-dogfooding",
      "pm-customer-research", "pm-beta-program", "pm-customer-interviews", "pm-mvp-guide",
      "pm-product-market-fit", "pm-zero-to-one", "pm-user-interviews", "pm-discovery-process",
      "pm-jtbd",
    ],
  },
  "execution-process": {
    title: "Execution, Strategy & Process",
    slugs: [
      "pm-strategy-guide", "product-launch-guide", "pm-weekly-planning", "pm-strategy-doc",
      "pm-quarterly-planning", "pm-sprint-planning", "pm-weekly-review", "pm-vision-statement",
      "pm-kickoff-doc", "pm-internal-tools", "pm-retrospectives", "pm-rituals", "pm-deprecations",
      "pm-bold-bets", "pm-engineering-estimate", "pm-documentation", "pm-sprint-retrospectives",
      "pm-scaling-from-pmf", "pm-product-ops", "pm-accessibility", "pm-product-operations",
      "pm-launch-strategy", "pm-product-reviews", "pm-agile-rituals", "pm-tech-debt",
      "pm-strategy-docs", "pm-product-vision", "pm-workflow-automation", "pm-internationalisation",
      "pm-incident-management", "pm-sre-culture", "pm-microservices-strategy", "pm-feature-flags",
      "pm-localization-strategy",
    ],
  },
  "leadership-collaboration": {
    title: "Leadership & Collaboration",
    slugs: [
      "pm-stakeholder-management", "pm-leadership-guide", "pm-negotiation-skills",
      "pm-1-on-1-guide", "pm-feedback-guide", "pm-hiring-guide", "pm-meetings-guide",
      "pm-demo-skills", "pm-executive-updates", "pm-b2b-sales-collaboration",
      "pm-conviction-pushback", "pm-founder-collaboration", "pm-roadmap-communication",
      "pm-mentorship", "pm-data-analyst-partnership", "pm-crisis-management",
      "pm-cross-functional", "pm-qa-partnership", "pm-stakeholder-map", "pm-b2b-sales-led",
      "pm-customer-success", "pm-presentations", "pm-influence", "pm-negotiation",
      "pm-designer-partnership", "pm-eng-partnership", "pm-sales-ops", "pm-marketing-partnership",
    ],
  },
  "productivity-habits": {
    title: "PM Productivity & Habits",
    slugs: [
      "duolingo-for-product-managers", "pm-remote-work", "pm-daily-practice", "pm-side-projects",
      "pm-productivity-guide", "pm-burnout", "pm-failures-recovery", "pm-hackathon-guide",
      "pm-habits", "pm-deep-work", "pm-reading-list", "pm-intellectual-honesty",
      "pm-anti-patterns", "pm-async-work", "pm-imposter-syndrome", "pm-work-life-balance",
      "pm-building-in-public", "pm-learning-habits", "pm-newsletters", "pm-podcasts-to-listen",
    ],
  },
  "ai-pm": {
    title: "AI Product Management",
    slugs: [
      "ai-product-manager", "pm-ai-products", "pm-ai-agents", "pm-ai-evals", "pm-ai-coding-tools",
      "pm-ai-search", "pm-ai-image", "pm-ai-video", "pm-ai-voice", "pm-ai-writing",
      "pm-ai-meeting", "pm-ai-sales", "pm-ai-support", "pm-ai-recruiting", "pm-ai-finance",
      "pm-ai-healthcare", "pm-ai-education", "pm-ai-legal", "pm-ai-data-products",
      "pm-ai-research-tools", "pm-ai-hardware", "pm-ai-robotics", "pm-ai-security",
      "pm-ai-marketing", "pm-ai-productivity", "pm-rag-products", "pm-fine-tuning",
      "pm-prompt-engineering", "pm-llm-cost-management", "pm-ai-safety", "pm-multimodal-products",
      "pm-context-windows", "pm-tool-use", "pm-llm-routing", "pm-ai-personalization",
      "pm-ai-onboarding", "pm-ai-monetization", "pm-ai-distribution", "pm-ai-trust-signals",
      "pm-ai-feedback-loops", "pm-ai-bring-your-own-key", "pm-mcp-products", "pm-ai-assistants",
      "pm-ai-pricing-tiers", "pm-ai-rate-limits", "pm-ai-feature-launch", "pm-ai-roi-measurement",
      "pm-ai-prompt-injection", "pm-ai-versioning", "pm-ai-pm-interview",
    ],
  },
  "india-market": {
    title: "India Market & Fintech",
    slugs: [
      "ecommerce-pm-guide", "pm-localization-india", "pm-consumer-india", "pm-fintech-india",
      "pm-bharat-products", "pm-fintech-payments", "pm-quick-commerce", "pm-d2c-brands",
      "pm-food-delivery", "pm-ride-hailing", "pm-matrimony-dating", "pm-ott-india",
      "pm-wealth-management", "pm-upi-products", "pm-lending-products", "pm-neo-banking",
      "pm-govt-tech", "pm-ondc", "pm-account-aggregator", "pm-whatsapp-business", "pm-digital-sbu",
      "pm-ecommerce-india", "pm-grocery-tech", "pm-bharat-internet-users",
      "pm-global-saas-from-india", "pm-offline-first",
    ],
  },
  "product-types": {
    title: "Product Types & Platforms",
    slugs: [
      "pm-mobile-vs-web", "pm-marketplace-products", "pm-platform-products", "pm-content-products",
      "pm-b2b-products", "pm-early-stage-startup", "pm-api-products", "pm-community-building",
      "pm-creator-economy", "pm-developer-tools", "pm-content-moderation", "pm-gaming",
      "pm-platform-strategy", "pm-voice-products", "pm-social-products", "pm-video-products",
      "pm-recommendation-systems", "pm-marketplace-dynamics", "pm-security-products",
      "pm-infra-products", "pm-mobile-first", "pm-web3", "pm-hardware-products", "pm-no-code",
      "pm-spatial-computing", "pm-regulated-industries", "pm-dev-productivity", "pm-api-platforms",
      "pm-trust-safety", "pm-privacy-products", "pm-media-products", "pm-music-products",
      "pm-b2b-marketplaces", "pm-observability", "pm-vertical-saas", "pm-open-source",
      "pm-chat-apps",
    ],
  },
  "industry-verticals": {
    title: "Industry Verticals",
    slugs: [
      "pm-healthtech", "pm-edtech", "pm-logistics", "pm-insurtech", "pm-agritech",
      "pm-climatetech", "pm-crm-products", "pm-email-products", "pm-collaboration-tools",
      "pm-real-estate-tech", "pm-jobs-platforms", "pm-legal-tech", "pm-hr-tech", "pm-martech",
      "pm-customer-support-tech", "pm-project-management-tools", "pm-notes-apps",
      "pm-calendar-products", "pm-fashion-tech", "pm-beauty-tech", "pm-electronics-ecommerce",
      "pm-kids-products", "pm-senior-products", "pm-women-focused-products", "pm-maps-navigation",
      "pm-podcast-products", "pm-reading-apps", "pm-meditation-apps", "pm-fitness-apps",
      "pm-language-learning", "pm-pet-tech", "pm-car-tech", "pm-music-creation-tools",
      "pm-design-tools", "pm-video-editing-tools",
    ],
  },
  "general": {
    title: "More PM Guides",
    slugs: [
      // Catch-all for future stragglers — currently every slug lands in a named cluster.
    ],
  },
};

/** Acronyms and brand names that plain Title Case would get wrong. */
const ACRONYMS: Record<string, string> = {
  pm: "PM", ai: "AI", apm: "APM", okr: "OKR", okrs: "OKRs", kpi: "KPI",
  prd: "PRD", mvp: "MVP", pmf: "PMF", jtbd: "JTBD", ab: "A/B",
  b2b: "B2B", d2c: "D2C", saas: "SaaS", mba: "MBA", cpo: "CPO", hr: "HR",
  qa: "QA", sre: "SRE", api: "API", crm: "CRM", llm: "LLM", rag: "RAG",
  mcp: "MCP", roi: "ROI", upi: "UPI", ondc: "ONDC", ott: "OTT", sbu: "SBU",
  linkedin: "LinkedIn", whatsapp: "WhatsApp", phonepe: "PhonePe",
  makemytrip: "MakeMyTrip", cartrade: "CarTrade",
};

/** Connector words kept lowercase unless they start the title. */
const SMALL_WORDS: ReadonlySet<string> = new Set([
  "a", "an", "and", "as", "at", "for", "from", "in", "of", "on", "or", "the", "to", "vs", "with",
]);

/** Derive a human-readable title from a kebab-case slug. */
export function titleFromSlug(slug: string): string {
  return slug
    .split("-")
    .map((word, index) => {
      const acronym = ACRONYMS[word];
      if (acronym) return acronym;
      if (index > 0 && SMALL_WORDS.has(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

/** Reverse index: slug -> cluster key. Built once at module load. */
const CLUSTER_OF: ReadonlyMap<string, string> = new Map(
  Object.entries(TOPIC_CLUSTERS).flatMap(([key, cluster]) =>
    cluster.slugs.map((slug): [string, string] => [slug, key]),
  ),
);

/**
 * Same-cluster sibling pages for a slug, excluding itself.
 *
 * Deterministic: walks the cluster in order starting just AFTER the slug's own
 * position (wrapping around), so each page links to a different window of its
 * cluster instead of every page pointing at the same first four siblings.
 * Returns [] for slugs outside the topic map.
 */
export function relatedSlugs(slug: string, count: number = 4): RelatedLink[] {
  const clusterKey = CLUSTER_OF.get(slug);
  if (!clusterKey) return [];
  const { slugs } = TOPIC_CLUSTERS[clusterKey];
  const index = slugs.indexOf(slug);
  const rotated = [...slugs.slice(index + 1), ...slugs.slice(0, index)];
  return rotated
    .slice(0, Math.max(0, count))
    .map((sibling): RelatedLink => ({ slug: sibling, title: titleFromSlug(sibling) }));
}
