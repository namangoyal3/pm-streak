import { NextResponse } from "next/server";
import { getA2AAgentCard } from "@/lib/agentic-site";

export async function GET() {
  return NextResponse.json(getA2AAgentCard(), {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
