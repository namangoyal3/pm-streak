import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "First 90 Days as a PM (2026) — How to Start Strong in a New PM Role",
  description:
    "The first 90 days determine your trajectory at a new PM job. The week-by-week playbook for building context, earning trust, and shipping your first real win.",
  keywords: [
    "first 90 days PM", "new PM job",
    "PM onboarding new role", "PM first week",
    "how to succeed as new PM", "first 90 days product manager 2026",
  ],
  alternates: { canonical: "/pm-first-90-days" },
  openGraph: {
    title: "First 90 Days as a PM 2026 — PM Streak",
    description: "A week-by-week playbook for your first 90 days in a new PM role.",
    url: `${SITE_URL}/pm-first-90-days`,
    images: [{ url: `${SITE_URL}/api/og?title=First+90+Days+as+a+PM+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "First 90 Days as a PM 2026 — PM Streak",
    description: "A week-by-week playbook for your first 90 days in a new PM role.",
    images: [`${SITE_URL}/api/og?title=First+90+Days+as+a+PM+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PHASES = [
  {
    phase: "Week 1–2: Listen",
    goal: "Understand the context, not the features. Resist the urge to propose changes yet.",
    actions: [
      "Meet every team member 1:1 (ask: what are you working on? what&apos;s broken? what would you change?)",
      "Read all existing PRDs, strategy docs, and OKRs from the last 2 quarters",
      "Shadow customer support for half a day — quickest way to understand real user pain",
      "Understand the current metrics — where are they, where are they going, what drives them?",
    ],
    avoid: "Proposing &apos;quick wins&apos; in Week 1. You don&apos;t have the context yet, even if you think you do.",
  },
  {
    phase: "Week 3–4: Learn",
    goal: "Go deep on the product, the data, and the users.",
    actions: [
      "Run 5 user interviews — mix of power users, lapsed users, and new users",
      "Spend real time in the product as a user (dogfood it seriously, not for 10 minutes)",
      "Audit the data infrastructure — what&apos;s measured, what isn&apos;t, what&apos;s instrumented poorly",
      "Study competitors in depth — what do they do well, where are they weaker?",
    ],
    avoid: "Making bold claims in reviews. You&apos;re still mapping the terrain; act like it.",
  },
  {
    phase: "Week 5–8: Align",
    goal: "Develop your POV. Start sharing it. Find your first win.",
    actions: [
      "Write a &apos;current state of the product&apos; doc — what&apos;s working, what&apos;s not, what you&apos;d prioritise",
      "Share it with your manager and key stakeholders. Invite disagreement.",
      "Identify one concrete thing you can ship in 4–6 weeks that genuinely moves a metric",
      "Align engineering and design on the first win — get them invested early",
    ],
    avoid: "Starting 5 initiatives at once. Pick one visible, shippable, impactful thing. Everything else waits.",
  },
  {
    phase: "Week 9–12: Ship",
    goal: "Deliver your first real impact. Prove you belong at this level.",
    actions: [
      "Ship the first win — on time, with clean metrics, with clear ownership",
      "Write a post-launch retro and share broadly",
      "Have a 90-day check-in with your manager: what worked, what didn&apos;t, what next?",
      "Set your first quarter&apos;s real OKRs now that you have context",
    ],
    avoid: "Shipping something small just to claim a win. Your first ship sets expectations — make it count.",
  },
];

const PRINCIPLES = [
  "Write more than you speak in the first 30 days. Writing is thinking in the open.",
  "Ask obvious questions — it&apos;s your window to do so without judgment. After 60 days, it gets harder.",
  "Take extensive notes. You&apos;ll forget 80% of what you learn in weeks 1–4 without them.",
  "Build relationships with your ICs before your stakeholders. Engineers and designers see the real product.",
  "Schedule your 30/60/90-day self-review. Forced reflection surfaces blind spots.",
  "Over-communicate. Your new team doesn&apos;t know your style yet — default to more transparency.",
];

const FAQS = [
  {
    q: "How long does it realistically take to become effective in a new PM role?",
    a: "3–6 months to reach basic effectiveness; 9–12 months to fully own your product area. PMs who try to move faster often miss context and ship things that don&apos;t stick. The right pace: listen for 30 days, learn and align for 30, ship for 30. After 90 days, you should have concrete impact to point to — but you shouldn&apos;t expect full mastery yet.",
  },
  {
    q: "What&apos;s the biggest mistake PMs make in their first 90 days?",
    a: "Shipping too fast without earning context. New PMs often feel pressure to prove themselves and propose changes in Week 1. This almost always backfires — recommendations without context feel tone-deaf to the team who&apos;s been there longer. The best PMs spend real time listening and learning before speaking up, which ironically accelerates trust and impact over months.",
  },
  {
    q: "How do you prove yourself as a senior PM in a new role?",
    a: "Your first shipped initiative sets long-term expectations. Pick something that is (1) clearly impactful, (2) shippable in 4–6 weeks, and (3) demonstrates judgment (not just execution). Skip easy wins that don&apos;t move metrics. Skip huge bets that can&apos;t ship in the first 90 days. The &apos;just right&apos; first win signals competence, judgment, and ability to collaborate.",
  },
];

export default function PmFirst90DaysPage() {
  const dates = pageDates("/pm-first-90-days");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "First 90 Days as a PM", url: `${SITE_URL}/pm-first-90-days` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "First 90 Days as a PM (2026)",
        description: "The first 90 days determine your trajectory at a new PM job. The week-by-week playbook for building context, earning trust, and shipping your first real win.",
        image: `${SITE_URL}/api/og?title=First+90+Days+as+a+PM+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-first-90-days`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🚀</span> The first 90 days set your trajectory for the next 3 years
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            First 90 Days as a PM<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Succeeding in the first 90 days as a PM means moving through four phases in order —
            listening in weeks 1–2, learning the product and users in weeks 3–4, developing and
            sharing a point of view in weeks 5–8, then shipping one meaningful, metric-moving win
            in weeks 9–12. Skipping ahead to propose changes before earning context is the single
            most common failure mode.
          </p>
          <p className="text-sm text-white/50 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The week-by-week playbook for your first 90 days in a new PM role —
            listen, learn, align, ship. Get your first real win without stumbling.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Intuition Daily — Free →
          </Link>
        </section>

        {/* Phases */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="space-y-5">
            {PHASES.map((p, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <p className="font-bold text-white mb-1">{p.phase}</p>
                <p className="text-sm text-[#89e219] mb-3">🎯 Goal: {p.goal}</p>
                <div className="mb-3">
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Actions</p>
                  <ul className="space-y-1">
                    {p.actions.map((a, j) => (
                      <li key={j} className="flex gap-2 text-sm">
                        <span className="text-white/30 flex-shrink-0">☐</span>
                        <span className="text-white/70">{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-500/5 border border-red-500/20 rounded-lg px-3 py-2">
                  <p className="text-xs text-red-400">⚠️ Avoid: <span className="text-white/70">{p.avoid}</span></p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Principles */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Principles for a Strong Start</h2>
            <div className="space-y-3">
              {PRINCIPLES.map((p, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{p}</p>
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

        <RelatedPages slug="pm-first-90-days" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Stay Sharp Before Your First Day</h2>
          <p className="text-white/60 mb-6">Daily PM scenarios that keep your thinking sharp across product, metrics, and stakeholder work.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
