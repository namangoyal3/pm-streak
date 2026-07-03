import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Project Kickoff Doc Template (2026) — Start Projects Without Drama",
  description:
    "The project kickoff doc that aligns the team before work starts. Template, sections, and how to avoid the 6 kickoff mistakes that make projects late.",
  keywords: [
    "PM kickoff doc", "project kickoff template PM",
    "product project kickoff", "PM project start",
    "project brief template 2026",
  ],
  alternates: { canonical: "/pm-kickoff-doc" },
  openGraph: {
    title: "PM Project Kickoff Doc 2026 — PM Streak",
    description: "Start projects without drama — kickoff doc template, sections, and mistakes to avoid.",
    url: `${SITE_URL}/pm-kickoff-doc`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Project+Kickoff+Doc+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Project Kickoff Doc 2026 — PM Streak",
    description: "Start projects without drama — kickoff doc template, sections, and mistakes to avoid.",
    images: [`${SITE_URL}/api/og?title=PM+Project+Kickoff+Doc+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const SECTIONS = [
  { section: "Problem statement (1 paragraph)", what: "What problem are we solving, for whom, and why now?" },
  { section: "Goals (1–2 primary)", what: "What will be different when we&apos;re done? Outcome metrics, not feature lists." },
  { section: "Non-goals (explicit)", what: "What we will NOT do in this project. Prevents scope creep before it starts." },
  { section: "Users affected", what: "Which personas, what segments, what size (1K users? 1M?)." },
  { section: "Assumptions", what: "What we believe to be true. Riskiest assumptions flagged — they&apos;re the first things to test." },
  { section: "Approach (high level)", what: "How we&apos;ll attack the problem. Not the PRD — just the shape of the work." },
  { section: "Timeline &amp; milestones", what: "Key dates — design review, code complete, QA, launch. Buffer for the unknowns." },
  { section: "Roles &amp; RACI", what: "Who&apos;s Responsible, Accountable, Consulted, Informed. Crisp names, not &apos;the team.&apos;" },
  { section: "Risks &amp; mitigations", what: "Top 3 things that could derail this, and what you&apos;ll do if they happen." },
  { section: "Success criteria", what: "How we&apos;ll measure. Primary + guardrail metrics with targets." },
];

const MISTAKES = [
  "Starting without a kickoff doc — &apos;everyone knows what we&apos;re doing&apos; is never true",
  "Too long — anything over 4 pages gets skimmed or ignored",
  "No named owners — diffuse responsibility = nothing gets done",
  "No timeline — ambiguity invites scope creep",
  "No risks — signals over-confidence or incomplete thinking",
  "Written in isolation — kickoff docs should be co-authored with eng/design leads",
];

const WHEN_TO_WRITE = [
  "Any project &gt; 4 weeks of engineering time",
  "Any cross-functional initiative (sales, marketing involved)",
  "Any platform or infrastructure change affecting multiple teams",
  "Any project with executive visibility",
  "Any project where one person leaving would cause confusion",
];

const FAQS = [
  {
    q: "How is a kickoff doc different from a PRD?",
    a: "Kickoff doc = alignment artefact before work starts. PRD = detailed spec for what to build. The kickoff doc addresses: why this project, who&apos;s on it, what does done look like, what are the risks. The PRD addresses: exactly what to build. You need both — they serve different purposes and audiences.",
  },
  {
    q: "Who should write the kickoff doc?",
    a: "PM drafts, co-authored with engineering and design leads. The PM owns the problem statement, goals, and success criteria. Eng/design contribute to approach, timeline, and risks. Solo-authored kickoff docs miss blind spots and create false alignment.",
  },
  {
    q: "When should the kickoff doc be reviewed and updated?",
    a: "Reviewed once at project start with the full team. Updated whenever assumptions change significantly (scope change, timeline slip, new risks). Kill the habit of creating a kickoff doc then never looking at it — a living doc catches drift before it becomes crisis.",
  },
];

export default function PmKickoffDocPage() {
  const dates = pageDates("/pm-kickoff-doc");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Kickoff Doc", url: `${SITE_URL}/pm-kickoff-doc` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Project Kickoff Doc Template (2026)",
        description:
          "The project kickoff doc that aligns the team before work starts. Template, sections, and how to avoid the 6 kickoff mistakes that make projects late.",
        image: `${SITE_URL}/api/og?title=PM+Project+Kickoff+Doc+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-kickoff-doc`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🚀</span> Great projects start with a written kickoff
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Project Kickoff Doc<br />Template (2026)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Before any project longer than four weeks of engineering time gets underway, a kickoff doc lines
            up ten things — the problem, goals, non-goals, who&apos;s affected, key assumptions, the
            high-level approach, timeline, RACI ownership, top risks, and success criteria — so the team
            starts aligned instead of guessing. Unlike a PRD, which specifies exactly what to build, the
            kickoff doc answers why the project exists and who owns what.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The 10-section kickoff doc template, 6 kickoff mistakes to avoid,
            and when a kickoff doc is worth writing vs skipping.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Execution Skills Daily — Free →
          </Link>
        </section>

        {/* Sections */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">10-Section Kickoff Doc</h2>
          <div className="space-y-3">
            {SECTIONS.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-white text-sm mb-1">{i + 1}. {s.section}</p>
                <p className="text-xs text-white/60">{s.what}</p>
              </div>
            ))}
          </div>
        </section>

        {/* When to write */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">When to Write One</h2>
            <div className="space-y-2">
              {WHEN_TO_WRITE.map((w, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">✓</span>
                  <p className="text-sm text-white/70">{w}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mistakes */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Kickoff Mistakes</h2>
          <div className="space-y-2">
            {MISTAKES.map((m, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-red-400 flex-shrink-0">❌</span>
                <p className="text-sm text-white/70">{m}</p>
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

        <RelatedPages slug="pm-kickoff-doc" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Execution Muscle Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on scope, trade-offs, and alignment — the skills kickoffs require.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
