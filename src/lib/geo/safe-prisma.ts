import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

// Allowlisted queries for GEO agent tool routes.
// All Prisma writes from agent routes MUST go through these helpers.
// No raw SQL from agents.

export async function createOpportunity(data: {
  query: string;
  intentScore: number;
  source: string;
  currentTop3: Prisma.InputJsonValue;
  gapScore: number;
}) {
  return prisma.geoOpportunity.create({ data });
}

export async function listUnaddressedOpportunities(limit = 50) {
  // Scout writes intent_score on a 0-100 scale, so the floor is 65 (not 0.65).
  return prisma.geoOpportunity.findMany({
    where: { addressed: false, intentScore: { gte: 65 } },
    orderBy: { intentScore: "desc" },
    take: limit,
  });
}

export async function markOpportunityAddressed(id: string, pageSlug: string) {
  return prisma.geoOpportunity.update({
    where: { id },
    data: { addressed: true, pageSlug },
  });
}

/**
 * Returns the top-N published pages by citability score for use as
 * internal link suggestions in enriched Forge prompts.
 * Fetched once per create tick and reused for all opportunities.
 */
export async function selectInternalLinks(limit = 3) {
  return prisma.geoPageTriage.findMany({
    where: { currentCitability: { gte: 75 } },
    orderBy: { currentCitability: "desc" },
    take: limit,
    select: { slug: true, currentCitability: true },
  });
}

export async function createPageMetric(data: {
  slug: string;
  citabilityScore: number;
  ga4Sessions: number;
  attributedLeads: number;
  citationCount: number;
}) {
  return prisma.geoPageMetric.create({ data });
}

export async function writeCronLog(data: {
  cronId: string;
  status: "ok" | "error" | "empty";
  summary: string;
  details?: Record<string, unknown>;
}) {
  return prisma.geoCronLog.create({
    data: {
      cronId: data.cronId,
      status: data.status,
      summary: data.summary,
      details: (data.details ?? {}) as Prisma.InputJsonValue,
    },
  });
}

export async function getPageMetrics(slug: string, days = 30) {
  const since = new Date();
  since.setDate(since.getDate() - days);
  return prisma.geoPageMetric.findMany({
    where: { slug, snapshotDate: { gte: since } },
    orderBy: { snapshotDate: "desc" },
  });
}

export async function getLatestMetrics(limit = 100) {
  return prisma.geoPageMetric.findMany({
    orderBy: { snapshotDate: "desc" },
    take: limit,
    distinct: ["slug"],
  });
}

export async function createCitation(data: {
  pageSlug: string;
  source: string;
  url: string;
  status: string;
  draftBody?: string;
}) {
  return prisma.geoCitation.create({ data });
}

export async function listCitationsByStatus(status: string) {
  return prisma.geoCitation.findMany({
    where: { status },
    orderBy: { createdAt: "desc" },
  });
}

export async function updateCitationStatus(id: string, status: string, approvedBy?: string) {
  return prisma.geoCitation.update({
    where: { id },
    data: { status, approvedBy },
  });
}

/**
 * Strips MDX/frontmatter artefacts from Forge output before DB insert:
 * - YAML frontmatter block (--- ... ---)
 * - The # H1 title line (page renders it from article.title)
 * - <script type="application/ld+json"> blocks (page injects its own JSON-LD)
 * - Trailing whitespace
 */
