import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "SaaS Metrics for PMs (2026) — MRR, NRR, CAC, LTV Explained",
  description:
    "The SaaS metrics every PM should know. MRR, NRR, GRR, CAC, LTV, payback — definitions, benchmarks, and how to use them in PM decisions.",
  keywords: [
    "SaaS metrics PM", "MRR NRR CAC LTV",
    "SaaS PM metrics 2026", "B2B SaaS metrics",
    "NRR benchmark SaaS",
  ],
  alternates: { canonical: "/pm-saas-metrics" },
  openGraph: {
    title: "SaaS Metrics for PMs 2026 — PM Streak",
    description: "SaaS metrics every PM should know — definitions, benchmarks, and decisions they drive.",
    url: `${SITE_URL}/pm-saas-metrics`,
    images: [{ url: `${SITE_URL}/api/og?title=SaaS+Metrics+for+PMs+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaS Metrics for PMs 2026 — PM Streak",
    description: "SaaS metrics every PM should know — definitions, benchmarks, and decisions they drive.",
    images: [`${SITE_URL}/api/og?title=SaaS+Metrics+for+PMs+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const METRICS = [
  {
    metric: "MRR / ARR",
    def: "Monthly / Annual Recurring Revenue — the core revenue metric for subscription businesses.",
    benchmark: "Growth rate varies by stage. Seed-stage SaaS targets 15–20% monthly; growth-stage targets 100–200% YoY ARR.",
    pmDecisions: "Which features drive new MRR? Which drive expansion? Which prevent churn?",
  },
  {
    metric: "NRR (Net Revenue Retention)",
    def: "Revenue from existing customers after churn + contraction + expansion. &gt;100% means you grow from existing base alone.",
    benchmark: "Best SaaS: 130%+. Healthy: 110–130%. Concerning: &lt;100%. Below 90% = leaky bucket.",
    pmDecisions: "Invest in expansion features (more seats, higher tier) vs core retention?",
  },
  {
    metric: "GRR (Gross Revenue Retention)",
    def: "Revenue retained before expansion — pure measure of churn. Tells you if customers are leaving.",
    benchmark: "Enterprise: 95%+. Mid-market: 90%+. SMB: 80%+. Below that = serious retention problem.",
    pmDecisions: "Prioritise churn reduction, onboarding improvements, product stickiness.",
  },
  {
    metric: "CAC (Customer Acquisition Cost)",
    def: "Total cost (marketing + sales) to acquire one new paying customer.",
    benchmark: "Should be payback-ready within 12 months of ARR. Longer = unsustainable unit economics.",
    pmDecisions: "Which features reduce CAC via product-led growth? Which channels are efficient?",
  },
  {
    metric: "LTV (Customer Lifetime Value)",
    def: "Total revenue expected from a customer over their lifetime, accounting for churn.",
    benchmark: "LTV:CAC ratio of 3:1 is healthy. 1:1 is burning money. 5:1+ = under-investing in growth.",
    pmDecisions: "Which user segments have highest LTV? Design product experience to drive them deeper.",
  },
  {
    metric: "CAC Payback Period",
    def: "Months of ARR needed to recoup CAC. Cash flow proxy.",
    benchmark: "&lt;12 months = healthy. 12–18 = acceptable at scale. &gt;18 = dangerous at startup stage.",
    pmDecisions: "Does this feature accelerate onboarding-to-paid? Does it make CAC payback faster?",
  },
  {
    metric: "Logo Retention vs Revenue Retention",
    def: "% of customers retained (logo) vs % of revenue retained. Can diverge.",
    benchmark: "Logo retention often lower than revenue retention (small customers churn more; big ones stay).",
    pmDecisions: "If logos are churning but revenue isn&apos;t, are you serving only large customers? Is that intentional?",
  },
  {
    metric: "PQL (Product Qualified Lead)",
    def: "A user who&apos;s shown product usage signal they&apos;re ready to buy. PLG signal.",
    benchmark: "PQL conversion to paid: 25–40% (much higher than MQL conversion of 5–10%).",
    pmDecisions: "Which in-product behaviours predict conversion? Build towards those signals.",
  },
];

const FAQS = [
  {
    q: "Which SaaS metric matters most?",
    a: "NRR. It captures the health of your existing base and is the single strongest predictor of long-term SaaS success. SaaS companies with NRR &gt;120% compound revenue even without new acquisition. Below 100% NRR means you&apos;re losing revenue from existing customers faster than expanding it — a structural problem no growth can outrun.",
  },
  {
    q: "Do PMs need to own SaaS metrics directly?",
    a: "Share ownership. Revenue-level metrics (MRR, NRR, CAC) are typically owned by growth/marketing or finance. Product-level metrics (feature adoption, PQLs, activation) are owned by PMs. Great PMs connect their product metrics to revenue metrics — showing how their work moves NRR, reduces CAC payback, or grows LTV.",
  },
];

export default function PmSaasMetricsPage() {
  const dates = pageDates("/pm-saas-metrics");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "SaaS Metrics for PMs", url: `${SITE_URL}/pm-saas-metrics` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "SaaS Metrics for PMs (2026 Edition)",
        description: "The SaaS metrics every PM should know. MRR, NRR, GRR, CAC, LTV, payback — definitions, benchmarks, and how to use them in PM decisions.",
        image: `${SITE_URL}/api/og?title=SaaS+Metrics+for+PMs+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-saas-metrics`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📊</span> SaaS PMs who know the revenue math make better product decisions
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            SaaS Metrics for PMs<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-2">
            PMs tracking SaaS health need eight core metrics — MRR/ARR, NRR, GRR, CAC, LTV, CAC payback period,
            logo vs revenue retention, and PQL — each paired with a benchmark and the product decision it should
            inform. NRR matters most: above 120% it compounds revenue from the existing base alone, while dropping
            below 100% signals a structural retention problem no amount of new acquisition can outrun.
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-2">
            8 SaaS metrics every PM should know — definitions, benchmarks,
            and how each one should shape your PM decisions.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build SaaS PM Intuition Daily — Free →
          </Link>
        </section>

        {/* Metrics */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="space-y-5">
            {METRICS.map((m, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-5">
                <p className="font-bold text-white mb-1">{i + 1}. {m.metric}</p>
                <p className="text-sm text-white/70 mb-3">{m.def}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3">
                    <p className="text-xs text-green-400 mb-1">📊 Benchmark</p>
                    <p className="text-xs text-white/70">{m.benchmark}</p>
                  </div>
                  <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-lg p-3">
                    <p className="text-xs text-[#89e219] mb-1">💡 PM decisions</p>
                    <p className="text-xs text-white/70">{m.pmDecisions}</p>
                  </div>
                </div>
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

        <RelatedPages slug="pm-saas-metrics" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build SaaS PM Fluency Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on MRR impact, churn diagnosis, and expansion revenue.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
