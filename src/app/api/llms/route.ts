import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Generate llms.txt — emerging standard for AI crawler discoverability
 * See: https://llmstxt.venture.com/
 *
 * Format:
 * # Site name
 * ## Section 1
 * Path: /path
 * Description: ...
 *
 * ## Section 2
 * etc.
 */

export async function GET(req: Request) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://learnanything.pro";
  const siteName = "PM Streak";
  const siteDescription =
    "PM Streak — The fastest way to sharpen your product management skills. " +
    "Daily 2-minute lessons from top PM leaders. Free to start, no credit card required.";

  const lines = [
    `# ${siteName}`,
    "",
    siteDescription,
    "",
    "## Core Pages",
    `Path: /`,
    `Description: Landing page — Daily 2-minute PM lessons, streak tracking, XP & leaderboard`,
    "",
    `Path: /pricing`,
    `Description: Simple pricing — Free (7 lessons/day) and Pro ($15/mo unlimited)`,
    "",
    "## Learning Paths",
    `Path: /dashboard`,
    `Description: Personal dashboard — Your current streak, XP, level, and daily lessons`,
    "",
    `Path: /explore`,
    `Description: Browse all available PM topics — Product Sense, Strategy, Analytics, Leadership`,
    "",
    `Path: /learn`,
    `Description: Current lesson queue — Pick up where you left off`,
    "",
    "## Resources",
    `Path: /interview-prep`,
    `Description: PM interview preparation — Frameworks, practice questions, real interview transcripts`,
    "",
    `Path: /role-roadmaps`,
    `Description: Career roadmaps for PM roles — Entry-level to Senior PM progression`,
    "",
    `Path: /community`,
    `Description: Join the PM Streak WhatsApp community — Connect with fellow PMs`,
    "",
  ];

  // Fetch published articles for blog section
  try {
    const articles = await prisma.article.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 20,
      select: { slug: true, title: true, description: true, tags: true },
    });

    if (articles.length > 0) {
      lines.push("## Blog Articles");
      for (const article of articles) {
        const tags = article.tags?.join(", ") || "PM";
        lines.push(`Path: /blog/${article.slug}`);
        lines.push(`Description: ${article.description} [Tags: ${tags}]`);
        lines.push("");
      }
    }
  } catch (e) {
    console.warn("[llms] Could not fetch articles:", e);
  }

  lines.push("## Legal & Support");
  lines.push(`Path: /privacy`);
  lines.push(`Description: Privacy policy`);
  lines.push("");
  lines.push(`Path: /terms`);
  lines.push(`Description: Terms of service`);
  lines.push("");
  lines.push(`Path: /support`);
  lines.push(`Description: Contact support — Priority support available for Pro users`);
  lines.push("");
  lines.push("---");
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push(`Source: ${baseUrl}/api/llms`);

  const content = lines.join("\n");

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "X-Content-Type-Options": "nosniff",
    },
  });
}