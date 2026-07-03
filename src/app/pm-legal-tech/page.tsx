import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Legal Tech (2026) — Harvey, Ironclad, SpotDraft PM Guide",
  description:
    "How PMs build legal tech products. Contract lifecycle, legal research, AI-assisted drafting, and the slow but real digitisation of legal workflows.",
  keywords: [
    "PM legal tech", "Harvey PM",
    "Ironclad PM", "SpotDraft PM 2026",
  ],
  alternates: { canonical: "/pm-legal-tech" },
  openGraph: {
    title: "PM Legal Tech 2026 — PM Streak",
    description: "How PMs build legal tech products.",
    url: `${SITE_URL}/pm-legal-tech`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Legal+Tech+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Legal Tech 2026 — PM Streak",
    description: "How PMs build legal tech products.",
    images: [`${SITE_URL}/api/og?title=PM+Legal+Tech+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Lawyers hate change — adoption comes through trust, not feature count",
  "Hallucinations are career-ending for legal — eval bar is brutal",
  "Citation integrity is the product — wrong cases = malpractice exposure",
  "Workflow integration (Word, Outlook, SharePoint) matters more than web UI",
  "Sales cycles are long — 6–12 months for enterprise legal buys",
];

const METRICS = [
  "Hours saved per matter/contract",
  "Citation accuracy rate",
  "Contract redlining turnaround time",
  "Per-firm license utilisation",
  "NPS among partners, not just associates",
];

const FAQS = [
  {
    q: "Why is legal tech finally taking off in 2026?",
    a: "LLMs crossed the reliability threshold for contract review, legal research, and drafting. Harvey, Ironclad, SpotDraft, and CaseText all hit material ARR because the tech finally matches the precision bar. Earlier tools failed because 95% accuracy meant 5% malpractice risk. The new baseline is higher.",
  },
];

export default function PmLegalTechPage() {
  const dates = pageDates("/pm-legal-tech");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Legal Tech", url: `${SITE_URL}/pm-legal-tech` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Legal Tech (2026 Edition)",
        description: "How PMs build legal tech products. Contract lifecycle, legal research, AI-assisted drafting, and the slow but real digitisation of legal workflows.",
        image: `${SITE_URL}/api/og?title=PM+Legal+Tech+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-legal-tech`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>⚖️</span> In legal tech, hallucination isn&apos;t a bug — it&apos;s a lawsuit
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Legal Tech<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            In legal tech, adoption hinges on trust rather than feature count, because a single hallucinated citation carries malpractice exposure — so PMs are judged on citation accuracy, contract redlining turnaround, and NPS from partners, not associates, while sales cycles stretch six to twelve months as firms integrate tools directly into Word, Outlook, and SharePoint.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for legal tech PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Legal Tech PM Skills — Free →
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

        <RelatedPages slug="pm-legal-tech" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Legal Tech PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
