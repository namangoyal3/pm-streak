import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM LLM Cost Management (2026) — Keeping AI Products Profitable",
  description:
    "How PMs manage LLM costs. Caching, model selection, prompt compression, and unit economics that don&apos;t collapse at scale.",
  keywords: [
    "PM LLM cost", "AI cost management 2026",
  ],
  alternates: { canonical: "/pm-llm-cost-management" },
  openGraph: {
    title: "PM LLM Cost Management 2026 — PM Streak",
    description: "Keeping AI products profitable.",
    url: `${SITE_URL}/pm-llm-cost-management`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+LLM+Cost+Management+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM LLM Cost Management 2026 — PM Streak",
    description: "Keeping AI products profitable.",
    images: [`${SITE_URL}/api/og?title=PM+LLM+Cost+Management+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const LEVERS = [
  "Cache aggressively — repeated queries shouldn&apos;t hit the model",
  "Route by complexity — small model for simple, big model for hard",
  "Compress prompts — fewer tokens = lower cost",
  "Batch when latency allows",
  "Negotiate enterprise pricing once volume is real",
];

const PRICING_TRAPS = [
  "Flat-rate pricing on usage-heavy users",
  "No fair-use cap on power users",
  "Forgetting fine-tuning increases per-request cost",
  "Over-using top-tier models for simple tasks",
];

const FAQS = [
  {
    q: "What&apos;s a healthy gross margin for AI products in 2026?",
    a: "Targeting 60–70%+ for SaaS-shaped AI products. Below 50% becomes hard to defend at scale. Cost engineering (caching, routing, prompt compression) typically adds 10–30 points of margin without quality regression. PMs who don&apos;t engage with cost end up with venture-funded but unprofitable products.",
  },
];

export default function PmLlmCostManagementPage() {
  const dates = pageDates("/pm-llm-cost-management");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM LLM Cost Management", url: `${SITE_URL}/pm-llm-cost-management` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM LLM Cost Management (2026 Edition)",
        description: "How PMs manage LLM costs. Caching, model selection, prompt compression, and unit economics that don&apos;t collapse at scale.",
        image: `${SITE_URL}/api/og?title=PM+LLM+Cost+Management+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-llm-cost-management`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>💸</span> Cost engineering is product engineering for AI
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM LLM Cost Management<br />(2026 Edition)
          </h1>
          <p className="text-base text-white/70 max-w-2xl mx-auto mb-4">
            Keeping an AI product profitable takes five deliberate cost levers: caching repeated queries, routing simple requests to smaller models, compressing prompts, batching when latency allows, and negotiating enterprise pricing once volume is real. Healthy AI products target 60–70%+ gross margin, and cost engineering alone can add 10–30 points without hurting quality.
          </p>
          <p className="text-xs text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 cost levers and 4 pricing traps for AI product PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build AI Cost PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Cost Levers</h2>
          <div className="space-y-2">
            {LEVERS.map((l, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{l}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">4 Pricing Traps</h2>
            <div className="space-y-2">
              {PRICING_TRAPS.map((p, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-red-400 flex-shrink-0">❌</span>
                  <p className="text-sm text-white/70">{p}</p>
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

        <RelatedPages slug="pm-llm-cost-management" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice AI Cost PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
