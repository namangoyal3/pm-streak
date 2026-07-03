import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Leadership Guide (2026) — How Product Managers Lead Without Authority",
  description:
    "How PMs lead without authority. Building trust, decision-making, managing up, developing other PMs, and the leadership skills that separate senior from principal PM.",
  keywords: [
    "PM leadership", "product manager leadership",
    "how PM leads without authority", "PM managing up",
    "PM management skills", "senior PM leadership 2026",
  ],
  alternates: { canonical: "/pm-leadership-guide" },
  openGraph: {
    title: "PM Leadership Guide 2026 — PM Streak",
    description: "How PMs lead without authority — trust, decision-making, managing up, and developing PMs.",
    url: `${SITE_URL}/pm-leadership-guide`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Leadership+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Leadership Guide 2026 — PM Streak",
    description: "How PMs lead without authority — trust, decision-making, managing up, and developing PMs.",
    images: [`${SITE_URL}/api/og?title=PM+Leadership+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const LEADERSHIP_LEVELS = [
  {
    level: "Leading Yourself",
    stage: "Associate / Early PM",
    what: "Deliver reliably. Own your sprint. Communicate proactively. Become the PM who others can count on.",
    signals: ["Hit commitments without reminders", "Flag risks early, not at the last moment", "Write better PRDs and decision docs than the average PM at your level"],
  },
  {
    level: "Leading Your Team",
    stage: "Mid-level PM",
    what: "Align engineering, design, and QA around shared outcomes. Resolve conflicts. Make decisions that unblock the team.",
    signals: ["Engineers and designers seek your opinion on tricky decisions", "You're the 'ground truth' person for your product area", "Your team has clarity on goals and trade-offs"],
  },
  {
    level: "Leading Cross-Functionally",
    stage: "Senior PM",
    what: "Influence teams you don't own. Align sales, marketing, data, and leadership. Move ambiguous multi-team initiatives forward.",
    signals: ["You lead meetings with 10+ people from different functions", "Executives trust your judgment on strategic trade-offs", "Your work depends on influence, not just your team's output"],
  },
  {
    level: "Leading Leaders",
    stage: "Group PM / Director",
    what: "Develop other PMs. Shape product org culture. Hire, promote, and mentor. Your impact is what others ship because of you.",
    signals: ["Your PMs get promoted regularly", "You hire better than average for the org", "PM ladder clarity and career growth happen on your watch"],
  },
];

const LEADERSHIP_SKILLS = [
  {
    skill: "Decision-making under uncertainty",
    what: "Make good calls fast with incomplete information. Accept that you'll be wrong sometimes and correct course quickly.",
    grow: "Document your decisions with explicit assumptions. Review them 2 months later to calibrate — were you wrong for the right reasons or the wrong reasons?",
  },
  {
    skill: "Managing up",
    what: "Give executives what they need to trust you: crisp updates, clear asks, surfaced risks, no surprises.",
    grow: "For every executive interaction, prepare: 1 line summary, 3 bullets of progress, 1 explicit ask or question. Respect their time.",
  },
  {
    skill: "Giving and receiving feedback",
    what: "Deliver specific, actionable feedback without damaging the relationship. Receive feedback without defensiveness.",
    grow: "Use the SBI model: Situation, Behaviour, Impact. Ask for feedback regularly — not just in reviews. Feedback is a skill, not a trait.",
  },
  {
    skill: "Coaching and developing others",
    what: "Help other PMs grow — through direct mentorship, thoughtful questions, or structured feedback.",
    grow: "Mentor a more junior PM formally. Structure your conversations around their growth goals, not your advice. Ask questions; resist giving answers.",
  },
  {
    skill: "Building trust across the org",
    what: "Consistently reliable, clearly communicative, genuinely interested in others' success — these compound into an org-wide trust capital you can draw on.",
    grow: "Always follow through on commitments, even small ones. Credit others generously. Never take credit you didn't earn. Never throw others under the bus.",
  },
  {
    skill: "Owning outcomes, not just activities",
    what: "Take responsibility for outcomes your team produces, including those you didn't directly control. Escalate proactively when you need help.",
    grow: "In every retro, ask 'what could I have done differently to change this outcome?' — even when the cause seems external. Ownership is a muscle.",
  },
];

const FAQS = [
  {
    q: "What's the biggest leadership shift from PM to Senior PM?",
    a: "The shift from leading through authority to leading through influence. Junior PMs own a squad's backlog — the team is structurally accountable to them. Senior PMs often work cross-functionally with teams they don't own, and every decision must be built on trust, clarity, and quality of argument. The senior PM skill that separates strong candidates from weak ones is the ability to move large, ambiguous initiatives without having authority over the people involved.",
  },
  {
    q: "Do PMs need to manage other people to grow into leadership roles?",
    a: "Not always — individual contributor (IC) tracks exist at most tech companies up to Principal PM or Distinguished PM levels. IC PMs at those levels earn similar or higher to their people-manager peers. That said, many senior PM tracks expect some form of influence or mentorship, even without direct reports. If you want to grow without managing people, build explicit expertise (domain, function, technical) that makes you uniquely valuable as an IC.",
  },
  {
    q: "How do I develop leadership skills as a PM?",
    a: "Three things matter most: (1) take on stretch assignments where you're underqualified — stretch is where growth happens, (2) ask for real feedback from peers, not just managers, (3) read and reflect on leadership — Andy Grove, Ben Horowitz, Ray Dalio, April Dunford. Reading alone doesn't build leadership, but structured reading + deliberate practice compounds. PMs who wait for their manager to 'develop' them grow slowly.",
  },
];

export default function PmLeadershipGuidePage() {
  const dates = pageDates("/pm-leadership-guide");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Leadership Guide", url: `${SITE_URL}/pm-leadership-guide` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Leadership Guide (2026 Edition)",
        description: "How PMs lead without authority. Building trust, decision-making, managing up, developing other PMs, and the leadership skills that separate senior from principal PM.",
        image: `${SITE_URL}/api/og?title=PM+Leadership+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-leadership-guide`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🧭</span> Leadership isn&apos;t a title. It&apos;s what others expect from you.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Leadership Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Leading as a PM looks different at every stage: associates lead themselves by delivering reliably, mid-level PMs lead their team by aligning engineering and design, senior PMs lead cross-functionally by influencing teams they don&apos;t own, and directors lead other leaders by developing PMs and shaping culture. Six skills carry a PM through every stage, from decision-making under uncertainty to owning outcomes, but the biggest jump is trading authority for influence.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-white/60 hover:text-[#89e219] underline underline-offset-2">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The 4 levels of PM leadership, 6 skills that separate strong leaders from average PMs,
            and how to grow from leading yourself to leading other leaders.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice Leadership Scenarios — Free →
          </Link>
        </section>

        {/* Leadership levels */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">The 4 Levels of PM Leadership</h2>
          <div className="space-y-5">
            {LEADERSHIP_LEVELS.map((l, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-white">{i + 1}. {l.level}</h3>
                  <span className="text-xs bg-[#58cc02]/20 text-[#89e219] px-2 py-1 rounded-full">{l.stage}</span>
                </div>
                <p className="text-sm text-white/70 mb-3">{l.what}</p>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-2">You&apos;re doing it right when</p>
                  <ul className="space-y-1">
                    {l.signals.map((s, j) => (
                      <li key={j} className="flex gap-2 text-xs">
                        <span className="text-green-400">✓</span>
                        <span className="text-white/70">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Leadership skills */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Leadership Skills to Grow</h2>
            <div className="space-y-4">
              {LEADERSHIP_SKILLS.map((s, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                  <p className="font-bold text-white mb-2">{i + 1}. {s.skill}</p>
                  <p className="text-sm text-white/60 mb-2">{s.what}</p>
                  <p className="text-xs text-[#89e219]">💪 How to grow it: <span className="text-white/70">{s.grow}</span></p>
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

        <RelatedPages slug="pm-leadership-guide" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Leadership Muscle Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on influence, decision-making, and managing up — with AI feedback.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
