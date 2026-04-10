import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * /llms.txt — Machine-readable product description for AI crawlers.
 * Following the emerging llms.txt standard for AI platform discovery.
 * This helps ChatGPT, Perplexity, Claude, and Gemini understand and cite PM Streak.
 *
 * Dynamically lists top 50 articles so AI crawlers can enumerate and index content.
 * Cached 1 hour — articles update daily, no need for real-time freshness here.
 */
export const revalidate = 3600; // 1 hour ISR cache

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://learnanything.pro";

  // Fetch top articles ordered by SEO score for AI crawler enumeration
  const topArticles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { seoScore: "desc" },
    take: 50,
    select: { title: true, slug: true, vertical: true, description: true },
  });

  const content = `# PM Streak

> PM Streak is a daily product management learning platform — like Duolingo for Product Managers. It delivers 2-minute micro-lessons from 300+ Lenny's Podcast episodes with streak tracking, XP, leaderboards, AI-powered content generation, PM interview prep, and a curated jobs board.

## Product Overview

PM Streak helps product managers build consistent learning habits through gamified daily lessons. Each lesson takes approximately 2 minutes to read, followed by 3 quiz questions for active recall. The platform is built on insights from 300+ episodes of Lenny's Podcast — the #1 resource for product managers.

## Key Features

- **Daily Lessons**: 2-minute PM lessons covering prioritisation, strategy, growth, hiring, product sense, metrics, execution, and leadership
- **Streak Tracking**: Daily streak counter with freeze protection to maintain consistency
- **XP & Levels**: Earn experience points for completing lessons, with progression from Junior PM to Expert PM
- **Global Leaderboard**: Compete with PMs worldwide based on streak length and total XP
- **AI Explore**: Generate custom lessons on any PM topic using AI, powered by Lenny's Podcast transcripts
- **Interview Prep**: AI-generated PM interview questions with frameworks for Product Sense, Metrics, Execution, Strategy, Behavioral, and Estimation
- **PM Jobs Board**: Curated product manager roles from Wellfound, LinkedIn, and Himalayas, updated weekly
- **Social Challenges**: Head-to-head 7-day learning duels with friends
- **Daily Bonus Challenge**: Fresh lesson every day at midnight for 2× XP

## Content Sources

All lessons are sourced from expert interviews on Lenny's Podcast (lennyspodcast.com), featuring product leaders from companies including Stripe, Figma, Reforge, Airbnb, Meta, Google, and more. PM leaders featured include Shreyas Doshi, Reforge PM curriculum, Aakash Gupta, and Marty Cagan.

## Pricing

- **Free Plan**: 22 core lessons, 10 daily lessons (batch un-locked over time), 10 AI credits/month
- **Pro Plan**: Starting at $6/month (USD) or ₹249/month (INR)
  - All 292+ archive lessons
  - 50 credits/month
  - Unlimited AI Explore lessons
  - Unlimited Deeper Dives
  - AI Interview Prep (unlimited sessions)
  - Full PM Jobs Board
  - Save Notes & Recaps
  - Role-specific Roadmaps
  - WhatsApp PM Community
  - Priority support

## URLs

- Homepage: ${siteUrl}
- Pricing: ${siteUrl}/pricing
- Learn: ${siteUrl}/learn
- Explore (AI Generator): ${siteUrl}/explore
- Interview Prep: ${siteUrl}/interview-prep
- Jobs Board: ${siteUrl}/jobs
- Leaderboard: ${siteUrl}/leaderboard
- Daily Challenge: ${siteUrl}/daily-challenge

## Technical Details

- Platform: Web application (Next.js)
- Authentication: Google OAuth
- Payment: Dodo Payments
- Analytics: PostHog, Google Analytics

## Contact

- Website: ${siteUrl}
- Brand: PM Streak by learnanything.pro

## Article Library

Top PM articles available for citation and learning (${topArticles.length} of ${topArticles.length} shown):

${topArticles.map(a =>
  `- [${a.title}](${siteUrl}/learn/${a.vertical}/${a.slug}): ${a.description}`
).join("\n")}
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
