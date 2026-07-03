import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Real Estate Tech (2026) — NoBroker, MagicBricks, Housing PM Guide",
  description:
    "How PMs build real estate tech products. Listings quality, broker dynamics, renter vs buyer funnels, and the long-cycle problems of proptech.",
  keywords: [
    "PM real estate", "proptech PM",
    "NoBroker PM", "MagicBricks PM 2026",
  ],
  alternates: { canonical: "/pm-real-estate-tech" },
  openGraph: {
    title: "PM Real Estate Tech 2026 — PM Streak",
    description: "How PMs build real estate tech products.",
    url: `${SITE_URL}/pm-real-estate-tech`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Real+Estate+Tech+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Real Estate Tech 2026 — PM Streak",
    description: "How PMs build real estate tech products.",
    images: [`${SITE_URL}/api/og?title=PM+Real+Estate+Tech+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Listings quality is the moat — fake and stale listings destroy trust",
  "Long purchase cycles — buyers research for 6+ months before closing",
  "Broker dynamics — powerful gatekeepers with counter-incentives",
  "Renter vs buyer funnels are different products — treat them that way",
  "Trust signals matter more than UX — photos, verification, reviews",
];

const METRICS = [
  "Verified listings ratio",
  "Listing freshness — % updated in last 30 days",
  "Inquiry-to-visit conversion",
  "Broker satisfaction (if they&apos;re part of your model)",
  "NPS from closed transactions",
];

const FAQS = [
  {
    q: "Is Indian proptech a winnable market?",
    a: "Niche-by-niche. Rental discovery (NoBroker model) works at scale. Buying remains complicated by brokers, documentation, and trust. Most successful proptech companies pick one slice (rentals, co-living, short-stay, plots) rather than trying to solve all of real estate. Horizontal plays struggle.",
  },
];

export default function PmRealEstateTechPage() {
  const dates = pageDates("/pm-real-estate-tech");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Real Estate Tech", url: `${SITE_URL}/pm-real-estate-tech` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Real Estate Tech (India Edition)",
        description: "How PMs build real estate tech products. Listings quality, broker dynamics, renter vs buyer funnels, and the long-cycle problems of proptech.",
        image: `${SITE_URL}/api/og?title=PM+Real+Estate+Tech+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-real-estate-tech`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🏠</span> Listings quality beats UX every time in proptech
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Real Estate Tech<br />(India Edition)
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-3">
            Real estate tech in India wins by picking one narrow slice — rentals, co-living, short-stay, or plots — rather than solving buying and selling at once, because fake or stale listings destroy trust faster than any UX fix can rebuild it, and buyers spend six-plus months researching before they close. That&apos;s why proptech PMs watch verified-listings ratio, listing freshness, inquiry-to-visit conversion, and broker satisfaction instead of typical acquisition funnels.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for proptech PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Proptech PM Skills — Free →
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

        <RelatedPages slug="pm-real-estate-tech" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Proptech Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
