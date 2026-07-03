import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM OTT India (2026) — JioCinema, Disney+ Hotstar, SonyLIV PM Guide",
  description:
    "How PMs build OTT products in India. Live sports, regional originals, mobile-first tiers, and the battle for prime time.",
  keywords: [
    "PM OTT india", "JioCinema PM",
    "Hotstar PM", "SonyLIV PM 2026",
  ],
  alternates: { canonical: "/pm-ott-india" },
  openGraph: {
    title: "PM OTT India 2026 — PM Streak",
    description: "How PMs build OTT products in India.",
    url: `${SITE_URL}/pm-ott-india`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+OTT+India+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM OTT India 2026 — PM Streak",
    description: "How PMs build OTT products in India.",
    images: [`${SITE_URL}/api/og?title=PM+OTT+India+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Live sports drives DAU spikes — cricket peaks are massive, seasonal",
  "Regional language content unlocks Tier-2/3 scale",
  "Mobile-first tiers (single screen, SD) are default in India",
  "Ads beat subscription for scale — AVOD dominates, SVOD follows",
  "Telco bundles are distribution moats — Jio, Airtel, Vi partnerships matter",
];

const METRICS = [
  "Watch time per DAU and concurrent peak viewers",
  "Live event churn — D+1 after an event",
  "Ad completion rate and CPM",
  "Subscription conversion in key content windows",
  "Regional content engagement share",
];

const FAQS = [
  {
    q: "Why does cricket define Indian OTT?",
    a: "Because it&apos;s the only content that reliably drives 20–50M concurrent viewers. IPL, World Cup, and bilateral cricket series are category-shaping events. The platform that holds the rights wins the season; the platforms that don&apos;t spend the season defending retention. It&apos;s also why Jio acquired IPL digital rights — the content is the strategy.",
  },
];

export default function PmOttIndiaPage() {
  const dates = pageDates("/pm-ott-india");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM OTT India", url: `${SITE_URL}/pm-ott-india` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM OTT India (2026 Edition)",
        description: "How PMs build OTT products in India. Live sports, regional originals, mobile-first tiers, and the battle for prime time.",
        image: `${SITE_URL}/api/og?title=PM+OTT+India+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-ott-india`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🏏</span> Cricket defines Indian OTT. Everything else is support.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM OTT India<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Indian OTT PM work is shaped by live sports: cricket events drive DAU spikes so large that platforms build entire roadmaps around IPL and World Cup windows, while regional-language originals and mobile-first single-screen SD tiers extend that reach into Tier-2 and Tier-3 markets. Ad-supported viewing scales faster than subscriptions here, so PMs watch concurrent peak viewers, D+1 churn after live events, ad completion rate, and regional engagement share.
          </p>
          <p className="text-xs text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for Indian OTT PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build OTT PM Skills — Free →
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

        <RelatedPages slug="pm-ott-india" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice OTT PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
