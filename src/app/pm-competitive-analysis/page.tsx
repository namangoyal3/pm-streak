import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "Competitive Analysis for PMs (2026) — How to Study Competitors Without Copying Them",
  description:
    "The PM guide to competitive analysis. How to study competitors, what to track, when to copy vs differentiate, and the anti-patterns that make competitive research useless.",
  keywords: [
    "competitive analysis PM", "product competitive research",
    "how PM does competitive analysis", "competitor teardown PM",
    "PM competitive intelligence 2026",
  ],
  alternates: { canonical: "/pm-competitive-analysis" },
  openGraph: {
    title: "Competitive Analysis for PMs 2026 — PM Streak",
    description: "How PMs study competitors effectively — frameworks, what to track, and when to differentiate.",
    url: `${SITE_URL}/pm-competitive-analysis`,
    images: [{ url: `${SITE_URL}/api/og?title=Competitive+Analysis+for+PMs+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Competitive Analysis for PMs 2026 — PM Streak",
    description: "How PMs study competitors effectively — frameworks, what to track, and when to differentiate.",
    images: [`${SITE_URL}/api/og?title=Competitive+Analysis+for+PMs+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const WHAT_TO_TRACK = [
  {
    dimension: "Product Features & UX",
    what: "Major features shipped, flow changes, design patterns, pricing tiers, release cadence",
    how: "Sign up as a user. Use the product monthly. Subscribe to their changelog, newsletter, and product hunt listings.",
    frequency: "Monthly deep-dive, weekly light check",
  },
  {
    dimension: "User Reviews & Complaints",
    what: "App Store reviews, G2/Capterra, subreddit discussions, Twitter complaints, support tickets leaked in forums",
    how: "Search their brand name on Reddit, Twitter, Quora regularly. Read 1-star reviews carefully — that's where real friction shows.",
    frequency: "Weekly scan",
  },
  {
    dimension: "Pricing & Packaging",
    what: "List prices, discount patterns, tier structures, enterprise vs SMB deltas, freemium limits",
    how: "Monitor their pricing page (use a change detector). Talk to their customers at events. Read their earnings calls if public.",
    frequency: "Quarterly, plus on announcement",
  },
  {
    dimension: "Hiring & Team Shape",
    what: "Roles they're hiring for — signals where they're investing. Team moves, leadership changes.",
    how: "LinkedIn filter on their company + new hires. Check job postings for role-level signals.",
    frequency: "Monthly",
  },
  {
    dimension: "Strategic Announcements",
    what: "Funding rounds, partnerships, acquisitions, public strategy docs, keynote speeches",
    how: "Google Alerts on their brand. Subscribe to their press page. Follow founders and product leads on Twitter/LinkedIn.",
    frequency: "Real-time (Google Alerts), weekly review",
  },
  {
    dimension: "User Behaviour Signals",
    what: "App rankings, SEO traffic trends, social engagement, ad spend levels",
    how: "SimilarWeb, Sensor Tower, AppAnnie. Free tiers give enough signal for most purposes.",
    frequency: "Monthly",
  },
];

const WHEN_TO_DO_WHAT = [
  {
    they_do: "Ship a feature you were planning",
    you_do: "Don't panic. Evaluate: (1) did they execute well? (2) is this the only way to solve the problem? (3) can you differentiate on quality, positioning, or integration?",
    avoid: "Rushing to ship a copy to claim you 'also have' the feature. Users rarely reward the second mover for doing the same thing.",
  },
  {
    they_do: "Lower their price significantly",
    you_do: "Evaluate if they're in a hole (runway pressure, defensive move) or if the market price is genuinely dropping. Don't reflexively match — consider stratifying pricing or adding value.",
    avoid: "Starting a price war. Revenue erodes faster than you can cut costs; winners of price wars are usually no one.",
  },
  {
    they_do: "Launch a major strategic pivot",
    you_do: "Study the reasoning publicly available (earnings calls, blog posts, interviews). Decide: is this relevant to your thesis? Does it change your strategy?",
    avoid: "Over-reacting to one competitor's pivot. Many pivots fail; your job is to watch, not to mirror.",
  },
  {
    they_do: "Acquire a complementary company",
    you_do: "Assess the implication: are they building a platform, a wedge, or just filling a gap? This shapes whether you need to defend, expand, or ignore.",
    avoid: "Assuming every acquisition is strategic. Many are talent acquisitions or distressed buys with little product impact.",
  },
];

const ANTI_PATTERNS = [
  "Watching competitors so much you lose sight of your users",
  "Copying features without copying the underlying insight that drove them",
  "Assuming every competitor move is a deliberate strategic signal",
  "Creating a 'competitive dashboard' nobody reads",
  "Confusing 'noise' (small updates) with 'signal' (strategic shifts)",
  "Doing competitive analysis once and never updating it",
];

const FAQS = [
  {
    q: "How much time should a PM spend on competitive analysis?",
    a: "~2 hours/week maintaining awareness; quarterly deep-dives of 4–6 hours. More than this and you're likely distracting yourself from your own product. Less and you're operating blind. The goal is to have enough context to make informed decisions — not to become a market analyst.",
  },
  {
    q: "Should you copy competitors' features?",
    a: "Sometimes — when the feature is clearly expected and you're losing deals or users over its absence. Usually not — copying puts you in second place by definition, and you often miss the context that made the feature work for the original. The better question: what is the underlying user problem they're solving, and is there a better solution I can ship?",
  },
  {
    q: "How do you build a competitive analysis that doesn't go stale?",
    a: "Make it a living doc, not a deck. A shared wiki or Notion page that's updated weekly by whoever notices changes. Structure: one page per competitor with sections for product, pricing, strategy, strengths, weaknesses, recent moves. Time-stamp every update. Anyone can contribute. Decks die in folders; wikis compound over time.",
  },
];

export default function PmCompetitiveAnalysisPage() {
  const dates = pageDates("/pm-competitive-analysis");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Competitive Analysis", url: `${SITE_URL}/pm-competitive-analysis` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Competitive Analysis for PMs (2026 Edition)",
        description:
          "The PM guide to competitive analysis. How to study competitors, what to track, when to copy vs differentiate, and the anti-patterns that make competitive research useless.",
        image: `${SITE_URL}/api/og?title=Competitive+Analysis+for+PMs+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-competitive-analysis`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔭</span> Study competitors enough. Copy them never.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Competitive Analysis for PMs<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Competitive analysis for PMs is the discipline of tracking six dimensions — product features, user
            reviews, pricing, hiring signals, strategic announcements, and behavioural data — without letting it
            become a distraction from your own users. Budget roughly two hours a week for ongoing awareness plus a
            quarterly deep-dive, and resist the urge to copy a rival&apos;s feature the moment it ships.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            What to track about your competitors, how often, what to do when they make moves,
            and the anti-patterns that make most competitive research useless.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice PM Strategy Daily — Free →
          </Link>
        </section>

        {/* What to track */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Dimensions to Track</h2>
          <div className="space-y-4">
            {WHAT_TO_TRACK.map((w, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <p className="font-bold text-white">{i + 1}. {w.dimension}</p>
                  <span className="text-xs bg-[#1f2228] border border-white/10 rounded-full px-2 py-1 text-white/60">{w.frequency}</span>
                </div>
                <p className="text-sm text-white/60 mb-2">{w.what}</p>
                <p className="text-xs text-[#89e219]">🔧 How: <span className="text-white/70">{w.how}</span></p>
              </div>
            ))}
          </div>
        </section>

        {/* When they do X */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">When a Competitor Does X, You Do Y</h2>
            <div className="space-y-5">
              {WHEN_TO_DO_WHAT.map((w, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                  <p className="text-xs text-[#89e219] uppercase tracking-wider mb-2">When they: {w.they_do}</p>
                  <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3 mb-2">
                    <p className="text-xs text-green-400 mb-1">✅ You do</p>
                    <p className="text-sm text-white/70">{w.you_do}</p>
                  </div>
                  <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3">
                    <p className="text-xs text-red-400 mb-1">❌ Avoid</p>
                    <p className="text-sm text-white/70">{w.avoid}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Anti-patterns */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Competitive Analysis Anti-Patterns</h2>
          <div className="space-y-3">
            {ANTI_PATTERNS.map((a, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4 flex gap-3">
                <span className="text-red-400 flex-shrink-0">❌</span>
                <p className="text-sm text-white/70">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-8">FAQ</h2>
          <div className="space-y-5">
            {FAQS.map(faq => (
              <div key={faq.q} className="border border-white/10 rounded-xl p-5">
                <h3 className="font-semibold text-white mb-2">{faq.q}</h3>
                <p className="text-sm text-white/60">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <RelatedPages slug="pm-competitive-analysis" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Strategic Intuition Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on competitive moves, strategy trade-offs, and market positioning.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
