import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Churn Reduction (2026) — How PMs Diagnose and Fix Churn",
  description:
    "How PMs diagnose churn root causes and build retention systems. Cohort analysis, cancellation flows, win-back, and the churn metrics that matter.",
  keywords: [
    "PM churn reduction", "retention PM",
    "churn analysis", "win-back PM 2026",
  ],
  alternates: { canonical: "/pm-churn-reduction" },
  openGraph: {
    title: "PM Churn Reduction 2026 — PM Streak",
    description: "How PMs diagnose and fix churn — cohort analysis, cancellation, win-back.",
    url: `${SITE_URL}/pm-churn-reduction`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Churn+Reduction+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Churn Reduction 2026 — PM Streak",
    description: "How PMs diagnose and fix churn — cohort analysis, cancellation, win-back.",
    images: [`${SITE_URL}/api/og?title=PM+Churn+Reduction+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DIAGNOSIS = [
  "Cohort retention curves — where does the cliff happen?",
  "Cancellation survey — self-reported reasons, weighted by segment",
  "Usage patterns of churned users — what did they stop doing before leaving?",
  "Support ticket analysis — unresolved issues predict churn",
  "NPS detractor interviews — talk to 10 churned users per quarter",
];

const LEVERS = [
  "Onboarding improvements — reduces early churn the most",
  "Habit loops — daily/weekly rituals that create sticky behaviour",
  "Feature adoption — users on 3+ features churn 60% less than 1-feature users",
  "Proactive save — intervene before cancellation, not during",
  "Win-back campaigns — 20% of churned users can be reactivated with the right offer",
];

const TRAPS = [
  "Treating churn as one problem — early vs late churn have different causes",
  "Discounting to save — trains users to wait for discounts",
  "Over-indexing on cancellation flow — the damage is usually done upstream",
  "Ignoring passive churn — failed payments can be 20–40% of total churn",
];

const FAQS = [
  {
    q: "What&apos;s a good churn rate?",
    a: "Depends on segment. Consumer SaaS: 3–5% monthly is healthy, over 7% is concerning. B2B SMB: 1–2% monthly. Enterprise: sub-1% monthly or sub-10% annually. Consumer apps: vary wildly — focus on retention curves vs peer benchmarks rather than absolute numbers.",
  },
  {
    q: "Should PMs focus on churn or growth?",
    a: "At scale, churn. A product with 5% monthly churn caps at 20 months of customer lifetime — no growth strategy overcomes that math. Early stage, acquisition can mask churn. Past ~$10M ARR, reducing churn by 1 percentage point typically creates more value than increasing top-of-funnel by 10%.",
  },
];

export default function PmChurnReductionPage() {
  const dates = pageDates("/pm-churn-reduction");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Churn Reduction", url: `${SITE_URL}/pm-churn-reduction` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Churn Reduction (2026 Edition)",
        description: "How PMs diagnose churn root causes and build retention systems. Cohort analysis, cancellation flows, win-back, and the churn metrics that matter.",
        image: `${SITE_URL}/api/og?title=PM+Churn+Reduction+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-churn-reduction`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📉</span> The best churn fix happens before users even think about leaving
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Churn Reduction<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            PM churn reduction starts by diagnosing why users leave — cohort retention curves, cancellation surveys, and churned-user interviews — then applying levers like onboarding fixes, habit loops, and proactive saves before cancellation. Users on 3+ features churn 60% less than single-feature users, and passive churn from failed payments can be 20–40% of the total.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#58cc02] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 diagnosis methods, 5 retention levers, and 4 traps to avoid.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Retention PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Diagnosis Methods</h2>
          <div className="space-y-2">
            {DIAGNOSIS.map((d, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Retention Levers</h2>
            <div className="space-y-2">
              {LEVERS.map((l, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">4 Traps</h2>
          <div className="space-y-2">
            {TRAPS.map((t, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-red-400 flex-shrink-0">❌</span>
                <p className="text-sm text-white/70">{t}</p>
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

        <RelatedPages slug="pm-churn-reduction" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Retention PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
