import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Car Tech (2026) — CarDekho, Cars24, Spinny PM Guide",
  description:
    "How PMs build car tech products in India. Used car marketplaces, inspection, financing, and why the Indian used car market is a hard marketplace to crack.",
  keywords: [
    "PM car tech", "Cars24 PM",
    "Spinny PM", "used car 2026",
  ],
  alternates: { canonical: "/pm-car-tech" },
  openGraph: {
    title: "PM Car Tech 2026 — PM Streak",
    description: "How PMs build car tech products in India.",
    url: `${SITE_URL}/pm-car-tech`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Car+Tech+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Car Tech 2026 — PM Streak",
    description: "How PMs build car tech products in India.",
    images: [`${SITE_URL}/api/og?title=PM+Car+Tech+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Trust is the product — used car buyers have been burned for decades",
  "Inspection and certification are the moat",
  "Financing attach is material revenue",
  "Inventory turn rate decides unit economics",
  "Offline touchpoints (test drives, delivery) compress digital-only plays",
];

const METRICS = [
  "Inventory turn rate",
  "Inspection-to-listing ratio",
  "Financing attach rate",
  "Post-sale NPS",
  "Repeat rate (4–7 year cycle)",
];

const FAQS = [
  {
    q: "Why is the used car market so hard for pure-play tech?",
    a: "Because cars are trust-heavy, high-AOV, and require physical inspection, test drive, and delivery. Pure-digital plays (OLX-style) struggled. Certification-first + own-inventory + financing-attached models (Cars24, Spinny) win because they solve the trust problem structurally. Expect continued offline integration.",
  },
];

export default function PmCarTechPage() {
  const dates = pageDates("/pm-car-tech");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Car Tech", url: `${SITE_URL}/pm-car-tech` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Car Tech (India Edition)",
        description:
          "How PMs build car tech products in India. Used car marketplaces, inspection, financing, and why the Indian used car market is a hard marketplace to crack.",
        image: `${SITE_URL}/api/og?title=PM+Car+Tech+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-car-tech`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🚗</span> Certification-first wins the Indian used car marketplace
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Car Tech<br />(India Edition)
          </h1>
          <p className="text-base text-white/80 max-w-2xl mx-auto mb-3">
            Used cars are trust-heavy, high-AOV purchases that demand physical inspection, test drives, and delivery, which is why pure-digital marketplaces like OLX struggled. Certification-first models with owned inventory and attached financing — the Cars24 and Spinny playbook — solve that trust problem structurally, and PMs in the category watch inventory turn rate, inspection-to-listing ratio, financing attach rate, and the long 4–7 year repeat cycle.
          </p>
          <p className="text-xs text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for car tech PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Car Tech PM Skills — Free →
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

        <RelatedPages slug="pm-car-tech" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Car Tech PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
