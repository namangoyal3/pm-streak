import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PhonePe PM Interview Guide (2026) — UPI, Payments & Product Questions",
  description:
    "Crack the PhonePe PM interview. All rounds, UPI and payments product questions, merchant vs consumer product thinking, and what PhonePe PMs say the bar is in 2026.",
  keywords: [
    "PhonePe PM interview", "PhonePe product manager interview questions",
    "PhonePe PM interview prep", "UPI PM interview",
    "PhonePe product manager interview 2026", "UPI product manager india",
  ],
  alternates: { canonical: "/phonepe-pm-interview" },
  openGraph: {
    title: "PhonePe PM Interview Guide 2026 — PM Streak",
    description: "All PhonePe PM interview rounds, UPI-specific questions, and a prep plan.",
    url: `${SITE_URL}/phonepe-pm-interview`,
    images: [{ url: `${SITE_URL}/api/og?title=PhonePe+PM+Interview+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PhonePe PM Interview Guide 2026 — PM Streak",
    description: "All PhonePe PM interview rounds, UPI-specific questions, and a prep plan.",
    images: [`${SITE_URL}/api/og?title=PhonePe+PM+Interview+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PHONEPE_CONTEXT = [
  { label: "Core business", value: "UPI payments, mutual funds, insurance, lending, PhonePe for Business (merchants), Pincode (e-commerce)" },
  { label: "PM culture", value: "Scale-obsessed, data-driven, India-first. PMs own category-level outcomes across 500M+ users." },
  { label: "Users to know", value: "Consumers (Tier-1 to Tier-4), merchants (small kirana to enterprise), sellers on Pincode" },
  { label: "Key metrics", value: "Transaction success rate, monthly active users, TPV (total payment value), merchant retention, customer LTV" },
  { label: "Unique context", value: "Dominant UPI player with ~48% market share. Regulatory-sensitive (NPCI caps on UPI share). Walmart-owned." },
];

const ROUNDS = [
  {
    name: "Product Thinking Round",
    what: "Design or improve a PhonePe product. Emphasis on India-specific user empathy — Bharat users, first-time digital payers, low-bandwidth contexts.",
    sample: [
      "How would you design a lending product for PhonePe users in Tier-3 cities?",
      "Improve the PhonePe send-money experience for users who rarely transact.",
      "Design a product that helps PhonePe merchants understand their sales trends without being overwhelmed.",
    ],
    tip: "PhonePe tests whether you think beyond English-speaking urban users. Consider: language support, low-literacy UX, offline fallback, 2G users. Solutions that ignore Bharat context fail this round.",
  },
  {
    name: "Metrics & Analytics Round",
    what: "Define success metrics, diagnose payment failures, or design experiments for PhonePe products.",
    sample: [
      "PhonePe's transaction success rate drops from 95% to 91% week-over-week. Walk through diagnosis.",
      "Define the north star metric for PhonePe's insurance product.",
      "How would you measure the success of adding a new merchant onboarding flow?",
    ],
    tip: "Know the UPI failure taxonomy: bank downtime, user errors (wrong UPI PIN), timeout, risk declines, network issues. PhonePe PMs must segment failures correctly — a 'success rate drop' has very different fixes depending on which bucket grew.",
  },
  {
    name: "Strategy & Business Round",
    what: "Competitive positioning, regulatory thinking (especially NPCI UPI caps), and monetisation strategy.",
    sample: [
      "NPCI enforces a 30% UPI market share cap. How should PhonePe respond?",
      "How should PhonePe think about competing with Google Pay and Paytm?",
      "Where should PhonePe invest next — lending, e-commerce, or wealth?",
    ],
    tip: "PhonePe monetises less from UPI (MDR is regulated near 0) and more from adjacent financial services and merchant products. Strategy answers that assume UPI is a profit centre miss the plot.",
  },
  {
    name: "Behavioural & Ownership Round",
    what: "Stories about leadership, failure, ambiguity, and decision-making at scale.",
    sample: [
      "Tell me about a product decision you made that had unintended consequences for millions of users.",
      "Describe a time you pushed back on a regulatory or compliance constraint.",
      "Tell me about a project where you had to coordinate across 5+ teams.",
    ],
    tip: "PhonePe operates at immense scale — behavioural stories should demonstrate comfort with high-stakes decisions. Stories about small features with local impact resonate less than stories about ownership of outcomes affecting millions.",
  },
];

const FAQS = [
  {
    q: "What makes PhonePe PM interviews unique?",
    a: "Scale and regulatory context. PhonePe operates at 500M+ user scale and is heavily regulated (NPCI, RBI). Unlike consumer apps, product decisions are constrained by payment regulations, MDR caps, and NPCI policies. PMs are expected to understand both user empathy AND regulatory context — candidates who miss the regulatory layer often fail strategy rounds.",
  },
  {
    q: "Is PhonePe a good company for early-career PMs?",
    a: "Excellent for ops-product hybrid learning. PhonePe PMs often own category P&L early and work directly with ops, risk, and compliance teams. The scale of user base means even small PMs see large absolute impact. Career upside is strong — many PhonePe PMs move laterally to other fintechs or globally at senior levels.",
  },
  {
    q: "What fintech domain knowledge should I know before a PhonePe interview?",
    a: "Core must-knows: how UPI works (the NPCI rails, how flow works user → PSP → NPCI → bank), what MDR is and why UPI MDR is ~0, how PSP (payment service provider) business models work, and how fraud/risk decisions affect success rate. For senior roles: basic understanding of lending unit economics, insurance distribution economics, and the Walmart-PhonePe strategic context.",
  },
];

export default function PhonePePmInterviewPage() {
  const dates = pageDates("/phonepe-pm-interview");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PhonePe PM Interview", url: `${SITE_URL}/phonepe-pm-interview` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PhonePe PM Interview Guide (2026 Edition)",
        description:
          "Crack the PhonePe PM interview. All rounds, UPI and payments product questions, merchant vs consumer product thinking, and what PhonePe PMs say the bar is in 2026.",
        image: `${SITE_URL}/api/og?title=PhonePe+PM+Interview+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/phonepe-pm-interview`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>💜</span> 500M+ users · UPI dominance · Bharat-first product thinking
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PhonePe PM Interview Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            PhonePe interviews test India-first product thinking through four rounds: product design for
            Bharat users, metrics work that requires segmenting UPI failure causes, a strategy round
            centered on the NPCI market-share cap, and behavioural questions about decisions affecting
            hundreds of millions of users. Interviewers expect fluency in both user empathy and payments regulation before considering a candidate ready.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            All PhonePe PM interview rounds, UPI and payments context,
            real questions, and what India&apos;s biggest payments PM role actually requires.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Start PhonePe PM Prep — Free →
          </Link>
        </section>

        <section className="max-w-4xl mx-auto px-4 pb-10">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-5">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Know Before You Interview</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {PHONEPE_CONTEXT.map((item, i) => (
                <div key={i} className="flex gap-2 text-sm">
                  <span className="text-[#89e219] font-medium flex-shrink-0">{item.label}:</span>
                  <span className="text-white/60">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">The PhonePe PM Interview Rounds</h2>
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

        <RelatedPages slug="phonepe-pm-interview" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Train for the PhonePe Bar Daily</h2>
          <p className="text-white/60 mb-6">UPI, lending, insurance PM scenarios — calibrated to PhonePe-scale product decisions.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
