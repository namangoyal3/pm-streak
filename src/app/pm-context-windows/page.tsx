import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Context Windows (2026) — Long Context vs RAG vs Memory",
  description:
    "How PMs decide between long context, RAG, and memory architectures. Cost, latency, and accuracy tradeoffs for AI products.",
  keywords: [
    "PM context windows", "long context PM 2026",
  ],
  alternates: { canonical: "/pm-context-windows" },
  openGraph: {
    title: "PM Context Windows 2026 — PM Streak",
    description: "Long context vs RAG vs memory.",
    url: `${SITE_URL}/pm-context-windows`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Context+Windows+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Context Windows 2026 — PM Streak",
    description: "Long context vs RAG vs memory.",
    images: [`${SITE_URL}/api/og?title=PM+Context+Windows+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const TRADEOFFS = [
  "Long context — simple but expensive and slow",
  "RAG — flexible but quality depends on retrieval",
  "Memory — persistent across sessions but adds complexity",
  "Hybrid — most production systems combine all three",
];

const QUESTIONS = [
  "How fresh does the context need to be?",
  "Cost per query — what&apos;s the budget?",
  "Latency tolerance — sync vs async?",
  "Privacy — what can leave the user&apos;s account?",
];

const FAQS = [
  {
    q: "Does long context kill RAG?",
    a: "No. Long-context models still cost more per query and have attention degradation in the middle of the context. RAG remains cheaper and often more accurate for needle-in-haystack queries. Most production AI uses both — RAG for breadth, long context for depth on the retrieved chunks.",
  },
];

export default function PmContextWindowsPage() {
  const dates = pageDates("/pm-context-windows");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Context Windows", url: `${SITE_URL}/pm-context-windows` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Context Windows (2026 Edition)",
        description: "How PMs decide between long context, RAG, and memory architectures. Cost, latency, and accuracy tradeoffs for AI products.",
        image: `${SITE_URL}/api/og?title=PM+Context+Windows+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-context-windows`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🪟</span> Most production AI uses RAG and long context together
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Context Windows<br />(2026 Edition)
          </h1>
          <p className="text-base text-white/70 max-w-2xl mx-auto mb-4">
            Long context, RAG, and memory are tradeoffs, not competitors: long context is simple but expensive and slow, RAG is cheaper and often more accurate for needle-in-haystack queries but depends on retrieval quality, and memory adds persistence across sessions at the cost of complexity. Most production systems end up combining all three rather than picking one.
          </p>
          <p className="text-xs text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            4 architecture tradeoffs and 4 PM questions to ask.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Context PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">4 Tradeoffs</h2>
          <div className="space-y-2">
            {TRADEOFFS.map((t, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{t}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">4 PM Questions</h2>
            <div className="space-y-2">
              {QUESTIONS.map((q, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{q}</p>
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

        <RelatedPages slug="pm-context-windows" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Context PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
