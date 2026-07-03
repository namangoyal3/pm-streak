import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM AI Recruiting (2026) — Hiring Tech Powered by AI",
  description:
    "How PMs build AI recruiting products. Candidate matching, screening, interviewing, and the bias and legal challenges of automated hiring.",
  keywords: [
    "PM AI recruiting", "hiring AI PM",
    "ATS AI 2026",
  ],
  alternates: { canonical: "/pm-ai-recruiting" },
  openGraph: {
    title: "PM AI Recruiting 2026 — PM Streak",
    description: "How PMs build AI recruiting products.",
    url: `${SITE_URL}/pm-ai-recruiting`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+AI+Recruiting+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM AI Recruiting 2026 — PM Streak",
    description: "How PMs build AI recruiting products.",
    images: [`${SITE_URL}/api/og?title=PM+AI+Recruiting+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Bias is existential — biased AI hiring decisions are legal exposure",
  "Candidate experience matters — AI must feel helpful, not dehumanising",
  "ATS integrations are table stakes — Workday, Greenhouse, Lever",
  "Volume-screening vs high-signal interviews are different products",
  "Regulation incoming — EU AI Act treats hiring as high-risk",
];

const METRICS = [
  "Screen-to-interview conversion lift",
  "Time-to-fill reduction",
  "Candidate NPS",
  "Diversity impact (demographic parity checks)",
  "Recruiter time saved per hire",
];

const FAQS = [
  {
    q: "Isn&apos;t AI recruiting just a bias amplifier?",
    a: "It can be, which is why audit and transparency are product requirements, not extras. The EU AI Act and emerging regulation in the US and India classify hiring AI as high-risk. Good AI recruiting products ship with bias audits, explanation logs, and human-review gates. Those that don&apos;t will face legal and reputational fallout.",
  },
];

export default function PmAiRecruitingPage() {
  const dates = pageDates("/pm-ai-recruiting");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM AI Recruiting", url: `${SITE_URL}/pm-ai-recruiting` },
      ])} />
      <JsonLd data={articleSchema({
        headline: "PM AI Recruiting (2026 Edition)",
        description: "How PMs build AI recruiting products. Candidate matching, screening, interviewing, and the bias and legal challenges of automated hiring.",
        image: `${SITE_URL}/api/og?title=PM+AI+Recruiting+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-ai-recruiting`,
      })} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🎯</span> AI hiring needs audit trails. Bias is legal exposure.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM AI Recruiting<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Because biased hiring decisions carry real legal exposure, AI recruiting products are judged as much on their audit trails as their matching accuracy: bias audits, explanation logs, and human-review gates are treated as product requirements under the EU AI Act and similar emerging rules, not optional extras. PMs balance that governance load against candidate experience, tracking screen-to-interview conversion, time-to-fill, and diversity impact via demographic parity checks.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for AI recruiting PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build AI Recruiting PM Skills — Free →
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

        <RelatedPages slug="pm-ai-recruiting" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice AI Recruiting PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
