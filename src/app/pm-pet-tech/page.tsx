import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Pet Tech (2026) — Chewy, Heads Up For Tails, Supertails PM Lessons",
  description:
    "How PMs build pet tech products. Recurring subscriptions, vet integrations, and why pet tech follows a different repeat rate curve than other D2C.",
  keywords: [
    "PM pet tech", "pet care PM",
    "Supertails 2026",
  ],
  alternates: { canonical: "/pm-pet-tech" },
  openGraph: {
    title: "PM Pet Tech 2026 — PM Streak",
    description: "How PMs build pet tech products.",
    url: `${SITE_URL}/pm-pet-tech`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Pet+Tech+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Pet Tech 2026 — PM Streak",
    description: "How PMs build pet tech products.",
    images: [`${SITE_URL}/api/og?title=PM+Pet+Tech+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Subscription food is the anchor — high repeat rate, predictable revenue",
  "Vet consultation and pharmacy stack naturally on top",
  "Pets are emotional — product tone matters more than most D2C",
  "India market growing fast but still small — &lt;5% penetration",
  "Custom diet plans are the next differentiator",
];

const METRICS = [
  "Monthly recurring revenue from subscriptions",
  "Repeat purchase rate at 60/90 days",
  "Cross-sell from food to pharmacy/vet",
  "Customer lifetime value",
  "NPS (pet parents are vocal)",
];

const FAQS = [
  {
    q: "Is Indian pet tech a real category?",
    a: "Small but fast-growing. Supertails, Heads Up For Tails, Wiggles serve an expanding urban pet-parent demographic. Growth is real (20–40% YoY) but scale is nowhere near global Chewy-level yet. The category will mature over 5–10 years as Indian pet ownership follows Western trajectories.",
  },
];

export default function PmPetTechPage() {
  const dates = pageDates("/pm-pet-tech");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Pet Tech", url: `${SITE_URL}/pm-pet-tech` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Pet Tech (2026 Edition)",
        description:
          "How PMs build pet tech products. Recurring subscriptions, vet integrations, and why pet tech follows a different repeat rate curve than other D2C.",
        image: `${SITE_URL}/api/og?title=PM+Pet+Tech+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-pet-tech`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🐕</span> Pet tech: subscription food, stacked vet and pharmacy
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Pet Tech<br />(2026 Edition)
          </h1>
          <p className="text-base text-white/80 max-w-2xl mx-auto mb-3">
            India&apos;s pet tech market is still under 5% penetration, but subscription pet food anchors recurring revenue while vet consultations and pharmacy stack on top for cross-sell. Category leaders like Supertails, Heads Up For Tails, and Wiggles are growing 20–40% year over year, nowhere near Chewy&apos;s scale yet, and PMs track monthly recurring revenue, 60/90-day repeat purchase rate, and NPS since pet parents are vocal.
          </p>
          <p className="text-xs text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for pet tech PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Pet Tech PM Skills — Free →
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

        <RelatedPages slug="pm-pet-tech" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Pet Tech PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
