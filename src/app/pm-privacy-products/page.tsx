import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Privacy Products (2026) — DPDP, GDPR, and Privacy-by-Design",
  description:
    "How PMs build privacy-respecting products. Consent, data minimisation, DSR workflows, and why India&apos;s DPDP Act changes the game.",
  keywords: [
    "PM privacy products", "DPDP Act",
    "GDPR PM", "privacy-by-design 2026",
  ],
  alternates: { canonical: "/pm-privacy-products" },
  openGraph: {
    title: "PM Privacy Products 2026 — PM Streak",
    description: "Building privacy-respecting products.",
    url: `${SITE_URL}/pm-privacy-products`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Privacy+Products+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Privacy Products 2026 — PM Streak",
    description: "Building privacy-respecting products.",
    images: [`${SITE_URL}/api/og?title=PM+Privacy+Products+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PRINCIPLES = [
  "Data minimisation — collect only what you need for the job",
  "Purpose limitation — don&apos;t reuse data across unrelated purposes",
  "Consent is a UX problem, not just legal — make it honest and specific",
  "DSR (data subject request) flows — export, delete, rectify, portability",
  "Privacy reviews on every feature — shift left to avoid rewrites",
];

const METRICS = [
  "DSR fulfilment SLA (typically 30–45 days by law)",
  "Consent opt-in rate per surface",
  "Data retention compliance — how much expired data is still stored?",
  "Privacy incident count and severity",
  "Time-to-privacy-review for new features",
];

const FAQS = [
  {
    q: "What does India&apos;s DPDP Act change for product teams?",
    a: "Formal consent requirements, DSR fulfilment SLAs, and penalties up to INR 250 crore for major breaches. Products built pre-DPDP often need consent flow rework, data retention policies, and DSR endpoints. Treat DPDP as a cross-functional project with eng, legal, and product jointly owning compliance.",
  },
];

export default function PmPrivacyProductsPage() {
  const dates = pageDates("/pm-privacy-products");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Privacy Products", url: `${SITE_URL}/pm-privacy-products` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Privacy Products (2026 Edition)",
        description:
          "How PMs build privacy-respecting products. Consent, data minimisation, DSR workflows, and why India&apos;s DPDP Act changes the game.",
        image: `${SITE_URL}/api/og?title=PM+Privacy+Products+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-privacy-products`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔒</span> Privacy-by-design saves quarters of cleanup later
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Privacy Products<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Privacy product management centers on five principles — data minimisation, purpose limitation, honest consent design, DSR handling, and privacy reviews built into every feature — tracked through metrics like DSR fulfilment SLA and consent opt-in rate. India&apos;s DPDP Act adds formal consent rules and DSR deadlines, with penalties up to INR 250 crore, turning compliance into a joint effort across product, legal, and engineering.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-white/60 hover:text-[#89e219] underline underline-offset-2 transition-colors">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 principles and 5 metrics for privacy-conscious PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Privacy PM Skills — Free →
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

        <RelatedPages slug="pm-privacy-products" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Privacy PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
