import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM India Startups 2026 — Where to Build Your Career This Year",
  description:
    "The Indian startup landscape for PMs in 2026. Categories that are hiring, comp ranges, and red flags to watch.",
  keywords: [
    "PM india startups 2026", "indian startup PM jobs",
  ],
  alternates: { canonical: "/pm-india-startups-2026" },
  openGraph: {
    title: "PM India Startups 2026 — PM Streak",
    description: "Indian startup landscape for PMs in 2026.",
    url: `${SITE_URL}/pm-india-startups-2026`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+India+Startups+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM India Startups 2026 — PM Streak",
    description: "Indian startup landscape for PMs in 2026.",
    images: [`${SITE_URL}/api/og?title=PM+India+Startups+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const HOT = [
  "AI infra and applications (Sarvam, Krutrim, AI4Bharat ecosystem)",
  "Quick commerce and dark stores (Zepto, Blinkit, Instamart)",
  "Wealthtech and fintech (Groww, INDmoney, Jar)",
  "Creator and Bharat-first apps (Pratilipi, Pocket FM, Khyaal)",
  "Vertical SaaS for India SMBs (Khatabook, Vyapar, Refrens)",
];

const RED_FLAGS = [
  "Funding gap &gt; 18 months — runway risk",
  "PM team smaller than 3 — ownership clarity issues",
  "No clear AI strategy — losing relevance fast",
  "Founder turnover at the top — instability sign",
];

const FAQS = [
  {
    q: "What are healthy PM comp ranges in Indian startups in 2026?",
    a: "APM: 18–28 LPA. PM II: 30–55 LPA. Senior PM: 60–110 LPA. Group PM/Director: 1.2–2 Cr+ with ESOPs. Top AI startups (Sarvam, Krutrim) and growth-stage fintech pay at the higher end. Compensation has normalised after the 2022 frothy peak; expect realistic offers but with stronger ESOP grants.",
  },
];

export default function PmIndiaStartups2026Page() {
  const dates = pageDates("/pm-india-startups-2026");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM India Startups 2026", url: `${SITE_URL}/pm-india-startups-2026` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM India Startups (2026 Landscape)",
        description: "The Indian startup landscape for PMs in 2026. Categories that are hiring, comp ranges, and red flags to watch.",
        image: `${SITE_URL}/api/og?title=PM+India+Startups+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-india-startups-2026`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🇮🇳</span> Pick categories with growth, not just hype
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM India Startups<br />(2026 Landscape)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Picking where to build a PM career among Indian startups in 2026 means weighing category momentum against risk: AI infra, quick commerce, wealthtech, creator apps, and vertical SaaS are hiring, while funding gaps past 18 months, thin PM teams, absent AI strategy, and founder turnover signal instability worth avoiding.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:text-[#58cc02]">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 hot categories and 4 red flags for Indian startup PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Career Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Hot Categories</h2>
          <div className="space-y-2">
            {HOT.map((h, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{h}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">4 Red Flags</h2>
            <div className="space-y-2">
              {RED_FLAGS.map((r, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-red-400 flex-shrink-0">⚠️</span>
                  <p className="text-sm text-white/70">{r}</p>
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

        <RelatedPages slug="pm-india-startups-2026" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice India PM Career Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
