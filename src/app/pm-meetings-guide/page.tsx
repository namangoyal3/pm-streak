import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Meetings Guide (2026) — How to Run Meetings Your Team Thanks You For",
  description:
    "How PMs run meetings that don&apos;t waste time. Types of meetings, agenda templates, when to cancel, and how to keep meetings short, decisive, and valuable.",
  keywords: [
    "PM meetings guide", "product manager meetings",
    "how to run PM meetings", "meeting agenda PM",
    "reduce meetings PM 2026",
  ],
  alternates: { canonical: "/pm-meetings-guide" },
  openGraph: {
    title: "PM Meetings Guide 2026 — PM Streak",
    description: "How PMs run meetings teams thank you for — agendas, cancelling, and running tight.",
    url: `${SITE_URL}/pm-meetings-guide`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Meetings+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Meetings Guide 2026 — PM Streak",
    description: "How PMs run meetings teams thank you for — agendas, cancelling, and running tight.",
    images: [`${SITE_URL}/api/og?title=PM+Meetings+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const TYPES = [
  {
    type: "Decision meeting",
    goal: "Make a specific decision with the right people in the room",
    rules: ["Name the decision in the invite", "Pre-read sent 24 hours before", "Decision maker + 3-5 inputs maximum", "End with: decision made, owner, timeline"],
  },
  {
    type: "Alignment meeting",
    goal: "Get cross-functional teams on the same page for a launch or initiative",
    rules: ["Shared doc open during meeting", "Each function reports: on-track/at-risk/blocked", "PM owns the synthesis at the end", "Async follow-up for details, not more meetings"],
  },
  {
    type: "Review meeting (design, PRD, launch retro)",
    goal: "Get structured feedback on a specific artefact",
    rules: ["Artefact circulated beforehand", "Reviewer reads before meeting — enforced", "Discussion = not explanation", "Action items captured with owners"],
  },
  {
    type: "Stand-up",
    goal: "15-minute async-style update, surface blockers fast",
    rules: ["Each person: done, next, blocked", "No detailed discussions — take offline", "If longer than 20 min, something&apos;s wrong with the meeting structure", "Async in Slack is often better"],
  },
  {
    type: "Brainstorm",
    goal: "Generate ideas, not decide — usually for discovery or ideation",
    rules: ["Explicitly no critique during ideation", "Time-boxed to 45 min max", "End with clustered ideas, not a decision", "Decision meeting should follow separately"],
  },
];

const CANCEL_CRITERIA = [
  "No clear agenda sent 24 hours before — cancel or postpone",
  "No decision to be made and no real blockers — do it async",
  "Same group met last week with no new inputs — skip",
  "More than 8 people — too big to decide, convert to async update",
  "Only 1 person has information others need — they should write a doc instead",
];

const RUNNING_RULES = [
  "Start on time. End early when possible.",
  "State the purpose and desired outcome in the first 30 seconds",
  "Drive to decision, not to consensus — consensus is optional",
  "Park tangents (&apos;Let&apos;s take that offline&apos;)",
  "Last 5 min: recap decisions, owners, next steps",
  "Send written follow-up within 24 hours",
];

const FAQS = [
  {
    q: "How do PMs reduce meeting overload?",
    a: "Audit your calendar quarterly. Ask: for each recurring meeting, would I notice if this disappeared for a month? If no, cancel it. For the rest, make them shorter and tighter. PMs who shave 5 hours/week from meetings reclaim a massive amount of strategic work time. The hidden cost of meetings is the deep work they crowd out.",
  },
  {
    q: "Should PMs attend every engineering meeting?",
    a: "No. Attend stand-ups (to stay aligned), sprint planning (to own scope), and retrospectives (to hear what&apos;s working/not). Skip detailed architecture reviews unless there&apos;s a product trade-off. Skip 1:1s between engineers. Over-attending erodes trust (engineers feel surveilled) and eats your time. Being &apos;present when it matters&apos; is more valuable than being &apos;present always.&apos;",
  },
];

export default function PmMeetingsGuidePage() {
  const dates = pageDates("/pm-meetings-guide");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Meetings Guide", url: `${SITE_URL}/pm-meetings-guide` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Meetings Guide (2026 Edition)",
        description:
          "How PMs run meetings that don&apos;t waste time. Types of meetings, agenda templates, when to cancel, and how to keep meetings short, decisive, and valuable.",
        image: `${SITE_URL}/api/og?title=PM+Meetings+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-meetings-guide`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📆</span> Great PMs run fewer, shorter, sharper meetings
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Meetings Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Not every PM meeting deserves to exist: decision meetings, alignment meetings,
            review meetings, stand-ups, and brainstorms each serve a different purpose and
            should be cancelled when there&apos;s no clear agenda, no decision to make, or more
            than eight people in the room. Meetings worth keeping run tight — a stated purpose
            in the first 30 seconds, a drive to decision over consensus, and written follow-up
            within 24 hours.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 types of PM meetings with rules for each, 5 signs a meeting should be cancelled,
            and 6 rules for running meetings your team thanks you for.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Execution Muscle Daily — Free →
          </Link>
        </section>

        {/* Types */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Types of PM Meetings</h2>
          <div className="space-y-5">
            {TYPES.map((t, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <p className="font-bold text-white mb-1">{i + 1}. {t.type}</p>
                <p className="text-sm text-[#89e219] mb-3">🎯 Goal: {t.goal}</p>
                <ul className="space-y-1">
                  {t.rules.map((r, j) => (
                    <li key={j} className="flex gap-2 text-sm">
                      <span className="text-white/30 flex-shrink-0">→</span>
                      <span className="text-white/70">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Cancel criteria */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Signs to Cancel the Meeting</h2>
            <div className="space-y-2">
              {CANCEL_CRITERIA.map((c, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-red-400 flex-shrink-0">🚫</span>
                  <p className="text-sm text-white/70">{c}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Running rules */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Rules for Running Any Meeting</h2>
          <div className="space-y-2">
            {RUNNING_RULES.map((r, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{r}</p>
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

        <RelatedPages slug="pm-meetings-guide" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Execution Muscle Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on facilitation, decision-making, and alignment.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
