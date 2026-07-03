import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM AI Trust Signals (2026) — How AI Products Earn User Trust",
  description:
    "How PMs design trust into AI products. Citations, confidence indicators, undo, and the small UX choices that make AI feel reliable.",
  keywords: [
    "PM AI trust", "AI UX trust 2026",
  ],
  alternates: { canonical: "/pm-ai-trust-signals" },
  openGraph: {
    title: "PM AI Trust Signals 2026 — PM Streak",
    description: "How AI products earn user trust.",
    url: `${SITE_URL}/pm-ai-trust-signals`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+AI+Trust+Signals+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM AI Trust Signals 2026 — PM Streak",
    description: "How AI products earn user trust.",
    images: [`${SITE_URL}/api/og?title=PM+AI+Trust+Signals+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const SIGNALS = [
  "Citations and source links for grounded answers",
  "Confidence indicators (uncertain vs sure)",
  "Undo and revert for AI-suggested actions",
  "Show the reasoning, not just the answer",
  "Allow users to fix and learn from mistakes",
];

const TRAPS = [
  "Hiding errors behind cheerful copy",
  "Pretending uncertainty doesn&apos;t exist",
  "No feedback mechanism — users can&apos;t teach the system",
  "Over-promising — &apos;perfect&apos; AI breaks trust the first time",
];

const FAQS = [
  {
    q: "Why are citations so load-bearing for AI products?",
    a: "Because they let users verify what the AI claims. Without citations, users either trust blindly (risk) or distrust everything (loss of value). Citations let trust calibrate naturally over time. AI products without source-grounding age badly as users encounter their first hallucination.",
  },
];

export default function PmAiTrustSignalsPage() {
  const dates = pageDates("/pm-ai-trust-signals");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM AI Trust Signals", url: `${SITE_URL}/pm-ai-trust-signals` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM AI Trust Signals (2026 Edition)",
        description: "How PMs design trust into AI products. Citations, confidence indicators, undo, and the small UX choices that make AI feel reliable.",
        image: `${SITE_URL}/api/og?title=PM+AI+Trust+Signals+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-ai-trust-signals`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🤝</span> Citations let trust calibrate naturally
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM AI Trust Signals<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Trust in an AI product is built through small, deliberate UX choices — citations that let users verify claims, confidence indicators that flag uncertainty, undo for AI-suggested actions, visible reasoning instead of a bare answer, and an easy path to correct mistakes. Hide errors or over-promise instead, and trust breaks the first time the AI is wrong.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="underline hover:text-[#89e219]">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 trust signals and 4 traps for AI product PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build AI Trust PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Signals</h2>
          <div className="space-y-2">
            {SIGNALS.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{s}</p>
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

        <RelatedPages slug="pm-ai-trust-signals" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice AI Trust Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
