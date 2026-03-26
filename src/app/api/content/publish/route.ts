import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { scoreSEO, slugify } from "@/lib/seo-score";

const SEO_THRESHOLD = 70;

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const secret = process.env.CRON_SECRET;
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: {
    title: string;
    description: string;
    body: string;
    vertical: string;
    tags?: string[];
    primaryKeyword: string;
    sourceUrls?: string[];
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { title, description, body: articleBody, vertical, tags = [], primaryKeyword, sourceUrls = [] } = body;

  if (!title || !description || !articleBody || !vertical || !primaryKeyword) {
    return NextResponse.json(
      { error: "Missing required fields: title, description, body, vertical, primaryKeyword" },
      { status: 400 }
    );
  }

  const seoScore = scoreSEO({ title, description, body: articleBody, primaryKeyword });
  const wordCount = articleBody.trim().split(/\s+/).length;

  if (seoScore < SEO_THRESHOLD) {
    return NextResponse.json({
      published: false,
      seoScore,
      reason: `SEO score ${seoScore} is below threshold of ${SEO_THRESHOLD}. Missing: check word count (>=800), H2 headings, keyword placement, and description length (120-160 chars).`,
    });
  }

  // Generate unique slug
  let baseSlug = slugify(title);
  let slug = baseSlug;
  let attempt = 0;
  while (attempt < 10) {
    const existing = await prisma.article.findUnique({ where: { slug }, select: { id: true } });
    if (!existing) break;
    attempt++;
    slug = `${baseSlug}-${attempt}`;
  }

  const article = await prisma.article.create({
    data: {
      slug,
      title,
      description,
      body: articleBody,
      vertical,
      tags,
      seoScore,
      wordCount,
      sourceUrls,
      published: true,
      publishedAt: new Date(),
    },
  });

  return NextResponse.json({ published: true, slug, seoScore, id: article.id });
}

// Also allow GET to retrieve a single article by slug (for verification)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });
  const article = await prisma.article.findUnique({ where: { slug, published: true } });
  if (!article) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json(article);
}
