import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Interview Questions for Freshers (2026) — First PM Job Guide",
  description:
    "PM interview questions for freshers and new graduates. What interviewers actually ask, how to answer without PM experience, APM programs, and how to build your product portfolio from scratch.",
  keywords: [
    "PM interview questions for freshers", "product manager interview questions no experience",
    "PM interview preparation for freshers", "how to get first PM job",
    "APM interview preparation freshers", "product manager fresher India 2026",
    "PM interview questions for new graduates",
  ],
  alternates: { canonical: "/pm-interview-questions-freshers" },
  openGraph: {
    title: "PM Interview Questions for Freshers 2026 — PM Streak",
    description: "How to crack your first PM interview with no PM experience — questions, answers, and portfolio tips.",
    url: `${SITE_URL}/pm-interview-questions-freshers`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Interview+Questions+for+Freshers+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Interview Questions for Freshers 2026 — PM Streak",
    description: "How to crack your first PM interview with no PM experience — questions, answers, and portfolio tips.",
    images: [`${SITE_URL}/api/og?title=PM+Interview+Questions+for+Freshers+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const QUESTION_SETS = [
  {
    theme: "Product Sense (most common for freshers)",
    icon: "🧠",
    note: "Interviewers know you haven't shipped a product. They're testing how you think — not what you've done.",
    questions: [
      {
        q: "Pick a product you use daily. What would you improve and why?",
        how: "Choose a product you genuinely care about. Structure: who uses it, what's their biggest frustration, what's your proposed change, how would you measure success. Show user empathy — not just feature ideas.",
      },
      {
        q: "Design a product for college students to manage their finances.",
        how: "Don't design for yourself — pick a specific segment (first-year hosteler? Final year placement student?). Articulate their job-to-be-done. Propose 3 solutions, pick 1 and explain why.",
      },
      {
        q: "How would you improve Zomato/Swiggy for restaurants?",
        how: "Switch the user lens from consumer to merchant — this surprises most freshers. Ask about restaurant owner pain points (order cancellations, commission, visibility). Then design for them.",
      },
    ],
  },
  {
    theme: "Guesstimation / Market Sizing",
    icon: "🔢",
    note: "These test structure and comfort with numbers — not accuracy. Show your reasoning, not a memorised answer.",
    questions: [
      {
        q: "How many active WhatsApp users are there in India?",
        how: "India population (1.4B) → smartphone users (~700M) → % who have WhatsApp (~85%) → active users (~550M). State your assumptions clearly. Sanity-check: does 550M feel right given context?",
      },
      {
        q: "Estimate the number of PM job openings in India this year.",
        how: "Number of tech companies in India × average PM team size × annual attrition + new roles. Break it down, show the logic, arrive at a number and sense-check it.",
      },
      {
        q: "How many orders does Flipkart deliver on a busy Saturday?",
        how: "DAU for Flipkart (~5M) × conversion rate (~3%) = ~150K orders/day. Multiply by 1.5x for weekend. ~225K orders. Show the funnel logic, not just a number.",
      },
    ],
  },
  {
    theme: "Why PM? / Motivation Questions",
    icon: "🎯",
    note: "Freshers fail this more than any other category. 'I like people and tech' is not an answer. Be specific.",
    questions: [
      {
        q: "Why do you want to be a product manager?",
        how: "Tie to a specific experience: 'I noticed X problem while using Y product, I researched it, I proposed a fix, I built a prototype — and I realised this is what I want to do every day.' Vague passion answers are instant red flags.",
      },
      {
        q: "What does a product manager do day-to-day?",
        how: "Show you've done the research: user research, roadmap planning, sprint management, stakeholder alignment, metrics tracking, launch management. Don't say 'build products' — that's what engineers do.",
      },
      {
        q: "Why are you interested in this company's PM role specifically?",
        how: "Name a specific product, a specific user problem you've noticed, and what you'd work on if hired. Generic 'great culture and learning opportunity' answers fail this question.",
      },
    ],
  },
  {
    theme: "Handling 'No Experience' Questions",
    icon: "💪",
    note: "These are designed to see if you've done PM work without the title. Everyone has — you just need to surface it.",
    questions: [
      {
        q: "Tell me about a time you identified a problem and solved it.",
        how: "It doesn't need to be a work example. A college fest you organised, an app you built, a process you improved in a club — these all count. Narrate it in PM language: what was the user problem, what did you do, what was the outcome?",
      },
      {
        q: "Have you ever done any product work outside of a formal role?",
        how: "This is where your portfolio matters: a product teardown, a side project, user interviews you ran, a PRD you wrote for practice. Build these before your interview. Saying 'no' here is a missed opportunity.",
      },
      {
        q: "What product have you used recently that you think could be significantly improved?",
        how: "Be ready with 2–3 specific answers. Show that you use products with an analytical eye — not just as a consumer. Pick one and go deep: who's the user, what's the pain, what's your fix, how do you measure success.",
      },
    ],
  },
];

const PORTFOLIO_ITEMS = [
  { item: "Product Teardown", what: "Pick any app. Write 1 page: user segments, north star metric, top 3 UX wins, top 3 improvement areas, your recommendation.", why: "Shows analytical thinking and product instinct without needing a PM title." },
  { item: "Mock PRD", what: "Write a Product Requirements Doc for a feature you wish existed. Problem statement, user stories, success metrics, out of scope.", why: "Demonstrates you understand PM execution, not just strategy." },
  { item: "User Research Brief", what: "Interview 5 real users about a problem. Write up: methodology, key insights (3-5), implications for product decisions.", why: "The biggest thing freshers lack is user empathy evidence — this provides it." },
  { item: "Side Project", what: "Build something real, even a no-code tool. Document the PM decisions you made: who is it for, why these features, what did you learn?", why: "Shipping something (even small) signals the most important PM trait: execution." },
];

const FAQS = [
  {
    q: "Can freshers (no experience) get a PM job directly?",
    a: "Yes — through APM programs specifically designed for this. Flipkart, Razorpay, Google, Meesho, and Swiggy all run structured APM programs that hire fresh graduates. These are competitive (hundreds of applicants per spot) but they exist precisely for people without PM experience. Outside of APM programs, transitioning into PM typically requires 1–2 years in an adjacent role first.",
  },
  {
    q: "What should a fresher PM portfolio include?",
    a: "Prioritise quality over quantity: 1 strong product teardown, 1 mock PRD for a feature you care about, and evidence of user research (even informal interviews count). If you've built anything — a side project, an internal tool, a student org product — document the PM thinking behind it. One good artefact beats five weak ones.",
  },
  {
    q: "Which APM programs should a fresher target in India?",
    a: "The top tier: Google APMM (very competitive, IIT/IIM heavy), Flipkart Product Accelerator (strong engineering bias), Razorpay APM (values thinking over pedigree). Second tier: Meesho, Swiggy, Zepto, CRED. Apply to all that are open simultaneously — APM season is short (June–October) and spots are few.",
  },
];

export default function PmInterviewQuestionsFreshersPage() {
  const dates = pageDates("/pm-interview-questions-freshers");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Interview Questions for Freshers", url: `${SITE_URL}/pm-interview-questions-freshers` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Interview Questions for Freshers (2026)",
        description:
          "PM interview questions for freshers and new graduates. What interviewers actually ask, how to answer without PM experience, APM programs, and how to build your product portfolio from scratch.",
        image: `${SITE_URL}/api/og?title=PM+Interview+Questions+for+Freshers+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-interview-questions-freshers`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🎓</span> No PM experience needed — the right preparation is what matters
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Interview Questions<br />for Freshers (2026)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            For freshers, PM interviews concentrate on four question types: product sense, guesstimates and market
            sizing, &ldquo;why PM&rdquo; motivation questions, and prompts that surface product work you did without
            the title. Interviewers know freshers haven&apos;t shipped — they grade how you think. A lightweight
            portfolio (product teardown, mock PRD, user research) plus APM programs like Flipkart&apos;s and
            Razorpay&apos;s are the most direct route into a first PM role.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            What interviewers actually ask freshers, how to answer without PM experience,
            how to build a portfolio from zero, and which APM programs to target.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Start Fresher PM Prep — Free →
          </Link>
        </section>

        {/* Questions */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="space-y-8">
            {QUESTION_SETS.map(set => (
              <div key={set.theme} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{set.icon}</span>
                  <h2 className="text-lg font-semibold text-white">{set.theme}</h2>
                </div>
                <p className="text-sm text-[#89e219]/80 mb-5">{set.note}</p>
                <div className="space-y-4">
                  {set.questions.map((item, i) => (
                    <div key={i} className="border border-white/5 rounded-xl p-4">
                      <p className="font-medium text-white mb-2">&ldquo;{item.q}&rdquo;</p>
                      <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-lg p-3">
                        <p className="text-xs text-[#89e219] mb-1">✅ How to answer</p>
                        <p className="text-sm text-white/70">{item.how}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Portfolio section */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-3">Build Your PM Portfolio in 4 Weeks</h2>
            <p className="text-white/60 text-center mb-8">You don&apos;t need a PM title to have PM artefacts. Build these before your interview season.</p>
            <div className="space-y-4">
              {PORTFOLIO_ITEMS.map((item, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#58cc02]/20 text-[#89e219] text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                    <div>
                      <p className="font-semibold text-white mb-1">{item.item}</p>
                      <p className="text-sm text-white/60 mb-2">{item.what}</p>
                      <p className="text-xs text-[#89e219]">💡 {item.why}</p>
                    </div>
                  </div>
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

        <RelatedPages slug="pm-interview-questions-freshers" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Start Building PM Instinct Today</h2>
          <p className="text-white/60 mb-6">2 minutes a day — product teardowns, case questions, and frameworks built for fresher PM prep.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
