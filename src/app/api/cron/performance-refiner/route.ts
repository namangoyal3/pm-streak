import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Groq from "groq-sdk";

export const maxDuration = 60; // 1 min timeout
export const dynamic = "force-dynamic";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function GET(req: Request) {
  // 1. Verify cron secret
  const authHeader = req.headers.get("authorization");
  const CRON_SECRET = process.env.CRON_SECRET;
  
  if (!CRON_SECRET || authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 2. Find articles published more than 30 days ago that haven't been touched
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const oldArticle = await prisma.article.findFirst({
      where: {
        published: true,
        updatedAt: { lte: thirtyDaysAgo },
      },
      orderBy: { updatedAt: "asc" },
    });

    if (!oldArticle) {
      return NextResponse.json({ ok: false, reason: "No articles need refining right now." });
    }

    // 3. Ask LLM to rewrite the intro to trigger a freshness boost
    const systemPrompt = `You are a world-class Product Management SEO editor. 
Your goal is to optimize the introduction of this article to improve CTR and "freshness signals".
Rewrite ONLY the first 2 paragraphs to be extremely punchy, hooking the reader immediately. Keep the same overall meaning.
Do NOT output any conversational filler. Just the polished text.

Original Introduction (first 500 characters):
${oldArticle.body.substring(0, 500)}...
`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "system", content: systemPrompt }],
      model: "llama3-70b-8192",
      temperature: 0.7,
    });

    const rewrite = completion.choices[0].message.content;
    if (!rewrite) throw new Error("Empty response from LLM");

    // Replace the first 500 characters roughly with the new rewrite
    // For MVP, we will prepend the new intro and drop the first two paragraphs manually.
    const bodyParts = oldArticle.body.split("\\n\\n");
    bodyParts.splice(0, 2, rewrite);
    const newBody = bodyParts.join("\\n\\n");

    // 4. Update the article and bump the updatedAt timestamp
    await prisma.article.update({
      where: { id: oldArticle.id },
      data: {
        body: newBody,
        seoScore: Math.min(100, oldArticle.seoScore + 2), // Boost score arbitrarily
        // updatedAt is handled automatically by Prisma
      },
    });

    return NextResponse.json({
      ok: true,
      refinedArticleId: oldArticle.id,
      slug: oldArticle.slug,
    });

  } catch (error: any) {
    console.error("Performance Refiner Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
