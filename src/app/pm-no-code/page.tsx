import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM No-Code & Low-Code (2026) — Building Products for Non-Developers",
  description:
    "How PMs build no-code and low-code products. Webflow, Bubble, Retool, Glide — abstractions, escape hatches, and audience design.",
  keywords: [
    "PM no-code", "low-code PM",
    "no-code product 2026",
  ],
  alternates: { canonical: "/pm-no-code" },
  openGraph: {
    title: "PM No-Code & Low-Code 2026 — PM Streak",
    description: "How PMs build no-code and low-code products.",
    url: `${SITE_URL}/pm-no-code`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+No-Code+&+Low-Code+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM No-Code & Low-Code 2026 — PM Streak",
    description: "How PMs build no-code and low-code products.",
    images: [`${SITE_URL}/api/og?title=PM+No-Code+&+Low-Code+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const TRADEOFFS = [
  "Power vs simplicity — more features, more UI, more overwhelm",
  "Abstraction vs escape hatches — no-code always needs a way out for power users",
  "Audience drift — tools expand from non-devs to devs; pricing and UX must keep up",
  "Template marketplace — leverage for acquisition, but quality control matters",
  "AI integration — natural language is rewriting the no-code interface",
];

const METRICS = [
  "Time-to-first-published-app",
  "Retention by user type (hobbyist, business, agency)",
  "Template usage vs blank-canvas usage",
  "Export / code-out rate — signal of audience outgrowth",
  "Paid plan conversion and tier distribution",
];

const FAQS = [
  {
    q: "Will AI kill no-code?",
    a: "No — but it will change who uses it. AI lowers the floor for non-devs to build basic apps; no-code platforms will continue winning on structure, governance, and collaboration. The dangerous middle (visual builders with no AI) is where competitive pressure is highest. The platforms that succeed combine no-code primitives with AI scaffolding.",
  },
];

export default function PmNoCodePage() {
  const dates = pageDates("/pm-no-code");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM No-Code & Low-Code", url: `${SITE_URL}/pm-no-code` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM No-Code & Low-Code (2026 Edition)",
        description: "How PMs build no-code and low-code products. Webflow, Bubble, Retool, Glide — abstractions, escape hatches, and audience design.",
        image: `${SITE_URL}/api/og?title=PM+No-Code+&+Low-Code+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-no-code`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🧩</span> No-code PMs design abstractions — and escape hatches
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM No-Code &amp; Low-Code<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-3">
            No-code PM work centers on designing abstractions non-developers can use without hitting a wall, balancing power against simplicity while building escape hatches for users who outgrow the tool — success gets tracked through time-to-first-published-app, template versus blank-canvas usage, export rates, and paid-plan conversion, all while AI reshapes who ends up touching the builder at all.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 tradeoffs and 5 metrics for no-code product PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build No-Code PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Tradeoffs</h2>
          <div className="space-y-2">
            {TRADEOFFS.map((t, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{t}</p>
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

        <RelatedPages slug="pm-no-code" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice No-Code PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
