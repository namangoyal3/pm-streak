import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Stakeholder Map (2026) — How to Identify and Manage Every Stakeholder",
  description:
    "How PMs map stakeholders systematically. Who to keep informed, who to consult, who decides. The template that prevents surprises.",
  keywords: [
    "PM stakeholder map", "stakeholder mapping",
    "RACI PM", "influence-interest matrix",
    "stakeholder management PM 2026",
  ],
  alternates: { canonical: "/pm-stakeholder-map" },
  openGraph: {
    title: "PM Stakeholder Map 2026 — PM Streak",
    description: "How PMs map stakeholders systematically — informed, consulted, deciders.",
    url: `${SITE_URL}/pm-stakeholder-map`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Stakeholder+Map+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Stakeholder Map 2026 — PM Streak",
    description: "How PMs map stakeholders systematically — informed, consulted, deciders.",
    images: [`${SITE_URL}/api/og?title=PM+Stakeholder+Map+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const CATEGORIES = [
  { category: "Decision makers", what: "Have authority to approve/kill the initiative", engagement: "Weekly or bi-weekly; align early and re-align before big decisions" },
  { category: "Executors", what: "Engineering, design, and others who build", engagement: "Daily / sprint — operating rhythm partners" },
  { category: "Influencers", what: "No formal authority but shape opinion", engagement: "Periodic — consult, share context, earn buy-in" },
  { category: "Affected parties", what: "Impacted by the initiative (sales, CS, support)", engagement: "Inform early; consult on their concerns" },
  { category: "End users", what: "The ones using the product", engagement: "Research cadence — weekly interviews ideal" },
];

const INFLUENCE_INTEREST = [
  { group: "High influence, high interest", action: "Keep closely managed — weekly 1:1 syncs, pre-read docs" },
  { group: "High influence, low interest", action: "Keep satisfied — periodic updates, avoid surprises" },
  { group: "Low influence, high interest", action: "Keep informed — weekly updates are often enough" },
  { group: "Low influence, low interest", action: "Monitor — minimal touch unless situation changes" },
];

const RACI_TEMPLATE = [
  "Responsible — does the work (often PM + partners)",
  "Accountable — owns the outcome (usually PM or senior PM)",
  "Consulted — gives input before decisions (design lead, eng lead, legal, etc.)",
  "Informed — updated after decisions (leadership, adjacent teams)",
];

const MAPPING_MOVES = [
  "List every stakeholder on day 1 of a project — don&apos;t discover them mid-flight",
  "Categorise by influence + interest — use the 2×2 matrix",
  "Define engagement cadence for each — weekly, monthly, quarterly",
  "Review quarterly — stakeholder sets shift as projects evolve",
  "Document in a shared place — team should see who&apos;s on what",
];

const FAQS = [
  {
    q: "Should PMs share their stakeholder map publicly?",
    a: "Parts of it — yes. The influence/interest matrix itself is sensitive (&apos;CEO = low interest, high influence&apos; isn&apos;t something to publicise). But the list of stakeholders and engagement cadence is useful for the team. Share what drives alignment; keep what could embarrass private.",
  },
  {
    q: "What&apos;s the biggest stakeholder mapping mistake?",
    a: "Treating all stakeholders equally. PMs who give everyone the same updates at the same cadence burn their own time and others&apos;. The discipline: tier stakeholders, engage proportionally. Not all stakeholders need weekly updates; not all can be ignored.",
  },
];

export default function PmStakeholderMapPage() {
  const dates = pageDates("/pm-stakeholder-map");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Stakeholder Map", url: `${SITE_URL}/pm-stakeholder-map` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Stakeholder Map (2026 Edition)",
        description: "How PMs map stakeholders systematically. Who to keep informed, who to consult, who decides. The template that prevents surprises.",
        image: `${SITE_URL}/api/og?title=PM+Stakeholder+Map+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-stakeholder-map`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🗺️</span> Know who you&apos;re working with — before they surprise you
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Stakeholder Map<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            A stakeholder map sorts everyone touching a project into five categories — decision makers, executors, influencers, affected parties, and end users — then plots each on an influence/interest matrix to set engagement cadence, from weekly syncs for the high-influence, high-interest group down to light-touch monitoring for the rest, with a RACI template clarifying who&apos;s responsible, accountable, consulted, and informed.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-4">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 stakeholder categories, influence-interest matrix, 4-part RACI template, and 5 mapping moves.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Stakeholder Skills Daily — Free →
          </Link>
        </section>

        {/* Categories */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Stakeholder Categories</h2>
          <div className="space-y-3">
            {CATEGORIES.map((c, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-white text-sm mb-1">{i + 1}. {c.category}</p>
                <p className="text-xs text-white/60 mb-1">Who: {c.what}</p>
                <p className="text-xs text-[#89e219]">Engagement: <span className="text-white/70">{c.engagement}</span></p>
              </div>
            ))}
          </div>
        </section>

        {/* Influence-interest */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">Influence-Interest Matrix</h2>
            <div className="space-y-3">
              {INFLUENCE_INTEREST.map((i, idx) => (
                <div key={idx} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-[#89e219] text-sm mb-1">{i.group}</p>
                  <p className="text-xs text-white/60">{i.action}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RACI */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">RACI Template</h2>
          <div className="space-y-2">
            {RACI_TEMPLATE.map((r, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{r}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mapping moves */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Mapping Moves</h2>
            <div className="space-y-2">
              {MAPPING_MOVES.map((m, i) => (
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

        <RelatedPages slug="pm-stakeholder-map" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Stakeholder Skills Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on stakeholder management, communication, and alignment.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
