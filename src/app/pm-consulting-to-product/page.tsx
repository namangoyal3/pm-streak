import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Consulting to Product (2026) — From McKinsey, BCG, Bain to PM",
  description:
    "How consultants transition to PM. Strengths they bring, gaps they must close, and why ex-consultants often excel at strategy but struggle with craft.",
  keywords: [
    "consultant to PM", "McKinsey to PM 2026",
  ],
  alternates: { canonical: "/pm-consulting-to-product" },
  openGraph: {
    title: "PM Consulting to Product 2026 — PM Streak",
    description: "From consulting to PM.",
    url: `${SITE_URL}/pm-consulting-to-product`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Consulting+to+Product+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Consulting to Product 2026 — PM Streak",
    description: "From consulting to PM.",
    images: [`${SITE_URL}/api/og?title=PM+Consulting+to+Product+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const STRENGTHS = [
  "Structured thinking and problem framing",
  "Executive communication and storytelling",
  "Cross-functional stakeholder management",
  "Data-driven analysis",
];

const GAPS = [
  "Hands-on product craft — wireframes, PRDs, user testing",
  "Patience for long execution cycles",
  "Comfort with ambiguity on technical tradeoffs",
  "Urge to deliver slides instead of ship products",
];

const FAQS = [
  {
    q: "Why do consultants often struggle in PM roles?",
    a: "Because consulting rewards presentation and persuasion; PM rewards execution and iteration. Ex-consultants who thrive as PMs deliberately unlearn slide-centric work and embrace prototyping, spec-writing, and daily engineering partnership. Those who don&apos;t end up as strategy PMs who ship nothing.",
  },
];

export default function PmConsultingToProductPage() {
  const dates = pageDates("/pm-consulting-to-product");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Consulting to Product", url: `${SITE_URL}/pm-consulting-to-product` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Consulting to Product (2026 Edition)",
        description:
          "How consultants transition to PM. Strengths they bring, gaps they must close, and why ex-consultants often excel at strategy but struggle with craft.",
        image: `${SITE_URL}/api/og?title=PM+Consulting+to+Product+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-consulting-to-product`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📊</span> Consultants win on framing, lose on execution without practice
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Consulting to Product<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Consultants moving into product management arrive with structured thinking, executive communication, cross-functional stakeholder management, and data-driven analysis, but they typically have to build hands-on product craft, patience for long execution cycles, and comfort with technical ambiguity on tradeoffs — unlearning the urge to deliver slides instead of shipping products.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            4 strengths consultants bring and 4 gaps they must close.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Transition Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">4 Strengths</h2>
          <div className="space-y-2">
            {STRENGTHS.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{s}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">4 Gaps</h2>
            <div className="space-y-2">
              {GAPS.map((g, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-red-400 flex-shrink-0">⚠️</span>
                  <p className="text-sm text-white/70">{g}</p>
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

        <RelatedPages slug="pm-consulting-to-product" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Transition Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
