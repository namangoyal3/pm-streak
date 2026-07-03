import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM API Platforms (2026) — Designing APIs as Product",
  description:
    "How PMs build API platforms. Schema design, versioning, quotas, SDKs, and why API PM is quietly one of the highest-leverage roles in SaaS.",
  keywords: [
    "PM API platforms", "API product manager",
    "API as product 2026",
  ],
  alternates: { canonical: "/pm-api-platforms" },
  openGraph: {
    title: "PM API Platforms 2026 — PM Streak",
    description: "Designing APIs as product.",
    url: `${SITE_URL}/pm-api-platforms`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+API+Platforms+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM API Platforms 2026 — PM Streak",
    description: "Designing APIs as product.",
    images: [`${SITE_URL}/api/og?title=PM+API+Platforms+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PRINCIPLES = [
  "APIs are forever — design schemas as if you&apos;ll live with them for 10 years",
  "Consistency beats cleverness — predictable naming wins over elegant oddities",
  "Versioning strategy up front — breaking changes are the most expensive bug",
  "Error responses are UX — developers read error messages more than success ones",
  "SDKs compound adoption — a great REST API still wants first-party SDKs",
  "Rate limits should degrade, not fail — give developers headroom",
];

const METRICS = [
  "Active API keys and active developers",
  "Time-to-first-call from signup",
  "P95 latency and error rate",
  "Breaking changes shipped per quarter (lower is better)",
  "SDK adoption share vs raw HTTP",
];

const FAQS = [
  {
    q: "Is API PM different from developer tools PM?",
    a: "Overlap is large but not total. API PMs focus on protocol, schema, and backend surface. Dev tools PMs may also own IDEs, CLIs, dashboards, and docs portals. A strong dev tools PM usually can do API PM; the reverse isn&apos;t always true. Both demand technical fluency and empathy for developers.",
  },
];

export default function PmApiPlatformsPage() {
  const dates = pageDates("/pm-api-platforms");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM API Platforms", url: `${SITE_URL}/pm-api-platforms` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM API Platforms (2026 Edition)",
        description: "How PMs build API platforms. Schema design, versioning, quotas, SDKs, and why API PM is quietly one of the highest-leverage roles in SaaS.",
        image: `${SITE_URL}/api/og?title=PM+API+Platforms+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-api-platforms`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔌</span> APIs are forever. Design them that way.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM API Platforms<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-3">
            An API platform PM&apos;s job is schema stewardship — designing endpoints as if they&apos;ll live for a decade, favoring consistent naming over cleverness, committing to a versioning strategy up front, and treating error responses as UX since developers read them more than success messages — then tracking health through active API keys, time-to-first-call, P95 latency, and SDK adoption share.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 principles and 5 metrics for API platform PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build API PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Principles</h2>
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

        <RelatedPages slug="pm-api-platforms" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice API PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
