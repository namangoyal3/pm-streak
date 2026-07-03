import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "Product Strategy Guide for PMs (2026) — How to Think Strategically as a PM",
  description:
    "How PMs build product strategy. Vision vs strategy, strategic frameworks (moats, bets, Good Strategy/Bad Strategy), and the strategic questions every senior PM is expected to answer.",
  keywords: [
    "product strategy PM", "product strategy framework",
    "how to think strategically product manager", "product strategy for PMs",
    "good strategy bad strategy PM", "product vision vs strategy 2026",
  ],
  alternates: { canonical: "/pm-strategy-guide" },
  openGraph: {
    title: "Product Strategy Guide for PMs 2026 — PM Streak",
    description: "How PMs think strategically — frameworks, examples, and how to answer strategy questions.",
    url: `${SITE_URL}/pm-strategy-guide`,
    images: [{ url: `${SITE_URL}/api/og?title=Product+Strategy+Guide+for+PMs+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Strategy Guide for PMs 2026 — PM Streak",
    description: "How PMs think strategically — frameworks, examples, and how to answer strategy questions.",
    images: [`${SITE_URL}/api/og?title=Product+Strategy+Guide+for+PMs+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const STRATEGY_LAYERS = [
  {
    layer: "Vision (5+ years)",
    what: "The future state of the world you're trying to bring about. Aspirational, qualitative, emotional.",
    example: "'Every product manager in India has a daily practice habit that compounds into career mastery.'",
    whoSets: "Founder, CEO, or product leadership — not individual PMs.",
  },
  {
    layer: "Strategy (1–3 years)",
    what: "How you'll get to the vision. The explicit bets you're making and what you're NOT doing.",
    example: "'We'll win by being 10x better at interview prep for India-specific companies — not general PM coaching.'",
    whoSets: "Senior PM, Head of Product, VPs. Junior PMs contribute inputs.",
  },
  {
    layer: "Roadmap (6–12 months)",
    what: "Sequenced initiatives that execute the strategy. Outcomes, not features.",
    example: "'Q1: Launch India company-specific interview tracks. Q2: Build AI-graded practice. Q3: Expand to APM tier.'",
    whoSets: "PMs own this — within the strategy frame set above.",
  },
  {
    layer: "Execution (sprint)",
    what: "The actual work. Features, PRDs, experiments, launches.",
    example: "'Build the Razorpay-specific question bank. Design fintech domain lesson. Ship to 10% of users.'",
    whoSets: "PM + engineering + design, day-to-day.",
  },
];

const GOOD_VS_BAD = [
  {
    aspect: "Goals",
    good: "Clear, specific, makes trade-offs explicit. 'We will focus on India PMs, not global.'",
    bad: "Vague ambition without trade-offs. 'We want to be the #1 PM platform.'",
  },
  {
    aspect: "Diagnosis",
    good: "Names the specific challenge to overcome. 'Candidates lack structured daily practice.'",
    bad: "Generic market observation. 'PM interviews are hard.'",
  },
  {
    aspect: "Guiding Policy",
    good: "A clear approach that rules things in and out. 'We will not build generic PM content.'",
    bad: "Kitchen sink — does everything. 'We will build anything users want.'",
  },
  {
    aspect: "Coherent Action",
    good: "Actions reinforce each other. Content + AI feedback + streaks all support the same outcome.",
    bad: "Disconnected actions. Ship features without a unifying logic.",
  },
];

const STRATEGY_FRAMEWORKS = [
  {
    name: "Moats (Hamilton Helmer's 7 Powers)",
    use: "Identify the durable advantage your product has. Network effects, switching costs, scale economies, counter-positioning, cornered resource, branding, process power.",
    ex: "WhatsApp's moat: network effects (your contacts are there). Figma's moat: switching costs (teams' files, history, integrations).",
  },
  {
    name: "Jobs To Be Done (JTBD)",
    use: "Define what users are hiring your product to do. Build strategy around owning that job better than anyone.",
    ex: "Duolingo's job: 'help me feel like I'm making progress on a long-term goal with minimal daily effort.'",
  },
  {
    name: "Good Strategy / Bad Strategy (Rumelt)",
    use: "A good strategy = diagnosis + guiding policy + coherent action. Without all three, it's a fluff document.",
    ex: "'We'll win in PM education because we've identified that daily practice is rare and hard to sustain (diagnosis). We'll build for retention via streaks (policy). Every feature reinforces habit formation (action).'",
  },
  {
    name: "Blue Ocean Strategy",
    use: "Compete on a new dimension rather than winning where everyone else is fighting.",
    ex: "Cirque du Soleil skipped animals + low prices (circus vs) and created 'theatrical circus' at premium pricing.",
  },
  {
    name: "S-Curves & Adoption",
    use: "Where is your product in its adoption curve? Different strategies for early, growth, and mature phases.",
    ex: "Early: evangelise innovators. Growth: build scale + distribution. Mature: efficiency + monetisation + adjacent expansion.",
  },
];

const STRATEGY_QUESTIONS = [
  "What is the single biggest thing we will NOT do this year, and why?",
  "If a competitor copied our product tomorrow, what would still make us win?",
  "What user segment would we willingly lose to double down on the core?",
  "What's the one metric that, if we moved it meaningfully, would change the trajectory of the business?",
  "If we had to cut our roadmap in half, what would we cut — and would the business be meaningfully worse?",
];

const FAQS = [
  {
    q: "What's the difference between product vision and product strategy?",
    a: "Vision is the future you want to create (5+ years, emotional, aspirational). Strategy is how you'll get there (1–3 years, specific, makes trade-offs). A vision without strategy is a dream. A strategy without vision is execution theatre. Both are needed, and they serve different purposes — don't confuse them in documents or meetings.",
  },
  {
    q: "When does a PM need to think strategically?",
    a: "At every level, but the scope shifts. APM: strategy within a feature (why this solution vs alternatives). PM: strategy within a product area (what are we building toward in 6 months). Senior PM: strategy at the product line level (why these bets this year). Director/VP: company-level strategy. Candidates who can zoom up to the level above their role tend to get promoted.",
  },
  {
    q: "How do you answer a strategy question in a PM interview?",
    a: "Structure: (1) clarify the goal and constraints, (2) diagnose the key challenge (not just surface symptoms), (3) propose a guiding policy that makes trade-offs explicit, (4) list 3–4 coherent actions that reinforce the policy, (5) name what you'd NOT do and why. Strategy answers that try to 'do everything' signal weakness. Strategy answers with a clear 'we will NOT...' signal seniority.",
  },
];

export default function PmStrategyGuidePage() {
  const dates = pageDates("/pm-strategy-guide");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Strategy Guide", url: `${SITE_URL}/pm-strategy-guide` },
      ])} />
      <JsonLd data={articleSchema({
        headline: "Product Strategy Guide (PM Edition 2026)",
        description: "How PMs build product strategy. Vision vs strategy, strategic frameworks (moats, bets, Good Strategy/Bad Strategy), and the strategic questions every senior PM is expected to answer.",
        image: `${SITE_URL}/api/og?title=Product+Strategy+Guide+for+PMs+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-strategy-guide`,
      })} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>♟️</span> Great strategy makes trade-offs explicit. Bad strategy hides them.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Product Strategy Guide<br />(PM Edition 2026)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Product strategy for PMs breaks into four layers — vision, strategy, roadmap, and
            execution — each owned by a different level of seniority and each answering a different
            time horizon. Good strategy names a diagnosis and guiding policy that rules options out,
            while bad strategy chases every opportunity without trade-offs; frameworks like Moats,
            JTBD, and Good Strategy/Bad Strategy help PMs tell the two apart.
          </p>
          <p className="text-sm text-white/50 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The 4 layers of product strategy, how to tell good strategy from bad,
            5 frameworks every PM should know, and the questions senior PMs must answer.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice Strategy Questions Daily — Free →
          </Link>
        </section>

        {/* Strategy layers */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">The 4 Layers of Product Strategy</h2>
          <div className="space-y-4">
            {STRATEGY_LAYERS.map((l, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-5">
                <h3 className="font-bold text-white mb-2">{l.layer}</h3>
                <p className="text-sm text-white/60 mb-3">{l.what}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-lg p-3">
                    <p className="text-xs text-[#89e219] mb-1">💡 Example</p>
                    <p className="text-xs text-white/70 italic">{l.example}</p>
                  </div>
                  <div className="bg-[#0e1113] rounded-lg p-3">
                    <p className="text-xs text-white/40 mb-1">Who sets this</p>
                    <p className="text-xs text-white/60">{l.whoSets}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Good vs bad */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">Good Strategy vs Bad Strategy</h2>
            <div className="space-y-3">
              {GOOD_VS_BAD.map((row, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                  <p className="text-xs text-[#89e219] uppercase tracking-wider mb-2">{row.aspect}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3">
                      <p className="text-xs text-green-400 mb-1">✅ Good strategy</p>
                      <p className="text-xs text-white/70">{row.good}</p>
                    </div>
                    <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3">
                      <p className="text-xs text-red-400 mb-1">❌ Bad strategy</p>
                      <p className="text-xs text-white/70">{row.bad}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Frameworks */}
        <section className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Strategy Frameworks Every PM Should Know</h2>
          <div className="space-y-4">
            {STRATEGY_FRAMEWORKS.map((f, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <p className="font-bold text-white mb-2">{i + 1}. {f.name}</p>
                <p className="text-sm text-white/70 mb-2">{f.use}</p>
                <p className="text-xs text-[#89e219]">💡 Example: <span className="text-white/60">{f.ex}</span></p>
              </div>
            ))}
          </div>
        </section>

        {/* Strategy questions */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-3">5 Questions Every Senior PM Should Be Able to Answer</h2>
            <p className="text-white/60 text-center mb-8">If you can&apos;t answer these about your product area, you&apos;re operating on execution — not strategy.</p>
            <div className="space-y-3">
              {STRATEGY_QUESTIONS.map((q, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{q}</p>
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

        <RelatedPages slug="pm-strategy-guide" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Strategic Thinking in 2 Minutes a Day</h2>
          <p className="text-white/60 mb-6">Daily scenarios on trade-offs, moats, and the senior-PM questions that matter.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
