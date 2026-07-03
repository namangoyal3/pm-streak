import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Content Moderation (2026) — How PMs Build Trust & Safety Systems",
  description:
    "How PMs build content moderation at scale. Policy, automation, human review, and the tough calls no framework makes for you.",
  keywords: [
    "PM content moderation", "trust and safety PM",
    "moderation PM", "T&S 2026",
  ],
  alternates: { canonical: "/pm-content-moderation" },
  openGraph: {
    title: "PM Content Moderation 2026 — PM Streak",
    description: "How PMs build trust & safety systems — policy, automation, review.",
    url: `${SITE_URL}/pm-content-moderation`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Content+Moderation+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Content Moderation 2026 — PM Streak",
    description: "How PMs build trust & safety systems — policy, automation, review.",
    images: [`${SITE_URL}/api/og?title=PM+Content+Moderation+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const STACK = [
  "Policy layer — what is allowed, what is not, who decides",
  "Automated detection — ML classifiers, hash matching, keyword filters",
  "Human review — the queue, the reviewers, their wellbeing",
  "User reports — detection signal + community trust mechanism",
  "Appeals — every action must be reversible with due process",
  "Transparency reports — what you took down, why, and how often",
];

const METRICS = [
  "Prevalence — % of content exposed to users that violates policy",
  "Proactive detection rate — % removed before user reports",
  "Time-to-action on high-severity content — minutes, not hours",
  "Appeal overturn rate — false positive signal",
  "Reviewer accuracy — inter-rater agreement on sample",
];

const FAQS = [
  {
    q: "Is content moderation PM worth doing?",
    a: "High-impact, high-stress, under-appreciated. You make decisions that affect millions daily, often with imperfect information. Career paths lead to senior Trust & Safety leadership, policy roles at regulators, or cross-over into civic tech. Not for PMs who want clean problems with clear right answers.",
  },
];

export default function PmContentModerationPage() {
  const dates = pageDates("/pm-content-moderation");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Content Moderation", url: `${SITE_URL}/pm-content-moderation` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Content Moderation (2026 Edition)",
        description:
          "How PMs build content moderation at scale. Policy, automation, human review, and the tough calls no framework makes for you.",
        image: `${SITE_URL}/api/og?title=PM+Content+Moderation+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-content-moderation`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🛡️</span> Every platform moderates. The choice is whether you do it well.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Content Moderation<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Behind every moderated platform sits a policy layer defining what&apos;s allowed, automated detection through classifiers and hash matching, a human review queue, user reports, reversible appeals, and public transparency reports — and PM success in this stack is measured by prevalence of violating content, proactive detection rate, time-to-action on severe cases, appeal overturn rate, and how consistently reviewers agree with each other.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 stack layers and 5 metrics for trust &amp; safety PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build T&amp;S PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Stack Layers</h2>
          <div className="space-y-2">
            {STACK.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{s}</p>
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

        <RelatedPages slug="pm-content-moderation" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Trust &amp; Safety Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
