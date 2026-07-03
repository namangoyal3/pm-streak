import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM AI PM Interview (2026) — Cracking AI-First PM Roles",
  description:
    "How to interview for AI PM roles at OpenAI, Anthropic, Sarvam, Krutrim. The frameworks, technical fluency, and questions to expect.",
  keywords: [
    "AI PM interview", "OpenAI PM interview 2026",
  ],
  alternates: { canonical: "/pm-ai-pm-interview" },
  openGraph: {
    title: "PM AI PM Interview 2026 — PM Streak",
    description: "Cracking AI-first PM roles.",
    url: `${SITE_URL}/pm-ai-pm-interview`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+AI+PM+Interview+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM AI PM Interview 2026 — PM Streak",
    description: "Cracking AI-first PM roles.",
    images: [`${SITE_URL}/api/og?title=PM+AI+PM+Interview+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const TOPICS = [
  "Eval design — how would you measure quality of a chatbot?",
  "Latency vs quality tradeoffs",
  "Prompt design and constraints",
  "Tool use and agent failure modes",
  "Pricing and unit economics for AI",
];

const PREP = [
  "Build something with LLMs — even a weekend project",
  "Read OpenAI, Anthropic safety blogs",
  "Study Lenny&apos;s Newsletter AI PM episodes",
  "Practice eval-set design out loud",
  "Be honest about model limitations in interviews",
];

const FAQS = [
  {
    q: "What separates AI PM interviews from regular PM interviews?",
    a: "Three things: technical fluency on model behavior, comfort discussing eval and quality measurement, and judgment under uncertainty. AI PMs face fewer deterministic answers than regular PMs. Interviewers test how candidates reason about probabilistic systems and unpredictable user behavior.",
  },
];

export default function PmAiPmInterviewPage() {
  const dates = pageDates("/pm-ai-pm-interview");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM AI PM Interview", url: `${SITE_URL}/pm-ai-pm-interview` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM AI PM Interview (2026 Edition)",
        description:
          "How to interview for AI PM roles at OpenAI, Anthropic, Sarvam, Krutrim. The frameworks, technical fluency, and questions to expect.",
        image: `${SITE_URL}/api/og?title=PM+AI+PM+Interview+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-ai-pm-interview`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🎤</span> AI PM interviews test reasoning under uncertainty
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM AI PM Interview<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Interviewing for AI-first PM roles means being ready to discuss eval design for measuring chatbot quality, latency-versus-quality tradeoffs, prompt design constraints, agent tool-use failure modes, and AI pricing and unit economics — candidates prep by shipping a weekend LLM project, reading OpenAI and Anthropic safety blogs, practicing eval-set design aloud, and staying honest about model limitations rather than overselling capability.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 interview topics and 5 prep moves for AI PM roles.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build AI PM Interview Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Topics</h2>
          <div className="space-y-2">
            {TOPICS.map((t, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{t}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Prep Moves</h2>
            <div className="space-y-2">
              {PREP.map((p, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{p}</p>
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

        <RelatedPages slug="pm-ai-pm-interview" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice AI PM Interview Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
