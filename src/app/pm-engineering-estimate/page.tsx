import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Engineering Estimates (2026) — How to Work With Eng Timelines Without Becoming a Nuisance",
  description:
    "How PMs work with engineering estimates — respecting their expertise while keeping projects predictable. When to probe, when to trust, and how to handle slipping timelines.",
  keywords: [
    "PM engineering estimates", "PM eng timelines",
    "estimation PM", "scope vs timeline PM",
    "buffer time PM 2026",
  ],
  alternates: { canonical: "/pm-engineering-estimate" },
  openGraph: {
    title: "PM Engineering Estimates 2026 — PM Streak",
    description: "How PMs work with engineering estimates without becoming a nuisance — probe, trust, handle slips.",
    url: `${SITE_URL}/pm-engineering-estimate`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Engineering+Estimates+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Engineering Estimates 2026 — PM Streak",
    description: "How PMs work with engineering estimates without becoming a nuisance — probe, trust, handle slips.",
    images: [`${SITE_URL}/api/og?title=PM+Engineering+Estimates+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const WHAT_TO_ASK = [
  "What are the 3 biggest unknowns that could make this longer?",
  "What&apos;s the smallest version you could ship in half the time?",
  "What&apos;s blocking you — info from me, design, dependencies elsewhere?",
  "If we had to ship in X weeks, what would we cut?",
  "Where&apos;s the buffer in this estimate — how much risk are you factoring in?",
];

const WHAT_NOT_TO_DO = [
  "Pressure for a shorter estimate without cutting scope — erodes trust",
  "Compare against other teams&apos; estimates — context is different",
  "Reopen estimates mid-sprint — undermines commitment culture",
  "Use estimates as deadlines publicly — private estimates, public commitments",
  "Estimate engineering work yourself — you&apos;re not qualified",
];

const HANDLING_SLIPS = [
  "Surface slip early — &apos;we&apos;re on track to be 1 week late&apos; at week 1, not week 4",
  "Separate &apos;unexpected&apos; slip from &apos;bad estimate&apos; — different responses",
  "Work with eng to identify what can be cut to meet timeline (vs extending)",
  "Communicate to stakeholders before they ask — proactive beats reactive",
  "Post-mortem every major slip — extract learnings for next estimate cycle",
];

const BUILDING_TRUST = [
  "Respect their process — if they estimate 6 weeks, plan for 6 weeks",
  "Add buffer in your plans, not in asking for more — 20% buffer in PM plans",
  "Celebrate predictability as much as speed — &apos;shipped on time&apos; is a wins story",
  "Take the blame when scope expands mid-flight — you didn&apos;t scope enough upfront",
  "Never ask for unrealistic timelines to look ambitious — backfires within 1 quarter",
];

const FAQS = [
  {
    q: "How should PMs react when engineering says &apos;6 weeks&apos; for something they thought was 2 weeks?",
    a: "Ask, don&apos;t argue. &apos;Help me understand what&apos;s making this 6 weeks — where&apos;s the complexity?&apos; Often you&apos;ll learn something that changes scope. Sometimes you&apos;ll validate the estimate. Either way, probing through questions &gt; pushing back on the number. PMs who always argue estimates lose engineering trust fast.",
  },
  {
    q: "Should PMs learn to estimate engineering work themselves?",
    a: "Conceptually yes (helps with scope decisions), authoritatively no. Develop intuition for &apos;this feels like a 2-week vs 2-month thing&apos; but never overrule engineering on actual estimates. The failure mode: PMs who&apos;ve coded a bit thinking their estimate &gt; senior engineer&apos;s. Always respect the specialist.",
  },
];

export default function PmEngineeringEstimatePage() {
  const dates = pageDates("/pm-engineering-estimate");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Engineering Estimates", url: `${SITE_URL}/pm-engineering-estimate` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Engineering Estimates (2026 Edition)",
        description:
          "How PMs work with engineering estimates — respecting their expertise while keeping projects predictable. When to probe, when to trust, and how to handle slipping timelines.",
        image: `${SITE_URL}/api/og?title=PM+Engineering+Estimates+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-engineering-estimate`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>⏱️</span> Respect the estimate. Probe through questions. Cut scope, not time.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Engineering Estimates<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-2">
            Working well with engineering estimates means probing through questions — like where the
            biggest unknowns are or what could ship in half the time — rather than pressuring for a
            shorter number or reopening estimates mid-sprint. When a timeline slips, PMs surface it
            early, work with engineering on what to cut instead of extending, and add buffer into
            their own plans rather than asking engineers to pad theirs.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 questions to ask about estimates, 5 things not to do, 5 moves when things slip,
            and 5 ways to build estimation trust.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Execution Skills Daily — Free →
          </Link>
        </section>

        {/* What to ask */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Questions to Ask About Estimates</h2>
          <div className="space-y-2">
            {WHAT_TO_ASK.map((w, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{w}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What not to do */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Things NOT to Do</h2>
            <div className="space-y-2">
              {WHAT_NOT_TO_DO.map((w, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-red-400 flex-shrink-0">❌</span>
                  <p className="text-sm text-white/70">{w}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Handling slips */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Moves When Estimates Slip</h2>
          <div className="space-y-2">
            {HANDLING_SLIPS.map((h, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-yellow-400 font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{h}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Building trust */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Ways to Build Estimation Trust</h2>
            <div className="space-y-2">
              {BUILDING_TRUST.map((b, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{b}</p>
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

        <RelatedPages slug="pm-engineering-estimate" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Execution Muscle Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on scoping, trade-offs, and working with engineering.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
