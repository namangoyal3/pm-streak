import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "Cars24, CarTrade & OLX Autos PM Interview Guide (2026) — Used Car PM Questions",
  description:
    "Crack PM interviews at Cars24, CarTrade, OLX Autos, and Spinny. The used car marketplace dynamics, inspection-pricing-financing flows, and what auto PMs actually build.",
  keywords: [
    "Cars24 PM interview", "Spinny PM interview",
    "OLX Autos PM", "used car marketplace PM india",
    "CarTrade product manager", "auto tech PM 2026",
  ],
  alternates: { canonical: "/cars24-cartrade-pm-interview" },
  openGraph: {
    title: "Auto PM Interview Guide 2026 — Cars24, Spinny, OLX Autos | PM Streak",
    description: "PM interview guide for India&apos;s used car marketplaces — dynamics, rounds, and questions.",
    url: `${SITE_URL}/cars24-cartrade-pm-interview`,
    images: [{ url: `${SITE_URL}/api/og?title=Auto+PM+Interview+Guide+2026++Cars24+Spinny+OLX+Autos++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Auto PM Interview Guide 2026 — Cars24, Spinny, OLX Autos | PM Streak",
    description: "PM interview guide for India&apos;s used car marketplaces — dynamics, rounds, and questions.",
    images: [`${SITE_URL}/api/og?title=Auto+PM+Interview+Guide+2026++Cars24+Spinny+OLX+Autos++PM+Streak`],
    site: "@pmstreak",
  },
};

const AUTO_CONTEXT = [
  { label: "Core business", value: "Used car buying + selling, inspection, financing, refurbishment, dealer network" },
  { label: "Companies to know", value: "Cars24 (C2B+B2C), Spinny (B2C refurb), CarTrade (marketplace), OLX Autos (C2C), Droom" },
  { label: "Products involved", value: "Inspection apps for field agents, pricing algorithms, financing flows, inventory management, customer-facing discovery" },
  { label: "Key metrics", value: "Inventory turnover, gross margin per car, customer acquisition cost, dealer NPS, inspection throughput" },
  { label: "Unique challenge", value: "Physical goods + variable quality + regulatory (RC transfer, state RTO rules) + financing complexity all intersect" },
];

const QUESTION_THEMES = [
  {
    theme: "Marketplace Dynamics",
    icon: "🚗",
    questions: [
      "How would you reduce time-to-sell for Cars24 sellers without cutting price aggressively?",
      "Design a pricing algorithm that balances seller satisfaction and buyer affordability.",
      "OLX Autos has C2C listings with low trust. How do you inject trust without owning inventory?",
    ],
    tip: "Used car marketplaces are inventory-rotation businesses. Every day a car sits unsold is margin erosion. Speed and margin are the two levers — PMs who ignore one fail the round.",
  },
  {
    theme: "Inspection & Quality",
    icon: "🔧",
    questions: [
      "Design an inspection app for field agents that takes under 30 minutes per car.",
      "How would you standardise quality scoring across 1,000+ field inspectors?",
      "Buyers complain that inspection reports are inaccurate. Diagnose and propose.",
    ],
    tip: "Inspection is the trust anchor. Systems must balance agent speed with accuracy. Show you understand operational constraints, not just software.",
  },
  {
    theme: "Financing Flows",
    icon: "💳",
    questions: [
      "Design a financing experience that approves 80% of buyers in under 10 minutes.",
      "How would you reduce fraud in used car loan approvals?",
      "Financing contributes 20% of margin. How would you grow it to 35%?",
    ],
    tip: "Used car financing has complex risk (vehicle age, buyer profile, regional factors). Understand lender-agnostic flows, NBFC partnerships, and why financing margin is often higher than retail margin.",
  },
  {
    theme: "Customer Experience",
    icon: "👤",
    questions: [
      "Design the buyer experience for someone buying their first car online.",
      "Post-purchase, 15% of buyers report issues. How do you reduce this to 5%?",
      "Cars24&apos;s 7-day return policy drives trust but hurts margin. Redesign.",
    ],
    tip: "Used car buyers are low-frequency (once in 5+ years) and anxiety-heavy. Trust-building and clarity beat features. Answers that propose &apos;more filters&apos; often miss what actually matters.",
  },
];

const FAQS = [
  {
    q: "Is auto tech a good PM career path in India?",
    a: "Growing but niche. India&apos;s used car market is massive (~₹5L Cr+) and under-digitised. Cars24, Spinny, and CarTrade are well-funded, and the space is resilient through economic cycles (used cars often grow in downturns). Career trade-off: smaller PM community than fintech/e-commerce, but deeper domain expertise pays off for future auto, ops, or marketplace roles.",
  },
  {
    q: "What&apos;s unique about auto tech PM interviews?",
    a: "Physical-digital integration. Most software PMs haven&apos;t thought through how a field inspector&apos;s app affects throughput, or how financing flows intersect with RC transfer timelines. Strong candidates show awareness of the full customer and inventory journey — not just the app surface.",
  },
  {
    q: "Can consumer PMs transition to auto tech easily?",
    a: "Yes, with a domain ramp. Consumer PM skills transfer. The 3–6 month learning curve is understanding: inspection ops, used car pricing dynamics, financing (NBFC partnerships, credit risk), and the offline-to-online retail nuances. Most auto tech PMs come from adjacent marketplace or consumer backgrounds.",
  },
];

export default function Cars24CartradePmInterviewPage() {
  const dates = pageDates("/cars24-cartrade-pm-interview");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Auto PM Interview", url: `${SITE_URL}/cars24-cartrade-pm-interview` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Auto Tech PM Interview Guide (Cars24, Spinny, OLX 2026)",
        description:
          "Crack PM interviews at Cars24, CarTrade, OLX Autos, and Spinny. The used car marketplace dynamics, inspection-pricing-financing flows, and what auto PMs actually build.",
        image: `${SITE_URL}/api/og?title=Auto+PM+Interview+Guide+2026++Cars24+Spinny+OLX+Autos++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/cars24-cartrade-pm-interview`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🚗</span> Physical + digital · Inspection + financing · Inventory velocity
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Auto Tech PM Interview Guide<br />(Cars24, Spinny, OLX 2026)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Interviews at Cars24, Spinny, CarTrade, and OLX Autos cover four question themes: marketplace
            dynamics around inventory turnover and pricing, inspection-and-quality systems for field agents,
            financing flows that often carry higher margin than retail, and customer experience for anxious,
            low-frequency buyers. The physical-digital overlap — inspection apps, RC transfer rules, NBFC financing — is what separates auto tech PM rounds from typical consumer-app interviews.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The used car marketplace context, 4 question themes covering inspection, financing,
            and customer experience, and what auto PMs actually build day-to-day.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Start Auto PM Prep — Free →
          </Link>
        </section>

        <section className="max-w-4xl mx-auto px-4 pb-10">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-5">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Auto Tech Context You Must Know</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {AUTO_CONTEXT.map((item, i) => (
                <div key={i} className="flex gap-2 text-sm">
                  <span className="text-[#89e219] font-medium flex-shrink-0">{item.label}:</span>
                  <span className="text-white/60">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">Question Themes You Will Be Tested On</h2>
          <div className="space-y-6">
            {QUESTION_THEMES.map((t, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">{t.icon}</span>
                  <h3 className="text-lg font-bold text-white">{t.theme}</h3>
                </div>
                <ul className="space-y-2 mb-4">
                  {t.questions.map((q, j) => (
                    <li key={j} className="flex gap-2 text-sm">
                      <span className="text-white/30 flex-shrink-0">{j + 1}.</span>
                      <span className="text-white/70">{q}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-lg px-3 py-2">
                  <p className="text-xs text-[#89e219]">💡 {t.tip}</p>
                </div>
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

        <RelatedPages slug="cars24-cartrade-pm-interview" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Physical-Digital PM Scenarios</h2>
          <p className="text-white/60 mb-6">Daily scenarios on inventory, ops, and trust — calibrated to auto tech.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
