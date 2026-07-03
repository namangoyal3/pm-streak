import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Metrics Interview Questions — How to Diagnose Drops & Define Success",
  description:
    "Master the metrics round in PM interviews. Learn how to define success metrics, debug DAU drops, set up A/B tests, and think like a data-driven PM. With 30+ real questions.",
  keywords: [
    "PM metrics interview", "product manager metrics questions", "how to debug metric drop",
    "PM analytics interview", "defining success metrics PM", "A/B testing PM interview",
    "product metrics framework", "north star metric PM interview",
  ],
  alternates: { canonical: "/pm-metrics-interview" },
  openGraph: {
    title: "PM Metrics Interview — Debug Drops & Define Success | PM Streak",
    description: "30+ PM metrics interview questions with frameworks for diagnosing drops, defining success, and A/B testing.",
    url: `${SITE_URL}/pm-metrics-interview`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Metrics+Interview++Debug+Drops+&+Define+Success++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Metrics Interview — Debug Drops & Define Success | PM Streak",
    description: "30+ PM metrics interview questions with frameworks for diagnosing drops, defining success, and A/B testing.",
    images: [`${SITE_URL}/api/og?title=PM+Metrics+Interview++Debug+Drops+&+Define+Success++PM+Streak`],
    site: "@pmstreak",
  },
};

const DEBUG_FRAMEWORK = [
  { step: "1", title: "Confirm the signal is real", body: "Check data pipeline, logging changes, timezone issues, and sample size before assuming a product problem exists." },
  { step: "2", title: "Segment the drop", body: "Break down by platform (iOS/Android/web), geography, user segment (new vs returning), and feature area to isolate where the drop lives." },
  { step: "3", title: "Check external factors", body: "Did a competitor launch? Is there a seasonal pattern? Did a press event change user behaviour? Check before assuming internal cause." },
  { step: "4", title: "Identify recent changes", body: "What shipped in the last 2 weeks? A/B tests running, backend changes, third-party integrations, or infra migrations." },
  { step: "5", title: "Form a hypothesis", body: "State a specific, testable cause: 'The drop is in Android new users after the v4.2 push notification change.'" },
  { step: "6", title: "Define recovery action", body: "What do you roll back, fix, or monitor? What's the threshold for escalation vs continued investigation?" },
];

const QUESTIONS = [
  { category: "Defining Success", qs: [
    "How would you define the North Star metric for a consumer social app?",
    "What metrics would you track for a new user onboarding flow?",
    "How do you choose between DAU and MAU as your primary engagement metric?",
    "A new feature launched. What metrics tell you it's succeeding?",
    "How would you measure the health of a marketplace (two-sided platform)?",
  ]},
  { category: "Debugging Drops", qs: [
    "DAU dropped 15% on Tuesday. Walk me through your diagnosis.",
    "Conversion rate on our signup page fell 20% after a redesign. What do you do?",
    "Revenue is up but NPS is falling. Is that a problem?",
    "Engagement is flat but retention is improving. What does that tell you?",
    "A metric improved in an A/B test but declined in production. Why might that happen?",
  ]},
  { category: "A/B Testing & Experimentation", qs: [
    "How would you set up an A/B test for a new checkout flow?",
    "What sample size do you need to get a statistically significant result?",
    "When should you stop an A/B test early?",
    "How do you handle novelty effects in experiments?",
    "Two A/B tests are running simultaneously. What risks does that create?",
  ]},
  { category: "Trade-offs & Edge Cases", qs: [
    "You improved the activation metric but 7-day retention dropped. What do you do?",
    "The team wants to optimise for revenue but you think it'll hurt long-term retention. How do you argue?",
    "Your metric improved but you suspect it was gamed. How do you detect it?",
    "Leadership wants a single metric to track the company. What do you recommend and why?",
  ]},
];

const FAQS = [
  {
    q: "What metrics questions are most common in PM interviews?",
    a: "The two most common are: (1) 'A key metric dropped — walk me through your diagnosis' and (2) 'How would you define success for [feature/product]?' Both test whether you think in data vs instinct. The drop question specifically tests whether you check instrumentation before assuming a product problem.",
  },
  {
    q: "What framework should I use for PM metrics questions?",
    a: "For drop questions: confirm the signal → segment → check external → check recent changes → hypothesise → action. For success definition: start with the user goal → define primary metric → add secondary metrics → add guardrail metrics. Always name specific numbers, not just metric names.",
  },
  {
    q: "Do I need to know SQL for PM metrics interviews?",
    a: "Not usually — PM metrics interviews test conceptual thinking, not query writing. However, being able to say 'I'd write a query segmenting by platform and cohort' shows analytical fluency. PM Streak's daily metrics lessons build this intuition without requiring a SQL background.",
  },
];

export default function PmMetricsInterviewPage() {
  const dates = pageDates("/pm-metrics-interview");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Metrics Interview", url: `${SITE_URL}/pm-metrics-interview` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Metrics Interview: Debug Drops. Define Success.",
        description:
          "Master the metrics round in PM interviews. Learn how to define success metrics, debug DAU drops, set up A/B tests, and think like a data-driven PM. With 30+ real questions.",
        image: `${SITE_URL}/api/og?title=PM+Metrics+Interview++Debug+Drops+&+Define+Success++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-metrics-interview`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📊</span> The round that trips up even experienced PMs
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Metrics Interview:<br />Debug Drops. Define Success.
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            PM metrics interviews test two things: diagnosing a metric drop and defining success for a feature.
            The standard drop framework has six steps — confirm the signal is real, segment, check external factors,
            review recent changes, hypothesise, then act. SQL usually isn&apos;t required; this guide covers 30+ real
            questions across defining success, debugging drops, A/B testing, and trade-offs.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The metrics round separates PMs who think in data from those who fake it.
            Here are the frameworks and questions you need — with 30+ real interview examples.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice Metrics Questions Daily — Free →
          </Link>
        </section>

        {/* Debug Framework */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-3">The 6-Step Metric Drop Framework</h2>
          <p className="text-white/60 text-center mb-10 max-w-xl mx-auto">
            Every &quot;a metric dropped&quot; question follows the same structure. Master this and you&apos;ll never panic in the metrics round again.
          </p>
          <div className="space-y-4">
            {DEBUG_FRAMEWORK.map(item => (
              <div key={item.step} className="flex gap-4 bg-[#111] border border-white/10 rounded-xl p-5">
                <div className="w-8 h-8 rounded-full bg-[#58cc02]/20 border border-[#58cc02]/40 flex items-center justify-center text-[#89e219] font-bold text-sm flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-white/60">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Questions by Category */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">30+ Metrics Interview Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {QUESTIONS.map(cat => (
                <div key={cat.category} className="bg-[#111] border border-white/10 rounded-xl p-5">
                  <h3 className="font-semibold text-white mb-4">{cat.category}</h3>
                  <ol className="space-y-2">
                    {cat.qs.map((q, i) => (
                      <li key={i} className="flex gap-2 text-sm">
                        <span className="text-white/30 w-4 flex-shrink-0">{i+1}.</span>
                        <span className="text-white/70">{q}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/interview-prep" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
                Practice with AI Feedback →
              </Link>
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

        <RelatedPages slug="pm-metrics-interview" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Metrics Intuition Every Day</h2>
          <p className="text-white/60 mb-6">Daily 2-minute lessons from real PM interviews. Free trial, no credit card.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
