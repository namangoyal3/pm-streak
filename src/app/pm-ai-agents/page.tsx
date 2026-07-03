import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM AI Agents (2026) — Building Agentic Products",
  description:
    "How PMs build AI agents that actually work. Tool use, planning, guardrails, evals, and why most agent products ship broken.",
  keywords: [
    "PM AI agents", "agentic products",
    "AI agent PM", "agent product design 2026",
  ],
  alternates: { canonical: "/pm-ai-agents" },
  openGraph: {
    title: "PM AI Agents 2026 — PM Streak",
    description: "How PMs build AI agents — tools, planning, guardrails, evals.",
    url: `${SITE_URL}/pm-ai-agents`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+AI+Agents+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM AI Agents 2026 — PM Streak",
    description: "How PMs build AI agents — tools, planning, guardrails, evals.",
    images: [`${SITE_URL}/api/og?title=PM+AI+Agents+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DIMENSIONS = [
  "Autonomy — how much decision-making does the agent own vs defer to the user?",
  "Tool surface — which actions can it take? More tools = more capability and more risk",
  "Context window — what history does it carry? Memory architecture is load-bearing",
  "Guardrails — what must it never do? Hard stops matter more than soft ones",
  "Observability — can you trace every decision? Without this, debugging is impossible",
];

const EVAL_BASICS = [
  "Task completion rate — did it actually finish the job?",
  "Trajectory quality — did it take reasonable steps, or thrash?",
  "Human intervention rate — how often does a user have to correct it?",
  "Cost per task — tokens and tool calls aren&apos;t free",
  "Latency — agents that take 2 minutes feel broken to users",
];

const TRAPS = [
  "Shipping without evals — &apos;looks good on demos&apos; is not a quality signal",
  "Letting the agent loop indefinitely — hard step limits prevent runaway costs",
  "Hiding errors behind optimistic UI — users must know when agent is unsure",
  "Treating hallucination as rare — plan for it as a first-class failure mode",
];

const FAQS = [
  {
    q: "What&apos;s different about PM-ing AI agents vs regular software?",
    a: "Three things: non-determinism means the same input can produce different outputs, so specs give way to evals; failure modes are probabilistic rather than deterministic; and quality degrades silently as models change. You spend more time on evaluation infrastructure than on shipping features.",
  },
];

export default function PmAiAgentsPage() {
  const dates = pageDates("/pm-ai-agents");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM AI Agents", url: `${SITE_URL}/pm-ai-agents` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM AI Agents (2026 Edition)",
        description:
          "How PMs build AI agents that actually work. Tool use, planning, guardrails, evals, and why most agent products ship broken.",
        image: `${SITE_URL}/api/og?title=PM+AI+Agents+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-ai-agents`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🤖</span> Agents fail probabilistically. PM-ing them means PM-ing uncertainty.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM AI Agents<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Building an AI agent means designing five things at once — how much autonomy it
            holds, what tools it can call, how much context it carries, which guardrails are
            non-negotiable, and whether every decision is traceable — then measuring it on task
            completion rate, trajectory quality, and human intervention rate, because agents fail
            probabilistically and a demo that looks good tells you nothing about production
            behavior.
          </p>
          <p className="text-sm text-white/50 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 design dimensions, 5 eval basics, 4 traps for building agentic products.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Agentic PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Design Dimensions</h2>
          <div className="space-y-2">
            {DIMENSIONS.map((d, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Eval Basics</h2>
            <div className="space-y-2">
              {EVAL_BASICS.map((e, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{e}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">4 Traps</h2>
          <div className="space-y-2">
            {TRAPS.map((t, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-red-400 flex-shrink-0">❌</span>
                <p className="text-sm text-white/70">{t}</p>
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

        <RelatedPages slug="pm-ai-agents" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Agent PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
