import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Onboarding Design (2026) — How PMs Build First-Run Experiences That Activate",
  description:
    "How PMs design onboarding that activates users fast. Aha moments, progressive disclosure, and the metrics that separate great onboarding from tutorial hell.",
  keywords: [
    "PM onboarding design", "first-run experience PM",
    "activation PM", "aha moment 2026",
  ],
  alternates: { canonical: "/pm-onboarding-design" },
  openGraph: {
    title: "PM Onboarding Design 2026 — PM Streak",
    description: "How PMs build first-run experiences that activate users fast.",
    url: `${SITE_URL}/pm-onboarding-design`,
    type: "article",
  },
};

const PRINCIPLES = [
  "Define the aha moment explicitly — the single action that predicts retention",
  "Shortest path to value — every screen between signup and aha is friction",
  "Progressive disclosure — teach as users need, not upfront",
  "Defaults over choices — smart defaults beat configuration",
  "Celebrate early wins — dopamine compounds into habit",
  "Measure activation, not completion — finishing onboarding ≠ being activated",
];

const METRICS = [
  "Time-to-aha — median minutes from signup to first meaningful action",
  "Activation rate — % of signups reaching aha within 7 days",
  "Step-level drop-off — where are users quitting?",
  "D1/D7/D30 retention by onboarding variant",
  "Support tickets per 100 signups — confusion signal",
];

const FAQS = [
  {
    q: "How long should onboarding be?",
    a: "As short as possible while delivering the aha moment. For consumer apps, target under 60 seconds to first value. For B2B, 3–5 minutes is acceptable if it sets up personalisation that compounds. If onboarding takes longer than the first value, you&apos;ve designed it backwards.",
  },
  {
    q: "Skip button or forced onboarding?",
    a: "Always offer a skip. Forcing users through a tutorial when they want to explore is the fastest way to lose power users. Measure: skippers often have higher retention than completers because they&apos;re self-motivated. Let them self-select.",
  },
];

export default function PmOnboardingDesignPage() {
  const dates = pageDates("/pm-onboarding-design");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Onboarding Design", url: `${SITE_URL}/pm-onboarding-design` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Onboarding Design (2026 Edition)",
        description:
          "How PMs design onboarding that activates users fast. Aha moments, progressive disclosure, and the metrics that separate great onboarding from tutorial hell.",
        image: `${SITE_URL}/api/og?title=PM+Onboarding+Design+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-onboarding-design`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🚀</span> Onboarding is the most expensive screen you&apos;ll ever ship
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Onboarding Design<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Effective onboarding design centers on one explicit aha moment — the single action that predicts retention — reached via the shortest possible path, progressive disclosure instead of upfront tutorials, and smart defaults, then tracked through time-to-aha, 7-day activation rate, and step-level drop-off rather than mere completion, with consumer apps targeting under 60 seconds to first value.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 principles and 5 metrics that separate activation from tutorial hell.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Activation PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Principles</h2>
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

        <RelatedPages slug="pm-onboarding-design" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Onboarding PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
