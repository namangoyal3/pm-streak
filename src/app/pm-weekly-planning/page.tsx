import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Weekly Planning Guide (2026) — How Great PMs Plan Their Week",
  description:
    "How great PMs plan their week. The 60-minute weekly planning ritual, the 70-20-10 time split, weekly review habits, and how to protect deep work in a meeting-heavy role.",
  keywords: [
    "PM weekly planning", "product manager time management",
    "how PMs plan week", "PM calendar management",
    "PM deep work", "product manager productivity 2026",
  ],
  alternates: { canonical: "/pm-weekly-planning" },
  openGraph: {
    title: "PM Weekly Planning Guide 2026 — PM Streak",
    description: "How great PMs plan their week — rituals, time splits, and protecting deep work.",
    url: `${SITE_URL}/pm-weekly-planning`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Weekly+Planning+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Weekly Planning Guide 2026 — PM Streak",
    description: "How great PMs plan their week — rituals, time splits, and protecting deep work.",
    images: [`${SITE_URL}/api/og?title=PM+Weekly+Planning+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const TIME_SPLIT = [
  { category: "Execution & decisions (70%)", what: "PRD writing, decision docs, code reviews, design reviews, stand-ups, 1:1s, Slack triage", detail: "The daily grind of running your product area. This shouldn&apos;t compress further — it&apos;s the core job." },
  { category: "Discovery & research (20%)", what: "User interviews, data exploration, product teardowns, competitor research, reading", detail: "Continuous discovery is what separates PMs who ship good features from PMs who ship the right features." },
  { category: "Strategy & reflection (10%)", what: "Writing strategy docs, quarterly planning, 1:1 prep, personal retros, deliberate learning", detail: "This is the first thing that gets cut when busy. It&apos;s also the highest-leverage use of PM time." },
];

const WEEKLY_RITUAL = [
  {
    step: "Friday PM review (30 min)",
    what: "What did I ship this week? What moved? What slipped? What did I learn? What needs attention next week?",
    output: "A short written note to yourself and maybe your team — forces honest reflection.",
  },
  {
    step: "Sunday night preview (15 min)",
    what: "Read next week&apos;s calendar. Identify: what are the 3 most important outcomes this week? What meetings can be skipped or shortened?",
    output: "A prioritised list of 3 weekly outcomes — everything else is noise.",
  },
  {
    step: "Monday morning planning (15 min)",
    what: "Time-block deep work. Write out daily priorities. Check in on blockers before they become fires.",
    output: "A calendar with protected blocks and a visible daily priority.",
  },
  {
    step: "Daily 5-min check-in",
    what: "First 5 minutes of every day — what&apos;s the one thing that must ship today? Everything else is secondary.",
    output: "Consistent daily focus on the thing that matters most.",
  },
];

const DEEP_WORK_TACTICS = [
  { tactic: "Block 2–3 hour sessions, not 30-min scattered slots", why: "PM work needs context-loading. Short blocks are used for reactive tasks — not deep thinking." },
  { tactic: "Protect mornings for deep work when possible", why: "Cognitive bandwidth is highest in the first 3 hours of your day. Don&apos;t spend it on standups and Slack." },
  { tactic: "Batch meetings into 2–3 windows per week", why: "A day split into 8 fragments gets nothing done. Batching creates real execution windows." },
  { tactic: "Decline meetings that lack clear agendas", why: "PMs are a scheduling magnet. Saying no politely to vague meetings reclaims 3–5 hours/week." },
  { tactic: "Turn off Slack for deep work blocks", why: "Slack reactivity is the enemy of strategic work. Commit to async: people can wait 2 hours." },
  { tactic: "End-of-week planning beats start-of-week planning", why: "Planning Friday for Monday means Monday starts with clarity instead of scrambling to reorient." },
];

const FAQS = [
  {
    q: "How much time should PMs spend in meetings each week?",
    a: "15–25 hours is typical for mid-level PMs; 25–35 hours for senior PMs with more stakeholders. Beyond 30 hours consistently, you&apos;re in meeting overload and your execution will suffer. Audit your calendar quarterly: categorise meetings as &apos;essential / useful / skippable&apos; and ruthlessly cut the skippable. Meeting minimisation is a skill senior PMs develop deliberately.",
  },
  {
    q: "How do you protect deep work as a PM when you&apos;re constantly pinged?",
    a: "Three things compound: (1) time-block 2–3 hour focus sessions on your calendar — visible to teammates, (2) set expectations with your team that Slack responses during these blocks will be slow (and stick to it), (3) use status messages that signal you&apos;re heads-down. PMs who protect deep work ship more and feel less overwhelmed than PMs who stay reactive.",
  },
  {
    q: "What&apos;s the biggest time management mistake PMs make?",
    a: "Saying yes to every ask. PMs get pulled into every cross-functional conversation because they have context. Every &apos;yes&apos; is a &apos;no&apos; to your core work. Great PMs decline meetings with no agenda, delegate where possible, and direct people to docs instead of answering the same question in 5 separate Slack threads. Saying no politely is a learnable skill — one that saves 5–10 hours/week once you develop it.",
  },
];

export default function PmWeeklyPlanningPage() {
  const dates = pageDates("/pm-weekly-planning");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Weekly Planning", url: `${SITE_URL}/pm-weekly-planning` },
      ])} />
      <JsonLd data={articleSchema({
        headline: "PM Weekly Planning Guide (2026 Edition)",
        description: "How great PMs plan their week. The 60-minute weekly planning ritual, the 70-20-10 time split, weekly review habits, and how to protect deep work in a meeting-heavy role.",
        image: `${SITE_URL}/api/og?title=PM+Weekly+Planning+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-weekly-planning`,
      })} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📅</span> 60 minutes of planning saves 5 hours of chaos
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Weekly Planning Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Great PM weekly planning splits time into a 70-20-10 rhythm — 70% execution and
            decisions, 20% discovery and research, 10% strategy and reflection — anchored by a
            60-minute ritual: a Friday review, a Sunday preview, Monday morning time-blocking, and a
            daily five-minute check-in. Protecting 2–3 hour deep-work blocks and declining
            agenda-less meetings are what keep that split from collapsing into reactive Slack triage.
          </p>
          <p className="text-sm text-white/50 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The 70-20-10 PM time split, a 60-minute weekly planning ritual,
            and 6 tactics to protect deep work in a meeting-heavy role.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Habits Daily — Free →
          </Link>
        </section>

        {/* Time split */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-3">The 70-20-10 PM Time Split</h2>
          <p className="text-white/60 text-center mb-8">Where great PMs actually spend their week.</p>
          <div className="space-y-4">
            {TIME_SPLIT.map((t, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <p className="font-bold text-white mb-1">{t.category}</p>
                <p className="text-sm text-white/60 mb-2">{t.what}</p>
                <p className="text-xs text-[#89e219] italic">{t.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Weekly ritual */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">The 60-Minute Weekly Planning Ritual</h2>
            <div className="space-y-4">
              {WEEKLY_RITUAL.map((r, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                  <p className="font-bold text-white mb-1">{i + 1}. {r.step}</p>
                  <p className="text-sm text-white/60 mb-2">{r.what}</p>
                  <p className="text-xs text-green-400">📝 Output: <span className="text-white/70">{r.output}</span></p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Deep work */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Tactics to Protect Deep Work</h2>
          <div className="space-y-3">
            {DEEP_WORK_TACTICS.map((d, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-white text-sm mb-1">{i + 1}. {d.tactic}</p>
                <p className="text-xs text-white/60">{d.why}</p>
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

        <RelatedPages slug="pm-weekly-planning" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Make Daily PM Practice a Habit</h2>
          <p className="text-white/60 mb-6">2 minutes a day — structured PM practice that fits into any week.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
