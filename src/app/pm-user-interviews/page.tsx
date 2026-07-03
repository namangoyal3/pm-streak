import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM User Interviews (2026) — How to Run Interviews That Change Decisions",
  description:
    "How PMs run user interviews that actually change product decisions. Question design, note-taking, synthesis, and the traps interviewers fall into.",
  keywords: [
    "PM user interviews", "user research PM",
    "customer interviews", "interview technique 2026",
  ],
  alternates: { canonical: "/pm-user-interviews" },
  openGraph: {
    title: "PM User Interviews 2026 — PM Streak",
    description: "How to run interviews that actually change decisions.",
    url: `${SITE_URL}/pm-user-interviews`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+User+Interviews+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM User Interviews 2026 — PM Streak",
    description: "How to run interviews that actually change decisions.",
    images: [`${SITE_URL}/api/og?title=PM+User+Interviews+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const RULES = [
  "Ask about past behaviour, not hypothetical futures — &apos;show me the last time&apos; &gt; &apos;would you&apos;",
  "Shut up — target 70% listening, 30% asking",
  "&apos;Why?&apos; five times — surface-level answers hide the real driver",
  "Observe, don&apos;t ask — watching beats asking about UX every time",
  "One interviewer, one note-taker — split cognitive load",
  "Sample size 5 per segment — you&apos;ll hear the pattern; more is diminishing returns",
];

const TRAPS = [
  "Leading questions — &apos;don&apos;t you think this would be great?&apos;",
  "Accepting stated preference over observed behaviour",
  "Interviewing only power users — blind spot for the mainstream",
  "No synthesis — raw notes rot; themes decay; decisions suffer",
];

const FAQS = [
  {
    q: "How often should PMs interview users?",
    a: "Minimum: 5 interviews per month as a baseline habit. More during discovery or major rework. PMs who go months without talking to users develop polished but wrong mental models. Interview hygiene is like code review — skip it, and quality rots silently.",
  },
];

export default function PmUserInterviewsPage() {
  const dates = pageDates("/pm-user-interviews");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM User Interviews", url: `${SITE_URL}/pm-user-interviews` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM User Interviews (2026 Edition)",
        description: "How PMs run user interviews that actually change product decisions. Question design, note-taking, synthesis, and the traps interviewers fall into.",
        image: `${SITE_URL}/api/og?title=PM+User+Interviews+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-user-interviews`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🗣️</span> Observed behaviour beats stated preference, every time
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM User Interviews<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Good user interviews ask about past behavior instead of hypothetical futures, favor
            observation over stated preference, and keep interviewers listening roughly 70% of
            the time — with one interviewer and one note-taker per session to split cognitive
            load. Skipping synthesis is the most common trap: raw notes rot and themes decay,
            which is why five interviews a month is the baseline habit.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 rules for interviews that change decisions and 4 traps to avoid.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Research PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Rules</h2>
          <div className="space-y-2">
            {RULES.map((r, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{r}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">4 Traps</h2>
            <div className="space-y-2">
              {TRAPS.map((t, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-red-400 flex-shrink-0">❌</span>
                  <p className="text-sm text-white/70">{t}</p>
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

        <RelatedPages slug="pm-user-interviews" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Interview Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
