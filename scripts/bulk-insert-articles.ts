/**
 * Bulk insert pre-generated articles from a JSON file.
 * Usage: DATABASE_URL=... npx tsx scripts/bulk-insert-articles.ts articles.json
 */
import { PrismaClient } from "@prisma/client";
import { scoreSEO } from "../src/lib/seo-score";
import * as fs from "fs";

const prisma = new PrismaClient();
const PUBLISH_THRESHOLD = 70;

type Article = {
  keywordId: string;
  keyword: string;
  title: string;
  description: string;
  primaryKeyword: string;
  body: string;
  faqPairs: { question: string; answer: string }[];
  howToSteps: { name: string; text: string }[];
};

async function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error("Usage: npx tsx scripts/bulk-insert-articles.ts <articles.json>");
    process.exit(1);
  }

  const articles: Article[] = JSON.parse(fs.readFileSync(filePath, "utf8"));
  console.log(`\n=== Inserting ${articles.length} articles ===\n`);

  let success = 0, failed = 0;

  for (const article of articles) {
    const score = scoreSEO({
      title: article.title,
      description: article.description,
      body: article.body,
      primaryKeyword: article.primaryKeyword,
      faqPairs: article.faqPairs,
      howToSteps: article.howToSteps,
    });

    if (score < PUBLISH_THRESHOLD) {
      console.log(`SKIP score=${score} | ${article.title.slice(0, 60)}`);
      await prisma.$executeRaw`UPDATE "SeoKeyword" SET status='failed' WHERE id=${article.keywordId}`;
      failed++;
      continue;
    }

    const slug = article.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 80) + `-${Date.now().toString().slice(-4)}`;

    const articleId = `c${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
    const now = new Date().toISOString();

    try {
      await prisma.$executeRaw`
        INSERT INTO "Article" (id, slug, title, description, body, vertical, tags, "pageType", "keywordId", "seoScore", published, "publishedAt", "wordCount", "sourceUrls", "faqPairs", "howToSteps", "createdAt", "updatedAt")
        VALUES (
          ${articleId}, ${slug}, ${article.title}, ${article.description}, ${article.body},
          'pm', ARRAY[${article.keyword}, 'lenny-podcast-insights'], 'blog', ${article.keywordId},
          ${score}, true, ${now}::timestamptz, ${article.body.split(/\s+/).length},
          ARRAY[]::text[], ${JSON.stringify(article.faqPairs)}::jsonb, ${JSON.stringify(article.howToSteps)}::jsonb,
          ${now}::timestamptz, ${now}::timestamptz
        )
      `;
      await prisma.$executeRaw`UPDATE "SeoKeyword" SET status='generated' WHERE id=${article.keywordId}`;
      console.log(`OK score=${score} | ${article.title.slice(0, 60)}`);
      success++;
    } catch (err: any) {
      console.log(`ERROR: ${err.message?.slice(0, 80)}`);
      failed++;
    }

    await new Promise(r => setTimeout(r, 50));
  }

  const total = await prisma.$queryRaw<{ c: number }[]>`SELECT COUNT(*)::int as c FROM "Article" WHERE published=true`;
  console.log(`\n=== DONE: ${success} inserted | ${failed} failed ===`);
  console.log(`Total published: ${total[0]?.c}`);
  await prisma.$disconnect();
}

main().catch(err => { console.error("Fatal:", err); process.exit(1); });
