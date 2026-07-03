import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Agritech (2026) — DeHaat, Ninjacart, AgroStar PM Guide",
  description:
    "How PMs build agritech products in India. Farmer workflows, supply chain, advisory, and the unique PM challenges of rural-first products.",
  keywords: [
    "PM agritech", "DeHaat PM",
    "Ninjacart PM", "agritech india 2026",
  ],
  alternates: { canonical: "/pm-agritech" },
  openGraph: {
    title: "PM Agritech 2026 — PM Streak",
    description: "How PMs build agritech products in India.",
    url: `${SITE_URL}/pm-agritech`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Agritech+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Agritech 2026 — PM Streak",
    description: "How PMs build agritech products in India.",
    images: [`${SITE_URL}/api/og?title=PM+Agritech+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Vernacular-first — Hindi, Marathi, Telugu, Kannada, Tamil are the default, not English",
  "Voice and video &gt; text — literacy varies; visual beats written",
  "Trust is physical — field officers still drive adoption more than app UX",
  "Seasonality dictates everything — product usage maps to crop cycles",
  "Connectivity gaps — offline-first and SMS fallbacks are not optional",
];

const METRICS = [
  "Active farmers per season",
  "Revenue per farmer per season (inputs + advisory + market)",
  "Field officer productivity — farmers onboarded per FO per month",
  "Advisory engagement — views / call-backs / implementations",
  "Supply chain efficiency — pack-house to market turnaround",
];

const FAQS = [
  {
    q: "Is agritech a real PM career in India?",
    a: "Growing fast. DeHaat, Ninjacart, AgroStar, Gramophone, Samunnati, and many others employ PMs at scale. You&apos;ll work on problems most urban PMs never see — rural UX, field ops, supply chain in uncertain logistics, and products that touch farmer livelihoods. High mission, moderate pay, durable impact.",
  },
];

export default function PmAgritechPage() {
  const dates = pageDates("/pm-agritech");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Agritech", url: `${SITE_URL}/pm-agritech` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Agritech (India Edition)",
        description: "How PMs build agritech products in India. Farmer workflows, supply chain, advisory, and the unique PM challenges of rural-first products.",
        image: `${SITE_URL}/api/og?title=PM+Agritech+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-agritech`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🌾</span> Products that touch farmer livelihoods demand different PM rigor
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Agritech<br />(India Edition)
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-3">
            Agritech product management in India means designing for vernacular languages, voice and video over text, and offline-first connectivity, since field officers — not app UX — still drive most farmer trust and adoption. Companies like DeHaat, Ninjacart, and AgroStar track success through active farmers per season, revenue per farmer, and field officer productivity rather than typical SaaS metrics.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for agritech PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Agritech PM Skills — Free →
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

        <RelatedPages slug="pm-agritech" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Agritech PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
