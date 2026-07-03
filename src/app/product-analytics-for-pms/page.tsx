import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "Product Analytics for Product Managers (2026) — Metrics, Funnels & A/B Testing",
  description:
    "Master product analytics as a PM. Retention curves, funnel analysis, A/B testing, north star metrics, and how to use Amplitude and Mixpanel — explained without the data science jargon.",
  keywords: [
    "product analytics for product managers", "PM analytics", "product metrics PM",
    "A/B testing product manager", "retention analysis PM",
    "funnel analysis product management", "amplitude mixpanel PM 2026",
  ],
  alternates: { canonical: "/product-analytics-for-pms" },
  openGraph: {
    title: "Product Analytics for Product Managers 2026 — PM Streak",
    description: "Retention, funnels, A/B testing, and dashboards — product analytics explained for PMs.",
    url: `${SITE_URL}/product-analytics-for-pms`,
    images: [{ url: `${SITE_URL}/api/og?title=Product+Analytics+for+Product+Managers+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Analytics for Product Managers 2026 — PM Streak",
    description: "Retention, funnels, A/B testing, and dashboards — product analytics explained for PMs.",
    images: [`${SITE_URL}/api/og?title=Product+Analytics+for+Product+Managers+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const ANALYTICS_CONCEPTS = [
  {
    concept: "Retention Curves",
    icon: "📉",
    what: "How many users from a given cohort are still active N days later. The most honest signal of product health.",
    howToRead: "Day 1 retention = % who return the day after signup. Day 7 = week 1 habits. Day 30 = product stickiness. A healthy product curve flattens — not drops to zero.",
    pmUse: "Compare retention by acquisition channel, user segment, or feature usage. Users who use Feature X have 2x D30 retention → Feature X is a habit driver.",
    redFlag: "If D7 retention is under 20% for a consumer app, the core loop is broken. Fix that before anything else.",
    sqlHint: "SELECT cohort_date, COUNT(DISTINCT user_id) as retained FROM events WHERE event_date = cohort_date + INTERVAL 7 DAY GROUP BY cohort_date",
  },
  {
    concept: "Funnel Analysis",
    icon: "🔻",
    what: "The conversion rate through each step of a user journey — from landing to activation, or from cart to purchase.",
    howToRead: "Each step has a drop-off rate. The step with the biggest drop-off is the highest-leverage improvement opportunity.",
    pmUse: "Run weekly funnel reviews. When a step drops unusually, investigate immediately — it's usually a bug, a UX change, or an external factor.",
    redFlag: "A step that shouldn't require effort (e.g. 'Continue to next step') with >30% drop-off usually means there's a bug or severe UX friction.",
    sqlHint: "Count distinct users at each event in sequence. Divide each step by the step before it to get conversion rates.",
  },
  {
    concept: "A/B Testing",
    icon: "🔬",
    what: "Running two versions of a feature simultaneously on randomly split user groups to measure which performs better.",
    howToRead: "Statistical significance (p < 0.05) means the result is unlikely to be random chance. Effect size tells you if it's worth shipping.",
    pmUse: "Always pre-register your hypothesis before seeing results. Post-hoc hypothesis generation leads to false positives. Run tests long enough to capture weekly cycles.",
    redFlag: "Peeking at results too early and stopping when you see significance is p-hacking. Wait for the pre-determined sample size or time period.",
    sqlHint: "Use a chi-squared test or t-test for proportions. Most tools (Amplitude, Optimizely) calculate this for you — but know what the number means.",
  },
  {
    concept: "North Star Metric",
    icon: "⭐",
    what: "The single metric that best captures the value your product delivers to users — and is a leading indicator of long-term business health.",
    howToRead: "A good north star moves when users get value and leads revenue growth. A bad north star can be gamed, lags too far behind user behaviour, or conflates different user journeys.",
    pmUse: "Decompose your north star into input metrics (things teams can directly influence). Build your roadmap around moving input metrics.",
    redFlag: "If your north star is revenue or an output metric — you're measuring outcomes, not causes. You'll ship things that move revenue short-term while destroying long-term health.",
    sqlHint: "Define the event that counts as 'value delivered' and count unique users or sessions where that event occurred per day/week.",
  },
  {
    concept: "Cohort Analysis",
    icon: "👥",
    what: "Grouping users by when they joined (or did a specific action) and tracking their behaviour over time separately per group.",
    howToRead: "If January cohorts retain better than October cohorts, something changed between Jan and Oct — product change, acquisition channel shift, or seasonality.",
    pmUse: "Use cohort analysis to measure the real impact of product changes over time. Aggregate metrics average over all cohorts and can hide trends.",
    redFlag: "Looking only at aggregate DAU and missing that newer cohorts retain much worse. This is how teams miss the early signal of product degradation.",
    sqlHint: "Add a signup_date to every user record. Group events by FLOOR(DATEDIFF(event_date, signup_date) / 7) for weekly cohort retention.",
  },
  {
    concept: "Event Tracking Schema",
    icon: "🏷️",
    what: "The structured naming and data model for the events your product emits — what gets tracked, what properties are attached, and how they're named.",
    howToRead: "Good schema: verb_noun format (button_clicked, lesson_completed). Bad schema: inconsistent names, missing user_id, or no timestamp.",
    pmUse: "PMs should own the event tracking plan. Define events before engineering builds the feature — not as an afterthought. Missing events can never be retroactively captured.",
    redFlag: "Discovering post-launch that you can't answer 'how many users completed step 3?' because you never tracked step 3. This is a planning failure, not an analytics failure.",
    sqlHint: "Every event should have: user_id, session_id, event_name, timestamp, and relevant properties. Define these in a tracking spec before sprint starts.",
  },
];

const TOOLS = [
  { tool: "Amplitude", use: "Funnel analysis, retention curves, cohort comparison, A/B test analysis. Default tool for most consumer apps in India." },
  { tool: "Mixpanel", use: "Similar to Amplitude with stronger real-time features. Common at startups and B2B SaaS." },
  { tool: "Google Analytics 4", use: "Web/app traffic, acquisition channels, basic funnel. Free tier — common at early-stage products." },
  { tool: "Metabase / Redash", use: "SQL-based dashboards from your data warehouse. Used when Amplitude isn't enough or data is in-house." },
  { tool: "SQL (BigQuery / Postgres)", use: "Direct data queries for custom analysis. PMs who can SQL query are 3x more self-sufficient." },
];

const FAQS = [
  {
    q: "How much analytics do product managers actually need to know?",
    a: "Enough to be self-sufficient on routine questions (what's my retention, where's the funnel drop, did this A/B test win?) and enough to have an intelligent conversation with your data analyst on deeper analysis. You don't need to build dashboards from scratch or write complex SQL — but PMs who can write basic SQL and read a p-value make better, faster decisions.",
  },
  {
    q: "What analytics tools should a PM know in India?",
    a: "Amplitude and Mixpanel for product analytics are the standard at most Indian startups and growth-stage companies. Basic SQL (Postgres or BigQuery syntax) is increasingly expected at data-driven companies. Google Analytics 4 for web products. The most important skill isn't the tool — it's knowing what question to ask and whether the data you're looking at actually answers it.",
  },
];

export default function ProductAnalyticsForPmsPage() {
  const dates = pageDates("/product-analytics-for-pms");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Product Analytics for PMs", url: `${SITE_URL}/product-analytics-for-pms` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Product Analytics for Product Managers (2026)",
        description: "Master product analytics as a PM. Retention curves, funnel analysis, A/B testing, north star metrics, and how to use Amplitude and Mixpanel — explained without the data science jargon.",
        image: `${SITE_URL}/api/og?title=Product+Analytics+for+Product+Managers+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/product-analytics-for-pms`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📊</span> Data without context is noise. Context without data is guesswork.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Product Analytics<br />for Product Managers (2026)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Product analytics for PMs breaks down into six recurring skills: reading retention curves,
            diagnosing funnel drop-off, running valid A/B tests, defining a north star metric, doing
            cohort analysis, and owning the event tracking schema — then using tools like Amplitude,
            Mixpanel, GA4, or direct SQL to answer routine questions without waiting on a data analyst.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Retention curves, funnels, A/B tests, cohort analysis, and event tracking —
            the analytics concepts every PM needs, explained without the data science jargon.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice Analytics Questions Daily — Free →
          </Link>
        </section>

        {/* Concepts */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="space-y-6">
            {ANALYTICS_CONCEPTS.map((c, i) => (
              <div key={c.concept} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{c.icon}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white/20 font-bold text-sm">{String(i + 1).padStart(2, "0")}</span>
                    <h2 className="text-lg font-bold text-white">{c.concept}</h2>
                  </div>
                </div>
                <p className="text-sm text-white/70 mb-4">{c.what}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <div className="bg-[#0e1113] rounded-lg p-3">
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-1">How to read it</p>
                    <p className="text-xs text-white/60">{c.howToRead}</p>
                  </div>
                  <div className="bg-[#0e1113] rounded-lg p-3">
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-1">PM use case</p>
                    <p className="text-xs text-white/60">{c.pmUse}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-3">
                    <p className="text-xs text-yellow-400">⚠️ Red flag to watch: {c.redFlag}</p>
                  </div>
                  <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-lg p-3">
                    <p className="text-xs text-[#89e219] font-mono">{c.sqlHint}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tools */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">PM Analytics Tools to Know</h2>
            <div className="space-y-3">
              {TOOLS.map((t, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4 flex gap-4">
                  <span className="font-semibold text-[#89e219] text-sm flex-shrink-0 w-32">{t.tool}</span>
                  <span className="text-sm text-white/60">{t.use}</span>
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

        <RelatedPages slug="product-analytics-for-pms" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Analytics Intuition in 2 Minutes a Day</h2>
          <p className="text-white/60 mb-6">Daily PM analytics scenarios — interpret real dashboards, diagnose metric drops, design experiments.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
