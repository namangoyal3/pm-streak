import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/indexnow — Submit URLs to IndexNow for instant indexing.
 * IndexNow notifies Bing, Yandex, Seznam, and Naver.
 * Bing's index feeds ChatGPT, Perplexity, and Claude — making this critical for GEO.
 *
 * Body: { urls: string[] }
 * Requires INDEXNOW_KEY env var.
 */
export async function POST(req: NextRequest) {
  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    return NextResponse.json({ error: "INDEXNOW_KEY not configured" }, { status: 500 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://learnanything.pro";
  const host = new URL(siteUrl).host;

  let body: { urls?: string[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const urls = body.urls;
  if (!urls || !Array.isArray(urls) || urls.length === 0) {
    return NextResponse.json({ error: "Provide a non-empty 'urls' array" }, { status: 400 });
  }

  // Normalize URLs to absolute
  const absoluteUrls = urls.map((u) => (u.startsWith("http") ? u : `${siteUrl}${u}`));

  // IndexNow API — submit batch
  const payload = {
    host,
    key,
    keyLocation: `${siteUrl}/${key}.txt`,
    urlList: absoluteUrls.slice(0, 10000), // IndexNow limit
  };

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });

    if (res.ok || res.status === 200 || res.status === 202) {
      return NextResponse.json({
        success: true,
        submitted: absoluteUrls.length,
        message: `Submitted ${absoluteUrls.length} URLs to IndexNow`,
      });
    }

    const errorText = await res.text().catch(() => "Unknown error");
    return NextResponse.json(
      { error: `IndexNow API returned ${res.status}`, details: errorText },
      { status: 502 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to reach IndexNow API", details: String(err) },
      { status: 502 }
    );
  }
}

/**
 * GET /api/indexnow — Health check
 */
export async function GET() {
  const key = process.env.INDEXNOW_KEY;
  return NextResponse.json({
    configured: !!key,
    message: key
      ? "IndexNow is configured. POST URLs to submit for instant indexing."
      : "Set INDEXNOW_KEY environment variable to enable instant indexing.",
  });
}
