import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Experiment Design Guide (2026) — A/B Testing for Product Managers",
  description:
    "How PMs design A/B tests that actually produce signal. Hypothesis writing, sample size, guardrail metrics, common mistakes, and when NOT to A/B test.",
  keywords: [
    "A/B testing for product managers", "PM experiment design",
    "how to run A/B tests PM", "hypothesis testing product manager",
    "A/B test sample size PM", "product manager experimentation 2026",
  ],
  alternates: { canonical: "/pm-experiment-design" },
  openGraph: {
    title: "PM Experiment Design Guide 2026 — PM Streak",
    description: "A/B testing fundamentals for PMs — hypothesis, sample size, guardrails, and common mistakes.",
    url: `${SITE_URL}/pm-experiment-design`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Experiment+Design+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Experiment Design Guide 2026 — PM Streak",
    description: "A/B testing fundamentals for PMs — hypothesis, sample size, guardrails, and common mistakes.",
    images: [`${SITE_URL}/api/og?title=PM+Experiment+Design+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const EXPERIMENT_STEPS = [
  {
    step: "Write a Falsifiable Hypothesis",
    detail: "Not 'we think new onboarding will be better.' Try: 'Changing onboarding from 5 steps to 3 steps will increase Day-7 retention from 22% to ≥26%, because we believe friction is the primary driver of drop-off.'",
    anti: "Vague hypothesis ('users will like it more') that can never be falsified.",
  },
  {
    step: "Define Primary and Guardrail Metrics",
    detail: "Primary: one metric that defines success. Guardrails: 2–3 metrics that must not degrade. Example: primary = activation rate; guardrails = D1 uninstall rate, support ticket volume, funnel step-2 completion.",
    anti: "Picking only the primary metric. A feature that wins on activation but increases uninstalls by 10% is a net loss.",
  },
  {
    step: "Calculate Required Sample Size",
    detail: "Use a sample size calculator. Inputs: baseline metric, minimum detectable effect (MDE), significance (0.05), power (0.8). Example: for a 20% → 25% conversion lift on a 5,000/day funnel, you need ~14 days.",
    anti: "Running the test for 'however long feels right.' Small samples produce false positives; stopping too early inflates winners.",
  },
  {
    step: "Randomise Correctly",
    detail: "Users — not sessions — are usually the right unit of randomisation. For marketplaces, geographies or dark stores may be better units to avoid spillover. Test your randomisation with an A/A test before high-stakes launches.",
    anti: "Randomising sessions when users visit multiple times, creating contamination across variants.",
  },
  {
    step: "Run for the Pre-Determined Window",
    detail: "Don't peek. Don't stop early because the number looks good on Day 3. Pre-commit to a sample size or duration and don't deviate without a strong pre-stated reason.",
    anti: "Stopping when significance is first hit ('peeking'). This is the #1 cause of false positives in product A/B tests.",
  },
  {
    step: "Analyse and Decide",
    detail: "Check: did primary metric move significantly? Did guardrails stay healthy? Are there user segments with opposite results? Decide: ship, kill, or iterate. Document learnings either way.",
    anti: "Shipping a flat test because 'the feature feels right.' A/B tests exist to make the decision — respect the result.",
  },
];

const NO_TEST_CASES = [
  { case: "Obvious bug fixes", why: "If the old behaviour was broken, you don't need to 'test' fixing it." },
  { case: "Irreversible changes (infrastructure migrations, compliance)", why: "Testing has no meaning when you can't choose to revert." },
  { case: "Strong prior + small traffic", why: "With 100 users/day on a funnel, you physically can't collect enough data. Ship on judgment." },
  { case: "Brand/strategy decisions", why: "A/B tests optimise locally. Brand changes are strategic bets that often show no short-term metric lift." },
  { case: "Cosmetic/copy changes with near-zero risk", why: "Ship and monitor — the cost of running a full experiment exceeds the value." },
  { case: "Features with delayed metrics (yearly retention)", why: "You can't wait 12 months to test. Use proxy metrics or judgment + monitoring." },
];

const COMMON_MISTAKES = [
  { mistake: "Testing too many things at once", fix: "Isolate one change per test. If you bundle 3 changes and the test wins, you don't know which change drove it." },
  { mistake: "Measuring the wrong metric", fix: "The metric should match the hypothesis. If the hypothesis is about activation, don't judge on revenue." },
  { mistake: "Ignoring novelty effects", fix: "New features often get a Week 1 bump that fades. Run tests for at least 2 full weekly cycles." },
  { mistake: "Not segmenting results", fix: "A flat aggregate test can hide huge wins in one segment and losses in another. Always look at segments." },
  { mistake: "Declaring winners based on p-value alone", fix: "A statistically significant 0.2% lift may not be worth shipping. Check effect size AND significance." },
  { mistake: "Running too many parallel tests", fix: "Multiple tests in the same funnel interfere. Coordinate with other PMs to sequence or segment traffic." },
];

const FAQS = [
  {
    q: "How long should a typical A/B test run?",
    a: "Minimum 7 days to cover one weekly cycle. Most tests run 14 days to capture two cycles and mitigate day-of-week effects. For high-traffic consumer products, 7–14 days is typical. For B2B or low-traffic products, tests may need to run 30–60 days — or you may need to rely on judgment instead.",
  },
  {
    q: "What's the minimum traffic needed to run an A/B test?",
    a: "Depends on baseline metric and desired minimum detectable effect (MDE). Rule of thumb: for a 10% relative lift on a metric with 20% baseline, you need roughly 5,000–10,000 users per variant. Below 1,000 daily active users on the tested surface, most tests won't produce significant results in reasonable time — rely on judgment and qualitative signal.",
  },
  {
    q: "What's a 'guardrail metric' and why does it matter?",
    a: "A guardrail metric is something your experiment must NOT break, even if your primary metric wins. Example: your hypothesis is 'bigger CTA buttons will increase click-through.' Primary: CTR. Guardrail: time-on-page (the page shouldn't become less useful). A feature that wins on CTR but destroys time-on-page is not a win — it's a regression. PMs who don't define guardrails regularly ship false positives that look good in isolation but hurt user experience.",
  },
];

export default function PmExperimentDesignPage() {
  const dates = pageDates("/pm-experiment-design");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Experiment Design", url: `${SITE_URL}/pm-experiment-design` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Experiment Design Guide (2026 Edition)",
        description: "How PMs design A/B tests that actually produce signal. Hypothesis writing, sample size, guardrail metrics, common mistakes, and when NOT to A/B test.",
        image: `${SITE_URL}/api/og?title=PM+Experiment+Design+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-experiment-design`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔬</span> Most A/B tests don&apos;t produce signal. Designed ones do.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Experiment Design Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Designing a PM experiment starts with a falsifiable hypothesis, then locks in a primary
            metric plus two or three guardrail metrics, calculates the sample size needed for your
            baseline and minimum detectable effect, randomises correctly, and runs for a
            pre-committed window — usually 7 to 14 days — before deciding to ship, kill, or iterate.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 steps to design A/B tests that produce real signal, when NOT to A/B test at all,
            and the 6 mistakes that make most PM experiments worthless.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice Experiment Scenarios — Free →
          </Link>
        </section>

        {/* Steps */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">The 6-Step Experiment Design Process</h2>
          <div className="space-y-4">
            {EXPERIMENT_STEPS.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-5">
                <div className="flex items-start gap-3 mb-2">
                  <span className="w-7 h-7 rounded-full bg-[#58cc02]/20 text-[#89e219] font-bold text-sm flex items-center justify-center flex-shrink-0">{i + 1}</span>
                  <h3 className="font-semibold text-white">{s.step}</h3>
                </div>
                <p className="text-sm text-white/70 mb-2 ml-10">{s.detail}</p>
                <div className="ml-10 bg-red-500/5 border border-red-500/20 rounded-lg px-3 py-2">
                  <p className="text-xs text-red-400">❌ Anti-pattern: {s.anti}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* When NOT to test */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">When NOT to Run an A/B Test</h2>
            <div className="space-y-3">
              {NO_TEST_CASES.map((n, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-white text-sm mb-1">{n.case}</p>
                  <p className="text-xs text-white/60">{n.why}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common mistakes */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Common A/B Testing Mistakes</h2>
          <div className="space-y-3">
            {COMMON_MISTAKES.map((m, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <div className="flex gap-3 items-start">
                  <span className="text-red-400 text-sm flex-shrink-0 mt-0.5">❌</span>
                  <div>
                    <p className="text-sm text-white/70 mb-1">{m.mistake}</p>
                    <p className="text-sm text-green-400">→ {m.fix}</p>
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

        <RelatedPages slug="pm-experiment-design" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Experimentation Intuition Daily</h2>
          <p className="text-white/60 mb-6">Real A/B test scenarios with AI feedback on hypothesis quality and metric selection.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
