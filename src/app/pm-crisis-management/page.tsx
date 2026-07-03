import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Crisis Management (2026) — How to Handle Production Incidents &amp; Launch Disasters",
  description:
    "How PMs handle crisis moments — production incidents, launch disasters, customer escalations. Triage, communication, post-mortem, and rebuilding trust.",
  keywords: [
    "PM crisis management", "production incident PM",
    "launch disaster PM", "customer escalation PM",
    "PM incident response 2026",
  ],
  alternates: { canonical: "/pm-crisis-management" },
  openGraph: {
    title: "PM Crisis Management 2026 — PM Streak",
    description: "How PMs handle production incidents, launch disasters, and customer escalations.",
    url: `${SITE_URL}/pm-crisis-management`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Crisis+Management+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Crisis Management 2026 — PM Streak",
    description: "How PMs handle production incidents, launch disasters, and customer escalations.",
    images: [`${SITE_URL}/api/og?title=PM+Crisis+Management+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const FIRST_60_MINUTES = [
  "Assess severity (P0: users blocked, P1: degraded, P2: minor)",
  "Assemble the right team in one chat (eng lead, ops, CS, comms)",
  "Assign a single incident commander — not you unless necessary",
  "Communicate early: &apos;We&apos;re aware, investigating, will update in 30 min&apos;",
  "Start a log of decisions and timestamps in the incident channel",
];

const HOURS_1_TO_4 = [
  "Rollback if the incident is caused by a deploy — fast recovery beats root cause hunting",
  "Keep communication loop open with customer-facing teams — every 30 min",
  "Don&apos;t speculate publicly about cause — &apos;investigating&apos; is better than a wrong hypothesis",
  "Protect engineers from stakeholder interruptions — they&apos;re fixing, you&apos;re communicating",
  "Track user impact if possible (affected users, revenue blocked) — data for post-mortem",
];

const POST_INCIDENT = [
  "Resolve the incident and confirm recovery with real user data",
  "Communicate to customers — what happened, what we did, what we&apos;ll prevent",
  "Run a blameless post-mortem within 48 hours",
  "Assign prevention owners and deadlines — specific, not generic",
  "Share post-mortem broadly — signals you learned, not hid",
];

const COMMUNICATION_RULES = [
  "Acknowledge first, diagnose second — users want to know you know",
  "Be specific about impact, vague about root cause (until certain)",
  "Set expectations: &apos;next update in 30 min&apos; — then hit that mark",
  "Apologise if you caused it, don&apos;t over-apologise — professionalism matters",
  "Never blame individuals publicly — blame systems, fix systems",
];

const FAQS = [
  {
    q: "What&apos;s the PM&apos;s role during a production incident?",
    a: "Communication and coordination — NOT engineering. Your job: assemble the team, ensure the right people are engaged, communicate to affected parties (customers, leadership, CS), track decisions. Engineering owns the fix. PMs who try to engineer the fix themselves get in the way. The discipline is staying in your lane while providing air cover.",
  },
  {
    q: "How do PMs rebuild trust after a major incident?",
    a: "Three things: (1) thorough, honest post-mortem shared publicly, (2) concrete prevention measures shipped within 30 days, (3) consistent behaviour going forward — no repeat of the same mistake. Trust lost in 1 incident takes 6–12 months of consistent reliability to fully rebuild. The PMs who handle incidents well often come out stronger than before — the incident becomes evidence of their judgment under pressure.",
  },
];

export default function PmCrisisManagementPage() {
  const dates = pageDates("/pm-crisis-management");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Crisis Management", url: `${SITE_URL}/pm-crisis-management` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Crisis Management (2026 Edition)",
        description: "How PMs handle crisis moments — production incidents, launch disasters, customer escalations. Triage, communication, post-mortem, and rebuilding trust.",
        image: `${SITE_URL}/api/og?title=PM+Crisis+Management+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-crisis-management`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🚨</span> How you handle crises defines you more than how you handle calm
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Crisis Management<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            During a production incident, a PM&apos;s job is communication and coordination, not engineering: assess severity, assemble an incident-commander-led team, and update stakeholders every 30 minutes in the first hour; then protect engineers from interruptions while tracking user impact; afterward, run a blameless post-mortem within 48 hours and assign prevention owners.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-4">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 first-60-min moves, 5 hours 1-4 moves, 5 post-incident steps,
            and 5 communication rules for handling production incidents.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Incident Instincts Daily — Free →
          </Link>
        </section>

        {/* First 60 min */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">First 60 Minutes</h2>
          <div className="space-y-2">
            {FIRST_60_MINUTES.map((f, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-red-400 font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{f}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Hours 1-4 */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">Hours 1–4</h2>
            <div className="space-y-2">
              {HOURS_1_TO_4.map((h, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-yellow-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{h}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Post incident */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">Post-Incident (24–72 hours)</h2>
          <div className="space-y-2">
            {POST_INCIDENT.map((p, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{p}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Communication */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Communication Rules</h2>
            <div className="space-y-2">
              {COMMUNICATION_RULES.map((c, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
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

        <RelatedPages slug="pm-crisis-management" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Train PM Judgment Under Pressure Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on hard calls, fast decisions, and communicating under stress.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
