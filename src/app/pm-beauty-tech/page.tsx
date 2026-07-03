import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Beauty Tech (2026) — Nykaa, Purplle, Tira PM Guide",
  description:
    "How PMs build beauty tech products. Content-led commerce, AR try-ons, influencer ecosystems, and why beauty blends media and marketplace.",
  keywords: [
    "PM beauty tech", "Nykaa PM",
    "Purplle PM", "Tira PM 2026",
  ],
  alternates: { canonical: "/pm-beauty-tech" },
  openGraph: {
    title: "PM Beauty Tech 2026 — PM Streak",
    description: "How PMs build beauty tech products.",
    url: `${SITE_URL}/pm-beauty-tech`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Beauty+Tech+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Beauty Tech 2026 — PM Streak",
    description: "How PMs build beauty tech products.",
    images: [`${SITE_URL}/api/og?title=PM+Beauty+Tech+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Content + commerce is the moat — reviews, tutorials, swatches",
  "AR try-on is table stakes for makeup — less mature for skincare",
  "Influencer ecosystem drives discovery more than search",
  "Own-label plus marketplace is the dominant model",
  "Premium and masstige segments behave very differently",
];

const METRICS = [
  "Repeat rate at 60 and 90 days",
  "Review density per SKU",
  "AR try-on to purchase conversion",
  "Own-label share of GMV",
  "Influencer-driven traffic conversion",
];

const FAQS = [
  {
    q: "Why is Indian beauty tech so Nykaa-dominant?",
    a: "Because they built content moats (reviews, tutorials, masterclasses), own-label expansion, and offline-online hybrid distribution early. Competitors (Purplle, Tira, Myntra Beauty) have respectable share but break-out is hard when one player owns both trust and selection at scale.",
  },
];

export default function PmBeautyTechPage() {
  const dates = pageDates("/pm-beauty-tech");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Beauty Tech", url: `${SITE_URL}/pm-beauty-tech` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Beauty Tech (India Edition)",
        description: "How PMs build beauty tech products. Content-led commerce, AR try-ons, influencer ecosystems, and why beauty blends media and marketplace.",
        image: `${SITE_URL}/api/og?title=PM+Beauty+Tech+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-beauty-tech`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>💄</span> Beauty is part media, part marketplace — design for both
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Beauty Tech<br />(India Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-2">
            Beauty tech blends media and marketplace: Nykaa built its lead in India through content moats like reviews and tutorials, early own-label expansion, and offline-online hybrid distribution, which is why Purplle, Tira, and Myntra Beauty hold respectable share but haven&apos;t broken out. The product bar includes AR try-on for makeup and an influencer ecosystem that drives more discovery than search.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for beauty tech PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Beauty PM Skills — Free →
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

        <RelatedPages slug="pm-beauty-tech" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Beauty PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
