/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "Deep Work for Product Managers (2026) — Focus Strategies That Ship More",
  description: "How PMs can practice deep work in noisy environments. Block focus time, reduce context switching, protect your highest-leverage hours, and ship more with Cal Newport's framework adapted for product management.",
  keywords: [
    "deep work for product managers",
    "PM focus strategies",
    "product manager concentration techniques",
    "how PMs avoid distraction",
    "deep work schedule PM",
    "PM productivity 2026",
    "context switching product manager",
  ],
  alternates: { canonical: "/pm-deep-work" },
  openGraph: {
    title: "Deep Work for Product Managers 2026 — PM Streak",
    description: "The Cal Newport framework adapted for PMs. How to protect your best hours and do your most important product work.",
    url: `${SITE_URL}/pm-deep-work`,
    images: [{ url: `${SITE_URL}/api/og?title=Deep+Work+for+Product+Managers+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deep Work for Product Managers 2026 — PM Streak",
    description: "The Cal Newport framework adapted for PMs. How to protect your best hours and do your most important product work.",
    images: [`${SITE_URL}/api/og?title=Deep+Work+for+Product+Managers+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const WHY_PMS_STRUGGLE = [
  {
    point: "The interruption tax is enormous",
    detail:
      "A 5-minute Slack message doesn't cost 5 minutes — it costs 23 minutes (Gloria Mark, UC Irvine). PMs average 3.5 hours of interruptions daily. After each one, you're back to square one on any complex thinking.",
  },
  {
    point: "Strategy requires long blocks — PMs rarely get them",
    detail:
      "Roadmap planning, strategy docs, and tradeoff analysis are deep work. But the meeting-heavy PM schedule treats them as overflow work done between standups.",
  },
  {
    point: "Your job IS communication — which makes focus harder",
    detail:
      "Unlike engineers who have defended coding blocks, PMs are expected to be always-on. 'Being responsive' feels like the job. It isn't — but it crowds out everything that matters.",
  },
];

const DEEP_WORK_STRATEGIES = [
  {
    strategy: "The 90-Minute Focus Block",
    how: "Schedule 90-minute blocks on your calendar labeled 'Deep Work — Do Not Disturb.' Treat them like a meeting with your most important stakeholder: you.",
    why: "Research from Perelman et al. (2022) shows 90 minutes is the optimal unit for cognitively demanding work — long enough for a full productive cycle, short enough to fit around meeting-heavy schedules.",
  },
  {
    strategy: "Theme Days",
    how: "Assign each day of the week a focus theme: 'Discovery Day,' 'Execution Day,' 'Strategy Day.' Batch similar work. Monday is roadmap, Tuesday is specs, Wednesday is user interviews.",
    why: "Context switching between PM disciplines costs ~40% of productive capacity (Sull, Sull & Thorngate, MIT Sloan, 2024). Batching eliminates the tax.",
  },
  {
    strategy: "The Morning Shield",
    how: "Protect 9–11 AM for zero communication. No Slack, no email, no meetings. Use Slack's scheduled send and email's delay delivery to maintain responsiveness without real-time availability.",
    why: "Most PMs do their best analytical work in the morning. Cal Newport's research on knowledge workers shows that those who protect morning hours produce 2–3x more high-quality output.",
  },
  {
    strategy: "Low-Stakes Communication Batching",
    how: "Check Slack and email at 3 fixed times: 9 AM, 1 PM, 5 PM. Use status messages: 'Deep Work until 1 PM — will respond then.' Set expectations with your team at the start of each week.",
    why: "You can be highly responsive (within 4 hours) without being continuously available. Most PM emergencies are not actual emergencies.",
  },
  {
    strategy: "The 'One Deep Project' Rule",
    how: "Each sprint, identify the ONE project that requires deep thinking. Protect 4–6 hours of focused time per week exclusively for that project. Everything else can survive interruption.",
    why: "PM breadth makes it easy to stay busy on shallow work. The one-project rule forces prioritization and creates accountability for the work that actually moves the needle.",
  },
  {
    strategy: "Physical or Digital Boundaries",
    how: "Use noise-canceling headphones with 'do not disturb' as a social signal. In open offices: sit with engineers during focus blocks. Online: use apps like Cold Turkey or Freedom to block distracting sites during deep work windows.",
    why: "Environmental design matters more than willpower. The social signal of headphones alone reduces interruption rates by 60% (Mark et al., 2016).",
  },
];

const PROTECTING_FROM_MEETINGS = [
  {
    tactic: "Adopt the 'propose an async alternative' habit",
    detail:
      "When invited to a meeting, reply: 'Happy to discuss async — I've written up my perspective here. LMK if a meeting is still needed.' This works 40–60% of the time for ad-hoc requests.",
  },
  {
    tactic: "Make your deep work blocks visible",
    detail:
      "Share your focus schedule with your team at the start of each week. A Slack message like 'Focus blocks this week: Tue 10–12, Thu 9–11 — ping me only for P0s' removes the social cost of being unavailable.",
  },
  {
    tactic: "End meetings early by default",
    detail:
      "Block 25-minute meetings instead of 30. Block 50-minute instead of 60. This creates natural buffer for deep recovery and signals to the org that your time has structure.",
  },
  {
    tactic: "Own your standup format",
    detail:
      "If your standup is a status report, propose async standups via a shared doc or Slack thread. Use meeting time for decisions and unblocking — not information sharing.",
  },
];

const METRICS_TO_TRACK = [
  {
    what: "Hours in true focus blocks per week",
    why: "Intentional time tracking surfaces the gap between what you think you're doing and what you're actually doing. Most PMs report 2–3 hours; they believe it's 5–6.",
  },
  {
    what: "Decisions made in focus vs. reactive mode",
    why: "Quality of decisions differs dramatically by cognitive state. Track how many important decisions were made during focus blocks vs. in hallway conversations or back-to-back meetings.",
  },
  {
    what: "Weekly output quality (self-assessed)",
    why: "At the end of each week, score your best work. Over time, you'll see the correlation between focus hours and output quality — which is the real argument for protecting your time.",
  },
];

const FAQS = [
  {
    q: "Can product managers really do deep work when they're expected to be always available?",
    a: "Yes — but it requires deliberate structural changes, not just good intentions. The most effective PMs batch communication, protect morning hours, and use async channels to maintain responsiveness without sacrificing focus. The key is making your availability patterns visible and predictable so your team doesn't feel surprised when you're less available at certain times.",
  },
  {
    q: "How many hours of deep work should a PM aim for per day?",
    a: "Most productivity research on knowledge workers suggests 3–4 hours of true deep work per day is the realistic ceiling. Beyond 4 hours, cognitive returns diminish significantly. For PMs, 2–3 hours of genuinely uninterrupted strategic thinking per day is enough to produce excellent roadmaps, specs, and analyses — if those hours are protected.",
  },
  {
    q: "What if my team doesn't respect my focus blocks?",
    a: "The issue is almost always visibility, not intent. If your calendar shows focus blocks but no one knows you're unavailable, they'll ping you anyway. Make your schedule visible in Slack, announce it in your weekly team sync, and respond to non-P0 interruptions during focus blocks with a delayed-but-friendly message. Consistency over 2–3 weeks builds the norm.",
  },
  {
    q: "Is deep work compatible with an agile sprint cadence?",
    a: "Absolutely — with one adjustment. During sprint planning and execution, focus blocks may need to be shorter (60–75 minutes). The key is protecting at least some uninterrupted time each day. Even 45 minutes of genuine focus before lunch is more productive than 3 hours of interrupted time.",
  },
  {
    q: "How do I balance deep work with the urgent requests that PMs deal with daily?",
    a: "Distinguish between urgent and important (the Eisenhower matrix). Most PM 'fires' are urgent but low-importance — a Slack question, a quick review request, a status update. Protect 1–2 hours for important-but-not-urgent work: roadmap thinking, strategy, root-cause analysis. Let the urgent stuff wait a few hours. The world rarely ends.",
  },
];

export default function PMDeepWorkPage() {
  const dates = pageDates("/pm-deep-work");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Skills Guide", url: `${SITE_URL}/pm-productivity-guide` },
        { name: "Deep Work for PMs", url: `${SITE_URL}/pm-deep-work` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Deep Work for Product Managers (2026) — Focus Strategies That Ship More",
        description: "How PMs can practice deep work in noisy environments. Block focus time, reduce context switching, protect your highest-leverage hours, and ship more with Cal Newport's framework adapted for product management.",
        image: `${SITE_URL}/api/og?title=Deep+Work+for+Product+Managers+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-deep-work`,
      })} />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/pm-productivity-guide" className="hover:text-primary">PM Skills</Link>
            <span>/</span>
            <span className="text-gray-900">Deep Work for PMs</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Deep Work for Product Managers (2026) — Focus Strategies That Ship More
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed mb-2">
            Deep work for PMs means deliberately protecting blocks of uninterrupted time despite a job built around constant coordination — a single Slack interruption costs roughly 23 minutes of refocusing, and PMs average 3.5 hours of interruptions a day. The fix is structural: 90-minute focus blocks, theme days that batch similar work, a protected morning shield, and fixed communication check-ins instead of always-on availability.
          </p>
          <p className="text-sm text-gray-500 mb-4">
            By <a href={AUTHOR_URL} className="text-primary hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            PMs are among the most context-switched workers in tech. Between stakeholder calls, Slack pings, roadmap updates, and sprint ceremonies, most product managers report being unable to complete a single uninterrupted thought during the workday. This guide applies Cal Newport's deep work framework specifically to the PM role — with strategies that actually fit a meeting-heavy schedule.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {["deep work PM", "PM focus strategies", "product manager productivity", "context switching PM"].map((tag) => (
              <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        </header>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why Deep Work Is Especially Hard for PMs
          </h2>
          <p className="text-gray-600 mb-4">
            Every knowledge worker struggles with focus. But product managers face a structural disadvantage — their job is, at its core, a coordination role. Unlike an engineer's 'core time' (writing code) or a designer's 'creative time' (making designs), a PM's deliverables are distributed across every other function's workflow. That makes protection of deep thinking time genuinely harder — and more important.
          </p>
          <div className="space-y-4">
            {WHY_PMS_STRUGGLE.map((item) => (
              <div key={item.point} className="bg-gray-50 border-l-4 border-primary pl-4 py-2">
                <h3 className="font-semibold text-gray-900 mb-1">{item.point}</h3>
                <p className="text-gray-600 text-sm">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Six Deep Work Strategies for Product Managers
          </h2>
          <div className="space-y-6">
            {DEEP_WORK_STRATEGIES.map((s, i) => (
              <div key={s.strategy} className="border rounded-lg p-5 shadow-sm">
                <div className="flex items-start gap-3 mb-2">
                  <span className="text-primary font-bold text-lg mt-0.5">{i + 1}.</span>
                  <h3 className="font-semibold text-gray-900 text-lg">{s.strategy}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-2">
                  <span className="font-medium text-gray-800">How to do it:</span> {s.how}
                </p>
                <p className="text-gray-500 text-sm border-t pt-2">
                  <span className="font-medium text-gray-700">Why it works:</span> {s.why}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Protecting Your Time from Meetings
          </h2>
          <p className="text-gray-600 mb-4">
            The biggest deep work thief for PMs isn't Slack — it's the meeting calendar. Here's how to reclaim hours without becoming the person who 'never joins anything.'
          </p>
          <div className="space-y-3">
            {PROTECTING_FROM_MEETINGS.map((t) => (
              <div key={t.tactic} className="flex gap-3">
                <span className="text-primary font-bold">→</span>
                <div>
                  <h4 className="font-medium text-gray-900">{t.tactic}</h4>
                  <p className="text-gray-600 text-sm">{t.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What to Track
          </h2>
          <p className="text-gray-600 mb-4">
            Deep work only improves if you measure it. Self-reporting your productive hours is unreliable — most people overestimate by 2–3x. Use these metrics to get honest:
          </p>
          <div className="space-y-3">
            {METRICS_TO_TRACK.map((m) => (
              <div key={m.what} className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-1">{m.what}</h4>
                <p className="text-gray-600 text-sm">{m.why}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <details key={faq.q} className="group border rounded-lg">
                <summary className="cursor-pointer p-4 font-medium text-gray-900 hover:bg-gray-50 list-none flex justify-between items-center">
                  {faq.q}
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-4 pb-4 text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <RelatedPages slug="pm-deep-work" />

        <section className="mb-10 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Build Your PM Deep Work Habit with PM Streak
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Deep work is a skill — like product sense or stakeholder management, it compounds with daily practice. PM Streak's daily lessons include focus system modules that help you build and protect your best thinking hours. Start with 2 minutes a day.
          </p>
          <Link
            href="/lesson"
            className="inline-block bg-primary text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-colors text-sm"
          >
            Start Your Free PM Lesson →
          </Link>
        </section>

        <footer className="flex justify-between items-center text-sm text-gray-400 border-t pt-6">
          <span>Updated April 2026</span>
          <Link href="/pm-productivity-guide" className="hover:text-primary">
            ← PM Productivity Guide
          </Link>
        </footer>
      </main>
    </>
  );
}