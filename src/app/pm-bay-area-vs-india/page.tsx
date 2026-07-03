import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Bay Area vs India (2026) — Career Tradeoffs Compared",
  description:
    "How PMs should think about Bay Area vs India career paths. Comp, scope, mission, and the lifestyle differences that compound over a decade.",
  keywords: [
    "PM Bay Area India", "PM career tradeoffs 2026",
  ],
  alternates: { canonical: "/pm-bay-area-vs-india" },
  openGraph: {
    title: "PM Bay Area vs India 2026 — PM Streak",
    description: "Career tradeoffs compared.",
    url: `${SITE_URL}/pm-bay-area-vs-india`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Bay+Area+vs+India+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Bay Area vs India 2026 — PM Streak",
    description: "Career tradeoffs compared.",
    images: [`${SITE_URL}/api/og?title=PM+Bay+Area+vs+India+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const BAY = [
  "Highest comp globally — $250k–$700k+ for senior PMs",
  "Access to frontier AI, infra, and consumer scale",
  "Network of operators and capital",
  "Cost of living and visa friction are real",
];

const INDIA = [
  "Lower nominal comp but higher purchasing power",
  "Building for next-billion users — meaningful impact",
  "Faster scope expansion at growing companies",
  "Family proximity and lifestyle quality",
];

const FAQS = [
  {
    q: "Is the Bay Area still worth it for Indian PMs in 2026?",
    a: "Conditionally. Top-tier PMs at FAANG and frontier AI labs still see massive comp delta. Mid-tier PMs at average US companies face visa friction, cost of living, and weakening exit value if they return to India. The honest answer: only go to the Bay if you can target the top 1% of opportunities. Otherwise, India offers comparable career growth at better lifestyle quality.",
  },
];

export default function PmBayAreaVsIndiaPage() {
  const dates = pageDates("/pm-bay-area-vs-india");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Bay Area vs India", url: `${SITE_URL}/pm-bay-area-vs-india` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Bay Area vs India (2026 Edition)",
        description: "How PMs should think about Bay Area vs India career paths. Comp, scope, mission, and the lifestyle differences that compound over a decade.",
        image: `${SITE_URL}/api/og?title=PM+Bay+Area+vs+India+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-bay-area-vs-india`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🌐</span> Bay Area for top 1% opportunities. India for the rest.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Bay Area vs India<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Choosing between a Bay Area and India PM career comes down to trading peak comp and frontier-tech access — $250k–$700k+ for senior roles, plus operator networks — against faster scope growth, next-billion-user impact, and lifestyle proximity to family. The honest read: the Bay Area pays off only for the top 1% of opportunities.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:text-[#58cc02]">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            4 Bay Area pros and 4 India pros — make your call deliberately.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Career Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">Bay Area</h2>
          <div className="space-y-2">
            {BAY.map((b, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{b}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">India</h2>
            <div className="space-y-2">
              {INDIA.map((i, idx) => (
                <div key={idx} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{idx + 1}.</span>
                  <p className="text-sm text-white/70">{i}</p>
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

        <RelatedPages slug="pm-bay-area-vs-india" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice PM Career Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
