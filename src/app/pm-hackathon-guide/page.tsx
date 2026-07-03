import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Hackathon Guide (2026) — How to Win Internal & External Hackathons",
  description:
    "How PMs win hackathons. Scoping the right problem, fast user validation, shipping something demo-able in 36 hours, and making the pitch land.",
  keywords: [
    "PM hackathon guide", "product manager hackathon",
    "hackathon strategy PM", "win hackathon",
    "internal hackathon PM 2026",
  ],
  alternates: { canonical: "/pm-hackathon-guide" },
  openGraph: {
    title: "PM Hackathon Guide 2026 — PM Streak",
    description: "How PMs win hackathons — problem scoping, fast validation, demo-able builds, and great pitches.",
    url: `${SITE_URL}/pm-hackathon-guide`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Hackathon+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Hackathon Guide 2026 — PM Streak",
    description: "How PMs win hackathons — problem scoping, fast validation, demo-able builds, and great pitches.",
    images: [`${SITE_URL}/api/og?title=PM+Hackathon+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PHASES = [
  {
    phase: "Hour 0–2: Scope the right problem",
    actions: ["Pick a problem that is specific, urgent, and understood by judges", "Avoid moonshot ideas that can&apos;t demo — feasibility beats ambition", "Write a one-line problem statement: user + pain + outcome"],
  },
  {
    phase: "Hour 2–6: Validate fast",
    actions: ["Talk to 3 real users about the problem — 15 min each", "Draw the simplest solution sketch that addresses the pain", "Decide on ONE thing to demo — not 5 features"],
  },
  {
    phase: "Hour 6–28: Build the demo",
    actions: ["Ship the happy path only — no edge cases, no polish beyond demo quality", "Fake what you can: Wizard of Oz, Figma mocks, hardcoded data", "Get engineering unblocked — PM&apos;s job is to keep them shipping, not adding"],
  },
  {
    phase: "Hour 28–34: Prepare the pitch",
    actions: ["Write the 3-minute pitch: problem, insight, demo, impact, ask", "Rehearse 3 times out loud — time it", "Record yourself — watch back, cut filler, sharpen story"],
  },
  {
    phase: "Hour 34–36: Pitch & iterate on feedback",
    actions: ["Open with the user problem — hook judges in 20 seconds", "Show don&apos;t tell — demo runs the middle of the pitch", "Close with a clear ask: &apos;here&apos;s what we&apos;d need to take this further&apos;"],
  },
];

const WINNING_PATTERNS = [
  "Specific user problem > generic market opportunity",
  "Working demo (even scrappy) > slide deck with ambitious vision",
  "Single compelling moment in demo > feature parade",
  "Clear business impact narrative > technical wizardry",
  "Diverse team (eng + design + PM) > all-engineer team",
  "Rehearsed pitch > extemporaneous demo",
];

const MISTAKES = [
  "Spending Hour 0–6 debating problem choice — pick and commit in 2 hours max",
  "Trying to build 5 features instead of 1 polished flow",
  "Skipping user validation — &apos;we know the problem&apos; is usually wrong",
  "Engineering going rogue on tech stack choices that don&apos;t ship in time",
  "Pitch attempts to explain everything — judges tune out at minute 2",
  "Not prepping answers for the 3 obvious judge questions",
];

const FAQS = [
  {
    q: "How important are hackathons for PM careers?",
    a: "High leverage for mid-level and senior PMs — they showcase judgment under time pressure, team leadership, and shipping capability in a visible way. Internal hackathon wins often become real products and promotion triggers. External hackathons build network and portfolio. They&apos;re especially powerful for PMs who can&apos;t easily demonstrate these skills in day-to-day work.",
  },
  {
    q: "What&apos;s the biggest mistake PMs make in hackathons?",
    a: "Over-scoping. 36 hours is less than it feels — after setup, sleep, and debugging, you have maybe 20 productive hours. Winning teams pick ONE thing, build it well, and rehearse the pitch. Teams that try to build &apos;the whole vision&apos; end up with a broken prototype and an apologetic demo.",
  },
  {
    q: "What&apos;s the PM&apos;s role in a hackathon?",
    a: "Three things: (1) scope and protect the problem so the team doesn&apos;t drift, (2) facilitate fast decisions when trade-offs come up — don&apos;t let debates last more than 10 minutes, (3) own the pitch and demo narrative. Engineering and design drive execution; PMs drive direction and storytelling.",
  },
];

export default function PmHackathonGuidePage() {
  const dates = pageDates("/pm-hackathon-guide");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Hackathon Guide", url: `${SITE_URL}/pm-hackathon-guide` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Hackathon Guide (2026 Edition)",
        description:
          "How PMs win hackathons. Scoping the right problem, fast user validation, shipping something demo-able in 36 hours, and making the pitch land.",
        image: `${SITE_URL}/api/og?title=PM+Hackathon+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-hackathon-guide`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>⚡</span> 36 hours. One demo. The difference is PM discipline.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Hackathon Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Winning a PM hackathon in 36 hours comes down to five phases: scoping one specific, judge-understood problem in the first two hours, validating it with three real users, building only the happy-path demo while faking the rest, rehearsing a 3-minute pitch, then opening with the user problem and closing with a clear ask. Teams that scope tightly and rehearse beat teams chasing five features.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The 5-phase hackathon playbook, 6 winning patterns,
            and the 6 scope mistakes that cost teams the top spot.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Train for Rapid PM Decisions — Free →
          </Link>
        </section>

        {/* Phases */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">The 5 Phases of a 36-Hour Hackathon</h2>
          <div className="space-y-5">
            {PHASES.map((p, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <p className="font-bold text-white mb-3">{i + 1}. {p.phase}</p>
                <ul className="space-y-1">
                  {p.actions.map((a, j) => (
                    <li key={j} className="flex gap-2 text-sm">
                      <span className="text-white/30 flex-shrink-0">→</span>
                      <span className="text-white/70">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Winning patterns */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Winning Patterns</h2>
            <div className="space-y-2">
              {WINNING_PATTERNS.map((p, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">✓</span>
                  <p className="text-sm text-white/70">{p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mistakes */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Hackathon Mistakes</h2>
          <div className="space-y-2">
            {MISTAKES.map((m, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-red-400 flex-shrink-0">❌</span>
                <p className="text-sm text-white/70">{m}</p>
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

        <RelatedPages slug="pm-hackathon-guide" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Sharpen PM Decision Speed Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios that train the time-boxed trade-offs hackathons demand.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
