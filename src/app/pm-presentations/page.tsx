import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Presentations (2026) — How PMs Present to Execs Without Dying",
  description:
    "How PMs present to executives. Structure, slide design, narrative arc, and the traps that sink most PM decks.",
  keywords: [
    "PM presentations", "exec presentation PM",
    "slide design PM", "PM communication 2026",
  ],
  alternates: { canonical: "/pm-presentations" },
  openGraph: {
    title: "PM Presentations 2026 — PM Streak",
    description: "How PMs present to execs without dying.",
    url: `${SITE_URL}/pm-presentations`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Presentations+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Presentations 2026 — PM Streak",
    description: "How PMs present to execs without dying.",
    images: [`${SITE_URL}/api/og?title=PM+Presentations+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const STRUCTURE = [
  "Context — 1 slide, the situation in under 30 seconds",
  "Problem — 1 slide, the sharpest articulation of what&apos;s wrong",
  "Proposal — 1–2 slides, the recommendation up front",
  "Evidence — 3–5 slides, data and reasoning that support it",
  "Asks and next steps — 1 slide, what you need and by when",
];

const RULES = [
  "One idea per slide — if two ideas compete for attention, split it",
  "Big text, big charts — rooms get bigger than you think",
  "No paragraphs on slides — if it&apos;s a paragraph, it&apos;s a memo",
  "Recommendation on slide 1 or 2 — execs want the answer up top",
  "Practice the first 60 seconds — the opener sets trust",
];

const FAQS = [
  {
    q: "Should PMs use Amazon-style 6-pagers instead of slides?",
    a: "Depends on audience. Many top product orgs (Amazon most famously) run narrative memo reviews. For deep decisions with complex tradeoffs, memos beat slides. For quick alignment or high-level updates, slides still win. The best PMs can do both and pick deliberately.",
  },
];

export default function PmPresentationsPage() {
  const dates = pageDates("/pm-presentations");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Presentations", url: `${SITE_URL}/pm-presentations` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Presentations (2026 Edition)",
        description:
          "How PMs present to executives. Structure, slide design, narrative arc, and the traps that sink most PM decks.",
        image: `${SITE_URL}/api/og?title=PM+Presentations+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-presentations`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🎤</span> Lead with the answer. Back into the reasoning.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Presentations<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            A PM deck built for execs opens with the context and the sharpest version of the problem, puts the recommendation on slide one or two, then backs it with three to five slides of evidence before closing on the ask and next steps. Each slide carries one idea in big text — no paragraphs — because the room is bigger than you think.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            A 5-slide structure and 5 rules for PMs presenting to execs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Presentation PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5-Slide Structure</h2>
          <div className="space-y-2">
            {STRUCTURE.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{s}</p>
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

        <RelatedPages slug="pm-presentations" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Presentation Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
