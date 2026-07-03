import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "Swiggy PM Interview Guide (2026) — Questions, Rounds & Prep Plan",
  description:
    "Crack the Swiggy PM interview. All rounds, ops-heavy product questions, what Swiggy PMs say the bar is, and a prep plan for PM and APM roles at India's leading food delivery platform.",
  keywords: [
    "Swiggy PM interview", "Swiggy product manager interview questions",
    "Swiggy PM interview prep", "Swiggy APM interview", "how to crack Swiggy PM interview",
    "food delivery PM interview India", "Swiggy product manager interview 2026",
  ],
  alternates: { canonical: "/swiggy-pm-interview" },
  openGraph: {
    title: "Swiggy PM Interview Guide 2026 — PM Streak",
    description: "All Swiggy PM interview rounds, ops-product questions, and a structured prep plan.",
    url: `${SITE_URL}/swiggy-pm-interview`,
    images: [{ url: `${SITE_URL}/api/og?title=Swiggy+PM+Interview+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swiggy PM Interview Guide 2026 — PM Streak",
    description: "All Swiggy PM interview rounds, ops-product questions, and a structured prep plan.",
    images: [`${SITE_URL}/api/og?title=Swiggy+PM+Interview+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const SWIGGY_CONTEXT = [
  { label: "Core business", value: "Food delivery, Instamart (quick commerce), Dineout (dining out), Snacc (social food)" },
  { label: "PM culture", value: "High-velocity, ops-heavy, data-driven. PMs work closely with city ops and supply chain teams." },
  { label: "Users to know", value: "Customers (speed, reliability), restaurant partners (order volume, cancellation rate), delivery partners (earnings, route efficiency)" },
  { label: "Key metrics", value: "Delivery time, order fill rate, restaurant NPS, delivery partner utilisation, cart abandonment, repeat order rate" },
  { label: "Unique challenge", value: "3-sided marketplace: customer + restaurant + delivery partner. Every product decision affects all three sides." },
];

const ROUNDS = [
  {
    name: "Product Thinking Assessment",
    what: "Usually a take-home or timed online problem. Design or improve a Swiggy product for a specific user or business goal.",
    sample: [
      "How would you improve the Swiggy experience for restaurant partners who struggle with high order cancellations?",
      "Design a product that helps Swiggy increase repeat orders from monthly users.",
      "How would you build a loyalty program for Swiggy that benefits all three stakeholders?",
    ],
    tip: "Swiggy operates a 3-sided marketplace. For any product question, ask: how does this affect customers, restaurants, and delivery partners? Solutions that optimise only one side at the expense of others rarely make the cut.",
  },
  {
    name: "Product Case Round",
    what: "In-depth product case — typically involving operational trade-offs, surge pricing, or marketplace dynamics.",
    sample: [
      "Swiggy Instamart's out-of-stock rate is 12%. How do you fix it without increasing inventory cost?",
      "How would you redesign the Swiggy home screen to increase order frequency for casual users?",
      "A new dark kitchen enters a city and Swiggy's restaurant partner count drops 8%. What's your response?",
    ],
    tip: "Operational thinking is highly valued at Swiggy. Show you understand supply constraints (rider availability, restaurant prep time) as product inputs — not just user needs.",
  },
  {
    name: "PM Stakeholder Round",
    what: "How do you manage competing priorities between city operations, engineering, and business teams? Swiggy has strong ops culture — PMs must earn credibility with ops leads.",
    sample: [
      "A city head wants you to build a feature specifically for Chennai that engineering says will take 6 weeks. What do you do?",
      "Your metrics show a feature you shipped is reducing delivery partner earnings. Business loves it. What do you do?",
      "How do you prioritise between a feature that improves customer NPS and one that improves restaurant partner retention?",
    ],
    tip: "Swiggy interviews specifically probe whether you can balance marketplace dynamics without defaulting to 'customer first always.' Show that you think in terms of marketplace health, not just consumer experience.",
  },
  {
    name: "Metrics Deep Dive",
    what: "Diagnose a metric drop or define a success framework for a Swiggy product area.",
    sample: [
      "Swiggy's average delivery time increases from 28 minutes to 34 minutes over 3 weeks. Walk through your investigation.",
      "How would you define and measure the health of Swiggy's restaurant partner ecosystem?",
      "Instamart order frequency drops in Mumbai post a competitor entry. How do you triage?",
    ],
    tip: "Delivery time is a composite metric — it includes: restaurant acceptance time, prep time, rider pickup time, and transit time. Swiggy PMs must be able to decompose operational metrics into actionable sub-metrics.",
  },
];

const FAQS = [
  {
    q: "Is the Swiggy PM interview more operations-focused than other companies?",
    a: "Yes — more than most consumer tech companies. Swiggy's product is deeply intertwined with physical operations: kitchens, delivery routes, rider availability. PMs are expected to understand supply-demand balancing, city-level dynamics, and how product changes ripple into ops. Pure consumer product thinking without operational context is a common failure mode in Swiggy interviews.",
  },
  {
    q: "What should I know about Swiggy's products before the interview?",
    a: "Use Swiggy extensively before your interview — map the customer, restaurant, and delivery partner journeys. Know Instamart (quick commerce, 10-min delivery) as a distinct product from food delivery. Understand Swiggy One (loyalty subscription). Read their public blog posts on ops and product — they publish openly about their challenges.",
  },
  {
    q: "How does Swiggy's PM interview compare to Zomato's?",
    a: "Both test marketplace and ops thinking. Swiggy historically has a stronger emphasis on 3-sided marketplace balance and supply chain. Zomato leans slightly more on consumer experience and international expansion thinking. Both are data-heavy and expect candidates to know the food delivery unit economics well.",
  },
];

export default function SwiggyPmInterviewPage() {
  const dates = pageDates("/swiggy-pm-interview");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Swiggy PM Interview", url: `${SITE_URL}/swiggy-pm-interview` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Swiggy PM Interview Guide (2026 Edition)",
        description:
          "Crack the Swiggy PM interview. All rounds, ops-heavy product questions, what Swiggy PMs say the bar is, and a prep plan for PM and APM roles at India's leading food delivery platform.",
        image: `${SITE_URL}/api/og?title=Swiggy+PM+Interview+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/swiggy-pm-interview`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🍔</span> 3-sided marketplace · Ops-heavy · Speed-obsessed
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Swiggy PM Interview Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Expect four stages in the Swiggy PM interview: a product thinking assessment (often
            take-home), a product case built around operational trade-offs, a stakeholder round
            covering city ops and engineering tensions, and a metrics deep dive. Throughout,
            interviewers test whether you can balance Swiggy&apos;s three-sided marketplace — customers,
            restaurants, delivery partners — and decompose composite ops metrics like delivery time.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            All interview rounds, the marketplace thinking Swiggy tests for,
            real questions, and what separates candidates who get offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/signup" className="bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
              Start Swiggy PM Prep — Free
            </Link>
            <Link href="/apm-program-preparation" className="bg-white/10 hover:bg-white/15 text-white font-semibold px-8 py-3 rounded-xl transition-colors">
              APM Program Guide →
            </Link>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 pb-10">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-5">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Know Before You Interview</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SWIGGY_CONTEXT.map((item, i) => (
                <div key={i} className="flex gap-2 text-sm">
                  <span className="text-[#89e219] font-medium flex-shrink-0">{item.label}:</span>
                  <span className="text-white/60">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">The Swiggy PM Interview Rounds</h2>
          <div className="space-y-6">
            {ROUNDS.map((round, i) => (
              <div key={round.name} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-7 h-7 rounded-full bg-[#58cc02]/20 text-[#89e219] font-bold text-sm flex items-center justify-center">{i + 1}</span>
                  <h3 className="text-lg font-bold text-white">{round.name}</h3>
                </div>
                <p className="text-sm text-white/60 mb-4">{round.what}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Sample Questions</p>
                    <ul className="space-y-1.5">
                      {round.sample.map((q, j) => (
                        <li key={j} className="flex gap-2 text-sm">
                          <span className="text-white/30">•</span>
                          <span className="text-white/70">{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-xl p-3">
                    <p className="text-xs text-[#89e219] mb-1">💡 Prep tip</p>
                    <p className="text-sm text-white/60">{round.tip}</p>
                  </div>
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

        <RelatedPages slug="swiggy-pm-interview" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Train the Marketplace Thinking Swiggy Tests For</h2>
          <p className="text-white/60 mb-6">Daily PM scenarios with ops and marketplace dynamics — calibrated to Swiggy&apos;s bar.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
