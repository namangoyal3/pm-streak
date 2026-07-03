import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM AI Search (2026) — Perplexity, ChatGPT, Google AI Overview PM Lessons",
  description:
    "How PMs build AI search products. Retrieval, grounding, citations, and why AI search is the most contested category since mobile search.",
  keywords: [
    "PM AI search", "Perplexity PM",
    "ChatGPT search", "AI search 2026",
  ],
  alternates: { canonical: "/pm-ai-search" },
  openGraph: {
    title: "PM AI Search 2026 — PM Streak",
    description: "How PMs build AI search products.",
    url: `${SITE_URL}/pm-ai-search`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+AI+Search+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM AI Search 2026 — PM Streak",
    description: "How PMs build AI search products.",
    images: [`${SITE_URL}/api/og?title=PM+AI+Search+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Citations are the trust layer — hallucination without citation is a death sentence",
  "Retrieval quality &gt; model quality for most queries",
  "Latency under 2s is the bar — users won&apos;t wait 10s for a synthesised answer",
  "Source relationships with publishers shape defensibility",
  "Follow-up questions are the new engagement surface — not just one-shot answers",
];

const METRICS = [
  "Query resolution rate (did user stop after first answer?)",
  "Follow-up conversation depth",
  "Citation click-through",
  "Hallucination rate (measured, not guessed)",
  "Retention D30 among power users",
];

const FAQS = [
  {
    q: "Is AI search taking share from Google?",
    a: "Slowly but measurably. Perplexity, ChatGPT, and Google&apos;s own AI Overviews handle some queries traditional search historically owned (comparisons, summaries, research). But transactional and navigational queries still go to classic search. The split is real; the total pie is growing.",
  },
];

export default function PmAiSearchPage() {
  const dates = pageDates("/pm-ai-search");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM AI Search", url: `${SITE_URL}/pm-ai-search` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM AI Search (2026 Edition)",
        description:
          "How PMs build AI search products. Retrieval, grounding, citations, and why AI search is the most contested category since mobile search.",
        image: `${SITE_URL}/api/og?title=PM+AI+Search+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-ai-search`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔎</span> Citations are the trust layer in AI search
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM AI Search<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            AI search products live or die on citations — since users need a reason to trust a synthesised answer over a source list — and on retrieval quality, which matters more than model quality for most queries; PMs judge success by query resolution rate, citation click-through, and hallucination rate, while Perplexity, ChatGPT, and Google&apos;s AI Overviews slowly pull comparison and research queries away from classic search.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for AI search PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build AI Search PM Skills — Free →
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

        <RelatedPages slug="pm-ai-search" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice AI Search PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
