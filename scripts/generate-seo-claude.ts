/**
 * Local GEO-optimised article generator using Claude (Haiku — fast & cheap).
 * Bypasses the deployed cron — runs directly against the DB from this machine.
 *
 * Usage: DATABASE_URL=... npx tsx scripts/generate-seo-claude.ts
 *
 * Uses ANTHROPIC_API_KEY from environment (Claude Code session credits).
 */

import Anthropic from "@anthropic-ai/sdk";
import { PrismaClient } from "@prisma/client";
import { scoreSEO } from "../src/lib/seo-score";

const prisma = new PrismaClient();
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const LENNY_MCP_URL = "https://lenny-mcp.onrender.com/mcp";
const PUBLISH_THRESHOLD = 70;

// ── Lenny MCP helpers ─────────────────────────────────────────────────────────

async function initMcpSession(): Promise<string> {
  const res = await fetch(LENNY_MCP_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json, text/event-stream" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "pm-streak-local", version: "1.0.0" } } }),
  });
  const lines = (await res.text()).split("\n").filter(l => l.startsWith("data:"));
  const data = JSON.parse(lines[lines.length - 1].replace("data:", "").trim());
  const sessionId: string = data?.result?.sessionId ?? res.headers.get("mcp-session-id") ?? `session-${Date.now()}`;
  return sessionId;
}

async function searchLenny(sessionId: string, query: string): Promise<{ guest: string; episode: string; snippet: string }[]> {
  const res = await fetch(LENNY_MCP_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
      "mcp-session-id": sessionId,
    },
    body: JSON.stringify({ jsonrpc: "2.0", id: 2, method: "tools/call", params: { name: "search_transcripts", arguments: { query, limit: 4 } } }),
  });
  const text = await res.text();
  const lines = text.split("\n").filter(l => l.startsWith("data:"));
  const results: { guest: string; episode: string; snippet: string }[] = [];
  for (const line of lines) {
    try {
      const d = JSON.parse(line.replace("data:", "").trim());
      const content = d?.result?.content ?? [];
      for (const item of content) {
        if (item.type === "text" && item.text) {
          // Parse "Guest: X\nEpisode: Y\nContent: Z" blocks
          const blocks = item.text.split(/\n---\n|\n\n(?=Guest:)/);
          for (const block of blocks) {
            const guest = block.match(/Guest:\s*(.+)/)?.[1]?.trim() ?? "Unknown";
            const episode = block.match(/Episode(?:\s*Title)?:\s*(.+)/)?.[1]?.trim() ?? "N/A";
            const snippet = block.match(/(?:Content|Snippet|Text):\s*([\s\S]+)/)?.[1]?.trim() ?? block.slice(0, 500);
            if (snippet.length > 50) results.push({ guest, episode, snippet: snippet.slice(0, 800) });
          }
        }
      }
    } catch {}
  }
  return results.slice(0, 4);
}

// ── Claude article generator ──────────────────────────────────────────────────

async function generateArticle(topic: string, transcripts: { guest: string; episode: string; snippet: string }[]) {
  const context = transcripts
    .map((r, i) => `[Excerpt ${i + 1}] Guest: ${r.guest}\nEpisode: ${r.episode}\nContent: ${r.snippet}`)
    .join("\n\n");

  const prompt = `Act as an expert PM content strategist specialising in both SEO and GEO (Generative Engine Optimisation — being cited by ChatGPT, Perplexity, Claude, and Google AI Overviews).

TOPIC: ${topic}

TRANSCRIPT HIGHLIGHTS:
${context}

═══ SEO REQUIREMENTS ═══
1. WORD COUNT: 1000+ words minimum.
2. STRUCTURE: H1 title → multiple ## H2 sections → at least two ### H3 sub-sections.
3. KEYWORD DENSITY: Primary keyword in title, first 100 words, and 3-5× naturally in body.
4. META DESCRIPTION: 120-160 characters, includes primary keyword, action-oriented.
5. INTERNAL LINKS: Link naturally to (/pricing), (/interview-prep), (/dashboard) where relevant.
6. EXTERNAL LINKS: At least one authoritative external link (Lenny's newsletter, etc.)

═══ GEO REQUIREMENTS ═══
7. DIRECT ANSWER BLOCK: Start with a bold "**[Topic] is...**" sentence AI engines can extract.
8. EXPERT CITATIONS: At least 3 "According to [Guest Name] on Lenny's Podcast, ..." sentences.
9. DEFINITION BOXES: Use blockquotes (>) for key term definitions.
10. STRUCTURED LISTS: Numbered lists for frameworks/steps, bullets for examples.
11. FAQ SECTION: End body with "## Frequently Asked Questions" with 5 Q&A using ### for each.
12. HOW-TO STEPS: If procedural, include "## Step-by-Step Guide" with numbered steps.

═══ CONTENT REQUIREMENTS ═══
- Synthesise guest insights into a cohesive Ultimate Guide.
- Contextualise for 2026: AI agents, LLM-assisted workflows, post-AGI-transition product culture.
- Include "Common Pitfalls to Avoid" and "Success Metrics" sections.
- Tone: authoritative, practitioner-level, not generic.

OUTPUT: Return valid JSON only.
{
  "title": "SEO + GEO Optimized Title (60-70 chars)",
  "description": "120-160 char meta description with primary keyword",
  "primaryKeyword": "exact primary keyword phrase",
  "body": "Full markdown article (1000+ words) with FAQ section at end",
  "faqPairs": [
    { "question": "...", "answer": "2-4 sentence direct answer" },
    { "question": "...", "answer": "..." },
    { "question": "...", "answer": "..." },
    { "question": "...", "answer": "..." },
    { "question": "...", "answer": "..." }
  ],
  "howToSteps": [
    { "name": "Step name", "text": "What to do and why." }
  ]
}
howToSteps should be [] if topic is not procedural.`;

  const response = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 4096,
    messages: [{ role: "user", content: prompt }],
  });

  const raw = response.content[0]?.type === "text" ? response.content[0].text : "";

  // Extract JSON — handle markdown fences
  const jsonMatch = raw.match(/```(?:json)?\s*([\s\S]+?)\s*```/) ?? raw.match(/(\{[\s\S]+\})/);
  const jsonStr = jsonMatch ? jsonMatch[1] : raw;

  return JSON.parse(jsonStr.trim()) as {
    title: string;
    description: string;
    primaryKeyword: string;
    body: string;
    faqPairs: { question: string; answer: string }[];
    howToSteps: { name: string; text: string }[];
  };
}

