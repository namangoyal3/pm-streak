import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "150+ Product Manager Interview Questions (2026) — PM Streak",
  description:
    "The most comprehensive list of PM interview questions for 2026. Product sense, metrics, execution, strategy, behavioral, and estimation — with frameworks and example answers.",
  keywords: [
    "product manager interview questions", "PM interview questions 2026",
    "product sense interview questions", "PM metrics questions",
    "product manager interview examples", "PM behavioral questions",
    "product execution questions", "FAANG PM interview questions",
  ],
  alternates: { canonical: "/product-manager-interview-questions" },
  openGraph: {
    title: "150+ PM Interview Questions (2026) — PM Streak",
    description: "The most comprehensive list of product manager interview questions with frameworks and example answers.",
    url: `${SITE_URL}/product-manager-interview-questions`,
    images: [{ url: `${SITE_URL}/api/og?title=150++PM+Interview+Questions+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "150+ PM Interview Questions (2026) — PM Streak",
    description: "The most comprehensive list of product manager interview questions with frameworks and example answers.",
    images: [`${SITE_URL}/api/og?title=150++PM+Interview+Questions+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const QUESTION_CATEGORIES = [
  {
    category: "Product Sense",
    icon: "🧠",
    description: "Tests your ability to think about users, design products, and reason from first principles.",
    questions: [
      "How would you improve Google Maps for first-time users in tier-3 cities?",
      "Design a product that helps elderly users stay connected with family.",
      "What product would you build for gig economy workers in India?",
      "How would you redesign the Instagram Explore page?",
      "What feature would you add to Spotify to increase daily active usage?",
      "Design a safety feature for solo female travellers using Uber.",
      "How would you improve LinkedIn's job application experience?",
      "What's a product you use daily that you'd completely redesign, and why?",
    ],
  },
  {
    category: "Metrics & Analytics",
    icon: "📊",
    description: "Tests your ability to define success, diagnose problems, and think in data.",
    questions: [
      "WhatsApp's message send rate dropped 15% last Tuesday. Walk me through your diagnosis.",
      "How would you measure the success of YouTube's recommendation algorithm?",
      "What metrics would you track for a new onboarding flow?",
      "Our DAU/MAU ratio has been declining for 3 months. What do you investigate first?",
      "How do you know when a metric improvement is real vs a measurement artifact?",
      "Define the North Star metric for a B2B SaaS product like Notion.",
      "How would you set up an A/B test for a new checkout flow?",
      "Revenue is up but engagement is down — is that a good or bad signal?",
    ],
  },
  {
    category: "Execution & Prioritisation",
    icon: "⚡",
    description: "Tests how you handle trade-offs, constraints, and delivery pressure.",
    questions: [
      "You have 3 engineers and 2 weeks. Which of these 6 features do you ship?",
      "Engineering says the feature you want will take 3 months. What do you do?",
      "Two PMs disagree on roadmap priority. How do you resolve it?",
      "A competitor just shipped the feature you were planning. Do you still build it?",
      "How do you decide when to cut scope vs delay a launch?",
      "Your launch went live and a critical bug was found. Walk me through your response.",
      "How do you manage stakeholder expectations when you're behind schedule?",
      "What's your process for writing a PRD from scratch?",
    ],
  },
  {
    category: "Strategy",
    icon: "♟️",
    description: "Tests your ability to think about markets, competition, and long-term bets.",
    questions: [
      "Should Google enter the short-form video market with a TikTok competitor?",
      "How would you grow Duolingo's revenue without hurting the free experience?",
      "Uber wants to expand into grocery delivery in South-East Asia. Good idea?",
      "How would you defend WhatsApp's market position against a new entrant?",
      "What's the biggest risk to Airbnb's business in the next 3 years?",
      "Should a B2B SaaS company launch a freemium tier? What are the trade-offs?",
      "How would you assess whether to build vs buy a new capability?",
      "What's your framework for evaluating a new market to enter?",
    ],
  },
  {
    category: "Behavioral",
    icon: "💬",
    description: "Tests leadership, collaboration, conflict handling, and how you work under ambiguity.",
    questions: [
      "Tell me about a product you shipped that failed. What did you learn?",
      "Describe a time you had to say no to a senior stakeholder.",
      "How have you handled a situation where engineering pushed back hard on your spec?",
      "Tell me about a time you changed your mind based on data.",
      "How do you influence without authority?",
      "Describe a time you had to make a decision with incomplete information.",
      "How do you stay user-focused when under pressure to ship fast?",
      "Tell me about your most impactful product decision and how you made it.",
    ],
  },
  {
    category: "Estimation",
    icon: "🔢",
    description: "Tests your ability to structure ambiguous problems and make calibrated estimates.",
    questions: [
      "How many Google searches happen in India per day?",
      "Estimate the market size for electric vehicles in tier-2 Indian cities.",
      "How many food delivery orders does Swiggy process on a Sunday?",
      "What's the revenue potential for PM Streak in the next 2 years?",
      "Estimate the number of active WhatsApp users in rural India.",
      "How much storage does Netflix need per day for new content?",
      "If 1% of India's 500M smartphone users paid ₹299/month for a PM app, what's the TAM?",
      "How many Uber rides happen in Bangalore on a Monday morning?",
    ],
  },
];

const FAQS = [
  {
    q: "What are the most important PM interview questions to practise?",
    a: "Focus on product sense (design/improve a product) and metrics (debug a drop) first — they appear in almost every PM interview loop. Behavioral questions are the tiebreaker. Get comfortable with 2-3 solid answers per category before drilling edge cases.",
  },
  {
    q: "How do interviewers evaluate PM interview answers?",
    a: "Interviewers look for structured thinking (you didn't panic), user empathy (you started with users, not features), data orientation (you'd validate with metrics), and decisiveness (you made a call, not just a list). Strong answers show all four.",
  },
  {
    q: "How many PM interview questions should I practise?",
    a: "Quality over quantity. 10 deeply-understood questions beat 100 memorised ones. For each question type, master 3-5 examples so well that you can adapt them on the fly. Use PM Streak's daily practice to build that depth consistently.",
  },
];

export default function ProductManagerInterviewQuestionsPage() {
  const dates = pageDates("/product-manager-interview-questions");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Interview Questions", url: `${SITE_URL}/product-manager-interview-questions` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "150+ Product Manager Interview Questions",
        description: "The most comprehensive list of PM interview questions for 2026. Product sense, metrics, execution, strategy, behavioral, and estimation — with frameworks and example answers.",
        image: `${SITE_URL}/api/og?title=150++PM+Interview+Questions+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/product-manager-interview-questions`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📋</span> Updated for 2026 interview cycles
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            150+ Product Manager Interview Questions
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Product manager interview questions fall into six categories: product sense, metrics
            and analytics, execution and prioritisation, strategy, behavioral, and estimation.
            Product sense and metrics appear in almost every PM interview loop, while behavioral
            rounds act as the tiebreaker. Interviewers evaluate answers on structured thinking,
            user empathy, data orientation, and decisiveness — this guide lists 150+ real
            examples across all six types.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Every question type asked in PM interviews at Google, Meta, Amazon, Flipkart,
            and top startups — organised by category with what interviewers are actually looking for.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all"
          >
            Practice with AI Feedback — Free →
          </Link>
        </section>

        {/* Questions by Category */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="space-y-10">
            {QUESTION_CATEGORIES.map((cat) => (
              <div key={cat.category} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{cat.icon}</span>
                  <h2 className="text-xl font-bold">{cat.category}</h2>
                </div>
                <p className="text-sm text-white/50 mb-5">{cat.description}</p>
                <ol className="space-y-2">
                  {cat.questions.map((q, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <span className="text-white/30 w-5 flex-shrink-0">{i + 1}.</span>
                      <span className="text-white/80">{q}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-5 pt-4 border-t border-white/5">
                  <Link
                    href="/interview-prep"
                    className="text-sm text-[#89e219] hover:text-[#89e219] transition-colors"
                  >
                    Practice {cat.category} questions with AI feedback →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
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

        <RelatedPages slug="product-manager-interview-questions" />

        {/* CTA */}
        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice These Questions with AI Feedback</h2>
          <p className="text-white/60 mb-6">
            PM Streak generates unlimited practice questions and gives instant feedback on your answers.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors"
          >
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
