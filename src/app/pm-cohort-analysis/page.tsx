import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Cohort Analysis Guide (2026) — Find Real Product Signal",
  description:
    "How PMs use cohort analysis to find real product signal. When to use cohorts, what to segment by, and how to spot the patterns aggregate metrics hide.",
  keywords: [
    "PM cohort analysis", "cohort retention PM",
    "user cohort product", "cohort segmentation PM",
    "cohort metrics 2026",
  ],
  alternates: { canonical: "/pm-cohort-analysis" },
  openGraph: {
    title: "PM Cohort Analysis 2026 — PM Streak",
    description: "How PMs find real product signal with cohort analysis — hidden in aggregate metrics.",
    url: `${SITE_URL}/pm-cohort-analysis`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Cohort+Analysis+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Cohort Analysis 2026 — PM Streak",
    description: "How PMs find real product signal with cohort analysis — hidden in aggregate metrics.",
    images: [`${SITE_URL}/api/og?title=PM+Cohort+Analysis+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const WHY_COHORTS = [
  "Aggregate metrics hide change — new users pull retention down; old users pull it up",
  "Cohorts show whether product changes actually improve user experience over time",
  "Cohorts separate onboarding effects from deep retention",
  "Cohorts reveal which user segments to invest in (and which to stop acquiring)",
  "Cohort trends often precede aggregate trends by weeks — early warning system",
];

const DIMENSIONS_TO_SEGMENT = [
  "Signup date — standard retention cohorts",
  "Acquisition channel — organic vs paid vs referral",
  "Geography — metro vs Tier-2 vs rural",
  "Device / platform — iOS vs Android vs web",
  "Persona / use case — power users vs occasional users",
  "Onboarding path — completed full onboarding vs skipped",
];

const PATTERNS_TO_SPOT = [
  "Recent cohorts retaining worse than old cohorts — warning: product may be degrading",
  "Recent cohorts retaining better — confirmation a product change worked",
  "Retention curves flatten — healthy habit formation",
  "Retention curves decay to zero — no sustainable value; product-market fit issue",
  "Paid cohorts retain much worse than organic — CAC:LTV is unsustainable",
  "Geographic cohorts diverge — product is working in some markets and not others",
];

const COMMON_MISTAKES = [
  "Comparing cohorts of different sizes without normalising — raw counts mislead",
  "Reading too much into small cohorts — &lt;500 users per cohort is noisy",
  "Ignoring seasonality — Diwali signups behave differently than summer signups",
  "Not using multiple segmentations — one lens misses context",
  "Treating cohort trends as eternal — product changes break the pattern",
  "Not investigating WHY cohorts differ — observing without diagnosing",
];

const FAQS = [
  {
    q: "When should PMs run cohort analysis vs aggregate analysis?",
    a: "Cohorts for product changes, aggregates for dashboards. If you&apos;re asking &apos;did our recent feature help?&apos; — cohort analysis is usually the right tool. If you&apos;re reporting &apos;overall DAU&apos; — aggregate works. PMs who always use aggregates miss product-change impact; PMs who always use cohorts over-analyse for simple dashboards.",
  },
  {
    q: "What&apos;s the biggest mistake PMs make with cohort analysis?",
    a: "Drawing conclusions from cohorts too small to be meaningful. 300 users per cohort is noisy; 3,000+ is usually reliable. PMs who celebrate a &apos;cohort win&apos; in a small sample often see it reverse next month. Build intuition for your product&apos;s baseline variance before reading cohort signal.",
  },
];

export default function PmCohortAnalysisPage() {
  const dates = pageDates("/pm-cohort-analysis");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Cohort Analysis", url: `${SITE_URL}/pm-cohort-analysis` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Cohort Analysis Guide (2026 Edition)",
        description:
          "How PMs use cohort analysis to find real product signal. When to use cohorts, what to segment by, and how to spot the patterns aggregate metrics hide.",
        image: `${SITE_URL}/api/og?title=PM+Cohort+Analysis+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-cohort-analysis`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📊</span> Cohort analysis shows what aggregates hide
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Cohort Analysis Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Because aggregate metrics blend new and old users into one misleading number, PMs turn to cohort analysis — grouping users by signup date, acquisition channel, geography, device, persona, or onboarding path — to see whether retention curves are flattening (healthy) or decaying to zero (no product-market fit). The two biggest failure modes are reading signal into cohorts under 500 users and never asking why cohorts diverge.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 reasons cohorts beat aggregates, 6 segmentation dimensions, 6 patterns to spot,
            and 6 common mistakes.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Analytics Skills Daily — Free →
          </Link>
        </section>

        {/* Why */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Reasons Cohorts Beat Aggregates</h2>
          <div className="space-y-2">
            {WHY_COHORTS.map((w, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{w}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dimensions */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Dimensions to Segment By</h2>
            <div className="space-y-2">
              {DIMENSIONS_TO_SEGMENT.map((d, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Patterns */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Patterns to Spot</h2>
          <div className="space-y-2">
            {PATTERNS_TO_SPOT.map((p, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-yellow-400 flex-shrink-0">🔍</span>
                <p className="text-sm text-white/70">{p}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mistakes */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Common Mistakes</h2>
            <div className="space-y-2">
              {COMMON_MISTAKES.map((m, i) => (
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

        <RelatedPages slug="pm-cohort-analysis" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Analytics Skills Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on cohort analysis, segmentation, and reading real product signal.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
