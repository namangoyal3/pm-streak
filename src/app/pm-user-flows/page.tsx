import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM User Flows Guide (2026) — How to Map &amp; Improve Any Flow",
  description:
    "How PMs map user flows that drive design and prioritisation. Happy path + edge cases, where to instrument, and how to spot friction that metrics miss.",
  keywords: [
    "PM user flows", "user flow mapping",
    "happy path vs edge cases", "PM flow design",
    "user journey mapping PM 2026",
  ],
  alternates: { canonical: "/pm-user-flows" },
  openGraph: {
    title: "PM User Flows Guide 2026 — PM Streak",
    description: "How PMs map and improve user flows — happy path, edge cases, and friction detection.",
    url: `${SITE_URL}/pm-user-flows`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+User+Flows+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM User Flows Guide 2026 — PM Streak",
    description: "How PMs map and improve user flows — happy path, edge cases, and friction detection.",
    images: [`${SITE_URL}/api/og?title=PM+User+Flows+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const MAPPING_STEPS = [
  { step: "Define the goal state", what: "What does the user accomplish at the end? Be specific — &apos;user completes first lesson,&apos; not &apos;user is engaged.&apos;" },
  { step: "Map the happy path", what: "The ideal, linear path from entry to goal. 5–8 steps typically — any longer and you&apos;re mapping too granularly." },
  { step: "Identify decision points", what: "Where does the user have to choose between paths? These are usually friction hotspots." },
  { step: "Map edge cases", what: "Nil input, empty state, error, abandonment, return later. Each has its own sub-flow." },
  { step: "Instrument every step", what: "Event tracking at each step. Without this, you can&apos;t diagnose drop-off." },
  { step: "Review with design and engineering", what: "Co-ownership catches assumptions early. Disagreements surface here, not in sprint." },
];

const FRICTION_PATTERNS = [
  "Unnecessary decision points — every choice is friction; remove the ones that don&apos;t matter",
  "Interruptions — modals, pop-ups, notifications that break flow",
  "Redundant data requests — don&apos;t ask for info the user already gave",
  "Unclear progress — users abandon when they don&apos;t know how close they are to done",
  "Mandatory steps before value — users should see value before investing data/time",
  "Poor error recovery — errors that require restart are worse than errors with clear next steps",
];

const FLOW_TYPES = [
  { type: "Onboarding flow", priority: "Highest — first-impression determines everything", note: "Every step of friction here kills activation" },
  { type: "Core action flow", priority: "Very high — this is the product&apos;s reason to exist", note: "Measure completion rate religiously" },
  { type: "Activation flow", priority: "High — getting the user to &apos;aha&apos; moment", note: "Design for fast time-to-value" },
  { type: "Monetisation flow", priority: "High — revenue depends on it", note: "Balance clarity with not being salesy" },
  { type: "Recovery flow", priority: "Medium — errors, password reset, etc.", note: "Rarely designed well, but massively affects user trust" },
  { type: "Offboarding / unsubscribe", priority: "Often overlooked — legal and reputation impact", note: "Make it easy. Dark patterns backfire long-term" },
];

const FAQS = [
  {
    q: "How detailed should a PM user flow be?",
    a: "Just detailed enough to catch friction and communicate the design. 5–8 high-level steps with annotations is usually right. Mapping every single tap or screen produces &apos;mile-wide, inch-deep&apos; documents that nobody updates. The failure mode is usually too much detail, not too little.",
  },
  {
    q: "Should PMs draw flows or leave that to designers?",
    a: "PMs sketch the shape; designers polish. A PM should be able to whiteboard a rough flow in 15 minutes. Designers translate that into high-fidelity screens and handle edge cases. PMs who can&apos;t sketch flows end up dependent on design for every scoping conversation — which slows everything down.",
  },
];

export default function PmUserFlowsPage() {
  const dates = pageDates("/pm-user-flows");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM User Flows", url: `${SITE_URL}/pm-user-flows` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM User Flows Guide (2026 Edition)",
        description:
          "How PMs map user flows that drive design and prioritisation. Happy path + edge cases, where to instrument, and how to spot friction that metrics miss.",
        image: `${SITE_URL}/api/og?title=PM+User+Flows+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-user-flows`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🧭</span> Every metric drop has an answer hiding in the user flow
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM User Flows Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Mapping a PM user flow means defining the goal state, sketching the happy path in five to eight steps, marking decision points, layering in edge cases, instrumenting every step, and reviewing with design and engineering. Doing this well surfaces friction—unnecessary choices, interruptions, redundant data requests—across the six flow types that matter most: onboarding, core action, activation, monetisation, recovery, and offboarding.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 steps to mapping user flows, 6 friction patterns to spot, and the 6 flow types
            every PM should analyse regularly.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Flow Intuition Daily — Free →
          </Link>
        </section>

        {/* Mapping steps */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Steps to Map a User Flow</h2>
          <div className="space-y-3">
            {MAPPING_STEPS.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-white text-sm mb-1">{i + 1}. {s.step}</p>
                <p className="text-xs text-white/60">{s.what}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Friction patterns */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Friction Patterns to Spot</h2>
            <div className="space-y-2">
              {FRICTION_PATTERNS.map((f, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-red-400 flex-shrink-0">⚠️</span>
                  <p className="text-sm text-white/70">{f}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Flow types */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Flow Types Every PM Should Analyse</h2>
          <div className="space-y-3">
            {FLOW_TYPES.map((f, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                  <p className="font-semibold text-white text-sm">{f.type}</p>
                  <span className="text-xs bg-[#58cc02]/20 text-[#89e219] px-2 py-0.5 rounded-full">{f.priority}</span>
                </div>
                <p className="text-xs text-white/60">{f.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
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

        <RelatedPages slug="pm-user-flows" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Train Flow Thinking Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on user journeys, friction diagnosis, and flow design.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
