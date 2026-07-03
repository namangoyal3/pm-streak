import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "Notion, Linear & Productivity PM Interview Guide (2026) — Dev Tools PM Prep",
  description:
    "Crack PM interviews at Notion, Linear, Atlassian, and other productivity tools. What makes productivity PM unique — extensibility, power users, and the craft-over-growth tension.",
  keywords: [
    "Notion PM interview", "Linear PM interview",
    "Atlassian PM interview", "productivity PM interview",
    "dev tools PM interview 2026",
  ],
  alternates: { canonical: "/pm-trello-notion-interview" },
  openGraph: {
    title: "Notion, Linear, Atlassian PM Interview Guide 2026 — PM Streak",
    description: "PM interview prep for productivity tool companies — Notion, Linear, Atlassian, and more.",
    url: `${SITE_URL}/pm-trello-notion-interview`,
    images: [{ url: `${SITE_URL}/api/og?title=Notion+Linear+Atlassian+PM+Interview+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Notion, Linear, Atlassian PM Interview Guide 2026 — PM Streak",
    description: "PM interview prep for productivity tool companies — Notion, Linear, Atlassian, and more.",
    images: [`${SITE_URL}/api/og?title=Notion+Linear+Atlassian+PM+Interview+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const CONTEXT = [
  { label: "Companies to know", value: "Notion, Linear, Atlassian (Jira, Confluence, Trello), Asana, ClickUp, Airtable, Coda, Height" },
  { label: "PM culture", value: "Craft-obsessed, power-user empathetic, opinionated product bets. &apos;Build less, build better&apos; is the common ethos." },
  { label: "Users to know", value: "Power users who customise extensively, team leads deploying across companies, developers building integrations, casual users who need simple UX" },
  { label: "Key metrics", value: "Team adoption rate, weekly active teams, expansion revenue, API/integration adoption, template library usage, referral rate" },
  { label: "Unique tension", value: "Flexibility vs simplicity. Most productivity tools die from complexity or limitation. PMs must navigate this tension constantly." },
];

const INTERVIEW_QUESTIONS = [
  "How would you improve Notion onboarding for non-technical first-time users?",
  "Design a feature that helps Linear teams coordinate across projects without adding complexity.",
  "Atlassian&apos;s Jira is criticised for being too complex. How would you approach simplifying it without losing power users?",
  "How would you increase team-level adoption for a tool that starts with individual users?",
  "Design an integration platform (API + marketplace) for a productivity tool.",
  "How would you measure whether a new customisation feature is worth shipping vs simplifying existing ones?",
];

const PM_NUANCES = [
  { nuance: "Flexibility-simplicity trade-off", detail: "More features = more power, more complexity, more intimidation. Every new feature should be measured against what it costs in simplicity tax." },
  { nuance: "Power user paradox", detail: "Power users evangelise but also often push for features that hurt casual adoption. PMs must serve both — often separately." },
  { nuance: "Extensibility vs opinionated defaults", detail: "The best productivity tools have strong defaults (Linear) OR strong extensibility (Notion). Trying to do both poorly leaves you between chairs." },
  { nuance: "Viral spread via shared artefacts", detail: "These products spread when users share a doc/project/board. PM decisions should amplify sharing, not just consumption." },
  { nuance: "Content matters more than PM time usually accounts for", detail: "Templates, guides, and showcase content drive adoption. Often 30% of PM time should go to content-product decisions, not just features." },
];

const FAQS = [
  {
    q: "What makes productivity tool PM unique?",
    a: "The craft bar and the flexibility-simplicity tension. Unlike pure consumer apps (scale over craft) or enterprise SaaS (feature checklist completeness), productivity tools live or die on design quality and usability. PMs must resist both &apos;add more features&apos; and &apos;just make it simpler&apos; reflexes and make non-obvious trade-offs. It&apos;s one of the most design-forward PM disciplines in tech.",
  },
  {
    q: "Do productivity tool companies hire PMs in India?",
    a: "Notion, Linear, and Atlassian all have growing India presence. Atlassian has a large Bangalore office. Notion and Linear are US-HQ but have started hiring India remote. Smaller productivity startups (Zomato-for-ops, internal Indian productivity SaaS) hire more aggressively. Compensation is generally strong — these companies pay for craft-level PM quality.",
  },
  {
    q: "Should I specialise in productivity PM?",
    a: "Consider it if you genuinely love tools, have opinions about PM software, and value craft over scale. Productivity PM has smaller user bases (thousands to low-millions of teams) but deeper relationships with users. Career upside is strong as productivity tools continue consolidating, and the skills (craft, power-user empathy, API thinking) transfer well to other specialist PM roles.",
  },
];

export default function PmTrelloNotionInterviewPage() {
  const dates = pageDates("/pm-trello-notion-interview");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Productivity PM Interview", url: `${SITE_URL}/pm-trello-notion-interview` },
      ])} />
      <JsonLd data={articleSchema({
        headline: "Productivity Tool PM Interview Guide (Notion, Linear & More)",
        description: "Crack PM interviews at Notion, Linear, Atlassian, and other productivity tools. What makes productivity PM unique — extensibility, power users, and the craft-over-growth tension.",
        image: `${SITE_URL}/api/og?title=Notion+Linear+Atlassian+PM+Interview+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-trello-notion-interview`,
      })} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🛠️</span> Craft-obsessed PM work · Flexibility vs simplicity · Power-user empathy
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Productivity Tool PM<br />Interview Guide (Notion, Linear &amp; More)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            What does a productivity-tool PM interview actually test? Across companies like Notion,
            Linear, and Atlassian, six recurring questions probe how you would navigate the central
            tension of the category — flexibility versus simplicity — while serving both power users
            who customise heavily and casual users who just need things to work.
          </p>
          <p className="text-sm text-white/50 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The unique PM culture of productivity tools, 6 interview questions,
            and the 5 product nuances that separate strong candidates from weak ones.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Start Productivity PM Prep — Free →
          </Link>
        </section>

        <section className="max-w-4xl mx-auto px-4 pb-10">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-5">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Know Before You Interview</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {CONTEXT.map((item, i) => (
                <div key={i} className="flex gap-2 text-sm">
                  <span className="text-[#89e219] font-medium flex-shrink-0">{item.label}:</span>
                  <span className="text-white/60">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">Productivity PM Interview Questions</h2>
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
            <ul className="space-y-3">
              {INTERVIEW_QUESTIONS.map((q, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="text-[#89e219] flex-shrink-0 font-bold">{i + 1}.</span>
                  <span className="text-white/70">{q}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Product Nuances to Know</h2>
            <div className="space-y-3">
              {PM_NUANCES.map((n, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-white text-sm mb-1">{i + 1}. {n.nuance}</p>
                  <p className="text-xs text-white/60">{n.detail}</p>
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

        <RelatedPages slug="pm-trello-notion-interview" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Train for Craft-Level PM Standards</h2>
          <p className="text-white/60 mb-6">Daily PM scenarios that sharpen product taste and trade-off thinking.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
