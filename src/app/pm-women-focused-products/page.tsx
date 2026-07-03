import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Women-Focused Products (2026) — SHEROES, Plum, Sugar PM Lessons",
  description:
    "How PMs build products for women. Safety, financial inclusion, health, community — and why women-first products demand women-first teams.",
  keywords: [
    "PM women products", "women-first PM",
    "female audience 2026",
  ],
  alternates: { canonical: "/pm-women-focused-products" },
  openGraph: {
    title: "PM Women-Focused Products 2026 — PM Streak",
    description: "How PMs build products for women.",
    url: `${SITE_URL}/pm-women-focused-products`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Women-Focused+Products+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Women-Focused Products 2026 — PM Streak",
    description: "How PMs build products for women.",
    images: [`${SITE_URL}/api/og?title=PM+Women-Focused+Products+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PRINCIPLES = [
  "Safety is a first-order feature, not a later checkbox",
  "Community often precedes commerce — SHEROES, Meesho learned this",
  "Financial products for women fight historical exclusion — design for this",
  "Health products require clinical credibility and empathy in equal measure",
  "Hire women on product, design, and research — outcomes are measurably better",
];

const CATEGORIES = [
  "Finance (SBI YONO She, Niyo for women, investment-focused)",
  "Safety (public transport safety, SOS apps, verified community)",
  "Health (menstrual, fertility, maternal, menopause)",
  "Career (SHEROES, Leanin.org India chapters)",
  "Beauty, fashion, lifestyle (Nykaa, Sugar, Plum)",
];

const FAQS = [
  {
    q: "Why do women-first products need women-first teams?",
    a: "Because lived experience shapes product judgment. Men building for women default to what they observe, not what women experience. Safety, health, and social products designed without women on the core team ship blind spots that cost trust. The highest-growing women-first products all have women founders or senior PMs driving direction.",
  },
];

export default function PmWomenFocusedProductsPage() {
  const dates = pageDates("/pm-women-focused-products");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Women-Focused Products", url: `${SITE_URL}/pm-women-focused-products` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Women-Focused Products (India Edition)",
        description:
          "How PMs build products for women. Safety, financial inclusion, health, community — and why women-first products demand women-first teams.",
        image: `${SITE_URL}/api/og?title=PM+Women-Focused+Products+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-women-focused-products`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>✨</span> Women-first products need women-first teams
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Women-Focused Products<br />(India Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            To build credibly for India&apos;s women-first market, PMs treat safety as a first-order feature rather than an afterthought, lean on community before commerce (as SHEROES and Meesho did), and design finance, health, safety, career, and beauty products with women embedded on the core team — since lived experience, not observation, shapes the judgment these categories demand.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 principles and 5 categories for women-first product PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Women-Focused PM Skills — Free →
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
            <h2 className="text-2xl font-bold text-center mb-10">5 Categories</h2>
            <div className="space-y-2">
              {CATEGORIES.map((c, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{c}</p>
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

        <RelatedPages slug="pm-women-focused-products" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Women-Focused PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
