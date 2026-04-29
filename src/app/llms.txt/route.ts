import { NextResponse } from "next/server";
import { getLlmsTxt } from "@/lib/agentic-site";

/**
 * /llms.txt — Machine-readable product description for AI crawlers.
 * Following the llms.txt proposal for AI platform discovery.
 * This helps ChatGPT, Perplexity, Claude, and Gemini understand and cite PM Streak.
 */
export async function GET() {
  return new NextResponse(getLlmsTxt(), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
