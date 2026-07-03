import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Negotiation Skills Guide (2026) — How PMs Negotiate Scope, Priorities & Resources",
  description:
    "How PMs negotiate — scope with engineering, priorities with leadership, resources with peers, and timelines with customers. Scripts, principles, and common pitfalls.",
  keywords: [
    "PM negotiation skills", "product manager negotiation",
    "PM scope negotiation", "PM stakeholder negotiation",
    "how PMs negotiate priorities 2026",
  ],
  alternates: { canonical: "/pm-negotiation-skills" },
  openGraph: {
    title: "PM Negotiation Skills Guide 2026 — PM Streak",
    description: "How PMs negotiate scope, priorities, resources, and timelines effectively.",
    url: `${SITE_URL}/pm-negotiation-skills`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Negotiation+Skills+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Negotiation Skills Guide 2026 — PM Streak",
    description: "How PMs negotiate scope, priorities, resources, and timelines effectively.",
    images: [`${SITE_URL}/api/og?title=PM+Negotiation+Skills+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PRINCIPLES = [
  { principle: "Negotiate on interests, not positions", what: "A &apos;position&apos; is what someone asks for. An &apos;interest&apos; is why they want it. Trade on interests and you&apos;ll find creative solutions; fight on positions and you&apos;ll grind." },
  { principle: "Always know your BATNA", what: "Best Alternative To a Negotiated Agreement. What happens if this negotiation fails? Knowing this makes you calm; not knowing it makes you desperate." },
  { principle: "Silence is a tool", what: "After you make an ask, shut up. Most PMs rush to fill silence with concessions. Let the other side respond first — they&apos;ll often offer more than you&apos;d have asked for." },
  { principle: "Anchor first when you can", what: "The first number in a negotiation heavily influences the final number. If you have the information to anchor credibly, go first. If not, ask the other side to go first." },
  { principle: "Give to get", what: "Never concede without a reason. Every give should get something — a commitment, a trade, a reciprocal ask. Free concessions train the other side to expect more." },
  { principle: "Separate the person from the problem", what: "PMs have to work with the same people tomorrow. Be hard on the problem (the scope, the timeline) and soft on the person (respect, warmth, curiosity)." },
];

const SCENARIOS = [
  {
    scenario: "Negotiating scope with engineering",
    situation: "Engineering says a feature is 8 weeks. You need it in 4.",
    bad: "Can you just try to do it faster?",
    good: "Let&apos;s understand the cost drivers. Which 20% of the scope is 80% of the complexity? Can we ship a v1 in 4 weeks without that 20%? What gets lost if we do?",
    why: "You&apos;re trading scope for time — not bullying the team. You&apos;re asking for the trade-off data, not the miracle.",
  },
  {
    scenario: "Negotiating priority with leadership",
    situation: "Your VP wants you to add a feature to the current roadmap.",
    bad: "Sure, we&apos;ll fit it in.",
    good: "I want to make sure we land this well. Here&apos;s what&apos;s in the current quarter [link]. To fit this in, we&apos;d defer [X] by a month. Is that the right swap? I want your call explicitly.",
    why: "You&apos;re making the trade-off visible. Leadership often doesn&apos;t know what they&apos;re displacing when they add asks. Force the explicit decision.",
  },
  {
    scenario: "Negotiating resources with a peer PM",
    situation: "Another PM needs a shared engineering team for their feature; so do you.",
    bad: "My feature is more important.",
    good: "Let&apos;s decide based on impact. What&apos;s the expected lift from yours? From mine? Which one is time-sensitive? Let&apos;s make the call together instead of escalating.",
    why: "Respect the peer relationship. Data-driven negotiation beats status-driven. Escalation damages the relationship and signals immaturity.",
  },
  {
    scenario: "Negotiating a deadline with a customer",
    situation: "Enterprise customer demands a feature in 2 weeks. Realistic is 6.",
    bad: "Sure, 2 weeks works.",
    good: "I understand the urgency. To hit 2 weeks, we&apos;d need to ship a minimal version — here&apos;s what that looks like. The full version would take 6 weeks. Which option works for your use case?",
    why: "You&apos;re offering a real choice — not a false promise. Customers respect honesty. Missing a promised deadline damages the relationship far more than an upfront trade-off.",
  },
];

const PITFALLS = [
  "Saying &apos;yes&apos; to everything because you fear pushback",
  "Escalating too fast — weakens peer relationships permanently",
  "Negotiating in Slack when a call would resolve it in 10 minutes",
  "Treating negotiation as win/lose — great PM negotiations feel collaborative",
  "Not documenting the agreement — &apos;I thought we agreed to...&apos; is a week-wasting failure mode",
  "Assuming silence means agreement — it usually means the other side is still thinking or unhappy",
];

const FAQS = [
  {
    q: "Is PM negotiation different from salary negotiation?",
    a: "Completely. Salary negotiation is transactional and ends. PM negotiations happen daily with people you&apos;ll work with for years. The skill set overlaps (anchoring, BATNA, interests) but the stakes are different — PMs must preserve relationships while getting good outcomes. A PM who wins every negotiation but damages relationships is failing the long game.",
  },
  {
    q: "How do you negotiate without seeming aggressive or difficult?",
    a: "Frame as problem-solving, not positioning. Instead of &apos;I need X,&apos; say &apos;here&apos;s the outcome we both want — what are the options?&apos; Ask questions before stating positions. Acknowledge the other side&apos;s constraints openly. Aggressive PMs win individual negotiations and lose political capital; collaborative PMs win over time.",
  },
  {
    q: "What&apos;s the biggest PM negotiation mistake?",
    a: "Caving too early. Many PMs give concessions the moment they sense resistance, either to avoid conflict or to seem agreeable. But every early concession trains the other side to push harder next time. Strong PMs hold positions until they have a reason to move — and every concession is explicitly traded for something in return.",
  },
];

export default function PmNegotiationSkillsPage() {
  const dates = pageDates("/pm-negotiation-skills");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Negotiation Skills", url: `${SITE_URL}/pm-negotiation-skills` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Negotiation Skills Guide (2026 Edition)",
        description:
          "How PMs negotiate — scope with engineering, priorities with leadership, resources with peers, and timelines with customers. Scripts, principles, and common pitfalls.",
        image: `${SITE_URL}/api/og?title=PM+Negotiation+Skills+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-negotiation-skills`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🤝</span> PMs negotiate every day. Most never learn how.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Negotiation Skills Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            PM negotiation covers four recurring situations: scope trade-offs with engineering,
            priority trade-offs with leadership, resource splits with peer PMs, and deadline
            trade-offs with customers. The core techniques are negotiating on interests rather
            than positions, knowing your BATNA, using silence deliberately, anchoring first when
            possible, and trading every concession for something in return.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 negotiation principles, 4 PM-specific scenarios with scripts,
            and the pitfalls that turn routine conversations into resentments.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice Hard Conversations Daily — Free →
          </Link>
        </section>

        {/* Principles */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Negotiation Principles for PMs</h2>
          <div className="space-y-3">
            {PRINCIPLES.map((p, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <p className="font-bold text-white mb-1">{i + 1}. {p.principle}</p>
                <p className="text-xs text-white/60">{p.what}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Scenarios */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">4 PM Negotiation Scenarios</h2>
            <div className="space-y-5">
              {SCENARIOS.map((s, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                  <p className="text-xs text-[#89e219] uppercase tracking-wider mb-1">{s.scenario}</p>
                  <p className="text-sm text-white/60 mb-3 italic">Situation: {s.situation}</p>
                  <div className="space-y-2 mb-3">
                    <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3">
                      <p className="text-xs text-red-400 mb-1">❌ Don&apos;t say</p>
                      <p className="text-sm text-white/70 italic">&ldquo;{s.bad}&rdquo;</p>
                    </div>
                    <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3">
                      <p className="text-xs text-green-400 mb-1">✅ Say instead</p>
                      <p className="text-sm text-white/70 italic">&ldquo;{s.good}&rdquo;</p>
                    </div>
                  </div>
                  <div className="bg-[#0e1113] rounded-lg px-3 py-2">
                    <p className="text-xs text-white/50">💡 Why: {s.why}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pitfalls */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 PM Negotiation Pitfalls</h2>
          <div className="space-y-2">
            {PITFALLS.map((p, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-red-400 flex-shrink-0">❌</span>
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

        <RelatedPages slug="pm-negotiation-skills" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Hard Conversations Daily</h2>
          <p className="text-white/60 mb-6">Scenarios on scope, priorities, and pushback — with AI feedback on your framing.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
