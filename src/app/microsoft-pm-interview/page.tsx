import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "Microsoft PM Interview Guide (2026) — Questions, Rounds & Prep",
  description:
    "Crack the Microsoft PM interview. All rounds including design, strategy, and behavioural, real questions, what Microsoft PMs say the bar is, and a complete prep plan.",
  keywords: [
    "Microsoft PM interview", "Microsoft product manager interview questions",
    "Microsoft PM interview prep", "Microsoft APM interview",
    "how to crack Microsoft PM interview", "Microsoft product manager interview 2026 India",
  ],
  alternates: { canonical: "/microsoft-pm-interview" },
  openGraph: {
    title: "Microsoft PM Interview Guide 2026 — PM Streak",
    description: "All Microsoft PM interview rounds, real questions, and a structured prep plan.",
    url: `${SITE_URL}/microsoft-pm-interview`,
    images: [{ url: `${SITE_URL}/api/og?title=Microsoft+PM+Interview+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Microsoft PM Interview Guide 2026 — PM Streak",
    description: "All Microsoft PM interview rounds, real questions, and a structured prep plan.",
    images: [`${SITE_URL}/api/og?title=Microsoft+PM+Interview+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const ROUNDS = [
  {
    name: "Product Design",
    what: "Design a new product or improve an existing Microsoft product. Emphasis on clarity of thought, user empathy, and structured reasoning.",
    sample: [
      "Design a product to help remote teams build stronger relationships.",
      "How would you improve Microsoft Teams for frontline workers (factory floor, nurses)?",
      "Design an accessibility feature for Microsoft Office that would help 10M+ users.",
    ],
    tip: "Microsoft heavily values accessibility, enterprise user empathy, and global scale. For every design question, consider users who aren't like you — elderly, non-English speakers, users with disabilities, employees in large orgs.",
  },
  {
    name: "Strategy & Market Entry",
    what: "Should Microsoft enter a market, expand a product, or respond to a competitive threat? Tests long-horizon business thinking.",
    sample: [
      "Should Microsoft build a consumer social network? Why or why not?",
      "How should Microsoft compete with Notion in the productivity space?",
      "What is the most important product bet Microsoft should make in India in the next 3 years?",
    ],
    tip: "Know Microsoft's key product pillars: Azure (cloud), Microsoft 365 (productivity), GitHub/Dev Tools, Xbox/Gaming, LinkedIn. Every strategy answer should connect to where Microsoft already has leverage.",
  },
  {
    name: "Estimation & Analytical",
    what: "Market sizing, metric definition, and analytical reasoning. Microsoft PMs are expected to be comfortable with numbers.",
    sample: [
      "How many daily active users does Microsoft Teams have in India?",
      "How would you measure the success of LinkedIn's job recommendation feature?",
      "Microsoft adds a new feature to Outlook. Define success metrics for the first 90 days.",
    ],
    tip: "Structure beats accuracy. Walk through your reasoning clearly — state assumptions, build bottom-up, and sanity-check your answer with context.",
  },
  {
    name: "Behavioural",
    what: "Microsoft's cultural values: growth mindset, customer obsession, diversity and inclusion. Stories should demonstrate learning, collaboration, and impact.",
    sample: [
      "Tell me about a time you had to learn a completely new domain quickly to solve a problem.",
      "Describe a situation where you included a perspective you wouldn't have considered on your own.",
      "Tell me about a time your product had unintended negative consequences. What did you do?",
    ],
    tip: "Growth mindset is Microsoft's core cultural value (from Satya Nadella's 'Hit Refresh'). Every behavioural story is an opportunity to show you learn from failure, seek feedback, and improve. Fixed mindset signals are red flags.",
  },
];

const MICROSOFT_PILLARS = [
  { product: "Microsoft 365 (Teams, Office, Outlook)", users: "Enterprise employees, students, educators", pmFocus: "Collaboration, productivity, integration with enterprise IT" },
  { product: "Azure", users: "Developers, enterprise IT, startups", pmFocus: "Developer experience, cloud infrastructure, B2B growth" },
  { product: "GitHub / Dev Tools", users: "Software developers worldwide", pmFocus: "Developer productivity, AI-assisted coding (Copilot), OSS community" },
  { product: "LinkedIn", users: "Professionals, recruiters, learners", pmFocus: "Job seeker experience, B2B talent solutions, Learning (LinkedIn Learning)" },
  { product: "Xbox / Gaming", users: "Gamers, Game Pass subscribers", pmFocus: "Game discovery, subscription growth, cross-platform play" },
];

const FAQS = [
  {
    q: "How is the Microsoft PM interview different from Google's?",
    a: "Microsoft places more emphasis on enterprise users and accessibility than Google. The product design bar is similar but Microsoft rewards practicality and scale over moonshot thinking. Behavioural rounds are more culturally flavoured at Microsoft — growth mindset stories resonate strongly. Both have 5+ rounds but Microsoft's analytical round is typically less intense than Google's.",
  },
  {
    q: "Does Microsoft hire PMs directly from India?",
    a: "Yes — Microsoft India has PM roles across Hyderabad (the largest campus outside Redmond) and Bengaluru. India PMs work on globally shipped products including Teams, Office, Azure, and LinkedIn. The hiring process mirrors the global Microsoft process with a recruiter screen, phone screen, and 4–5 on-site rounds.",
  },
  {
    q: "Do Microsoft PM interviews require coding?",
    a: "No coding required. Technical fluency is assessed through system design discussions and 'how would you explain X' questions — not algorithms. PMs working on developer tools (Azure, GitHub) are expected to have above-average technical depth, but this is domain knowledge, not coding ability.",
  },
];

export default function MicrosoftPmInterviewPage() {
  const dates = pageDates("/microsoft-pm-interview");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Microsoft PM Interview", url: `${SITE_URL}/microsoft-pm-interview` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Microsoft PM Interview Guide (2026 Edition)",
        description:
          "Crack the Microsoft PM interview. All rounds including design, strategy, and behavioural, real questions, what Microsoft PMs say the bar is, and a complete prep plan.",
        image: `${SITE_URL}/api/og?title=Microsoft+PM+Interview+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/microsoft-pm-interview`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🪟</span> Growth mindset · Enterprise scale · Accessibility-first
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Microsoft PM Interview Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Microsoft&apos;s PM interview starts with a recruiter screen and phone screen, then 4–5
            onsite rounds covering product design, strategy and market entry, estimation, and
            behavioural questions built around growth mindset. No coding is required — technical
            fluency is tested through system-design discussion — and accessibility plus enterprise
            user empathy carry unusual weight in design answers.
          </p>
          <p className="text-sm text-white/50 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            All Microsoft PM interview rounds, real questions across Teams, Azure, LinkedIn and more,
            and what the growth mindset culture means for your answers.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Start Microsoft PM Prep — Free →
          </Link>
        </section>

        {/* Product pillars */}
        <section className="max-w-4xl mx-auto px-4 pb-10">
          <h2 className="text-xl font-bold mb-4">Microsoft Products PMs Are Hired Into</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 px-3 text-white/40 font-medium">Product</th>
                  <th className="text-left py-2 px-3 text-white/40 font-medium">Users</th>
                  <th className="text-left py-2 px-3 text-white/40 font-medium">PM Focus</th>
                </tr>
              </thead>
              <tbody>
                {MICROSOFT_PILLARS.map((row, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-2.5 px-3 font-medium text-white text-xs">{row.product}</td>
                    <td className="py-2.5 px-3 text-white/60 text-xs">{row.users}</td>
                    <td className="py-2.5 px-3 text-white/60 text-xs">{row.pmFocus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Rounds */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">The Microsoft PM Interview Rounds</h2>
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

        <RelatedPages slug="microsoft-pm-interview" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Train for the Microsoft PM Bar Daily</h2>
          <p className="text-white/60 mb-6">Design, strategy, and growth mindset scenarios with AI feedback.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
