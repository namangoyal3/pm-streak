import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Experiment Examples (2026) — Real A/B Test Designs",
  description:
    "5 real-style PM experiment examples with hypothesis, setup, primary + guardrail metrics, and decision criteria. See how great PMs design tests.",
  keywords: [
    "PM experiment examples", "A/B test examples PM",
    "real experiment designs", "hypothesis examples PM",
    "A/B testing examples 2026",
  ],
  alternates: { canonical: "/pm-experiment-examples" },
  openGraph: {
    title: "PM Experiment Examples 2026 — PM Streak",
    description: "5 real-style PM experiment designs with hypothesis, setup, metrics, and decision criteria.",
    url: `${SITE_URL}/pm-experiment-examples`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Experiment+Examples+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Experiment Examples 2026 — PM Streak",
    description: "5 real-style PM experiment designs with hypothesis, setup, metrics, and decision criteria.",
    images: [`${SITE_URL}/api/og?title=PM+Experiment+Examples+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const EXPERIMENTS = [
  {
    name: "Onboarding simplification",
    hypothesis: "Reducing onboarding from 5 steps to 3 will lift Day-1 activation from 40% to 50%.",
    setup: "50/50 split, new signups only, 14-day run",
    primary: "Day-1 activation rate",
    guardrails: "Day-7 retention (don&apos;t lose quality), profile completion (can complete later)",
    decision: "Ship if activation lifts &gt;5pp AND guardrails within 2pp of baseline",
  },
  {
    name: "Streak reminder timing",
    hypothesis: "Sending reminders at user&apos;s peak activity hour (vs fixed 9am) will lift reminder-driven returns by 30%.",
    setup: "A/B test on existing users with &gt;3 days of history, 21-day run",
    primary: "Notification-driven return rate",
    guardrails: "Uninstall rate, notification disable rate",
    decision: "Ship if return lift &gt;20% AND uninstall/disable rates don&apos;t increase",
  },
  {
    name: "Pricing page redesign",
    hypothesis: "Showing annual pricing first (vs monthly) will lift annual plan mix from 30% to 45%.",
    setup: "50/50 split, all pricing page visitors, 28-day run",
    primary: "% of conversions on annual plan",
    guardrails: "Overall conversion rate (don&apos;t drop total paid), refund rate (don&apos;t upsell unhappy users)",
    decision: "Ship if annual mix lifts &gt;10pp AND overall conversion doesn&apos;t drop &gt;2pp",
  },
  {
    name: "Search result layout change",
    hypothesis: "Showing 3 products per row (vs 4) on mobile will lift search-to-purchase conversion by 15%.",
    setup: "A/B test on mobile search results, 14-day run, 50/50 split",
    primary: "Search-to-purchase conversion rate",
    guardrails: "Session length (don&apos;t make browsing annoying), search-to-exit rate",
    decision: "Ship if conversion lifts &gt;10% without session length dropping &gt;5%",
  },
  {
    name: "Paywall placement",
    hypothesis: "Moving paywall from Day 3 to Day 7 will reduce free-user churn by 30% without hurting conversion.",
    setup: "50/50 split on new users, 30-day run to measure downstream effects",
    primary: "Free-user Day-14 retention",
    guardrails: "Paid conversion rate, LTV (delay doesn&apos;t reduce revenue)",
    decision: "Ship if retention lift &gt;20% AND paid conversion within 5% of baseline",
  },
];

const COMMON_PATTERNS = [
  "Every hypothesis is specific — &apos;X will move Y from A to B&apos; — not &apos;this will be better&apos;",
  "Every test has primary + guardrails — protects against local wins that cause global losses",
  "Decision criteria pre-committed — prevents mid-test rationalisation",
  "Run length matches seasonality + statistical power — not arbitrary",
  "Segment considerations noted — new users vs existing, mobile vs web",
];

const FAQS = [
  {
    q: "How do PMs write good hypotheses?",
    a: "A good hypothesis is specific and falsifiable: &apos;[Change] will move [metric] from [baseline] to [target] because [reason].&apos; If you can&apos;t name a specific metric or target, the hypothesis is vague. If there&apos;s no &apos;because,&apos; you&apos;re not really predicting — you&apos;re just hoping.",
  },
  {
    q: "Should every PM change go through an A/B test?",
    a: "No. Tests cost time and complexity. Test when: stakes are high, you&apos;re uncertain about direction, the change is reversible. Skip tests for: obvious bugs, changes too small to detect, irreversible changes. The judgment of when to test is a PM skill in itself.",
  },
];

export default function PmExperimentExamplesPage() {
  const dates = pageDates("/pm-experiment-examples");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Experiment Examples", url: `${SITE_URL}/pm-experiment-examples` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Experiment Examples (2026 Edition)",
        description: "5 real-style PM experiment examples with hypothesis, setup, primary + guardrail metrics, and decision criteria. See how great PMs design tests.",
        image: `${SITE_URL}/api/og?title=PM+Experiment+Examples+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-experiment-examples`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🧪</span> See what good experiment designs actually look like
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Experiment Examples<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-2">
            Five real-style experiment write-ups — onboarding simplification, streak reminder timing, pricing page
            redesign, search layout, and paywall placement — each show a specific hypothesis, test setup, primary
            metric, guardrails, and pre-committed decision criteria. Across all five, hypotheses name an exact
            metric and target, guardrails catch local wins that cause global losses, and decisions get locked in
            before results arrive to prevent mid-test rationalisation.
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-2">
            5 real-style A/B test examples with hypothesis, setup, metrics, and pre-committed decision criteria.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Experiment Skills Daily — Free →
          </Link>
        </section>

        {/* Experiments */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="space-y-5">
            {EXPERIMENTS.map((e, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-5">
                <p className="font-bold text-white mb-3">{i + 1}. {e.name}</p>
                <div className="space-y-2 text-xs">
                  <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-lg p-3">
                    <p className="text-[#89e219] font-medium mb-1">Hypothesis</p>
                    <p className="text-white/70 italic">{e.hypothesis}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="bg-[#0e1113] rounded p-2">
                      <p className="text-white/40 mb-1">Setup</p>
                      <p className="text-white/70">{e.setup}</p>
                    </div>
                    <div className="bg-[#0e1113] rounded p-2">
                      <p className="text-white/40 mb-1">Primary metric</p>
                      <p className="text-white/70">{e.primary}</p>
                    </div>
                    <div className="bg-yellow-500/5 border border-yellow-500/20 rounded p-2">
                      <p className="text-yellow-400 mb-1">Guardrails</p>
                      <p className="text-white/70">{e.guardrails}</p>
                    </div>
                    <div className="bg-green-500/5 border border-green-500/20 rounded p-2">
                      <p className="text-green-400 mb-1">Decision criteria</p>
                      <p className="text-white/70">{e.decision}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Common patterns */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Common Patterns Across Great Experiments</h2>
            <div className="space-y-2">
              {COMMON_PATTERNS.map((p, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{p}</p>
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

        <RelatedPages slug="pm-experiment-examples" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Experiment Design Daily</h2>
          <p className="text-white/60 mb-6">Daily PM scenarios on hypotheses, metrics, and decision criteria.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
