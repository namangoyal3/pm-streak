import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM KPI Guide (2026) — Choosing KPIs That Drive Decisions",
  description:
    "How PMs pick KPIs that actually drive decisions. Leading vs lagging indicators, outcome vs output, and how to avoid the Goodhart&apos;s Law trap.",
  keywords: [
    "PM KPI", "product manager KPIs",
    "how to choose KPI PM", "leading vs lagging KPI",
    "product KPI framework 2026",
  ],
  alternates: { canonical: "/pm-kpi-guide" },
  openGraph: {
    title: "PM KPI Guide 2026 — PM Streak",
    description: "How PMs choose KPIs that drive decisions — leading, lagging, outcome, and guardrail metrics.",
    url: `${SITE_URL}/pm-kpi-guide`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+KPI+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM KPI Guide 2026 — PM Streak",
    description: "How PMs choose KPIs that drive decisions — leading, lagging, outcome, and guardrail metrics.",
    images: [`${SITE_URL}/api/og?title=PM+KPI+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const TYPES = [
  {
    type: "Outcome KPI",
    what: "What you actually care about — user value or business impact delivered.",
    example: "Users completing 3 lessons in first week (activation outcome).",
  },
  {
    type: "Output KPI",
    what: "Things you shipped. Easier to measure but weaker signal of value.",
    example: "Lessons launched this quarter, features shipped.",
  },
  {
    type: "Leading Indicator",
    what: "Predicts future outcomes. Moves before the lagging indicator.",
    example: "Day-1 retention predicts Day-30 retention 3 weeks out.",
  },
  {
    type: "Lagging Indicator",
    what: "Measures past outcomes. Authoritative but slow to react.",
    example: "Annual Revenue, D90 retention — real truth, delayed.",
  },
  {
    type: "Guardrail KPI",
    what: "Must NOT degrade, even if primary KPI wins.",
    example: "Churn rate, crash rate, support ticket volume — when optimising conversion.",
  },
  {
    type: "Vanity KPI",
    what: "Looks impressive but doesn&apos;t drive decisions. Avoid as primary metrics.",
    example: "Page views, total signups, followers — often gamed or decoupled from value.",
  },
];

const CHOOSING_CHECKLIST = [
  "Does this metric move when users get real value? (If not, it&apos;s a vanity metric.)",
  "Can it be gamed without creating value? (If yes, add guardrails.)",
  "Is it measurable with the instrumentation we have? (If not, it&apos;s aspirational, not real.)",
  "Does the team agree on the definition? (Ambiguous definitions create false alignment.)",
  "Does it respond quickly enough to drive decisions? (Metrics that only update quarterly are poor KPIs.)",
  "Is there a clear path from PM decisions to this metric? (If actions don&apos;t affect it, it&apos;s not yours.)",
];

const COMMON_MISTAKES = [
  "Picking output KPIs because they&apos;re easy (&apos;features shipped&apos;) instead of outcomes (&apos;metric moved&apos;)",
  "Only tracking the primary KPI — guardrails catch regressions that primary misses",
  "Changing KPIs every quarter — if it wasn&apos;t a real strategy, it&apos;s a rotating target",
  "Defining KPIs loosely (&apos;engagement&apos;) — ambiguity kills alignment",
  "Falling into Goodhart&apos;s Law — team games the metric without creating value",
  "No segmentation — aggregate KPIs hide cohort-level problems",
];

const FAQS = [
  {
    q: "What&apos;s the difference between KPI and north star metric?",
    a: "The north star is your most important KPI — the one that captures your core value delivery. Other KPIs (input metrics, guardrails, operational metrics) support it. All north stars are KPIs, but not all KPIs are north stars. Most product teams have 1 north star + 5–10 supporting KPIs.",
  },
  {
    q: "How many KPIs should a PM track?",
    a: "5–10 for a focused product area. More than 15 and you&apos;re not tracking — you&apos;re reporting. The PM who tracks 30 metrics weekly is often less effective than the one who tracks 7 religiously. Depth in few beats breadth across many.",
  },
  {
    q: "What&apos;s the biggest KPI mistake?",
    a: "Optimising for what&apos;s measurable rather than what matters. Page views are easy to measure; genuine value delivered is hard. PMs who default to measurable but shallow metrics end up optimising for activity rather than outcomes. Always start from: &apos;what does value look like to the user?&apos; and work backwards to metrics — not the other way around.",
  },
];

export default function PmKpiGuidePage() {
  const dates = pageDates("/pm-kpi-guide");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM KPI Guide", url: `${SITE_URL}/pm-kpi-guide` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM KPI Guide (2026 Edition)",
        description: "How PMs pick KPIs that actually drive decisions. Leading vs lagging indicators, outcome vs output, and how to avoid the Goodhart&apos;s Law trap.",
        image: `${SITE_URL}/api/og?title=PM+KPI+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-kpi-guide`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📈</span> Wrong KPIs produce well-measured failure
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM KPI Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Choosing a PM KPI means telling outcome metrics apart from output, leading, lagging,
            guardrail, and vanity metrics, then running each candidate through a six-point
            checklist — does it move with real value, can it be gamed, is it actually instrumented,
            and does the team agree on its definition — before settling on the 5 to 10 KPIs a
            focused product area actually needs.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 KPI types every PM should know, a 6-point checklist for choosing KPIs,
            and the 6 common KPI mistakes that lead to well-measured failure.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Metric Judgment Daily — Free →
          </Link>
        </section>

        {/* KPI types */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Types of KPI</h2>
          <div className="space-y-4">
            {TYPES.map((t, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <p className="font-bold text-white mb-1">{i + 1}. {t.type}</p>
                <p className="text-sm text-white/70 mb-2">{t.what}</p>
                <p className="text-xs text-[#89e219]">💡 Example: <span className="text-white/70">{t.example}</span></p>
              </div>
            ))}
          </div>
        </section>

        {/* Checklist */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6-Point Checklist for Choosing a KPI</h2>
            <div className="space-y-2">
              {CHOOSING_CHECKLIST.map((c, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">☐</span>
                  <p className="text-sm text-white/70">{c}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mistakes */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Common KPI Mistakes</h2>
          <div className="space-y-2">
            {COMMON_MISTAKES.map((m, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-red-400 flex-shrink-0">❌</span>
                <p className="text-sm text-white/70">{m}</p>
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

        <RelatedPages slug="pm-kpi-guide" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Metric Intuition in 2 Minutes a Day</h2>
          <p className="text-white/60 mb-6">Daily scenarios on KPI choice, diagnosis, and guardrail design.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
