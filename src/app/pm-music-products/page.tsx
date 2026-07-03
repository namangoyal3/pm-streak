import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Music Products (2026) — Spotify, Apple Music, JioSaavn PM Lessons",
  description:
    "How PMs build music streaming products. Personalisation, playlists, podcasts, artist tools, and why music is the OG recommendation domain.",
  keywords: [
    "PM music products", "Spotify PM",
    "music streaming PM 2026",
  ],
  alternates: { canonical: "/pm-music-products" },
  openGraph: {
    title: "PM Music Products 2026 — PM Streak",
    description: "How PMs build music streaming products.",
    url: `${SITE_URL}/pm-music-products`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Music+Products+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Music Products 2026 — PM Streak",
    description: "How PMs build music streaming products.",
    images: [`${SITE_URL}/api/og?title=PM+Music+Products+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Personalisation is the product — Discover Weekly was a platform moment",
  "Playlists are more important than albums now — curated and algorithmic",
  "Podcasts and audiobooks expanded the category — same app, different behaviour",
  "Artist tooling matters — supply side is a real PM surface",
  "Regional music powers user acquisition in India — Bollywood, regional language, devotional",
];

const METRICS = [
  "Daily listening minutes per DAU",
  "Session length and sessions per day",
  "Playlist creation and save rate",
  "Free-to-paid conversion",
  "Skip rate on recommended tracks",
];

const FAQS = [
  {
    q: "Is music streaming a saturated market in India?",
    a: "Competitive but still growing. JioSaavn, Spotify, Apple Music, Wynk, YouTube Music, Gaana compete. Wins come from catalog exclusives, regional depth, pricing (bundled plans), and AI-driven personalisation. Free-tier with ads dominates in India unlike global markets where paid penetration is higher.",
  },
];

export default function PmMusicProductsPage() {
  const dates = pageDates("/pm-music-products");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Music Products", url: `${SITE_URL}/pm-music-products` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Music Products (2026 Edition)",
        description:
          "How PMs build music streaming products. Personalisation, playlists, podcasts, artist tools, and why music is the OG recommendation domain.",
        image: `${SITE_URL}/api/og?title=PM+Music+Products+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-music-products`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🎵</span> Music was the OG recommendation category. The lessons still hold.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Music Products<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Music product management runs on personalisation (Discover Weekly proved algorithmic curation could be a platform moment), playlist-first listening habits, and artist-facing tools as a genuine PM surface — not just consumer features. Teams track daily listening minutes, playlist save rate, and free-to-paid conversion; in India, JioSaavn, Spotify, Wynk, and Gaana compete mainly on regional catalog depth and ad-supported free tiers rather than paid penetration.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-white/60 hover:text-[#89e219] underline underline-offset-2 transition-colors">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for music PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Music PM Skills — Free →
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

        <RelatedPages slug="pm-music-products" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Music PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
