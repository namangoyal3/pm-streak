import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Deprecations Guide (2026) — How to Kill Features Without Killing Trust",
  description:
    "How PMs deprecate features without burning customers. Communication, migration paths, timelines, and why deprecating is a senior-PM skill.",
  keywords: [
    "PM deprecations", "killing features PM",
    "deprecating product PM", "sunset feature PM",
    "product sunset 2026",
  ],
  alternates: { canonical: "/pm-deprecations" },
  openGraph: {
    title: "PM Deprecations Guide 2026 — PM Streak",
    description: "How PMs kill features without killing trust — communication, migration, timelines.",
    url: `${SITE_URL}/pm-deprecations`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Deprecations+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Deprecations Guide 2026 — PM Streak",
    description: "How PMs kill features without killing trust — communication, migration, timelines.",
    images: [`${SITE_URL}/api/og?title=PM+Deprecations+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const WHEN_TO_DEPRECATE = [
  "Feature used by &lt;1% of users, costs &gt;1 engineer&apos;s weekly maintenance",
  "Feature is blocking a better replacement that can&apos;t coexist",
  "Technical debt makes it dangerous to keep",
  "Better external option exists (e.g., you&apos;re not going to out-build Stripe)",
  "Strategic direction has changed — feature no longer fits",
];

const PROCESS = [
  { step: "Make the case internally", what: "Data on usage, maintenance cost, opportunity cost. Get buy-in from leadership + CS." },
  { step: "Notify affected users early", what: "90+ days notice for important features. 30+ days minimum even for small ones." },
  { step: "Provide migration path", what: "Clear alternative (yours or external). Don&apos;t leave users stranded." },
  { step: "Export / data preservation", what: "Users should be able to get their data out. Not offering this erodes trust badly." },
  { step: "Monitor + extend if needed", what: "If a major customer segment is impacted, extend deadline. Rigidity isn&apos;t strength." },
  { step: "Post-deprecation review", what: "Did anyone complain? Were we too aggressive / not aggressive enough? Feed into next deprecation." },
];

const COMMUNICATION_TEMPLATE = [
  "What&apos;s happening: &apos;We&apos;re deprecating [feature] on [date].&apos;",
  "Why: &apos;We&apos;re doing this because [reason — usually better alternative or strategic focus].&apos;",
  "What you need to do: &apos;Before [date], please [specific action].&apos;",
  "Migration help: &apos;We&apos;ve built [path] to help you move. Here&apos;s [link/docs].&apos;",
  "Timeline: &apos;[N] days notice. We&apos;ll send reminders at [N-30], [N-7], [N-1].&apos;",
];

const MISTAKES = [
  "Too-short notice — users feel ambushed",
  "No migration path — users feel stranded",
  "Deprecating without data — usage might have been higher than you thought",
  "Vague communication — &apos;we&apos;re improving the experience&apos; instead of &apos;feature X is going away&apos;",
  "Extending deprecation indefinitely — signals you don&apos;t actually have conviction",
  "Treating deprecation as purely technical — it&apos;s a customer communication project",
];

const FAQS = [
  {
    q: "Why is deprecating hard for PMs?",
    a: "Two reasons: customer pain (you&apos;re removing something someone uses) and internal debate (killing things feels like undoing work). Senior PMs get comfortable with both. The real discipline: not being so attached to existing features that you can&apos;t clear space for better ones. Companies that can&apos;t deprecate get crushed under feature bloat.",
  },
  {
    q: "How much notice should PMs give before deprecating a feature?",
    a: "Depends on impact. Minor features / internal tools: 30 days. User-facing features with active users: 60–90 days. API/integration deprecations affecting third parties: 6–12 months. The rule: more notice for features users depend on professionally, less for features they casually touch.",
  },
];

export default function PmDeprecationsPage() {
  const dates = pageDates("/pm-deprecations");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Deprecations", url: `${SITE_URL}/pm-deprecations` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Deprecations Guide (2026 Edition)",
        description:
          "How PMs deprecate features without burning customers. Communication, migration paths, timelines, and why deprecating is a senior-PM skill.",
        image: `${SITE_URL}/api/og?title=PM+Deprecations+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-deprecations`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🗑️</span> Killing features well is a senior-PM skill
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Deprecations Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-2">
            Deprecating a feature well starts with spotting the signals — under 1% usage relative to its
            maintenance cost, or a feature blocking a stronger replacement — then running the six-step
            process: build the internal case, give users 30 to 90+ days notice, offer a migration path,
            preserve their data, and review afterward. Vague communication and missing migration paths
            are what erode trust fastest.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 signals it&apos;s time to deprecate, 6-step process, communication template,
            and 6 mistakes that destroy customer trust.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Senior PM Judgment Daily — Free →
          </Link>
        </section>

        {/* When */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Signals to Deprecate</h2>
          <div className="space-y-2">
            {WHEN_TO_DEPRECATE.map((w, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{w}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6-Step Deprecation Process</h2>
            <div className="space-y-3">
              {PROCESS.map((p, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-white text-sm mb-1">{i + 1}. {p.step}</p>
                  <p className="text-xs text-white/60">{p.what}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Communication */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5-Part Communication Template</h2>
          <div className="space-y-2">
            {COMMUNICATION_TEMPLATE.map((c, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70 italic">{c}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mistakes */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Deprecation Mistakes</h2>
            <div className="space-y-2">
              {MISTAKES.map((m, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-red-400 flex-shrink-0">❌</span>
                  <p className="text-sm text-white/70">{m}</p>
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

        <RelatedPages slug="pm-deprecations" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Senior PM Judgment Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on killing, scoping, and hard trade-offs.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
