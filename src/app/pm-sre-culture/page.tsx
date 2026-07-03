import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM SRE Culture (2026) — Error Budgets, SLOs, and PM Responsibility for Reliability",
  description:
    "How PMs work with SRE teams. Error budgets, SLOs, postmortems, and why PMs own the tradeoff between velocity and reliability.",
  keywords: [
    "PM SRE", "error budget",
    "SLO PM 2026",
  ],
  alternates: { canonical: "/pm-sre-culture" },
  openGraph: {
    title: "PM SRE Culture 2026 — PM Streak",
    description: "How PMs work with SRE teams.",
    url: `${SITE_URL}/pm-sre-culture`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+SRE+Culture+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM SRE Culture 2026 — PM Streak",
    description: "How PMs work with SRE teams.",
    images: [`${SITE_URL}/api/og?title=PM+SRE+Culture+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const CONCEPTS = [
  "SLO — service level objective. What reliability do we promise?",
  "Error budget — allowed unreliability over a window",
  "SLI — service level indicator, actual measurement",
  "Blameless postmortems — learning &gt; blaming",
  "Chaos engineering — proactively break things to learn",
];

const PM_ROLES = [
  "Negotiate SLOs with eng and business",
  "Decide whether to spend error budget on features or reliability",
  "Prioritise reliability work alongside feature work",
  "Drive postmortem action items to completion",
  "Communicate reliability tradeoffs to stakeholders",
];

const FAQS = [
  {
    q: "Should PMs care about SLOs?",
    a: "Yes — deeply. Every feature ships at the cost of some error budget. PMs who don&apos;t engage with this tradeoff ship features that break production and get reversed. PMs who own it ship more reliably. The SLO conversation is fundamentally a product prioritisation conversation in disguise.",
  },
];

export default function PmSreCulturePage() {
  const dates = pageDates("/pm-sre-culture");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM SRE Culture", url: `${SITE_URL}/pm-sre-culture` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM SRE Culture (2026 Edition)",
        description: "How PMs work with SRE teams. Error budgets, SLOs, postmortems, and why PMs own the tradeoff between velocity and reliability.",
        image: `${SITE_URL}/api/og?title=PM+SRE+Culture+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-sre-culture`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🛠️</span> SLO conversations are product prioritisation in disguise
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM SRE Culture<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            PM SRE culture rests on five concepts — SLOs, error budgets, SLIs, blameless postmortems, and chaos engineering — paired with five PM responsibilities: negotiating SLOs, deciding whether error budget funds features or reliability, prioritising reliability work, driving postmortem action items to completion, and communicating tradeoffs to stakeholders. The SLO conversation is, underneath it, a product prioritisation conversation in disguise.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-white/60 hover:text-[#89e219] underline underline-offset-2">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 SRE concepts and 5 PM responsibilities in reliability culture.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build SRE PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Concepts</h2>
          <div className="space-y-2">
            {CONCEPTS.map((c, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{c}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 PM Roles</h2>
            <div className="space-y-2">
              {PM_ROLES.map((p, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{p}</p>
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

        <RelatedPages slug="pm-sre-culture" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice SRE PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
