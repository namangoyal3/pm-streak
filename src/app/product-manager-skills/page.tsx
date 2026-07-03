import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "Product Manager Skills (2026) — The 12 Skills Every PM Needs",
  description:
    "The 12 skills that define great product managers in 2026. Prioritisation, stakeholder management, data analysis, product sense, and technical fluency — with how to build each one.",
  keywords: [
    "product manager skills", "PM skills", "skills for product manager",
    "product management skills list", "how to improve PM skills",
    "technical skills for product manager", "soft skills product manager",
    "product manager skills 2026",
  ],
  alternates: { canonical: "/product-manager-skills" },
  openGraph: {
    title: "Product Manager Skills 2026 — PM Streak",
    description: "The 12 skills every PM needs in 2026, with how to build each one.",
    url: `${SITE_URL}/product-manager-skills`,
    images: [{ url: `${SITE_URL}/api/og?title=Product+Manager+Skills+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Manager Skills 2026 — PM Streak",
    description: "The 12 skills every PM needs in 2026, with how to build each one.",
    images: [`${SITE_URL}/api/og?title=Product+Manager+Skills+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const SKILLS = [
  {
    name: "Prioritisation",
    category: "Core PM",
    emoji: "🎯",
    what: "Deciding what to build next — and what not to build — using frameworks like RICE, impact/effort, and opportunity sizing.",
    how: "Practise writing a prioritised backlog with scoring rationale. Explain your stack-rank to a sceptic.",
    interview: "Walk me through how you'd prioritise the next quarter's roadmap with limited engineering capacity.",
    level: "Required at all levels",
  },
  {
    name: "Stakeholder Management",
    category: "Core PM",
    emoji: "🤝",
    what: "Aligning engineering, design, business, and leadership toward a shared direction — without authority.",
    how: "Map every stakeholder's incentives before a big decision. Practice saying no with a documented framework.",
    interview: "Tell me about a time you had to push back on a senior stakeholder's request.",
    level: "Grows in importance with seniority",
  },
  {
    name: "Data Analysis",
    category: "Technical",
    emoji: "📊",
    what: "Reading dashboards, querying data (basic SQL), running A/B tests, and spotting misleading metrics.",
    how: "Run real experiments. Write SQL queries for your product's core funnel. Know your p-values.",
    interview: "Your DAU dropped 15% last Tuesday. Walk me through how you'd investigate.",
    level: "Non-negotiable at most companies",
  },
  {
    name: "Product Sense",
    category: "Core PM",
    emoji: "🧠",
    what: "The ability to quickly identify the right problem, the right user, and the right solution — without full data.",
    how: "Do 1 product teardown per week. Ask 'why does this UX decision exist?' for every app you use.",
    interview: "How would you improve Google Maps for drivers vs passengers?",
    level: "Hard to teach, high signal in interviews",
  },
  {
    name: "Technical Fluency",
    category: "Technical",
    emoji: "⚙️",
    what: "Understanding APIs, system architecture, databases, and engineering trade-offs well enough to have credible conversations with engineers.",
    how: "Build a side project. Read a backend codebase. Learn what 'rate limiting', 'indexing', and 'eventual consistency' mean.",
    interview: "How would you explain a REST API to a non-technical stakeholder? What about to an engineer?",
    level: "More important at B2B/infra/fintech companies",
  },
  {
    name: "User Research",
    category: "Core PM",
    emoji: "🔍",
    what: "Conducting interviews, synthesising insights, and translating user needs into product decisions without confirmation bias.",
    how: "Talk to 5 users about their problem before proposing a solution. Document JTBD statements.",
    interview: "How do you decide when to run qualitative research vs rely on quantitative data?",
    level: "Required at consumer and B2B companies alike",
  },
  {
    name: "Communication & Writing",
    category: "Soft Skills",
    emoji: "✍️",
    what: "Writing PRDs, strategy docs, and executive updates that are clear, concise, and actionable.",
    how: "Write a one-pager for every major decision. Get edited ruthlessly. Delete every hedge word.",
    interview: "Walk me through a PRD or strategy doc you're proud of.",
    level: "Often the hidden differentiator between candidates",
  },
  {
    name: "Roadmap Building",
    category: "Core PM",
    emoji: "🗺️",
    what: "Translating strategy into a sequenced, outcome-driven roadmap that balances short-term delivery and long-term vision.",
    how: "Build a roadmap from scratch for a real or hypothetical product. Defend every item in it.",
    interview: "How do you communicate a roadmap change to stakeholders who depended on what you cut?",
    level: "Tested directly at senior levels",
  },
  {
    name: "Execution & Delivery",
    category: "Core PM",
    emoji: "🚀",
    what: "Running sprints, managing sprint reviews, writing clear tickets, and shipping reliably.",
    how: "Shadow engineering stand-ups. Learn Jira/Linear beyond the basics. Own post-mortems.",
    interview: "How do you keep a team on track when requirements change mid-sprint?",
    level: "Table stakes — everyone needs this",
  },
  {
    name: "Metrics Definition",
    category: "Technical",
    emoji: "📐",
    what: "Choosing the right north star, input metrics, and guardrail metrics — and knowing when a metric is being gamed.",
    how: "For every feature you work on, pre-define 3 metrics: one for success, one for harm, one leading indicator.",
    interview: "How would you measure the success of a new onboarding flow?",
    level: "Increasingly important as companies become data-driven",
  },
  {
    name: "Business Acumen",
    category: "Soft Skills",
    emoji: "💼",
    what: "Understanding unit economics, revenue models, competitive dynamics, and how product decisions translate to business outcomes.",
    how: "Read quarterly earnings calls for companies in your industry. Know your product's P&L.",
    interview: "How do you balance user experience trade-offs against monetisation pressure?",
    level: "Critical at growth-stage and public companies",
  },
  {
    name: "Leadership & Mentorship",
    category: "Soft Skills",
    emoji: "🌱",
    what: "Growing other PMs, influencing without authority, and building team culture.",
    how: "Mentor a more junior PM. Run a team retro. Write feedback that is specific and actionable.",
    interview: "How do you develop the PMs who report to you or work alongside you?",
    level: "Required at Staff PM and above",
  },
];

const FAQS = [
  {
    q: "What are the most important skills for a product manager in 2026?",
    a: "In 2026, the highest-signal PM skills are: data analysis (particularly A/B testing and SQL), product sense (ability to identify the right problem quickly), and stakeholder management (influencing without authority). Technical fluency has risen in importance as AI/ML features become mainstream — PMs who can have substantive conversations with ML engineers are increasingly valued.",
  },
  {
    q: "Which PM skills are hardest to learn on the job?",
    a: "Product sense and business acumen are the hardest to develop in isolation — they require broad exposure to different products and business contexts. You can build data analysis and technical fluency with deliberate practice, but product judgement typically comes from shipping many things and seeing what works. Daily practice with diverse product scenarios (like PM Streak) accelerates this dramatically.",
  },
  {
    q: "Do PMs need to know how to code?",
    a: "No — but technical fluency is non-negotiable. A PM doesn't need to write production code, but they must understand: how APIs work, what makes something technically complex, why certain things take longer, and how to evaluate build vs. buy trade-offs. PMs who can earn engineering respect by understanding constraints ship better products.",
  },
];

export default function ProductManagerSkillsPage() {
  const dates = pageDates("/product-manager-skills");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Product Manager Skills", url: `${SITE_URL}/product-manager-skills` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Product Manager Skills (2026 Edition)",
        description:
          "The 12 skills that define great product managers in 2026. Prioritisation, stakeholder management, data analysis, product sense, and technical fluency — with how to build each one.",
        image: `${SITE_URL}/api/og?title=Product+Manager+Skills+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/product-manager-skills`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🧩</span> Hard skills, soft skills, and the ones that actually get you hired
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Product Manager Skills<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Great product managers in 2026 draw on 12 skills spanning core PM craft (prioritisation, product
            sense, user research, roadmap building), technical ability (data analysis, technical fluency, metrics
            definition), and soft skills (communication, business acumen, leadership). The highest-signal three
            are data analysis, product sense, and stakeholder management — and while PMs don&apos;t need to code,
            technical fluency is non-negotiable.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The 12 skills that define great PMs — what each one means, how to build it,
            and the interview question that reveals whether you have it.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build These Skills Daily — Free →
          </Link>
        </section>

        {/* Skills Grid */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="space-y-5">
            {SKILLS.map((skill, i) => (
              <div key={skill.name} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-3xl flex-shrink-0">{skill.emoji}</div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-white/20 font-bold text-sm">{String(i + 1).padStart(2, "0")}</span>
                      <h2 className="text-lg font-bold text-white">{skill.name}</h2>
                      <span className="text-xs bg-[#58cc02]/20 text-[#89e219] px-2 py-0.5 rounded-full">{skill.category}</span>
                    </div>
                    <p className="text-xs text-green-400/70">{skill.level}</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-1">What it is</p>
                    <p className="text-white/70">{skill.what}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-[#0e1113] rounded-lg p-3">
                      <p className="text-xs text-white/40 uppercase tracking-wider mb-1">How to build it</p>
                      <p className="text-white/60 text-xs">{skill.how}</p>
                    </div>
                    <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-lg p-3">
                      <p className="text-xs text-[#89e219] mb-1">💬 Interview question</p>
                      <p className="text-white/60 text-xs italic">&ldquo;{skill.interview}&rdquo;</p>
                    </div>
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

        <RelatedPages slug="product-manager-skills" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Every Skill with Daily Practice</h2>
          <p className="text-white/60 mb-6">2-minute lessons across all 12 skill areas — structured like Duolingo for your PM career.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
