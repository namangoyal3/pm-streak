import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Internationalisation (2026) — Building Products for Multiple Markets",
  description:
    "How PMs internationalise products. Localisation vs translation, payment methods, legal, and why i18n is a first-class product concern.",
  keywords: [
    "PM internationalisation", "i18n PM",
    "localisation PM 2026",
  ],
  alternates: { canonical: "/pm-internationalisation" },
  openGraph: {
    title: "PM Internationalisation 2026 — PM Streak",
    description: "Building products for multiple markets.",
    url: `${SITE_URL}/pm-internationalisation`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Internationalisation+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Internationalisation 2026 — PM Streak",
    description: "Building products for multiple markets.",
    images: [`${SITE_URL}/api/og?title=PM+Internationalisation+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const LAYERS = [
  "Language — translation and right-to-left scripts",
  "Currency and payment methods — UPI, iDEAL, Pix, SEPA, cards",
  "Legal and regulatory — each market adds constraints",
  "Cultural UX — colour, imagery, tone, formality",
  "Operational — support, SLAs, local teams, time zones",
];

const PRACTICES = [
  "Internationalise early — retrofitting i18n is 5–10x the cost",
  "Design for string expansion — German text is 30% longer than English",
  "Test RTL (Arabic, Hebrew) even if not launching there soon",
  "Separate translation from localisation — translation alone isn&apos;t enough",
  "Price for local purchasing power — not just USD conversion",
];

const FAQS = [
  {
    q: "When should a product go international?",
    a: "When domestic unit economics are proven and you have the operational capacity to support another market. Premature expansion spreads focus thin; delayed expansion leaves money on the table. Most successful SaaS companies expand after $5M–$20M ARR in the home market.",
  },
];

export default function PmInternationalisationPage() {
  const dates = pageDates("/pm-internationalisation");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Internationalisation", url: `${SITE_URL}/pm-internationalisation` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Internationalisation (2026 Edition)",
        description:
          "How PMs internationalise products. Localisation vs translation, payment methods, legal, and why i18n is a first-class product concern.",
        image: `${SITE_URL}/api/og?title=PM+Internationalisation+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-internationalisation`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🌐</span> Internationalise early. Retrofit later costs 10x.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Internationalisation<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Internationalising a product touches five layers at once — language, currency and payment methods, legal and regulatory rules, cultural UX, and local operations — which is why PMs are advised to start early, since retrofitting i18n later can cost five to ten times more, and to expand only once domestic unit economics are proven, typically past $5M–$20M in ARR.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 i18n layers and 5 practices for PMs going global.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build i18n PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Layers</h2>
          <div className="space-y-2">
            {LAYERS.map((l, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{l}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Practices</h2>
            <div className="space-y-2">
              {PRACTICES.map((p, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{p}</p>
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

        <RelatedPages slug="pm-internationalisation" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice i18n PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
