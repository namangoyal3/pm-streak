import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Sprint Planning Guide (2026) — Run Sprints That Ship",
  description:
    "How PMs run sprint planning that actually ships. Agenda, capacity estimation, story writing, dependency mapping, and how to avoid the 3 biggest sprint anti-patterns.",
  keywords: [
    "PM sprint planning", "product manager sprint",
    "agile sprint planning PM", "sprint capacity PM",
    "PM sprint agenda 2026",
  ],
  alternates: { canonical: "/pm-sprint-planning" },
  openGraph: {
    title: "PM Sprint Planning Guide 2026 — PM Streak",
    description: "How PMs run sprint planning that ships — agenda, capacity, dependencies, and anti-patterns.",
    url: `${SITE_URL}/pm-sprint-planning`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Sprint+Planning+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Sprint Planning Guide 2026 — PM Streak",
    description: "How PMs run sprint planning that ships — agenda, capacity, dependencies, and anti-patterns.",
    images: [`${SITE_URL}/api/og?title=PM+Sprint+Planning+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const AGENDA = [
  { step: "Review last sprint (10 min)", what: "What shipped, what slipped, why. One-line retro." },
  { step: "Align on sprint goal (10 min)", what: "ONE primary outcome for this sprint. Not 5 goals." },
  { step: "Walk through ranked backlog (20 min)", what: "Top items explained in enough detail to estimate." },
  { step: "Capacity estimation (15 min)", what: "Engineering + design estimate each item. PM holds scope, not pressure." },
  { step: "Commit (10 min)", what: "Decide what goes in. Leave 15–20% buffer for surprises." },
  { step: "Dependency + risk scan (5 min)", what: "What could block this sprint? What&apos;s waiting on another team?" },
];

const ANTI_PATTERNS = [
  "Planning for 100% capacity — every sprint has surprises; plan for them",
  "Multi-goal sprints — 1 sprint goal = focus; 5 goals = chaos",
  "Skipping story writing — vague tickets become mid-sprint arguments",
  "PM over-specifying HOW — tell engineering WHAT, let them own HOW",
  "Committing to features without clear acceptance criteria — quality suffers",
  "Running sprint planning longer than 90 minutes — you&apos;re doing it wrong",
];

const STORY_TEMPLATE = [
  "Title: verb + noun (&apos;Add dark mode toggle&apos;)",
  "User story: As a [persona], I want [action], so I can [outcome]",
  "Acceptance criteria: 3–5 testable conditions — QA should be able to write tests from these",
  "Out of scope: what this ticket does NOT include",
  "Design link: Figma or mockup if relevant",
  "Dependencies: what&apos;s needed from other teams or systems",
];

const FAQS = [
  {
    q: "How long should sprint planning take?",
    a: "60–90 minutes for a 2-week sprint. Less and you haven&apos;t actually planned; more and you&apos;ve wasted the team&apos;s time on discussion that should have happened async. The quality of sprint planning depends on pre-read preparation: a well-written backlog, clear next-up items, and engineering-ready stories.",
  },
  {
    q: "What&apos;s the PM&apos;s role in sprint planning?",
    a: "Facilitate, don&apos;t estimate. PMs own the backlog, the goal, and the WHAT. Engineering owns the estimates and the HOW. PMs who push back on estimates (&apos;can&apos;t you do it faster?&apos;) erode trust; PMs who facilitate explicit trade-offs (&apos;if we include X, we&apos;d defer Y — is that the right call?&apos;) build trust.",
  },
  {
    q: "Should PMs attend daily standups?",
    a: "Yes — but briefly and non-interrupting. Standups help PMs stay aligned on progress and unblock fast. PMs who skip standups lose connection with reality; PMs who dominate standups make them boring for everyone. The balance: attend, listen, speak only if asked or if you have a quick decision to unblock someone.",
  },
];

export default function PmSprintPlanningPage() {
  const dates = pageDates("/pm-sprint-planning");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Sprint Planning", url: `${SITE_URL}/pm-sprint-planning` },
      ])} />
      <JsonLd data={articleSchema({
        headline: "PM Sprint Planning Guide (2026 Edition)",
        description: "How PMs run sprint planning that actually ships. Agenda, capacity estimation, story writing, dependency mapping, and how to avoid the 3 biggest sprint anti-patterns.",
        image: `${SITE_URL}/api/og?title=PM+Sprint+Planning+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-sprint-planning`,
      })} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🏃</span> Great sprints ship. Great sprint planning makes it possible.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Sprint Planning Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            PM sprint planning fits into 60–90 minutes for a two-week sprint, moving through six
            steps — reviewing the last sprint, aligning on one sprint goal, walking the ranked
            backlog, estimating capacity, committing with 15–20% buffer, and scanning for
            dependencies — with the PM facilitating scope decisions rather than pushing
            engineering&apos;s estimates. The single-goal rule matters most: one sprint goal creates
            focus, five create chaos.
          </p>
          <p className="text-sm text-white/50 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6-step sprint planning agenda, 6 story writing rules,
            and the 6 anti-patterns that turn good teams into scattered ones.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice Execution Skills Daily — Free →
          </Link>
        </section>

        {/* Agenda */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6-Step Sprint Planning Agenda</h2>
          <div className="space-y-3">
            {AGENDA.map((a, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-white text-sm mb-1">{i + 1}. {a.step}</p>
                <p className="text-xs text-white/60">{a.what}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Story template */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6-Part Story Writing Template</h2>
            <div className="space-y-2">
              {STORY_TEMPLATE.map((s, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{s}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Anti-patterns */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Sprint Planning Anti-Patterns</h2>
          <div className="space-y-2">
            {ANTI_PATTERNS.map((a, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-red-400 flex-shrink-0">❌</span>
                <p className="text-sm text-white/70">{a}</p>
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

        <RelatedPages slug="pm-sprint-planning" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Execution Skills Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on sprint trade-offs, scope, and stakeholder alignment.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
