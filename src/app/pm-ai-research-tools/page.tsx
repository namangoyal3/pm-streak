import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM AI Research Tools (2026) — Elicit, Consensus, NotebookLM PM Lessons",
  description:
    "How PMs build AI research tools. Literature review, summarisation, grounded answers, and the evolution of AI-assisted knowledge work.",
  keywords: [
    "PM AI research", "Elicit PM",
    "NotebookLM 2026",
  ],
  alternates: { canonical: "/pm-ai-research-tools" },
  openGraph: {
    title: "PM AI Research Tools 2026 — PM Streak",
    description: "How PMs build AI research tools.",
    url: `${SITE_URL}/pm-ai-research-tools`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+AI+Research+Tools+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM AI Research Tools 2026 — PM Streak",
    description: "How PMs build AI research tools.",
    images: [`${SITE_URL}/api/og?title=PM+AI+Research+Tools+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Grounding in sources is the product — free-floating answers don&apos;t fly",
  "Support for long documents (100+ pages) is differentiating",
  "Workflow integration with Zotero, EndNote, academic databases matters",
  "Trust signals — show evidence quality, citation count, peer review status",
  "Niche verticals (medical, legal, finance research) have premium pricing",
];

const METRICS = [
  "Documents processed per user",
  "Citation click-through rate",
  "Depth of follow-up questions per session",
  "Export / cite actions (research workflow signal)",
  "Academic vs business segment mix",
];

const FAQS = [
  {
    q: "Is there space beyond ChatGPT for research tools?",
    a: "Yes — specialised tools (Elicit for systematic reviews, Consensus for aggregated evidence, NotebookLM for personal research) go deeper than general chat. They invest in source grounding, rigour markers, and workflow integration. Generalists cover breadth; specialists own depth.",
  },
];

export default function PmAiResearchToolsPage() {
  const dates = pageDates("/pm-ai-research-tools");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM AI Research Tools", url: `${SITE_URL}/pm-ai-research-tools` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM AI Research Tools (2026 Edition)",
        description:
          "How PMs build AI research tools. Literature review, summarisation, grounded answers, and the evolution of AI-assisted knowledge work.",
        image: `${SITE_URL}/api/og?title=PM+AI+Research+Tools+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-ai-research-tools`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔬</span> Grounded answers are the product in research tools
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM AI Research Tools<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Elicit, Consensus, and NotebookLM carve out space beyond general chat by treating grounding in sources as the product itself — supporting 100+ page documents, integrating with Zotero and EndNote, and surfacing trust signals like citation count and peer-review status so answers stay verifiable. Specialists own this depth while generalists cover breadth, and niche verticals such as medical or legal research command premium pricing.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for AI research tool PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build AI Research PM Skills — Free →
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

        <RelatedPages slug="pm-ai-research-tools" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice AI Research PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
