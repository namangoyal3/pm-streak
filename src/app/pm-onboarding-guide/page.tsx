import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "Product Onboarding Guide for PMs (2026) — Design Flows That Activate Users",
  description:
    "The complete user onboarding playbook for PMs. How to design flows that activate, the psychology of first-time users, key metrics, and 10 onboarding anti-patterns to avoid.",
  keywords: [
    "product onboarding PM", "user onboarding design",
    "how to design product onboarding", "onboarding flow best practices",
    "activation rate PM", "user onboarding frameworks 2026",
  ],
  alternates: { canonical: "/pm-onboarding-guide" },
  openGraph: {
    title: "Product Onboarding Guide for PMs 2026 — PM Streak",
    description: "Design onboarding flows that activate users — frameworks, metrics, and anti-patterns.",
    url: `${SITE_URL}/pm-onboarding-guide`,
    type: "article",
  },
};

const ONBOARDING_PHASES = [
  {
    phase: "Pre-onboarding (before signup)",
    goal: "Set expectations. Attract the right user. Qualify out the wrong user.",
    moves: ["Landing page that clearly states what the product does and for whom", "Social proof (testimonials, numbers) to build trust", "Clear pricing (or lack of it) upfront — hidden pricing hurts activation"],
    metric: "Landing page → signup conversion",
  },
  {
    phase: "Signup (Day 0, first 60 seconds)",
    goal: "Get the user in without friction. Don't ask for anything you don't need immediately.",
    moves: ["Social login (Google/Apple) alongside email", "Defer profile info — collect only what's needed to reach first value", "Show a progress indicator so users know how close they are to done"],
    metric: "Signup start → signup complete",
  },
  {
    phase: "Activation (Day 0, first session)",
    goal: "Get the user to their first 'aha' moment — where they clearly understand product value.",
    moves: ["Lead with value, not tutorials — show them something they'd want immediately", "Personalise based on what they told you (use case, role)", "Use a guided path, not a feature tour — 'do this one thing' beats 'look at all our features'"],
    metric: "Activation rate (% who hit the 'aha' action in Day 1)",
  },
  {
    phase: "Early retention (Day 1–7)",
    goal: "Build the habit of coming back. This is where most products lose users forever.",
    moves: ["Trigger return visits with relevant emails or push notifications (never spammy)", "Daily/weekly engagement loops — streaks, new content, reminders of unfinished value", "Celebrate small wins early — 'you completed 3 lessons!' reinforces behaviour"],
    metric: "Day-7 retention",
  },
  {
    phase: "Long-term engagement (Day 8+)",
    goal: "Turn casual users into engaged users who would miss the product if it disappeared.",
    moves: ["Depth features unlocked after habit forms (advanced workflows, integrations)", "Social / network effects — invite teammates, share content", "Personalisation that deepens over time — recommendations, history"],
    metric: "Day-30 retention, weekly active users, NPS",
  },
];

const ANTI_PATTERNS = [
  { bad: "Feature tour immediately after signup", why: "Users haven't earned the context to care about features. They don't know what to do first." },
  { bad: "Asking for too much info before first value", why: "Every field is a drop-off point. Collect info after the user sees value, not before." },
  { bad: "One-size-fits-all onboarding for all user types", why: "A new engineer and a new admin have different jobs. Onboarding should reflect this." },
  { bad: "Forcing users to watch a video", why: "Most users skip. Inline, interactive onboarding beats video every time." },
  { bad: "No empty state for core screens", why: "A blank dashboard with no guidance is the #1 abandonment point." },
  { bad: "Dark patterns to force signup completion", why: "Forcing completion increases signups but hurts activation and NPS." },
  { bad: "No progress indicator", why: "Users abandon multi-step flows without clear 'you're X% done' signals." },
  { bad: "Sending too many onboarding emails", why: "More than 3 emails in Week 1 often triggers unsubscribes, not engagement." },
  { bad: "Skipping mobile-specific onboarding", why: "Mobile UX requires fundamentally different patterns — desktop flows rarely translate." },
  { bad: "Not instrumenting onboarding events", why: "You can't diagnose drop-off if you don't know where users are dropping. Instrument before shipping." },
];

