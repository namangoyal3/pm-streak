import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Async Work (2026) — How Great PMs Write Instead of Meet",
  description:
    "How PMs default to async communication — doc-first decisions, when to meet, and the writing skills that replace meetings.",
  keywords: [
    "PM async work", "async PM communication",
    "document-first PM", "fewer meetings PM",
    "async product decisions 2026",
  ],
  alternates: { canonical: "/pm-async-work" },
  openGraph: {
    title: "PM Async Work 2026 — PM Streak",
    description: "How great PMs default to async — doc-first decisions, fewer meetings, more shipping.",
    url: `${SITE_URL}/pm-async-work`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Async+Work+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Async Work 2026 — PM Streak",
    description: "How great PMs default to async — doc-first decisions, fewer meetings, more shipping.",
    images: [`${SITE_URL}/api/og?title=PM+Async+Work+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const WHY_ASYNC = [
  "Async reaches people across time zones — India ↔ US ↔ Europe teams",
  "Writing clarifies thinking — vague ideas fall apart when you try to write them",
  "Async respects deep work — meetings fragment everyone&apos;s day",
  "Async creates searchable artefacts — decisions persist beyond who was in the room",
  "Async scales — you can reach 50 people without 50 meetings",
];

const WHEN_ASYNC_WORKS = [
  "Sharing updates — status reports, weekly progress, project milestones",
  "Proposing decisions where stakeholders can digest and respond at their pace",
  "Documenting decisions after they&apos;re made — post-meeting artefact",
  "Requesting feedback on drafts — PRDs, strategy docs, exec updates",
  "Cross-functional alignment when schedules don&apos;t overlap",
];

const WHEN_SYNC_WORKS = [
  "Resolving deadlocked debates — 5 Slack messages that should be a 10-min call",
  "High-stakes decisions where you need body language and tone",
  "Building rapport with new collaborators",
  "Delicate feedback conversations — not in writing",
  "Brainstorming — energy of live conversation produces better ideas",
];

const ASYNC_SKILLS = [
  "Writing clear, scannable docs — headings, bullets, bold takeaways",
  "TL;DR at the top — executives skim first, read if needed",
  "Clear asks — &apos;I need X decision by Y date&apos; beats &apos;thoughts?&apos;",
  "Structured updates — status tag (green/yellow/red), what shipped, risks, asks",
  "Comment discipline — respond inline, don&apos;t move to DMs",
  "Record Looms — 3-min video &gt; 15-min meeting for visual walkthroughs",
];

const FAQS = [
  {
    q: "Should PMs try to eliminate all meetings?",
    a: "No — some meetings are irreplaceable. Delicate feedback, brainstorming, rapport-building, and high-stakes resolutions all benefit from synchronous time. The goal isn&apos;t zero meetings; it&apos;s async by default, sync when async truly fails. PMs who chase zero meetings often struggle with the 20% that need to be live.",
  },
  {
    q: "How do PMs make async work when leadership prefers meetings?",
    a: "Meet leadership halfway: send pre-read docs before meetings, so the meeting is for decisions not explanations. Over time, leaders often come to prefer the async approach because it respects their time. Don&apos;t unilaterally refuse meetings — adapt the format within the constraint.",
  },
];

export default function PmAsyncWorkPage() {
  const dates = pageDates("/pm-async-work");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Async Work", url: `${SITE_URL}/pm-async-work` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Async Work Guide (2026 Edition)",
        description:
          "How PMs default to async communication — doc-first decisions, when to meet, and the writing skills that replace meetings.",
        image: `${SITE_URL}/api/og?title=PM+Async+Work+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-async-work`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📝</span> Default to async. Use sync when it truly matters.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Async Work Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            PM async work means defaulting to written docs and updates instead of meetings — because writing clarifies thinking, reaches teams across time zones, and creates searchable decision records — while still reserving live conversation for deadlocked debates, high-stakes calls, and delicate feedback. The practice rests on six specific skills, from TL;DR-first docs to structured status updates, since the goal is async by default, not async at all costs.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 reasons async compounds, 5 scenarios async works best, 5 scenarios sync wins,
            and 6 async PM skills to develop.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Writing Skills Daily — Free →
          </Link>
        </section>

        {/* Why async */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Reasons Async Compounds</h2>
          <div className="space-y-2">
            {WHY_ASYNC.map((w, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{w}</p>
              </div>
            ))}
          </div>
        </section>

        {/* When async works */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Scenarios Where Async Wins</h2>
            <div className="space-y-2">
              {WHEN_ASYNC_WORKS.map((w, i) => (
                <div key={i} className="bg-[#111] border border-green-500/20 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <p className="text-sm text-white/70">{w}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* When sync works */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Scenarios Where Sync Wins</h2>
          <div className="space-y-2">
            {WHEN_SYNC_WORKS.map((w, i) => (
              <div key={i} className="bg-[#111] border border-yellow-500/20 rounded-xl p-3 flex gap-3">
                <span className="text-yellow-400 flex-shrink-0">⚡</span>
                <p className="text-sm text-white/70">{w}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Async PM Skills</h2>
            <div className="space-y-2">
              {ASYNC_SKILLS.map((s, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{s}</p>
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

        <RelatedPages slug="pm-async-work" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Writing Muscle Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on concise, structured writing — the foundation of async work.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
