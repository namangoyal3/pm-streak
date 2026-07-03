import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Product Reviews (2026) — Running Reviews That Actually Move Work Forward",
  description:
    "How PMs run product reviews with leadership. Pre-reads, decision logs, handling pushback, and why most reviews fail.",
  keywords: [
    "PM product reviews", "product review meeting",
    "exec review PM", "product review 2026",
  ],
  alternates: { canonical: "/pm-product-reviews" },
  openGraph: {
    title: "PM Product Reviews 2026 — PM Streak",
    description: "How PMs run product reviews that move work forward.",
    url: `${SITE_URL}/pm-product-reviews`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Product+Reviews+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Product Reviews 2026 — PM Streak",
    description: "How PMs run product reviews that move work forward.",
    images: [`${SITE_URL}/api/og?title=PM+Product+Reviews+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PRACTICES = [
  "Send a pre-read 24 hours before — first 10 minutes is silent reading",
  "Lead with the decision you need, not the context you want to share",
  "Show data, not slides about data — raw charts beat pretty decks",
  "Name the tradeoff explicitly — every decision costs something",
  "Capture decisions live — the doc is the artefact, not the meeting",
  "Close every review with next steps and owners",
];

const PITFALLS = [
  "No decision asked — review becomes status update",
  "Too much context, too little ask — exec time wasted on background",
  "PM defensive about pushback — treat hard questions as free consulting",
  "Decisions not documented — same debate replays next quarter",
];

const FAQS = [
  {
    q: "How often should product reviews happen?",
    a: "Enough that decisions get made in time, not so often that they become bureaucracy. Most teams do weekly team reviews, bi-weekly or monthly cross-functional reviews, and quarterly exec reviews. If a review doesn&apos;t produce a decision or change, it&apos;s not a review — it&apos;s a status meeting.",
  },
];

export default function PmProductReviewsPage() {
  const dates = pageDates("/pm-product-reviews");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Product Reviews", url: `${SITE_URL}/pm-product-reviews` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Product Reviews (2026 Edition)",
        description:
          "How PMs run product reviews with leadership. Pre-reads, decision logs, handling pushback, and why most reviews fail.",
        image: `${SITE_URL}/api/og?title=PM+Product+Reviews+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-product-reviews`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>👥</span> A review without a decision isn&apos;t a review — it&apos;s a status meeting
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Product Reviews<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            A product review earns its place on the calendar only when it produces a decision — pre-read sent 24 hours ahead, the ask stated up front, tradeoffs named explicitly, and decisions captured live with owners and next steps. The reviews that fail skip the ask, bury it in context, treat pushback as a threat rather than free consulting, or leave decisions undocumented so the same debate resurfaces next quarter.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 practices and 4 pitfalls for running high-leverage product reviews.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Review PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Practices</h2>
          <div className="space-y-2">
            {PRACTICES.map((p, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{p}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">4 Pitfalls</h2>
            <div className="space-y-2">
              {PITFALLS.map((p, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-red-400 flex-shrink-0">❌</span>
                  <p className="text-sm text-white/70">{p}</p>
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

        <RelatedPages slug="pm-product-reviews" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Review Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
