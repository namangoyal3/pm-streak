import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "Paytm PM Interview Guide (2026) — Payments, Merchant & Lending PM Questions",
  description:
    "Crack the Paytm PM interview. All rounds, payment and merchant product questions, lending and financial services expansion, and the pragmatic product thinking Paytm rewards.",
  keywords: [
    "Paytm PM interview", "Paytm product manager interview questions",
    "Paytm PM prep", "fintech PM paytm",
    "Paytm merchant PM", "Paytm PM interview 2026",
  ],
  alternates: { canonical: "/paytm-pm-interview" },
  openGraph: {
    title: "Paytm PM Interview Guide 2026 — PM Streak",
    description: "All Paytm PM interview rounds, real questions, and prep for fintech product roles.",
    url: `${SITE_URL}/paytm-pm-interview`,
    images: [{ url: `${SITE_URL}/api/og?title=Paytm+PM+Interview+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paytm PM Interview Guide 2026 — PM Streak",
    description: "All Paytm PM interview rounds, real questions, and prep for fintech product roles.",
    images: [`${SITE_URL}/api/og?title=Paytm+PM+Interview+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PAYTM_CONTEXT = [
  { label: "Core business", value: "UPI payments, Paytm Wallet, Payments Bank, merchant payments (Paytm for Business), lending, insurance, stock broking" },
  { label: "PM culture", value: "Fast-moving, pragmatic, merchant-obsessed. Public company — PMs operate with awareness of investor narrative." },
  { label: "Users to know", value: "Consumers (urban and Bharat), merchants (kirana to enterprise), gig economy workers, insurance/loan applicants" },
  { label: "Key metrics", value: "GMV, take rate, merchant retention, active users, lending disbursement, NPA, customer LTV" },
  { label: "Unique context", value: "Publicly listed, regulatory scrutiny (RBI/SEBI), largest super-app play in India. PMs balance growth + profitability + compliance." },
];

const ROUNDS = [
  {
    name: "Product & User Thinking Round",
    what: "Design or improve a Paytm product. Emphasis on pragmatic solutions — what can we ship this quarter, for which user, with what tradeoffs.",
    sample: [
      "Design a product for a kirana merchant to track and reconcile daily Paytm QR transactions.",
      "How would you reduce fraud in Paytm Wallet without adding friction for legitimate users?",
      "Paytm Money users are trading less in volatile markets. How would you redesign the experience?",
    ],
    tip: "Paytm values execution over elegance. A scrappy solution that ships in 6 weeks beats a polished one that takes 6 months. Show you can scope aggressively.",
  },
  {
    name: "Merchant Product Round",
    what: "Paytm&apos;s merchant ecosystem is one of the largest in India. Many interviews probe whether you can design for SMB merchants, not just consumers.",
    sample: [
      "How would you help a small merchant grow their business using Paytm products beyond payments?",
      "Design a loyalty product for Paytm merchants to use with their customers.",
      "Merchants are dropping off the platform. Diagnose and propose.",
    ],
    tip: "Paytm merchants range from street vendors to enterprise retailers. Know the segmentation — design for a specific tier (e.g. 'small merchant doing ₹10K/month') rather than a generic &apos;merchant.&apos;",
  },
  {
    name: "Metrics & Financial Services Round",
    what: "Diagnose product metrics, think about credit, insurance, wealth product unit economics. Regulatory awareness is a plus.",
    sample: [
      "Lending disbursement is growing but NPAs are rising faster. What do you do?",
      "Define the success metric for Paytm&apos;s new insurance product.",
      "How would you measure whether Paytm&apos;s merchant payments business is healthy?",
    ],
    tip: "Financial services are heavily regulated. Great answers acknowledge regulatory constraints (RBI lending norms, SEBI broking rules) as first-class inputs — not afterthoughts.",
  },
  {
    name: "Strategy & Behavioural Round",
    what: "Competitive positioning (vs PhonePe, GPay), the super-app thesis, ownership stories, fast-iteration mindset.",
    sample: [
      "How should Paytm think about monetisation when UPI is commoditised?",
      "Tell me about a product you shipped with incomplete information. What did you learn?",
      "Why Paytm specifically — what draws you to the super-app model vs single-product fintechs?",
    ],
    tip: "Have a genuine POV on the super-app strategy. Paytm interviewers probe whether you&apos;ve thought about whether super-apps actually work in India or are a thesis in search of validation.",
  },
];

const FAQS = [
  {
    q: "How is the Paytm PM interview different from PhonePe or Razorpay?",
    a: "Paytm is a super-app with consumer + merchant + financial services. Interviews probe breadth more than PhonePe (primarily payments) or Razorpay (primarily merchant-facing). Paytm PMs often own products spanning multiple business lines, so interviewers test comfort with multi-product thinking. It&apos;s also a listed company, so awareness of public-market dynamics (quarterly results, investor narrative) is expected at senior levels.",
  },
  {
    q: "What domain knowledge is expected at a Paytm PM interview?",
    a: "Core must-knows: UPI flow, Payments Bank basics, merchant payment economics, lending unit economics (NPA, disbursement, collection), insurance distribution basics. For senior roles: broking/wealth regulatory context (SEBI norms), payments bank compliance (RBI). You don&apos;t need to be a fintech expert, but you must be able to have substantive conversations on payments and lending.",
  },
  {
    q: "Does Paytm value MBA PMs or prefer engineering backgrounds?",
    a: "Paytm hires across both. Engineering-background PMs are common in platform, payments infra, and merchant product teams. MBA PMs are common in consumer, financial services, and strategy-heavy roles. Neither background is advantaged structurally — what&apos;s more important is evidence of execution, user empathy, and domain curiosity.",
  },
];

export default function PaytmPmInterviewPage() {
  const dates = pageDates("/paytm-pm-interview");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Paytm PM Interview", url: `${SITE_URL}/paytm-pm-interview` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Paytm PM Interview Guide (2026 Edition)",
        description:
          "Crack the Paytm PM interview. All rounds, payment and merchant product questions, lending and financial services expansion, and the pragmatic product thinking Paytm rewards.",
        image: `${SITE_URL}/api/og?title=Paytm+PM+Interview+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/paytm-pm-interview`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>💰</span> Super-app scale · Payments + lending + merchant · Listed-company bar
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Paytm PM Interview Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Paytm&apos;s interview process spans four rounds — product and user thinking, a dedicated
            merchant-product round, financial-services metrics covering lending and insurance, and a
            strategy-plus-behavioural round on the super-app thesis — testing whether candidates can operate
            across payments, lending, insurance, and broking while staying execution-pragmatic and aware of RBI and SEBI constraints.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            All Paytm PM interview rounds, the pragmatic product thinking it rewards,
            and the fintech domain knowledge you need before you walk in.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Start Paytm PM Prep — Free →
          </Link>
        </section>

        <section className="max-w-4xl mx-auto px-4 pb-10">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-5">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Know Before You Interview</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {PAYTM_CONTEXT.map((item, i) => (
                <div key={i} className="flex gap-2 text-sm">
                  <span className="text-[#89e219] font-medium flex-shrink-0">{item.label}:</span>
                  <span className="text-white/60">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">The Paytm PM Interview Rounds</h2>
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

        <RelatedPages slug="paytm-pm-interview" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Train for Super-App PM Scale Daily</h2>
          <p className="text-white/60 mb-6">Payments, merchant, and lending PM scenarios — calibrated to Paytm&apos;s bar.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
