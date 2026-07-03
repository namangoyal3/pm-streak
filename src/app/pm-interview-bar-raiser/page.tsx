import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Bar Raiser Interview (2026) — How to Pass Amazon&apos;s &amp; Equivalent Final Rounds",
  description:
    "How PMs handle bar raiser interviews — Amazon&apos;s and equivalent final rounds at top companies. What bar raisers test for and how to signal depth honestly.",
  keywords: [
    "PM bar raiser", "Amazon bar raiser PM",
    "final round PM interview", "senior PM interview",
    "bar raiser questions 2026",
  ],
  alternates: { canonical: "/pm-interview-bar-raiser" },
  openGraph: {
    title: "PM Bar Raiser Interview 2026 — PM Streak",
    description: "How to pass Amazon and equivalent bar raiser rounds — what they test, how to prep.",
    url: `${SITE_URL}/pm-interview-bar-raiser`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Bar+Raiser+Interview+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Bar Raiser Interview 2026 — PM Streak",
    description: "How to pass Amazon and equivalent bar raiser rounds — what they test, how to prep.",
    images: [`${SITE_URL}/api/og?title=PM+Bar+Raiser+Interview+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const WHAT_THEY_TEST = [
  { what: "Intellectual honesty", detail: "Can you admit what you don&apos;t know, own failures specifically, and update your view when challenged?" },
  { what: "Depth over breadth", detail: "Can you go 3–5 layers deep on one topic, not just skim across many?" },
  { what: "Judgment on non-obvious cases", detail: "How do you reason about edge cases, trade-offs, and decisions without clear data?" },
  { what: "Cultural fit (without fakery)", detail: "Do your genuine values align with the company? Rehearsed answers get detected." },
  { what: "Scope of thinking", detail: "Can you zoom out to company strategy and zoom in to feature details fluidly?" },
  { what: "How you handle pushback", detail: "Do you cave under pressure, dig in defensively, or genuinely update your thinking?" },
];

const PREP_MOVES = [
  "Pick 5 career moments and go deep — bar raisers push into details you wouldn&apos;t have rehearsed",
  "Prepare a &apos;what I learned that changed my mind&apos; story — shows intellectual growth",
  "Anticipate: &apos;What&apos;s a strong opinion you hold that most PMs disagree with?&apos; — have one ready",
  "Research the interviewer — their background shapes their pushback style",
  "Practise the &apos;I don&apos;t know&apos; muscle — strong candidates say it comfortably when true",
  "Prepare 2 questions FOR them that signal you&apos;d think like a peer, not a candidate",
];

const SAMPLE_QUESTIONS = [
  "Walk me through the hardest product decision you&apos;ve made. What made it hard?",
  "Tell me about a time you were specifically wrong. What was the specific error in your thinking?",
  "What&apos;s a strong opinion you hold about PM work that most PMs you&apos;ve met disagree with?",
  "If you joined us, what&apos;s the first thing you&apos;d want to change — and what would you definitely not change?",
  "What have you learned in the last 6 months that changed how you operate?",
  "What do you think we&apos;re getting wrong about our product right now?",
];

const AFTER_THE_ROUND = [
  "Write down every question asked while memory is fresh — bar raisers ask unique questions you&apos;ll forget",
  "Note which questions you handled well vs stumbled on — patterns reveal prep gaps",
  "Don&apos;t over-interpret silence — bar raisers are trained not to signal agreement or disagreement",
  "If you were wrong on something in the interview, a quick follow-up email acknowledging it can help",
  "The bar raiser vote usually lands within 48 hours — don&apos;t obsess during the wait",
];

const FAQS = [
  {
    q: "What is a bar raiser and why does Amazon have one?",
    a: "A bar raiser is a trained interviewer from outside the hiring team whose sole job is quality control. They have veto power over the hire. Amazon invented the role, but many companies have equivalent &apos;final round&apos; or &apos;cross-functional&apos; interviewers with similar authority. The goal: ensure every hire raises the bar rather than just meeting it.",
  },
  {
    q: "How is the bar raiser different from other interviewers?",
    a: "Other interviewers evaluate fit for a specific role; bar raisers evaluate fit for the company long-term. They&apos;re less interested in whether you can do today&apos;s job and more in whether you&apos;ll grow into bigger roles. Questions probe depth, judgment, and cultural alignment over task-specific skills.",
  },
  {
    q: "How do PMs prepare for a bar raiser round?",
    a: "The preparation is different from technical rounds. You can&apos;t memorise answers because bar raisers probe unpredictably. Instead: go deep on 5 career stories so you can answer follow-ups, develop 1–2 genuine strong opinions on PM work, and practise saying &apos;I don&apos;t know&apos; comfortably. Honesty and depth beat polish.",
  },
];

export default function PmInterviewBarRaiserPage() {
  const dates = pageDates("/pm-interview-bar-raiser");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Bar Raiser Interview", url: `${SITE_URL}/pm-interview-bar-raiser` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Bar Raiser Interview Guide (2026 Edition)",
        description:
          "How PMs handle bar raiser interviews — Amazon's and equivalent final rounds at top companies. What bar raisers test for and how to signal depth honestly.",
        image: `${SITE_URL}/api/og?title=PM+Bar+Raiser+Interview+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-interview-bar-raiser`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔥</span> The round that rewards honesty over polish
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Bar Raiser Interview Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Bar raisers are trained interviewers — outside the hiring team, with veto power over the hire —
            who probe intellectual honesty, depth over breadth, judgment on unclear trade-offs, genuine
            cultural fit, and how a candidate handles pushback, rather than testing whether you can do the
            specific role; preparation means going deep on a handful of career stories instead of rehearsing
            more of them.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline font-semibold">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 things bar raisers test for, 6 prep moves, 6 sample questions,
            and 5 moves for after the round.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice Depth Over Polish — Free →
          </Link>
        </section>

        {/* What they test */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Things Bar Raisers Test For</h2>
          <div className="space-y-4">
            {WHAT_THEY_TEST.map((w, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <p className="font-bold text-white mb-1">{i + 1}. {w.what}</p>
                <p className="text-xs text-white/60">{w.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Prep moves */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Prep Moves</h2>
            <div className="space-y-2">
              {PREP_MOVES.map((p, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">✓</span>
                  <p className="text-sm text-white/70">{p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sample questions */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Sample Bar Raiser Questions</h2>
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
            <ul className="space-y-3">
              {SAMPLE_QUESTIONS.map((q, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="text-[#89e219] flex-shrink-0 font-bold">{i + 1}.</span>
                  <span className="text-white/70">{q}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* After */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Moves After the Round</h2>
            <div className="space-y-2">
              {AFTER_THE_ROUND.map((a, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{a}</p>
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

        <RelatedPages slug="pm-interview-bar-raiser" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Train for Depth Daily</h2>
          <p className="text-white/60 mb-6">Daily PM scenarios that reward intellectual honesty and depth over rehearsed polish.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
