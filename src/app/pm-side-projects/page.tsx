import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Side Projects Guide (2026) — Build Something That Gets You Hired",
  description:
    "Side projects that actually help PM careers. What to build, how to document PM thinking behind them, no-code options, and real examples of side projects that landed PM offers.",
  keywords: [
    "PM side projects", "product manager side project ideas",
    "PM portfolio projects", "side project for PM role",
    "no-code PM projects", "PM project ideas 2026",
  ],
  alternates: { canonical: "/pm-side-projects" },
  openGraph: {
    title: "PM Side Projects Guide 2026 — PM Streak",
    description: "Side projects that help PM careers — what to build, how to document, and real examples.",
    url: `${SITE_URL}/pm-side-projects`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Side+Projects+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Side Projects Guide 2026 — PM Streak",
    description: "Side projects that help PM careers — what to build, how to document, and real examples.",
    images: [`${SITE_URL}/api/og?title=PM+Side+Projects+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const WHY_THEY_WORK = [
  { reason: "Shipped evidence of PM judgment", why: "Anyone can claim they think like a PM. A side project shows you actually made user, scope, and prioritisation decisions." },
  { reason: "Interview-proof stories", why: "'Tell me about a time you shipped something' is hard to answer without a PM title. A side project gives you a fresh, owned story." },
  { reason: "Domain depth", why: "Side projects in a domain you care about (fintech, AI, learning) accelerate your domain expertise faster than reading about it." },
  { reason: "Network expansion", why: "Shipping something public attracts other operators, gets you invited to chat, and builds signal that compounds over months." },
];

const IDEAS = [
  {
    idea: "Chrome Extension",
    whyPm: "Clear user problem, small scope, fast feedback loop. Great for showing how you define user needs and measure success.",
    examples: "A tab manager, a reading tracker, a meeting prep assistant. Use Chrome Web Store reviews as user research.",
    effort: "20–40 hours",
  },
  {
    idea: "Notion Template / System",
    whyPm: "Forces you to design for a workflow, not just a UI. Good for demonstrating systems thinking without needing to code.",
    examples: "PM career tracker, interview prep system, product roadmap template. Sell on Gumroad or give away free.",
    effort: "10–20 hours",
  },
  {
    idea: "Bot (Telegram, WhatsApp, Slack)",
    whyPm: "Highly usable platform, low friction to build, immediate feedback from real users. Great for showing iteration thinking.",
    examples: "A Hindi news bot, a PM interview practice bot, a habit tracker bot. Start with 10 friends and iterate.",
    effort: "15–30 hours",
  },
  {
    idea: "No-Code Web App",
    whyPm: "Bubble, Softr, Glide let you ship real products without coding. Proves you can scope and ship, which is the core PM skill.",
    examples: "A niche job board, a community platform for a specific persona, a directory or comparison tool.",
    effort: "30–60 hours",
  },
  {
    idea: "Newsletter / Substack",
    whyPm: "Writing publicly forces you to develop a point of view. PMs who write well often outshine PMs who just ship.",
    examples: "A weekly PM teardown, a deep-dive on a specific industry, commentary on Indian tech. Publish weekly for 3 months minimum.",
    effort: "4 hours/week, 3+ months",
  },
  {
    idea: "AI / LLM Product",
    whyPm: "AI is hot and you don&apos;t need to train models — you just need the OpenAI/Anthropic API and a real user problem. Hugely credible for AI PM roles.",
    examples: "A niche AI tool (AI code reviewer for a specific language, AI study buddy, AI-enhanced journaling app).",
    effort: "25–50 hours",
  },
];

const DOCUMENT_PM_THINKING = [
  "Problem you identified and how you found it",
  "Target user — who specifically, with one or two real user interviews if possible",
  "Why you picked THIS solution over alternatives you considered",
  "Success metric you defined (and what you&apos;d learn if it doesn&apos;t move)",
  "Post-launch learnings — what users actually did vs what you expected",
  "What you&apos;d do differently or build next",
];

const FAQS = [
  {
    q: "Do I really need to code to build a side project as a PM?",
    a: "No — no-code tools (Bubble, Softr, Glide, Zapier, Retool) can ship real products. What matters for PM credibility isn&apos;t the tech — it&apos;s evidence that you scoped, shipped, measured, and iterated. A Notion-based product with 200 active users shows more PM skill than a beautifully coded app with zero users.",
  },
  {
    q: "How do I pick what to build for a side project?",
    a: "Pick a problem you personally have or genuinely understand. Building for a persona you can&apos;t talk to or empathise with rarely works. The best PM side projects solve a problem you have, for people like you, with a tight scope you can ship in under 50 hours. Scope creep is the #1 reason side projects die before shipping.",
  },
  {
    q: "How should I talk about my side project in a PM interview?",
    a: "Treat it like you would a real product. Walk through: the user problem you identified, the decisions you made, the metric that mattered, what you learned, and what you&apos;d do next. Interviewers don&apos;t care about user count — 20 real users is enough. They care about whether you made thoughtful decisions, measured results honestly, and learned from what happened.",
  },
];

export default function PmSideProjectsPage() {
  const dates = pageDates("/pm-side-projects");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Side Projects", url: `${SITE_URL}/pm-side-projects` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Side Projects Guide (2026 Edition)",
        description:
          "Side projects that actually help PM careers. What to build, how to document PM thinking behind them, no-code options, and real examples of side projects that landed PM offers.",
        image: `${SITE_URL}/api/og?title=PM+Side+Projects+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-side-projects`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🛠️</span> Shipped beats perfect. Documented beats shipped.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Side Projects Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            The right PM side project isn&apos;t about the tech — a Chrome extension, Notion template, bot, no-code app, newsletter, or small AI tool all work equally well, since what actually helps a PM career is shipped evidence of judgment: a problem you identified, the user you built for, the metric you defined, and what you learned after launch, documented in a page interviewers can read.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 side project ideas that demonstrate PM judgment, why they work,
            and how to document your PM thinking so interviewers actually see it.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Intuition in Parallel — Free →
          </Link>
        </section>

        {/* Why they work */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">Why Side Projects Move the Needle</h2>
          <div className="space-y-3">
            {WHY_THEY_WORK.map((w, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-white mb-1">{i + 1}. {w.reason}</p>
                <p className="text-xs text-white/60">{w.why}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ideas */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Side Project Ideas</h2>
            <div className="space-y-4">
              {IDEAS.map((idea, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <p className="font-bold text-white">{idea.idea}</p>
                    <span className="text-xs bg-green-500/10 border border-green-500/20 rounded-full px-2 py-1 text-green-400">{idea.effort}</span>
                  </div>
                  <p className="text-sm text-white/60 mb-2">{idea.whyPm}</p>
                  <p className="text-xs text-[#89e219]">💡 Examples: <span className="text-white/70">{idea.examples}</span></p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Document thinking */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-3">6 Things to Document About Your Side Project</h2>
          <p className="text-white/60 text-center mb-8">Writeups beat repos. Include these in a 1-page doc.</p>
          <div className="space-y-2">
            {DOCUMENT_PM_THINKING.map((d, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{d}</p>
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

        <RelatedPages slug="pm-side-projects" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Skills While You Build Your Project</h2>
          <p className="text-white/60 mb-6">Daily 2-minute PM scenarios — keep your product thinking sharp while you ship.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
