import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Bring-Your-Own-Key (2026) — When BYOK is Right for AI Products",
  description:
    "When PMs should offer bring-your-own-key for AI. Cost shifting, enterprise compliance, and the pricing implications.",
  keywords: [
    "PM BYOK", "bring your own key 2026",
  ],
  alternates: { canonical: "/pm-ai-bring-your-own-key" },
  openGraph: {
    title: "PM Bring-Your-Own-Key 2026 — PM Streak",
    description: "When BYOK is right for AI products.",
    url: `${SITE_URL}/pm-ai-bring-your-own-key`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Bring-Your-Own-Key+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Bring-Your-Own-Key 2026 — PM Streak",
    description: "When BYOK is right for AI products.",
    images: [`${SITE_URL}/api/og?title=PM+Bring-Your-Own-Key+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const WHEN = [
  "Enterprise compliance demands customer-controlled keys",
  "Power users want to use their own model rate limits",
  "You can&apos;t margin on AI cost at competitive pricing",
  "Customers have negotiated better rates with foundation labs",
];

const TRADEOFFS = [
  "Lower COGS but lower revenue per user",
  "Support burden when keys fail or quota exhausts",
  "Fragmented model access across customers",
  "Brand control if BYOK leads to inconsistent UX",
];

const FAQS = [
  {
    q: "Should AI startups offer BYOK as a standard feature?",
    a: "Optional, not standard. BYOK helps enterprise procurement and a small power-user segment, but most users don&apos;t want to manage keys. Default to managed; offer BYOK on enterprise tier. Pure-BYOK companies often struggle to capture value because the differentiation moves to the model provider.",
  },
];

export default function PmAiBringYourOwnKeyPage() {
  const dates = pageDates("/pm-ai-bring-your-own-key");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM BYOK", url: `${SITE_URL}/pm-ai-bring-your-own-key` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Bring-Your-Own-Key (2026 Edition)",
        description:
          "When PMs should offer bring-your-own-key for AI. Cost shifting, enterprise compliance, and the pricing implications.",
        image: `${SITE_URL}/api/og?title=PM+Bring-Your-Own-Key+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-ai-bring-your-own-key`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔑</span> BYOK as enterprise option, not default
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Bring-Your-Own-Key<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Bring-your-own-key makes sense when enterprise compliance demands customer-controlled keys, power users want their own rate limits, or margins don&apos;t support competitive pricing on AI cost — but it trades lower COGS for lower revenue per user, added support burden, and fragmented access. Default to managed; reserve BYOK for the enterprise tier.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            4 cases for BYOK and 4 tradeoffs to weigh.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build BYOK PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">When to Offer</h2>
          <div className="space-y-2">
            {WHEN.map((w, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{w}</p>
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

        <RelatedPages slug="pm-ai-bring-your-own-key" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice BYOK Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
