---
name: SEO/GEO/AI Citability Improvements
description: Summary of all SEO, GEO, and AI citability improvements made to learnanything.pro on 2026-04-21
type: project
---

## SEO/GEO/AI Citability Improvements — 2026-04-21

438 files changed across the codebase to improve SEO, GEO (Generative Engine Optimization), and AI citability scores.

### What was done

**AI Crawler Accessibility**
- Created `/public/llms.txt` — guides GPTBot, ClaudeBot, PerplexityBot, Applebot, and others on site content and crawl permissions
- Added OAI-SearchBot, Applebot-Extended, FacebookBot, Bytespider to `src/app/robots.ts`

**Global Structured Data (layout.tsx)**
- Added WebSite JSON-LD with SearchAction (sitelinks searchbox) — rendered on every page
- Added Organization JSON-LD with logo, contact, foundingDate, sameAs — rendered on every page
- Added preconnect for Google Analytics and dns-prefetch for PostHog
- Removed incorrect global `alternates.canonical` that would have overridden per-page canonicals
- Added `twitter.site: "@pmstreak"` to global twitter card

**Article Pages (src/app/learn/[vertical]/[slug]/page.tsx)**
- `generateMetadata` now sets absolute canonical URL, og:url, og:type article, publishedTime, modifiedTime
- Article JSON-LD now includes `image` field (required for Google rich results), @id, inLanguage, isPartOf, publisher logo

**Static SEO Pages (430+ pages in src/app/*/page.tsx)**
- Added OG images to all 430+ pages using dynamic `/api/og?title=...` endpoint
- Added Twitter `summary_large_image` cards with title, description, image, site: "@pmstreak"
- Pattern: `images: [{ url: \`${SITE_URL}/api/og?title=...\`, width: 1200, height: 630 }]`

**Key Pages Improved**
- `/pricing` — absolute canonical, better OG description with pricing info
- `/learn` — absolute canonical, description mentions "300+ PM interviews"
- `/` (homepage) — webPageJsonLd replacing duplicate orgJsonLd, absolute canonical

**JsonLd.tsx component**
- Added `webPageSchema()` helper function
- Improved `articleSchema()` — publisher logo, url, inLanguage, mainEntityOfPage

### Key patterns used

```typescript
// In static pages — OG image pattern:
images: [{ url: `${SITE_URL}/api/og?title=Page+Title+Here`, width: 1200, height: 630 }]

// Twitter card pattern:
twitter: {
  card: "summary_large_image",
  title: "OG title here",
  description: "OG description here",
  images: [`${SITE_URL}/api/og?title=Page+Title+Here`],
  site: "@pmstreak",
}
```

**Why:** These pages were showing up in search with no preview images and no Twitter cards, which reduces click-through rate and social sharing engagement. AI crawlers like GPT and Claude were not aware of the site's full content scope.

**How to apply:** Any new static SEO page should follow these patterns. Use the `webPageSchema()` and `articleSchema()` helpers from `JsonLd.tsx` for structured data.
