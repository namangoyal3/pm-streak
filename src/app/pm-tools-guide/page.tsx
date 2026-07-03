import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "Product Manager Tools Guide (2026) — Jira, Figma, Amplitude & More",
  description:
    "The essential PM tools stack in 2026. Jira, Figma, Amplitude, Notion, Miro, SQL — what each tool does, when to use it, and the PM skill level you need for each.",
  keywords: [
    "product manager tools", "PM tools 2026", "tools for product managers",
    "Jira for product managers", "Figma for product managers",
    "Amplitude product manager", "best PM tools India 2026",
  ],
  alternates: { canonical: "/pm-tools-guide" },
  openGraph: {
    title: "Product Manager Tools Guide 2026 — PM Streak",
    description: "The essential PM tools stack — Jira, Figma, Amplitude, Notion, SQL and more.",
    url: `${SITE_URL}/pm-tools-guide`,
    images: [{ url: `${SITE_URL}/api/og?title=Product+Manager+Tools+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Manager Tools Guide 2026 — PM Streak",
    description: "The essential PM tools stack — Jira, Figma, Amplitude, Notion, SQL and more.",
    images: [`${SITE_URL}/api/og?title=Product+Manager+Tools+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const TOOL_CATEGORIES = [
  {
    category: "Roadmap & Project Management",
    icon: "📋",
    tools: [
      {
        name: "Jira",
        use: "Sprint planning, backlog management, bug tracking, release tracking",
        pmLevel: "Proficient — you'll live in this daily",
        tip: "PMs often misuse Jira by over-engineering workflows. Keep epics, stories, and tasks simple. The ticket should communicate the 'why' to engineers — not just the 'what'.",
        companies: "Flipkart, Razorpay, most Indian startups",
      },
      {
        name: "Linear",
        use: "Faster, more developer-friendly alternative to Jira. Common at modern startups.",
        pmLevel: "Learn it — rapidly replacing Jira at high-velocity startups",
        tip: "Linear's cycle feature is excellent for sprint planning. Its keyboard-first design makes ticket creation fast enough that PMs actually update tickets in real-time.",
        companies: "CRED, Zepto, newer tech startups",
      },
      {
        name: "Notion",
        use: "PRDs, strategy docs, meeting notes, knowledge base, sprint retrospectives",
        pmLevel: "Essential — the de-facto PM documentation tool",
        tip: "Build a consistent PRD template in Notion and enforce it. The value of Notion comes from structure — a wiki where nothing is findable is worse than no wiki.",
        companies: "Used everywhere as docs layer alongside Jira",
      },
    ],
  },
  {
    category: "Design & Prototyping",
    icon: "🎨",
    tools: [
      {
        name: "Figma",
        use: "Wireframes, mockups, prototypes, design system, design review",
        pmLevel: "Conversant — able to create rough wireframes and annotate designs",
        tip: "PMs don't need to design production UI in Figma. But PMs who can sketch a low-fidelity flow in Figma before a design meeting save hours of back-and-forth. Learn the basics.",
        companies: "Universal — standard design tool across the industry",
      },
      {
        name: "Miro / FigJam",
        use: "User journey mapping, opportunity solution trees, retros, brainstorming, sprint planning boards",
        pmLevel: "Useful — especially for collaborative workshops",
        tip: "Miro is where PMs do their best thinking visually. Use it for: customer journey maps, affinity mapping from user interviews, and systems thinking diagrams.",
        companies: "Common at mid-size to enterprise teams",
      },
    ],
  },
  {
    category: "Analytics & Data",
    icon: "📊",
    tools: [
      {
        name: "Amplitude",
        use: "Funnel analysis, retention cohorts, A/B test analysis, user journeys, dashboards",
        pmLevel: "Proficient — core PM analytics tool",
        tip: "Learn to build funnels, cohort charts, and path analyses in Amplitude without analyst help. PMs who self-serve data make faster decisions. Amplitude's free tier is enough to practice with.",
        companies: "Swiggy, Urban Company, many consumer startups",
      },
      {
        name: "Mixpanel",
        use: "Similar to Amplitude — event-based analytics, funnels, retention",
        pmLevel: "Proficient if your company uses it",
        tip: "Mixpanel's JQL (JavaScript Query Language) lets you do complex queries that go beyond the UI. Worth learning if your team is power users.",
        companies: "Razorpay, many B2B SaaS companies",
      },
      {
        name: "SQL",
        use: "Direct database queries for ad-hoc analysis, custom dashboards, anything Amplitude can't answer",
        pmLevel: "Basic to intermediate — non-negotiable at data-driven companies",
        tip: "Start with: SELECT, FROM, WHERE, GROUP BY, ORDER BY, LIMIT, and simple JOINs. The goal is to answer 'how many users did X and then Y?' without waiting for a data analyst.",
        companies: "Expected at Google, Flipkart, Razorpay, and most growth-stage companies",
      },
    ],
  },
  {
    category: "User Research",
    icon: "🔍",
    tools: [
      {
        name: "Dovetail / Aurelius",
        use: "Research note-taking, insight synthesis, tagging interview transcripts",
        pmLevel: "Nice to have — useful if you do high-volume research",
        tip: "For most PMs, a well-structured Notion database works as well as Dovetail. The key is consistent tagging — 'user quote,' 'pain point,' 'job to be done' — across every interview.",
        companies: "Design-forward teams, research-heavy organisations",
      },
      {
        name: "Typeform / Google Forms",
        use: "Surveys, NPS collection, feature validation",
        pmLevel: "Basic — easy to use, powerful when questions are designed well",
        tip: "Survey question quality matters more than the tool. Avoid leading questions. Keep surveys under 5 minutes. For NPS: always ask the follow-up 'why did you give that score?'",
        companies: "Universal",
      },
    ],
  },
  {
    category: "Communication & Alignment",
    icon: "💬",
    tools: [
      {
        name: "Slack",
        use: "Team communication, async decisions, stakeholder updates, incident response",
        pmLevel: "Essential — PMs often lead the most critical Slack channels",
        tip: "PMs should create and maintain a #product-updates channel with weekly shipped-items and north star metric updates. Visibility into what the product team is doing builds trust across the org.",
        companies: "Universal at tech companies",
      },
      {
        name: "Loom",
        use: "Async product demos, PRD walkthroughs, design feedback for remote teams",
        pmLevel: "Useful — saves hours of synchronous meetings",
        tip: "Record a 3-minute Loom instead of scheduling a meeting for anything that doesn't require real-time discussion. Product demos to stakeholders as Looms get 2x more engagement than slide decks.",
        companies: "Common at remote-first and distributed teams",
      },
    ],
  },
];

const FAQS = [
  {
    q: "Which PM tools should I learn first?",
    a: "In priority order: (1) Jira or Linear for execution, (2) Notion for documentation, (3) Figma basics for design collaboration, (4) Amplitude or your company's analytics tool, (5) SQL for data queries. Start with whichever your target companies use — check job descriptions for signals.",
  },
  {
    q: "Do PM interviews test tool knowledge?",
    a: "Rarely directly — interviewers care more about how you think than which tool you use. But listing tools you've used (and can speak credibly about) on your resume signals hands-on experience. Saying 'I use Amplitude to monitor our D7 retention cohorts weekly' is more credible than 'I'm comfortable with analytics tools.'",
  },
  {
    q: "What's the best way to learn Amplitude or Mixpanel as a PM?",
    a: "Use it on a real product — even your own side project. Amplitude has a free tier that lets you instrument a product and practice building funnels, cohorts, and retention charts. The best learning comes from having a real question ('why did our D7 retention drop last month?') and using the tool to answer it.",
  },
];

export default function PmToolsGuidePage() {
  const dates = pageDates("/pm-tools-guide");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Tools Guide", url: `${SITE_URL}/pm-tools-guide` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Product Manager Tools Guide (2026 Edition)",
        description: "The essential PM tools stack in 2026. Jira, Figma, Amplitude, Notion, Miro, SQL — what each tool does, when to use it, and the PM skill level you need for each.",
        image: `${SITE_URL}/api/og?title=Product+Manager+Tools+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-tools-guide`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🛠️</span> The PM tools stack — what each one does and how well you need to know it
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Product Manager Tools Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            The PM toolkit spans execution (Jira or Linear), documentation (Notion), design collaboration
            (Figma, Miro), analytics (Amplitude, Mixpanel, SQL), research (Dovetail, Typeform), and
            communication (Slack, Loom) — and the recommended learning order is execution first, then
            documentation, then design basics, then analytics, then SQL. Interviewers rarely test tool
            names directly, but describing real use, like monitoring D7 retention cohorts in Amplitude,
            signals credible hands-on experience.
          </p>
          <p className="text-sm text-white/40 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline underline-offset-2">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Jira, Figma, Amplitude, Notion, SQL, and 10 more — what each PM tool is for,
            how well you need to know it, and the tips that make you more effective with each.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Your PM Toolkit — Free →
          </Link>
        </section>

        {/* Tool categories */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="space-y-10">
            {TOOL_CATEGORIES.map((cat) => (
              <div key={cat.category}>
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-2xl">{cat.icon}</span>
                  <h2 className="text-xl font-bold text-white">{cat.category}</h2>
                </div>
                <div className="space-y-4">
                  {cat.tools.map((tool) => (
                    <div key={tool.name} className="bg-[#111] border border-white/10 rounded-xl p-5">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-white text-lg">{tool.name}</h3>
                        <span className="text-xs bg-[#58cc02]/20 text-[#89e219] px-2 py-0.5 rounded-full">{tool.pmLevel}</span>
                      </div>
                      <p className="text-sm text-white/60 mb-3">{tool.use}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-lg p-3">
                          <p className="text-xs text-[#89e219] mb-1">💡 PM tip</p>
                          <p className="text-xs text-white/60">{tool.tip}</p>
                        </div>
                        <div className="bg-[#0e1113] rounded-lg p-3">
                          <p className="text-xs text-white/40 mb-1">Used at</p>
                          <p className="text-xs text-white/60">{tool.companies}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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

        <RelatedPages slug="pm-tools-guide" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Learn PM Tools Through Daily Practice</h2>
          <p className="text-white/60 mb-6">Scenarios that build the analytical and execution instincts behind the tools.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
