import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Failure Recovery Guide (2026) — When Your Product or Launch Fails",
  description:
    "How to handle PM failures — failed launches, missed metrics, shipped features nobody used. Recovery steps, post-mortems, career protection, and lessons that compound.",
  keywords: [
    "PM failure", "failed product launch",
    "PM post mortem", "how PMs recover from failure",
    "shipped feature no adoption 2026",
  ],
  alternates: { canonical: "/pm-failures-recovery" },
  openGraph: {
    title: "PM Failure Recovery Guide 2026 — PM Streak",
    description: "When your launch fails, your metric misses, or your feature gets no adoption — what to do next.",
    url: `${SITE_URL}/pm-failures-recovery`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Failure+Recovery+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Failure Recovery Guide 2026 — PM Streak",
    description: "When your launch fails, your metric misses, or your feature gets no adoption — what to do next.",
    images: [`${SITE_URL}/api/og?title=PM+Failure+Recovery+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const FAILURE_TYPES = [
  {
    type: "Launch day disaster",
    what: "Metrics crash. Bugs everywhere. Users complain loudly.",
    recovery: "Roll back or hotfix immediately. Communicate transparently to affected users and stakeholders. Write a post-mortem within 48 hours. Most launches recover if handled with urgency and honesty.",
  },
  {
    type: "Shipped feature, zero adoption",
    what: "Feature lives in production but users aren&apos;t finding or using it.",
    recovery: "Resist the urge to add more features to fix it. Do user research FIRST: is the problem awareness, UX friction, or that the feature doesn&apos;t solve a real problem? The answer dictates completely different recovery paths.",
  },
  {
    type: "Missed quarterly metrics",
    what: "OKRs are red. Leadership is asking questions.",
    recovery: "Own it early. Present the honest reason (not excuses), what you learned, what you&apos;ll do differently, and your updated forecast. Leadership often respects honesty more than the original miss. Spin or hide = career damage.",
  },
  {
    type: "Strategic bet that doesn&apos;t pan out",
    what: "The big bet you championed isn&apos;t working after 6+ months.",
    recovery: "Kill it cleanly. Don&apos;t let sunk cost keep it alive. Write what you learned and what would have to be true for you to try again. Leaders who kill their own failing bets earn credibility for future ones.",
  },
  {
    type: "Team or cross-functional breakdown",
    what: "Engineering stopped trusting you. Design feels shut out. Sales is frustrated.",
    recovery: "1:1s with each affected person. Listen first, without defending. Acknowledge specific moments where you contributed to the breakdown. Rebuild through consistent behaviour over weeks, not through a single apology email.",
  },
];

const POSTMORTEM_TEMPLATE = [
  { section: "What happened", what: "Factual, blameless description. No spin." },
  { section: "What we expected", what: "The hypothesis or assumption going in." },
  { section: "What was different", what: "The gap between expectation and reality." },
  { section: "Root cause(s)", what: "Not surface-level reasons. The actual systemic or decision cause." },
  { section: "What we&apos;ll do differently", what: "Specific, actionable changes — not &apos;communicate better&apos; platitudes." },
  { section: "What we won&apos;t change", what: "Explicit. Often as important as what you will change." },
];

const CAREER_PROTECTION = [
  "Surface the failure to your manager EARLY — before they hear it elsewhere",
  "Own the specific decisions you made, without scapegoating the team",
  "Document learnings publicly — turn a failure into team capital",
  "Don&apos;t over-promise your recovery plan — small honest commitments beat big vague ones",
  "Give yourself a week to process before writing the post-mortem — fresh wounds produce bad writing",
  "Ask trusted peers for honest reads on your recovery — blind spots are common after failures",
];

const FAQS = [
  {
    q: "Do PM failures kill careers?",
    a: "Very rarely. Most senior PMs have multiple documented failures in their history — what separates them isn&apos;t avoiding failure, it&apos;s how they handled each one. What kills PM careers: hiding failures, blaming others, failing to learn, repeating the same mistakes. Handled well, a public failure and recovery often accelerates trust and career growth more than a string of mediocre successes.",
  },
  {
    q: "Should PMs share failure stories in interviews?",
    a: "Yes — interviewers specifically probe for failure stories. Candidates who claim they&apos;ve never had a meaningful failure signal either inexperience or lack of self-awareness. Prepare 2 specific failure stories with honest ownership, clear learnings, and evidence you applied those learnings later. These often score better than success stories.",
  },
  {
    q: "How quickly should you recover after a PM failure?",
    a: "Acute recovery (roll back, hotfix, immediate stakeholder comms): 24–48 hours. Post-mortem and learning: 1–2 weeks. Career rebuild after a major visible failure: 3–6 months of consistent behaviour. The biggest mistake is rushing past the learning phase to &apos;move on&apos; — failures that aren&apos;t processed deeply tend to repeat.",
  },
];

export default function PmFailuresRecoveryPage() {
  const dates = pageDates("/pm-failures-recovery");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Failure Recovery", url: `${SITE_URL}/pm-failures-recovery` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Failure Recovery Guide (2026 Edition)",
        description:
          "How to handle PM failures — failed launches, missed metrics, shipped features nobody used. Recovery steps, post-mortems, career protection, and lessons that compound.",
        image: `${SITE_URL}/api/og?title=PM+Failure+Recovery+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-failures-recovery`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🧯</span> How PMs handle failure matters more than how often they fail
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Failure Recovery Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Five failure types show up again and again for PMs — launch-day disasters, zero-adoption features, missed quarterly metrics, strategic bets that don&apos;t pan out, and cross-functional breakdowns — and each needs a different recovery move, from rolling back a bad launch within 48 hours to killing a failing bet cleanly instead of chasing sunk cost. What protects a PM&apos;s career most is honest ownership, not avoiding failure.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 common PM failure types and how to recover from each, a 6-section post-mortem template,
            and 6 career-protection moves when things go sideways.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Resilience Daily — Free →
          </Link>
        </section>

        {/* Failure types */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Common PM Failure Types</h2>
          <div className="space-y-5">
            {FAILURE_TYPES.map((f, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-5">
                <p className="font-bold text-white mb-1">{i + 1}. {f.type}</p>
                <p className="text-sm text-white/60 mb-3">{f.what}</p>
                <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3">
                  <p className="text-xs text-green-400 mb-1">✅ Recovery</p>
                  <p className="text-sm text-white/70">{f.recovery}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Post-mortem template */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6-Section Post-Mortem Template</h2>
            <div className="space-y-3">
              {POSTMORTEM_TEMPLATE.map((p, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-white text-sm mb-1">{i + 1}. {p.section}</p>
                  <p className="text-xs text-white/60">{p.what}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Career protection */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Career Protection Moves</h2>
          <div className="space-y-2">
            {CAREER_PROTECTION.map((c, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{c}</p>
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

        <RelatedPages slug="pm-failures-recovery" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Judgment Daily</h2>
          <p className="text-white/60 mb-6">Scenarios that force you to navigate failure, recovery, and hard trade-offs.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
