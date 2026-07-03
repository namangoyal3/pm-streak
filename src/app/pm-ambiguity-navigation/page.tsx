import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "Navigating Ambiguity as a PM (2026) — The Skill That Defines Senior PMs",
  description:
    "How PMs handle ambiguity. When the spec doesn&apos;t exist, leadership has no answer, and you&apos;re the one expected to create structure. The moves senior PMs actually use.",
  keywords: [
    "PM ambiguity", "handling ambiguity product manager",
    "PM strategic thinking", "creating structure PM",
    "senior PM ambiguity 2026",
  ],
  alternates: { canonical: "/pm-ambiguity-navigation" },
  openGraph: {
    title: "PM Ambiguity Navigation 2026 — PM Streak",
    description: "How PMs handle ambiguity — when the spec doesn&apos;t exist and you&apos;re expected to create structure.",
    url: `${SITE_URL}/pm-ambiguity-navigation`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Ambiguity+Navigation+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Ambiguity Navigation 2026 — PM Streak",
    description: "How PMs handle ambiguity — when the spec doesn&apos;t exist and you&apos;re expected to create structure.",
    images: [`${SITE_URL}/api/og?title=PM+Ambiguity+Navigation+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const MOVES = [
  {
    move: "Reframe &apos;ambiguous&apos; into specific unknowns",
    what: "Instead of &apos;this is ambiguous,&apos; list: what don&apos;t we know about users? What don&apos;t we know about the market? What don&apos;t we know about feasibility?",
  },
  {
    move: "Make a bet explicitly",
    what: "Pick a direction, explain why, name the assumptions. Decisions under uncertainty beat waiting for certainty.",
  },
  {
    move: "Write down what you&apos;ll learn, not what you&apos;ll build",
    what: "&apos;We&apos;ll know X is worth investing in if users do Y&apos; — turn ambiguity into testable predictions.",
  },
  {
    move: "Set learning milestones, not delivery milestones",
    what: "Early in ambiguous work, milestones are about what you&apos;ve learned — not what you&apos;ve shipped.",
  },
  {
    move: "Share the ambiguity with the team",
    what: "Don&apos;t pretend certainty. &apos;Here&apos;s what we don&apos;t know. Here&apos;s how we&apos;ll find out.&apos; — earns trust and engages others in the solution.",
  },
  {
    move: "Force hypothesis, test, iterate loops",
    what: "Ambiguous work isn&apos;t resolved by thinking harder. It&apos;s resolved by running small tests that reduce uncertainty week by week.",
  },
];

const SCENARIOS = [
  { scenario: "Leadership asks for a strategy you don&apos;t have context for", move: "Ask 3 clarifying questions first. Then draft a strawman. Strawmans invite feedback faster than blank-slate thinking." },
  { scenario: "New market you&apos;ve never worked in", move: "5 user interviews in week 1 before any product decision. Talking to humans compresses weeks of desk research." },
  { scenario: "Engineering gives you &apos;it depends&apos; answers", move: "Force them to give you ranges with assumptions. &apos;4–8 weeks assuming X&apos; beats &apos;it depends.&apos;" },
  { scenario: "Your own judgment feels uncertain", move: "Write a decision memo with 3 options, chosen option, assumptions, risks. The act of writing forces clarity." },
  { scenario: "Metric you&apos;re supposed to move isn&apos;t clearly defined", move: "Define it yourself, share with leadership for sign-off. Don&apos;t wait for someone else to define it — they won&apos;t." },
];

const WHY_THIS_MATTERS = [
  "At junior PM levels, someone else usually defines the problem — you execute",
  "At senior PM levels, you&apos;re given outcomes, not tasks — ambiguity IS the job",
  "Promotion from PM to Senior PM is largely a test of ambiguity handling",
  "Ambiguity-comfortable PMs get invited to bigger problems, which accelerates growth",
  "Ambiguity-averse PMs hit a career plateau — even with strong tactical skills",
];

const FAQS = [
  {
    q: "Is ambiguity tolerance teachable?",
    a: "Partially. The raw tolerance (being okay with discomfort of not knowing) varies by personality. But the skills (making bets explicit, running small tests, writing to clarify thinking) are completely teachable. Many ambiguity-anxious PMs become comfortable through deliberate practice over 6–12 months.",
  },
  {
    q: "What&apos;s the biggest mistake PMs make with ambiguous projects?",
    a: "Waiting for clarity that won&apos;t come. Many PMs expect leadership to &apos;give them direction&apos; or wait for consensus before acting. Senior PMs create direction themselves: draft a strawman, propose a plan, force alignment. The skill isn&apos;t handling clarity — it&apos;s creating it where it doesn&apos;t exist.",
  },
];

export default function PmAmbiguityNavigationPage() {
  const dates = pageDates("/pm-ambiguity-navigation");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Ambiguity Navigation", url: `${SITE_URL}/pm-ambiguity-navigation` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Navigating Ambiguity as a PM (2026 Edition)",
        description:
          "How PMs handle ambiguity. When the spec doesn&apos;t exist, leadership has no answer, and you&apos;re the one expected to create structure. The moves senior PMs actually use.",
        image: `${SITE_URL}/api/og?title=PM+Ambiguity+Navigation+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-ambiguity-navigation`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🌫️</span> Promotion from PM to Senior PM is mostly an ambiguity test
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Navigating Ambiguity as a PM<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Senior PMs handle ambiguity not by waiting for clarity but by creating it: reframing vague problems into specific unknowns, making bets explicit, writing down what they&apos;ll learn rather than what they&apos;ll build, and running hypothesis-test-iterate loops week by week. Since promotion from PM to senior PM is largely a test of this skill, ambiguity-averse PMs plateau even with strong tactical execution.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 moves senior PMs use, 5 common ambiguous scenarios and how to handle each,
            and why ambiguity handling determines career ceiling.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Judgment Daily — Free →
          </Link>
        </section>

        {/* Moves */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Moves for Navigating Ambiguity</h2>
          <div className="space-y-4">
            {MOVES.map((m, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <p className="font-bold text-white mb-1">{i + 1}. {m.move}</p>
                <p className="text-sm text-white/60">{m.what}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Scenarios */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Ambiguous Scenarios</h2>
            <div className="space-y-4">
              {SCENARIOS.map((s, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                  <p className="font-semibold text-[#89e219] text-sm mb-1">{s.scenario}</p>
                  <p className="text-sm text-white/70">{s.move}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">Why Ambiguity Handling Determines Career Ceiling</h2>
          <div className="space-y-3">
            {WHY_THIS_MATTERS.map((w, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{w}</p>
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

        <RelatedPages slug="pm-ambiguity-navigation" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Judgment in Ambiguous Scenarios Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios that force you to act without perfect information.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
