import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM 1:1 Guide (2026) — How Product Managers Run Great 1:1s",
  description:
    "How PMs run great 1:1s — with their manager, direct reports, and cross-functional partners. Agenda templates, question prompts, and the cadence that works.",
  keywords: [
    "PM 1:1", "product manager 1:1",
    "PM 1:1 agenda", "1:1 with manager PM",
    "how PM runs 1:1 with engineers", "PM 1:1 template 2026",
  ],
  alternates: { canonical: "/pm-1-on-1-guide" },
  openGraph: {
    title: "PM 1:1 Guide 2026 — PM Streak",
    description: "How PMs run great 1:1s — with managers, direct reports, and cross-functional peers.",
    url: `${SITE_URL}/pm-1-on-1-guide`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+1:1+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM 1:1 Guide 2026 — PM Streak",
    description: "How PMs run great 1:1s — with managers, direct reports, and cross-functional peers.",
    images: [`${SITE_URL}/api/og?title=PM+1:1+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const TYPES = [
  {
    type: "1:1 with Your Manager",
    frequency: "Weekly (30 min) or bi-weekly (45 min)",
    goal: "Align on priorities, surface risks, get feedback, build the relationship that determines your career trajectory",
    agenda: [
      "1 update on progress + what shipped",
      "1 risk or blocker you want help with",
      "1 strategic question where you want their perspective",
      "Explicit ask: &apos;How am I doing? What should I do more/less of?&apos;",
      "Career discussion (monthly, not every week)",
    ],
    tip: "Drive the agenda. Don&apos;t let it become a status update. Your manager&apos;s time is the most concentrated leverage you have — use it deliberately.",
  },
  {
    type: "1:1 with Engineering Lead",
    frequency: "Weekly (30 min)",
    goal: "Align on scope, unblock decisions, build partnership beyond ticket-by-ticket interactions",
    agenda: [
      "Current sprint: what&apos;s going well, what&apos;s at risk",
      "Decisions needed from you (scope, priority, trade-offs)",
      "Technical debt and platform work — how much can we invest?",
      "Upcoming roadmap: does the shape match their capacity?",
      "Team health: are there people issues or morale concerns to address together?",
    ],
    tip: "Engineering leads have context you don&apos;t. Ask questions instead of giving directives. &apos;What are you worried about?&apos; surfaces things no ticket captures.",
  },
  {
    type: "1:1 with Designer",
    frequency: "Weekly (30 min)",
    goal: "Align on product direction, co-own user experience, surface UX concerns before reviews",
    agenda: [
      "Current design work: feedback, open questions, constraints",
      "Upcoming product decisions where design input matters early",
      "User research: what are they hearing that you aren&apos;t?",
      "Cross-product consistency: concerns or opportunities",
    ],
    tip: "Designers often see UX issues early. Create space for them to share concerns without needing to &apos;prove&apos; them with data first.",
  },
  {
    type: "1:1 with Direct Report (if GPM/Director)",
    frequency: "Weekly (30 min) — protect this time aggressively",
    goal: "Develop them as a PM — not just review their work",
    agenda: [
      "Ask first: &apos;What&apos;s on your mind?&apos; — let them drive 60% of the time",
      "Career and growth: what&apos;s their next level, what&apos;s blocking them?",
      "Coaching on specific situations they&apos;re navigating",
      "Feedback in both directions — regular, specific, actionable",
      "Context on company/org decisions that affect them",
    ],
    tip: "Your direct reports&apos; development IS your output. Never cancel their 1:1 unless you have no choice. Canceling sends the message that they don&apos;t matter.",
  },
];

const QUESTION_PROMPTS = [
  { context: "When you&apos;re stuck on something", ask: "&apos;I&apos;m thinking about [decision]. How would you approach this?&apos;" },
  { context: "When you want feedback", ask: "&apos;What&apos;s one thing I could do differently to be more effective?&apos;" },
  { context: "When building relationship", ask: "&apos;What are you most excited about right now? What&apos;s frustrating you?&apos;" },
  { context: "When surfacing risk", ask: "&apos;I&apos;m worried about [X]. I don&apos;t need you to solve it — I just want you to know.&apos;" },
  { context: "When exploring career", ask: "&apos;If I were at the next level in 12 months, what would I be doing differently?&apos;" },
  { context: "When you disagree", ask: "&apos;I see this differently. Can I share my thinking and get your reaction?&apos;" },
];

const FAQS = [
  {
    q: "How should PMs prepare for 1:1s with their manager?",
    a: "5 minutes of prep before each 1:1 dramatically improves the meeting. Write down: 3 things you&apos;re working on, 1 thing you want their input on, 1 risk or blocker. This turns a potentially-drifting conversation into a focused one. Share the note in advance if your manager prefers — many do, even if they don&apos;t explicitly ask for it.",
  },
  {
    q: "What&apos;s the biggest mistake PMs make in 1:1s?",
    a: "Using the time as a status update. If your manager knows what you&apos;re working on from Slack, daily standups, or weekly updates, spending the 1:1 rehashing that is waste. The 1:1 is for the things that don&apos;t fit elsewhere: hard decisions, ambiguous situations, career discussions, feedback, and surfacing things that aren&apos;t yet ready for broadcast.",
  },
  {
    q: "Should 1:1s be weekly or bi-weekly?",
    a: "Weekly for most PM relationships — with your manager, primary engineering and design partners, and direct reports. Bi-weekly can work for secondary partners (marketing, data, other PMs). Monthly is usually too sparse to maintain real relationships — conversations become transactional rather than substantive. Protect weekly 1:1s aggressively; they&apos;re where real alignment happens.",
  },
];

export default function Pm1On1GuidePage() {
  const dates = pageDates("/pm-1-on-1-guide");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM 1:1 Guide", url: `${SITE_URL}/pm-1-on-1-guide` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM 1:1 Guide (2026 Edition)",
        description:
          "How PMs run great 1:1s — with their manager, direct reports, and cross-functional partners. Agenda templates, question prompts, and the cadence that works.",
        image: `${SITE_URL}/api/og?title=PM+1:1+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-1-on-1-guide`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>☕</span> 1:1s are where careers are made
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM 1:1 Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Great PM 1:1s follow a type-specific agenda: weekly check-ins with your manager to
            align on priorities and get feedback, weekly syncs with engineering leads and
            designers to unblock decisions, and protected weekly time with direct reports
            focused on their growth. Each meeting works best when the PM drives the agenda
            instead of turning it into a status update.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Agenda templates for 4 types of 1:1s (manager, engineering, design, reports),
            6 prompts that open real conversations, and how to never waste 1:1 time again.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Relationship Muscle — Free →
          </Link>
        </section>

        {/* Types */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="space-y-6">
            {TYPES.map((t, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <p className="font-bold text-white">{i + 1}. {t.type}</p>
                  <span className="text-xs bg-[#1f2228] border border-white/10 rounded-full px-2 py-1 text-white/60">{t.frequency}</span>
                </div>
                <p className="text-sm text-[#89e219] mb-3">🎯 Goal: {t.goal}</p>
                <div className="mb-3">
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Suggested Agenda</p>
                  <ul className="space-y-1">
                    {t.agenda.map((a, j) => (
                      <li key={j} className="flex gap-2 text-sm">
                        <span className="text-white/30 flex-shrink-0">→</span>
                        <span className="text-white/70">{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-lg p-3">
                  <p className="text-xs text-[#89e219]">💡 {t.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Question prompts */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Questions That Open Real Conversations</h2>
            <div className="space-y-3">
              {QUESTION_PROMPTS.map((q, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <p className="text-xs text-[#89e219] mb-1">{q.context}</p>
                  <p className="text-sm text-white/70 italic">{q.ask}</p>
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

        <RelatedPages slug="pm-1-on-1-guide" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Relationship Skills Daily</h2>
          <p className="text-white/60 mb-6">Scenarios on feedback, alignment, and managing up — with AI feedback.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
