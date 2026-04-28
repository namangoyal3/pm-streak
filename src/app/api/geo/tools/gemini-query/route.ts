import { NextResponse } from "next/server";
import { z } from "zod";

const RequestSchema = z.object({
  query: z.string().min(1).max(500),
});

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

  const { query } = parsed.data;
  const cacheKey = `gemini:${query}`;
  const cached = getCached(cacheKey);
  if (cached) return NextResponse.json({ cached: true, results: cached });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "GEMINI_API_KEY not configured" }, { status: 503 });
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: query }] }],
      }),
    }
  );

  if (!res.ok) {
    return NextResponse.json({ error: `Gemini ${res.status}` }, { status: 502 });
  }

  const data = await res.json();
  cache.set(cacheKey, { data, ts: Date.now() });
  return NextResponse.json({ cached: false, results: data });
}
