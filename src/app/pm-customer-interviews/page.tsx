import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Customer Interviews (2026) — How to Interview Users and Learn What&apos;s Real",
  description:
    "How PMs run customer interviews that reveal real insight. Question design, listening techniques, avoiding bias, and turning interviews into shipped product decisions.",
  keywords: [
    "PM customer interviews", "user interviews PM",
    "product manager interview techniques",
    "listening user research", "interview design PM 2026",
  ],
  alternates: { canonical: "/pm-customer-interviews" },
  openGraph: {
    title: "PM Customer Interviews 2026 — PM Streak",
    description: "How PMs run customer interviews that reveal real insight — not just polite validation.",
    url: `${SITE_URL}/pm-customer-interviews`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Customer+Interviews+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Customer Interviews 2026 — PM Streak",
    description: "How PMs run customer interviews that reveal real insight — not just polite validation.",
    images: [`${SITE_URL}/api/og?title=PM+Customer+Interviews+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const INTERVIEW_PREP = [
  "Write 3 hypotheses you want to test — not features you want to sell",
  "Write 10 open-ended questions — never yes/no",
  "Prepare your probe questions: &apos;Can you say more?&apos;, &apos;What happened next?&apos;",
  "Test questions on a colleague first — refine before real users",
  "Keep the interview to 30–45 min — fatigue beyond that",
];

const WHAT_TO_ASK = [
  "Tell me about the last time you did [problem area] — walk me through it",
  "What&apos;s the hardest part of [task] today?",
  "Can you show me how you do [task] currently? (screen share)",
  "What have you tried that didn&apos;t work?",
  "If you could wave a magic wand, what would change?",
  "Is there anything I haven&apos;t asked that would help me understand your world?",
];

const WHAT_NOT_TO_ASK = [
  "Would you use a feature that did X? (Future intent is unreliable)",
  "Do you like our product? (Leads to politeness)",
  "How much would you pay for Y? (Stated WTP is wrong)",
  "Is X important to you? (Everything sounds important when asked)",
  "Don&apos;t you wish we had Z? (Leading, pushes them to your answer)",
];

const LISTENING_TECHNIQUES = [
  "Silence is your friend — after they finish, wait 3 seconds before speaking",
  "Note emotional words — frustration, delight, confusion — those are signal",
  "Repeat back what you heard — &apos;So you&apos;re saying...&apos; — confirms understanding",
  "Resist the urge to explain your product — this isn&apos;t a demo",
  "Record (with consent) — you&apos;ll miss quotes in the moment",
  "Take sparse notes during, detailed write-up after — presence beats note-taking",
];

const BIASES_TO_AVOID = [
  "Confirmation bias — you&apos;ll hear what you expected",
  "Leading questions — subtle cues shape their answers",
  "Talking users — interviewing only people who say yes",
  "Interviewing only power users — skewed picture of typical user",
  "Small sample sizes — 2 interviews tell you nothing",
  "Assuming stated = actual behaviour — what people say they do differs from what they do",
];

const FAQS = [
  {
    q: "How many customer interviews should PMs run per week?",
    a: "1 per week minimum, 3–5 per week during active discovery. Fewer and you lose pattern recognition; more and synthesis gets overwhelming. The goal is sustainable cadence. PMs who interview zero users per week lose intuition faster than they realise.",
  },
  {
    q: "What&apos;s the biggest interview mistake PMs make?",
    a: "Talking too much. Great interviews are 80% user talking, 20% PM. PMs who get excited and explain their product lose the user&apos;s real input. The discipline: treat it like therapy — ask, listen, let silence draw out the truth. Most PMs need to cut their talking by half.",
  },
];

export default function PmCustomerInterviewsPage() {
  const dates = pageDates("/pm-customer-interviews");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Customer Interviews", url: `${SITE_URL}/pm-customer-interviews` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Customer Interviews (2026 Edition)",
        description: "How PMs run customer interviews that reveal real insight. Question design, listening techniques, avoiding bias, and turning interviews into shipped product decisions.",
        image: `${SITE_URL}/api/og?title=PM+Customer+Interviews+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-customer-interviews`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🎙️</span> Great PMs listen more than they talk
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Customer Interviews<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-2">
            Great customer interviews run on preparation and restraint: prepare open-ended
            questions like tell me about the last time you did this, walk me through it, then
            let silence do the work, waiting three seconds after a user stops talking pulls
            out what matters most. PMs should log at least one interview a week, ramping to
            three to five during active discovery, since interviews are 80% user talking and
            20% PM.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-white/70 hover:text-[#89e219] underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 prep moves, 6 questions that work, 5 to avoid, 6 listening techniques, and 6 biases to catch in yourself.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build User Research Skills Daily — Free →
          </Link>
        </section>

        {/* Prep */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Interview Prep Moves</h2>
          <div className="space-y-2">
            {INTERVIEW_PREP.map((p, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{p}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What to ask */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Questions That Work</h2>
            <div className="space-y-2">
              {WHAT_TO_ASK.map((w, i) => (
                <div key={i} className="bg-[#111] border border-green-500/20 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <p className="text-sm text-white/70 italic">{w}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What not to ask */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Questions to Avoid</h2>
          <div className="space-y-2">
            {WHAT_NOT_TO_ASK.map((w, i) => (
              <div key={i} className="bg-[#111] border border-red-500/20 rounded-xl p-3 flex gap-3">
                <span className="text-red-400 flex-shrink-0">❌</span>
                <p className="text-sm text-white/70 italic">{w}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Listening */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Listening Techniques</h2>
            <div className="space-y-2">
              {LISTENING_TECHNIQUES.map((l, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Biases */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Biases to Avoid</h2>
          <div className="space-y-2">
            {BIASES_TO_AVOID.map((b, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-yellow-400 flex-shrink-0">⚠️</span>
                <p className="text-sm text-white/70">{b}</p>
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

        <RelatedPages slug="pm-customer-interviews" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build User Research Skills Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on interviewing, listening, and synthesising user insight.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
