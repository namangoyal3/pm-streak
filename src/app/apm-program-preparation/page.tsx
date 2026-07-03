import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "APM Program Preparation Guide India (2026) — Flipkart, Razorpay, Google",
  description:
    "Crack APM programs in India with this complete prep guide. Flipkart Product Accelerator, Razorpay APM, Google APMM, Meesho, Swiggy — timeline, rounds, tips, and daily practice.",
  keywords: [
    "APM program india", "APM program preparation", "flipkart APM", "razorpay APM",
    "google APMM india", "associate product manager program", "how to crack APM interview",
    "APM interview preparation india 2026",
  ],
  alternates: { canonical: "/apm-program-preparation" },
  openGraph: {
    title: "APM Program Preparation India 2026 — PM Streak",
    description: "Complete guide to cracking APM programs at Flipkart, Razorpay, Google, Meesho, and Swiggy.",
    url: `${SITE_URL}/apm-program-preparation`,
    images: [{ url: `${SITE_URL}/api/og?title=APM+Program+Preparation+India+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "APM Program Preparation India 2026 — PM Streak",
    description: "Complete guide to cracking APM programs at Flipkart, Razorpay, Google, Meesho, and Swiggy.",
    images: [`${SITE_URL}/api/og?title=APM+Program+Preparation+India+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PROGRAMS = [
  {
    company: "Flipkart",
    program: "Product Accelerator Program",
    batch: "Aug–Sep 2026",
    duration: "12 months",
    salary: "₹25–32L",
    rounds: ["Online Test (Product + Analytical)", "Product Case Round 1", "Product Case Round 2", "Behavioural + Leadership"],
    tip: "Flipkart heavily tests execution and prioritisation. Practice backlog grooming and trade-off questions. Know Flipkart's product ecosystem well.",
  },
  {
    company: "Razorpay",
    program: "Associate Product Manager",
    batch: "Jul–Aug 2026",
    duration: "18 months",
    salary: "₹22–28L",
    rounds: ["Resume Screening", "Product Thinking Round", "Metrics & Analytics Round", "Founder Round"],
    tip: "Razorpay values first-principles thinking over framework regurgitation. Know fintech concepts: payment rails, reconciliation, merchant needs.",
  },
  {
    company: "Google India",
    program: "Associate Product Manager (APMM)",
    batch: "Oct–Dec 2026",
    duration: "2 years rotational",
    salary: "₹28–35L",
    rounds: ["Recruiter Screen", "Phone Screen (Product + Technical)", "On-site: 5 rounds (Product Sense, Technical, Behavioural x2, Googliness)"],
    tip: "Google's product sense bar is extremely high. Structure every answer. Show strong user empathy. Know Google's product principles and moonshot thinking.",
  },
  {
    company: "Meesho",
    program: "Product Manager (Fresher)",
    batch: "Jun–Jul 2026",
    duration: "—",
    salary: "₹20–26L",
    rounds: ["Online Assessment", "Product Case", "Behavioural + Culture Fit"],
    tip: "Meesho focuses on Bharat users (tier-2/3 cities). Show empathy for price-sensitive, low-literacy users. Know how social commerce works.",
  },
  {
    company: "Swiggy",
    program: "Associate Product Manager",
    batch: "Aug 2026",
    duration: "—",
    salary: "₹20–28L",
    rounds: ["Product Thinking Assessment", "Case Study", "PM Stakeholder Round"],
    tip: "Swiggy tests execution under ambiguity — fast-paced ops decisions. Know delivery logistics, supply-demand balancing, and restaurant growth.",
  },
];

const FAQS = [
  {
    q: "When do APM programs in India recruit?",
    a: "Most Indian APM programs recruit annually: Google APMM (Oct–Dec), Flipkart (Aug–Sep), Razorpay (Jul–Aug), Swiggy/Meesho (Jun–Aug). Applications typically open 3–4 months before the joining date. Set up alerts and start preparing 6 months in advance.",
  },
  {
    q: "What GPA or college does an APM need from?",
    a: "Top programs have no hard GPA cutoff but shortlisting favours candidates from IIT, NIT, BITS, and top MBA programs. That said, a strong product portfolio and case study performance can overcome pedigree — especially at product-first companies like Razorpay and Meesho.",
  },
  {
    q: "How is an APM interview different from a senior PM interview?",
    a: "APM interviews focus more on raw product thinking and potential — they're not expecting 5 years of shipped features. They want to see: structured thinking, user empathy, intellectual curiosity, and a learning mindset. Behavioural rounds weight more heavily than at senior levels.",
  },
  {
    q: "How many APM spots are available in India each year?",
    a: "Approximately 150–300 APM spots open annually across all major Indian product companies. Flipkart takes 15–30 per cohort, Google APMM takes 5–10, and Razorpay/Meesho/Swiggy take 5–15 each. Competition is intense — preparation quality is the primary differentiator.",
  },
];

export default function ApmProgramPreparationPage() {
  const dates = pageDates("/apm-program-preparation");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "APM Program Preparation", url: `${SITE_URL}/apm-program-preparation` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "APM Program Prep Guide India (2026 Edition)",
        description:
          "Crack APM programs in India with this complete prep guide. Flipkart Product Accelerator, Razorpay APM, Google APMM, Meesho, Swiggy — timeline, rounds, tips, and daily practice.",
        image: `${SITE_URL}/api/og?title=APM+Program+Preparation+India+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/apm-program-preparation`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🚀</span> 150–300 APM spots · 10,000+ applicants · Prep matters
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            APM Program Prep Guide India<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            India&apos;s major APM programs — Flipkart&apos;s Product Accelerator, Razorpay APM, Google APMM, Meesho,
            and Swiggy — open roughly 150–300 spots a year against 10,000+ applicants. Recruiting runs annually
            between June and December, with each process mixing online assessments, product case rounds, and
            behavioural interviews. Start preparing about six months before applications open.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Everything you need to crack APM programs at Flipkart, Razorpay, Google, Meesho, and Swiggy —
            timelines, rounds, company-specific tips, and how to build your daily prep habit.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/signup" className="bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
              Start APM Prep — Free
            </Link>
            <Link href="/interview-prep" className="bg-white/10 hover:bg-white/15 text-white font-semibold px-8 py-3 rounded-xl transition-colors">
              Practice a Question →
            </Link>
          </div>
        </section>

        {/* Program Cards */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">Top APM Programs in India</h2>
          <div className="space-y-6">
            {PROGRAMS.map((p) => (
              <div key={p.company} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">{p.company}</h3>
                    <p className="text-sm text-[#89e219]">{p.program}</p>
                  </div>
                  <div className="flex gap-3 text-xs">
                    <span className="bg-[#1f2228] border border-white/10 rounded-full px-3 py-1 text-white/60">{p.batch}</span>
                    <span className="bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1 text-green-400">{p.salary}</span>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Interview Rounds</p>
                  <div className="flex flex-wrap gap-2">
                    {p.rounds.map((r, i) => (
                      <span key={i} className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1 text-white/60">
                        {i + 1}. {r}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-[#0e1113] border border-[#58cc02]/20 rounded-xl px-4 py-3">
                  <p className="text-xs text-[#89e219] font-medium mb-1">💡 Prep Tip</p>
                  <p className="text-sm text-white/60">{p.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
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

        <RelatedPages slug="apm-program-preparation" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Start Preparing for APM Season</h2>
          <p className="text-white/60 mb-6">Daily 2-minute PM lessons. AI practice questions. Interview readiness score.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
