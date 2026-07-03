import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Interview Day Checklist (2026) — What to Do the 24 Hours Before &amp; Day Of",
  description:
    "The PM interview day checklist. What to prep 24 hours before, what to eat, what to wear, timing, and how to walk in calm and confident.",
  keywords: [
    "PM interview day checklist", "day before PM interview",
    "PM interview morning", "how to prep PM interview day",
    "PM interview nervousness 2026",
  ],
  alternates: { canonical: "/pm-interview-day-checklist" },
  openGraph: {
    title: "PM Interview Day Checklist 2026 — PM Streak",
    description: "What to do the 24 hours before and day of your PM interview — prep, mindset, logistics.",
    url: `${SITE_URL}/pm-interview-day-checklist`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Interview+Day+Checklist+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Interview Day Checklist 2026 — PM Streak",
    description: "What to do the 24 hours before and day of your PM interview — prep, mindset, logistics.",
    images: [`${SITE_URL}/api/og?title=PM+Interview+Day+Checklist+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DAY_BEFORE = [
  "Review your 8–10 STAR stories — out loud, not just reading",
  "Re-read the job description and note 3 questions you want to ask",
  "Check the company&apos;s latest news, blog posts, recent launches",
  "Test your video setup (camera, mic, lighting) if remote",
  "Prepare a cheat sheet of the interviewers&apos; backgrounds (LinkedIn)",
  "Lay out clothes. Have your resume and portfolio links ready",
  "Sleep 8 hours. Cramming at midnight doesn&apos;t help; rest does",
];

const MORNING_OF = [
  "Eat a real breakfast — avoid sugar crashes mid-interview",
  "Light exercise or walk (15 min) to reduce cortisol",
  "Review notes one final time, then stop. Over-revising spikes anxiety",
  "Dress the part — match the company&apos;s culture (startup casual vs traditional)",
  "Arrive 10 minutes early (in-person) or log in 5 min early (remote)",
  "Have water nearby. Silence notifications. Close distracting tabs",
];

const DURING = [
  "Breathe before entering — 4 seconds in, 4 hold, 4 out, 3x",
  "Smile in the first 10 seconds — sets warm tone for the interview",
  "Take notes visibly — signals you&apos;re taking them seriously",
  "Pause before answering — 3 seconds feels long to you, normal to them",
  "Ask clarifying questions early — especially for case-style questions",
  "Use the last 10 minutes for your questions — treat it as a real conversation",
];

const AFTER = [
  "Thank the interviewer in the same conversation — genuine, brief",
  "Send personalised thank-you notes within 24 hours",
  "Write down every question they asked and how you answered — within 2 hours, memory fades fast",
  "Note 3 things you&apos;d do differently — this is gold for future interviews",
  "Don&apos;t replay failures obsessively — trust the process, move to next prep",
  "Avoid checking email repeatedly — recruiters respond in 5–10 days typically",
];

const MINDSET = [
  "You are not begging for a job — you&apos;re evaluating whether this role fits YOU",
  "Interviewers want you to succeed — they&apos;re hiring, not filtering",
  "One bad answer doesn&apos;t sink the interview — recovery matters more",
  "Be YOURSELF — performances are detectable and unmemorable",
  "Silence is fine — filling it with filler hurts more than brief pauses",
];

const FAQS = [
  {
    q: "How should I manage PM interview anxiety the morning of?",
    a: "Physical movement + breathing. A 15-minute walk before the interview lowers cortisol measurably. Box breathing (4 in, 4 hold, 4 out, 4 hold) right before starting resets nervous system. Avoid caffeine if you&apos;re prone to jitters — the extra alertness isn&apos;t worth the shaking hands. Most candidates over-prep at the expense of physical state; flip that balance.",
  },
  {
    q: "Should I prep the morning of the interview?",
    a: "Light review only — no heavy prep. Cramming right before an interview increases anxiety and rarely unlocks new insight. Skim your notes, review your stories once, then stop. The hour before an interview is better spent on mindset and state than on cramming. Good interview performance comes from weeks of prep, not the final hour.",
  },
];

export default function PmInterviewDayChecklistPage() {
  const dates = pageDates("/pm-interview-day-checklist");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Interview Day Checklist", url: `${SITE_URL}/pm-interview-day-checklist` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Interview Day Checklist (2026 Edition)",
        description:
          "The PM interview day checklist. What to prep 24 hours before, what to eat, what to wear, timing, and how to walk in calm and confident.",
        image: `${SITE_URL}/api/og?title=PM+Interview+Day+Checklist+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-interview-day-checklist`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>✅</span> The last 24 hours matter less than the last 24 weeks — but still matter
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Interview Day Checklist<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Interview-day prep breaks into four windows — the day before (story review, video-and-clothes
            checks, sleep), the morning of (real breakfast, a short walk, one final light review), during
            the interview itself (breathing, pacing, note-taking), and immediately after (writing down every
            question while it&apos;s fresh) — because physical state and timing matter as much as what you
            already know.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline font-semibold">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            What to do the day before, morning of, during, and after —
            so you walk in calm, prepared, and yourself.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Get Interview-Ready Daily — Free →
          </Link>
        </section>

        {/* Day before */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">The Day Before</h2>
          <div className="space-y-2">
            {DAY_BEFORE.map((d, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">☐</span>
                <p className="text-sm text-white/70">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Morning of */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">The Morning Of</h2>
            <div className="space-y-2">
              {MORNING_OF.map((m, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">☐</span>
                  <p className="text-sm text-white/70">{m}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* During */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">During the Interview</h2>
          <div className="space-y-2">
            {DURING.map((d, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-green-400 font-bold flex-shrink-0">✓</span>
                <p className="text-sm text-white/70">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* After */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">Immediately After</h2>
            <div className="space-y-2">
              {AFTER.map((a, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">→</span>
                  <p className="text-sm text-white/70">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mindset */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Mindset Reminders</h2>
          <div className="space-y-2">
            {MINDSET.map((m, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
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

        <RelatedPages slug="pm-interview-day-checklist" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Walk in Calm &mdash; Because You&apos;re Ready</h2>
          <p className="text-white/60 mb-6">Daily PM practice builds the fluency that turns interview day into conversation, not performance.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
