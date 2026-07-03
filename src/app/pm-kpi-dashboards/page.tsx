import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM KPI Dashboards (2026) — What to Build, What to Skip",
  description:
    "How PMs design KPI dashboards that drive action. What to include, what to cut, the right cadence, and how to make dashboards your team actually checks.",
  keywords: [
    "PM KPI dashboard", "product manager dashboards",
    "metrics dashboard PM", "product KPIs",
    "PM dashboard tools 2026",
  ],
  alternates: { canonical: "/pm-kpi-dashboards" },
  openGraph: {
    title: "PM KPI Dashboards 2026 — PM Streak",
    description: "How PMs design dashboards that drive decisions — what to include, cadence, tools.",
    url: `${SITE_URL}/pm-kpi-dashboards`,
    type: "article",
  },
};

const PM_DASHBOARDS = [
  { dashboard: "North Star Dashboard", what: "Single view of your one most important metric + 3–5 inputs + guardrails", cadence: "Check daily (30 sec)" },
  { dashboard: "Funnel Dashboard", what: "Conversion at each funnel stage + weekly trends + cohort breakouts", cadence: "Review weekly (15 min)" },
  { dashboard: "Retention Dashboard", what: "D1/D7/D30 retention curves by cohort + segment slices", cadence: "Review weekly (10 min)" },
  { dashboard: "Experiment Dashboard", what: "Active experiments, status, metrics, expected end date", cadence: "Review 2x weekly" },
  { dashboard: "Revenue / Unit Economics Dashboard", what: "MRR, NRR, CAC, LTV, payback — if revenue is in your scope", cadence: "Review weekly (10 min)" },
  { dashboard: "Quality / Health Dashboard", what: "Bugs, crashes, support ticket trends, NPS — guardrail metrics", cadence: "Review weekly (5 min)" },
];

const DESIGN_RULES = [
  "Name the owner of each metric on the dashboard — accountability + question routing",
  "Pair absolute numbers with trend (last week, last month) — context matters",
  "Compare against target — visible gap drives action",
  "Auto-refresh — stale dashboards get ignored",
  "Link from metric to diagnostic — &apos;retention dropped&apos; should link to segmented view",
  "Annotate major events (launches, outages) — explains metric movements later",
];

const ANTI_PATTERNS = [
  "50-chart dashboards — nobody reads them, everyone ignores them",
  "Vanity metrics prominently displayed — signals to the team what to optimise for (poorly)",
  "No guardrails — primary metric wins, team celebrates, silent damage elsewhere",
  "Dashboard that requires a data analyst to interpret — PM-owned dashboards should be self-explanatory",
  "Not showing baselines — &apos;retention 28%&apos; without &apos;was 25% last week&apos; loses meaning",
  "Building the dashboard once and never updating it — metrics shift as products evolve",
];

const FAQS = [
  {
    q: "How many dashboards should a PM maintain?",
    a: "2–4 actively. North Star + funnel + retention + experiment is usually enough for most PM scopes. Adding more dashboards dilutes attention — great dashboards are ones you check weekly, not ones that exist. If a dashboard hasn&apos;t been checked in 2 weeks, it&apos;s not a dashboard — it&apos;s a document.",
  },
  {
    q: "Should PMs build dashboards themselves or work with data analysts?",
    a: "Core dashboards: build yourself in Amplitude/Mixpanel if possible — keeps you close to the numbers. Complex dashboards (custom SQL, multiple sources): partner with data analysts. The failure mode: PMs who can&apos;t build any dashboard themselves stay dependent and slow. SQL basics + Amplitude fluency is a force multiplier.",
  },
];

export default function PmKpiDashboardsPage() {
  const dates = pageDates("/pm-kpi-dashboards");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM KPI Dashboards", url: `${SITE_URL}/pm-kpi-dashboards` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM KPI Dashboards (2026 Edition)",
        description: "How PMs design KPI dashboards that drive action. What to include, what to cut, the right cadence, and how to make dashboards your team actually checks.",
        image: `${SITE_URL}/api/og?title=PM+KPI+Dashboards+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-kpi-dashboards`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📈</span> The dashboards PMs actually check every week
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM KPI Dashboards<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-2">
            Building dashboards PMs actually use starts with six specific views — North Star, funnel, retention,
            experiment, revenue, and quality — each assigned its own review cadence, alongside six design rules
            and six anti-patterns to avoid. Most PM scopes only need two to four dashboards checked weekly; a
            dashboard a team hasn&apos;t opened in two weeks has become a document, not a dashboard.
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-2">
            6 dashboards every PM should have, 6 design rules, 6 anti-patterns,
            and the cadence that keeps dashboards alive vs stale.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Metric Intuition Daily — Free →
          </Link>
        </section>

        {/* Dashboards */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Dashboards Every PM Should Have</h2>
          <div className="space-y-4">
            {PM_DASHBOARDS.map((d, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                  <p className="font-bold text-white">{i + 1}. {d.dashboard}</p>
                  <span className="text-xs bg-[#58cc02]/20 text-[#89e219] px-2 py-0.5 rounded-full">{d.cadence}</span>
                </div>
                <p className="text-xs text-white/60">{d.what}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Design rules */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Design Rules</h2>
            <div className="space-y-2">
              {DESIGN_RULES.map((r, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{r}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Anti-patterns */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Dashboard Anti-Patterns</h2>
          <div className="space-y-2">
            {ANTI_PATTERNS.map((a, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-red-400 flex-shrink-0">❌</span>
                <p className="text-sm text-white/70">{a}</p>
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

        <RelatedPages slug="pm-kpi-dashboards" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Metric Intuition Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on diagnosing metrics, designing dashboards, and making decisions from data.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
