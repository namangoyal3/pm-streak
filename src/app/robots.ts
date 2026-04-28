import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://learnanything.pro";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Default: allow everything except private/API routes
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin", "/dashboard", "/onboarding", "/reset-password"],
      },
      {
        // OpenAI's GPTBot — allow for ChatGPT citation
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/", "/admin", "/dashboard"],
      },
      {
        // OpenAI's search bot — for SearchGPT/web-browsing features
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/api/", "/admin", "/dashboard"],
      },
      {
        // Anthropic's ClaudeBot — allow for Claude citation
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/api/", "/admin", "/dashboard"],
      },
      {
        // Perplexity's bot — allow for Perplexity citation
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/", "/admin", "/dashboard"],
      },
      {
        // Google AI / Gemini training data
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/api/", "/admin", "/dashboard"],
      },
      {
        // Common Crawl — feeds many AI models
        userAgent: "CCBot",
        allow: "/",
        disallow: ["/api/", "/admin", "/dashboard"],
      },
      {
        // OpenAI search bot (ChatGPT web browsing / SearchGPT)
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/api/", "/admin", "/dashboard"],
      },
      {
        // Apple Intelligence / Applebot Extended (Siri citations)
        userAgent: "Applebot-Extended",
        allow: "/",
        disallow: ["/api/", "/admin", "/dashboard"],
      },
      {
        // Meta AI training crawler
        userAgent: "FacebookBot",
        allow: "/",
        disallow: ["/api/", "/admin", "/dashboard"],
      },
      {
        // Bytespider — TikTok/ByteDance AI training
        userAgent: "Bytespider",
        allow: "/",
        disallow: ["/api/", "/admin", "/dashboard"],
      },
    ],
    sitemap: [`${siteUrl}/sitemap.xml`],
    host: siteUrl,
  };
}

