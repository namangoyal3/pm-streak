import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Negotiation (2026) — Roadmap Trades, Scope, and Salary",
  description:
    "How PMs negotiate — roadmap trades, scope cuts, partner deals, and compensation. Tactics that work without burning relationships.",
  keywords: [
    "PM negotiation", "roadmap negotiation",
    "PM salary negotiation", "scope negotiation 2026",
  ],
  alternates: { canonical: "/pm-negotiation" },
  openGraph: {
    title: "PM Negotiation 2026 — PM Streak",
    description: "How PMs negotiate — roadmap, scope, salary.",
    url: `${SITE_URL}/pm-negotiation`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Negotiation+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Negotiation 2026 — PM Streak",
    description: "How PMs negotiate — roadmap, scope, salary.",
    images: [`${SITE_URL}/api/og?title=PM+Negotiation+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PRINCIPLES = [
  "Know your BATNA — best alternative if this deal fails",
  "Understand the other side&apos;s constraints — most deals fail because you never asked",
  "Trade variables — scope, time, quality, cost. Something always gives",
  "Anchor high but not absurd — credibility matters across many negotiations",
  "Silence is a tactic — quiet makes the other side fill the space",
];

const SCENARIOS = [
  "Eng says feature needs 3 months, PM has 6 weeks — trade scope or quality",
  "Sales wants a custom feature for one deal — weigh deal value vs roadmap cost",
  "Partner wants exclusivity — what do you get in return?",
  "Salary renegotiation — data, market, and outside offers are the levers",
];

const FAQS = [
  {
    q: "Should PMs negotiate with engineers?",
    a: "Collaborate, not negotiate adversarially. Engineers respond to understanding their constraints, not to pressure. Ask &apos;what would need to be true for this to take 2 weeks instead of 6?&apos; rather than &apos;can you do it faster?&apos; The first opens problem-solving; the second closes it.",
  },
];

export default function PmNegotiationPage() {
  const dates = pageDates("/pm-negotiation");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Negotiation", url: `${SITE_URL}/pm-negotiation` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Negotiation (2026 Edition)",
        description:
          "How PMs negotiate — roadmap trades, scope cuts, partner deals, and compensation. Tactics that work without burning relationships.",
        image: `${SITE_URL}/api/og?title=PM+Negotiation+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-negotiation`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>⚖️</span> Every PM day includes ten small negotiations
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Negotiation<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            PM negotiation shows up in scope trades with engineering, one-off feature asks from sales, exclusivity terms from partners, and salary renegotiations — and each is won less by pressure than by knowing your BATNA, understanding the other side&apos;s constraints, anchoring high without losing credibility, and letting silence do some of the work.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 principles and 4 common PM negotiation scenarios.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Negotiation PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Principles</h2>
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
            <h2 className="text-2xl font-bold text-center mb-10">4 Scenarios</h2>
            <div className="space-y-2">
              {SCENARIOS.map((s, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{s}</p>
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

        <RelatedPages slug="pm-negotiation" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Negotiation Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
