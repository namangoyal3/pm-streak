import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Market Research Guide (2026) — How PMs Size Markets & Spot Opportunities",
  description:
    "How PMs do market research — TAM/SAM/SOM, competitive landscape, customer segmentation, and spotting opportunities others miss. With frameworks and Indian market examples.",
  keywords: [
    "PM market research", "product manager market research",
    "TAM SAM SOM PM", "market sizing product manager",
    "market opportunity framework PM 2026",
  ],
  alternates: { canonical: "/pm-market-research" },
  openGraph: {
    title: "PM Market Research Guide 2026 — PM Streak",
    description: "How PMs size markets, map competitive landscapes, and spot opportunities others miss.",
    url: `${SITE_URL}/pm-market-research`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Market+Research+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Market Research Guide 2026 — PM Streak",
    description: "How PMs size markets, map competitive landscapes, and spot opportunities others miss.",
    images: [`${SITE_URL}/api/og?title=PM+Market+Research+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const SIZING = [
  { label: "TAM (Total Addressable Market)", what: "Total revenue possible if every potential user bought your product at full price.", example: "All smartphone users in India × average ARPU × 100% capture = TAM." },
  { label: "SAM (Serviceable Addressable Market)", what: "The portion of TAM you can reach given your product, geography, and channels.", example: "English-speaking urban smartphone users × ARPU = SAM." },
  { label: "SOM (Serviceable Obtainable Market)", what: "The realistic market share you can capture in 3–5 years.", example: "5–15% of SAM = SOM, often reflecting competitive reality." },
];

const RESEARCH_LAYERS = [
  {
    layer: "Secondary research (fast, broad)",
    what: "Reports, articles, public earnings calls, industry publications. Cheap and fast but often outdated.",
    sources: "Statista, RedSeer, Bain reports, Inc42, LiveMint, earnings call transcripts, Reddit/Twitter discourse",
  },
  {
    layer: "Competitive teardowns",
    what: "Study competitor products, pricing, positioning, messaging. Often more revealing than reports.",
    sources: "Use the product yourself, read their docs, follow their founders, check G2/App Store reviews",
  },
  {
    layer: "Customer interviews",
    what: "Talk to real users of the problem (yours and competitors&apos;). This is where assumption-breaking insight lives.",
    sources: "Your user base, LinkedIn outreach, UserInterviews.com, Respondent.io, Reddit communities",
  },
  {
    layer: "Industry expert calls",
    what: "30-minute calls with operators who&apos;ve seen the space up close. Accelerates learning dramatically.",
    sources: "Intro.co, GLG (paid), Atlas, Twitter DMs to operators, former employees on LinkedIn",
  },
  {
    layer: "Internal data",
    what: "Your product&apos;s own data often reveals market opportunities better than external research.",
    sources: "Support tickets (revealed pain), cancellations (unmet needs), churn reasons, power user behaviour",
  },
];

const OPPORTUNITY_LENSES = [
  { lens: "Underserved segments", what: "Users the market ignores because they&apos;re not the default persona. Bharat users, older users, non-English speakers, specific verticals.", example: "Meesho spotted that Tier-2/3 women resellers were underserved by mass e-commerce." },
  { lens: "Unbundling vs bundling", what: "Large all-in-one products can be attacked by better point solutions. Point solutions can be bundled into suites.", example: "Notion bundled docs + DB + wikis. Figma unbundled design from Adobe&apos;s suite." },
  { lens: "New distribution shifts", what: "New channels (UPI, WhatsApp, AI interfaces) create fresh ways to reach customers. Early movers win.", example: "PhonePe leveraged UPI distribution to reach 500M+ users." },
  { lens: "Regulatory shifts", what: "New rules create or destroy markets. Stay close to regulatory changes in your domain.", example: "Tokenisation mandates created new payments security opportunities; UPI MDR caps destroyed merchant acquirer revenue models." },
  { lens: "Workflow gaps", what: "Watch what users do across multiple tools. The &apos;gap&apos; between tools is a product opportunity.", example: "Calendly bridged email + calendar. Linear bridged issue tracking + developer UX." },
];

const FAQS = [
  {
    q: "How much time should PMs spend on market research?",
    a: "Continuous light research (2 hours/week reading industry content, following operators, studying competitors) + quarterly deep-dives (8–12 hours for a specific strategic question). Most PMs either over-research (get stuck in analysis) or under-research (miss obvious market shifts). The balance: light ongoing, deep when strategic decisions demand it.",
  },
  {
    q: "Do PM interviews test market research skills?",
    a: "Often indirectly, through strategy and sizing questions. &apos;Should Company X enter Market Y?&apos; tests your ability to size markets, assess competitive dynamics, and reason about capability fit. &apos;Estimate the PM market size in India&apos; tests raw sizing skills. Candidates who can do both — strategic thinking + quick sizing — score noticeably better on strategy rounds.",
  },
  {
    q: "How do PMs avoid analysis paralysis in market research?",
    a: "Timebox it. Give yourself 4 hours for an initial view, then make a hypothesis, then gather data to validate or falsify it. Research aimed at confirming a hypothesis is more efficient than research aimed at &apos;understanding the market.&apos; If you can&apos;t form a hypothesis after 4 hours of reading, that&apos;s itself a signal — the market is too ambiguous, or you need a different angle.",
  },
];

export default function PmMarketResearchPage() {
  const dates = pageDates("/pm-market-research");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Market Research", url: `${SITE_URL}/pm-market-research` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Market Research Guide (2026 Edition)",
        description:
          "How PMs do market research — TAM/SAM/SOM, competitive landscape, customer segmentation, and spotting opportunities others miss. With frameworks and Indian market examples.",
        image: `${SITE_URL}/api/og?title=PM+Market+Research+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-market-research`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔍</span> Good market research turns guesses into bets
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Market Research Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            PM market research combines TAM/SAM/SOM sizing with five layers of evidence — secondary reports,
            competitive teardowns, customer interviews, expert calls, and internal data — filtered through lenses
            like underserved segments and workflow gaps to spot real opportunities. Most PMs get this wrong by
            researching without a hypothesis; timebox initial reading to four hours, then form one to test.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            TAM/SAM/SOM sizing, 5 research layers, and 5 opportunity lenses
            — with examples from India&apos;s most successful product companies.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice Strategy Questions — Free →
          </Link>
        </section>

        {/* Sizing */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">TAM / SAM / SOM Sizing</h2>
          <div className="space-y-4">
            {SIZING.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <p className="font-bold text-[#89e219] mb-1">{s.label}</p>
                <p className="text-sm text-white/70 mb-2">{s.what}</p>
                <p className="text-xs text-white/50 italic">Example: {s.example}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Research layers */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Research Layers</h2>
            <div className="space-y-4">
              {RESEARCH_LAYERS.map((r, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                  <p className="font-bold text-white mb-1">{i + 1}. {r.layer}</p>
                  <p className="text-sm text-white/60 mb-2">{r.what}</p>
                  <p className="text-xs text-[#89e219]">📚 Sources: <span className="text-white/70">{r.sources}</span></p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Opportunity lenses */}
        <section className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Opportunity Lenses</h2>
          <div className="space-y-4">
            {OPPORTUNITY_LENSES.map((l, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <p className="font-bold text-white mb-1">{i + 1}. {l.lens}</p>
                <p className="text-sm text-white/70 mb-2">{l.what}</p>
                <p className="text-xs text-green-400">💡 Example: <span className="text-white/70">{l.example}</span></p>
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

        <RelatedPages slug="pm-market-research" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Strategic Intuition Daily</h2>
          <p className="text-white/60 mb-6">Daily PM scenarios on market sizing, strategy, and opportunity framing.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
