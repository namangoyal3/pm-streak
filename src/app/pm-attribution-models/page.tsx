import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Attribution Models (2026) — Last-Click is Dead. What PMs Use Now.",
  description:
    "How PMs handle attribution after iOS 14, third-party cookies, and post-cookie. Models, MMM, and lift studies that actually work.",
  keywords: [
    "PM attribution", "marketing attribution PM 2026",
  ],
  alternates: { canonical: "/pm-attribution-models" },
  openGraph: {
    title: "PM Attribution Models 2026 — PM Streak",
    description: "Last-click is dead. What PMs use now.",
    url: `${SITE_URL}/pm-attribution-models`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Attribution+Models+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Attribution Models 2026 — PM Streak",
    description: "Last-click is dead. What PMs use now.",
    images: [`${SITE_URL}/api/og?title=PM+Attribution+Models+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const MODELS = [
  { m: "Last-click", w: "Simple, deceptive. Useful only as a benchmark." },
  { m: "Multi-touch", w: "Spreads credit across touchpoints. Better signal." },
  { m: "Marketing Mix Modeling (MMM)", w: "Holistic, statistical, slow. Resurging post-cookie." },
  { m: "Geo lift studies", w: "Scientific gold standard for measuring channel impact." },
  { m: "Self-reported", w: "&apos;Where did you hear about us?&apos; — surprisingly informative." },
];

const FAQS = [
  {
    q: "Why is MMM resurging in 2026?",
    a: "Because cookie-based and device-id attribution broke. iOS 14 killed IDFA. Cookies are deprecated. MMM, which uses aggregate spend and outcome data, doesn&apos;t need user-level tracking. It&apos;s slower and less granular than digital attribution but more accurate. Most large advertisers now run MMM alongside digital attribution.",
  },
];

export default function PmAttributionModelsPage() {
  const dates = pageDates("/pm-attribution-models");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Attribution Models", url: `${SITE_URL}/pm-attribution-models` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Attribution Models (2026 Edition)",
        description:
          "How PMs handle attribution after iOS 14, third-party cookies, and post-cookie. Models, MMM, and lift studies that actually work.",
        image: `${SITE_URL}/api/og?title=PM+Attribution+Models+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-attribution-models`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📡</span> Last-click died. MMM and lift studies took its place.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Attribution Models<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Last-click attribution lost credibility once iOS 14 killed IDFA and cookies got deprecated, so PMs now spread credit with multi-touch models, lean on Marketing Mix Modeling for slower but cookie-free measurement, run geo lift studies as the scientific gold standard for channel impact, and still ask self-reported &apos;where did you hear about us&apos; questions because they remain surprisingly informative.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 attribution approaches PMs should know.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Attribution PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Models</h2>
          <div className="space-y-3">
            {MODELS.map((m, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-[#89e219] text-sm mb-1">{m.m}</p>
                <p className="text-xs text-white/60">{m.w}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
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

        <RelatedPages slug="pm-attribution-models" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Attribution PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
