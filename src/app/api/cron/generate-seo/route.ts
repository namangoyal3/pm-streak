import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateSeoArticle } from "@/lib/llm-lessons";
import { searchLennyTranscripts } from "@/lib/lesson-generator";
import { EXPLORE_SEED_TOPICS } from "@/lib/explore-topics";
import { scoreSEO } from "@/lib/seo-score";

const ARTICLE_PUBLISH_THRESHOLD = 70;

export async function GET(req: Request) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 1. Pick highest priority pending keyword
    const targetKeywordRow = await prisma.seoKeyword.findFirst({
      where: { status: "pending" },
      orderBy: { priority: "desc" },
    });

    if (!targetKeywordRow) {
      return NextResponse.json({ ok: false, reason: "No pending keywords in queue." });
    }

    const targetTopic = targetKeywordRow.keyword;
    const pageType = targetKeywordRow.pageType;

    // Mark as mapping
    await prisma.seoKeyword.update({
      where: { id: targetKeywordRow.id },
      data: { status: "mapping" },
    });

    console.log(`[cron/generate-seo] Generating article for topic: ${targetTopic}`);

    // 2. Search for transcript evidence
    const searchResults = await searchLennyTranscripts(targetTopic);
    if (!searchResults || searchResults.length < 2) {
      return NextResponse.json({ error: "Not enough evidence for this topic" });
    }

    // 3. Generate the SEO optimized article
    const articleData = await generateSeoArticle(targetTopic, searchResults);

    // 4. Validate and Score
    const seoScore = scoreSEO({
      title: articleData.title,
      description: articleData.description,
      body: articleData.body,
      primaryKeyword: articleData.primaryKeyword,
    });

    if (seoScore < ARTICLE_PUBLISH_THRESHOLD) {
      console.warn(`[cron/generate-seo] Article score too low: ${seoScore}. Skipping.`);
      await prisma.seoKeyword.update({
        where: { id: targetKeywordRow.id },
        data: { status: "failed" },
      });
      return NextResponse.json({ 
        ok: false, 
        reason: "SEO score below threshold", 
        score: seoScore 
      });
    }

    // 5. Create the Article in DB
    const slug = articleData.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 80);

    const article = await prisma.article.create({
      data: {
        slug: `${slug}-${Date.now().toString().slice(-4)}`,
        title: articleData.title,
        description: articleData.description,
        body: articleData.body,
        vertical: "pm",
        tags: [targetTopic, "lenny-podcast-insights"],
        pageType: pageType,
        keywordId: targetKeywordRow.id,
        seoScore,
        published: true,
        publishedAt: new Date(),
        wordCount: articleData.body.split(/\s+/).length,
        sourceUrls: [],
      },
    });

    await prisma.seoKeyword.update({
      where: { id: targetKeywordRow.id },
      data: { status: "generated" },
    });

    return NextResponse.json({ 
      ok: true, 
      topic: targetTopic, 
      articleId: article.id, 
      slug: article.slug,
      score: seoScore 
    });

  } catch (error) {
    console.error("[cron/generate-seo] Error:", error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : "Generation failed" 
    }, { status: 500 });
  }
}
