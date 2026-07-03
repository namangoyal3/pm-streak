import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Quick Commerce (2026) — Zepto, Blinkit, Instamart PM Guide",
  description:
    "How PMs build 10-minute delivery products. Dark stores, SKU curation, delivery ops, and the unit economics of quick commerce in India.",
  keywords: [
    "PM quick commerce", "Zepto PM",
    "Blinkit PM", "Instamart PM", "10 minute delivery 2026",
  ],
  alternates: { canonical: "/pm-quick-commerce" },
  openGraph: {
    title: "PM Quick Commerce 2026 — PM Streak",
    description: "How PMs build 10-minute delivery — dark stores, SKUs, ops.",
    url: `${SITE_URL}/pm-quick-commerce`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Quick+Commerce+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Quick Commerce 2026 — PM Streak",
    description: "How PMs build 10-minute delivery — dark stores, SKUs, ops.",
    images: [`${SITE_URL}/api/og?title=PM+Quick+Commerce+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Dark-store density drives everything — radius of coverage, not total footprint",
  "SKU curation &gt; SKU count — 2,500 SKUs chosen well beats 10,000 chosen lazily",
  "Delivery time is a promise, not an average — p95 matters more than median",
  "Rider economics are brutal — every minute saved in pick/pack compounds",
  "Category mix decides margin — fresh and FMCG pull very different unit economics",
];

const METRICS = [
  "Delivery time (median and p95)",
  "Order value vs delivery cost — contribution margin per order",
  "Dark-store utilisation — orders per hour per store",
  "Pick-to-pack time — the operational bottleneck",
  "Repeat rate — quick commerce lives or dies on habit formation",
];

const QUESTIONS = [
  "How would you decide which SKUs to add to a new dark store?",
  "Design a feature that reduces delivery-time variance in monsoon",
  "A customer complaints spike at 8pm — diagnose",
  "How would you increase order value without slowing delivery?",
];

const FAQS = [
  {
    q: "Is quick commerce a real business or VC-subsidised?",
    a: "Mixed. Zepto and Blinkit have shown contribution-positive store cohorts in Tier-1 cities, but net profitability at company level is still elusive. The category is real — Indian urban users have rewired shopping habits around 10-minute delivery — but which specific players win on unit economics is still being written.",
  },
  {
    q: "Is quick commerce a good PM domain?",
    a: "For PMs who love operations-meets-consumer products, yes. You&apos;ll work closely with supply chain, inventory, and delivery teams in a way most PM roles never do. Deep expertise in this space transfers well to logistics, e-commerce, and any marketplace with fulfillment complexity.",
  },
];

export default function PmQuickCommercePage() {
  const dates = pageDates("/pm-quick-commerce");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Quick Commerce", url: `${SITE_URL}/pm-quick-commerce` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Quick Commerce (Zepto, Blinkit, Instamart)",
        description:
          "How PMs build 10-minute delivery products. Dark stores, SKU curation, delivery ops, and the unit economics of quick commerce in India.",
        image: `${SITE_URL}/api/og?title=PM+Quick+Commerce+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-quick-commerce`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>⚡</span> 10-minute delivery rewired Indian urban consumption
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Quick Commerce<br />(Zepto, Blinkit, Instamart)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Quick commerce PM work is an operations-heavy discipline where dark-store density, curated SKU selection (2,500 chosen well beats 10,000 chosen lazily), and p95 delivery time — not the median — decide whether a store makes money. Zepto and Blinkit have shown contribution-positive cohorts in Tier-1 cities, though company-level profitability is still unresolved, which is why PMs here track pick-to-pack time, dark-store utilisation, and repeat rate as closely as delivery speed itself.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics, 5 metrics, and 4 interview-style questions for quick commerce PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Quick Commerce PM Skills — Free →
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
          <h2 className="text-2xl font-bold text-center mb-10">4 Interview Questions</h2>
          <div className="space-y-2">
            {QUESTIONS.map((q, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-white/30 flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{q}</p>
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

        <RelatedPages slug="pm-quick-commerce" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Quick Commerce PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
