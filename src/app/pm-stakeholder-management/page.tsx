import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "Stakeholder Management for PMs (2026) — Influence Without Authority",
  description:
    "How PMs manage stakeholders — engineering, design, sales, leadership, customers. Frameworks, scripts for saying no, and how to build influence without having authority.",
  keywords: [
    "stakeholder management product manager", "PM stakeholder management",
    "how PM influences without authority", "PM stakeholder frameworks",
    "how to say no as a PM", "product manager alignment 2026",
  ],
  alternates: { canonical: "/pm-stakeholder-management" },
  openGraph: {
    title: "Stakeholder Management for PMs 2026 — PM Streak",
    description: "Influence without authority — how PMs manage engineering, sales, leadership, and customers.",
    url: `${SITE_URL}/pm-stakeholder-management`,
    images: [{ url: `${SITE_URL}/api/og?title=Stakeholder+Management+for+PMs+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stakeholder Management for PMs 2026 — PM Streak",
    description: "Influence without authority — how PMs manage engineering, sales, leadership, and customers.",
    images: [`${SITE_URL}/api/og?title=Stakeholder+Management+for+PMs+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const STAKEHOLDER_TYPES = [
  {
    type: "Engineering Lead",
    wants: "Clear scope, stable requirements, predictable delivery. Fears: last-minute changes, vague specs.",
    motivation: "Ship quality code, avoid rework, keep their team productive and happy.",
    howToWork: "Write PRDs that specify the 'why' and let them decide 'how'. Involve them in scope decisions early. Never renegotiate scope publicly — do it privately first.",
  },
  {
    type: "Design Lead",
    wants: "Enough time to explore, clear user insight to ground decisions, respect for craft.",
    motivation: "Ship experiences they're proud of. Avoid being a pixel-pusher after decisions are made.",
    howToWork: "Bring designers into discovery, not just delivery. Share research and data. Push back with 'what user problem does this solve?' not 'I don't like this.'",
  },
  {
    type: "Sales / Customer Success",
    wants: "Features that unblock deals or reduce churn. Fast turnarounds for specific customer asks.",
    motivation: "Hit revenue targets. Retain logos. Look credible in customer conversations.",
    howToWork: "Build a transparent intake process. Visualise trade-offs: show what gets deprioritised if their ask gets in. Share quarterly roadmap clearly — but firmly.",
  },
  {
    type: "Leadership / Executive",
    wants: "Clear strategy, honest progress updates, forecasts that are credible.",
    motivation: "Company goals, board narrative, strategic bets paying off.",
    howToWork: "Lead with outcomes, not activities. Summarise before explaining. Never surprise leadership with bad news — surface early and with options.",
  },
  {
    type: "Marketing / GTM",
    wants: "Early visibility into launches, differentiated features to position, clear launch dates.",
    motivation: "Drive acquisition, generate leads, hit growth targets.",
    howToWork: "Loop marketing in at design stage — not at launch. Give them realistic ranges, not dates that will slip. Co-own launch success metrics.",
  },
  {
    type: "Data / Analytics Partner",
    wants: "Clear metric definitions, experiment hygiene, time to build dashboards.",
    motivation: "Robust data, signal quality, being treated as a partner not a service desk.",
    howToWork: "Define events BEFORE engineering builds the feature. Include analytics work in sprint planning. Never ask for retroactive instrumentation — it's expensive.",
  },
];

const SAYING_NO_SCRIPTS = [
  {
    scenario: "Sales request for a one-off customer feature",
    bad: "We can't build this — it's not on the roadmap.",
    good: "Help me understand what the customer is trying to accomplish. If we build this exact thing, we delay [X] — which affects [Y other customers]. Can we solve their job a different way that scales to more customers?",
  },
  {
    scenario: "CEO asks for a feature you think is wrong",
    bad: "I don't think we should build that.",
    good: "I want to make sure we build the right thing. Here's what I'm hearing as the underlying goal. Before committing to this specific solution, can I run a 2-day validation with [users/data]? I'll come back with a recommendation.",
  },
  {
    scenario: "Another team asks you to prioritise their dependency",
    bad: "We don't have capacity this sprint.",
    good: "I want to unblock you. Here's what's in our current sprint [link]. To fit this in, we'd defer [X]. Is the downstream impact of our current commitments worth making that swap? Let's align with both our managers.",
  },
  {
    scenario: "Engineering pushes back on a scope you think is important",
    bad: "But we committed to this!",
    good: "Walk me through what's hard about this. If it's real complexity, maybe we scope down or phase. If it's just uncertainty, let me help you get clarity. I don't want to force commitment — I want us to ship the best version we can in the time we have.",
  },
];

const PRINCIPLES = [
  "Disagree in private, commit in public. Never undermine a decision after it's made.",
  "Over-communicate — especially bad news. Surprises erode trust faster than anything else.",
  "Make trade-offs visible. 'We'll do both' is rarely true. Name what's deprioritised.",
  "Default to writing. A well-written async update saves 5 meetings.",
  "Build relationships before you need them. You can't borrow credibility from someone who doesn't know you.",
  "Distinguish 'opinions' from 'preferences' from 'hills to die on.' Fight hard on few things.",
];

const FAQS = [
  {
    q: "How does a PM influence without authority?",
    a: "Through credibility, not compliance. Four key ingredients: (1) superior context — you've talked to users, studied data, thought about trade-offs more than anyone else, (2) clear communication — your PRDs, roadmap, and updates are easy to follow, (3) trust earned over time — you've delivered what you promised, (4) genuine relationships — you've invested in the people you need to influence before you needed anything from them.",
  },
  {
    q: "What's the hardest stakeholder to manage?",
    a: "It varies by PM, but the most commonly cited challenge is senior executives who have strong opinions but limited context. They want fast answers, not nuanced trade-offs. The technique that works: structure your response as 'Here's what I'd recommend and why, here's what I explored and rejected, here are the risks.' Give them the final answer first, then the context. Executives who feel surprised or unaligned will slow you down far more than a well-managed senior stakeholder.",
  },
  {
    q: "How do you handle a stakeholder who keeps changing their mind?",
    a: "Document. Every decision gets captured in writing — decision, date, context, explicit alternatives rejected. When they change direction, surface the prior decision: 'Last month we decided X for these reasons. What's new that's causing us to revisit?' Sometimes the reasons are valid (new data). Sometimes it's just whim. Either way, the documentation protects the team from thrashing and forces deliberate decision-making.",
  },
];

export default function PmStakeholderManagementPage() {
  const dates = pageDates("/pm-stakeholder-management");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Stakeholder Management", url: `${SITE_URL}/pm-stakeholder-management` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Stakeholder Management for PMs (2026 Edition)",
        description: "How PMs manage stakeholders — engineering, design, sales, leadership, customers. Frameworks, scripts for saying no, and how to build influence without having authority.",
        image: `${SITE_URL}/api/og?title=Stakeholder+Management+for+PMs+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-stakeholder-management`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🤝</span> PMs have no authority. That&apos;s why the craft is influence.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Stakeholder Management for PMs<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Stakeholder management for PMs comes down to influence, not compliance, earned through four ingredients — superior context from talking to users, communication clear enough that updates are easy to follow, trust built by delivering on promises, and genuine relationships built before they&apos;re needed. That craft spans six stakeholder types, from engineering to leadership, and shows up concretely in how a PM says no without burning bridges.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-white/60 hover:text-[#89e219] underline underline-offset-2">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            How PMs work effectively with engineering, design, sales, leadership, and data partners —
            with scripts for saying no and frameworks for building real influence.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice Stakeholder Scenarios — Free →
          </Link>
        </section>

        {/* Stakeholder types */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">The 6 Stakeholder Types Every PM Manages</h2>
          <div className="space-y-5">
            {STAKEHOLDER_TYPES.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-5">
                <h3 className="font-bold text-white mb-3">{s.type}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div className="bg-[#0e1113] rounded-lg p-3">
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-1">What they want</p>
                    <p className="text-xs text-white/60">{s.wants}</p>
                  </div>
                  <div className="bg-[#0e1113] rounded-lg p-3">
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Their motivation</p>
                    <p className="text-xs text-white/60">{s.motivation}</p>
                  </div>
                  <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-lg p-3">
                    <p className="text-xs text-[#89e219] mb-1">💡 How to work with them</p>
                    <p className="text-xs text-white/70">{s.howToWork}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Saying no scripts */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">How to Say No Without Burning Bridges</h2>
            <div className="space-y-5">
              {SAYING_NO_SCRIPTS.map((s, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                  <p className="text-xs text-[#89e219] uppercase tracking-wider mb-3">{s.scenario}</p>
                  <div className="space-y-2">
                    <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3">
                      <p className="text-xs text-red-400 mb-1">❌ Don&apos;t say</p>
                      <p className="text-sm text-white/70 italic">&ldquo;{s.bad}&rdquo;</p>
                    </div>
                    <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3">
                      <p className="text-xs text-green-400 mb-1">✅ Say instead</p>
                      <p className="text-sm text-white/70 italic">&ldquo;{s.good}&rdquo;</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Stakeholder Principles That Build Trust</h2>
          <div className="space-y-3">
            {PRINCIPLES.map((p, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{p}</p>
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

        <RelatedPages slug="pm-stakeholder-management" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Stakeholder Muscle Daily</h2>
          <p className="text-white/60 mb-6">Practice scenarios on conflict resolution, saying no, and aligning leadership.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
