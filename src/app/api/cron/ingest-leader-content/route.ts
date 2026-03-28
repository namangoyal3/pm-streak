/**
 * Daily leader content ingestion cron.
 * Runs at 00:30 UTC (6:00 AM IST) via Vercel Cron.
 * Also callable manually: GET /api/cron/ingest-leader-content
 *   with Authorization: Bearer {CRON_SECRET}
 *
 * Sources: PM leader RSS feeds (Substack, blogs, YouTube channel feeds)
 * Pipeline: fetch article → Firecrawl/cheerio scrape → Groq LLM lesson → quality check → DB
 */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateLeaderLesson, type SearchResult } from "@/lib/llm-lessons";
import { buildSourceTranscript } from "@/lib/podcast-quiz-helpers";
import { isGenericLessonContent, isWeakQuestionSet } from "@/lib/lesson-quality";

// ─── Leader Registry ────────────────────────────────────────────────────────

interface Leader {
  slug: string;
  name: string;
  /** Short credential shown in lesson metadata */
  credential: string;
  /** Full credential for lesson description */
  bio: string;
  rssUrl: string;
  categorySlug: string;
  color: string;
  icon: string;
  sortOrder?: number;
}

const LEADERS: Leader[] = [
  // ── Established PM writers ───────────────────────────────────────────────
  {
    slug: "aakash-gupta",
    name: "Aakash Gupta",
    credential: "ex-Reforge, ex-Spotify PM",
    bio: "Product growth expert, ex-Spotify. Author of Product Growth newsletter.",
    rssUrl: "https://www.news.aakashg.com/feed",
    categorySlug: "pm-leader-aakash",
    color: "#4f46e5",
    icon: "📊",
    sortOrder: 91,
  },
  {
    slug: "shreyas-doshi",
    name: "Shreyas Doshi",
    credential: "ex-Stripe, ex-Twitter, ex-Yahoo PM",
    bio: "Product leader with 15+ years at Stripe, Twitter, Yahoo, and Google.",
    rssUrl: "https://shreyasdoshi.substack.com/feed",
    categorySlug: "pm-leader-shreyas",
    color: "#0ea5e9",
    icon: "🧠",
    sortOrder: 92,
  },
  {
    slug: "wes-bush",
    name: "Wes Bush",
    credential: "Founder of ProductLed",
    bio: "Founder of ProductLed, author of Product-Led Growth.",
    rssUrl: "https://productled.com/feed",
    categorySlug: "pm-leader-wes",
    color: "#10b981",
    icon: "🚀",
    sortOrder: 93,
  },
  {
    slug: "marty-cagan",
    name: "Marty Cagan",
    credential: "Founder SVPG, ex-eBay VP Product, 30+ yrs in PM",
    bio: "Founder of Silicon Valley Product Group. Former VP Product at eBay. Author of Inspired and Empowered.",
    rssUrl: "https://www.svpg.com/feed/",
    categorySlug: "pm-leader-marty",
    color: "#f59e0b",
    icon: "📖",
    sortOrder: 94,
  },
  {
    slug: "pawel-huryn",
    name: "Pawel Huryn",
    credential: "Senior PM, 120K+ newsletter subscribers",
    bio: "Senior Product Manager and author of Product Compass newsletter with 120K+ subscribers.",
    rssUrl: "https://www.productcompass.pm/feed",
    categorySlug: "pm-leader-pawel",
    color: "#8b5cf6",
    icon: "🧭",
    sortOrder: 95,
  },
  {
    slug: "melissa-perri",
    name: "Melissa Perri",
    credential: "CEO Produx Labs, ex-Harvard Business School PM instructor",
    bio: "CEO of Produx Labs, former Harvard Business School instructor. Author of Escaping the Build Trap.",
    rssUrl: "https://melissaperri.com/blog/rss.xml",
    categorySlug: "pm-leader-melissa",
    color: "#ec4899",
    icon: "🎯",
    sortOrder: 96,
  },
  {
    slug: "elena-verna",
    name: "Elena Verna",
    credential: "ex-Miro, ex-SurveyMonkey CPO, Growth Advisor",
    bio: "Growth advisor and former CPO at Miro and SurveyMonkey. Expert in PLG and B2B growth.",
    rssUrl: "https://elenaverna.substack.com/feed",
    categorySlug: "pm-leader-elena",
    color: "#f97316",
    icon: "📈",
    sortOrder: 97,
  },
  {
    slug: "john-cutler",
    name: "John Cutler",
    credential: "Product Coach, ex-Amplitude Head of Evangelism",
    bio: "Product coach and thought leader. Former head of product evangelism at Amplitude.",
    rssUrl: "https://cutlefish.substack.com/feed",
    categorySlug: "pm-leader-john",
    color: "#06b6d4",
    icon: "🐟",
    sortOrder: 98,
  },
  // ── YouTube channel RSS feeds (no API key needed) ────────────────────────
  {
    slug: "lenny-youtube",
    name: "Lenny Rachitsky",
    credential: "ex-Airbnb PM, 700K+ YouTube subscribers",
    bio: "Former Airbnb PM Lead. Creator of Lenny's Newsletter & Podcast with 700K+ YouTube subscribers.",
    rssUrl: "https://www.youtube.com/feeds/videos.xml?channel_id=UCaEq8_cRdwbqp2JiDeSXuuA",
    categorySlug: "pm-leader-lenny-yt",
    color: "#16a34a",
    icon: "🎙️",
    sortOrder: 99,
  },
  {
    slug: "exponent-pm",
    name: "Exponent PM",
    credential: "PM Interview prep platform, 200K+ YouTube subscribers",
    bio: "The leading PM interview prep platform. Covers real PM interview questions, frameworks, and mock interviews.",
    rssUrl: "https://www.youtube.com/feeds/videos.xml?channel_id=UC5ZP3ZHfuBnLzFCfpLQkBaw",
    categorySlug: "pm-leader-exponent",
    color: "#2563eb",
    icon: "🎓",
    sortOrder: 100,
  },
];

