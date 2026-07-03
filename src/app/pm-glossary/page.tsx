import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Glossary (2026) — 50+ Product Management Terms Explained",
  description:
    "The complete PM glossary. 50+ product management terms every PM should know — organised by category, defined clearly, with examples.",
  keywords: [
    "PM glossary", "product management terms",
    "PM terminology", "PM definitions",
    "product management vocabulary 2026",
  ],
  alternates: { canonical: "/pm-glossary" },
  openGraph: {
    title: "PM Glossary 2026 — PM Streak",
    description: "50+ PM terms explained clearly with examples — organised by category.",
    url: `${SITE_URL}/pm-glossary`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Glossary+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Glossary 2026 — PM Streak",
    description: "50+ PM terms explained clearly with examples — organised by category.",
    images: [`${SITE_URL}/api/og?title=PM+Glossary+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const CATEGORIES = [
  {
    category: "Metrics & Analytics",
    icon: "📊",
    terms: [
      { term: "DAU / MAU", def: "Daily / Monthly Active Users. Stickiness ratio (DAU:MAU) &gt;20% is healthy for consumer apps." },
      { term: "North Star Metric", def: "Single metric that captures value delivered AND is leading indicator of business health." },
      { term: "Retention Curve", def: "% of users from a cohort still active N days after signup. Healthy curves flatten; unhealthy ones trend to zero." },
      { term: "Churn Rate", def: "% of customers lost per period. Inverse of retention." },
      { term: "LTV", def: "Lifetime Value. Total expected revenue from a customer over their lifetime." },
      { term: "CAC", def: "Customer Acquisition Cost. Marketing + sales cost to acquire one paying customer." },
      { term: "Funnel Conversion", def: "% of users progressing from one funnel step to the next." },
      { term: "Cohort Analysis", def: "Grouping users by signup date and tracking their behaviour over time separately." },
    ],
  },
  {
    category: "Frameworks & Methodologies",
    icon: "🧩",
    terms: [
      { term: "RICE", def: "Prioritisation formula: Reach × Impact × Confidence ÷ Effort." },
      { term: "JTBD", def: "Jobs To Be Done. Framing user needs as &apos;jobs&apos; users hire the product for." },
      { term: "OKR", def: "Objectives and Key Results. Goal-setting framework: qualitative O + measurable KRs." },
      { term: "AARRR", def: "Pirate Metrics: Acquisition → Activation → Retention → Referral → Revenue." },
      { term: "MoSCoW", def: "Prioritisation method: Must / Should / Could / Won&apos;t have." },
      { term: "Kano Model", def: "Feature categorisation: Basic needs, Performance, Delighters." },
      { term: "Opportunity Solution Tree", def: "Teresa Torres framework: Outcome → Opportunities → Solutions → Experiments." },
    ],
  },
  {
    category: "Experimentation",
    icon: "🔬",
    terms: [
      { term: "A/B Test", def: "Randomly split users into two groups to compare a change (treatment) against the current state (control)." },
      { term: "Statistical Significance (p-value)", def: "Probability the result is due to chance. p &lt; 0.05 is standard threshold." },
      { term: "MDE", def: "Minimum Detectable Effect. The smallest effect size your test can reliably detect." },
      { term: "Guardrail Metric", def: "Metric that must NOT degrade, even if the primary metric wins." },
      { term: "Statistical Power", def: "Probability of detecting an effect if there is one. 80% is standard." },
      { term: "Novelty Effect", def: "Short-term metric lift from users trying something new; often fades after 1–2 weeks." },
    ],
  },
  {
    category: "Product Strategy",
    icon: "♟️",
    terms: [
      { term: "TAM / SAM / SOM", def: "Total / Serviceable / Obtainable market. Sizing framework from broad to realistic." },
      { term: "Moat", def: "Durable competitive advantage. Network effects, switching costs, scale economies." },
      { term: "Product-Market Fit", def: "When a product serves a real market need strongly enough to sustain growth." },
      { term: "Platform", def: "Infrastructure that enables other products or teams to build on top." },
      { term: "Network Effects", def: "Product becomes more valuable as more users join (e.g. WhatsApp)." },
      { term: "Moonshot", def: "Ambitious, 10x-improvement bet with long time horizon and high uncertainty." },
    ],
  },
  {
    category: "Execution",
    icon: "🚀",
    terms: [
      { term: "PRD", def: "Product Requirements Document. The written spec for a feature — problem, solution, success metrics." },
      { term: "Feature Flag", def: "Toggle that lets you enable/disable features in production without redeploying." },
      { term: "Staged Rollout", def: "Releasing to % of users progressively — 1% → 10% → 50% → 100%." },
      { term: "Sprint", def: "1–2 week iteration cycle in agile development." },
      { term: "Backlog", def: "Prioritised list of features and fixes waiting to be built." },
      { term: "MVP", def: "Minimum Viable Product. Smallest version that delivers core value and tests key assumptions." },
      { term: "Technical Debt", def: "Accumulated cost of shortcuts in code that slow future development." },
    ],
  },
  {
    category: "User Research",
    icon: "🔍",
    terms: [
      { term: "Persona", def: "Representation of a user segment — demographics, behaviours, needs, goals." },
      { term: "User Interview", def: "1:1 conversation to understand user behaviour, pain points, and context." },
      { term: "Usability Test", def: "Watching users complete tasks to find UX friction." },
      { term: "NPS", def: "Net Promoter Score. %promoters - %detractors on &apos;how likely to recommend?&apos; scale." },
      { term: "Jobs Map", def: "Breakdown of the full journey a user takes to complete a job — define, prepare, execute, resolve." },
    ],
  },
  {
    category: "SaaS & B2B",
    icon: "☁️",
    terms: [
      { term: "ARR / MRR", def: "Annual / Monthly Recurring Revenue. Standard SaaS revenue metrics." },
      { term: "NRR / GRR", def: "Net / Gross Revenue Retention. NRR includes upsell; GRR doesn&apos;t. Healthy: NRR &gt;110%, GRR &gt;90%." },
      { term: "PLG", def: "Product-Led Growth. Acquisition and expansion driven by the product itself, not sales." },
      { term: "Freemium", def: "Free tier + paid upgrade model. Tension: generous free = good acquisition, bad conversion." },
      { term: "Expansion Revenue", def: "New revenue from existing customers (upsell, new seats, new features)." },
      { term: "CAC Payback", def: "Months of revenue needed to recover CAC. &lt;12 months is healthy." },
    ],
  },
];

const FAQS = [
  {
    q: "How should PMs use this glossary?",
    a: "As a reference, not a memorisation list. Skim through once to spot terms you don&apos;t know. Learn those 5–10 in depth. Revisit when you encounter terms in work or interviews. The goal is fluency — being able to use terms correctly in context, not quote definitions.",
  },
  {
    q: "Do I need to know all of these for a PM interview?",
    a: "No, but you should be conversant with ~70% for a mid-level PM role. Metrics terminology (DAU, retention, funnel) is non-negotiable. Strategy terms (TAM, moat, network effects) come up at senior levels. Framework names (RICE, JTBD, OKR) come up in interviews asking how you&apos;d approach problems. Depth in a few beats breadth across all.",
  },
];

export default function PmGlossaryPage() {
  const dates = pageDates("/pm-glossary");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Glossary", url: `${SITE_URL}/pm-glossary` },
      ])} />
      <JsonLd data={articleSchema({
        headline: "PM Glossary (2026) — 50+ Product Management Terms Explained",
        description:
          "The complete PM glossary. 50+ product management terms every PM should know — organised by category, defined clearly, with examples.",
        image: `${SITE_URL}/api/og?title=PM+Glossary+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-glossary`,
      })} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📖</span> Every PM term you&apos;ll encounter, clearly defined
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Glossary<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Here, 50-plus product management terms are grouped into seven categories —
            metrics and analytics, frameworks and methodologies, experimentation, product
            strategy, execution, user research, and SaaS/B2B — each defined with a short
            example, meant to be skimmed for gaps rather than memorised outright.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            50+ product management terms across metrics, frameworks, experimentation,
            strategy, execution, research, and SaaS — clearly defined with context.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Fluency Daily — Free →
          </Link>
        </section>

        {/* Categories */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="space-y-10">
            {CATEGORIES.map((cat) => (
              <div key={cat.category}>
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-2xl">{cat.icon}</span>
                  <h2 className="text-xl font-bold text-white">{cat.category}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {cat.terms.map((t, i) => (
                    <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                      <p className="font-semibold text-[#89e219] text-sm mb-1">{t.term}</p>
                      <p className="text-xs text-white/60">{t.def}</p>
                    </div>
                  ))}
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

        <RelatedPages slug="pm-glossary" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Use These Terms in Real Scenarios</h2>
          <p className="text-white/60 mb-6">Daily PM scenarios force fluency — not just memorisation.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
