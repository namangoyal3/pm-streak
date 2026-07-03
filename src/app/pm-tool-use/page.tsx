import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM AI Tool Use (2026) — Designing Agents That Use APIs Reliably",
  description:
    "How PMs design tool-using agents. Tool selection, error handling, and why tool-use reliability is the bottleneck for agentic products.",
  keywords: [
    "PM AI tool use", "agent tool use 2026",
  ],
  alternates: { canonical: "/pm-tool-use" },
  openGraph: {
    title: "PM AI Tool Use 2026 — PM Streak",
    description: "Designing agents that use APIs reliably.",
    url: `${SITE_URL}/pm-tool-use`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+AI+Tool+Use+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM AI Tool Use 2026 — PM Streak",
    description: "Designing agents that use APIs reliably.",
    images: [`${SITE_URL}/api/og?title=PM+AI+Tool+Use+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PRINCIPLES = [
  "Tool descriptions are the prompt — invest in clarity",
  "Few well-chosen tools beat dozens",
  "Validate inputs before tool execution",
  "Handle tool failures gracefully — most tools fail occasionally",
  "Log every tool call for debugging and eval",
];

const TRAPS = [
  "Too many tools — model confusion increases linearly",
  "Vague tool descriptions — model picks wrong tool",
  "No retry / fallback when tool fails",
  "Ignoring cost and latency of tool calls",
];

const FAQS = [
  {
    q: "Why is tool-use reliability the bottleneck for agents?",
    a: "Because compounded error rates kill agent loops. If each tool call has a 95% success rate and an agent makes 10 calls, end-to-end success is ~60%. The math gets brutal fast. Agents that work in production minimise tool calls, validate inputs, and retry intelligently — not just &apos;hope the model does the right thing.&apos;",
  },
];

export default function PmToolUsePage() {
  const dates = pageDates("/pm-tool-use");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM AI Tool Use", url: `${SITE_URL}/pm-tool-use` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM AI Tool Use (2026 Edition)",
        description: "How PMs design tool-using agents. Tool selection, error handling, and why tool-use reliability is the bottleneck for agentic products.",
        image: `${SITE_URL}/api/og?title=PM+AI+Tool+Use+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-tool-use`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔧</span> Tool-use reliability compounds. So do failures.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM AI Tool Use<br />(2026 Edition)
          </h1>
          <p className="text-base text-white/70 max-w-2xl mx-auto mb-4">
            Tool-use reliability is the real bottleneck for AI agents because errors compound across calls: a tool with 95 percent success used ten times in a row drops end-to-end reliability to roughly 60 percent. PMs manage this by choosing a few well-described tools instead of dozens, validating inputs before execution, retrying failures intelligently, and logging every call for debugging.
          </p>
          <p className="text-xs text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 principles and 4 traps for PMs designing tool-using agents.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Tool-Use PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Principles</h2>
          <div className="space-y-2">
            {PRINCIPLES.map((p, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{p}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">4 Traps</h2>
            <div className="space-y-2">
              {TRAPS.map((t, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-red-400 flex-shrink-0">❌</span>
                  <p className="text-sm text-white/70">{t}</p>
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

        <RelatedPages slug="pm-tool-use" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Tool-Use PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
