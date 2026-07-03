import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Podcasts (2026) — The Best Podcasts for Product Managers",
  description:
    "The PM podcasts worth listening to in 2026. Lenny&apos;s, Acquired, How I Built This, and which Indian podcasts cover product specifically.",
  keywords: [
    "PM podcasts", "product manager podcasts 2026",
  ],
  alternates: { canonical: "/pm-podcasts-to-listen" },
  openGraph: {
    title: "PM Podcasts 2026 — PM Streak",
    description: "Best podcasts for product managers.",
    url: `${SITE_URL}/pm-podcasts-to-listen`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Podcasts+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Podcasts 2026 — PM Streak",
    description: "Best podcasts for product managers.",
    images: [`${SITE_URL}/api/og?title=PM+Podcasts+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PODCASTS = [
  { t: "Lenny&apos;s Podcast", w: "PM-specific deep interviews; the canon for working PMs." },
  { t: "Acquired", w: "Long-form company history; great for strategic pattern recognition." },
  { t: "How I Built This", w: "Founder stories; useful for understanding origin stories of products you use." },
  { t: "Masters of Scale", w: "Hoffman + tech operators; mostly strategic." },
  { t: "The Knowledge Project — Shane Parrish", w: "Mental models and decision-making across domains." },
];

const FAQS = [
  {
    q: "Are podcasts actually useful for PM learning?",
    a: "Useful for context, less useful for craft. You won&apos;t learn how to write a PRD by listening — but you will learn how senior PMs think about strategy, growth, and team building. Pair podcasts with journaling or notes, otherwise the lessons evaporate by the next episode.",
  },
];

export default function PmPodcastsToListenPage() {
  const dates = pageDates("/pm-podcasts-to-listen");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Podcasts", url: `${SITE_URL}/pm-podcasts-to-listen` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Podcasts (2026 Edition)",
        description:
          "The PM podcasts worth listening to in 2026. Lenny&apos;s, Acquired, How I Built This, and which Indian podcasts cover product specifically.",
        image: `${SITE_URL}/api/og?title=PM+Podcasts+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-podcasts-to-listen`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🎧</span> Podcasts give context. Notes turn it into learning.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Podcasts<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Five podcasts anchor a PM&apos;s listening list: Lenny&apos;s Podcast, Acquired, How
            I Built This, Masters of Scale, and The Knowledge Project with Shane Parrish. They
            sharpen context on strategy, growth, and decision-making rather than craft — the
            specific &quot;how do I write a PRD&quot; skills that listening alone can&apos;t
            teach, which is why pairing episodes with notes matters.
          </p>
          <p className="text-sm text-white/50 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 PM podcasts worth your commute time.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Listening Habits — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Podcasts</h2>
          <div className="space-y-3">
            {PODCASTS.map((p, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-[#89e219] text-sm mb-1">{p.t}</p>
                <p className="text-xs text-white/60">{p.w}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
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

        <RelatedPages slug="pm-podcasts-to-listen" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice What You Hear</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
