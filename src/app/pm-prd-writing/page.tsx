import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM PRD Writing (2026) — How PMs Write PRDs That Engineers Actually Read",
  description:
    "How PMs write PRDs that drive alignment and ship. Structure, length, what to include, and why most PRDs rot in Notion.",
  keywords: [
    "PM PRD writing", "product requirements document",
    "PRD template", "PRD 2026",
  ],
  alternates: { canonical: "/pm-prd-writing" },
  openGraph: {
    title: "PM PRD Writing 2026 — PM Streak",
    description: "How PMs write PRDs that engineers actually read.",
    url: `${SITE_URL}/pm-prd-writing`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+PRD+Writing+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM PRD Writing 2026 — PM Streak",
    description: "How PMs write PRDs that engineers actually read.",
    images: [`${SITE_URL}/api/og?title=PM+PRD+Writing+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const STRUCTURE = [
  "Problem — who, what, why now, how painful",
  "Success metric — how we&apos;ll know we won",
  "Proposal — the solution at the right altitude, not code",
  "Scope — what&apos;s in, what&apos;s out, what&apos;s later",
  "Open questions — known unknowns, explicitly listed",
  "Appendix — research links, data, mocks, tradeoffs",
];

const RULES = [
  "Lead with the problem, not the solution",
  "Short &gt; long — engineers won&apos;t read 20 pages",
  "Link-heavy — data, research, mocks live elsewhere",
  "Update it — PRDs drift; stale PRDs are landmines",
  "Write for the skim — headings, bullets, TL;DR at top",
];

const FAQS = [
  {
    q: "Are PRDs still relevant or have docs like RFCs replaced them?",
    a: "Still relevant, but lighter. Modern PRDs are 1–3 pages with links to deeper docs, not 20-page tomes. Some orgs use RFCs (engineering-led) for technical decisions and PRDs (PM-led) for product decisions. The best PMs pick whatever format their team reads and updates.",
  },
];

export default function PmPrdWritingPage() {
  const dates = pageDates("/pm-prd-writing");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM PRD Writing", url: `${SITE_URL}/pm-prd-writing` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM PRD Writing (2026 Edition)",
        description: "How PMs write PRDs that drive alignment and ship. Structure, length, what to include, and why most PRDs rot in Notion.",
        image: `${SITE_URL}/api/og?title=PM+PRD+Writing+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-prd-writing`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📝</span> PRDs are for alignment, not documentation theater
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM PRD Writing<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            A strong PM PRD moves through six sections — problem, success metric, proposal, scope, open questions, and appendix — kept short and link-heavy rather than a twenty-page tome no engineer will read. The best ones lead with the problem before the solution, get written for skimming, and stay updated, since drifting, stale PRDs quietly become landmines.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-white/60 hover:text-[#89e219] underline underline-offset-2">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 sections and 5 rules for PRDs engineers actually read.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PRD Writing Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Sections</h2>
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

        <RelatedPages slug="pm-prd-writing" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice PRD Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
