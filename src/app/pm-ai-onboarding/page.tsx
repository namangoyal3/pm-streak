import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM AI Onboarding (2026) — Onboarding Users Into AI Products",
  description:
    "How PMs design AI product onboarding. Setting expectations, demoing capabilities, and avoiding the &apos;model is too smart for me&apos; cliff.",
  keywords: [
    "PM AI onboarding", "AI product activation 2026",
  ],
  alternates: { canonical: "/pm-ai-onboarding" },
  openGraph: {
    title: "PM AI Onboarding 2026 — PM Streak",
    description: "Onboarding users into AI products.",
    url: `${SITE_URL}/pm-ai-onboarding`,
    type: "article",
  },
};

const PRINCIPLES = [
  "Show, don&apos;t tell — first interaction is a successful one",
  "Pre-fill prompts and templates for cold starts",
  "Set expectations explicitly — what works, what doesn&apos;t",
  "Bias users toward small wins early",
  "Make iteration easy — bad outputs aren&apos;t the end of the session",
];

const TRAPS = [
  "Empty input box on first launch — paralysis",
  "Demos that work in marketing but fail in product",
  "Promising too much — under-delivery breaks trust",
  "Skipping use case discovery — users don&apos;t know what to ask",
];

const FAQS = [
  {
    q: "Why do AI products struggle with cold-start onboarding?",
    a: "Because users don&apos;t know what the AI can do. An empty chat box is intimidating. The best AI product onboardings show users what&apos;s possible immediately — pre-built templates, sample queries, guided first interactions. Treat the cold start as a discovery problem, not a tutorial problem.",
  },
];

export default function PmAiOnboardingPage() {
  const dates = pageDates("/pm-ai-onboarding");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM AI Onboarding", url: `${SITE_URL}/pm-ai-onboarding` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM AI Onboarding (2026 Edition)",
        description: "How PMs design AI product onboarding. Setting expectations, demoing capabilities, and avoiding the &apos;model is too smart for me&apos; cliff.",
        image: `${SITE_URL}/api/og?title=PM+AI+Onboarding+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-ai-onboarding`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🚪</span> Empty input boxes are intimidating. Show what&apos;s possible.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM AI Onboarding<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Because users rarely know what an AI product can actually do, good onboarding treats the cold start as a discovery problem, not a tutorial: show rather than tell, pre-fill prompts for a first successful interaction, set explicit expectations, nudge toward small early wins, and keep iteration cheap so a bad output isn&apos;t a dead end.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="underline hover:text-[#89e219]">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 principles and 4 traps for AI product onboarding.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build AI Onboarding PM Skills — Free →
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

        <RelatedPages slug="pm-ai-onboarding" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice AI Onboarding Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
