import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Manager Path (2026) — When and How to Become a Group PM",
  description:
    "How PMs become managers. Why some love it and others hate it, the skill shifts, and when to make the jump to Group PM or Head of Product.",
  keywords: [
    "PM manager path", "group PM",
    "head of product 2026",
  ],
  alternates: { canonical: "/pm-manager-path" },
  openGraph: {
    title: "PM Manager Path 2026 — PM Streak",
    description: "When and how to become a group PM.",
    url: `${SITE_URL}/pm-manager-path`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Manager+Path+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Manager Path 2026 — PM Streak",
    description: "When and how to become a group PM.",
    images: [`${SITE_URL}/api/og?title=PM+Manager+Path+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const SHIFTS = [
  "From shipping product to shipping PMs",
  "From individual output to team output",
  "From product decisions to hiring and development decisions",
  "From roadmap ownership to org and process ownership",
  "From solving problems to diagnosing team problems",
];

const SIGNALS_YOU_LOVE_IT = [
  "You get energy from 1:1s, not product reviews",
  "You naturally mentor junior PMs",
  "You enjoy calibrating performance across a team",
  "You feel ownership for others&apos; careers, not just your output",
];

const FAQS = [
  {
    q: "How do you know if the manager path is right for you?",
    a: "Do you feel more satisfied after a great 1:1 than after shipping a great feature? Do you find yourself naturally coaching teammates? Do you enjoy politics as problem-solving, not suffering? If yes — manager. If you miss the product work, stay IC. Both paths are valid; the difference is honest self-knowledge.",
  },
];

export default function PmManagerPathPage() {
  const dates = pageDates("/pm-manager-path");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Manager Path", url: `${SITE_URL}/pm-manager-path` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Manager Path (2026 Edition)",
        description:
          "How PMs become managers. Why some love it and others hate it, the skill shifts, and when to make the jump to Group PM or Head of Product.",
        image: `${SITE_URL}/api/og?title=PM+Manager+Path+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-manager-path`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>👥</span> Ship PMs, not products
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Manager Path<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Moving into PM management means shipping PMs instead of products: decisions shift from
            roadmap calls to hiring and development calls, and success shifts from individual
            output to team output and org ownership. Whether it&apos;s right for you comes down to
            a few honest questions — do you get more satisfaction from a great 1:1 than from
            shipping a feature, and do you naturally coach teammates without missing the hands-on
            product work?
          </p>
          <p className="text-sm text-white/50 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 shifts and 4 signals that manager path is right for you.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Manager Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Shifts</h2>
          <div className="space-y-2">
            {SHIFTS.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{s}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">4 Signals You&apos;d Love It</h2>
            <div className="space-y-2">
              {SIGNALS_YOU_LOVE_IT.map((s, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{s}</p>
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

        <RelatedPages slug="pm-manager-path" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice PM Manager Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
