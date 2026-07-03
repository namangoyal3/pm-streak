import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM AI Coding Tools (2026) — Cursor, Copilot, Cline PM Lessons",
  description:
    "How PMs build AI coding products. Context, latency, trust, eval loops, and the category that redefined developer experience.",
  keywords: [
    "PM AI coding", "Cursor PM",
    "Copilot PM", "AI IDE 2026",
  ],
  alternates: { canonical: "/pm-ai-coding-tools" },
  openGraph: {
    title: "PM AI Coding Tools 2026 — PM Streak",
    description: "How PMs build AI coding products.",
    url: `${SITE_URL}/pm-ai-coding-tools`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+AI+Coding+Tools+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM AI Coding Tools 2026 — PM Streak",
    description: "How PMs build AI coding products.",
    images: [`${SITE_URL}/api/og?title=PM+AI+Coding+Tools+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Context management is the product — wrong context = wrong suggestion",
  "Latency budget is tight — over 500ms for inline, users disable",
  "Acceptance signals must be tracked — accepted lines, edits after, reverts",
  "Model choice is a PM decision — capabilities, cost, reliability",
  "Trust decays fast — one bad autonomous edit sets adoption back months",
];

const METRICS = [
  "Suggestion acceptance rate",
  "Post-acceptance retention (kept unchanged after 5 minutes)",
  "Tool call reliability on agentic flows",
  "Cost per developer per month",
  "Net Promoter Score among daily users",
];

const FAQS = [
  {
    q: "Will AI coding tools commoditise?",
    a: "Partly, on raw autocomplete. Differentiation shifts to agentic workflows, codebase understanding, and IDE integration depth. Cursor and Cline succeeded by going beyond autocomplete into agent-in-your-editor territory. Commodity players on raw completion will lose margin; ecosystem players will hold it.",
  },
];

export default function PmAiCodingToolsPage() {
  const dates = pageDates("/pm-ai-coding-tools");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM AI Coding Tools", url: `${SITE_URL}/pm-ai-coding-tools` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM AI Coding Tools (2026 Edition)",
        description:
          "How PMs build AI coding products. Context, latency, trust, eval loops, and the category that redefined developer experience.",
        image: `${SITE_URL}/api/og?title=PM+AI+Coding+Tools+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-ai-coding-tools`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>💻</span> Context is the product. Latency decides adoption.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM AI Coding Tools<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Building an AI coding tool means treating context management as the actual product, since wrong context produces wrong suggestions, while staying under the roughly 500ms latency budget users tolerate before disabling inline suggestions — tracked through acceptance rate, post-acceptance retention, and tool call reliability, with differentiation ultimately coming from agentic workflows and codebase understanding rather than raw autocomplete.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for AI coding product PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build AI Coding PM Skills — Free →
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

        <RelatedPages slug="pm-ai-coding-tools" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice AI Coding PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
