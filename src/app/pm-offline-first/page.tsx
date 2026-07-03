import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Offline-First Products (2026) — Designing for Flaky Connectivity",
  description:
    "How PMs build offline-first products. Sync, conflict resolution, caching strategies, and why offline-first wins in India and emerging markets.",
  keywords: [
    "PM offline-first", "sync PM",
    "offline product 2026",
  ],
  alternates: { canonical: "/pm-offline-first" },
  openGraph: {
    title: "PM Offline-First Products 2026 — PM Streak",
    description: "Designing for flaky connectivity.",
    url: `${SITE_URL}/pm-offline-first`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Offline-First+Products+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Offline-First Products 2026 — PM Streak",
    description: "Designing for flaky connectivity.",
    images: [`${SITE_URL}/api/og?title=PM+Offline-First+Products+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PRINCIPLES = [
  "Assume connectivity will fail — design for that being normal",
  "Local-first writes with background sync",
  "Conflict resolution must be deterministic and transparent",
  "Show sync state explicitly — users need to know what&apos;s saved",
  "Test flows on airplane mode, not just wifi",
];

const TRADEOFFS = [
  "Storage cost vs responsiveness — how much to cache locally?",
  "Freshness vs availability — stale data visible vs no data",
  "Client complexity vs server simplicity",
  "Privacy implications of local data storage",
];

const FAQS = [
  {
    q: "Why is offline-first still a big deal in 2026?",
    a: "Because connectivity in India, SEA, Africa, and Latin America is still inconsistent. Even in developed markets, users lose signal in lifts, trains, rural areas, and airplanes. Products that gracefully handle disconnection feel more reliable everywhere. PMs who design offline-first build durable products; those who don&apos;t build fragile ones.",
  },
];

export default function PmOfflineFirstPage() {
  const dates = pageDates("/pm-offline-first");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Offline-First", url: `${SITE_URL}/pm-offline-first` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Offline-First Products (2026 Edition)",
        description:
          "How PMs build offline-first products. Sync, conflict resolution, caching strategies, and why offline-first wins in India and emerging markets.",
        image: `${SITE_URL}/api/og?title=PM+Offline-First+Products+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-offline-first`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📶</span> Assume connectivity will fail. Design for that.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Offline-First Products<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-3">
            Offline-first PM work starts from assuming connectivity will fail and designing for that as normal, not exceptional: local-first writes with background sync, deterministic conflict resolution, and sync state shown explicitly so users know what&apos;s saved — tested on airplane mode, not just wifi. The resulting tradeoffs are storage cost versus responsiveness, freshness versus availability, client complexity versus server simplicity, and the privacy of local data.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 design principles and 4 tradeoffs for offline-first PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Offline-First PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Principles</h2>
          <div className="space-y-2">
            {PRINCIPLES.map((p, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{p}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">4 Tradeoffs</h2>
            <div className="space-y-2">
              {TRADEOFFS.map((t, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{t}</p>
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

        <RelatedPages slug="pm-offline-first" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Offline-First Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
