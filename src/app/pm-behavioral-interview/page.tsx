import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Behavioral Interview Questions — STAR Stories That Get Offers",
  description:
    "Master PM behavioral interviews with the STAR framework, 25+ real questions, and story templates. Leadership, conflict, ambiguity, failure — answered the way top PMs do.",
  keywords: [
    "PM behavioral interview", "product manager behavioral questions",
    "STAR method PM interview", "PM leadership interview questions",
    "tell me about a time PM", "PM conflict interview", "product manager soft skills interview",
  ],
  alternates: { canonical: "/pm-behavioral-interview" },
  openGraph: {
    title: "PM Behavioral Interview — STAR Stories That Get Offers | PM Streak",
    description: "25+ PM behavioral questions with the STAR framework and story templates.",
    url: `${SITE_URL}/pm-behavioral-interview`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Behavioral+Interview++STAR+Stories+That+Get+Offers++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Behavioral Interview — STAR Stories That Get Offers | PM Streak",
    description: "25+ PM behavioral questions with the STAR framework and story templates.",
    images: [`${SITE_URL}/api/og?title=PM+Behavioral+Interview++STAR+Stories+That+Get+Offers++PM+Streak`],
    site: "@pmstreak",
  },
};

const STAR_STEPS = [
  { letter: "S", word: "Situation", desc: "Set the scene in 1–2 sentences. Company, team size, your role, the stakes." },
  { letter: "T", word: "Task", desc: "What was your specific responsibility? What did you personally own?" },
  { letter: "A", word: "Action", desc: "What did YOU do? (Not the team.) Use 'I', not 'we'. This is 60% of your answer." },
  { letter: "R", word: "Result", desc: "Quantify the outcome. Then add what you'd do differently — it shows self-awareness." },
];

const QUESTION_BANKS = [
  {
    theme: "Leadership & Influence",
    icon: "👥",
    questions: [
      "Tell me about a time you influenced a decision without having authority.",
      "Describe a time you had to align multiple stakeholders with conflicting priorities.",
      "Tell me about a product bet you championed that others were skeptical of.",
      "How have you led a cross-functional team through a tight deadline?",
    ],
    signal: "Interviewers want to see: clear communication, structured persuasion (data + narrative), and that you can move people without title.",
  },
  {
    theme: "Failure & Learning",
    icon: "💥",
    questions: [
      "Tell me about a product you shipped that failed. What did you learn?",
      "Describe a decision you made that you'd make differently today.",
      "Tell me about a time you missed a deadline. What happened?",
      "When have you been wrong about a user assumption?",
    ],
    signal: "Interviewers want to see: genuine ownership (no blame-shifting), a specific learning, and evidence you applied it.",
  },
  {
    theme: "Conflict & Disagreement",
    icon: "⚖️",
    questions: [
      "Tell me about a time you strongly disagreed with your manager. What did you do?",
      "Describe a conflict with engineering about scope. How did you resolve it?",
      "How have you handled a situation where design and engineering had opposing views?",
      "Tell me about a time you had to say no to a senior stakeholder.",
    ],
    signal: "Interviewers want to see: professional assertiveness, data-led resolution, and that you maintained the relationship.",
  },
  {
    theme: "Ambiguity & Ownership",
    icon: "🌫️",
    questions: [
      "Tell me about a time you had to make a decision with incomplete data.",
      "Describe a project where the requirements kept changing. How did you manage it?",
      "Tell me about a time you took ownership of something outside your job description.",
      "How have you handled a situation where your team had no clear direction?",
    ],
    signal: "Interviewers want to see: comfort with uncertainty, structured decision-making, and a bias toward action.",
  },
];

