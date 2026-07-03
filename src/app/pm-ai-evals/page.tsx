import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM AI Evals (2026) — How PMs Measure LLM Product Quality",
  description:
    "How PMs design AI evals. Offline benchmarks, online metrics, human review, and why eval infrastructure is the real moat for AI products.",
  keywords: [
    "PM AI evals", "LLM evaluation",
    "AI product quality", "eval PM 2026",
  ],
  alternates: { canonical: "/pm-ai-evals" },
  openGraph: {
    title: "PM AI Evals 2026 — PM Streak",
    description: "How PMs design AI evals for LLM products.",
    url: `${SITE_URL}/pm-ai-evals`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+AI+Evals+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM AI Evals 2026 — PM Streak",
    description: "How PMs design AI evals for LLM products.",
    images: [`${SITE_URL}/api/og?title=PM+AI+Evals+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const LAYERS = [
  "Golden dataset — small, curated, hand-labeled set; regression test every change",
  "Synthetic evals — generated test cases covering edge modes",
  "LLM-as-judge — another model grades outputs against a rubric; fast but biased",
  "Human review — periodic expert audit; costly but grounds reality",
  "Online metrics — real user outcomes; the ultimate check on offline evals",
];

const RULES = [
  "Every prompt change is a code change — version it, eval it, review it",
  "Offline evals must predict online outcomes or they&apos;re noise",
  "Track drift — model vendors update silently; your quality shifts without warning",
  "Budget eval time like test time — aim for 10–20% of PM + eng cycles on evals",
  "Never ship on vibes — &apos;the demo looks good&apos; is not an eval",
];

const FAQS = [
  {
    q: "What&apos;s the biggest eval mistake PMs make?",
    a: "Relying only on anecdotal testing (&apos;it worked when I tried it&apos;) instead of systematic evaluation. AI products fail probabilistically — meaning they can work 9 times and break the 10th. Without a golden dataset and regression testing, you don&apos;t know you&apos;ve regressed until users tell you. By then trust is gone.",
  },
];

export default function PmAiEvalsPage() {
  const dates = pageDates("/pm-ai-evals");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM AI Evals", url: `${SITE_URL}/pm-ai-evals` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM AI Evals (2026 Edition)",
        description:
          "How PMs design AI evals. Offline benchmarks, online metrics, human review, and why eval infrastructure is the real moat for AI products.",
        image: `${SITE_URL}/api/og?title=PM+AI+Evals+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-ai-evals`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🧪</span> Eval infrastructure is the real moat for AI products
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM AI Evals<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            PMs measure AI product quality through five layers — a hand-labeled golden dataset for regression testing, synthetic edge-case evals, LLM-as-judge scoring, periodic human review, and online metrics that ground it all in real outcomes — treating every prompt change as a code change that gets versioned and evaluated rather than shipped on vibes.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 eval layers and 5 rules for PMs shipping AI products.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build AI Eval PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Eval Layers</h2>
          <div className="space-y-2">
            {LAYERS.map((l, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{l}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Rules</h2>
            <div className="space-y-2">
              {RULES.map((r, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{r}</p>
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

        <RelatedPages slug="pm-ai-evals" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice AI Eval Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
