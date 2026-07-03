import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM AI Feature Launch (2026) — Launching AI Features Without Disasters",
  description:
    "How PMs launch AI features. Beta gates, eval thresholds, kill switches, and what to communicate publicly.",
  keywords: [
    "PM AI launch", "AI feature launch 2026",
  ],
  alternates: { canonical: "/pm-ai-feature-launch" },
  openGraph: {
    title: "PM AI Feature Launch 2026 — PM Streak",
    description: "Launching AI features without disasters.",
    url: `${SITE_URL}/pm-ai-feature-launch`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+AI+Feature+Launch+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM AI Feature Launch 2026 — PM Streak",
    description: "Launching AI features without disasters.",
    images: [`${SITE_URL}/api/og?title=PM+AI+Feature+Launch+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const STAGES = [
  "Internal dogfood — at least 2 weeks before external",
  "Closed beta with select power users",
  "Limited public beta with feedback widget",
  "Gradual rollout with kill switches",
  "Full launch with marketing",
];

const RULES = [
  "Eval thresholds must be met at each stage",
  "Kill switch tested before any rollout",
  "Communicate uncertainty honestly in launch copy",
  "Set up monitoring for hallucination and refusal rates",
  "Plan for the &apos;weird tweet&apos; — viral edge cases will happen",
];

const FAQS = [
  {
    q: "Why do AI features fail at launch more often than non-AI features?",
    a: "Because edge cases scale with users, and AI edge cases are weirder than UI edge cases. A non-AI feature might fail with bad data; an AI feature can fail in ways nobody anticipated. Gradual rollout, eval-driven gates, and kill switches turn would-be disasters into small incidents.",
  },
];

export default function PmAiFeatureLaunchPage() {
  const dates = pageDates("/pm-ai-feature-launch");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM AI Feature Launch", url: `${SITE_URL}/pm-ai-feature-launch` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM AI Feature Launch (2026 Edition)",
        description:
          "How PMs launch AI features. Beta gates, eval thresholds, kill switches, and what to communicate publicly.",
        image: `${SITE_URL}/api/og?title=PM+AI+Feature+Launch+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-ai-feature-launch`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🚀</span> Plan for the weird tweet. AI edge cases scale with users.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM AI Feature Launch<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Launching an AI feature safely means moving through five gated stages — internal dogfood, closed beta, limited public beta, gradual rollout with kill switches, then full launch — while enforcing eval thresholds at each stage, testing the kill switch before rollout, and monitoring hallucination and refusal rates, because AI edge cases scale with users in ways non-AI features rarely do.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 launch stages and 5 rules for AI feature launches.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build AI Launch PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Stages</h2>
          <div className="space-y-2">
            {STAGES.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{s}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Rules</h2>
            <div className="space-y-2">
              {RULES.map((r, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
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

        <RelatedPages slug="pm-ai-feature-launch" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice AI Launch Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