const FAQS = [
  {
    q: "What's a good activation rate for a SaaS product?",
    a: "Highly varies by complexity and price. Simple B2C apps (quick value): 40–60% activation in Day 1. Mid-complexity SaaS: 20–30%. Complex enterprise SaaS: 10–15% but with longer activation windows (7–14 days). The absolute number matters less than: (1) is it trending up, and (2) are activated users retaining dramatically better? If retention gap is small, you're activating superficially.",
  },
  {
    q: "Should onboarding show the whole product or just one use case?",
    a: "Almost always: one use case, deeply. Products with broad capabilities (Notion, Airtable) that try to show 'everything' in onboarding consistently lose users. The winning pattern: identify the user's primary use case (ask them, or infer from signup context), design onboarding that gets them to value in that one use case, and let them discover the rest organically after they're committed.",
  },
  {
    q: "How do you test and improve onboarding?",
    a: "A/B test one change at a time — onboarding is extremely path-dependent, and bundled changes are hard to attribute. Core metrics to track: signup → activation rate, time to first value, Day-7 retention of activated vs not-activated. Watch session recordings of new users regularly (5 sessions/week) — friction that's invisible in metrics is visible when you watch real users stumble.",
  },
];

export default function PmOnboardingGuidePage() {
  const dates = pageDates("/pm-onboarding-guide");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Onboarding Guide", url: `${SITE_URL}/pm-onboarding-guide` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Product Onboarding Guide (PM Edition 2026)",
        description:
          "The complete user onboarding playbook for PMs. How to design flows that activate, the psychology of first-time users, key metrics, and 10 onboarding anti-patterns to avoid.",
        image: `${SITE_URL}/api/og?title=Product+Onboarding+Guide+for+PMs+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-onboarding-guide`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🚪</span> The first session decides most users&apos; long-term fate
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Product Onboarding Guide<br />(PM Edition 2026)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Most products lose users in the first session, which is why this guide breaks onboarding into
            five phases — pre-onboarding, signup, activation, early retention, and long-term engagement —
            plus ten concrete anti-patterns, from feature tours right after signup to skipping
            mobile-specific flows, that quietly kill activation before a PM ever notices the drop-off.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The 5 phases of user onboarding, what to do in each,
            the metrics to track, and 10 anti-patterns that kill activation.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice Onboarding Scenarios — Free →
          </Link>
        </section>

        {/* Phases */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">The 5 Phases of Onboarding</h2>
          <div className="space-y-5">
            {ONBOARDING_PHASES.map((p, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-7 h-7 rounded-full bg-[#58cc02]/20 text-[#89e219] font-bold text-sm flex items-center justify-center">{i + 1}</span>
                  <h3 className="text-lg font-bold text-white">{p.phase}</h3>
                </div>
                <p className="text-sm text-white/70 mb-3 ml-10">🎯 Goal: {p.goal}</p>
                <div className="ml-10 mb-3">
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-2">PM Moves</p>
                  <ul className="space-y-1">
                    {p.moves.map((m, j) => (
                      <li key={j} className="flex gap-2 text-xs">
                        <span className="text-[#89e219]">→</span>
                        <span className="text-white/60">{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="ml-10 bg-green-500/5 border border-green-500/20 rounded-lg px-3 py-2">
                  <p className="text-xs text-green-400">📊 Key metric: <span className="text-white/70">{p.metric}</span></p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Anti-patterns */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">10 Onboarding Anti-Patterns</h2>
            <div className="space-y-3">
              {ANTI_PATTERNS.map((a, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <div className="flex gap-3 items-start">
                    <span className="text-red-400 font-bold flex-shrink-0">{i + 1}.</span>
                    <div>
                      <p className="text-sm text-white/70 mb-1">{a.bad}</p>
                      <p className="text-xs text-white/50">{a.why}</p>
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

        <RelatedPages slug="pm-onboarding-guide" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Onboarding Intuition Daily</h2>
          <p className="text-white/60 mb-6">Real scenarios on activation, empty states, and first-session design.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
