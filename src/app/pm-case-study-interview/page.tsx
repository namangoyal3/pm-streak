import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Case Study Interview Guide (2026) — How to Solve Any PM Case",
  description:
    "Crack PM case study interviews with a proven framework. Product improvement, new market entry, metric drop investigation, and go-to-market cases — with worked examples and structures.",
  keywords: [
    "PM case study interview", "product manager case study", "PM case interview",
    "product case interview framework", "how to solve PM case studies",
    "product improvement case interview", "PM case interview examples 2026",
  ],
  alternates: { canonical: "/pm-case-study-interview" },
  openGraph: {
    title: "PM Case Study Interview Guide 2026 — PM Streak",
    description: "How to solve any PM case study — frameworks, worked examples, and what interviewers actually want.",
    url: `${SITE_URL}/pm-case-study-interview`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Case+Study+Interview+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Case Study Interview Guide 2026 — PM Streak",
    description: "How to solve any PM case study — frameworks, worked examples, and what interviewers actually want.",
    images: [`${SITE_URL}/api/og?title=PM+Case+Study+Interview+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const CASE_TYPES = [
  {
    type: "Product Improvement",
    icon: "📈",
    frequency: "Most common",
    prompt: "\"How would you improve [product]?\"",
    framework: [
      "Clarify the goal — improve for whom? By what metric?",
      "Define the user segments — don't assume one type of user",
      "Identify top 3 user pain points (ask or assume, but name them)",
      "Brainstorm solutions (3–5, don't filter yet)",
      "Prioritise by impact/feasibility — pick one and go deep",
      "Define success metrics and potential risks",
    ],
    example: "Improve Swiggy for restaurants (not just customers). Top pain: order cancellations hurt kitchen planning. Solution: predictive 'busy period' scheduling that adjusts acceptance rates. Metric: restaurant NPS + cancelled order rate.",
    watch: "Don't jump to solutions. Most candidates fail here by skipping the user pain point step.",
  },
  {
    type: "New Product / Market Entry",
    icon: "🌍",
    frequency: "Common at growth-stage companies",
    prompt: "\"Should [company] enter [new market or build new product]?\"",
    framework: [
      "Understand why — what's the strategic motivation?",
      "Define the target user in the new market",
      "Size the opportunity (TAM/SAM/SOM, even if rough)",
      "Assess competitive landscape and moat",
      "Evaluate capability fit (what does the company have that others don't?)",
      "Recommend yes/no with conditions and first milestone",
    ],
    example: "Should Zepto launch a financial services product? Target user: busy urban professionals who already trust Zepto. Opportunity: 40M+ daily active users with payment habit. Moat: delivery trust + daily touchpoint. Recommend: start with earned credit for regular customers — lower risk, fast feedback.",
    watch: "Interviewers penalise vague TAM estimates. Use bottom-up logic ('if 5% of Zepto's 10M users...').",
  },
  {
    type: "Metric Drop Investigation",
    icon: "📉",
    frequency: "Very common at data-driven companies",
    prompt: "\"DAU dropped 20% last week. What happened?\"",
    framework: [
      "Clarify scope — which metric exactly? All users or segment?",
      "Rule out data/tracking issues first",
      "Check for external events (holiday, outage, competitor launch)",
      "Segment by user type, geography, platform, acquisition channel",
      "Identify which step in the funnel dropped",
      "Hypothesise root cause and propose investigation / fix",
    ],
    example: "DAU drops 20%. Step 1: Is the data correct? (tracking issue → no, confirmed). Step 2: External — product outage at 2am Tuesday for 4 hours. Users couldn't log in. Solution: resolve outage + re-engage churned users with push notification.",
    watch: "Always check for data/instrumentation issues first. Many real metric drops are measurement errors.",
  },
  {
    type: "Go-to-Market (GTM)",
    icon: "🚀",
    frequency: "Common at B2B and growth companies",
    prompt: "\"You're launching [feature/product]. How do you bring it to market?\"",
    framework: [
      "Define target customer and ICP (Ideal Customer Profile)",
      "Identify the acquisition channel that reaches them best",
      "Design the activation moment (what does 'success at Day 1' look like?)",
      "Plan the retention hook (what brings them back on Day 7?)",
      "Define launch phases: beta → limited launch → full rollout",
      "Success metrics: activation rate, D7 retention, NPS",
    ],
    example: "Launching PM Streak to MBA students. ICP: 2nd-year MBA with PM internship goal. Channel: MBA placement cells, LinkedIn PM groups, campus ambassadors. Activation: complete Day 1 lesson + set streak goal. D7 retention hook: streak reminder + leaderboard with batchmates.",
    watch: "GTM isn't just marketing. It includes onboarding design, pricing, and the first-week retention loop.",
  },
];

const FAQS = [
  {
    q: "How is a PM case study interview different from a consulting case?",
    a: "Consulting cases test problem-structuring and number-crunching. PM cases test user empathy, product intuition, and ability to make trade-offs. In a PM case, there's no single right answer — interviewers are watching how you think, not whether you hit the exact number. User-centric reasoning and crisp prioritisation beat analytical gymnastics.",
  },
  {
    q: "How long should a PM case study answer be?",
    a: "10–15 minutes for a case delivered in an interview. Spend 2 minutes clarifying, 3 minutes on users/pain points, 5 minutes on solutions/prioritisation, 3 minutes on metrics and risks. If given a take-home case, a 2-page written response with one structured diagram is usually ideal — longer doesn't signal more rigour.",
  },
  {
    q: "Should I ask clarifying questions before diving into a PM case?",
    a: "Always. Top candidates ask 2–3 targeted clarifying questions before structuring their answer. Example: 'When you say improve YouTube — are we optimising for creator growth, viewer retention, or ad revenue? And is there a specific user segment?' This signals product maturity. Diving in without clarification signals junior thinking.",
  },
  {
    q: "What's the biggest mistake candidates make in PM case interviews?",
    a: "Jumping to solutions before understanding the user. Second biggest: presenting a solution without a success metric. Interviewers need to know: (1) you understand who you're building for, (2) you can prioritise among options, and (3) you know how you'd measure success. Skip any of these and you'll feel 'good but not great' to the interviewer.",
  },
];

export default function PmCaseStudyInterviewPage() {
  const dates = pageDates("/pm-case-study-interview");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Case Study Interview", url: `${SITE_URL}/pm-case-study-interview` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Case Study Interview Guide (2026)",
        description:
          "Crack PM case study interviews with a proven framework. Product improvement, new market entry, metric drop investigation, and go-to-market cases — with worked examples and structures.",
        image: `${SITE_URL}/api/og?title=PM+Case+Study+Interview+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-case-study-interview`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🧩</span> 4 case types, proven frameworks, worked examples
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Case Study Interview<br />Guide (2026)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Most PM case study interviews come in four flavours — product improvement, new product
            or market entry, metric drop investigation, and go-to-market — each solvable with a
            repeatable structure in 10–15 minutes. Open with two or three clarifying questions,
            anchor on the user and their pain points before proposing solutions, and always attach
            a success metric to your recommendation.
          </p>
          <p className="text-sm text-white/50 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            How to crack any PM case study — product improvement, new market entry, metric drops,
            and GTM. With step-by-step frameworks and worked examples for each.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice PM Cases Daily — Free →
          </Link>
        </section>

        {/* Case Types */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="space-y-8">
            {CASE_TYPES.map((c, i) => (
              <div key={c.type} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <div className="flex items-start gap-4 mb-5">
                  <div className="text-3xl flex-shrink-0">{c.icon}</div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-white/20 font-bold text-sm">{String(i + 1).padStart(2, "0")}</span>
                      <h2 className="text-lg font-bold text-white">{c.type}</h2>
                      <span className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full">{c.frequency}</span>
                    </div>
                    <p className="text-sm text-white/40 italic">{c.prompt}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Framework</p>
                    <ol className="space-y-1.5">
                      {c.framework.map((step, j) => (
                        <li key={j} className="flex gap-3 text-sm">
                          <span className="w-5 h-5 rounded-full bg-[#58cc02]/20 text-[#89e219] text-xs flex items-center justify-center flex-shrink-0 mt-0.5">{j + 1}</span>
                          <span className="text-white/70">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-xl p-4">
                    <p className="text-xs text-[#89e219] mb-1.5">💡 Worked example</p>
                    <p className="text-sm text-white/60">{c.example}</p>
                  </div>
                  <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl px-4 py-3">
                    <p className="text-xs text-yellow-400">⚠️ {c.watch}</p>
                  </div>
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

        <RelatedPages slug="pm-case-study-interview" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Cases Until They Feel Easy</h2>
          <p className="text-white/60 mb-6">Daily AI-graded PM cases — real prompts, real feedback, real improvement.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
