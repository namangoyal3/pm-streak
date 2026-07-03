import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Daily Practice Guide (2026) — The 15-Minute Habit That Builds Product Mastery",
  description:
    "The science of PM daily practice. What 15 minutes a day actually builds, what to practice, how to track progress, and why streaks beat cramming for interviews.",
  keywords: [
    "PM daily practice", "product manager daily habit",
    "PM skills practice routine", "how to study PM daily",
    "PM interview daily prep", "product manager habit 2026",
  ],
  alternates: { canonical: "/pm-daily-practice" },
  openGraph: {
    title: "PM Daily Practice Guide 2026 — PM Streak",
    description: "Why 15 minutes of daily practice beats cramming for PM interviews and mastery.",
    url: `${SITE_URL}/pm-daily-practice`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Daily+Practice+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Daily Practice Guide 2026 — PM Streak",
    description: "Why 15 minutes of daily practice beats cramming for PM interviews and mastery.",
    images: [`${SITE_URL}/api/og?title=PM+Daily+Practice+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const WHY_DAILY = [
  {
    point: "Pattern recognition compounds",
    detail: "One product teardown teaches you a little. 100 teardowns, spaced over months, teach you product intuition you can't get any other way. The spacing is what builds the pattern library — not the volume.",
  },
  {
    point: "Active recall beats passive reading",
    detail: "Reading Lenny's Newsletter is passive. Answering a structured PM question is active. Daily active recall is how you turn read content into deployable intuition.",
  },
  {
    point: "Fluency comes from reps, not understanding",
    detail: "You can understand RICE in 10 minutes. Using RICE fluidly under interview pressure takes 50+ applications. Daily reps are how fluency forms.",
  },
  {
    point: "Streaks create psychological commitment",
    detail: "Missing Day 47 of a streak feels worse than never starting. This psychology, used well, turns 'I should practice' into 'I always practice.'",
  },
];

const WHAT_TO_PRACTICE = [
  {
    category: "Product Sense",
    practice: "1 product teardown per week + 3 'improve a product' questions",
    timeBudget: "40% of daily practice time",
  },
  {
    category: "Metrics & Analytics",
    practice: "1 metric drop diagnosis per week + 1 A/B test design per week",
    timeBudget: "20% of daily practice time",
  },
  {
    category: "Strategy & Business",
    practice: "1 strategy question per week (market entry, trade-off, competitor response)",
    timeBudget: "15% of daily practice time",
  },
  {
    category: "Behavioural Stories",
    practice: "1 STAR story refined per week, 1 practiced out loud daily",
    timeBudget: "15% of daily practice time",
  },
  {
    category: "Technical Fluency",
    practice: "1 technical concept learned per week (API, SQL, ML, infra)",
    timeBudget: "10% of daily practice time",
  },
];

const TRACKING = [
  { what: "Questions attempted", why: "Volume matters — but not as much as quality. Track to stay honest." },
  { what: "Self-scored quality (1–5)", why: "Force yourself to grade your own answers. Weakest category surfaces where to focus next week." },
  { what: "Weak areas", why: "Note: 'struggled with segment analysis' so you can double-click next week." },
  { what: "Streak length", why: "Momentum matters. Don't break the chain — even 10 minutes on a busy day counts." },
  { what: "Mock interview scores", why: "Weekly mocks (peer or AI) give external calibration. Self-scoring drifts; mocks correct it." },
];

const FAQS = [
  {
    q: "How much time is the right amount for daily PM practice?",
    a: "15 minutes per day minimum, 45 minutes ideal. Less than 15 minutes often means you're doing shallow practice (reading without thinking). More than 45 minutes daily without a specific deadline (like an upcoming interview) starts to have diminishing returns — other life activities need space too. The goal is consistency over intensity.",
  },
  {
    q: "Does daily practice actually work better than intensive weekend prep?",
    a: "For PM interview prep, yes — by a large margin. The reason: PM interviews test pattern recognition and fluid thinking, which require spaced repetition to build. Cramming 20 hours on a weekend creates short-term familiarity that fades quickly. 30 minutes daily for 8 weeks creates pattern recognition that survives interview pressure. This is the same reason language learning apps like Duolingo work.",
  },
  {
    q: "What if I miss a day?",
    a: "Don&apos;t miss a second. Research on habit formation shows that missing one day doesn't break a habit — but missing two days significantly increases the risk of dropping the habit entirely. If you miss a day, do a 5-minute micro-practice the next day. The goal is to never go 2 days without practice during your active prep period.",
  },
];

export default function PmDailyPracticePage() {
  const dates = pageDates("/pm-daily-practice");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Daily Practice", url: `${SITE_URL}/pm-daily-practice` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Daily Practice Guide (2026 Edition)",
        description:
          "The science of PM daily practice. What 15 minutes a day actually builds, what to practice, how to track progress, and why streaks beat cramming for interviews.",
        image: `${SITE_URL}/api/og?title=PM+Daily+Practice+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-daily-practice`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔥</span> 15 minutes a day beats 5 hours on a weekend
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Daily Practice Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Fifteen minutes of daily PM practice — split across product sense, metrics, strategy, behavioural stories, and technical fluency — builds the pattern recognition a single cramming weekend can&apos;t, because active recall beats passive reading and reps (not just understanding) are what make skills stick under interview pressure; tracking attempts, self-scored quality, and streak length keeps the habit honest.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Why daily practice beats cramming for PM interviews and mastery,
            what to practice across product sense, metrics, strategy, and how to track progress.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Start Your Daily Streak — Free →
          </Link>
        </section>

        {/* Why daily */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">Why Daily Practice Works</h2>
          <div className="space-y-4">
            {WHY_DAILY.map((w, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <p className="font-bold text-white mb-2">{i + 1}. {w.point}</p>
                <p className="text-sm text-white/60">{w.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What to practice */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">What to Practice Daily</h2>
            <div className="space-y-3">
              {WHAT_TO_PRACTICE.map((w, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <p className="font-bold text-white">{w.category}</p>
                    <span className="text-xs bg-[#58cc02]/20 text-[#89e219] px-2 py-1 rounded-full">{w.timeBudget}</span>
                  </div>
                  <p className="text-xs text-white/60">{w.practice}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tracking */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Things to Track Weekly</h2>
          <div className="space-y-3">
            {TRACKING.map((t, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-white mb-1">{i + 1}. {t.what}</p>
                <p className="text-xs text-white/60">{t.why}</p>
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

        <RelatedPages slug="pm-daily-practice" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build the Daily PM Habit</h2>
          <p className="text-white/60 mb-6">PM Streak makes daily practice automatic — lessons, streaks, and AI feedback in 2 minutes a day.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
