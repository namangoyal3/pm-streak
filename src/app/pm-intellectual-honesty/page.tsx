import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "Intellectual Honesty for PMs (2026) — The Discipline That Compounds into Trust",
  description:
    "How great PMs practise intellectual honesty. Admitting uncertainty, killing your own bad ideas, and the practices that build long-term credibility.",
  keywords: [
    "PM intellectual honesty", "honest PM",
    "killing your own ideas", "PM credibility",
    "intellectual humility PM 2026",
  ],
  alternates: { canonical: "/pm-intellectual-honesty" },
  openGraph: {
    title: "Intellectual Honesty for PMs 2026 — PM Streak",
    description: "How PMs practise intellectual honesty — the discipline that compounds into long-term trust.",
    url: `${SITE_URL}/pm-intellectual-honesty`,
    images: [{ url: `${SITE_URL}/api/og?title=Intellectual+Honesty+for+PMs+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Intellectual Honesty for PMs 2026 — PM Streak",
    description: "How PMs practise intellectual honesty — the discipline that compounds into long-term trust.",
    images: [`${SITE_URL}/api/og?title=Intellectual+Honesty+for+PMs+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PRACTICES = [
  {
    practice: "Admit uncertainty explicitly",
    what: "&apos;I&apos;m 70% confident&apos; beats &apos;This will definitely work.&apos; Calibrated confidence builds more trust than performative certainty.",
  },
  {
    practice: "Kill your own bad ideas",
    what: "When data contradicts your hypothesis, kill it yourself — before someone else has to. The best PMs are the quickest to say &apos;I was wrong.&apos;",
  },
  {
    practice: "Name your biases when they&apos;re relevant",
    what: "&apos;I championed this feature, so I&apos;m probably biased toward keeping it alive. Here&apos;s the case against:&apos;",
  },
  {
    practice: "Seek disconfirming evidence actively",
    what: "Don&apos;t just look for data that supports your view. Explicitly search for what would prove you wrong.",
  },
  {
    practice: "Share bad news early",
    what: "Launches going poorly, metrics missing, risks emerging — surface them yourself before your manager finds out.",
  },
  {
    practice: "Credit others publicly",
    what: "Your insights didn&apos;t come from nowhere. Acknowledge the engineer, designer, or user whose input sharpened your thinking.",
  },
  {
    practice: "Say &apos;I don&apos;t know&apos; when you don&apos;t",
    what: "Faking knowledge backfires when reality arrives. &apos;I don&apos;t know — let me get back to you&apos; is always better than making something up.",
  },
];

const WHY_IT_COMPOUNDS = [
  "Trust is the most under-priced career asset — it takes years to build, seconds to lose",
  "Honest PMs get invited to bigger decisions because others can rely on them",
  "Bad news delivered early = smaller blast radius; delivered late = career damage",
  "Peers gravitate toward honest PMs for hard conversations — that&apos;s where real learning happens",
  "Over 10 years, intellectual honesty compounds into reputation that opens roles you didn&apos;t apply for",
];

const ANTI_PATTERNS = [
  "Claiming certainty when you&apos;re uncertain to seem decisive — backfires when wrong",
  "Defending a bad idea after data emerges — sunk cost in reputation form",
  "Taking credit for collective wins — short-term win, long-term trust loss",
  "Obscuring bad news in hopes it resolves itself — it rarely does",
  "Spinning failures as &apos;learnings&apos; without genuine reflection — peers see through it",
];

const FAQS = [
  {
    q: "Doesn&apos;t admitting uncertainty undermine authority?",
    a: "Opposite — it builds authority. Senior leaders have seen enough PMs fake certainty to know the tell. Calibrated confidence (&apos;I&apos;m 70% confident because X&apos;) signals thought; false certainty signals performance. Over 6–12 months, the honest PM earns more trust than the one who always sounds certain.",
  },
  {
    q: "Is intellectual honesty natural talent or a learnable skill?",
    a: "Learnable, but requires deliberate practice. Most people have blind spots about their own biases. The way to develop honesty: keep a decision log, revisit decisions 3 months later, note where you were wrong AND right for the right reasons. This builds calibration over time. Many PMs start as &apos;medium-honest&apos; and grow through deliberate habit into intellectually rigorous operators.",
  },
];

export default function PmIntellectualHonestyPage() {
  const dates = pageDates("/pm-intellectual-honesty");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Intellectual Honesty", url: `${SITE_URL}/pm-intellectual-honesty` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Intellectual Honesty for PMs (2026 Edition)",
        description:
          "How great PMs practise intellectual honesty. Admitting uncertainty, killing your own bad ideas, and the practices that build long-term credibility.",
        image: `${SITE_URL}/api/og?title=Intellectual+Honesty+for+PMs+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-intellectual-honesty`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🧭</span> Honest PMs build careers. Dishonest ones burn them slowly.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Intellectual Honesty for PMs<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Intellectually honest PMs admit uncertainty instead of faking certainty, kill their own bad ideas before someone else has to, name their biases openly, actively seek disconfirming evidence, and surface bad news early — these are among the seven habits below, and the five anti-patterns to catch in yourself explain why the discipline compounds into the trust that opens roles you never applied for.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            7 daily practices of honest PMs, 5 reasons honesty compounds into trust,
            and 5 anti-patterns to recognise in yourself.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Judgment Daily — Free →
          </Link>
        </section>

        {/* Practices */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">7 Practices of Intellectually Honest PMs</h2>
          <div className="space-y-4">
            {PRACTICES.map((p, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <p className="font-bold text-white mb-1">{i + 1}. {p.practice}</p>
                <p className="text-sm text-white/60">{p.what}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why it compounds */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">Why Intellectual Honesty Compounds</h2>
            <div className="space-y-3">
              {WHY_IT_COMPOUNDS.map((w, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{w}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Anti-patterns */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Dishonesty Anti-Patterns</h2>
          <div className="space-y-2">
            {ANTI_PATTERNS.map((a, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-red-400 flex-shrink-0">❌</span>
                <p className="text-sm text-white/70">{a}</p>
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

        <RelatedPages slug="pm-intellectual-honesty" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Judgment Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios that reward honest reasoning over impressive-sounding answers.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
