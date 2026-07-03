import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Marketplace Products (2026) — Two-Sided Marketplaces and the Balancing Act",
  description:
    "How PMs build marketplace products. Supply vs demand, cold start, take rate design, and the tensions unique to two-sided markets.",
  keywords: [
    "PM marketplace", "two-sided marketplace PM",
    "supply demand marketplace", "take rate",
    "marketplace product manager 2026",
  ],
  alternates: { canonical: "/pm-marketplace-products" },
  openGraph: {
    title: "PM Marketplace Products 2026 — PM Streak",
    description: "How PMs build marketplace products — supply vs demand, cold start, take rate.",
    url: `${SITE_URL}/pm-marketplace-products`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Marketplace+Products+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Marketplace Products 2026 — PM Streak",
    description: "How PMs build marketplace products — supply vs demand, cold start, take rate.",
    images: [`${SITE_URL}/api/og?title=PM+Marketplace+Products+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const MARKETPLACE_DYNAMICS = [
  "Chicken-and-egg — supply and demand both needed; hard to start with zero",
  "Cross-side network effects — more supply = better demand experience, and vice versa",
  "Quality matters more than quantity — bad supply poisons demand experience",
  "Take rate decides platform economics — too low = unprofitable; too high = both sides leave",
  "Liquidity determines success — both sides must be able to find each other fast",
];

const KEY_METRICS = [
  "GMV (Gross Merchandise Value) — total transaction volume",
  "Take rate — platform&apos;s cut of transactions (typically 10–30%)",
  "Fill rate / match rate — % of demand met by supply",
  "Liquidity — how quickly both sides find each other",
  "Supply quality — NPS, reviews, complaints per supplier",
  "Demand quality — repeat rate, basket size, time on platform",
];

const SCALING_PATTERNS = [
  "Start in one city / one vertical — own it before expanding",
  "Grow supply first, then demand — easier (usually)",
  "Use pricing dynamically — surge, incentives to balance supply and demand",
  "Invest in matching algorithms — technology solves what human coordinators can&apos;t",
  "Protect trust — fraud, quality, reliability all kill marketplaces fast",
];

const COMMON_TRAPS = [
  "Subsidising both sides indefinitely — unsustainable economics",
  "Expanding geo too early — breaking liquidity in original market",
  "Racing to bottom on take rate — short-term market share, long-term unprofitability",
  "Ignoring supply quality — cheap/fast supply that ruins demand experience",
  "Letting disintermediation happen — users transact off-platform",
];

const EXAMPLES = [
  "Uber — ride-hailing, surge pricing balances supply/demand in real time",
  "Airbnb — accommodation, hosts vetted, reviews build trust",
  "Meesho — seller-reseller-buyer 3-sided marketplace",
  "Urban Company — services marketplace with inspected supply",
  "Swiggy / Zomato — food delivery with restaurant + rider supply",
];

const FAQS = [
  {
    q: "Is marketplace PM harder than regular consumer PM?",
    a: "Often yes. Two-sided markets have unique dynamics — every decision affects both sides, and the math gets complex. But the upside is also bigger — marketplaces with strong network effects are among the most durable tech businesses. Worth the complexity if the space is right.",
  },
  {
    q: "What&apos;s the biggest marketplace PM mistake?",
    a: "Optimising one side without considering the other. A demand-side feature that reduces supply earnings drives suppliers off the platform. A supplier-side feature that worsens demand experience reduces demand. Great marketplace PMs model both sides explicitly, every time.",
  },
];

export default function PmMarketplaceProductsPage() {
  const dates = pageDates("/pm-marketplace-products");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Marketplace Products", url: `${SITE_URL}/pm-marketplace-products` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Marketplace Products (2026 Edition)",
        description:
          "How PMs build marketplace products. Supply vs demand, cold start, take rate design, and the tensions unique to two-sided markets.",
        image: `${SITE_URL}/api/og?title=PM+Marketplace+Products+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-marketplace-products`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔄</span> Every marketplace decision affects both sides
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Marketplace Products<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-3">
            Marketplace PM work means balancing two sides of a market at once: supply and demand each need the other to exist, cross-side network effects mean more supply improves the demand experience, and take rate must sit in a narrow band — too low starves the platform, too high drives both sides away. Uber, Airbnb, and Meesho each manage this balance through dynamic pricing and matching algorithms.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 unique marketplace dynamics, 6 key metrics, 5 scaling patterns, 5 common traps, and 5 examples.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Marketplace PM Skills Daily — Free →
          </Link>
        </section>

        {/* Dynamics */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Unique Marketplace Dynamics</h2>
          <div className="space-y-2">
            {MARKETPLACE_DYNAMICS.map((d, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Metrics */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Key Marketplace Metrics</h2>
            <div className="space-y-2">
              {KEY_METRICS.map((m, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{m}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Scaling */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Scaling Patterns</h2>
          <div className="space-y-2">
            {SCALING_PATTERNS.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{s}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Traps */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Common Traps</h2>
            <div className="space-y-2">
              {COMMON_TRAPS.map((t, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-red-400 flex-shrink-0">❌</span>
                  <p className="text-sm text-white/70">{t}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Examples */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Marketplace Examples</h2>
          <div className="space-y-2">
            {EXAMPLES.map((e, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{e}</p>
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

        <RelatedPages slug="pm-marketplace-products" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Marketplace PM Skills Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on two-sided marketplaces, supply-demand balance, take rate.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
