import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Empathy Interviews (2026) — How to Run User Interviews That Actually Produce Insight",
  description:
    "The PM guide to empathy interviews. Good vs bad questions, 5-user rule, how to read between the lines, and how to turn interview data into product decisions.",
  keywords: [
    "empathy interview PM", "user interview techniques",
    "PM interview questions for users", "5 user rule PM",
    "empathy interview template 2026",
  ],
  alternates: { canonical: "/pm-empathy-interviews" },
  openGraph: {
    title: "PM Empathy Interviews 2026 — PM Streak",
    description: "How PMs run user interviews that produce real insight — good questions, 5-user rule, synthesis.",
    url: `${SITE_URL}/pm-empathy-interviews`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Empathy+Interviews+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Empathy Interviews 2026 — PM Streak",
    description: "How PMs run user interviews that produce real insight — good questions, 5-user rule, synthesis.",
    images: [`${SITE_URL}/api/og?title=PM+Empathy+Interviews+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const GOOD_QUESTIONS = [
  { q: "Walk me through the last time you [did X].", why: "Gets a specific story, not generalisations" },
  { q: "What was the hardest part of that?", why: "Surfaces the real pain, not perceived pain" },
  { q: "What did you try to do about it?", why: "Reveals current workarounds — the real competitor" },
  { q: "What happened next?", why: "Keeps the story going; reveals downstream consequences" },
  { q: "Tell me more about that.", why: "Best follow-up question in interviewing — opens people up" },
  { q: "What would a perfect solution look like?", why: "Reveals aspirational needs, not feature requests" },
];

const BAD_QUESTIONS = [
  { q: "Would you use a feature that...?", why: "People overstate future intent by 20–40%" },
  { q: "Don&apos;t you find it annoying when...?", why: "Leading question — tells the user what to say" },
  { q: "How much would you pay for...?", why: "Stated willingness-to-pay correlates poorly with actual behaviour" },
  { q: "Do you like our product?", why: "People are polite. They&apos;ll say yes to strangers asking." },
  { q: "What features should we build?", why: "Users are bad at designing products. Ask about problems, not solutions." },
];

const FIVE_USER_RULE = [
  "5 users catches ~85% of usability issues (Nielsen)",
  "After 5, returns diminish quickly for a single problem area",
  "If you need to segment (power users vs new users), 5 per segment",
  "For broad discovery (new market), 10–15 is worth it",
  "For diary studies or long-form, smaller samples over time often beat more users",
];

const SYNTHESIS_STEPS = [
  "Transcribe within 24 hours — memory fades fast, nuance gets lost",
  "Highlight user quotes that made you stop and think",
  "Tag each insight: pain point, workaround, delight, unmet need",
  "Look for themes across 3+ interviews — one user&apos;s frustration is anecdote; three is signal",
  "Translate themes into product hypotheses: &apos;If we addressed X, then Y would change&apos;",
  "Share with your team — insights that live in your head don&apos;t change the product",
];

const FAQS = [
  {
    q: "How often should PMs run empathy interviews?",
    a: "At least 1 per week, as a sustainable baseline. Teresa Torres recommends this as the minimum for continuous discovery. PMs who do this consistently build instinct that analytics-only PMs can&apos;t replicate. 20 minutes with one user each week = 17 hours/year of direct user exposure, which compounds into pattern recognition over multiple years.",
  },
  {
    q: "How do you find users to interview?",
    a: "For existing products: in-product opt-ins (best signal), email outreach to specific user segments, post-support-ticket follow-ups. For new/no users: your personal network, LinkedIn outreach, subreddits/communities where target users hang out, paid panels (UserInterviews.com). Offer ₹500–₹2000 incentive depending on length. Aim for 70%+ show-up rate; below that, improve your pre-interview reminders.",
  },
  {
    q: "What&apos;s the biggest mistake PMs make in empathy interviews?",
    a: "Talking too much. Good interviews are ~80% user talking, 20% PM. PMs who over-explain, lead with hypotheses, or interrupt miss insight. The discipline is hard — the instinct is to fill silence. Best rule: after the user pauses, count to 3 before speaking. They&apos;ll often continue with the most important thing.",
  },
];

export default function PmEmpathyInterviewsPage() {
  const dates = pageDates("/pm-empathy-interviews");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Empathy Interviews", url: `${SITE_URL}/pm-empathy-interviews` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Empathy Interviews Guide (2026 Edition)",
        description: "The PM guide to empathy interviews. Good vs bad questions, 5-user rule, how to read between the lines, and how to turn interview data into product decisions.",
        image: `${SITE_URL}/api/og?title=PM+Empathy+Interviews+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-empathy-interviews`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🎤</span> The question you ask determines the answer you get
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Empathy Interviews Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-2">
            A PM empathy interview is a structured conversation, built on open, story-eliciting
            questions like walk me through the last time you did this, that surfaces real pain
            points and workarounds instead of polite opinions. Following the 5-user rule catches
            85% of usability issues, and a 6-step synthesis process, from transcribing within 24
            hours to sharing themes with the team, turns those conversations into product
            decisions rather than notes nobody reads.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-white/70 hover:text-[#89e219] underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 good questions, 5 bad questions to avoid, the 5-user rule explained,
            and a 6-step synthesis process to turn interviews into product decisions.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build User Empathy Daily — Free →
          </Link>
        </section>

        {/* Good questions */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Questions That Work</h2>
          <div className="space-y-3">
            {GOOD_QUESTIONS.map((g, i) => (
              <div key={i} className="bg-[#111] border border-green-500/20 rounded-xl p-4">
                <p className="text-sm text-green-400 mb-1 italic">✅ &ldquo;{g.q}&rdquo;</p>
                <p className="text-xs text-white/60">{g.why}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bad questions */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Questions to Avoid</h2>
            <div className="space-y-3">
              {BAD_QUESTIONS.map((b, i) => (
                <div key={i} className="bg-[#111] border border-red-500/20 rounded-xl p-4">
                  <p className="text-sm text-red-400 mb-1 italic">❌ &ldquo;{b.q}&rdquo;</p>
                  <p className="text-xs text-white/60">{b.why}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5-user rule */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">The 5-User Rule Explained</h2>
          <div className="space-y-2">
            {FIVE_USER_RULE.map((f, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{f}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Synthesis */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6-Step Synthesis Process</h2>
            <div className="space-y-3">
              {SYNTHESIS_STEPS.map((s, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{s}</p>
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

        <RelatedPages slug="pm-empathy-interviews" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build User Empathy Daily</h2>
          <p className="text-white/60 mb-6">Daily PM scenarios that train the discipline of empathy before solution.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
