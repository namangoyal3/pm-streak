import { NextResponse } from "next/server";
import { getLlmsTxt } from "@/lib/agentic-site";

export async function GET() {
  return new NextResponse(getLlmsTxt({ full: true }), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
