import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Neo Banking (2026) — Jupiter, Fi, Niyo PM Guide",
  description:
    "How PMs build neo banks in India. BaaS partnerships, RBI constraints, and why neobanks survive on adjacent product strength, not core banking.",
  keywords: [
    "PM neo banking", "Jupiter PM",
    "Fi PM", "Niyo PM 2026",
  ],
  alternates: { canonical: "/pm-neo-banking" },
  openGraph: {
    title: "PM Neo Banking 2026 — PM Streak",
    description: "How PMs build neo banks in India.",
    url: `${SITE_URL}/pm-neo-banking`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Neo+Banking+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Neo Banking 2026 — PM Streak",
    description: "How PMs build neo banks in India.",
    images: [`${SITE_URL}/api/og?title=PM+Neo+Banking+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "India has no neobank licence — every product rides a partner bank",
  "Core deposits don&apos;t make money for neobanks — adjacent products do",
  "BaaS partnerships are the dependency — partner bank decisions shape roadmap",
  "Cross-border (NRI, travel) is a high-margin wedge",
  "Differentiation lives in UX, analytics, and investments — not banking itself",
];

const METRICS = [
  "MAU and average balance per user",
  "Cross-sell rate (deposits → investments / insurance / credit)",
  "Take rate on outbound payments and card spends",
  "Support ticket rate (BaaS partners often cause these)",
  "Quarterly attrition",
];

const FAQS = [
  {
    q: "Do Indian neobanks have a sustainable business model?",
    a: "Only those that became full-stack ecosystems. Pure-play neobanks (deposit/UPI only) struggle because they don&apos;t own the balance sheet. The ones that survive cross-sell investments, credit, and premium services on top. Jupiter, Fi, Niyo all pivoted to this model. Pure banking UX with partner bank backend is not a standalone business.",
  },
];

export default function PmNeoBankingPage() {
  const dates = pageDates("/pm-neo-banking");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Neo Banking", url: `${SITE_URL}/pm-neo-banking` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Neo Banking (India Edition)",
        description: "How PMs build neo banks in India. BaaS partnerships, RBI constraints, and why neobanks survive on adjacent product strength, not core banking.",
        image: `${SITE_URL}/api/og?title=PM+Neo+Banking+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-neo-banking`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🏛️</span> Neobanks don&apos;t make money on banking. They make money on what&apos;s next to it.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Neo Banking<br />(India Edition)
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-3">
            Because India has no neobank licence, every product rides on a partner bank, and profit comes from cross-sold investments, credit, and insurance rather than deposits themselves. That BaaS dependency also shapes the roadmap and creates a real support burden, which is why Jupiter, Fi, and Niyo all pivoted toward full-stack ecosystems to stay sustainable.
          </p>
          <p className="text-xs text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-white/70 hover:text-[#89e219] underline underline-offset-2">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for neo banking PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Neo Banking PM Skills — Free →
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

        <RelatedPages slug="pm-neo-banking" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Neo Banking PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
