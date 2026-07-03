import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM HR Tech (2026) — Darwinbox, Rippling, Keka PM Guide",
  description:
    "How PMs build HR tech products. Payroll, performance, engagement, and the consolidation of point tools into full-suite HRIS.",
  keywords: [
    "PM HR tech", "Darwinbox PM",
    "Rippling PM", "HRIS 2026",
  ],
  alternates: { canonical: "/pm-hr-tech" },
  openGraph: {
    title: "PM HR Tech 2026 — PM Streak",
    description: "How PMs build HR tech products.",
    url: `${SITE_URL}/pm-hr-tech`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+HR+Tech+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM HR Tech 2026 — PM Streak",
    description: "How PMs build HR tech products.",
    images: [`${SITE_URL}/api/og?title=PM+HR+Tech+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Payroll is the anchor — once an org is on your payroll, switching is painful",
  "Compliance is a roadmap input — labour law changes per country, state, even sector",
  "Point tools are consolidating — suite plays winning mid-market",
  "Employee experience matters, but buyer is HR/finance — dual UX",
  "AI is rewriting recruitment, performance, and engagement workflows",
];

const METRICS = [
  "Payroll accuracy (errors per 10k paychecks)",
  "Compliance filings on time",
  "Employee weekly active usage (signal of real adoption)",
  "Admin-to-employee ratio — how lean can HR run?",
  "Module attach rate (payroll + performance + engagement)",
];

const FAQS = [
  {
    q: "Is Indian HR tech a winnable market?",
    a: "Yes, increasingly. Darwinbox, Keka, Zoho People serve Indian mid-market; Rippling and Deel expanding here. Wins come from compliance depth (ESI, PF, PT, TDS), local languages, and integration with Indian banking. Suite strategies (payroll + performance + engagement) outperform point tools.",
  },
];

export default function PmHrTechPage() {
  const dates = pageDates("/pm-hr-tech");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM HR Tech", url: `${SITE_URL}/pm-hr-tech` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM HR Tech (2026 Edition)",
        description: "How PMs build HR tech products. Payroll, performance, engagement, and the consolidation of point tools into full-suite HRIS.",
        image: `${SITE_URL}/api/og?title=PM+HR+Tech+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-hr-tech`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>👔</span> Payroll is the anchor. Everything else expands from there.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM HR Tech<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Once an organisation puts its payroll on a platform, switching becomes painful, which is why HR tech PMs treat payroll as the anchor product and build compliance — labour law differs by country, state, and sector — directly into the roadmap; success shows up as payroll accuracy per 10,000 paychecks, on-time compliance filings, and how many modules a customer attaches beyond that first payroll seat.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for HR tech PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build HR Tech PM Skills — Free →
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

        <RelatedPages slug="pm-hr-tech" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice HR Tech PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
