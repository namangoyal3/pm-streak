import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Monetization Models (2026) — Picking the Right Way to Make Money",
  description:
    "Subscription, transaction, advertising, marketplace, freemium — how PMs choose monetisation that fits product and audience.",
  keywords: [
    "PM monetization models", "monetisation PM 2026",
  ],
  alternates: { canonical: "/pm-monetization-models" },
  openGraph: {
    title: "PM Monetization Models 2026 — PM Streak",
    description: "Picking the right way to make money.",
    url: `${SITE_URL}/pm-monetization-models`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Monetization+Models+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Monetization Models 2026 — PM Streak",
    description: "Picking the right way to make money.",
    images: [`${SITE_URL}/api/og?title=PM+Monetization+Models+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const MODELS = [
  { m: "Subscription", w: "Predictable revenue. Best for high-frequency products with ongoing value." },
  { m: "Transaction / take rate", w: "Marketplace-friendly. Scales with GMV." },
  { m: "Advertising", w: "Scale before monetisation. Privacy headwinds rising." },
  { m: "Freemium", w: "Acquisition leverage. Conversion the lever; needs clear paid value." },
  { m: "Usage-based", w: "Customer pays as value scales. Strong for infra and AI." },
  { m: "Hybrid", w: "Mix to fit different segments — most successful SaaS does this." },
];

const FAQS = [
  {
    q: "Can a product change monetisation model after launch?",
    a: "Yes, but with friction. Switching from ads to subscription, or freemium to paid, alienates existing users. The best model changes happen alongside major value changes (new tier, new use case) so users see the why. Cold model switches without value increase usually fail.",
  },
];

export default function PmMonetizationModelsPage() {
  const dates = pageDates("/pm-monetization-models");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Monetization Models", url: `${SITE_URL}/pm-monetization-models` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Monetization Models (2026 Edition)",
        description: "Subscription, transaction, advertising, marketplace, freemium — how PMs choose monetisation that fits product and audience.",
        image: `${SITE_URL}/api/og?title=PM+Monetization+Models+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-monetization-models`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>💵</span> Monetisation should match the value cadence of your product
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Monetization Models<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Choosing how a product makes money comes down to six models — subscription for predictable revenue, transaction or take-rate for marketplaces that scale with GMV, advertising once scale exists, freemium for acquisition leverage, usage-based pricing that&apos;s strong for infra and AI, and hybrids that mix models to fit different segments — with the right choice matching how frequently the product delivers value.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 monetisation models compared.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Monetisation PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Models</h2>
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

        <RelatedPages slug="pm-monetization-models" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Monetization Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
