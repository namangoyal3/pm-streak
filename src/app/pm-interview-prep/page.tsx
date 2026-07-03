import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Interview Prep — Practice Product Manager Interview Questions Daily",
  description:
    "Ace your PM interview with daily practice. PM Streak gives you real product sense, metrics, and execution questions asked at Google, Meta, Amazon, and top startups — with AI feedback.",
  keywords: [
    "PM interview prep", "product manager interview", "product sense questions",
    "PM interview questions", "product management interview", "how to prepare for PM interview",
    "PM interview practice", "product manager interview tips",
  ],
  alternates: { canonical: "/pm-interview-prep" },
  openGraph: {
    title: "PM Interview Prep — PM Streak",
    description: "Daily PM interview practice with AI feedback. Real questions from Google, Meta, Amazon.",
    url: `${SITE_URL}/pm-interview-prep`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Interview+Prep++PM+Streak`, width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Interview Prep — PM Streak",
    description: "Daily PM interview practice with AI feedback. Real questions from Google, Meta, Amazon.",
    images: [`${SITE_URL}/api/og?title=PM+Interview+Prep++PM+Streak`],
    site: "@pmstreak",
  },
};

const TOPICS = [
  {
    name: "Product Sense",
    icon: "🧠",
    description: "Design new features, improve existing products, and think from first principles.",
    example: "How would you improve Google Maps for rural users?",
  },
  {
    name: "Metrics & Analytics",
    icon: "📊",
    description: "Define success metrics, diagnose drops, and make data-driven decisions.",
    example: "DAU dropped 10% overnight — walk me through your diagnosis.",
  },
  {
    name: "Execution",
    icon: "⚡",
    description: "Prioritise features, handle trade-offs, and ship under constraints.",
    example: "You have one sprint. Which of these 5 features do you ship first?",
  },
  {
    name: "Strategy",
    icon: "♟️",
    description: "Market entry, competitive positioning, and long-term product bets.",
    example: "Should Spotify enter the podcast creation tools market?",
  },
  {
    name: "Behavioral",
    icon: "💬",
    description: "Leadership, conflict, ambiguity, and cross-functional collaboration.",
    example: "Tell me about a time you shipped something that failed.",
  },
  {
    name: "Estimation",
    icon: "🔢",
    description: "Market sizing, Fermi problems, and back-of-napkin calculations.",
    example: "How many Ubers are operating in Mumbai right now?",
  },
];

const FAQS = [
  {
    q: "How do I prepare for a PM interview in 2 weeks?",
    a: "Focus on the three highest-signal areas: product sense (50%), metrics (30%), and behavioral (20%). Practice at least one question per day with written answers. PM Streak's daily lessons compress months of case prep into 2-minute habit loops — most users feel noticeably sharper after just 5 days.",
  },
  {
    q: "What are the most common PM interview questions?",
    a: "The top recurring questions are: (1) Design a product for [underserved group], (2) A key metric dropped — how do you debug it?, (3) How would you prioritize a backlog of 20 features?, (4) Tell me about a product you'd redesign and why, (5) How would you grow [product]'s DAU by 20%?",
  },
  {
    q: "What's the difference between PM interviews at FAANG vs startups?",
    a: "FAANG interviews are more structured — expect formal product sense, metrics, and behavioral rounds with rubrics. Startups lean toward 'what would you actually build?' conversations with less structure but more depth on your thinking process and bias for action.",
  },
  {
    q: "How does PM Streak help with interview prep?",
    a: "PM Streak extracts lessons from 300+ real PM interviews and turns them into 2-minute daily exercises. You build intuition for product thinking, metrics, and execution through spaced repetition — the same technique that makes Duolingo effective for language learning.",
  },
];

export default function PmInterviewPrepPage() {
  const dates = pageDates("/pm-interview-prep");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Interview Prep", url: `${SITE_URL}/pm-interview-prep` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "PM Interview Prep — PM Streak",
        "description": "Daily product manager interview practice with AI feedback and streak tracking.",
        "provider": { "@type": "Organization", "name": "PM Streak", "url": SITE_URL },
        "courseMode": "online",
        "educationalLevel": "Professional",
        "teaches": ["Product Sense", "Metrics & Analytics", "Execution", "Strategy", "Behavioral", "Estimation"],
        "url": `${SITE_URL}/pm-interview-prep`,
      }} />
      <JsonLd data={articleSchema({
        headline: "PM Interview Prep That Actually Works",
        description: "Ace your PM interview with daily practice. PM Streak gives you real product sense, metrics, and execution questions asked at Google, Meta, Amazon, and top startups — with AI feedback.",
        image: `${SITE_URL}/api/og?title=PM+Interview+Prep++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-interview-prep`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🎯</span> Used by PMs at Google, Meta, Airbnb & 200+ companies
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Interview Prep That Actually Works
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Effective PM interview prep means daily practice across six question types —
            product sense, metrics, execution, strategy, behavioral, and estimation — rather
            than cramming the night before. If you have two weeks, weight your time toward
            product sense (50%), metrics (30%), and behavioral (20%), answering at least one
            question per day in writing with feedback on your structure.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Stop cramming the night before. PM Streak gives you 2-minute daily lessons
            extracted from 300+ real PM interviews — so product thinking becomes instinct,
            not a script.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/signup"
              className="bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all"
            >
              Start Free — No Credit Card
            </Link>
            <Link
              href="/interview-prep"
              className="bg-white/10 hover:bg-white/15 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              Try a Practice Question →
            </Link>
          </div>
          <p className="text-sm text-white/40 mt-4">7-day free trial · Cancel anytime</p>
        </section>

        {/* Topics Grid */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-3">Every Interview Topic, Covered</h2>
          <p className="text-white/60 text-center mb-8 max-w-xl mx-auto">
            PM Streak covers all six question types asked in product manager interviews at top companies.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {TOPICS.map((t) => (
              <div key={t.name} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <div className="text-2xl mb-2">{t.icon}</div>
                <h3 className="font-semibold text-white mb-1">{t.name}</h3>
                <p className="text-sm text-white/60 mb-3">{t.description}</p>
                <p className="text-xs text-white/40 italic">&quot;{t.example}&quot;</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">How PM Streak Prepares You</h2>
            <ol className="space-y-6">
              {[
                { step: "1", title: "Daily 2-minute lessons", body: "Each lesson distils a key PM concept from real interviews — frameworks, heuristics, and common pitfalls — in the time it takes to drink a coffee." },
                { step: "2", title: "Streak & XP tracking", body: "Your streak keeps you consistent. Miss a day and it breaks. It sounds simple — but it's the single biggest driver of long-term retention." },
                { step: "3", title: "AI-powered practice questions", body: "Generate unlimited practice questions by topic and level — APM to Director. Get instant AI feedback on your answer structure, signal strength, and gaps." },
                { step: "4", title: "Interview readiness score", body: "PM Streak tracks your coverage across all six interview domains and shows you a readiness score so you always know where to focus next." },
              ].map((item) => (
                <li key={item.step} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#58cc02]/20 border border-[#58cc02]/40 flex items-center justify-center text-[#89e219] font-bold text-sm flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-white/60">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {FAQS.map((faq) => (
              <div key={faq.q} className="border border-white/10 rounded-xl p-5">
                <h3 className="font-semibold text-white mb-2">{faq.q}</h3>
                <p className="text-sm text-white/60">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <RelatedPages slug="pm-interview-prep" />

        {/* CTA */}
        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to Get Interview-Ready?</h2>
          <p className="text-white/60 mb-6">Join 2,000+ PMs building their product instinct daily.</p>
          <Link
            href="/signup"
            className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors"
          >
            Start Your Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
