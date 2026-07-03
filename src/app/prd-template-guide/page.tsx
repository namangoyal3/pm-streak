import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PRD Template Guide (2026) — How to Write a Great Product Requirements Doc",
  description:
    "The complete PRD template for product managers. Every section explained, a real PRD example, what to include, what to cut, and how great PMs use PRDs as communication tools.",
  keywords: [
    "PRD template", "product requirements document template",
    "how to write a PRD", "PRD example product manager",
    "product spec template PM", "PRD best practices 2026",
  ],
  alternates: { canonical: "/prd-template-guide" },
  openGraph: {
    title: "PRD Template Guide 2026 — PM Streak",
    description: "The complete PRD template with real examples, section-by-section breakdown.",
    url: `${SITE_URL}/prd-template-guide`,
    images: [{ url: `${SITE_URL}/api/og?title=PRD+Template+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PRD Template Guide 2026 — PM Streak",
    description: "The complete PRD template with real examples, section-by-section breakdown.",
    images: [`${SITE_URL}/api/og?title=PRD+Template+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const SECTIONS = [
  {
    section: "1. Overview / TL;DR",
    purpose: "A one-paragraph summary that a VP can read in 30 seconds and understand what you're building and why.",
    include: ["Problem being solved (1 sentence)", "Proposed solution (1 sentence)", "Target user (1 sentence)", "Success metric (1 sentence)"],
    example: "New users drop off at Step 3 of onboarding (only 40% complete). We're redesigning Step 3 from a 12-field form to a 3-step wizard. For: first-week signups. Success: +15% onboarding completion.",
  },
  {
    section: "2. Problem Statement",
    purpose: "Describe the user problem and why it matters — supported by data.",
    include: ["User pain (qualitative)", "Evidence (quantitative data, user quotes)", "Why now (what changed)", "Cost of inaction"],
    example: "Interviews with 8 new users showed Step 3 felt 'overwhelming' (quote: 'I just wanted to try the app'). Analytics: 60% drop-off at Step 3. Cost: ~3,000 users/month lost = ₹4.5L monthly revenue impact.",
  },
  {
    section: "3. Goals & Non-Goals",
    purpose: "What this project will and will NOT accomplish. Prevents scope creep.",
    include: ["Primary goal (one metric)", "Secondary goals", "Explicit non-goals", "Anti-goals (things we must NOT break)"],
    example: "Goals: Increase onboarding completion to 55%. Secondary: Reduce Step 3 support tickets by 30%. Non-goals: Redesigning Steps 1 or 2. Anti-goal: Do NOT increase D1 uninstalls.",
  },
  {
    section: "4. User Stories",
    purpose: "How users will experience the feature, written from their perspective.",
    include: ["Persona name and context", "Job-to-be-done", "Acceptance criteria", "Edge cases covered"],
    example: "As a first-time user who just installed the app, I want to start using the core feature without filling in my entire profile, so I can decide if the app is worth my time. Acceptance: Can complete Step 3 in under 30 seconds with minimum 3 fields.",
  },
  {
    section: "5. Success Metrics",
    purpose: "How we'll measure whether this worked — defined BEFORE we ship.",
    include: ["Primary metric (must move)", "Guardrail metrics (must not break)", "Leading indicators (weekly)", "Lagging indicators (monthly)"],
    example: "Primary: Onboarding completion rate (target: 40% → 55%). Guardrails: D1 retention ≥ current, uninstall rate ≤ current. Leading: Step 3 time-on-page (target: ↓50%). Lagging: D30 retention.",
  },
  {
    section: "6. Solution / Design",
    purpose: "The actual design and user flow — ideally with links to Figma mockups.",
    include: ["Key user flows (with annotations)", "Design principles applied", "Mobile + desktop behaviour", "Empty states, error states, loading states"],
    example: "Flow: [Figma link]. Step 3 becomes 3 sub-steps, each with 1 field. Mobile: full-screen sub-steps. Desktop: card with progress indicator. Error state: inline validation, not modal.",
  },
  {
    section: "7. Technical Considerations",
    purpose: "What engineering needs to know that isn't obvious from design.",
    include: ["API changes needed", "Data model changes", "Third-party dependencies", "Performance considerations"],
    example: "New endpoint: POST /onboarding/step-3-chunk for partial saves. DB: add onboarding_step column to users table. Must work on 3G connection (main target: Tier-2 cities).",
  },
  {
    section: "8. Rollout Plan",
    purpose: "How we ship safely and revert if needed.",
    include: ["Feature flag strategy", "Rollout phases (% of users)", "Rollback trigger criteria", "Success criteria to expand"],
    example: "Flag: onboarding_v2. Week 1: 10% new signups. Week 2: 50%. Week 3: 100%. Rollback if: completion drops below baseline OR D1 retention drops > 3pp.",
  },
  {
    section: "9. Open Questions",
    purpose: "What we haven't resolved yet — surfaced so they don't become blockers mid-sprint.",
    include: ["Unresolved product decisions", "Pending user research", "Technical unknowns", "Cross-team dependencies"],
    example: "OQ1: Should returning users who didn't complete old onboarding see the new flow? (Owner: PM, needed by sprint start.) OQ2: Does analytics need a new event schema? (Owner: Eng Lead.)",
  },
];

const ANTI_PATTERNS = [
  { bad: "Writing the PRD after engineering started building", fix: "Write the PRD before sprint planning. PRD is a thinking tool, not a record." },
  { bad: "Copy-pasting the same template sections even when they're not relevant", fix: "Cut sections that don't apply. A PRD with 3 focused sections beats a PRD with 9 generic ones." },
  { bad: "Writing 'engineering will figure this out' for edge cases", fix: "List the edge cases explicitly — or explicitly defer them to a follow-up. Ambiguity creates sprint chaos." },
  { bad: "No success metric, or 'launch by end of quarter' as the metric", fix: "Launching is not success. Metric must describe what changes for users or the business as a result of shipping." },
  { bad: "30-page PRD that no one reads", fix: "Aim for 2–3 pages. If it's longer, most of the content belongs in linked docs (research, design, tech spec)." },
];

const FAQS = [
  {
    q: "How long should a PRD be?",
    a: "2–3 pages for most features. Up to 5 pages for major product changes. If your PRD is 10+ pages, it's probably trying to be three documents: a PRD, a tech spec, and a research report. Keep the PRD focused on decisions — link out to supporting material.",
  },
  {
    q: "When should a PM write a PRD vs skip it?",
    a: "Write a PRD when: (1) multiple engineers or designers need to understand the 'why' before building, (2) stakeholder alignment is at risk, (3) the decision is hard to reverse. Skip a PRD when: changes are small (under 1 week of eng work), the decision is well understood by everyone already, or the feature is an A/B test with clear hypothesis.",
  },
  {
    q: "Who should read and approve a PRD?",
    a: "Engineering lead (technical feasibility), design lead (UX direction), and your PM manager or product lead (strategic alignment). For high-impact features, also loop in marketing, support, and analytics. Sign-off should be explicit — not assumed from attendance in a Slack thread.",
  },
];

export default function PrdTemplateGuidePage() {
  const dates = pageDates("/prd-template-guide");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PRD Template Guide", url: `${SITE_URL}/prd-template-guide` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PRD Template Guide (2026 Edition)",
        description:
          "The complete PRD template for product managers. Every section explained, a real PRD example, what to include, what to cut, and how great PMs use PRDs as communication tools.",
        image: `${SITE_URL}/api/og?title=PRD+Template+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/prd-template-guide`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📄</span> A PRD is a thinking tool, not a contract
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PRD Template Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            A well-built PRD template has nine sections — Overview, Problem Statement, Goals &amp; Non-Goals, User Stories,
            Success Metrics, Solution, Technical Considerations, Rollout Plan, and Open Questions — each built to fit inside
            2–3 focused pages. The five anti-patterns below, from writing the PRD after engineering already started to
            shipping one nobody reads, show exactly what breaks that structure in practice.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The 9 sections every great PRD has, a real example for each, common anti-patterns,
            and how the best PMs use PRDs to align teams without creating bureaucracy.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice Writing PRDs Daily — Free →
          </Link>
        </section>

        {/* Sections */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="space-y-5">
            {SECTIONS.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <h2 className="text-lg font-bold text-white mb-1">{s.section}</h2>
                <p className="text-sm text-white/60 mb-4">{s.purpose}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-2">What to include</p>
                    <ul className="space-y-1">
                      {s.include.map((item, j) => <li key={j} className="text-xs text-white/60">• {item}</li>)}
                    </ul>
                  </div>
                  <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-lg p-3">
                    <p className="text-xs text-[#89e219] mb-1">💡 Example</p>
                    <p className="text-xs text-white/70 italic">{s.example}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Anti-patterns */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 PRD Anti-Patterns (and the Fix)</h2>
            <div className="space-y-3">
              {ANTI_PATTERNS.map((a, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <div className="flex gap-3 items-start">
                    <span className="text-red-400 text-sm flex-shrink-0 mt-0.5">❌</span>
                    <div>
                      <p className="text-sm text-white/70 mb-1">{a.bad}</p>
                      <p className="text-sm text-green-400">→ {a.fix}</p>
                    </div>
                  </div>
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

        <RelatedPages slug="prd-template-guide" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice PRD Thinking Daily</h2>
          <p className="text-white/60 mb-6">Real scenarios that build the structured product writing every PM needs.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
