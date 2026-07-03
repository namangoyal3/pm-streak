import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Decision Frameworks (2026) — How Good PMs Decide Under Uncertainty",
  description:
    "Decision frameworks PMs actually use. RICE, WSJF, ICE, two-way vs one-way doors, and when to skip frameworks entirely.",
  keywords: [
    "PM decision frameworks", "RICE scoring",
    "ICE framework", "product decisions 2026",
  ],
  alternates: { canonical: "/pm-decision-frameworks" },
  openGraph: {
    title: "PM Decision Frameworks 2026 — PM Streak",
    description: "How good PMs decide under uncertainty.",
    url: `${SITE_URL}/pm-decision-frameworks`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Decision+Frameworks+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Decision Frameworks 2026 — PM Streak",
    description: "How good PMs decide under uncertainty.",
    images: [`${SITE_URL}/api/og?title=PM+Decision+Frameworks+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const FRAMEWORKS = [
  { f: "RICE", w: "Reach × Impact × Confidence / Effort. Best for prioritising features within a theme." },
  { f: "ICE", w: "Impact × Confidence × Ease. Faster than RICE; less rigorous." },
  { f: "WSJF", w: "Weighted Shortest Job First. Agile-native; balances value and urgency." },
  { f: "Kano", w: "Classifies features as basic, performance, or delighter. Great for packaging." },
  { f: "Two-way vs one-way doors", w: "Reversible decisions get fast calls. Irreversible decisions get careful analysis." },
];

const RULES = [
  "Use frameworks to organise thinking, not to outsource it — numbers are not objective",
  "Calibrate confidence — most teams are chronically overconfident",
  "Run the same decision through 2 frameworks — if they disagree, think harder",
  "Name one-way doors explicitly — these deserve disproportionate attention",
];

const FAQS = [
  {
    q: "When should PMs skip frameworks?",
    a: "When the decision is small and reversible (two-way door) or when time pressure dominates analysis quality. Frameworks are a tax on speed; for decisions that can be undone in a sprint, the tax usually isn&apos;t worth paying. Reserve frameworks for decisions that matter over quarters.",
  },
];

export default function PmDecisionFrameworksPage() {
  const dates = pageDates("/pm-decision-frameworks");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Decision Frameworks", url: `${SITE_URL}/pm-decision-frameworks` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Decision Frameworks (2026 Edition)",
        description:
          "Decision frameworks PMs actually use. RICE, WSJF, ICE, two-way vs one-way doors, and when to skip frameworks entirely.",
        image: `${SITE_URL}/api/og?title=PM+Decision+Frameworks+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-decision-frameworks`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🎲</span> Frameworks organise thinking. They don&apos;t replace it.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Decision Frameworks<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Good PMs under uncertainty lean on five frameworks — RICE, ICE, WSJF, Kano, and the two-way-versus-one-way-door distinction — to organise thinking rather than replace it, then stress-test big calls by running the same decision through two frameworks at once and naming irreversible, one-way-door decisions explicitly. Reversible, low-stakes decisions are usually better made fast, without paying the framework tax at all.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 frameworks and 4 rules for PMs making decisions under uncertainty.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Decision PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Frameworks</h2>
          <div className="space-y-3">
            {FRAMEWORKS.map((fw, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-[#89e219] text-sm mb-1">{fw.f}</p>
                <p className="text-xs text-white/60">{fw.w}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">4 Rules</h2>
            <div className="space-y-2">
              {RULES.map((r, i) => (
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

        <RelatedPages slug="pm-decision-frameworks" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Decision Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
