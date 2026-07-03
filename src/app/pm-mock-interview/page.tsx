import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Mock Interview Guide (2026) — How to Practice & Get Unbiased Feedback",
  description:
    "Run effective PM mock interviews. Where to find partners, how to give feedback, what to track, and how AI mock interviews compare to human practice — for every interview stage.",
  keywords: [
    "PM mock interview", "product manager mock interview",
    "PM interview practice", "where to find PM mock interview partner",
    "AI mock interview PM", "how to do mock interview product manager 2026",
  ],
  alternates: { canonical: "/pm-mock-interview" },
  openGraph: {
    title: "PM Mock Interview Guide 2026 — PM Streak",
    description: "How to run effective PM mock interviews, get unbiased feedback, and track improvement.",
    url: `${SITE_URL}/pm-mock-interview`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Mock+Interview+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Mock Interview Guide 2026 — PM Streak",
    description: "How to run effective PM mock interviews, get unbiased feedback, and track improvement.",
    images: [`${SITE_URL}/api/og?title=PM+Mock+Interview+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const MOCK_FORMATS = [
  {
    type: "Peer Mock (PM ↔ PM candidate)",
    pros: ["Free", "Reciprocal — you learn by interviewing too", "Natural conversation flow"],
    cons: ["Feedback quality varies hugely", "Both candidates may share same blind spots", "Scheduling is hard"],
    whenToUse: "Early in your prep when you need reps. Find partners in PM interview Discord/Slack communities or on LinkedIn.",
  },
  {
    type: "Paid Senior PM Mock",
    pros: ["Experienced feedback", "Realistic difficulty calibration", "Often company-specific insight"],
    cons: ["₹2K–8K per session", "Harder to schedule", "Quality varies — check reviews"],
    whenToUse: "2–3 weeks before real interviews. Best for company-specific practice (e.g. ex-Google PM for your Google interview).",
  },
  {
    type: "AI Mock Interview",
    pros: ["Available 24/7", "Immediate feedback", "Unlimited reps", "No scheduling"],
    cons: ["Can't replicate real interview pressure perfectly", "Feedback is pattern-based, not contextual"],
    whenToUse: "Daily practice, working on specific question types, quick feedback on structure and clarity.",
  },
  {
    type: "Solo Video Mock",
    pros: ["Completely free", "Self-paced", "Review yourself on video reveals bad habits"],
    cons: ["No external feedback", "Easy to be soft on yourself"],
    whenToUse: "Weekly practice to check for filler words, pacing, and body language. Watch back at 1.5x speed for pattern detection.",
  },
];

const FEEDBACK_FRAMEWORK = [
  { category: "Structure", questions: ["Did they clarify the question before answering?", "Did they follow a clear framework without being robotic?", "Did they signpost transitions ('Now I'll talk about...')?"] },
  { category: "Content Quality", questions: ["Were their examples specific, not generic?", "Did they use data or evidence to support claims?", "Did they address the actual question asked, not a related one?"] },
  { category: "User Empathy", questions: ["Did they define the user before proposing solutions?", "Did they consider multiple user segments?", "Were their user insights plausible or guessed?"] },
  { category: "Communication", questions: ["Pacing: too fast, too slow, or appropriate?", "Filler words per minute (um, like, basically)?", "Confidence without arrogance?"] },
  { category: "Handling Pressure", questions: ["How did they respond when challenged?", "Did they acknowledge uncertainty appropriately?", "Did they recover gracefully from mistakes?"] },
];

const RUBRIC = [
  { score: "5/5", meaning: "Outstanding — would get offer at top companies" },
  { score: "4/5", meaning: "Strong — would get offer at most companies, maybe not top tier" },
  { score: "3/5", meaning: "Decent — would advance to next round but not close" },
  { score: "2/5", meaning: "Weak — specific gaps that need focused practice" },
  { score: "1/5", meaning: "Unprepared — foundational work needed before more mocks" },
];

const FAQS = [
  {
    q: "How many mock interviews should I do before a real PM interview?",
    a: "Minimum 5, ideally 10+. The first 2–3 mocks expose your biggest gaps. The next 3–4 address those gaps. The last 2–3 focus on polish and company-specific prep. Fewer than 5 mocks is under-prepared. More than 20 usually means you're practicing instead of addressing real weaknesses.",
  },
  {
    q: "Are AI mock interviews worth it for PM prep?",
    a: "Yes — for certain purposes. AI mocks are excellent for: daily reps, practicing structure, checking clarity and pacing, and exposure to new question types. They're weaker at: nuanced feedback on judgment calls, calibrating to company-specific bars, and simulating real interview pressure. Use AI mocks for volume, human mocks for depth.",
  },
  {
    q: "What's the best way to give feedback in a peer mock interview?",
    a: "Use a structured rubric (structure, content, empathy, communication, pressure). Give 3 specific strengths and 3 specific improvement areas. Point to moments in the interview — 'At minute 4, when you jumped to solutions without defining the user...' is more useful than 'be more user-focused.' Specificity is everything in feedback quality.",
  },
];

export default function PmMockInterviewPage() {
  const dates = pageDates("/pm-mock-interview");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Mock Interview", url: `${SITE_URL}/pm-mock-interview` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Mock Interview Guide (2026 Edition)",
        description:
          "Run effective PM mock interviews. Where to find partners, how to give feedback, what to track, and how AI mock interviews compare to human practice — for every interview stage.",
        image: `${SITE_URL}/api/og?title=PM+Mock+Interview+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-mock-interview`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🎤</span> Mocks don&apos;t teach you PM. Mocks reveal what you don&apos;t know yet.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Mock Interview Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            An effective PM mock interview practice plan mixes four formats — peer mocks for early reps, paid
            senior-PM sessions two to three weeks before the real thing, AI mocks for daily volume, and solo video
            reviews for pacing and filler words. Aim for at least five mocks (ideally ten or more), scoring each on
            a 15-point rubric covering structure, content, empathy, communication, and pressure.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The 4 types of mock interviews, how to get unbiased feedback, a 15-point evaluation rubric,
            and how to turn every mock into measurable improvement.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Try AI Mock Interview — Free →
          </Link>
        </section>

        {/* Mock formats */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">The 4 Types of PM Mock Interviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {MOCK_FORMATS.map((format) => (
              <div key={format.type} className="bg-[#111] border border-white/10 rounded-2xl p-5">
                <h3 className="font-bold text-white mb-3">{format.type}</h3>
                <div className="mb-3">
                  <p className="text-xs text-green-400 mb-1">✅ Pros</p>
                  <ul className="space-y-0.5">
                    {format.pros.map((p, i) => <li key={i} className="text-xs text-white/60">• {p}</li>)}
                  </ul>
                </div>
                <div className="mb-3">
                  <p className="text-xs text-red-400 mb-1">❌ Cons</p>
                  <ul className="space-y-0.5">
                    {format.cons.map((c, i) => <li key={i} className="text-xs text-white/60">• {c}</li>)}
                  </ul>
                </div>
                <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-lg p-3">
                  <p className="text-xs text-[#89e219]">🎯 When to use: <span className="text-white/70">{format.whenToUse}</span></p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Feedback framework */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-3">The 15-Point Feedback Rubric</h2>
            <p className="text-white/60 text-center mb-8">Use this in every mock. Score each category 1–5. Track scores over time.</p>
            <div className="space-y-4">
              {FEEDBACK_FRAMEWORK.map((cat) => (
                <div key={cat.category} className="bg-[#111] border border-white/10 rounded-xl p-5">
                  <p className="font-semibold text-[#89e219] mb-2">{cat.category}</p>
                  <ul className="space-y-1.5">
                    {cat.questions.map((q, i) => (
                      <li key={i} className="flex gap-2 text-sm">
                        <span className="text-white/30">☐</span>
                        <span className="text-white/70">{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rubric scale */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-8">Calibrating Your Score</h2>
          <div className="space-y-2">
            {RUBRIC.map((r, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4 flex gap-4">
                <span className="font-bold text-[#89e219] w-12 flex-shrink-0">{r.score}</span>
                <span className="text-sm text-white/70">{r.meaning}</span>
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

        <RelatedPages slug="pm-mock-interview" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Get Unlimited AI Mock Interviews</h2>
          <p className="text-white/60 mb-6">Daily PM questions with structured feedback — practice without scheduling.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
