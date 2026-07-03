import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Interview Stories Guide (2026) — How to Build 10 Stories That Cover Every Behavioural Question",
  description:
    "The 10 PM interview stories every candidate should prepare. Cover 80% of behavioural questions with 10 flexible stories — with templates and coverage map.",
  keywords: [
    "PM interview stories", "PM behavioural stories",
    "STAR stories PM", "PM interview story bank",
    "10 PM stories 2026",
  ],
  alternates: { canonical: "/pm-interview-stories" },
  openGraph: {
    title: "PM Interview Stories Guide 2026 — PM Streak",
    description: "Build 10 PM stories that cover 80% of behavioural interview questions.",
    url: `${SITE_URL}/pm-interview-stories`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Interview+Stories+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Interview Stories Guide 2026 — PM Streak",
    description: "Build 10 PM stories that cover 80% of behavioural interview questions.",
    images: [`${SITE_URL}/api/og?title=PM+Interview+Stories+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const STORIES = [
  { type: "High-impact win", prompt: "A project where you moved a metric meaningfully. Specific numbers, clear decisions.", covers: "Tell me about a time you drove impact; your proudest moment; measuring success" },
  { type: "Product failure with learning", prompt: "Something you shipped that didn&apos;t work. What happened, what you learned, what you&apos;d do differently.", covers: "Tell me about a failure; decision you&apos;d make differently; biggest mistake" },
  { type: "Conflict resolution", prompt: "A disagreement with a peer, senior stakeholder, or cross-functional partner that you navigated well.", covers: "Describe a conflict; pushing back on someone senior; aligning opposing views" },
  { type: "Ambiguity navigation", prompt: "A project where you had no clear direction and had to define it yourself.", covers: "Working with ambiguity; no clear requirements; defining strategy" },
  { type: "Data-driven decision", prompt: "A decision you made primarily on data — maybe counter to intuition or initial direction.", covers: "Data-driven thinking; changing course based on data; using research" },
  { type: "Cross-functional leadership", prompt: "Coordinating 3+ teams on a shared outcome without direct authority.", covers: "Leading without authority; managing stakeholders; cross-team collaboration" },
  { type: "Saying no / prioritisation", prompt: "A time you declined a high-profile ask because something else mattered more.", covers: "Prioritisation; saying no; managing trade-offs" },
  { type: "Giving hard feedback", prompt: "Delivering feedback to a peer or stakeholder that was difficult but necessary.", covers: "Giving feedback; having hard conversations; improving team dynamics" },
  { type: "User insight that changed direction", prompt: "A piece of user research that fundamentally changed what you were building.", covers: "User empathy; listening to users; changing plans" },
  { type: "Launch / execution under pressure", prompt: "A launch you led under time pressure. What broke, what held, how you navigated.", covers: "Under pressure; execution; launch management" },
];

const STAR_TIGHT = [
  { part: "Situation (10%)", rule: "One sentence. Enough context to anchor the story — no more." },
  { part: "Task (10%)", rule: "What was YOUR specific job in this situation — not the team&apos;s." },
  { part: "Action (60%)", rule: "What you did. Use &apos;I&apos;, not &apos;we&apos;. Specific decisions you made." },
  { part: "Result (20%)", rule: "Concrete outcome with numbers when possible. Plus what you learned." },
];

const MISTAKES = [
  "Preparing 30 stories — too many to remember; you confuse yourself",
  "Using &apos;we&apos; instead of &apos;I&apos; throughout — invisible contribution",
  "No concrete outcome — &apos;it went well&apos; is not a result",
  "Rambling — good behavioural stories are 2–3 minutes, not 8",
  "Same story for different question types — interviewers notice when you&apos;re force-fitting",
  "Never practising out loud — first spoken version is always worse than the written one",
];

const FAQS = [
  {
    q: "How many PM stories should I prepare for interviews?",
    a: "8–10 strong stories cover 80% of behavioural questions if chosen well. More than 12 is counterproductive — too many to remember, too easy to mix up. The key: each story should cover 2–3 different question types with slight reframing. A good &apos;failure&apos; story often doubles as a &apos;decision you&apos;d remake&apos; or &apos;biggest learning&apos; story.",
  },
  {
    q: "How long should each PM interview story be?",
    a: "2–3 minutes when spoken. Practise with a timer. The time split: 10% Situation, 10% Task, 60% Action, 20% Result. Most candidates over-invest in setup (Situation + Task) and under-invest in Action — which is where interviewers actually evaluate you.",
  },
  {
    q: "Should stories include specific numbers?",
    a: "Yes, whenever possible. &apos;Retention increased from 22% to 28%&apos; beats &apos;retention improved.&apos; If you don&apos;t have specifics, use directional numbers (&apos;roughly 30% improvement&apos;) rather than adjectives. Numbers signal that you measured your work — which is itself a PM skill.",
  },
];

export default function PmInterviewStoriesPage() {
  const dates = pageDates("/pm-interview-stories");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Interview Stories", url: `${SITE_URL}/pm-interview-stories` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Interview Stories (2026 Edition)",
        description:
          "The 10 PM interview stories every candidate should prepare. Cover 80% of behavioural questions with 10 flexible stories — with templates and coverage map.",
        image: `${SITE_URL}/api/og?title=PM+Interview+Stories+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-interview-stories`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📚</span> 10 strong stories cover 80% of behavioural questions
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Interview Stories<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            PM interview behavioural rounds pull from a narrow set of themes — impact, failure, conflict,
            ambiguity, data, leadership, prioritisation, feedback, user insight, and pressure — so building
            8–10 flexible stories mapped to these themes, each told in a tight 10/10/60/20 STAR split, covers
            roughly 80% of what interviewers ask.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline font-semibold">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The 10 story types every PM candidate should prepare, the question types they cover,
            and the tight STAR structure that keeps answers sharp.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice Stories Daily — Free →
          </Link>
        </section>

        {/* Stories */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">The 10 PM Stories to Prepare</h2>
          <div className="space-y-4">
            {STORIES.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <p className="font-bold text-white mb-1">{i + 1}. {s.type}</p>
                <p className="text-sm text-white/70 mb-2">{s.prompt}</p>
                <p className="text-xs text-[#89e219]">🎯 Covers: <span className="text-white/70">{s.covers}</span></p>
              </div>
            ))}
          </div>
        </section>

        {/* STAR */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">Tight STAR Structure (Time Split)</h2>
            <div className="space-y-3">
              {STAR_TIGHT.map((s, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-[#89e219] text-sm mb-1">{s.part}</p>
                  <p className="text-xs text-white/60">{s.rule}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mistakes */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 PM Story Mistakes</h2>
          <div className="space-y-2">
            {MISTAKES.map((m, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-red-400 flex-shrink-0">❌</span>
                <p className="text-sm text-white/70">{m}</p>
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

        <RelatedPages slug="pm-interview-stories" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Your Stories Out Loud Daily</h2>
          <p className="text-white/60 mb-6">Daily PM behavioural scenarios with AI feedback on structure and specificity.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
