import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Prioritisation Examples (2026) — Real RICE &amp; Impact Decisions",
  description:
    "5 real-style prioritisation examples using RICE, impact-effort, and Kano. See how PMs actually weigh features and make trade-offs.",
  keywords: [
    "PM prioritisation examples", "RICE example PM",
    "real prioritisation PM", "prioritisation trade-offs",
    "impact effort example 2026",
  ],
  alternates: { canonical: "/pm-prioritization-examples" },
  openGraph: {
    title: "PM Prioritisation Examples 2026 — PM Streak",
    description: "Real-style prioritisation examples — RICE, impact-effort, Kano — and trade-off reasoning.",
    url: `${SITE_URL}/pm-prioritization-examples`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Prioritisation+Examples+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Prioritisation Examples 2026 — PM Streak",
    description: "Real-style prioritisation examples — RICE, impact-effort, Kano — and trade-off reasoning.",
    images: [`${SITE_URL}/api/og?title=PM+Prioritisation+Examples+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const EXAMPLES = [
  {
    title: "Example 1: RICE scoring for Q3 backlog",
    scenario: "A PM at a learning app has 8 candidate features for Q3. Which ships?",
    approach: "RICE (Reach × Impact × Confidence ÷ Effort)",
    analysis: "Feature A: 50K reach × 3 impact × 0.8 confidence ÷ 4 weeks = 30. Feature B: 10K × 5 × 0.6 ÷ 2 = 15. Ship A first; B second.",
    takeaway: "RICE wins the tie between Feature A and B. But RICE doesn&apos;t replace judgment — the PM overrides to ship C first because it unblocks a strategic partnership.",
  },
  {
    title: "Example 2: Impact-effort on a 2x2",
    scenario: "Team has 6 ideas for an onboarding improvement sprint.",
    approach: "Impact-effort matrix; prioritise high-impact / low-effort",
    analysis: "High-impact/low-effort: better error messages (quick win). High-impact/high-effort: redesign Step 2 (big bet). Low-impact/low-effort: copy tweaks (fillers). Low-impact/high-effort: animated transitions (skip).",
    takeaway: "Ship quick wins first while scoping the big bet. Kill the fillers to maintain focus.",
  },
  {
    title: "Example 3: Kano categorisation",
    scenario: "Fintech PM deciding which features to include in Q4 release.",
    approach: "Kano: Basic / Performance / Delighter",
    analysis: "Basic: 2FA, instant receipts (users expect these — missing would kill satisfaction). Performance: faster load time (more = better). Delighter: personalised savings tips (unexpected, boosts NPS).",
    takeaway: "Must ship Basic; invest in Performance; pick 1 Delighter. Skipping Basic fails even if Delighters are great.",
  },
  {
    title: "Example 4: Strategic override",
    scenario: "RICE says feature X wins. But a strategic competitor just launched Y.",
    approach: "RICE + strategic context",
    analysis: "RICE score favours X (customer-requested, easy). But Y ships competitor advantage in 3 months. Shifting to Y now is higher cost, lower short-term RICE — but protects against long-term competitive threat.",
    takeaway: "Frameworks inform; they don&apos;t replace strategic judgment. Senior PMs override RICE when strategy demands.",
  },
  {
    title: "Example 5: Saying no to a founder request",
    scenario: "Founder asks to add Feature Z mid-sprint. Current sprint has 2 high-RICE items.",
    approach: "Surface trade-off explicitly",
    analysis: "Z scores lower on RICE than current items. Instead of yes/no, PM presents: &apos;To add Z, we defer [current item]. Want that swap?&apos; Founder, seeing the trade-off, withdraws Z.",
    takeaway: "Best &apos;no&apos; is making the trade-off visible. Founders often ask for things without realising what they displace.",
  },
];

const PATTERNS = [
  "Frameworks are scaffolding, not verdicts — senior PMs override them when needed",
  "Always surface the trade-off — what&apos;s the thing you&apos;re NOT doing?",
  "Score honestly — inflated confidence scores are the #1 RICE abuse",
  "Multiple frameworks triangulate — use 2–3 rather than relying on one",
  "Document reasoning — future-you and future-PMs benefit",
];

const FAQS = [
  {
    q: "Do PMs actually use RICE and similar frameworks?",
    a: "Yes, but often loosely. Few PMs calculate exact RICE scores for every item. Many use RICE as a thinking structure — &apos;what&apos;s the reach, impact, confidence, effort?&apos; — without reducing to a single number. The value is structured comparison, not precision scoring.",
  },
  {
    q: "What&apos;s the biggest prioritisation mistake PMs make?",
    a: "Pretending prioritisation is objective. RICE, ICE, Kano — all are opinionated inputs dressed up as math. The confidence score is judgment. The impact score is guess. PMs who treat their RICE scores as truth get overconfident. PMs who treat them as structured guesses stay calibrated.",
  },
];

export default function PmPrioritizationExamplesPage() {
  const dates = pageDates("/pm-prioritization-examples");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Prioritisation Examples", url: `${SITE_URL}/pm-prioritization-examples` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Prioritisation Examples (2026 Edition)",
        description:
          "5 real-style prioritisation examples using RICE, impact-effort, and Kano. See how PMs actually weigh features and make trade-offs.",
        image: `${SITE_URL}/api/og?title=PM+Prioritisation+Examples+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-prioritization-examples`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🎯</span> See real prioritisation in action — not textbook theory
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Prioritisation Examples<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Five worked scenarios show prioritisation frameworks in practice: RICE scoring a Q3 backlog, an impact-effort 2x2 for onboarding ideas, Kano classification for a fintech release, a strategic override where RICE loses to competitive timing, and making a trade-off visible to push back on a founder&apos;s request. The through-line across all five: frameworks organise the reasoning, but PMs who score honestly and document trade-offs stay calibrated where others get overconfident.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 real-style examples using RICE, impact-effort, and Kano — with reasoning and takeaway for each.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice Prioritisation Daily — Free →
          </Link>
        </section>

        {/* Examples */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="space-y-5">
            {EXAMPLES.map((e, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-5">
                <p className="font-bold text-white mb-2">{e.title}</p>
                <p className="text-sm text-white/60 mb-3">Scenario: {e.scenario}</p>
                <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-lg p-3 mb-2">
                  <p className="text-xs text-[#89e219] mb-1">Approach: {e.approach}</p>
                  <p className="text-sm text-white/70">{e.analysis}</p>
                </div>
                <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3">
                  <p className="text-xs text-green-400">💡 Takeaway: <span className="text-white/70">{e.takeaway}</span></p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Patterns */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Patterns Across Great Prioritisation</h2>
            <div className="space-y-2">
              {PATTERNS.map((p, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
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

        <RelatedPages slug="pm-prioritization-examples" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Prioritisation Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on RICE, impact-effort, trade-offs, and prioritisation judgment.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
