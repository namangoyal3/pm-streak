import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Fashion Tech (2026) — Myntra, Ajio, Nykaa Fashion PM Guide",
  description:
    "How PMs build fashion tech products. Size and fit, returns, visual search, and why fashion is the hardest category in e-commerce.",
  keywords: [
    "PM fashion tech", "Myntra PM",
    "Ajio PM", "fashion ecommerce 2026",
  ],
  alternates: { canonical: "/pm-fashion-tech" },
  openGraph: {
    title: "PM Fashion Tech 2026 — PM Streak",
    description: "How PMs build fashion tech products.",
    url: `${SITE_URL}/pm-fashion-tech`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Fashion+Tech+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Fashion Tech 2026 — PM Streak",
    description: "How PMs build fashion tech products.",
    images: [`${SITE_URL}/api/og?title=PM+Fashion+Tech+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Size and fit is the biggest return driver — try-before-buy is the holy grail",
  "Visual search beats keyword — users upload pictures, not queries",
  "Returns kill margin — RTO on fashion runs 30–40%",
  "Seasonality drives inventory risk — get it wrong, margins evaporate",
  "Influencer-led discovery compresses the funnel",
];

const METRICS = [
  "Return rate by category and price band",
  "Fit-related return rate",
  "Visual search adoption",
  "Repeat rate at 90 days",
  "Wishlist-to-purchase conversion",
];

const FAQS = [
  {
    q: "Why are fashion return rates so high?",
    a: "Because buyers can&apos;t try online. COD users treat orders as try-at-home; 30–40% of fashion orders return in India. AI-powered fit recommendations have shaved a few points, but the gap between physical and digital trying is structural. Category-winning products absorb returns as a cost of doing business.",
  },
];

export default function PmFashionTechPage() {
  const dates = pageDates("/pm-fashion-tech");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Fashion Tech", url: `${SITE_URL}/pm-fashion-tech` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Fashion Tech (India Edition)",
        description: "How PMs build fashion tech products. Size and fit, returns, visual search, and why fashion is the hardest category in e-commerce.",
        image: `${SITE_URL}/api/og?title=PM+Fashion+Tech+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-fashion-tech`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>👗</span> Fashion is the hardest category in e-commerce
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Fashion Tech<br />(India Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-2">
            Fashion e-commerce runs 30–40% return rates in India because COD shoppers treat delivery as a fitting room — buyers can&apos;t try before they buy, so size-and-fit mismatches, not product quality, drive most returns. PMs fight this with visual search, AI-powered fit recommendations, and inventory strategies tuned to seasonality, but the physical-to-digital trying gap stays structural rather than solvable.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for fashion tech PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Fashion PM Skills — Free →
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

        <RelatedPages slug="pm-fashion-tech" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Fashion PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
