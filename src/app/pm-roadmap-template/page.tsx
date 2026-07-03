import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Roadmap Template (2026) — How to Structure a Product Roadmap That Works",
  description:
    "The PM roadmap template that actually gets used. Outcome-based structure, visualisation patterns, how to handle stakeholder asks, and the now/next/later format.",
  keywords: [
    "PM roadmap template", "product roadmap template",
    "now next later roadmap", "outcome roadmap PM",
    "product roadmap example 2026",
  ],
  alternates: { canonical: "/pm-roadmap-template" },
  openGraph: {
    title: "PM Roadmap Template 2026 — PM Streak",
    description: "How to structure a product roadmap that actually gets used — outcome-based, now/next/later.",
    url: `${SITE_URL}/pm-roadmap-template`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Roadmap+Template+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Roadmap Template 2026 — PM Streak",
    description: "How to structure a product roadmap that actually gets used — outcome-based, now/next/later.",
    images: [`${SITE_URL}/api/og?title=PM+Roadmap+Template+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const FORMATS = [
  {
    format: "Now / Next / Later",
    what: "Group initiatives by certainty, not date. &apos;Now&apos; is committed. &apos;Next&apos; is directional. &apos;Later&apos; is strategic.",
    bestFor: "Externally shared roadmaps. Stakeholders who want direction without false precision.",
  },
  {
    format: "Outcome Roadmap",
    what: "Organise by outcome (metric to move), not feature. Each outcome has candidate initiatives under it.",
    bestFor: "Teams that want flexibility on how to hit goals. Leadership that cares about results, not specific features.",
  },
  {
    format: "Quarterly Theme Roadmap",
    what: "Each quarter has 1–2 themes. Every initiative ladders up to a theme.",
    bestFor: "Companies with clear quarterly rhythms. Helps maintain focus across quarters." ,
  },
  {
    format: "Timeline / Gantt Roadmap",
    what: "Classic feature-by-date view. Useful for execution tracking within a quarter.",
    bestFor: "Internal engineering coordination. Bad for external stakeholders — creates false precision.",
  },
];

const SECTIONS = [
  { section: "Vision", what: "One paragraph: what we&apos;re building toward over 12–24 months." },
  { section: "Strategic Pillars", what: "2–4 themes that organise all work. Helps with focus." },
  { section: "Now (Committed)", what: "Next 1–3 months. Real dates. Engineering signed off." },
  { section: "Next (Directional)", what: "3–6 months out. Priorities clear, dates approximate." },
  { section: "Later (Exploratory)", what: "6+ months. Strategic direction, specifics TBD." },
  { section: "What We&apos;re NOT Doing", what: "Explicit non-priorities. Prevents &apos;is X on the roadmap?&apos; from every stakeholder." },
  { section: "Metric We&apos;re Moving", what: "For each pillar/theme: what&apos;s the outcome metric we&apos;re trying to shift?" },
];

const MISTAKES = [
  "Roadmap as a list of features — no outcomes tied to any of them",
  "Hard dates 9 months out — creates commitments you can&apos;t keep",
  "No &apos;not doing&apos; section — scope creep is inevitable",
  "Same roadmap for engineering AND executives — different audiences need different formats",
  "Updating only quarterly — falls out of date within weeks",
  "Trying to show everything — dense roadmaps don&apos;t communicate",
];

const FAQS = [
  {
    q: "What roadmap format is best?",
    a: "Now / Next / Later is the safest default for externally shared roadmaps. Outcome Roadmap is best for internal PM teams. Gantt-style timeline is fine for engineering execution but terrible for stakeholder communication — the specificity creates expectations that don&apos;t match reality. Pick based on audience.",
  },
  {
    q: "How often should PMs update the roadmap?",
    a: "Monthly minimum for the &apos;Now&apos; section; quarterly for Next and Later. If the roadmap is stale for 2+ months, it stops being consulted. The best PM teams treat the roadmap as a living artefact — updated by the PM, visible to everyone, and referenced in weekly updates.",
  },
  {
    q: "How do PMs handle stakeholders who want their ask &apos;on the roadmap&apos;?",
    a: "Show them the trade-off. Don&apos;t just add items to the list. &apos;To fit your ask in the Now column, we&apos;d defer X. Does that swap make sense?&apos; Frameworks like Now / Next / Later make it easier to park things in &apos;Later&apos; without killing them outright. Stakeholders usually just want to feel heard — parking is often acceptable.",
  },
];

export default function PmRoadmapTemplatePage() {
  const dates = pageDates("/pm-roadmap-template");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Roadmap Template", url: `${SITE_URL}/pm-roadmap-template` },
      ])} />
      <JsonLd data={articleSchema({
        headline: "PM Roadmap Template (2026) — How to Structure a Product Roadmap That Works",
        description:
          "The PM roadmap template that actually gets used. Outcome-based structure, visualisation patterns, how to handle stakeholder asks, and the now/next/later format.",
        image: `${SITE_URL}/api/og?title=PM+Roadmap+Template+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-roadmap-template`,
      })} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🗺️</span> A great roadmap is a thinking tool, not a Gantt chart
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Roadmap Template<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Structuring a product roadmap starts with picking a format — Now/Next/Later,
            an outcome roadmap, quarterly themes, or a timeline view — then filling in the
            seven sections this page covers, from vision and strategic pillars down to an
            explicit list of what the team is not doing, while avoiding the six common
            mistakes below.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            4 roadmap formats (with best-use guidance), 7 sections every roadmap needs,
            and 6 mistakes that turn roadmaps into neglected spreadsheets.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice Roadmap Questions Daily — Free →
          </Link>
        </section>

        {/* Formats */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">4 Roadmap Formats</h2>
          <div className="space-y-4">
            {FORMATS.map((f, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <p className="font-bold text-white mb-1">{i + 1}. {f.format}</p>
                <p className="text-sm text-white/70 mb-2">{f.what}</p>
                <p className="text-xs text-[#89e219]">🎯 Best for: <span className="text-white/70">{f.bestFor}</span></p>
              </div>
            ))}
          </div>
        </section>

        {/* Sections */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">7 Sections Every Roadmap Needs</h2>
            <div className="space-y-3">
              {SECTIONS.map((s, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-white text-sm mb-1">{i + 1}. {s.section}</p>
                  <p className="text-xs text-white/60">{s.what}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mistakes */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Roadmap Mistakes</h2>
          <div className="space-y-2">
            {MISTAKES.map((m, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-red-400 flex-shrink-0">❌</span>
                <p className="text-sm text-white/70">{m}</p>
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

        <RelatedPages slug="pm-roadmap-template" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice PM Roadmap Thinking Daily</h2>
          <p className="text-white/60 mb-6">Scenarios on prioritisation, trade-offs, and stakeholder pushback.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
