import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Pricing Experiments (2026) — How to Test Pricing Without Breaking Trust",
  description:
    "How PMs run pricing experiments that generate real signal. What to test, how to segment, legal considerations, and why most pricing tests go wrong.",
  keywords: [
    "PM pricing experiments", "price test PM",
    "pricing A/B test", "SaaS pricing experiment",
    "pricing research 2026",
  ],
  alternates: { canonical: "/pm-pricing-experiments" },
  openGraph: {
    title: "PM Pricing Experiments 2026 — PM Streak",
    description: "How PMs run pricing experiments that generate real signal — without breaking trust.",
    url: `${SITE_URL}/pm-pricing-experiments`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Pricing+Experiments+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Pricing Experiments 2026 — PM Streak",
    description: "How PMs run pricing experiments that generate real signal — without breaking trust.",
    images: [`${SITE_URL}/api/og?title=PM+Pricing+Experiments+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const WHAT_TO_TEST = [
  "Price points (₹499 vs ₹699 vs ₹999)",
  "Packaging (what&apos;s included in each tier)",
  "Billing cadence (monthly vs annual vs quarterly)",
  "Free-tier limits (how much value given away)",
  "Trial length (7 vs 14 vs 30 days)",
  "Payment methods (UPI, card, wallet, cash)",
];

const TEST_APPROACHES = [
  { approach: "New-user only tests", what: "Test new pricing with new signups; existing users grandfathered. Safest approach." },
  { approach: "Geography-based rollout", what: "Test in one geography first; expand if metrics hold" },
  { approach: "Cohort-based tests", what: "Show different prices to different cohorts for a limited time" },
  { approach: "Willingness-to-pay surveys", what: "Not a real test but provides directional signal before commiting" },
  { approach: "Van Westendorp analysis", what: "4-question survey on price sensitivity — good for exploring ranges" },
];

const GOTCHAS = [
  "Legal risk in some markets — showing different prices to different users has regulatory risk",
  "Discoverability risk — users who find out they&apos;re paying more lose trust fast",
  "Small sample problem — pricing conversion is usually small %; need big samples",
  "Long test windows — users decide over days/weeks, not minutes",
  "Existing user backlash — grandfather always; don&apos;t change prices on actively paying users",
];

const METRICS = [
  "Conversion rate to paid (primary)",
  "Average Revenue Per User (ARPU)",
  "Total revenue (conversion × ARPU)",
  "Retention of paid users (some pricing attracts wrong-fit users)",
  "Support tickets about pricing (are users complaining?)",
  "LTV — long-term, not just first-purchase",
];

const FAQS = [
  {
    q: "Should PMs A/B test pricing?",
    a: "Carefully. Price discrimination can erode trust if users discover it. Safer approaches: test new pricing with new users only (grandfather existing), test geographically, or run surveys to explore ranges. Pure A/B tests on pricing in consumer products are riskier than feature tests.",
  },
  {
    q: "What&apos;s the biggest pricing experiment mistake?",
    a: "Optimising for conversion, not LTV. Lower prices increase conversion but may attract users who churn faster. PMs who only look at conversion miss that the &apos;winning&apos; variant has lower LTV. Always measure full funnel including retention, not just &apos;did they pay today?&apos;",
  },
];

export default function PmPricingExperimentsPage() {
  const dates = pageDates("/pm-pricing-experiments");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Pricing Experiments", url: `${SITE_URL}/pm-pricing-experiments` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Pricing Experiments (2026 Edition)",
        description:
          "How PMs run pricing experiments that generate real signal. What to test, how to segment, legal considerations, and why most pricing tests go wrong.",
        image: `${SITE_URL}/api/og?title=PM+Pricing+Experiments+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-pricing-experiments`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>💸</span> Pricing tests generate signal — and can break trust if done wrong
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Pricing Experiments<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Because showing different prices to different users carries real legal and trust risk, PM
            pricing experiments are safest run on new signups only — grandfathering existing customers —
            testing variables like price points, packaging, billing cadence, and trial length, then judging
            results not by conversion rate alone but by ARPU, retention, and LTV, since a cheaper price
            often wins short-term signups while quietly attracting churn-prone users.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 things to test, 5 approaches, 5 gotchas to watch for, and 6 metrics to track.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Pricing Skills Daily — Free →
          </Link>
        </section>

        {/* What to test */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Things to Test</h2>
          <div className="space-y-2">
            {WHAT_TO_TEST.map((w, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{w}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Approaches */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Testing Approaches</h2>
            <div className="space-y-3">
              {TEST_APPROACHES.map((t, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-white text-sm mb-1">{t.approach}</p>
                  <p className="text-xs text-white/60">{t.what}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gotchas */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Gotchas to Watch For</h2>
          <div className="space-y-2">
            {GOTCHAS.map((g, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-yellow-400 flex-shrink-0">⚠️</span>
                <p className="text-sm text-white/70">{g}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Metrics */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Metrics to Track</h2>
            <div className="space-y-2">
              {METRICS.map((m, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
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

        <RelatedPages slug="pm-pricing-experiments" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Pricing Skills Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on pricing design, willingness-to-pay, and packaging trade-offs.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
