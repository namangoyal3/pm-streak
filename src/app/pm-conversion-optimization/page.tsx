import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Conversion Optimization (2026) — CRO Playbook for Product Managers",
  description:
    "How PMs run conversion rate optimization. Friction audits, progressive disclosure, payment flows, and why small wins compound.",
  keywords: [
    "PM conversion optimization", "CRO PM",
    "conversion rate PM 2026",
  ],
  alternates: { canonical: "/pm-conversion-optimization" },
  openGraph: {
    title: "PM Conversion Optimization 2026 — PM Streak",
    description: "CRO playbook for product managers.",
    url: `${SITE_URL}/pm-conversion-optimization`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Conversion+Optimization+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Conversion Optimization 2026 — PM Streak",
    description: "CRO playbook for product managers.",
    images: [`${SITE_URL}/api/og?title=PM+Conversion+Optimization+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const TACTICS = [
  "Friction audit — every field, click, and decision counts",
  "Progressive disclosure — ask for less upfront",
  "Social proof placement — above the decision moment, not below",
  "Scarcity and urgency — use honestly, never manufactured",
  "Payment flow optimisation — saved cards, one-click, Apple/Google Pay",
  "Exit-intent interventions — recover with context, not desperation",
];

const PRINCIPLES = [
  "Small wins compound — 1% per sprint = 26% per year",
  "Measure downstream, not just step conversion — avoid shallow wins",
  "Segment results — mobile vs desktop, new vs returning",
  "Don&apos;t dark-pattern — short-term win, long-term churn",
];

const FAQS = [
  {
    q: "What&apos;s the highest-leverage place to focus CRO?",
    a: "The step with the biggest drop-off that&apos;s closest to revenue. Usually that&apos;s checkout/payment for e-commerce, trial-to-paid for SaaS, or activation for consumer apps. Fix the biggest leak first; smaller optimisations come later. Most teams over-invest in top-of-funnel and under-invest in the conversion step closest to money.",
  },
];

export default function PmConversionOptimizationPage() {
  const dates = pageDates("/pm-conversion-optimization");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Conversion Optimization", url: `${SITE_URL}/pm-conversion-optimization` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Conversion Optimization (2026 Edition)",
        description:
          "How PMs run conversion rate optimization. Friction audits, progressive disclosure, payment flows, and why small wins compound.",
        image: `${SITE_URL}/api/og?title=PM+Conversion+Optimization+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-conversion-optimization`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📈</span> 1% per sprint. Compounds to 26% per year.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Conversion Optimization<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            PM-led conversion optimization means running a friction audit across every field, click, and
            decision, then fixing the biggest revenue-adjacent leak first — checkout, trial-to-paid, or
            activation — using progressive disclosure, well-placed social proof, honest scarcity, and
            streamlined payment flows, while tracking downstream impact by segment so gains don&apos;t
            quietly wash out.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 tactics and 4 principles for PMs running CRO.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build CRO PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Tactics</h2>
          <div className="space-y-2">
            {TACTICS.map((t, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{t}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">4 Principles</h2>
            <div className="space-y-2">
              {PRINCIPLES.map((p, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{p}</p>
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

        <RelatedPages slug="pm-conversion-optimization" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice CRO Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
