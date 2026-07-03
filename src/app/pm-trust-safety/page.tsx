import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Trust &amp; Safety (2026) — Fraud, Abuse, and Platform Integrity",
  description:
    "How PMs build trust and safety products. Fraud detection, abuse prevention, identity verification, and why T&amp;S is increasingly central to platform economics.",
  keywords: [
    "PM trust safety", "fraud PM",
    "abuse prevention PM 2026",
  ],
  alternates: { canonical: "/pm-trust-safety" },
  openGraph: {
    title: "PM Trust &amp; Safety 2026 — PM Streak",
    description: "How PMs build trust and safety products.",
    url: `${SITE_URL}/pm-trust-safety`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Trust+&amp;+Safety+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Trust &amp; Safety 2026 — PM Streak",
    description: "How PMs build trust and safety products.",
    images: [`${SITE_URL}/api/og?title=PM+Trust+&amp;+Safety+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Adversaries adapt fast — your defences must evolve or decay",
  "False positives destroy trust on the other side — balance matters",
  "Graph-level signals beat single-action signals for fraud",
  "Identity verification is a product — KYC UX decides conversion",
  "Transparency reports shape regulator and user trust",
];

const METRICS = [
  "Fraud loss rate (dollars or incidents per 10k transactions)",
  "False positive rate — legitimate users caught in nets",
  "Time-to-detect on new attack patterns",
  "Manual review load — minutes per case",
  "Appeal overturn rate",
];

const FAQS = [
  {
    q: "Is trust and safety a fast-growing PM area?",
    a: "Yes. Every marketplace, payments, social, and consumer platform invests in T&amp;S. Regulatory pressure (DSA in EU, Digital India Act) increases demand. Skills are highly transferable across industries. It&apos;s also one of the few PM areas where the impact of not doing the job well shows up on the evening news.",
  },
];

export default function PmTrustSafetyPage() {
  const dates = pageDates("/pm-trust-safety");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Trust & Safety", url: `${SITE_URL}/pm-trust-safety` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Trust & Safety (2026 Edition)",
        description: "How PMs build trust and safety products. Fraud detection, abuse prevention, identity verification, and why T&amp;S is increasingly central to platform economics.",
        image: `${SITE_URL}/api/og?title=PM+Trust+&amp;+Safety+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-trust-safety`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🛡️</span> Adversaries adapt. Your defences must too.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Trust &amp; Safety<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-3">
            Trust and safety PM work plays out like an arms race: defences must keep evolving as adversaries adapt, graph-level signals catch fraud that single-action rules miss, and identity verification doubles as a conversion-critical surface since KYC UX decides who completes onboarding. Progress gets tracked through fraud loss rate, false-positive rate, time-to-detect, and appeal overturn rate — a field expanding fast as regulatory pressure like the EU&apos;s DSA increases demand.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for trust and safety PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build T&amp;S PM Skills — Free →
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

        <RelatedPages slug="pm-trust-safety" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice T&amp;S Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
