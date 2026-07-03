import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "How to Transition to Product Management (2026) — Engineer, Designer, MBA",
  description:
    "Switch to product management from engineering, design, consulting, or any background. What to build, what to say, and how to land your first PM role in India in 2026.",
  keywords: [
    "transition to product management", "how to become a product manager from engineering",
    "switch to product management", "engineer to product manager",
    "MBA to product manager", "designer to product manager",
    "break into product management india 2026",
  ],
  alternates: { canonical: "/transition-to-product-manager" },
  openGraph: {
    title: "Transition to Product Management 2026 — PM Streak",
    description: "How to switch to PM from engineering, design, consulting, or any background.",
    url: `${SITE_URL}/transition-to-product-manager`,
    images: [{ url: `${SITE_URL}/api/og?title=Transition+to+Product+Management+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Transition to Product Management 2026 — PM Streak",
    description: "How to switch to PM from engineering, design, consulting, or any background.",
    images: [`${SITE_URL}/api/og?title=Transition+to+Product+Management+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PATHS = [
  {
    from: "Software Engineer",
    icon: "💻",
    superpower: "Technical credibility, system design intuition, ability to communicate with engineering teams",
    gaps: ["User empathy depth", "Business acumen", "Stakeholder management", "Comfort with ambiguity without a spec"],
    narrative: "You don't build features — you decide which features to build and why. Show that you've already been doing this: scoping PRDs, influencing what gets built, talking to users, proposing trade-offs.",
    moves: [
      "Ask your PM to let you own a feature end-to-end (write the PRD, present the spec, monitor post-launch)",
      "Talk to 10 users and document your findings as a brief research report",
      "Build a side project and document the 'PM work' behind it (who is it for, what problem, how did you decide what to build)",
      "Apply to APM programs — your engineering background is a strong filter-in signal",
    ],
  },
  {
    from: "Designer / UX Researcher",
    icon: "🎨",
    superpower: "User empathy, research methods, ability to spot UX failure modes, prototyping speed",
    gaps: ["Business metrics and P&L thinking", "Prioritisation at the business level", "Technical feasibility instinct", "Executive stakeholder management"],
    narrative: "You already think in user journeys. The shift is to also think in business outcomes — connecting design decisions to retention, revenue, and growth. Show that your design decisions were driven by both user needs and measurable outcomes.",
    moves: [
      "For every design project, document the business metric it was trying to move and whether it moved",
      "Practise RICE and OKR frameworks — write a prioritised roadmap for a product you know well",
      "Shadow a PM in their planning, stakeholder, and data review sessions",
      "Learn basic SQL to self-serve data questions — it signals PM seriousness",
    ],
  },
  {
    from: "Management Consultant",
    icon: "📊",
    superpower: "Structured thinking, stakeholder communication, ambiguity comfort, business case development",
    gaps: ["Shipping something real — ownership vs advisory", "Technical fluency", "Product intuition from repeated exposure", "Building vs recommending"],
    narrative: "You're already good at framing problems and communicating to executives. The gap is shipping: owning something end-to-end, iterating based on user feedback, and making decisions with incomplete data at high speed. Your biggest interview risk is sounding advisory instead of operational.",
    moves: [
      "Build something: a side project, an internal tool at your firm, anything you can own and ship",
      "Join a startup as a PM consultant or contract PM — even 3 months of real shipping context changes interviews",
      "Learn the PM stack: Jira, Amplitude, Figma, SQL basics",
      "Reframe your consulting stories: 'I advised the client to' → 'I drove the decision to' (be accurate but active)",
    ],
  },
  {
    from: "MBA / Business Graduate",
    icon: "🎓",
    superpower: "Business strategy, financial modelling, go-to-market thinking, network",
    gaps: ["Product intuition", "Technical fluency", "Actual shipped products in your portfolio", "Speed — PMs move faster than MBA timelines"],
    narrative: "Your MBA gives you strong business framing but little product credibility on its own. The candidates who succeed from MBA backgrounds have supplemented with real product work — an APM program, a startup, a side project, or product internships. The MBA is a door-opener, not a credential that closes the deal.",
    moves: [
      "Apply to APM programs aggressively (Flipkart, Google, Razorpay) during MBA placement season",
      "Take a product internship even if the stipend is lower than consulting",
      "Build a product portfolio: one teardown, one PRD you wrote, one metric you moved",
      "Get comfortable with SQL and Amplitude/Mixpanel — business tools aren't enough",
    ],
  },
];

const FAQS = [
  {
    q: "Is it harder to transition to PM from engineering or from business?",
    a: "Engineers have an easier technical ramp but a harder empathy/communication ramp. Business folks have the opposite. Neither is definitively easier — the path depends on which gaps you're more motivated to close. The most effective transitions combine technical fluency (able to talk to engineers credibly) with user empathy (able to articulate the user's job-to-be-done clearly).",
  },
  {
    q: "Do I need a portfolio to transition into PM?",
    a: "A portfolio isn't mandatory — but 2–3 concrete artefacts dramatically improve your odds: a PRD you wrote, a product teardown, a side project with documented PM decisions, or a research brief from user interviews. These demonstrate PM thinking in the absence of a PM title.",
  },
  {
    q: "How long does a PM career transition typically take?",
    a: "6–18 months from decision to first PM role is realistic. The fastest paths: APM programs (campus recruiting), internal transfers at your current company, or joining an early-stage startup that values your existing skills. The slowest path: waiting for a cold application at a large company to work without building your portfolio first.",
  },
];

export default function TransitionToProductManagerPage() {
  const dates = pageDates("/transition-to-product-manager");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Transition to Product Manager", url: `${SITE_URL}/transition-to-product-manager` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Transition to Product Management (2026 Guide)",
        description:
          "Switch to product management from engineering, design, consulting, or any background. What to build, what to say, and how to land your first PM role in India in 2026.",
        image: `${SITE_URL}/api/og?title=Transition+to+Product+Management+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/transition-to-product-manager`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔄</span> Every background is a superpower — if you fill the gaps
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Transition to Product Management<br />(2026 Guide)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Transitioning to product management realistically takes 6–18 months, whether you start from
            engineering, design, consulting, or an MBA. The fastest routes are APM programs, internal transfers,
            and early-stage startups that value your existing skills. Each background brings a distinct superpower
            and specific gaps to close — and 2–3 concrete artefacts (a PRD, a teardown, a documented side project)
            dramatically improve your odds.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            How to switch to PM from engineering, design, consulting, or business —
            what your background gives you, what gaps you need to close, and the exact moves that work.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Start Your PM Transition — Free →
          </Link>
        </section>

        {/* Paths */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="space-y-8">
            {PATHS.map((path) => (
              <div key={path.from} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{path.icon}</span>
                  <h2 className="text-xl font-bold text-white">From {path.from}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-4">
                    <p className="text-xs text-green-400 font-medium uppercase tracking-wider mb-2">✅ Your Superpower</p>
                    <p className="text-sm text-white/70">{path.superpower}</p>
                  </div>
                  <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
                    <p className="text-xs text-red-400 font-medium uppercase tracking-wider mb-2">⚠️ Gaps to Close</p>
                    <ul className="space-y-1">
                      {path.gaps.map((g, i) => <li key={i} className="text-xs text-white/60">• {g}</li>)}
                    </ul>
                  </div>
                </div>
                <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-xl p-4 mb-4">
                  <p className="text-xs text-[#89e219] font-medium mb-1">💬 The narrative that works</p>
                  <p className="text-sm text-white/70">{path.narrative}</p>
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Concrete Moves to Make Now</p>
                  <ul className="space-y-2">
                    {path.moves.map((move, i) => (
                      <li key={i} className="flex gap-2 text-sm">
                        <span className="text-[#89e219] flex-shrink-0">→</span>
                        <span className="text-white/70">{move}</span>
                      </li>
                    ))}
                  </ul>
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

        <RelatedPages slug="transition-to-product-manager" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Intuition While You Transition</h2>
          <p className="text-white/60 mb-6">Daily 2-minute PM lessons designed for career switchers — no PM experience required to start.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
