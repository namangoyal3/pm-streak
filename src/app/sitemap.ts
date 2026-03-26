import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://learnanything.pro";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${siteUrl}/learn`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/login`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/signup`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/explore`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${siteUrl}/leaderboard`, lastModified: now, changeFrequency: "daily", priority: 0.6 },
    { url: `${siteUrl}/social`, lastModified: now, changeFrequency: "daily", priority: 0.6 },
    { url: `${siteUrl}/daily-challenge`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${siteUrl}/interview-prep`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${siteUrl}/jobs`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${siteUrl}/role-roadmaps`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/invite`, lastModified: now, changeFrequency: "weekly", priority: 0.5 },
    { url: `${siteUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  let articleRoutes: MetadataRoute.Sitemap = [];
  try {
    const articles = await prisma.article.findMany({
      where: { published: true },
      select: { slug: true, vertical: true, updatedAt: true },
    });
    articleRoutes = articles.map((a) => ({
      url: `${siteUrl}/learn/${a.vertical}/${a.slug}`,
      lastModified: a.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch {
    // DB unavailable during static generation — return static routes only
  }

  return [...staticRoutes, ...articleRoutes];
}