// ─── Quality Guardrails ──────────────────────────────────────────────────────

const MIN_ARTICLE_LENGTH = 300;    // chars — skip very short articles
const MIN_LESSON_CONTENT = 400;    // chars — skip thin lesson content
const MAX_LESSONS_PER_LEADER = 3;  // max new lessons per leader per run

// ─── Helpers ────────────────────────────────────────────────────────────────

interface RssItem {
  title?: string;
  link?: string;
  contentEncoded?: string;
  content?: string;
  contentSnippet?: string;
  summary?: string;
  description?: string;
}

async function fetchRssFeed(url: string): Promise<RssItem[]> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "pm-streak-bot/1.0 (+https://learnanything.pro)" },
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return [];
    const xml = await res.text();

    const items: RssItem[] = [];

    // YouTube Atom feed format
    if (url.includes("youtube.com/feeds")) {
      const entryMatches = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)];
      for (const m of entryMatches.slice(0, 10)) {
        const body = m[1] ?? "";
        const title = body.match(/<title>(.*?)<\/title>/)?.[1]?.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">") ?? "";
        const link = body.match(/<link rel="alternate" href="(.*?)"/)?.[1] ?? "";
        const description = body.match(/<media:description>([\s\S]*?)<\/media:description>/)?.[1] ?? "";
        if (title && link) items.push({ title, link, contentSnippet: description });
      }
      return items;
    }

    // Standard RSS 2.0
    const itemMatches = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)];
    for (const m of itemMatches.slice(0, 10)) {
      const body = m[1] ?? "";
      const title = body.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/)?.[1]
        ?? body.match(/<title>(.*?)<\/title>/)?.[1]
        ?? "";
      const link = body.match(/<link>(.*?)<\/link>/)?.[1]
        ?? body.match(/<link\s[^>]*href="([^"]+)"/)?.[1]
        ?? "";
      const contentEncoded = body.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/)?.[1] ?? "";
      const content = body.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/)?.[1]
        ?? body.match(/<description>([\s\S]*?)<\/description>/)?.[1]
        ?? "";

      if (title && link) {
        items.push({ title: title.trim(), link: link.trim(), contentEncoded, content, contentSnippet: content });
      }
    }
    return items;
  } catch {
    return [];
  }
}

function extractTextFromHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchArticleText(url: string, rssBody: string): Promise<string> {
  // Prefer RSS body if it's substantial
  if (rssBody.length >= MIN_ARTICLE_LENGTH) return rssBody.slice(0, 5000);

  // Try Firecrawl if API key available
  const firecrawlKey = process.env.FIRECRAWL_API_KEY;
  if (firecrawlKey) {
    try {
      const res = await fetch("https://api.firecrawl.dev/v1/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${firecrawlKey}` },
        body: JSON.stringify({ url, formats: ["markdown"] }),
        signal: AbortSignal.timeout(15000),
      });
      if (res.ok) {
        const data = await res.json();
        const md = data?.data?.markdown ?? "";
        if (md.length >= MIN_ARTICLE_LENGTH) return md.slice(0, 5000);
      }
    } catch { /* fall through */ }
  }

  // Raw fetch fallback
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "pm-streak-bot/1.0" },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return "";
    const html = await res.text();
    return extractTextFromHtml(html).slice(0, 5000);
  } catch {
    return "";
  }
}

async function ensureLeaderCategory(leader: Leader) {
  const existing = await prisma.category.findUnique({ where: { slug: leader.categorySlug } });
  if (existing) return existing;
  return prisma.category.create({
    data: {
      name: leader.name,
      slug: leader.categorySlug,
      description: `PM lessons from ${leader.name} — ${leader.credential}`,
      icon: leader.icon,
      color: leader.color,
      sortOrder: leader.sortOrder ?? 90,
    },
  });
}

