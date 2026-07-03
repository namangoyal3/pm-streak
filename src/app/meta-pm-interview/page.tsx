import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "Meta PM Interview Guide (2026) — Facebook, Instagram & WhatsApp Questions",
  description:
    "Crack the Meta PM interview. Product design, strategy, metrics, and execution rounds — with real questions for Facebook, Instagram, WhatsApp, and Threads, plus a prep plan.",
  keywords: [
    "Meta PM interview", "Facebook product manager interview questions",
    "Meta PM interview prep", "Instagram PM interview", "WhatsApp PM interview",
    "how to crack Meta PM interview", "Meta product manager interview 2026",
  ],
  alternates: { canonical: "/meta-pm-interview" },
  openGraph: {
    title: "Meta PM Interview Guide 2026 — PM Streak",
    description: "Product design, metrics, and strategy rounds for Meta PM interviews with real questions.",
    url: `${SITE_URL}/meta-pm-interview`,
    images: [{ url: `${SITE_URL}/api/og?title=Meta+PM+Interview+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meta PM Interview Guide 2026 — PM Streak",
    description: "Product design, metrics, and strategy rounds for Meta PM interviews with real questions.",
    images: [`${SITE_URL}/api/og?title=Meta+PM+Interview+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const ROUNDS = [
  {
    name: "Product Design",
    what: "Design a new product or feature for Meta's ecosystem. Meta tests user empathy at social scale — billions of users across demographics and geographies.",
    sample: [
      "How would you improve Facebook for users over 50?",
      "Design a feature that helps Instagram creators monetise without compromising their authenticity.",
      "How would you improve WhatsApp for small business owners in India?",
      "Design a product that helps reduce misinformation on Facebook without hurting engagement.",
    ],
    tip: "Meta deals with social externalities (misinformation, mental health, privacy) that other tech companies don't. Design answers that acknowledge second-order effects score higher. Don't just optimise for engagement — ask what 'good engagement' means.",
  },
  {
    name: "Product Strategy",
    what: "Should Meta enter a market, acquire a company, or respond to a competitor? Meta is competing on multiple fronts simultaneously — social, messaging, VR, AI.",
    sample: [
      "TikTok is dominating short-form video. How should Meta respond?",
      "Should Meta build a separate product for political discourse or remove it from Facebook entirely?",
      "How would you think about Meta's 5-year strategy in India?",
    ],
    tip: "Meta's moat is its social graph and cross-product data. Strategy answers should leverage this — not propose building standalone products from scratch when Meta can leverage existing identity and connections.",
  },
  {
    name: "Metrics & Execution",
    what: "Define success, diagnose metric issues, and think about experimentation at scale. Meta runs thousands of A/B tests simultaneously.",
    sample: [
      "Instagram Stories views drop 12% week-over-week. Walk through your diagnosis.",
      "Define north star metrics for WhatsApp Business vs personal WhatsApp.",
      "How would you measure whether a new Facebook feed algorithm change is net positive for users?",
    ],
    tip: "Meta's metrics are famously complex — engagement can mean many different things (passive scroll vs active interaction). Always clarify what type of engagement before answering metric questions.",
  },
  {
    name: "Leadership & Behavioural",
    what: "Meta values move fast, data-driven decisions, and accountability. Stories should demonstrate: shipping with urgency, using data to settle debates, and owning outcomes.",
    sample: [
      "Tell me about a time you shipped something that had unintended negative consequences. What did you learn?",
      "Describe a decision you made purely based on data that went against your intuition.",
      "Tell me about a time you had to influence a team much larger than your own.",
    ],
    tip: "'Move fast' is still real at Meta but now paired with responsibility — post-2020, Meta interviewers are specifically looking for candidates who balance speed with thoughtfulness about social impact.",
  },
];

const META_PRODUCTS = [
  { app: "Facebook", scale: "3B+ MAU", pm_focus: "Feed, groups, marketplace, creator tools, middle-age/older users" },
  { app: "Instagram", scale: "2B+ MAU", pm_focus: "Reels, creator monetisation, shopping, Stories, younger demographics" },
  { app: "WhatsApp", scale: "2.5B+ MAU", pm_focus: "Business messaging, payments (India), group features, privacy" },
  { app: "Threads", scale: "200M+ MAU", pm_focus: "Text-based social, creator growth, Twitter alternative positioning" },
  { app: "Messenger", scale: "1B+ MAU", pm_focus: "Chat, business messaging, AR features" },
];

const FAQS = [
  {
    q: "How many rounds does a Meta PM interview have?",
    a: "Typically 4–6 rounds: 1–2 product design, 1 product strategy, 1 metrics/execution, 1–2 behavioural. There may also be a recruiter screen and sometimes a written case. Total timeline from application to offer: 6–10 weeks. Meta is known for fast turnarounds once the process starts.",
  },
  {
    q: "Does Meta hire PMs in India?",
    a: "Meta has a significant presence in India — primarily for WhatsApp (headquartered in Menlo Park but with heavy India product focus), Instagram India, and emerging market initiatives. India roles often involve the India-specific features that are tested and scaled globally (UPI payments on WhatsApp, regional language support, low-bandwidth optimisation).",
  },
  {
    q: "What makes Meta PM interviews uniquely challenging?",
    a: "Scale and social complexity. Meta's products have billions of users across wildly different demographics and geographies. Product decisions that seem obviously good (increase engagement) can have harmful downstream effects (misinformation spread, mental health impact). Candidates who ignore these second-order effects in design answers score lower than those who acknowledge and navigate them thoughtfully.",
  },
];

export default function MetaPmInterviewPage() {
  const dates = pageDates("/meta-pm-interview");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Meta PM Interview", url: `${SITE_URL}/meta-pm-interview` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Meta PM Interview Guide (2026 Edition)",
        description:
          "Crack the Meta PM interview. Product design, strategy, metrics, and execution rounds — with real questions for Facebook, Instagram, WhatsApp, and Threads, plus a prep plan.",
        image: `${SITE_URL}/api/og?title=Meta+PM+Interview+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/meta-pm-interview`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔵</span> 3 billion users · Social complexity · Second-order thinking required
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Meta PM Interview Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            The Meta PM interview typically runs 4–6 rounds — one to two product design, one product
            strategy, one metrics and execution, and one to two behavioural — plus a recruiter screen
            and sometimes a written case. Expect 6–10 weeks from application to offer, and a bar that
            rewards second-order thinking about engagement, misinformation, and social impact at
            billion-user scale.
          </p>
          <p className="text-sm text-white/50 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Product design, strategy, and metrics rounds for Facebook, Instagram, WhatsApp, and Threads —
            with real questions and what Meta PMs say the bar actually looks like.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Start Meta PM Prep — Free →
          </Link>
        </section>

        {/* Product overview */}
        <section className="max-w-4xl mx-auto px-4 pb-10">
          <h2 className="text-xl font-bold mb-4">Meta&apos;s Product Portfolio — Know All Five</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {META_PRODUCTS.map((p, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-white">{p.app}</p>
                  <span className="text-xs text-white/40">{p.scale}</span>
                </div>
                <p className="text-xs text-white/60">{p.pm_focus}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Rounds */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">The Meta PM Interview Rounds</h2>
          <div className="space-y-6">
            {ROUNDS.map((round, i) => (
              <div key={round.name} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-7 h-7 rounded-full bg-[#58cc02]/20 text-[#89e219] font-bold text-sm flex items-center justify-center">{i + 1}</span>
                  <h3 className="text-lg font-bold text-white">{round.name}</h3>
                </div>
                <p className="text-sm text-white/60 mb-4">{round.what}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Sample Questions</p>
                    <ul className="space-y-1.5">
                      {round.sample.map((q, j) => (
                        <li key={j} className="flex gap-2 text-sm">
                          <span className="text-white/30">•</span>
                          <span className="text-white/70">{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-xl p-3">
                    <p className="text-xs text-[#89e219] mb-1">💡 Prep tip</p>
                    <p className="text-sm text-white/60">{round.tip}</p>
                  </div>
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

        <RelatedPages slug="meta-pm-interview" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Meta-Style Product Questions Daily</h2>
          <p className="text-white/60 mb-6">Social product design, engagement metrics, and second-order thinking — calibrated to Meta&apos;s bar.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
