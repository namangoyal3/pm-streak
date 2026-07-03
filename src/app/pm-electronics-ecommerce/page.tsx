import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Electronics E-commerce (2026) — Croma, Reliance Digital, Amazon Electronics PM",
  description:
    "How PMs build electronics e-commerce. Compare, finance, warranty, and why electronics is a high-AOV, low-margin, trust-heavy category.",
  keywords: [
    "PM electronics ecommerce", "Croma PM",
    "Reliance Digital PM 2026",
  ],
  alternates: { canonical: "/pm-electronics-ecommerce" },
  openGraph: {
    title: "PM Electronics E-commerce 2026 — PM Streak",
    description: "How PMs build electronics e-commerce.",
    url: `${SITE_URL}/pm-electronics-ecommerce`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Electronics+E-commerce+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Electronics E-commerce 2026 — PM Streak",
    description: "How PMs build electronics e-commerce.",
    images: [`${SITE_URL}/api/og?title=PM+Electronics+E-commerce+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Compare UX is critical — users research before buying",
  "EMI and no-cost EMI drive conversion in India",
  "Warranty and service are the moat — Croma&apos;s bet",
  "High AOV + thin margins = logistics quality matters",
  "Category launches (iPhone, Pixel) drive DAU spikes",
];

const METRICS = [
  "Compare-to-purchase conversion",
  "EMI adoption rate",
  "Warranty redemption SLA",
  "Return rate (damage in transit)",
  "Repeat rate (electronics is lower than FMCG)",
];

const FAQS = [
  {
    q: "Can omnichannel electronics retailers compete with pure-play e-commerce?",
    a: "Yes, and increasingly. Croma and Reliance Digital use stores for trial and service, web/app for research and convenience. Pure online players struggle on post-purchase service in India. Omnichannel plus financing depth (Bajaj Finserv, Paytm Postpaid) can win against Amazon and Flipkart.",
  },
];

export default function PmElectronicsEcommercePage() {
  const dates = pageDates("/pm-electronics-ecommerce");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Electronics E-commerce", url: `${SITE_URL}/pm-electronics-ecommerce` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Electronics E-commerce (India Edition)",
        description: "How PMs build electronics e-commerce. Compare, finance, warranty, and why electronics is a high-AOV, low-margin, trust-heavy category.",
        image: `${SITE_URL}/api/og?title=PM+Electronics+E-commerce+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-electronics-ecommerce`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📱</span> Electronics is high AOV, low margin, trust-heavy
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Electronics E-commerce<br />(India Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-2">
            Electronics e-commerce in India is a high-AOV, low-margin, trust-heavy category where omnichannel players like Croma and Reliance Digital increasingly out-compete pure online retailers by pairing in-store trial and warranty service with app-based research and no-cost EMI financing through partners like Bajaj Finserv and Paytm Postpaid — a combination pure-play platforms such as Amazon and Flipkart struggle to match on post-purchase service.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for electronics e-commerce PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Electronics PM Skills — Free →
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

        <RelatedPages slug="pm-electronics-ecommerce" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Electronics PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
