import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Cheat Sheet (2026) — Frameworks, Metrics & Formulas on One Page",
  description:
    "The one-page PM cheat sheet. Every essential framework, metric, and formula — RICE, AARRR, PIRATE, north star, TAM/SAM/SOM, and more — in a scannable reference.",
  keywords: [
    "PM cheat sheet", "product manager cheat sheet",
    "PM frameworks one page", "PM formulas",
    "PM quick reference 2026",
  ],
  alternates: { canonical: "/pm-cheat-sheet" },
  openGraph: {
    title: "PM Cheat Sheet 2026 — PM Streak",
    description: "Every PM framework, metric, and formula on one page. Fast reference for interviews and work.",
    url: `${SITE_URL}/pm-cheat-sheet`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Cheat+Sheet+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Cheat Sheet 2026 — PM Streak",
    description: "Every PM framework, metric, and formula on one page. Fast reference for interviews and work.",
    images: [`${SITE_URL}/api/og?title=PM+Cheat+Sheet+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const FRAMEWORKS = [
  { name: "RICE", formula: "Reach × Impact × Confidence ÷ Effort", use: "Prioritisation" },
  { name: "AARRR (Pirate Metrics)", formula: "Acquisition → Activation → Retention → Referral → Revenue", use: "Funnel mapping" },
  { name: "HEART", formula: "Happiness, Engagement, Adoption, Retention, Task success", use: "UX metric framework" },
  { name: "MoSCoW", formula: "Must / Should / Could / Won&apos;t", use: "Scope prioritisation" },
  { name: "Kano", formula: "Basic / Performance / Delighter needs", use: "Feature categorisation" },
  { name: "JTBD", formula: "When [situation], I want to [motivation], so I can [outcome]", use: "User need framing" },
  { name: "North Star", formula: "One metric that captures value delivered AND leads business health", use: "Team alignment" },
  { name: "CIRCLES", formula: "Comprehend → Identify → Report → Cut → List → Evaluate → Summarise", use: "Product design interviews" },
  { name: "STAR", formula: "Situation → Task → Action → Result", use: "Behavioural interview answers" },
  { name: "OKRs", formula: "Objective (qualitative) + 3–5 Key Results (measurable)", use: "Goal setting" },
  { name: "SCQA", formula: "Situation → Complication → Question → Answer", use: "Executive writing structure" },
  { name: "SBI", formula: "Situation → Behaviour → Impact", use: "Giving feedback" },
];

const METRICS = [
  { metric: "DAU / MAU", what: "Daily / Monthly Active Users. Ratio DAU:MAU shows stickiness (>20% is great for consumer apps)." },
  { metric: "LTV : CAC", what: "Lifetime value to customer acquisition cost. 3:1 is healthy; below 1:1 is burning money." },
  { metric: "D1 / D7 / D30 Retention", what: "% of users active N days after signup. Core stickiness metric." },
  { metric: "NRR", what: "Net Revenue Retention. >100% means you grow from existing customers alone." },
  { metric: "K-factor", what: "Viral coefficient. >1 means self-sustaining growth." },
  { metric: "Conversion rate", what: "% of users who complete a specific action (signup, purchase, activation)." },
  { metric: "Churn rate", what: "% of customers lost per period. Often inverse of retention." },
  { metric: "NPS", what: "Net Promoter Score. %promoters - %detractors. 50+ is great; 0+ is healthy." },
  { metric: "Activation rate", what: "% of new signups who hit the &apos;aha&apos; action within the activation window." },
  { metric: "Time-to-value (TTV)", what: "Time from signup to first aha moment. Shorter TTV = higher retention." },
];

const FORMULAS = [
  { formula: "TAM = # potential users × ARPU × 100% capture", use: "Total Addressable Market" },
  { formula: "Viral coefficient = invites per user × conversion rate of invites", use: "Virality" },
  { formula: "LTV = ARPU × gross margin × (1 / churn rate)", use: "Customer lifetime value" },
  { formula: "CAC payback = CAC / (ARPU × gross margin)", use: "Payback period in months" },
  { formula: "Compound growth = (ending/starting)^(1/periods) - 1", use: "Growth rate calc" },
  { formula: "Expected value = Σ (outcome × probability)", use: "Decision under uncertainty" },
];

const WRITING = [
  "Lead with the answer, not setup",
  "Use numbers, not adjectives",
  "Cut hedging (just, maybe, perhaps, potentially)",
  "Name owners and deadlines explicitly",
  "Structure for scanning (headings, bullets)",
  "Aim for shorter — cut 20% of every draft",
];

const FAQS = [
  {
    q: "How should I use a PM cheat sheet?",
    a: "As a memory aid, not a script. Reference it when preparing for interviews, writing strategy docs, or structuring analysis. But don&apos;t name frameworks in interviews or work conversations — use them as invisible scaffolding. Saying &apos;I&apos;ll apply CIRCLES&apos; fails; using CIRCLES to structure your thinking without naming it wins.",
  },
  {
    q: "Are these the only frameworks PMs should know?",
    a: "No — these are the most commonly useful. There are many more (Good Strategy/Bad Strategy, Porter&apos;s Five Forces, Opportunity Solution Tree, Working Backwards). The ones on this cheat sheet are the ones you&apos;ll use most often. Depth in a handful beats breadth across many.",
  },
];

export default function PmCheatSheetPage() {
  const dates = pageDates("/pm-cheat-sheet");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Cheat Sheet", url: `${SITE_URL}/pm-cheat-sheet` },
      ])} />
      <JsonLd data={articleSchema({
        headline: "PM Cheat Sheet (2026) — Frameworks, Metrics & Formulas on One Page",
        description:
          "The one-page PM cheat sheet. Every essential framework, metric, and formula — RICE, AARRR, PIRATE, north star, TAM/SAM/SOM, and more — in a scannable reference.",
        image: `${SITE_URL}/api/og?title=PM+Cheat+Sheet+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-cheat-sheet`,
      })} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📋</span> Every PM framework and metric on one scannable page
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Cheat Sheet<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            A PM cheat sheet is a one-page reference — this one lists 12 frameworks
            (RICE, AARRR, MoSCoW, Kano, and more), 10 core metrics like DAU:MAU and LTV:CAC,
            6 formulas, and 6 writing rules — meant to be consulted before interviews or
            strategy docs, not memorised as a script.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            12 frameworks, 10 metrics, 6 formulas, and the writing rules
            every PM should have memorised. Use as reference — not script.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Internalise with Daily Practice — Free →
          </Link>
        </section>

        {/* Frameworks */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">12 Frameworks</h2>
          <div className="space-y-3">
            {FRAMEWORKS.map((f, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                  <p className="font-bold text-white">{f.name}</p>
                  <span className="text-xs bg-[#58cc02]/20 text-[#89e219] px-2 py-0.5 rounded-full">{f.use}</span>
                </div>
                <p className="text-xs text-white/60 font-mono">{f.formula}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Metrics */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">10 Core Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {METRICS.map((m, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-[#89e219] text-sm mb-1">{m.metric}</p>
                  <p className="text-xs text-white/60">{m.what}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Formulas */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Formulas to Memorise</h2>
          <div className="space-y-3">
            {FORMULAS.map((f, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="text-sm text-white/80 font-mono mb-1">{f.formula}</p>
                <p className="text-xs text-[#89e219]">{f.use}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Writing rules */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 PM Writing Rules</h2>
            <div className="space-y-2">
              {WRITING.map((w, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{w}</p>
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

        <RelatedPages slug="pm-cheat-sheet" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Internalise Frameworks Through Daily Use</h2>
          <p className="text-white/60 mb-6">Daily PM scenarios that force application of these frameworks in real contexts.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
