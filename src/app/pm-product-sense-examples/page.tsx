import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Product Sense Examples (2026) — 10 Questions With Sample Answers",
  description:
    "10 product sense interview questions with full sample answers. See how great PMs structure their thinking — users, problems, solutions, metrics — in real time.",
  keywords: [
    "product sense examples", "PM product sense interview",
    "product sense answers", "PM interview sample answers",
    "product design interview examples 2026",
  ],
  alternates: { canonical: "/pm-product-sense-examples" },
  openGraph: {
    title: "PM Product Sense Examples 2026 — PM Streak",
    description: "10 product sense questions with sample answers showing great PM thinking.",
    url: `${SITE_URL}/pm-product-sense-examples`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Product+Sense+Examples+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Product Sense Examples 2026 — PM Streak",
    description: "10 product sense questions with sample answers showing great PM thinking.",
    images: [`${SITE_URL}/api/og?title=PM+Product+Sense+Examples+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const EXAMPLES = [
  {
    question: "How would you improve WhatsApp for small business owners in India?",
    structure: "Clarify → Users → Pain → Solutions → Metrics",
    answer: "**Clarify:** Targeting kiranas and solo entrepreneurs using WhatsApp for order-taking (1M+ merchants). **User:** 32-year-old kirana owner taking 20 orders/day via text. **Pain:** Orders get lost in chat, no inventory sync, payment tracking separate. **Solution:** Structured order cards inside chat — each order becomes a trackable object with items, price, payment status. **Metric:** % of WhatsApp Business users using structured orders, repeat merchant retention 30d.",
  },
  {
    question: "Improve Zomato for users who order once a month.",
    structure: "Segment insight → Why they lapse → Re-engagement → Metric",
    answer: "**Insight:** Monthly users aren&apos;t habitual — they order for occasions. **Why they lapse:** High decision cost each time (&apos;what do I want today?&apos;). **Solution:** &apos;Occasion-based&apos; discovery — &apos;Weekend brunch&apos; or &apos;Office lunch&apos; curated menus. Reduces decision cost. **Metric:** Order frequency for monthly users — move from 1 to 2 orders/month. Guardrail: not hurting heavy users.",
  },
  {
    question: "Design a product for gig workers to manage their finances.",
    structure: "User research → Top pain → Product framing → Success",
    answer: "**User:** Delivery rider earning ₹25–40K/month with variable income. **Top pain:** Cash flow — bills come predictably, income doesn&apos;t. **Solution:** A &apos;smooth salary&apos; product that advances next-day earnings based on confirmed orders, automatic savings buffer built in. **Success:** % of gig workers using advance weekly, reduction in payday-loan usage among active users.",
  },
  {
    question: "How would you redesign Razorpay&apos;s onboarding for a new merchant?",
    structure: "Current state → Drop-off points → Redesign → Metric",
    answer: "**Current:** 12-step KYC + integration flow, ~40% completion. **Drop-off:** Integration (coding required) is the biggest barrier. **Redesign:** Two-track onboarding — &apos;Generate payment link&apos; track (no-code, 3 steps, instant) vs &apos;Full integration&apos; track (for devs). Lets merchants transact before fully integrating. **Metric:** Merchant activation rate (first transaction within 7 days) from 40% to 65%.",
  },
  {
    question: "Improve Instagram Reels discovery for users who follow <50 accounts.",
    structure: "Problem → Why today&apos;s algo fails → Fix → Metric",
    answer: "**Problem:** New/light users see repetitive content because following graph is sparse. **Why it fails:** Algorithm relies heavily on follow-graph signals that don&apos;t exist. **Fix:** For users with &lt;50 follows, weight Reels recommendations toward &apos;explore taste&apos; seed — 5 quick onboarding questions about interests, then explore-heavy feed for first 4 weeks. **Metric:** Time-spent and return-rate for users with &lt;50 follows.",
  },
  {
    question: "Design a product to help students from non-IIT/IIM backgrounds crack PM interviews.",
    structure: "User → Why they struggle → Product → Metric",
    answer: "**User:** Tier-2 engineering student applying to PM roles, no APM program filter. **Why they struggle:** Lack of structured prep, no peer group, no AI feedback. **Product:** Daily 2-minute PM scenarios with AI feedback, streak mechanics for habit, India-company-specific question banks (Razorpay, Flipkart, etc.). **Metric:** % of users who land at least 1 PM interview within 6 months of active use.",
  },
  {
    question: "How would you design payment reminders for Paytm that don&apos;t feel spammy?",
    structure: "User insight → Current failure → Design → Metric",
    answer: "**User insight:** Users ignore standard reminders; they notice specific, useful ones. **Current failure:** Generic &apos;pay your bill&apos; notifications at wrong times. **Design:** Context-aware reminders — &apos;Your DTH bill is due tomorrow. Your balance is ₹X. Tap to pay in 5 seconds.&apos; Include balance context, estimated time, one-tap action. **Metric:** Click-through rate on reminders + NPS of users receiving them (guardrail).",
  },
  {
    question: "Redesign the Flipkart search result page for first-time buyers in Tier-3 cities.",
    structure: "User → Barrier → Simplification → Metric",
    answer: "**User:** First-time online shopper in Jabalpur, low digital literacy, doesn&apos;t trust product photos. **Barrier:** Too many options, no clear pricing, trust issues. **Redesign:** Top 3 options only, bigger photos, one-line trust signals (&apos;5-star seller&apos;, &apos;COD available&apos;, &apos;return in 7 days&apos;), vernacular language toggle. **Metric:** Search-to-purchase conversion for first-time Tier-3 users from X% to Y%.",
  },
  {
    question: "How would you help CRED grow usage among its existing premium members?",
    structure: "Segment → What they don&apos;t use → Why → Product",
    answer: "**Segment:** CRED members paying credit card bills but not using other features. **What they don&apos;t use:** CRED Mint (investing), CRED Pay (merchants), CRED Store. **Why:** Habit formed around bills, no trigger to try adjacent features. **Product:** &apos;Earn extra coins&apos; weekly quest that introduces one adjacent feature per week (week 1: try Mint, week 2: try Pay). **Metric:** Feature breadth — % of members using 2+ CRED features per month, up from X to Y.",
  },
  {
    question: "Design a feature for Myntra to reduce return rates in women&apos;s fashion.",
    structure: "Return reasons → Biggest bucket → Solution → Metric",
    answer: "**Return reasons (research):** 50% size/fit, 20% colour didn&apos;t match, 15% material, 15% &apos;changed mind.&apos; **Biggest bucket:** Size/fit. **Solution:** &apos;Fit predictor&apos; — users enter 2–3 reference items they already own (not measurements), model recommends size based on brand fit patterns. **Metric:** Size-related return rate from X% to Y%, with guardrail: no drop in purchase rate among new users.",
  },
];

const FAQS = [
  {
    q: "How should PMs study product sense examples?",
    a: "Don&apos;t memorise them. Study the structure: how did they clarify? How did they define the user? How did they move from problem to solution? Then try the same question yourself, without looking at the sample, record yourself answering it, and compare. Your structure will be different — that&apos;s fine. What matters is the discipline of moving user → problem → solution → metric, not matching someone else&apos;s words.",
  },
  {
    q: "Should sample answers be memorised for PM interviews?",
    a: "No — verbatim memorisation backfires. Interviewers ask follow-ups that break memorised answers. Instead, internalise the thinking structure. The best PMs can structure any product sense question on the fly because they&apos;ve done it 50+ times in practice — not because they&apos;ve memorised 10 templates.",
  },
];

export default function PmProductSenseExamplesPage() {
  const dates = pageDates("/pm-product-sense-examples");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Product Sense Examples", url: `${SITE_URL}/pm-product-sense-examples` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Product Sense Examples (2026 Edition)",
        description:
          "10 product sense interview questions with full sample answers. See how great PMs structure their thinking — users, problems, solutions, metrics — in real time.",
        image: `${SITE_URL}/api/og?title=PM+Product+Sense+Examples+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-product-sense-examples`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>💡</span> See great PM thinking in action — then do it yourself
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Product Sense Examples<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Ten worked product-sense questions on this page — covering WhatsApp, Zomato, gig-worker finance,
            Razorpay onboarding, Instagram Reels, and more — each shows a full sample answer moving from
            clarifying the user through pain point, solution, and a concrete success metric, modelling the
            structure candidates should internalise rather than memorise word for word.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline font-semibold">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            10 real product sense questions with sample answers. See the structure,
            the user-first thinking, and the specific metrics that separate strong answers from generic ones.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice Similar Questions Daily — Free →
          </Link>
        </section>

        {/* Examples */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="space-y-5">
            {EXAMPLES.map((e, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-5">
                <p className="font-bold text-white mb-1">Q{i + 1}. {e.question}</p>
                <p className="text-xs text-[#89e219] mb-3">Structure: {e.structure}</p>
                <div className="bg-[#0e1113] rounded-lg p-4">
                  <p className="text-sm text-white/70 whitespace-pre-line">{e.answer}</p>
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

        <RelatedPages slug="pm-product-sense-examples" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Turn Examples Into Instinct</h2>
          <p className="text-white/60 mb-6">Daily PM scenarios with AI feedback — practice until the structure is automatic.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
