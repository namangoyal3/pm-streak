import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "Product Discovery Guide (2026) — How PMs Find the Right Problems to Solve",
  description:
    "Master continuous product discovery. User interviews, opportunity mapping, assumption testing, and the Teresa Torres OST framework — so you build what users actually need.",
  keywords: [
    "product discovery", "continuous product discovery", "product discovery framework",
    "product manager user research", "opportunity solution tree",
    "how to do product discovery PM", "product discovery interview questions 2026",
  ],
  alternates: { canonical: "/product-discovery-guide" },
  openGraph: {
    title: "Product Discovery Guide 2026 — PM Streak",
    description: "Continuous discovery, user interviews, assumption testing — how PMs find the right problems.",
    url: `${SITE_URL}/product-discovery-guide`,
    images: [{ url: `${SITE_URL}/api/og?title=Product+Discovery+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Discovery Guide 2026 — PM Streak",
    description: "Continuous discovery, user interviews, assumption testing — how PMs find the right problems.",
    images: [`${SITE_URL}/api/og?title=Product+Discovery+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DISCOVERY_PHASES = [
  {
    phase: "01. Define the Outcome",
    icon: "🎯",
    what: "Before talking to users, be clear on what business or product outcome you're trying to improve. Discovery without a target outcome produces interesting insights that never turn into decisions.",
    how: "Write: 'We want to improve [metric] because [reason]. We believe [user segment] holds the key.' This frames who you need to talk to and what you're listening for.",
    mistake: "Starting discovery with 'let's just talk to users and see what we find.' Open discovery rarely generates actionable insight — only validation of existing hypotheses.",
  },
  {
    phase: "02. Map the Opportunity Space",
    icon: "🗺️",
    what: "Generate a list of user needs, pain points, and desires that are blocking the outcome. Not solutions — opportunities. An opportunity is a user need that, if addressed, would move your metric.",
    how: "Use the Opportunity Solution Tree (Teresa Torres): Outcome → Opportunities → Solutions → Experiments. Each opportunity is an unmet need, not a feature request.",
    mistake: "Confusing opportunity with solution. 'Users want push notifications' is a solution. 'Users forget to come back because nothing reminds them' is an opportunity.",
  },
  {
    phase: "03. Run User Interviews",
    icon: "🎤",
    what: "Talk to real users about specific past experiences — not hypothetical preferences. What they say they want and what they actually do are often completely different.",
    how: "5 interviews per opportunity area is usually enough to find patterns. Ask: 'Tell me about the last time you [situation].' Never ask: 'Would you use a feature that...?'",
    mistake: "Leading questions that confirm your hypothesis. 'Don't you find it annoying when...?' — you've already told the user what to say.",
  },
  {
    phase: "04. Surface Assumptions",
    icon: "🔍",
    what: "Every solution rests on assumptions about users, technology, and the business. Listing them makes them testable — and prevents building on a foundation that turns out to be false.",
    how: "For each proposed solution, list the 3 riskiest assumptions. Rank by: if this assumption is wrong, does the whole solution fail? Those are your priority tests.",
    mistake: "Treating assumptions as facts. 'Users will switch from WhatsApp to our chat because our UX is better' is an assumption until tested — not a given.",
  },
  {
    phase: "05. Run Rapid Experiments",
    icon: "🧪",
    what: "Test your riskiest assumptions with the smallest possible investment of time and engineering before building. The goal is to generate signal quickly — not to validate a finished solution.",
    how: "Fake door test, landing page test, concierge MVP, Wizard of Oz prototype, or user testing a Figma mock. Match experiment type to assumption type.",
    mistake: "Building an MVP when a prototype would have tested the same assumption in 1/10th the time. An MVP is not the smallest possible test — it's the smallest possible product.",
  },
  {
    phase: "06. Synthesise and Decide",
    icon: "📋",
    what: "Bring together insights from interviews and experiments to decide which opportunity to invest in. Discovery creates a backlog of validated opportunities — prioritise them like any other work.",
    how: "Use an impact/evidence matrix: high impact + strong evidence = build now. High impact + weak evidence = run more experiments. Low impact = park.",
    mistake: "Continuing to discover when you have enough evidence to decide. Discovery is a means to de-risk decisions — not an end in itself.",
  },
];

const INTERVIEW_QUESTIONS = [
  { q: "Tell me about the last time you tried to [goal]. What happened?", why: "Gets a specific story, not a generalisation" },
  { q: "What was the hardest part of that experience?", why: "Surfaces the actual pain point" },
  { q: "What did you try to do about it?", why: "Reveals their current workaround — often the real competitor" },
  { q: "What would a perfect solution look like?", why: "Directional, not prescriptive — helps understand the job-to-be-done" },
  { q: "Is there anything I haven't asked that you think I should know?", why: "Catches unexpected insights and makes users feel heard" },
];

const FAQS = [
  {
    q: "How much time should PMs spend on discovery vs delivery?",
    a: "Continuous discovery means it's not either/or — discovery runs in parallel with delivery. Teresa Torres recommends 1 user interview per week per PM team as the minimum sustainable cadence. This takes ~2 hours/week and dramatically reduces the chance of building something nobody wants. Discovery that only happens before a project starts misses the ongoing learning that changes what you should build next.",
  },
  {
    q: "What's the difference between product discovery and user research?",
    a: "User research is one tool within product discovery. Discovery is the full system: defining outcomes, mapping opportunities, running research, testing assumptions, and deciding what to build. You can do user research without discovery (interesting insights that don't connect to decisions) or discovery without formal user research (using analytics and sales data as your input). Best practice: combine both.",
  },
  {
    q: "How do you do product discovery at an early-stage startup with no users?",
    a: "Talk to potential users — people who have the problem you're solving, even if they've never heard of your product. Your first 20 user interviews should happen before you write a line of code. Use your personal network, LinkedIn outreach, or subreddits/communities where your target users hang out. No users is not an excuse to skip discovery — it's the moment discovery matters most.",
  },
];

export default function ProductDiscoveryGuidePage() {
  const dates = pageDates("/product-discovery-guide");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Product Discovery Guide", url: `${SITE_URL}/product-discovery-guide` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Product Discovery Guide (2026 Edition)",
        description: "Master continuous product discovery. User interviews, opportunity mapping, assumption testing, and the Teresa Torres OST framework — so you build what users actually need.",
        image: `${SITE_URL}/api/og?title=Product+Discovery+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/product-discovery-guide`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔍</span> Build less. Learn faster. Ship what actually matters.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Product Discovery Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Product discovery works as six sequential phases: define the outcome you&apos;re trying to improve, map the opportunity space using Teresa Torres&apos;s Opportunity Solution Tree, run user interviews about specific past experiences, surface the three riskiest assumptions behind each solution, test them with rapid low-investment experiments, and synthesise the evidence into a prioritised backlog — the goal throughout is de-risking decisions, not just generating insights.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The 6-phase discovery process for finding the right problems before investing in solutions —
            with user interview templates, assumption testing, and the OST framework.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice Discovery Scenarios — Free →
          </Link>
        </section>

        {/* Discovery phases */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="space-y-5">
            {DISCOVERY_PHASES.map((phase) => (
              <div key={phase.phase} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{phase.icon}</span>
                  <h2 className="text-base font-bold text-white">{phase.phase}</h2>
                </div>
                <p className="text-sm text-white/70 mb-3">{phase.what}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-[#0e1113] rounded-lg p-3">
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-1">How to do it</p>
                    <p className="text-xs text-white/60">{phase.how}</p>
                  </div>
                  <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-3">
                    <p className="text-xs text-yellow-400">⚠️ Common mistake: {phase.mistake}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interview questions */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-3">5 User Interview Questions That Actually Work</h2>
            <p className="text-white/60 text-center mb-8">Ask these in order. Don&apos;t deviate. Let the silence breathe.</p>
            <div className="space-y-3">
              {INTERVIEW_QUESTIONS.map((item, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <div className="flex gap-3 items-start">
                    <span className="w-6 h-6 rounded-full bg-[#58cc02]/20 text-[#89e219] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                    <div>
                      <p className="text-sm text-white font-medium mb-1 italic">&ldquo;{item.q}&rdquo;</p>
                      <p className="text-xs text-white/50">{item.why}</p>
                    </div>
                  </div>
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

        <RelatedPages slug="product-discovery-guide" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Discovery Habits in 2 Minutes a Day</h2>
          <p className="text-white/60 mb-6">Daily scenarios that sharpen user empathy, assumption testing, and opportunity framing.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
