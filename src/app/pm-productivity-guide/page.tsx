import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Productivity Guide (2026) — How Top Product Managers Get More Done",
  description:
    "How top PMs stay productive under constant demands. Time-blocking, async systems, saying no, and the productivity habits that separate high-output PMs from burned-out ones.",
  keywords: [
    "PM productivity", "product manager productivity",
    "how PMs stay productive", "PM time management",
    "PM work from home productivity 2026",
  ],
  alternates: { canonical: "/pm-productivity-guide" },
  openGraph: {
    title: "PM Productivity Guide 2026 — PM Streak",
    description: "How top PMs stay productive under constant demands — systems, habits, and saying no.",
    url: `${SITE_URL}/pm-productivity-guide`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Productivity+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Productivity Guide 2026 — PM Streak",
    description: "How top PMs stay productive under constant demands — systems, habits, and saying no.",
    images: [`${SITE_URL}/api/og?title=PM+Productivity+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const HABITS = [
  {
    habit: "Default to async",
    detail: "Most PM work that ends up in meetings could have been a doc + comments. Write first; meet only when async truly cannot resolve it. Async protects everyone&apos;s deep work.",
  },
  {
    habit: "Time-block like an engineer",
    detail: "Put 2–3 hour focus blocks on your calendar and protect them like code-review meetings. &apos;PRD writing block&apos; or &apos;strategy doc&apos; is as legitimate as any other meeting.",
  },
  {
    habit: "Say no with options",
    detail: "Never just say &apos;no.&apos; Say &apos;I can&apos;t do X this sprint, but I could do it next sprint&apos; or &apos;if we deprioritise Y, I could fit X in.&apos; No with options keeps trust."  ,
  },
  {
    habit: "Kill meetings you don&apos;t need",
    detail: "Every month, audit recurring meetings. If you&apos;ve attended 4 consecutive weeks without contributing, drop it. PMs are scheduled into many meetings that don&apos;t need them."  ,
  },
  {
    habit: "Batch reactive work",
    detail: "Don&apos;t check Slack continuously. Check 3 times/day in 30-min windows. Reactivity kills strategic work; batching contains it."  ,
  },
  {
    habit: "Write shorter docs",
    detail: "A crisp 1-pager with a clear ask beats a 5-pager that people skim. Every sentence you cut increases the chance your doc actually gets read and decided on."  ,
  },
  {
    habit: "Use a weekly priority doc",
    detail: "Every Monday, write the 3 most important outcomes for the week. Share with your manager. This forces focus and makes scope cuts easier when surprises happen."  ,
  },
  {
    habit: "Delegate to docs",
    detail: "When 5+ people ask you the same question, write a doc, share the link. Your time scales through writing — not through repeating the same answer."  ,
  },
];

const TOOLS = [
  { tool: "Calendar with focus blocks", why: "Visible deep work time; stakeholders learn when you&apos;re async." },
  { tool: "Notion / Confluence for decisions", why: "Single source of truth for decisions, PRDs, and docs. Search replaces reminding." },
  { tool: "Slack + Do Not Disturb", why: "Pair the tool with boundaries. DND during focus blocks is non-negotiable." },
  { tool: "Shortcut / Linear / Jira for work tracking", why: "Whatever your team uses — know it well enough to not need someone to navigate it for you." },
  { tool: "Weekly digest newsletter for your team", why: "A 5-bullet Friday async update beats 3 recurring status meetings. Protect your team&apos;s time too." },
];

const ANTI_PATTERNS = [
  "Saying yes to every meeting request",
  "Reading every Slack message in real time",
  "Rewriting docs to perfection instead of shipping and iterating",
  "Trying to solve every problem yourself instead of escalating or delegating",
  "Working through lunch and evenings consistently — this compounds into burnout, not output",
  "Treating busy as a status symbol — PMs who feel constantly frantic are usually under-prioritising, not over-contributing",
];

const FAQS = [
  {
    q: "How do PMs avoid burnout in high-demand roles?",
    a: "Systems beat willpower. The PMs who sustain output over years build systems: time-blocking, async defaults, protected deep work, explicit OKR prioritisation. PMs who rely on &apos;just work harder&apos; usually burn out within 2–3 years. Sustainable output requires deliberate boundaries — and good managers actively support PMs who set them.",
  },
  {
    q: "What&apos;s the single biggest productivity move for PMs?",
    a: "Default to async. PMs who push information into docs (PRDs, decision memos, weekly updates) instead of meetings reclaim 5–10 hours per week. The 15 minutes it takes to write a crisp async update often replaces a 45-minute meeting attended by 5 people. Net saving: hours of organisational time per update.",
  },
  {
    q: "How should PMs protect time for strategic work?",
    a: "Block 2–3 hours on your calendar every week for strategic work (writing strategy, reviewing metrics, user research). Make it recurring. Tell your manager what it&apos;s for. The strategic work that compounds over months is the first thing that gets crowded out by daily fires — protecting it is a deliberate PM skill, not an extra luxury.",
  },
];

export default function PmProductivityGuidePage() {
  const dates = pageDates("/pm-productivity-guide");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Productivity Guide", url: `${SITE_URL}/pm-productivity-guide` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Productivity Guide (2026 Edition)",
        description:
          "How top PMs stay productive under constant demands. Time-blocking, async systems, saying no, and the productivity habits that separate high-output PMs from burned-out ones.",
        image: `${SITE_URL}/api/og?title=PM+Productivity+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-productivity-guide`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>⚡</span> Great PMs aren&apos;t the busiest — they&apos;re the most deliberate
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Productivity Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Systems, not willpower, are what separate PMs who sustain high output from those who burn out — defaulting to async instead of meetings, time-blocking focus work, saying no with options, batching Slack instead of watching it continuously, and protecting 2–3 weekly hours for strategic work, all backed by tools like a focus-blocked calendar and a single source of truth for decisions.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            8 productivity habits that separate sustainable high-output PMs from burned-out ones,
            5 essential tools, and 6 anti-patterns to avoid.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Habits Daily — Free →
          </Link>
        </section>

        {/* Habits */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">8 Productivity Habits</h2>
          <div className="space-y-4">
            {HABITS.map((h, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <p className="font-bold text-white mb-1">{i + 1}. {h.habit}</p>
                <p className="text-xs text-white/60">{h.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tools */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Essential Tools</h2>
            <div className="space-y-3">
              {TOOLS.map((t, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-[#89e219] text-sm mb-1">{t.tool}</p>
                  <p className="text-xs text-white/60">{t.why}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Anti-patterns */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Productivity Anti-Patterns</h2>
          <div className="space-y-2">
            {ANTI_PATTERNS.map((a, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-red-400 flex-shrink-0">❌</span>
                <p className="text-sm text-white/70">{a}</p>
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

        <RelatedPages slug="pm-productivity-guide" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice PM Thinking in 2 Minutes a Day</h2>
          <p className="text-white/60 mb-6">Structured PM scenarios that fit into any productive week.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
