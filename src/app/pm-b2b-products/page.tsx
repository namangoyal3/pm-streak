import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM B2B Products (2026) — How B2B PM Differs From Consumer",
  description:
    "How PMs build B2B products. Buyer vs user, sales-led motion, enterprise deal cycles, and the dynamics that separate B2B from consumer product work.",
  keywords: [
    "PM B2B products", "B2B product manager",
    "enterprise PM", "SaaS B2B PM",
    "B2B PM india 2026",
  ],
  alternates: { canonical: "/pm-b2b-products" },
  openGraph: {
    title: "PM B2B Products 2026 — PM Streak",
    description: "How B2B PM differs from consumer — buyer vs user, sales-led, enterprise cycles.",
    url: `${SITE_URL}/pm-b2b-products`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+B2B+Products+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM B2B Products 2026 — PM Streak",
    description: "How B2B PM differs from consumer — buyer vs user, sales-led, enterprise cycles.",
    images: [`${SITE_URL}/api/og?title=PM+B2B+Products+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const B2B_DYNAMICS = [
  "Buyer ≠ user — decision-maker pays; end-user uses. Design for both",
  "Sales cycles are long — 3–12 months for enterprise is normal",
  "Customers are concentrated — losing 1 big customer can matter more than 1000 small",
  "Integrations critical — B2B products plug into existing workflows",
  "Reference selling — customers buy from people like them; social proof matters",
];

const METRICS = [
  "ARR / MRR — recurring revenue",
  "NRR — net revenue retention (should be &gt;100%)",
  "Logo churn — customers lost",
  "ACV — average contract value",
  "Sales cycle length — time from lead to close",
  "Expansion revenue — upsell from existing accounts",
];

const DESIGN_PRINCIPLES = [
  "Admin vs end-user separation — different UIs for different personas",
  "Integrations over features — playing well with others matters more",
  "Configurability — enterprises need custom fields, custom workflows",
  "Audit logs and compliance — non-negotiable at enterprise tier",
  "Scalability to team adoption — product must feel good solo AND with 500 users",
];

const COMMON_TRAPS = [
  "Building features for 1 big customer — doesn&apos;t generalise",
  "Ignoring the buyer — building great end-user UX that admins won&apos;t approve",
  "Over-promising in sales — product doesn&apos;t match sales deck",
  "Not pricing per seat — missing recurring revenue upside",
  "Skipping integrations — customers need your product to fit their stack",
];

const FAQS = [
  {
    q: "Is B2B PM easier or harder than consumer?",
    a: "Different, not easier. B2B has slower feedback loops (longer sales cycles) but clearer signal (customers tell you directly). Consumer has faster iteration but noisier data. Neither is universally harder. Match to what you enjoy.",
  },
  {
    q: "What&apos;s the biggest B2B PM mistake?",
    a: "Treating the user as the customer. At many B2B companies, the person using the product isn&apos;t the one paying. Building only for end-user delight misses the admin/procurement/finance stakeholders. B2B PM requires thinking about every layer of the buying organisation.",
  },
];

export default function PmB2bProductsPage() {
  const dates = pageDates("/pm-b2b-products");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM B2B Products", url: `${SITE_URL}/pm-b2b-products` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM B2B Products (2026 Edition)",
        description:
          "How PMs build B2B products. Buyer vs user, sales-led motion, enterprise deal cycles, and the dynamics that separate B2B from consumer product work.",
        image: `${SITE_URL}/api/og?title=PM+B2B+Products+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-b2b-products`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🏢</span> B2B PM: design for buyers and users, not just users
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM B2B Products<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-3">
            In B2B, the person who pays and the person who uses the product are rarely the same — the fact that reshapes everything else: sales cycles stretch three to twelve months, one large lost account can outweigh a thousand small ones, and the product needs separate admin and end-user interfaces plus audit logs and configurability for enterprise buyers. Metrics like ARR, NRR, ACV, and logo churn track it all.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 B2B dynamics, 6 key metrics, 5 design principles, and 5 common traps.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build B2B PM Skills Daily — Free →
          </Link>
        </section>

        {/* Dynamics */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Unique B2B Dynamics</h2>
          <div className="space-y-2">
            {B2B_DYNAMICS.map((d, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Metrics */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Key B2B Metrics</h2>
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

        {/* Principles */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Design Principles</h2>
          <div className="space-y-2">
            {DESIGN_PRINCIPLES.map((d, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
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

        <RelatedPages slug="pm-b2b-products" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build B2B PM Skills Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on buyer vs user, enterprise features, and B2B growth.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
