import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Analyst to PM (2026) — From Data Analyst to Product Manager",
  description:
    "How data analysts become PMs. The strengths they bring, the execution and empathy gaps, and why data-first PMs often win growth roles.",
  keywords: [
    "analyst to PM", "data analyst PM 2026",
  ],
  alternates: { canonical: "/pm-analyst-to-pm" },
  openGraph: {
    title: "PM Analyst to PM 2026 — PM Streak",
    description: "How data analysts become PMs.",
    url: `${SITE_URL}/pm-analyst-to-pm`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Analyst+to+PM+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Analyst to PM 2026 — PM Streak",
    description: "How data analysts become PMs.",
    images: [`${SITE_URL}/api/og?title=PM+Analyst+to+PM+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const STRENGTHS = [
  "Data fluency — SQL, funnels, cohorts out of the box",
  "Causal reasoning from experimentation backgrounds",
  "Ability to instrument and measure shipped work",
  "Framing business questions quantitatively",
];

const GAPS = [
  "User empathy and qualitative research skill",
  "Engineering and design partnership muscles",
  "Comfort with qualitative prioritisation where data is thin",
  "Delivery velocity — analysts are used to longer cycles",
];

const FAQS = [
  {
    q: "Where do analyst-to-PM transitions fit best?",
    a: "Growth PM roles and experimentation-heavy teams. Analysts bring immediate quantitative impact. Early-stage 0→1 product work is a worse fit because data is sparse and user empathy matters more than metric framing. Match the first PM role to where your strengths compound.",
  },
];

export default function PmAnalystToPmPage() {
  const dates = pageDates("/pm-analyst-to-pm");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Analyst to PM", url: `${SITE_URL}/pm-analyst-to-pm` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Analyst to PM (2026 Edition)",
        description: "How data analysts become PMs. The strengths they bring, the execution and empathy gaps, and why data-first PMs often win growth roles.",
        image: `${SITE_URL}/api/og?title=PM+Analyst+to+PM+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-analyst-to-pm`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📊</span> Analysts excel in growth PM roles. Start where data is rich.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Analyst to PM<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Data analysts move into product management by leaning on strengths already built in — SQL fluency, causal reasoning, and quantitative framing — which makes growth PM roles the strongest fit, since data is rich there. The gaps to close are user empathy, engineering and design partnership, and faster delivery cycles than analytics work typically demands.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:text-[#58cc02]">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            4 strengths analysts bring and 4 gaps to close.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Analyst-to-PM Skills — Free →
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

        <RelatedPages slug="pm-analyst-to-pm" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Analyst-to-PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
