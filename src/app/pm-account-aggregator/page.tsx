import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Account Aggregator (2026) — Building on India&apos;s Consent Layer",
  description:
    "How PMs build on Account Aggregator. FIPs, FIUs, consent UX, and why AA is reshaping lending, wealth, and insurance product design.",
  keywords: [
    "PM Account Aggregator", "AA PM",
    "FIU FIP PM 2026",
  ],
  alternates: { canonical: "/pm-account-aggregator" },
  openGraph: {
    title: "PM Account Aggregator 2026 — PM Streak",
    description: "Building on India&apos;s consent layer.",
    url: `${SITE_URL}/pm-account-aggregator`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Account+Aggregator+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Account Aggregator 2026 — PM Streak",
    description: "Building on India&apos;s consent layer.",
    images: [`${SITE_URL}/api/og?title=PM+Account+Aggregator+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "User consent is a product — simpler flows drive higher conversion",
  "FIP coverage is uneven — some banks respond slowly, design for that",
  "Use cases are expanding — lending, wealth, GST, insurance",
  "Data shelf life is short — plan fresh pulls, not single-dip flows",
  "RBI rules evolve — stay close to the spec and regulator circulars",
];

const METRICS = [
  "Consent grant rate (user drop-off on consent screen)",
  "FIP success rate by bank",
  "Data fetch time (median and p95)",
  "Consent revocation rate",
  "Loan/underwriting lift from AA data vs alternatives",
];

const FAQS = [
  {
    q: "Is Account Aggregator ready for prime-time PM investment?",
    a: "Yes, increasingly. By 2026, AA has crossed hundreds of millions of consents and is integrated across major banks and fintechs. Lending and wealth products that use AA see higher approval rates and lower CAC. PMs in fintech who haven&apos;t learned AA are at a disadvantage.",
  },
];

export default function PmAccountAggregatorPage() {
  const dates = pageDates("/pm-account-aggregator");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Account Aggregator", url: `${SITE_URL}/pm-account-aggregator` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Account Aggregator (India Edition)",
        description: "How PMs build on Account Aggregator. FIPs, FIUs, consent UX, and why AA is reshaping lending, wealth, and insurance product design.",
        image: `${SITE_URL}/api/og?title=PM+Account+Aggregator+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-account-aggregator`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔑</span> Consent is the product. Data pulls are the outcome.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Account Aggregator<br />(India Edition)
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-3">
            By 2026, Account Aggregator has crossed hundreds of millions of consents, with lending and wealth products built on AA data converting at higher approval rates and lower acquisition costs than alternatives. The real PM work sits in consent UX — since simpler flows lift grant rates — plus managing uneven FIP response times across banks and treating data as short-lived, requiring fresh pulls rather than one-time fetches.
          </p>
          <p className="text-xs text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-white/70 hover:text-[#89e219] underline underline-offset-2">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for PMs building on AA.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build AA PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Dynamics</h2>
          <div className="space-y-2">
            {DYNAMICS.map((d, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Metrics</h2>
            <div className="space-y-2">
              {METRICS.map((m, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{m}</p>
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

        <RelatedPages slug="pm-account-aggregator" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice AA PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
