import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Churn Analysis (2026) — Find Why Users Leave and Fix It",
  description:
    "How PMs diagnose churn. Types of churn, root-cause analysis, and the 5 levers PMs use to reduce churn meaningfully.",
  keywords: [
    "PM churn analysis", "reducing churn PM",
    "churn diagnosis product", "user churn PM",
    "churn reduction 2026",
  ],
  alternates: { canonical: "/pm-churn-analysis" },
  openGraph: {
    title: "PM Churn Analysis 2026 — PM Streak",
    description: "How PMs diagnose churn and reduce it meaningfully — types, root causes, 5 levers.",
    url: `${SITE_URL}/pm-churn-analysis`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Churn+Analysis+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Churn Analysis 2026 — PM Streak",
    description: "How PMs diagnose churn and reduce it meaningfully — types, root causes, 5 levers.",
    images: [`${SITE_URL}/api/og?title=PM+Churn+Analysis+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const CHURN_TYPES = [
  { type: "Onboarding churn", what: "Users signup but never activate — often UX or expectation mismatch" },
  { type: "Early-retention churn", what: "Users activate but don&apos;t return past Day 7 — value not sticky enough" },
  { type: "Mid-term churn", what: "Users engage for weeks then drift off — product novelty wearing off" },
  { type: "Voluntary cancellation", what: "Users actively cancel — usually explicit value mismatch" },
  { type: "Involuntary churn", what: "Payment fails, account lapses — recoverable with better dunning" },
];

const DIAGNOSIS_STEPS = [
  "Segment by cohort — is it recent cohorts or historical churn?",
  "Segment by acquisition channel — paid users often churn faster than organic",
  "Segment by usage pattern — power users vs casual vs passive — which is bleeding?",
  "Run exit surveys — short (3 questions), voluntary, analyse themes",
  "Interview 5 churned users — qualitative depth on why they left",
  "Map churn against product events — did a change correlate with churn spike?",
];

const ROOT_CAUSES = [
  "Value unclear in first session — users leave without understanding why",
  "UX friction at a critical step — blocks users from sustained engagement",
  "Missing feature they expected — especially post-competitor comparison",
  "Alternative became more compelling — competitive churn",
  "Life-stage change — users aged out of the product (not always recoverable)",
  "Pricing tension — value not matching cost at renewal",
];

const LEVERS_TO_REDUCE = [
  "Improve onboarding — if you can&apos;t activate, you can&apos;t retain",
  "Build habit loops — streaks, reminders, notifications (ethically used)",
  "Add content/data that compounds — users&apos; investment increases switching cost",
  "Win-back flows — targeted offers or features for recently churned users",
  "Reduce involuntary churn — better payment retry logic, grace periods",
];

const FAQS = [
  {
    q: "What churn rate is acceptable?",
    a: "Depends on product type. B2B SaaS enterprise: &lt;1% monthly logo churn is good. SMB SaaS: 3–5% monthly. Consumer apps: 10–20% monthly is normal for free tier, lower for paid. The absolute number matters less than the trend — rising churn is a signal regardless of where you start.",
  },
  {
    q: "What&apos;s the biggest churn analysis mistake?",
    a: "Only looking at aggregate churn rate. 10% monthly churn might be 25% among paid users and 3% among free — completely different problems. Always segment by acquisition channel, cohort, and usage tier before drawing conclusions. PMs who never segment churn miss the actual problem.",
  },
];

export default function PmChurnAnalysisPage() {
  const dates = pageDates("/pm-churn-analysis");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Churn Analysis", url: `${SITE_URL}/pm-churn-analysis` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Churn Analysis Guide (2026 Edition)",
        description:
          "How PMs diagnose churn. Types of churn, root-cause analysis, and the 5 levers PMs use to reduce churn meaningfully.",
        image: `${SITE_URL}/api/og?title=PM+Churn+Analysis+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-churn-analysis`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>💧</span> Plug the leak before pouring more users in
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Churn Analysis Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Churn shows up in five different shapes — from users who never activate after signup to those who actively cancel or simply stop paying — so diagnosis means segmenting by cohort, channel, and usage pattern before running exit surveys or churned-user interviews to find root causes like unclear first-session value, UX friction, or pricing tension, then applying levers such as better onboarding, habit loops, or win-back flows.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 types of churn, 6 diagnosis steps, 6 root causes, and 5 levers to reduce churn meaningfully.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Retention Skills Daily — Free →
          </Link>
        </section>

        {/* Churn types */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Types of Churn</h2>
          <div className="space-y-3">
            {CHURN_TYPES.map((c, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-white text-sm mb-1">{i + 1}. {c.type}</p>
                <p className="text-xs text-white/60">{c.what}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Diagnosis */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Diagnosis Steps</h2>
            <div className="space-y-2">
              {DIAGNOSIS_STEPS.map((d, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Root causes */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Common Root Causes</h2>
          <div className="space-y-2">
            {ROOT_CAUSES.map((r, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-yellow-400 flex-shrink-0">⚠️</span>
                <p className="text-sm text-white/70">{r}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Levers */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Levers to Reduce Churn</h2>
            <div className="space-y-2">
              {LEVERS_TO_REDUCE.map((l, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{l}</p>
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

        <RelatedPages slug="pm-churn-analysis" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Retention Skills Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on churn diagnosis, root-causing, and retention design.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