function cleanArticleBody(raw: string): string {
  let body = raw;

  // Remove YAML frontmatter
  body = body.replace(/^---[\s\S]*?---\n?/, "");

  // Remove <script type="application/ld+json">...</script> blocks
  body = body.replace(/<script\s+type=["']application\/ld\+json["'][\s\S]*?<\/script>/gi, "");

  // Remove fenced JSON code blocks that are schema/meta artefacts (```json { "@context"... } ```)
  body = body.replace(/```json\s*\{[\s\S]*?"@context"[\s\S]*?```/g, "");
  body = body.replace(/```json\s*\{[\s\S]*?"schema"[\s\S]*?```/g, "");
  body = body.replace(/```json\s*\{[\s\S]*?"meta"[\s\S]*?```/g, "");

  // Trim leading whitespace before H1 strip so the ^ anchor matches
  body = body.trimStart();

  // Remove leading # H1 title (already shown by page layout)
  body = body.replace(/^#\s+.+\n?/, "");

  // Fix split list items: Forge sometimes emits the bullet/number on its own line
  // followed by the content on the next line, causing them to render as separate elements.
  // e.g. "1.\n**Title**: text" → "1. **Title**: text"
  // e.g. "-\n**Title**: text" → "- **Title**: text"
  body = body.replace(/^(\d+\.)\n([^\n])/gm, "$1 $2");
  body = body.replace(/^(-)\n([^\n])/gm, "$1 $2");

  return body.trim();
}

export async function publishArticle(data: {
  slug: string;
  title: string;
  description: string;
  body: string;
  vertical?: string;
  publishedAt?: Date;
}) {
  const { slug, title, description, body, vertical = "pm", publishedAt } = data;
  const cleanBody = cleanArticleBody(body);
  const now = new Date();
  const article = await prisma.article.upsert({
    where: { slug },
    update: { title, description, body: cleanBody, published: true, updatedAt: now, ...(publishedAt ? { publishedAt } : {}) },
    create: { slug, title, description, body: cleanBody, vertical, published: true, publishedAt: publishedAt ?? now },
    select: { id: true, slug: true, vertical: true },
  });

  // Loop 1: seed/re-queue this article in the self-improvement triage queue.
  // Wrapped in try/catch — triage failure must never break article publishing.
  try {
    await prisma.geoPageTriage.upsert({
      where: { slug },
      create: { slug, source: "article", jobStatus: "pending" },
      // Re-queue shipped articles so they're re-evaluated after content changes.
      update: { jobStatus: "pending", updatedAt: now },
    });
  } catch (e) {
    console.warn(`[publishArticle] triage upsert failed for ${slug}:`, (e as Error).message);
  }

  return article;
}

// ── Parsers for Pulse + Rival structured JSON output ────────────────────────
//
// Both agents are instructed to append a trailing ```json block.
// If the block is absent or malformed, we return [] and log a warning.

export type PulseMetricRow = {
  slug: string;
  sessions30d: number;
  leads30d: number;
  citability?: number;
};

export function parsePulseMetrics(agentResponse: string): PulseMetricRow[] {
  // Find the LAST ```json block in the response (agents may include prose before it)
  const fences = [...agentResponse.matchAll(/```(?:json)?\s*\n([\s\S]*?)\n```/g)];
  const last = fences[fences.length - 1];
  if (!last) return [];
  try {
    const parsed = JSON.parse(last[1]);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (r): r is PulseMetricRow =>
        typeof r?.slug === "string" &&
        typeof r?.sessions30d === "number" &&
        typeof r?.leads30d === "number"
    );
  } catch {
    console.warn("[parsePulseMetrics] JSON parse failed");
    return [];
  }
}

export type RivalGapRow = {
  query: string;
  intentScore: number;
  gapScore: number;
  competitors: string[];
};

export function parseRivalGaps(agentResponse: string): RivalGapRow[] {
  const fences = [...agentResponse.matchAll(/```(?:json)?\s*\n([\s\S]*?)\n```/g)];
  const last = fences[fences.length - 1];
  if (!last) return [];
  try {
    const parsed = JSON.parse(last[1]);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (r): r is RivalGapRow =>
        typeof r?.query === "string" &&
        typeof r?.intentScore === "number" &&
        typeof r?.gapScore === "number" &&
        Array.isArray(r?.competitors)
    );
  } catch {
    console.warn("[parseRivalGaps] JSON parse failed");
    return [];
  }
}
