import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Prioritization Frameworks (2026) — RICE, MoSCoW, Kano & More",
  description:
    "The 8 prioritization frameworks every PM should know. RICE, MoSCoW, Kano, Impact-Effort, Cost of Delay, and when to use each.",
  keywords: [
    "PM prioritization frameworks", "RICE prioritization",
    "MoSCoW PM", "Kano model PM",
    "impact effort matrix PM 2026",
  ],
  alternates: { canonical: "/pm-prioritization-frameworks" },
  openGraph: {
    title: "PM Prioritization Frameworks 2026 — PM Streak",
    description: "8 prioritization frameworks every PM should know — RICE, MoSCoW, Kano, and when to use each.",
    url: `${SITE_URL}/pm-prioritization-frameworks`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Prioritization+Frameworks+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Prioritization Frameworks 2026 — PM Streak",
    description: "8 prioritization frameworks every PM should know — RICE, MoSCoW, Kano, and when to use each.",
    images: [`${SITE_URL}/api/og?title=PM+Prioritization+Frameworks+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const FRAMEWORKS = [
  {
    name: "RICE Scoring",
    formula: "Reach × Impact × Confidence ÷ Effort",
    bestFor: "Quantitative backlog prioritisation with moderate data",
    limit: "Only as good as your estimates — confidence scores are often inflated",
  },
  {
    name: "MoSCoW",
    formula: "Must have / Should have / Could have / Won&apos;t have",
    bestFor: "Quick scoping conversations with stakeholders, sprint planning",
    limit: "Doesn&apos;t force relative priority within buckets — everything becomes &apos;Must&apos;",
  },
  {
    name: "Impact-Effort Matrix",
    formula: "2×2 grid: High/Low Impact vs High/Low Effort",
    bestFor: "Visual prioritisation in team workshops, early ideation",
    limit: "Oversimplifies — &apos;Impact&apos; is multi-dimensional in real products",
  },
  {
    name: "Kano Model",
    formula: "Basic needs + Performance + Delighters",
    bestFor: "Feature categorisation — what&apos;s table stakes vs. differentiator",
    limit: "Delighters become basic needs over time; requires re-evaluation",
  },
  {
    name: "Cost of Delay (CD3)",
    formula: "Weighted score: CoD ÷ Duration",
    bestFor: "Lean/agile environments where time-to-market is critical",
    limit: "Requires good cost-of-delay estimates, which are often speculative",
  },
  {
    name: "Opportunity Scoring (Anthony Ulwick)",
    formula: "Importance × (1 - Satisfaction)",
    bestFor: "Finding underserved user needs from survey data",
    limit: "Needs decent user research data to apply meaningfully",
  },
  {
    name: "ICE Scoring",
    formula: "Impact × Confidence × Ease",
    bestFor: "Quick prioritisation when you don&apos;t have Reach estimates",
    limit: "Simpler than RICE but less rigorous; same estimation issues",
  },
  {
    name: "Value vs Complexity",
    formula: "2×2 grid: Business Value vs Implementation Complexity",
    bestFor: "Executive roadmap conversations — business-language framing",
    limit: "Vague &apos;value&apos; definition — can hide real trade-offs",
  },
];

const WHEN_TO_USE = [
  { context: "Long backlog (30+ items), moderate data", pick: "RICE or ICE" },
  { context: "Sprint scoping with engineering", pick: "MoSCoW" },
  { context: "Visual team workshop", pick: "Impact-Effort Matrix" },
  { context: "New feature investment decision", pick: "Kano" },
  { context: "Time-sensitive initiatives", pick: "Cost of Delay" },
  { context: "User research-driven prioritisation", pick: "Opportunity Scoring" },
  { context: "Exec presentation on roadmap", pick: "Value vs Complexity" },
];

const FAQS = [
  {
    q: "Which prioritization framework is best?",
    a: "No single framework is universally best — they serve different purposes. RICE works well for long backlogs with data. MoSCoW is good for stakeholder conversations. Impact-Effort is good for quick visual workshops. Great PMs use multiple frameworks depending on the context. The failure mode is picking one and applying it everywhere.",
  },
  {
    q: "Should PMs show their prioritization framework to stakeholders?",
    a: "Share the structure, not the scores. Telling stakeholders &apos;we used RICE, here&apos;s the score&apos; invites them to argue the numbers, not the decision. Show: the user problem, the trade-off considered, the recommendation. Use the framework internally to structure thinking, but present the output, not the calculation.",
  },
  {
    q: "How do you deal with stakeholders who always want their item prioritised?",
    a: "Make the trade-off explicit. &apos;If we fit your ask in, we defer X — which affects Y other stakeholders. Which swap makes sense?&apos; Frameworks help here because they make the trade-off non-personal. Most stakeholders will de-prioritise their own ask once they see what it displaces.",
  },
];

export default function PmPrioritizationFrameworksPage() {
  const dates = pageDates("/pm-prioritization-frameworks");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Prioritization Frameworks", url: `${SITE_URL}/pm-prioritization-frameworks` },
      ])} />
      <JsonLd data={articleSchema({
        headline: "PM Prioritization Frameworks (2026) — RICE, MoSCoW, Kano & More",
        description:
          "The 8 prioritization frameworks every PM should know. RICE, MoSCoW, Kano, Impact-Effort, Cost of Delay, and when to use each.",
        image: `${SITE_URL}/api/og?title=PM+Prioritization+Frameworks+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-prioritization-frameworks`,
      })} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🎯</span> Prioritisation is 80% of PM work. Frameworks make it 10x faster.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Prioritization Frameworks<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Which prioritization framework should a PM use? This page compares eight —
            RICE, MoSCoW, Impact-Effort Matrix, Kano, Cost of Delay, Opportunity Scoring,
            ICE, and Value vs Complexity — alongside their formulas, best-fit contexts,
            and limitations, so the choice depends on the situation rather than a single default.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            8 prioritization frameworks every PM should know — formula, best use,
            limitations, and when to pick each in real work.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice Prioritisation Daily — Free →
          </Link>
        </section>

        {/* Frameworks */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="space-y-4">
            {FRAMEWORKS.map((f, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-5">
                <p className="font-bold text-white mb-2">{i + 1}. {f.name}</p>
                <p className="text-sm text-[#89e219] font-mono mb-3">{f.formula}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3">
                    <p className="text-xs text-green-400 mb-1">✅ Best for</p>
                    <p className="text-xs text-white/70">{f.bestFor}</p>
                  </div>
                  <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-3">
                    <p className="text-xs text-yellow-400 mb-1">⚠️ Limitation</p>
                    <p className="text-xs text-white/70">{f.limit}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* When to use */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">Which to Pick, When</h2>
            <div className="space-y-3">
              {WHEN_TO_USE.map((w, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm text-white/70">{w.context}</p>
                  <span className="text-xs bg-[#58cc02]/20 text-[#89e219] px-3 py-1 rounded-full font-semibold">{w.pick}</span>
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

        <RelatedPages slug="pm-prioritization-frameworks" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Prioritisation Intuition Daily</h2>
          <p className="text-white/60 mb-6">Scenarios that force real trade-offs — not just framework memorisation.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
