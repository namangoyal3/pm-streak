import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Personalization (2026) — Building Products That Adapt to Users",
  description:
    "How PMs design personalization that users trust. Segments vs 1:1, explainability, privacy tradeoffs, and measuring personalisation lift.",
  keywords: [
    "PM personalization", "personalisation PM",
    "1:1 personalization", "adaptive product 2026",
  ],
  alternates: { canonical: "/pm-personalization" },
  openGraph: {
    title: "PM Personalization 2026 — PM Streak",
    description: "How PMs design personalization that users trust.",
    url: `${SITE_URL}/pm-personalization`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Personalization+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Personalization 2026 — PM Streak",
    description: "How PMs design personalization that users trust.",
    images: [`${SITE_URL}/api/og?title=PM+Personalization+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const LEVELS = [
  { l: "Anonymous segments", w: "Geo, device, time-of-day. Cheap, ethical, low lift." },
  { l: "Behavioural segments", w: "Based on observed in-product behaviour. Mid-complexity." },
  { l: "Cohort-based 1:N", w: "Users clustered by shared traits; each cluster gets a variant." },
  { l: "1:1 personalization", w: "ML-driven per-user experience. Highest lift, highest data cost." },
  { l: "User-controlled", w: "User sets preferences explicitly. Transparent but lower engagement." },
];

const TRAPS = [
  "Over-personalisation creates filter bubbles — design for discovery, not just relevance",
  "Hidden personalisation confuses users — show why content is recommended",
  "Privacy debt compounds — don&apos;t collect data you can&apos;t explain",
  "Personalisation &ne; quality — a relevant bad recommendation is still bad",
];

const FAQS = [
  {
    q: "When does personalization pay off vs one-size-fits-all?",
    a: "When you have clear behavioural variance across users, enough data to learn per-user, and the content/product selection is large enough that defaults don&apos;t satisfy everyone. For products with narrow variance or small catalogs, personalisation adds complexity without meaningful lift.",
  },
];

export default function PmPersonalizationPage() {
  const dates = pageDates("/pm-personalization");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Personalization", url: `${SITE_URL}/pm-personalization` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Personalization (2026 Edition)",
        description: "How PMs design personalization that users trust. Segments vs 1:1, explainability, privacy tradeoffs, and measuring personalisation lift.",
        image: `${SITE_URL}/api/og?title=PM+Personalization+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-personalization`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🧬</span> Relevance compounds. Creepiness also compounds.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Personalization<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Personalization in products runs on a spectrum from cheap to costly: anonymous segments by geo or device, behavioural segments from in-product actions, cohort-based 1:N clusters, full 1:1 ML-driven experiences, and user-controlled preferences at the transparent end. The biggest traps aren&apos;t technical — over-personalising creates filter bubbles, hidden logic confuses users who don&apos;t know why something was recommended, and a relevant-but-bad recommendation is still a bad recommendation.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#58cc02] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 levels of personalisation and 4 traps to avoid.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Personalization PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Levels</h2>
          <div className="space-y-3">
            {LEVELS.map((l, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-[#89e219] text-sm mb-1">{l.l}</p>
                <p className="text-xs text-white/60">{l.w}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">4 Traps</h2>
            <div className="space-y-2">
              {TRAPS.map((t, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-red-400 flex-shrink-0">❌</span>
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

        <RelatedPages slug="pm-personalization" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Personalization Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
