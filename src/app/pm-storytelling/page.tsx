import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Storytelling Guide (2026) — How Great PMs Turn Data Into Narrative",
  description:
    "How great PMs use storytelling to align teams and influence leadership. Narrative structures, data-to-story frameworks, and the story arcs that move decisions.",
  keywords: [
    "PM storytelling", "product manager storytelling",
    "how PMs tell stories", "narrative PM",
    "data storytelling PM", "PM presentation storytelling 2026",
  ],
  alternates: { canonical: "/pm-storytelling" },
  openGraph: {
    title: "PM Storytelling Guide 2026 — PM Streak",
    description: "How great PMs turn data into narrative — structures, frameworks, and examples.",
    url: `${SITE_URL}/pm-storytelling`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Storytelling+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Storytelling Guide 2026 — PM Streak",
    description: "How great PMs turn data into narrative — structures, frameworks, and examples.",
    images: [`${SITE_URL}/api/og?title=PM+Storytelling+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const WHY_STORIES = [
  "Humans remember stories 22x better than facts. Your insight won&apos;t land without a narrative wrapper.",
  "Stories create emotional conviction. Data alone informs but rarely moves people to change behaviour.",
  "Leadership makes decisions in minutes, not hours — stories compress complex context fast.",
  "Stories travel. A good product story gets retold across the org, amplifying your influence beyond one meeting.",
];

const NARRATIVE_STRUCTURES = [
  {
    structure: "Situation → Complication → Question → Answer (SCQA)",
    useFor: "Executive communication — McKinsey-style framing",
    example: "Situation: D7 retention is 28% (healthy). Complication: New cohorts are retaining at only 18%. Question: Why and what should we do? Answer: The onboarding change is the likely cause; rollback by Friday.",
  },
  {
    structure: "Before → During → After",
    useFor: "Telling the story of a shipped initiative or feature journey",
    example: "Before: Checkout conversion was 4%. During: We ran 3 experiments on friction reduction. After: Conversion hit 7%, worth ₹2.4Cr ARR.",
  },
  {
    structure: "Customer → Problem → Solution → Outcome",
    useFor: "PRD openers, strategy memos, case study framings",
    example: "Customer: First-time Bharat buyers. Problem: 60% abandon at address entry. Solution: Voice-based address capture. Outcome: 18pp reduction in abandonment.",
  },
  {
    structure: "Hero&apos;s Journey (PM version)",
    useFor: "Behavioural interview answers — the STAR story with narrative arc",
    example: "I had [goal]. I hit [obstacle]. I tried [action]. I learned [outcome]. I now apply [lesson].",
  },
  {
    structure: "Then vs Now vs Next",
    useFor: "Strategy presentations — where we&apos;ve been, where we are, where we&apos;re going",
    example: "Then: We were optimising for DAU. Now: We realise DAU hides engagement quality. Next: We&apos;re shifting to &apos;lessons completed&apos; as north star.",
  },
];

const TACTICS = [
  { tactic: "Open with a specific person, not a segment", example: "Not: &apos;Our Tier-3 users struggle.&apos; Yes: &apos;Priya, a 28-year-old teacher in Jabalpur, spends 4 minutes trying to enter her address before giving up.&apos;" },
  { tactic: "Use concrete numbers, not adjectives", example: "Not: &apos;Retention dropped significantly.&apos; Yes: &apos;D7 retention dropped from 28% to 18% over 3 weeks.&apos;" },
  { tactic: "Contrast before vs after", example: "&apos;Before the change: 40% completed onboarding. After: 62%.&apos; The contrast creates the story." },
  { tactic: "Show your reasoning, not just your conclusion", example: "Walk through what you considered and rejected, not just what you chose. Reasoning earns trust." },
  { tactic: "End with what you&apos;re asking for", example: "&apos;Here&apos;s what happened. Here&apos;s what I learned. Here&apos;s what I need from you to move forward.&apos; Never end with data without an ask." },
];

const FAQS = [
  {
    q: "Why do PMs need storytelling skills?",
    a: "Because PMs influence without authority. You can have the best data and clearest thinking, but if you can&apos;t package it into a narrative that makes people care, your work doesn&apos;t move anyone. Storytelling is the bridge between insight and influence. At senior levels, storytelling quality increasingly separates PMs who drive decisions from PMs who merely analyse them.",
  },
  {
    q: "Is storytelling different in PM interviews vs at work?",
    a: "The fundamentals are the same — specific, concrete, clear, with an arc. Interviews compress the format: 2–3 minutes per story with clear setup, action, outcome, and learning. At work, stories can be longer (a strategy memo, an exec presentation) but the structure still needs to be tight. If you can&apos;t tell a compelling story in 2 minutes, you can&apos;t tell one in 20.",
  },
  {
    q: "How can you improve PM storytelling deliberately?",
    a: "Three compounding habits: (1) write a narrative version of each big decision you make — force yourself to find the arc, (2) record yourself telling stories out loud and watch back (excruciating but effective), (3) read great product narratives — teardowns from Lenny&apos;s Newsletter, Reforge case studies, Stratechery essays. Steal structures from writers whose stories stick with you.",
  },
];

export default function PmStorytellingPage() {
  const dates = pageDates("/pm-storytelling");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Storytelling", url: `${SITE_URL}/pm-storytelling` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Storytelling Guide (2026 Edition)",
        description:
          "How great PMs use storytelling to align teams and influence leadership. Narrative structures, data-to-story frameworks, and the story arcs that move decisions.",
        image: `${SITE_URL}/api/og?title=PM+Storytelling+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-storytelling`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📖</span> Data informs. Stories move.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Storytelling Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            People remember stories roughly 22 times better than plain facts, this guide&apos;s own opening point notes —
            which is why it built five narrative structures for PM work: SCQA, Before-During-After,
            Customer-Problem-Solution-Outcome, the PM hero&apos;s journey, and Then-vs-Now-vs-Next. Tactics like opening on
            one specific person and contrasting before against after turn that structure into something people actually act on.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            4 reasons stories beat data alone, 5 narrative structures for PM work,
            and 5 tactics that turn dry analysis into compelling narrative.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Storytelling Daily — Free →
          </Link>
        </section>

        {/* Why stories */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">Why Storytelling Is a PM Superpower</h2>
          <div className="space-y-3">
            {WHY_STORIES.map((w, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{w}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Structures */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Narrative Structures for PMs</h2>
            <div className="space-y-5">
              {NARRATIVE_STRUCTURES.map((s, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                  <p className="font-bold text-white mb-1">{i + 1}. {s.structure}</p>
                  <p className="text-sm text-[#89e219] mb-2">🎯 Use for: {s.useFor}</p>
                  <div className="bg-[#0e1113] rounded-lg p-3">
                    <p className="text-xs text-white/40 mb-1">Example</p>
                    <p className="text-xs text-white/70 italic">{s.example}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tactics */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Tactics That Elevate PM Stories</h2>
          <div className="space-y-4">
            {TACTICS.map((t, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <p className="font-semibold text-white mb-2">{i + 1}. {t.tactic}</p>
                <p className="text-xs text-white/60 italic">{t.example}</p>
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

        <RelatedPages slug="pm-storytelling" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Narrative PM Skills Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios that sharpen your ability to turn insight into story.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
