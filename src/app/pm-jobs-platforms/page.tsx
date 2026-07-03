import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Jobs Platforms (2026) — LinkedIn, Naukri, Apna, Wellfound PM Guide",
  description:
    "How PMs build jobs and hiring products. Candidate quality, match rate, Tier-2/3 market, and why Apna rewrote the blue-collar playbook.",
  keywords: [
    "PM jobs platforms", "LinkedIn PM",
    "Naukri PM", "Apna PM 2026",
  ],
  alternates: { canonical: "/pm-jobs-platforms" },
  openGraph: {
    title: "PM Jobs Platforms 2026 — PM Streak",
    description: "How PMs build jobs and hiring products.",
    url: `${SITE_URL}/pm-jobs-platforms`,
    type: "article",
  },
};

const DYNAMICS = [
  "Two-sided marketplace — candidates and employers, each with different product needs",
  "Match quality beats listing count — spam listings destroy trust",
  "Blue-collar vs white-collar dynamics differ — Apna, Rozgar vs LinkedIn, Naukri",
  "Vernacular UX unlocks Tier-2/3 scale",
  "Fraud (fake jobs, fake profiles) is an existential threat",
];

const METRICS = [
  "Candidate-to-employer response rate",
  "Apply-to-interview conversion",
  "Interview-to-hire conversion",
  "Listing freshness and quality score",
  "Repeat posting rate by employers",
];

const FAQS = [
  {
    q: "Why did Apna grow faster than LinkedIn in India?",
    a: "By serving blue-collar and emerging white-collar audiences LinkedIn underserved — vernacular-first UX, community and peer interaction, and trust signals built around referrals and micro-credentials. It&apos;s a lesson: large incumbents often miss underserved adjacent audiences, and entrants who embrace those audiences can scale fast.",
  },
];

export default function PmJobsPlatformsPage() {
  const dates = pageDates("/pm-jobs-platforms");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Jobs Platforms", url: `${SITE_URL}/pm-jobs-platforms` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Jobs Platforms (India Edition)",
        description: "How PMs build jobs and hiring products. Candidate quality, match rate, Tier-2/3 market, and why Apna rewrote the blue-collar playbook.",
        image: `${SITE_URL}/api/og?title=PM+Jobs+Platforms+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-jobs-platforms`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>💼</span> Match quality beats listing volume
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Jobs Platforms<br />(India Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Jobs platforms are two-sided marketplaces where candidates and employers need fundamentally different products, and the PM&apos;s real job is protecting match quality — apply-to-interview and interview-to-hire conversion — rather than chasing raw listing volume, since spam listings and fake profiles erode trust faster than any growth tactic can rebuild it.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for jobs platform PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Jobs Platform PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Dynamics</h2>
          <div className="space-y-2">
            {DYNAMICS.map((d, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Metrics</h2>
            <div className="space-y-2">
              {METRICS.map((m, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
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

        <RelatedPages slug="pm-jobs-platforms" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Jobs Platform Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
