import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "Product Retention Guide for PMs (2026) — How to Measure & Improve Retention",
  description:
    "The complete retention playbook for product managers. Retention curves, activation definition, habit loops, and the PM frameworks that actually move D7 and D30 retention.",
  keywords: [
    "product retention", "how to improve retention product manager",
    "retention PM guide", "D7 retention PM", "D30 retention product",
    "activation vs retention PM", "retention curves analysis 2026",
  ],
  alternates: { canonical: "/pm-retention-guide" },
  openGraph: {
    title: "Product Retention Guide for PMs 2026 — PM Streak",
    description: "How PMs measure and improve product retention — curves, activation, and habit loops.",
    url: `${SITE_URL}/pm-retention-guide`,
    images: [{ url: `${SITE_URL}/api/og?title=Product+Retention+Guide+for+PMs+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Retention Guide for PMs 2026 — PM Streak",
    description: "How PMs measure and improve product retention — curves, activation, and habit loops.",
    images: [`${SITE_URL}/api/og?title=Product+Retention+Guide+for+PMs+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const RETENTION_STAGES = [
  {
    stage: "Activation (Day 0–1)",
    what: "Did the user reach a clear 'aha' moment that showed product value?",
    questionToAnswer: "What is the one thing that, if a user does it on Day 1, they're 3x more likely to still be active on Day 30?",
    example: "Slack: sending 2,000 messages in first 2 weeks. Facebook: 7 friends in 10 days. PM Streak: completing 3 lessons in first 2 days.",
    pmMoves: ["Define the 'aha' action with data (find the correlation to long-term retention)", "Reduce friction to reach that action", "Track activation rate as a north star input metric"],
  },
  {
    stage: "Early Retention (Day 2–7)",
    what: "Did the user come back after activation? Does the product have a genuine use case in their life?",
    questionToAnswer: "What triggers users to come back on Day 2, Day 3, Day 7?",
    example: "Duolingo: streak + notification. WhatsApp: messages from others. PM Streak: daily lesson reminder + streak.",
    pmMoves: ["Design the 'why come back' moment explicitly", "Use triggers (notifications, emails) sparingly — over-triggering backfires", "Measure Day-7 retention as your weekly health metric"],
  },
  {
    stage: "Habit Formation (Day 8–30)",
    what: "Has the product become part of the user's routine? They return without being prompted.",
    questionToAnswer: "What makes a user come back on their own — no notification, no email?",
    example: "Opening the app as part of morning routine. Checking it reflexively. Telling others about it.",
    pmMoves: ["Identify users who hit 'habit threshold' (e.g. 4 uses/week) and study what's different about them", "Help more users cross that threshold", "Measure D30 retention — the truest signal of long-term product-market fit"],
  },
  {
    stage: "Long-term Retention (Day 30+)",
    what: "The product is now an ongoing fixture. The user would notice and miss it if it were gone.",
    questionToAnswer: "What's the user's relationship with the product over months and years?",
    example: "Power users, paying subscribers, ambassadors who recommend the product.",
    pmMoves: ["Segment users by engagement tier and design differently for each", "Add features that deepen power-user value", "Build referral/sharing mechanics — long-term retained users are your best growth channel"],
  },
];

const IMPROVEMENT_LEVERS = [
  { lever: "Fix the leak in the funnel", action: "Find the single step with the biggest drop-off. Fix it before building new features. Often the highest ROI PM move." },
  { lever: "Shorten time to value", action: "Measure TTV in minutes/hours. Every step of friction between signup and 'aha' is a leak. Remove, don't add." },
  { lever: "Design the habit loop", action: "Trigger → Action → Reward → Investment (Nir Eyal). Products without a designed habit loop retain by luck." },
  { lever: "Build content/value that compounds", action: "Notes, photos, history, streaks — things that grow the more the user uses the product create switching costs." },
  { lever: "Personalise based on Day 1 signal", action: "What a user did in Day 1 predicts what they need on Day 7. Use early signal to customise the experience." },
  { lever: "Re-engage the right churners", action: "Not all churned users are worth reactivating. Segment by LTV potential before spending on re-engagement campaigns." },
];

const FAQS = [
  {
    q: "What's a 'good' D7 retention rate for a consumer app?",
    a: "It varies dramatically by category. Consumer utility (WhatsApp, payments): 60–80% D7. Social (Instagram, Twitter): 40–60%. Learning/productivity (Duolingo, Notion): 25–40%. Content apps: 20–30%. If your category peers are at 40% and you're at 15%, the product has a fundamental engagement problem — adding features won't fix it.",
  },
  {
    q: "How do you define activation for a new product?",
    a: "Look at your current users and find the action that most strongly correlates with Day-30 retention. Usually it's an action representing real product use (not just signup) performed within a specific window (Day 1–14). For a learning app: 'completed 3 lessons in first 7 days.' For a messaging app: '5 messages to 2 contacts in first 3 days.' The activation metric should be actionable — something a user can do, not just a vanity threshold.",
  },
  {
    q: "Should you focus on acquiring new users or retaining existing ones first?",
    a: "Retention first, almost always. Acquiring users into a leaky bucket wastes marketing spend and hides product problems. If your D7 retention is under 20% for a consumer app, pause paid acquisition entirely and fix retention. The only exception: very early-stage products with no users yet — you need some users to learn from before retention can be measured meaningfully.",
  },
];

export default function PmRetentionGuidePage() {
  const dates = pageDates("/pm-retention-guide");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Retention Guide", url: `${SITE_URL}/pm-retention-guide` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Product Retention Guide (PM Edition 2026)",
        description:
          "The complete retention playbook for product managers. Retention curves, activation definition, habit loops, and the PM frameworks that actually move D7 and D30 retention.",
        image: `${SITE_URL}/api/og?title=Product+Retention+Guide+for+PMs+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-retention-guide`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📈</span> Growth without retention is a hamster wheel
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Product Retention Guide<br />(PM Edition 2026)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Improving product retention starts with recognizing four distinct stages — activation on Day
            0–1, early retention through Day 7, habit formation by Day 30, and long-term retention beyond
            that — each requiring a different question and a different fix. Retention typically outranks
            acquisition in priority: a leaky funnel wastes ad spend, so PMs pause paid growth to fix
            retention below roughly 20% D7.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The 4 stages of retention, how to measure and improve each,
            and the 6 levers every PM should use to move D7 and D30 retention.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice Retention Scenarios — Free →
          </Link>
        </section>

        {/* Retention stages */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">The 4 Stages of Product Retention</h2>
          <div className="space-y-5">
            {RETENTION_STAGES.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-7 h-7 rounded-full bg-[#58cc02]/20 text-[#89e219] font-bold text-sm flex items-center justify-center">{i + 1}</span>
                  <h3 className="text-lg font-bold text-white">{s.stage}</h3>
                </div>
                <p className="text-sm text-white/70 mb-3">{s.what}</p>
                <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-lg p-3 mb-3">
                  <p className="text-xs text-[#89e219] mb-1">🎯 Question to answer</p>
                  <p className="text-sm text-white/70 italic">{s.questionToAnswer}</p>
                </div>
                <div className="bg-[#0e1113] rounded-lg p-3 mb-3">
                  <p className="text-xs text-white/40 mb-1">Example</p>
                  <p className="text-xs text-white/60">{s.example}</p>
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-2">PM Moves</p>
                  <ul className="space-y-1">
                    {s.pmMoves.map((move, j) => (
                      <li key={j} className="flex gap-2 text-xs">
                        <span className="text-[#89e219]">→</span>
                        <span className="text-white/60">{move}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Improvement levers */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Levers to Move Retention</h2>
            <div className="space-y-3">
              {IMPROVEMENT_LEVERS.map((l, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-white text-sm mb-1">{i + 1}. {l.lever}</p>
                  <p className="text-xs text-white/60">{l.action}</p>
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

        <RelatedPages slug="pm-retention-guide" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Retention Intuition in 2 Minutes a Day</h2>
          <p className="text-white/60 mb-6">Daily PM scenarios on activation, habit formation, and retention diagnosis.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
