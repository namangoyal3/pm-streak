import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM CPO Role (2026) — What Chief Product Officers Actually Do",
  description:
    "What CPOs actually do. Board relationships, product strategy, org design, and the difference between VP Product and CPO.",
  keywords: [
    "PM CPO", "chief product officer",
    "VP product 2026",
  ],
  alternates: { canonical: "/pm-cpo-role" },
  openGraph: {
    title: "PM CPO Role 2026 — PM Streak",
    description: "What chief product officers actually do.",
    url: `${SITE_URL}/pm-cpo-role`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+CPO+Role+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM CPO Role 2026 — PM Streak",
    description: "What chief product officers actually do.",
    images: [`${SITE_URL}/api/og?title=PM+CPO+Role+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const RESPONSIBILITIES = [
  "Product strategy for the whole company",
  "Org design for the PM function",
  "Partnership with CEO, CRO, CTO, CFO",
  "Board communication on product and roadmap",
  "Hiring and calibrating leadership team",
];

const VP_VS_CPO = [
  "VP Product: executes strategy, runs PM org",
  "CPO: sets strategy, represents product at exec/board level",
  "VP Product usually reports to CPO or CEO",
  "CPO is the product conscience of the company",
];

const FAQS = [
  {
    q: "When does a company need a CPO vs a VP Product?",
    a: "VP Product when you need product execution leadership. CPO when product is central to strategy and deserves a voice at board level. Early-stage companies often don&apos;t need a CPO — the CEO plays that role. As companies scale past $50M ARR, product-led companies benefit from a dedicated CPO.",
  },
];

export default function PmCpoRolePage() {
  const dates = pageDates("/pm-cpo-role");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM CPO Role", url: `${SITE_URL}/pm-cpo-role` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM CPO Role (2026 Edition)",
        description:
          "What CPOs actually do. Board relationships, product strategy, org design, and the difference between VP Product and CPO.",
        image: `${SITE_URL}/api/og?title=PM+CPO+Role+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-cpo-role`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🏛️</span> CPO is the product conscience of the company
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM CPO Role<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            A chief product officer owns product strategy for the entire company, designs the PM org, partners with the CEO, CRO, CTO, and CFO, communicates roadmap decisions to the board, and hires the leadership team — a level up from VP Product, who executes that strategy and typically reports into the CPO or CEO.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 responsibilities and 4 distinctions between VP Product and CPO.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build CPO PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Responsibilities</h2>
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
            <h2 className="text-2xl font-bold text-center mb-10">VP vs CPO</h2>
            <div className="space-y-2">
              {VP_VS_CPO.map((v, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{v}</p>
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

        <RelatedPages slug="pm-cpo-role" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice CPO PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
