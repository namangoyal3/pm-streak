import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM AI Productivity Products (2026) — Copilot, Glean, Mem PM Lessons",
  description:
    "How PMs build AI productivity products. Personal agents, org-wide search, knowledge retrieval, and why productivity AI now crosses workflow boundaries.",
  keywords: [
    "PM AI productivity", "Copilot PM",
    "Glean PM", "AI knowledge 2026",
  ],
  alternates: { canonical: "/pm-ai-productivity" },
  openGraph: {
    title: "PM AI Productivity Products 2026 — PM Streak",
    description: "How PMs build AI productivity products.",
    url: `${SITE_URL}/pm-ai-productivity`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+AI+Productivity+Products+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM AI Productivity Products 2026 — PM Streak",
    description: "How PMs build AI productivity products.",
    images: [`${SITE_URL}/api/og?title=PM+AI+Productivity+Products+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Cross-app context is the differentiator — Glean, Microsoft Copilot own this",
  "Personal memory matters — Mem, ChatGPT Memory compete here",
  "Enterprise deployment requires permissions awareness — don&apos;t leak data across ACLs",
  "Action-taking agents beat read-only assistants for ROI",
  "Buyer is usually IT — UX for end users, buyer for CIO",
];

const METRICS = [
  "Weekly active users within licensed orgs",
  "Time saved per user per week",
  "Cross-app query rate",
  "Agent action success rate",
  "Enterprise renewal",
];

const FAQS = [
  {
    q: "Is Microsoft Copilot inevitable in enterprise?",
    a: "Not inevitable but heavily advantaged. Office 365 lock-in means Copilot lands without procurement friction. Standalone products (Glean, Notion AI) compete on depth, cross-app context, and sometimes cost. The market isn&apos;t winner-take-all — it&apos;s segmenting.",
  },
];

export default function PmAiProductivityPage() {
  const dates = pageDates("/pm-ai-productivity");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM AI Productivity", url: `${SITE_URL}/pm-ai-productivity` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM AI Productivity Products (2026 Edition)",
        description:
          "How PMs build AI productivity products. Personal agents, org-wide search, knowledge retrieval, and why productivity AI now crosses workflow boundaries.",
        image: `${SITE_URL}/api/og?title=PM+AI+Productivity+Products+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-ai-productivity`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>⚡</span> Cross-app context is the differentiator
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM AI Productivity Products<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            What separates AI productivity products from single-purpose assistants is cross-app context — the terrain Glean and Microsoft Copilot are fighting over — plus personal memory features like Mem and ChatGPT Memory. Because Office 365 lock-in lets Copilot land without procurement friction, standalone tools instead compete on depth, permissions-aware deployment, and action-taking agents that actually finish tasks rather than just read them.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for AI productivity PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build AI Productivity PM Skills — Free →
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

        <RelatedPages slug="pm-ai-productivity" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice AI Productivity PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
