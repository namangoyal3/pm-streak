import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Domain Knowledge Guide (2026) — How to Build Expertise in Your Product Area",
  description:
    "How PMs build deep domain expertise. The habits that compound, what to read, who to follow, and how to become the person people call when they need domain insight.",
  keywords: [
    "PM domain knowledge", "product manager domain expertise",
    "how PM builds domain depth", "PM industry knowledge",
    "product manager domain learning 2026",
  ],
  alternates: { canonical: "/pm-domain-knowledge" },
  openGraph: {
    title: "PM Domain Knowledge Guide 2026 — PM Streak",
    description: "How PMs build deep domain expertise and become the go-to person in their product area.",
    url: `${SITE_URL}/pm-domain-knowledge`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Domain+Knowledge+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Domain Knowledge Guide 2026 — PM Streak",
    description: "How PMs build deep domain expertise and become the go-to person in their product area.",
    images: [`${SITE_URL}/api/og?title=PM+Domain+Knowledge+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DEPTH_LEVELS = [
  { level: "Level 1 — Vocabulary", what: "You know the terms. You can read industry content without looking up every word.", time: "1 month of deliberate study" },
  { level: "Level 2 — Frameworks", what: "You understand the mental models the industry uses. You can explain why things work the way they do.", time: "3–6 months" },
  { level: "Level 3 — Operator intuition", what: "You know the typical metrics, benchmarks, and what 'good' looks like. You can sniff out BS.", time: "1–2 years in the space" },
  { level: "Level 4 — Strategic view", what: "You see the industry's future dynamics — regulatory shifts, competitive threats, where value will migrate.", time: "3+ years, often needs cross-company exposure" },
];

const LEARNING_HABITS = [
  {
    habit: "Read the industry canon",
    how: "Every industry has 5–10 books/essays everyone in it has read. Find them and read them. For fintech: 'Payments Systems in the US'. For SaaS: 'Behind the Cloud', Lenny's Newsletter back catalog.",
  },
  {
    habit: "Follow 10 operators on Twitter/LinkedIn",
    how: "Not influencers — actual operators. PMs, founders, practitioners who share real lessons. Twitter lists work well. Update the list quarterly as you learn who's signal and who's noise.",
  },
  {
    habit: "Read 1 earnings call transcript per quarter",
    how: "If you work in a public industry (fintech, e-commerce, SaaS), read your company's earnings calls AND your top 2 competitors'. You'll learn how executives frame strategy, challenges, and priorities.",
  },
  {
    habit: "Interview users outside your usual persona",
    how: "Most PMs talk to the same users over and over. Deliberately interview users at the edges of your persona — new users, power users, lapsed users, users who rejected your product. Each conversation adds a dimension.",
  },
  {
    habit: "Spend 30 min/week in your support queue",
    how: "The support ticket queue is the most underrated source of domain insight. You see raw user friction, unexpected use cases, and edge cases that never surface in user research. Block this time weekly.",
  },
  {
    habit: "Write publicly about your domain",
    how: "Blog posts, LinkedIn long-forms, Substack — publishing forces you to crystallise your thinking. You also build a reputation and attract experts who correct your mistakes.",
  },
];

const DOMAIN_EXAMPLES = [
  { domain: "Payments / Fintech", mustKnow: "UPI flow, NPCI rules, MDR economics, reconciliation, chargeback dynamics, fraud taxonomy, KYC levels" },
  { domain: "E-commerce", mustKnow: "Marketplace vs inventory, take rate, return economics, logistics unit economics, buyer-seller dynamics" },
  { domain: "Food delivery / Quick Commerce", mustKnow: "3-sided marketplace dynamics, dark store economics, rider utilisation, SLA breach drivers, fill rate" },
  { domain: "B2B SaaS", mustKnow: "ARR, NRR/GRR, CAC payback, PQL/MQL, expansion mechanics, enterprise sales cycles" },
  { domain: "Social / Creator", mustKnow: "Engagement types, creator economics, feed ranking signals, virality vs retention trade-offs, community health metrics" },
  { domain: "AI / ML Products", mustKnow: "Model evaluation methods, precision/recall, hallucination risk, data labelling flows, cost per inference, guardrails" },
];

const FAQS = [
  {
    q: "How long does it take to build real PM domain expertise?",
    a: "12–24 months of focused work in a domain to reach operator intuition. You can reach working vocabulary and basic frameworks in 3–6 months — enough to be credible. But the pattern recognition that lets you spot BS, predict problems, and make non-obvious bets typically takes a full product cycle (often 18+ months) in the space. Hopping between unrelated domains every 12 months prevents this depth from forming.",
  },
  {
    q: "Should PMs specialise in one domain or stay generalists?",
    a: "At early-career levels, variety is valuable — you learn faster across contexts. After 4–5 years, specialisation pays off disproportionately. A Senior PM with 5 years of deep fintech experience outperforms a generalist Senior PM applying to fintech roles, by a wide margin. That said, 'specialisation' can mean domain (fintech), function (growth, platform), or user type (enterprise, consumer) — pick the axis that most interests you.",
  },
  {
    q: "How do you evaluate domain knowledge in PM interviews?",
    a: "Interviewers probe for depth through specific questions: 'explain how X works,' 'what are the failure modes of Y,' 'how does this industry's unit economics work?' Candidates with genuine domain depth give precise, specific answers. Candidates who've only read surface content give vague, generic ones. If you can't explain payment success rates, recon, and MDR economics in a fintech interview, you haven't earned domain depth yet.",
  },
];

export default function PmDomainKnowledgePage() {
  const dates = pageDates("/pm-domain-knowledge");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Domain Knowledge", url: `${SITE_URL}/pm-domain-knowledge` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Domain Knowledge Guide (2026 Edition)",
        description:
          "How PMs build deep domain expertise. The habits that compound, what to read, who to follow, and how to become the person people call when they need domain insight.",
        image: `${SITE_URL}/api/og?title=PM+Domain+Knowledge+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-domain-knowledge`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📚</span> PM skills transfer. Domain depth compounds.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Domain Knowledge Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Building real PM domain knowledge means climbing four levels of depth — vocabulary, frameworks, operator
            intuition, and strategic view — through six compounding habits such as reading the industry canon, following
            real operators instead of influencers, and spending time in the support queue each week. Operator-level
            intuition, per the guide&apos;s own timeline, usually takes a full one-to-two-year product cycle in a single space to develop.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The 4 levels of domain depth, 6 learning habits that compound,
            and what you need to know for every major PM domain.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Domain Depth Daily — Free →
          </Link>
        </section>

        {/* Depth levels */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">The 4 Levels of PM Domain Depth</h2>
          <div className="space-y-4">
            {DEPTH_LEVELS.map((l, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                  <p className="font-bold text-white">{l.level}</p>
                  <span className="text-xs bg-green-500/10 border border-green-500/20 rounded-full px-2 py-1 text-green-400">{l.time}</span>
                </div>
                <p className="text-sm text-white/60">{l.what}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Learning habits */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Habits That Build Domain Depth</h2>
            <div className="space-y-4">
              {LEARNING_HABITS.map((h, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                  <p className="font-bold text-white mb-1">{i + 1}. {h.habit}</p>
                  <p className="text-xs text-white/60">{h.how}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Domain examples */}
        <section className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">Must-Know Knowledge for 6 PM Domains</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {DOMAIN_EXAMPLES.map((d, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-[#89e219] text-sm mb-1">{d.domain}</p>
                <p className="text-xs text-white/60">{d.mustKnow}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
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

        <RelatedPages slug="pm-domain-knowledge" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Domain Intuition in 2 Minutes a Day</h2>
          <p className="text-white/60 mb-6">Daily PM scenarios across fintech, SaaS, e-commerce, AI, and more.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
