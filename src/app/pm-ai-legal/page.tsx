import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM AI Legal Products (2026) — Contract Review, Legal Research, Drafting",
  description:
    "How PMs build AI legal products. Contract review, case research, drafting, and why law firms are finally deploying LLMs in earnest.",
  keywords: [
    "PM AI legal", "Harvey PM",
    "contract AI 2026",
  ],
  alternates: { canonical: "/pm-ai-legal" },
  openGraph: {
    title: "PM AI Legal Products 2026 — PM Streak",
    description: "How PMs build AI legal products.",
    url: `${SITE_URL}/pm-ai-legal`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+AI+Legal+Products+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM AI Legal Products 2026 — PM Streak",
    description: "How PMs build AI legal products.",
    images: [`${SITE_URL}/api/og?title=PM+AI+Legal+Products+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Citation integrity is the bar — fabricated cases are career-ending",
  "Associate-level tasks (review, summarise, first-draft) are the sweet spot",
  "Partner-level judgment stays human — for now",
  "Data residency and privilege matter — firms need dedicated tenancy",
  "Billable-hour economics complicate adoption — firms incentivised to not automate",
];

const METRICS = [
  "Hours saved per matter",
  "Citation accuracy",
  "Partner review pass rate (AI drafts that need minimal edits)",
  "Seat adoption within firms",
  "Enterprise renewal rate",
];

const FAQS = [
  {
    q: "How do legal tech PMs handle billable-hour misalignment?",
    a: "Sell to alternative fee arrangements (AFA), in-house legal (GCs benefit from speed), and firms that are shifting to value-billing. Pure billable-hour firms are slow to adopt because speed hurts revenue. In-house and flat-fee firms move fastest.",
  },
];

export default function PmAiLegalPage() {
  const dates = pageDates("/pm-ai-legal");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM AI Legal", url: `${SITE_URL}/pm-ai-legal` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM AI Legal Products (2026 Edition)",
        description:
          "How PMs build AI legal products. Contract review, case research, drafting, and why law firms are finally deploying LLMs in earnest.",
        image: `${SITE_URL}/api/og?title=PM+AI+Legal+Products+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-ai-legal`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>⚖️</span> Citation integrity is non-negotiable in legal AI
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM AI Legal Products<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Legal AI products win or lose on citation integrity, since a single fabricated case citation can end a lawyer&apos;s career, which is why the safest wedge is associate-level work — reviewing, summarising, and first-drafting documents — rather than partner-level judgment calls. Adoption is fastest inside in-house legal teams and flat-fee firms, because traditional billable-hour firms have little financial incentive to automate work they currently bill by the hour.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for AI legal PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build AI Legal PM Skills — Free →
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

        <RelatedPages slug="pm-ai-legal" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice AI Legal PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
