import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Execution Interview Questions (2026) — Delivery, Ops & Sprint Management",
  description:
    "Master PM execution interview questions. Sprint planning, launch management, trade-off decisions, handling blockers, and cross-functional coordination — with real questions and model answers.",
  keywords: [
    "PM execution interview questions", "product manager execution interview",
    "sprint planning PM interview", "PM delivery interview questions",
    "how to answer execution questions PM", "product launch interview PM 2026",
  ],
  alternates: { canonical: "/pm-execution-interview" },
  openGraph: {
    title: "PM Execution Interview Questions 2026 — PM Streak",
    description: "Sprint planning, launch management, and delivery questions for PM interviews.",
    url: `${SITE_URL}/pm-execution-interview`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Execution+Interview+Questions+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Execution Interview Questions 2026 — PM Streak",
    description: "Sprint planning, launch management, and delivery questions for PM interviews.",
    images: [`${SITE_URL}/api/og?title=PM+Execution+Interview+Questions+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const CATEGORIES = [
  {
    theme: "Sprint & Backlog Management",
    icon: "📋",
    questions: [
      {
        q: "How do you manage a situation where engineering re-estimates mid-sprint and you can only ship half of what was planned?",
        model: "Immediately triage: what must ship for any value to be delivered? What can be deferred without blocking downstream teams? Communicate changes to stakeholders with the revised scope and expected date — never let them discover slippage in a demo.",
      },
      {
        q: "Walk me through how you write a user story. What makes a good one?",
        model: "A good user story: clear user persona, clear job to be done ('so that'), acceptance criteria written in testable language, and explicit out-of-scope items. Bad user stories describe implementation, not outcome. I always ask: 'Could QA write a test case from this?'",
      },
      {
        q: "How do you decide when a bug is high enough priority to interrupt the current sprint?",
        model: "I use a severity + exposure matrix: how bad is the experience × how many users are affected × is there a workaround? P0 (product breaks for all users with no workaround) interrupts immediately. Everything else goes on a priority queue for the next sprint start.",
      },
    ],
  },
  {
    theme: "Launch Management",
    icon: "🚀",
    questions: [
      {
        q: "Walk me through how you manage a product launch end-to-end.",
        model: "Pre-launch: align on launch criteria, prepare rollback plan, QA sign-off, support team briefed. Launch: staged rollout (10%→50%→100%), monitor key metrics in real-time. Post-launch: 24-hour review, document learnings, share results with stakeholders. A launch isn't done until metrics stabilise.",
      },
      {
        q: "Tell me about a time a launch went wrong. How did you handle it?",
        model: "Admit the mistake quickly, understand the root cause before making decisions, communicate proactively (not reactively) to stakeholders, roll back if the harm outweighs the benefit, and write a post-mortem that names the process failure — not the people.",
      },
      {
        q: "How do you decide when a feature is 'done enough' to ship vs needing more polish?",
        model: "I compare: does the current state deliver the core user job better than the alternative (which is not shipping at all)? I also check: is the edge case we're holding for something that affects >5% of users? If yes, fix it. If no, ship and iterate.",
      },
    ],
  },
  {
    theme: "Cross-functional Coordination",
    icon: "🤝",
    questions: [
      {
        q: "Your design and engineering leads have a technical disagreement that's blocking the sprint. What do you do?",
        model: "First, get them in a room together (not a thread). Have each state their constraint clearly. Usually the disagreement is about trade-offs that haven't been made explicit — my job is to make those trade-offs visible and help the team decide, not to pick a side.",
      },
      {
        q: "How do you keep a cross-functional team aligned when priorities shift?",
        model: "I over-communicate changes in writing before stand-ups. I maintain a shared 'why this matters' document that the whole team can reference. I run a weekly 10-minute sync that covers: what we shipped, what changed, and what needs decisions. Alignment decays without maintenance.",
      },
      {
        q: "How do you manage dependencies on another team that's slower than yours?",
        model: "First, understand their constraints — don't assume they're slow. Then, can I decouple? Can we agree on an interface/API contract now and build in parallel? Can I negotiate a milestone that unblocks us even if the full dependency isn't ready? I treat other teams as customers, not blockers.",
      },
    ],
  },
  {
    theme: "Handling Ambiguity & Pressure",
    icon: "🌫️",
    questions: [
      {
        q: "Your team is 2 weeks from a committed launch date and a critical bug is found. What do you do?",
        model: "Quantify the bug: how critical, who's affected, is there a workaround? If ship-blocking, immediately assess: can it be fixed in time? Can scope be cut to avoid the issue? If we need to slip the date, communicate early and with options — not problems. Never hide slippage.",
      },
      {
        q: "How do you handle a situation where your engineering team says something is 'technically impossible' but you're not sure that's true?",
        model: "Respect the assessment but ask to understand the constraint. 'Impossible' often means 'very expensive' or 'impossible with current architecture.' I'll ask: what would make it possible? What's the fastest way to validate if there's a workaround? Sometimes the PM's job is to keep asking 'is this really the only path?'",
      },
    ],
  },
];

const FAQS = [
  {
    q: "Why do PM interviews include execution questions?",
    a: "Product management is 80% execution and 20% strategy — but most candidates over-prepare for strategy and under-prepare for execution. Interviewers use execution questions to assess: can you manage real teams, real trade-offs, and real pressure? Strong execution answers reference specific processes, not generic platitudes.",
  },
  {
    q: "What's the difference between execution questions and behavioral questions?",
    a: "Execution questions ask HOW you do things ('Walk me through your sprint process'). Behavioral questions ask about specific past events ('Tell me about a time a launch went wrong'). Execution answers are more process-oriented; behavioral answers are story-based with the STAR framework. Both need specificity — vague answers fail both types.",
  },
];

export default function PmExecutionInterviewPage() {
  const dates = pageDates("/pm-execution-interview");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Execution Interview", url: `${SITE_URL}/pm-execution-interview` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Execution Interview Questions (2026)",
        description:
          "Master PM execution interview questions. Sprint planning, launch management, trade-off decisions, handling blockers, and cross-functional coordination — with real questions and model answers.",
        image: `${SITE_URL}/api/og?title=PM+Execution+Interview+Questions+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-execution-interview`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🚀</span> Strategy gets you in the room. Execution keeps you there.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Execution Interview<br />Questions (2026)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Execution questions in a PM interview ask how you actually run things — sprint and backlog management,
            end-to-end launches, cross-functional coordination, and decisions under pressure. Unlike behavioral rounds
            that probe past events, these are process questions, and strong answers cite specific processes like staged
            rollouts or severity-times-exposure bug triage rather than generic platitudes. Each question below includes
            a model answer direction.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Sprint management, launch planning, cross-functional coordination, and handling pressure —
            the execution questions most candidates fail to prepare for.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice Execution Questions — Free →
          </Link>
        </section>

        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="space-y-8">
            {CATEGORIES.map(cat => (
              <div key={cat.theme} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-2xl">{cat.icon}</span>
                  <h2 className="text-lg font-semibold text-white">{cat.theme}</h2>
                </div>
                <div className="space-y-5">
                  {cat.questions.map((item, i) => (
                    <div key={i} className="border border-white/5 rounded-xl p-4">
                      <p className="font-medium text-white mb-3">&ldquo;{item.q}&rdquo;</p>
                      <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-lg p-3">
                        <p className="text-xs text-[#89e219] mb-1">✅ Model answer direction</p>
                        <p className="text-sm text-white/70">{item.model}</p>
                      </div>
                    </div>
                  ))}
                </div>
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

        <RelatedPages slug="pm-execution-interview" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice the Questions Most Candidates Skip</h2>
          <p className="text-white/60 mb-6">Daily execution scenarios with AI feedback calibrated to real PM interview standards.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
