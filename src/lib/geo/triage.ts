// Deterministic triage rule. Mirrors the LLM rules in src/agents/retrofit/spec.ts.
// We keep this in code so the cron route can decide most rows WITHOUT an LLM call,
// and only escalate to the Retrofit Lyzr agent when human-judgment is required
// (currently: merge-cluster detection across multiple rows).

export type Tier = "winner" | "uplift" | "rewrite" | "merge" | "kill";
export type NextAction =
  | "snapshot"
  | "inject_schema"
  | "append_faq"
  | "internal_links"
  | "forge_rewrite"
  | "merge_into"
  | "redirect"
  | "noop";

export type TriageInput = {
  slug: string;
  currentCitability: number | null;
  ga4Sessions30d: number | null;
  attributedLeads30d: number | null;
  hasArticleSchema: boolean;
  hasFaqSchema: boolean;
  hasFaqSection: boolean;
  wordCount: number | null;
};

export type TriageDecision = {
  slug: string;
  tier: Tier;
  next_action: NextAction;
  rationale: string;
  expected_lift: "low" | "medium" | "high";
};

export function decide(p: TriageInput): TriageDecision {
  const c = p.currentCitability;
  const sess = p.ga4Sessions30d ?? 0;
  const leads = p.attributedLeads30d ?? 0;
  const wc = p.wordCount ?? 0;

  // 1. No citability snapshot yet → ask Pulse first.
  if (c === null) {
    return {
      slug: p.slug,
      tier: "uplift",
      next_action: "snapshot",
      rationale: "No citability snapshot yet; defer to Pulse.",
      expected_lift: "low",
    };
  }

  // 2. Winner: protect.
  if (c >= 80 && sess >= 200 && leads >= 1) {
    return {
      slug: p.slug,
      tier: "winner",
      next_action: "noop",
      rationale: `Winner (citability=${c}, ${sess} sessions, ${leads} leads). Protect.`,
      expected_lift: "low",
    };
  }

  // 3. Schema gap (cheap, no rewrite).
  if (!p.hasArticleSchema || !p.hasFaqSchema) {
    return {
      slug: p.slug,
      tier: "uplift",
      next_action: "inject_schema",
      rationale: "Missing Article and/or FAQPage JSON-LD; cheap uplift.",
      expected_lift: "medium",
    };
  }

  // 4. FAQ section missing on a sufficiently long page.
  if (!p.hasFaqSection && wc >= 600) {
    return {
      slug: p.slug,
      tier: "uplift",
      next_action: "append_faq",
      rationale: "Long page without FAQ; append 5 Q&A.",
      expected_lift: "medium",
    };
  }

  // 5. Underperforming → full rewrite.
  if (c < 70 || (leads === 0 && sess >= 50)) {
    return {
      slug: p.slug,
      tier: "rewrite",
      next_action: "forge_rewrite",
      rationale:
        c < 70
          ? `Citability ${c} below 70 floor; rewrite.`
          : `${sess} sessions but 0 leads in 30d; rewrite.`,
      expected_lift: "high",
    };
  }

  // 6. Kill: thin and unloved.
  if (wc < 300 && sess < 5) {
    return {
      slug: p.slug,
      tier: "kill",
      next_action: "redirect",
      rationale: `Thin (${wc} words) and untrafficked (${sess} sessions); 301 to nearest pillar.`,
      expected_lift: "low",
    };
  }

  // 7. Healthy mid-tier → reinforce internal linking.
  return {
    slug: p.slug,
    tier: "uplift",
    next_action: "internal_links",
    rationale: "Healthy mid-tier; topical reinforcement via internal links.",
    expected_lift: "low",
  };
}