// ─── Main Ingestion Logic ────────────────────────────────────────────────────

async function processLeader(leader: Leader, summary: Record<string, { fetched: number; created: number; skipped: number }>) {
  const items = await fetchRssFeed(leader.rssUrl);
  summary[leader.slug] = { fetched: items.length, created: 0, skipped: 0 };

  if (items.length === 0) return;

  const category = await ensureLeaderCategory(leader);
  const maxDay = await prisma.lesson.aggregate({ _max: { dayNumber: true } });
  let dayCounter = (maxDay._max.dayNumber ?? 300) + 1;

  let created = 0;

  for (const item of items.slice(0, MAX_LESSONS_PER_LEADER + 5)) {
    if (created >= MAX_LESSONS_PER_LEADER) break;

    const title = item.title?.trim();
    const url = item.link?.trim();
    if (!title || !url) { summary[leader.slug].skipped++; continue; }

    const slug = `leader-${leader.slug}-${url.split("/").filter(Boolean).pop()?.slice(0, 40) ?? Date.now()}`;
    const existing = await prisma.lesson.findFirst({ where: { slug } });
    if (existing) { summary[leader.slug].skipped++; continue; }

    // Extract article text
    const rssBody = extractTextFromHtml(
      item.contentEncoded ?? item.content ?? item.contentSnippet ?? item.description ?? ""
    );
    const articleText = await fetchArticleText(url, rssBody);

    if (articleText.length < MIN_ARTICLE_LENGTH) {
      summary[leader.slug].skipped++;
      continue;
    }

    // Build search results for lesson generation
    const searchResults: SearchResult[] = [
      { guest: `${leader.name} (${leader.credential})`, episodeTitle: title, snippet: articleText.slice(0, 2500) },
      { guest: `${leader.name} (${leader.credential})`, episodeTitle: title, snippet: articleText.slice(2500, 5000) || articleText.slice(0, 1000) },
    ];

    let lessonResult;
    try {
      lessonResult = await generateLeaderLesson(title, searchResults);
    } catch {
      summary[leader.slug].skipped++;
      continue;
    }

    // Quality guardrails
    if (!lessonResult?.content || lessonResult.content.length < MIN_LESSON_CONTENT) {
      summary[leader.slug].skipped++;
      continue;
    }
    if (isGenericLessonContent(lessonResult.content)) {
      summary[leader.slug].skipped++;
      continue;
    }
    if (lessonResult.questions && isWeakQuestionSet(lessonResult.questions)) {
      summary[leader.slug].skipped++;
      continue;
    }
    if (!lessonResult.questions || lessonResult.questions.length < 2) {
      summary[leader.slug].skipped++;
      continue;
    }

    const sourceTranscript = buildSourceTranscript(title, searchResults);

    const lesson = await prisma.lesson.create({
      data: {
        title: `${title.slice(0, 75)} — ${leader.name}`,
        slug,
        description: `${leader.credential}: ${title.slice(0, 90)}`,
        content: lessonResult.content,
        xpReward: 15,
        difficulty: 2,
        dayNumber: dayCounter++,
        categoryId: category.id,
        guestName: `${leader.name} (${leader.credential})`,
        episodeTitle: title,
        youtubeId: null,
        sourceTranscript,
        aiGenerated: false,
        generatedForUserId: null,
        topicKey: `leader:${leader.slug}:${slug}`,
        isLocked: false,
      } as any,
    });

    // Create quiz questions
    for (let i = 0; i < lessonResult.questions.length; i++) {
      const q = lessonResult.questions[i]!;
      await (prisma as any).question.create({
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

    created++;
    summary[leader.slug].created++;
  }
}

// ─── Route Handler ───────────────────────────────────────────────────────────

export async function GET(req: Request) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const leaderArg = searchParams.get("leader");

  const leaders = leaderArg
    ? LEADERS.filter((l) => l.slug === leaderArg || l.name.toLowerCase().includes(leaderArg.toLowerCase()))
    : LEADERS;

  const summary: Record<string, { fetched: number; created: number; skipped: number }> = {};

  for (const leader of leaders) {
    try {
      await processLeader(leader, summary);
    } catch (err) {
      summary[leader.slug] = summary[leader.slug] ?? { fetched: 0, created: 0, skipped: 0 };
      console.error(`[ingest-leader-content] Error processing ${leader.slug}:`, err);
    }
  }

  const totalCreated = Object.values(summary).reduce((s, v) => s + v.created, 0);
  console.log(`[ingest-leader-content] Done. Total created: ${totalCreated}`);

  return NextResponse.json({ ok: true, totalCreated, summary });
}
