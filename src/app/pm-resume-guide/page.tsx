import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Resume Guide (2026) — Writing a PM Resume That Gets Interviews",
  description:
    "How PMs write resumes that get past recruiters. Structure, verbs, metrics, and why most PM resumes read the same boring way.",
  keywords: [
    "PM resume guide", "product manager resume",
    "PM CV 2026",
  ],
  alternates: { canonical: "/pm-resume-guide" },
  openGraph: {
    title: "PM Resume Guide 2026 — PM Streak",
    description: "How PMs write resumes that get interviews.",
    url: `${SITE_URL}/pm-resume-guide`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Resume+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Resume Guide 2026 — PM Streak",
    description: "How PMs write resumes that get interviews.",
    images: [`${SITE_URL}/api/og?title=PM+Resume+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PRINCIPLES = [
  "Lead with outcomes, not activities — &apos;Launched X&apos; &lt; &apos;Increased conversion 18%&apos;",
  "Specific metrics — avoid &apos;significantly&apos; and &apos;drove&apos;",
  "Cut fluff — 1-page for under 10 years&apos; experience",
  "Show scope — users affected, revenue, team size",
  "Tailor to the role — same resume for every job loses",
];

const RED_FLAGS = [
  "No numbers in any bullet",
  "Listing responsibilities instead of achievements",
  "Overuse of buzzwords (synergy, agile ninja)",
  "Formatting that doesn&apos;t survive ATS parsing",
];

const FAQS = [
  {
    q: "Should PM resumes include a summary section?",
    a: "Useful for senior PMs (5+ years) and career-switchers; unnecessary for APMs and junior PMs. If you use one, make it 2–3 lines max, focused on most recent impact. Generic summaries (&apos;passionate product manager with 5 years of experience&apos;) add nothing.",
  },
];

export default function PmResumeGuidePage() {
  const dates = pageDates("/pm-resume-guide");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Resume Guide", url: `${SITE_URL}/pm-resume-guide` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Resume Guide (2026 Edition)",
        description:
          "How PMs write resumes that get past recruiters. Structure, verbs, metrics, and why most PM resumes read the same boring way.",
        image: `${SITE_URL}/api/og?title=PM+Resume+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-resume-guide`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📄</span> Outcomes beat activities. Numbers beat adjectives.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Resume Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            PM resumes that get interviews lead with outcomes instead of activities, use specific metrics rather than vague adjectives, stay to one page for anyone with under ten years of experience, and show real scope — users affected, revenue, team size — while red flags like missing numbers, listed responsibilities, buzzwords, and formatting that doesn&apos;t survive ATS parsing hold candidates back.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 principles and 4 red flags for PM resumes.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Resume PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Principles</h2>
          <div className="space-y-2">
            {PRINCIPLES.map((p, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{p}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">4 Red Flags</h2>
            <div className="space-y-2">
              {RED_FLAGS.map((r, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-red-400 flex-shrink-0">❌</span>
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

        <RelatedPages slug="pm-resume-guide" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Resume Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
