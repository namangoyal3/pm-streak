import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "AI Product Manager Guide (2026) — How to Become an AI PM",
  description:
    "The complete guide to becoming an AI product manager. What AI PMs do, the skills you need, interview questions, salary ranges, and how to break into AI product management in 2026.",
  keywords: [
    "AI product manager", "how to become AI PM",
    "AI product manager interview questions", "AI PM skills",
    "LLM product manager", "AI PM salary india",
    "machine learning product manager 2026",
  ],
  alternates: { canonical: "/ai-product-manager" },
  openGraph: {
    title: "AI Product Manager Guide 2026 — PM Streak",
    description: "How to become an AI PM — skills, interview questions, salary, and breaking in.",
    url: `${SITE_URL}/ai-product-manager`,
    images: [{ url: `${SITE_URL}/api/og?title=AI+Product+Manager+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Product Manager Guide 2026 — PM Streak",
    description: "How to become an AI PM — skills, interview questions, salary, and breaking in.",
    images: [`${SITE_URL}/api/og?title=AI+Product+Manager+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const AI_PM_DIFFERENCES = [
  { what: "Success criteria", normal: "Feature shipped, metric moved", ai: "Model quality (precision, recall, hallucination rate) AND user outcome" },
  { what: "Roadmap inputs", normal: "User research + data", ai: "User research + data + what models can actually do today" },
  { what: "Key partners", normal: "Engineering, design", ai: "Engineering, design, ML research, data engineering" },
  { what: "Main risk", normal: "Building the wrong thing", ai: "Model fails silently, hallucinates, or degrades over time" },
  { what: "Launch decision", normal: "QA + feature flag rollout", ai: "Eval metrics + red-teaming + staged rollout + ongoing monitoring" },
  { what: "Time allocation", normal: "30% discovery, 70% delivery", ai: "40% discovery, 30% evals & quality, 30% delivery" },
];

const SKILLS = [
  { skill: "LLM fundamentals", what: "Prompts, context windows, temperature, embeddings, RAG, fine-tuning — understand the tradeoffs", howToLearn: "Build a side project with the OpenAI/Anthropic API. Read Anthropic's prompt engineering guide." },
  { skill: "Evaluation methods", what: "How to measure model quality — golden datasets, LLM-as-judge, human eval, A/B tests with LLMs", howToLearn: "Set up evals for your side project. Read about Anthropic's evals framework." },
  { skill: "ML product intuition", what: "When to use rules vs ML, classifier vs generative, precision vs recall tradeoffs, cost per inference", howToLearn: "Read 'Designing Machine Learning Systems' by Chip Huyen. Follow AI PM Substack writers." },
  { skill: "Data literacy", what: "What data you have, what data you need, how labels are created, data quality issues", howToLearn: "Shadow a data engineer for a day. Learn how a feature store works at a conceptual level." },
  { skill: "Responsible AI", what: "Bias, hallucinations, privacy, consent, model guardrails, red-teaming", howToLearn: "Read Anthropic's Responsible Scaling Policy. Follow AI safety researchers on social media." },
  { skill: "Technical communication", what: "Explain model limitations to non-technical stakeholders and user needs to ML researchers", howToLearn: "Practice writing product specs that include both user stories AND model quality criteria." },
];

const INTERVIEW_QUESTIONS = [
  "How would you evaluate whether an LLM-based summarisation feature is working well for users?",
  "Your ML model's precision is 95% but it's generating user complaints. Walk through your diagnosis.",
  "Design a product that uses generative AI for [use case]. How do you handle hallucinations?",
  "Your team wants to ship a chatbot. What are the top 3 risks you'd raise before launch?",
  "How do you balance user trust vs model capability when shipping an AI feature?",
  "When should you use a rule-based system vs ML vs an LLM? Walk me through your decision framework.",
];

const SALARY = [
  { role: "APM / AI PM (0–2y)", india: "₹25–45L", us: "$140K–$180K" },
  { role: "AI Product Manager (2–5y)", india: "₹45–80L", us: "$180K–$250K" },
  { role: "Senior AI PM (5–8y)", india: "₹80L–1.4Cr", us: "$250K–$400K" },
  { role: "Principal / Staff AI PM (8y+)", india: "₹1.2–2.5Cr", us: "$400K–$700K+" },
];

const FAQS = [
  {
    q: "Do I need a machine learning background to be an AI PM?",
    a: "No — but you need deep conceptual understanding. You don't need to train models or write ML code, but you must understand tradeoffs (precision vs recall, latency vs quality, cost per inference), evaluation methods (how we know if a model is good), and model limitations (hallucinations, bias, drift). Non-ML PMs can absolutely become strong AI PMs with 3–6 months of focused learning + hands-on API experimentation.",
  },
  {
    q: "What companies in India hire AI PMs?",
    a: "Top hirers in 2026: Google (Gemini), Microsoft (Copilot for India), Razorpay (fraud detection, credit scoring), Flipkart (recommendation, search), Zomato (dish recognition, personalisation), Sarvam AI, Krutrim (Ola), Lightspeed-backed AI startups, and most fintech companies building fraud/credit ML. Consumer AI startups hiring aggressively: Bhashini, Ema, CoRover, and many stealth AI companies.",
  },
  {
    q: "How is AI PM interview different from a normal PM interview?",
    a: "In addition to standard PM rounds, AI PM interviews typically include: (1) a deeper technical round focused on ML/LLM concepts, (2) a product design question specifically about an AI use case, (3) a metrics round about how to evaluate AI features. Behavioural and strategy rounds are similar to normal PM interviews. Candidates who can articulate model evaluation strategies beat candidates with deeper strategy answers but weaker AI fluency.",
  },
];

export default function AiProductManagerPage() {
  const dates = pageDates("/ai-product-manager");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "AI Product Manager", url: `${SITE_URL}/ai-product-manager` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "AI Product Manager Guide (2026 Edition)",
        description:
          "The complete guide to becoming an AI product manager. What AI PMs do, the skills you need, interview questions, salary ranges, and how to break into AI product management in 2026.",
        image: `${SITE_URL}/api/og?title=AI+Product+Manager+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/ai-product-manager`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🤖</span> The highest-growth PM specialisation of the decade
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            AI Product Manager Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            An AI product manager does everything a normal PM does, then adds model quality
            metrics like precision and hallucination rate to the success criteria, brings ML
            research and data engineering into the core partner set, and shifts time toward 40%
            discovery and 30% evals versus a traditional PM&apos;s 30/70 split — because the main
            risk moves from building the wrong thing to a model failing silently or degrading
            over time.
          </p>
          <p className="text-sm text-white/50 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            What AI PMs actually do, the skills you need, interview questions,
            salary ranges, and how to break into AI product management without an ML degree.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Start AI PM Prep — Free →
          </Link>
        </section>

        {/* Differences */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-3">How AI PM Is Different from Normal PM</h2>
          <p className="text-white/60 text-center mb-8">Most PM fundamentals still apply. These are the dimensions that shift.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-white/40 font-medium">Dimension</th>
                  <th className="text-left py-3 px-4 text-white/40 font-medium">Normal PM</th>
                  <th className="text-left py-3 px-4 text-[#89e219] font-medium">AI PM</th>
                </tr>
              </thead>
              <tbody>
                {AI_PM_DIFFERENCES.map((row, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-2.5 px-4 text-white/50 text-xs">{row.what}</td>
                    <td className="py-2.5 px-4 text-white/60 text-xs">{row.normal}</td>
                    <td className="py-2.5 px-4 text-white/70 text-xs">{row.ai}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Skills */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Skills Every AI PM Needs</h2>
            <div className="space-y-4">
              {SKILLS.map((s, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-full bg-[#58cc02]/20 text-[#89e219] text-xs font-bold flex items-center justify-center">{i + 1}</span>
                    <h3 className="font-semibold text-white">{s.skill}</h3>
                  </div>
                  <p className="text-sm text-white/70 mb-2">{s.what}</p>
                  <p className="text-xs text-[#89e219]">📚 How to learn: <span className="text-white/60">{s.howToLearn}</span></p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interview questions */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">AI PM Interview Questions</h2>
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
            <ul className="space-y-3">
              {INTERVIEW_QUESTIONS.map((q, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="text-[#89e219] flex-shrink-0 font-bold">{i + 1}.</span>
                  <span className="text-white/70">{q}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Salary */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">AI PM Salary Ranges (2026)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-white/40 font-medium">Level</th>
                    <th className="text-left py-3 px-4 text-white/40 font-medium">India</th>
                    <th className="text-left py-3 px-4 text-white/40 font-medium">US</th>
                  </tr>
                </thead>
                <tbody>
                  {SALARY.map((r, i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="py-3 px-4 font-medium text-white text-sm">{r.role}</td>
                      <td className="py-3 px-4 text-green-400 text-sm">{r.india}</td>
                      <td className="py-3 px-4 text-green-400 text-sm">{r.us}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

        <RelatedPages slug="ai-product-manager" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build AI PM Fluency in 2 Minutes a Day</h2>
          <p className="text-white/60 mb-6">Daily scenarios on LLM products, ML evaluation, and AI product decisions.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
