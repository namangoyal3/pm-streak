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
    // 1. Pick a topic that hasn't been turned into an article recently
    // We'll prioritize the seed topics first
    const seedTopics = [...EXPLORE_SEED_TOPICS];
    const existingArticles = await prisma.article.findMany({
      select: { title: true },
    });
    
    const existingTitles = existingArticles.map(a => a.title.toLowerCase());
    
    // Find a seed topic not already covered
    let targetTopic = seedTopics.find(t => 
      !existingTitles.some(et => et.includes(t.toLowerCase()))
    );

    // Fallback: pick a random seed topic if all are covered
    if (!targetTopic) {
      targetTopic = seedTopics[Math.floor(Math.random() * seedTopics.length)];
    }

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
        seoScore,
        published: true,
        publishedAt: new Date(),
        wordCount: articleData.body.split(/\s+/).length,
        sourceUrls: [],
      },
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
