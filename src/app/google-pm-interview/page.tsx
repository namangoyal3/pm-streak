import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "Google PM Interview Guide (2026) — Questions, Process & How to Prepare",
  description:
    "Crack the Google PM interview. All 5 interview types, real questions, what Googlers say the bar actually is, and a 6-week prep plan — for India and global roles.",
  keywords: [
    "Google PM interview", "Google product manager interview questions",
    "Google PM interview prep", "Google APMM interview", "how to crack Google PM interview",
    "Google product manager interview 2026", "Google PM interview India",
  ],
  alternates: { canonical: "/google-pm-interview" },
  openGraph: {
    title: "Google PM Interview Guide 2026 — PM Streak",
    description: "All 5 Google PM interview types, real questions, and a 6-week prep plan.",
    url: `${SITE_URL}/google-pm-interview`,
    images: [{ url: `${SITE_URL}/api/og?title=Google+PM+Interview+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Google PM Interview Guide 2026 — PM Streak",
    description: "All 5 Google PM interview types, real questions, and a 6-week prep plan.",
    images: [`${SITE_URL}/api/og?title=Google+PM+Interview+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const ROUNDS = [
  {
    name: "Product Sense",
    weight: "Highest — 2–3 rounds",
    what: "Design or improve a product. Google tests whether you can identify the right user, articulate a clear vision, and prioritise with user empathy.",
    sample: [
      "How would you improve Google Maps?",
      "Design a product to help people make better financial decisions.",
      "How would you measure success for Google Search?",
    ],
    tip: "Structure matters more at Google than at most companies. Use: clarify → user segments → user needs → solutions → prioritise → metrics. Don't rush to solutions.",
  },
  {
    name: "Analytical / Metrics",
    weight: "1–2 rounds",
    what: "Diagnose a metric problem or define success metrics. Google values first-principles reasoning and intellectual honesty about trade-offs.",
    sample: [
      "YouTube watch time is up 10% but ad revenue is flat. Why, and what would you do?",
      "How would you define success for Google Pay in India?",
      "Walk me through how you'd investigate a 20% drop in Google Docs DAU.",
    ],
    tip: "Always check for data/instrumentation issues before jumping to product hypotheses. Show that you know metrics can be misleading.",
  },
  {
    name: "Strategy",
    weight: "1 round (more common for senior roles)",
    what: "Should Google enter this market? How do you think about competitive positioning? This round tests business acumen and long-horizon thinking.",
    sample: [
      "Should Google build a standalone news app?",
      "How would you think about Google's strategy in health care?",
      "Uber is entering a market Google Maps dominates. How do you respond?",
    ],
    tip: "Use the MECE principle to structure your answer. Identify the strategic question under the question — then answer that.",
  },
  {
    name: "Technical",
    weight: "1 round",
    what: "Not coding — but can you have a substantive conversation about how systems work? Google PMs work closely with engineers and need to earn credibility.",
    sample: [
      "How does Google Search indexing work at a high level?",
      "A new Google product is getting 10x more traffic than expected. What happens to the infrastructure?",
      "Walk me through how a recommendation algorithm works.",
    ],
    tip: "Demonstrate intellectual curiosity. 'I don't know exactly, but my understanding is...' is fine — bluffing is not.",
  },
  {
    name: "Behavioural / Googleyness",
    weight: "1–2 rounds",
    what: "Google's culture pillars: user focus, intellectual humility, structured thinking under ambiguity, and collaborative leadership.",
    sample: [
      "Tell me about a time you had to make a decision without enough data.",
      "Describe a time you failed. What did you learn?",
      "Tell me about a time you influenced someone more senior than you.",
    ],
    tip: "Google explicitly looks for 'Googleyness' — comfort with ambiguity, genuine user obsession, and humility. Don't perform culture fit — show real examples.",
  },
];

const PREP_PLAN = [
  { week: "Week 1–2", focus: "Product Sense foundations", actions: ["Do 1 product teardown per day (Google products first)", "Practice CIRCLES + user empathy framework", "Prepare 5 'improve a product' answers out loud"] },
  { week: "Week 3", focus: "Metrics & Analytics", actions: ["Learn the Google metric drop framework", "Practice diagnosing 10 metric scenarios", "Understand Google's north star metrics for Search, Maps, YouTube, Gmail"] },
  { week: "Week 4", focus: "Strategy & Technical", actions: ["Read Google's moonshot thinking philosophy", "Study Google's product ecosystem and competitive moats", "Review basic system design concepts for PMs (not coding)"] },
  { week: "Week 5", focus: "Behavioural stories", actions: ["Prepare 8 STAR stories (failure, leadership, conflict, ambiguity, data decision, cross-functional)", "Practice 'Googleyness' signals in each story", "Record yourself — time all answers to 2–3 minutes"] },
  { week: "Week 6", focus: "Mock interviews & polish", actions: ["Do 4 full mock interviews (1 per round type)", "Address feedback from mocks before the real thing", "Review Google's product principles one more time"] },
];

const FAQS = [
  {
    q: "How hard is the Google PM interview compared to other companies?",
    a: "It has one of the highest bars globally — especially for product sense. Google interviewers are trained to a specific rubric and score independently. The structured thinking bar is very high: vague or unstructured answers fail even if the instinct is correct. Candidates who pass typically have 80+ hours of deliberate practice and can structure any product question in under 60 seconds.",
  },
  {
    q: "How many rounds does the Google PM interview have?",
    a: "Typically 5–6 rounds in the on-site (or virtual on-site): 2–3 product sense, 1 analytical, 1 behavioural, and 1 technical. For APMM (fresher) roles, there's also a recruiter phone screen and sometimes a take-home assignment. Total timeline from application to offer: 6–12 weeks.",
  },
  {
    q: "Does Google PM interview include a coding test?",
    a: "No — Google PM interviews do not require you to write code. The technical round tests whether you can discuss system architecture, trade-offs, and constraints at a conceptual level — not write algorithms. SQL knowledge is a plus but not required.",
  },
];

export default function GooglePmInterviewPage() {
  const dates = pageDates("/google-pm-interview");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Google PM Interview", url: `${SITE_URL}/google-pm-interview` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Google PM Interview Guide (2026 Edition)",
        description:
          "Crack the Google PM interview. All 5 interview types, real questions, what Googlers say the bar actually is, and a 6-week prep plan — for India and global roles.",
        image: `${SITE_URL}/api/og?title=Google+PM+Interview+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/google-pm-interview`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔵</span> 5 round types · One of the highest PM bars in the world
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Google PM Interview Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Google&apos;s PM interview typically means five to six on-site rounds — two to three product
            sense, plus analytical, strategy, technical, and behavioural (&quot;Googleyness&quot;) interviews —
            scored independently against a trained rubric. No coding is required; the technical
            round stays conceptual. Structured thinking carries the most weight, and the process
            runs six to twelve weeks from application to offer.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Every round type, real questions, what Googlers say the bar actually is,
            and a 6-week prep plan for PM and APMM roles in India and globally.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/signup" className="bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
              Start Google PM Prep — Free
            </Link>
            <Link href="/apm-program-preparation" className="bg-white/10 hover:bg-white/15 text-white font-semibold px-8 py-3 rounded-xl transition-colors">
              Google APMM Guide →
            </Link>
          </div>
        </section>

        {/* Interview rounds */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">The 5 Google PM Interview Rounds</h2>
          <div className="space-y-6">
            {ROUNDS.map((round, i) => (
              <div key={round.name} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#58cc02]/20 text-[#89e219] font-bold text-sm flex items-center justify-center">{i + 1}</span>
                    <h3 className="text-lg font-bold text-white">{round.name}</h3>
                  </div>
                  <span className="text-xs bg-[#1f2228] border border-white/10 rounded-full px-3 py-1 text-white/50">{round.weight}</span>
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

        {/* 6-week prep plan */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6-Week Google PM Prep Plan</h2>
            <div className="space-y-4">
              {PREP_PLAN.map((week, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs bg-[#58cc02]/20 text-[#89e219] px-2 py-0.5 rounded-full">{week.week}</span>
                    <h3 className="font-semibold text-white">{week.focus}</h3>
                  </div>
                  <ul className="space-y-1.5">
                    {week.actions.map((action, j) => (
                      <li key={j} className="flex gap-2 text-sm">
                        <span className="text-white/30">✓</span>
                        <span className="text-white/60">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
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

        <RelatedPages slug="google-pm-interview" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Train for the Google Bar Every Day</h2>
          <p className="text-white/60 mb-6">Product sense, metrics, and strategy questions at Google&apos;s standard — with AI feedback.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
