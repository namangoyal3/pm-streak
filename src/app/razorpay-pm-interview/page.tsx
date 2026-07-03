import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "Razorpay PM Interview Guide (2026) — Fintech Questions, Rounds & Prep",
  description:
    "Crack the Razorpay PM interview. All rounds, fintech-specific questions, what Razorpay PMs say the bar is, and a prep plan for PM and APM roles at India's top fintech.",
  keywords: [
    "Razorpay PM interview", "Razorpay product manager interview questions",
    "Razorpay PM interview prep", "Razorpay APM interview", "how to crack Razorpay PM interview",
    "fintech PM interview India", "Razorpay product manager interview 2026",
  ],
  alternates: { canonical: "/razorpay-pm-interview" },
  openGraph: {
    title: "Razorpay PM Interview Guide 2026 — PM Streak",
    description: "All Razorpay PM interview rounds, fintech questions, and a structured prep plan.",
    url: `${SITE_URL}/razorpay-pm-interview`,
    images: [{ url: `${SITE_URL}/api/og?title=Razorpay+PM+Interview+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Razorpay PM Interview Guide 2026 — PM Streak",
    description: "All Razorpay PM interview rounds, fintech questions, and a structured prep plan.",
    images: [`${SITE_URL}/api/og?title=Razorpay+PM+Interview+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const ROUNDS = [
  {
    name: "Product Thinking Round",
    what: "Design or improve a Razorpay product. Heavy emphasis on merchant (B2B) empathy and first-principles thinking over frameworks.",
    sample: [
      "How would you improve the Razorpay checkout experience for merchants on mobile?",
      "Design a product for freelancers to manage payments from multiple clients.",
      "Razorpay wants to expand into lending. How do you build the product?",
    ],
    tip: "Razorpay values first-principles over CIRCLES/RICE name-dropping. Say 'I'd think about this as…' and show your reasoning — not 'I'll apply the JTBD framework.'",
  },
  {
    name: "Metrics & Analytics Round",
    what: "Define success, diagnose metric drops, and think about experimentation. Razorpay is deeply data-driven — expect quantitative pressure.",
    sample: [
      "Razorpay's payment success rate drops from 94% to 89%. What do you investigate?",
      "Define north star metrics for Razorpay's SMB product vs enterprise product.",
      "How would you measure the success of adding UPI Autopay to Razorpay Subscriptions?",
    ],
    tip: "Know payment-specific failure modes: bank downtime, timeout errors, authentication failures, fraud declines. These are distinct failure reasons that a fintech PM must segment.",
  },
  {
    name: "Founder Round",
    what: "Direct conversation with a senior leader or founder. Razorpay tests intellectual honesty, conviction, and whether you think like an owner — not an executor.",
    sample: [
      "If you were a PM at Razorpay for a day, what's the one thing you'd change and why?",
      "Where do you think Razorpay's biggest product risk is in the next 2 years?",
      "Tell me about a time you took a strong position and were wrong. What changed your mind?",
    ],
    tip: "Have an opinion. Razorpay founder rounds specifically test whether you think independently. Saying 'it depends' without a recommendation is a red flag here.",
  },
  {
    name: "Behavioural Round",
    what: "Leadership, ownership, failure, and how you handle ambiguity. Razorpay culture is high-ownership, fast-moving, and intellectually honest.",
    sample: [
      "Tell me about a product decision you made that you would reverse today.",
      "Describe a time you had to convince leadership to invest in something unglamorous.",
      "Tell me about a time you worked on something with no clear definition of success.",
    ],
    tip: "Razorpay looks for genuine intellectual humility — not performative humility. A candidate who says 'I was wrong because X data showed Y' is more credible than one who says 'I learned so much from that.'",
  },
];

const FINTECH_CONTEXT = [
  { term: "Payment Success Rate (PSR)", def: "% of attempted transactions that succeed. Core health metric for any payment product." },
  { term: "MDR (Merchant Discount Rate)", def: "Fee merchants pay per transaction. Razorpay's primary revenue lever for payment processing." },
  { term: "Reconciliation", def: "Matching outgoing payments to bank records. A top merchant pain point — failures cause major operational issues." },
  { term: "UPI / NEFT / IMPS / RTGS", def: "India's payment rails. PMs must know when each is used, speeds, and failure modes." },
  { term: "Payment gateway vs aggregator", def: "Aggregator (Razorpay) bundles acquiring relationships. Gateway is just the technical layer. Razorpay is both." },
  { term: "Chargeback", def: "Customer disputes a transaction. High chargeback rates signal fraud or UX problems in checkout." },
];

const FAQS = [
  {
    q: "Do I need fintech experience to interview at Razorpay as a PM?",
    a: "Not required, but you must demonstrate the ability to learn payment concepts quickly and reason about them clearly. Interviewers respect candidates who say 'I don't have deep fintech experience, but here's how I'd think about it' over candidates who fake domain knowledge. That said, learning the basics of UPI, MDR, reconciliation, and payment success rates before your interview is non-negotiable.",
  },
  {
    q: "Is the Razorpay PM interview more technical than other companies?",
    a: "More fintech-domain-technical than coding-technical. You won't write code, but you'll be expected to understand payment flows, API error types, and why a 400 error in a payment API is different from a 500. Engineers at Razorpay are strong, and PMs who earn their respect by understanding constraints ship better products.",
  },
  {
    q: "How does the Razorpay APM program compare to others in India?",
    a: "Razorpay's APM program is 18 months and known for high ownership early — APMs own real products within months, not years. The bar is lower on pedigree (no IIT-only filter) and higher on raw thinking quality. The Founder Round is unique — few other companies expose APM candidates to founder-level scrutiny so early.",
  },
];

export default function RazorpayPmInterviewPage() {
  const dates = pageDates("/razorpay-pm-interview");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Razorpay PM Interview", url: `${SITE_URL}/razorpay-pm-interview` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Razorpay PM Interview Guide (2026 Edition)",
        description:
          "Crack the Razorpay PM interview. All rounds, fintech-specific questions, what Razorpay PMs say the bar is, and a prep plan for PM and APM roles at India's top fintech.",
        image: `${SITE_URL}/api/og?title=Razorpay+PM+Interview+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/razorpay-pm-interview`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>💳</span> India&apos;s most intellectually demanding PM interview
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Razorpay PM Interview Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Razorpay&apos;s PM interview spans four rounds: product thinking, metrics and analytics,
            a Founder Round with a senior leader, and behavioural. Interviewers reward
            first-principles reasoning over framework name-dropping, apply real quantitative
            pressure, and expect working fintech vocabulary — payment success rate, MDR, UPI rails,
            reconciliation. The Founder Round tests whether you hold independent, defensible opinions.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            All interview rounds, fintech domain knowledge you must have, real questions,
            and what Razorpay PMs say separates candidates who get offers from those who don&apos;t.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/signup" className="bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
              Start Razorpay PM Prep — Free
            </Link>
            <Link href="/apm-program-preparation" className="bg-white/10 hover:bg-white/15 text-white font-semibold px-8 py-3 rounded-xl transition-colors">
              Razorpay APM Guide →
            </Link>
          </div>
        </section>

        {/* Fintech glossary */}
        <section className="max-w-4xl mx-auto px-4 pb-10">
          <h2 className="text-xl font-bold mb-4">Fintech Terms Every Razorpay PM Candidate Must Know</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {FINTECH_CONTEXT.map((item, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-[#89e219] text-sm mb-1">{item.term}</p>
                <p className="text-xs text-white/60">{item.def}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Rounds */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">The Razorpay PM Interview Rounds</h2>
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

        <RelatedPages slug="razorpay-pm-interview" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build the Fintech PM Intuition Razorpay Tests For</h2>
          <p className="text-white/60 mb-6">Daily PM practice calibrated to Razorpay&apos;s first-principles and fintech bar.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
