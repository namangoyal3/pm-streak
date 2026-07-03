import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "10 Essential Product Management Frameworks (2026) — PM Streak",
  description:
    "The 10 PM frameworks every product manager must know. RICE, JTBD, north star metric, CIRCLES, prioritisation matrices, and more — explained clearly with examples.",
  keywords: [
    "product management frameworks", "PM frameworks", "RICE framework", "jobs to be done PM",
    "north star metric framework", "product prioritisation framework",
    "CIRCLES framework", "PM mental models", "product strategy frameworks",
  ],
  alternates: { canonical: "/product-management-frameworks" },
  openGraph: {
    title: "10 Essential PM Frameworks (2026) — PM Streak",
    description: "RICE, JTBD, north star, CIRCLES, and 6 more — explained with examples.",
    url: `${SITE_URL}/product-management-frameworks`,
    images: [{ url: `${SITE_URL}/api/og?title=10+Essential+PM+Frameworks+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "10 Essential PM Frameworks (2026) — PM Streak",
    description: "RICE, JTBD, north star, CIRCLES, and 6 more — explained with examples.",
    images: [`${SITE_URL}/api/og?title=10+Essential+PM+Frameworks+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const FRAMEWORKS = [
  {
    name: "RICE Scoring",
    category: "Prioritisation",
    formula: "Reach × Impact × Confidence ÷ Effort",
    when: "When you have a long backlog and need an objective stack-rank",
    example: "Feature A: 10K users/quarter × 2 (high impact) × 0.8 (80% confidence) ÷ 4 weeks = 4,000. Feature B: 2K users × 3 × 0.9 ÷ 1 = 5,400. Ship Feature B first.",
    watch: "RICE is only as good as your estimates. Challenge your confidence scores — most PMs are over-confident.",
  },
  {
    name: "Jobs To Be Done (JTBD)",
    category: "User Research",
    formula: "When [situation], I want to [motivation], so I can [outcome]",
    when: "When defining what problem you're actually solving — before jumping to solutions",
    example: "Job: 'When I'm preparing for a PM interview, I want to practice questions that feel realistic, so I can build confidence without burning out.'",
    watch: "Avoid feature-level jobs ('I want a dark mode'). Push to the functional job — what are they trying to accomplish?",
  },
  {
    name: "North Star Metric",
    category: "Strategy",
    formula: "One metric that captures value delivered to users AND is a leading indicator of long-term business health",
    when: "When aligning the entire team on what success looks like",
    example: "Duolingo: Daily Active Learners. Airbnb: Nights Booked. PM Streak: Daily Active Streaks (users who complete a lesson).",
    watch: "Revenue is rarely a good north star — it's a lagging indicator. Find the metric that drives revenue.",
  },
  {
    name: "CIRCLES (Product Design)",
    category: "Product Sense",
    formula: "Comprehend → Identify users → Report needs → Cut through prioritisation → List solutions → Evaluate → Summarise",
    when: "Structuring product sense answers in interviews",
    example: "Comprehend: 'Design a product for gig workers' — clarify scope (India? delivery workers?). Identify: drivers, not restaurant owners. Report needs: irregular income, no benefits...",
    watch: "Don't use CIRCLES robotically in interviews. Use it as a mental checklist, not a script.",
  },
  {
    name: "Impact/Effort Matrix",
    category: "Prioritisation",
    formula: "2×2 grid: High Impact / Low Effort (do first), High Impact / High Effort (plan), Low Impact / Low Effort (fill gaps), Low Impact / High Effort (cut)",
    when: "Quick team prioritisation sessions with limited data",
    example: "Quick win: add social share button (low effort, high impact). Big bet: rebuild recommendation engine. Filler: update footer links. Cut: build custom analytics dashboard.",
    watch: "Effort estimates from engineers often expand. Add 30% buffer when placing items on the matrix.",
  },
  {
    name: "OKRs (Objectives & Key Results)",
    category: "Goal Setting",
    formula: "Objective (ambitious, qualitative) + 3–5 Key Results (measurable, time-bound)",
    when: "Setting quarterly goals for a product team",
    example: "O: Make PM Streak the #1 PM learning app in India. KR1: 10K MAU by Q3. KR2: 40% 30-day retention. KR3: NPS > 45.",
    watch: "OKRs fail when Key Results are tasks ('launch feature X') rather than outcomes ('increase retention by 20%').",
  },
  {
    name: "Kano Model",
    category: "Feature Strategy",
    formula: "Basic needs (must-have, dissatisfies if absent) + Performance (linear delight) + Delighters (wow, not expected)",
    when: "Deciding which features to invest in vs which are table stakes",
    example: "Basic: app doesn't crash. Performance: faster load time = more satisfied users. Delighter: daily streak celebration animation — users share it without being asked.",
    watch: "Delighters become basic needs over time. Yesterday's confetti animation is today's minimum expectation.",
  },
  {
    name: "5 Whys",
    category: "Root Cause Analysis",
    formula: "Ask 'why?' five times to move from symptom to root cause",
    when: "Debugging a metric drop or product failure",
    example: "Retention dropped → Why? Users aren't completing onboarding → Why? Step 3 has a confusing form → Why? It asks for information users don't have → Why? We designed for power users, not new users → Root cause: wrong user assumption.",
    watch: "Stop when you hit something actionable. You don't always need exactly 5 whys.",
  },
  {
    name: "Opportunity Solution Tree",
    category: "Discovery",
    formula: "Outcome goal → Opportunities (user needs) → Solutions → Experiments",
    when: "Structuring continuous discovery — connecting user research to product bets",
    example: "Goal: increase day-7 retention → Opportunity: users don't know what to learn next → Solution A: personalised path, B: daily challenge notification → Experiment: test both on 10% of new users.",
    watch: "Most teams skip the Opportunity layer and jump from goals to solutions. That's how you build features nobody uses.",
  },
  {
    name: "PRD (Product Requirements Document)",
    category: "Execution",
    formula: "Problem statement → User stories → Success metrics → Out of scope → Open questions → Design mocks",
    when: "Aligning engineering and design before starting a sprint",
    example: "Problem: 60% of users don't understand how XP works. User story: As a new user, I want to see my XP progress so I feel motivated to keep going. Metric: 15% increase in day-3 retention.",
    watch: "A PRD is a communication tool, not a contract. Keep it updated as you learn — a stale PRD is worse than no PRD.",
  },
];

const FAQS = [
  {
    q: "Which PM frameworks are most important to know for interviews?",
    a: "RICE (prioritisation), JTBD (user research), north star metric (strategy), and CIRCLES (product design) are the most commonly tested in PM interviews. Interviewers don't want to hear frameworks recited — they want to see you apply them to the specific question.",
  },
  {
    q: "Should I use frameworks in every PM interview answer?",
    a: "Use frameworks as invisible scaffolding — they structure your thinking without making your answer feel templated. Say 'I'd think about this in terms of user impact and effort' rather than 'I'll use the RICE framework.' The structure is what matters, not the name.",
  },
];

export default function ProductManagementFrameworksPage() {
  const dates = pageDates("/product-management-frameworks");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Product Management Frameworks", url: `${SITE_URL}/product-management-frameworks` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "10 Essential Product Management Frameworks (2026)",
        description:
          "The 10 PM frameworks every product manager must know. RICE, JTBD, north star metric, CIRCLES, prioritisation matrices, and more — explained clearly with examples.",
        image: `${SITE_URL}/api/og?title=10+Essential+PM+Frameworks+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/product-management-frameworks`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🧩</span> Use these as thinking tools, not scripts
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            10 Essential Product Management<br />Frameworks (2026)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Ten frameworks cover most day-to-day PM work: RICE and the impact/effort matrix for prioritisation,
            Jobs To Be Done for user research, north star metrics and OKRs for strategy and goals, CIRCLES for
            product sense interviews, plus the Kano model, 5 Whys, opportunity solution trees, and PRDs. Each is
            explained below with its formula, when to use it, a worked example, and the mistake to avoid.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The PM frameworks that actually matter — explained clearly, with when to use them,
            real examples, and the common mistakes to avoid.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Apply These Frameworks Daily — Free →
          </Link>
        </section>

        {/* Frameworks */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="space-y-6">
            {FRAMEWORKS.map((fw, i) => (
              <div key={fw.name} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-white/20">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h2 className="text-lg font-bold text-white">{fw.name}</h2>
                      <span className="text-xs bg-[#58cc02]/20 text-[#89e219] px-2 py-0.5 rounded-full">{fw.category}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="bg-[#0e1113] rounded-lg p-3">
                    <p className="text-xs text-white/40 mb-1 uppercase tracking-wider">Formula / Structure</p>
                    <p className="text-white/80 font-mono text-xs">{fw.formula}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-white/40 mb-1 uppercase tracking-wider">When to use</p>
                      <p className="text-white/60">{fw.when}</p>
                    </div>
                    <div>
                      <p className="text-xs text-yellow-400/80 mb-1 uppercase tracking-wider">⚠️ Watch out for</p>
                      <p className="text-white/60">{fw.watch}</p>
                    </div>
                  </div>
                  <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-lg p-3">
                    <p className="text-xs text-[#89e219] mb-1">💡 Example</p>
                    <p className="text-white/60 text-xs">{fw.example}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
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

        <RelatedPages slug="product-management-frameworks" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Put the Frameworks to Work</h2>
          <p className="text-white/60 mb-6">Daily PM lessons that show you how frameworks apply to real problems — not just theory.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
