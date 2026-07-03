import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "SaaS Product Manager Guide (2026) — How to Excel as a B2B SaaS PM",
  description:
    "The complete SaaS PM playbook. B2B SaaS metrics, roadmap dynamics, customer-led development, freemium vs enterprise trade-offs, and how to break into SaaS PM in India.",
  keywords: [
    "SaaS product manager", "B2B SaaS PM india",
    "how to become SaaS PM", "SaaS PM interview questions",
    "SaaS product manager salary india", "B2B PM career 2026",
  ],
  alternates: { canonical: "/saas-product-manager" },
  openGraph: {
    title: "SaaS Product Manager Guide 2026 — PM Streak",
    description: "B2B SaaS metrics, roadmap, interview questions, and career paths for SaaS PMs in India.",
    url: `${SITE_URL}/saas-product-manager`,
    images: [{ url: `${SITE_URL}/api/og?title=SaaS+Product+Manager+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaS Product Manager Guide 2026 — PM Streak",
    description: "B2B SaaS metrics, roadmap, interview questions, and career paths for SaaS PMs in India.",
    images: [`${SITE_URL}/api/og?title=SaaS+Product+Manager+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const SAAS_METRICS = [
  { metric: "MRR / ARR", def: "Monthly/Annual Recurring Revenue. The core revenue metric — predictable and stackable." },
  { metric: "Net Revenue Retention (NRR)", def: "Revenue from existing customers including upsell - churn. NRR > 100% means you grow from existing base alone." },
  { metric: "Gross Revenue Retention (GRR)", def: "Revenue retained before upsells. Measures pure churn. Healthy SaaS: 90%+." },
  { metric: "Churn Rate", def: "% of customers (logo churn) or revenue (revenue churn) lost per period. Enterprise: <5%/year. SMB: 2–5%/month is common." },
  { metric: "CAC Payback Period", def: "Months of revenue needed to recover customer acquisition cost. <12 months is healthy." },
  { metric: "Time to Value (TTV)", def: "Days from signup to customer's first 'aha' moment. Short TTV = better activation, lower churn." },
  { metric: "Product Qualified Lead (PQL)", def: "User who's shown product usage signal they're ready to buy. SaaS PMs define PQL criteria with sales." },
  { metric: "Expansion MRR", def: "New revenue from existing accounts (upsells, added seats, new features). Often 30–50% of total new MRR at healthy SaaS companies." },
];

const SAAS_CHALLENGES = [
  { challenge: "Buyer vs User split", detail: "The person who pays (admin, IT, finance) often isn't the person who uses it daily. You must build for both — and they often want different things." },
  { challenge: "Enterprise customer override risk", detail: "A single customer representing 20% of ARR can legitimately demand roadmap changes. You need frameworks to evaluate when to accommodate vs decline." },
  { challenge: "Freemium vs paid tension", detail: "Too generous a free tier kills upsell. Too stingy kills top-of-funnel. Calibrating the line is a continuous PM problem." },
  { challenge: "Multi-persona product", detail: "A single SaaS product often serves 3+ personas (admin, end-user, API developer). Each needs different UX, docs, and onboarding." },
  { challenge: "Slow feedback loops", detail: "Enterprise sales cycles are 3–9 months. You can't A/B test your way to product-market fit as easily as consumer products." },
  { challenge: "Backward compatibility constraint", detail: "Breaking changes in a SaaS product affect every customer simultaneously. PMs must plan migrations carefully." },
];

const TOP_COMPANIES = [
  { company: "Freshworks", products: "Freshdesk, Freshsales, Freshservice", segments: "SMB to mid-market CX and IT" },
  { company: "Zoho", products: "CRM, Mail, Creator, Books, Projects (45+ products)", segments: "SMB across functions" },
  { company: "Chargebee", products: "Subscription billing, revenue management", segments: "B2B subscription companies" },
  { company: "LeadSquared", products: "CRM, marketing automation", segments: "Education, BFSI, healthcare" },
  { company: "Postman", products: "API platform", segments: "Developers, enterprise API teams" },
  { company: "BrowserStack", products: "Web and mobile testing", segments: "QA teams, developers" },
  { company: "HighRadius", products: "AR/AP automation", segments: "Enterprise finance" },
  { company: "Zluri / Hasura / Bizongo", products: "Various B2B SaaS", segments: "High-growth mid-stage SaaS startups" },
];

const FAQS = [
  {
    q: "Is SaaS PM a good career in India?",
    a: "Very — Indian SaaS is one of the fastest-growing tech segments with a global customer base. Companies like Freshworks, Zoho, Chargebee, Postman, and BrowserStack compete globally from India. SaaS PMs typically earn 10–20% above consumer PMs at similar levels due to direct revenue impact per PM and the concentrated B2B expertise premium.",
  },
  {
    q: "What's the biggest difference between consumer PM and SaaS PM?",
    a: "Speed of feedback and stakeholder complexity. Consumer PMs can ship, measure, and iterate in days. SaaS PMs often deal with 3–9 month sales cycles, enterprise customer pushback, and a clear buyer-vs-user split. SaaS PMs develop deeper domain expertise in their customer's industry (finance, HR, marketing) than consumer PMs typically develop in any single vertical.",
  },
  {
    q: "Can I transition from consumer PM to SaaS PM?",
    a: "Yes — but the learning curve is real. The big shifts: (1) metric fluency shifts from DAU/retention to ARR/NRR/churn, (2) prioritisation incorporates enterprise customer requests, not just user research, (3) you work closely with sales and customer success — not just engineering and design. Most consumer-to-SaaS transitions take 3–6 months to feel fluent. Start by joining a PLG SaaS company — the mindset bridge is smaller than pure enterprise SaaS.",
  },
];

export default function SaasProductManagerPage() {
  const dates = pageDates("/saas-product-manager");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "SaaS Product Manager", url: `${SITE_URL}/saas-product-manager` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "SaaS Product Manager Guide (2026 Edition)",
        description:
          "The complete SaaS PM playbook. B2B SaaS metrics, roadmap dynamics, customer-led development, freemium vs enterprise trade-offs, and how to break into SaaS PM in India.",
        image: `${SITE_URL}/api/og?title=SaaS+Product+Manager+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/saas-product-manager`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>☁️</span> Indian SaaS — global scale, domain depth, high-leverage PM work
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            SaaS Product Manager Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            SaaS product managers live inside eight recurring metrics — MRR/ARR, net and gross
            revenue retention, churn, CAC payback, time to value, PQLs, and expansion MRR — while
            navigating six structural challenges unique to B2B: a buyer-versus-user split,
            enterprise customers who can override the roadmap, freemium-versus-paid tension, and
            sales cycles that stretch 3–9 months versus the days-long iteration loops of consumer
            PMs.
          </p>
          <p className="text-sm text-white/50 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            B2B SaaS metrics, the unique challenges SaaS PMs face, top companies hiring in India,
            and how to break into SaaS PM from a consumer or adjacent background.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Start SaaS PM Prep — Free →
          </Link>
        </section>

        {/* SaaS metrics */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">8 SaaS Metrics Every PM Must Know</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {SAAS_METRICS.map((m, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-[#89e219] text-sm mb-1">{m.metric}</p>
                <p className="text-xs text-white/60">{m.def}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Challenges */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Unique Challenges SaaS PMs Face</h2>
            <div className="space-y-3">
              {SAAS_CHALLENGES.map((c, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-white text-sm mb-1">{i + 1}. {c.challenge}</p>
                  <p className="text-xs text-white/60">{c.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Top companies */}
        <section className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">Top SaaS Companies Hiring PMs in India</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {TOP_COMPANIES.map((c, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-bold text-white mb-1">{c.company}</p>
                <p className="text-xs text-[#89e219] mb-1">{c.products}</p>
                <p className="text-xs text-white/50">{c.segments}</p>
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

        <RelatedPages slug="saas-product-manager" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build SaaS PM Intuition Daily</h2>
          <p className="text-white/60 mb-6">B2B scenarios on metrics, customer requests, and enterprise trade-offs.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
