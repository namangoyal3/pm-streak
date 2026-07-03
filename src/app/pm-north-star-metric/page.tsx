import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "North Star Metric Guide for PMs (2026) — How to Choose & Use It",
  description:
    "How PMs choose and use a north star metric. Good vs bad examples, how to decompose it into input metrics, and how companies like Duolingo and Airbnb picked theirs.",
  keywords: [
    "north star metric product manager", "how to choose north star metric",
    "north star metric examples", "PM north star",
    "input metrics north star", "north star metric framework 2026",
  ],
  alternates: { canonical: "/pm-north-star-metric" },
  openGraph: {
    title: "North Star Metric Guide for PMs 2026 — PM Streak",
    description: "How PMs pick and use a north star metric — with examples from Duolingo, Airbnb, and more.",
    url: `${SITE_URL}/pm-north-star-metric`,
    images: [{ url: `${SITE_URL}/api/og?title=North+Star+Metric+Guide+for+PMs+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "North Star Metric Guide for PMs 2026 — PM Streak",
    description: "How PMs pick and use a north star metric — with examples from Duolingo, Airbnb, and more.",
    images: [`${SITE_URL}/api/og?title=North+Star+Metric+Guide+for+PMs+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const CRITERIA = [
  { test: "Captures user value delivered", why: "If users get value, the metric should move. If they don't, it shouldn't. Revenue fails this test — users can pay without getting value (they churn later)." },
  { test: "Leading indicator of business health", why: "The metric should move before revenue moves. A product with a growing north star that hasn't yet converted to revenue is still a healthy product." },
  { test: "Measurable weekly or daily", why: "Metrics reviewed monthly are too slow to drive decisions. Metrics reviewed daily create too much noise. Weekly is the Goldilocks zone." },
  { test: "Rally-able across the team", why: "Everyone in the company should understand what it means. If you need 5 minutes to explain it, it's the wrong metric." },
  { test: "Hard to game", why: "Some metrics can be gamed by tactics that destroy long-term value. A good north star is robust to Goodhart's Law." },
];

const GOOD_EXAMPLES = [
  { company: "Duolingo", metric: "Daily Active Users (specifically: users who complete a lesson)", why: "Captures the habit loop. If users are coming back daily to learn, the product is working." },
  { company: "Airbnb", metric: "Nights Booked", why: "Captures both sides of the marketplace. Hosts host, guests stay. Trust has been built." },
  { company: "Facebook (early)", metric: "Monthly Active Users", why: "Captured network effects. More connected users made the product more valuable." },
  { company: "Spotify", metric: "Time Spent Listening", why: "Pure engagement. The product's value is consumption — more consumption = more value." },
  { company: "WhatsApp", metric: "Messages Sent", why: "Captures both acquisition (new users joining via contacts) and engagement (sending messages to contacts)." },
  { company: "Slack", metric: "Teams with 2000+ messages sent", why: "A threshold that correlates with long-term paid conversion. Below this, teams churn." },
];

const BAD_EXAMPLES = [
  { metric: "Revenue / MRR", why: "It's a lagging indicator. A product with ₹1Cr MRR today might lose all users tomorrow. Revenue moves slowly behind user behaviour." },
  { metric: "Signups", why: "Too top-of-funnel. A million signups that don't activate are worth nothing. Signups are an input metric, not a north star." },
  { metric: "Page views / Sessions", why: "Easy to game. A confusing UX creates many sessions as users navigate in circles. Engagement ≠ value." },
  { metric: "Time on app", why: "Dark pattern risk. Making apps addictive increases time on app while destroying user trust and long-term retention." },
  { metric: "Number of features shipped", why: "Output, not outcome. Shipping more features with no user behaviour change is motion without progress." },
];

const DECOMPOSITION = {
  ns: "Daily Active Learners who complete a lesson",
  inputs: [
    { label: "Acquisition", metric: "New user signups per day", owner: "Growth PM" },
    { label: "Activation", metric: "% of new signups who complete lesson 1", owner: "Onboarding PM" },
    { label: "Retention", metric: "D7 and D30 retention for activated users", owner: "Core PM" },
    { label: "Reactivation", metric: "% of lapsed users who return after streak reminder", owner: "Engagement PM" },
    { label: "Depth", metric: "Average lessons completed per active day", owner: "Learning PM" },
  ],
};

const FAQS = [
  {
    q: "Can a product have multiple north star metrics?",
    a: "Generally, no — it defeats the purpose. The north star is supposed to be THE single metric that aligns the whole team. Multiple 'north stars' are actually input metrics or OKR key results. Large companies with multiple product lines may have a north star per product line, but each line should have exactly one. If you can't pick one, you probably haven't thought through what you actually want to optimise.",
  },
  {
    q: "How often should you change your north star metric?",
    a: "Rarely — ideally never, if it was chosen well. North stars should survive multiple product strategy shifts. You should change it only when (1) you've reached product-market fit and the metric is no longer meaningful at scale, (2) the business model has fundamentally changed, or (3) you realise the original metric was poorly chosen and being gamed. Changing it more than every 2–3 years signals weak strategic thinking.",
  },
  {
    q: "What's the difference between a north star metric and an OKR?",
    a: "The north star is the ongoing direction — what you're always trying to move. OKRs are quarterly commitments on HOW MUCH you'll move specific metrics. A good OKR Key Result moves the north star or an input metric that drives the north star. North star is the 'why we're here.' OKRs are 'what we're committing to this quarter.'",
  },
];

export default function PmNorthStarMetricPage() {
  const dates = pageDates("/pm-north-star-metric");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM North Star Metric", url: `${SITE_URL}/pm-north-star-metric` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "North Star Metric Guide (PM Edition 2026)",
        description: "How PMs choose and use a north star metric. Good vs bad examples, how to decompose it into input metrics, and how companies like Duolingo and Airbnb picked theirs.",
        image: `${SITE_URL}/api/og?title=North+Star+Metric+Guide+for+PMs+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-north-star-metric`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>⭐</span> The right north star metric aligns every decision
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            North Star Metric Guide<br />(PM Edition 2026)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            A north star metric is the single number — like Duolingo&apos;s daily lesson completers
            or Airbnb&apos;s nights booked — that captures real user value, moves before revenue
            does, updates weekly, and stays hard to game; it excludes lagging or gameable stand-ins
            such as revenue, signups, or time on app, and gets decomposed into input metrics like
            acquisition, activation, and retention that different PMs can each own.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 criteria for a great north star, 6 real company examples of good ones,
            5 common bad choices, and how to decompose your north star into input metrics.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice Metric Scenarios — Free →
          </Link>
        </section>

        {/* Criteria */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Criteria for a Great North Star</h2>
          <div className="space-y-3">
            {CRITERIA.map((c, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <p className="font-semibold text-white mb-1">{i + 1}. {c.test}</p>
                <p className="text-xs text-white/60">{c.why}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Good examples */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Great North Star Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {GOOD_EXAMPLES.map((e, i) => (
                <div key={i} className="bg-[#111] border border-green-500/20 rounded-xl p-4">
                  <p className="font-bold text-white mb-1">{e.company}</p>
                  <p className="text-sm text-green-400 mb-2 italic">&ldquo;{e.metric}&rdquo;</p>
                  <p className="text-xs text-white/60">{e.why}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bad examples */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Common Bad North Star Choices</h2>
          <div className="space-y-3">
            {BAD_EXAMPLES.map((b, i) => (
              <div key={i} className="bg-[#111] border border-red-500/20 rounded-xl p-4">
                <p className="font-semibold text-red-400 mb-1">❌ {b.metric}</p>
                <p className="text-xs text-white/60">{b.why}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Decomposition */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-3">Decomposing a North Star Into Input Metrics</h2>
            <p className="text-white/60 text-center mb-8">Example: PM Streak&apos;s north star and the input metrics that drive it.</p>
            <div className="bg-[#111] border border-[#58cc02]/30 rounded-2xl p-6 mb-5 text-center">
              <p className="text-xs text-[#89e219] uppercase tracking-wider mb-2">North Star</p>
              <p className="text-xl font-bold text-white italic">&ldquo;{DECOMPOSITION.ns}&rdquo;</p>
            </div>
            <div className="space-y-2">
              {DECOMPOSITION.inputs.map((input, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-[#89e219] uppercase tracking-wider">{input.label}</p>
                      <p className="text-sm text-white/70 mt-0.5">{input.metric}</p>
                    </div>
                    <span className="text-xs bg-[#1f2228] border border-white/10 rounded-full px-2 py-1 text-white/60">{input.owner}</span>
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

        <RelatedPages slug="pm-north-star-metric" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Metric Definition Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on north star selection, input metrics, and metric trade-offs.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
