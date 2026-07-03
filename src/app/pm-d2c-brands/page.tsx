import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM D2C Brands (2026) — Mamaearth, boAt, Sugar PM Guide",
  description:
    "How PMs build for D2C brands in India. Shopify economics, performance marketing, repeat rate, and what makes D2C PM unique.",
  keywords: [
    "PM D2C", "direct-to-consumer PM",
    "Mamaearth PM", "boAt PM", "D2C india 2026",
  ],
  alternates: { canonical: "/pm-d2c-brands" },
  openGraph: {
    title: "PM D2C Brands 2026 — PM Streak",
    description: "How PMs build for Indian D2C brands.",
    url: `${SITE_URL}/pm-d2c-brands`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+D2C+Brands+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM D2C Brands 2026 — PM Streak",
    description: "How PMs build for Indian D2C brands.",
    images: [`${SITE_URL}/api/og?title=PM+D2C+Brands+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Performance marketing CAC is the binding constraint — product exists to beat it",
  "Repeat rate is everything — D2C math breaks without it",
  "Content + commerce — brands win by owning the story, not just the SKU",
  "Quick commerce eating share — listings on Zepto/Blinkit are mandatory for FMCG D2C",
  "Offline eventually — pure-online D2C caps out; brands graduate to general trade",
];

const METRICS = [
  "CAC / LTV ratio",
  "Repeat purchase rate at 3, 6, 12 months",
  "Contribution margin per order",
  "RTO / NDR rate — India D2C lives or dies on this",
  "Attribution across Meta, Google, SEO, and organic",
];

const FAQS = [
  {
    q: "Is D2C PM different from e-commerce PM?",
    a: "Yes. E-commerce PMs work on marketplaces where the brand is not theirs. D2C PMs work on a single-brand stack where product, marketing, and retention are tightly coupled. Decisions about pricing, packaging, and acquisition all flow through product. Smaller scale, but broader scope per PM.",
  },
];

export default function PmD2cBrandsPage() {
  const dates = pageDates("/pm-d2c-brands");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM D2C Brands", url: `${SITE_URL}/pm-d2c-brands` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM D2C Brands (India Edition)",
        description: "How PMs build for D2C brands in India. Shopify economics, performance marketing, repeat rate, and what makes D2C PM unique.",
        image: `${SITE_URL}/api/og?title=PM+D2C+Brands+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-d2c-brands`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🛍️</span> D2C PMs own the entire brand stack
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM D2C Brands<br />(India Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            A D2C product manager in India owns the full brand stack — pricing, packaging, retention, and acquisition all run through product, unlike marketplace PMs who share ownership with other sellers. Success is tracked through CAC/LTV ratio, repeat purchase rate, contribution margin per order, and RTO/NDR, since performance marketing CAC is the binding constraint on growth.
          </p>
          <p className="text-xs text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for D2C PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build D2C PM Skills — Free →
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

        <RelatedPages slug="pm-d2c-brands" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice D2C PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
