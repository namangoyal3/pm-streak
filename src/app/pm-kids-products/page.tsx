import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Kids Products (2026) — Designing for Children and Parents",
  description:
    "How PMs build products for kids. Parental consent, COPPA, screen time, and why kids products serve two users with conflicting incentives.",
  keywords: [
    "PM kids products", "COPPA PM",
    "children product 2026",
  ],
  alternates: { canonical: "/pm-kids-products" },
  openGraph: {
    title: "PM Kids Products 2026 — PM Streak",
    description: "Designing for children and parents.",
    url: `${SITE_URL}/pm-kids-products`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Kids+Products+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Kids Products 2026 — PM Streak",
    description: "Designing for children and parents.",
    images: [`${SITE_URL}/api/og?title=PM+Kids+Products+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Two users with opposing incentives — kids want more, parents want less",
  "Parental consent is mandatory by law — COPPA, DPDP Act, GDPR-K",
  "Screen-time controls are the product, not a feature",
  "Ads are tightly regulated — design monetisation around parents, not kids",
  "Educational credibility requires real expert involvement",
];

const METRICS = [
  "Session length — kids want more, parents want less; measure satisfaction, not max",
  "Parental approval rate (account gating)",
  "Learning outcome where applicable",
  "Content safety incident rate",
  "Parent NPS as north-star alongside kid engagement",
];

const FAQS = [
  {
    q: "Why are kids products such a regulatory minefield?",
    a: "Because children are a protected class under COPPA (US), India&apos;s DPDP Act, and GDPR-K. Data collection, ad targeting, and UX dark patterns get disproportionate scrutiny. The best kids PMs build compliance into product design from day one — retrofit is painful and often fails legal review.",
  },
];

export default function PmKidsProductsPage() {
  const dates = pageDates("/pm-kids-products");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Kids Products", url: `${SITE_URL}/pm-kids-products` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Kids Products (2026 Edition)",
        description: "How PMs build products for kids. Parental consent, COPPA, screen time, and why kids products serve two users with conflicting incentives.",
        image: `${SITE_URL}/api/og?title=PM+Kids+Products+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-kids-products`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🧒</span> Two users. Conflicting incentives. Regulators watching.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Kids Products<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-2">
            Designing for kids means designing for two users at once — children who want more engagement and parents who want less, plus regulators who classify children as a protected group under COPPA, India&apos;s DPDP Act, and GDPR-K. That&apos;s why screen-time controls function as core product, not an afterthought, and why the strongest kids PMs bake compliance into the design from day one instead of retrofitting it later.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for PMs building for children.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Kids Product PM Skills — Free →
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

        <RelatedPages slug="pm-kids-products" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Kids Product PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
