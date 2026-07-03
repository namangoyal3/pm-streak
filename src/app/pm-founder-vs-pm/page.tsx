import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "Founder vs PM (2026) — When They Do the Same Job and When They Clash",
  description:
    "Founder vs PM — who owns what. The overlap, the conflicts, and how to work with a founder-led product culture as a PM joining the team.",
  keywords: [
    "founder vs PM", "founder PM overlap",
    "PM reporting to founder", "startup PM founder",
    "founder-led product 2026",
  ],
  alternates: { canonical: "/pm-founder-vs-pm" },
  openGraph: {
    title: "Founder vs PM 2026 — PM Streak",
    description: "Founder vs PM — who owns what, where they overlap, and how to work together.",
    url: `${SITE_URL}/pm-founder-vs-pm`,
    images: [{ url: `${SITE_URL}/api/og?title=Founder+vs+PM+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Founder vs PM 2026 — PM Streak",
    description: "Founder vs PM — who owns what, where they overlap, and how to work together.",
    images: [`${SITE_URL}/api/og?title=Founder+vs+PM+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const OVERLAP = [
  { area: "Vision and strategy", founder: "Ultimate owner — especially at early stage", pm: "Contributes, may own for specific product areas" },
  { area: "Product decisions", founder: "At early stage, often makes most calls", pm: "Expected to own at the feature and product-area level" },
  { area: "Customer understanding", founder: "Deep at early stage, thinner as company scales", pm: "Expected to own deeply for their area" },
  { area: "Hiring product team", founder: "Owner until Head of Product hired", pm: "Participates; leads at senior PM levels" },
  { area: "Setting OKRs", founder: "Company-level", pm: "Team-level OKRs rolling up to company" },
];

const WHEN_IT_WORKS = [
  "Founder respects PM craft and doesn&apos;t micromanage feature decisions",
  "PM adapts to founder&apos;s pace without losing rigour",
  "Clear division: founder sets direction, PM owns execution within it",
  "Founder engages on strategic decisions; delegates tactical ones to PM",
  "PM surfaces data that changes founder&apos;s mind — intellectual partnership",
];

const WHEN_IT_CLASHES = [
  "Founder overrides PM decisions publicly — PM becomes figurehead",
  "Founder keeps &apos;all product decisions go through me&apos; even at 50+ people",
  "PM doesn&apos;t move fast enough for founder&apos;s pace — mismatch",
  "Founder ignores data that contradicts instinct — no intellectual partnership",
  "Founder and PM disagree on strategy — without a clear tiebreaker",
];

const ADAPTATIONS = [
  "Bring 3 options, not 1 recommendation — founders want to weigh trade-offs",
  "Put your conviction on the record — &apos;I&apos;m 70% confident&apos; beats &apos;I think&apos;",
  "Move at founder pace — slower PMs lose influence at startups",
  "Document decisions the founder makes — prevents revision cycles later",
  "Build your own context from users — founder doesn&apos;t have your bandwidth for this",
];

const FAQS = [
  {
    q: "Is a PM useful at a company where the founder is &apos;the real PM&apos;?",
    a: "Yes, if the founder accepts partnership. Founders can be great product people but can&apos;t scale their attention. A strong PM takes ownership of product areas, surfaces research the founder doesn&apos;t have time for, and makes decisions within a shared strategic frame. PMs who arrive expecting to override the founder usually fail; PMs who arrive expecting partnership usually succeed.",
  },
  {
    q: "When should a founder hire their first PM?",
    a: "Typically around 30–50 employees, or when the founder can&apos;t hold all product context + strategy + execution simultaneously. Hiring too early: founder still owns everything, PM becomes a scribe. Hiring too late: product suffers from founder&apos;s spread attention. The signal: founder misses major product decisions because they&apos;re elsewhere.",
  },
];

export default function PmFounderVsPmPage() {
  const dates = pageDates("/pm-founder-vs-pm");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Founder vs PM", url: `${SITE_URL}/pm-founder-vs-pm` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Founder vs PM (2026 Edition)",
        description:
          "Founder vs PM — who owns what. The overlap, the conflicts, and how to work with a founder-led product culture as a PM joining the team.",
        image: `${SITE_URL}/api/og?title=Founder+vs+PM+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-founder-vs-pm`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>⚖️</span> Founder &amp; PM can be partners — or rivals. The difference is setup.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Founder vs PM<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Founders and PMs overlap most on vision, product decisions, and OKRs, with founders
            owning company-level direction and PMs owning execution within it — a split that works
            when a founder delegates tactical calls and clashes when every decision still runs
            through them at 50+ people. Thriving means bringing options with stated confidence,
            moving at founder pace, and documenting decisions early.
          </p>
          <p className="text-sm text-white/50 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Where founders and PMs overlap, when it works vs clashes, and 5 adaptations
            PMs need to thrive in founder-led product cultures.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Skills Daily — Free →
          </Link>
        </section>

        {/* Overlap */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">Founder vs PM Ownership Map</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-white/40 font-medium">Area</th>
                  <th className="text-left py-3 px-4 text-orange-400 font-medium">Founder</th>
                  <th className="text-left py-3 px-4 text-blue-400 font-medium">PM</th>
                </tr>
              </thead>
              <tbody>
                {OVERLAP.map((row, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-3 px-4 text-white/50 text-xs">{row.area}</td>
                    <td className="py-3 px-4 text-white/70 text-xs">{row.founder}</td>
                    <td className="py-3 px-4 text-white/70 text-xs">{row.pm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* When it works */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Signs the Partnership Works</h2>
            <div className="space-y-2">
              {WHEN_IT_WORKS.map((w, i) => (
                <div key={i} className="bg-[#111] border border-green-500/20 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <p className="text-sm text-white/70">{w}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* When it clashes */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Signs It Clashes</h2>
          <div className="space-y-2">
            {WHEN_IT_CLASHES.map((w, i) => (
              <div key={i} className="bg-[#111] border border-red-500/20 rounded-xl p-3 flex gap-3">
                <span className="text-red-400 flex-shrink-0">⚠️</span>
                <p className="text-sm text-white/70">{w}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Adaptations */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Adaptations to Thrive</h2>
            <div className="space-y-2">
              {ADAPTATIONS.map((a, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
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

        <RelatedPages slug="pm-founder-vs-pm" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Startup PM Muscle Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on fast decisions, founder partnership, and PM velocity.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
