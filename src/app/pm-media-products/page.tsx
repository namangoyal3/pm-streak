import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Media Products (2026) — Spotify, Netflix, JioCinema PM Lessons",
  description:
    "How PMs build streaming and media products. Content vs catalog, recommendations, ads vs subscription, and the economics of attention.",
  keywords: [
    "PM media products", "streaming PM",
    "OTT PM", "Netflix PM 2026",
  ],
  alternates: { canonical: "/pm-media-products" },
  openGraph: {
    title: "PM Media Products 2026 — PM Streak",
    description: "How PMs build streaming and media products.",
    url: `${SITE_URL}/pm-media-products`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Media+Products+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Media Products 2026 — PM Streak",
    description: "How PMs build streaming and media products.",
    images: [`${SITE_URL}/api/og?title=PM+Media+Products+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Content is the product — interface is a distant second",
  "Recommendation beats search — users lean back, not forward",
  "Catalog breadth vs depth — a few great titles beat a long tail of mediocre",
  "Ads vs subscription vs hybrid — each has different product implications",
  "Regional content wins regional markets — local-language is not optional in India",
];

const METRICS = [
  "Watch time per DAU",
  "Retention D7, D30, D90",
  "Content engagement distribution — heads vs long tail",
  "Ad load tolerance before churn",
  "Subscription renewal rate",
];

const FAQS = [
  {
    q: "Is Indian OTT a winnable market?",
    a: "Yes, but margins are thin and competition is fierce. JioCinema, Disney+ Hotstar, Netflix, Amazon Prime Video, SonyLIV, ZEE5 all compete. Wins come from differentiated content (live sports, regional originals), pricing innovation (mobile-only tiers), and distribution (telco bundles). Pure-play streaming without a content or distribution edge struggles.",
  },
];

export default function PmMediaProductsPage() {
  const dates = pageDates("/pm-media-products");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Media Products", url: `${SITE_URL}/pm-media-products` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Media Products (2026 Edition)",
        description:
          "How PMs build streaming and media products. Content vs catalog, recommendations, ads vs subscription, and the economics of attention.",
        image: `${SITE_URL}/api/og?title=PM+Media+Products+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-media-products`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🎬</span> Media products live or die on content. UX comes second.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Media Products<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            What separates winning streaming products? Content quality outweighs interface polish, recommendation systems matter more than search, and regional-language catalogs decide who wins in India&apos;s crowded market of JioCinema, Disney+ Hotstar, Netflix, Amazon Prime Video, SonyLIV, and ZEE5. Success is tracked through watch time per DAU, D7/D30/D90 retention, and ad-load tolerance, with edges coming from exclusive content, tiered pricing, and telco distribution deals.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-white/60 hover:text-[#89e219] underline underline-offset-2 transition-colors">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for streaming and media PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Media PM Skills — Free →
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

        <RelatedPages slug="pm-media-products" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Media PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
