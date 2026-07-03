import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Pricing Page Design (2026) — Designing Pages That Convert",
  description:
    "How PMs design pricing pages. Tier order, anchoring, CTAs, FAQs, and the patterns proven across thousands of A/B tests.",
  keywords: [
    "PM pricing page design", "pricing page conversion 2026",
  ],
  alternates: { canonical: "/pm-pricing-page-design" },
  openGraph: {
    title: "PM Pricing Page Design 2026 — PM Streak",
    description: "Designing pricing pages that convert.",
    url: `${SITE_URL}/pm-pricing-page-design`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Pricing+Page+Design+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Pricing Page Design 2026 — PM Streak",
    description: "Designing pricing pages that convert.",
    images: [`${SITE_URL}/api/og?title=PM+Pricing+Page+Design+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PATTERNS = [
  "3 tiers — Good/Better/Best is the default for a reason",
  "Most popular badge anchors choice",
  "Annual toggle saves 20% — show savings explicitly",
  "FAQ section addresses procurement / objection questions",
  "Social proof close to the CTA, not just the hero",
];

const ANTI_PATTERNS = [
  "&apos;Contact us&apos; for all tiers — kills self-serve conversion",
  "Hidden enterprise tier — buyers feel tricked",
  "More than 5 tiers — analysis paralysis",
  "Pricing buried under marketing copy",
];

const FAQS = [
  {
    q: "Should the &apos;most popular&apos; tier always be the middle one?",
    a: "Usually yes — the middle tier becomes the anchor. But sometimes you want to anchor to the high tier to drive expansion. The decision depends on whether your strategic priority is volume conversion (anchor middle) or revenue per customer (anchor high).",
  },
];

export default function PmPricingPageDesignPage() {
  const dates = pageDates("/pm-pricing-page-design");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Pricing Page Design", url: `${SITE_URL}/pm-pricing-page-design` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Pricing Page Design (2026 Edition)",
        description: "How PMs design pricing pages. Tier order, anchoring, CTAs, FAQs, and the patterns proven across thousands of A/B tests.",
        image: `${SITE_URL}/api/og?title=PM+Pricing+Page+Design+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-pricing-page-design`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>💳</span> 3 tiers, anchored middle, annual toggle visible
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Pricing Page Design<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Pricing pages that convert follow five recurring patterns: three tiers structured Good/Better/Best, a most-popular badge anchoring the middle choice, an annual toggle that shows the 20% savings explicitly, an FAQ addressing procurement objections, and social proof placed near the CTA — while avoiding anti-patterns like contact-us-only tiers, a hidden enterprise tier, more than five tiers, and pricing buried under marketing copy.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 patterns and 4 anti-patterns for pricing pages.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Pricing Page PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Patterns</h2>
          <div className="space-y-2">
            {PATTERNS.map((p, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{p}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">4 Anti-Patterns</h2>
            <div className="space-y-2">
              {ANTI_PATTERNS.map((a, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-red-400 flex-shrink-0">❌</span>
                  <p className="text-sm text-white/70">{a}</p>
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

        <RelatedPages slug="pm-pricing-page-design" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Pricing Page Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
