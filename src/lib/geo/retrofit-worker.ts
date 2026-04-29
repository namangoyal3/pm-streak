// Retrofit tick worker.
//
// Each tick:
//  1. Pull up to `quota` rows from GeoPageTriage where jobStatus='pending'
//     ordered by attempts ASC (least-tried first), tier ASC (uplift before rewrite).
//  2. For each row, mark in_progress, apply the deterministic tier rule (decide()),
//     and dispatch the action via the appropriate worker (Forge / Signal / Pulse).
//  3. On success, mark jobStatus='shipped' and store the PR URL.
//     On failure, mark 'failed' with lastError, increment attempts.
//
// Stays idempotent across crashes: any row left 'in_progress' for >30 min is
// considered stale and reset to 'pending'.

import { PrismaClient, type Prisma } from "@prisma/client";
import { decide, type TriageDecision } from "./triage";
import { rewriteForge, appendFaqOnly } from "./forge-runner";
import { callAgent, Agents } from "@/lib/lyzr";

// Lazy-load revalidatePath. Available in route handlers / server actions.
// We import dynamically because retrofit-worker may be invoked from non-route
// contexts (scripts) where this isn't available.
async function tryRevalidate(path: string) {
  try {
    const mod = await import("next/cache");
    if (typeof mod.revalidatePath === "function") mod.revalidatePath(path);
  } catch {
    /* noop in script contexts */
  }
}

export type TickResult = {
  picked: number;
  decisions: TriageDecision[];
  shipped: number;
  failed: number;
  skipped: number;
  errors: { slug: string; message: string }[];
};

export type TickOptions = {
  quota?: number;
  // If true, log decisions but do not mutate any external state (Lyzr/Signal/PRs).
  dryRun?: boolean;
};

const STALE_MS = 30 * 60 * 1000;

export async function runTick(
  prisma: PrismaClient,
  opts: TickOptions = {}
): Promise<TickResult> {
  const quota = opts.quota ?? 20;
  const dryRun = !!opts.dryRun;

  // 1. Recover stale in_progress rows.
  const staleCutoff = new Date(Date.now() - STALE_MS);
  await prisma.geoPageTriage.updateMany({
    where: { jobStatus: "in_progress", updatedAt: { lt: staleCutoff } },
    data: { jobStatus: "pending" },
  });

  // 2. Pick the next batch.
  const candidates = await prisma.geoPageTriage.findMany({
    where: { jobStatus: "pending" },
    orderBy: [{ attempts: "asc" }, { updatedAt: "asc" }],
    take: quota,
  });

  const result: TickResult = {
    picked: candidates.length,
    decisions: [],
    shipped: 0,
    failed: 0,
    skipped: 0,
    errors: [],
  };

  for (const row of candidates) {
    // Reserve the row.
    await prisma.geoPageTriage.update({
      where: { slug: row.slug },
      data: { jobStatus: "in_progress" },
    });

    const decision = decide({
      slug: row.slug,
      currentCitability: row.currentCitability ?? null,
      ga4Sessions30d: row.ga4Sessions30d ?? null,
      attributedLeads30d: row.attributedLeads30d ?? null,
      hasArticleSchema: row.hasArticleSchema,
      hasFaqSchema: row.hasFaqSchema,
      hasFaqSection: row.hasFaqSection,
      wordCount: row.wordCount ?? null,
    });
    result.decisions.push(decision);

    if (dryRun) {
      // Reset to pending so a real run can process it.
      await prisma.geoPageTriage.update({
        where: { slug: row.slug },
        data: { jobStatus: "pending", tier: decision.tier },
      });
      continue;
    }

    try {
      const update = await dispatch(prisma, row, decision);
      await prisma.geoPageTriage.update({
        where: { slug: row.slug },
        data: update,
      });
      if (update.jobStatus === "shipped") result.shipped++;
      else if (update.jobStatus === "skipped") result.skipped++;
      else if (update.jobStatus === "failed") result.failed++;
    } catch (e) {
      const message = (e as Error).message.slice(0, 500);
      await prisma.geoPageTriage.update({
        where: { slug: row.slug },
        data: {
          jobStatus: "failed",
          attempts: { increment: 1 },
          lastError: message,
          tier: decision.tier,
        },
      });
      result.failed++;
      result.errors.push({ slug: row.slug, message });
    }
  }

  return result;
}

