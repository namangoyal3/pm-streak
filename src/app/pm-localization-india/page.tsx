import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Localization for India (2026) — Designing Products That Work Across Bharat",
  description:
    "How PMs design products that work across India&apos;s diversity. Languages, device constraints, cultural context, and the vernacular-first product thinking Bharat demands.",
  keywords: [
    "PM localization india", "Bharat PM",
    "vernacular product india", "localisation PM",
    "tier-2 tier-3 PM 2026",
  ],
  alternates: { canonical: "/pm-localization-india" },
  openGraph: {
    title: "PM Localization for India 2026 — PM Streak",
    description: "How PMs design for Bharat — languages, device constraints, cultural context.",
    url: `${SITE_URL}/pm-localization-india`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Localization+for+India+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Localization for India 2026 — PM Streak",
    description: "How PMs design for Bharat — languages, device constraints, cultural context.",
    images: [`${SITE_URL}/api/og?title=PM+Localization+for+India+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DIMENSIONS = [
  { dim: "Language", what: "10+ languages in meaningful usage. English is Tier-1 urban; Hindi/regional dominates elsewhere.", detail: "Vernacular UI, voice interfaces, transliteration support, language-switch persistence" },
  { dim: "Device class", what: "Mid-tier Android (₹8–15K) dominates in Tier-2/3. iOS is a metro phenomenon.", detail: "Low RAM, low storage, intermittent connectivity — optimise for Android Go and low-end Android" },
  { dim: "Network quality", what: "Large swaths on 2G/3G or unreliable 4G. Data is still often metered.", detail: "Offline-first, image/video compression, progressive loading, low-data modes" },
  { dim: "Payment rails", what: "UPI dominates digital; cash on delivery still meaningful in Tier-3.", detail: "Multi-payment support, COD as first-class option, UPI intent flows for low-friction" },
  { dim: "Trust patterns", what: "First-time online users are suspicious of transactions. Word-of-mouth matters more than reviews.", detail: "Trust signals (verified sellers, returns policy prominent), reseller/community trust vectors" },
  { dim: "Cultural context", what: "Festivals, family structures, regional norms differ widely across India.", detail: "Festival-aware content, family-account patterns, region-specific defaults" },
];

const DESIGN_PRINCIPLES = [
  "Start with a specific segment (Hindi-speaking Tier-3, or Tamil-speaking Tier-2), not &apos;Bharat&apos; as an abstract group",
  "Talk to users who look nothing like your team — office-bound PMs under-design for Bharat",
  "Test on ₹8–15K Android devices, not your iPhone 15 — actual device is the real test",
  "Test in Jio 4G in weak-signal areas — latency shapes UX more than animation polish",
  "Lean on icons and colour cues over text for low-literacy users",
  "Respect local payment preferences — not forcing international-first flows",
];

const COMPANIES_DOING_IT_WELL = [
  "Meesho — Bharat-first social commerce for Tier-2/3 resellers",
  "PhonePe — vernacular UPI experience across 11 languages",
  "ShareChat + Josh — regional language social/video platforms",
  "Dream11 — fantasy sports accessible across Bharat",
  "CRED (counter-example) — premium-only, deliberately doesn&apos;t serve Bharat",
];

const FAQS = [
  {
    q: "Is Bharat-first design always the right strategy?",
    a: "No — it depends on who you serve. Premium products (CRED) deliberately don&apos;t serve Bharat. Mass-market consumer (Meesho, PhonePe) must. B2B SaaS products often skip Bharat-first entirely. The failure mode is treating &apos;Bharat&apos; as generically good — it&apos;s a strategic choice that matches product positioning, not a moral one.",
  },
  {
    q: "How do PMs learn to design for Bharat if they&apos;re from metro backgrounds?",
    a: "Three compounding habits: (1) travel to Tier-2/3 cities and watch real users use your product, (2) talk to users in vernacular languages with a translator if needed, (3) follow operators who live/work in Bharat — their social posts reveal context PMs miss. Office-bound empathy is fake empathy. Real empathy comes from real exposure.",
  },
];

export default function PmLocalizationIndiaPage() {
  const dates = pageDates("/pm-localization-india");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Localization India", url: `${SITE_URL}/pm-localization-india` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Localization for India (2026 Edition)",
        description:
          "How PMs design products that work across India&apos;s diversity. Languages, device constraints, cultural context, and the vernacular-first product thinking Bharat demands.",
        image: `${SITE_URL}/api/og?title=PM+Localization+for+India+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-localization-india`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🇮🇳</span> Metro PM instincts don&apos;t transfer to Bharat
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Localization for India<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Localizing a product for India means designing across six intersecting realities — language, device class, network quality, payment rails, trust patterns, and cultural context — not simply translating text. PMs who succeed test on ₹8–15K Android phones on weak Jio signal, default to UPI and cash on delivery, and start with one specific segment instead of treating &apos;Bharat&apos; as one undifferentiated market.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 dimensions of India&apos;s diversity to design for, 6 design principles,
            and 5 companies leading (and deliberately avoiding) Bharat.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Bharat PM Intuition Daily — Free →
          </Link>
        </section>

        {/* Dimensions */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Dimensions of India&apos;s Diversity</h2>
          <div className="space-y-4">
            {DIMENSIONS.map((d, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <p className="font-bold text-white mb-1">{i + 1}. {d.dim}</p>
                <p className="text-sm text-white/70 mb-2">{d.what}</p>
                <p className="text-xs text-[#89e219]">🔧 Design implications: <span className="text-white/70">{d.detail}</span></p>
              </div>
            ))}
          </div>
        </section>

        {/* Design principles */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Design Principles for Bharat</h2>
            <div className="space-y-2">
              {DESIGN_PRINCIPLES.map((p, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Companies */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Companies Worth Studying</h2>
          <div className="space-y-2">
            {COMPANIES_DOING_IT_WELL.map((c, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{c}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
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

        <RelatedPages slug="pm-localization-india" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Bharat PM Intuition Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on designing for users unlike yourself — the core Bharat PM skill.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
