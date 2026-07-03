import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Interview Red Flags (2026) — 10 Things That Get Candidates Rejected",
  description:
    "The 10 red flags that get PM candidates rejected — even when their answers seem fine. What interviewers catch that candidates miss, and how to avoid each.",
  keywords: [
    "PM interview red flags", "why PMs get rejected",
    "PM interview mistakes", "product manager rejection reasons",
    "what interviewers look for PM 2026",
  ],
  alternates: { canonical: "/pm-interview-red-flags" },
  openGraph: {
    title: "PM Interview Red Flags 2026 — PM Streak",
    description: "10 red flags that get PM candidates rejected — and how to avoid each.",
    url: `${SITE_URL}/pm-interview-red-flags`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Interview+Red+Flags+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Interview Red Flags 2026 — PM Streak",
    description: "10 red flags that get PM candidates rejected — and how to avoid each.",
    images: [`${SITE_URL}/api/og?title=PM+Interview+Red+Flags+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const RED_FLAGS = [
  {
    flag: "Jumping to solutions without defining the user",
    why: "Signals feature-first thinking. Interviewers want user-first thinking.",
    fix: "Always start: &apos;Before I propose solutions, let me clarify who the user is and what they need.&apos; Even 60 seconds on user definition changes the tone of the entire answer.",
  },
  {
    flag: "Using &apos;we&apos; when asked about your impact",
    why: "Interviewers are hiring YOU, not your team. Constant &apos;we&apos; makes your personal contribution invisible.",
    fix: "Prepare stories where you can clearly distinguish &apos;I&apos; from &apos;we.&apos; Use &apos;we&apos; for team context, &apos;I&apos; for your specific action and decision.",
  },
  {
    flag: "Vague metrics (&apos;significant improvement&apos;)",
    why: "Signals you either don&apos;t know the number or didn&apos;t measure it. Both hurt.",
    fix: "Memorise specific numbers from 3–4 core stories. &apos;Improved retention from 22% to 28%&apos; beats &apos;improved retention significantly.&apos;",
  },
  {
    flag: "Can&apos;t name a failure specifically",
    why: "Experienced PMs have shipped things that failed. &apos;Nothing comes to mind&apos; signals either inexperience or defensiveness.",
    fix: "Prepare 2 specific failure stories — what happened, what you learned, what you applied later. Honest failure discussion signals maturity.",
  },
  {
    flag: "Only talks about strategy, never about execution",
    why: "Senior PMs need both. Strategy-only candidates often sound consulting-y — great frameworks, unclear shipping track record.",
    fix: "For every strategic point, pair it with a concrete example of how you implemented or would implement it. Strategy without execution is the #1 consulting-to-PM failure mode.",
  },
  {
    flag: "Rigid framework application",
    why: "Saying &apos;I&apos;ll apply the CIRCLES framework&apos; in the first sentence signals canned prep rather than thoughtful analysis.",
    fix: "Use frameworks as invisible scaffolding — they should structure your thinking without announcing themselves. Use the words &apos;user,&apos; &apos;problem,&apos; &apos;solution&apos; instead of framework names.",
  },
  {
    flag: "Doesn&apos;t know the company&apos;s product",
    why: "Shows you applied casually, not deliberately. Interviewers notice immediately and lose interest.",
    fix: "Spend 2 hours using the company&apos;s product before any interview. Know their key metrics, recent launches, and competitive positioning. &apos;I noticed X about your product&apos; is a high-signal opener.",
  },
  {
    flag: "Poor handling of pushback",
    why: "If you crumble when interviewers disagree, you&apos;ll crumble with executives. Interviewers push back specifically to test this.",
    fix: "When pushed, ask clarifying questions (&apos;What are you seeing that I&apos;m missing?&apos;), then decide: update your answer if the pushback has merit, or clearly defend if it doesn&apos;t. Both are valid — flailing is not.",
  },
  {
    flag: "Asks generic questions at the end",
    why: "&apos;What&apos;s the culture like?&apos; signals you didn&apos;t think deeply about this specific role.",
    fix: "Prepare 3 specific questions — about the role, the team, a product challenge you&apos;d inherit. Great candidates use their question time to demonstrate they&apos;ve already started thinking like a PM at the company.",
  },
  {
    flag: "Lacks a genuine point of view",
    why: "PMs who say &apos;it depends&apos; to everything without ever committing to a recommendation feel indecisive.",
    fix: "Always make a recommendation, even if caveated. &apos;Given what I know, I&apos;d lean toward X because Y — though I&apos;d want to validate Z before committing.&apos; Specific + caveated beats vague.",
  },
];

const FAQS = [
  {
    q: "What&apos;s the single biggest red flag in PM interviews?",
    a: "Jumping to solutions without defining the user. This single mistake filters out more candidates than any other — because it signals feature-first thinking when the job requires user-first thinking. Interviewers can&apos;t coach you out of this in the interview; if you skip user definition, they often write you off in the first 2 minutes.",
  },
  {
    q: "Do interviewers weigh red flags heavily or forgive them?",
    a: "It depends on the red flag. Technical mistakes (wrong framework application, missing a metric) are often forgivable if you recover well. Cultural red flags (defensiveness, can&apos;t discuss failure, no sense of ownership) are rarely forgivable — they signal traits that won&apos;t improve on the job. Great candidates recover from technical misses; they don&apos;t display cultural red flags in the first place.",
  },
  {
    q: "How do you avoid red flags in a high-pressure interview?",
    a: "Preparation + self-awareness. Record yourself doing mock interviews and watch them back — you&apos;ll catch red flags you didn&apos;t know you exhibited (hedging, rushing, vague adjectives). Have a friend call out each time you say &apos;we&apos; in a behavioural story. Red flags often emerge from nervousness, and the fix is repetition in realistic conditions.",
  },
];

export default function PmInterviewRedFlagsPage() {
  const dates = pageDates("/pm-interview-red-flags");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Interview Red Flags", url: `${SITE_URL}/pm-interview-red-flags` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "10 PM Interview Red Flags (2026 Edition)",
        description:
          "The 10 red flags that get PM candidates rejected — even when their answers seem fine. What interviewers catch that candidates miss, and how to avoid each.",
        image: `${SITE_URL}/api/og?title=PM+Interview+Red+Flags+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-interview-red-flags`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🚩</span> Most PM rejections are not about skill. They&apos;re about red flags.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            10 PM Interview Red Flags<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            The single biggest PM interview red flag is jumping to solutions before defining
            the user — it alone filters out more candidates than any other pattern. Nine more
            follow close behind: leaning on &apos;we&apos; instead of &apos;I,&apos; vague
            metrics, no specific failure story, strategy without execution, rigid
            framework-naming, not knowing the company&apos;s product, crumbling under pushback,
            generic closing questions, and never committing to a point of view.
          </p>
          <p className="text-sm text-white/50 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The 10 behaviours that get PM candidates rejected even when their answers seem fine —
            why each one matters, and how to fix it before your next interview.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Eliminate Red Flags with Daily Prep — Free →
          </Link>
        </section>

        {/* Red flags */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="space-y-5">
            {RED_FLAGS.map((r, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-5">
                <div className="flex items-start gap-3 mb-2">
                  <span className="w-7 h-7 rounded-full bg-red-500/20 text-red-400 font-bold text-sm flex items-center justify-center flex-shrink-0">{i + 1}</span>
                  <h2 className="text-base font-bold text-white">🚩 {r.flag}</h2>
                </div>
                <p className="text-sm text-white/60 mb-2 ml-10">{r.why}</p>
                <div className="ml-10 bg-green-500/5 border border-green-500/20 rounded-lg p-3">
                  <p className="text-xs text-green-400 mb-1">✅ Fix</p>
                  <p className="text-sm text-white/70">{r.fix}</p>
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

        <RelatedPages slug="pm-interview-red-flags" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Until Red Flags Disappear</h2>
          <p className="text-white/60 mb-6">Daily PM scenarios with AI feedback that specifically flags these patterns.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
