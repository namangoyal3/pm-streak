import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "Product Manager vs Project Manager (2026) — The Real Differences",
  description:
    "Product manager vs project manager — what's actually different, where they overlap, which earns more, and which career to choose. With a side-by-side comparison.",
  keywords: [
    "product manager vs project manager", "product manager or project manager",
    "difference between product and project manager",
    "PM vs PjM", "product vs project manager salary",
    "which is better product or project manager 2026",
  ],
  alternates: { canonical: "/product-manager-vs-project-manager" },
  openGraph: {
    title: "Product Manager vs Project Manager 2026 — PM Streak",
    description: "The real differences between product and project manager roles — responsibilities, salary, career path.",
    url: `${SITE_URL}/product-manager-vs-project-manager`,
    images: [{ url: `${SITE_URL}/api/og?title=Product+Manager+vs+Project+Manager+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Manager vs Project Manager 2026 — PM Streak",
    description: "The real differences between product and project manager roles — responsibilities, salary, career path.",
    images: [`${SITE_URL}/api/og?title=Product+Manager+vs+Project+Manager+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const COMPARISON = [
  {
    dimension: "Primary question answered",
    product: "What should we build, and why?",
    project: "How do we ship what's been decided, on time and on budget?",
  },
  {
    dimension: "Output owned",
    product: "Roadmap, PRDs, user research, product metrics",
    project: "Project plan, Gantt chart, status reports, risk logs",
  },
  {
    dimension: "Success measured by",
    product: "Business outcomes — retention, revenue, NPS, adoption",
    project: "Delivery outcomes — on-time, on-budget, scope completion",
  },
  {
    dimension: "Key relationships",
    product: "Users, engineering, design, business stakeholders",
    project: "Engineering, cross-functional teams, operations, vendors",
  },
  {
    dimension: "Where they work",
    product: "Tech companies, SaaS, consumer products, fintech",
    project: "Enterprises, consulting firms, construction, IT services, ops-heavy orgs",
  },
  {
    dimension: "Typical salary in India (mid-level)",
    product: "₹25L – ₹55L",
    project: "₹15L – ₹35L (higher in large IT services and consulting)",
  },
  {
    dimension: "Typical background",
    product: "Engineering, MBA, design, consulting",
    project: "Engineering, PMP certified, operations, MBA",
  },
  {
    dimension: "Career ceiling",
    product: "VP Product, Chief Product Officer",
    project: "Director PMO, VP of Operations, Delivery Head",
  },
];

const OVERLAP_AREAS = [
  "Both coordinate across teams — but PMs decide what; PjMs decide how",
  "Both manage stakeholders — but PM stakeholders include users; PjMs' rarely do",
  "Both track metrics — but PM metrics are business outcomes; PjM metrics are delivery efficiency",
  "Both write docs — but PRDs define what to build; project plans define how to build it",
];

const WHICH_TO_CHOOSE = [
  {
    choose: "Product Manager",
    ifYou: [
      "Love deciding what to build, not just how to ship it",
      "Are genuinely curious about users and their problems",
      "Are comfortable making decisions with incomplete data",
      "Want higher upside — both career ceiling and compensation",
      "Tolerate ambiguity and thrive in strategy conversations",
    ],
  },
  {
    choose: "Project Manager",
    ifYou: [
      "Love structured execution and predictability",
      "Prefer clear deliverables and measurable milestones",
      "Are energised by keeping complex initiatives on track",
      "Want stable demand across industries (not just tech)",
      "Prefer operational problems over strategic ambiguity",
    ],
  },
];

const FAQS = [
  {
    q: "Is product manager a better career than project manager?",
    a: "Not objectively — they solve different problems and attract different personalities. Product management typically has higher upside (VP/CPO roles, tech company equity) and is in higher demand at growth-stage tech companies. Project management has broader applicability (every industry needs it), more stable demand across economic cycles, and often clearer progression via certifications (PMP). The better career is the one that matches how you think.",
  },
  {
    q: "Can you transition from project manager to product manager?",
    a: "Yes — it's a common path. The main gaps to close: user empathy (product managers obsess over user problems, not just delivery), metrics fluency (moving from delivery metrics to business/product metrics), and strategic framing (what should we build vs how do we build it). Project management experience gives strong execution and stakeholder skills that PMs need — the transition is about adding product thinking on top of those strengths.",
  },
  {
    q: "Do all companies have both product and project managers?",
    a: "No — many tech companies have product managers but only informal project management (often owned by engineering leads or delivery leads). Large enterprises, services firms, and IT companies are more likely to have dedicated project managers. Startups rarely have dedicated project managers until they're 100+ employees — PMs often handle both roles early on.",
  },
];

export default function ProductManagerVsProjectManagerPage() {
  const dates = pageDates("/product-manager-vs-project-manager");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Product Manager vs Project Manager", url: `${SITE_URL}/product-manager-vs-project-manager` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Product Manager vs Project Manager (2026)",
        description:
          "Product manager vs project manager — what's actually different, where they overlap, which earns more, and which career to choose. With a side-by-side comparison.",
        image: `${SITE_URL}/api/og?title=Product+Manager+vs+Project+Manager+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/product-manager-vs-project-manager`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>⚖️</span> Same acronym. Completely different jobs.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Product Manager vs<br />Project Manager (2026)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Product managers decide what to build and are judged on business outcomes like
            retention and revenue; project managers decide how to ship what&apos;s already been
            decided and are judged on delivery outcomes like on-time, on-budget completion — a
            split that shows up across ownership (roadmaps and PRDs versus Gantt charts and risk
            logs), typical mid-level salary in India (₹25L–₹55L versus ₹15L–₹35L), and career
            ceiling (CPO versus Delivery Head).
          </p>
          <p className="text-sm text-white/50 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            What actually differs between these two PM roles — responsibilities, salary, career path,
            and a clear framework for choosing between them.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Start Product Manager Prep — Free →
          </Link>
        </section>

        {/* Comparison table */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-white/40 font-medium">Dimension</th>
                  <th className="text-left py-3 px-4 text-blue-400 font-medium">Product Manager</th>
                  <th className="text-left py-3 px-4 text-orange-400 font-medium">Project Manager</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-3 px-4 font-semibold text-white/50 text-xs">{row.dimension}</td>
                    <td className="py-3 px-4 text-white/70 text-xs">{row.product}</td>
                    <td className="py-3 px-4 text-white/70 text-xs">{row.project}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Overlap */}
        <section className="bg-[#16181c] py-12">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-xl font-bold mb-5 text-center">Where They Overlap — and Where They Diverge</h2>
            <div className="space-y-2">
              {OVERLAP_AREAS.map((a, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] flex-shrink-0">•</span>
                  <span className="text-sm text-white/70">{a}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Which to choose */}
        <section className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">Which Role Is Right For You?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {WHICH_TO_CHOOSE.map((w, i) => (
              <div key={i} className={`border rounded-2xl p-6 ${i === 0 ? "bg-blue-500/5 border-blue-500/20" : "bg-orange-500/5 border-orange-500/20"}`}>
                <h3 className="font-bold text-white text-lg mb-4">Choose {w.choose} if you...</h3>
                <ul className="space-y-2">
                  {w.ifYou.map((item, j) => (
                    <li key={j} className="flex gap-2 text-sm">
                      <span className={i === 0 ? "text-blue-400" : "text-orange-400"}>✓</span>
                      <span className="text-white/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
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

        <RelatedPages slug="product-manager-vs-project-manager" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">If You&apos;re Choosing Product — Start Here</h2>
          <p className="text-white/60 mb-6">Daily PM lessons that build product thinking, metrics fluency, and user empathy.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
