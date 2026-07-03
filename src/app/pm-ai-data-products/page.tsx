import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM AI Data Products (2026) — Text-to-SQL, BI, Data Analyst Agents",
  description:
    "How PMs build AI data products. Text-to-SQL, conversational BI, analyst agents, and why the &apos;ask your data&apos; category is now real.",
  keywords: [
    "PM AI data products", "text-to-SQL PM",
    "AI analyst 2026",
  ],
  alternates: { canonical: "/pm-ai-data-products" },
  openGraph: {
    title: "PM AI Data Products 2026 — PM Streak",
    description: "How PMs build AI data products.",
    url: `${SITE_URL}/pm-ai-data-products`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+AI+Data+Products+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM AI Data Products 2026 — PM Streak",
    description: "How PMs build AI data products.",
    images: [`${SITE_URL}/api/og?title=PM+AI+Data+Products+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Schema understanding is harder than language — metadata hygiene matters",
  "Correctness &gt; creativity — wrong numbers destroy trust fast",
  "Show the SQL — analysts need to verify, not blindly trust",
  "Learn from usage — caching common queries and feedback loops raise accuracy",
  "Governance is a real product concern — who sees what data stays critical",
];

const METRICS = [
  "Query correctness rate",
  "Analyst hours saved per week",
  "Active daily users among non-analysts",
  "Adoption of governance controls",
  "Satisfaction with complex multi-join queries",
];

const FAQS = [
  {
    q: "Will AI replace analysts?",
    a: "For ad-hoc &apos;what are total sales by region?&apos; questions — yes, AI handles them. For complex analysis, causal inference, and business interpretation — no, analysts remain critical. Analyst roles will shift from SQL-writers to question-framers and insight-narrators. Strong analysts benefit; weak ones are disrupted.",
  },
];

export default function PmAiDataProductsPage() {
  const dates = pageDates("/pm-ai-data-products");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM AI Data Products", url: `${SITE_URL}/pm-ai-data-products` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM AI Data Products (2026 Edition)",
        description:
          "How PMs build AI data products. Text-to-SQL, conversational BI, analyst agents, and why the &apos;ask your data&apos; category is now real.",
        image: `${SITE_URL}/api/og?title=PM+AI+Data+Products+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-ai-data-products`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔢</span> Wrong numbers destroy trust fastest in data products
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM AI Data Products<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Building AI data products means text-to-SQL and conversational-BI tools that show their SQL rather than hide it, because analysts need to verify answers and wrong numbers destroy trust faster than any other failure mode. These tools handle ad-hoc questions like &apos;total sales by region&apos; well, but complex analysis and causal inference still require human analysts — so the job shifts from writing queries to framing questions and narrating insight.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for AI data product PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build AI Data PM Skills — Free →
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

        <RelatedPages slug="pm-ai-data-products" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice AI Data PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
