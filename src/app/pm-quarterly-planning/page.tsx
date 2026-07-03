import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Quarterly Planning Guide (2026) — How PMs Plan a Quarter That Ships",
  description:
    "How PMs run quarterly planning. The 3-week planning cadence, OKR setting, capacity modelling, and how to leave buffer for the unknowns that always happen.",
  keywords: [
    "PM quarterly planning", "product manager quarterly planning",
    "quarterly roadmap PM", "OKR quarter planning",
    "PM sprint planning vs quarterly 2026",
  ],
  alternates: { canonical: "/pm-quarterly-planning" },
  openGraph: {
    title: "PM Quarterly Planning Guide 2026 — PM Streak",
    description: "How PMs plan a quarter that actually ships — cadence, OKRs, and capacity modelling.",
    url: `${SITE_URL}/pm-quarterly-planning`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Quarterly+Planning+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Quarterly Planning Guide 2026 — PM Streak",
    description: "How PMs plan a quarter that actually ships — cadence, OKRs, and capacity modelling.",
    images: [`${SITE_URL}/api/og?title=PM+Quarterly+Planning+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const CADENCE = [
  {
    week: "Week -3: Reflect & gather",
    actions: [
      "Review last quarter&apos;s OKRs — what shipped, what slipped, what did we learn?",
      "Gather input from engineering, design, sales, and customer success",
      "Audit the current backlog — what&apos;s still relevant vs stale?",
      "Review north star and input metrics — where&apos;s the biggest gap?",
    ],
  },
  {
    week: "Week -2: Draft OKRs & bets",
    actions: [
      "Draft 1–2 quarterly Objectives tied to the north star",
      "Write 3–4 Key Results per Objective — measurable, time-bound",
      "List the 3–5 biggest bets (initiatives) that will move the KRs",
      "Size each bet roughly: team size × weeks = eng investment",
    ],
  },
  {
    week: "Week -1: Align & commit",
    actions: [
      "Review with engineering lead — are bets technically feasible in the timeline?",
      "Align with leadership — does this map to their priorities?",
      "Adjust based on feedback, then commit in writing",
      "Leave 20% buffer for unplanned work (urgent bugs, stakeholder asks, learning)",
    ],
  },
  {
    week: "Week 0: Kick off",
    actions: [
      "Share the final plan with the team — what, why, when",
      "Break Q1 bets into first sprint deliverables",
      "Set up weekly progress tracking (dashboard or async update)",
      "Schedule mid-quarter review (Week 6) to recalibrate",
    ],
  },
];

const ANTI_PATTERNS = [
  "Planning for 100% capacity — reality always has surprises",
  "Too many OKRs (&gt;2 Objectives, &gt;4 KRs each) — spreads the team thin",
  "Writing Key Results as tasks (&apos;launch feature X&apos;) instead of outcomes (&apos;increase metric Y by Z%&apos;)",
  "No mid-quarter review — you won&apos;t know you&apos;re off-track until the end",
  "Ignoring engineering input on feasibility — timelines become fiction",
  "Over-scoping &apos;ambitious&apos; bets that have no path to done in 12 weeks",
];

const BUFFER_GUIDE = [
  { allocate: "60–70% to committed quarterly bets", why: "Real shipped work toward OKRs — the main thing." },
  { allocate: "15–20% to tech debt and platform work", why: "Compounds long-term velocity. Explicit allocation, not leftover." },
  { allocate: "10–15% for unplanned urgent work", why: "Bugs, stakeholder requests, learning. You WILL need this — don&apos;t pretend you won&apos;t." },
  { allocate: "5% to discovery and research", why: "Next quarter&apos;s bets come from this quarter&apos;s discovery. Skip it and you plan in the dark." },
];

const FAQS = [
  {
    q: "How far in advance should PMs start quarterly planning?",
    a: "3 weeks before the quarter starts is ideal — enough time to reflect, gather input, draft, align, and commit without it feeling rushed. Less than 2 weeks and you&apos;re plate-spinning; more than 4 weeks and the plan becomes stale before it starts. Protect these weeks on your calendar as deliberately as you protect deep work.",
  },
  {
    q: "How many OKRs should a PM team have per quarter?",
    a: "1–2 Objectives, 3–4 Key Results per Objective. More than this and focus disperses. If every initiative could be an OKR, nothing is an OKR. The discipline of picking the top 1–2 is what makes OKRs valuable. If leadership pushes for more, push back — diluted OKRs produce diluted outcomes.",
  },
  {
    q: "What&apos;s the biggest quarterly planning mistake?",
    a: "Planning for 100% capacity. Every PM has experienced this: you committed to 10 initiatives, week 4 something urgent came up, and now you&apos;re delivering 6 things poorly instead of the original 10 on time. Always reserve 15–20% capacity for unplanned work. This isn&apos;t slack — it&apos;s realism. Teams that plan with buffer consistently outperform teams that pack 100% and scramble.",
  },
];

export default function PmQuarterlyPlanningPage() {
  const dates = pageDates("/pm-quarterly-planning");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Quarterly Planning", url: `${SITE_URL}/pm-quarterly-planning` },
      ])} />
      <JsonLd data={articleSchema({
        headline: "PM Quarterly Planning Guide (2026 Edition)",
        description: "How PMs run quarterly planning. The 3-week planning cadence, OKR setting, capacity modelling, and how to leave buffer for the unknowns that always happen.",
        image: `${SITE_URL}/api/og?title=PM+Quarterly+Planning+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-quarterly-planning`,
      })} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📅</span> Great quarters are planned. Chaotic quarters are accidents.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Quarterly Planning Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            PMs who plan a quarter that ships follow a four-week cadence — reflecting and gathering
            input, drafting OKRs and bets, aligning with engineering and leadership, then kicking off
            with a mid-quarter checkpoint — while allocating capacity as 60–70% committed bets,
            15–20% tech debt, 10–15% unplanned work, and 5% discovery, since planning for 100%
            capacity is the single biggest quarterly planning mistake.
          </p>
          <p className="text-sm text-white/50 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The 4-week planning cadence, capacity allocation that accounts for reality,
            and 6 anti-patterns that turn well-planned quarters into stressful ones.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Planning Skills Daily — Free →
          </Link>
        </section>

        {/* Cadence */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">The 4-Week Planning Cadence</h2>
          <div className="space-y-5">
            {CADENCE.map((c, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <p className="font-bold text-white mb-3">{c.week}</p>
                <ul className="space-y-1.5">
                  {c.actions.map((a, j) => (
                    <li key={j} className="flex gap-2 text-sm">
                      <span className="text-white/30 flex-shrink-0">☐</span>
                      <span className="text-white/70">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Buffer */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">Realistic Capacity Allocation</h2>
            <div className="space-y-3">
              {BUFFER_GUIDE.map((b, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-[#89e219] text-sm mb-1">{b.allocate}</p>
                  <p className="text-xs text-white/60">{b.why}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Anti-patterns */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Quarterly Planning Anti-Patterns</h2>
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

        <RelatedPages slug="pm-quarterly-planning" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice PM Planning Scenarios</h2>
          <p className="text-white/60 mb-6">Daily scenarios on OKR setting, capacity trade-offs, and scope decisions.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