// dispatch returns the GeoPageTriage update payload to apply post-action.
async function dispatch(
  prisma: PrismaClient,
  row: { slug: string; source: string },
  d: TriageDecision
): Promise<Prisma.GeoPageTriageUpdateInput> {
  switch (d.next_action) {
    case "noop":
      return { jobStatus: "skipped", tier: d.tier };

    case "snapshot": {
      // Ask Pulse to take a snapshot for just this slug.
      await callAgent(
        Agents.pulse(),
        `Take a citability + GA4 + leads snapshot for slug "${row.slug}" only. Write the row to GeoPageMetric and return its citability score in JSON.`,
        `retrofit-snapshot-${row.slug}`,
        { timeoutMs: 60_000 }
      );
      // Leave it pending so the next tick re-evaluates with fresh data.
      return { jobStatus: "pending", tier: d.tier };
    }

    case "inject_schema":
    case "append_faq":
    case "internal_links":
    case "forge_rewrite":
    case "merge_into":
    case "redirect": {
      // For DB-backed /learn articles, we update the Article row directly and
      // revalidate the ISR path — no GitHub PR involved. For file/route pages,
      // we still go through Conductor → Signal → PR.
      if (row.source === "article") {
        return dispatchDbArticle(prisma, row.slug, d);
      }

      const payload = JSON.stringify({
        event: "retrofit_action",
        decision: d,
        slug: row.slug,
        source: row.source,
      });
      const out = await callAgent(
        process.env.LYZR_CONDUCTOR_ID!,
        payload,
        `retrofit-${d.next_action}-${row.slug}`,
        { timeoutMs: 240_000 }
      );
      const m = out.response.match(/https:\/\/github\.com\/[^\s)\"']+/);
      const prUrl = m ? m[0] : null;
      if (prUrl) {
        return {
          jobStatus: "shipped",
          tier: d.tier,
          lastShippedPrUrl: prUrl,
          lastShippedAt: new Date(),
          attempts: { increment: 1 },
        };
      }
      return {
        jobStatus: "pending",
        tier: d.tier,
        attempts: { increment: 1 },
        lastError: out.response.slice(0, 500),
      };
    }
  }
}

/**
 * DB-update path for /learn-rendered Article rows. Mutates Article.body,
 * refreshes wordCount + geoScore, and revalidates the ISR path so the change
 * is visible within minutes. No GitHub PR.
 */
async function dispatchDbArticle(
  prisma: PrismaClient,
  slug: string,
  d: TriageDecision
): Promise<Prisma.GeoPageTriageUpdateInput> {
  const article = await prisma.article.findUnique({
    where: { slug },
    select: { slug: true, body: true, vertical: true, title: true, geoScore: true, pageType: true },
  });
  if (!article) {
    return {
      jobStatus: "failed",
      tier: d.tier,
      attempts: { increment: 1 },
      lastError: `Article ${slug} not found`,
    };
  }

  let newBody: string | null = null;
  let newGeoScore: number | undefined;

  if (d.next_action === "append_faq") {
    const out = await appendFaqOnly(
      { slug, existingMdx: article.body ?? "", topic: article.title },
      `retrofit-faq-${slug}-${Date.now()}`
    );
    if (out.appended) newBody = out.mdx;
  } else if (d.next_action === "forge_rewrite") {
    const pageType =
      article.pageType === "framework" || article.pageType === "interview_guide"
        ? "pillar"
        : article.pageType === "concept_explainer"
        ? "glossary"
        : "pillar";
    const out = await rewriteForge(
      {
        slug,
        pageType: pageType as "pillar" | "comparison" | "use-case" | "glossary",
        existingMdx: article.body ?? "",
        scoutQueries: [],
        rivalGaps: [],
        currentCitability: article.geoScore ?? 0,
        targetCitability: 80,
      },
      `retrofit-rewrite-${slug}-${Date.now()}`
    );
    if (out.mdx && out.body_word_count > 0) {
      newBody = out.mdx;
      const meta = out.schema_meta as { meta?: { geo_score_self_estimate?: number } } | null;
      newGeoScore = meta?.meta?.geo_score_self_estimate;
    }
  } else {
    // inject_schema / internal_links / merge_into / redirect: no body change
    // for the DB-backed path. Schema injection is a route-layer no-op (already
    // done). Mark skipped so we move on without burning attempts.
    return { jobStatus: "skipped", tier: d.tier };
  }

  if (!newBody || newBody === article.body) {
    return {
      jobStatus: "skipped",
      tier: d.tier,
      lastError: "no body change produced",
    };
  }

  const wordCount = newBody.split(/\s+/).filter(Boolean).length;
  await prisma.article.update({
    where: { slug },
    data: {
      body: newBody,
      wordCount,
      ...(typeof newGeoScore === "number" ? { geoScore: newGeoScore } : {}),
      updatedAt: new Date(),
    },
  });
  // Revalidate the ISR path so the change is live in minutes.
  await tryRevalidate(`/learn/${article.vertical}/${slug}`);

  return {
    jobStatus: "shipped",
    tier: d.tier,
    lastShippedAt: new Date(),
    lastShippedPrUrl: `db://article/${slug}`,
    attempts: { increment: 1 },
    wordCount,
    ...(typeof newGeoScore === "number" ? { currentCitability: newGeoScore } : {}),
    hasFaqSection: /^##\s*(FAQ|Frequently Asked Questions)/im.test(newBody),
    hasFaqSchema: /^##\s*(FAQ|Frequently Asked Questions)/im.test(newBody),
  };
}

// Convenience: directly handle the cheap-uplift `append_faq` locally without going
// through the Conductor. Used by scripts that want to bypass orchestration.
export async function executeAppendFaqLocal(opts: {
  slug: string;
  existingMdx: string;
  topic: string;
}) {
  return appendFaqOnly(
    { slug: opts.slug, existingMdx: opts.existingMdx, topic: opts.topic },
    `retrofit-faq-local-${opts.slug}-${Date.now()}`
  );
}

// Convenience: directly run a full rewrite locally.
export async function executeRewriteLocal(opts: {
  slug: string;
  pageType: "pillar" | "comparison" | "use-case" | "glossary";
  existingMdx: string;
  scoutQueries: string[];
  rivalGaps: string[];
  currentCitability: number;
}) {
  return rewriteForge(
    {
      slug: opts.slug,
      pageType: opts.pageType,
      existingMdx: opts.existingMdx,
      scoutQueries: opts.scoutQueries,
      rivalGaps: opts.rivalGaps,
      currentCitability: opts.currentCitability,
      targetCitability: 80,
    },
    `retrofit-rewrite-local-${opts.slug}-${Date.now()}`
  );
}
