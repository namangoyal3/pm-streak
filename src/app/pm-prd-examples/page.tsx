import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PRD Examples (2026) — 3 Real-Style Product Requirements Documents",
  description:
    "3 real-style PRD examples for consumer, B2B, and platform features. See structure, detail level, and how great PMs balance thoroughness with brevity.",
  keywords: [
    "PRD example", "product requirements document example",
    "sample PRD PM", "real PRD template",
    "PRD examples 2026",
  ],
  alternates: { canonical: "/pm-prd-examples" },
  openGraph: {
    title: "PRD Examples 2026 — PM Streak",
    description: "3 real-style PRD examples showing structure and detail level.",
    url: `${SITE_URL}/pm-prd-examples`,
    images: [{ url: `${SITE_URL}/api/og?title=PRD+Examples+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PRD Examples 2026 — PM Streak",
    description: "3 real-style PRD examples showing structure and detail level.",
    images: [`${SITE_URL}/api/og?title=PRD+Examples+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const EXAMPLES = [
  {
    title: "Consumer Feature PRD: Streak Reminders for PM Streak",
    sections: [
      { section: "TL;DR", content: "Add timezone-aware streak reminders to increase Day-7 retention from 22% to 28%. 3-week build. Feature flag rollout to 10% → 100%." },
      { section: "Problem", content: "40% of new users who complete Day 1 don&apos;t return by Day 2. Retention curve drops sharply. Users tell us in interviews: &apos;I meant to come back but forgot.&apos;" },
      { section: "Goals", content: "Primary: D7 retention 22% → 28%. Secondary: Notification open rate &gt;25%. Guardrail: app uninstalls don&apos;t increase." },
      { section: "User stories", content: "As a new user who completed lesson 1, I receive a reminder at a time I&apos;m likely to be free, so I return to continue my streak." },
      { section: "Out of scope", content: "Smart timing personalisation (v2). Web push (later quarter). Multiple daily reminders." },
    ],
  },
  {
    title: "B2B Feature PRD: Approval Workflow for Razorpay-Style Platform",
    sections: [
      { section: "TL;DR", content: "Add configurable multi-level approval for payments &gt;₹50K. Addresses top request from enterprise customers. 6-week build." },
      { section: "Problem", content: "15 enterprise customers (₹8Cr combined ARR) have flagged lack of approval workflows as gating deal expansion. Top 3 competitors all have it." },
      { section: "Goals", content: "Primary: Unblock 5 stalled deals in Q2. Secondary: Reduce admin-reported &apos;accidental payments&apos; by 80%." },
      { section: "User stories", content: "As a finance admin, I set up an approval rule so that payments above X require approval from Y, so I prevent unauthorised outflows." },
      { section: "Out of scope", content: "Mobile approval flows (v2). Integration with Slack (v2). Dynamic rules based on payment type." },
    ],
  },
  {
    title: "Platform Feature PRD: Internal Feature Flag Dashboard",
    sections: [
      { section: "TL;DR", content: "Build internal feature flag dashboard to reduce mis-configurations that caused 3 incidents last quarter. 4-week build." },
      { section: "Problem", content: "Engineers currently configure feature flags via config files. 3 production incidents in Q1 were caused by misconfigurations. Root cause: no safe preview, no audit log." },
      { section: "Goals", content: "Primary: Zero config-caused incidents in Q3. Secondary: Time to configure a flag from 15 min to 2 min." },
      { section: "User stories", content: "As an engineer, I change a feature flag percentage in a UI with preview, audit log, and one-click rollback, so I don&apos;t cause incidents." },
      { section: "Out of scope", content: "Cross-service flag dependencies (v2). ML-based anomaly detection on flag changes (exploratory)." },
    ],
  },
];

const COMMON_PATTERNS = [
  "Every PRD starts with a TL;DR — 3–4 sentences that executives can read in 30 seconds",
  "Problem statements include evidence (numbers, customer quotes) — not just assertions",
  "Goals are specific with targets — &apos;D7 retention 22% → 28%&apos; beats &apos;improve retention&apos;",
  "Out-of-scope section is explicit — prevents scope creep during build",
  "User stories use the persona + job + outcome format consistently",
];

const FAQS = [
  {
    q: "How long should a PRD be?",
    a: "2–4 pages for most features. 1 page for small ones. 5+ pages for major product launches. Longer than 5 means you&apos;re either over-specifying or trying to write a strategy doc inside a PRD — separate them.",
  },
  {
    q: "What makes a bad PRD?",
    a: "No clear problem statement, no success metrics, no explicit out-of-scope section, and no user stories. Bad PRDs read like feature lists. Great PRDs read like &apos;here&apos;s the problem, here&apos;s our bet, here&apos;s how we&apos;ll know if it worked.&apos;",
  },
];

export default function PmPrdExamplesPage() {
  const dates = pageDates("/pm-prd-examples");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PRD Examples", url: `${SITE_URL}/pm-prd-examples` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PRD Examples (2026 Edition)",
        description:
          "3 real-style PRD examples for consumer, B2B, and platform features. See structure, detail level, and how great PMs balance thoroughness with brevity.",
        image: `${SITE_URL}/api/og?title=PRD+Examples+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-prd-examples`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📄</span> See what good PRDs actually look like
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PRD Examples<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            This guide walks through three real-style PRDs—a consumer feature, a B2B approval workflow, and an internal platform tool—each broken into TL;DR, problem, goals, user stories, and out-of-scope sections. Across all three, the common thread is evidence-backed problem statements, specific numeric goals, and an explicit out-of-scope list that heads off scope creep before the build starts.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            3 real-style PRDs — consumer feature, B2B feature, internal platform feature.
            See structure, detail level, and the language of great PM writing.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice PRD Writing Daily — Free →
          </Link>
        </section>

        {/* Examples */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="space-y-8">
            {EXAMPLES.map((e, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <p className="font-bold text-white mb-4">{i + 1}. {e.title}</p>
                <div className="space-y-3">
                  {e.sections.map((s, j) => (
                    <div key={j} className="bg-[#0e1113] rounded-lg p-4">
                      <p className="text-xs text-[#89e219] uppercase tracking-wider mb-1">{s.section}</p>
                      <p className="text-sm text-white/70">{s.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Common patterns */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Common Patterns Across Great PRDs</h2>
            <div className="space-y-2">
              {COMMON_PATTERNS.map((p, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{p}</p>
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

        <RelatedPages slug="pm-prd-examples" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice PRD Writing Daily</h2>
          <p className="text-white/60 mb-6">Daily PM scenarios that force concise, structured writing — the core PRD skill.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
