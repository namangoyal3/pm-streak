import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM GovTech &amp; Digital Public Goods (2026) — DPI, Aadhaar, DigiLocker",
  description:
    "How PMs build on India Stack. Aadhaar, DigiLocker, ONDC, Account Aggregator, and what it means to work on digital public infrastructure.",
  keywords: [
    "PM govtech", "India Stack PM",
    "DPI PM", "ONDC Aadhaar 2026",
  ],
  alternates: { canonical: "/pm-govt-tech" },
  openGraph: {
    title: "PM GovTech &amp; DPI 2026 — PM Streak",
    description: "How PMs build on India Stack.",
    url: `${SITE_URL}/pm-govt-tech`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+GovTech+&amp;+DPI+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM GovTech &amp; DPI 2026 — PM Streak",
    description: "How PMs build on India Stack.",
    images: [`${SITE_URL}/api/og?title=PM+GovTech+&amp;+DPI+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PRIMITIVES = [
  "Aadhaar — identity",
  "DigiLocker — documents",
  "UPI — payments",
  "Account Aggregator — data portability",
  "ONDC — open commerce network",
  "DEPA, DIKSHA — health and education layers",
];

const DYNAMICS = [
  "Policy moves faster than product — stay close to MeitY and NPCI updates",
  "Inclusion is a KPI — scale to non-smartphone users is real product work",
  "Interoperability is the spec — proprietary approaches lose",
  "Public scrutiny is high — ship with transparency built in",
  "Mission beats money — compensation is lower, impact is larger",
];

const FAQS = [
  {
    q: "Is building on India Stack a real PM career?",
    a: "Yes — and growing. Companies building on DPI (account aggregators, ONDC network participants, health stack builders) employ PMs with specialist domain knowledge. Career paths lead to policy advisory, public-private organisations, and international DPI work. Compensation is often 20–30% below pure-private sector but the mission compensates.",
  },
];

export default function PmGovTechPage() {
  const dates = pageDates("/pm-govt-tech");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM GovTech", url: `${SITE_URL}/pm-govt-tech` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM GovTech & DPI (India Edition)",
        description: "How PMs build on India Stack. Aadhaar, DigiLocker, ONDC, Account Aggregator, and what it means to work on digital public infrastructure.",
        image: `${SITE_URL}/api/og?title=PM+GovTech+&amp;+DPI+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-govt-tech`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🇮🇳</span> India Stack is the world&apos;s most ambitious DPI experiment
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM GovTech &amp; DPI<br />(India Edition)
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-3">
            Working as a GovTech PM means building on India Stack primitives — Aadhaar for identity, DigiLocker for documents, UPI for payments, Account Aggregator for data portability, and ONDC for open commerce — while policy from MeitY and NPCI moves faster than product cycles. Compensation typically runs 20–30% below pure private-sector roles, but mission-driven PMs stay for the impact and the path toward policy advisory or international DPI work.
          </p>
          <p className="text-xs text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-white/70 hover:text-[#89e219] underline underline-offset-2">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 India Stack primitives and 5 dynamics for DPI-focused PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build GovTech PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Primitives</h2>
          <div className="space-y-2">
            {PRIMITIVES.map((p, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{p}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Dynamics</h2>
            <div className="space-y-2">
              {DYNAMICS.map((d, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{d}</p>
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

        <RelatedPages slug="pm-govt-tech" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice GovTech Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
