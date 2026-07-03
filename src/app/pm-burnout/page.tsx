import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Burnout Guide (2026) — How to Spot, Prevent & Recover",
  description:
    "How PMs spot and recover from burnout. Early warning signs, structural causes, what actually works for recovery, and how to rebuild a sustainable product management practice.",
  keywords: [
    "PM burnout", "product manager burnout",
    "PM work-life balance", "PM mental health",
    "how PMs avoid burnout 2026",
  ],
  alternates: { canonical: "/pm-burnout" },
  openGraph: {
    title: "PM Burnout Guide 2026 — PM Streak",
    description: "How to spot, prevent, and recover from PM burnout — early signs, causes, and real recovery moves.",
    url: `${SITE_URL}/pm-burnout`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Burnout+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Burnout Guide 2026 — PM Streak",
    description: "How to spot, prevent, and recover from PM burnout — early signs, causes, and real recovery moves.",
    images: [`${SITE_URL}/api/og?title=PM+Burnout+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const SIGNS = [
  { sign: "Sunday dread becomes constant", what: "You start dreading Monday by Saturday. Every weekend feels like a countdown back to work." },
  { sign: "Cynicism creeps in", what: "&apos;Why bother, nothing changes&apos; becomes a default response to ideas you&apos;d have engaged with 6 months ago." },
  { sign: "Decision fatigue", what: "You put off small decisions because every decision feels heavy. Choosing lunch becomes as hard as choosing a feature." },
  { sign: "Disconnection from outcomes", what: "You ship features but don&apos;t feel anything about launches that would have excited you earlier. Wins feel hollow; losses feel devastating." },
  { sign: "Physical symptoms", what: "Poor sleep, frequent headaches, constant fatigue that doesn&apos;t respond to weekends. Your body is signalling before your mind admits it." },
  { sign: "Withdrawal from the team", what: "Stand-ups feel like a chore. You stop offering opinions. You contribute minimum viable input to avoid further demands." },
];

const CAUSES = [
  { cause: "Scope creep without capacity growth", detail: "Your responsibilities keep expanding but your team size and time don&apos;t. This compounds — 6 months in, you&apos;re doing 2 people&apos;s work." },
  { cause: "Constant context switching", detail: "PMs often own 5+ surface areas simultaneously. Each context switch costs cognitive energy that never gets recovered." },
  { cause: "Lack of autonomy", detail: "PMs who are accountable for outcomes but don&apos;t have the authority to make trade-offs burn out fastest — it&apos;s all cost, no control." },
  { cause: "Unclear priorities from leadership", detail: "When everything is &apos;urgent&apos; and priorities shift weekly, PMs spiral. You can&apos;t do great work on 5 &apos;most important&apos; things at once." },
  { cause: "Over-identification with work outcomes", detail: "PMs whose self-worth is tied to whether features succeed suffer disproportionately when launches miss. Identity beyond work is protective." },
  { cause: "Toxic team dynamics", detail: "Bad managers, unclear expectations, or teams that don&apos;t respect PM contribution grind people down over months, not weeks." },
];

const RECOVERY = [
  { step: "Take real time off — not working vacation", detail: "A week minimum where you don&apos;t check Slack. Two weeks if possible. The first 3 days you&apos;ll still be anxious; the recovery actually starts on day 4+." },
  { step: "Talk to your manager honestly", detail: "Surface the issue. Good managers redirect scope or provide support. Bad managers don&apos;t — that itself is useful information about whether to stay." },
  { step: "Cut scope ruthlessly", detail: "Work with your manager to formally reduce responsibilities. Not &apos;I&apos;ll just work less&apos; — actually remove things from your plate in writing." },
  { step: "Rebuild non-work identity", detail: "Pick up something genuinely yours that isn&apos;t productive — hobby, exercise, relationships. Burnout worsens when work is the only source of meaning." },
  { step: "Consider whether the role or company is the issue", detail: "Sometimes burnout is situational — the same PM thrives at a different company. Don&apos;t just recover; evaluate whether change is needed." },
  { step: "Rebuild practices that sustain you", detail: "Short daily walks, protected deep work, writing for yourself, weekly retro. Whatever practices helped you feel effective before — restore them deliberately." },
];

const FAQS = [
  {
    q: "Is PM burnout common?",
    a: "Yes — PMs have among the highest burnout rates in tech. The combination of constant demand (engineering, design, execs, customers all need you), unclear priorities, and responsibility without authority creates structural stress. Anecdotally, a majority of PMs experience at least one serious burnout period within 5 years. Recognising it early and acting on it is a career-critical skill.",
  },
  {
    q: "How long does it take to recover from PM burnout?",
    a: "Mild burnout: 2–4 weeks of reduced scope + real rest. Serious burnout (months of physical symptoms, cynicism, disengagement): 3–6 months, often requiring a real break, therapy, or a change of role/company. The longer you ignore signs, the longer recovery takes. PMs who recognise burnout at the early signs recover fastest.",
  },
  {
    q: "Can you prevent PM burnout with better habits alone?",
    a: "Partly — habits (time-blocking, saying no, async defaults) reduce structural risk. But some causes are systemic: toxic managers, unclear priorities from leadership, understaffed teams. Habits can&apos;t fix those. The most effective prevention combines personal habits with willingness to escalate scope/priority issues — and if that doesn&apos;t work, willingness to leave.",
  },
];

export default function PmBurnoutPage() {
  const dates = pageDates("/pm-burnout");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Burnout", url: `${SITE_URL}/pm-burnout` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Burnout Guide (2026 Edition)",
        description:
          "How PMs spot and recover from burnout. Early warning signs, structural causes, what actually works for recovery, and how to rebuild a sustainable product management practice.",
        image: `${SITE_URL}/api/og?title=PM+Burnout+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-burnout`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔥</span> Burnout isn&apos;t weakness. It&apos;s a signal worth listening to.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Burnout Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            PM burnout shows up first as Sunday dread, cynicism, and decision fatigue, and it&apos;s driven by structural causes like scope creep without added capacity, constant context switching, and unclear priorities from leadership. Recovery works best when it combines real time off, honest conversations with your manager, and ruthlessly cut scope — not just less caffeine and a long weekend.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 early signs of burnout, 6 structural causes, and 6 recovery moves that
            actually work — for PMs who care about their career AND their health.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Sustainable PM Habits — Free →
          </Link>
        </section>

        {/* Signs */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Early Signs of PM Burnout</h2>
          <div className="space-y-3">
            {SIGNS.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-white text-sm mb-1">{i + 1}. {s.sign}</p>
                <p className="text-xs text-white/60">{s.what}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Causes */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Structural Causes</h2>
            <div className="space-y-3">
              {CAUSES.map((c, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-white text-sm mb-1">{i + 1}. {c.cause}</p>
                  <p className="text-xs text-white/60">{c.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recovery */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Recovery Moves That Actually Work</h2>
          <div className="space-y-3">
            {RECOVERY.map((r, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-green-400 text-sm mb-1">{i + 1}. {r.step}</p>
                <p className="text-xs text-white/60">{r.detail}</p>
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

        <RelatedPages slug="pm-burnout" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Sustainable PM Practice — 2 Minutes a Day</h2>
          <p className="text-white/60 mb-6">Small daily habits beat heroic weekends. That&apos;s how careers last decades.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
