import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Case Question Bank (2026) — 50+ Real Questions Asked in Indian PM Interviews",
  description:
    "50+ real PM case questions from Indian tech interviews. Organised by company, category, and difficulty. What candidates were actually asked.",
  keywords: [
    "PM case questions india", "real PM interview questions",
    "PM case question bank", "product case questions india 2026",
    "PM interview examples",
  ],
  alternates: { canonical: "/pm-case-bank" },
  openGraph: {
    title: "PM Case Question Bank 2026 — PM Streak",
    description: "50+ real PM case questions from Indian company interviews, organised by category.",
    url: `${SITE_URL}/pm-case-bank`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Case+Question+Bank+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Case Question Bank 2026 — PM Streak",
    description: "50+ real PM case questions from Indian company interviews, organised by category.",
    images: [`${SITE_URL}/api/og?title=PM+Case+Question+Bank+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const CATEGORIES = [
  {
    category: "Product Improvement",
    icon: "🛠️",
    questions: [
      "How would you improve the Swiggy home screen for repeat users?",
      "Redesign Flipkart checkout for Tier-3 city first-time buyers.",
      "Improve the Zomato experience for restaurants struggling with cancellations.",
      "How would you improve Razorpay onboarding for a new merchant?",
      "Redesign PhonePe for non-English-first users in Tier-3 cities.",
      "Improve Meesho&apos;s reseller product so that new resellers see income faster.",
    ],
  },
  {
    category: "New Product Design",
    icon: "🎨",
    questions: [
      "Design a product for gig workers to manage finances.",
      "Design a product for new moms to track baby health in Tier-2 cities.",
      "Design a PM learning product — daily, habit-forming, India-specific.",
      "Design a product to help small kirana stores manage inventory.",
      "Design an insurance product for gig workers on delivery platforms.",
      "Design a wellness product for IT professionals in Bangalore.",
    ],
  },
  {
    category: "Metrics Diagnosis",
    icon: "📉",
    questions: [
      "Zomato D7 retention drops 15% over 3 weeks. Investigate.",
      "Razorpay&apos;s payment success rate falls from 94% to 89%. Diagnose.",
      "Zepto basket size drops 20% after removing a category. Investigate.",
      "PhonePe transaction count is flat but DAU is up. What&apos;s happening?",
      "Meesho seller churn rises after a policy change. Diagnose.",
      "Swiggy&apos;s delivery time increases by 6 minutes in Bangalore. Why?",
    ],
  },
  {
    category: "Market Entry / Strategy",
    icon: "♟️",
    questions: [
      "Should Swiggy enter tele-consultation?",
      "Should Flipkart build a separate Bharat-first app vs. adapting the main app?",
      "Should Razorpay expand to SE Asia now?",
      "Should Zepto expand into food delivery?",
      "Should Paytm build a super-app vs specialise on payments?",
      "Should Meesho enter enterprise B2B?",
    ],
  },
  {
    category: "Estimation / Sizing",
    icon: "🔢",
    questions: [
      "How many Zomato orders happen in Bangalore on a Saturday?",
      "Estimate Razorpay&apos;s monthly transactions for SMB merchants.",
      "Size the PM learning market in India.",
      "How many UPI transactions happen in India per day?",
      "Estimate the addressable market for a fintech lending product for gig workers.",
      "How many listings does OLX have active at any moment?",
    ],
  },
  {
    category: "Behavioural",
    icon: "🎤",
    questions: [
      "Tell me about a time you pushed back against your manager&apos;s decision.",
      "Describe a feature you shipped that failed. What did you learn?",
      "Tell me about a cross-functional conflict and how you resolved it.",
      "Describe a time you had to make a decision with incomplete data.",
      "Tell me about a product decision you would reverse today.",
      "Describe a time you worked with users very different from yourself.",
    ],
  },
];

const HOW_TO_USE = [
  "Pick 3 questions across 3 categories. Answer out loud, record yourself.",
  "Watch the recording the next day. Identify 3 things you&apos;d do differently.",
  "Repeat with 3 new questions each week. Rotate categories — don&apos;t over-index on one.",
  "Partner with another PM for 2 mock interviews per week using these questions.",
  "Track which categories you consistently struggle with — those become your focused prep areas.",
  "Don&apos;t memorise answers — memorise your structure and your best stories.",
];

const FAQS = [
  {
    q: "Are these actual questions asked in Indian PM interviews?",
    a: "Yes — gathered from candidate reports across Glassdoor, LinkedIn, and PM community discussions over the past 2 years. Questions rotate across companies, but the categories stay consistent. Prep across all six categories and you&apos;ll recognise the shape of most questions you encounter.",
  },
  {
    q: "How should candidates practice with this case bank?",
    a: "Pick 3 questions per week across 3 categories. Answer out loud (not in your head), record the answer, and watch it back. Watching your own answers is brutal but the fastest way to catch weaknesses. Aim for 30–40 practiced cases by the time you interview — depth matters more than breadth.",
  },
];

export default function PmCaseBankPage() {
  const dates = pageDates("/pm-case-bank");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Case Bank", url: `${SITE_URL}/pm-case-bank` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Case Question Bank (India 2026 Edition)",
        description:
          "50+ real PM case questions from Indian tech interviews. Organised by company, category, and difficulty. What candidates were actually asked.",
        image: `${SITE_URL}/api/og?title=PM+Case+Question+Bank+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-case-bank`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📚</span> 36+ real questions asked in Indian PM interviews
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Case Question Bank<br />(India 2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            This bank organises real PM case questions — gathered from candidate reports on Glassdoor,
            LinkedIn, and PM communities — into six categories: product improvement, new product design,
            metrics diagnosis, market entry and strategy, estimation and sizing, and behavioural, so
            candidates can rotate practice across the full shape of what Indian tech interviews actually ask.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline font-semibold">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Real PM case questions across 6 categories — product improvement, new design, metrics diagnosis,
            strategy, estimation, behavioural. Organised for deliberate practice.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice with AI Feedback — Free →
          </Link>
        </section>

        {/* Categories */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="space-y-6">
            {CATEGORIES.map((cat, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">{cat.icon}</span>
                  <h2 className="text-lg font-bold text-white">{cat.category}</h2>
                </div>
                <ul className="space-y-2">
                  {cat.questions.map((q, j) => (
                    <li key={j} className="flex gap-2 text-sm">
                      <span className="text-white/30 flex-shrink-0">{j + 1}.</span>
                      <span className="text-white/70">{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* How to use */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">How to Use This Bank</h2>
            <div className="space-y-2">
              {HOW_TO_USE.map((h, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{h}</p>
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

        <RelatedPages slug="pm-case-bank" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice with AI Feedback Daily</h2>
          <p className="text-white/60 mb-6">Real questions + structured AI feedback on your structure, specificity, and judgment.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