// ── Main loop ─────────────────────────────────────────────────────────────────

async function main() {
  let sessionId: string | null = null;

  // Count pending
  const pendingCount = await prisma.$queryRaw<{ c: number }[]>`
    SELECT COUNT(*)::int as c FROM "SeoKeyword" WHERE status='pending'
  `;
  const total = pendingCount[0]?.c ?? 0;
  console.log(`\n=== Starting GEO batch — ${total} pending keywords ===\n`);

  let success = 0, failed = 0, n = 0;

  while (true) {
    // Pick highest priority pending keyword
    const keyword = await prisma.$queryRaw<{ id: string; keyword: string; pageType: string }[]>`
      SELECT id, keyword, "pageType" FROM "SeoKeyword"
      WHERE status = 'pending'
      ORDER BY priority DESC
      LIMIT 1
    `;

    if (!keyword.length) {
      console.log("\nQueue empty — all done!");
      break;
    }

    const { id, keyword: topic, pageType } = keyword[0];
    n++;
    process.stdout.write(`[${n}/${total}] ${topic} ... `);

    // Mark as mapping
    await prisma.$executeRaw`UPDATE "SeoKeyword" SET status='mapping' WHERE id=${id}`;

    try {
      // Init MCP session (reuse across iterations)
      if (!sessionId) sessionId = await initMcpSession();

      // Search Lenny transcripts
      const transcripts = await searchLenny(sessionId, topic);
      if (transcripts.length < 2) {
        console.log(`SKIP (only ${transcripts.length} transcript excerpts)`);
        await prisma.$executeRaw`UPDATE "SeoKeyword" SET status='failed' WHERE id=${id}`;
        failed++;
        continue;
      }

      // Generate article with Claude
      const article = await generateArticle(topic, transcripts);

      // Score
      const score = scoreSEO({
        title: article.title,
        description: article.description,
        body: article.body,
        primaryKeyword: article.primaryKeyword,
        faqPairs: article.faqPairs,
        howToSteps: article.howToSteps,
      });

      if (score < PUBLISH_THRESHOLD) {
        console.log(`FAIL score=${score}`);
        await prisma.$executeRaw`UPDATE "SeoKeyword" SET status='failed' WHERE id=${id}`;
        failed++;
        continue;
      }

      // Build slug
      const slug = article.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .slice(0, 80) + `-${Date.now().toString().slice(-4)}`;

      // Insert article
      const articleId = `c${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
      const now = new Date().toISOString();
      await prisma.$executeRaw`
        INSERT INTO "Article" (id, slug, title, description, body, vertical, tags, "pageType", "keywordId", "seoScore", published, "publishedAt", "wordCount", "sourceUrls", "faqPairs", "howToSteps", "createdAt", "updatedAt")
        VALUES (
          ${articleId}, ${slug}, ${article.title}, ${article.description}, ${article.body},
          'pm', ARRAY[${topic}, 'lenny-podcast-insights'], ${pageType ?? 'blog'}, ${id},
          ${score}, true, ${now}::timestamptz, ${article.body.split(/\s+/).length},
          ARRAY[]::text[], ${JSON.stringify(article.faqPairs)}::jsonb, ${JSON.stringify(article.howToSteps)}::jsonb,
          ${now}::timestamptz, ${now}::timestamptz
        )
      `;

      await prisma.$executeRaw`UPDATE "SeoKeyword" SET status='generated' WHERE id=${id}`;
      console.log(`OK score=${score} | ${article.title.slice(0, 60)}`);
      success++;

    } catch (err: any) {
      console.log(`ERROR: ${err.message?.slice(0, 80)}`);
      await prisma.$executeRaw`UPDATE "SeoKeyword" SET status='failed' WHERE id=${id}`;
      failed++;
      // Reset session on MCP errors
      if (err.message?.includes("mcp") || err.message?.includes("fetch")) sessionId = null;
    }

    // Small delay to be kind to the MCP server
    await new Promise(r => setTimeout(r, 1500));
  }

  const totalArticles = await prisma.$queryRaw<{ c: number }[]>`SELECT COUNT(*)::int as c FROM "Article" WHERE published=true`;
  const withFaq = await prisma.$queryRaw<{ c: number }[]>`SELECT COUNT(*)::int as c FROM "Article" WHERE "faqPairs" IS NOT NULL AND jsonb_array_length("faqPairs"::jsonb) > 0`;

  console.log(`\n=== DONE: ${success} published | ${failed} failed ===`);
  console.log(`Total articles: ${totalArticles[0]?.c} | With GEO FAQ: ${withFaq[0]?.c}`);

  await prisma.$disconnect();
}

main().catch(err => {
  console.error("Fatal:", err);
  process.exit(1);
});
