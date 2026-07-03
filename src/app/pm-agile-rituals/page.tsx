import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Agile Rituals (2026) — Standups, Retros, Demos Done Right",
  description:
    "How PMs run agile rituals without waste. Standups, retros, demos, refinement — what to keep, what to cut, what works in 2026.",
  keywords: [
    "PM agile rituals", "standup retro demo",
    "agile PM practices 2026",
  ],
  alternates: { canonical: "/pm-agile-rituals" },
  openGraph: {
    title: "PM Agile Rituals 2026 — PM Streak",
    description: "How PMs run agile rituals without waste.",
    url: `${SITE_URL}/pm-agile-rituals`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Agile+Rituals+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Agile Rituals 2026 — PM Streak",
    description: "How PMs run agile rituals without waste.",
    images: [`${SITE_URL}/api/og?title=PM+Agile+Rituals+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const RITUALS = [
  { r: "Standup", w: "15 minutes max. Blockers and handoffs only. Skip if everyone is heads-down." },
  { r: "Backlog refinement", w: "Before planning, not during. Keep stories small and clear." },
  { r: "Sprint planning", w: "Pick work that hits the sprint goal. Commit honestly to capacity." },
  { r: "Demo / review", w: "Show working product, not slides. Invite real stakeholders." },
  { r: "Retro", w: "What worked, what didn&apos;t, what we&apos;ll change. One change per retro." },
];

const RULES = [
  "Rituals serve the team, not the framework — kill what doesn&apos;t work",
  "Async-by-default for remote teams — written standups beat video calls",
  "Short and frequent beats long and rare",
  "The PM is not the scrum master — resist the urge to run every ritual",
];

const FAQS = [
  {
    q: "Can teams skip standups entirely?",
    a: "Yes, if written async updates are working and the team has high trust. Some of the highest-performing teams in 2026 run zero daily meetings — they use Slack/Linear status updates and pull-based communication. This works when the team is small, experienced, and timezone-close. Larger or less-experienced teams still benefit from a short daily touchpoint.",
  },
];

export default function PmAgileRitualsPage() {
  const dates = pageDates("/pm-agile-rituals");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Agile Rituals", url: `${SITE_URL}/pm-agile-rituals` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Agile Rituals (2026 Edition)",
        description:
          "How PMs run agile rituals without waste. Standups, retros, demos, refinement — what to keep, what to cut, what works in 2026.",
        image: `${SITE_URL}/api/og?title=PM+Agile+Rituals+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-agile-rituals`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔄</span> Rituals serve the team — not the other way around
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Agile Rituals<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            The rule that governs every PM-run agile ritual is simple: rituals serve the team, not the framework, so short and frequent beats long and rare and async-by-default suits remote teams best. In practice that means five checkpoints — a 15-minute standup for blockers only, backlog refinement before planning, sprint planning against real capacity, a demo of working product for real stakeholders, and a retro that commits to exactly one change.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 rituals explained and 4 rules for running them well.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Agile PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Rituals</h2>
          <div className="space-y-3">
            {RITUALS.map((r, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-[#89e219] text-sm mb-1">{r.r}</p>
                <p className="text-xs text-white/60">{r.w}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">4 Rules</h2>
            <div className="space-y-2">
              {RULES.map((r, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
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

        <RelatedPages slug="pm-agile-rituals" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Agile PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
