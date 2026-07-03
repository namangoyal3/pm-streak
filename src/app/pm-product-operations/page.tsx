import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Product Operations (2026) — What ProdOps Does and When You Need It",
  description:
    "How product operations teams support PM orgs. Rituals, tooling, research ops, and when hiring a ProdOps lead pays for itself.",
  keywords: [
    "PM product operations", "ProdOps",
    "product ops PM", "product operations 2026",
  ],
  alternates: { canonical: "/pm-product-operations" },
  openGraph: {
    title: "PM Product Operations 2026 — PM Streak",
    description: "What ProdOps does and when PM orgs need it.",
    url: `${SITE_URL}/pm-product-operations`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Product+Operations+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Product Operations 2026 — PM Streak",
    description: "What ProdOps does and when PM orgs need it.",
    images: [`${SITE_URL}/api/og?title=PM+Product+Operations+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const RESPONSIBILITIES = [
  "PM rituals — roadmap reviews, OKR cadences, launch reviews",
  "Tooling and templates — PRDs, research repos, analytics access",
  "Research ops — recruiting, scheduling, transcripts, insight repos",
  "Launch coordination — cross-team dependencies, release readiness",
  "Metrics governance — definitions, dashboards, single source of truth",
  "Onboarding new PMs — docs, shadowing, ramp plans",
];

const WHEN_TO_HIRE = [
  "PM team &gt; 15 people and onboarding feels inconsistent",
  "Research findings aren&apos;t reaching decisions — insight loss",
  "Roadmap reviews consume senior-PM time disproportionately",
  "Metric definitions vary across teams — &apos;active user&apos; means 3 things",
];

const FAQS = [
  {
    q: "Is ProdOps a career path or a stop-gap?",
    a: "Increasingly a career path. Senior ProdOps leaders at large orgs (Atlassian, Stripe, Shopify) now lead teams of 10+ with meaningful scope. Career trajectories split into: ProdOps leadership, transitioning to senior PM, or moving into org design/Chief of Staff roles.",
  },
];

export default function PmProductOperationsPage() {
  const dates = pageDates("/pm-product-operations");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Product Operations", url: `${SITE_URL}/pm-product-operations` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Product Operations (2026 Edition)",
        description:
          "How product operations teams support PM orgs. Rituals, tooling, research ops, and when hiring a ProdOps lead pays for itself.",
        image: `${SITE_URL}/api/og?title=PM+Product+Operations+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-product-operations`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>⚙️</span> ProdOps is force-multiplier for PM orgs that scale past 15
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Product Operations<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Teams typically bring in a dedicated ProdOps lead once the PM team passes roughly 15 people, onboarding turns inconsistent, research insight stops reaching decisions, or metric definitions start drifting across teams. Day to day, ProdOps owns PM rituals, tooling and templates, research operations, launch coordination, metrics governance, and new-PM onboarding — work that otherwise falls unevenly on senior PMs.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 responsibilities and 4 signals that it&apos;s time to hire a ProdOps lead.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build ProdOps Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Responsibilities</h2>
          <div className="space-y-2">
            {RESPONSIBILITIES.map((r, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{r}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">4 Signals to Hire</h2>
            <div className="space-y-2">
              {WHEN_TO_HIRE.map((w, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
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

        <RelatedPages slug="pm-product-operations" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice ProdOps Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
