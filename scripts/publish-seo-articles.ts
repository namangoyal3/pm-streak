/**
 * SEO Article Publisher Script
 * Reads prepared article JSON files from seo-articles/ and inserts them
 * into the production database via Prisma.
 *
 * Usage: npx tsx scripts/publish-seo-articles.ts
 * Requires: DATABASE_URL env var set (works from Vercel env or local with DB access)
 */

import { PrismaClient } from "@prisma/client";
import { scoreSEO, slugify } from "../src/lib/seo-score";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();
const SEO_THRESHOLD = 70;

interface ArticlePayload {
  title: string;
  description: string;
  body: string;
  vertical: string;
  tags?: string[];
  primaryKeyword: string;
  sourceUrls?: string[];
  faqPairs?: { question: string; answer: string }[];
  howToSteps?: { name: string; text: string }[];
}

async function publishArticle(file: string): Promise<{ published: boolean; slug?: string; seoScore: number; reason?: string }> {
  const raw = fs.readFileSync(file, "utf8");
  const payload: ArticlePayload = JSON.parse(raw);
  const { title, description, body, vertical, tags = [], primaryKeyword, sourceUrls = [], faqPairs, howToSteps } = payload;

  if (!title || !description || !body || !vertical || !primaryKeyword) {
    return { published: false, seoScore: 0, reason: "Missing required fields" };
  }

  const seoScore = scoreSEO({ title, description, body, primaryKeyword, faqPairs, howToSteps });
  const wordCount = body.trim().split(/\s+/).length;

  if (seoScore < SEO_THRESHOLD) {
    return { published: false, seoScore, reason: `SEO score ${seoScore} below threshold ${SEO_THRESHOLD}` };
  }

  // Generate unique slug
  let baseSlug = slugify(title);
  let slug = baseSlug;
  for (let attempt = 0; attempt < 10; attempt++) {
    const existing = await prisma.article.findUnique({ where: { slug }, select: { id: true } });
    if (!existing) break;
    slug = `${baseSlug}-${attempt + 1}`;
  }

  const article = await prisma.article.create({
    data: {
      slug,
      title,
      description,
      body,
      vertical,
      tags,
      seoScore,
      wordCount,
      sourceUrls,
      faqPairs: faqPairs ? (faqPairs as unknown as never) : undefined,
      howToSteps: howToSteps ? (howToSteps as unknown as never) : undefined,
      published: true,
      publishedAt: new Date(),
    },
  });

  return { published: true, slug: article.slug, seoScore };
}

async function main() {
  const articlesDir = path.join(__dirname, "../seo-articles");

  // Articles from this run (April 16, 2026)
  const newArticles = [
    "article-plg-strategy.json",
    "article-apm-programs.json",
    "article-north-star-metric.json",
  ];

  console.log(`\n=== PM Streak SEO Article Publisher ===`);
  console.log(`Publishing ${newArticles.length} new articles...\n`);

  let published = 0;
  let failed = 0;

  for (const filename of newArticles) {
    const file = path.join(articlesDir, filename);
    if (!fs.existsSync(file)) {
      console.error(`  ✗ ${filename}: File not found`);
      failed++;
      continue;
    }
    try {
      const result = await publishArticle(file);
      if (result.published) {
        console.log(`  ✓ ${filename}`);
        console.log(`    Slug: ${result.slug}`);
        console.log(`    SEO Score: ${result.seoScore}/100`);
        console.log(`    URL: https://learnanything.pro/learn/${result.slug}`);
        published++;
      } else {
        console.log(`  ✗ ${filename}: ${result.reason} (score: ${result.seoScore})`);
        failed++;
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`  ✗ ${filename}: ${message.slice(0, 200)}`);
      failed++;
    }
    console.log();
  }

  console.log(`=== Summary ===`);
  console.log(`Published: ${published}`);
  console.log(`Failed:    ${failed}`);

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error("Fatal error:", err);
  prisma.$disconnect();
  process.exit(1);
});
