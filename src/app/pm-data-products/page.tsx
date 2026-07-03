import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Data Products (2026) — Building With Data as the Product",
  description:
    "How PMs build data products. Pipelines, quality, governance, and the unique challenges when the product IS the data.",
  keywords: [
    "PM data products", "data PM",
    "data product manager 2026",
  ],
  alternates: { canonical: "/pm-data-products" },
  openGraph: {
    title: "PM Data Products 2026 — PM Streak",
    description: "How PMs build data products — pipelines, quality, governance.",
    url: `${SITE_URL}/pm-data-products`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Data+Products+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Data Products 2026 — PM Streak",
    description: "How PMs build data products — pipelines, quality, governance.",
    images: [`${SITE_URL}/api/og?title=PM+Data+Products+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PILLARS = [
  "Data quality is the product — bad data beats good UX every time in a losing fight",
  "Pipelines are product features — uptime, freshness, accuracy have SLAs",
  "Governance beats speed at scale — metadata, lineage, access control",
  "Users are diverse — analysts, ML engineers, business stakeholders, external APIs",
  "Trust is slow to build, fast to lose — one wrong number destroys months of adoption",
];

const METRICS = [
  "Data freshness — lag from source to consumption",
  "Data quality score — null rates, schema drift, anomaly counts",
  "Adoption — distinct consumers / queries / downstream pipelines",
  "Time-to-insight — how fast can a user answer a question?",
  "Incidents per quarter — trust signal",
];

const FAQS = [
  {
    q: "How is PM-ing a data product different from a regular product?",
    a: "The user is usually technical (analyst, ML eng, developer), so UX is secondary to correctness and reliability. Success is measured in trust over time, not engagement in a session. Launches are smaller but ongoing — data products evolve schema and semantics continuously. Most important: you spend more time on governance and quality than on features.",
  },
];

export default function PmDataProductsPage() {
  const dates = pageDates("/pm-data-products");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Data Products", url: `${SITE_URL}/pm-data-products` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Data Products (2026 Edition)",
        description:
          "How PMs build data products. Pipelines, quality, governance, and the unique challenges when the product IS the data.",
        image: `${SITE_URL}/api/og?title=PM+Data+Products+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-data-products`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🗄️</span> When the product is data, quality beats features
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Data Products<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Treating data as the product means quality and pipeline reliability matter more than UX polish — PMs track freshness, a data quality score, adoption across analysts and ML pipelines, time-to-insight, and incidents per quarter, because trust in the numbers takes months to build and one bad number can destroy it overnight.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 pillars and 5 metrics for data product PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Data PM Skills — Free →
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

        <RelatedPages slug="pm-data-products" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Data PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
