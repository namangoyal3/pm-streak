import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "Design Thinking for PMs (2026) — How to Use IDEO&apos;s 5-Stage Process",
  description:
    "How PMs apply design thinking in real work. The 5 stages (Empathize, Define, Ideate, Prototype, Test) with PM-specific examples — beyond the Stanford d.school theory.",
  keywords: [
    "design thinking PM", "design thinking for product managers",
    "IDEO design thinking", "empathize ideate prototype PM",
    "design thinking process 2026",
  ],
  alternates: { canonical: "/pm-design-thinking" },
  openGraph: {
    title: "Design Thinking for PMs 2026 — PM Streak",
    description: "IDEO&apos;s 5-stage design thinking applied to PM work — beyond theory, with examples.",
    url: `${SITE_URL}/pm-design-thinking`,
    images: [{ url: `${SITE_URL}/api/og?title=Design+Thinking+for+PMs+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Design Thinking for PMs 2026 — PM Streak",
    description: "IDEO&apos;s 5-stage design thinking applied to PM work — beyond theory, with examples.",
    images: [`${SITE_URL}/api/og?title=Design+Thinking+for+PMs+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const STAGES = [
  {
    stage: "Empathize",
    what: "Get close to real users. Interviews, observation, shadowing — before you have opinions.",
    pmVersion: "Spend 30 minutes in the customer support queue. Interview 5 real users. Shadow a power user.",
    trap: "Skipping this because you &apos;already know&apos; your users. Assumptions compound into bad bets.",
  },
  {
    stage: "Define",
    what: "Write a clear problem statement based on what you learned — user, need, context.",
    pmVersion: "&apos;First-time Zepto users in Tier-3 cities can&apos;t complete address entry because the UX assumes pin-code familiarity.&apos;",
    trap: "Defining the problem too broadly. &apos;Users are frustrated&apos; doesn&apos;t lead to anything actionable.",
  },
  {
    stage: "Ideate",
    what: "Generate many solutions — no filtering yet. Quantity over quality at this stage.",
    pmVersion: "Whiteboard with design and engineering. Aim for 15+ ideas before narrowing. Include obviously-bad ones.",
    trap: "Jumping to the first &apos;reasonable&apos; solution. The 3rd or 4th idea is often the best one.",
  },
  {
    stage: "Prototype",
    what: "Build the cheapest version that tests your key assumption. Paper, Figma, Wizard-of-Oz, no-code.",
    pmVersion: "Paper prototype of the new address flow. Figma clickable prototype. NOT a real implementation yet.",
    trap: "Jumping to &apos;let&apos;s build a v1.&apos; Prototypes are 1/10th the cost of MVPs and test the same assumption.",
  },
  {
    stage: "Test",
    what: "Get the prototype in front of users. Watch. Learn. Iterate or pivot.",
    pmVersion: "5 users test the Figma prototype. You watch where they hesitate. That&apos;s the data — not their words.",
    trap: "Asking &apos;would you use this?&apos; instead of &apos;show me how you&apos;d use this.&apos; Observed behaviour &gt; stated preference.",
  },
];

const PM_USES = [
  "Discovery for a new product or feature direction",
  "Redesign of an existing flow with high friction",
  "Onboarding / activation improvements",
  "Reducing churn by empathising with the users who leave",
  "Market entry for a new user segment (e.g., Tier-3 first-time users)",
  "Service design (not just digital — physical + digital flows)",
];

const MYTHS = [
  "Design thinking is only for designers — no, it&apos;s a thinking tool for everyone on the product team",
  "You need to do all 5 stages in sequence — in practice, you loop back and forth",
  "Design thinking is slow — done well, it&apos;s faster than shipping wrong things and redoing them",
  "It&apos;s only for consumer products — works just as well for B2B, internal tools, ops",
  "Sticky notes on walls = design thinking — tools don&apos;t matter; the process of empathy → frame → test does",
];

const FAQS = [
  {
    q: "Is design thinking just a fancy word for user research?",
    a: "User research is part of design thinking (the Empathize stage), but design thinking is broader — it&apos;s a structured process for turning insight into tested prototypes before committing to build. You can do user research without design thinking (and often do). But you can&apos;t do design thinking without user research at its core.",
  },
  {
    q: "Is design thinking still relevant in 2026?",
    a: "Yes — increasingly, even. With AI shortening build time, the bottleneck shifts from &apos;building fast&apos; to &apos;building the right thing.&apos; Design thinking&apos;s focus on deep user empathy and cheap prototyping is MORE valuable when it&apos;s easy to ship quickly — because you ship quickly in the right direction.",
  },
  {
    q: "Do PMs need to formally use design thinking?",
    a: "You don&apos;t need to say &apos;we&apos;re doing design thinking now&apos; in sprint planning. But PMs benefit from internalising the discipline: empathise before solving, define the problem before ideating, prototype cheaply before building, test before shipping. This discipline separates strong PMs from those who jump to solutions and ship features users don&apos;t want.",
  },
];

export default function PmDesignThinkingPage() {
  const dates = pageDates("/pm-design-thinking");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Design Thinking", url: `${SITE_URL}/pm-design-thinking` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Design Thinking for PMs (2026 Edition)",
        description:
          "How PMs apply design thinking in real work. The 5 stages (Empathize, Define, Ideate, Prototype, Test) with PM-specific examples — beyond the Stanford d.school theory.",
        image: `${SITE_URL}/api/og?title=Design+Thinking+for+PMs+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-design-thinking`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>💡</span> Empathise. Define. Ideate. Prototype. Test.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Design Thinking for PMs<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Design thinking gives PMs a five-stage process—Empathize, Define, Ideate, Prototype, Test—for turning user insight into tested solutions before committing to build. PMs apply it to discovery, flow redesigns, onboarding, churn reduction, and market entry, prototyping cheaply (paper, Figma, Wizard-of-Oz) and observing real behaviour rather than asking people what they&apos;d use.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            IDEO&apos;s 5-stage design thinking applied to PM work — with PM-specific examples for each stage,
            6 real use cases, and 5 myths to debunk.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build User-Empathy Skills Daily — Free →
          </Link>
        </section>

        {/* Stages */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">The 5 Stages, PM-Translated</h2>
          <div className="space-y-5">
            {STAGES.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <p className="font-bold text-white mb-1">{i + 1}. {s.stage}</p>
                <p className="text-sm text-white/70 mb-3">{s.what}</p>
                <div className="space-y-2">
                  <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-lg p-3">
                    <p className="text-xs text-[#89e219] mb-1">💡 PM version</p>
                    <p className="text-xs text-white/70">{s.pmVersion}</p>
                  </div>
                  <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3">
                    <p className="text-xs text-red-400 mb-1">⚠️ Common trap</p>
                    <p className="text-xs text-white/70">{s.trap}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PM uses */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 PM Use Cases for Design Thinking</h2>
            <div className="space-y-2">
              {PM_USES.map((u, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{u}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Myths */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Design Thinking Myths</h2>
          <div className="space-y-2">
            {MYTHS.map((m, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-red-400 flex-shrink-0">❌</span>
                <p className="text-sm text-white/70">{m}</p>
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

        <RelatedPages slug="pm-design-thinking" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build User Empathy Daily</h2>
          <p className="text-white/60 mb-6">Daily PM scenarios that force the discipline of empathy before solution.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
