/**
 * Daily SEO freshness cron — runs at 03:30 UTC (after generate-seo at 03:00).
 *
 * 1. Finds all articles published/updated in the last 24 hours
 * 2. Submits their URLs + all static routes to IndexNow for instant re-indexing
 * 3. Bing index feeds ChatGPT, Perplexity, Claude within hours
 *
 * Schedule: vercel.json → 0 3 * * * (daily at 03:30 UTC / 09:00 IST)
 */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    return NextResponse.json({ error: "INDEXNOW_KEY not configured" }, { status: 500 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://learnanything.pro";
  const host = new URL(siteUrl).host;

  try {
    // 1. Find recently published/updated articles (last 48 hours for safety)
    const since = new Date(Date.now() - 48 * 60 * 60 * 1000);

    const recentArticles = await prisma.article.findMany({
      where: {
        published: true,
        publishedAt: { gte: since },
      },
      select: { slug: true, vertical: true },
    });

    // 2. Build URL list: new articles + key static pages (for freshness signal)
    const articleUrls = recentArticles.map(
      (a) => `${siteUrl}/learn/${a.vertical}/${a.slug}`
    );

    const staticUrls = [
      `${siteUrl}/`,
      `${siteUrl}/learn`,
      `${siteUrl}/pricing`,
      `${siteUrl}/explore`,
      `${siteUrl}/interview-prep`,
      `${siteUrl}/jobs`,
      `${siteUrl}/daily-challenge`,
      `${siteUrl}/sitemap.xml`,
      `${siteUrl}/llms.txt`,
    ];

    const allUrls = [...new Set([...articleUrls, ...staticUrls])];

    // 3. Submit to IndexNow
    const payload = {
      host,
      key,
      keyLocation: `${siteUrl}/${key}.txt`,
      urlList: allUrls.slice(0, 10000),
    };

    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });

    const success = res.ok || res.status === 200 || res.status === 202;

    console.log(
      `[cron/seo-indexnow] Submitted ${allUrls.length} URLs (${articleUrls.length} new articles). Status: ${res.status}`
    );

    return NextResponse.json({
      ok: success,
      submitted: allUrls.length,
      newArticles: articleUrls.length,
      staticPages: staticUrls.length,
      indexNowStatus: res.status,
    });
  } catch (error) {
    console.error("[cron/seo-indexnow] Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "IndexNow submission failed" },
      { status: 500 }
    );
  }
}
