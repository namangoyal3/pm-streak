import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Infrastructure Products (2026) — Building for Infra Engineers",
  description:
    "How PMs build infrastructure products. SLAs, latency budgets, incident response, and what makes infra PM different from everything else.",
  keywords: [
    "PM infrastructure", "infra PM",
    "platform infra PM", "SRE PM 2026",
  ],
  alternates: { canonical: "/pm-infra-products" },
  openGraph: {
    title: "PM Infrastructure Products 2026 — PM Streak",
    description: "How PMs build infrastructure products.",
    url: `${SITE_URL}/pm-infra-products`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Infrastructure+Products+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Infrastructure Products 2026 — PM Streak",
    description: "How PMs build infrastructure products.",
    images: [`${SITE_URL}/api/og?title=PM+Infrastructure+Products+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PRIORITIES = [
  "Reliability before features — a new feature that breaks existing uptime is a net negative",
  "Latency is UX — p99 beats p50 in every infra conversation",
  "Error budgets are a PM tool — they force explicit reliability/velocity tradeoffs",
  "Breaking changes are existential — versioning and deprecation policies matter",
  "Observability is a shipping requirement — if you can&apos;t debug it, you can&apos;t ship it",
];

const METRICS = [
  "Uptime / availability against SLO",
  "p50, p95, p99 latency",
  "Error budget burn rate",
  "Mean time to detect and mean time to recover",
  "Adoption among internal/external consumers",
];

const FAQS = [
  {
    q: "Is infra PM a niche path?",
    a: "Highly specialised but highly leveraged. A single infra decision can affect every product in the company. Career paths lead to platform VP roles, SRE leadership, or cross-over into developer tools. Compensation is strong; pace is slower but impact compounds for years.",
  },
];

export default function PmInfraProductsPage() {
  const dates = pageDates("/pm-infra-products");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Infrastructure", url: `${SITE_URL}/pm-infra-products` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Infrastructure (2026 Edition)",
        description: "How PMs build infrastructure products. SLAs, latency budgets, incident response, and what makes infra PM different from everything else.",
        image: `${SITE_URL}/api/og?title=PM+Infrastructure+Products+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-infra-products`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🏗️</span> Infra PMs trade velocity for durability. That tradeoff is the job.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Infrastructure<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-3">
            Infra PMs choose durability over new features, using error budgets to make reliability-versus-velocity tradeoffs explicit and judging latency by p99, not p50, because latency is treated as UX. Uptime against SLO, latency percentiles, error budget burn, and MTTD/MTTR define whether the product is working, and observability is treated as a shipping requirement, not an afterthought.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 priorities and 5 metrics for infrastructure PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Infra PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Priorities</h2>
          <div className="space-y-2">
            {PRIORITIES.map((p, i) => (
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

        <RelatedPages slug="pm-infra-products" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Infra PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
