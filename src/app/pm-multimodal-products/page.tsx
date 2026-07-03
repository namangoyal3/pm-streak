import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Multimodal AI Products (2026) — Text, Image, Voice, Video Together",
  description:
    "How PMs build multimodal AI products. Use cases, latency tradeoffs, and where multimodal genuinely beats single-mode workflows.",
  keywords: [
    "PM multimodal AI", "GPT-4o PM 2026",
  ],
  alternates: { canonical: "/pm-multimodal-products" },
  openGraph: {
    title: "PM Multimodal Products 2026 — PM Streak",
    description: "How PMs build multimodal AI products.",
    url: `${SITE_URL}/pm-multimodal-products`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Multimodal+Products+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Multimodal Products 2026 — PM Streak",
    description: "How PMs build multimodal AI products.",
    images: [`${SITE_URL}/api/og?title=PM+Multimodal+Products+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const USES = [
  "Image + text — visual Q&amp;A, doc analysis, defect detection",
  "Voice + text — accessibility, in-car, hands-busy contexts",
  "Video + text — security, content moderation, sports analytics",
  "All-modal agents — Apple Intelligence, Gemini Live",
];

const REALITIES = [
  "Latency multiplies across modalities",
  "Cost rises with token equivalence of images and audio",
  "Eval is harder — outputs span multiple formats",
  "Most real value still comes from one or two modalities, not all four",
];

const FAQS = [
  {
    q: "Is multimodal AI a real category or feature?",
    a: "Both, depending on use case. For most products, multimodal is a feature on top of a primary modality. For a few (visual search, video understanding, voice agents), it&apos;s the core. Don&apos;t add multimodal because the model supports it — add it where users genuinely need to mix modes.",
  },
];

export default function PmMultimodalProductsPage() {
  const dates = pageDates("/pm-multimodal-products");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Multimodal Products", url: `${SITE_URL}/pm-multimodal-products` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Multimodal AI Products (2026 Edition)",
        description: "How PMs build multimodal AI products. Use cases, latency tradeoffs, and where multimodal genuinely beats single-mode workflows.",
        image: `${SITE_URL}/api/og?title=PM+Multimodal+Products+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-multimodal-products`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🎭</span> Add multimodal where users mix modes — not because models can
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Multimodal AI Products<br />(2026 Edition)
          </h1>
          <p className="text-base text-white/70 max-w-2xl mx-auto mb-4">
            Whether multimodal counts as a core product or just a feature depends on the use case: image-plus-text for visual question answering and document analysis, voice-plus-text for accessibility and hands-busy contexts, video-plus-text for moderation and analytics, and all-modal agents for the rare cases needing everything at once. Most products get real value from one or two modalities, not all four, since latency and cost multiply with every mode added.
          </p>
          <p className="text-xs text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            4 multimodal use cases and 4 realities to plan around.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Multimodal PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">4 Use Cases</h2>
          <div className="space-y-2">
            {USES.map((u, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{u}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">4 Realities</h2>
            <div className="space-y-2">
              {REALITIES.map((r, i) => (
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

        <RelatedPages slug="pm-multimodal-products" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Multimodal PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
