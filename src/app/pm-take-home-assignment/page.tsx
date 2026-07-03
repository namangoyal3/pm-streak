import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Take-Home Assignment Guide (2026) — How to Crack Written PM Case Studies",
  description:
    "How to crack PM take-home assignments. Structure, time management, how to stand out, and common mistakes that get otherwise-strong candidates rejected.",
  keywords: [
    "PM take home assignment", "PM case study take home",
    "written PM interview", "PM assignment template",
    "PM case study template 2026",
  ],
  alternates: { canonical: "/pm-take-home-assignment" },
  openGraph: {
    title: "PM Take-Home Assignment Guide 2026 — PM Streak",
    description: "How to crack PM take-home assignments — structure, stand-out, and common mistakes.",
    url: `${SITE_URL}/pm-take-home-assignment`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Take-Home+Assignment+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Take-Home Assignment Guide 2026 — PM Streak",
    description: "How to crack PM take-home assignments — structure, stand-out, and common mistakes.",
    images: [`${SITE_URL}/api/og?title=PM+Take-Home+Assignment+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const STRUCTURE = [
  { section: "Executive summary (half page)", what: "30-second read: problem, your recommendation, expected impact." },
  { section: "Problem framing (1 page)", what: "Why this matters, who&apos;s affected, what evidence drove prioritisation." },
  { section: "User insight (1 page)", what: "Specific personas with specific pains. Include user quotes if possible (invented/hypothetical OK)." },
  { section: "Options explored (1 page)", what: "3 alternatives with pros/cons. Shows rigour — picking a solution without showing alternatives reads as narrow." },
  { section: "Recommendation (1 page)", what: "Your chosen solution. What, why, what it replaces, what it looks like (sketch OK)." },
  { section: "Success metrics (half page)", what: "Primary + 2–3 guardrail metrics. Targets with baselines." },
  { section: "Risks &amp; mitigations (half page)", what: "Top 3 things that could go wrong and how you&apos;d address them." },
  { section: "What you&apos;re NOT doing (half page)", what: "Explicit deferrals. Signals senior-PM thinking." },
];

const TIME_BUDGET = [
  { phase: "Hours 1–2: Understand the prompt deeply", what: "Re-read twice. Identify the underlying question. Note ambiguities." },
  { phase: "Hours 2–5: Research and ideate", what: "Competitor teardowns, existing product data, user interviews (if time). Generate 5+ options." },
  { phase: "Hours 5–8: Draft", what: "Write everything fast without polish. 70% quality, get words on page." },
  { phase: "Hours 8–10: Refine", what: "Cut 20% of length. Sharpen language. Check for consistency." },
  { phase: "Hours 10–12: Review", what: "Share with a trusted PM friend if possible. Read aloud. Fix typos and awkward phrases." },
];

const STANDOUT_MOVES = [
  "Specific users with specific quotes — not &apos;our users.&apos; Even hypothetical quotes beat generic personas",
  "Show alternatives you rejected and WHY — reveals thinking quality",
  "Pre-launch metric targets with baselines — &apos;D7 retention from 22% to 30%&apos; beats &apos;improve retention&apos;",
  "A clear &apos;what we&apos;re NOT doing&apos; section — signals senior judgment",
  "One well-annotated wireframe or diagram — more memorable than 5 pages of text",
  "Honest risks — not &apos;this will definitely work.&apos; Hiring managers distrust overconfidence",
];

const MISTAKES = [
  "Going over the word/page limit — ignores the constraint, signals poor judgment",
  "Feature dump with no prioritisation — 10 features listed is not a recommendation",
  "No concrete metrics — &apos;improve engagement&apos; is not a success criterion",
  "Copy-pasting frameworks without applying them — interviewers see through it",
  "No user insight — pure strategy without empathy reads as consulting, not PM",
  "Submitting the absolute last minute — missed typos, weak polish",
];

const FAQS = [
  {
    q: "How long should a PM take-home assignment take?",
    a: "The prompt usually suggests 4–8 hours. Spend roughly 1.5x what they say — over-investing by 50% signals you care. But stop at 2x — going dramatically over signals poor judgment. The sweet spot: if they say 6 hours, spend 8–10.",
  },
  {
    q: "Should take-home assignments have a recommendation or explore multiple options?",
    a: "Both. Present 3 options with trade-offs, then make a specific recommendation. Take-homes that only explore options without committing to one signal indecisiveness. Take-homes that only recommend without showing alternatives signal narrow thinking. The magic is: &apos;Here are 3 options. Here&apos;s the one I&apos;d pick and why.&apos;",
  },
  {
    q: "How do PMs make take-homes stand out?",
    a: "Three things consistently separate top submissions: (1) specific user insight with quotes or vignettes, (2) explicit trade-offs with a clear &apos;what we&apos;re NOT doing&apos; section, (3) metric targets with baselines — not generic &apos;improve X.&apos; Strong take-homes feel like a real PM&apos;s work, not an interview response.",
  },
];

export default function PmTakeHomeAssignmentPage() {
  const dates = pageDates("/pm-take-home-assignment");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Take-Home Assignment", url: `${SITE_URL}/pm-take-home-assignment` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Take-Home Assignment Guide (2026 Edition)",
        description:
          "How to crack PM take-home assignments. Structure, time management, how to stand out, and common mistakes that get otherwise-strong candidates rejected.",
        image: `${SITE_URL}/api/og?title=PM+Take-Home+Assignment+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-take-home-assignment`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📝</span> Take-home = your written portfolio. Treat it like one.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Take-Home Assignment Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            A strong PM take-home follows an eight-section structure — summary, problem framing, user
            insight, options explored, recommendation, success metrics, risks, and explicit non-goals —
            built across a five-phase time budget that runs from understanding the prompt through drafting
            to a final read-aloud review before submission.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline font-semibold">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The 8-section structure, 5-phase time budget, 6 stand-out moves,
            and 6 mistakes that get otherwise-strong candidates rejected.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice Written PM Cases Daily — Free →
          </Link>
        </section>

        {/* Structure */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">8-Section Structure</h2>
          <div className="space-y-3">
            {STRUCTURE.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-white text-sm mb-1">{i + 1}. {s.section}</p>
                <p className="text-xs text-white/60">{s.what}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Time budget */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5-Phase Time Budget (for 10-hour total)</h2>
            <div className="space-y-3">
              {TIME_BUDGET.map((t, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-white text-sm mb-1">{i + 1}. {t.phase}</p>
                  <p className="text-xs text-white/60">{t.what}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Standout */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Moves That Stand Out</h2>
          <div className="space-y-2">
            {STANDOUT_MOVES.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-green-400 font-bold flex-shrink-0">✓</span>
                <p className="text-sm text-white/70">{s}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mistakes */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Mistakes to Avoid</h2>
            <div className="space-y-2">
              {MISTAKES.map((m, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-red-400 flex-shrink-0">❌</span>
                  <p className="text-sm text-white/70">{m}</p>
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

        <RelatedPages slug="pm-take-home-assignment" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Written Cases Daily</h2>
          <p className="text-white/60 mb-6">Daily PM scenarios that build the thinking and writing take-homes require.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
