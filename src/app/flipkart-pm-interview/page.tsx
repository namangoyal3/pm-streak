import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "Flipkart PM Interview Guide (2026) — Questions, Process & Prep Plan",
  description:
    "Crack the Flipkart PM interview. All interview rounds, real questions asked at Flipkart, what Flipkart PMs say the bar is, and a prep plan for PM and APM roles.",
  keywords: [
    "Flipkart PM interview", "Flipkart product manager interview questions",
    "Flipkart PM interview prep", "Flipkart APM interview", "how to crack Flipkart PM interview",
    "Flipkart product manager interview 2026", "Flipkart PM interview India",
  ],
  alternates: { canonical: "/flipkart-pm-interview" },
  openGraph: {
    title: "Flipkart PM Interview Guide 2026 — PM Streak",
    description: "All Flipkart PM interview rounds, real questions, and a prep plan.",
    url: `${SITE_URL}/flipkart-pm-interview`,
    images: [{ url: `${SITE_URL}/api/og?title=Flipkart+PM+Interview+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flipkart PM Interview Guide 2026 — PM Streak",
    description: "All Flipkart PM interview rounds, real questions, and a prep plan.",
    images: [`${SITE_URL}/api/og?title=Flipkart+PM+Interview+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const ROUNDS = [
  {
    name: "Online Assessment",
    type: "APM / Campus roles",
    what: "Analytical aptitude, product reasoning, and case-based questions. Usually 90 minutes online.",
    sample: [
      "Flipkart wants to improve repeat purchase rate. What would you measure and what would you test?",
      "A seller's satisfaction score drops after a new policy. Diagnose and propose a fix.",
      "Estimate the number of orders Flipkart delivers in a day in Tier-2 cities.",
    ],
    tip: "For estimation questions, show structure — break the problem down, state assumptions clearly, and sanity-check your answer with a real-world reference.",
  },
  {
    name: "Product Thinking Round",
    type: "All PM roles",
    what: "Design a product, improve an existing Flipkart feature, or build a new product for a specific user segment. Heavily execution-focused.",
    sample: [
      "How would you improve the Flipkart seller experience for small businesses?",
      "Design a product that helps first-time online shoppers in Tier-3 cities trust Flipkart.",
      "Flipkart wants to expand into grocery. How would you build the product?",
    ],
    tip: "Flipkart tests execution thinking, not just strategy. For every solution, be ready to answer: 'How would you actually build and launch this in 3 months?'",
  },
  {
    name: "Metrics & Analytical Round",
    type: "All PM roles",
    what: "Define, track, and diagnose product metrics. Flipkart is a data-heavy company — PMs are expected to drive decisions with rigour.",
    sample: [
      "Flipkart's checkout conversion drops 15% week-on-week. Walk me through your investigation.",
      "Define success metrics for Flipkart's return/refund experience.",
      "How would you measure the impact of adding 'try before you buy' to Flipkart Fashion?",
    ],
    tip: "Know the e-commerce funnel cold: impression → click → PDP → add-to-cart → checkout → purchase → return. Any metric drop maps to this funnel.",
  },
  {
    name: "Execution & Prioritisation Round",
    type: "Experienced PM roles",
    what: "How do you manage a roadmap with competing stakeholders and limited engineering capacity? Flipkart values structured, pragmatic execution thinking.",
    sample: [
      "You have 10 seller pain points. You can fix 2 in Q3. How do you decide which 2?",
      "Sales wants a new B2B feature. Engineering has 30% capacity left this quarter. What do you do?",
      "A critical buyer feature and a critical seller feature need the same engineer. How do you resolve it?",
    ],
    tip: "Show you can say no with data. Flipkart interviewers are suspicious of PMs who always say yes — they want to see you manage trade-offs explicitly.",
  },
  {
    name: "Behavioural & Leadership Round",
    type: "All PM roles",
    what: "Leadership, conflict, failure, and stakeholder management. Flipkart culture values ownership, speed, and data-driven humility.",
    sample: [
      "Tell me about a feature you shipped that didn't perform as expected. What did you do?",
      "Describe a time you pushed back on a direction from leadership.",
      "Tell me about a time you had to coordinate across 3+ teams to ship something.",
    ],
    tip: "Flipkart specifically values ownership — use 'I' not 'we'. Show you personally drove outcomes, not that you were part of a team that did.",
  },
];

const FLIPKART_CONTEXT = [
  { label: "Core business", value: "E-commerce, Meesho (social commerce), Myntra (fashion), Cleartrip (travel), PhonePe (fintech)" },
  { label: "PM culture", value: "Data-first, execution-oriented, high ownership. Fast-moving at startup-within-company level." },
  { label: "Users to know", value: "Tier-2/3 city buyers, first-time online shoppers, small/medium sellers, kirana store owners" },
  { label: "Key metrics", value: "GMV, seller NPS, buyer NPS, repeat purchase rate, return rate, time-to-deliver" },
  { label: "PM interview bar", value: "High for structured thinking; above average for execution; lower than Google for product sense depth" },
];

const FAQS = [
  {
    q: "Is the Flipkart PM interview harder than other Indian companies?",
    a: "It's one of the more rigorous PM interviews in India — comparable to Razorpay and Swiggy. The bar is highest for execution and metrics, and Flipkart PMs are expected to have depth in e-commerce and supply chain context. Less focus on 'moonshot thinking' than Google; more focus on practical, scoped solutions at scale.",
  },
  {
    q: "Do I need to know Flipkart products well before the interview?",
    a: "Yes — more than at most companies. Flipkart interviews frequently involve Flipkart-specific scenarios. Know the buyer and seller journeys well, understand how the logistics and returns experience works, and be familiar with Meesho, Myntra, and PhonePe as adjacent Flipkart businesses.",
  },
  {
    q: "How many rounds does the Flipkart PM interview have?",
    a: "Typically 4–5 rounds: product thinking, metrics/analytical, execution, behavioural, and sometimes a final round with a senior PM or VP. For the APM (Product Accelerator Program), there's also an initial online test. Total timeline: 4–8 weeks from application to offer.",
  },
];

export default function FlipkartPmInterviewPage() {
  const dates = pageDates("/flipkart-pm-interview");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Flipkart PM Interview", url: `${SITE_URL}/flipkart-pm-interview` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Flipkart PM Interview Guide (2026 Edition)",
        description:
          "Crack the Flipkart PM interview. All interview rounds, real questions asked at Flipkart, what Flipkart PMs say the bar is, and a prep plan for PM and APM roles.",
        image: `${SITE_URL}/api/og?title=Flipkart+PM+Interview+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/flipkart-pm-interview`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🛒</span> India&apos;s biggest e-commerce PM interview — decoded
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Flipkart PM Interview Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            The Flipkart PM interview runs 4–5 rounds — product thinking, metrics and analytics,
            execution and prioritisation, and behavioural, with APM candidates facing an online
            assessment first. The bar is highest on execution and metrics: interviewers expect
            e-commerce funnel fluency and Flipkart-specific context on buyers and sellers.
            Expect 4–8 weeks from application to offer.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            All Flipkart PM interview rounds, real questions, what Flipkart PMs say the bar actually is,
            and everything you need to know about the product and culture before you walk in.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/signup" className="bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
              Start Flipkart PM Prep — Free
            </Link>
            <Link href="/apm-program-preparation" className="bg-white/10 hover:bg-white/15 text-white font-semibold px-8 py-3 rounded-xl transition-colors">
              Flipkart APM Guide →
            </Link>
          </div>
        </section>

        {/* Context strip */}
        <section className="max-w-4xl mx-auto px-4 pb-10">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-5">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Know Before You Interview</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {FLIPKART_CONTEXT.map((item, i) => (
                <div key={i} className="flex gap-2 text-sm">
                  <span className="text-[#89e219] font-medium flex-shrink-0">{item.label}:</span>
                  <span className="text-white/60">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interview rounds */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">The Flipkart PM Interview Rounds</h2>
          <div className="space-y-6">
            {ROUNDS.map((round, i) => (
              <div key={round.name} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#58cc02]/20 text-[#89e219] font-bold text-sm flex items-center justify-center">{i + 1}</span>
                    <div>
                      <h3 className="text-lg font-bold text-white">{round.name}</h3>
                      <span className="text-xs text-white/40">{round.type}</span>
                    </div>
                  </div>
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

        <RelatedPages slug="flipkart-pm-interview" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Prep for Flipkart — One Question at a Time</h2>
          <p className="text-white/60 mb-6">Daily PM practice with AI feedback calibrated to Flipkart&apos;s execution and metrics bar.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
