import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Video Editing Tools (2026) — CapCut, Descript, Premiere PM Lessons",
  description:
    "How PMs build video editing tools. Mobile vs desktop, AI assists, templates, and why CapCut disrupted the category by owning creator workflows on mobile.",
  keywords: [
    "PM video editing", "CapCut PM",
    "Descript PM 2026",
  ],
  alternates: { canonical: "/pm-video-editing-tools" },
  openGraph: {
    title: "PM Video Editing Tools 2026 — PM Streak",
    description: "How PMs build video editing tools.",
    url: `${SITE_URL}/pm-video-editing-tools`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Video+Editing+Tools+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Video Editing Tools 2026 — PM Streak",
    description: "How PMs build video editing tools.",
    images: [`${SITE_URL}/api/og?title=PM+Video+Editing+Tools+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Mobile-first disrupted desktop — CapCut rewired expectations",
  "AI assists (auto-captions, silence removal, beat matching) are must-haves",
  "Template marketplaces accelerate creator time-to-output",
  "Template-to-pro upgrade path is the monetisation lever",
  "Platform lock-in (TikTok &lt;-&gt; CapCut) shapes distribution",
];

const METRICS = [
  "Videos exported per active user",
  "Template adoption rate",
  "AI feature usage (captions, silence cuts)",
  "Free-to-paid conversion",
  "Session length during active editing",
];

const FAQS = [
  {
    q: "How did CapCut overtake Adobe Premiere among creators?",
    a: "By going mobile-first, free, and TikTok-integrated. Adobe owns the professional market; CapCut owns the billions of mobile creators. When the market shifts to mobile-first creation (TikTok, Reels, Shorts), the product built for that workflow wins — even against a 30-year incumbent.",
  },
];

export default function PmVideoEditingToolsPage() {
  const dates = pageDates("/pm-video-editing-tools");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Video Editing", url: `${SITE_URL}/pm-video-editing-tools` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Video Editing Tools (2026 Edition)",
        description:
          "How PMs build video editing tools. Mobile vs desktop, AI assists, templates, and why CapCut disrupted the category by owning creator workflows on mobile.",
        image: `${SITE_URL}/api/og?title=PM+Video+Editing+Tools+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-video-editing-tools`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🎥</span> Mobile-first video editing disrupted a 30-year incumbent
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Video Editing Tools<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Mobile-first, free, and TikTok-integrated — that&apos;s how CapCut overtook Adobe Premiere among creators, even against a 30-year incumbent. This page maps the five dynamics behind that shift (AI assists, template marketplaces, platform lock-in) alongside the five metrics PMs use to track a video editing product, from export volume to free-to-paid conversion.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-white/70 hover:text-[#89e219] underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for video editing tool PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Video Editing PM Skills — Free →
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

        <RelatedPages slug="pm-video-editing-tools" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Video Editing PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
