import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Experiment Velocity Guide (2026) — How to Run More Experiments Faster",
  description:
    "How top PMs run experiments 5x faster than average teams. Infrastructure, decision rules, and habits that increase learning velocity without sacrificing rigour.",
  keywords: [
    "PM experiment velocity", "product manager testing speed",
    "more experiments faster PM", "experimentation culture PM",
    "PM learning velocity 2026",
  ],
  alternates: { canonical: "/pm-experiment-velocity" },
  openGraph: {
    title: "PM Experiment Velocity Guide 2026 — PM Streak",
    description: "How top PMs run experiments 5x faster — infrastructure, rules, and habits.",
    url: `${SITE_URL}/pm-experiment-velocity`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Experiment+Velocity+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Experiment Velocity Guide 2026 — PM Streak",
    description: "How top PMs run experiments 5x faster — infrastructure, rules, and habits.",
    images: [`${SITE_URL}/api/og?title=PM+Experiment+Velocity+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const ACCELERATORS = [
  { move: "Pre-register hypotheses", detail: "Commit to what success looks like BEFORE seeing data. Stops p-hacking and lets you move to the next test faster." },
  { move: "Use minimum detectable effect (MDE) discipline", detail: "Know the smallest effect you care about before starting. Shortens runtime; prevents waiting for significance on tiny effects." },
  { move: "Run tests in parallel, not serial", detail: "Independent tests on separate user surfaces can run simultaneously. Serial-only teams are 3x slower." },
  { move: "Automate the analysis layer", detail: "Standardised dashboards for common test types mean less custom analysis per experiment. Huge time saver." },
  { move: "Default to &apos;ship the winner&apos;", detail: "When a winner is clear, don&apos;t &apos;re-test&apos; for further confidence. Ship, monitor, move on to the next bet." },
  { move: "Kill losing experiments early", detail: "If a test is clearly losing after reaching MDE, kill it. Don&apos;t let it run to &apos;full significance&apos; just because it&apos;s comfortable." },
];

const INFRASTRUCTURE = [
  { item: "Feature flag system", why: "Ship code decoupled from release. Test %-based rollouts. Revert in seconds, not days." },
  { item: "Event tracking standard", why: "Every feature has standard events at design time. No retroactive instrumentation — that&apos;s the biggest slowdown in experimentation." },
  { item: "Experiment dashboard", why: "Standard view of all running experiments, stage, results, decisions. No hunting through docs." },
  { item: "Experiment review cadence", why: "Weekly 30-min review of all running and recently-completed experiments. Decisions made; next bets picked." },
  { item: "Guardrail metric monitoring", why: "Automated alerts if a test is breaking a guardrail metric (retention, crash rate). Kill early, not after damage." },
];

const CULTURAL_HABITS = [
  "Celebrate killed experiments as wins — learning is the goal, not shipping",
  "Treat &apos;we don&apos;t know&apos; as acceptable — even preferred over guessing",
  "Share experiment results across teams — don&apos;t hoard learnings",
  "Run at least one experiment per sprint, per team — cadence beats heroics",
  "Document what didn&apos;t work AND why — future teams save time",
  "Let anyone propose experiments — not just PMs",
];

const FAQS = [
  {
    q: "How many experiments should a PM team run per quarter?",
    a: "Depends on team size and traffic. A 5-person PM team at a growth-stage company can reasonably run 15–30 experiments per quarter. Teams below 5 per quarter are probably under-experimenting; teams above 50 per quarter may be running noise. Quality of hypothesis matters more than raw count.",
  },
  {
    q: "What&apos;s the biggest experimentation mistake PMs make?",
    a: "Running experiments without pre-registered hypotheses. When you analyse data without committing to what you expected, you&apos;ll find patterns that aren&apos;t real (p-hacking). The second biggest mistake: running too long chasing significance on a test that should have been called earlier. Both come from attachment to specific outcomes rather than learning.",
  },
];

export default function PmExperimentVelocityPage() {
  const dates = pageDates("/pm-experiment-velocity");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Experiment Velocity", url: `${SITE_URL}/pm-experiment-velocity` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Experiment Velocity Guide (2026 Edition)",
        description: "How top PMs run experiments 5x faster than average teams. Infrastructure, decision rules, and habits that increase learning velocity without sacrificing rigour.",
        image: `${SITE_URL}/api/og?title=PM+Experiment+Velocity+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-experiment-velocity`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>⚡</span> Learning velocity compounds faster than feature count
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Experiment Velocity Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Teams that ship experiments faster pre-register hypotheses before looking at data, run
            independent tests in parallel instead of serially, automate the analysis layer, and
            kill clearly-losing tests early rather than chasing full significance — backed by
            infrastructure like feature flags, a standard event tracking spec, and a weekly
            experiment review cadence that turns learning velocity into a habit rather than a
            heroic effort.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 accelerators, 5 infrastructure essentials, and 6 cultural habits
            that let great PM teams ship experiments 5x faster than average.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice Experiment Design Daily — Free →
          </Link>
        </section>

        {/* Accelerators */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Velocity Accelerators</h2>
          <div className="space-y-3">
            {ACCELERATORS.map((a, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-white text-sm mb-1">{i + 1}. {a.move}</p>
                <p className="text-xs text-white/60">{a.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Infrastructure */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Infrastructure Essentials</h2>
            <div className="space-y-3">
              {INFRASTRUCTURE.map((i, j) => (
                <div key={j} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-[#89e219] text-sm mb-1">{i.item}</p>
                  <p className="text-xs text-white/60">{i.why}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cultural habits */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Cultural Habits</h2>
          <div className="space-y-2">
            {CULTURAL_HABITS.map((h, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{h}</p>
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

        <RelatedPages slug="pm-experiment-velocity" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Experimentation Intuition Daily</h2>
          <p className="text-white/60 mb-6">Daily PM scenarios on hypothesis design, metric choice, and calling winners.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
