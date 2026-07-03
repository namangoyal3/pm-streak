import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Grocery Tech (2026) — BigBasket, Amazon Fresh, Zepto PM Guide",
  description:
    "How PMs build grocery tech products. SKU depth, substitution, fresh delivery, and why grocery has the hardest fulfillment math in e-commerce.",
  keywords: [
    "PM grocery tech", "BigBasket PM",
    "Amazon Fresh PM", "grocery 2026",
  ],
  alternates: { canonical: "/pm-grocery-tech" },
  openGraph: {
    title: "PM Grocery Tech 2026 — PM Streak",
    description: "How PMs build grocery tech products.",
    url: `${SITE_URL}/pm-grocery-tech`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Grocery+Tech+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Grocery Tech 2026 — PM Streak",
    description: "How PMs build grocery tech products.",
    images: [`${SITE_URL}/api/og?title=PM+Grocery+Tech+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "SKU depth beats catalogue breadth — users want their brand, not an alternative",
  "Substitution UX matters — out-of-stock is frequent; replace gracefully",
  "Fresh and frozen are distinct operations — don&apos;t mix them in ops",
  "Basket size over AOV — groceries are routine; increase frequency and depth",
  "Quick commerce is eating scheduled delivery — BigBasket had to adapt",
];

const METRICS = [
  "Fill rate (% of ordered SKUs actually delivered)",
  "Substitution acceptance rate",
  "Average basket size and order frequency",
  "Freshness / quality complaint rate",
  "Repeat rate at 60 days",
];

const FAQS = [
  {
    q: "Is scheduled grocery delivery dying in favor of quick commerce?",
    a: "Not dying, but shrinking share. Large baskets and monthly stock-ups still fit scheduled; top-ups and impulse buys go to quick commerce. Hybrid models (Instamart, BigBasket Now) acknowledge this. Pure-play scheduled grocery is being squeezed from both sides.",
  },
];

export default function PmGroceryTechPage() {
  const dates = pageDates("/pm-grocery-tech");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Grocery Tech", url: `${SITE_URL}/pm-grocery-tech` },
        { name: "Home", url: SITE_URL },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Grocery Tech (India Edition)",
        description:
          "How PMs build grocery tech products. SKU depth, substitution, fresh delivery, and why grocery has the hardest fulfillment math in e-commerce.",
        image: `${SITE_URL}/api/og?title=PM+Grocery+Tech+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-grocery-tech`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🥦</span> Grocery is the hardest fulfillment math in e-commerce
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Grocery Tech<br />(India Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Grocery tech PMs solve a fulfillment problem general e-commerce doesn&apos;t face: users want their specific brand rather than an alternative, so SKU depth, fill rate, and graceful substitution when items are out of stock matter more than catalogue breadth. Fresh and frozen require separate operations, basket size and order frequency beat AOV, and quick commerce is squeezing scheduled delivery toward hybrid models like BigBasket Now.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for grocery tech PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Grocery PM Skills — Free →
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

        <RelatedPages slug="pm-grocery-tech" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Grocery PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
