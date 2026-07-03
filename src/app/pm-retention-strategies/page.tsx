import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Retention Strategies (2026) — 7 Proven Tactics to Keep Users Coming Back",
  description:
    "Seven proven retention strategies PMs use to keep users coming back. Habit loops, streaks, content, community, and more — with examples and when each works.",
  keywords: [
    "PM retention strategies", "retention tactics",
    "user retention design", "PM retention playbook",
    "retention product design 2026",
  ],
  alternates: { canonical: "/pm-retention-strategies" },
  openGraph: {
    title: "PM Retention Strategies 2026 — PM Streak",
    description: "7 proven retention strategies with examples — habit loops, streaks, content, community, and more.",
    url: `${SITE_URL}/pm-retention-strategies`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Retention+Strategies+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Retention Strategies 2026 — PM Streak",
    description: "7 proven retention strategies with examples — habit loops, streaks, content, community, and more.",
    images: [`${SITE_URL}/api/og?title=PM+Retention+Strategies+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const STRATEGIES = [
  { strategy: "Habit loops", what: "Trigger → action → reward → investment — design for regular return", example: "Duolingo streaks, Instagram scrolling" },
  { strategy: "Content / data compound", what: "Users&apos; own content makes leaving costly", example: "Notion docs, Google Docs, photo apps" },
  { strategy: "Network effects", what: "Product becomes more valuable as friends/team join", example: "WhatsApp, Slack, LinkedIn" },
  { strategy: "Streaks and gamification", what: "Visible progress mechanics reinforce return visits", example: "Duolingo, Fitbit, Snapchat" },
  { strategy: "Personalisation", what: "Algorithm learns your preferences; other products can&apos;t replicate", example: "Spotify Discover Weekly, YouTube recommendations" },
  { strategy: "Community", what: "Relationships with other users keep people coming back", example: "Reddit, Discord, niche forums" },
  { strategy: "Utility", what: "Product solves a recurring real problem; users return by necessity", example: "Calendars, email, payment apps" },
];

const CHOOSING = [
  "Match strategy to user intent — streaks work for learning, utility works for tools",
  "Multiple strategies compound — most great products use 2–3",
  "Don&apos;t fake it — forced streaks on a utility product feel gimmicky",
  "Build around your existing strengths — don&apos;t try to bolt on community if there&apos;s no reason for it",
  "Measure: is your retention strategy actually working, or is it theatre?",
];

const ANTI_PATTERNS = [
  "Dark patterns — streaks that guilt-trip users damage long-term trust",
  "Fake gamification — badges and points without meaningful value feel empty",
  "Over-notifying — every retention tactic becomes a trap when overused",
  "Adding friction to cancel — short-term retention, long-term reputation damage",
  "Community without real purpose — forcing connection where none is wanted",
];

const FAQS = [
  {
    q: "Which retention strategy is best?",
    a: "The one that matches your product&apos;s natural shape. Duolingo&apos;s streaks work because they learning products reward daily practice. Slack&apos;s network effects work because work communication benefits from more team members. Wrong strategy for your product = forced-feeling UX. Right strategy = retention that feels earned, not extracted.",
  },
  {
    q: "Can PMs retrofit a retention strategy onto a product without one?",
    a: "Yes, but it takes time. Start with 1 strategy that fits best, run deliberate A/B tests, measure real retention impact (D30+, not just next-day). Don&apos;t add 5 retention mechanics at once — pick one, measure, iterate. Most retention transformations take 6–12 months of focused work.",
  },
];

export default function PmRetentionStrategiesPage() {
  const dates = pageDates("/pm-retention-strategies");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Retention Strategies", url: `${SITE_URL}/pm-retention-strategies` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "7 PM Retention Strategies (2026 Edition)",
        description:
          "Seven proven retention strategies PMs use to keep users coming back. Habit loops, streaks, content, community, and more — with examples and when each works.",
        image: `${SITE_URL}/api/og?title=PM+Retention+Strategies+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-retention-strategies`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔁</span> Retention strategies are tools — pick the one that fits your product
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            7 PM Retention Strategies<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            PMs keep users coming back through seven main strategies — habit loops like Duolingo&apos;s streaks, content that compounds like Notion docs, network effects like WhatsApp, gamification, personalisation, community, and plain utility — and the right pick depends on matching the tactic to how the product is used, since most durable products combine two or three, while anti-patterns like guilt-driven streaks or fake gamification erode trust instead of building it.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            7 proven retention strategies with examples, 5 tips to pick the right one, and 5 anti-patterns that backfire.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Retention Skills Daily — Free →
          </Link>
        </section>

        {/* Strategies */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="space-y-4">
            {STRATEGIES.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <p className="font-bold text-white mb-1">{i + 1}. {s.strategy}</p>
                <p className="text-sm text-white/70 mb-2">{s.what}</p>
                <p className="text-xs text-[#89e219]">💡 Example: <span className="text-white/70">{s.example}</span></p>
              </div>
            ))}
          </div>
        </section>

        {/* Choosing */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Tips to Pick the Right One</h2>
            <div className="space-y-2">
              {CHOOSING.map((c, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{c}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Anti-patterns */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Anti-Patterns</h2>
          <div className="space-y-2">
            {ANTI_PATTERNS.map((a, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
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

        <RelatedPages slug="pm-retention-strategies" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Retention Skills Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on retention design, habit loops, and sustainable engagement.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
