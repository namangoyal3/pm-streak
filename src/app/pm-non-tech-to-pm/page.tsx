import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Non-Tech to PM (2026) — Crossing Into Product From Outside Tech",
  description:
    "How non-tech professionals (finance, ops, teachers, lawyers) break into PM. Storytelling, stepping stones, and why domain-specific PM roles are the cleanest entry.",
  keywords: [
    "non-tech to PM", "career change PM 2026",
  ],
  alternates: { canonical: "/pm-non-tech-to-pm" },
  openGraph: {
    title: "PM Non-Tech to PM 2026 — PM Streak",
    description: "Crossing into product from outside tech.",
    url: `${SITE_URL}/pm-non-tech-to-pm`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Non-Tech+to+PM+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Non-Tech to PM 2026 — PM Streak",
    description: "Crossing into product from outside tech.",
    images: [`${SITE_URL}/api/og?title=PM+Non-Tech+to+PM+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PATHS = [
  "Domain-specific PM — bring your industry knowledge (healthtech, edtech, legal)",
  "Internal transfer — move laterally from ops/BD/marketing at a tech company",
  "APM programs — some accept non-tech backgrounds",
  "Founder-led startups — ship something, then apply",
  "Product-adjacent roles (Product Ops, PMM) as stepping stones",
];

const MISTAKES = [
  "Applying cold to PM roles without bridging content",
  "Ignoring domain-specific PM roles where you have a natural edge",
  "Not shipping anything before interviewing",
  "Focusing on general PM instead of specific opportunity fit",
];

const FAQS = [
  {
    q: "What&apos;s the fastest non-tech path into PM?",
    a: "Domain-specific PM roles in industries you know. A doctor transitioning into healthtech PM, a teacher into edtech PM, a banker into fintech PM — these leverage existing knowledge. Generic tech company PM roles are harder; vertical-native roles compress the transition by months or years.",
  },
];

export default function PmNonTechToPmPage() {
  const dates = pageDates("/pm-non-tech-to-pm");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Non-Tech to PM", url: `${SITE_URL}/pm-non-tech-to-pm` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Non-Tech to PM (2026 Edition)",
        description: "How non-tech professionals (finance, ops, teachers, lawyers) break into PM. Storytelling, stepping stones, and why domain-specific PM roles are the cleanest entry.",
        image: `${SITE_URL}/api/og?title=PM+Non-Tech+to+PM+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-non-tech-to-pm`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🌉</span> Domain-specific PM roles are the cleanest non-tech entry
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Non-Tech to PM<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Non-tech professionals cross into product management fastest through domain-specific roles — a doctor into healthtech, a teacher into edtech, a banker into fintech — rather than applying cold to generic tech PM jobs. Internal transfers, APM programs open to outsiders, founder-led shipping, and product-adjacent roles like Product Ops round out the paths in.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:text-[#58cc02]">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 paths in and 4 mistakes to avoid.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Non-Tech PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Paths In</h2>
          <div className="space-y-2">
            {PATHS.map((p, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{p}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">4 Mistakes</h2>
            <div className="space-y-2">
              {MISTAKES.map((m, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-red-400 flex-shrink-0">❌</span>
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

        <RelatedPages slug="pm-non-tech-to-pm" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Non-Tech PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
