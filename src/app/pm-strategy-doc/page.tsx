import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "How to Write a Product Strategy Doc (2026) — PM Template + Examples",
  description:
    "The complete guide to writing a product strategy doc. Structure, section-by-section breakdown, common mistakes, and how to make your strategy doc actually get read and used.",
  keywords: [
    "product strategy doc", "how to write strategy doc PM",
    "product strategy template", "PM strategy memo",
    "strategy doc example PM 2026",
  ],
  alternates: { canonical: "/pm-strategy-doc" },
  openGraph: {
    title: "PM Strategy Doc Guide 2026 — PM Streak",
    description: "How to write a product strategy doc — template, examples, and common mistakes.",
    url: `${SITE_URL}/pm-strategy-doc`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Strategy+Doc+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Strategy Doc Guide 2026 — PM Streak",
    description: "How to write a product strategy doc — template, examples, and common mistakes.",
    images: [`${SITE_URL}/api/og?title=PM+Strategy+Doc+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const SECTIONS = [
  { section: "TL;DR", what: "A 5-line summary executives can read in 30 seconds. Bet, reasoning, expected impact, timeline.", example: "We bet on India-specific PM interview prep for Bharat candidates. Reason: underserved, 80% have no APM program access. Impact: ₹2Cr ARR by Q4. Timeline: ship v1 in 8 weeks." },
  { section: "Context", what: "What&apos;s changed or what&apos;s broken that makes this strategy necessary NOW.", example: "Our current retention curve plateaus at 18% D30 vs category peers at 40%+. We&apos;ve grown users 3x in 2 years without improving this. At current rates, CAC won&apos;t break even." },
  { section: "The Bet", what: "Your central strategic bet — in one sentence. Must be falsifiable.", example: "We&apos;ll win by being the only daily-habit PM learning product calibrated to India-specific interviews — not generic PM coaching." },
  { section: "Diagnosis", what: "Why the current state is what it is. Specific, evidence-based. Not generic.", example: "Current products don&apos;t work in India because: (1) frameworks taught are US-centric, (2) interview banks miss Flipkart/Razorpay specifics, (3) none designed for daily 2-min practice." },
  { section: "Guiding Policy", what: "The approach that makes trade-offs explicit. What we will NOT do.", example: "We will focus on India PM candidates aged 22–35. We will NOT build generic PM coaching. We will NOT serve US market for 18 months." },
  { section: "Coherent Actions", what: "3–5 specific moves that reinforce the bet. Each action should feel obvious given the bet.", example: "1) Ship India-specific question bank 2) Build daily streak mechanics 3) Partner with IIT/IIM placement cells 4) Launch freemium with AI feedback." },
  { section: "What Success Looks Like", what: "Specific metrics with numbers and timelines. Not vague ambition.", example: "By Q4: 50K DAU, 30% D30 retention, ₹2Cr ARR, NPS ≥ 50. By Y2: 250K DAU, expand to SEA." },
  { section: "Risks & Mitigations", what: "Top 3 things that could make this fail. What we&apos;ll do if they do.", example: "Risk: Flipkart launches own product. Mitigation: we move faster, go deeper on Razorpay/Zepto. Risk: AI quality insufficient. Mitigation: human review layer for first 6 months." },
  { section: "What We&apos;re NOT Doing", what: "Explicit list of deferrals. Prevents scope creep.", example: "Not building: US market, enterprise B2B, certifications, full masterclasses, employer-pays model, localisation beyond English." },
];

const MISTAKES = [
  "No clear bet — just a list of features and goals",
  "Doesn&apos;t say what you&apos;re NOT doing — which means scope will creep",
  "Vague success criteria (&apos;grow users&apos; vs &apos;50K DAU by Q4&apos;)",
  "Too long — executives won&apos;t read 15 pages of strategy",
  "No risk section — signals over-confidence or lack of rigour",
  "Passive voice everywhere (&apos;the team will&apos; vs &apos;I will&apos;)",
  "Mixing strategy with execution detail — keep roadmap separate",
  "Writing for stakeholder approval instead of genuine strategic clarity",
];

const FAQS = [
  {
    q: "How long should a product strategy doc be?",
    a: "4–6 pages is ideal. Longer than 8 pages means you&apos;re writing a deck or a plan, not a strategy. The constraint of length forces clarity — if you can&apos;t explain your strategy in 6 pages, you don&apos;t have one yet. Supporting material (detailed research, user interviews, competitive analysis) goes in appendices or linked docs.",
  },
  {
    q: "Who should a strategy doc be written for?",
    a: "The audience is your executive team and leadership peers — people who will support, fund, and make big decisions about the strategy. Write to that audience: concise, direction-setting, trade-off-making. If the same doc also needs to align your product team, consider writing a separate (longer) roadmap companion doc instead of bloating the strategy.",
  },
  {
    q: "How often should product strategy docs be updated?",
    a: "Refresh core strategy annually (or on major market shifts). Update tactical plans quarterly. If you&apos;re updating your strategy every quarter, it wasn&apos;t really a strategy — it was a roadmap. Strategies should be durable for 12–24 months; tactics and roadmaps respond to real-time signals.",
  },
];

export default function PmStrategyDocPage() {
  const dates = pageDates("/pm-strategy-doc");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Strategy Doc", url: `${SITE_URL}/pm-strategy-doc` },
      ])} />
      <JsonLd data={articleSchema({
        headline: "How to Write a Product Strategy Doc (2026)",
        description: "The complete guide to writing a product strategy doc. Structure, section-by-section breakdown, common mistakes, and how to make your strategy doc actually get read and used.",
        image: `${SITE_URL}/api/og?title=PM+Strategy+Doc+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-strategy-doc`,
      })} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📄</span> Strategy docs that make trade-offs explicit get funded
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            How to Write a Product<br />Strategy Doc (2026)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            A product strategy doc runs 4–6 pages across nine sections — TL;DR, context, the bet,
            diagnosis, guiding policy, coherent actions, success metrics, risks, and what you&apos;re
            not doing — written for executives, not your product team, and refreshed annually rather
            than every quarter. The single biggest failure mode is skipping the guiding policy and
            &quot;what we&apos;re not doing&quot; sections, which is how scope creep sneaks back in.
          </p>
          <p className="text-sm text-white/50 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The 9-section template senior PMs use to write strategy docs that actually get read —
            with real examples for each section and 8 common mistakes to avoid.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice Strategy Questions Daily — Free →
          </Link>
        </section>

        {/* Sections */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="space-y-5">
            {SECTIONS.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-5">
                <p className="font-bold text-white mb-1">{i + 1}. {s.section}</p>
                <p className="text-sm text-white/60 mb-3">{s.what}</p>
                <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-lg p-3">
                  <p className="text-xs text-[#89e219] mb-1">💡 Example</p>
                  <p className="text-xs text-white/70 italic">{s.example}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mistakes */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">8 Strategy Doc Mistakes</h2>
            <div className="space-y-2">
              {MISTAKES.map((m, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-red-400 flex-shrink-0">❌</span>
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

        <RelatedPages slug="pm-strategy-doc" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Strategic Thinking Daily</h2>
          <p className="text-white/60 mb-6">Scenarios that force you to make trade-offs explicit — with AI feedback.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
