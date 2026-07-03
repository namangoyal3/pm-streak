import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Marketplace Dynamics (2026) — How PMs Grow Two-Sided Platforms",
  description:
    "How PMs build marketplaces. Cold start, liquidity, take rate, disintermediation, and the economics of two-sided platforms.",
  keywords: [
    "PM marketplace", "two-sided platform PM",
    "marketplace dynamics 2026",
  ],
  alternates: { canonical: "/pm-marketplace-dynamics" },
  openGraph: {
    title: "PM Marketplace Dynamics 2026 — PM Streak",
    description: "How PMs grow two-sided platforms.",
    url: `${SITE_URL}/pm-marketplace-dynamics`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Marketplace+Dynamics+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Marketplace Dynamics 2026 — PM Streak",
    description: "How PMs grow two-sided platforms.",
    images: [`${SITE_URL}/api/og?title=PM+Marketplace+Dynamics+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Cold start: solve supply first in most marketplaces",
  "Liquidity matters more than GMV — match rate predicts health",
  "Take rate has a ceiling — push too high and supply disintermediates",
  "Both sides have LTV — optimise for the constrained side",
  "Geographic or category liquidity — don&apos;t compute marketplace health globally",
];

const METRICS = [
  "Match rate — % of demand that finds supply",
  "Time-to-first-match for new supply",
  "Repeat usage by both sides",
  "Take rate and net take rate after incentives",
  "Disintermediation rate — supply and demand going off-platform",
];

const FAQS = [
  {
    q: "Should marketplaces subsidise supply or demand first?",
    a: "Usually supply. Demand finds a quality supply catalog; supply won&apos;t stay without demand, but without supply there&apos;s no product at all. Classic examples: Airbnb, Uber, DoorDash all solved supply before demand. Exceptions exist for demand-saturated markets where supply already exists outside.",
  },
];

export default function PmMarketplaceDynamicsPage() {
  const dates = pageDates("/pm-marketplace-dynamics");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Marketplace Dynamics", url: `${SITE_URL}/pm-marketplace-dynamics` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Marketplace Dynamics (2026 Edition)",
        description: "How PMs build marketplaces. Cold start, liquidity, take rate, disintermediation, and the economics of two-sided platforms.",
        image: `${SITE_URL}/api/og?title=PM+Marketplace+Dynamics+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-marketplace-dynamics`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>⚖️</span> Marketplaces are won by balancing both sides, not growing one
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Marketplace Dynamics<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-3">
            Marketplace PMs typically solve cold start by seeding supply before demand, protect liquidity because match rate predicts health better than GMV, and cap take rate before supply disintermediates. Success is tracked through match rate, time-to-first-match, repeat usage, and disintermediation rate — not headline transaction volume.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for marketplace PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Marketplace PM Skills — Free →
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

        <RelatedPages slug="pm-marketplace-dynamics" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Marketplace PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
