// Inventory cron: enumerate every published page and upsert into GeoPageTriage.
// Runs weekly (Sunday 03:00 UTC) to catch any articles that slipped through
// the Loop 1 auto-seed in publishArticle(), and to refresh structural flags
// (wordCount, hasFaqSection, hasArticleSchema) as pages are improved.
//
// Handles all 3 sources:
//   article — DB-backed articles (the main 800+ corpus)
//   route   — Next.js app router static pages (pm-*, platform-*, etc.)
//   mdx     — seo-articles/*.mdx files
//
// Idempotent: safe to run anytime. Does NOT reset jobStatus on existing rows
// so in-flight Retrofit jobs are not interrupted.

import { NextResponse } from "next/server";
import { join } from "node:path";
import { prisma } from "@/lib/prisma";
import {
  articleToInventory,
  inventoryMdx,
  inventoryRoutes,
  mergeInventories,
  type InventoryRow,
} from "@/lib/geo/inventory";

export const maxDuration = 300; // 5 min — 800 upserts need headroom

const isAllowed = (req: Request) =>
  req.headers.get("x-vercel-cron") === "1" ||
  req.headers.get("authorization") === `Bearer ${process.env.CRON_SECRET}`;

// Upsert rows in parallel chunks to stay within DB pool limits.
async function batchUpsert(rows: InventoryRow[], chunkSize = 50): Promise<{ upserted: number }> {
  let upserted = 0;
  for (let i = 0; i < rows.length; i += chunkSize) {
    const chunk = rows.slice(i, i + chunkSize);
    await Promise.all(
      chunk.map((r) =>
        prisma.geoPageTriage.upsert({
          where: { slug: r.slug },
          create: {
            slug: r.slug,
            source: r.source,
            wordCount: r.wordCount,
            hasArticleSchema: r.hasArticleSchema,
            hasFaqSchema: r.hasFaqSchema,
            hasFaqSection: r.hasFaqSection,
            currentSeoScore: r.currentSeoScore ?? undefined,
            currentCitability: r.currentCitability ?? undefined,
            jobStatus: "pending",
          },
          update: {
            // Refresh structural flags — they change as pages are improved.
            source: r.source,
            wordCount: r.wordCount,
            hasArticleSchema: r.hasArticleSchema,
            hasFaqSchema: r.hasFaqSchema,
            hasFaqSection: r.hasFaqSection,
            // Carry forward scores from source if they were absent before.
            ...(r.currentSeoScore != null ? { currentSeoScore: r.currentSeoScore } : {}),
            ...(r.currentCitability != null ? { currentCitability: r.currentCitability } : {}),
            // Do NOT reset jobStatus — in-flight Retrofit jobs must not be interrupted.
          },
        })
      )
    );
    upserted += chunk.length;
  }
  return { upserted };
}

export async function POST(req: Request) {
  if (!isAllowed(req)) return NextResponse.json({ ok: false }, { status: 401 });

  const repoRoot = process.cwd();

  try {
    // 1. DB articles (the main corpus — 800+ rows)
    const articleRows = await prisma.article.findMany({
      where: { published: true },
      select: { slug: true, body: true, seoScore: true, geoScore: true },
    });
    const articles = articleRows.map((r) =>
      articleToInventory({
        slug: r.slug,
        body: r.body ?? "",
        seoScore: r.seoScore ?? null,
        geoScore: r.geoScore ?? null,
      })
    );

    // 2. Static Next.js route pages (pm-*, platform-*, research)
    const routes = inventoryRoutes(join(repoRoot, "src", "app"));

    // 3. MDX files in seo-articles/ and seo-drafts/
    const mdx = [
      ...inventoryMdx(join(repoRoot, "seo-articles"), "mdx"),
      ...inventoryMdx(join(repoRoot, "seo-drafts"), "mdx"),
    ];

    // Merge — article rows win over MDX/route for the same slug.
    const merged = mergeInventories(articles, routes, mdx);

    // 4. Batch upsert all rows into GeoPageTriage.
    const { upserted } = await batchUpsert(merged);

    const total = await prisma.geoPageTriage.count();

    return NextResponse.json({
      ok: true,
      sources: { articles: articles.length, routes: routes.length, mdx: mdx.length },
      merged: merged.length,
      upserted,
      total_triage_rows: total,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

// Vercel cron invocations are GET — this must run the REAL inventory, not a
// dry-run (the old dry-run GET made the scheduled cron a no-op).
export async function GET(req: Request) {
  return POST(req);
}
