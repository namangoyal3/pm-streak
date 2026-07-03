import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Checkout Design (2026) — Designing Checkouts That Convert",
  description:
    "How PMs design checkout flows that convert. Field count, payment options, trust signals, and the small details that move conversion 5–15%.",
  keywords: [
    "PM checkout design", "checkout conversion 2026",
  ],
  alternates: { canonical: "/pm-checkout-design" },
  openGraph: {
    title: "PM Checkout Design 2026 — PM Streak",
    description: "Designing checkouts that convert.",
    url: `${SITE_URL}/pm-checkout-design`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Checkout+Design+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Checkout Design 2026 — PM Streak",
    description: "Designing checkouts that convert.",
    images: [`${SITE_URL}/api/og?title=PM+Checkout+Design+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PRINCIPLES = [
  "Reduce required fields — every removed field lifts conversion",
  "Save payment methods — one-click for repeat buyers",
  "Localise payment options — UPI, COD, EMI for India",
  "Trust signals visible — security, refund policy, contact",
  "Mobile-first checkout — most traffic is mobile",
];

const TRAPS = [
  "Forced account creation — kills guest checkout intent",
  "Hidden fees revealed at final step — abandonment spike",
  "Address forms not optimised for autofill",
  "No clear progress indicator on multi-step checkout",
];

const FAQS = [
  {
    q: "Should checkout always be guest-friendly?",
    a: "For most consumer products, yes. Forcing account creation kills 20–40% of conversions. The compromise: offer guest checkout, then offer to save the account post-purchase. You get the conversion AND the future relationship. Best of both.",
  },
];

export default function PmCheckoutDesignPage() {
  const dates = pageDates("/pm-checkout-design");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Checkout Design", url: `${SITE_URL}/pm-checkout-design` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Checkout Design (2026 Edition)",
        description: "How PMs design checkout flows that convert. Field count, payment options, trust signals, and the small details that move conversion 5–15%.",
        image: `${SITE_URL}/api/og?title=PM+Checkout+Design+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-checkout-design`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🛒</span> Every removed field lifts conversion. Every hidden fee crashes it.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Checkout Design<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Good checkout design removes friction: fewer required fields, saved payment methods, localised options such as UPI, COD, and EMI, visible trust signals, and mobile-first layouts. It also avoids four traps — forced account creation, which alone can kill 20–40% of conversions, fees hidden until the final step, address forms that fight autofill, and missing progress indicators on multi-step flows.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 principles and 4 traps for checkout design.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Checkout PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Principles</h2>
          <div className="space-y-2">
            {PRINCIPLES.map((p, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{p}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">4 Traps</h2>
            <div className="space-y-2">
              {TRAPS.map((t, i) => (
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

        <RelatedPages slug="pm-checkout-design" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Checkout PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
