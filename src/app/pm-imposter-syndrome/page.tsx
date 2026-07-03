import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Imposter Syndrome (2026) — Why PMs Feel It and How to Deal",
  description:
    "Why PMs experience imposter syndrome more than most roles, what to do about it, and which parts of the feeling are actually useful.",
  keywords: [
    "PM imposter syndrome", "PM career confidence 2026",
  ],
  alternates: { canonical: "/pm-imposter-syndrome" },
  openGraph: {
    title: "PM Imposter Syndrome 2026 — PM Streak",
    description: "Why PMs feel imposter syndrome and how to handle it.",
    url: `${SITE_URL}/pm-imposter-syndrome`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Imposter+Syndrome+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Imposter Syndrome 2026 — PM Streak",
    description: "Why PMs feel imposter syndrome and how to handle it.",
    images: [`${SITE_URL}/api/og?title=PM+Imposter+Syndrome+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const WHY_PMS = [
  "No formal training — PM paths are undefined",
  "Span engineers, designers, data, sales — never deepest at any",
  "Outcomes are ambiguous — hard to feel &apos;done&apos;",
  "Visibility of failures — bad launches are public",
  "Comparison culture — Twitter/LinkedIn exaggerates peers",
];

const COPING = [
  "Write down what you learned each week — reality differs from feelings",
  "Focus on the user outcomes, not your relative skill",
  "Talk to peer PMs — everyone feels it",
  "Separate useful self-critique from rumination",
  "Remember that confidence lags competence by a year or two",
];

const FAQS = [
  {
    q: "Does imposter syndrome ever go away?",
    a: "Not fully, even for senior PMs. What changes is the frequency and the recovery time. Senior PMs still feel it during new assignments; they just don&apos;t let it paralyse action. The goal isn&apos;t to eliminate the feeling — it&apos;s to let it inform preparation without dictating your decisions.",
  },
];

export default function PmImposterSyndromePage() {
  const dates = pageDates("/pm-imposter-syndrome");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Imposter Syndrome", url: `${SITE_URL}/pm-imposter-syndrome` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Imposter Syndrome (2026 Edition)",
        description:
          "Why PMs experience imposter syndrome more than most roles, what to do about it, and which parts of the feeling are actually useful.",
        image: `${SITE_URL}/api/og?title=PM+Imposter+Syndrome+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-imposter-syndrome`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🫶</span> Confidence lags competence by a year or two
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Imposter Syndrome<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            PMs feel imposter syndrome more acutely than most roles because the career path has no formal training, the job spans engineers, designers, data, and sales without being deepest in any one, and outcomes stay ambiguous while failures play out publicly. It rarely disappears fully, but writing down weekly learnings and remembering that confidence lags competence by a year or two make it manageable rather than paralysing.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 reasons PMs feel it and 5 ways to handle it.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Confidence — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">Why PMs Feel It</h2>
          <div className="space-y-2">
            {WHY_PMS.map((w, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{w}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Ways to Cope</h2>
            <div className="space-y-2">
              {COPING.map((c, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{c}</p>
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

        <RelatedPages slug="pm-imposter-syndrome" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice PM Confidence Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
