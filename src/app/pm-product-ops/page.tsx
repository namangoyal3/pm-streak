import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Product Ops (2026) — What Product Ops Does and When You Need It",
  description:
    "Product operations — what it does, when companies need it, and why great product ops multiplies PM leverage across an organisation.",
  keywords: [
    "product ops PM", "product operations",
    "PM ops function", "product ops vs PM",
    "scaling PM team 2026",
  ],
  alternates: { canonical: "/pm-product-ops" },
  openGraph: {
    title: "PM Product Ops 2026 — PM Streak",
    description: "What product ops does, when you need it, and how it multiplies PM leverage.",
    url: `${SITE_URL}/pm-product-ops`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Product+Ops+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Product Ops 2026 — PM Streak",
    description: "What product ops does, when you need it, and how it multiplies PM leverage.",
    images: [`${SITE_URL}/api/og?title=PM+Product+Ops+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const WHAT_PRODUCT_OPS_DOES = [
  "Analytics infrastructure — standard dashboards, event taxonomy, data governance",
  "Experimentation platform — A/B test tools, templates, best practices",
  "Research operations — recruit panels, research docs, insight sharing",
  "PM tooling — PRD templates, roadmap tools, launch checklists",
  "Customer feedback systems — aggregating tickets, surveys, user interviews into signal",
  "PM onboarding / training — ramping new PMs, sharing internal knowledge",
];

const WHEN_NEEDED = [
  "15+ PMs — natural scale point where specialisation helps",
  "Multiple products or business units — coordination matters",
  "Heavy experimentation culture — benefits from centralised tools",
  "Global operations — different markets need shared systems",
  "Public company discipline — reporting rigour increases",
];

const BENEFITS = [
  "PM leverage — PMs focus on product, not infrastructure",
  "Quality consistency — standards across products reduce variance",
  "Faster PM ramp — new PMs don&apos;t reinvent playbooks",
  "Better analytics — centralised expertise beats distributed",
  "Cross-product learning — insights share easier",
];

const COMMON_PITFALLS = [
  "Building product ops too early — overhead without scale benefit",
  "Product ops as gatekeeper — slows PMs instead of enabling",
  "Centralising decisions that should stay with PMs",
  "Building tools nobody uses — product ops has its own product to market",
  "Separating product ops from PM career path — both should lead to senior product roles",
];

const FAQS = [
  {
    q: "Do small companies need product ops?",
    a: "No. Under 10–15 PMs, individual PMs can handle their own ops. Product ops is a scale function — it exists to reduce duplicated work across many PMs. Hiring a product ops person for a 5-PM team usually creates overhead, not leverage.",
  },
  {
    q: "Is product ops a career step for PMs?",
    a: "It can be — especially for PMs who love systems thinking and multiplier roles. Some PMs use it as a lateral to then become Senior PM / Head of Product. Others build lasting product ops careers. The choice depends on what energises you: shipping products directly, or making PM orgs ship better.",
  },
];

export default function PmProductOpsPage() {
  const dates = pageDates("/pm-product-ops");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Product Ops", url: `${SITE_URL}/pm-product-ops` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Product Ops (2026 Edition)",
        description:
          "Product operations — what it does, when companies need it, and why great product ops multiplies PM leverage across an organisation.",
        image: `${SITE_URL}/api/og?title=PM+Product+Ops+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-product-ops`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>⚙️</span> Product ops is scale infrastructure — not bureaucracy
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Product Ops<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Product ops is the scale infrastructure product teams build once they cross roughly 15 PMs, multiple products, or heavy experimentation load — covering analytics, experimentation tooling, research operations, PM tooling, feedback systems, and onboarding. Done well it frees PMs to focus on product rather than infrastructure; done too early, it adds gatekeeping overhead a small team doesn&apos;t need.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 things product ops does, 5 signs you need it, 5 benefits, and 5 common pitfalls.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Scale Skills Daily — Free →
          </Link>
        </section>

        {/* What */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Things Product Ops Does</h2>
          <div className="space-y-2">
            {WHAT_PRODUCT_OPS_DOES.map((w, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{w}</p>
              </div>
            ))}
          </div>
        </section>

        {/* When needed */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Signs You Need Product Ops</h2>
            <div className="space-y-2">
              {WHEN_NEEDED.map((w, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{w}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Benefits</h2>
          <div className="space-y-2">
            {BENEFITS.map((b, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{b}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pitfalls */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Common Pitfalls</h2>
            <div className="space-y-2">
              {COMMON_PITFALLS.map((p, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-red-400 flex-shrink-0">❌</span>
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

        <RelatedPages slug="pm-product-ops" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Scale Skills Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on PM systems, scaling processes, and multiplier roles.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
