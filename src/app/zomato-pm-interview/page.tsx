import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "Zomato PM Interview Guide (2026) — Questions, Rounds & Prep",
  description:
    "Crack the Zomato PM interview. All rounds, food delivery and dining product questions, real interview examples, and what Zomato PMs say the bar is in 2026.",
  keywords: [
    "Zomato PM interview", "Zomato product manager interview questions",
    "Zomato PM interview prep", "Blinkit PM interview",
    "food delivery PM india", "Zomato product manager interview 2026",
  ],
  alternates: { canonical: "/zomato-pm-interview" },
  openGraph: {
    title: "Zomato PM Interview Guide 2026 — PM Streak",
    description: "All Zomato PM interview rounds, real questions, and a prep plan for food delivery and dining PMs.",
    url: `${SITE_URL}/zomato-pm-interview`,
    images: [{ url: `${SITE_URL}/api/og?title=Zomato+PM+Interview+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zomato PM Interview Guide 2026 — PM Streak",
    description: "All Zomato PM interview rounds, real questions, and a prep plan for food delivery and dining PMs.",
    images: [`${SITE_URL}/api/og?title=Zomato+PM+Interview+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const ZOMATO_CONTEXT = [
  { label: "Core business", value: "Food delivery, Dining Out, Blinkit (quick commerce), Hyperpure (B2B supplies), Feeding India" },
  { label: "PM culture", value: "Scrappy, ownership-heavy, metrics-first. PMs own category P&L and move fast." },
  { label: "Users to know", value: "Customers, restaurants, delivery partners, Blinkit dark stores, corporate ordering customers" },
  { label: "Key metrics", value: "GOV, contribution margin, order frequency, food cost + delivery cost per order, restaurant NPS" },
  { label: "Unique context", value: "Listed company — PMs increasingly expected to understand public market dynamics and unit economics" },
];

const ROUNDS = [
  {
    name: "Product Case Round",
    what: "Deep product case involving food delivery, Blinkit, or Dining Out. Usually ops + product trade-offs.",
    sample: [
      "Zomato's average order value drops 10% in Tier-2 cities. Diagnose and propose a fix.",
      "How would you design a loyalty product that increases repeat orders without killing margins?",
      "Blinkit's fill rate is 88% in Delhi. How do you get it to 95%?",
    ],
    tip: "Zomato is obsessive about unit economics. For every solution, show you've thought about the impact on contribution margin per order — not just order frequency or user engagement.",
  },
  {
    name: "Metrics Deep Dive",
    what: "Diagnose a metric drop, define success metrics for a category, or think about leading/lagging indicators.",
    sample: [
      "Zomato Gold subscribers are growing but total order frequency is flat. Is this a problem?",
      "Define the north star metric for Zomato Dining Out.",
      "Restaurant churn increases in Pune after a policy change. Walk through your diagnosis.",
    ],
    tip: "Zomato metrics are multi-sided: know the customer funnel, restaurant health, and delivery operations metrics. The best candidates connect metric changes across all three.",
  },
  {
    name: "Strategy Round",
    what: "Competitive strategy, market expansion, or product area positioning. Often involves Swiggy dynamics.",
    sample: [
      "Swiggy Instamart launches in a city 3 months before Blinkit. How do you respond?",
      "Should Zomato expand Dining Out aggressively or focus on food delivery profitability?",
      "Zomato's food delivery market share is 55%. Where should we invest to defend it?",
    ],
    tip: "Zomato interviewers test whether candidates can balance growth and profitability. Strategy answers that optimise only one ('capture market share at any cost') tend to fail — show that you can reason about both simultaneously.",
  },
  {
    name: "Behavioural & Ownership Round",
    what: "Zomato tests for ownership, ambiguity comfort, and ability to ship with imperfect information.",
    sample: [
      "Tell me about a time you shipped a product with unexpected negative consequences. What did you do?",
      "Describe a situation where you owned a P&L decision that had no clear right answer.",
      "Tell me about a time you had to say no to a senior stakeholder.",
    ],
    tip: "Zomato interviewers look for candidates who treat their product area like a startup they run. Examples of moving fast, owning outcomes, and communicating bad news well score higher than polished stories about team wins.",
  },
];

const FAQS = [
  {
    q: "What makes Zomato PM interviews unique compared to Swiggy?",
    a: "Both test food delivery and marketplace thinking, but Zomato emphasises unit economics and P&L ownership more explicitly — it's a listed company and PMs are expected to understand the public market narrative. Swiggy leans slightly more on 3-sided marketplace balance. Both are highly ops-product hybrid roles.",
  },
  {
    q: "Should I prepare for both Zomato and Blinkit in a Zomato PM interview?",
    a: "Yes — Blinkit is part of Zomato's core business and PMs often interview for roles that span both. Know Blinkit's quick commerce model (dark stores, 10-min delivery, SKU depth) separately from food delivery. Interviewers may ask questions about either or both depending on the role.",
  },
  {
    q: "How important is unit economics knowledge for a Zomato PM interview?",
    a: "Very important, especially at senior PM levels. Zomato is publicly listed and has a well-known emphasis on contribution margin per order. Understand the basic P&L of a food delivery order (order value, commission, delivery cost, marketing spend, platform cost) before your interview. Candidates who talk about 'growth' without knowing what hits the P&L tend to get filtered out.",
  },
];

export default function ZomatoPmInterviewPage() {
  const dates = pageDates("/zomato-pm-interview");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Zomato PM Interview", url: `${SITE_URL}/zomato-pm-interview` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Zomato PM Interview Guide (2026 Edition)",
        description:
          "Crack the Zomato PM interview. All rounds, food delivery and dining product questions, real interview examples, and what Zomato PMs say the bar is in 2026.",
        image: `${SITE_URL}/api/og?title=Zomato+PM+Interview+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/zomato-pm-interview`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🍽️</span> Listed-company PM bar · P&amp;L ownership · Ops-product hybrid
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Zomato PM Interview Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            The Zomato PM interview runs across four rounds — a product case on food delivery, Blinkit,
            or Dining Out; a metrics deep dive testing multi-sided diagnosis; a strategy round weighing
            growth against profitability; and a behavioural round probing ownership and ambiguity.
            Because Zomato is publicly listed, every round rewards candidates who reason in contribution margin, not just growth.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            All Zomato PM interview rounds, real questions across food delivery, Blinkit,
            and Dining Out, and the P&amp;L-first thinking Zomato interviewers reward.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Start Zomato PM Prep — Free →
          </Link>
        </section>

        <section className="max-w-4xl mx-auto px-4 pb-10">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-5">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Know Before You Interview</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {ZOMATO_CONTEXT.map((item, i) => (
                <div key={i} className="flex gap-2 text-sm">
                  <span className="text-[#89e219] font-medium flex-shrink-0">{item.label}:</span>
                  <span className="text-white/60">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">The Zomato PM Interview Rounds</h2>
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

        <RelatedPages slug="zomato-pm-interview" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Train for the Zomato P&amp;L Bar Daily</h2>
          <p className="text-white/60 mb-6">Scenarios on unit economics, marketplace trade-offs, and ops-product decisions.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
