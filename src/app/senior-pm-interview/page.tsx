import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "Senior PM Interview Questions (2026) — Strategy, Leadership & System Design",
  description:
    "Senior PM interview questions with model answers. Strategy, stakeholder management, org design, product vision, and the systems thinking questions that separate senior PMs from mid-level.",
  keywords: [
    "senior PM interview questions", "senior product manager interview",
    "senior PM interview prep", "product director interview", "group PM interview",
    "senior PM strategy questions", "PM leadership interview questions 2026",
  ],
  alternates: { canonical: "/senior-pm-interview" },
  openGraph: {
    title: "Senior PM Interview Questions 2026 — PM Streak",
    description: "Strategy, leadership, and systems thinking questions for senior PM roles.",
    url: `${SITE_URL}/senior-pm-interview`,
    images: [{ url: `${SITE_URL}/api/og?title=Senior+PM+Interview+Questions+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Senior PM Interview Questions 2026 — PM Streak",
    description: "Strategy, leadership, and systems thinking questions for senior PM roles.",
    images: [`${SITE_URL}/api/og?title=Senior+PM+Interview+Questions+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DIFFERENTIATORS = [
  {
    level: "Mid-level PM",
    focus: "Feature execution",
    scope: "Squad / one team",
    signal: "Ships on time, manages backlog, resolves day-to-day blockers",
  },
  {
    level: "Senior PM",
    focus: "Product strategy",
    scope: "Multiple squads / a product area",
    signal: "Sets direction, makes trade-offs across teams, moves business metrics",
  },
  {
    level: "Staff / Principal PM",
    focus: "Org-wide influence",
    scope: "Whole org / cross-BU",
    signal: "Defines strategy, builds systems, develops other PMs",
  },
];

const QUESTION_BANKS = [
  {
    theme: "Strategy & Vision",
    icon: "🔭",
    questions: [
      {
        q: "How do you build a 3-year product roadmap when you can't predict what the market will look like?",
        hint: "Interviewers want: scenario planning, bets vs certainties, how you communicate uncertainty to leadership",
      },
      {
        q: "Describe a time you had to kill a product or major feature. How did you make the call?",
        hint: "Interviewers want: clear decision criteria, how you handled sunk cost fallacy, stakeholder communication",
      },
      {
        q: "How do you decide which market segment to focus on when multiple are viable?",
        hint: "Interviewers want: TAM/SAM/SOM reasoning, competitive moat thinking, capability assessment",
      },
      {
        q: "Tell me about a time you disagreed with the company strategy. What did you do?",
        hint: "Interviewers want: disagree-and-commit vs principled pushback, how you escalated, outcome",
      },
    ],
  },
  {
    theme: "Stakeholder Management & Influence",
    icon: "🤝",
    questions: [
      {
        q: "How do you align a C-suite that has conflicting views on product direction?",
        hint: "Interviewers want: narrative construction, data-led persuasion, building coalitions before the meeting",
      },
      {
        q: "Tell me about a time you pushed back on a feature request from a major customer or CEO.",
        hint: "Interviewers want: principled framework (user need vs request), how you said no without burning the relationship",
      },
      {
        q: "How do you manage PMs or leads who report to you or work alongside you?",
        hint: "Interviewers want: delegation, coaching signals, giving feedback, how you handle underperformance",
      },
      {
        q: "Describe a situation where two engineering leads had opposing architectural views. How did you facilitate resolution?",
        hint: "Interviewers want: technical credibility, neutrality, decision-making process, outcome ownership",
      },
    ],
  },
  {
    theme: "Systems Thinking & Trade-offs",
    icon: "⚙️",
    questions: [
      {
        q: "How do you balance investing in platform/infrastructure vs user-facing features?",
        hint: "Interviewers want: debt vs velocity framing, how you quantify infra ROI, how you sell it to business stakeholders",
      },
      {
        q: "Your north star metric is healthy but revenue is declining. What do you do?",
        hint: "Interviewers want: lagging vs leading indicator understanding, monetisation strategy, avoiding metric gaming",
      },
      {
        q: "How do you design an experiment when you can't randomise users (e.g. marketplace, social network)?",
        hint: "Interviewers want: SUTVA violations, geo holdout, diff-in-diff, when to use observational methods",
      },
      {
        q: "You have budget to hire 3 more engineers. Do you build, buy, or partner for the next capability?",
        hint: "Interviewers want: build vs buy framework, core vs context, speed-to-market vs ownership trade-offs",
      },
    ],
  },
  {
    theme: "People & Org Design",
    icon: "🏗️",
    questions: [
      {
        q: "How do you structure a PM team as the product scales from 1 to 10 PMs?",
        hint: "Interviewers want: Conway's Law, feature vs platform vs growth structure, hiring bar, onboarding",
      },
      {
        q: "How do you identify and develop your best PMs for senior roles?",
        hint: "Interviewers want: mentorship, stretch assignments, 360 feedback, distinguishing potential vs performance",
      },
      {
        q: "Tell me about a time you had to restructure a team or product area. How did you manage it?",
        hint: "Interviewers want: change management, communication timing, handling uncertainty for people affected",
      },
    ],
  },
];

const FAQS = [
  {
    q: "What makes senior PM interviews harder than mid-level?",
    a: "The bar shifts from 'can you execute?' to 'can you set direction?' You'll be asked about ambiguous, multi-stakeholder, multi-year decisions. Answers that reference a single team or a 6-week sprint window signal mid-level thinking. Senior PMs are expected to reason about trade-offs across the whole product, the org, and the market — simultaneously.",
  },
  {
    q: "How should I prepare case studies for a senior PM interview?",
    a: "Pick 3–4 strategic decisions you've made: a bet that paid off, a bet that failed, a trade-off between growth and sustainability, and a leadership/org challenge. For each, prepare a tight 4-minute narrative: context, the options you considered, the trade-offs, what you decided and why, and what you'd do differently. Senior PMs are expected to have convictions and defend them.",
  },
  {
    q: "Do senior PM interviews include product design questions?",
    a: "Rarely as standalone design exercises — senior PMs are expected to operate above feature-level thinking. You may be asked to design a new product line or enter a new market, which requires strategy + design together. Pure 'design a feature for X' questions are usually reserved for APM/PM roles.",
  },
];

export default function SeniorPmInterviewPage() {
  const dates = pageDates("/senior-pm-interview");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Senior PM Interview", url: `${SITE_URL}/senior-pm-interview` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Senior PM Interview Questions (2026 Edition)",
        description:
          "Senior PM interview questions with model answers. Strategy, stakeholder management, org design, product vision, and the systems thinking questions that separate senior PMs from mid-level.",
        image: `${SITE_URL}/api/og?title=Senior+PM+Interview+Questions+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/senior-pm-interview`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔭</span> Strategy, systems thinking, and org-level influence
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Senior PM Interview Questions<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Senior PM interviews test whether you can set direction, not just execute: expect
            questions on product strategy and vision, stakeholder alignment and influence,
            systems-level trade-offs, and org design rather than standalone feature-design
            exercises. Interviewers probe ambiguous, multi-year decisions, so preparing 3–4 tight
            narratives about strategic bets, kills, and trade-offs matters more than rehearsing
            frameworks.
          </p>
          <p className="text-sm text-white/50 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The questions that separate senior PMs from mid-level. Strategy, stakeholder alignment,
            systems thinking, and the org-design questions most candidates never prepare for.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice Senior PM Questions — Free →
          </Link>
        </section>

        {/* Level differentiators */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-3">What Senior Interviewers Are Really Assessing</h2>
          <p className="text-white/60 text-center mb-8">The bar shifts with seniority. Knowing where you are — and what the next level requires — is half the preparation.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-white/40 font-medium">Level</th>
                  <th className="text-left py-3 px-4 text-white/40 font-medium">Focus</th>
                  <th className="text-left py-3 px-4 text-white/40 font-medium">Scope</th>
                  <th className="text-left py-3 px-4 text-white/40 font-medium">Signal They Look For</th>
                </tr>
              </thead>
              <tbody>
                {DIFFERENTIATORS.map((row, i) => (
                  <tr key={i} className={`border-b border-white/5 ${i === 1 ? "bg-[#58cc02]/5" : ""}`}>
                    <td className="py-3 px-4 font-semibold text-white">{row.level}</td>
                    <td className="py-3 px-4 text-white/70">{row.focus}</td>
                    <td className="py-3 px-4 text-white/70">{row.scope}</td>
                    <td className="py-3 px-4 text-white/60">{row.signal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Question Banks */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">Senior PM Questions by Theme</h2>
          <div className="space-y-8">
            {QUESTION_BANKS.map(bank => (
              <div key={bank.theme} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-2xl">{bank.icon}</span>
                  <h3 className="text-lg font-semibold text-white">{bank.theme}</h3>
                </div>
                <div className="space-y-4">
                  {bank.questions.map((item, i) => (
                    <div key={i} className="border border-white/5 rounded-xl p-4">
                      <p className="font-medium text-white mb-2">{i + 1}. {item.q}</p>
                      <div className="bg-[#0e1113] rounded-lg px-3 py-2">
                        <p className="text-xs text-[#89e219]">🎯 {item.hint}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
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

        <RelatedPages slug="senior-pm-interview" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Train for the Senior Bar Daily</h2>
          <p className="text-white/60 mb-6">Strategic PM scenarios with AI feedback calibrated to the senior level.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
