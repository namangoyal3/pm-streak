import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "Product Sense Interview Questions — Frameworks & Examples",
  description:
    "Master product sense interviews with proven frameworks. Learn how to design products, identify user needs, and prioritise features — the way top PMs do at Google, Meta, and Stripe.",
  keywords: [
    "product sense interview", "product sense questions", "product sense framework",
    "how to answer product sense", "product design interview", "PM product sense",
    "product sense examples", "improve product sense",
  ],
  alternates: { canonical: "/product-sense-interview" },
  openGraph: {
    title: "Product Sense Interview — Frameworks & Examples | PM Streak",
    description: "Master product sense interviews with proven frameworks used by top PMs at Google, Meta, Stripe.",
    url: `${SITE_URL}/product-sense-interview`,
    images: [{ url: `${SITE_URL}/api/og?title=Product+Sense+Interview++Frameworks+&+Examples++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Sense Interview — Frameworks & Examples | PM Streak",
    description: "Master product sense interviews with proven frameworks used by top PMs at Google, Meta, Stripe.",
    images: [`${SITE_URL}/api/og?title=Product+Sense+Interview++Frameworks+&+Examples++PM+Streak`],
    site: "@pmstreak",
  },
};

const FRAMEWORK_STEPS = [
  {
    step: "1",
    title: "Clarify the goal",
    description: "Ask one clarifying question before diving in. What's the company's goal with this product? Who is the primary user? What constraints exist?",
    example: "\"Before I start, is the goal to increase engagement, revenue, or user acquisition?\"",
  },
  {
    step: "2",
    title: "Define the user segments",
    description: "List 3–4 user types, then pick the most underserved one to focus on. Great PMs go narrow and deep, not broad and shallow.",
    example: "\"I'll focus on new users in their first week — they have the highest churn and clearest unmet needs.\"",
  },
  {
    step: "3",
    title: "Map their pain points",
    description: "Walk through the user journey and identify where friction, confusion, or unmet needs exist. Use the user's language, not feature names.",
    example: "\"New users drop off at step 3 because they don't understand what value they'll get from completing setup.\"",
  },
  {
    step: "4",
    title: "Brainstorm solutions",
    description: "Generate 4–5 diverse ideas without evaluating them yet. Mix quick wins, medium bets, and moonshots. Show range of thinking.",
    example: "\"Idea 1: a progress bar showing value unlocked. Idea 2: a guided first-action checklist. Idea 3: peer comparison...\"",
  },
  {
    step: "5",
    title: "Prioritise with a framework",
    description: "Score your ideas on impact, feasibility, and alignment with the goal. Pick one and defend the choice clearly.",
    example: "\"I'd prioritise the guided checklist — highest impact for new users, 1-week build, directly tied to activation.\"",
  },
  {
    step: "6",
    title: "Define success metrics",
    description: "Name 1–2 primary metrics and 1 guardrail. Don't just say 'engagement' — be specific about what number moves and by how much.",
    example: "\"Primary: day-7 retention. Guardrail: no increase in support tickets. Target: 5% lift in 30 days.\"",
  },
];

const SAMPLE_QUESTIONS = [
  "How would you improve Duolingo for users who keep quitting after day 3?",
  "Design a product for remote teams who struggle with async communication.",
  "How would you improve Google Search for students researching academic papers?",
  "What feature would you add to Instagram to help creators grow faster?",
  "Design a financial product for gig workers who have irregular income.",
  "How would you improve the Netflix home screen to reduce 'decision fatigue'?",
  "Design a safety feature for women using late-night ride-sharing apps.",
  "How would you improve Notion for teams that have never used a wiki before?",
];

const FAQS = [
  {
    q: "What is product sense and why do interviewers test it?",
    a: "Product sense is the ability to deeply understand users, identify real problems, and design solutions that create genuine value. Interviewers test it because it's the core skill that separates good PMs from great ones — it's hard to teach, easy to spot, and directly predicts on-the-job performance.",
  },
  {
    q: "How do I develop better product sense?",
    a: "The fastest way is deliberate daily practice. Tear down products you use, ask 'why did they make that decision?', practice structured answers out loud, and get feedback on your reasoning. PM Streak's daily lessons compress lessons from 300+ PM interviews into 2-minute habit loops — most users notice measurable improvement in 2 weeks.",
  },
  {
    q: "What makes a product sense answer stand out?",
    a: "The best answers are user-specific (not generic), make a clear prioritisation call (not a wishlist), and define success quantitatively. Interviewers remember candidates who said 'I'd focus on X because of Y, and I'd know it's working when Z' — not candidates who listed 10 features.",
  },
  {
    q: "Should I use a framework for product sense interviews?",
    a: "Yes, but flexibly. A framework prevents panic and shows structure. But the best candidates adapt it to the question rather than rigidly following it. Know the 6-step framework, then practise until it feels natural — not scripted.",
  },
];

export default function ProductSenseInterviewPage() {
  const dates = pageDates("/product-sense-interview");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Product Sense Interview", url: `${SITE_URL}/product-sense-interview` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Answer Product Sense Interview Questions",
        "description": "A 6-step framework for answering product sense questions in PM interviews.",
        "step": FRAMEWORK_STEPS.map(s => ({
          "@type": "HowToStep",
          "name": s.title,
          "text": s.description,
        })),
      }} />
      <JsonLd data={articleSchema({
        headline: "Product Sense Interview: The Framework That Works",
        description: "Master product sense interviews with proven frameworks. Learn how to design products, identify user needs, and prioritise features — the way top PMs do at Google, Meta, and Stripe.",
        image: `${SITE_URL}/api/og?title=Product+Sense+Interview++Frameworks+&+Examples++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/product-sense-interview`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🧠</span> The #1 skill tested in every PM interview loop
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Product Sense Interview:<br />The Framework That Works
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            A product sense interview tests whether you can understand users deeply, identify
            real problems, and design solutions that create genuine value — the core skill in
            every PM loop. Strong answers follow six steps: clarify the goal, define user
            segments, map pain points, brainstorm several solutions, prioritise one with a
            clear framework, and define success metrics with a guardrail.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Product sense questions trip up even experienced PMs. Here&apos;s the exact
            6-step framework top PMs use — with real examples and how to practise it daily.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all"
          >
            Practice Product Sense Daily — Free →
          </Link>
        </section>

        {/* Framework */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-3">The 6-Step Product Sense Framework</h2>
          <p className="text-white/60 text-center mb-10 max-w-xl mx-auto">
            Use this in every product sense answer. It keeps you structured under pressure
            and signals strong PM thinking to interviewers.
          </p>
          <div className="space-y-6">
            {FRAMEWORK_STEPS.map((item) => (
              <div key={item.step} className="flex gap-4 bg-[#111] border border-white/10 rounded-xl p-5">
                <div className="w-8 h-8 rounded-full bg-[#58cc02]/20 border border-[#58cc02]/40 flex items-center justify-center text-[#89e219] font-bold text-sm flex-shrink-0">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-white/60 mb-3">{item.description}</p>
                  <div className="bg-[#0e1113] border border-white/5 rounded-lg px-4 py-2">
                    <p className="text-xs text-[#89e219] italic">{item.example}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sample Questions */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-3">Practice Questions</h2>
            <p className="text-white/60 text-center mb-8">Apply the framework to these real interview-style questions.</p>
            <ul className="space-y-3">
              {SAMPLE_QUESTIONS.map((q, i) => (
                <li key={i} className="flex gap-3 bg-[#111] border border-white/10 rounded-xl px-5 py-4">
                  <span className="text-white/30 text-sm w-5 flex-shrink-0">{i + 1}.</span>
                  <span className="text-white/80 text-sm">{q}</span>
                </li>
              ))}
            </ul>
            <div className="text-center mt-8">
              <Link
                href="/interview-prep"
                className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all"
              >
                Get AI Feedback on Your Answers →
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-8">FAQ</h2>
          <div className="space-y-5">
            {FAQS.map((faq) => (
              <div key={faq.q} className="border border-white/10 rounded-xl p-5">
                <h3 className="font-semibold text-white mb-2">{faq.q}</h3>
                <p className="text-sm text-white/60">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <RelatedPages slug="product-sense-interview" />

        {/* CTA */}
        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Product Sense Every Day</h2>
          <p className="text-white/60 mb-6">2-minute daily lessons from 300+ real PM interviews. Your streak keeps you sharp.</p>
          <Link
            href="/signup"
            className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors"
          >
            Start Free — No Credit Card →
          </Link>
        </section>
      </main>
    </>
  );
}
