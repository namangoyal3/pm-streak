import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "12 PM Anti-Patterns (2026) — Habits That Mark a Weak Product Manager",
  description:
    "12 PM anti-patterns that weak PMs do and strong PMs avoid. The habits that erode team trust, miss outcomes, and stall careers — and how to recognise them in yourself.",
  keywords: [
    "PM anti-patterns", "bad PM habits",
    "weak PM signs", "PM mistakes",
    "PM warning signs 2026",
  ],
  alternates: { canonical: "/pm-anti-patterns" },
  openGraph: {
    title: "12 PM Anti-Patterns 2026 — PM Streak",
    description: "12 habits that mark a weak PM — and how to recognise them in yourself.",
    url: `${SITE_URL}/pm-anti-patterns`,
    images: [{ url: `${SITE_URL}/api/og?title=12+PM+Anti-Patterns+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "12 PM Anti-Patterns 2026 — PM Streak",
    description: "12 habits that mark a weak PM — and how to recognise them in yourself.",
    images: [`${SITE_URL}/api/og?title=12+PM+Anti-Patterns+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const ANTI_PATTERNS = [
  { pattern: "Shipping features without outcome metrics", fix: "Every feature ships with a pre-committed metric to move" },
  { pattern: "Jumping to solutions before defining the user", fix: "Always start with persona + pain point before feature" },
  { pattern: "Treating user requests as a roadmap", fix: "Requests are data — filter through strategy and impact first" },
  { pattern: "Saying yes to every stakeholder ask", fix: "Every yes is a no elsewhere — make trade-offs explicit" },
  { pattern: "Writing vague PRDs", fix: "Specific problem, specific users, specific success criteria" },
  { pattern: "Ignoring guardrail metrics", fix: "Primary winning + guardrail breaking = regression" },
  { pattern: "Blaming engineering for slow delivery", fix: "Your scope and requirements are at least half the cause" },
  { pattern: "Hiding bad news until it&apos;s crisis", fix: "Surface risks early — small escalations beat large surprises" },
  { pattern: "Using &apos;we&apos; to hide personal accountability", fix: "Own decisions in first person — &apos;I decided X because Y&apos;" },
  { pattern: "Not dogfooding your own product", fix: "Use it daily for its real purpose — notice what users notice" },
  { pattern: "Over-meeting, under-writing", fix: "Default to async docs, use meetings only when decisions require them" },
  { pattern: "Treating retros as ritual, not improvement", fix: "Every retro ends with named owner + deadline for each action" },
];

const WHERE_TO_SPOT = [
  "Your own calendar — 80% meetings and 20% writing is a weak-PM signal",
  "Your PRDs from 6 months ago — if they&apos;re vague, fix the template",
  "Recent launches — did you actually move the metric you promised?",
  "Feedback from engineers/designers — if they feel unheard, you&apos;re not listening",
  "Your manager&apos;s review — patterns in their feedback reveal your biggest anti-patterns",
];

const HOW_TO_CHANGE = [
  "Pick ONE anti-pattern to work on per month — trying to fix all fails",
  "Tell your manager and a peer you&apos;re working on it — accountability accelerates change",
  "Audit at end of month: did you catch yourself? Did you correct it?",
  "Build a replacement habit for the bad one — not just removal",
  "Expect 3–6 months before a new habit sticks — be patient with yourself",
];

const FAQS = [
  {
    q: "How do PMs recognise anti-patterns in themselves?",
    a: "Ask a peer you trust to give you honest feedback. Self-assessment is always kinder to yourself than reality. The peer feedback will be uncomfortable but accurate. Another signal: which anti-patterns on this list feel uncomfortable to read? Discomfort often means accurate — worth sitting with.",
  },
  {
    q: "What&apos;s the single worst PM anti-pattern?",
    a: "Shipping without outcome metrics. Everything else is recoverable. A PM who never commits to outcomes never learns from results — and doesn&apos;t improve. This is the single habit that separates PMs who plateau early from PMs who grow into senior roles.",
  },
];

export default function PmAntiPatternsPage() {
  const dates = pageDates("/pm-anti-patterns");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Anti-Patterns", url: `${SITE_URL}/pm-anti-patterns` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "12 PM Anti-Patterns (2026 Edition)",
        description:
          "12 PM anti-patterns that weak PMs do and strong PMs avoid. The habits that erode team trust, miss outcomes, and stall careers — and how to recognise them in yourself.",
        image: `${SITE_URL}/api/og?title=12+PM+Anti-Patterns+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-anti-patterns`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🚫</span> Weak PMs have habits. Strong PMs have disciplines.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            12 PM Anti-Patterns<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            This guide catalogs 12 PM anti-patterns — from shipping without outcome metrics to hiding bad news until it becomes a crisis — each paired with a concrete fix, plus five places to spot the habits in yourself and five ways to change them; shipping without outcome metrics is flagged as the single worst offender because a PM who never commits to outcomes never learns from results.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            12 anti-patterns weak PMs fall into with specific fixes, where to spot them in yourself,
            and how to change them deliberately.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Disciplines Daily — Free →
          </Link>
        </section>

        {/* Anti-patterns */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="space-y-3">
            {ANTI_PATTERNS.map((a, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <div className="flex gap-3 items-start mb-2">
                  <span className="text-red-400 font-bold flex-shrink-0 w-6">{i + 1}.</span>
                  <p className="text-sm text-white font-medium">{a.pattern}</p>
                </div>
                <div className="ml-9">
                  <p className="text-xs text-green-400">→ {a.fix}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Where to spot */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Places to Spot Anti-Patterns in Yourself</h2>
            <div className="space-y-2">
              {WHERE_TO_SPOT.map((w, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{w}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to change */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Ways to Change Them</h2>
          <div className="space-y-2">
            {HOW_TO_CHANGE.map((h, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{h}</p>
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

        <RelatedPages slug="pm-anti-patterns" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Disciplines Daily</h2>
          <p className="text-white/60 mb-6">Daily PM scenarios that replace anti-patterns with better habits.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
