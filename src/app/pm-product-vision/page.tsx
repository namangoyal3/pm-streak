import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Product Vision (2026) — Crafting a Vision That Rallies Teams",
  description:
    "How PMs write product visions teams actually rally around. Examples, anti-patterns, and the difference between vision and strategy.",
  keywords: [
    "PM product vision", "product vision",
    "vision document PM 2026",
  ],
  alternates: { canonical: "/pm-product-vision" },
  openGraph: {
    title: "PM Product Vision 2026 — PM Streak",
    description: "How PMs craft visions teams rally around.",
    url: `${SITE_URL}/pm-product-vision`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Product+Vision+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Product Vision 2026 — PM Streak",
    description: "How PMs craft visions teams rally around.",
    images: [`${SITE_URL}/api/og?title=PM+Product+Vision+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PROPERTIES = [
  "Time-bounded (typically 3–5 years out) — not forever",
  "Vivid — paint the picture of what the world looks like",
  "User-centric — describe what users will be able to do",
  "Bold but believable — stretch without sounding silly",
  "Memorable — one sentence team members can repeat",
];

const ANTI_PATTERNS = [
  "Mission statement disguised as vision — too abstract to shape decisions",
  "Feature list disguised as vision — too tactical for a 3-year arc",
  "Vision changing every quarter — destroys trust and team alignment",
  "Vision without measures — no way to know if you&apos;re making progress",
];

const FAQS = [
  {
    q: "Do PMs own product vision?",
    a: "Depends on seniority. An APM or PM II doesn&apos;t set vision for a whole product — they inherit it. Senior and principal PMs, and GPMs, own vision for their area. At the company level, vision typically sits with founders or CPO. Good PMs at every level should be able to articulate the vision they&apos;re executing toward.",
  },
];

export default function PmProductVisionPage() {
  const dates = pageDates("/pm-product-vision");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Product Vision", url: `${SITE_URL}/pm-product-vision` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Product Vision (2026 Edition)",
        description:
          "How PMs write product visions teams actually rally around. Examples, anti-patterns, and the difference between vision and strategy.",
        image: `${SITE_URL}/api/og?title=PM+Product+Vision+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-product-vision`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔮</span> Vision answers &apos;what will be true in 2029?&apos;
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Product Vision<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Good product visions share five traits — time-bounded to roughly 3–5 years out, vivid, user-centric, bold but believable, and memorable enough to repeat in one sentence — while the most common failure modes are mission statements or feature lists mistaken for vision, or visions that shift every quarter and lose team trust.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 properties of a strong vision and 4 anti-patterns to avoid.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Vision PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Properties</h2>
          <div className="space-y-2">
            {PROPERTIES.map((p, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{p}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">4 Anti-Patterns</h2>
            <div className="space-y-2">
              {ANTI_PATTERNS.map((a, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-red-400 flex-shrink-0">❌</span>
                  <p className="text-sm text-white/70">{a}</p>
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

        <RelatedPages slug="pm-product-vision" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Vision Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
