import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Executive Updates Guide (2026) — How to Write Updates Leadership Actually Reads",
  description:
    "How PMs write exec updates that get read. Structure, length, what to include, what to cut, and how to build trust through consistent communication.",
  keywords: [
    "PM executive updates", "weekly update leadership PM",
    "PM status update", "exec communication PM",
    "PM leadership update template 2026",
  ],
  alternates: { canonical: "/pm-executive-updates" },
  openGraph: {
    title: "PM Executive Updates Guide 2026 — PM Streak",
    description: "How PMs write exec updates leadership actually reads — structure, length, and trust-building.",
    url: `${SITE_URL}/pm-executive-updates`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Executive+Updates+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Executive Updates Guide 2026 — PM Streak",
    description: "How PMs write exec updates leadership actually reads — structure, length, and trust-building.",
    images: [`${SITE_URL}/api/og?title=PM+Executive+Updates+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const STRUCTURE = [
  { section: "Status tag (green/yellow/red)", what: "Takes 2 seconds to read. Visual signal of health." },
  { section: "One-sentence headline", what: "The most important thing this week. If they read only this, what matters most?" },
  { section: "3 bullets: wins", what: "What shipped, what moved, what we learned. Specific, with numbers." },
  { section: "1 bullet: risks", what: "What&apos;s at risk. Surface early, not when it becomes crisis." },
  { section: "1 bullet: asks", what: "What you need from leadership this week. If nothing, say nothing." },
  { section: "1 bullet: next week", what: "The ONE outcome you&apos;re driving toward next week." },
];

const PRINCIPLES = [
  "Lead with status, not narrative — executives skim",
  "Numbers beat adjectives — &apos;retention at 22%&apos; beats &apos;retention is improving&apos;",
  "Surface bad news early, specifically — &apos;we&apos;re at risk of missing X by 15%&apos; beats &apos;things are challenging&apos;",
  "Send on a predictable cadence — trust comes from consistency",
  "Keep under 300 words — longer signals you&apos;re hiding in words",
  "Ask explicitly for help — don&apos;t expect executives to infer what you need",
];

const GOOD_BAD_EXAMPLES = [
  {
    bad: "We&apos;ve been working hard on the onboarding flow this week and have made significant progress, though there have been some challenges with engineering capacity that we&apos;re working through.",
    good: "🟡 ONBOARDING: Redesigned flow shipped to 10%. Activation up from 40% to 52% (target 55%). At risk: 1-week delay on full rollout due to tests failing on Android 8.",
    why: "Status tag, specific metric, clear risk, no fluff",
  },
  {
    bad: "Great week overall! Lots of exciting progress across multiple initiatives. Looking forward to next week!",
    good: "🟢 Wins: Shipped checkout v2 (conversion +4pp). Completed user research with 8 Tier-3 users. Risks: Payment gateway partner has 2-day delay in KYC. Ask: Need legal review by Fri on refund policy.",
    why: "Concrete wins, specific risk, explicit ask",
  },
];

const TIMING = [
  "Weekly on Friday — freshest memory, sets up weekend reflection for leaders",
  "Send same time each week — consistency &gt; perfect timing",
  "Monthly longer updates complement weekly short ones",
  "Don&apos;t send during weekends — respects boundaries + gets better attention Monday",
  "Post in a persistent channel (shared doc or email) — not just Slack where it gets lost",
];

const FAQS = [
  {
    q: "How often should PMs send exec updates?",
    a: "Weekly cadence is standard — any less and you surprise leadership with bad news; any more and you create noise. If your team is running hot (launch week, crisis), bump to mid-week shorter updates. The cadence itself builds trust: predictability signals reliability.",
  },
  {
    q: "What&apos;s the biggest mistake PMs make in exec updates?",
    a: "Over-writing. Many PMs submit 800-word updates thinking more detail = more effort. Executives read maybe 50 of those words. Under 300 words, with the most important thing at the top, earns more trust than long, narrative updates. The discipline of brevity signals confidence and clarity.",
  },
];

export default function PmExecutiveUpdatesPage() {
  const dates = pageDates("/pm-executive-updates");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Executive Updates", url: `${SITE_URL}/pm-executive-updates` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Executive Updates Guide (2026 Edition)",
        description:
          "How PMs write exec updates that get read. Structure, length, what to include, what to cut, and how to build trust through consistent communication.",
        image: `${SITE_URL}/api/og?title=PM+Executive+Updates+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-executive-updates`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📨</span> 300 words that build trust — or lose it
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Executive Updates Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            A strong PM executive update follows a six-part structure — status tag, one-sentence headline, three wins, one risk, one ask, and next week&apos;s outcome — kept under 300 words and sent on a predictable weekly cadence, usually Friday. Leading with numbers over adjectives and surfacing risks early builds the trust these updates are meant to create.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6-section structure, 6 principles for great updates, before/after examples,
            and 5 rules for timing and cadence.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Writing Skills Daily — Free →
          </Link>
        </section>

        {/* Structure */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6-Section Structure</h2>
          <div className="space-y-3">
            {STRUCTURE.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-white text-sm mb-1">{i + 1}. {s.section}</p>
                <p className="text-xs text-white/60">{s.what}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Principles */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Principles</h2>
            <div className="space-y-2">
              {PRINCIPLES.map((p, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Before / after */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">Before &amp; After</h2>
          <div className="space-y-5">
            {GOOD_BAD_EXAMPLES.map((e, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-5">
                <div className="space-y-2 mb-3">
                  <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3">
                    <p className="text-xs text-red-400 mb-1">❌ Before</p>
                    <p className="text-sm text-white/70 italic">&ldquo;{e.bad}&rdquo;</p>
                  </div>
                  <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3">
                    <p className="text-xs text-green-400 mb-1">✅ After</p>
                    <p className="text-sm text-white/70 italic">&ldquo;{e.good}&rdquo;</p>
                  </div>
                </div>
                <p className="text-xs text-[#89e219]">💡 Why: {e.why}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Timing */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Rules for Timing &amp; Cadence</h2>
            <div className="space-y-2">
              {TIMING.map((t, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{t}</p>
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

        <RelatedPages slug="pm-executive-updates" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Concise PM Writing Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios that force the discipline of brevity and specificity.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
