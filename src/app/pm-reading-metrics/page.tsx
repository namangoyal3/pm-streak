import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "Reading PM Metrics Correctly (2026) — Spotting Signal vs Noise",
  description:
    "How PMs read metrics correctly. Spot noise vs signal, avoid confirmation bias, segment correctly, and the 7 questions to ask before acting on any metric move.",
  keywords: [
    "reading PM metrics", "signal vs noise PM",
    "PM data interpretation", "metric movement diagnosis",
    "PM analytics interpretation 2026",
  ],
  alternates: { canonical: "/pm-reading-metrics" },
  openGraph: {
    title: "Reading PM Metrics Correctly 2026 — PM Streak",
    description: "How PMs spot signal vs noise, avoid bias, and act on metric moves correctly.",
    url: `${SITE_URL}/pm-reading-metrics`,
    images: [{ url: `${SITE_URL}/api/og?title=Reading+PM+Metrics+Correctly+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reading PM Metrics Correctly 2026 — PM Streak",
    description: "How PMs spot signal vs noise, avoid bias, and act on metric moves correctly.",
    images: [`${SITE_URL}/api/og?title=Reading+PM+Metrics+Correctly+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const SEVEN_QUESTIONS = [
  "Is the move statistically meaningful vs day-to-day variance?",
  "Does it persist for more than a few days, or is it a spike?",
  "Is it affecting all segments, or just one?",
  "Did anything external change (holiday, outage, competitor launch)?",
  "Did anything internal change (deploy, feature rollout, copy change)?",
  "Is instrumentation clean, or could it be a tracking issue?",
  "Does the move match what we hypothesised would happen?",
];

const SIGNAL_VS_NOISE = [
  { move: "5% week-over-week increase with no clear cause", likely: "Noise — normal variance" },
  { move: "15% week-over-week change that persists 3+ weeks", likely: "Signal — something changed, investigate" },
  { move: "Metric changes immediately after deploy", likely: "Signal — probably the deploy" },
  { move: "Metric drifts down 2% per week for a month", likely: "Signal — slow decay, often worse than sudden drops" },
  { move: "Only one segment (e.g. Android users) affected", likely: "Signal — scoped to something segment-specific" },
];

const BIASES_TO_AVOID = [
  "Attributing wins to your last decision — correlation isn&apos;t causation",
  "Ignoring bad news in data — favourite features&apos; flaws stay invisible",
  "Cherry-picking segments that support your view",
  "Ignoring baselines — &apos;retention is 28%&apos; without context means nothing",
  "Seeing causality in noise — small movements are usually variance",
];

const DIAGNOSIS_STEPS = [
  "Verify the number — is instrumentation clean? Compare against another source if possible",
  "Look at trend, not point — week-over-week tells more than single day",
  "Segment by cohort, geography, device, channel — find where the change lives",
  "Correlate with internal events — deploys, launches, copy changes",
  "Correlate with external events — holidays, competitor moves, news cycles",
  "Form a hypothesis — then test it with a targeted A/B or deeper data pull",
];

const FAQS = [
  {
    q: "How much does metric noise affect PM decisions?",
    a: "Significantly. Most week-over-week changes under 3–5% are within normal variance — reacting to them wastes cycles. The PMs who react to every blip are exhausted and slow; the PMs who calibrate to &apos;this is probably noise&apos; stay focused on real signal. Build intuition for your product&apos;s normal variance range.",
  },
  {
    q: "What&apos;s the biggest metric interpretation mistake PMs make?",
    a: "Attributing causality to what they recently shipped. If retention went up the week you shipped a feature, you assume your feature caused it — often it was something else (seasonality, external event, unrelated deploy). The discipline is to demand strong evidence before claiming causality. A/B tests exist precisely to break this bias.",
  },
];

export default function PmReadingMetricsPage() {
  const dates = pageDates("/pm-reading-metrics");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Reading PM Metrics", url: `${SITE_URL}/pm-reading-metrics` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Reading PM Metrics Correctly (2026 Edition)",
        description: "How PMs read metrics correctly. Spot noise vs signal, avoid confirmation bias, segment correctly, and the 7 questions to ask before acting on any metric move.",
        image: `${SITE_URL}/api/og?title=Reading+PM+Metrics+Correctly+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-reading-metrics`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📈</span> Reading metrics correctly is a PM superpower
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Reading PM Metrics Correctly<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-2">
            Before acting on any metric move, this guide walks through seven diagnostic questions, five
            signal-vs-noise examples, five interpretation biases, and a six-step process for tracing a change
            back to its cause. Most week-over-week swings under 3–5% are ordinary variance rather than signal,
            and the most common mistake is crediting your last shipped change for a shift that seasonality or
            an unrelated event actually caused.
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-2">
            7 questions to ask before acting on any metric move, 5 signal-vs-noise examples,
            5 biases to avoid, and a 6-step diagnosis process.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Metric Intuition Daily — Free →
          </Link>
        </section>

        {/* Seven questions */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">7 Questions Before Acting on a Metric Move</h2>
          <div className="space-y-2">
            {SEVEN_QUESTIONS.map((q, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{q}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Signal vs noise */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">Signal vs Noise Examples</h2>
            <div className="space-y-3">
              {SIGNAL_VS_NOISE.map((s, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <p className="text-sm text-white/70 mb-1">{s.move}</p>
                  <p className="text-xs text-[#89e219]">→ {s.likely}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Biases */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Interpretation Biases</h2>
          <div className="space-y-2">
            {BIASES_TO_AVOID.map((b, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-red-400 flex-shrink-0">⚠️</span>
                <p className="text-sm text-white/70">{b}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Diagnosis */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6-Step Diagnosis Process</h2>
            <div className="space-y-2">
              {DIAGNOSIS_STEPS.map((d, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{d}</p>
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

        <RelatedPages slug="pm-reading-metrics" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Metric Intuition Daily</h2>
          <p className="text-white/60 mb-6">Daily PM scenarios on metric diagnosis, signal-vs-noise, and root cause analysis.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
