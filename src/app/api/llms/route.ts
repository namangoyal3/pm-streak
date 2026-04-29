import { NextResponse } from "next/server";
import { getLlmsTxt } from "@/lib/agentic-site";

/**
 * Backward-compatible endpoint for older clients that fetched /api/llms.
 * The canonical files are /llms.txt and /llms-full.txt.
 */
export async function GET() {
  return new NextResponse(getLlmsTxt({ full: true }), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
