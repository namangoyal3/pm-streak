import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Career Levels in India (2026) — Titles, Scope & Promotion Criteria",
  description:
    "The complete PM level ladder in India. What each title means at Flipkart, Razorpay, Google, and more. Promotion criteria, typical years, and how companies calibrate levels.",
  keywords: [
    "PM levels india", "product manager levels",
    "PM titles india", "senior PM criteria india",
    "PM promotion criteria", "PM career levels 2026",
  ],
  alternates: { canonical: "/pm-career-levels-india" },
  openGraph: {
    title: "PM Career Levels in India 2026 — PM Streak",
    description: "PM level ladder, scope at each level, and promotion criteria at top Indian companies.",
    url: `${SITE_URL}/pm-career-levels-india`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Career+Levels+in+India+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Career Levels in India 2026 — PM Streak",
    description: "PM level ladder, scope at each level, and promotion criteria at top Indian companies.",
    images: [`${SITE_URL}/api/og?title=PM+Career+Levels+in+India+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const LEVELS = [
  {
    level: "APM / PM I",
    yoe: "0–2 years",
    scope: "Owns a feature or small product area under guidance",
    signals: ["Ships reliably on simple features", "Writes clear PRDs with help", "Runs user research on a specific question"],
    companies: "Flipkart PAP, Razorpay APM, Google APMM, Microsoft APM",
  },
  {
    level: "PM II / PM",
    yoe: "2–4 years",
    scope: "Owns a product area or squad independently",
    signals: ["Drives OKRs end-to-end", "Navigates cross-functional conflicts without escalation", "Moves at least one meaningful business metric per quarter"],
    companies: "Most Indian tech — Swiggy, Zomato, CRED, PhonePe, Flipkart",
  },
  {
    level: "Senior PM / PM III",
    yoe: "4–7 years",
    scope: "Owns multiple related features / larger product area, mentors PMs",
    signals: ["Defines quarterly strategy, not just roadmap", "Influences adjacent teams and leadership", "Can own through ambiguity where spec doesn&apos;t exist"],
    companies: "Senior PM is the mid-ladder plateau at all major Indian tech companies",
  },
  {
    level: "Group PM / Lead PM / Staff PM",
    yoe: "6–10 years",
    scope: "Owns a product line or multiple squads; may mentor or manage other PMs",
    signals: ["Sets product strategy for a meaningful BU", "Builds and develops PM team", "Makes non-obvious strategic bets with evidence"],
    companies: "Flipkart, Swiggy, Razorpay, CRED — GPM is a common &apos;senior IC&apos; alternative to management",
  },
  {
    level: "Director / Principal PM",
    yoe: "9–14 years",
    scope: "Owns a major product line or full business unit",
    signals: ["Leads multi-team initiatives with executive visibility", "Drives company-level strategic bets", "Develops senior PMs, not just ICs"],
    companies: "Top senior IC or people manager tier — VP Product feeder role",
  },
  {
    level: "VP Product / SVP",
    yoe: "12+ years",
    scope: "All product for a business unit or full company",
    signals: ["Sets product org structure and hiring bar", "Drives company-wide product strategy", "Board-level product narrative"],
    companies: "C-suite feeder role. Typical at mid-to-late-stage startups and listed companies.",
  },
  {
    level: "Chief Product Officer (CPO)",
    yoe: "15+ years (or founder)",
    scope: "All product at the company",
    signals: ["Company-level product vision", "Product org leadership", "Public/board product narrative"],
    companies: "Usually external hire or founder. Rarely promoted from within beyond VP.",
  },
];

const PROMOTION_REALITY = [
  "Promotions follow scope growth, not tenure — if your scope isn&apos;t increasing, time in seat doesn&apos;t compensate.",
  "Visibility compounds. PMs whose work leadership knows about get promoted faster than equally-strong PMs whose work is invisible.",
  "Most companies expect 2 strong review cycles at a level before promotion. One great cycle rarely triggers a promo.",
  "Title calibration varies wildly between companies. A Senior PM at a 500-person company is often a PM at a 5000-person company.",
  "Lateral moves between companies can jump levels. Internal promotion is typically incremental; external moves can leapfrog.",
  "The biggest promotion bottleneck is demonstrating the next level&apos;s behaviours BEFORE the promotion — operating above your level is what gets promoted.",
];

const FAQS = [
  {
    q: "How long does it take to go from APM to Senior PM in India?",
    a: "5–7 years is typical. Exceptional PMs do it in 4 with strong track records at growth-stage companies. The main accelerators: consistent metric impact, clear promotion conversations with your manager, and moving companies when internal growth stalls. The main blockers: invisible work, weak stakeholder management, or staying in scope too small for your current level.",
  },
  {
    q: "Does title inflation affect PM levels in India?",
    a: "Significantly — especially at Series B-C startups that use senior titles to compete for talent. A &apos;Senior PM&apos; at a 30-person startup often maps to a PM level at Flipkart or Google. Treat external titles with some skepticism; calibrate by actual scope (number of engineers, user count, business impact) rather than the title on LinkedIn. Hiring managers at larger companies do the same calibration.",
  },
  {
    q: "How do Indian PM levels compare to US PM levels?",
    a: "Scope-for-scope, Indian Senior PMs at top companies (Flipkart, Razorpay, Google India) are comparable to US Senior PMs. Compensation is different — Indian Senior PMs earn 30–50% of US equivalents. The career ladder and scope expectations at the top tier (CPO, VP Product) are essentially identical, which is why Indian senior PMs move to the US or remote US roles frequently.",
  },
];

export default function PmCareerLevelsIndiaPage() {
  const dates = pageDates("/pm-career-levels-india");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Career Levels India", url: `${SITE_URL}/pm-career-levels-india` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Career Levels in India (2026 Edition)",
        description: "The complete PM level ladder in India. What each title means at Flipkart, Razorpay, Google, and more. Promotion criteria, typical years, and how companies calibrate levels.",
        image: `${SITE_URL}/api/og?title=PM+Career+Levels+in+India+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-career-levels-india`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📊</span> Titles vary. Scope and signals don&apos;t lie.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Career Levels in India<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            India&apos;s PM ladder runs from APM through PM, Senior PM, Group or Staff PM, Director or
            Principal PM, VP Product, and finally CPO, with scope — not tenure — driving each promotion.
            Titles vary sharply between companies, so a &apos;Senior PM&apos; at a small startup often maps
            to a plain PM at Flipkart, and operating above your current level is what gets you promoted to it.
          </p>
          <p className="text-sm text-white/40 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline underline-offset-2">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The complete PM ladder from APM to CPO — years of experience, scope,
            promotion signals, and the reality of how promotions actually happen.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Level Up Your PM Skills Daily — Free →
          </Link>
        </section>

        {/* Levels */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="space-y-5">
            {LEVELS.map((l, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <div>
                    <p className="font-bold text-white">{i + 1}. {l.level}</p>
                    <p className="text-xs text-[#89e219]">{l.yoe} typical</p>
                  </div>
                </div>
                <p className="text-sm text-white/60 mb-3">Scope: {l.scope}</p>
                <div className="mb-3">
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Signals at this level</p>
                  <ul className="space-y-1">
                    {l.signals.map((s, j) => (
                      <li key={j} className="flex gap-2 text-xs">
                        <span className="text-green-400">✓</span>
                        <span className="text-white/70">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#0e1113] rounded-lg px-3 py-2">
                  <p className="text-xs text-white/50">🏢 Common at: <span className="text-white/70">{l.companies}</span></p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Promotion reality */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Realities About PM Promotions</h2>
            <div className="space-y-3">
              {PROMOTION_REALITY.map((r, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{r}</p>
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

        <RelatedPages slug="pm-career-levels-india" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Skills for the Next Level</h2>
          <p className="text-white/60 mb-6">Daily PM practice calibrated to your current and next level.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
