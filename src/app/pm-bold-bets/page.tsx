import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "How PMs Make Bold Bets (2026) — The Skill Senior PMs Need Most",
  description:
    "How PMs make bold product bets when incremental work isn&apos;t enough. Distinguishing brave bets from reckless ones, structuring commitments, and recovering from bad bets.",
  keywords: [
    "PM bold bets", "big product bet",
    "PM risk taking", "strategic bets PM",
    "product conviction 2026",
  ],
  alternates: { canonical: "/pm-bold-bets" },
  openGraph: {
    title: "How PMs Make Bold Bets 2026 — PM Streak",
    description: "How PMs make bold bets — distinguishing brave from reckless, structuring, recovering.",
    url: `${SITE_URL}/pm-bold-bets`,
    images: [{ url: `${SITE_URL}/api/og?title=How+PMs+Make+Bold+Bets+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "How PMs Make Bold Bets 2026 — PM Streak",
    description: "How PMs make bold bets — distinguishing brave from reckless, structuring, recovering.",
    images: [`${SITE_URL}/api/og?title=How+PMs+Make+Bold+Bets+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const WHEN_TO_BET = [
  "Incremental optimisations have diminishing returns — small wins, shrinking sizes",
  "Competitor landscape is shifting — you need to leapfrog, not catch up",
  "You have a strong hypothesis with asymmetric upside — &apos;if this works, it&apos;s huge&apos;",
  "The cost of NOT betting is high — market window closing, competitor lead growing",
  "You have organisational permission — leadership is asking for big moves",
];

const BRAVE_VS_RECKLESS = [
  { brave: "Based on specific user insight", reckless: "Based on founder/exec whim" },
  { brave: "Has a clear falsification criterion — you&apos;ll know in 6 months", reckless: "Open-ended, no way to tell if it&apos;s working" },
  { brave: "Failure is survivable for team/company", reckless: "Failure tanks multiple teams or jeopardises company" },
  { brave: "Paired with rigorous tracking and milestones", reckless: "No milestones; &apos;we&apos;ll see&apos;" },
  { brave: "Honest about uncertainty — &apos;we think this has 40% chance&apos;", reckless: "Sold as certain; surprised when it struggles" },
];

const STRUCTURE_BOLD_BETS = [
  "Write the bet as a falsifiable prediction — &apos;we believe X will happen if we do Y&apos;",
  "Identify the riskiest assumption — test that first, not the easiest thing",
  "Set milestones at 30/60/90 days — not &apos;we&apos;ll review in 12 months&apos;",
  "Budget explicitly — &apos;if we&apos;ve spent 6 months and X isn&apos;t happening, we stop&apos;",
  "Track leading indicators weekly — not just final outcome",
];

const RECOVERING_FROM_BAD_BETS = [
  "Kill early when data is clear — sunk cost destroys companies",
  "Write honest post-mortem — what did we get wrong about users, market, feasibility?",
  "Share learnings broadly — turns a failure into organisational capital",
  "Don&apos;t over-penalise yourself — bold bets failing is part of the job",
  "Earn back credibility through next quarter of reliable execution",
];

const FAQS = [
  {
    q: "Are PMs expected to make bold bets, or just execute?",
    a: "Depends on level. Junior PMs execute within a frame. Senior PMs make bets within a scope. Staff+ PMs propose bets that set the frame. If you&apos;re senior and only executing, you&apos;ve plateaued. Making bold bets — with appropriate structure — is a promotion signal, not a risk to avoid.",
  },
  {
    q: "What&apos;s the biggest mistake PMs make with bold bets?",
    a: "No kill criteria. Bold bets fail; that&apos;s expected. The problem is when there&apos;s no pre-committed criterion for killing them, so they drag on consuming resources long after the writing is on the wall. Senior PMs write the &apos;when we&apos;d kill this&apos; before starting. Junior PMs hope it works out.",
  },
];

export default function PmBoldBetsPage() {
  const dates = pageDates("/pm-bold-bets");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Bold Bets", url: `${SITE_URL}/pm-bold-bets` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "How PMs Make Bold Bets (2026 Edition)",
        description:
          "How PMs make bold product bets when incremental work isn't enough. Distinguishing brave bets from reckless ones, structuring commitments, and recovering from bad bets.",
        image: `${SITE_URL}/api/og?title=How+PMs+Make+Bold+Bets+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-bold-bets`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🎲</span> Brave isn&apos;t reckless. Structure separates them.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            How PMs Make Bold Bets<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-2">
            A bold product bet is brave rather than reckless when it&apos;s grounded in specific user
            insight, has a clear falsification criterion, survivable downside, and milestones at
            30/60/90 days rather than a single year-end review. PMs write it as a falsifiable
            prediction, test the riskiest assumption first, and pre-commit to a kill criterion —
            because the biggest mistake with bold bets isn&apos;t failing, it&apos;s having no plan
            for when to stop.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 signals it&apos;s time to bet, 5 dimensions of brave-vs-reckless,
            5 ways to structure bold bets, and 5 moves to recover from bad ones.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Senior PM Judgment Daily — Free →
          </Link>
        </section>

        {/* When to bet */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Signals It&apos;s Time to Bet Big</h2>
          <div className="space-y-2">
            {WHEN_TO_BET.map((w, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{w}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Brave vs reckless */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">Brave vs Reckless</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-green-400 font-medium">Brave</th>
                    <th className="text-left py-3 px-4 text-red-400 font-medium">Reckless</th>
                  </tr>
                </thead>
                <tbody>
                  {BRAVE_VS_RECKLESS.map((row, i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="py-3 px-4 text-white/70 text-xs">{row.brave}</td>
                      <td className="py-3 px-4 text-white/70 text-xs">{row.reckless}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Structure */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Ways to Structure Bold Bets</h2>
          <div className="space-y-2">
            {STRUCTURE_BOLD_BETS.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{s}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Recovering */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Moves to Recover from Bad Bets</h2>
            <div className="space-y-2">
              {RECOVERING_FROM_BAD_BETS.map((r, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{r}</p>
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

        <RelatedPages slug="pm-bold-bets" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Senior PM Judgment Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on hard trade-offs, bet sizing, and when to stop vs double down.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
