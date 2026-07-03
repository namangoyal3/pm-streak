import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Fintech Payments (2026) — How PMs Build Payment Products",
  description:
    "How PMs build payment products. UPI dynamics, success rates, reconciliation, compliance, and the unique challenges of payment PM work.",
  keywords: [
    "PM fintech payments", "payments PM",
    "UPI PM", "payment success rate",
    "payment product manager 2026",
  ],
  alternates: { canonical: "/pm-fintech-payments" },
  openGraph: {
    title: "PM Fintech Payments 2026 — PM Streak",
    description: "How PMs build payment products — UPI, success rates, compliance, reconciliation.",
    url: `${SITE_URL}/pm-fintech-payments`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Fintech+Payments+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Fintech Payments 2026 — PM Streak",
    description: "How PMs build payment products — UPI, success rates, compliance, reconciliation.",
    images: [`${SITE_URL}/api/og?title=PM+Fintech+Payments+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PAYMENT_METRICS = [
  "Payment success rate (PSR) — % of attempts that succeed. &gt;95% is expected; &gt;98% is strong",
  "Transaction volume and velocity — amount and frequency",
  "Failure reason codes — split by issuer, method, user error, network",
  "Reconciliation accuracy — % of transactions that reconcile cleanly",
  "Chargeback rate — disputed transactions; signals fraud or UX issues",
  "Take rate / MDR — platform revenue per transaction",
];

const DYNAMICS = [
  "Multiple rails — UPI, cards, wallets, bank transfer, EMI each have different success/failure patterns",
  "Latency matters — slow payment flows = abandonment",
  "Bank-side failures dominate in UPI — PMs design for partial control",
  "Regulatory compliance (RBI, PCI DSS) is non-negotiable",
  "Fraud and risk are continuous concerns — not just security checks",
];

const DESIGN_PRINCIPLES = [
  "Reduce payment steps aggressively — every step drops conversion",
  "Show trust signals — verified badges, secured-by-bank imagery",
  "Surface failure reasons clearly — &apos;bank temporarily unavailable&apos; &gt; &apos;failed&apos;",
  "Auto-retry when safe — if a specific bank is down, try another method",
  "Save payment methods securely — UPI PIN + saved cards reduce future friction",
];

const COMMON_TRAPS = [
  "Treating all payment failures the same — bank, user, network need different fixes",
  "Ignoring reconciliation — unreconciled transactions become customer complaints",
  "Weak fraud handling — protects conversion but creates chargeback problems",
  "Over-designing for happy path — edge cases are where real pain lives",
  "Not partnering with compliance — regulatory surprises kill PM velocity",
];

const FAQS = [
  {
    q: "Is payment PM a good career path in India?",
    a: "Excellent. India is arguably the most advanced payments market globally. PMs at Razorpay, PhonePe, Paytm, Cashfree get deep domain expertise that compounds. Compensation is strong; career upside extends to global payment companies. Trade-off: regulation makes it slower-paced than pure consumer.",
  },
  {
    q: "What&apos;s the biggest payment PM mistake?",
    a: "Focusing on happy-path UX. Payment products fail in edge cases — specific banks, specific amounts, specific times of day. The PMs who obsess over the 5% of failures (not the 95% of successes) build the products that win on trust.",
  },
];

export default function PmFintechPaymentsPage() {
  const dates = pageDates("/pm-fintech-payments");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Fintech Payments", url: `${SITE_URL}/pm-fintech-payments` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Fintech Payments (2026 Edition)",
        description:
          "How PMs build payment products. UPI dynamics, success rates, reconciliation, compliance, and the unique challenges of payment PM work.",
        image: `${SITE_URL}/api/og?title=PM+Fintech+Payments+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-fintech-payments`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>💳</span> Payment products win on trust — earned through handling edge cases well
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Fintech Payments<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            A payment product is judged by how it fails, not by its happy path: success rate above 95% (98%+ is strong), reconciliation accuracy, and chargeback rate all matter because UPI, cards, wallets, and EMI each break differently, and bank-side outages sit outside a PM&apos;s control. The fix is reducing payment steps, auto-retrying through alternate methods when a bank is down, and replacing a generic &apos;failed&apos; message with the real reason.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 payment metrics, 5 unique dynamics, 5 design principles, and 5 common traps.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Payments PM Skills Daily — Free →
          </Link>
        </section>

        {/* Metrics */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Payment Metrics</h2>
          <div className="space-y-2">
            {PAYMENT_METRICS.map((m, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{m}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dynamics */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Unique Payment Dynamics</h2>
            <div className="space-y-2">
              {DYNAMICS.map((d, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Design principles */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Design Principles</h2>
          <div className="space-y-2">
            {DESIGN_PRINCIPLES.map((d, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Traps */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Common Traps</h2>
            <div className="space-y-2">
              {COMMON_TRAPS.map((t, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-red-400 flex-shrink-0">❌</span>
                  <p className="text-sm text-white/70">{t}</p>
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

        <RelatedPages slug="pm-fintech-payments" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Payments PM Skills Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on payment flows, success rates, and reconciliation.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
