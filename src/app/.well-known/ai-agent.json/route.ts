import { NextResponse } from "next/server";
import { getAgenticSiteManifest } from "@/lib/agentic-site";

export async function GET() {
  return NextResponse.json(getAgenticSiteManifest(), {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
