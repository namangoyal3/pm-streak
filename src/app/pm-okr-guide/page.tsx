import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "OKRs for Product Managers (2026) — How to Write, Set & Track OKRs",
  description:
    "Master OKRs as a product manager. How to write great objectives and key results, common OKR mistakes, PM-specific examples, and how to cascade OKRs from company to team level.",
  keywords: [
    "OKRs for product managers", "PM OKR examples", "how to write OKRs product management",
    "product manager OKR guide", "OKR framework PM", "OKR vs KPI product manager",
    "product team OKRs 2026",
  ],
  alternates: { canonical: "/pm-okr-guide" },
  openGraph: {
    title: "OKRs for Product Managers 2026 — PM Streak",
    description: "How to write, set, and track OKRs as a PM — with real examples and common mistakes.",
    url: `${SITE_URL}/pm-okr-guide`,
    images: [{ url: `${SITE_URL}/api/og?title=OKRs+for+Product+Managers+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "OKRs for Product Managers 2026 — PM Streak",
    description: "How to write, set, and track OKRs as a PM — with real examples and common mistakes.",
    images: [`${SITE_URL}/api/og?title=OKRs+for+Product+Managers+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const OKR_ANATOMY = [
  {
    part: "Objective",
    what: "An ambitious, qualitative statement of what you want to achieve. Inspirational, not numerical.",
    good: "Make PM Streak the most trusted PM learning platform in India",
    bad: "Increase users to 50,000 by Q3",
    why: "The bad example is a Key Result, not an Objective. Objectives describe direction and intent — not measured outcomes.",
  },
  {
    part: "Key Result",
    what: "A specific, measurable outcome that proves you hit the Objective. 3–5 per Objective. Time-bound.",
    good: "Achieve 40% Day-30 retention for users who complete onboarding (currently 22%)",
    bad: "Launch 5 new features in Q3",
    why: "KRs should be outcomes, not outputs. 'Launch 5 features' is a task. It can happen without moving any metric that matters.",
  },
  {
    part: "Initiative",
    what: "The work you'll do to move a Key Result. NOT part of the OKR itself — tracked separately.",
    good: "Redesign onboarding flow, add daily streak reminders, personalise lesson recommendations",
    bad: "(Listed as a Key Result)",
    why: "Mixing initiatives into KRs is the #1 OKR mistake. Initiatives are how — KRs are what you'll measure to know if the how worked.",
  },
];

const PM_OKR_EXAMPLES = [
  {
    team: "Growth PM",
    objective: "Grow a loyal, daily-active user base in metro India",
    krs: [
      "Increase DAU from 8,000 to 25,000 by end of Q3",
      "Achieve Day-7 retention ≥ 35% for new users (currently 21%)",
      "Grow organic/referral as % of new signups from 18% to 40%",
    ],
  },
  {
    team: "Monetisation PM",
    objective: "Build a sustainable revenue engine without compromising user trust",
    krs: [
      "Achieve ₹15L MRR by Q3-end (currently ₹4L)",
      "Paid conversion rate from free trial ≥ 12% (currently 6%)",
      "Churn rate ≤ 4% monthly for paid subscribers",
    ],
  },
  {
    team: "Core Product PM",
    objective: "Make the learning experience the best in its category",
    krs: [
      "NPS ≥ 55 (currently 38)",
      "Average lesson completion rate ≥ 70% (currently 52%)",
      "Streak 7-day retention ≥ 60% for active users",
    ],
  },
  {
    team: "Platform PM",
    objective: "Build the infrastructure to support 10x user growth without reliability degradation",
    krs: [
      "API p99 latency ≤ 300ms at 5x current peak load",
      "Zero P0 incidents caused by capacity constraints in Q3",
      "Deploy time reduced from 45 min to ≤ 10 min",
    ],
  },
];

const MISTAKES = [
  { mistake: "Writing tasks as Key Results", fix: "'Launch feature X' → 'Increase metric Y by Z%'" },
  { mistake: "Too many OKRs", fix: "1–2 Objectives per team per quarter. More than 3 means no focus." },
  { mistake: "No baseline in the KR", fix: "Always state current state: 'Increase retention from 22% to 40%' — not just '40% retention'" },
  { mistake: "Sandbagging (too easy)", fix: "OKRs should be aspirational — 70% achievement is considered good, not failure" },
  { mistake: "KRs that can't be measured", fix: "If you can't track it weekly, rewrite it or find a proxy metric" },
  { mistake: "No connection to company OKRs", fix: "Every team OKR should trace up to a company-level objective — if it doesn't, question why you're doing it" },
];

const FAQS = [
  {
    q: "What's the difference between OKRs and KPIs?",
    a: "KPIs (Key Performance Indicators) are ongoing health metrics you track every week — DAU, revenue, NPS. OKRs are time-bound commitments to move specific KPIs significantly in one quarter. KPIs tell you where you are; OKRs tell you where you're going and what improvement you're committing to. A good OKR Key Result is a KPI with a specific target and a deadline.",
  },
  {
    q: "How often should PM teams review OKRs?",
    a: "Weekly progress check-ins (5 minutes in team stand-up: what's the current number, what's the trajectory, any blockers?). Monthly deeper review (are we on track, do we need to adjust initiatives?). End-of-quarter retrospective (what did we achieve, what did we learn, what would we do differently?). OKRs that are only reviewed at quarter-end are not OKRs — they're aspirations.",
  },
  {
    q: "Should individual PMs have their own OKRs?",
    a: "Team OKRs are more important than individual OKRs — PMs should primarily be accountable to their team's outcomes. Individual OKRs make sense for development goals (skills, leadership) but should not duplicate team KRs. A PM whose individual OKR is different from their team's OKR has an alignment problem.",
  },
];

export default function PmOkrGuidePage() {
  const dates = pageDates("/pm-okr-guide");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "OKRs for Product Managers", url: `${SITE_URL}/pm-okr-guide` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "OKRs for Product Managers (2026 Guide)",
        description: "Master OKRs as a product manager. How to write great objectives and key results, common OKR mistakes, PM-specific examples, and how to cascade OKRs from company to team level.",
        image: `${SITE_URL}/api/og?title=OKRs+for+Product+Managers+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-okr-guide`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🎯</span> Direction without OKRs is hope. OKRs make it a commitment.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            OKRs for Product Managers<br />(2026 Guide)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            An OKR pairs one ambitious, qualitative Objective with three to five measurable Key Results
            that prove you hit it, while Initiatives — the actual work — stay tracked separately rather
            than folded into the KRs, which is the single most common OKR mistake PMs make. Good Key
            Results always state a baseline, such as moving Day-30 retention from 22% to 40%, instead of
            naming only the target.
          </p>
          <p className="text-sm text-white/40 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline underline-offset-2">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            How to write great OKRs, real PM team examples, the 6 most common mistakes,
            and how to use OKRs to build accountability without bureaucracy.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice OKR Questions Daily — Free →
          </Link>
        </section>

        {/* OKR anatomy */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">Anatomy of a Good OKR</h2>
          <div className="space-y-5">
            {OKR_ANATOMY.map((part, i) => (
              <div key={part.part} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-[#58cc02]/20 text-[#89e219] text-xs font-bold flex items-center justify-center">{i + 1}</span>
                  <h3 className="text-lg font-bold text-white">{part.part}</h3>
                </div>
                <p className="text-sm text-white/60 mb-4">{part.what}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-3">
                    <p className="text-xs text-green-400 font-medium mb-1">✅ Good</p>
                    <p className="text-sm text-white/70 italic">&ldquo;{part.good}&rdquo;</p>
                  </div>
                  <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-3">
                    <p className="text-xs text-red-400 font-medium mb-1">❌ Bad</p>
                    <p className="text-sm text-white/70 italic">&ldquo;{part.bad}&rdquo;</p>
                  </div>
                </div>
                <div className="bg-[#0e1113] rounded-lg px-3 py-2">
                  <p className="text-xs text-[#89e219]">💡 {part.why}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Real PM OKR examples */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">Real PM Team OKR Examples</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {PM_OKR_EXAMPLES.map((ex) => (
                <div key={ex.team} className="bg-[#111] border border-white/10 rounded-xl p-5">
                  <p className="text-xs text-[#89e219] uppercase tracking-wider mb-2">{ex.team}</p>
                  <p className="font-semibold text-white mb-3">O: {ex.objective}</p>
                  <ul className="space-y-2">
                    {ex.krs.map((kr, i) => (
                      <li key={i} className="flex gap-2 text-sm">
                        <span className="text-white/40 flex-shrink-0">KR{i + 1}:</span>
                        <span className="text-white/70">{kr}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common mistakes */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 OKR Mistakes PMs Make (and the Fix)</h2>
          <div className="space-y-3">
            {MISTAKES.map((m, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <div className="flex gap-3 items-start">
                  <span className="text-red-400 text-sm flex-shrink-0 mt-0.5">❌</span>
                  <div>
                    <p className="text-sm text-white/70 mb-1">{m.mistake}</p>
                    <p className="text-sm text-green-400">→ {m.fix}</p>
                  </div>
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

        <RelatedPages slug="pm-okr-guide" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Setting and Defending OKRs</h2>
          <p className="text-white/60 mb-6">Daily PM scenarios that sharpen your goal-setting, metric definition, and prioritisation instincts.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
