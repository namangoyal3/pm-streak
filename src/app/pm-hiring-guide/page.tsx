import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Hiring Guide (2026) — How PMs Hire Other PMs",
  description:
    "How great PMs hire other PMs. Structured interview loops, signals to look for, the bar to hire at each level, and how to give candidates a great experience.",
  keywords: [
    "PM hiring guide", "how PMs hire PMs",
    "PM interview rubric", "PM hiring signals",
    "PM hiring india 2026",
  ],
  alternates: { canonical: "/pm-hiring-guide" },
  openGraph: {
    title: "PM Hiring Guide 2026 — PM Streak",
    description: "How great PMs hire other PMs — structured loops, signals, and rubrics.",
    url: `${SITE_URL}/pm-hiring-guide`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Hiring+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Hiring Guide 2026 — PM Streak",
    description: "How great PMs hire other PMs — structured loops, signals, and rubrics.",
    images: [`${SITE_URL}/api/og?title=PM+Hiring+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const SIGNALS = [
  { signal: "Structured thinking under pressure", how: "Throw an ambiguous product question. Watch if they clarify, decompose, and make explicit trade-offs. Or if they leap to solutions." },
  { signal: "User empathy", how: "Ask who they were building for in a recent project. Watch if they name a specific persona with specific pain, or speak in generalities." },
  { signal: "Metric intuition", how: "Ask how they measured success on their last project. Strong candidates name primary + guardrail metrics; weak ones say &apos;we tracked engagement.&apos;" },
  { signal: "Ownership of outcomes", how: "Ask about a failure. Strong candidates own specific decisions that led to the outcome; weak ones blame circumstances." },
  { signal: "Communication clarity", how: "Writing quality in take-homes. Conciseness in verbal answers. Strong PMs compress complexity; weak ones sprawl." },
  { signal: "Intellectual honesty", how: "Push back on their answer. Strong candidates consider your point, update if warranted, defend if not. Weak ones capitulate or get defensive." },
];

const LOOP_STRUCTURE = [
  { round: "Recruiter Screen (30 min)", what: "Basic fit, compensation, timeline. Low bar. Filter out mismatches." },
  { round: "Hiring Manager Screen (45 min)", what: "Background + one product question. Decides if they go to full loop." },
  { round: "Product Design / Sense (60 min)", what: "Design or improve a product. Tests structured thinking, user empathy, creativity." },
  { round: "Metrics / Analytical (60 min)", what: "Diagnose a metric drop or design success metrics. Tests data fluency and judgment." },
  { round: "Strategy (60 min)", what: "Market entry, competitive response, or trade-off question. Tests long-horizon thinking (senior PM+)." },
  { round: "Behavioural (60 min)", what: "Leadership, failure, conflict. Tests ownership, self-awareness, cultural fit." },
  { round: "Team / Bar Raiser (45 min)", what: "Cross-functional perspective. Would engineering/design want to work with this person?" },
];

const COMMON_MISTAKES = [
  "Not defining what you&apos;re hiring for — &apos;great PM&apos; means different things at different levels",
  "Asking questions that don&apos;t reveal the signals you actually need",
  "Anchoring on first impression and looking for confirmation",
  "Letting one charismatic answer override structural weaknesses",
  "No calibration meeting after the loop — different interviewers weigh signals differently",
  "Giving candidates a poor experience — they talk to other candidates, and your reputation depends on it",
];

const CANDIDATE_EXPERIENCE = [
  "Send the interview format and topics in advance — surprises aren&apos;t signal, they&apos;re noise",
  "Start on time. If delayed, apologise sincerely.",
  "Spend the last 10 minutes on their questions — treat them as a peer, not a supplicant",
  "Give a clear timeline: &apos;you&apos;ll hear within 5 business days&apos;",
  "If rejecting, provide specific feedback when asked. Candidates remember this.",
  "Never ghost. Reputation in PM circles is small and travels fast.",
];

const FAQS = [
  {
    q: "How long should a PM hiring loop be?",
    a: "4–6 total hours of candidate time is reasonable for mid-senior PM roles. For APM: 3–4 hours. For Staff+ PM: can go longer with multiple leadership rounds. Loops longer than 8 hours of candidate time without clear signal value burn out top candidates who have other offers.",
  },
  {
    q: "Should PMs write their own interview questions?",
    a: "Yes — but calibrate them with other interviewers first. Generic questions produce generic answers. The best PM interviewers tailor questions to the specific role and team, while maintaining structured rubrics so candidates are comparable. Never ask the same 5 questions for every role; never ask 20 different questions with no rubric.",
  },
  {
    q: "How do you hire for potential vs experience?",
    a: "For APM/junior roles: weight potential (raw thinking, intellectual curiosity, user empathy). For senior roles: weight experience (shipped outcomes, demonstrated leadership). At mid-levels, both matter. The mistake: hiring senior PMs on pure potential, or hiring juniors because they have impressive-looking resumes without signal in structured thinking. Match your signals to the role.",
  },
];

export default function PmHiringGuidePage() {
  const dates = pageDates("/pm-hiring-guide");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Hiring Guide", url: `${SITE_URL}/pm-hiring-guide` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Hiring Guide (2026 Edition)",
        description:
          "How great PMs hire other PMs. Structured interview loops, signals to look for, the bar to hire at each level, and how to give candidates a great experience.",
        image: `${SITE_URL}/api/og?title=PM+Hiring+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-hiring-guide`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🎯</span> The PMs you hire determine the PMs you&apos;ll work with for years
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Hiring Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Hiring PMs well means running a structured, multi-round loop — recruiter screen,
            hiring manager screen, product sense, metrics, strategy, behavioural, and a team bar
            raiser — while evaluating for six specific signals: structured thinking under
            pressure, user empathy, metric intuition, ownership of outcomes, communication
            clarity, and intellectual honesty. Calibrating those signals across interviewers,
            not gut feel, is what separates a defensible hiring bar from a guess.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 signals great PMs look for, a 7-round loop structure, 6 common mistakes,
            and how to give candidates an experience they&apos;ll remember positively.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Interview Intuition Daily — Free →
          </Link>
        </section>

        {/* Signals */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Signals to Hire For</h2>
          <div className="space-y-4">
            {SIGNALS.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <p className="font-bold text-white mb-1">{i + 1}. {s.signal}</p>
                <p className="text-xs text-white/60">{s.how}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Loop structure */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">The 7-Round Interview Loop</h2>
            <div className="space-y-3">
              {LOOP_STRUCTURE.map((l, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-white text-sm mb-1">{i + 1}. {l.round}</p>
                  <p className="text-xs text-white/60">{l.what}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mistakes */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Common Hiring Mistakes</h2>
          <div className="space-y-2">
            {COMMON_MISTAKES.map((m, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-red-400 flex-shrink-0">❌</span>
                <p className="text-sm text-white/70">{m}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Candidate experience */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Candidate Experience Principles</h2>
            <div className="space-y-2">
              {CANDIDATE_EXPERIENCE.map((c, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <p className="text-sm text-white/70">{c}</p>
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

        <RelatedPages slug="pm-hiring-guide" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Sharpen PM Judgment Daily</h2>
          <p className="text-white/60 mb-6">The same intuitions that make you a great PM make you a great PM interviewer.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
