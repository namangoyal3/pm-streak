import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "Growth Product Manager Guide (2026) — How to Become a Growth PM",
  description:
    "The complete growth PM playbook. Acquisition, activation, retention, referral, revenue — what growth PMs actually do, interview questions, and how to transition into growth PM.",
  keywords: [
    "growth product manager", "growth PM india",
    "how to become growth PM", "growth PM interview questions",
    "growth product manager salary", "PLG product manager 2026",
  ],
  alternates: { canonical: "/growth-product-manager" },
  openGraph: {
    title: "Growth Product Manager Guide 2026 — PM Streak",
    description: "What growth PMs do, interview questions, and how to break into growth PM roles.",
    url: `${SITE_URL}/growth-product-manager`,
    images: [{ url: `${SITE_URL}/api/og?title=Growth+Product+Manager+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Growth Product Manager Guide 2026 — PM Streak",
    description: "What growth PMs do, interview questions, and how to break into growth PM roles.",
    images: [`${SITE_URL}/api/og?title=Growth+Product+Manager+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const AARRR = [
  {
    stage: "Acquisition",
    what: "Getting users to your product. Traffic, signups, installs.",
    growthPmWork: "Landing page optimisation, SEO-driven product features, referral programs, paid-to-organic conversion, onboarding to activation funnel",
    metrics: "CAC, CAC payback, channel mix, signup conversion rate",
  },
  {
    stage: "Activation",
    what: "Getting users to their first 'aha' moment where they understand value.",
    growthPmWork: "Onboarding redesigns, empty state design, first-session experiments, early triggers, trust signals",
    metrics: "Activation rate, time-to-value, Day-1 engagement",
  },
  {
    stage: "Retention",
    what: "Bringing users back. Building the habit. Reducing churn.",
    growthPmWork: "Habit loops, notification strategy, engagement features, churn prediction, winback campaigns",
    metrics: "D7/D30 retention, cohort retention curves, DAU/MAU ratio",
  },
  {
    stage: "Referral",
    what: "Turning existing users into new user acquisition.",
    growthPmWork: "Referral mechanics, viral loops, share features, network effects, word-of-mouth drivers",
    metrics: "Viral coefficient (K-factor), referral share rate, referral conversion",
  },
  {
    stage: "Revenue",
    what: "Monetising. Free-to-paid conversion. Expansion.",
    growthPmWork: "Pricing page design, paywall timing, free tier calibration, upsell mechanics, PLG motion",
    metrics: "Conversion rate, ARPU, LTV, expansion revenue",
  },
];

const GROWTH_VS_CORE = [
  { dim: "Primary output", core: "Features that solve user problems", growth: "Experiments that move user behaviour" },
  { dim: "Tool of choice", core: "PRDs, user research", growth: "A/B tests, funnel analytics, SQL" },
  { dim: "Time horizon", core: "3–12 month product bets", growth: "1–4 week experiment cycles" },
  { dim: "Collaboration", core: "Design + engineering heavy", growth: "Marketing + data + engineering heavy" },
  { dim: "Mental model", core: "What should we build?", growth: "What's blocking users from the next step?" },
  { dim: "Success signal", core: "Retention, NPS, user value", growth: "Funnel conversion, viral coefficient, revenue" },
];

const INTERVIEW_QUESTIONS = [
  "Acquisition: A channel's CAC suddenly doubles. Walk through your diagnosis.",
  "Activation: Only 15% of signups reach Day 1 'aha'. Design an experiment to improve it.",
  "Retention: Your D30 retention curve is flat at 12%. Is this a fixable problem? How?",
  "Referral: Design a referral program for a social commerce app targeting Tier-2 users.",
  "Revenue: Free users use the product heavily but don't convert. Diagnose and propose.",
  "Growth strategy: You have engineering for 1 growth experiment this sprint. How do you decide what to test?",
];

const FAQS = [
  {
    q: "How is a growth PM different from a regular PM?",
    a: "Growth PMs focus on moving metrics through experimentation across the user funnel (acquisition → revenue), while core product PMs focus on building features that solve user problems. Growth PMs run more A/B tests, work closely with marketing and data teams, and typically have shorter iteration cycles (1–4 weeks) than core PMs. Both are PM roles — the mindset and toolkit differ.",
  },
  {
    q: "What companies in India hire growth PMs?",
    a: "Most consumer tech companies now have growth PM roles: Swiggy, Zomato, CRED, Zepto, Meesho, Flipkart, PhonePe, Groww, Zerodha, Dream11. SaaS companies with PLG motions (Freshworks, Chargebee, Zoho, Postman, Hasura) also hire growth PMs specifically. Growth PMs typically earn similar or slightly higher than core PMs at the same level due to direct revenue impact.",
  },
  {
    q: "How do I transition from a core PM role to growth PM?",
    a: "Start by owning growth-adjacent experiments on your current team — even small ones. Get fluent in A/B testing, funnel analysis, and SQL. Read Reforge, Lenny's Newsletter, and growth case studies. Internal transfers to growth are often easier than external switches — most successful growth PMs started as core PMs at the same company. If transitioning externally, lead with specific metrics you moved, not just features you shipped.",
  },
];

export default function GrowthProductManagerPage() {
  const dates = pageDates("/growth-product-manager");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Growth Product Manager", url: `${SITE_URL}/growth-product-manager` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Growth Product Manager Guide (2026 Edition)",
        description: "The complete growth PM playbook. Acquisition, activation, retention, referral, revenue — what growth PMs actually do, interview questions, and how to transition into growth PM.",
        image: `${SITE_URL}/api/og?title=Growth+Product+Manager+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/growth-product-manager`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📈</span> The PM role with the fastest feedback loops in tech
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Growth Product Manager Guide<br />(2026 Edition)
          </h1>
          <p className="text-base text-white/60 max-w-2xl mx-auto mb-2">
            Growth product managers own the AARRR funnel — acquisition, activation, retention, referral, and revenue — running 1–4 week A/B tests to move specific metrics rather than shipping longer feature roadmaps. Compared with core PMs, growth PMs lean harder on SQL and funnel analytics and partner closely with marketing and data teams to hit CAC, retention, and conversion targets.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-white/60 hover:text-[#89e219] underline underline-offset-2">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            What growth PMs actually do across AARRR, how the role differs from core PM,
            interview questions, and how to transition from core PM to growth.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Start Growth PM Prep — Free →
          </Link>
        </section>

        {/* AARRR */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">The AARRR Framework — Growth PM&apos;s Map</h2>
          <div className="space-y-4">
            {AARRR.map((a, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-8 rounded-full bg-[#58cc02]/20 text-[#89e219] font-bold text-sm flex items-center justify-center">{i + 1}</span>
                  <h3 className="font-bold text-white">{a.stage}</h3>
                </div>
                <p className="text-sm text-white/70 mb-3 ml-11">{a.what}</p>
                <div className="ml-11 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-lg p-3">
                    <p className="text-xs text-[#89e219] mb-1">🔧 Growth PM work</p>
                    <p className="text-xs text-white/60">{a.growthPmWork}</p>
                  </div>
                  <div className="bg-[#0e1113] rounded-lg p-3">
                    <p className="text-xs text-white/40 mb-1">📊 Metrics to own</p>
                    <p className="text-xs text-white/60">{a.metrics}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Growth vs Core */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">Growth PM vs Core Product PM</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-white/40 font-medium">Dimension</th>
                    <th className="text-left py-3 px-4 text-blue-400 font-medium">Core PM</th>
                    <th className="text-left py-3 px-4 text-green-400 font-medium">Growth PM</th>
                  </tr>
                </thead>
                <tbody>
                  {GROWTH_VS_CORE.map((row, i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="py-3 px-4 text-white/50 text-xs">{row.dim}</td>
                      <td className="py-3 px-4 text-white/70 text-xs">{row.core}</td>
                      <td className="py-3 px-4 text-white/70 text-xs">{row.growth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Interview questions */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">Growth PM Interview Questions</h2>
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
            <ul className="space-y-3">
              {INTERVIEW_QUESTIONS.map((q, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="text-[#89e219] flex-shrink-0 font-bold">{i + 1}.</span>
                  <span className="text-white/70">{q}</span>
                </li>
              ))}
            </ul>
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

        <RelatedPages slug="growth-product-manager" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Growth PM Muscle Daily</h2>
          <p className="text-white/60 mb-6">A/B test design, funnel diagnosis, and growth loop scenarios with AI feedback.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
