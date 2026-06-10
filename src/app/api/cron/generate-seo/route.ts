import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateSeoArticle } from "@/lib/llm-lessons";
import { searchLennyTranscripts } from "@/lib/lesson-generator";
import { scoreSEO, scoreArticle } from "@/lib/seo-score";
import { assertCronAuth } from "@/lib/cron-auth";

const ARTICLE_PUBLISH_THRESHOLD = 70;

export async function GET(req: Request) {
  const deny = assertCronAuth(req);
  if (deny) return deny;

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

    // 4. Validate and Score (SEO + GEO combined via scoreArticle)
    const scoring = scoreArticle({
      title: articleData.title,
      description: articleData.description,
      body: articleData.body,
      primaryKeyword: articleData.primaryKeyword,
    });

    if (scoring.seoScore < ARTICLE_PUBLISH_THRESHOLD) {
      console.warn(`[cron/generate-seo] Article SEO score too low: ${scoring.seoScore}. Skipping.`);
      await prisma.seoKeyword.update({
        where: { id: targetKeywordRow.id },
        data: { status: "failed" },
      });
      return NextResponse.json({
        ok: false,
        reason: "SEO score below threshold",
        seoScore: scoring.seoScore,
        geoScore: scoring.geoScore,
        overallScore: scoring.overallScore,
      });
    }

    console.log(`[cron/generate-seo] Scores — SEO: ${scoring.seoScore} | GEO: ${scoring.geoScore} | Overall: ${scoring.overallScore}`);
    console.log(`[cron/generate-seo] Breakdown: words=${scoring.breakdown.wordCount}, h2=${scoring.breakdown.h2Headings}, citability=${scoring.breakdown.citabilityBlocks}`);

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
        seoScore: scoring.seoScore,
        geoScore: scoring.geoScore,
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
      seoScore: scoring.seoScore,
      geoScore: scoring.geoScore,
      overallScore: scoring.overallScore,
      breakdown: scoring.breakdown,
    });
  } catch (error) {
    console.error("[cron/generate-seo] Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Generation failed" },
      { status: 500 }
    );
  }
}