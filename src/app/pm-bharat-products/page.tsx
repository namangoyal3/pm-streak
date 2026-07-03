import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Building for Bharat (2026) — How Great PMs Design for India&apos;s Next Half-Billion Users",
  description:
    "How PMs design for Bharat — Tier-2/3/4 India. Vernacular UX, device constraints, trust signals, and the patterns that work where English-first products fail.",
  keywords: [
    "PM Bharat", "building for india",
    "Tier-2 Tier-3 PM", "vernacular product design",
    "India next billion 2026",
  ],
  alternates: { canonical: "/pm-bharat-products" },
  openGraph: {
    title: "PM Building for Bharat 2026 — PM Streak",
    description: "How PMs design for Bharat — vernacular UX, device constraints, trust-first patterns.",
    url: `${SITE_URL}/pm-bharat-products`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Building+for+Bharat+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Building for Bharat 2026 — PM Streak",
    description: "How PMs design for Bharat — vernacular UX, device constraints, trust-first patterns.",
    images: [`${SITE_URL}/api/og?title=PM+Building+for+Bharat+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DESIGN_PATTERNS = [
  "Vernacular-first UX — not just translation, culturally adapted language and metaphors",
  "Voice &amp; video prioritised over text — lower literacy barriers",
  "Trust signals prominent — reviews, verified badges, COD, returns visible",
  "Low-data modes — compressed images, offline support, fewer round-trips",
  "Large tap targets — older devices, outdoor use, less screen precision",
  "Simple flows with defaults — avoid overwhelming first-time users",
];

const USERS_TO_KNOW = [
  "First-time online shoppers (Tier-3) — trust is the entire UX challenge",
  "Regional language users — Hindi/Tamil/Telugu/Bengali/Marathi are major segments",
  "Older users (50+) — different rhythms, less tolerance for complexity",
  "Low-bandwidth users — 2G/3G still real; product must work there",
  "Cash-only users — COD and UPI are both critical; cards are metro-only",
  "Family / community buyers — decisions aren&apos;t always individual",
];

const COMPANIES_DOING_WELL = [
  { company: "Meesho", what: "Bharat-first social commerce — resellers are often non-English speakers" },
  { company: "PhonePe", what: "Vernacular UPI across 11 languages; COD-friendly where needed" },
  { company: "Sharechat / Josh", what: "Regional video platforms winning among Tier-2/3 users" },
  { company: "Dream11", what: "Fantasy sports with low-friction onboarding; voice/video for explainer content" },
  { company: "DailyHunt", what: "Vernacular news aggregator serving Bharat first, cities second" },
];

const COMMON_MISTAKES = [
  "Designing for yourself — metro PMs design products that fail in Tier-3",
  "Translation without cultural adaptation — literal translation often lands wrong",
  "Heavy app size — ₹10K Android phones with 32GB storage can&apos;t afford it",
  "Assuming credit cards — many Bharat users have UPI only or cash",
  "Complex forms — low-literacy users need voice, icons, defaults",
  "Urban imagery — users in Tier-3 don&apos;t see themselves in metro lifestyle photos",
];

const FAQS = [
  {
    q: "Is every Indian consumer product a Bharat product?",
    a: "No. CRED deliberately doesn&apos;t serve Bharat — it&apos;s a premium urban product. Many B2B SaaS products built in India serve global customers, not Indian Bharat users. Serving Bharat is a deliberate choice that affects everything from UX to monetisation to device testing. Don&apos;t claim Bharat focus unless you&apos;re actually investing in it.",
  },
  {
    q: "What&apos;s the biggest Bharat PM mistake?",
    a: "Not spending time with real Bharat users. Metro PMs who never visit Tier-2/3 cities, never talk to users in vernacular, never test on ₹8K Android devices can&apos;t design for Bharat. Office-bound empathy is fake empathy. The PMs who ship great Bharat products spend real time in the field, not just in research sessions.",
  },
];

export default function PmBharatProductsPage() {
  const dates = pageDates("/pm-bharat-products");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Bharat Products", url: `${SITE_URL}/pm-bharat-products` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Building for Bharat (2026 Edition)",
        description:
          "How PMs design for Bharat — Tier-2/3/4 India. Vernacular UX, device constraints, trust signals, and the patterns that work where English-first products fail.",
        image: `${SITE_URL}/api/og?title=PM+Building+for+Bharat+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-bharat-products`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🇮🇳</span> Metro products die in Bharat. Bharat products conquer India.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Building for Bharat<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Meesho, PhonePe, ShareChat/Josh, Dream11, and DailyHunt all win in Bharat by getting six things right: vernacular-first UX, voice and video over text, visible trust signals like COD and verified badges, low-data modes, large tap targets, and simple default-driven flows. Products fail this test when metro PMs design for themselves — translating without cultural adaptation, assuming credit cards over UPI and cash, and leaning on urban imagery Tier-3 users don&apos;t relate to.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 design patterns, 6 user types to know, 5 companies leading Bharat, and 6 mistakes to avoid.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Bharat PM Intuition Daily — Free →
          </Link>
        </section>

        {/* Design patterns */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Bharat Design Patterns</h2>
          <div className="space-y-2">
            {DESIGN_PATTERNS.map((d, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Users */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Bharat User Types to Know</h2>
            <div className="space-y-2">
              {USERS_TO_KNOW.map((u, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{u}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Companies */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Companies Leading Bharat</h2>
          <div className="space-y-3">
            {COMPANIES_DOING_WELL.map((c, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-[#89e219] text-sm mb-1">{c.company}</p>
                <p className="text-xs text-white/60">{c.what}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mistakes */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Common Mistakes</h2>
            <div className="space-y-2">
              {COMMON_MISTAKES.map((m, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-red-400 flex-shrink-0">❌</span>
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

        <RelatedPages slug="pm-bharat-products" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Bharat PM Intuition Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on vernacular UX, Tier-2/3 users, and India-first product design.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
