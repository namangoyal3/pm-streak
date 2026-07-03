import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Language Learning Apps (2026) — Duolingo, Babbel, Busuu PM Lessons",
  description:
    "How PMs build language learning apps. Streaks, gamification, AI tutors, and why Duolingo&apos;s approach is the most studied product design in consumer AI.",
  keywords: [
    "PM language learning", "Duolingo PM",
    "Babbel PM 2026",
  ],
  alternates: { canonical: "/pm-language-learning" },
  openGraph: {
    title: "PM Language Learning Apps 2026 — PM Streak",
    description: "How PMs build language learning apps.",
    url: `${SITE_URL}/pm-language-learning`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Language+Learning+Apps+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Language Learning Apps 2026 — PM Streak",
    description: "How PMs build language learning apps.",
    images: [`${SITE_URL}/api/og?title=PM+Language+Learning+Apps+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Streaks are the product — loss aversion beats reward",
  "Spaced repetition built into learning loops",
  "AI tutoring (Duolingo Max, Max with Video Call) is the new layer",
  "Gamification only works if underlying learning is real",
  "Enterprise and school segments expand TAM beyond consumer",
];

const METRICS = [
  "DAU/MAU ratio — 20%+ is healthy",
  "Streak length distribution",
  "Lessons completed per active day",
  "Subscription conversion after 14-day engagement",
  "Measured outcome (CEFR proficiency rise)",
];

const FAQS = [
  {
    q: "Why is Duolingo so aggressively gamified?",
    a: "Because learning a language is boring work spread over years. Gamification bridges the gap between intent and daily behaviour. The streak, XP, leaderboards, push notifications — all tools to rewire behaviour through small daily rewards. Learning apps without gamification struggle to retain past week 2.",
  },
];

export default function PmLanguageLearningPage() {
  const dates = pageDates("/pm-language-learning");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Language Learning", url: `${SITE_URL}/pm-language-learning` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Language Learning Apps (2026 Edition)",
        description:
          "How PMs build language learning apps. Streaks, gamification, AI tutors, and why Duolingo&apos;s approach is the most studied product design in consumer AI.",
        image: `${SITE_URL}/api/og?title=PM+Language+Learning+Apps+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-language-learning`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🦉</span> Streaks &gt; rewards. Loss aversion is the dominant mechanic.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Language Learning Apps<br />(2026 Edition)
          </h1>
          <p className="text-base text-white/80 max-w-2xl mx-auto mb-3">
            Language learning is boring work spread over years, so PMs lean on loss-aversion mechanics — streaks, XP, leaderboards, push notifications — to rewire daily behavior, since apps without gamification struggle to retain users past week two. Spaced repetition and AI tutoring layers like Duolingo Max sit underneath, while DAU/MAU above 20% and 14-day subscription conversion are the metrics that separate real products from novelty apps.
          </p>
          <p className="text-xs text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for language learning PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Language Learning PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Dynamics</h2>
          <div className="space-y-2">
            {DYNAMICS.map((d, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Metrics</h2>
            <div className="space-y-2">
              {METRICS.map((m, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
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

        <RelatedPages slug="pm-language-learning" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Language Learning PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
