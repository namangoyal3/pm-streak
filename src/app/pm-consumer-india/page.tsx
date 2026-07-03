import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "Consumer PM India (2026) — Building Products for 700M+ Indian Users",
  description:
    "How consumer PMs in India build products for 700M+ users. User segments, behaviour patterns, monetisation realities, and what separates Indian consumer PM from global.",
  keywords: [
    "consumer PM india", "india consumer product",
    "indian users PM", "consumer product manager india",
    "india market PM 2026",
  ],
  alternates: { canonical: "/pm-consumer-india" },
  openGraph: {
    title: "Consumer PM India 2026 — PM Streak",
    description: "How consumer PMs build products for India&apos;s 700M+ user base — patterns, behaviour, monetisation.",
    url: `${SITE_URL}/pm-consumer-india`,
    images: [{ url: `${SITE_URL}/api/og?title=Consumer+PM+India+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Consumer PM India 2026 — PM Streak",
    description: "How consumer PMs build products for India&apos;s 700M+ user base — patterns, behaviour, monetisation.",
    images: [`${SITE_URL}/api/og?title=Consumer+PM+India+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const USER_SEGMENTS = [
  { segment: "Metro urban (Tier-1)", size: "~100M", traits: "English-fluent, iOS-comfortable, high ARPU, lower volume" },
  { segment: "Tier-2 urban", size: "~150M", traits: "Mixed English/vernacular, Android-dominant, price-sensitive but growing ARPU" },
  { segment: "Tier-3 &amp; below", size: "~350M internet users", traits: "Vernacular-first, low-end Android, data-sensitive, trust-first" },
  { segment: "Rural internet users", size: "~150M", traits: "Vernacular-only, 2G/3G networks, often first-time online, strongly referral-driven" },
];

const BEHAVIOUR_PATTERNS = [
  "Price-sensitive at every level — discounts/offers work more than aspirational messaging",
  "Trust-first for anything involving money — reviews, word-of-mouth, brand matter more than features",
  "UPI dominates digital — products designed around UPI succeed; products requiring cards struggle",
  "Voice &amp; video over text for many segments — especially Tier-3 and older users",
  "Community and family purchasing decisions — often not individual choices",
  "High sensitivity to app size and data usage — especially at lower tiers",
];

const MONETISATION = [
  { model: "Advertising", note: "Still the biggest model for mass-market consumer. Works at scale (100M+ DAU)." },
  { model: "Freemium subscription", note: "Works for premium segments (metro Tier-1). Conversion rates lower than global — typically 2–4% vs 5–8% globally." },
  { model: "Transaction fee / commission", note: "Dominant model in e-commerce, delivery, marketplaces. Easier than subscription to convert users to paying." },
  { model: "Content + creator monetisation", note: "Growing model for social/content products (Josh, ShareChat). Tips, paid content, brand deals." },
  { model: "Lending / financial services", note: "Often added as secondary revenue on consumer products. Material at scale (PhonePe, Paytm do this well)." },
];

const WHAT_WORKS = [
  "Design for offline-first where possible — connectivity is unreliable",
  "Trust signals prominently — verified badges, ratings, clear refund policies",
  "Vernacular language support — not just translation, but culturally adapted UX",
  "Referral mechanics — word-of-mouth is 2–3x more trusted than ads in Bharat",
  "Small file size and data usage — measured in MB matters to users",
  "Local payment methods — UPI, COD, wallets all as first-class options",
];

const FAQS = [
  {
    q: "Is consumer PM in India different from global consumer PM?",
    a: "Yes — significantly. Indian consumer PMs deal with much higher diversity (languages, devices, income levels) within a single market than most global PMs. Monetisation is thinner (lower ARPU) so volume and retention matter disproportionately. And trust/community dynamics play a bigger role than they do in more individualistic markets. Same craft, different calibrations.",
  },
  {
    q: "What&apos;s the biggest mistake consumer PMs in India make?",
    a: "Designing for users like themselves. Most Indian consumer PMs live in metros, speak English fluently, use iPhones. Their intuitions don&apos;t transfer to the 600M+ users who don&apos;t look like them. The fix: spend real time with Tier-2/3 users, dogfood on low-end Android, use products in vernacular. Office-bound empathy is fake empathy.",
  },
];

export default function PmConsumerIndiaPage() {
  const dates = pageDates("/pm-consumer-india");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Consumer PM India", url: `${SITE_URL}/pm-consumer-india` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Consumer PM India (2026 Edition)",
        description:
          "How consumer PMs in India build products for 700M+ users. User segments, behaviour patterns, monetisation realities, and what separates Indian consumer PM from global.",
        image: `${SITE_URL}/api/og?title=Consumer+PM+India+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-consumer-india`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🇮🇳</span> 700M+ users. Massive diversity. Different rules.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Consumer PM India<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Because India&apos;s 700M+ internet users split into four segments — from English-fluent metro users to vernacular-only rural users on 2G/3G — consumer PMs can&apos;t design one product for all of them. Subscription conversion here runs lower than global benchmarks (2–4% versus 5–8%), so most successful products lean on transaction fees or advertising, and use referral loops — trusted 2–3x more than ads in Bharat — to build the trust that features alone can&apos;t.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            4 user segments to understand, 6 behaviour patterns, 5 monetisation models,
            and 6 design principles that work in Indian consumer markets.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build India Consumer PM Intuition Daily — Free →
          </Link>
        </section>

        {/* Segments */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">4 User Segments in India</h2>
          <div className="space-y-4">
            {USER_SEGMENTS.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                  <p className="font-bold text-white">{i + 1}. {s.segment}</p>
                  <span className="text-xs bg-green-500/10 border border-green-500/20 rounded-full px-2 py-1 text-green-400">{s.size}</span>
                </div>
                <p className="text-xs text-white/60">{s.traits}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Behaviour patterns */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Behaviour Patterns</h2>
            <div className="space-y-2">
              {BEHAVIOUR_PATTERNS.map((b, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Monetisation */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Monetisation Models</h2>
          <div className="space-y-3">
            {MONETISATION.map((m, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-[#89e219] text-sm mb-1">{m.model}</p>
                <p className="text-xs text-white/60">{m.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What works */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Design Principles That Work in India</h2>
            <div className="space-y-2">
              {WHAT_WORKS.map((w, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{w}</p>
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

        <RelatedPages slug="pm-consumer-india" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build India Consumer PM Skills Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on Tier-2/3 design, vernacular UX, and India-first trade-offs.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
