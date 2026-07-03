import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "How to Run a PM Beta Program (2026) — Recruit, Learn, Iterate",
  description:
    "How PMs run beta programs that generate real signal. Recruiting beta users, feedback loops, managing expectations, and turning beta into a compounding asset.",
  keywords: [
    "PM beta program", "product beta testing",
    "closed beta PM", "beta user recruitment",
    "alpha beta launch PM 2026",
  ],
  alternates: { canonical: "/pm-beta-program" },
  openGraph: {
    title: "PM Beta Program Guide 2026 — PM Streak",
    description: "How PMs run beta programs that generate real signal — recruit, learn, iterate.",
    url: `${SITE_URL}/pm-beta-program`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Beta+Program+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Beta Program Guide 2026 — PM Streak",
    description: "How PMs run beta programs that generate real signal — recruit, learn, iterate.",
    images: [`${SITE_URL}/api/og?title=PM+Beta+Program+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PHASES = [
  { phase: "Recruit 20–50 users", what: "Reach out to existing users who fit the target persona. Offer access + acknowledgment (not cash, usually)." },
  { phase: "Onboard with context", what: "Tell them what you&apos;re testing, what&apos;s incomplete, what feedback you want." },
  { phase: "Ship the beta", what: "Gate behind a feature flag. Clearly mark as beta inside the product." },
  { phase: "Weekly feedback loops", what: "1 survey + 5 deep interviews per week during beta. Quant + qual together." },
  { phase: "Iterate visibly", what: "Ship fixes weekly. Tell users &apos;we shipped X based on your feedback.&apos;" },
  { phase: "Graduate to general availability", what: "Clear criteria for GA — metrics hit, critical bugs resolved, user satisfaction proven." },
];

const RECRUITMENT_MOVES = [
  "Reach out to power users — they&apos;re most likely to engage deeply",
  "In-product opt-in banner — highest conversion, most representative",
  "Email segment that matches target persona — broader net",
  "LinkedIn outreach to people who fit but haven&apos;t tried you — harder but useful",
  "User research panel (UserInterviews.com, Respondent.io) — paid but fast",
];

const MANAGING_EXPECTATIONS = [
  "Set clear start + end dates — open-ended betas lose momentum",
  "Tell beta users what&apos;s broken upfront — honesty builds trust",
  "Never promise features will ship to GA — &apos;we&apos;re testing&apos; &gt; &apos;we&apos;ll ship&apos;",
  "Acknowledge feedback even when you can&apos;t act — silence demotivates",
  "Give beta users early access to GA features — reward their investment",
];

const MISTAKES = [
  "Beta that&apos;s too small (&lt;20 users) — not enough signal to generalise",
  "Beta that&apos;s too big (&gt;200 users) — you can&apos;t have depth with that many",
  "No weekly iteration — users feel unheard, disengage",
  "Shipping broken features then asking &apos;is it good?&apos; — users say yes out of politeness",
  "No clear graduation criteria — beta drags forever, quality never improves",
  "Not acknowledging beta users publicly — they&apos;re marketing gold if you treat them well",
];

const FAQS = [
  {
    q: "How long should a beta program last?",
    a: "6–12 weeks is typical. Shorter and you don&apos;t catch enough edge cases; longer and beta users disengage. The goal is 2–3 full iteration cycles — enough to test the original hypothesis and validate fixes. If you&apos;re still iterating after 12 weeks, the feature probably wasn&apos;t ready for beta in the first place.",
  },
  {
    q: "Should PMs pay beta users?",
    a: "Usually not for free-product betas — access itself is the incentive for engaged users. For enterprise or high-effort betas (diary studies, intensive testing), offer Amazon vouchers or product credits. Cash incentives attract wrong-fit users who participate for money, not genuine interest — skews your signal.",
  },
  {
    q: "What&apos;s the biggest beta program mistake?",
    a: "Treating beta as a QA phase. Beta is for learning, not just finding bugs. The questions are: is this solving the right problem? Are users getting the intended value? What UX friction are we missing? PMs who use beta only for bug-catching miss 80% of the signal.",
  },
];

export default function PmBetaProgramPage() {
  const dates = pageDates("/pm-beta-program");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Beta Program", url: `${SITE_URL}/pm-beta-program` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Beta Program Guide (2026 Edition)",
        description: "How PMs run beta programs that generate real signal. Recruiting beta users, feedback loops, managing expectations, and turning beta into a compounding asset.",
        image: `${SITE_URL}/api/og?title=PM+Beta+Program+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-beta-program`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🧪</span> Beta programs are for learning, not just bug-catching
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Beta Program Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-2">
            A PM beta program runs 6&ndash;12 weeks, enough for two or three full iteration
            cycles, recruiting 20 to 50 users who match the target persona, then compressing
            learning into weekly loops of one survey plus five deep interviews. The point
            isn&apos;t bug-catching: teams that treat beta only as QA miss 80% of the signal,
            since the real questions are whether it solves the right problem and where users
            hit friction.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-white/70 hover:text-[#89e219] underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6-phase beta playbook, 5 recruitment moves, 5 rules for managing expectations,
            and 6 mistakes that make betas worthless.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Launch Skills Daily — Free →
          </Link>
        </section>

        {/* Phases */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6-Phase Beta Playbook</h2>
          <div className="space-y-3">
            {PHASES.map((p, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-white text-sm mb-1">{i + 1}. {p.phase}</p>
                <p className="text-xs text-white/60">{p.what}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Recruitment */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Beta User Recruitment Moves</h2>
            <div className="space-y-2">
              {RECRUITMENT_MOVES.map((r, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{r}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Expectations */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Rules for Managing Expectations</h2>
          <div className="space-y-2">
            {MANAGING_EXPECTATIONS.map((m, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{m}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mistakes */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Beta Program Mistakes</h2>
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

        <RelatedPages slug="pm-beta-program" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Launch Muscle Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on shipping, iterating, and managing launches end-to-end.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
