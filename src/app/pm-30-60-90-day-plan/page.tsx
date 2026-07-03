import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM 30-60-90 Day Plan Template (2026) — What to Ship in Your First Quarter",
  description:
    "The 30-60-90 day PM plan template. Specific deliverables for each phase, how to share it with your manager, and what counts as a successful first quarter.",
  keywords: [
    "30 60 90 day plan PM", "product manager 30-60-90",
    "first 90 days PM template", "PM onboarding plan",
    "new PM first quarter 2026",
  ],
  alternates: { canonical: "/pm-30-60-90-day-plan" },
  openGraph: {
    title: "PM 30-60-90 Day Plan 2026 — PM Streak",
    description: "The 30-60-90 day plan template for new PMs — deliverables, sharing with manager, and what success looks like.",
    url: `${SITE_URL}/pm-30-60-90-day-plan`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+30-60-90+Day+Plan+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM 30-60-90 Day Plan 2026 — PM Streak",
    description: "The 30-60-90 day plan template for new PMs — deliverables, sharing with manager, and what success looks like.",
    images: [`${SITE_URL}/api/og?title=PM+30-60-90+Day+Plan+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PHASES = [
  {
    phase: "Days 1–30: Learn",
    theme: "Understand, don&apos;t propose",
    deliverables: [
      "1:1 notes from meeting every team member (engineering, design, CS, sales)",
      "Audit of existing PRDs, strategy docs, OKRs — what&apos;s current, what&apos;s stale",
      "5 customer interviews — what they love, what frustrates them",
      "Written &apos;current state&apos; doc covering metrics, users, competitors, product",
    ],
    meeting: "End of Day 30: share the current-state doc with your manager. Get their reactions and flags.",
  },
  {
    phase: "Days 31–60: Align",
    theme: "Develop your POV, get buy-in",
    deliverables: [
      "First draft of &apos;what I think we should do next&apos; — 3 concrete proposals",
      "Shared with manager + key stakeholders for feedback",
      "Scoped first ship: something meaningful + shippable in 4–6 weeks",
      "Engineering and design aligned on the first ship",
    ],
    meeting: "End of Day 60: present to your manager — what&apos;s your first bet, why, what timeline, what&apos;s the success metric?",
  },
  {
    phase: "Days 61–90: Ship",
    theme: "Deliver real impact",
    deliverables: [
      "First initiative shipped — on time, with instrumented metrics",
      "Post-launch review — what moved, what we learned",
      "Next-quarter OKRs drafted based on what you&apos;ve learned",
      "90-day self-review with your manager",
    ],
    meeting: "End of Day 90: show concrete impact. If the first ship didn&apos;t move the needle, show specifically what you learned and what you&apos;ll try next.",
  },
];

const SHARING_TEMPLATE = [
  "Share the plan in Week 1 — don&apos;t wait for it to be perfect",
  "Use the plan as a 1:1 anchor — update it weekly, review monthly",
  "Be specific about asks: &apos;I need 2 hours with engineering lead in Week 3&apos;",
  "Invite feedback explicitly: &apos;What am I missing? What would you deprioritise?&apos;",
  "Commit to the end-of-30 and end-of-60 checkpoints — they force reality testing",
];

const MISTAKES = [
  "Proposing changes in Week 1 before you have real context",
  "Trying to ship 3 things in 90 days instead of 1 impactful thing",
  "Over-investing in docs — the plan is a tool, not a deliverable",
  "Hiding progress from your manager — surprise = anxiety",
  "Treating Day 90 as the finish line — it&apos;s the real starting line",
  "Skipping the retrospective conversation at Day 90",
];

const FAQS = [
  {
    q: "Should PMs share their 30-60-90 plan with their manager?",
    a: "Yes, in Week 1. Sharing early gives your manager a chance to adjust expectations, flag pitfalls, and signal what they care most about. PMs who build the plan in isolation and reveal it at Day 30 miss 4 weeks of calibration. The plan is a conversation starter, not a deliverable.",
  },
  {
    q: "What if my first ship fails within 90 days?",
    a: "Handle it explicitly with your manager. Show: what you tried, what you learned, what you&apos;d do differently, and the next bet. A failed first ship with strong learning and a clear next step often lands better than a mediocre success. What kills credibility: hiding the failure, blaming others, or not having a clear next plan.",
  },
];

export default function Pm30_60_90DayPlanPage() {
  const dates = pageDates("/pm-30-60-90-day-plan");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM 30-60-90 Day Plan", url: `${SITE_URL}/pm-30-60-90-day-plan` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM 30-60-90 Day Plan Template (2026)",
        description: "The 30-60-90 day PM plan template. Specific deliverables for each phase, how to share it with your manager, and what counts as a successful first quarter.",
        image: `${SITE_URL}/api/og?title=PM+30-60-90+Day+Plan+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-30-60-90-day-plan`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📝</span> Learn. Align. Ship. Repeat.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM 30-60-90 Day Plan<br />Template (2026)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            A PM 30-60-90 day plan breaks the first quarter into three phases: Days 1–30 for
            learning the team and current state, Days 31–60 for aligning on a scoped first ship,
            and Days 61–90 for shipping and reviewing real impact. Share it with your manager in
            Week 1, not at Day 30.
          </p>
          <p className="text-sm text-white/40 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-white/60 hover:text-[#89e219] underline underline-offset-2">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Stay Sharp Daily — Free →
          </Link>
        </section>

        {/* Phases */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="space-y-5">
            {PHASES.map((p, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <p className="font-bold text-white mb-1">{p.phase}</p>
                <p className="text-sm text-[#89e219] mb-4">🎯 Theme: {p.theme}</p>
                <div className="mb-3">
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Deliverables</p>
                  <ul className="space-y-1">
                    {p.deliverables.map((d, j) => (
                      <li key={j} className="flex gap-2 text-sm">
                        <span className="text-white/30 flex-shrink-0">☐</span>
                        <span className="text-white/70">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-lg p-3">
                  <p className="text-xs text-[#89e219]">📅 Milestone meeting: <span className="text-white/70">{p.meeting}</span></p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sharing template */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">How to Share the Plan with Your Manager</h2>
            <div className="space-y-2">
              {SHARING_TEMPLATE.map((s, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{s}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mistakes */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Mistakes That Derail the First Quarter</h2>
          <div className="space-y-2">
            {MISTAKES.map((m, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-red-400 flex-shrink-0">❌</span>
                <p className="text-sm text-white/70">{m}</p>
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

        <RelatedPages slug="pm-30-60-90-day-plan" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Stay Sharp Before and During Your New Role</h2>
          <p className="text-white/60 mb-6">Daily PM scenarios keep you fluent in product, metrics, and stakeholder thinking.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
