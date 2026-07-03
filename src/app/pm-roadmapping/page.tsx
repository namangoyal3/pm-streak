import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Roadmapping (2026) — Now/Next/Later, OKRs, and What Actually Works",
  description:
    "How PMs build roadmaps that survive reality. Now/Next/Later, outcome roadmaps, and why timeline roadmaps keep failing.",
  keywords: [
    "PM roadmapping", "product roadmap",
    "now next later", "outcome roadmap 2026",
  ],
  alternates: { canonical: "/pm-roadmapping" },
  openGraph: {
    title: "PM Roadmapping 2026 — PM Streak",
    description: "How PMs build roadmaps that survive reality.",
    url: `${SITE_URL}/pm-roadmapping`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Roadmapping+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Roadmapping 2026 — PM Streak",
    description: "How PMs build roadmaps that survive reality.",
    images: [`${SITE_URL}/api/og?title=PM+Roadmapping+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const FORMATS = [
  { f: "Now / Next / Later", w: "Honest about uncertainty. Works for most modern teams." },
  { f: "Outcome roadmap", w: "Organised by goal (retention, activation) rather than feature." },
  { f: "Timeline / Gantt", w: "Rarely holds up in software. Use only for hard external deadlines." },
  { f: "Theme roadmap", w: "Bets grouped by strategic theme. Good for exec audiences." },
  { f: "Kanban-style", w: "Discovery / In-progress / Shipped. Honest but lacks strategic framing." },
];

const RULES = [
  "Never promise dates you can&apos;t commit to — trust burns fast",
  "Distinguish committed from explored — different confidence, different treatment",
  "Update at a fixed cadence — monthly works for most teams",
  "Link every roadmap item to an outcome — shipping &ne; impact",
  "Kill items publicly — stopping work is a sign of rigor, not weakness",
];

const FAQS = [
  {
    q: "Should roadmaps be public?",
    a: "Depends on audience. Internal: always, with honest uncertainty labels. Customer-facing: share themes and near-term priorities; avoid specific dates unless truly committed. Public-facing (like GitHub issues): great for open-source and dev-tools products, risky for consumer products where competitors watch closely.",
  },
];

export default function PmRoadmappingPage() {
  const dates = pageDates("/pm-roadmapping");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Roadmapping", url: `${SITE_URL}/pm-roadmapping` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Roadmapping (2026 Edition)",
        description:
          "How PMs build roadmaps that survive reality. Now/Next/Later, outcome roadmaps, and why timeline roadmaps keep failing.",
        image: `${SITE_URL}/api/og?title=PM+Roadmapping+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-roadmapping`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🗺️</span> A roadmap is a prediction, not a promise
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Roadmapping<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            This page compares five roadmap formats — Now/Next/Later, outcome, timeline/Gantt, theme, and Kanban-style — noting that Now/Next/Later works for most modern teams because it stays honest about uncertainty, while timeline roadmaps rarely hold up in software. Five accompanying rules cover promising only dates you can commit to, separating committed from explored work, a fixed update cadence, tying items to outcomes, and killing items publicly.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 roadmap formats compared and 5 rules for roadmaps that survive reality.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Roadmapping PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Roadmap Formats</h2>
          <div className="space-y-3">
            {FORMATS.map((f, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-[#89e219] text-sm mb-1">{f.f}</p>
                <p className="text-xs text-white/60">{f.w}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Rules</h2>
            <div className="space-y-2">
              {RULES.map((r, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{r}</p>
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

        <RelatedPages slug="pm-roadmapping" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Roadmapping Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
