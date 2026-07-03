import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM LLM Routing (2026) — Picking the Right Model for Each Request",
  description:
    "How PMs design model routing. Cost, latency, capability tiers, and why model routing is the single biggest cost lever for AI products.",
  keywords: [
    "PM LLM routing", "model selection PM 2026",
  ],
  alternates: { canonical: "/pm-llm-routing" },
  openGraph: {
    title: "PM LLM Routing 2026 — PM Streak",
    description: "Picking the right model for each request.",
    url: `${SITE_URL}/pm-llm-routing`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+LLM+Routing+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM LLM Routing 2026 — PM Streak",
    description: "Picking the right model for each request.",
    images: [`${SITE_URL}/api/og?title=PM+LLM+Routing+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const STRATEGIES = [
  "Tier by complexity — small/medium/large model per task",
  "Route by latency budget — fast models for inline, slow for async",
  "Route by safety — sensitive tasks to vetted models",
  "Use multiple vendors for resilience",
  "Cache aggressively before routing",
];

const PITFALLS = [
  "Routing based on cost alone — quality regressions show up later",
  "No A/B testing of routing decisions",
  "Routing logic that&apos;s a black box no one understands",
  "Vendor lock-in through tightly-coupled tooling",
];

const FAQS = [
  {
    q: "Is model routing worth the engineering complexity?",
    a: "For products with material AI cost, yes. Routing typically saves 30–60% on model spend without quality regression. The engineering investment pays back fast at scale. For small or experimental products, default to one good model and optimise later.",
  },
];

export default function PmLlmRoutingPage() {
  const dates = pageDates("/pm-llm-routing");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM LLM Routing", url: `${SITE_URL}/pm-llm-routing` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM LLM Routing (2026 Edition)",
        description: "How PMs design model routing. Cost, latency, capability tiers, and why model routing is the single biggest cost lever for AI products.",
        image: `${SITE_URL}/api/og?title=PM+LLM+Routing+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-llm-routing`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🚏</span> Routing saves 30–60% on AI cost when done well
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM LLM Routing<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            PM LLM routing is the practice of directing each request to the cheapest model that still meets quality and latency bars — tiering by complexity, routing by latency budget, routing sensitive tasks to vetted models, spreading load across vendors, and caching before routing. Done well, it cuts model spend 30–60% without a quality hit.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="underline hover:text-[#89e219]">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 routing strategies and 4 pitfalls.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Routing PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Strategies</h2>
          <div className="space-y-2">
            {STRATEGIES.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{s}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">4 Pitfalls</h2>
            <div className="space-y-2">
              {PITFALLS.map((p, i) => (
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

        <RelatedPages slug="pm-llm-routing" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Routing PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
