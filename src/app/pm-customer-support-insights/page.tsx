import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM + Customer Support (2026) — Why the Support Queue Is Your Best User Research",
  description:
    "Why great PMs spend time in the customer support queue. What to look for, how to quantify signal, and how to turn support data into product decisions.",
  keywords: [
    "PM customer support", "product manager support insights",
    "ticket deflection PM", "support-driven product",
    "customer support data PM 2026",
  ],
  alternates: { canonical: "/pm-customer-support-insights" },
  openGraph: {
    title: "PM + Customer Support Guide 2026 — PM Streak",
    description: "Why the support queue is your best user research — and how to use it.",
    url: `${SITE_URL}/pm-customer-support-insights`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+++Customer+Support+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM + Customer Support Guide 2026 — PM Streak",
    description: "Why the support queue is your best user research — and how to use it.",
    images: [`${SITE_URL}/api/og?title=PM+++Customer+Support+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const WHY = [
  "Users in support tickets are honest — they&apos;re already frustrated enough to write in",
  "Patterns in tickets surface real friction that user interviews miss",
  "Support volume trends are a leading indicator of NPS changes",
  "Support cost is a real P&amp;L line — reducing tickets is a measurable business outcome",
  "Unlike research sessions, support queues have thousands of data points — no sample-size issues",
];

const WHAT_TO_LOOK_FOR = [
  {
    look: "Top 5 ticket categories this week",
    why: "Recurring issues become visible quickly. If 15% of tickets are about X, X is a real product problem.",
  },
  {
    look: "First-time vs repeat customer tickets",
    why: "First-time tickets often signal onboarding or activation issues; repeat tickets signal core UX problems.",
  },
  {
    look: "Tickets right after a launch",
    why: "Post-launch spike is normal; if volume doesn&apos;t return to baseline in 1–2 weeks, something&apos;s wrong." ,
  },
  {
    look: "Specific user language",
    why: "&apos;I can&apos;t find X&apos; vs &apos;X is confusing&apos; point to different problems. Reading quotes matters." ,
  },
  {
    look: "Tickets support can&apos;t resolve",
    why: "Escalations are almost always product gaps — bugs, missing functionality, policy issues." ,
  },
  {
    look: "Support tags/categories over time",
    why: "Monthly trend of ticket categories shows which issues are growing, shrinking, or recurring." ,
  },
];

const HOW_TO_USE = [
  { move: "Spend 30 min/week in the queue", detail: "Just read. Patterns emerge within 3 weeks without formal analysis." },
  { move: "Partner with your support lead", detail: "Monthly sync on top issues, volume trends, and what they&apos;d fix if they could." },
  { move: "Quantify ticket cost per issue", detail: "&apos;This issue generates 80 tickets/week × 15 min average = 20 hours of support time&apos; — turns qualitative into business case." },
  { move: "Feed ticket insights into roadmap", detail: "Support-driven improvements should appear in your quarterly OKRs, not just bug backlogs." },
  { move: "Share findings widely", detail: "Monthly &apos;voice of customer&apos; doc with top themes. Drives alignment across product, engineering, and leadership." },
  { move: "Close the loop with support", detail: "When you ship a fix driven by ticket data, tell the support team. They see the impact on their queue and feel valued." },
];

const FAQS = [
  {
    q: "How often should PMs look at support tickets?",
    a: "Weekly light review (30 minutes), monthly deep dive (2 hours). More frequent than weekly and you get noise; less than weekly and you miss emerging issues. The habit matters more than the duration — PMs who make this a recurring calendar block outperform PMs who &apos;look when they can.&apos;",
  },
  {
    q: "Shouldn&apos;t customer research teams handle this instead of PMs?",
    a: "Research teams have their own priorities and move slower. Great PMs don&apos;t outsource raw signal — they stay close to users themselves, using support data as one input among many. The insights that show up in support data often lead to product decisions that PMs need to own anyway. Direct exposure builds instinct that second-hand data doesn&apos;t.",
  },
  {
    q: "What&apos;s the biggest PM mistake in handling support data?",
    a: "Treating it as noise instead of signal. PMs often dismiss support tickets as &apos;edge cases&apos; or &apos;users who don&apos;t understand.&apos; But if 100 users can&apos;t find a feature, that IS a product problem — not a user problem. The best PMs assume the user is right and the product is wrong, until proven otherwise.",
  },
];

export default function PmCustomerSupportInsightsPage() {
  const dates = pageDates("/pm-customer-support-insights");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM + Customer Support", url: `${SITE_URL}/pm-customer-support-insights` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM + Customer Support (2026 Guide)",
        description:
          "Why great PMs spend time in the customer support queue. What to look for, how to quantify signal, and how to turn support data into product decisions.",
        image: `${SITE_URL}/api/og?title=PM+++Customer+Support+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-customer-support-insights`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🎧</span> Every ticket is a user who cared enough to tell you
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM + Customer Support<br />(2026 Guide)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Why does the support queue matter to PMs? Because ticket writers are already frustrated enough to be
            honest, and their tickets surface friction that interviews miss at a scale no research session can
            match. Look for top ticket categories, first-time versus repeat complaints, and the exact language
            users use — then review the queue for 30 minutes weekly and go deeper monthly.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Why the support queue is your best user research, 6 patterns to look for,
            and 6 moves to turn support data into shipped product improvements.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build User Empathy Daily — Free →
          </Link>
        </section>

        {/* Why */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">Why Support Data Is Gold for PMs</h2>
          <div className="space-y-3">
            {WHY.map((w, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{w}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What to look for */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Patterns to Look For</h2>
            <div className="space-y-3">
              {WHAT_TO_LOOK_FOR.map((w, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-white text-sm mb-1">{i + 1}. {w.look}</p>
                  <p className="text-xs text-white/60">{w.why}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to use */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Moves to Turn Support Data Into Action</h2>
          <div className="space-y-3">
            {HOW_TO_USE.map((h, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-green-400 text-sm mb-1">{i + 1}. {h.move}</p>
                <p className="text-xs text-white/60">{h.detail}</p>
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

        <RelatedPages slug="pm-customer-support-insights" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build User Empathy Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on diagnosing user friction and turning insight into product decisions.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