const FAQS = [
  {
    q: "How long should a behavioral answer be in a PM interview?",
    a: "2–3 minutes is ideal. Any shorter and you're not giving enough depth. Any longer and you risk losing the interviewer. Practice your stories out loud with a timer — most PMs discover their first attempts run 4–5 minutes and need trimming.",
  },
  {
    q: "How many STAR stories should I prepare?",
    a: "Prepare 8–10 strong stories that can flex across multiple question types. A good 'failure' story can also answer 'what would you do differently' or 'how do you handle feedback'. Cover: leadership, failure, conflict, ambiguity, data-driven decision, and cross-functional collaboration.",
  },
  {
    q: "What's the most common mistake in PM behavioral interviews?",
    a: "Using 'we' instead of 'I'. Interviewers are assessing YOUR contribution, not your team's. Another common mistake: spending too long on the Situation/Task (setup) and rushing through the Action (which is the actual answer). Aim for 10% setup, 60% action, 30% result.",
  },
];

export default function PmBehavioralInterviewPage() {
  const dates = pageDates("/pm-behavioral-interview");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Behavioral Interview", url: `${SITE_URL}/pm-behavioral-interview` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Behavioral Interview: STAR Stories That Get Offers",
        description:
          "Master PM behavioral interviews with the STAR framework, 25+ real questions, and story templates. Leadership, conflict, ambiguity, failure — answered the way top PMs do.",
        image: `${SITE_URL}/api/og?title=PM+Behavioral+Interview++STAR+Stories+That+Get+Offers++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-behavioral-interview`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>💬</span> The tiebreaker round — win it with prepared stories
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Behavioral Interview:<br />STAR Stories That Get Offers
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            To pass a PM behavioral interview, prepare 8–10 STAR stories covering leadership,
            failure, conflict, and ambiguity, and deliver each in 2–3 minutes — roughly 10%
            situation, 10% task, 60% action, 20% result. Say &quot;I&quot; rather than &quot;we&quot;:
            interviewers grade your personal contribution, ownership of failures, and the specific
            lesson you applied afterwards.
          </p>
          <p className="text-sm text-white/50 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Behavioral rounds separate PMs with the same technical skills. Here are 25+ questions,
            the STAR framework, and exactly what interviewers are looking for in each answer.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice Behavioral Questions Daily — Free →
          </Link>
        </section>

        {/* STAR Framework */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-3">The STAR Framework for PM Interviews</h2>
          <p className="text-white/60 text-center mb-8">Every behavioral answer, structured in 4 parts.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STAR_STEPS.map(s => (
              <div key={s.letter} className="bg-[#111] border border-white/10 rounded-xl p-4 text-center">
                <div className="w-10 h-10 rounded-full bg-[#58cc02]/20 border border-[#58cc02]/40 flex items-center justify-center text-[#89e219] font-bold text-lg mx-auto mb-3">
                  {s.letter}
                </div>
                <p className="font-semibold text-white text-sm mb-1">{s.word}</p>
                <p className="text-xs text-white/50">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 bg-[#16181c] border border-white/5 rounded-xl p-4 text-center">
            <p className="text-sm text-white/60">Time split: <span className="text-white">10% Situation · 10% Task · 60% Action · 20% Result</span></p>
          </div>
        </section>

        {/* Question Banks */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">25+ Questions by Theme</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {QUESTION_BANKS.map(bank => (
              <div key={bank.theme} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{bank.icon}</span>
                  <h3 className="font-semibold text-white">{bank.theme}</h3>
                </div>
                <ul className="space-y-2 mb-4">
                  {bank.questions.map((q, i) => (
                    <li key={i} className="flex gap-2 text-sm">
                      <span className="text-white/30 flex-shrink-0">{i + 1}.</span>
                      <span className="text-white/70">{q}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-[#0e1113] border border-[#58cc02]/20 rounded-lg px-3 py-2">
                  <p className="text-xs text-[#89e219]">🎯 {bank.signal}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
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

        <RelatedPages slug="pm-behavioral-interview" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Behavioral Stories Daily</h2>
          <p className="text-white/60 mb-6">AI feedback on your structure, specificity, and leadership signals.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
