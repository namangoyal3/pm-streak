import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Dashboard Design Guide (2026) — What to Track & How",
  description:
    "How PMs design dashboards that drive decisions. What to track, what to cut, the hierarchy of metrics, and how to make dashboards your team actually checks.",
  keywords: [
    "PM dashboard design", "product manager dashboard",
    "metrics dashboard PM", "Amplitude dashboard PM",
    "PM dashboard hierarchy 2026",
  ],
  alternates: { canonical: "/pm-dashboard-design" },
  openGraph: {
    title: "PM Dashboard Design Guide 2026 — PM Streak",
    description: "How PMs design dashboards that drive decisions — hierarchy, what to track, what to cut.",
    url: `${SITE_URL}/pm-dashboard-design`,
    type: "article",
  },
};

const HIERARCHY = [
  {
    layer: "North Star (Top of dashboard)",
    what: "The one metric that captures value delivered. Trend visible at a glance.",
    example: "Daily Active Learners completing a lesson",
  },
  {
    layer: "Input Metrics (Second row)",
    what: "3–5 metrics that cause the north star to move. PM levers.",
    example: "New signups, activation rate, D7 retention, repeat session rate",
  },
  {
    layer: "Health / Guardrail Metrics",
    what: "Things that must not break. Visible but not central.",
    example: "D30 retention, NPS, churn rate, error rate",
  },
  {
    layer: "Segment Views",
    what: "Same metrics cut by cohort, channel, geo, device — accessible via filter, not always on.",
    example: "Same funnel, segmented by acquisition channel and device",
  },
  {
    layer: "Diagnostic (Linked out)",
    what: "Detail views for when a top metric moves unexpectedly. Not always visible.",
    example: "Event-level funnel, cohort retention curves, experiment results",
  },
];

const DESIGN_RULES = [
  "One screen, no scrolling. If it doesn&apos;t fit, you&apos;re showing too much.",
  "Absolute numbers AND trend. &apos;28% retention&apos; is incomplete without &apos;was 25% last week.&apos;",
  "Comparison to target. If a metric has a goal, show the gap.",
  "Consistent colour language. Green = up and good; red = down and bad. Never swap.",
  "Timestamp everything. &apos;As of X date&apos; prevents stale-data confusion.",
  "No vanity metrics. Page views, raw signups, total downloads — these rarely drive decisions.",
  "Link to action, not just numbers. Each metric should answer &apos;if this changes, what do we do?&apos;",
];

const TOOLS = [
  { tool: "Amplitude / Mixpanel", use: "Event-based product analytics. Strong for funnels, retention, cohorts." },
  { tool: "Looker / Metabase / Superset", use: "SQL-based BI dashboards. Flexible, slower to set up, deeper for custom analysis." },
  { tool: "Notion / Coda embeds", use: "Embed live metric snapshots into PM docs. Great for weekly updates." },
  { tool: "Tableau / Power BI", use: "Enterprise BI tools. Common at larger companies with dedicated analytics teams." },
];

const FAQS = [
  {
    q: "What&apos;s the most common PM dashboard mistake?",
    a: "Showing too much. PMs often try to include every metric that might be relevant, which produces dashboards nobody reads. Great dashboards have 5–8 core metrics visible without scrolling, organised by hierarchy (north star → inputs → guardrails → diagnostic). Everything else lives in linked detail views.",
  },
  {
    q: "How often should PMs check their dashboards?",
    a: "Daily glance (30 seconds) to spot anomalies. Weekly deep review (15 min) to make decisions. Monthly reflection (30 min) to spot trends. Dashboards that aren&apos;t part of a reviewing rhythm go stale; dashboards that are checked religiously drive faster decisions.",
  },
  {
    q: "Who should have access to a PM dashboard?",
    a: "Default to more visibility. Engineering, design, and leadership should see what you see. Transparent metrics build team alignment and reduce the need for you to be the metrics spokesperson. The only exception: highly sensitive business metrics (revenue per customer, individual user data) that have legal or privacy constraints.",
  },
];

export default function PmDashboardDesignPage() {
  const dates = pageDates("/pm-dashboard-design");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Dashboard Design", url: `${SITE_URL}/pm-dashboard-design` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Dashboard Design Guide (2026 Edition)",
        description: "How PMs design dashboards that drive decisions. What to track, what to cut, the hierarchy of metrics, and how to make dashboards your team actually checks.",
        image: `${SITE_URL}/api/og?title=PM+Dashboard+Design+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-dashboard-design`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📊</span> A great dashboard turns ambient attention into decisions
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Dashboard Design Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            A well-designed PM dashboard stacks metrics in five layers, from the north star at the
            top, through three to five input metrics that move it, down to guardrail metrics,
            segment cuts, and linked diagnostic views — fitting on one screen with no scrolling,
            always paired with a trend and a target, so the whole team can glance at it daily
            without needing you to explain what it means.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The 5-layer metric hierarchy, 7 design rules for dashboards that get checked,
            and 4 tool categories used by PMs at top companies.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Metric Fluency Daily — Free →
          </Link>
        </section>

        {/* Hierarchy */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5-Layer Dashboard Hierarchy</h2>
          <div className="space-y-4">
            {HIERARCHY.map((h, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <p className="font-bold text-white mb-1">{i + 1}. {h.layer}</p>
                <p className="text-sm text-white/70 mb-2">{h.what}</p>
                <p className="text-xs text-[#89e219]">💡 Example: <span className="text-white/70">{h.example}</span></p>
              </div>
            ))}
          </div>
        </section>

        {/* Rules */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">7 Design Rules</h2>
            <div className="space-y-2">
              {DESIGN_RULES.map((r, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{r}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">4 Dashboard Tool Categories</h2>
          <div className="space-y-3">
            {TOOLS.map((t, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-[#89e219] text-sm mb-1">{t.tool}</p>
                <p className="text-xs text-white/60">{t.use}</p>
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

        <RelatedPages slug="pm-dashboard-design" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Metric Thinking Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on dashboard design, diagnosis, and metric trade-offs.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
