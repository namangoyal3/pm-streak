import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Launch Metrics Guide (2026) — What to Measure Before, During, After",
  description:
    "What PMs should measure before, during, and after launch. Primary metrics, guardrails, leading vs lagging indicators, and how to decide when a launch is a win.",
  keywords: [
    "PM launch metrics", "measuring product launch",
    "launch success metrics PM", "PM launch KPIs",
    "launch measurement 2026",
  ],
  alternates: { canonical: "/pm-launch-metrics" },
  openGraph: {
    title: "PM Launch Metrics Guide 2026 — PM Streak",
    description: "What PMs should measure before, during, and after a launch — primary, guardrail, leading.",
    url: `${SITE_URL}/pm-launch-metrics`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Launch+Metrics+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Launch Metrics Guide 2026 — PM Streak",
    description: "What PMs should measure before, during, and after a launch — primary, guardrail, leading.",
    images: [`${SITE_URL}/api/og?title=PM+Launch+Metrics+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PRE_LAUNCH = [
  { metric: "Baseline for primary metric", what: "Current state — what are we trying to move and from what?" },
  { metric: "Baseline for guardrails", what: "Current values of metrics that must not degrade" },
  { metric: "Launch readiness checklist", what: "Instrumentation, rollback plan, support ready, comms drafted" },
  { metric: "Expected effect size", what: "Pre-committed estimate — &apos;we expect D7 retention to lift 5pp&apos;" },
];

const DURING_LAUNCH = [
  { metric: "Real-time adoption", what: "Are users discovering the feature? What % of eligible users have seen it?" },
  { metric: "Real-time error rate", what: "Are users hitting bugs? Spike = rollback signal." },
  { metric: "Support ticket volume", what: "Are users confused? Jump in tickets = UX issue." },
  { metric: "Crash rate / performance", what: "Technical health of the launch. Hard regression = rollback." },
  { metric: "Early guardrail signal", what: "Quick check: did anything break? Not statistical yet, just directional." },
];

const POST_LAUNCH = [
  { metric: "Primary metric (2–4 weeks)", what: "Did it move as expected? Statistically significant?" },
  { metric: "Guardrails (full window)", what: "Did retention, NPS, support tickets stay healthy?" },
  { metric: "Adoption by segment", what: "Which user segments adopted fastest? Slowest? Why?" },
  { metric: "Usage depth", what: "Users who adopted — do they use it once or repeatedly?" },
  { metric: "Long-term retention impact (60–90 days)", what: "Does the feature affect long-term user retention?" },
];

const DECISION_RULES = [
  "Primary wins + guardrails healthy → ship to 100%",
  "Primary flat + guardrails healthy → learn, iterate, maybe expand partial",
  "Primary wins + guardrail breaks → investigate trade-off; often rollback",
  "Primary loses → rollback, post-mortem, decide next bet",
  "Mixed results across segments → ship to winning segments if big enough",
];

const FAQS = [
  {
    q: "How long should PMs monitor a launch before declaring success?",
    a: "Minimum 2–4 weeks for primary metrics. 60–90 days for long-term retention impact. Declaring success on Day 3 is almost always premature — novelty effects fade and the real pattern emerges after 2+ weeks. Pre-commit to your monitoring window before launch and stick to it.",
  },
  {
    q: "What&apos;s the biggest PM launch measurement mistake?",
    a: "No baseline. PMs launch, look at post-launch numbers, and have no idea if those numbers are good or bad because they didn&apos;t capture the before-state. Always capture baselines before launch — for primary and guardrails. Without baseline, your post-launch data is noise.",
  },
];

export default function PmLaunchMetricsPage() {
  const dates = pageDates("/pm-launch-metrics");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Launch Metrics", url: `${SITE_URL}/pm-launch-metrics` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Launch Metrics Guide (2026 Edition)",
        description: "What PMs should measure before, during, and after launch. Primary metrics, guardrails, leading vs lagging indicators, and how to decide when a launch is a win.",
        image: `${SITE_URL}/api/og?title=PM+Launch+Metrics+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-launch-metrics`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📊</span> You only know if a launch worked if you measured it right
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Launch Metrics Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-2">
            What to measure around a launch breaks into three windows — four baseline metrics before, five
            real-time signals during, and five evaluation metrics for the two to four weeks after — feeding five
            decision rules ranging from full rollout to rollback. Skipping the pre-launch baseline is the biggest
            measurement mistake, since post-launch numbers are meaningless without a before-state, and long-term
            retention impact needs 60–90 days to show up.
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-2">
            4 pre-launch metrics to capture, 5 during-launch metrics to watch,
            5 post-launch metrics to evaluate, and 5 decision rules.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Launch Intuition Daily — Free →
          </Link>
        </section>

        {/* Pre-launch */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">Pre-Launch: 4 Metrics to Capture</h2>
          <div className="space-y-3">
            {PRE_LAUNCH.map((m, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-white text-sm mb-1">{i + 1}. {m.metric}</p>
                <p className="text-xs text-white/60">{m.what}</p>
              </div>
            ))}
          </div>
        </section>

        {/* During */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">During Launch: 5 Metrics to Watch</h2>
            <div className="space-y-3">
              {DURING_LAUNCH.map((m, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-white text-sm mb-1">{i + 1}. {m.metric}</p>
                  <p className="text-xs text-white/60">{m.what}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Post-launch */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">Post-Launch: 5 Metrics to Evaluate</h2>
          <div className="space-y-3">
            {POST_LAUNCH.map((m, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-white text-sm mb-1">{i + 1}. {m.metric}</p>
                <p className="text-xs text-white/60">{m.what}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Decision rules */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Decision Rules</h2>
            <div className="space-y-2">
              {DECISION_RULES.map((d, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
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

        <RelatedPages slug="pm-launch-metrics" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Launch Intuition Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on measuring launches, reading signals, and making ship/rollback calls.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
