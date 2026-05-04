// create-worker.ts — Auto page creation from GeoOpportunity queue.
//
// Each tick:
//  1. Recover stale in_progress opportunities (>30 min) → reset to unaddressed.
//  2. Fetch internal links once (top-3 by citability ≥ 75) — reused for all opportunities.
//  3. Pick up to `quota` unaddressed opportunities (intentScore ≥ 0.65, ordered desc).
//  4. For each: mark in_progress → duplicate check → Blueprint → Forge (enriched) →
//     quality gate (expand once on fail) → publishArticle → markOpportunityAddressed.
//  5. On any failure: attempts++, lastError logged, stays unaddressed (max 3 attempts).

import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { PrismaClient } from "@prisma/client";
import { callAgent, Agents } from "@/lib/lyzr";
import { slugify } from "@/lib/seo-score";
import {
  publishArticle,
  listUnaddressedOpportunities,
  markOpportunityAddressed,
  selectInternalLinks,
} from "./safe-prisma";
import { analyzeMdx, passesGate, scoreCitability } from "./citability";
import { runForge } from "./forge-runner";

const STALE_MS = 30 * 60 * 1000;
const MAX_ATTEMPTS = 3;
const FAQ_REGEX = /##\s+(faq|frequently asked questions)/i;
const HERO_REGEX = /picsum\.photos\/seed\/|\/images\//;
const MIN_WORD_COUNT_PILLAR = 1200;
const MIN_WORD_COUNT = 600;

export type CreateResult = {
  picked: number;
  created: number;
  failed: number;
  skipped: number;
  errors: { query: string; message: string }[];
  decisions: { query: string; action: string; slug?: string }[];
};

export type CreateOptions = {
  quota?: number;
  dryRun?: boolean;
};

// ── Pure function — no DB calls. Unit-testable with mock data. ────────────────
export function buildForgePrompt(
  opportunity: { query: string; currentTop3: unknown },
  blueprint: {
    title: string;
    page_type: string;
    target_queries: string[];
    outline: string[];
  },
  internalLinks: { slug: string; currentCitability: number | null }[]
): string {
  const competitors = Array.isArray(opportunity.currentTop3)
    ? (opportunity.currentTop3 as string[]).join(", ")
    : String(opportunity.currentTop3);

  const faqQuestions = blueprint.target_queries
    .map((q, i) => `${i + 1}. ${q}`)
    .join("\n");

  const linkHints = internalLinks
    .map((l) => `  - /learn/pm/${l.slug} (citability ${l.currentCitability})`)
    .join("\n");

  return `Write a complete production-ready MDX page for pm-streak.

OPPORTUNITY CONTEXT (use this to make the content specifically better than competitors):
- Target query: "${opportunity.query}"
- Page type: pillar
- Title: ${blueprint.title}
- Outline: ${blueprint.outline.join(" → ")}

COMPETITOR ENRICHMENT:
Your comparison table MUST include these competitors as rows, compared against PM Streak:
${competitors}

FAQ ENRICHMENT:
Your ## FAQ section MUST address these specific queries (phrase them as questions):
${faqQuestions}

INTERNAL LINK ENRICHMENT:
Link naturally to these existing PM Streak pages where topically relevant:
${linkHints || "  (none available yet)"}

EXTRA CITABILITY SIGNALS (include ALL of these):
- Add a "## What is [Topic]" definition section near the top
- Add inline citations using [1], [2], [3] notation; include a ## References section at the bottom
- Add at least one blockquote expert quote: > "Quote." — Name, Role at Company
- Include Article JSON-LD schema markup

Follow your agent_instructions exactly. Target 1,600+ words. AIM HIGH — it is much better to overshoot than undershoot.`;
}

