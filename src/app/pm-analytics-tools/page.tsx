import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Analytics Tools (2026) — Mixpanel, Amplitude, PostHog Compared",
  description:
    "The analytics tools PMs actually use in 2026 — Mixpanel, Amplitude, PostHog, Heap, GA4. When to use which, pricing, and PM-specific workflows.",
  keywords: [
    "PM analytics tools", "Mixpanel vs Amplitude",
    "PostHog PM", "product analytics 2026",
    "PM tooling stack",
  ],
  alternates: { canonical: "/pm-analytics-tools" },
  openGraph: {
    title: "PM Analytics Tools 2026 — PM Streak",
    description: "Mixpanel, Amplitude, PostHog, Heap, GA4 compared for PMs.",
    url: `${SITE_URL}/pm-analytics-tools`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Analytics+Tools+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Analytics Tools 2026 — PM Streak",
    description: "Mixpanel, Amplitude, PostHog, Heap, GA4 compared for PMs.",
    images: [`${SITE_URL}/api/og?title=PM+Analytics+Tools+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const TOOLS = [
  { name: "Mixpanel", strength: "Funnels, cohorts, retention. Strong for consumer product teams.", weakness: "Pricey at scale; event volume billing adds up fast.", pick: "Consumer apps with clear funnels." },
  { name: "Amplitude", strength: "Behavioural cohorts, pathfinder, enterprise-grade governance.", weakness: "Learning curve; UI can overwhelm new users.", pick: "Mid-to-large orgs with analytics maturity." },
  { name: "PostHog", strength: "Open source, self-hostable, session replay + feature flags bundled.", weakness: "Less polished than Amplitude for deep slicing.", pick: "Startups wanting one tool for everything." },
  { name: "Heap", strength: "Autocapture — no event instrumentation needed upfront.", weakness: "Autocapture noise; still need to define meaningful events.", pick: "Teams without engineering bandwidth for tracking." },
  { name: "GA4", strength: "Free, ubiquitous, good for marketing attribution.", weakness: "Weak for deep product analytics; sampling issues.", pick: "Marketing-led teams, early-stage." },
];

const WORKFLOWS = [
  "Funnel analysis — where do users drop off between step A and step B?",
  "Retention curves — what % of new users come back on day 1, 7, 30?",
  "Cohort comparison — how do users from channel X compare to channel Y?",
  "Feature adoption — what % of eligible users tried the new feature?",
  "Session replay — watch real users struggle with a flow",
];

const FAQS = [
  {
    q: "Mixpanel or Amplitude in 2026?",
    a: "Amplitude has pulled ahead for mid-to-large orgs thanks to better governance and behavioural cohorts. Mixpanel remains strong for consumer teams with clear funnel-driven products. At early stage, neither — use PostHog and save the money for when you have enough data to justify the spend.",
  },
  {
    q: "Is PostHog really good enough to replace Amplitude?",
    a: "For teams under ~50 product people, yes. Session replay + feature flags + analytics in one tool is a big ergonomic win. For large orgs with strict governance and complex cohort definitions, Amplitude still wins — but PostHog closes the gap every quarter.",
  },
];

export default function PmAnalyticsToolsPage() {
  const dates = pageDates("/pm-analytics-tools");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Analytics Tools", url: `${SITE_URL}/pm-analytics-tools` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Analytics Tools (2026 Edition)",
        description:
          "The analytics tools PMs actually use in 2026 — Mixpanel, Amplitude, PostHog, Heap, GA4. When to use which, pricing, and PM-specific workflows.",
        image: `${SITE_URL}/api/og?title=PM+Analytics+Tools+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-analytics-tools`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📊</span> The tool is cheap. The instrumentation is the real cost.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Analytics Tools<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Mixpanel, Amplitude, PostHog, Heap, and GA4 make up the PM analytics stack in 2026 — Mixpanel and Amplitude suit funnel-driven and enterprise teams, PostHog bundles session replay and feature flags for startups, Heap covers teams without engineering bandwidth via autocapture, and GA4 handles marketing-led attribution for free. The five workflows every PM should run across them: funnel analysis, retention curves, cohort comparison, feature adoption, and session replay.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 tools compared, 5 core workflows every PM should know.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Analytics Fluency — Free →
          </Link>
        </section>

        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Tools Compared</h2>
          <div className="space-y-4">
            {TOOLS.map((t, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <p className="font-bold text-white mb-2">{t.name}</p>
                <p className="text-xs text-green-400 mb-1">Strength: <span className="text-white/70">{t.strength}</span></p>
                <p className="text-xs text-red-400 mb-1">Weakness: <span className="text-white/70">{t.weakness}</span></p>
                <p className="text-xs text-[#89e219]">Pick if: <span className="text-white/70">{t.pick}</span></p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Core Workflows</h2>
            <div className="space-y-2">
              {WORKFLOWS.map((w, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{w}</p>
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

        <RelatedPages slug="pm-analytics-tools" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Analytics Fluency Daily</h2>
          <p className="text-white/60 mb-6">Daily PM scenarios on funnels, cohorts, retention, and metric choice.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
