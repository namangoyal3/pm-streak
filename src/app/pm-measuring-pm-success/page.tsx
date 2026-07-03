import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "How to Measure PM Success (2026) — What Great PMs Are Actually Evaluated On",
  description:
    "How PMs are actually measured. Beyond &apos;did you ship features?&apos; — the real signals PM managers and companies use to evaluate PMs across levels.",
  keywords: [
    "PM performance", "how PMs are measured",
    "PM evaluation criteria", "PM review",
    "measuring PM success 2026",
  ],
  alternates: { canonical: "/pm-measuring-pm-success" },
  openGraph: {
    title: "How to Measure PM Success 2026 — PM Streak",
    description: "What PMs are actually evaluated on — beyond &apos;did you ship features?&apos;",
    url: `${SITE_URL}/pm-measuring-pm-success`,
    images: [{ url: `${SITE_URL}/api/og?title=How+to+Measure+PM+Success+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Measure PM Success 2026 — PM Streak",
    description: "What PMs are actually evaluated on — beyond &apos;did you ship features?&apos;",
    images: [`${SITE_URL}/api/og?title=How+to+Measure+PM+Success+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DIMENSIONS = [
  { dim: "Outcomes moved", what: "Did you shift the metric you set out to shift? Not features shipped — metrics moved." },
  { dim: "Judgment", what: "Did you make good calls under uncertainty? Reviewers look at process, not just outcomes." },
  { dim: "Influence", what: "Did you move teams you don&apos;t own? Cross-functional impact matters at senior levels." },
  { dim: "Communication", what: "Are your docs, updates, and verbal communication crisp? Written artifacts get reviewed." },
  { dim: "Team health", what: "Is the team you work with functioning well? Are engineers/designers happy working with you?" },
  { dim: "Predictability", what: "Do you surface risks early, hit commitments, avoid surprises? Trust compounds here." },
  { dim: "Growth trajectory", what: "Are you operating above your current level? Promotion depends on showing next-level behaviours now." },
];

const SIGNALS_UP = [
  "Managers seek your input on cross-team problems",
  "Engineers talk about your work positively unprompted",
  "Leadership mentions your product area in unrelated meetings",
  "You&apos;re invited to decisions above your level",
  "Your docs get forwarded beyond your team",
];

const SIGNALS_STUCK = [
  "You&apos;re shipping but metrics aren&apos;t moving",
  "Your work is invisible outside your immediate team",
  "You&apos;re doing everything your manager asks but they seem unsatisfied",
  "You haven&apos;t been mentioned in strategic conversations in 3+ months",
  "Peers at your level are getting promoted but you aren&apos;t",
];

const WHAT_TO_DO = [
  "Ask your manager explicitly: &apos;What would it take for me to be considered at the next level?&apos;",
  "Audit your work: what moved metrics vs what was just shipped?",
  "Write an internal case study of your best work — get it visible beyond your team",
  "Take on one stretch project that operates at the next level — even if it risks failing",
  "Solicit feedback from peers, not just managers — often more candid and specific",
];

const FAQS = [
  {
    q: "Why do some PMs get promoted faster than others with similar output?",
    a: "Visibility and scope, usually. Two PMs can ship equally good work — but the one whose work is visible to leadership, who operates on more ambiguous problems, and who demonstrably influences beyond their team gets promoted faster. It&apos;s not always fair, but it&apos;s consistent. The PMs who understand this proactively manage visibility; the ones who don&apos;t wait for their work to &apos;speak for itself.&apos;",
  },
  {
    q: "Is shipping features a good PM success metric?",
    a: "Partially, at junior levels. A PM who can&apos;t ship is failing at the basics. But once you can ship reliably, the metric shifts to: did shipping move the outcome you intended? Senior PMs are measured on outcomes, not outputs. The failure mode: PMs who never graduate from &apos;shipped 10 features&apos; framing to &apos;moved retention from X to Y.&apos;",
  },
];

export default function PmMeasuringPmSuccessPage() {
  const dates = pageDates("/pm-measuring-pm-success");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Measuring PM Success", url: `${SITE_URL}/pm-measuring-pm-success` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "How to Measure PM Success (2026 Edition)",
        description: "How PMs are actually measured. Beyond 'did you ship features?' — the real signals PM managers and companies use to evaluate PMs across levels.",
        image: `${SITE_URL}/api/og?title=How+to+Measure+PM+Success+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-measuring-pm-success`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📊</span> What PMs are actually evaluated on (vs what they think)
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            How to Measure PM Success<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Great PMs aren&apos;t measured by how many features they ship — they&apos;re evaluated
            on seven dimensions: outcomes moved, judgment under uncertainty, cross-team influence,
            communication quality, team health, predictability, and growth trajectory. Senior PMs
            are judged on outcomes, not outputs; a PM who ships ten features but moves no metrics
            is still seen as failing.
          </p>
          <p className="text-sm text-white/40 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-white/60 hover:text-[#89e219] underline underline-offset-2">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Career Velocity Daily — Free →
          </Link>
        </section>

        {/* Dimensions */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">7 Dimensions PMs Are Evaluated On</h2>
          <div className="space-y-3">
            {DIMENSIONS.map((d, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-white text-sm mb-1">{i + 1}. {d.dim}</p>
                <p className="text-xs text-white/60">{d.what}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Signals up */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Signals You&apos;re Tracking Up</h2>
            <div className="space-y-2">
              {SIGNALS_UP.map((s, i) => (
                <div key={i} className="bg-[#111] border border-green-500/20 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">✓</span>
                  <p className="text-sm text-white/70">{s}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Signals stuck */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Signals You&apos;re Stuck</h2>
          <div className="space-y-2">
            {SIGNALS_STUCK.map((s, i) => (
              <div key={i} className="bg-[#111] border border-red-500/20 rounded-xl p-3 flex gap-3">
                <span className="text-red-400 font-bold flex-shrink-0">⚠️</span>
                <p className="text-sm text-white/70">{s}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What to do */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Moves to Unstick Your Career</h2>
            <div className="space-y-2">
              {WHAT_TO_DO.map((w, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{w}</p>
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

        <RelatedPages slug="pm-measuring-pm-success" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Skills That Get You Promoted</h2>
          <p className="text-white/60 mb-6">Daily scenarios that develop the thinking behind outcomes, not just output.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
