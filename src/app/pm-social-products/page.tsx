import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Social Products (2026) — Instagram, Snap, BeReal, Bluesky PM Lessons",
  description:
    "How PMs build social products. Network effects, content loops, cold start, and why most social apps die in the first 18 months.",
  keywords: [
    "PM social products", "social app PM",
    "network effects", "social network 2026",
  ],
  alternates: { canonical: "/pm-social-products" },
  openGraph: {
    title: "PM Social Products 2026 — PM Streak",
    description: "How PMs build social products — network effects, content loops, cold start.",
    url: `${SITE_URL}/pm-social-products`,
    type: "article",
  },
};

const DYNAMICS = [
  "Cold start is the real problem — the first 100k matter more than the next 10M",
  "Content supply matters more than demand — one creator serves thousands",
  "Graph density &gt; MAU — users with 7+ friends retain dramatically better",
  "Fresh signals beat old graphs — users follow interest, not obligation",
  "Moderation is infrastructure — without it, the network collapses into noise",
];

const METRICS = [
  "Time spent per DAU",
  "% of users creating content vs consuming",
  "Friend-count distribution — median and long tail",
  "D1/D7/D30 retention by first-session behaviour",
  "Reports per 1000 pieces of content — trust signal",
];

const FAQS = [
  {
    q: "Can new social networks still break through in 2026?",
    a: "Yes, but rarely from zero. Bluesky (Twitter refugees), BeReal (anti-curation niche), and Substack Notes (creator-led) all started from existing communities. Brand-new networks without an existing community to transplant have historically failed. Niche-first, general later is the only proven path.",
  },
];

export default function PmSocialProductsPage() {
  const dates = pageDates("/pm-social-products");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Social Products", url: `${SITE_URL}/pm-social-products` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Social Products (2026 Edition)",
        description:
          "How PMs build social products. Network effects, content loops, cold start, and why most social apps die in the first 18 months.",
        image: `${SITE_URL}/api/og?title=PM+Social+Products+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-social-products`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🌐</span> Social products live or die on cold start
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Social Products<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Most social apps never make it past their first 18 months because cold start — not
            growth — is the real bottleneck: the first 100,000 users matter more than the next 10
            million, and networks need content supply and graph density (7+ friends) before demand
            follows. PMs watch time spent per DAU, the creator-to-consumer content ratio, friend-count
            distribution, and reports per 1,000 pieces of content as a trust signal.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for social product PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Social PM Skills — Free →
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

        <RelatedPages slug="pm-social-products" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Social Product Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
