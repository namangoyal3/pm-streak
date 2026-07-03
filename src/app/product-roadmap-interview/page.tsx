import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "Product Roadmap Interview Questions (2026) — Build, Defend & Communicate",
  description:
    "Master product roadmap interview questions. How to build, prioritise, defend, and communicate roadmaps — with real questions, frameworks, and what interviewers want to hear.",
  keywords: [
    "product roadmap interview questions", "PM roadmap interview",
    "how to build a product roadmap interview", "roadmap prioritisation PM interview",
    "product roadmap questions 2026", "PM roadmap strategy interview",
  ],
  alternates: { canonical: "/product-roadmap-interview" },
  openGraph: {
    title: "Product Roadmap Interview Questions 2026 — PM Streak",
    description: "Build, defend, and communicate roadmaps — PM interview questions with frameworks and model answers.",
    url: `${SITE_URL}/product-roadmap-interview`,
    images: [{ url: `${SITE_URL}/api/og?title=Product+Roadmap+Interview+Questions+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Roadmap Interview Questions 2026 — PM Streak",
    description: "Build, defend, and communicate roadmaps — PM interview questions with frameworks and model answers.",
    images: [`${SITE_URL}/api/og?title=Product+Roadmap+Interview+Questions+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const QUESTION_SETS = [
  {
    theme: "Building the Roadmap",
    icon: "🗺️",
    questions: [
      {
        q: "Walk me through how you'd build a 6-month roadmap from scratch for a new product.",
        model: "Start with the outcome goal (north star), identify the biggest blockers to that outcome via user research and data, size each opportunity, sequence for dependencies and quick wins, and build in buffer. A good roadmap tells a story — each item connects to the outcome.",
      },
      {
        q: "How do you balance long-term vision work vs short-term business asks on a roadmap?",
        model: "I use a rough 70/20/10 split: 70% on core outcome, 20% on emerging opportunities, 10% on bets. I make this explicit to leadership so it's a choice they've agreed to, not a surprise.",
      },
      {
        q: "What's the difference between an outcome roadmap and a feature roadmap? Which do you prefer?",
        model: "Feature roadmaps list what you'll build. Outcome roadmaps list what you're trying to achieve — and give teams flexibility on how. Outcome roadmaps are better because they don't lock in solutions before you've validated them.",
      },
    ],
  },
  {
    theme: "Prioritising the Roadmap",
    icon: "🎯",
    questions: [
      {
        q: "You have 20 items in the backlog and capacity for 5. Walk me through how you'd decide.",
        model: "I'd score on RICE (Reach, Impact, Confidence, Effort). Then I'd sense-check the top 5 against strategic bets and what we've heard from users recently. Numbers inform the decision — they don't make it.",
      },
      {
        q: "How do you handle a situation where sales, support, and engineering all want different things on the roadmap?",
        model: "I run a prioritisation session where each stakeholder maps their asks to user outcomes and business metrics. Items that can't connect to an outcome get parked. Items that overlap — different solutions to the same underlying problem — get merged.",
      },
      {
        q: "A major enterprise customer is threatening to churn if we don't build their specific request. Does it go on the roadmap?",
        model: "Only if it solves a problem many customers have — or if the ARR impact justifies sole-tenant work. I'd first check whether existing features could solve it with config changes. If we do build it, I'd negotiate it as a generalised feature that helps 10+ customers, not a bespoke integration.",
      },
    ],
  },
  {
    theme: "Defending & Communicating the Roadmap",
    icon: "📣",
    questions: [
      {
        q: "How do you communicate a roadmap change to stakeholders who were counting on something you just cut?",
        model: "Early and honest. Explain the why (new data, strategic shift, capacity constraint) — not just the what. Offer a clear revisit timeline. Never let them find out in a sprint planning meeting.",
      },
      {
        q: "Your CEO wants to add a feature that isn't on your roadmap. How do you respond?",
        model: "I ask for context first — what user problem is this solving? If it's valid, I assess the opportunity cost of inserting it. I never say 'yes' without understanding what it displaces. I might say 'I can fit it in Q3 if we defer X — does that work?'",
      },
      {
        q: "How do you present a roadmap to the board vs. to your engineering team?",
        model: "Board: outcomes, metrics, and how this moves the business (no feature names if possible). Engineering team: sequenced work with clarity on what's validated, what's not, and why the order makes sense. Different audiences need different levels of certainty and detail.",
      },
    ],
  },
  {
    theme: "Roadmap Trade-offs",
    icon: "⚖️",
    questions: [
      {
        q: "How do you decide how much of the roadmap to commit to vs. keep flexible?",
        model: "Near-term (next 4-6 weeks): high commitment, well-scoped. Mid-term (next quarter): directional, can shift as we learn. Long-term (6+ months): strategic bets only. I never promise features more than a quarter out — I promise outcomes and direction.",
      },
      {
        q: "When do you put technical debt or infrastructure work on the customer-facing roadmap?",
        model: "When it enables or de-risks something customers care about — like reliability, speed, or a new feature. I translate it: not 'database migration' but 'reliability improvements that will reduce downtime from 2 hours/month to near-zero.' Business people fund outcomes, not tech tasks.",
      },
    ],
  },
];

const FAQS = [
  {
    q: "Do PM interviews always include a roadmap question?",
    a: "Almost always at senior PM level and above. For mid-level roles, it often appears as part of a case study or strategy question rather than standalone. Expect some form of 'how do you decide what to build?' in virtually every PM interview — be ready with a structured, specific answer from your experience.",
  },
  {
    q: "Should I bring a roadmap sample to a PM interview?",
    a: "Yes — if you have one that isn't confidential. A real or anonymised roadmap you can walk through shows PM maturity instantly. Even a simplified version with the 'why' behind each decision is more persuasive than a verbal description alone.",
  },
];

export default function ProductRoadmapInterviewPage() {
  const dates = pageDates("/product-roadmap-interview");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Product Roadmap Interview", url: `${SITE_URL}/product-roadmap-interview` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Product Roadmap Interview Questions (2026)",
        description:
          "Master product roadmap interview questions. How to build, prioritise, defend, and communicate roadmaps — with real questions, frameworks, and what interviewers want to hear.",
        image: `${SITE_URL}/api/og?title=Product+Roadmap+Interview+Questions+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/product-roadmap-interview`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🗺️</span> Build it. Defend it. Communicate it.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Product Roadmap Interview<br />Questions (2026)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Roadmap questions appear in virtually every PM interview — almost always standalone at senior level,
            folded into case studies for mid-level roles. Interviewers probe four areas: how you build a roadmap from
            scratch, how you prioritise (frameworks like RICE), how you defend and communicate changes to stakeholders,
            and how you handle trade-offs like commitment versus flexibility. This guide covers 20+ questions with
            model answers.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Everything interviewers want to know about how you build, prioritise, and defend a roadmap —
            with 20+ questions and model answers for each.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice Roadmap Questions Daily — Free →
          </Link>
        </section>

        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="space-y-8">
            {QUESTION_SETS.map(set => (
              <div key={set.theme} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-2xl">{set.icon}</span>
                  <h2 className="text-lg font-semibold text-white">{set.theme}</h2>
                </div>
                <div className="space-y-5">
                  {set.questions.map((item, i) => (
                    <div key={i} className="border border-white/5 rounded-xl p-4">
                      <p className="font-medium text-white mb-3">&ldquo;{item.q}&rdquo;</p>
                      <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-lg p-3">
                        <p className="text-xs text-[#89e219] mb-1">✅ Model answer direction</p>
                        <p className="text-sm text-white/70">{item.model}</p>
                      </div>
                    </div>
                  ))}
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

        <RelatedPages slug="product-roadmap-interview" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Never Be Caught Off-Guard on Roadmap Questions</h2>
          <p className="text-white/60 mb-6">Daily scenarios that sharpen your prioritisation and communication instincts.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
