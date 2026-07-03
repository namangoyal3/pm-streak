import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "Amazon PM Interview Guide (2026) — Leadership Principles, Bar Raiser & Questions",
  description:
    "Crack the Amazon PM interview. Leadership Principles in every answer, the Bar Raiser round, product design questions, and a complete prep plan for Amazon India PM roles.",
  keywords: [
    "Amazon PM interview", "Amazon product manager interview questions",
    "Amazon PM interview prep India", "Amazon leadership principles PM",
    "Amazon bar raiser PM", "how to crack Amazon PM interview",
    "Amazon product manager interview 2026",
  ],
  alternates: { canonical: "/amazon-pm-interview" },
  openGraph: {
    title: "Amazon PM Interview Guide 2026 — PM Streak",
    description: "Leadership Principles, Bar Raiser, product design questions, and a prep plan for Amazon PM roles.",
    url: `${SITE_URL}/amazon-pm-interview`,
    images: [{ url: `${SITE_URL}/api/og?title=Amazon+PM+Interview+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amazon PM Interview Guide 2026 — PM Streak",
    description: "Leadership Principles, Bar Raiser, product design questions, and a prep plan for Amazon PM roles.",
    images: [`${SITE_URL}/api/og?title=Amazon+PM+Interview+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const LEADERSHIP_PRINCIPLES = [
  { lp: "Customer Obsession", pmAngle: "Every product decision must trace back to a customer need. 'The business wants X' is never a complete answer at Amazon.", signal: "Start from the customer and work backwards — not from the technology or the business." },
  { lp: "Ownership", pmAngle: "PMs at Amazon own outcomes, not features. They escalate problems early and never say 'that's not my job.'", signal: "Use 'I' not 'we'. Show that you personally drove the outcome, even when it required going beyond your role." },
  { lp: "Invent and Simplify", pmAngle: "Find the simple, elegant solution. Amazon has a bias for removing steps, reducing friction, and simplifying customer journeys.", signal: "When asked to design a product, always ask: what's the simplest version that delivers the core job?" },
  { lp: "Dive Deep", pmAngle: "Leaders at Amazon know the details of their area. Being 'high level' when you should know specifics is a red flag.", signal: "Know your metrics cold. Know your users' top pain points by name. Know the edge cases in your product." },
  { lp: "Disagree and Commit", pmAngle: "Amazon values the ability to voice a strong disagreement, lose the argument, and then fully commit to the decision.", signal: "Have a story where you disagreed with a decision, stated your case clearly, and then executed fully after the call was made." },
  { lp: "Earn Trust", pmAngle: "PMs build credibility through consistent delivery, transparent communication, and intellectual honesty — not seniority.", signal: "Show how you proactively communicated bad news, admitted mistakes, or gave credit to others." },
];

const ROUNDS = [
  {
    name: "Product Design / Customer Deep Dive",
    what: "Design a new Amazon product or improve an existing one. The starting point must always be the customer — Amazon explicitly penalises starting from technology or business needs.",
    sample: [
      "Design a product for Amazon sellers who are struggling with returns.",
      "How would you improve Amazon Prime for students in India?",
      "Design a product that helps first-time Amazon buyers in Tier-3 cities.",
    ],
    tip: "Write the Press Release and FAQ before designing anything (Amazon's 'Working Backwards' method). Start: 'For [customer], who [need], the product is a [solution] that [benefit].' Then design backwards from that.",
  },
  {
    name: "Metrics & Analytical",
    what: "Define, track, and diagnose Amazon product metrics. Amazon PMs are expected to be highly quantitative.",
    sample: [
      "How would you measure the success of Amazon Pay in India?",
      "Amazon's cart abandonment rate increases 8% in Q3. Walk me through your investigation.",
      "Define the north star metric for Amazon Fresh vs Amazon Pantry.",
    ],
    tip: "Amazon thinks in terms of input metrics (things you control) and output metrics (results). Be ready to name both and explain the causal chain between them.",
  },
  {
    name: "Leadership Principles Deep Dive",
    what: "Behavioural questions mapped directly to Amazon's 16 Leadership Principles. Every answer should naturally demonstrate 1–2 LPs.",
    sample: [
      "Tell me about a time you advocated for the customer even when it cost the business something. (Customer Obsession)",
      "Describe a situation where you took on a project no one else wanted to own. (Ownership)",
      "Tell me about a time you disagreed with your manager's product decision. What happened? (Disagree and Commit)",
      "Describe a time you used data to overturn an assumption your team had held for a long time. (Dive Deep)",
    ],
    tip: "Prepare 2 strong stories per Leadership Principle. Label the LP in your prep but never say the LP name in the interview — show it, don't name it.",
  },
  {
    name: "Bar Raiser Round",
    what: "A senior Amazonian from a different team who has no stake in hiring you. Their job is to ensure the hire raises the bar. They can override a 'hire' vote from your future manager.",
    sample: [
      "Walk me through the hardest product decision you've ever made.",
      "What's something you believe about product management that most PMs disagree with?",
      "Tell me about a time you hired or promoted someone — and were wrong.",
    ],
    tip: "Be yourself. Bar Raisers are trained to detect performance. They're looking for intellectual authenticity, not a perfect script. Having strong, specific opinions is more valuable than safe, hedged answers.",
  },
];

const FAQS = [
  {
    q: "How important are Leadership Principles in the Amazon PM interview?",
    a: "They are the interview. Every question — including product design and metrics questions — is being evaluated through the lens of Leadership Principles. Candidates who prepare strong LP stories and weave LP language naturally into all their answers consistently outperform those who only prepare for LP questions directly.",
  },
  {
    q: "What is the Amazon Bar Raiser and how do I prepare for it?",
    a: "The Bar Raiser is a trained interviewer from outside your hiring team whose sole job is quality control. They have veto power. The best preparation: have genuine, specific stories — not polished scripts. Bar Raisers probe for inconsistency and depth. If your story doesn't hold up to 3 follow-up questions, it's not ready.",
  },
  {
    q: "Does Amazon PM interview include a case study?",
    a: "Amazon favours the 'Working Backwards' format over traditional case studies — you design the Press Release and FAQ, then work backwards to build the product. Some rounds use a metric investigation scenario instead. Pure consulting-style case studies are less common at Amazon than at Google or McKinsey-adjacent companies.",
  },
];

export default function AmazonPmInterviewPage() {
  const dates = pageDates("/amazon-pm-interview");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Amazon PM Interview", url: `${SITE_URL}/amazon-pm-interview` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Amazon PM Interview Guide (2026 Edition)",
        description:
          "Crack the Amazon PM interview. Leadership Principles in every answer, the Bar Raiser round, product design questions, and a complete prep plan for Amazon India PM roles.",
        image: `${SITE_URL}/api/og?title=Amazon+PM+Interview+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/amazon-pm-interview`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📦</span> Leadership Principles are the interview — not just a section of it
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Amazon PM Interview Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            An Amazon PM loop centres on four rounds — product design via Working Backwards, metrics
            and analytics, a Leadership Principles deep dive, and the Bar Raiser, a trained
            interviewer from outside your team who holds veto power. Every answer, even in design
            and metrics rounds, is evaluated against Leadership Principles, so prepared LP stories
            decide the outcome.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Leadership Principles, the Bar Raiser round, Working Backwards, and everything you need
            to know to pass the most systematised PM interview in the industry.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Start Amazon PM Prep — Free →
          </Link>
        </section>

        {/* LP section */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-3">The 6 Leadership Principles PMs Are Tested On Most</h2>
          <p className="text-white/60 text-center mb-8">Amazon has 16 LPs. These 6 come up most often in PM interviews.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LEADERSHIP_PRINCIPLES.map((lp, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <p className="font-bold text-white mb-1">{lp.lp}</p>
                <p className="text-sm text-white/60 mb-3">{lp.pmAngle}</p>
                <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-lg px-3 py-2">
                  <p className="text-xs text-[#89e219]">🎯 {lp.signal}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Rounds */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">The Amazon PM Interview Rounds</h2>
          <div className="space-y-6">
            {ROUNDS.map((round, i) => (
              <div key={round.name} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-7 h-7 rounded-full bg-[#58cc02]/20 text-[#89e219] font-bold text-sm flex items-center justify-center">{i + 1}</span>
                  <h3 className="text-lg font-bold text-white">{round.name}</h3>
                </div>
                <p className="text-sm text-white/60 mb-4">{round.what}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Sample Questions</p>
                    <ul className="space-y-1.5">
                      {round.sample.map((q, j) => (
                        <li key={j} className="flex gap-2 text-sm">
                          <span className="text-white/30">•</span>
                          <span className="text-white/70">{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-xl p-3">
                    <p className="text-xs text-[#89e219] mb-1">💡 Prep tip</p>
                    <p className="text-sm text-white/60">{round.tip}</p>
                  </div>
                </div>
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

        <RelatedPages slug="amazon-pm-interview" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Prep for Amazon LP Questions Daily</h2>
          <p className="text-white/60 mb-6">AI feedback on your Leadership Principle stories — specificity, ownership signals, and depth.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
