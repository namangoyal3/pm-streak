import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Senior Products (2026) — Designing for Older Users in India",
  description:
    "How PMs design products for seniors. Accessibility, trust, family-assisted UX, and why the Indian senior market is massively underserved.",
  keywords: [
    "PM senior products", "elderly UX",
    "senior product PM 2026",
  ],
  alternates: { canonical: "/pm-senior-products" },
  openGraph: {
    title: "PM Senior Products 2026 — PM Streak",
    description: "Designing for older users in India.",
    url: `${SITE_URL}/pm-senior-products`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Senior+Products+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Senior Products 2026 — PM Streak",
    description: "Designing for older users in India.",
    images: [`${SITE_URL}/api/og?title=PM+Senior+Products+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PRINCIPLES = [
  "Large fonts and generous tap targets — not a nice-to-have",
  "Remove ambiguity — clear labels, no hidden gestures",
  "Family-assisted flows — a son/daughter often uses the app too",
  "Vernacular by default — English-only excludes most Indian seniors",
  "Voice input unlocks enormous adoption",
  "Trust signals amplified — seniors are more vulnerable to fraud",
];

const CATEGORIES = [
  "Health (pharmacy, teleconsult, emergency)",
  "Finance (pension, investment, banking)",
  "Communication (family video, messaging)",
  "Entertainment (devotional content, classic films)",
  "Learning and social (community apps for 60+)",
];

const FAQS = [
  {
    q: "Is building for seniors a viable PM focus in India?",
    a: "Massively underserved and growing. India has 150M+ seniors and growing. Apps like Khyaal and Emoha show demand for social, health, and finance products designed specifically for older users. Most consumer apps fail seniors on UX even when the underlying service would suit them.",
  },
];

export default function PmSeniorProductsPage() {
  const dates = pageDates("/pm-senior-products");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Senior Products", url: `${SITE_URL}/pm-senior-products` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Senior Products (India Edition)",
        description:
          "How PMs design products for seniors. Accessibility, trust, family-assisted UX, and why the Indian senior market is massively underserved.",
        image: `${SITE_URL}/api/og?title=PM+Senior+Products+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-senior-products`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>👴</span> 150M+ Indian seniors. Massively underserved by current products.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Senior Products<br />(India Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Product management for India&apos;s senior segment centers on six design principles — large tap targets, unambiguous labels, family-assisted flows, vernacular-first interfaces, voice input, and amplified trust signals — applied across five categories: health, finance, communication, entertainment, and social learning. With 150M+ Indian seniors underserved by mainstream apps, this is a large and open PM opportunity.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 design principles and 5 categories for senior-focused PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Senior PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Principles</h2>
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

        <RelatedPages slug="pm-senior-products" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Senior PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
