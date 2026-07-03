import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Product Analytics (2026) — Beyond Dashboards",
  description:
    "How PMs do product analytics that changes decisions. Event taxonomy, cohort analysis, causal inference, and what PMs should personally learn.",
  keywords: [
    "PM product analytics", "event taxonomy",
    "cohort analysis PM 2026",
  ],
  alternates: { canonical: "/pm-product-analytics" },
  openGraph: {
    title: "PM Product Analytics 2026 — PM Streak",
    description: "Product analytics that changes decisions.",
    url: `${SITE_URL}/pm-product-analytics`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Product+Analytics+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Product Analytics 2026 — PM Streak",
    description: "Product analytics that changes decisions.",
    images: [`${SITE_URL}/api/og?title=PM+Product+Analytics+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const CAPABILITIES = [
  "Event taxonomy design — consistent, future-proof naming conventions",
  "Funnel and cohort analysis — self-serve, not analyst-dependent",
  "SQL — enough to answer your own questions without waiting",
  "Causal reasoning — distinguish correlation from cause",
  "Dashboard design — fewer, better dashboards beat more",
];

const PRACTICES = [
  "Instrument before ship — not after, not maybe later",
  "Keep a data dictionary — definitions decay without one",
  "Review cohorts monthly — retention drift is a leading indicator",
  "Challenge metric definitions quarterly — &apos;active user&apos; ages fast",
  "Pair with analysts for complex work — don&apos;t try to do their job solo",
];

const FAQS = [
  {
    q: "How SQL-proficient should PMs be?",
    a: "Enough to write joins, aggregations, and window functions. Enough to answer &apos;how many active users did X last week?&apos; without asking an analyst. Not enough to replace analysts for complex analyses. The bar has risen over the last five years — PMs who can&apos;t write SQL in 2026 are at a clear disadvantage.",
  },
];

export default function PmProductAnalyticsPage() {
  const dates = pageDates("/pm-product-analytics");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Product Analytics", url: `${SITE_URL}/pm-product-analytics` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Product Analytics (2026 Edition)",
        description:
          "How PMs do product analytics that changes decisions. Event taxonomy, cohort analysis, causal inference, and what PMs should personally learn.",
        image: `${SITE_URL}/api/og?title=PM+Product+Analytics+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-product-analytics`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📉</span> Analytics changes decisions or it&apos;s just wallpaper
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Product Analytics<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Five capabilities separate analytics-fluent PMs from dashboard-watchers: event taxonomy design, self-serve funnel and cohort analysis, enough SQL for joins and window functions, causal reasoning, and disciplined dashboard design — paired with practices like instrumenting before shipping, keeping a data dictionary, and reviewing cohorts monthly, since analytics that doesn&apos;t change a decision is just wallpaper.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 capabilities and 5 practices for analytics-fluent PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Analytics PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Capabilities</h2>
          <div className="space-y-2">
            {CAPABILITIES.map((c, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{c}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Practices</h2>
            <div className="space-y-2">
              {PRACTICES.map((p, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
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

        <RelatedPages slug="pm-product-analytics" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Analytics PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
