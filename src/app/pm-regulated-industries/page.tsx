import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Regulated Industries (2026) — Shipping in Fintech, Health, Legal",
  description:
    "How PMs ship in regulated industries. Compliance-as-product, audit trails, and why velocity looks different when rules are enforceable.",
  keywords: [
    "PM regulated industries", "compliance PM",
    "fintech health legal PM 2026",
  ],
  alternates: { canonical: "/pm-regulated-industries" },
  openGraph: {
    title: "PM Regulated Industries 2026 — PM Streak",
    description: "How PMs ship in regulated industries.",
    url: `${SITE_URL}/pm-regulated-industries`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Regulated+Industries+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Regulated Industries 2026 — PM Streak",
    description: "How PMs ship in regulated industries.",
    images: [`${SITE_URL}/api/og?title=PM+Regulated+Industries+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const REALITIES = [
  "Compliance is product requirement, not tax — design for it from day one",
  "Audit trails are features — build immutable logging into every sensitive action",
  "Legal and compliance teams are partners — loop them in early, not late",
  "Regulatory change is a roadmap input — monitor rulings, not just competitors",
  "Velocity looks different — shipping slower is sometimes the responsible choice",
];

const PRACTICES = [
  "Keep a rolling regulation log — track upcoming rules and impact",
  "Design change-management paths for data schemas that touch compliance",
  "Version-control policies with the same rigor as code",
  "Practice incident drills — audit readiness is a muscle",
  "Budget for certifications — SOC 2, HIPAA, ISO, RBI/SEBI, FDA as applicable",
];

const FAQS = [
  {
    q: "Is regulated industry PM slower than consumer PM?",
    a: "On feature velocity, yes. On business durability, often faster — regulated products have moats that consumer products lack. If you&apos;re optimising for learning rate, consumer is faster. If you&apos;re optimising for impact per feature shipped, regulated often wins. Pick the pace that matches your career goals.",
  },
];

export default function PmRegulatedIndustriesPage() {
  const dates = pageDates("/pm-regulated-industries");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Regulated Industries", url: `${SITE_URL}/pm-regulated-industries` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Regulated Industries (2026 Edition)",
        description: "How PMs ship in regulated industries. Compliance-as-product, audit trails, and why velocity looks different when rules are enforceable.",
        image: `${SITE_URL}/api/og?title=PM+Regulated+Industries+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-regulated-industries`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📜</span> In regulated spaces, compliance IS product.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Regulated Industries<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-3">
            Shipping in fintech, health, or legal means treating compliance as a product requirement rather than a tax: building immutable audit-trail logging into sensitive actions, looping legal and compliance teams in early instead of late, tracking regulatory change as a roadmap input, and budgeting for certifications like SOC 2, HIPAA, ISO, or RBI/SEBI — accepting that shipping slower is sometimes the responsible choice.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 realities and 5 practices for PMs in fintech, health, and legal.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Regulated PM Skills — Free →
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
            <h2 className="text-2xl font-bold text-center mb-10">5 Practices</h2>
            <div className="space-y-2">
              {PRACTICES.map((p, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{p}</p>
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

        <RelatedPages slug="pm-regulated-industries" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Regulated PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
