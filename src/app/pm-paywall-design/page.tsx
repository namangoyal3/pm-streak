import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Paywall Design (2026) — Hard, Soft, and Hybrid Paywalls",
  description:
    "How PMs design paywalls. Hard vs soft, metered, freemium, and which patterns convert best for content, SaaS, and consumer apps.",
  keywords: [
    "PM paywall design", "paywall conversion 2026",
  ],
  alternates: { canonical: "/pm-paywall-design" },
  openGraph: {
    title: "PM Paywall Design 2026 — PM Streak",
    description: "Hard, soft, and hybrid paywalls.",
    url: `${SITE_URL}/pm-paywall-design`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Paywall+Design+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Paywall Design 2026 — PM Streak",
    description: "Hard, soft, and hybrid paywalls.",
    images: [`${SITE_URL}/api/og?title=PM+Paywall+Design+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const TYPES = [
  { t: "Hard paywall", w: "All content gated. High intent only. Lower top-of-funnel." },
  { t: "Metered paywall", w: "Free up to N items. NYT classic. Predictable conversion." },
  { t: "Soft paywall", w: "Some content free, premium gated. Best for value-prove." },
  { t: "Freemium tier", w: "Forever-free + paid features. SaaS-friendly." },
];

const TIPS = [
  "Show value before asking for money",
  "Pricing legible — annual vs monthly clear",
  "Trial vs free tier — match to time-to-value",
  "Soft-paywall A/B tests outperform hard-paywall changes",
];

const FAQS = [
  {
    q: "Hard or soft paywall for content products?",
    a: "Soft, almost always. Hard paywalls cap top-of-funnel and starve discovery. Metered (NYT-style) and freemium-with-premium models grow audience and conversion together. Hard paywalls work only for ultra-niche, high-intent audiences (academic journals, certain B2B research).",
  },
];

export default function PmPaywallDesignPage() {
  const dates = pageDates("/pm-paywall-design");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Paywall Design", url: `${SITE_URL}/pm-paywall-design` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Paywall Design (2026 Edition)",
        description: "How PMs design paywalls. Hard vs soft, metered, freemium, and which patterns convert best for content, SaaS, and consumer apps.",
        image: `${SITE_URL}/api/og?title=PM+Paywall+Design+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-paywall-design`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔒</span> Show value first. Charge after.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Paywall Design<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Which paywall to use depends on the goal: hard paywalls gate everything for high-intent-only audiences, metered paywalls (the NYT model) allow a fixed number of free items, soft paywalls keep some content open while gating premium value, and freemium tiers pair a forever-free layer with paid features — the general rule is to show value before charging, since soft-paywall A/B tests outperform hard-paywall changes.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            4 paywall types and 4 tips for high-converting paywalls.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Paywall PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">4 Types</h2>
          <div className="space-y-3">
            {TYPES.map((t, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-[#89e219] text-sm mb-1">{t.t}</p>
                <p className="text-xs text-white/60">{t.w}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">4 Tips</h2>
            <div className="space-y-2">
              {TIPS.map((t, i) => (
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

        <RelatedPages slug="pm-paywall-design" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Paywall PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
