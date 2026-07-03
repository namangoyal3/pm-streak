import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Climatetech (2026) — Building Products for Decarbonisation",
  description:
    "How PMs build climatetech products. Measurement, hardware-software, carbon markets, and why this decade is the opportunity.",
  keywords: [
    "PM climatetech", "climate PM",
    "decarbonisation product", "climatetech 2026",
  ],
  alternates: { canonical: "/pm-climatetech" },
  openGraph: {
    title: "PM Climatetech 2026 — PM Streak",
    description: "How PMs build climatetech products.",
    url: `${SITE_URL}/pm-climatetech`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Climatetech+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Climatetech 2026 — PM Streak",
    description: "How PMs build climatetech products.",
    images: [`${SITE_URL}/api/og?title=PM+Climatetech+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Impact &gt; revenue in early years — but both eventually required",
  "Hardware + software — pure-software climate plays are rare",
  "Policy tailwinds matter — regulation and subsidy shape market size",
  "Measurement is the product — if you can&apos;t measure emissions, you can&apos;t reduce them",
  "Long sales cycles — enterprise carbon procurement takes quarters, not weeks",
];

const CATEGORIES = [
  "Carbon measurement and reporting (Persefoni, Watershed, Sweep)",
  "Energy management and grid software (Arcadia, Octopus Energy)",
  "EV infrastructure (charging, fleet, batteries)",
  "Climate financing and carbon markets",
  "Sustainable materials and supply chain transparency",
];

const FAQS = [
  {
    q: "Is climatetech a real PM career in 2026?",
    a: "Yes — funding has normalised after the 2021 hype peak, and real companies are scaling. Best roles are at series-B and later companies where product-market fit is proven. Impact mission attracts strong talent; compensation has caught up with mainstream tech at the senior levels.",
  },
];

export default function PmClimatetechPage() {
  const dates = pageDates("/pm-climatetech");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Climatetech", url: `${SITE_URL}/pm-climatetech` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Climatetech (2026 Edition)",
        description: "How PMs build climatetech products. Measurement, hardware-software, carbon markets, and why this decade is the opportunity.",
        image: `${SITE_URL}/api/og?title=PM+Climatetech+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-climatetech`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🌱</span> The decade&apos;s biggest tech opportunity is carbon
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Climatetech<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-3">
            What does a climatetech PM actually build? Mostly carbon measurement and reporting tools, grid and energy management software, EV charging infrastructure, and carbon-market financing products — categories where hardware and software intertwine and long enterprise sales cycles are the norm. Because emissions can&apos;t be reduced until they&apos;re measured, measurement itself becomes the core product, with policy and subsidy tailwinds shaping how big each market can get.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 categories shaping climatetech PM roles.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Climatetech PM Skills — Free →
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

        <RelatedPages slug="pm-climatetech" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Climatetech PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
