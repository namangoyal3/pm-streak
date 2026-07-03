import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM + Sales Collaboration for B2B (2026) — How to Work With Sales Without Being Owned By Sales",
  description:
    "How B2B PMs collaborate with sales teams effectively. Intake processes, deal desk alignment, saying no, and turning sales signal into product insight.",
  keywords: [
    "PM sales collaboration", "B2B PM sales",
    "customer requests PM", "deal desk PM",
    "PM GTM collaboration 2026",
  ],
  alternates: { canonical: "/pm-b2b-sales-collaboration" },
  openGraph: {
    title: "PM + Sales Collaboration 2026 — PM Streak",
    description: "How B2B PMs collaborate with sales without being owned by sales — structure, signal, and saying no.",
    url: `${SITE_URL}/pm-b2b-sales-collaboration`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+++Sales+Collaboration+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM + Sales Collaboration 2026 — PM Streak",
    description: "How B2B PMs collaborate with sales without being owned by sales — structure, signal, and saying no.",
    images: [`${SITE_URL}/api/og?title=PM+++Sales+Collaboration+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PRINCIPLES = [
  "Sales is your best signal source — not your product roadmap",
  "Every customer request is data; not every request becomes a feature",
  "Visible intake process beats ad-hoc Slack requests — structure signals respect",
  "Meet sales where they are — ride-along on 3 calls/quarter builds trust",
  "Never promise what engineering hasn&apos;t committed to — disappointed customers come back to product, not sales",
];

const INTAKE_PROCESS = [
  { step: "Single intake form", what: "Customer ask, ARR impact, competitor involved, timeline sensitivity" },
  { step: "Weekly triage", what: "PM + Sales lead review new requests. Categorise: build, workaround, decline." },
  { step: "Response within 3 business days", what: "Every request gets a human response. Silence erodes trust." },
  { step: "Transparent roadmap", what: "Share quarterly priorities with sales. &apos;Why your request isn&apos;t happening&apos; is always better than silence." },
  { step: "Win/loss feedback loop", what: "Monthly review of why deals closed or lost. Patterns inform product." },
];

const SAY_NO_MOVES = [
  "Frame as trade-off, not rejection: &apos;To ship X, we&apos;d defer Y — is the trade right?&apos;",
  "Offer alternatives: &apos;We won&apos;t build this, but here&apos;s a workaround&apos;",
  "Explain the bar: &apos;This helps 1 customer vs 50 that our current roadmap serves&apos;",
  "Surface frequency: &apos;You&apos;re the first to ask — let&apos;s see if it compounds&apos;",
  "Revisit periodically: &apos;Let&apos;s review this in 2 quarters if it keeps coming up&apos;",
];

const SIGNAL_FROM_SALES = [
  "Top 3 reasons deals are lost this quarter — direct product gaps",
  "Objections that come up in 50%+ of demos — likely positioning or feature issues",
  "Features customers bring up unprompted — latent demand",
  "Configuration or workflow requests that happen repeatedly — unmet needs",
  "Integrations asked for by 3+ customers in a quarter — ecosystem priorities",
];

const FAQS = [
  {
    q: "How do B2B PMs avoid being driven entirely by sales?",
    a: "Build structure. Without a visible intake process, sales requests come via 1:1 pressure — which favours the loudest, not the most important. With structure (intake form, triage, quarterly roadmap share), requests become comparable and decisions become transparent. The PMs who feel &apos;owned by sales&apos; usually haven&apos;t built this structure yet.",
  },
  {
    q: "Should PMs attend sales calls?",
    a: "Yes — 3–5 calls per quarter, ideally from different segments. Not to sell; to listen. You&apos;ll hear objections, context, and language that never makes it into CRM notes. PMs who never attend sales calls have a thinner understanding of their customers than PMs who do.",
  },
  {
    q: "What&apos;s the biggest PM + Sales collaboration mistake?",
    a: "Opacity. PMs who don&apos;t share the roadmap, don&apos;t explain prioritisation logic, and don&apos;t respond to requests create resentment. Sales then loses trust and either escalates or works around PM. Transparency — even when the answer is &apos;no&apos; — is how PM + Sales partnerships stay healthy over quarters.",
  },
];

export default function PmB2bSalesCollaborationPage() {
  const dates = pageDates("/pm-b2b-sales-collaboration");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM + Sales Collaboration", url: `${SITE_URL}/pm-b2b-sales-collaboration` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM + Sales Collaboration (B2B 2026 Edition)",
        description:
          "How B2B PMs collaborate with sales teams effectively. Intake processes, deal desk alignment, saying no, and turning sales signal into product insight.",
        image: `${SITE_URL}/api/og?title=PM+++Sales+Collaboration+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-b2b-sales-collaboration`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🤝</span> Great B2B PMs partner with sales. Weak ones get captured by it.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM + Sales Collaboration<br />(B2B 2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Effective B2B PM-sales collaboration runs on a structured intake process — a single request form, weekly triage, a three-day response guarantee, and a transparent quarterly roadmap — rather than ad-hoc Slack pressure. Sales calls and win/loss reviews then become the signal source that shapes the roadmap, while a clear framework for saying no keeps requests from dictating priorities.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 collaboration principles, 5-step intake process, 5 moves for saying no well,
            and 5 signals sales teams can reliably provide.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build B2B PM Skills Daily — Free →
          </Link>
        </section>

        {/* Principles */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Collaboration Principles</h2>
          <div className="space-y-3">
            {PRINCIPLES.map((p, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{p}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Intake */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5-Step Intake Process</h2>
            <div className="space-y-3">
              {INTAKE_PROCESS.map((s, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-white text-sm mb-1">{i + 1}. {s.step}</p>
                  <p className="text-xs text-white/60">{s.what}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Say no */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Ways to Say No Well</h2>
          <div className="space-y-2">
            {SAY_NO_MOVES.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{s}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Signal */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Signals Sales Teams Provide</h2>
            <div className="space-y-2">
              {SIGNAL_FROM_SALES.map((s, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
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

        <RelatedPages slug="pm-b2b-sales-collaboration" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build B2B PM Muscle Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on customer requests, prioritisation, and sales partnership.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
