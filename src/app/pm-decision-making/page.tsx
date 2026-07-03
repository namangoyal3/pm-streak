import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Decision Making Guide (2026) — How Great PMs Decide Under Uncertainty",
  description:
    "How PMs make fast, confident decisions with incomplete data. Frameworks for reversible vs irreversible, risk-adjusted decisions, and how to document decisions so teams stay aligned.",
  keywords: [
    "PM decision making", "product manager decision framework",
    "how PMs decide", "reversible irreversible decisions PM",
    "Bezos decision framework PM 2026",
  ],
  alternates: { canonical: "/pm-decision-making" },
  openGraph: {
    title: "PM Decision Making Guide 2026 — PM Streak",
    description: "How great PMs decide under uncertainty — frameworks, risk models, and decision docs.",
    url: `${SITE_URL}/pm-decision-making`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Decision+Making+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Decision Making Guide 2026 — PM Streak",
    description: "How great PMs decide under uncertainty — frameworks, risk models, and decision docs.",
    images: [`${SITE_URL}/api/og?title=PM+Decision+Making+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const FRAMEWORKS = [
  {
    framework: "Reversible vs Irreversible (Bezos&apos; one-way / two-way doors)",
    what: "Two-way door decisions (reversible) should be made fast, by fewer people, with less analysis. One-way door decisions (irreversible) deserve deep analysis and broad alignment.",
    example: "Feature flag rollout = two-way door. Removing a product feature users depend on = one-way door. PMs who treat all decisions as one-way doors become bottlenecks.",
  },
  {
    framework: "Regret Minimisation",
    what: "Project yourself 5 years out. Which option would you regret more — doing this and having it fail, or NOT doing this and missing the opportunity?",
    example: "Useful for big strategic bets. Common result: the regret of not trying tends to outweigh the regret of trying and failing. Bias your decisions accordingly.",
  },
  {
    framework: "Expected Value (EV)",
    what: "Value × probability, summed across outcomes. Rational framing for decisions where you can estimate probabilities and impact.",
    example: "If a feature has 60% chance of +10M revenue and 40% chance of +0, EV = 6M. Compare across options and pick highest EV. Works well in experimentation; poorly in true uncertainty.",
  },
  {
    framework: "Inversion (what makes us fail?)",
    what: "Instead of asking &apos;how do we succeed?&apos; ask &apos;what would make this fail spectacularly?&apos; Then prevent those failure modes.",
    example: "For a launch: &apos;what would make this fail?&apos; → rollback plan unclear, metrics not instrumented, ops not briefed. Fix those before shipping rather than discovering them in production.",
  },
  {
    framework: "70% Rule (Bezos)",
    what: "Make decisions with 70% of the information you&apos;d want. Waiting for 90% means you&apos;re slow. Acting at 50% means you&apos;re reckless.",
    example: "Most PM decisions can be made at 70% confidence. The remaining 30% either doesn&apos;t materially change the decision or will clarify faster once you&apos;ve acted.",
  },
];

const DECISION_DOC_TEMPLATE = [
  { section: "Decision", what: "One sentence stating what we&apos;re deciding." },
  { section: "Context", what: "Why we&apos;re deciding now. What changed or what problem we&apos;re solving." },
  { section: "Options Considered", what: "3–5 options including the null option. For each: pros, cons, rough cost." },
  { section: "Recommendation", what: "Chosen option with explicit reasoning. Not just &apos;best option&apos; — WHY." },
  { section: "Risks & Mitigations", what: "Top 3 things that could go wrong and what we&apos;ll do if they do." },
  { section: "Reversibility", what: "Is this a one-way or two-way door? If one-way, extra justification needed." },
  { section: "Decision Maker + Decided On", what: "Name + date. Explicit accountability." },
  { section: "Review Date", what: "When will we revisit? &apos;90 days after launch&apos; or &apos;next quarterly review.&apos;" },
];

const SPEED_QUALITY_MOVES = [
  { move: "Default to faster decisions on two-way doors", why: "If you can revert, decide quickly. The cost of slow decisions on reversible items is higher than the cost of occasional wrong calls." },
  { move: "Write the decision doc in 30 minutes, not 3 hours", why: "Decision docs are tools for thought and alignment, not polish pieces. Shipping-standard quality kills decision velocity." },
  { move: "Decide in the meeting, don&apos;t defer", why: "PMs who leave every meeting with &apos;let&apos;s think about it&apos; accumulate decision debt that slows the whole team." },
  { move: "Pre-commit to review windows", why: "&apos;We&apos;ll revisit in 90 days&apos; makes it easier to decide now. Without a review window, decisions feel permanent — which delays them." },
  { move: "Know when to escalate vs own", why: "Escalate when the decision is above your level, has cross-team ramifications, or is genuinely novel. Own the rest. Constant escalation signals weak PM judgment." },
];

const FAQS = [
  {
    q: "How do PMs decide when they don&apos;t have enough data?",
    a: "Recognise that &apos;enough data&apos; is rarely achievable for PM decisions. Use the 70% rule: decide when you have 70% of the information you&apos;d want. For the remaining 30%, quantify the downside if you&apos;re wrong. If the downside is bounded and reversible, decide and learn from the outcome. If the downside is severe and irreversible, invest in more research before deciding.",
  },
  {
    q: "What&apos;s the biggest PM decision-making mistake?",
    a: "Deferring too many decisions. PMs who try to optimise every call slow the team, create ambiguity, and lose credibility. The best PMs make fast calls on reversible decisions and create space for thoughtful calls on irreversible ones. Most PM decisions are reversible — treat them as such.",
  },
  {
    q: "How should PMs document decisions?",
    a: "A 1-page decision doc is usually enough — decision, context, options considered, recommendation with reasoning, risks, reversibility, decision maker, review date. Store in a shared wiki (Notion/Confluence) where anyone can find the history. Six months later, when someone asks &apos;why did we decide X?&apos; you&apos;ll have an answer that isn&apos;t memory-dependent.",
  },
];

export default function PmDecisionMakingPage() {
  const dates = pageDates("/pm-decision-making");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Decision Making", url: `${SITE_URL}/pm-decision-making` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Decision Making Guide (2026 Edition)",
        description:
          "How PMs make fast, confident decisions with incomplete data. Frameworks for reversible vs irreversible, risk-adjusted decisions, and how to document decisions so teams stay aligned.",
        image: `${SITE_URL}/api/og?title=PM+Decision+Making+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-decision-making`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>⚖️</span> Slow decisions cost more than occasional wrong ones
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Decision Making Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Two-way-door speed, regret minimisation, expected value, inversion, and Bezos&apos; 70% rule make up the five
            decision frameworks in this guide, each paired with a worked example like feature-flag rollouts versus
            removing a feature users depend on. Pair any of them with the guide&apos;s one-page decision doc — decision,
            context, options considered, recommendation, risks, reversibility, owner, and review date — and a call stops getting relitigated months later.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 decision frameworks PMs should know, an 8-part decision doc template,
            and 5 moves that balance speed and quality of decisions.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice PM Judgment Daily — Free →
          </Link>
        </section>

        {/* Frameworks */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Decision Frameworks for PMs</h2>
          <div className="space-y-5">
            {FRAMEWORKS.map((f, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-5">
                <p className="font-bold text-white mb-2">{i + 1}. {f.framework}</p>
                <p className="text-sm text-white/70 mb-2">{f.what}</p>
                <p className="text-xs text-[#89e219]">💡 Example: <span className="text-white/70">{f.example}</span></p>
              </div>
            ))}
          </div>
        </section>

        {/* Decision doc */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-3">The 1-Page Decision Doc Template</h2>
            <p className="text-white/60 text-center mb-8">8 sections, ~30 minutes to write, saves weeks of re-litigation later.</p>
            <div className="space-y-3">
              {DECISION_DOC_TEMPLATE.map((d, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-white text-sm mb-1">{i + 1}. {d.section}</p>
                  <p className="text-xs text-white/60">{d.what}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Speed vs quality */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Moves to Balance Speed &amp; Quality</h2>
          <div className="space-y-3">
            {SPEED_QUALITY_MOVES.map((m, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-white text-sm mb-1">{i + 1}. {m.move}</p>
                <p className="text-xs text-white/60">{m.why}</p>
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

        <RelatedPages slug="pm-decision-making" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Judgment in 2 Minutes a Day</h2>
          <p className="text-white/60 mb-6">Decision scenarios with AI feedback — calibrate your instincts over time.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
