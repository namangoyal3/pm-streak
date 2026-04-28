import { NextResponse } from "next/server";
import { z } from "zod";

const RequestSchema = z.object({
  query: z.string().min(1).max(500),
  num: z.number().int().min(1).max(20).optional(),
  type: z.enum(["search", "news"]).optional(),
});

// Simple in-memory cache (1h TTL)
const cache = new Map<string, { data: unknown; ts: number }>();
const CACHE_TTL = 60 * 60 * 1000;

function getCached(key: string) {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.ts < CACHE_TTL) return entry.data;
  cache.delete(key);
  return null;
}

export async function POST(req: Request) {
  if (req.headers.get("x-api-key") !== process.env.LYZR_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues }, { status: 400 });
  }

  const { query, num = 10, type = "search" } = parsed.data;
  const cacheKey = `serper:${type}:${query}:${num}`;
  const cached = getCached(cacheKey);
  if (cached) return NextResponse.json({ cached: true, results: cached });

  const apiKey = process.env.SERPER_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "SERPER_API_KEY not configured" }, { status: 503 });
  }

  const res = await fetch(`https://google.serper.dev/${type}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": apiKey,
    },
    body: JSON.stringify({ q: query, num }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: `Serper ${res.status}` }, { status: 502 });
  }

  const data = await res.json();
  cache.set(cacheKey, { data, ts: Date.now() });
  return NextResponse.json({ cached: false, results: data });
}
