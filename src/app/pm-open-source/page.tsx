import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Open Source Products (2026) — GitLab, HashiCorp, Posthog PM Lessons",
  description:
    "How PMs build open source products. Community vs commercial, licensing, monetisation, and why open source is the most contributor-sensitive PM role.",
  keywords: [
    "PM open source", "OSS PM",
    "community PM 2026",
  ],
  alternates: { canonical: "/pm-open-source" },
  openGraph: {
    title: "PM Open Source Products 2026 — PM Streak",
    description: "How PMs build open source products.",
    url: `${SITE_URL}/pm-open-source`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Open+Source+Products+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Open Source Products 2026 — PM Streak",
    description: "How PMs build open source products.",
    images: [`${SITE_URL}/api/og?title=PM+Open+Source+Products+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Community trust is the moat — break it once, lose it forever",
  "Licensing choices shape monetisation — BSL, AGPL, MIT all have tradeoffs",
  "Open core vs full OSS — different commercialisation paths",
  "Contributors are unpaid teammates — design process with them in mind",
  "Upstream-first culture — don&apos;t hide improvements in enterprise forks",
];

const METRICS = [
  "Stars, forks, and contributor count (vanity but watched)",
  "Weekly active contributors",
  "Paid conversion rate from OSS users",
  "Community NPS",
  "Time from issue to resolution",
];

const FAQS = [
  {
    q: "Why did HashiCorp&apos;s BSL switch cause such backlash?",
    a: "Because the community interpreted it as a rug-pull — features contributed under permissive licences suddenly becoming restricted. OpenTofu forked as a response. The lesson: licensing is a trust contract, not a legal technicality. PMs need to socialise licence changes with the community long before they happen.",
  },
];

export default function PmOpenSourcePage() {
  const dates = pageDates("/pm-open-source");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Open Source", url: `${SITE_URL}/pm-open-source` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Open Source Products (2026 Edition)",
        description:
          "How PMs build open source products. Community vs commercial, licensing, monetisation, and why open source is the most contributor-sensitive PM role.",
        image: `${SITE_URL}/api/og?title=PM+Open+Source+Products+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-open-source`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📦</span> Licensing is a trust contract, not a legal technicality
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Open Source Products<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Open source product management treats unpaid contributors as core stakeholders, not just users: licensing choices — BSL, AGPL, MIT — directly shape whether open core or full-OSS monetisation works, community trust functions as the primary moat, and success is tracked through stars, forks, contributor counts, weekly active contributors, paid conversion, and community NPS.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for open source PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build OSS PM Skills — Free →
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

        <RelatedPages slug="pm-open-source" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice OSS PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
