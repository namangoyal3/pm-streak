import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM AI Hardware (2026) — Rabbit, Humane, Friend PM Lessons",
  description:
    "How PMs build AI-first hardware. Why standalone AI devices keep failing, what&apos;s actually working, and the lessons from Rabbit R1 and Humane AI Pin.",
  keywords: [
    "PM AI hardware", "Rabbit PM",
    "Humane AI Pin", "AI device 2026",
  ],
  alternates: { canonical: "/pm-ai-hardware" },
  openGraph: {
    title: "PM AI Hardware 2026 — PM Streak",
    description: "How PMs build AI-first hardware.",
    url: `${SITE_URL}/pm-ai-hardware`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+AI+Hardware+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM AI Hardware 2026 — PM Streak",
    description: "How PMs build AI-first hardware.",
    images: [`${SITE_URL}/api/og?title=PM+AI+Hardware+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Smartphones are tough to beat — a general-purpose pocket computer is hard competition",
  "Latency + battery + connectivity must all work — one failure ruins it",
  "Utility beats novelty — demos win press, not users",
  "Hardware cycle mismatch — software iterates weekly, hardware quarterly",
  "Post-launch software updates define long-term viability",
];

const LESSONS = [
  "Rabbit R1 shipped fast but under-delivered on LAM promises",
  "Humane AI Pin launched expensive, under-utilised, discontinued in 2024",
  "Meta Ray-Ban Smart Glasses succeeded by being glasses first, AI second",
  "Friend (always-listening pendant) demonstrates adoption requires clear utility",
];

const FAQS = [
  {
    q: "Is AI-first hardware doomed or just early?",
    a: "Mostly early, partly mis-framed. Products that replace the phone have failed; products that augment existing hardware (glasses, earbuds) have succeeded. The winning pattern: add AI to a form factor users already wear, not ask them to adopt a new category cold.",
  },
];

export default function PmAiHardwarePage() {
  const dates = pageDates("/pm-ai-hardware");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM AI Hardware", url: `${SITE_URL}/pm-ai-hardware` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM AI Hardware (2026 Edition)",
        description:
          "How PMs build AI-first hardware. Why standalone AI devices keep failing, what&apos;s actually working, and the lessons from Rabbit R1 and Humane AI Pin.",
        image: `${SITE_URL}/api/og?title=PM+AI+Hardware+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-ai-hardware`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔌</span> Augment existing hardware. Don&apos;t ask users to adopt new categories cold.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM AI Hardware<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Standalone AI devices that try to replace the phone keep failing — Humane&apos;s AI Pin launched expensive and under-utilised before being discontinued in 2024, and Rabbit&apos;s R1 shipped fast but under-delivered on its LAM promises — while products that augment hardware people already wear, like Meta&apos;s Ray-Ban Smart Glasses, succeed by being glasses first and AI second. The pattern holds because utility beats novelty: demos win press, not users.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 4 lessons from AI hardware launches so far.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build AI Hardware PM Skills — Free →
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
            <h2 className="text-2xl font-bold text-center mb-10">4 Lessons</h2>
            <div className="space-y-2">
              {LESSONS.map((l, i) => (
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

        <RelatedPages slug="pm-ai-hardware" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice AI Hardware PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
