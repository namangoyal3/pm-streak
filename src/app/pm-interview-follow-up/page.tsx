import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Interview Follow-Up Guide (2026) — Emails, Thank-You Notes & What to Do After",
  description:
    "What to do after your PM interview. Thank-you email templates, how to follow up without seeming desperate, handling silence, and how to turn a rejection into a future offer.",
  keywords: [
    "PM interview follow up", "thank you email PM interview",
    "after PM interview", "PM interview email template",
    "PM rejection email 2026",
  ],
  alternates: { canonical: "/pm-interview-follow-up" },
  openGraph: {
    title: "PM Interview Follow-Up Guide 2026 — PM Streak",
    description: "Thank-you emails, follow-up timing, and how to handle silence or rejection after PM interviews.",
    url: `${SITE_URL}/pm-interview-follow-up`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Interview+Follow-Up+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Interview Follow-Up Guide 2026 — PM Streak",
    description: "Thank-you emails, follow-up timing, and how to handle silence or rejection after PM interviews.",
    images: [`${SITE_URL}/api/og?title=PM+Interview+Follow-Up+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const POST_INTERVIEW_STEPS = [
  {
    step: "Within 24 hours: Thank-you email",
    what: "Send individual thank-you notes to every interviewer. Personalised, specific, short.",
    template: "Thank you for the conversation about [specific topic you discussed]. [One sentence reinforcing your interest or adding a thought you wish you&apos;d shared]. I enjoyed learning about [something specific they shared]. Looking forward to the next steps.",
    avoid: "Generic &apos;thanks for your time&apos; notes. Same email copy-pasted to everyone. Long essays explaining answers you gave.",
  },
  {
    step: "Day 2–3: Capture your own notes",
    what: "Write down the questions asked, your answers, and what you&apos;d change. This is gold for future interviews regardless of outcome.",
    template: "Personal doc: Company name, interviewer names, questions asked, how I answered, what I&apos;d do differently, my overall read on whether this is a fit.",
    avoid: "Waiting until the rejection email to remember the interview. You&apos;ll forget 60% within a week.",
  },
  {
    step: "Day 5–7: If no update, light follow-up",
    what: "A brief, non-pushy check-in with your recruiter or main contact.",
    template: "Hi [name], just wanted to check if there&apos;s any update on next steps. Happy to provide anything else that would help.",
    avoid: "Emailing the hiring manager directly. Following up daily. Sending an emotional &apos;I really want this&apos; email.",
  },
  {
    step: "Day 10+: If still silent, one more follow-up",
    what: "A final, respectful nudge. After this, move on mentally.",
    template: "Hi [name], circling back in case this got buried. If the role has moved in a different direction, no worries — I just wanted to make sure I hadn&apos;t missed anything. Happy to stay in touch either way.",
    avoid: "Continuing to follow up beyond this. Sending angry or guilt-inducing messages. Burning the relationship by going silent with anger.",
  },
];

const REJECTION_HANDLING = [
  { step: "Respond within 24 hours — graciously", detail: "Thank them, express continued interest in the company, ask for feedback if appropriate. This opens the door for future roles." },
  { step: "Ask for specific feedback", detail: "Not &apos;why was I rejected?&apos; but &apos;what&apos;s one thing I could have done differently?&apos; Recruiters are more likely to share candid input with that framing." },
  { step: "Document what happened", detail: "Write a private post-mortem. What went well? What went poorly? What would you prep differently? This turns rejection into compounding capital for future interviews." },
  { step: "Stay in touch", detail: "Follow the company, engage thoughtfully with their content, send a message 6 months later if you&apos;ve grown. Many PM offers come from second-attempt candidates who improved visibly." },
  { step: "Don&apos;t take it personally", detail: "PM interviews are noisy. Many strong candidates get rejected for reasons that have nothing to do with their skill (budget, headcount, specific team fit, interviewer preferences). Keep applying to others." },
];

const FAQS = [
  {
    q: "Do thank-you notes after PM interviews actually matter?",
    a: "They matter more as a signal than a decisive factor. A thoughtful thank-you won&apos;t turn a rejection into an offer, but it reinforces positive impression when the decision is borderline. More importantly, not sending one can read as disinterested — especially at companies with a strong culture of follow-through. 5 minutes of effort is worth the marginal uplift.",
  },
  {
    q: "How long should you wait before following up with a recruiter?",
    a: "5–7 business days after your last interaction is the standard window. Earlier feels pushy; later can lose momentum. If the recruiter said &apos;we&apos;ll get back to you in X days,&apos; wait until X+2 before nudging. Always be polite; recruiters have long memories and the industry is small.",
  },
  {
    q: "How do you recover from a rejected PM interview at a company you really want?",
    a: "Most top companies allow re-interviews after 6–12 months. The path that works: understand why you were rejected (ask for feedback), address the specific gap explicitly over the next 6–12 months, stay in touch with the recruiter or hiring manager, and re-apply with clear evidence of growth. Many strong PMs get offers on their second or third attempt at top companies.",
  },
];

export default function PmInterviewFollowUpPage() {
  const dates = pageDates("/pm-interview-follow-up");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Interview Follow-Up", url: `${SITE_URL}/pm-interview-follow-up` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Interview Follow-Up Guide (2026 Edition)",
        description:
          "What to do after your PM interview. Thank-you email templates, how to follow up without seeming desperate, handling silence, and how to turn a rejection into a future offer.",
        image: `${SITE_URL}/api/og?title=PM+Interview+Follow-Up+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-interview-follow-up`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📬</span> What happens after the interview matters more than candidates think
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Interview Follow-Up Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            What happens after a PM interview follows a four-step timeline: a thank-you email
            within 24 hours, your own notes on questions and answers by day two or three, a
            light recruiter check-in by day five to seven, and one final nudge by day ten
            before moving on. If the outcome is rejection, responding graciously and asking for
            specific feedback often matter more than the interview itself for a future offer.
          </p>
          <p className="text-sm text-white/50 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The 4-step post-interview playbook, thank-you email templates,
            how to handle silence, and how to turn rejection into a future offer.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Keep Practicing While You Wait — Free →
          </Link>
        </section>

        {/* Post-interview steps */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">The 4-Step Post-Interview Playbook</h2>
          <div className="space-y-5">
            {POST_INTERVIEW_STEPS.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <p className="font-bold text-white mb-1">{s.step}</p>
                <p className="text-sm text-white/60 mb-3">{s.what}</p>
                <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-lg p-3 mb-2">
                  <p className="text-xs text-[#89e219] mb-1">📝 Template</p>
                  <p className="text-sm text-white/70 italic">&ldquo;{s.template}&rdquo;</p>
                </div>
                <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3">
                  <p className="text-xs text-red-400 mb-1">❌ Avoid</p>
                  <p className="text-xs text-white/60">{s.avoid}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Rejection handling */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">How to Handle Rejection</h2>
            <div className="space-y-3">
              {REJECTION_HANDLING.map((r, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-white text-sm mb-1">{i + 1}. {r.step}</p>
                  <p className="text-xs text-white/60">{r.detail}</p>
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

        <RelatedPages slug="pm-interview-follow-up" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Stay Sharp Through the Wait</h2>
          <p className="text-white/60 mb-6">Daily PM practice keeps you interview-ready for the next opportunity.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
