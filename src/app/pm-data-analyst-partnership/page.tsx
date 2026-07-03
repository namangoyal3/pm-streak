import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM + Data Analyst Partnership (2026) — How to Work With Data Teams Effectively",
  description:
    "How PMs work with data analysts effectively. What to ask for, what to not ask for, how to set up self-serve, and building deep analytical partnership over time.",
  keywords: [
    "PM data analyst", "PM data partnership",
    "working with data team PM", "self-serve analytics PM",
    "data analyst collaboration 2026",
  ],
  alternates: { canonical: "/pm-data-analyst-partnership" },
  openGraph: {
    title: "PM + Data Analyst Partnership 2026 — PM Streak",
    description: "How PMs work with data analysts effectively — what to ask, what to skip, how to build partnership.",
    url: `${SITE_URL}/pm-data-analyst-partnership`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+++Data+Analyst+Partnership+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM + Data Analyst Partnership 2026 — PM Streak",
    description: "How PMs work with data analysts effectively — what to ask, what to skip, how to build partnership.",
    images: [`${SITE_URL}/api/og?title=PM+++Data+Analyst+Partnership+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const WHAT_TO_ASK = [
  "Complex SQL queries that need data warehouse joins across multiple tables",
  "Deep causal analysis (what&apos;s driving a metric move?)",
  "Statistical analysis — significance testing, regressions, predictive modelling",
  "Segmentation and cohort deep-dives across large datasets",
  "Setting up proper experiment analysis pipelines",
  "Dashboard architecture for long-term team use",
];

const WHAT_NOT_TO_ASK = [
  "Basic metric lookups you could pull yourself (&apos;what&apos;s our DAU this week?&apos;)",
  "Data questions you haven&apos;t tried to frame — &apos;I need some data&apos; wastes their time",
  "Tasks that require waiting a week when you could learn SQL in 4 weeks",
  "Requests without context — tell them WHY you want the data, not just what",
  "Urgent requests without warning — data teams have their own sprints",
];

const SELF_SERVE = [
  "Learn SQL for basic queries — SELECT, WHERE, GROUP BY, JOIN (4 weeks to fluency)",
  "Build dashboards in Amplitude/Mixpanel yourself — most PM use cases covered",
  "Use Looker/Metabase/Superset for custom views — most companies have these",
  "Cultivate 2–3 &apos;canned&apos; queries for common questions — retention, funnel, cohort",
  "Review raw data occasionally — builds intuition faster than reports",
];

const PARTNERSHIP_MOVES = [
  "Include analysts in product discussions early — they&apos;ll flag measurement gaps before you ship",
  "Share context: &apos;I&apos;m trying to decide X, need Y data to inform&apos; — context improves analysis",
  "Give them agency on methodology — don&apos;t dictate how they cut data",
  "Build dashboards FOR them too — analysts also have information needs",
  "Credit them publicly — data insights often go uncredited vs product wins",
  "Protect their deep work — don&apos;t Slack-interrupt them; batch questions",
];

const FAQS = [
  {
    q: "Should PMs learn SQL or depend on analysts?",
    a: "Learn it — basic SQL is table stakes for modern PMs. You don&apos;t need to be expert, just fluent enough for daily questions. Depending entirely on analysts creates 2–3 day cycles for questions that should take 10 minutes. PMs who can SQL are 3x more self-sufficient, which frees analysts for the complex work they&apos;re actually needed for.",
  },
  {
    q: "What&apos;s the biggest PM + data analyst partnership mistake?",
    a: "Treating analysts as query-fulfillers. The PMs who get the best data work from analysts treat them as thought partners — sharing product context, inviting them to decisions, respecting their methodological choices. The PMs who just send SQL requests get basic queries back. The relationship is the leverage.",
  },
];

export default function PmDataAnalystPartnershipPage() {
  const dates = pageDates("/pm-data-analyst-partnership");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM + Data Analyst Partnership", url: `${SITE_URL}/pm-data-analyst-partnership` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM + Data Analyst Partnership (2026 Edition)",
        description: "How PMs work with data analysts effectively. What to ask for, what to not ask for, how to set up self-serve, and building deep analytical partnership over time.",
        image: `${SITE_URL}/api/og?title=PM+++Data+Analyst+Partnership+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-data-analyst-partnership`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🤝</span> Data analysts are thought partners — not query fulfillers
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM + Data Analyst Partnership<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            PM-data analyst partnership works best split three ways: ask analysts for complex SQL, causal analysis, and experiment pipelines; self-serve basic metric lookups by learning SQL and building dashboards in Amplitude or Mixpanel; and sustain the relationship by sharing context, crediting their insights, and protecting their deep-work time instead of Slack-interrupting with ad hoc requests.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-4">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 things to ask analysts for, 5 things to self-serve, 5 self-serve moves,
            and 6 partnership practices that compound over time.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Data Skills Daily — Free →
          </Link>
        </section>

        {/* What to ask */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Things Worth Asking Data Analysts</h2>
          <div className="space-y-2">
            {WHAT_TO_ASK.map((w, i) => (
              <div key={i} className="bg-[#111] border border-green-500/20 rounded-xl p-3 flex gap-3">
                <span className="text-green-400 font-bold flex-shrink-0">✓</span>
                <p className="text-sm text-white/70">{w}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What not to ask */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Things to Skip (or Self-Serve)</h2>
            <div className="space-y-2">
              {WHAT_NOT_TO_ASK.map((w, i) => (
                <div key={i} className="bg-[#111] border border-red-500/20 rounded-xl p-3 flex gap-3">
                  <span className="text-red-400 flex-shrink-0">❌</span>
                  <p className="text-sm text-white/70">{w}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Self-serve */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Self-Serve Moves</h2>
          <div className="space-y-2">
            {SELF_SERVE.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{s}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Partnership */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Partnership Practices</h2>
            <div className="space-y-2">
              {PARTNERSHIP_MOVES.map((p, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
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

        <RelatedPages slug="pm-data-analyst-partnership" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Data Intuition Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on metric interpretation, funnel diagnosis, and experiment analysis.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
