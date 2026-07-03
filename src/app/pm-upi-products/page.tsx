import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM UPI Products (2026) — Building on India&apos;s Rails",
  description:
    "How PMs build UPI-first products. P2P, P2M, credit on UPI, and why UPI is the most important payments rail built this century.",
  keywords: [
    "PM UPI", "UPI products PM",
    "PhonePe Paytm GPay PM 2026",
  ],
  alternates: { canonical: "/pm-upi-products" },
  openGraph: {
    title: "PM UPI Products 2026 — PM Streak",
    description: "Building on India&apos;s payment rails.",
    url: `${SITE_URL}/pm-upi-products`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+UPI+Products+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM UPI Products 2026 — PM Streak",
    description: "Building on India&apos;s payment rails.",
    images: [`${SITE_URL}/api/og?title=PM+UPI+Products+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Zero MDR on P2P — product must monetise through adjacent services",
  "UPI Lite, Credit on UPI, UPI Circle — rail evolves fast, build to keep pace",
  "NPCI is the counterparty — regulation sets what&apos;s possible",
  "Failure codes are UX — users see bank-level failures, blame your product",
  "Offline modes (RuPay, UPI 123PAY) unlock rural scale",
];

const METRICS = [
  "Success rate (PSR) by bank and handle",
  "Time-to-payment-completion",
  "Repeat usage per active user per month",
  "Cross-sell rate (UPI user → credit, insurance, mutual funds)",
  "Failed transaction recovery rate",
];

const FAQS = [
  {
    q: "Is building a new UPI app still viable in 2026?",
    a: "Standalone P2P apps struggle — PhonePe, GPay, Paytm dominate. New entrants succeed by finding specific wedges (SME payments, creator payments, niche communities) and building adjacent monetisable services on top. UPI as sole product is a commodity; UPI as distribution plus adjacent services is durable.",
  },
];

export default function PmUpiProductsPage() {
  const dates = pageDates("/pm-upi-products");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM UPI Products", url: `${SITE_URL}/pm-upi-products` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM UPI Products (India Edition)",
        description: "How PMs build UPI-first products. P2P, P2M, credit on UPI, and why UPI is the most important payments rail built this century.",
        image: `${SITE_URL}/api/og?title=PM+UPI+Products+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-upi-products`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🏦</span> UPI is free. Monetisation lives next to it.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM UPI Products<br />(India Edition)
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-3">
            Product managers on UPI navigate a rail with zero MDR on P2P transactions, so monetisation happens through adjacent services rather than the payment itself. Day-to-day work spans NPCI-set constraints, fast-moving features like UPI Lite and Credit on UPI, and treating bank-level failure codes as a UX problem product teams must own.
          </p>
          <p className="text-xs text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-white/70 hover:text-[#89e219] underline underline-offset-2">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for UPI-first product PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build UPI PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Dynamics</h2>
          <div className="space-y-2">
            {DYNAMICS.map((d, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Metrics</h2>
            <div className="space-y-2">
              {METRICS.map((m, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{m}</p>
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

        <RelatedPages slug="pm-upi-products" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice UPI PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
