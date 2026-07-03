import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "E-commerce Product Manager Guide (2026) — How to Excel as an E-commerce PM",
  description:
    "The complete e-commerce PM guide. Unit economics, category PM vs platform PM, the buyer-seller-ops triangle, and how to break into e-commerce PM at Flipkart, Amazon, and Meesho.",
  keywords: [
    "ecommerce product manager", "e-commerce PM india",
    "how to become ecommerce PM", "category PM flipkart",
    "marketplace PM interview", "ecommerce PM skills 2026",
  ],
  alternates: { canonical: "/ecommerce-pm-guide" },
  openGraph: {
    title: "E-commerce PM Guide 2026 — PM Streak",
    description: "Unit economics, category PM, buyer-seller dynamics — the e-commerce PM playbook.",
    url: `${SITE_URL}/ecommerce-pm-guide`,
    images: [{ url: `${SITE_URL}/api/og?title=E-commerce+PM+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "E-commerce PM Guide 2026 — PM Streak",
    description: "Unit economics, category PM, buyer-seller dynamics — the e-commerce PM playbook.",
    images: [`${SITE_URL}/api/og?title=E-commerce+PM+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const METRICS = [
  { metric: "GMV (Gross Merchandise Value)", what: "Total value of orders placed, not netted for cancellations/returns. Vanity at times — but board-level." },
  { metric: "Take Rate", what: "% of GMV that becomes platform revenue. Usually 4–15% depending on category and whether platform handles logistics." },
  { metric: "Contribution Margin", what: "Revenue per order minus all direct costs (logistics, returns, payment, marketing). More honest than GMV." },
  { metric: "Return Rate", what: "% of orders returned. Fashion: 25–40%. Electronics: 5–10%. High returns destroy margins faster than most PMs realise." },
  { metric: "Repeat Purchase Rate (RPR)", what: "% of customers who place a second order within N days. Early indicator of product-market fit." },
  { metric: "Buyer NPS / Seller NPS", what: "Two-sided health signal. Marketplaces need both sides happy — not just the side you naturally favour." },
];

const PM_TYPES = [
  {
    type: "Category PM",
    focus: "Owns a category (fashion, electronics, grocery). Grows GMV in that category by working with the business team, sellers, and marketing.",
    companies: "Flipkart, Amazon India, Meesho, Nykaa",
    bestFor: "PMs who want breadth (product + business + ops) and deep vertical expertise",
  },
  {
    type: "Buyer Experience PM",
    focus: "Owns customer-facing surfaces — home page, search, product page, checkout. Optimises conversion and repeat visits.",
    companies: "All e-commerce companies",
    bestFor: "PMs who want deep consumer product work with strong metrics rigour",
  },
  {
    type: "Seller Platform PM",
    focus: "Builds the tools sellers use to list, price, manage inventory, and fulfil orders. B2B product work inside a B2C platform.",
    companies: "Flipkart, Meesho, Amazon Seller Services",
    bestFor: "PMs who enjoy B2B workflow products and complex backend UX",
  },
  {
    type: "Logistics / Supply Chain PM",
    focus: "Builds internal tools for warehouses, delivery operations, reverse logistics. Operational and deeply technical.",
    companies: "Flipkart (Ekart), Amazon, Meesho, Zepto",
    bestFor: "Engineering-leaning PMs who want ops + tech depth",
  },
  {
    type: "Growth PM",
    focus: "New user acquisition, activation, repeat purchase. Runs experiments across the full funnel.",
    companies: "All e-commerce companies, especially high-growth ones",
    bestFor: "PMs who love experimentation and data",
  },
];

const CHALLENGES = [
  { challenge: "Return economics", detail: "A 30% return rate in fashion can wipe out category margins. PMs must understand what drives returns (size, quality, expectation mismatch) and invest accordingly." },
  { challenge: "Seller-buyer balance", detail: "Every buyer-friendly feature (easy returns, long windows) has a cost borne by sellers or platform. PMs must model both sides." },
  { challenge: "Discovery vs conversion", detail: "Home pages that maximise discovery often hurt conversion, and vice versa. Balancing is a permanent PM tension." },
  { challenge: "Tier-1 vs Bharat economics", detail: "A Bangalore user and a Tier-3 user have completely different AOVs, return rates, and device constraints. One product rarely serves both well." },
  { challenge: "Big Billion Days / sale peaks", detail: "Peaks can be 10–50x average traffic. PMs must design for peak scale, even though it&apos;s only a few days per year." },
];

const FAQS = [
  {
    q: "How is e-commerce PM different from consumer app PM?",
    a: "E-commerce PMs deal with physical goods — inventory, logistics, returns, sellers. This adds layers of operational complexity that pure digital PMs never touch. The metrics are also different: GMV, contribution margin, return rate, fill rate. If you love purely digital products, e-commerce can feel messy. If you like product + business + ops blended, it&apos;s one of the richest PM experiences in Indian tech.",
  },
  {
    q: "Do e-commerce PMs need to know logistics?",
    a: "At least at a conceptual level, yes — even if you&apos;re on buyer experience. Understanding how the platform physically fulfils orders (first mile, hub, last mile, returns) affects product decisions like delivery promise, cancellation policies, and Cash-on-Delivery economics. Deep logistics expertise is optional but broad familiarity is non-negotiable.",
  },
  {
    q: "What&apos;s the career path for e-commerce PMs in India?",
    a: "APM/PM → Senior PM (category or surface area ownership) → Group PM (multiple categories or full domain) → Director / VP Product (full business unit). Flipkart, Amazon, and Meesho all have well-defined e-commerce PM ladders. Lateral moves across companies are common — strong Flipkart PMs move to Amazon, Meesho PMs move to Flipkart, and vice versa. Direct-to-consumer / D2C PM is an emerging adjacent path.",
  },
];

export default function EcommercePmGuidePage() {
  const dates = pageDates("/ecommerce-pm-guide");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "E-commerce PM Guide", url: `${SITE_URL}/ecommerce-pm-guide` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "E-commerce Product Manager Guide (2026 Edition)",
        description:
          "The complete e-commerce PM guide. Unit economics, category PM vs platform PM, the buyer-seller-ops triangle, and how to break into e-commerce PM at Flipkart, Amazon, and Meesho.",
        image: `${SITE_URL}/api/og?title=E-commerce+PM+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/ecommerce-pm-guide`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🛒</span> Product + business + ops — the richest PM role in Indian tech
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            E-commerce PM Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            E-commerce PM work spans five role types — category, buyer experience, seller platform, logistics, and growth — measured against GMV, take rate, contribution margin, return rate, repeat purchase rate, and two-sided NPS, with the job&apos;s hardest tensions being return economics, balancing buyer and seller costs, discovery versus conversion, and designing for sale-peak traffic that can spike 10–50x average load.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The 6 e-commerce metrics every PM must know, 5 types of e-commerce PM roles,
            the hardest challenges, and the career paths at India&apos;s top e-commerce companies.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Start E-commerce PM Prep — Free →
          </Link>
        </section>

        {/* Metrics */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 E-commerce Metrics Every PM Must Know</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {METRICS.map((m, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-[#89e219] text-sm mb-1">{m.metric}</p>
                <p className="text-xs text-white/60">{m.what}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PM types */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Types of E-commerce PM Roles</h2>
            <div className="space-y-4">
              {PM_TYPES.map((p, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                  <p className="font-bold text-white mb-1">{p.type}</p>
                  <p className="text-sm text-white/60 mb-2">{p.focus}</p>
                  <p className="text-xs text-[#89e219] mb-1">📍 Companies: <span className="text-white/70">{p.companies}</span></p>
                  <p className="text-xs text-green-400">🎯 Best for: <span className="text-white/70">{p.bestFor}</span></p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Challenges */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 E-commerce PM Challenges</h2>
          <div className="space-y-3">
            {CHALLENGES.map((c, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-white text-sm mb-1">{i + 1}. {c.challenge}</p>
                <p className="text-xs text-white/60">{c.detail}</p>
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

        <RelatedPages slug="ecommerce-pm-guide" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build E-commerce PM Intuition Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on GMV, take rate, marketplace balance, and ops trade-offs.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
