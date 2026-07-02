import { NextResponse } from "next/server";
import { z } from "zod";
import { queryGscPages, queryGscQueriesForPage, queryGscSummary } from "@/lib/geo/gsc-query";

const RequestSchema = z.object({
  mode: z.enum(["pages", "queries", "summary"]).default("pages"),
  slug: z.string().optional(),
  limit: z.number().min(1).max(500).default(100),
});

export async function POST(req: Request) {
  if (req.headers.get("x-api-key") !== process.env.LYZR_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues }, { status: 400 });
  }

  const { mode, slug, limit } = parsed.data;

  if (mode === "summary") {
    const summary = await queryGscSummary();
    return NextResponse.json(summary);
  }

  if (mode === "queries" && slug) {
    const result = await queryGscQueriesForPage(slug, limit);
    return NextResponse.json(result);
  }

  // default: pages
  const result = await queryGscPages({}, limit);
  return NextResponse.json(result);
}

export async function GET(req: Request) {
  if (req.headers.get("x-api-key") !== process.env.LYZR_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const summary = await queryGscSummary();
  return NextResponse.json(summary);
}
