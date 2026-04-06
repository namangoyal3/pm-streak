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
    // 2. Fetch existing keywords to tell the LLM what NOT to generate
    const recentKeywords = await prisma.seoKeyword.findMany({
      take: 50,
      orderBy: { createdAt: "desc" },
      select: { keyword: true },
    });
    
    const existingList = recentKeywords.map((k: { keyword: string }) => k.keyword).join(", ");

    // 3. Prompt the Architect LLM
    const systemPrompt = `You are a world-class Product Management SEO expert that specializes in identifying "High Intent" search gaps.
Your goal is to find exactly 5 highly-specific, bottom-of-funnel search queries that product managers actually search for on Google or Perplexity.
DO NOT generate generic topics like "Agile Framework". 
DO generate long-tail queries like:
- "Stripe PM execution interview questions"
- "How to answer the favorite product question at Meta"
- "Best template for a feature kick-off document"
- "Metrics to track for a B2B SaaS onboarding flow"

Here are the most recent keywords that we ALREADY have exactly covered. DO NOT REPEAT THESE:
${existingList}

Respond strictly with a JSON array of objects, containing "keyword", "pageType" (MUST be exactly "blog" or "framework" or "interview_guide"), and "priority" (integer from 50 to 100 based on conversion intent).
Example format:
[
  { "keyword": "Best template for PRD document", "pageType": "framework", "priority": 85 }
]`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "system", content: systemPrompt }],
      model: "llama3-70b-8192",
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const outputString = completion.choices[0].message.content;
    if (!outputString) throw new Error("Empty response from LLM");

    // The llama3-70b model outputs valid JSON if instructed, but might wrap it in an object if forced to json_object.
    // Let's parse securely.
    let parsed: any;
    try {
      parsed = JSON.parse(outputString);
      if (parsed.keywords) parsed = parsed.keywords; // Fallback if wrapped
    } catch {
      // Manual array extraction fallback
      const match = outputString.match(/\[([\s\S]*?)\]/);
      if (match) {
        parsed = JSON.parse(match[0]);
      } else {
        throw new Error("Could not parse LLM output");
      }
    }

    if (!Array.isArray(parsed)) {
      // In case it's still not an array, wrap it or extract it.
      if (typeof parsed === "object" && Object.values(parsed).length > 0) {
        let possibleArray = Object.values(parsed).find(v => Array.isArray(v));
        if (possibleArray) {
            parsed = possibleArray;
        } else {
            parsed = [parsed];
        }
      }
    }

    let insertedCount = 0;
    const insertedKeywords = [];

    // 4. Save to Database
    for (const item of parsed) {
      if (!item.keyword) continue;
      
      const exists = await prisma.seoKeyword.findUnique({
        where: { keyword: item.keyword },
      });

      if (!exists) {
        const type = ["blog", "framework", "interview_guide"].includes(item.pageType) ? item.pageType : "blog";
        const newKeyword = await prisma.seoKeyword.create({
          data: {
            keyword: item.keyword,
            vertical: "pm",
            priority: item.priority || 70,
            pageType: type,
            status: "pending",
          },
        });
        insertedCount++;
        insertedKeywords.push(newKeyword.keyword);
      }
    }

    return NextResponse.json({
      ok: true,
      insertedCount,
      insertedKeywords,
    });

  } catch (error: any) {
    console.error("Intent Mapper Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
