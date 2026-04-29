/**
 * inventory.ts — Enumerate all published pages for GeoPageTriage seeding.
 *
 * Three sources:
 *   article — DB-backed articles (main corpus)
 *   route   — Next.js app router static pages (pm-*, platform-*, research)
 *   mdx     — MDX files in seo-articles/ and seo-drafts/
 *
 * Used by /api/geo/retrofit/inventory (weekly cron) and publishArticle() (Loop 1 auto-seed).
 */

import { readdirSync, statSync, readFileSync } from "node:fs";
import { join, basename, extname } from "node:path";

export type InventoryRow = {
  slug: string;
  source: "article" | "route" | "mdx";
  wordCount: number;
  hasArticleSchema: boolean;
  hasFaqSchema: boolean;
  hasFaqSection: boolean;
  currentSeoScore: number | null;
  currentCitability: number | null;
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function hasFaqSectionCheck(body: string): boolean {
  return /^## FAQ/im.test(body);
}

// ── articleToInventory ────────────────────────────────────────────────────────

export function articleToInventory(input: {
  slug: string;
  body: string;
  seoScore: number | null;
  geoScore: number | null;
}): InventoryRow {
  const body = input.body ?? "";
  return {
    slug: input.slug,
    source: "article",
    wordCount: countWords(body),
    hasArticleSchema: true, // DB articles always get Article JSON-LD in page.tsx
    hasFaqSchema: hasFaqSectionCheck(body),
    hasFaqSection: hasFaqSectionCheck(body),
    currentSeoScore: input.seoScore,
    currentCitability: input.geoScore,
  };
}

// ── inventoryRoutes ───────────────────────────────────────────────────────────

/**
 * Scan the Next.js app directory for static route pages.
 * Returns an InventoryRow for every directory that has a page.tsx but is NOT
 * a dynamic segment ([...]) and whose slug looks like a real content page.
 */
export function inventoryRoutes(appDir: string): InventoryRow[] {
  const rows: InventoryRow[] = [];

  function walk(dir: string, prefix: string) {
    let entries: string[];
    try {
      entries = readdirSync(dir);
    } catch {
      return;
    }

    for (const entry of entries) {
      const full = join(dir, entry);
      let stat;
      try {
        stat = statSync(full);
      } catch {
        continue;
      }

      if (stat.isDirectory()) {
        // Skip dynamic segments, private folders, and Next.js internals
        if (entry.startsWith("[") || entry.startsWith("_") || entry.startsWith("(")) continue;
        // Skip API routes and well-known Next.js folders
        if (["api", "learn"].includes(entry)) continue;

        const slug = prefix ? `${prefix}/${entry}` : entry;
        const hasPage =
          readdirSync(full).some((f) => f === "page.tsx" || f === "page.ts" || f === "page.js");

        if (hasPage) {
          // Only include content-like pages (not utility pages like login/signup/api)
          const isContentPage =
            /^(pm-|platform-|research|blog|learn|guide|framework|interview|role-|senior-|transition-)/.test(entry) ||
            /[a-z]+-[a-z]/.test(entry); // any hyphenated slug likely content

          if (isContentPage) {
            rows.push({
              slug,
              source: "route",
              wordCount: 0, // Static pages don't have easily accessible body text at inventory time
              hasArticleSchema: false,
              hasFaqSchema: false,
              hasFaqSection: false,
              currentSeoScore: null,
              currentCitability: null,
            });
          }
        }

        walk(full, slug);
      }
    }
  }

  walk(appDir, "");
  return rows;
}

// ── inventoryMdx ─────────────────────────────────────────────────────────────

/**
 * Scan a directory for MDX files and return InventoryRows.
 * The slug is derived from the filename (without extension).
 */
export function inventoryMdx(dir: string, source: "mdx" | "article" = "mdx"): InventoryRow[] {
  const rows: InventoryRow[] = [];
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return rows; // Directory doesn't exist yet — not an error
  }

  for (const entry of entries) {
    const ext = extname(entry);
    if (ext !== ".mdx" && ext !== ".md") continue;

    const slug = basename(entry, ext);
    let body = "";
    try {
      body = readFileSync(join(dir, entry), "utf-8");
    } catch {
      continue;
    }

    rows.push({
      slug,
      source: source === "article" ? "article" : "mdx",
      wordCount: countWords(body),
      hasArticleSchema: false, // MDX pages may not have explicit Article JSON-LD
      hasFaqSchema: hasFaqSectionCheck(body),
      hasFaqSection: hasFaqSectionCheck(body),
      currentSeoScore: null,
      currentCitability: null,
    });
  }

  return rows;
}

// ── mergeInventories ──────────────────────────────────────────────────────────

/**
 * Merge multiple InventoryRow arrays, deduplicating by slug.
 * Priority: article > mdx > route (first wins when same slug appears in multiple sources).
 */
export function mergeInventories(...arrays: InventoryRow[][]): InventoryRow[] {
  const map = new Map<string, InventoryRow>();

  const sourcePriority: Record<InventoryRow["source"], number> = {
    article: 0,
    mdx: 1,
    route: 2,
  };

  for (const rows of arrays) {
    for (const row of rows) {
      const existing = map.get(row.slug);
      if (!existing || sourcePriority[row.source] < sourcePriority[existing.source]) {
        map.set(row.slug, row);
      }
    }
  }

  return Array.from(map.values());
}
