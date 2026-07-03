import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Interview Preparation Plan (2026) — 8-Week Study Schedule",
  description:
    "The complete 8-week PM interview preparation plan. Week-by-week schedule, what to study, how to practice, and how to track readiness — for Google, Flipkart, Razorpay, and top startups.",
  keywords: [
    "PM interview preparation plan", "product manager interview study plan",
    "how to prepare for PM interview", "PM interview schedule 8 weeks",
    "PM interview checklist", "product manager interview prep India 2026",
  ],
  alternates: { canonical: "/pm-interview-preparation-plan" },
  openGraph: {
    title: "PM Interview Preparation Plan 2026 — 8-Week Schedule | PM Streak",
    description: "8-week PM interview prep plan — week-by-week schedule, what to study, and readiness checklist.",
    url: `${SITE_URL}/pm-interview-preparation-plan`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Interview+Preparation+Plan+2026++8-Week+Schedule++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Interview Preparation Plan 2026 — 8-Week Schedule | PM Streak",
    description: "8-week PM interview prep plan — week-by-week schedule, what to study, and readiness checklist.",
    images: [`${SITE_URL}/api/og?title=PM+Interview+Preparation+Plan+2026++8-Week+Schedule++PM+Streak`],
    site: "@pmstreak",
  },
};

const WEEKS = [
  {
    week: "Week 1",
    theme: "Foundation & Self-Assessment",
    daily: "1 hr",
    focus: "Understand the PM interview landscape for your target companies. Audit your current strengths and gaps.",
    tasks: [
      "List your 5 target companies and research each interview format",
      "Write 3 career stories (impact you drove, failure you learned from, cross-functional challenge)",
      "Audit: rate yourself 1–5 on product sense, metrics, strategy, behavioural, technical",
      "Set up a practice log (notion/sheets) to track questions attempted and scores",
    ],
    resource: "Research target companies' interview formats on Glassdoor and company blogs",
  },
  {
    week: "Week 2",
    theme: "Product Sense & User Empathy",
    daily: "1.5 hr",
    focus: "Build the habit of structured product thinking. Practice the user → need → solution → metric chain.",
    tasks: [
      "Do 1 product teardown per day (5 total): pick apps you use and document user segments, pain points, recommendations",
      "Practice 3 'improve a product' questions out loud, record yourself",
      "Learn JTBD (Jobs To Be Done) framework and practice writing job statements",
      "Read: 3 PM teardowns from notable product thinkers",
    ],
    resource: "Products to tear down: Swiggy, GPay, LinkedIn, Zepto, any app you use daily",
  },
  {
    week: "Week 3",
    theme: "Metrics & Data Interpretation",
    daily: "1.5 hr",
    focus: "Build fluency in defining, reading, and diagnosing product metrics.",
    tasks: [
      "Learn the 5 core PM metrics: retention, activation, engagement, monetisation, referral (AARRR)",
      "Practice 10 'metric drop' scenarios — diagnose the cause and propose a fix",
      "Learn basic funnel analysis: draw the customer journey for 3 different apps",
      "Understand A/B testing: hypothesis, control vs treatment, statistical significance",
    ],
    resource: "Amplitude's PM analytics blog and Reforge growth metrics resources",
  },
  {
    week: "Week 4",
    theme: "Product Strategy & Market Thinking",
    daily: "1.5 hr",
    focus: "Think at the business and market level — not just the feature level.",
    tasks: [
      "Practice 3 'should Company X enter Market Y' questions using TAM/SAM/SOM + capability analysis",
      "Study competitive strategy: moats, network effects, switching costs",
      "Practice OKR writing: write Q3 OKRs for 2 product areas you know",
      "Research your target companies' strategy — what are their bets for the next 2 years?",
    ],
    resource: "Stratechery, Product School strategy essays, annual reports for listed companies",
  },
  {
    week: "Week 5",
    theme: "Behavioural & STAR Stories",
    daily: "1 hr",
    focus: "Build a story bank of 8–10 rich behavioural stories that flex across question types.",
    tasks: [
      "Write STAR stories for: leadership, failure, conflict, ambiguity, data decision, cross-functional, stakeholder pushback",
      "Practice each story out loud — time to 2–3 minutes",
      "Identify 2 stories that can flex across 3+ question types",
      "For Google/Amazon: map each story to 3 Leadership Principles",
    ],
    resource: "Record voice memos of each story and listen back — is the Action section 60% of the answer?",
  },
  {
    week: "Week 6",
    theme: "Technical Fluency",
    daily: "1 hr",
    focus: "Build credibility with engineering — not coding skill.",
    tasks: [
      "Learn: REST APIs, HTTP status codes (200/400/500), what rate limiting means",
      "Learn: relational vs NoSQL databases, what an index does, basic SQL (SELECT, WHERE, JOIN)",
      "Practice explaining technical concepts to non-technical stakeholders",
      "Write a basic SQL query to find users who signed up but never completed action X",
    ],
    resource: "Mode Analytics SQL tutorial, 'Cracking the PM Interview' technical chapter",
  },
  {
    week: "Week 7",
    theme: "Mock Interviews",
    daily: "2 hr",
    focus: "Simulate real interview conditions. Identify gaps from feedback.",
    tasks: [
      "Do 2 mock interviews with a peer or mentor (1 product sense, 1 behavioural)",
      "Do 2 solo mock interviews on video — watch them back critically",
      "Identify your 3 biggest weaknesses from mock feedback",
      "Do targeted practice on weakness areas only — no broad revision",
    ],
    resource: "Pramp, IGotAnOffer PM practice, or PM Streak's AI practice questions",
  },
  {
    week: "Week 8",
    theme: "Company-Specific Prep & Polish",
    daily: "1.5 hr",
    focus: "Customise your prep for each company's specific format, culture, and product areas.",
    tasks: [
      "For each target company: know their north star metric, key products, recent strategic bets",
      "Prepare a company-specific 'why us?' answer that references a real product challenge you'd want to solve",
      "Final mock interview with realistic timing and no notes",
      "Review your story bank one final time — can you deliver each in under 3 minutes cold?",
    ],
    resource: "Company engineering/product blogs, Glassdoor interview reports from the last 6 months",
  },
];

