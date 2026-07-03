import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "Fintech Product Manager Guide (2026) — How to Become One in India",
  description:
    "The complete guide to becoming a fintech PM in India. Domain knowledge to master, top companies hiring, interview questions, salary ranges, and how to break in from adjacent roles.",
  keywords: [
    "fintech product manager india", "how to become fintech PM",
    "fintech PM interview questions", "payments PM india",
    "lending PM india", "fintech PM salary", "neo-banking PM 2026",
  ],
  alternates: { canonical: "/fintech-product-manager" },
  openGraph: {
    title: "Fintech Product Manager Guide 2026 — PM Streak",
    description: "Domain knowledge, top companies, interview questions, and salary for fintech PMs in India.",
    url: `${SITE_URL}/fintech-product-manager`,
    images: [{ url: `${SITE_URL}/api/og?title=Fintech+Product+Manager+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fintech Product Manager Guide 2026 — PM Streak",
    description: "Domain knowledge, top companies, interview questions, and salary for fintech PMs in India.",
    images: [`${SITE_URL}/api/og?title=Fintech+Product+Manager+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const SUB_SECTORS = [
  { sector: "Payments", companies: "Razorpay, PhonePe, Paytm, Google Pay, Cashfree", pmFocus: "Payment success rates, merchant UX, checkout conversion, UPI innovations, fraud prevention" },
  { sector: "Lending", companies: "Navi, KreditBee, LendingKart, Axio, Jupiter", pmFocus: "Underwriting models, credit decisioning UX, collections, interest rate optimisation, NPA reduction" },
  { sector: "Wealth / Investing", companies: "Groww, Zerodha, Kuvera, Smallcase, INDmoney", pmFocus: "Trading UX, portfolio management, SIP flows, onboarding KYC, retention through education" },
  { sector: "Neo-banking", companies: "Jupiter, Fi Money, Niyo, Open", pmFocus: "Account onboarding, multi-bank views, smart savings, loan integrations, millennial UX" },
  { sector: "Insurance", companies: "Acko, Digit, Plum, Ditto", pmFocus: "Policy buying flows, claims UX, underwriting automation, digital-first product design" },
  { sector: "Credit / Cards", companies: "CRED, OneCard, Slice, Uni", pmFocus: "Rewards mechanics, bill pay, credit-line products, premium user retention" },
];

const DOMAIN_TERMS = [
  { term: "UPI (Unified Payments Interface)", def: "Real-time payment system by NPCI. India's dominant consumer payment rail (10B+ monthly transactions)." },
  { term: "NEFT / IMPS / RTGS", def: "Inter-bank fund transfer rails. NEFT is batch-processed; IMPS is instant; RTGS is for large real-time transfers." },
  { term: "MDR (Merchant Discount Rate)", def: "Fee merchants pay per transaction. Mostly 0% on UPI (regulated) and 1–3% on cards." },
  { term: "KYC (Know Your Customer)", def: "Mandatory customer identity verification. Affects onboarding friction significantly." },
  { term: "Underwriting", def: "Assessing creditworthiness of a borrower. Can be rule-based, credit-bureau-based, or ML-based." },
  { term: "NPA (Non-Performing Asset)", def: "Loan on which interest/principal hasn't been paid for 90+ days. Core risk metric in lending." },
  { term: "Payment Success Rate (PSR)", def: "% of attempted transactions that complete. Health metric for payment products." },
  { term: "Chargeback", def: "Customer disputes a transaction. High rates indicate fraud or checkout UX issues." },
  { term: "Tokenisation", def: "Replacing sensitive card data with tokens for secure storage. Now mandatory in India." },
  { term: "RBI Sandbox", def: "Regulatory environment for testing fintech innovations. Major path for new fintech products." },
];

const INTERVIEW_QUESTIONS = [
  "Payment success rate drops from 94% to 89% over a week. Walk me through your diagnosis.",
  "How would you design a product for first-time credit card users in India?",
  "Design a lending product for gig workers. What's different from a salaried worker loan?",
  "How would you improve UPI Autopay adoption for SaaS businesses?",
  "A merchant is threatening to churn because your checkout has 2% lower conversion than a competitor. What do you do?",
  "How would you think about RBI's new tokenisation mandate as a payments PM?",
];

const FAQS = [
  {
    q: "Do I need a finance background to be a fintech PM?",
    a: "No — but you need to learn the domain. Many successful fintech PMs come from engineering, consulting, or consumer tech backgrounds. The learning curve is 3–6 months to be credible, 12 months to be strong. You need to understand: payment rails, credit concepts, regulatory landscape (RBI, SEBI), and unit economics. CFA or MBA helps but isn't required.",
  },
  {
    q: "Which fintech sub-sector is the best for a PM career?",
    a: "Payments has the most PM roles and fastest growth but commoditising margins. Lending has higher complexity and compensation but cyclical risk. Wealth is growing fast (new retail investors) with strong retention dynamics. Neo-banking is competitive but well-funded. Choose based on: what users you find interesting (merchants vs individuals vs institutions) and your risk appetite (regulated maturity vs startup volatility).",
  },
  {
    q: "What's the salary range for fintech PMs in India?",
    a: "Roughly: APM/PM at Razorpay/PhonePe/Groww ₹25–55L. Senior PM at top fintechs ₹55–100L. Principal/Director at growth-stage fintechs ₹1–2Cr+ including equity. Fintech PM salaries are typically 10–20% above average tech company PM salaries due to domain premium and revenue concentration per PM.",
  },
];

export default function FintechProductManagerPage() {
  const dates = pageDates("/fintech-product-manager");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Fintech Product Manager", url: `${SITE_URL}/fintech-product-manager` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Fintech Product Manager Guide (2026 Edition)",
        description:
          "The complete guide to becoming a fintech PM in India. Domain knowledge to master, top companies hiring, interview questions, salary ranges, and how to break in from adjacent roles.",
        image: `${SITE_URL}/api/og?title=Fintech+Product+Manager+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/fintech-product-manager`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>💳</span> India&apos;s highest-paying PM specialisation — if you learn the domain
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Fintech Product Manager Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Fintech product management in India spans six sub-sectors — payments, lending, wealth
            and investing, neo-banking, insurance, and credit/cards — each with its own focus,
            from UPI innovation and fraud prevention in payments to underwriting models and NPA
            reduction in lending, and pays a premium: APM/PM roles run ₹25–55L, senior PM
            ₹55–100L, and principal/director ₹1–2Cr+ at growth-stage companies.
          </p>
          <p className="text-sm text-white/50 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The complete fintech PM playbook for India — sub-sectors, companies hiring,
            domain terms you must know, interview questions, and salary ranges.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Start Fintech PM Prep — Free →
          </Link>
        </section>

        {/* Sub-sectors */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">Fintech Sub-Sectors Hiring PMs in India</h2>
          <div className="space-y-4">
            {SUB_SECTORS.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <h3 className="font-bold text-white mb-1">{s.sector}</h3>
                <p className="text-xs text-[#89e219] mb-2">Top companies: {s.companies}</p>
                <p className="text-sm text-white/60">PM focus: {s.pmFocus}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Domain terms */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">10 Fintech Terms Every PM Must Know</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DOMAIN_TERMS.map((item, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-[#89e219] text-sm mb-1">{item.term}</p>
                  <p className="text-xs text-white/60">{item.def}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interview Questions */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-8">Fintech PM Interview Questions</h2>
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
            <ul className="space-y-3">
              {INTERVIEW_QUESTIONS.map((q, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="text-[#89e219] flex-shrink-0 font-bold">{i + 1}.</span>
                  <span className="text-white/70">{q}</span>
                </li>
              ))}
            </ul>
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

        <RelatedPages slug="fintech-product-manager" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Fintech PM Intuition Daily</h2>
          <p className="text-white/60 mb-6">Payments, lending, wealth — daily PM scenarios across every fintech sub-sector.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
