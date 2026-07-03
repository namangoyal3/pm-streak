import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Portfolio Guide (2026) — How to Build a Product Portfolio That Gets Interviews",
  description:
    "Build a PM portfolio that gets interviews — even if you don't have a PM title. Case studies, teardowns, side projects, PRDs, and real examples that hiring managers love.",
  keywords: [
    "PM portfolio", "product manager portfolio",
    "how to build PM portfolio", "PM portfolio examples",
    "PM portfolio for freshers", "product manager portfolio website 2026",
  ],
  alternates: { canonical: "/pm-portfolio-guide" },
  openGraph: {
    title: "PM Portfolio Guide 2026 — PM Streak",
    description: "How to build a PM portfolio that gets interviews — with examples and templates.",
    url: `${SITE_URL}/pm-portfolio-guide`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Portfolio+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Portfolio Guide 2026 — PM Streak",
    description: "How to build a PM portfolio that gets interviews — with examples and templates.",
    images: [`${SITE_URL}/api/og?title=PM+Portfolio+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const ARTEFACTS = [
  {
    name: "Product Teardown",
    effort: "4–6 hours",
    impact: "High — fastest way to signal PM thinking",
    includes: ["Product overview and target user", "North star metric (your hypothesis)", "3 UX/product wins to learn from", "3 weaknesses with your fix", "What you'd A/B test first"],
    template: "Pick an app you use weekly. Structure: Problem → Solution → Metrics → Opportunities. 3–5 pages with annotated screenshots.",
  },
  {
    name: "Case Study (Hypothetical Product)",
    effort: "8–12 hours",
    impact: "Very high — lets you show end-to-end thinking",
    includes: ["User research summary (even mock)", "Problem statement with evidence", "Prioritised opportunities (RICE/impact-effort)", "Chosen solution with mockups", "Success metrics and experiment design"],
    template: "Pick a specific problem: 'Design a product for late-career professionals to learn new skills.' Go through the full PM process in writing.",
  },
  {
    name: "Mock PRD",
    effort: "3–5 hours",
    impact: "High — demonstrates execution thinking",
    includes: ["Problem statement with data", "User stories and acceptance criteria", "Success metrics (primary + guardrails)", "Rollout plan", "Open questions / risks"],
    template: "Write a PRD for a feature that doesn't exist in a real product (e.g. 'Add a reading streak to Medium'). Follow the standard 9-section PRD template.",
  },
  {
    name: "Metric Drop Investigation",
    effort: "4–6 hours",
    impact: "High — shows analytical PM thinking",
    includes: ["Hypothetical or real metric drop scenario", "Your investigation tree (possible causes)", "Data/research you'd gather", "Most likely root cause with reasoning", "Fix proposal and impact estimate"],
    template: "Pick a real product and imagine a metric drop: 'Zomato's D7 retention drops 15% after a feature launch. Investigate.' Write it up.",
  },
  {
    name: "User Research Brief",
    effort: "10–15 hours (includes interviews)",
    impact: "Highest — real user research is rare in portfolios",
    includes: ["Research goals and methodology", "Participant profile (5–8 interviews)", "Key insights with user quotes", "Product implications", "Open questions for follow-up research"],
    template: "Pick a problem you care about. Interview 5 real users. Document what you learned and what you'd build. This is the highest-signal portfolio piece.",
  },
  {
    name: "Side Project (with PM Artefacts)",
    effort: "20+ hours over weeks",
    impact: "Highest — shipping signals execution",
    includes: ["The actual working product (even basic)", "The PRD you wrote for it", "Metrics you tracked", "User research you ran", "What you'd do differently (retro)"],
    template: "Build something simple — a Notion template, a Chrome extension, an AI tool. Don't hide behind 'I'm not technical.' Low-code is fine.",
  },
];

const HOSTING_OPTIONS = [
  { option: "Personal website", pros: "Most professional, full control", cons: "Setup time, ongoing maintenance", bestFor: "Senior PMs, candidates targeting competitive roles" },
  { option: "Notion", pros: "Fast to build, beautiful templates, easy to update", cons: "Less bespoke, URL looks less 'finished'", bestFor: "Most PM candidates — best ROI" },
  { option: "Medium / Substack articles", pros: "Built-in audience, SEO value", cons: "Less structured than a portfolio site", bestFor: "Candidates who also want thought leadership" },
  { option: "LinkedIn articles", pros: "Easy, visible to recruiters", cons: "Not ideal for detailed case studies", bestFor: "Quick teardowns and insights, not full case studies" },
];

const FAQS = [
  {
    q: "Do I need a PM portfolio if I already have PM experience?",
    a: "Not strictly required, but it meaningfully improves interview conversion. Experienced PMs often can't share NDA-protected work. A well-crafted portfolio — even with hypothetical case studies — lets you demonstrate current PM thinking without violating confidentiality. At senior levels, 1–2 strong external artefacts often substitute for discussing specific work you can't share.",
  },
  {
    q: "How long should a PM portfolio be?",
    a: "Quality > quantity. 3–4 strong artefacts (one case study, one teardown, one PRD, one research brief) beats 10 mediocre ones. Hiring managers look at portfolios for ~5 minutes on first pass — make sure the first artefact is your strongest. A 5-page portfolio that gets fully read is more valuable than a 30-page one that gets skimmed.",
  },
  {
    q: "Can I include confidential work from my current company?",
    a: "Only if you generalise aggressively — anonymise company name, change metrics to directional trends ('improved retention by 20%' not '22% → 44%'), and remove screenshots of internal tools. Many PMs publish case studies with NDA-safe versions. If in doubt, ask your manager or check your employment agreement. When unsure, use hypothetical case studies instead — they're equally effective signal.",
  },
];

export default function PmPortfolioGuidePage() {
  const dates = pageDates("/pm-portfolio-guide");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Portfolio Guide", url: `${SITE_URL}/pm-portfolio-guide` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Portfolio Guide (2026 Edition)",
        description:
          "Build a PM portfolio that gets interviews — even if you don't have a PM title. Case studies, teardowns, side projects, PRDs, and real examples that hiring managers love.",
        image: `${SITE_URL}/api/og?title=PM+Portfolio+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-portfolio-guide`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📁</span> You don&apos;t need a PM title to have PM artefacts
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Portfolio Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            A PM portfolio built from this guide has six possible artefacts — a product teardown,
            a hypothetical case study, a mock PRD, a metric drop investigation, a user research
            brief, and a side project with PM artefacts attached — ranked here by effort (3 to
            20+ hours) and impact, plus four hosting options from a personal website to Notion,
            so quality beats quantity: 3–4 strong pieces outperform ten mediocre ones.
          </p>
          <p className="text-sm text-white/50 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The 6 artefact types that get hiring manager attention, templates for each,
            where to host your portfolio, and real examples from hired PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Muscle Daily — Free →
          </Link>
        </section>

        {/* Artefacts */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="space-y-5">
            {ARTEFACTS.map((a, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <h2 className="text-lg font-bold text-white">{i + 1}. {a.name}</h2>
                  <div className="flex gap-2 text-xs">
                    <span className="bg-[#1f2228] border border-white/10 rounded-full px-2 py-1 text-white/60">{a.effort}</span>
                    <span className="bg-green-500/10 border border-green-500/20 rounded-full px-2 py-1 text-green-400">{a.impact}</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-2">What to include</p>
                    <ul className="space-y-1">
                      {a.includes.map((item, j) => <li key={j} className="text-xs text-white/60">• {item}</li>)}
                    </ul>
                  </div>
                  <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-lg p-3">
                    <p className="text-xs text-[#89e219] mb-1">💡 Template</p>
                    <p className="text-xs text-white/70">{a.template}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hosting */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">Where to Host Your PM Portfolio</h2>
            <div className="space-y-3">
              {HOSTING_OPTIONS.map((h, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                  <p className="font-semibold text-white mb-2">{h.option}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                    <p className="text-xs text-green-400">✅ {h.pros}</p>
                    <p className="text-xs text-red-400">❌ {h.cons}</p>
                  </div>
                  <p className="text-xs text-[#89e219]">🎯 Best for: <span className="text-white/60">{h.bestFor}</span></p>
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

        <RelatedPages slug="pm-portfolio-guide" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build the Thinking That Goes Into Great Portfolios</h2>
          <p className="text-white/60 mb-6">Daily PM scenarios sharpen the skills your artefacts showcase.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
