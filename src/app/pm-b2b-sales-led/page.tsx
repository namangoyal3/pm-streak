import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM B2B Sales-Led (2026) — Building for Enterprise Sales Motion",
  description:
    "How PMs build for sales-led B2B. Buyer vs user, RFPs, procurement, security reviews, and why the best B2B PMs spend time in sales calls.",
  keywords: [
    "PM sales-led B2B", "enterprise PM",
    "B2B product manager", "enterprise sales 2026",
  ],
  alternates: { canonical: "/pm-b2b-sales-led" },
  openGraph: {
    title: "PM B2B Sales-Led 2026 — PM Streak",
    description: "How PMs build for enterprise sales motion.",
    url: `${SITE_URL}/pm-b2b-sales-led`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+B2B+Sales-Led+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM B2B Sales-Led 2026 — PM Streak",
    description: "How PMs build for enterprise sales motion.",
    images: [`${SITE_URL}/api/og?title=PM+B2B+Sales-Led+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const REALITIES = [
  "Buyer ≠ user — the person signing the cheque rarely uses the product daily",
  "RFPs and security reviews gate every deal — design for procurement",
  "Deal cycles are long — 3–12 months is normal; plan roadmap accordingly",
  "One logo can dominate roadmap — careful with single-customer features",
  "Sales calls beat surveys — sit in 3 discovery calls per month minimum",
  "Integrations are table stakes — SSO, SCIM, SAML, audit logs on day one",
];

const METRICS = [
  "Win rate vs top competitors",
  "ACV (average contract value) and ACV expansion",
  "Net revenue retention — expansion &gt; churn",
  "Sales cycle length — compress over time",
  "Feature-gated deal count — how many deals hinge on unshipped features?",
];

const FAQS = [
  {
    q: "Should B2B PMs report into product or sales?",
    a: "Product. PMs who report into sales chase every deal and build unprincipled product. Strong B2B PMs work closely with sales but maintain independent judgment on roadmap. The best companies have tight feedback loops between the two without organisational confusion.",
  },
];

export default function PmB2bSalesLedPage() {
  const dates = pageDates("/pm-b2b-sales-led");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM B2B Sales-Led", url: `${SITE_URL}/pm-b2b-sales-led` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM B2B Sales-Led (2026 Edition)",
        description: "How PMs build for sales-led B2B. Buyer vs user, RFPs, procurement, security reviews, and why the best B2B PMs spend time in sales calls.",
        image: `${SITE_URL}/api/og?title=PM+B2B+Sales-Led+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-b2b-sales-led`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🏢</span> Enterprise PMs build for buyers AND users. They&apos;re rarely the same person.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM B2B Sales-Led<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Building for sales-led B2B means designing for the buyer who signs the contract as much as the user who logs in daily: expect long 3–12 month deal cycles gated by RFPs and security reviews, table-stakes integrations like SSO and SAML from day one, and success measured through win rate, ACV expansion, and net revenue retention.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-4">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 enterprise realities and 5 metrics for sales-led B2B PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Enterprise PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Realities</h2>
          <div className="space-y-2">
            {REALITIES.map((r, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{r}</p>
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

        <RelatedPages slug="pm-b2b-sales-led" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Enterprise PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
