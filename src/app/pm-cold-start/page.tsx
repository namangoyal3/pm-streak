import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Cold Start Problem (2026) — How PMs Launch Products With Zero Users",
  description:
    "How PMs solve the cold start problem. Network effects without network, content without creators, marketplace without supply — and the proven strategies that work.",
  keywords: [
    "PM cold start", "cold start problem",
    "launch with no users", "network effects early",
    "marketplace cold start 2026",
  ],
  alternates: { canonical: "/pm-cold-start" },
  openGraph: {
    title: "PM Cold Start Problem 2026 — PM Streak",
    description: "How PMs solve cold start — network effects without network, content without creators.",
    url: `${SITE_URL}/pm-cold-start`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Cold+Start+Problem+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Cold Start Problem 2026 — PM Streak",
    description: "How PMs solve cold start — network effects without network, content without creators.",
    images: [`${SITE_URL}/api/og?title=PM+Cold+Start+Problem+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const STRATEGIES = [
  { strategy: "Niche it down", what: "Dominate a narrow segment first, expand later", example: "Facebook started at Harvard only" },
  { strategy: "Hand-seed supply", what: "Manually create initial content or supply", example: "Reddit founders created fake accounts to seed posts" },
  { strategy: "Piggyback on existing networks", what: "Import from existing platforms", example: "LinkedIn imported email contacts; Instagram let users post to Facebook" },
  { strategy: "Single-player value", what: "Make the product useful solo, network effects kick in later", example: "Notion was useful for individuals before teams" },
  { strategy: "Pick one side first", what: "In marketplaces, attract one side deeply before the other", example: "Airbnb started with hosts, grew guests once supply existed" },
  { strategy: "Content/community flywheels", what: "Seed content manually until users generate it organically", example: "Quora founders answered questions until community took over" },
];

const WHEN_EACH_WORKS = [
  "Niche it down: when your target users cluster around a shared identity or location",
  "Hand-seed: when you can create quality supply faster than users can",
  "Piggyback: when existing platforms have natural overlap with your users",
  "Single-player value: when the product has utility without other users",
  "Pick one side: when one side has lower acquisition cost or more motivated users",
  "Content flywheels: when content/UGC compounds and Google/social discovery works",
];

const SIGNALS_ITS_WORKING = [
  "Organic growth starts — users inviting each other without prompt",
  "Content density reaches critical mass — enough supply that users find value every session",
  "Retention of new users improves — they&apos;re finding value sooner",
  "Word-of-mouth referrals increase — users actively recommending",
  "Geography / segment expansion becomes possible — core loop works, ready to widen",
];

const MISTAKES = [
  "Launching too broad — trying to serve everyone serves no one",
  "Relying purely on paid acquisition — expensive; doesn&apos;t solve cold start",
  "Hiding the &apos;fake it&apos; stage — early users understand manual seeding if honest",
  "Giving up too early — cold start can take 12–18 months; persistence matters",
  "Expanding before the first segment retains — premature scaling kills fragile loops",
];

const FAQS = [
  {
    q: "How long does it take to solve cold start?",
    a: "For marketplaces and network-effect products, 12–24 months is typical. For single-player-value products, shorter — you can get individual users quickly and let network effects build. PMs underestimate this consistently. &apos;We&apos;ll have a network in 3 months&apos; rarely happens.",
  },
  {
    q: "Is hand-seeding content or supply dishonest?",
    a: "Not if done well. Reddit founders seeding posts, Airbnb hosts getting professional photos — these are legitimate moves to create value. The line: don&apos;t deceive users about what&apos;s real user activity vs what&apos;s seeded. Transparency about early stage builds trust, not damage.",
  },
];

export default function PmColdStartPage() {
  const dates = pageDates("/pm-cold-start");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Cold Start Problem", url: `${SITE_URL}/pm-cold-start` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Cold Start Problem (2026 Edition)",
        description:
          "How PMs solve the cold start problem. Network effects without network, content without creators, marketplace without supply — and the proven strategies that work.",
        image: `${SITE_URL}/api/og?title=PM+Cold+Start+Problem+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-cold-start`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>❄️</span> Cold start is the hardest problem in product — solvable with the right strategy
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Cold Start Problem<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Solving the cold start problem means picking the right play — niche down like Facebook did at Harvard, hand-seed supply like Reddit&apos;s founders, piggyback on existing networks like LinkedIn&apos;s contact imports, build single-player value like Notion, or win one marketplace side first like Airbnb did with hosts — a process that typically takes twelve to twenty-four months, with premature scaling before the first segment retains the most common mistake.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 cold start strategies with examples, when each works, 5 signals it&apos;s working, and 5 mistakes to avoid.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Strategy Skills Daily — Free →
          </Link>
        </section>

        {/* Strategies */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Cold Start Strategies</h2>
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

        {/* When each works */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">When Each Strategy Works Best</h2>
            <div className="space-y-2">
              {WHEN_EACH_WORKS.map((w, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{w}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Signals */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Signals Cold Start Is Working</h2>
          <div className="space-y-2">
            {SIGNALS_ITS_WORKING.map((s, i) => (
              <div key={i} className="bg-[#111] border border-green-500/20 rounded-xl p-3 flex gap-3">
                <span className="text-green-400 flex-shrink-0">✓</span>
                <p className="text-sm text-white/70">{s}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mistakes */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Cold Start Mistakes</h2>
            <div className="space-y-2">
              {MISTAKES.map((m, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-red-400 flex-shrink-0">❌</span>
                  <p className="text-sm text-white/70">{m}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 py-16">
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

        <RelatedPages slug="pm-cold-start" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Strategy Skills Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on launches, network effects, and 0-to-1 product strategy.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
