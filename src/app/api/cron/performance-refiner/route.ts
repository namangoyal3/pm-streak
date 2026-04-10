/**
 * Weekly performance refiner — runs Sunday 04:00 UTC.
 *
 * For each stale article (not updated in 30+ days):
 * 1. Rewrites the intro for freshness/CTR signal
 * 2. Backfills faqPairs if missing (GEO gap fill)
 * 3. Bumps updatedAt → seo-indexnow picks it up for re-submission to Bing/AI indexes
 */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Groq from "groq-sdk";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  const CRON_SECRET = process.env.CRON_SECRET;

  if (!CRON_SECRET || authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Find oldest stale article — prioritise ones missing faqPairs (GEO gap)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const oldArticle = await prisma.article.findFirst({
      where: {
        published: true,
        updatedAt: { lte: thirtyDaysAgo },
      },
      orderBy: [
        // Articles missing FAQ come first — highest GEO value
        { faqPairs: "asc" },
        { updatedAt: "asc" },
      ],
    });

    if (!oldArticle) {
      return NextResponse.json({ ok: false, reason: "No articles need refining right now." });
    }

    const hasFaq = Array.isArray(oldArticle.faqPairs) && (oldArticle.faqPairs as unknown[]).length > 0;

    // Build prompt: rewrite intro + generate FAQ if missing
    const systemPrompt = `You are a world-class Product Management SEO and GEO editor.
Your task is to improve an existing PM article for freshness, CTR, and AI citation signals.

Article title: ${oldArticle.title}
Article body (first 800 chars):
${oldArticle.body.substring(0, 800)}

${hasFaq ? "Task: Rewrite ONLY the opening paragraph (before the first ## heading) to be punchier and more 2026-relevant. Keep meaning intact." : `Task: Do BOTH:
1. Rewrite the opening paragraph (before the first ## heading) to be punchier and more 2026-relevant.
2. Generate 5 FAQ pairs for this article topic that a PM would actually search for.`}

Return a JSON object ONLY:
{
  "newIntro": "Rewritten opening paragraph here...",
  ${hasFaq ? "" : `"faqPairs": [
    { "question": "...", "answer": "2-4 sentence direct answer..." },
    { "question": "...", "answer": "..." },
    { "question": "...", "answer": "..." },
    { "question": "...", "answer": "..." },
    { "question": "...", "answer": "..." }
  ]`}
}`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: systemPrompt }],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      temperature: 0.6,
    });

    const raw = completion.choices[0]?.message?.content;
    if (!raw) throw new Error("Empty LLM response");

    let parsed: { newIntro?: string; faqPairs?: { question: string; answer: string }[] };
    try {
      parsed = JSON.parse(raw);
    } catch {
      throw new Error(`Failed to parse LLM JSON: ${raw.slice(0, 200)}`);
    }

    if (!parsed.newIntro) throw new Error("LLM did not return newIntro");

    // Splice new intro before the first ## heading — safe even if no \n\n breaks
    const firstHeadingIdx = oldArticle.body.search(/^## /m);
    const newBody = firstHeadingIdx > 0
      ? parsed.newIntro + "\n\n" + oldArticle.body.slice(firstHeadingIdx)
      : parsed.newIntro + "\n\n" + oldArticle.body;

    await prisma.article.update({
      where: { id: oldArticle.id },
      data: {
        body: newBody,
        ...(!hasFaq && parsed.faqPairs?.length ? { faqPairs: parsed.faqPairs as object[] } : {}),
        // updatedAt auto-bumped by Prisma → seo-indexnow will pick this up
      },
    });

    return NextResponse.json({
      ok: true,
      articleId: oldArticle.id,
      slug: oldArticle.slug,
      faqBackfilled: !hasFaq && !!parsed.faqPairs?.length,
    });

  } catch (error: any) {
    console.error("[performance-refiner] Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
