import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "Zepto PM Interview Guide (2026) — Quick Commerce PM Questions &amp; Prep",
  description:
    "Crack the Zepto PM interview. Dark store ops, 10-minute delivery dynamics, SKU catalogue decisions, and the high-velocity PM culture at India&apos;s top quick-commerce company.",
  keywords: [
    "Zepto PM interview", "Zepto product manager",
    "quick commerce PM india", "dark store PM",
    "10 minute delivery PM 2026",
  ],
  alternates: { canonical: "/pm-zepto-pm-interview" },
  openGraph: {
    title: "Zepto PM Interview Guide 2026 — PM Streak",
    description: "PM interview prep for Zepto — quick commerce, dark stores, and high-velocity PM work.",
    url: `${SITE_URL}/pm-zepto-pm-interview`,
    images: [{ url: `${SITE_URL}/api/og?title=Zepto+PM+Interview+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zepto PM Interview Guide 2026 — PM Streak",
    description: "PM interview prep for Zepto — quick commerce, dark stores, and high-velocity PM work.",
    images: [`${SITE_URL}/api/og?title=Zepto+PM+Interview+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const CONTEXT = [
  { label: "Core business", value: "10-minute quick commerce — groceries, essentials, pharmacy, Zepto Cafe (ready-to-eat)" },
  { label: "PM culture", value: "Extreme velocity, ops-product hybrid, data-obsessed, high ownership early" },
  { label: "Users to know", value: "Time-pressed urban consumers, dark store workers, delivery riders, category buyers" },
  { label: "Key metrics", value: "Orders per dark store per day, SLA breach rate, fill rate, basket size, repeat rate" },
  { label: "Unique challenge", value: "Every product decision has ops implications — dark store layout, rider route, SKU catalogue all intersect" },
];

const QUESTION_THEMES = [
  {
    theme: "Dark Store &amp; Ops",
    items: [
      "Design an app for dark store pickers to reduce picking errors by 30%.",
      "Zepto&apos;s fill rate is 92% in Bangalore. How do you get to 97%?",
      "A dark store in Pune is consistently slow. Diagnose and propose.",
    ],
  },
  {
    theme: "SLA &amp; Delivery",
    items: [
      "Zepto&apos;s 10-minute SLA is breached 8% of orders. Walk through your diagnosis.",
      "How would you improve rider earnings without hurting unit economics?",
      "Design a product for customers when their order is delayed beyond SLA.",
    ],
  },
  {
    theme: "Catalogue &amp; Discovery",
    items: [
      "Zepto sells 10K SKUs. Should we carry 20K? What&apos;s the decision framework?",
      "Design home screen discovery for first-time Zepto users.",
      "How would you personalise category surfacing for repeat users?",
    ],
  },
  {
    theme: "Unit Economics",
    items: [
      "Zepto&apos;s contribution margin per order is -₹15. How do you make it positive?",
      "Is a Zepto Gold subscription a good bet? Make the case.",
      "How would you think about pricing dynamically during peak hours?",
    ],
  },
];

const FAQS = [
  {
    q: "What makes Zepto PM interviews different from other quick commerce?",
    a: "Zepto tests ops-product integration more rigorously than most. Dark stores, SKU catalogue, rider routing, SLA management are all product surfaces — not just ops problems. Candidates who treat ops as &apos;not my problem&apos; miss the core Zepto PM thesis: product and operations are the same thing here.",
  },
  {
    q: "Is Zepto a good early-career PM destination?",
    a: "Yes — if you want high ownership fast. Zepto PMs often own meaningful scope within 6 months. The pace is intense (velocity is a cultural value) and expectations are high. It&apos;s a filter for people who want to ship, not think. Career capital: Zepto PM alumni are actively recruited by Swiggy Instamart, Blinkit, Flipkart, and other marketplaces.",
  },
];

export default function PmZeptoPmInterviewPage() {
  const dates = pageDates("/pm-zepto-pm-interview");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Zepto PM Interview", url: `${SITE_URL}/pm-zepto-pm-interview` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Zepto PM Interview Guide (2026 Edition)",
        description:
          "Crack the Zepto PM interview. Dark store ops, 10-minute delivery dynamics, SKU catalogue decisions, and the high-velocity PM culture at India&apos;s top quick-commerce company.",
        image: `${SITE_URL}/api/og?title=Zepto+PM+Interview+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-zepto-pm-interview`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>⚡</span> 10-minute delivery · Ops-product hybrid · Extreme velocity
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Zepto PM Interview Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Ask what a Zepto PM interview covers, and the answer breaks into four themes:
            dark-store operations, SLA and delivery reliability, catalogue and discovery
            decisions, and unit economics — set against a core business of 10-minute delivery
            for groceries, essentials, pharmacy, and Zepto Cafe. Because product and operations
            are treated as one discipline here, candidates who treat dark-store or rider
            questions as &apos;not my problem&apos; get filtered out fast.
          </p>
          <p className="text-sm text-white/50 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Zepto context, 4 question themes (dark stores, SLA, catalogue, unit economics),
            and what separates candidates who get offers.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Start Zepto PM Prep — Free →
          </Link>
        </section>

        <section className="max-w-4xl mx-auto px-4 pb-10">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-5">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Zepto Context</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {CONTEXT.map((item, i) => (
                <div key={i} className="flex gap-2 text-sm">
                  <span className="text-[#89e219] font-medium flex-shrink-0">{item.label}:</span>
                  <span className="text-white/60">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">Question Themes</h2>
          <div className="space-y-6">
            {QUESTION_THEMES.map((q, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">{q.theme}</h3>
                <ul className="space-y-2">
                  {q.items.map((item, j) => (
                    <li key={j} className="flex gap-2 text-sm">
                      <span className="text-white/30 flex-shrink-0">{j + 1}.</span>
                      <span className="text-white/70">{item}</span>
                    </li>
                  ))}
                </ul>
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

        <RelatedPages slug="pm-zepto-pm-interview" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Quick Commerce PM Scenarios Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on ops, SLA, catalogue, and quick commerce unit economics.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
