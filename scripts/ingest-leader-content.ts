/**
 * Ingests PM leader content from RSS feeds and generates bite-sized lessons.
 * Uses the existing generateActionablePMLesson pipeline with real content as evidence.
 *
 * Usage:
 *   npx tsx scripts/ingest-leader-content.ts                   # all leaders
 *   npx tsx scripts/ingest-leader-content.ts --leader aakash   # one leader
 *   npx tsx scripts/ingest-leader-content.ts --dry-run          # preview only
 *   npx tsx scripts/ingest-leader-content.ts --limit 3          # max 3 articles per leader
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { PrismaClient } from "@prisma/client";
import Parser from "rss-parser";
import * as cheerio from "cheerio";
import { generateLeaderLesson, SearchResult } from "../src/lib/llm-lessons";
import { buildSourceTranscript } from "../src/lib/podcast-quiz-helpers";

for (const p of [".env.local", ".env", ".env.production"].map((f) => resolve(process.cwd(), f))) {
  if (!existsSync(p)) continue;
  const text = readFileSync(p, "utf8");
  for (const line of text.split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq === -1) continue;
    const k = t.slice(0, eq).trim();
    let v = t.slice(eq + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    if (process.env[k] === undefined) process.env[k] = v;
  }
}

const prisma = new PrismaClient();
const parser = new Parser({ timeout: 10000 });

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const leaderArg = args.find((a, i) => args[i - 1] === "--leader");
const limitArg = parseInt(args.find((a, i) => args[i - 1] === "--limit") ?? "5", 10);

interface Leader {
  slug: string;
  name: string;
  title: string;
  rssUrl: string;
  categorySlug: string;
  color: string;
  icon: string;
}

const LEADERS: Leader[] = [
  {
    slug: "aakash-gupta",
    name: "Aakash Gupta",
    title: "Product @ Reforge, ex-Spotify",
    rssUrl: "https://www.news.aakashg.com/feed",
    categorySlug: "pm-leader-aakash",
    color: "#4f46e5",
    icon: "📊",
  },
  {
    slug: "shreyas-doshi",
    name: "Shreyas Doshi",
    title: "ex-Stripe, Twitter, Yahoo PM leader",
    rssUrl: "https://shreyasdoshi.substack.com/feed",
    categorySlug: "pm-leader-shreyas",
    color: "#0ea5e9",
    icon: "🧠",
  },
  {
    slug: "wes-bush",
    name: "Wes Bush",
    title: "ProductLed founder",
    rssUrl: "https://productled.com/feed",
    categorySlug: "pm-leader-wes",
    color: "#10b981",
    icon: "🚀",
  },
];

async function fetchRssArticles(leader: Leader, limit: number) {
  console.log(`  Fetching RSS: ${leader.rssUrl}`);
  try {
    const feed = await parser.parseURL(leader.rssUrl);
    return feed.items.slice(0, limit);
  } catch (err) {
    console.warn(`  ⚠ RSS fetch failed for ${leader.name}: ${err instanceof Error ? err.message : String(err)}`);
    return [];
  }
}

async function fetchArticleText(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "pm-streak-bot/1.0" },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return "";
    const html = await res.text();
    const $ = cheerio.load(html);
    // Remove nav, footer, scripts, ads
    $("nav, footer, header, script, style, .ad, .sidebar, #sidebar, .menu").remove();
    // Prefer article/main content
    const content = $("article, main, .post-content, .entry-content, .article-body").first().text()
      || $("body").text();
    return content.replace(/\s+/g, " ").trim().slice(0, 4000);
  } catch {
    return "";
  }
}

async function ensureLeaderCategory(leader: Leader) {
  const existing = await prisma.category.findUnique({ where: { slug: leader.categorySlug } });
  if (existing) return existing;
  return prisma.category.create({
    data: {
      name: `${leader.name}`,
      slug: leader.categorySlug,
      description: `PM insights from ${leader.name} — ${leader.title}`,
      icon: leader.icon,
      color: leader.color,
      sortOrder: 90,
    },
  });
}

async function processLeader(leader: Leader) {
  console.log(`\n▶ ${leader.name}`);
  const articles = await fetchRssArticles(leader, limitArg);
  if (articles.length === 0) {
    console.log(`  No articles found.`);
    return;
  }

  const category = dryRun ? null : await ensureLeaderCategory(leader);

  const maxDay = await prisma.lesson.aggregate({ _max: { dayNumber: true } });
  let dayCounter = (maxDay._max.dayNumber ?? 300) + 1;

  let created = 0;
  let skipped = 0;

  for (const item of articles) {
    const title = item.title?.trim();
    const url = item.link?.trim();
    if (!title || !url) continue;

    // Dedup by URL stored as slug
    const slug = `leader-${leader.slug}-${url.split("/").filter(Boolean).pop()?.slice(0, 40) ?? Date.now()}`;

    if (!dryRun) {
      const existing = await prisma.lesson.findFirst({ where: { slug } });
      if (existing) { skipped++; continue; }
    }

    console.log(`  📄 "${title.slice(0, 60)}" — ${url.slice(0, 60)}`);

    if (dryRun) continue;

    // Prefer RSS-embedded content (works even for paywalled Substacks)
    const rssBody = (() => {
      const raw = (item as any)["content:encoded"] || item.content || item.contentSnippet || "";
      const $ = cheerio.load(raw);
      return $.text().replace(/\s+/g, " ").trim();
    })();

    // Fall back to scraping if RSS body is very thin
    let articleText = rssBody.length >= 300 ? rssBody : await fetchArticleText(url);

    if (articleText.length < 200) {
      console.log(`    ⚠ Article too short or inaccessible, skipping.`);
      skipped++;
      continue;
    }
    articleText = articleText.slice(0, 4000);

    // Build a SearchResult from the article — reuses existing generateActionablePMLesson pipeline
    const searchResults: SearchResult[] = [
      {
        guest: leader.name,
        episodeTitle: title,
        snippet: articleText.slice(0, 2000),
      },
      {
        guest: leader.name,
        episodeTitle: title,
        snippet: articleText.slice(2000) || articleText.slice(0, 1000),
      },
    ];

    let lessonResult;
    try {
      lessonResult = await generateLeaderLesson(title, searchResults);
    } catch (err) {
      console.log(`    ❌ Generation failed: ${err instanceof Error ? err.message : String(err)}`);
      skipped++;
      continue;
    }

    const sourceTranscript = buildSourceTranscript(title, searchResults);

    const lesson = await prisma.lesson.create({
      data: {
        title: `${title.slice(0, 80)} — ${leader.name}`,
        slug,
        description: `PM lesson from ${leader.name}: ${title.slice(0, 100)}`,
        content: lessonResult.content,
        xpReward: 15,
        difficulty: 2,
        dayNumber: dayCounter++,
        categoryId: category!.id,
        guestName: leader.name,
        episodeTitle: title,
        youtubeId: null,
        sourceTranscript,
        aiGenerated: false,   // treated as curated content, not user-generated
        generatedForUserId: null,
        topicKey: `leader:${leader.slug}:${slug}`,
        generationMode: "explore",
        sourceLessonId: null,
        isLocked: false,
      },
    });

    for (let i = 0; i < lessonResult.questions.length; i++) {
      const q = lessonResult.questions[i];
      await prisma.question.create({
        data: {
          lessonId: lesson.id,
          questionText: q.questionText,
          options: JSON.stringify(q.options),
          correctIndex: q.correctIndex,
          explanation: q.explanation,
          xpReward: 5,
          sortOrder: i,
        },
      });
    }

    console.log(`    ✅ Created: "${lesson.title.slice(0, 60)}"`);
    created++;
  }

  console.log(`  Done: ${created} created, ${skipped} skipped`);
}

async function main() {
  const leaders = leaderArg
    ? LEADERS.filter((l) => l.slug.includes(leaderArg) || l.name.toLowerCase().includes(leaderArg.toLowerCase()))
    : LEADERS;

  if (leaders.length === 0) {
    console.error(`No leader found matching: ${leaderArg}`);
    process.exitCode = 1;
    return;
  }

  console.log(`\n[ingest-leader-content] ${leaders.length} leader(s)${dryRun ? " [dry-run]" : ""} — limit ${limitArg} articles each\n`);

  for (const leader of leaders) {
    await processLeader(leader);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
