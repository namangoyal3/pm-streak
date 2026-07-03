import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Microservices Strategy (2026) — When PMs Should Care About Architecture",
  description:
    "When microservices help, when they hurt, and what PMs need to know to navigate architecture decisions without overstepping into engineering territory.",
  keywords: [
    "PM microservices", "PM architecture 2026",
  ],
  alternates: { canonical: "/pm-microservices-strategy" },
  openGraph: {
    title: "PM Microservices Strategy 2026 — PM Streak",
    description: "When PMs should care about architecture.",
    url: `${SITE_URL}/pm-microservices-strategy`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Microservices+Strategy+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Microservices Strategy 2026 — PM Streak",
    description: "When PMs should care about architecture.",
    images: [`${SITE_URL}/api/og?title=PM+Microservices+Strategy+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const WHEN_PMS_CARE = [
  "When architecture decides time-to-market for new features",
  "When team boundaries map to service boundaries",
  "When migration cost gates a roadmap",
  "When cost-of-change shapes prioritisation",
];

const REALITIES = [
  "Microservices solve org coordination, not always tech complexity",
  "Premature decomposition is more painful than monolith debt",
  "Modular monolith is the right answer for many teams",
  "PM doesn&apos;t make the call — but should understand the tradeoff",
];

const FAQS = [
  {
    q: "Should PMs push for microservices?",
    a: "No — that&apos;s an engineering call. PMs should understand the implications: ownership clarity, team independence, deployment velocity. If your engineering org is wrestling with monolith bottlenecks, microservices may help. If the bottleneck is testing, observability, or culture, microservices may make it worse.",
  },
];

export default function PmMicroservicesStrategyPage() {
  const dates = pageDates("/pm-microservices-strategy");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Microservices Strategy", url: `${SITE_URL}/pm-microservices-strategy` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Microservices Strategy (2026 Edition)",
        description: "When microservices help, when they hurt, and what PMs need to know to navigate architecture decisions without overstepping into engineering territory.",
        image: `${SITE_URL}/api/og?title=PM+Microservices+Strategy+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-microservices-strategy`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🧱</span> Architecture is engineering&apos;s call. Implications are PM&apos;s job to understand.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Microservices Strategy<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Microservices strategy isn&apos;t a PM&apos;s call to make, but four situations still demand PM engagement: when architecture gates time-to-market, when team boundaries mirror service boundaries, when migration cost blocks the roadmap, and when cost-of-change shapes prioritisation. The tradeoff PMs need to grasp is that microservices solve organisational coordination more often than technical complexity — and premature decomposition usually hurts worse than monolith debt.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-white/60 hover:text-[#89e219] underline underline-offset-2">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            4 situations PMs should engage and 4 realities to keep in mind.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Architecture-Aware PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">When PMs Care</h2>
          <div className="space-y-2">
            {WHEN_PMS_CARE.map((w, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{w}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">4 Realities</h2>
            <div className="space-y-2">
              {REALITIES.map((r, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{r}</p>
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

        <RelatedPages slug="pm-microservices-strategy" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Architecture-Aware PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
