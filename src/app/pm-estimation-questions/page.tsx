import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Estimation Questions (2026) — Guesstimates, Market Sizing & Tips",
  description:
    "Crack PM estimation questions. Step-by-step framework, 20+ practice questions with model answers, and the common traps that ruin otherwise good estimates.",
  keywords: [
    "PM estimation questions", "guesstimate PM interview",
    "market sizing PM", "how to solve guesstimates product manager",
    "PM estimation interview framework 2026",
  ],
  alternates: { canonical: "/pm-estimation-questions" },
  openGraph: {
    title: "PM Estimation Questions 2026 — PM Streak",
    description: "Guesstimate framework, 20+ practice questions, and tips for PM estimation interviews.",
    url: `${SITE_URL}/pm-estimation-questions`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Estimation+Questions+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Estimation Questions 2026 — PM Streak",
    description: "Guesstimate framework, 20+ practice questions, and tips for PM estimation interviews.",
    images: [`${SITE_URL}/api/og?title=PM+Estimation+Questions+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const FRAMEWORK = [
  { step: "Clarify", detail: "Ask 1–2 questions to constrain the problem. Geography? Time window? User segment?" },
  { step: "Decompose", detail: "Break the problem into smaller sub-problems. Use top-down OR bottom-up logic." },
  { step: "State Assumptions", detail: "Announce every assumption as you go. Interviewers grade your logic, not your numbers." },
  { step: "Calculate", detail: "Do the math out loud. Round to clean numbers. Don't get lost in precision." },
  { step: "Sanity Check", detail: "Compare your answer against a real-world reference. Does it feel right?" },
];

const WORKED = {
  q: "How many orders does Zepto deliver in a day in Bangalore?",
  steps: [
    { label: "Clarify", content: "'Zepto operates in Bangalore metro, across ~100 dark stores. Should I estimate total daily orders across all of them?' Interviewer: yes." },
    { label: "Decompose", content: "Total daily orders = (# dark stores) × (orders per store per day)" },
    { label: "Assumptions", content: "~100 stores in Bangalore. Each store serves a 2 km radius with ~20,000 potential customers. ~5% order on Zepto on any given day = 1,000 customers. Average order frequency for an active user: 3x/week = 0.4 orders/day per active user." },
    { label: "Calculate", content: "Active users per store ≈ 1,000. Orders per store per day ≈ 1,000 × 0.4 = 400. Total Bangalore orders ≈ 100 × 400 = 40,000/day." },
    { label: "Sanity Check", content: "Zepto publicly reports ~2M orders/day nationally across ~10 cities. Bangalore is a top market, likely 15–20% share = 300–400K. My estimate of 40K is ~10x low — I probably underestimated store count or active user share. Revised: ~200 stores × ~2,000 orders/day = 400K. Matches reality." },
  ],
};

const CATEGORIES = [
  {
    category: "Consumer Product Sizing",
    icon: "📱",
    questions: [
      "How many WhatsApp messages are sent in India per day?",
      "Estimate the number of active Instagram users in India.",
      "How many rides does Ola/Uber complete in Mumbai on a weekday?",
      "Estimate the annual revenue of Zomato in Bangalore.",
      "How many searches does Google process from India per day?",
    ],
  },
  {
    category: "Market / Industry Sizing",
    icon: "📊",
    questions: [
      "What's the total addressable market for online education in India?",
      "Estimate the size of the quick commerce market in Tier-1 Indian cities.",
      "How big is the fintech lending market for SMBs in India?",
      "What's the TAM for a PM learning platform in India?",
      "Estimate the number of SaaS companies in India.",
    ],
  },
  {
    category: "Operational / Workload Sizing",
    icon: "⚙️",
    questions: [
      "How many delivery partners does Swiggy need during 8–9 PM in Mumbai?",
      "Estimate the number of customer support tickets PhonePe receives per day.",
      "How many servers does Netflix need to stream to 10M users simultaneously?",
      "Estimate the number of bugs in production for a typical PM Streak-scale startup at any moment.",
      "How many delivery orders does Amazon process in India during Big Billion Days peak hour?",
    ],
  },
  {
    category: "Unusual / Creative",
    icon: "🎨",
    questions: [
      "How many chai cups are sold in Mumbai in a day?",
      "Estimate the total TV ad spend for FMCG in India.",
      "How many pages of A4 paper are printed in Indian offices per year?",
      "Estimate the number of PMs in India.",
      "How many pet dogs are there in Indian metros?",
    ],
  },
];

const COMMON_TRAPS = [
  { trap: "Starting with math before structure", fix: "Spend the first 60 seconds on decomposition. Numbers without structure always fail." },
  { trap: "Not stating assumptions explicitly", fix: "'Assuming X = Y' — say this every single time. Silent assumptions cost points even if they're correct." },
  { trap: "Rounding too late", fix: "Round to clean numbers early. 14.3% becomes 15%. 3,847 becomes 4,000. Precision wastes time and obscures logic." },
  { trap: "Skipping the sanity check", fix: "Always end with 'let me check this against reality.' Compare to a known fact. Adjust if off by >3x." },
  { trap: "Using the wrong denominator", fix: "'% of Indians' vs '% of internet users' vs '% of smartphone users' produce wildly different answers. Name the denominator clearly." },
  { trap: "Ignoring weekday/weekend, peak/off-peak", fix: "For operational estimates, always consider time-of-day and day-of-week. Peaks can be 3–5x averages." },
];

const FAQS = [
  {
    q: "Do interviewers care if my estimation number is accurate?",
    a: "Not really — they care about structure and logic. An answer of 40K when the real number is 400K is fine IF your reasoning was sound and you caught the error in the sanity check. An answer of 400K with no structure is worse than 40K with clear reasoning. Interviewers are hiring for how you think, not for encyclopedic knowledge.",
  },
  {
    q: "Should I use top-down or bottom-up estimation?",
    a: "Both are valid. Top-down: start with population (e.g. 1.4B Indians), filter by relevance (urban, smartphone users, etc.). Bottom-up: start with an atomic unit (e.g. one delivery per store per hour) and scale up. Best practice: do one approach thoroughly, then cross-check with the other if time permits. Matching results across both methods is a strong signal.",
  },
  {
    q: "Are estimation questions being phased out of PM interviews?",
    a: "Less common than in 2020, but still tested at Flipkart, Amazon, Meta, and many Indian tech companies. Where they appear, they're often a screening tool — a candidate who can't structure an estimation question signals weakness in structured thinking. Worth preparing for even if your target company 'doesn't do guesstimates' — they often slip into case studies.",
  },
];

export default function PmEstimationQuestionsPage() {
  const dates = pageDates("/pm-estimation-questions");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Estimation Questions", url: `${SITE_URL}/pm-estimation-questions` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Estimation Questions (2026 Edition)",
        description:
          "Crack PM estimation questions. Step-by-step framework, 20+ practice questions with model answers, and the common traps that ruin otherwise good estimates.",
        image: `${SITE_URL}/api/og?title=PM+Estimation+Questions+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-estimation-questions`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔢</span> The answer doesn&apos;t matter. The structure does.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Estimation Questions<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            To solve a PM estimation question, work through five steps: clarify the scope, decompose the problem,
            state every assumption out loud, calculate with clean rounded numbers, and sanity-check against a
            real-world reference. Interviewers grade the structure of your logic, not the accuracy of the final
            number — companies like Flipkart, Amazon, and Meta still use guesstimates to screen for structured thinking.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The 5-step estimation framework, 20+ practice questions across 4 categories,
            a fully worked example, and the 6 traps that ruin otherwise good answers.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice Estimation Daily — Free →
          </Link>
        </section>

        {/* Framework */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">The 5-Step Framework</h2>
          <div className="space-y-3">
            {FRAMEWORK.map((f, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <div className="flex gap-4 items-start">
                  <span className="w-8 h-8 rounded-full bg-[#58cc02]/20 text-[#89e219] font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                  <div>
                    <p className="font-semibold text-white mb-1">{f.step}</p>
                    <p className="text-sm text-white/60">{f.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Worked example */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-3">Worked Example</h2>
            <p className="text-sm text-[#89e219] text-center mb-8 italic">&ldquo;{WORKED.q}&rdquo;</p>
            <div className="space-y-3">
              {WORKED.steps.map((s, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                  <p className="text-xs text-[#89e219] font-bold uppercase tracking-wider mb-2">Step {i + 1}: {s.label}</p>
                  <p className="text-sm text-white/70">{s.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Question categories */}
        <section className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">20+ Practice Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CATEGORIES.map(cat => (
              <div key={cat.category} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">{cat.icon}</span>
                  <h3 className="font-semibold text-white text-sm">{cat.category}</h3>
                </div>
                <ul className="space-y-2">
                  {cat.questions.map((q, i) => (
                    <li key={i} className="flex gap-2 text-sm">
                      <span className="text-white/30 flex-shrink-0">{i + 1}.</span>
                      <span className="text-white/70">{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Common traps */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Traps That Ruin Good Estimates</h2>
            <div className="space-y-3">
              {COMMON_TRAPS.map((t, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <div className="flex gap-3 items-start">
                    <span className="text-red-400 text-sm flex-shrink-0 mt-0.5">❌</span>
                    <div>
                      <p className="text-sm text-white/70 mb-1">{t.trap}</p>
                      <p className="text-sm text-green-400">→ {t.fix}</p>
                    </div>
                  </div>
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

        <RelatedPages slug="pm-estimation-questions" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Estimation Fluency in 2 Minutes a Day</h2>
          <p className="text-white/60 mb-6">Daily guesstimates with AI-guided feedback on your structure and logic.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
