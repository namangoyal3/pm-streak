import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Spatial Computing (2026) — Apple Vision Pro, Meta Quest, AR/VR PM",
  description:
    "How PMs build for spatial computing. AR/VR UX, input modalities, session length, and what works on Vision Pro vs Quest.",
  keywords: [
    "PM spatial computing", "AR VR PM",
    "Vision Pro PM", "Meta Quest 2026",
  ],
  alternates: { canonical: "/pm-spatial-computing" },
  openGraph: {
    title: "PM Spatial Computing 2026 — PM Streak",
    description: "How PMs build for spatial computing and AR/VR.",
    url: `${SITE_URL}/pm-spatial-computing`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Spatial+Computing+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Spatial Computing 2026 — PM Streak",
    description: "How PMs build for spatial computing and AR/VR.",
    images: [`${SITE_URL}/api/og?title=PM+Spatial+Computing+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const REALITIES = [
  "Session length caps out around 20–30 minutes — design for burstability",
  "Input is multi-modal — eye gaze, hand, voice, controller. Design for all",
  "Comfort and fatigue are UX — not nice-to-haves",
  "Social presence is the strongest category — productivity still underwhelms",
  "Developer tooling is still early — expect ecosystem friction",
];

const CATEGORIES = [
  "Immersive gaming and entertainment",
  "Remote collaboration and meetings",
  "Fitness and movement",
  "Training and simulation (medical, industrial)",
  "Productivity (still finding the killer use case)",
];

const FAQS = [
  {
    q: "Is spatial computing a real PM career in 2026?",
    a: "Narrow but growing. Apple Vision Pro and Meta Quest ecosystems employ hundreds of PMs. Compensation is strong; career risk is real — categories take years to establish. Best for PMs who are comfortable with uncertainty and genuinely love the medium. Don&apos;t chase for hype; commit if you&apos;re excited by the long arc.",
  },
];

export default function PmSpatialComputingPage() {
  const dates = pageDates("/pm-spatial-computing");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Spatial Computing", url: `${SITE_URL}/pm-spatial-computing` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Spatial Computing (2026 Edition)",
        description: "How PMs build for spatial computing. AR/VR UX, input modalities, session length, and what works on Vision Pro vs Quest.",
        image: `${SITE_URL}/api/og?title=PM+Spatial+Computing+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-spatial-computing`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🥽</span> Spatial computing is a long arc — design for the decade, not the quarter
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Spatial Computing<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-3">
            On Vision Pro and Quest alike, the job means designing around sessions that rarely exceed twenty to thirty minutes, multiple input modes — eye gaze, hand, voice, controller — and comfort treated as core UX rather than an afterthought; social presence is the strongest category so far, gaming, fitness, and training simulations follow, while productivity apps are still hunting for their breakout use case.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 realities and 5 categories for spatial computing PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Spatial PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Realities</h2>
          <div className="space-y-2">
            {REALITIES.map((r, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{r}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Categories</h2>
            <div className="space-y-2">
              {CATEGORIES.map((c, i) => (
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

        <RelatedPages slug="pm-spatial-computing" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Spatial PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
