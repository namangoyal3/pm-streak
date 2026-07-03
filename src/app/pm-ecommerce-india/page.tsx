import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM E-commerce India (2026) — Flipkart, Amazon, Meesho PM Guide",
  description:
    "How PMs build e-commerce products in India. COD, RTO, Tier-2/3, social commerce, and the brutal unit economics of Indian e-commerce.",
  keywords: [
    "PM ecommerce india", "Flipkart PM",
    "Meesho PM", "Amazon india PM 2026",
  ],
  alternates: { canonical: "/pm-ecommerce-india" },
  openGraph: {
    title: "PM E-commerce India 2026 — PM Streak",
    description: "How PMs build e-commerce products in India.",
    url: `${SITE_URL}/pm-ecommerce-india`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+E-commerce+India+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM E-commerce India 2026 — PM Streak",
    description: "How PMs build e-commerce products in India.",
    images: [`${SITE_URL}/api/og?title=PM+E-commerce+India+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "COD is still huge — payment mix shapes refund, RTO, and unit economics",
  "Return-to-origin (RTO) kills margin — address quality and trust matter",
  "Tier-2/3 growth is the real game — Meesho rewired the playbook",
  "Vernacular UX unlocks segments English-only platforms miss",
  "Social commerce (WhatsApp, Instagram) is fragmenting the funnel",
];

const METRICS = [
  "GMV and net GMV after returns",
  "Prepaid ratio",
  "RTO rate by category and pin code",
  "Repeat rate at 90 days",
  "Category contribution margin",
];

const FAQS = [
  {
    q: "Is Indian e-commerce PM still a good career path?",
    a: "Large and still growing, but brutal on unit economics. PMs who love marketplace dynamics, logistics, and consumer behaviour at scale thrive. Skills transfer well to quick commerce, travel, and fintech. The hours are intense; the impact is real; the learning curve is steep.",
  },
];

export default function PmEcommerceIndiaPage() {
  const dates = pageDates("/pm-ecommerce-india");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM E-commerce India", url: `${SITE_URL}/pm-ecommerce-india` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM E-commerce India (2026 Edition)",
        description:
          "How PMs build e-commerce products in India. COD, RTO, Tier-2/3, social commerce, and the brutal unit economics of Indian e-commerce.",
        image: `${SITE_URL}/api/og?title=PM+E-commerce+India+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-ecommerce-india`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🛒</span> India e-commerce lives on the margin between COD and RTO
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM E-commerce India<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Indian e-commerce PMs operate on thin, COD-driven unit economics where return-to-origin (RTO) rates by pin code and category can erase margin, so GMV, prepaid ratio, and 90-day repeat rate matter as much as growth. Tier-2/3 expansion and vernacular UX — the playbook Meesho rewired — plus social commerce on WhatsApp and Instagram are fragmenting the traditional funnel, making this a brutal but still-growing category.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for Indian e-commerce PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build E-commerce PM Skills — Free →
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

        <RelatedPages slug="pm-ecommerce-india" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice E-commerce PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
