import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Global SaaS from India (2026) — Zoho, Freshworks, Postman PM Lessons",
  description:
    "How Indian SaaS PMs build for global customers. Timezones, buyer empathy, sales motion, and what Zoho, Freshworks, and Postman teach about selling to the West from Bangalore or Chennai.",
  keywords: [
    "PM global SaaS india", "Freshworks PM",
    "Zoho PM", "Postman PM 2026",
  ],
  alternates: { canonical: "/pm-global-saas-from-india" },
  openGraph: {
    title: "PM Global SaaS from India 2026 — PM Streak",
    description: "How Indian SaaS PMs build for global customers.",
    url: `${SITE_URL}/pm-global-saas-from-india`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Global+SaaS+from+India+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Global SaaS from India 2026 — PM Streak",
    description: "How Indian SaaS PMs build for global customers.",
    images: [`${SITE_URL}/api/og?title=PM+Global+SaaS+from+India+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const REALITIES = [
  "Buyer empathy gap — PMs who&apos;ve never bought enterprise software in the US design wrong",
  "Timezone tax — customer calls mean late nights",
  "Sales motion is different — US buyers expect different rhythms",
  "Pricing in USD but earning in INR — currency is a real concern",
  "Brand trust takes years to build for Indian origin SaaS",
];

const STRATEGIES = [
  "Embed with customers — onsite time in key markets compresses the empathy gap",
  "Hire domain-native sales and CS early",
  "Invest in content + community in target markets",
  "Benchmark against local competitors, not Indian ones",
  "Design for async — your product has to speak for itself",
];

const FAQS = [
  {
    q: "Can Indian PMs really build world-class global SaaS?",
    a: "Yes — Zoho, Freshworks, Postman, Chargebee, BrowserStack are proof. But it demands more than good technical work. PMs need to bridge cultural, temporal, and buyer-empathy gaps deliberately. Those who do can build products that serve Fortune 500 from a Bangalore or Chennai office.",
  },
];

export default function PmGlobalSaasFromIndiaPage() {
  const dates = pageDates("/pm-global-saas-from-india");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Global SaaS from India", url: `${SITE_URL}/pm-global-saas-from-india` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Global SaaS from India (2026 Edition)",
        description:
          "How Indian SaaS PMs build for global customers. Timezones, buyer empathy, sales motion, and what Zoho, Freshworks, and Postman teach about selling to the West from Bangalore or Chennai.",
        image: `${SITE_URL}/api/og?title=PM+Global+SaaS+from+India+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-global-saas-from-india`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🌏</span> Build for the world from Bangalore, but close the empathy gap
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Global SaaS from India<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Zoho, Freshworks, Postman, Chargebee, and BrowserStack prove Indian PMs can build world-class global SaaS, but it requires closing a real buyer-empathy gap, absorbing a timezone tax of late-night calls, and pricing in USD while earning in INR. The fix: embed onsite in target markets, hire domain-native sales and CS early, benchmark against local competitors instead of Indian ones, and design for async since trust takes years to build.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 realities and 5 strategies for Indian PMs building global products.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Global SaaS PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Realities</h2>
          <div className="space-y-2">
            {REALITIES.map((r, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{r}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Strategies</h2>
            <div className="space-y-2">
              {STRATEGIES.map((s, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{s}</p>
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

        <RelatedPages slug="pm-global-saas-from-india" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Global SaaS PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
