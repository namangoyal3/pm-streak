import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "Product Launch Guide for PMs (2026) — How to Launch Without Drama",
  description:
    "The complete PM product launch playbook. Pre-launch checklist, staged rollouts, launch day ops, post-launch monitoring, and the 10 launch failure modes to avoid.",
  keywords: [
    "product launch PM", "how PMs launch products",
    "product launch checklist", "staged rollout PM",
    "product launch plan", "PM go-to-market 2026",
  ],
  alternates: { canonical: "/product-launch-guide" },
  openGraph: {
    title: "Product Launch Guide for PMs 2026 — PM Streak",
    description: "How PMs launch products safely — checklist, staged rollouts, monitoring, and failure modes.",
    url: `${SITE_URL}/product-launch-guide`,
    images: [{ url: `${SITE_URL}/api/og?title=Product+Launch+Guide+for+PMs+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Launch Guide for PMs 2026 — PM Streak",
    description: "How PMs launch products safely — checklist, staged rollouts, monitoring, and failure modes.",
    images: [`${SITE_URL}/api/og?title=Product+Launch+Guide+for+PMs+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PHASES = [
  {
    phase: "T-4 weeks: Pre-launch readiness",
    icon: "📋",
    tasks: [
      "Confirm launch criteria met (feature complete, QA signed off, core metrics instrumented)",
      "Align on primary success metric and guardrail metrics",
      "Prepare rollback plan — document exact steps if we need to revert",
      "Brief customer support and customer success teams on likely questions",
      "Draft internal and external communications (release notes, blog, email)",
    ],
  },
  {
    phase: "T-1 week: Staging",
    icon: "🧪",
    tasks: [
      "Deploy to staging environment with production-like data",
      "Run through the 5 most common user flows end-to-end",
      "Verify analytics events are firing correctly — test in Amplitude/Mixpanel",
      "Run final dogfood with internal team for 3–5 days",
      "Final PRD review with engineering + design — surface any remaining concerns",
    ],
  },
  {
    phase: "Launch day: Phased rollout",
    icon: "🚀",
    tasks: [
      "Enable feature flag at 1% — monitor for 30 minutes before expanding",
      "Expand to 10%, 50%, then 100% if metrics and error rates are healthy",
      "Watch: error rates, conversion funnel, guardrail metrics in real-time",
      "Have engineering on standby for the first 4 hours",
      "Communicate status in a shared Slack channel — positive or negative",
    ],
  },
  {
    phase: "T+1 week: Stabilisation",
    icon: "📊",
    tasks: [
      "Review primary metric — did it move as expected? Statistically significant?",
      "Check guardrails for any regressions (support tickets, D7 retention, etc.)",
      "Listen to user feedback — App Store reviews, support tickets, social media",
      "Fix any P1/P2 bugs uncovered in the first week",
      "Publish launch retrospective to stakeholders",
    ],
  },
  {
    phase: "T+4 weeks: Post-mortem & next bets",
    icon: "🧭",
    tasks: [
      "Quantify full impact — did we hit targets? Exceed? Miss?",
      "Document what went well, what could improve, what you learned",
      "Decide: double down, iterate, or kill the feature",
      "Share learnings with wider PM team — launches are teaching moments",
      "Feed insights into next sprint's planning",
    ],
  },
];

const FAILURE_MODES = [
  { mode: "No rollback plan", why: "'We'll figure it out if something breaks' is a disaster. Document the exact rollback steps before launch — not during a fire." },
  { mode: "Launching on Friday", why: "Engineering goes home. Ops coverage drops. Users hit weekend bugs. Launch Tuesday-Thursday whenever possible." },
  { mode: "No guardrail metrics", why: "A feature wins on the primary metric but silently increases uninstalls. Guardrails catch these. Without them, you ship regressions." },
  { mode: "Surprise to support", why: "Customer support is the first line of user contact. If they don't know the feature is launching, tickets pile up and users leave angry." },
  { mode: "Skipping staging", why: "Prod data exposes edge cases staging can't. Running a dogfood period at staging scale is cheap insurance." },
  { mode: "Launching to 100% immediately", why: "Phased rollout catches issues before they affect all users. 1% → 10% → 50% → 100% is almost always worth the extra day." },
  { mode: "Ignoring early signal", why: "If metrics look bad on Day 1, take it seriously. 'It'll stabilise' is a hope, not a plan. Roll back or investigate immediately." },
  { mode: "No post-launch retro", why: "Teams that don't review launches don't improve launches. 30 minutes of reflection per launch compounds massively." },
  { mode: "Hiding bad news", why: "Launches that miss targets hurt credibility if you hide them. Launches that miss targets AND get honestly reviewed build trust long-term." },
  { mode: "Treating launch as the end", why: "A launch is the starting line, not the finish. The 2 weeks after launch often determine long-term adoption more than the launch day itself." },
];

const FAQS = [
  {
    q: "Who owns the product launch — PM or marketing?",
    a: "Both, with clear division. PMs own the product readiness (feature complete, metrics instrumented, rollback plan, staged rollout). Marketing owns the narrative (positioning, external comms, press, user-facing messaging). The failure mode is when one side assumes the other is doing something. Best practice: a shared launch doc with explicit RACI — who's responsible, who's accountable, who's consulted, who's informed.",
  },
  {
    q: "Should every feature have a launch?",
    a: "No — treating every feature as a launch dilutes attention and overwhelms users. 80% of features should ship quietly (feature flag + gradual rollout + no fanfare). 'Launches' with announcements, press, and coordinated GTM should be reserved for 5–10% of ships that are meaningfully new or strategically important. Over-launching signals immaturity.",
  },
  {
    q: "What's the biggest difference between a soft launch and a hard launch?",
    a: "Soft launch: ship to a small user group without announcement. Purpose: learn, gather feedback, find bugs in realistic conditions. Hard launch: coordinated rollout with marketing, press, user comms. Purpose: drive adoption, shape narrative, signal direction. Most mature PM teams soft-launch everything first and only hard-launch a subset once the feature has proven itself.",
  },
];

export default function ProductLaunchGuidePage() {
  const dates = pageDates("/product-launch-guide");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Product Launch Guide", url: `${SITE_URL}/product-launch-guide` },
      ])} />
      <JsonLd data={articleSchema({
        headline: "Product Launch Guide (PM Edition 2026)",
        description: "The complete PM product launch playbook. Pre-launch checklist, staged rollouts, launch day ops, post-launch monitoring, and the 10 launch failure modes to avoid.",
        image: `${SITE_URL}/api/og?title=Product+Launch+Guide+for+PMs+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/product-launch-guide`,
      })} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🚀</span> A launch isn&apos;t done until metrics stabilise
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Product Launch Guide<br />(PM Edition 2026)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            A PM product launch runs through five phases — pre-launch readiness, staging, a phased
            rollout day, one week of stabilisation, and a post-mortem four weeks out — with a feature
            flag moving from 1% to 10% to 50% to 100% only as error rates and guardrail metrics stay
            healthy. Skipping any phase is how launches fall into the ten failure modes below, from
            missing rollback plans to shipping straight to 100%.
          </p>
          <p className="text-sm text-white/50 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The 5 phases of a safe product launch, checklists for each,
            and the 10 launch failure modes that haunt unprepared PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice Launch Scenarios — Free →
          </Link>
        </section>

        {/* Phases */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">The 5 Phases of a Product Launch</h2>
          <div className="space-y-5">
            {PHASES.map((p, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{p.icon}</span>
                  <h3 className="font-bold text-white">{p.phase}</h3>
                </div>
                <ul className="space-y-2">
                  {p.tasks.map((t, j) => (
                    <li key={j} className="flex gap-2 text-sm">
                      <span className="text-white/30 flex-shrink-0">☐</span>
                      <span className="text-white/70">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Failure modes */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">10 Launch Failure Modes</h2>
            <div className="space-y-3">
              {FAILURE_MODES.map((f, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <div className="flex gap-3 items-start">
                    <span className="text-red-400 font-bold flex-shrink-0">{i + 1}.</span>
                    <div>
                      <p className="text-sm text-white font-medium mb-1">{f.mode}</p>
                      <p className="text-xs text-white/60">{f.why}</p>
                    </div>
                  </div>
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

        <RelatedPages slug="product-launch-guide" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Launch Intuition Daily</h2>
          <p className="text-white/60 mb-6">Practice launch scenarios — rollout plans, metric design, post-launch triage.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