const READINESS_CHECKLIST = [
  "I can structure any product improvement question in under 60 seconds",
  "I have 8+ STAR stories ready and can deliver each in 2–3 minutes",
  "I can diagnose a metric drop across 5+ different failure modes",
  "I know my target companies' north star metrics and key strategic bets",
  "I can explain APIs, databases, and A/B testing to a non-technical person",
  "I have a company-specific 'why here?' answer for each target",
  "I've done at least 4 live mock interviews with feedback",
  "I can answer 'walk me through your background' in exactly 2 minutes",
];

const FAQS = [
  {
    q: "How many hours per week does PM interview prep actually require?",
    a: "8–10 hours/week for 8 weeks is the realistic commitment for a competitive outcome at top companies. You can compress to 4 weeks at 15+ hours/week but the quality of story preparation suffers. Consistent daily practice (even 45 minutes) builds muscle memory that cramming doesn't.",
  },
  {
    q: "Should I prepare differently for each company?",
    a: "Core PM skills are transferable — product sense, metrics, and behavioural preparation carries across all interviews. The company-specific layer (weeks 7–8) should include: their interview format, their product ecosystem, their culture values, and a specific product challenge you'd want to tackle. This takes 2–3 hours per company and meaningfully increases your conversion rate.",
  },
  {
    q: "What's the biggest preparation mistake candidates make?",
    a: "Over-indexing on memorising frameworks and under-indexing on speaking out loud. Reading about RICE is not the same as being able to apply RICE fluidly in a 30-minute interview. Every framework you learn should be practiced out loud on 3 real examples before your interview — not just understood intellectually.",
  },
];

export default function PmInterviewPreparationPlanPage() {
  const dates = pageDates("/pm-interview-preparation-plan");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Interview Preparation Plan", url: `${SITE_URL}/pm-interview-preparation-plan` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Interview Preparation Plan (8-Week Schedule)",
        description:
          "The complete 8-week PM interview preparation plan. Week-by-week schedule, what to study, how to practice, and how to track readiness — for Google, Flipkart, Razorpay, and top startups.",
        image: `${SITE_URL}/api/og?title=PM+Interview+Preparation+Plan+2026++8-Week+Schedule++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-interview-preparation-plan`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📅</span> 8 weeks · ~70 hours · One structured plan
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Interview Preparation Plan<br />(8-Week Schedule)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            This plan spans eight weeks at roughly 8–10 hours per week, moving from foundation
            and self-assessment through product sense, metrics, strategy, behavioural stories,
            technical fluency, mock interviews, and finally company-specific polish. Each week
            pairs a study focus with concrete daily tasks and a resource, ending in an eight-item
            readiness checklist — if you can honestly tick all eight, the plan considers you
            ready to interview.
          </p>
          <p className="text-sm text-white/50 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Week-by-week PM interview prep — what to study, how to practice, and how to know
            you&apos;re ready for Google, Flipkart, Razorpay, and top startups.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Start Your Prep Plan Today — Free →
          </Link>
        </section>

        {/* 8-week plan */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="space-y-5">
            {WEEKS.map((w) => (
              <div key={w.week} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs bg-[#58cc02]/20 text-[#89e219] px-2 py-0.5 rounded-full">{w.week}</span>
                      <h3 className="font-bold text-white">{w.theme}</h3>
                    </div>
                    <p className="text-xs text-white/40">{w.focus}</p>
                  </div>
                  <span className="text-xs bg-green-500/10 border border-green-500/20 text-green-400 rounded-full px-3 py-1">{w.daily}/day</span>
                </div>
                <ul className="space-y-2 mb-3">
                  {w.tasks.map((task, i) => (
                    <li key={i} className="flex gap-2 text-sm">
                      <span className="text-white/30 flex-shrink-0">☐</span>
                      <span className="text-white/70">{task}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-[#0e1113] rounded-lg px-3 py-2">
                  <p className="text-xs text-white/40">📚 Resource: <span className="text-white/60">{w.resource}</span></p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Readiness checklist */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-3">Interview Readiness Checklist</h2>
            <p className="text-white/60 text-center mb-8">If you can honestly check all 8, you&apos;re ready to interview.</p>
            <div className="space-y-3">
              {READINESS_CHECKLIST.map((item, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4 flex gap-3 items-start">
                  <span className="w-5 h-5 rounded border border-white/20 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white/70">{item}</p>
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

        <RelatedPages slug="pm-interview-preparation-plan" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Follow the Plan. Track Your Progress.</h2>
          <p className="text-white/60 mb-6">PM Streak keeps you on your prep plan with daily questions, streaks, and readiness tracking.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
