import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Documentation Guide (2026) — What Great PMs Actually Write Down",
  description:
    "How PMs document decisions, specs, strategy, and learnings. What&apos;s worth writing down, what isn&apos;t, and the 7 documents every PM should maintain.",
  keywords: [
    "PM documentation", "PM docs",
    "what PMs document", "PM writing habits",
    "PM knowledge management 2026",
  ],
  alternates: { canonical: "/pm-documentation" },
  openGraph: {
    title: "PM Documentation Guide 2026 — PM Streak",
    description: "What great PMs actually write down — 7 essential PM documents and what to skip.",
    url: `${SITE_URL}/pm-documentation`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Documentation+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Documentation Guide 2026 — PM Streak",
    description: "What great PMs actually write down — 7 essential PM documents and what to skip.",
    images: [`${SITE_URL}/api/og?title=PM+Documentation+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const ESSENTIAL_DOCS = [
  { doc: "PRDs", freq: "Per feature/initiative", who: "Shared with eng, design, leadership" },
  { doc: "Decision logs", freq: "Per significant decision", who: "Team + future team members" },
  { doc: "Strategy doc", freq: "Quarterly / annual", who: "Leadership + team" },
  { doc: "Roadmap", freq: "Maintained continuously", who: "Varies by audience" },
  { doc: "Weekly updates", freq: "Weekly", who: "Manager + cross-functional partners" },
  { doc: "Launch retros", freq: "After each launch", who: "Team + broader product org" },
  { doc: "Personal learning log", freq: "Weekly (20 min)", who: "Private — for your own growth" },
];

const WHAT_TO_SKIP = [
  "Exhaustive meeting notes — capture decisions, not discussion",
  "Over-elaborate frameworks nobody else reads",
  "Docs duplicating what&apos;s already in Jira / Linear",
  "Documents updated only when your boss asks — if you need external triggers, it&apos;s not useful to you",
  "Status updates that aren&apos;t really status — just performative updates",
];

const PRINCIPLES = [
  "Write before you speak — clarifies thinking",
  "Optimise for the reader, not the writer — structure, scannable, TL;DR at top",
  "Link don&apos;t copy — single source of truth",
  "Document decisions, not discussions — rationale + outcome",
  "Update or archive — stale docs are worse than no docs",
  "Search-friendly — title and tags so future-you finds it",
];

const TOOLS = [
  "Notion / Confluence — long-form docs",
  "Linear / Jira — sprint-level work",
  "Google Docs — collaborative editing",
  "Loom — async video for walkthroughs",
  "Slack canvas — lightweight team docs",
];

const FAQS = [
  {
    q: "How much time should PMs spend on documentation?",
    a: "~20% of working hours. That sounds high but includes PRDs, decision docs, weekly updates, strategy work. PMs who skimp end up re-explaining the same things repeatedly, losing leverage. PMs who over-document get precious about polish. The balance: prolific drafts, selective polish.",
  },
  {
    q: "What&apos;s the biggest PM documentation mistake?",
    a: "Writing docs nobody reads. A 20-page PRD that engineers skim misses the point. The discipline: put the most important thing at the top, cut 20% on revision, and prefer multiple short docs over one long one. Engineers will read a 2-page PRD carefully; a 20-page PRD never gets past page 3.",
  },
];

export default function PmDocumentationPage() {
  const dates = pageDates("/pm-documentation");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Documentation", url: `${SITE_URL}/pm-documentation` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Documentation Guide (2026 Edition)",
        description:
          "How PMs document decisions, specs, strategy, and learnings. What's worth writing down, what isn't, and the 7 documents every PM should maintain.",
        image: `${SITE_URL}/api/og?title=PM+Documentation+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-documentation`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📝</span> The docs you write today become the leverage you have tomorrow
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Documentation Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-2">
            Great PM documentation covers seven recurring documents — PRDs, decision logs, a
            quarterly strategy doc, a living roadmap, weekly updates, launch retros, and a private
            learning log — while skipping exhaustive meeting notes and anything duplicating Jira or
            Linear. The guiding principles: write before you speak, document decisions rather than
            discussions, and update or archive rather than let docs go stale, since PMs spend roughly
            20% of their working hours on this.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            7 essential PM documents, 5 things to skip, 6 documentation principles, and 5 recommended tools.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Writing Habits Daily — Free →
          </Link>
        </section>

        {/* Essential docs */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">7 Essential PM Documents</h2>
          <div className="space-y-3">
            {ESSENTIAL_DOCS.map((d, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                  <p className="font-bold text-white">{i + 1}. {d.doc}</p>
                  <span className="text-xs bg-[#58cc02]/20 text-[#89e219] px-2 py-0.5 rounded-full">{d.freq}</span>
                </div>
                <p className="text-xs text-white/60">Audience: {d.who}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What to skip */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Things to Skip</h2>
            <div className="space-y-2">
              {WHAT_TO_SKIP.map((w, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-red-400 flex-shrink-0">❌</span>
                  <p className="text-sm text-white/70">{w}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Documentation Principles</h2>
          <div className="space-y-2">
            {PRINCIPLES.map((p, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{p}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tools */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Recommended Tools</h2>
            <div className="space-y-2">
              {TOOLS.map((t, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{t}</p>
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

        <RelatedPages slug="pm-documentation" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Writing Habits Daily</h2>
          <p className="text-white/60 mb-6">Daily PM scenarios that sharpen concise, structured writing.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
