import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://learnanything.pro";

export default function robots(): MetadataRoute.Robots {
  const publicPaths = ["/", "/api/agents/pm-streak-context"];
  const privatePaths = ["/api/", "/admin", "/dashboard", "/onboarding", "/reset-password", "/settings", "/_next/"];
  return {
    rules: [
      {
        // Default: allow public content while protecting private app surfaces.
        userAgent: "*",
        allow: publicPaths,
        disallow: privatePaths,
      },
      {
        // OpenAI crawlers and user-triggered fetchers.
        userAgent: "GPTBot",
        allow: publicPaths,
        disallow: privatePaths,
      },
      {
        userAgent: "OAI-SearchBot",
        allow: publicPaths,
        disallow: privatePaths,
      },
      {
        userAgent: "ChatGPT-User",
        allow: publicPaths,
        disallow: privatePaths,
      },
      {
        // Anthropic crawlers and user-triggered fetchers.
        userAgent: "ClaudeBot",
        allow: publicPaths,
        disallow: privatePaths,
      },
      {
        userAgent: "Claude-SearchBot",
        allow: publicPaths,
        disallow: privatePaths,
      },
      {
        userAgent: "Claude-User",
        allow: publicPaths,
        disallow: privatePaths,
      },
      {
        // Perplexity search crawler and user-triggered fetcher.
        userAgent: "PerplexityBot",
        allow: publicPaths,
        disallow: privatePaths,
      },
      {
        userAgent: "Perplexity-User",
        allow: publicPaths,
        disallow: privatePaths,
      },
      {
        // Google Search and Gemini/Vertex AI control token.
        userAgent: "Googlebot",
        allow: publicPaths,
        disallow: privatePaths,
      },
      {
        userAgent: "Google-Extended",
        allow: publicPaths,
        disallow: privatePaths,
      },
      {
        userAgent: "GoogleOther",
        allow: publicPaths,
        disallow: privatePaths,
      },
      {
        // Common AI/search crawlers.
        userAgent: "CCBot",
        allow: publicPaths,
        disallow: privatePaths,
      },
      {
        userAgent: "Applebot",
        allow: publicPaths,
        disallow: privatePaths,
      },
      {
        userAgent: "Applebot-Extended",
        allow: publicPaths,
        disallow: privatePaths,
      },
      {
        userAgent: "FacebookBot",
        allow: publicPaths,
        disallow: privatePaths,
      },
      {
        userAgent: "Bytespider",
        allow: publicPaths,
        disallow: privatePaths,
      },
    ],
    sitemap: [`${siteUrl}/sitemap.xml`],
    host: siteUrl,
  };
}
