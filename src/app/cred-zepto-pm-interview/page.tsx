import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "CRED & Zepto PM Interview Guide (2026) — Questions, Culture & Prep",
  description:
    "Crack PM interviews at CRED and Zepto. What each company values, their interview formats, real questions, and what separates candidates who get offers at India's hottest unicorns.",
  keywords: [
    "CRED PM interview", "Zepto PM interview", "CRED product manager interview questions",
    "Zepto product manager interview", "unicorn startup PM interview India",
    "CRED PM prep", "Zepto PM prep 2026",
  ],
  alternates: { canonical: "/cred-zepto-pm-interview" },
  openGraph: {
    title: "CRED & Zepto PM Interview Guide 2026 — PM Streak",
    description: "What CRED and Zepto look for in PMs, real questions, and how to prep.",
    url: `${SITE_URL}/cred-zepto-pm-interview`,
    images: [{ url: `${SITE_URL}/api/og?title=CRED+&+Zepto+PM+Interview+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "CRED & Zepto PM Interview Guide 2026 — PM Streak",
    description: "What CRED and Zepto look for in PMs, real questions, and how to prep.",
    images: [`${SITE_URL}/api/og?title=CRED+&+Zepto+PM+Interview+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const COMPANIES = [
  {
    name: "CRED",
    tagline: "India's most design-obsessed fintech",
    logo: "💳",
    culture: "CRED is famous for its extreme design sensibility, dark-mode-first UI, and credit card reward experience built for affluent Indians. PMs at CRED must obsess over craft — pixel-level quality, copy tone, and the feeling of delight in every interaction.",
    users: "Premium credit card holders in metro India (HNI and upper-middle class). Not mass market — CRED deliberately serves a narrow, high-value segment.",
    uniqueBar: "Design taste + premium user empathy + fintech depth",
    rounds: [
      { name: "Product Design Round", q: ["How would you redesign the CRED rewards discovery experience?", "Design a product for CRED members to manage multiple credit cards.", "How would you improve CRED's bill payment UX to feel less transactional?"], tip: "CRED will judge your answer's aesthetic reasoning, not just logic. Mention copy, visual hierarchy, and the emotional feel of the experience — not just functionality." },
      { name: "Analytical / Business Round", q: ["CRED's MAU is flat but transactions per user is growing. Is this good or bad?", "How would you measure the success of CRED's new insurance product?", "CRED's referral program isn't working. Diagnose and propose a fix."], tip: "CRED monetises through merchant offers and financial products. Show you understand how a premium user's spending behaviour is valuable to merchants — that's CRED's core business model." },
      { name: "Behavioural / Culture Round", q: ["Tell me about a product you think is beautifully designed. What makes it so?", "Describe a time you pushed back against shipping something that wasn't up to your quality bar.", "What product decision are you most proud of in terms of craft and execution?"], tip: "CRED will assess whether you care about craft intrinsically. Candidates who only talk about metrics and miss the aesthetic dimension don't fit the culture." },
    ],
  },
  {
    name: "Zepto",
    tagline: "India's fastest-growing quick commerce",
    logo: "⚡",
    culture: "Zepto is a high-velocity, execution-obsessed quick commerce startup. PMs operate like mini-CEOs of their category — with direct P&L responsibility, close collaboration with ops, and extremely fast feedback loops from daily order data.",
    users: "Urban, time-pressed consumers in 10+ Indian cities. Primary use case: urgent grocery and household needs delivered in 10 minutes.",
    uniqueBar: "Ops thinking + execution speed + data obsession",
    rounds: [
      { name: "Product + Ops Case Round", q: ["Zepto's 10-minute SLA is breached in Bangalore on weekends. How do you fix it?", "How would you improve Zepto's dark store picking experience to reduce errors?", "Design a loyalty product for Zepto that increases order frequency without margin erosion."], tip: "Zepto questions blend product and ops. The best answers consider supply constraints (dark store capacity, rider availability) as first-class inputs — not afterthoughts." },
      { name: "Metrics & Growth Round", q: ["Zepto's basket size drops 20% after removing a category. How do you diagnose?", "Define the north star metric for Zepto's grocery category vs household essentials.", "How would you measure and improve Zepto's 7-day repeat order rate?"], tip: "Zepto has extremely rich real-time data. Show comfort with quick commerce-specific metrics: fill rate, substitution rate, SLA breach rate, dark store utilisation." },
      { name: "Execution & Prioritisation Round", q: ["You have 3 engineering sprints. What do you build: a better search, faster checkout, or personalised recommendations?", "Zepto wants to expand to Tier-2 cities. What product changes are needed?", "A major vendor partners with a competitor. How does this affect your roadmap?"], tip: "Zepto moves extremely fast. Show that you can make good-enough decisions quickly rather than perfect decisions slowly. Speed of iteration is a cultural value, not just a goal." },
    ],
  },
];

const FAQS = [
  {
    q: "Is CRED a good early-career PM destination?",
    a: "Yes — but the bar is high. CRED's small PM team means each PM owns a significant surface area, giving early-career PMs more ownership than they'd get at larger companies. The tradeoff: CRED's design-first culture and premium user base is a specific lens that's highly transferable to premium consumer tech but less so to mass market or B2B roles.",
  },
  {
    q: "Is Zepto PM experience valued in the market?",
    a: "Extremely — quick commerce is one of the fastest-growing and operationally complex segments in India. Zepto PMs develop unusually strong ops-product fluency and comfort with real-time, high-velocity data. This is highly valued at other quick commerce, delivery, and marketplace companies. Zepto alumni are actively recruited by Blinkit, Swiggy Instamart, and horizontals like Amazon and Flipkart.",
  },
  {
    q: "How do CRED and Zepto compare as PM employers?",
    a: "Very different cultures despite being peers by funding stage. CRED: slower-paced, design-obsessed, smaller team, premium brand. Zepto: extremely fast-paced, ops-heavy, high ownership, hypergrowth. Choose based on what you want to build: CRED for craft and premium consumer experience, Zepto for execution muscle and ops-product thinking.",
  },
];

export default function CredZeptoPmInterviewPage() {
  const dates = pageDates("/cred-zepto-pm-interview");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "CRED & Zepto PM Interview", url: `${SITE_URL}/cred-zepto-pm-interview` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "CRED & Zepto PM Interview Guide (2026 Edition)",
        description:
          "Crack PM interviews at CRED and Zepto. What each company values, their interview formats, real questions, and what separates candidates who get offers at India's hottest unicorns.",
        image: `${SITE_URL}/api/og?title=CRED+&+Zepto+PM+Interview+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/cred-zepto-pm-interview`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🦄</span> Two very different unicorns. Two very different bars.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            CRED & Zepto PM Interview Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            CRED and Zepto each run three PM rounds but assess opposite bars. CRED pairs a product
            design round with analytical and culture rounds, judging aesthetic reasoning,
            premium-user empathy, and fintech depth. Zepto combines a product-plus-ops case, a
            metrics and growth round, and an execution round, probing ops thinking, decision speed,
            and data obsession.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            What each company actually values in a PM, their interview formats, real questions asked,
            and how to position yourself for India&apos;s most competitive unicorn PM roles.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Start Unicorn PM Prep — Free →
          </Link>
        </section>

        {/* Company sections */}
        {COMPANIES.map((company) => (
          <section key={company.name} className="max-w-4xl mx-auto px-4 pb-16">
            <div className="bg-[#111] border border-white/10 rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{company.logo}</span>
                <div>
                  <h2 className="text-2xl font-bold text-white">{company.name}</h2>
                  <p className="text-sm text-[#89e219]">{company.tagline}</p>
                </div>
              </div>
              <p className="text-sm text-white/70 mb-4">{company.culture}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-[#0e1113] rounded-lg p-3">
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Target User</p>
                  <p className="text-xs text-white/60">{company.users}</p>
                </div>
                <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-lg p-3">
                  <p className="text-xs text-[#89e219] mb-1">🎯 Unique PM bar</p>
                  <p className="text-xs text-white/60">{company.uniqueBar}</p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              {company.rounds.map((round, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-6 h-6 rounded-full bg-[#58cc02]/20 text-[#89e219] text-xs font-bold flex items-center justify-center">{i + 1}</span>
                    <h3 className="font-semibold text-white">{round.name}</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Sample Questions</p>
                      <ul className="space-y-1.5">
                        {round.q.map((q, j) => (
                          <li key={j} className="flex gap-2 text-sm">
                            <span className="text-white/30">•</span>
                            <span className="text-white/70">{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-xl p-3">
                      <p className="text-xs text-[#89e219] mb-1">💡 Tip</p>
                      <p className="text-sm text-white/60">{round.tip}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

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

        <RelatedPages slug="cred-zepto-pm-interview" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice for India&apos;s Most Competitive PM Roles</h2>
          <p className="text-white/60 mb-6">Daily scenarios calibrated to the bar at CRED, Zepto, and India&apos;s top unicorns.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
