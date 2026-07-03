import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Product-Led Growth (2026) — PLG Playbook for Product Managers",
  description:
    "How PMs build product-led growth motions. Self-serve onboarding, expansion loops, and why PLG isn&apos;t free acquisition.",
  keywords: [
    "PM product-led growth", "PLG PM",
    "self-serve PM", "product-led 2026",
  ],
  alternates: { canonical: "/pm-product-led-growth" },
  openGraph: {
    title: "PM Product-Led Growth 2026 — PM Streak",
    description: "PLG playbook for product managers — self-serve, expansion, loops.",
    url: `${SITE_URL}/pm-product-led-growth`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Product-Led+Growth+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Product-Led Growth 2026 — PM Streak",
    description: "PLG playbook for product managers — self-serve, expansion, loops.",
    images: [`${SITE_URL}/api/og?title=PM+Product-Led+Growth+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PILLARS = [
  "Self-serve onboarding — user reaches aha without talking to sales",
  "Freemium or free trial — clear path to first value at zero cost",
  "In-product upgrade paths — upgrade friction should be lower than sales friction",
  "Viral / collaborative loops — inviting teammates expands the account",
  "Usage-based expansion — revenue grows as users get more value",
];

const METRICS = [
  "Activation rate — % of signups reaching the aha moment",
  "Free-to-paid conversion rate",
  "Time-to-paid — days from signup to first dollar",
  "Net revenue retention (NRR) — expansion beats churn",
  "Product-qualified leads (PQLs) — users whose usage signals readiness to pay",
];

const FAQS = [
  {
    q: "Can every SaaS product go PLG?",
    a: "No. PLG works when the product delivers value fast, the buyer is also the user, and the account can land small and expand. Complex enterprise products with long procurement cycles, multi-stakeholder decisions, and high switching costs often need sales-led or hybrid motions. The honest answer is: most successful SaaS today blends PLG and sales-led.",
  },
];

export default function PmProductLedGrowthPage() {
  const dates = pageDates("/pm-product-led-growth");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Product-Led Growth", url: `${SITE_URL}/pm-product-led-growth` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Product-Led Growth (2026 Edition)",
        description: "How PMs build product-led growth motions. Self-serve onboarding, expansion loops, and why PLG isn't free acquisition.",
        image: `${SITE_URL}/api/og?title=PM+Product-Led+Growth+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-product-led-growth`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🚀</span> PLG isn&apos;t &apos;no sales&apos;. It&apos;s product doing sales work.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Product-Led Growth<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            What makes growth product-led? Five pillars: self-serve onboarding that reaches aha without sales, a free trial or freemium path to first value, in-product upgrades that beat sales friction, viral loops where inviting teammates expands the account, and usage-based expansion. PMs track it through activation rate, free-to-paid conversion, time-to-paid, net revenue retention, and product-qualified leads — but most successful SaaS blends PLG with sales-led motions.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#58cc02] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 PLG pillars and 5 metrics that separate real PLG from wishful self-serve.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PLG PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Pillars</h2>
          <div className="space-y-2">
            {PILLARS.map((p, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{p}</p>
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

        <RelatedPages slug="pm-product-led-growth" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice PLG Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
