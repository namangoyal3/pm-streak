import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM ONDC (2026) — Building on Open Network for Digital Commerce",
  description:
    "How PMs build on ONDC. Buyer app, seller app, network participants, and the opportunities and constraints of India&apos;s open commerce protocol.",
  keywords: [
    "PM ONDC", "ONDC PM",
    "open commerce india 2026",
  ],
  alternates: { canonical: "/pm-ondc" },
  openGraph: {
    title: "PM ONDC 2026 — PM Streak",
    description: "Building on India&apos;s open commerce protocol.",
    url: `${SITE_URL}/pm-ondc`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+ONDC+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM ONDC 2026 — PM Streak",
    description: "Building on India&apos;s open commerce protocol.",
    images: [`${SITE_URL}/api/og?title=PM+ONDC+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Network participants split into buyer apps, seller apps, logistics, payments",
  "Catalogue quality across sellers is the unlock — fragmented catalogues frustrate",
  "Commission structure differs from closed marketplaces — different economics",
  "Buyer app discoverability is the hard problem — how users find the right seller",
  "Still early — ONDC is evolving rapidly; expect spec changes",
];

const METRICS = [
  "Transactions via ONDC network",
  "Catalogue coverage across seller apps",
  "Buyer-to-seller conversion per search",
  "Cross-network seller satisfaction",
  "Return / dispute rate",
];

const FAQS = [
  {
    q: "Is ONDC real competition to Amazon and Flipkart?",
    a: "Aspirational, not yet. ONDC handles a meaningful but small share of Indian e-commerce in 2026. Long-term potential is real — an open network reduces Amazon/Flipkart&apos;s gatekeeping power. Short-term, UX and catalogue inconsistency across network participants limit adoption. The 5-year arc matters more than quarterly numbers.",
  },
];

export default function PmOndcPage() {
  const dates = pageDates("/pm-ondc");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM ONDC", url: `${SITE_URL}/pm-ondc` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM ONDC (India Edition)",
        description: "How PMs build on ONDC. Buyer app, seller app, network participants, and the opportunities and constraints of India&apos;s open commerce protocol.",
        image: `${SITE_URL}/api/og?title=PM+ONDC+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-ondc`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔓</span> Open commerce is a 5-year bet, not a quarterly one
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM ONDC<br />(India Edition)
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-3">
            ONDC splits the PM problem across buyer apps, seller apps, logistics, and payments, coordinated through an open network with a commission structure different from closed marketplaces. The hard parts are catalogue quality across fragmented sellers and buyer-app discoverability, reflected in metrics like catalogue coverage and buyer-to-seller conversion. As of 2026 ONDC holds a small but meaningful share of Indian e-commerce, and its five-year trajectory matters more than any single quarter.
          </p>
          <p className="text-xs text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-white/70 hover:text-[#89e219] underline underline-offset-2">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for PMs building on ONDC.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build ONDC PM Skills — Free →
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

        <RelatedPages slug="pm-ondc" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice ONDC PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
