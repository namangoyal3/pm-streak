import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Designer Partnership (2026) — Working With Designers Well",
  description:
    "How PMs partner with designers. Handoff vs collaboration, what to bring to design reviews, and why your best product partner is your designer.",
  keywords: [
    "PM designer partnership", "PM design collaboration",
    "product designer PM 2026",
  ],
  alternates: { canonical: "/pm-designer-partnership" },
  openGraph: {
    title: "PM Designer Partnership 2026 — PM Streak",
    description: "How PMs partner with designers well.",
    url: `${SITE_URL}/pm-designer-partnership`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Designer+Partnership+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Designer Partnership 2026 — PM Streak",
    description: "How PMs partner with designers well.",
    images: [`${SITE_URL}/api/og?title=PM+Designer+Partnership+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PRACTICES = [
  "Bring the problem, not the solution — let designers explore",
  "Co-draft the opportunity brief — shared context reduces revisions later",
  "Attend design reviews without owning design decisions",
  "Give feedback on outcomes and constraints, not pixels",
  "Defend your designer&apos;s craft in exec reviews — they can&apos;t always defend themselves",
  "Celebrate design wins publicly — credit compounds",
];

const ANTI_PATTERNS = [
  "Handing designers wireframes and expecting refinement",
  "Critiquing UI details instead of experience outcomes",
  "Skipping design review — shows up as misalignment in build",
  "Treating designers as pixel-pushers — the fastest way to lose a good partner",
];

const FAQS = [
  {
    q: "Who owns the product vision — PM or designer?",
    a: "Both. In the best product orgs, PM and design are peer disciplines co-owning the vision. The PM owns business outcomes and strategy; the designer owns user experience and craft. Where the lines blur, the partnership is healthiest. When they&apos;re drawn as a hierarchy, the work suffers.",
  },
];

export default function PmDesignerPartnershipPage() {
  const dates = pageDates("/pm-designer-partnership");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Designer Partnership", url: `${SITE_URL}/pm-designer-partnership` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Designer Partnership (2026 Edition)",
        description:
          "How PMs partner with designers. Handoff vs collaboration, what to bring to design reviews, and why your best product partner is your designer.",
        image: `${SITE_URL}/api/og?title=PM+Designer+Partnership+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-designer-partnership`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🎨</span> Your designer is your most important product partner. Treat them that way.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Designer Partnership<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            The strongest PM-designer partnerships start with a problem brought to design, not a solution — PMs co-draft the opportunity brief, sit in on reviews without dictating pixels, and defend the designer&apos;s craft in exec meetings, while treating a partner as a pixel-pusher or skipping review sessions signals the relationship is already breaking down.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 practices and 4 anti-patterns for the PM-designer relationship.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM-Designer Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Practices</h2>
          <div className="space-y-2">
            {PRACTICES.map((p, i) => (
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

        <RelatedPages slug="pm-designer-partnership" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice PM-Designer Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
