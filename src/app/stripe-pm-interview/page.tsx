import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "Stripe PM Interview Guide (2026) — API Products, Developer PM Questions",
  description:
    "Crack the Stripe PM interview. What makes Stripe PM unique — developer-first products, API design, writing quality, and the Stripe operating principles that shape every interview.",
  keywords: [
    "Stripe PM interview", "Stripe product manager interview questions",
    "developer PM interview", "API PM interview",
    "Stripe PM prep 2026", "Stripe writing interview",
  ],
  alternates: { canonical: "/stripe-pm-interview" },
  openGraph: {
    title: "Stripe PM Interview Guide 2026 — PM Streak",
    description: "How Stripe interviews PMs — API design, writing quality, and developer empathy.",
    url: `${SITE_URL}/stripe-pm-interview`,
    images: [{ url: `${SITE_URL}/api/og?title=Stripe+PM+Interview+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stripe PM Interview Guide 2026 — PM Streak",
    description: "How Stripe interviews PMs — API design, writing quality, and developer empathy.",
    images: [`${SITE_URL}/api/og?title=Stripe+PM+Interview+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const STRIPE_CONTEXT = [
  { label: "Core business", value: "Payment infrastructure, developer-first APIs, billing, tax, issuing, Atlas, Terminal, Financial Connections" },
  { label: "PM culture", value: "Writing-obsessed, developer-empathetic, long-term thinking, operational excellence" },
  { label: "Users to know", value: "Developers (primary), product teams integrating payments, finance teams, merchants at scale" },
  { label: "Stripe signals", value: "Technical depth, writing quality, product judgment over charisma, comfort with complexity over simplicity-at-all-costs" },
  { label: "India context", value: "Stripe has a growing India presence; India payments dynamics (UPI, RBI regulations) are increasingly relevant" },
];

const ROUNDS = [
  {
    name: "Written Take-home",
    what: "Stripe famously uses written assignments. You&apos;ll be asked to write a memo, spec, or analysis.",
    tip: "Writing quality is a first-class signal at Stripe. Edit ruthlessly. Open with the answer. Use concrete examples. If your draft is &apos;fine,&apos; rewrite it. Shipping-standard writing is the bar.",
  },
  {
    name: "Product Design / API Design",
    what: "Design a developer-facing product or API. Tests whether you think like a developer and can reason about trade-offs in API ergonomics.",
    tip: "Consider: what would a developer integrating this for the first time hate? What feels magical when it works? Stripe&apos;s best APIs hide complexity without sacrificing power. That&apos;s the bar.",
  },
  {
    name: "Strategy & Market",
    what: "How does Stripe enter a market, respond to a competitor, or think about a new product line? Tests long-horizon thinking.",
    tip: "Stripe thinks in decades. Avoid short-term tactical answers. Show you understand how a platform compounds (network effects, switching costs, developer mindshare).",
  },
  {
    name: "Execution & Craft",
    what: "How do you ship complex, operational products? How do you think about rollouts that affect millions of dollars in merchant revenue?",
    tip: "Operational risk awareness is unusually important at Stripe. Show you think about backwards compatibility, migration paths, and rollback strategies. &apos;We&apos;ll ship fast and iterate&apos; is a failure answer at Stripe.",
  },
  {
    name: "Behavioural",
    what: "Stories about ownership, judgment, and working in ambiguity.",
    tip: "Stripe values specific, thoughtful answers. Candidates who give polished narrative arcs without concrete detail score lower than candidates who share honest, specific moments — including what they got wrong.",
  },
];

const FAQS = [
  {
    q: "What&apos;s unique about the Stripe PM interview?",
    a: "The writing. Stripe is one of the few companies where a take-home writing assignment is core to the interview loop — not a throwaway. Many candidates who pass technical rounds fail the writing assessment. Writing quality signals thinking quality, and at Stripe, they&apos;re treated as the same thing. Invest in writing prep the way candidates at other companies invest in case studies.",
  },
  {
    q: "Does Stripe hire PMs in India?",
    a: "Yes, with a growing presence. Stripe has engineering and business teams in Bangalore and product roles for India-specific payments (UPI integration, RBI compliance, local payment methods). Most senior Stripe PM roles are still based in Dublin, San Francisco, Seattle, or Singapore — but remote and India-based roles are increasing.",
  },
  {
    q: "How does Stripe PM compare to Razorpay PM?",
    a: "Both are developer-first payments companies. Stripe is deeper on developer experience craft, writing culture, and global platform thinking. Razorpay is faster-moving, India-specific, and with broader product surface (payroll, banking, neo-banking products). Compensation at Stripe is significantly higher (global benchmarks); Razorpay offers faster career acceleration at early stages.",
  },
];

export default function StripePmInterviewPage() {
  const dates = pageDates("/stripe-pm-interview");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Stripe PM Interview", url: `${SITE_URL}/stripe-pm-interview` },
      ])} />
      <JsonLd data={articleSchema({
        headline: "Stripe PM Interview Guide (2026 Edition)",
        description: "Crack the Stripe PM interview. What makes Stripe PM unique — developer-first products, API design, writing quality, and the Stripe operating principles that shape every interview.",
        image: `${SITE_URL}/api/og?title=Stripe+PM+Interview+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/stripe-pm-interview`,
      })} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>💳</span> Developer-first · Writing-obsessed · Long-horizon PM work
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Stripe PM Interview Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Expect five rounds — a written take-home, product and API design, strategy and market,
            execution and craft, and behavioural — built around Stripe&apos;s defining signal: writing
            quality that doubles as thinking quality. Interviewers weigh technical depth and
            long-horizon platform judgment over charisma, and the take-home alone trips up many
            candidates who clear every technical round.
          </p>
          <p className="text-sm text-white/50 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The Stripe PM interview context, 5 rounds including the take-home,
            and what makes Stripe PM different from every other payments company.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Start Stripe PM Prep — Free →
          </Link>
        </section>

        <section className="max-w-4xl mx-auto px-4 pb-10">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-5">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Know Before You Interview</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {STRIPE_CONTEXT.map((item, i) => (
                <div key={i} className="flex gap-2 text-sm">
                  <span className="text-[#89e219] font-medium flex-shrink-0">{item.label}:</span>
                  <span className="text-white/60">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">The Stripe PM Interview Rounds</h2>
          <div className="space-y-5">
            {ROUNDS.map((r, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-7 h-7 rounded-full bg-[#58cc02]/20 text-[#89e219] font-bold text-sm flex items-center justify-center">{i + 1}</span>
                  <h3 className="text-lg font-bold text-white">{r.name}</h3>
                </div>
                <p className="text-sm text-white/60 mb-3">{r.what}</p>
                <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-lg p-3">
                  <p className="text-xs text-[#89e219]">💡 Prep tip: <span className="text-white/70">{r.tip}</span></p>
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

        <RelatedPages slug="stripe-pm-interview" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Train for the Stripe Writing Bar Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios that sharpen PM writing, API thinking, and craft.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
