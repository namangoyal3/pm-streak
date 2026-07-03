import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Estimation (2026) — How PMs Estimate Work Honestly",
  description:
    "How PMs estimate timelines without lying to themselves. Reference-class forecasting, buffers, and why single-point estimates fail.",
  keywords: [
    "PM estimation", "software estimation",
    "reference class forecasting PM 2026",
  ],
  alternates: { canonical: "/pm-estimation" },
  openGraph: {
    title: "PM Estimation 2026 — PM Streak",
    description: "How PMs estimate work honestly.",
    url: `${SITE_URL}/pm-estimation`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Estimation+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Estimation 2026 — PM Streak",
    description: "How PMs estimate work honestly.",
    images: [`${SITE_URL}/api/og?title=PM+Estimation+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PRACTICES = [
  "Estimate ranges, not points — &apos;2–4 weeks&apos; beats &apos;3 weeks&apos;",
  "Reference-class forecasting — compare to similar past projects, not your optimism",
  "Separate unknowns from knowns — list open questions before estimating",
  "Buffer 30–50% for integration and review — not for slack",
  "Re-estimate after every sprint — the first estimate is always wrong",
];

const BIASES = [
  "Planning fallacy — we underestimate our own tasks by 30–50% consistently",
  "Sunk-cost — already invested time inflates willingness to continue",
  "Optimism bias — engineers and PMs both suffer, just in different ways",
  "Scope creep — small additions silently extend timelines",
];

const FAQS = [
  {
    q: "Why do engineering estimates slip so often?",
    a: "Partly because we ignore integration, review, edge cases, and unknowns. Partly because the environment rewards optimistic estimates over realistic ones. The fix is systemic: reference-class forecasting, honest buffers, and rewarding truth-telling over short-term promises. Over a year, teams that estimate honestly ship more, not less.",
  },
];

export default function PmEstimationPage() {
  const dates = pageDates("/pm-estimation");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Estimation", url: `${SITE_URL}/pm-estimation` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Estimation (2026 Edition)",
        description: "How PMs estimate timelines without lying to themselves. Reference-class forecasting, buffers, and why single-point estimates fail.",
        image: `${SITE_URL}/api/og?title=PM+Estimation+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-estimation`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>⏱️</span> Honest estimates ship more over time than optimistic ones
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Estimation<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Honest estimation means giving ranges instead of single points, using reference-class forecasting instead of gut feel, separating unknowns from knowns before committing a number, and buffering 30–50% for integration and review rather than padding for slack. It also means naming the biases that distort estimates — planning fallacy, sunk-cost thinking, optimism bias, and scope creep — since the first estimate is always wrong and gets re-estimated every sprint.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-white/60 hover:text-[#89e219] underline underline-offset-2">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 estimation practices and 4 biases to catch yourself on.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Estimation PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Practices</h2>
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
            <h2 className="text-2xl font-bold text-center mb-10">4 Biases</h2>
            <div className="space-y-2">
              {BIASES.map((b, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-red-400 flex-shrink-0">❌</span>
                  <p className="text-sm text-white/70">{b}</p>
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

        <RelatedPages slug="pm-estimation" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Estimation Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