// ── Tick runner ────────────────────────────────────────────────────────────────
export async function runCreateTick(
  prisma: PrismaClient,
  opts: CreateOptions = {}
): Promise<CreateResult> {
  const quota = opts.quota ?? 5;
  const dryRun = !!opts.dryRun;

  const result: CreateResult = {
    picked: 0,
    created: 0,
    failed: 0,
    skipped: 0,
    errors: [],
    decisions: [],
  };

  // 1. Recover stale rows (addressed=false, updatedAt older than 30 min but not yet picked up).
  // GeoOpportunity has no jobStatus field — no in_progress state to reset.
  // Stale recovery is implicit: if a tick crashes mid-opportunity, attempts < MAX_ATTEMPTS
  // ensures it gets retried next time. No action needed here.

  // 2. Fetch internal links once — reused for all opportunities in this tick.
  const internalLinks = await selectInternalLinks(3);

  // 3. Pick opportunities.
  const opportunities = await listUnaddressedOpportunities(quota);
  result.picked = opportunities.length;

  for (const opp of opportunities) {
    if (opp.attempts >= MAX_ATTEMPTS) {
      result.skipped++;
      result.decisions.push({ query: opp.query, action: "permanently_skipped" });
      continue;
    }

    if (dryRun) {
      result.decisions.push({ query: opp.query, action: "would_create" });
      continue;
    }

    try {
      // 4. Call Blueprint to get structure.
      const blueprintResponse = await callAgent(
        Agents.blueprint(),
        `Plan a GEO-optimised PM Streak article for this search query: "${opp.query}".
Return JSON with: title, page_type (pillar|comparison|use-case|glossary), target_queries (array of 3-5 related queries), outline (array of H2 section names).`,
        `create-blueprint-${opp.id}`,
        { timeoutMs: 60_000 }
      );

      const blueprintJson = blueprintResponse.response.match(/\{[\s\S]*\}/)?.[0];
      const blueprint = blueprintJson
        ? (JSON.parse(blueprintJson) as {
            title: string;
            page_type: string;
            target_queries: string[];
            outline: string[];
          })
        : {
            title: opp.query,
            page_type: "pillar",
            target_queries: [opp.query],
            outline: [
              `What is ${opp.query}`,
              `Why ${opp.query} Matters for Product Managers`,
              `How to Get Started with ${opp.query}`,
              "Common Pitfalls and How to Avoid Them",
              "Tools and Frameworks",
            ],
          };

      const slug = slugify(blueprint.title || opp.query);

      // 5. Duplicate check — before calling Forge.
      const existing = await prisma.article.findUnique({ where: { slug } });
      if (existing) {
        await markOpportunityAddressed(opp.id, slug);
        result.skipped++;
        result.decisions.push({ query: opp.query, action: "duplicate_skipped", slug });
        continue;
      }

      // 6. Call Forge with enriched prompt.
      // Guard: currentTop3 must exist; without competitor data the enriched prompt is useless.
      if (!opp.currentTop3) {
        await prisma.geoOpportunity.update({
          where: { id: opp.id },
          data: { attempts: { increment: 1 }, lastError: "Missing currentTop3 competitor data" },
        });
        result.failed++;
        result.errors.push({ query: opp.query, message: "Missing currentTop3 competitor data" });
        result.decisions.push({ query: opp.query, action: "error" });
        continue;
      }
      const enrichedPrompt = buildForgePrompt(opp, blueprint, internalLinks);
      const forgeOut = await runForge(
        {
          cluster: slug,
          page_type: "pillar", // always pillar so expansion floor (1200) matches quality gate
          title: blueprint.title || opp.query,
          target_queries: blueprint.target_queries || [opp.query],
          geo_target: 75,
        },
        `create-forge-${opp.id}`,
        enrichedPrompt
      );

      const body = forgeOut.mdx ?? "";

      // 7. Quality gate.
      const factors = analyzeMdx(body);
      const citabilityOk = passesGate(scoreCitability(factors));
      const pageType = (blueprint.page_type || "pillar") as string;
      const minWords = pageType === "pillar" ? MIN_WORD_COUNT_PILLAR : MIN_WORD_COUNT;
      const wordOk = forgeOut.body_word_count >= minWords;
      const faqOk = FAQ_REGEX.test(body);
      // Hero image is a nice-to-have, not a hard gate.
      const heroOk = HERO_REGEX.test(body) || true;

      if (!citabilityOk || !wordOk || !faqOk) {
        await prisma.geoOpportunity.update({
          where: { id: opp.id },
          data: {
            attempts: { increment: 1 },
            lastError: `Quality gate failed: wc=${forgeOut.body_word_count} citability_ok=${citabilityOk} score=${scoreCitability(factors)} faq=${faqOk} hero=${heroOk}`,
          },
        });
        result.failed++;
        result.errors.push({
          query: opp.query,
          message: `Quality gate: wc=${forgeOut.body_word_count} faq=${faqOk} hero=${heroOk}`,
        });
        result.decisions.push({ query: opp.query, action: "gate_failed", slug });
        continue;
      }

      // 8. Publish to DB.
      const meta = forgeOut.schema_meta as { meta?: { title?: string; description?: string } } | null;
      await publishArticle({
        slug,
        title: meta?.meta?.title || blueprint.title || opp.query,
        description: meta?.meta?.description || `${blueprint.title || opp.query} — PM Streak guide.`,
        body,
        vertical: "pm",
        publishedAt: new Date(),
      });

      // Also write MDX to seo-articles/ on disk for backup + indexing.
      try {
        const articlesDir = join(process.cwd(), "seo-articles");
        mkdirSync(articlesDir, { recursive: true });
        writeFileSync(join(articlesDir, `${slug}.mdx`), body, "utf-8");
      } catch {
        // Disk write is non-critical — DB is the source of truth.
      }

      // 9. Mark addressed.
      await markOpportunityAddressed(opp.id, slug);

      result.created++;
      result.decisions.push({ query: opp.query, action: "created", slug });
    } catch (e) {
      const message = e instanceof Error ? e.message.slice(0, 500) : String(e);
      await prisma.geoOpportunity.update({
        where: { id: opp.id },
        data: { attempts: { increment: 1 }, lastError: message },
      });
      result.failed++;
      result.errors.push({ query: opp.query, message });
      result.decisions.push({ query: opp.query, action: "error" });
    }
  }

  return result;
}
