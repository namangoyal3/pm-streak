import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Workflow Automation (2026) — Zapier, Make, n8n, AI Agents",
  description:
    "How PMs build workflow automation products. Triggers, actions, error handling, and why automation adoption follows J-curves.",
  keywords: [
    "PM workflow automation", "Zapier PM",
    "automation PM 2026",
  ],
  alternates: { canonical: "/pm-workflow-automation" },
  openGraph: {
    title: "PM Workflow Automation 2026 — PM Streak",
    description: "How PMs build workflow automation products.",
    url: `${SITE_URL}/pm-workflow-automation`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Workflow+Automation+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Workflow Automation 2026 — PM Streak",
    description: "How PMs build workflow automation products.",
    images: [`${SITE_URL}/api/og?title=PM+Workflow+Automation+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Time-to-first-automation is everything — activation depends on it",
  "Integration count is the moat — Zapier beat competitors on coverage",
  "Error handling is the product — when automations fail silently, trust collapses",
  "AI shifted the ceiling — natural language + agents replacing visual builders",
  "Adoption follows J-curves — slow start, sudden scale when team patterns form",
];

const METRICS = [
  "Automations created per active user",
  "Automations successfully run per day",
  "Error rate and recovery rate",
  "Integration coverage (apps connected)",
  "Team/workspace adoption (viral within orgs)",
];

const FAQS = [
  {
    q: "Will AI agents replace visual automation builders?",
    a: "Partly, over several years. Power users will continue using deterministic visual builders for mission-critical workflows. Casual users will shift to natural language agents. The hybrid — agents that build deterministic workflows — is the most likely end state. Pure &apos;agent does everything&apos; approaches still hit reliability walls in 2026.",
  },
];

export default function PmWorkflowAutomationPage() {
  const dates = pageDates("/pm-workflow-automation");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Workflow Automation", url: `${SITE_URL}/pm-workflow-automation` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Workflow Automation (2026 Edition)",
        description:
          "How PMs build workflow automation products. Triggers, actions, error handling, and why automation adoption follows J-curves.",
        image: `${SITE_URL}/api/og?title=PM+Workflow+Automation+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-workflow-automation`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔗</span> Automation products live on integration coverage and reliability
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Workflow Automation<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Workflow-automation products live or die on five dynamics: fast time-to-first-automation, broad integration coverage, and visible error handling, layered against an AI shift toward natural-language builders and adoption that tends to follow a slow-then-sudden J-curve. PMs track this through automations created and run per user, error and recovery rates, and how far adoption spreads within a team.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for workflow automation PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Automation PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Dynamics</h2>
          <div className="space-y-2">
            {DYNAMICS.map((d, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Metrics</h2>
            <div className="space-y-2">
              {METRICS.map((m, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{m}</p>
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

        <RelatedPages slug="pm-workflow-automation" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Automation PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
