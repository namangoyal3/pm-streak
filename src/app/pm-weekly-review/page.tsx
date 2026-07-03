import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Weekly Review Guide (2026) — The 20-Minute Ritual That Compounds Into Mastery",
  description:
    "The 20-minute weekly review every PM should do. Reflect on shipped work, metrics, relationships, and learning. A habit that compounds into career mastery.",
  keywords: [
    "PM weekly review", "product manager weekly retrospective",
    "PM reflection habit", "weekly review template PM",
    "PM journaling 2026",
  ],
  alternates: { canonical: "/pm-weekly-review" },
  openGraph: {
    title: "PM Weekly Review Guide 2026 — PM Streak",
    description: "The 20-minute weekly review habit that compounds into PM mastery.",
    url: `${SITE_URL}/pm-weekly-review`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Weekly+Review+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Weekly Review Guide 2026 — PM Streak",
    description: "The 20-minute weekly review habit that compounds into PM mastery.",
    images: [`${SITE_URL}/api/og?title=PM+Weekly+Review+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PROMPTS = [
  {
    section: "What shipped",
    prompts: ["What did we ship this week? Did it move the intended metric?", "What was the decision that mattered most?"],
  },
  {
    section: "What slipped",
    prompts: ["What didn&apos;t ship? Why?", "Was it scope, capacity, clarity, or something else?"],
  },
  {
    section: "Metrics",
    prompts: ["What moved in the right direction? What moved in the wrong direction?", "Any metric that surprised me — up or down?"],
  },
  {
    section: "Relationships",
    prompts: ["Who did I learn from this week?", "Who did I let down? What do I do about it?", "Who gave me unexpected help I should thank?"],
  },
  {
    section: "Learning",
    prompts: ["What did I believe on Monday that I don&apos;t believe now?", "What&apos;s the biggest open question in my area?"],
  },
  {
    section: "Next week",
    prompts: ["What&apos;s the ONE outcome that would make next week a win?", "What am I going to say no to, to make room for that?"],
  },
];

const WHY_IT_WORKS = [
  "Spaced reflection compounds — 20 min/week = 17 hours/year of structured career thinking",
  "You catch decay before it becomes crisis — weak relationships, stalled priorities, drifting metrics",
  "It forces honest assessment before your manager does it for you",
  "Patterns emerge only over weeks — you can&apos;t see them in any single day",
  "The act of writing clarifies thinking — the review is doing the work, not just the artefact",
];

const FAQS = [
  {
    q: "Is 20 minutes really enough for a weekly review?",
    a: "Yes, if you&apos;re consistent. 20 minutes × 52 weeks = over 17 hours of structured career reflection per year — more than most PMs do in a lifetime. The magic is in the weekly cadence, not the length. 2-hour quarterly reviews are less effective than short weekly ones because patterns that emerge within a week fade by quarter-end.",
  },
  {
    q: "When is the best time to do the weekly review?",
    a: "Friday afternoon (3–5 PM) is optimal for most PMs — fresh memory of the week, before weekend context-switch. Sunday evening works too but carries weekend baggage. Don&apos;t do it Monday — you&apos;ll forget half the week. The &apos;best time&apos; is whichever you&apos;ll actually do consistently.",
  },
  {
    q: "Should I share my weekly review with my manager?",
    a: "Share a summary, not the full reflection. Top 3 shipped, top 1 risk, priority for next week — that&apos;s a great weekly async update. Keep private reflection (failures, relationship issues, self-doubts) private. Mixing them dilutes both purposes.",
  },
];

export default function PmWeeklyReviewPage() {
  const dates = pageDates("/pm-weekly-review");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Weekly Review", url: `${SITE_URL}/pm-weekly-review` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Weekly Review Guide (2026 Edition)",
        description:
          "The 20-minute weekly review every PM should do. Reflect on shipped work, metrics, relationships, and learning. A habit that compounds into career mastery.",
        image: `${SITE_URL}/api/og?title=PM+Weekly+Review+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-weekly-review`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔁</span> 20 minutes a week that compounds over a PM career
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Weekly Review Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            A PM weekly review is a 20-minute ritual built around six sections — what shipped, what slipped,
            metrics, relationships, learning, and next week — each anchored by specific prompts that force
            honest reflection. Repeated every week, it catches decaying priorities and stalled relationships
            before they become a crisis, compounding into more than 17 hours of structured career thinking a year.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The 6-section template, 12 prompts to drive honest reflection,
            and why spaced reflection compounds into career mastery faster than effort alone.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Daily PM Reflection — Free →
          </Link>
        </section>

        {/* Prompts */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6-Section Template with Prompts</h2>
          <div className="space-y-4">
            {PROMPTS.map((p, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <p className="font-bold text-white mb-3">{i + 1}. {p.section}</p>
                <ul className="space-y-2">
                  {p.prompts.map((prompt, j) => (
                    <li key={j} className="flex gap-2 text-sm">
                      <span className="text-[#89e219] flex-shrink-0">→</span>
                      <span className="text-white/70 italic">&ldquo;{prompt}&rdquo;</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Why it works */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">Why Weekly Review Compounds</h2>
            <div className="space-y-3">
              {WHY_IT_WORKS.map((w, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{w}</p>
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

        <RelatedPages slug="pm-weekly-review" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Pair Weekly Review With Daily Practice</h2>
          <p className="text-white/60 mb-6">2 minutes a day of PM scenarios + 20 minutes a week of reflection = a career that compounds.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
