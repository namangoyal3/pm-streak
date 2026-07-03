import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM AI Sales Products (2026) — Gong, Clari, 11x PM Lessons",
  description:
    "How PMs build AI sales tools. Call intelligence, autonomous SDRs, forecasting, and why sales is the fastest-monetising AI category.",
  keywords: [
    "PM AI sales", "Gong PM",
    "Clari PM", "AI SDR 2026",
  ],
  alternates: { canonical: "/pm-ai-sales" },
  openGraph: {
    title: "PM AI Sales Products 2026 — PM Streak",
    description: "How PMs build AI sales tools.",
    url: `${SITE_URL}/pm-ai-sales`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+AI+Sales+Products+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM AI Sales Products 2026 — PM Streak",
    description: "How PMs build AI sales tools.",
    images: [`${SITE_URL}/api/og?title=PM+AI+Sales+Products+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Call intelligence is mature — Gong rewrote sales coaching",
  "Autonomous SDRs are the hype — quality still catching up to human outbound",
  "Forecasting accuracy drives exec adoption",
  "CRM integration depth (Salesforce, HubSpot) is mandatory",
  "Outcome selling (revenue lift, not minutes saved) wins enterprise buyers",
];

const METRICS = [
  "Forecast accuracy improvement",
  "Coach-to-rep conversion rate",
  "SDR-to-meeting rate (for autonomous outbound)",
  "Seat adoption across sales org",
  "Churn after 12 months (trust signal)",
];

const FAQS = [
  {
    q: "Will AI replace SDRs entirely?",
    a: "Volume-dial SDRs will shrink. Senior SDRs running complex multi-touch outbound will persist. The disruption pattern mirrors support: volume-routine work goes to AI, complex-relational work stays human. Sales PM teams need to design for this shift, not ignore it.",
  },
];

export default function PmAiSalesPage() {
  const dates = pageDates("/pm-ai-sales");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM AI Sales", url: `${SITE_URL}/pm-ai-sales` },
      ])} />
      <JsonLd data={articleSchema({
        headline: "PM AI Sales Products (2026 Edition)",
        description: "How PMs build AI sales tools. Call intelligence, autonomous SDRs, forecasting, and why sales is the fastest-monetising AI category.",
        image: `${SITE_URL}/api/og?title=PM+AI+Sales+Products+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-ai-sales`,
      })} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📊</span> Sales is the fastest-monetising AI category
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM AI Sales Products<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Call intelligence platforms like Gong already reshaped sales coaching, while autonomous SDR tools remain earlier-stage — capable of high outbound volume but not yet matching human quality on complex, multi-touch deals. That split mirrors customer support&apos;s AI curve: routine work automates first, and product teams are judged on forecast accuracy, seat adoption, and churn once the initial excitement fades.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for AI sales product PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build AI Sales PM Skills — Free →
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

        <RelatedPages slug="pm-ai-sales" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice AI Sales PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
