import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Video Products (2026) — YouTube, TikTok, Reels PM Playbook",
  description:
    "How PMs build video products. Watch time, creator tools, recommendation, monetisation, and the unique engagement dynamics of video.",
  keywords: [
    "PM video products", "YouTube PM",
    "TikTok PM", "Reels PM", "video product 2026",
  ],
  alternates: { canonical: "/pm-video-products" },
  openGraph: {
    title: "PM Video Products 2026 — PM Streak",
    description: "How PMs build video products — watch time, creator tools, recommendation.",
    url: `${SITE_URL}/pm-video-products`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Video+Products+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Video Products 2026 — PM Streak",
    description: "How PMs build video products — watch time, creator tools, recommendation.",
    images: [`${SITE_URL}/api/og?title=PM+Video+Products+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Watch time is the dominant signal — but shallow clicks can game it",
  "Creator tooling beats consumer features — supply side compounds",
  "Recommendation is the product — algorithm changes can reshape entire categories",
  "Vertical video has rewired mobile expectations — horizontal is now the exception",
  "Monetisation split dictates creator loyalty — platform economics drive creator multi-homing",
];

const METRICS = [
  "Watch time per DAU",
  "Session length and session count",
  "Creator upload frequency and retention",
  "Impressions-to-watch rate",
  "Skip rate in the first 3 seconds — the real hook signal",
];

const FAQS = [
  {
    q: "Why is the first 3 seconds so load-bearing in video?",
    a: "Because the cost of swiping is near zero. If the opening doesn&apos;t land, users move on without penalty. Creators and platforms optimise aggressively for the 3-second hook because it gates every downstream metric — watch time, completion, shares.",
  },
];

export default function PmVideoProductsPage() {
  const dates = pageDates("/pm-video-products");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Video Products", url: `${SITE_URL}/pm-video-products` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Video Products (2026 Edition)",
        description:
          "How PMs build video products. Watch time, creator tools, recommendation, monetisation, and the unique engagement dynamics of video.",
        image: `${SITE_URL}/api/og?title=PM+Video+Products+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-video-products`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🎬</span> Short-form video rewired mobile. The effects are still compounding.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Video Products<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            The first three seconds decide everything in video products: because swiping away costs
            nothing, PMs and creators optimize the opening hook before anything else, then let watch
            time govern ranking even though shallow clicks can inflate it. Creator tooling compounds
            supply-side growth more than consumer features do, so teams track watch time per DAU,
            session length, creator upload frequency and retention, and skip rate in the first three
            seconds.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for video product PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Video PM Skills — Free →
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

        <RelatedPages slug="pm-video-products" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Video PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
