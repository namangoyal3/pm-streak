import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://duolingo-for-pms.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${siteUrl}/login`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/explore`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${siteUrl}/leaderboard`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${siteUrl}/social`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${siteUrl}/daily-challenge`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${siteUrl}/invite`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${siteUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
