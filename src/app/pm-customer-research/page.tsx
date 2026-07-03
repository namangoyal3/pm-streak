import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Customer Research Guide (2026) — Beyond Interviews",
  description:
    "The PM guide to customer research. How to combine qualitative, quantitative, and passive signals into a research program that drives real product decisions.",
  keywords: [
    "PM customer research", "product research methods",
    "mixed methods PM research", "continuous discovery",
    "customer research program 2026",
  ],
  alternates: { canonical: "/pm-customer-research" },
  openGraph: {
    title: "PM Customer Research Guide 2026 — PM Streak",
    description: "Combine qualitative, quantitative, and passive signals into research that drives decisions.",
    url: `${SITE_URL}/pm-customer-research`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Customer+Research+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Customer Research Guide 2026 — PM Streak",
    description: "Combine qualitative, quantitative, and passive signals into research that drives decisions.",
    images: [`${SITE_URL}/api/og?title=PM+Customer+Research+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const METHODS = [
  { method: "User interviews", when: "When you need to understand WHY users do things", sample: "5–8 per persona" },
  { method: "Surveys", when: "When you need to quantify something already qualitatively known", sample: "100+ responses minimum" },
  { method: "Usability tests", when: "When validating a specific flow or feature", sample: "5 users catches 85% of issues" },
  { method: "Diary studies", when: "When you need behaviour-over-time signal", sample: "10–15 users × 1–2 weeks" },
  { method: "Session recordings", when: "When diagnosing unexpected funnel drop-offs", sample: "20–50 sessions per hypothesis" },
  { method: "Support ticket mining", when: "Continuous — passive signal on real pain", sample: "30 min/week review" },
  { method: "Sales call listening", when: "For B2B — understanding buyer objections", sample: "5 recordings/month" },
  { method: "Cancellation / exit surveys", when: "When churn is a meaningful concern", sample: "Triggered automatically; 20%+ response rate" },
];

const PROGRAM_STRUCTURE = [
  "Weekly: 1 user interview (continuous discovery)",
  "Monthly: 1 deeper study (usability, concept test, or diary)",
  "Monthly: Review passive signals (support tickets, cancellation surveys, session recordings)",
  "Quarterly: Refresh persona and segmentation based on accumulated research",
  "Quarterly: Present &apos;voice of customer&apos; deck to the team",
];

const MIXING_METHODS = [
  { combo: "Survey → Interview", when: "You found a pattern in survey data; interviews explain why" },
  { combo: "Interview → Survey", when: "You heard a theme in interviews; survey quantifies how many users have it" },
  { combo: "Analytics drop → Session recording", when: "Funnel drop visible in data; recordings show what&apos;s actually happening" },
  { combo: "Support tickets → User interviews", when: "Tickets reveal a pattern; interviews with those users deepen the insight" },
];

const MISTAKES = [
  "Relying only on qualitative (sample size too small to generalise) or only quantitative (missing the why)",
  "Research that never gets applied to product decisions — theatre, not research",
  "Interviewing the same 3 power users repeatedly — biased sample",
  "Skipping passive signals (support, session recordings) — a lot of free insight lives there",
  "Not sharing findings across the org — insights stuck with one PM",
  "Researching to confirm hypotheses, not to test them — confirmation bias in formal clothes",
];

const FAQS = [
  {
    q: "How much time should PMs spend on customer research?",
    a: "3–5 hours per week as a sustainable baseline. That&apos;s one user interview, some time in the support queue, and lightweight analysis. More than that and it crowds out other PM work; less and you lose signal continuity. Research is like gym — consistency beats intensity.",
  },
  {
    q: "Should PMs do research or leave it to UX researchers?",
    a: "Both, for different purposes. UX researchers handle complex studies (segmentation, ethnography, large-scale surveys) with rigour PMs don&apos;t have time for. PMs do lightweight continuous research (weekly interviews, support mining) for daily decisions. PMs who outsource ALL research lose intuition; PMs who do ALL research lose rigour. Combine both.",
  },
];

export default function PmCustomerResearchPage() {
  const dates = pageDates("/pm-customer-research");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Customer Research", url: `${SITE_URL}/pm-customer-research` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Customer Research Guide (2026 Edition)",
        description: "The PM guide to customer research. How to combine qualitative, quantitative, and passive signals into a research program that drives real product decisions.",
        image: `${SITE_URL}/api/og?title=PM+Customer+Research+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-customer-research`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔍</span> Great PMs mix methods — interviews alone miss half the signal
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Customer Research Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-2">
            Customer research means combining methods, not picking one: interviews explain
            why users behave a certain way, surveys quantify what&apos;s already known
            qualitatively, and passive signals like support tickets and session recordings
            deliver continuous signal on real pain. A sustainable program runs one interview
            weekly, one deeper study monthly, and a quarterly persona refresh, roughly 3&ndash;5
            hours a week, since research that never gets applied to decisions is theatre, not
            research.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-white/70 hover:text-[#89e219] underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            8 research methods with when to use each, a research program structure,
            4 powerful method combinations, and 6 mistakes to avoid.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Research Intuition Daily — Free →
          </Link>
        </section>

        {/* Methods */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">8 Research Methods</h2>
          <div className="space-y-3">
            {METHODS.map((m, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                  <p className="font-semibold text-white text-sm">{m.method}</p>
                  <span className="text-xs text-green-400">{m.sample}</span>
                </div>
                <p className="text-xs text-white/60">{m.when}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Program structure */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">Research Program Cadence</h2>
            <div className="space-y-2">
              {PROGRAM_STRUCTURE.map((s, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{s}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mixing methods */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">4 Powerful Method Combinations</h2>
          <div className="space-y-3">
            {MIXING_METHODS.map((m, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-[#89e219] text-sm mb-1">{m.combo}</p>
                <p className="text-xs text-white/60">{m.when}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mistakes */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Research Mistakes</h2>
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

        <RelatedPages slug="pm-customer-research" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Research Intuition Daily</h2>
          <p className="text-white/60 mb-6">Daily PM scenarios that force mixed-method thinking.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
