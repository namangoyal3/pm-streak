import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Feedback Guide (2026) — How Great PMs Give and Receive Feedback",
  description:
    "How PMs give and receive feedback effectively. SBI framework, specific examples, how to handle defensive reactions, and how to make feedback a habit instead of an event.",
  keywords: [
    "PM feedback", "giving feedback PM",
    "receiving feedback product manager", "SBI framework PM",
    "PM 360 feedback", "feedback skills PM 2026",
  ],
  alternates: { canonical: "/pm-feedback-guide" },
  openGraph: {
    title: "PM Feedback Guide 2026 — PM Streak",
    description: "How PMs give and receive feedback effectively — SBI, scripts, and habits.",
    url: `${SITE_URL}/pm-feedback-guide`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Feedback+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Feedback Guide 2026 — PM Streak",
    description: "How PMs give and receive feedback effectively — SBI, scripts, and habits.",
    images: [`${SITE_URL}/api/og?title=PM+Feedback+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const SBI_MODEL = [
  { letter: "S", word: "Situation", what: "Anchor the feedback in a specific moment. &apos;In yesterday&apos;s sprint planning&apos; — not &apos;you generally tend to.&apos;" },
  { letter: "B", word: "Behaviour", what: "Describe what the person did — observable actions. &apos;You jumped in to answer before the designer finished.&apos;" },
  { letter: "I", word: "Impact", what: "Explain the effect on others, the team, or outcomes. &apos;It felt like their perspective wasn&apos;t heard, which made them less forthcoming later.&apos;" },
];

const SCRIPTS = [
  {
    situation: "Giving critical feedback to your engineer lead",
    bad: "You need to be more responsive in reviews.",
    good: "In yesterday&apos;s design review, when you pushed back on the wireframe without explaining why, the designer felt dismissed. Next time, can you share your reasoning? It&apos;ll help us converge faster.",
  },
  {
    situation: "Giving positive feedback (make it specific)",
    bad: "Good job on the launch!",
    good: "In the launch retro, how you acknowledged the team&apos;s efforts specifically by name — that was well done. It built trust and motivated people to take ownership on the next project.",
  },
  {
    situation: "Giving upward feedback to your manager",
    bad: "I need more direction.",
    good: "In our last 1:1, I left unclear on whether to prioritise A or B. In the future, could we end each 1:1 with the one thing I should most focus on? It would help me act faster with less back-and-forth.",
  },
  {
    situation: "Asking for feedback",
    bad: "Any feedback for me?",
    good: "I&apos;ve been working on being more decisive in meetings. From the sprint review yesterday, did that come through? What could I do differently next time?",
  },
];

const RECEIVING_RULES = [
  "Listen without interrupting. Even if the feedback is &apos;wrong,&apos; hear the full version first.",
  "Ask clarifying questions before defending: &apos;Can you give me a specific example?&apos;",
  "Assume good intent. Most feedback is given because the person wants you to grow, not to hurt you.",
  "Separate the content from the delivery. Even poorly delivered feedback often contains real signal.",
  "Say &apos;thank you&apos; — even if you disagree. Feedback takes effort to give; acknowledge it.",
  "Follow up. 2 weeks later: &apos;You mentioned X. I&apos;ve tried Y. How&apos;s that landing for you?&apos;",
];

const FAQS = [
  {
    q: "How often should PMs give feedback to their team?",
    a: "Small feedback weekly, structured feedback quarterly. Weekly small: &apos;that was a great catch in the review&apos; or &apos;next time, can you push on X earlier?&apos; Quarterly structured: sit-down conversations about growth, strengths, and areas to develop. PMs who only give feedback during annual reviews miss 48 opportunities to help their team grow — and their team notices the absence.",
  },
  {
    q: "How do you give critical feedback without damaging the relationship?",
    a: "Three rules: (1) Start with curiosity (&apos;I want to understand what happened in that moment&apos;), (2) Use SBI to stay specific and non-judgmental, (3) Show you&apos;re invested in their success. The feedback that damages relationships is usually vague, emotional, or delivered with hidden agendas. Feedback that&apos;s specific, timely, and clearly well-intentioned strengthens relationships more often than it hurts them.",
  },
  {
    q: "What&apos;s the biggest feedback mistake PMs make?",
    a: "Saving feedback for reviews. Feedback delivered 3 months after the event has lost most of its value — the person may not even remember the specific moment. Feedback is most useful within 48 hours of the behaviour. PMs who build a habit of quick, frequent, small feedback create teams that grow faster than teams running on periodic formal reviews alone.",
  },
];

export default function PmFeedbackGuidePage() {
  const dates = pageDates("/pm-feedback-guide");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Feedback Guide", url: `${SITE_URL}/pm-feedback-guide` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Feedback Guide (2026 Edition)",
        description:
          "How PMs give and receive feedback effectively. SBI framework, specific examples, how to handle defensive reactions, and how to make feedback a habit instead of an event.",
        image: `${SITE_URL}/api/og?title=PM+Feedback+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-feedback-guide`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>💬</span> Feedback is a skill. Most PMs never learn it.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Feedback Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            How do PMs give feedback that lands? The SBI model — Situation, Behaviour, Impact —
            anchors feedback in a specific moment instead of vague generalities, and applies
            whether you&apos;re giving critical feedback to an engineering lead, upward feedback
            to your manager, or receiving feedback yourself. Pairing SBI with rules like listening
            without interrupting and following up weeks later turns feedback into a habit rather
            than a once-a-year event.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The SBI model, 4 feedback scripts (critical, positive, upward, asking),
            and 6 rules for receiving feedback without defensiveness.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Feedback Muscle Daily — Free →
          </Link>
        </section>

        {/* SBI */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">The SBI Feedback Model</h2>
          <div className="space-y-4">
            {SBI_MODEL.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-[#58cc02]/20 border border-[#58cc02]/40 text-[#89e219] flex items-center justify-center font-bold">{s.letter}</div>
                  <p className="font-bold text-white">{s.word}</p>
                </div>
                <p className="text-sm text-white/60 ml-13">{s.what}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Scripts */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">4 Feedback Scripts</h2>
            <div className="space-y-5">
              {SCRIPTS.map((s, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                  <p className="text-xs text-[#89e219] uppercase tracking-wider mb-3">{s.situation}</p>
                  <div className="space-y-2">
                    <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3">
                      <p className="text-xs text-red-400 mb-1">❌ Don&apos;t say</p>
                      <p className="text-sm text-white/70 italic">&ldquo;{s.bad}&rdquo;</p>
                    </div>
                    <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3">
                      <p className="text-xs text-green-400 mb-1">✅ Say instead</p>
                      <p className="text-sm text-white/70 italic">&ldquo;{s.good}&rdquo;</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Receiving feedback */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Rules for Receiving Feedback</h2>
          <div className="space-y-2">
            {RECEIVING_RULES.map((r, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
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

        <RelatedPages slug="pm-feedback-guide" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Hard PM Conversations</h2>
          <p className="text-white/60 mb-6">Daily scenarios on feedback, tough conversations, and stakeholder alignment.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
