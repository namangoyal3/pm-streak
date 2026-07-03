import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Writing Skills Guide (2026) — How Great PMs Write PRDs, Updates & Strategy",
  description:
    "How to write like a great PM. PRD structure, exec updates, strategy memos, and the writing habits that compound. With before/after examples.",
  keywords: [
    "PM writing skills", "product manager writing",
    "how PMs write PRDs", "exec update writing PM",
    "PM strategy memo writing", "product manager communication 2026",
  ],
  alternates: { canonical: "/pm-writing-skills" },
  openGraph: {
    title: "PM Writing Skills Guide 2026 — PM Streak",
    description: "How great PMs write — PRDs, exec updates, and strategy memos with real examples.",
    url: `${SITE_URL}/pm-writing-skills`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Writing+Skills+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Writing Skills Guide 2026 — PM Streak",
    description: "How great PMs write — PRDs, exec updates, and strategy memos with real examples.",
    images: [`${SITE_URL}/api/og?title=PM+Writing+Skills+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const RULES = [
  {
    rule: "Lead with the answer, not the setup",
    before: "Over the past 3 weeks, we've been seeing some interesting patterns in our retention data that I wanted to bring up because I think there's something worth discussing as a team...",
    after: "D7 retention dropped from 28% to 22% over 3 weeks. Likely cause: the onboarding change shipped on Oct 14. Proposal: rollback by Friday.",
    why: "Executives and engineers skim. The first sentence should be the takeaway. Everything else is evidence for that takeaway.",
  },
  {
    rule: "Cut hedging words",
    before: "I think we could potentially consider perhaps launching this next quarter, maybe in some kind of phased rollout.",
    after: "We'll launch in Q2 with a phased rollout: 10% → 50% → 100%.",
    why: "Hedging signals lack of conviction. Say what you mean. If you're uncertain, name the uncertainty directly: 'I'm 70% confident' beats 'I think maybe.'",
  },
  {
    rule: "Use numbers, not adjectives",
    before: "A lot of users are complaining about the checkout flow, and retention seems to have gotten worse recently.",
    after: "Support tickets about checkout are up 3x (from 12/week to 38/week). D7 retention is down from 24% to 18% week-over-week.",
    why: "Vague adjectives ('a lot,' 'better,' 'worse') don't inform decisions. Numbers force specificity and enable judgment.",
  },
  {
    rule: "Name names and owners",
    before: "Someone should probably look into this and figure out what we can do.",
    after: "@Priya will audit checkout analytics by Thursday and share findings. I'll own the decision on rollback by EOD Friday.",
    why: "Passive voice kills accountability. Every important action needs a name + deadline + what 'done' looks like.",
  },
  {
    rule: "Structure for scanning",
    before: "One long paragraph with multiple points and no formatting that makes the reader parse everything in order just to find what they care about.",
    after: "**Context:** retention dropped.\n**Cause:** onboarding change.\n**Proposal:** rollback Friday.\n**Owner:** me.\n**Decision needed by:** Wednesday.",
    why: "Headings, bullets, and bold text let readers skim to the part they need. This is how busy people read.",
  },
];

const DOC_TYPES = [
  {
    doc: "PRD (Product Requirements Document)",
    goal: "Align a cross-functional team on what to build and why",
    length: "2–3 pages ideal; 5 max",
    structure: "Overview → Problem → Goals/Non-goals → User Stories → Success Metrics → Design → Technical Considerations → Rollout → Open Questions",
  },
  {
    doc: "Weekly Exec Update",
    goal: "Keep leadership informed without taking their time",
    length: "5 bullets, 60 seconds to read",
    structure: "1 line summary → 3 bullets of progress → 1 blocker/risk → 1 priority for next week",
  },
  {
    doc: "Strategy Memo",
    goal: "Make a considered case for a directional change or major bet",
    length: "4–6 pages",
    structure: "TL;DR → Context → Our thesis → Evidence → Risks and mitigations → What we're NOT doing → Asks",
  },
  {
    doc: "Post-Launch Retro",
    goal: "Capture learnings from a launch, good or bad",
    length: "1–2 pages",
    structure: "What we shipped → What went well → What didn't → What we learned → What we'd do differently",
  },
  {
    doc: "Decision Doc",
    goal: "Document a reversible or hard decision so the team is aligned",
    length: "1 page",
    structure: "Decision → Context → Options considered → Why this option → Who decided → When revisited",
  },
];

const FAQS = [
  {
    q: "Why is writing such an important PM skill?",
    a: "Because PMs influence through clarity, not authority. Every time you align a team, persuade an executive, or set direction, you're doing it through written artefacts (PRDs, strategy docs, updates) as much as through conversation. PMs who write clearly get their ideas shipped; PMs who write fuzzily get endless meetings. At senior levels, writing quality increasingly separates strong from average PMs.",
  },
  {
    q: "How do you improve PM writing?",
    a: "Three habits compound: (1) write one long-form async update per week and get feedback from a peer, (2) read exceptional PM writing — Lenny Rachitsky, Shreyas Doshi, First Round Review, Packy McCormick — and steal structures, (3) ruthlessly edit your own drafts. Cut 20% of every first draft. The best PMs revise more than they write.",
  },
  {
    q: "Should PM writing be formal or casual?",
    a: "Direct. Neither formal nor casual — just direct. 'This feature will ship Q2' beats both 'We are pleased to announce the feature is targeted for Q2' AND 'lol gonna ship this in Q2 hopefully.' Clarity outranks tone. Match your audience — executives prefer brevity, engineers prefer specificity — but always prioritise clarity over register.",
  },
];

export default function PmWritingSkillsPage() {
  const dates = pageDates("/pm-writing-skills");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Writing Skills", url: `${SITE_URL}/pm-writing-skills` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Writing Skills Guide (2026 Edition)",
        description:
          "How to write like a great PM. PRD structure, exec updates, strategy memos, and the writing habits that compound. With before/after examples.",
        image: `${SITE_URL}/api/og?title=PM+Writing+Skills+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-writing-skills`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>✍️</span> Great PM writing is the multiplier on every other PM skill
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Writing Skills Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            What separates great PM writing from average PM writing isn&apos;t talent — it&apos;s five rules: leading with the
            answer, cutting hedging words, using numbers instead of adjectives, naming owners, and structuring for
            scanning. Those same rules show up across the five documents every PM writes, from two-to-three-page PRDs
            to five-bullet weekly exec updates and one-page decision docs.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 rules for great PM writing with before/after examples,
            5 document types every PM writes, and how to improve your writing deliberately.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice PM Writing Daily — Free →
          </Link>
        </section>

        {/* Rules */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Rules for Great PM Writing</h2>
          <div className="space-y-5">
            {RULES.map((r, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <h3 className="font-bold text-white mb-3">{i + 1}. {r.rule}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3">
                    <p className="text-xs text-red-400 mb-1">❌ Before</p>
                    <p className="text-sm text-white/60 italic whitespace-pre-line">{r.before}</p>
                  </div>
                  <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3">
                    <p className="text-xs text-green-400 mb-1">✅ After</p>
                    <p className="text-sm text-white/70 italic whitespace-pre-line">{r.after}</p>
                  </div>
                </div>
                <div className="bg-[#0e1113] rounded-lg px-3 py-2">
                  <p className="text-xs text-[#89e219]">💡 {r.why}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Doc types */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Document Types Every PM Writes</h2>
            <div className="space-y-4">
              {DOC_TYPES.map((d, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <p className="font-bold text-white">{d.doc}</p>
                    <span className="text-xs bg-[#1f2228] border border-white/10 rounded-full px-2 py-1 text-white/60">{d.length}</span>
                  </div>
                  <p className="text-sm text-white/60 mb-2">🎯 Goal: {d.goal}</p>
                  <p className="text-xs text-[#89e219]">📐 Structure: <span className="text-white/70">{d.structure}</span></p>
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

        <RelatedPages slug="pm-writing-skills" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Writing Muscle Daily</h2>
          <p className="text-white/60 mb-6">Practice writing PRDs, updates, and strategy memos — with AI feedback.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
