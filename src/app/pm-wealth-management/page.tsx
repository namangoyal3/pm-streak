import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Wealth Management (2026) — Zerodha, Groww, INDmoney PM Guide",
  description:
    "How PMs build wealth management products in India. Onboarding, KYC, trust, and the slow transition from distributor-led to direct investing.",
  keywords: [
    "PM wealth management", "Zerodha PM",
    "Groww PM", "investment PM india 2026",
  ],
  alternates: { canonical: "/pm-wealth-management" },
  openGraph: {
    title: "PM Wealth Management 2026 — PM Streak",
    description: "How PMs build wealth management products in India.",
    url: `${SITE_URL}/pm-wealth-management`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Wealth+Management+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Wealth Management 2026 — PM Streak",
    description: "How PMs build wealth management products in India.",
    images: [`${SITE_URL}/api/og?title=PM+Wealth+Management+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Trust is the moat — fast growth plus strong risk controls = long-term winners",
  "KYC onboarding is a product — minutes to onboard drives conversion",
  "Education as acquisition — Zerodha&apos;s Varsity rewrote the playbook",
  "SEBI regulation defines what&apos;s possible — compliance is not optional",
  "Retail investor behaviour is cyclical — bull markets fuel growth, bear markets reveal quality",
];

const METRICS = [
  "Active investors (monthly) and AUM per active",
  "Time-to-first-transaction from signup",
  "SIP adoption and continuation rate",
  "Support ticket rate per 1k active users",
  "Grievance resolution time (SEBI-reported)",
];

const FAQS = [
  {
    q: "Is Indian wealthtech still a growth market?",
    a: "Yes — investor penetration is still sub-20% of Indian households, leaving massive room. Growth is now coming from Tier-2/3 cities, women investors, and first-time equity entrants. Smart money flows to platforms with strong education, trust, and product depth. Generic &apos;discount broker&apos; positioning is no longer enough.",
  },
];

export default function PmWealthManagementPage() {
  const dates = pageDates("/pm-wealth-management");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Wealth Management", url: `${SITE_URL}/pm-wealth-management` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Wealth Management (India Edition)",
        description: "How PMs build wealth management products in India. Onboarding, KYC, trust, and the slow transition from distributor-led to direct investing.",
        image: `${SITE_URL}/api/og?title=PM+Wealth+Management+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-wealth-management`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📊</span> Trust compounds faster than features in wealthtech
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Wealth Management<br />(India Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            For PMs building Indian wealth management products, trust and fast KYC onboarding decide who wins before features do — Zerodha&apos;s Varsity showed that education itself can be the acquisition channel, and SEBI regulation sets the boundaries teams design within. Growth still has room, since investor penetration sits below 20% of households, so the metrics that matter are active investors per AUM, time-to-first-transaction, SIP continuation rate, and grievance resolution time.
          </p>
          <p className="text-xs text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for wealthtech PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Wealthtech PM Skills — Free →
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

        <RelatedPages slug="pm-wealth-management" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Wealthtech PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
