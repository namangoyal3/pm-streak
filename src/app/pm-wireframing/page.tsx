import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Wireframing (2026) — Should PMs Wireframe?",
  description:
    "When PMs should wireframe, when they shouldn&apos;t, and how to wireframe in a way that supports designers rather than replacing them.",
  keywords: [
    "PM wireframing", "PM Figma",
    "low-fidelity wireframes PM 2026",
  ],
  alternates: { canonical: "/pm-wireframing" },
  openGraph: {
    title: "PM Wireframing 2026 — PM Streak",
    description: "When PMs should wireframe, and how to do it right.",
    url: `${SITE_URL}/pm-wireframing`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Wireframing+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Wireframing 2026 — PM Streak",
    description: "When PMs should wireframe, and how to do it right.",
    images: [`${SITE_URL}/api/og?title=PM+Wireframing+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const WHEN_TO = [
  "Communicating a rough flow to engineering before design has bandwidth",
  "Pressure-testing your own thinking — if you can&apos;t sketch it, you don&apos;t understand it",
  "Aligning with exec on information architecture before committing design time",
  "Early discovery — wireframes are cheap assumption-tests",
];

const WHEN_NOT_TO = [
  "Pre-deciding design — handing designers finished layouts kills craft and ownership",
  "Client / exec pitches — low-fi wireframes look half-baked to non-practitioners",
  "When you have a designer with bandwidth — just partner from the start",
  "Anything pixel-perfect — stay low-fidelity deliberately",
];

const FAQS = [
  {
    q: "Should PMs learn Figma?",
    a: "Enough to open files, leave comments, and sketch low-fidelity flows. Not enough to design finished screens. The best PMs can navigate Figma fluently but always defer visual and interaction decisions to designers. Tooling fluency is useful; design authorship overreach is a classic anti-pattern.",
  },
];

export default function PmWireframingPage() {
  const dates = pageDates("/pm-wireframing");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Wireframing", url: `${SITE_URL}/pm-wireframing` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Wireframing (2026 Edition)",
        description: "When PMs should wireframe, when they shouldn&apos;t, and how to wireframe in a way that supports designers rather than replacing them.",
        image: `${SITE_URL}/api/og?title=PM+Wireframing+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-wireframing`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🖊️</span> Wireframe to think, not to design
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Wireframing<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            PMs should wireframe to pressure-test their own thinking, communicate a rough flow before design has bandwidth, align execs on information architecture, or cheaply test assumptions during early discovery — but not to pre-decide layouts, pitch clients, or replace a designer who already has bandwidth. Wireframes work best low-fidelity and rough, sketched to think rather than to design.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-white/60 hover:text-[#89e219] underline underline-offset-2">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            4 situations where PMs should wireframe and 4 where they shouldn&apos;t.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Wireframing PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">When PMs Should Wireframe</h2>
          <div className="space-y-2">
            {WHEN_TO.map((w, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{w}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">When PMs Shouldn&apos;t</h2>
            <div className="space-y-2">
              {WHEN_NOT_TO.map((w, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-red-400 flex-shrink-0">❌</span>
                  <p className="text-sm text-white/70">{w}</p>
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

        <RelatedPages slug="pm-wireframing" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Wireframing Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
