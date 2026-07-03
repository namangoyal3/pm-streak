import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM A/B Testing (2026) — Statistical Rigor for Product Managers",
  description:
    "How PMs run A/B tests that give honest answers. Sample size, MDE, guardrails, novelty effects, and why most A/B tests lie.",
  keywords: [
    "PM A/B testing", "product experimentation",
    "statistical significance PM", "AB testing 2026",
  ],
  alternates: { canonical: "/pm-ab-testing" },
  openGraph: {
    title: "PM A/B Testing 2026 — PM Streak",
    description: "Statistical rigor for product managers running A/B tests.",
    url: `${SITE_URL}/pm-ab-testing`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+A+B+Testing+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM A/B Testing 2026 — PM Streak",
    description: "Statistical rigor for product managers running A/B tests.",
    images: [`${SITE_URL}/api/og?title=PM+A+B+Testing+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const ESSENTIALS = [
  "Hypothesis before data — commit to what you expect and what success means",
  "Minimum detectable effect (MDE) — the smallest effect worth caring about",
  "Sample size calculation — run until powered, not until significant",
  "Guardrail metrics — watch retention, crash rate, while optimising your target",
  "Novelty and primacy effects — new features win early; wait for steady state",
];

const TRAPS = [
  "Peeking at results before the test ends — inflates false positive rate",
  "Running too many tests at once — interactions poison conclusions",
  "Ignoring negative secondary effects — a &apos;winner&apos; on CTR may lose on retention",
  "P-hacking — slicing data until something is significant",
  "Shipping wins without understanding why — statistical wins without causal stories don&apos;t compound",
];

const FAQS = [
  {
    q: "What&apos;s the right significance threshold for PM A/B tests?",
    a: "95% is convention but not sacred. For low-risk reversible changes, 80–90% is often reasonable. For high-risk or irreversible changes, aim for 95%+ and run guardrail tests. The honest question isn&apos;t &apos;is this significant?&apos; but &apos;am I confident enough to ship given the downside?&apos;",
  },
];

export default function PmAbTestingPage() {
  const dates = pageDates("/pm-ab-testing");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM A/B Testing", url: `${SITE_URL}/pm-ab-testing` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM A/B Testing (2026 Edition)",
        description:
          "How PMs run A/B tests that give honest answers. Sample size, MDE, guardrails, novelty effects, and why most A/B tests lie.",
        image: `${SITE_URL}/api/og?title=PM+A+B+Testing+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-ab-testing`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🧪</span> Most A/B tests lie. Rigor is the only defense.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM A/B Testing<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            PM A/B tests only give honest answers when a hypothesis and minimum detectable effect are set before data arrives, sample size is calculated instead of stopping at the first significant read, and guardrail metrics catch novelty and primacy effects — the traps that break most tests are peeking early, running too many experiments at once, and p-hacking until something looks significant.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 essentials and 5 traps for statistically honest A/B testing.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build A/B Testing Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Essentials</h2>
          <div className="space-y-2">
            {ESSENTIALS.map((e, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{e}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Traps</h2>
            <div className="space-y-2">
              {TRAPS.map((t, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-red-400 flex-shrink-0">❌</span>
                  <p className="text-sm text-white/70">{t}</p>
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

        <RelatedPages slug="pm-ab-testing" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice A/B Testing Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
