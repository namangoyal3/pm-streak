import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "Engineer to Product Manager (2026) — How SWEs Transition to PM",
  description:
    "How software engineers transition to PM. The 4 paths that work, what hiring managers look for, how to reposition your engineering experience, and avoiding common transition pitfalls.",
  keywords: [
    "engineer to product manager", "software engineer to PM",
    "SWE to PM transition", "engineer switch to PM india",
    "how engineer becomes PM", "engineer PM interview 2026",
  ],
  alternates: { canonical: "/engineer-to-pm" },
  openGraph: {
    title: "Engineer to Product Manager 2026 — PM Streak",
    description: "How software engineers transition to PM — paths, positioning, and pitfalls to avoid.",
    url: `${SITE_URL}/engineer-to-pm`,
    images: [{ url: `${SITE_URL}/api/og?title=Engineer+to+Product+Manager+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineer to Product Manager 2026 — PM Streak",
    description: "How software engineers transition to PM — paths, positioning, and pitfalls to avoid.",
    images: [`${SITE_URL}/api/og?title=Engineer+to+Product+Manager+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PATHS = [
  {
    path: "Internal Transfer at Current Company",
    difficulty: "Easiest",
    timeline: "3–6 months",
    howItWorks: "Ask your manager about a PM opening on an adjacent team. Your credibility and context make this by far the easiest transition.",
    tip: "Most engineers underestimate this. Start by volunteering to write PRDs, run user interviews, and own product decisions in your current role. Make the transition organic, not sudden.",
  },
  {
    path: "APM Program",
    difficulty: "Competitive",
    timeline: "6–12 months prep",
    howItWorks: "Apply to structured programs (Flipkart PAP, Razorpay APM, Google APMM). Engineering background is a strong positive signal.",
    tip: "Application cycles are annual. Build a portfolio: 1 teardown, 1 PRD, 1 side project. Your engineering depth is a differentiator — don't hide it.",
  },
  {
    path: "Small Startup PM Role",
    difficulty: "Moderate",
    timeline: "1–3 months",
    howItWorks: "Early-stage startups (10–50 people) often hire engineers-turned-PMs because you can still write code AND do product. Your technical depth pays off immediately.",
    tip: "Look for founders with strong product sense — you'll learn PM quickly by working closely with them. Avoid startups where the founder expects you to do 'everything,' which means nothing deeply.",
  },
  {
    path: "Senior PM at a Tech Company",
    difficulty: "Hardest",
    timeline: "12–18 months prep",
    howItWorks: "Reposition as a Technical PM at companies that value engineering-heavy PMs (dev tools, infra, fintech, AI). You bypass APM and go directly to PM or Senior PM.",
    tip: "Requires extensive side portfolio work — shipped products, detailed case studies, a public point of view. Companies like GitHub, Postman, Hasura, BrowserStack love engineering-heavy PMs.",
  },
];

const GAPS = [
  {
    gap: "Jumping to solutions too fast",
    why: "Engineers are trained to solve — but PMs must first deeply understand the problem. Skipping the 'why' phase is the #1 failure mode in PM interviews.",
    fix: "Practice starting every product question with clarifying questions. Resist the urge to propose solutions in the first 60 seconds.",
  },
  {
    gap: "Over-indexing on technical feasibility",
    why: "Engineers see edge cases and reject ideas on technical grounds. PMs must weigh user impact vs technical complexity — sometimes the scrappy solution wins.",
    fix: "For every 'this is hard to build' instinct, ask: what's the user value? Is there a simpler version? Would users even notice the edge case?",
  },
  {
    gap: "Under-investing in stakeholder management",
    why: "Engineers ship code — the craft is technical. PMs ship through others — the craft is influence. This shift is jarring for many engineers.",
    fix: "Spend your first 3 months deliberately building relationships with designers, sales, and other PMs. Trust is your new unit of productivity.",
  },
  {
    gap: "Treating user research as someone else's job",
    why: "Engineers often haven't talked to 20 users. PMs must. User empathy can't be outsourced to UX researchers.",
    fix: "Commit to 1 user interview per week for your first 6 months as a PM. It will feel slow. Don't skip it.",
  },
  {
    gap: "Writing tickets, not PRDs",
    why: "Engineers are comfortable in Jira. PMs must zoom out to the 'why' and 'what' — not just the 'how.'",
    fix: "Write a full PRD for every non-trivial feature. Get it reviewed by senior PMs. Read exceptional PRDs from people you admire.",
  },
];

const STRENGTHS = [
  { strength: "Technical credibility with engineering", useIt: "Engineers trust you. Use it to make better scope decisions and cut unnecessary engineering work." },
  { strength: "System design intuition", useIt: "You see how features interact across systems. Useful for platform PM roles, API products, and complex integrations." },
  { strength: "Ability to evaluate technical trade-offs", useIt: "When engineering says 'this is hard,' you can probe in a way a non-technical PM can't. This saves weeks." },
  { strength: "Comfort with data and SQL", useIt: "Most PMs struggle with SQL. You already have it. Use it to self-serve metrics and make faster decisions." },
];

const FAQS = [
  {
    q: "Is it worth transitioning from engineering to PM?",
    a: "Depends on what you enjoy. If you love shaping what gets built (the problem, the users, the trade-offs) more than the act of building it — yes. If you love deep technical craft and shipping code, stay in engineering. Compensation is similar in India at comparable levels; career ceiling is also similar (Principal Engineer vs Principal PM). The decision is about where you find the most meaning, not where the money is.",
  },
  {
    q: "Will my engineering salary drop if I transition to PM?",
    a: "At a strong company, no — PM and SWE salaries are closely benchmarked. If you take an APM role, your total comp might dip temporarily because APM is a junior level. A direct PM transfer at the same level typically matches your engineering comp. Startups often pay PMs slightly less than senior engineers; large tech companies pay them equal or more.",
  },
  {
    q: "Do I need to stop coding when I become a PM?",
    a: "At large companies, yes — PMs don't code in production. At startups, you might still code occasionally (prototypes, side scripts), but your main output shifts to decisions and documents. Many engineers-turned-PMs keep a personal side project going to stay hands-on with code — this is healthy both for technical fluency and sanity.",
  },
];

export default function EngineerToPmPage() {
  const dates = pageDates("/engineer-to-pm");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Engineer to PM", url: `${SITE_URL}/engineer-to-pm` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Engineer to Product Manager (2026 Guide)",
        description: "How software engineers transition to PM. The 4 paths that work, what hiring managers look for, how to reposition your engineering experience, and avoiding common transition pitfalls.",
        image: `${SITE_URL}/api/og?title=Engineer+to+Product+Manager+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/engineer-to-pm`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>💻</span> Engineering background is a superpower. If you lean into it.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Engineer to Product Manager<br />(2026 Guide)
          </h1>
          <p className="text-base text-white/60 max-w-2xl mx-auto mb-2">
            Software engineers move into PM through four routes, ranked easiest to hardest: an internal transfer, a structured APM program, a small-startup PM role, or a direct jump to Senior PM at an engineering-heavy company. The transition mostly hinges on closing habits like jumping to solutions too fast and under-investing in stakeholder management, while leaning on the system design intuition and SQL comfort non-technical PMs rarely have.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-white/60 hover:text-[#89e219] underline underline-offset-2">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The 4 transition paths, 5 gaps engineers must close, and the strengths
            engineering-turned PMs should actively use to stand out.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Start Your Transition Prep — Free →
          </Link>
        </section>

        {/* Paths */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">The 4 Paths From Engineer to PM</h2>
          <div className="space-y-5">
            {PATHS.map((p, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-white">{i + 1}. {p.path}</h3>
                  <div className="flex gap-2 text-xs">
                    <span className="bg-[#1f2228] border border-white/10 rounded-full px-2 py-1 text-white/60">{p.difficulty}</span>
                    <span className="bg-green-500/10 border border-green-500/20 rounded-full px-2 py-1 text-green-400">{p.timeline}</span>
                  </div>
                </div>
                <p className="text-sm text-white/70 mb-3">{p.howItWorks}</p>
                <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-lg p-3">
                  <p className="text-xs text-[#89e219]">💡 {p.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Gaps */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Gaps Engineers Must Close</h2>
            <div className="space-y-4">
              {GAPS.map((g, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                  <p className="font-semibold text-white mb-2">⚠️ {g.gap}</p>
                  <p className="text-sm text-white/60 mb-2">{g.why}</p>
                  <p className="text-sm text-green-400">→ {g.fix}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Strengths */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">4 Engineering Strengths to Weaponise</h2>
          <div className="space-y-3">
            {STRENGTHS.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <p className="font-semibold text-green-400 mb-1">✅ {s.strength}</p>
                <p className="text-sm text-white/60">{s.useIt}</p>
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

        <RelatedPages slug="engineer-to-pm" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Intuition While You Engineer</h2>
          <p className="text-white/60 mb-6">Daily PM practice designed for engineers — 2 minutes, no meetings required.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
