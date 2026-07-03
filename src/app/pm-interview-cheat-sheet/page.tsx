import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Interview Cheat Sheet (2026) — One-Page Interview Prep Reference",
  description:
    "The one-page PM interview cheat sheet. Frameworks, openings, transitions, closings — everything you need to remember before walking in.",
  keywords: [
    "PM interview cheat sheet", "PM interview reference",
    "PM interview one pager", "PM interview quick guide",
    "PM interview prep 2026",
  ],
  alternates: { canonical: "/pm-interview-cheat-sheet" },
  openGraph: {
    title: "PM Interview Cheat Sheet 2026 — PM Streak",
    description: "One-page PM interview reference — frameworks, openings, transitions, closings.",
    url: `${SITE_URL}/pm-interview-cheat-sheet`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Interview+Cheat+Sheet+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Interview Cheat Sheet 2026 — PM Streak",
    description: "One-page PM interview reference — frameworks, openings, transitions, closings.",
    images: [`${SITE_URL}/api/og?title=PM+Interview+Cheat+Sheet+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const OPENINGS = [
  { type: "Product design question", opening: "&apos;Before I propose solutions, let me make sure I understand the scope. [Clarifying question]&apos;" },
  { type: "Metric drop question", opening: "&apos;Let me rule out data issues first, then segment to find where the change lives.&apos;" },
  { type: "Behavioural / STAR", opening: "&apos;Let me walk you through a specific moment. At [Company], in [quarter]...&apos;" },
  { type: "Strategy / market entry", opening: "&apos;Let me clarify the strategic intent first. Are we optimising for [A] or [B]?&apos;" },
  { type: "Estimation", opening: "&apos;Let me walk you through my assumptions — I&apos;d rather show structure than guess a number.&apos;" },
];

const TRANSITIONS = [
  "&apos;Now that I&apos;ve defined the user, let me propose 3 solutions...&apos;",
  "&apos;Before I pick my recommendation, let me walk through the trade-offs...&apos;",
  "&apos;Let me check if my metric choice makes sense — I want to move [X] because [Y]...&apos;",
  "&apos;Given my confidence level here, I&apos;d want to validate with [research or test] before committing...&apos;",
  "&apos;To make sure I&apos;m answering your question, let me summarise what I&apos;ve said and ask if this is on track...&apos;",
];

const CLOSINGS = [
  "&apos;To summarise: user is X, problem is Y, recommendation is Z, success metric is W.&apos;",
  "&apos;What I&apos;d do differently with more information: validate [assumption] through [method].&apos;",
  "&apos;Two risks to flag: [risk 1] and [risk 2]. Mitigations: [plan].&apos;",
  "&apos;Is there a specific dimension you&apos;d like me to go deeper on?&apos;",
  "&apos;What I&apos;d NOT do and why: [explicit non-goal].&apos;",
];

const FRAMEWORKS_TO_REMEMBER = [
  "RICE: Reach × Impact × Confidence ÷ Effort",
  "JTBD: When [situation], I want [motivation], so I can [outcome]",
  "AARRR: Acquisition → Activation → Retention → Referral → Revenue",
  "CIRCLES: Comprehend → Identify → Report → Cut → List → Evaluate → Summarise",
  "STAR: Situation → Task → Action → Result (10/10/60/20 time split)",
  "HEART: Happiness / Engagement / Adoption / Retention / Task success",
  "MoSCoW: Must / Should / Could / Won&apos;t",
  "SBI: Situation → Behaviour → Impact (feedback)",
];

const RED_FLAGS_TO_AVOID = [
  "Using &apos;we&apos; when asked about YOUR impact",
  "Naming frameworks instead of applying them",
  "Skipping user definition to jump to solutions",
  "Vague metrics (&apos;improve engagement&apos; vs &apos;D7 retention 22%→28%&apos;)",
  "Claiming certainty when you&apos;re uncertain",
  "Generic questions at the end (&apos;what&apos;s the culture like?&apos;)",
];

const FAQS = [
  {
    q: "How should I use this cheat sheet?",
    a: "Review it the night before your interview. Don&apos;t try to memorise — the goal is to recognise the patterns. During the interview, you shouldn&apos;t be thinking &apos;now I&apos;ll use the opening from the cheat sheet&apos; — you should be naturally using the structure. If you&apos;re still thinking about it in-interview, you need more practice, not more reading.",
  },
  {
    q: "What&apos;s the single most important thing to remember in a PM interview?",
    a: "Start with the user, not the solution. Every product sense question, strategy question, and metric question improves when you first define &apos;who is this for and what do they need?&apos; Skip this step and even good answers feel generic. Start here and even average answers feel strong.",
  },
];

export default function PmInterviewCheatSheetPage() {
  const dates = pageDates("/pm-interview-cheat-sheet");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Interview Cheat Sheet", url: `${SITE_URL}/pm-interview-cheat-sheet` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Interview Cheat Sheet (2026 Edition)",
        description:
          "The one-page PM interview cheat sheet. Frameworks, openings, transitions, closings — everything you need to remember before walking in.",
        image: `${SITE_URL}/api/og?title=PM+Interview+Cheat+Sheet+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-interview-cheat-sheet`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📋</span> One-page reference for the night before
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Interview Cheat Sheet<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            This cheat sheet compresses PM interview prep into one page: five openings for common
            question types, five transitions that signal structure mid-answer, five closings that
            land, eight frameworks to know cold — RICE, JTBD, AARRR, CIRCLES, STAR, HEART, MoSCoW,
            and SBI — and six red flags to avoid, from vague metrics to claiming false certainty.
          </p>
          <p className="text-sm text-white/50 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 openings, 5 transitions, 5 closings, 8 frameworks, and 6 red flags — everything on one page.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Make Daily Practice Your Habit — Free →
          </Link>
        </section>

        {/* Openings */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Openings for Common Question Types</h2>
          <div className="space-y-3">
            {OPENINGS.map((o, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="text-xs text-[#89e219] uppercase tracking-wider mb-1">{o.type}</p>
                <p className="text-sm text-white/70 italic">{o.opening}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Transitions */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Transitions to Signal Structure</h2>
            <div className="space-y-2">
              {TRANSITIONS.map((t, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70 italic">{t}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closings */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Closings That Land</h2>
          <div className="space-y-2">
            {CLOSINGS.map((c, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70 italic">{c}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Frameworks */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">8 Frameworks to Know Cold</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {FRAMEWORKS_TO_REMEMBER.map((f, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3">
                  <p className="text-sm text-white/70 font-mono">{f}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Red flags */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Red Flags to Avoid</h2>
          <div className="space-y-2">
            {RED_FLAGS_TO_AVOID.map((r, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-red-400 flex-shrink-0">🚩</span>
                <p className="text-sm text-white/70">{r}</p>
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

        <RelatedPages slug="pm-interview-cheat-sheet" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Make Daily Practice the Habit Before Interviews</h2>
          <p className="text-white/60 mb-6">2 minutes a day turns these patterns into instinct.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
