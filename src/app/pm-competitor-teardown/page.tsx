import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Competitor Teardown Guide (2026) — How to Study a Competitor Product Like a PM",
  description:
    "The complete guide to competitor teardowns. What to look at, how to structure the write-up, and how to turn teardowns into strategic insight.",
  keywords: [
    "PM competitor teardown", "product teardown template",
    "how PMs do competitor teardowns", "product analysis PM",
    "app teardown framework 2026",
  ],
  alternates: { canonical: "/pm-competitor-teardown" },
  openGraph: {
    title: "PM Competitor Teardown Guide 2026 — PM Streak",
    description: "How PMs tear down competitor products — what to study, how to structure, and turn into insight.",
    url: `${SITE_URL}/pm-competitor-teardown`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Competitor+Teardown+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Competitor Teardown Guide 2026 — PM Streak",
    description: "How PMs tear down competitor products — what to study, how to structure, and turn into insight.",
    images: [`${SITE_URL}/api/og?title=PM+Competitor+Teardown+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const FRAMEWORK = [
  { section: "Product overview", what: "One paragraph: what it is, who it&apos;s for, what it replaces in users&apos; lives." },
  { section: "Target user segments", what: "Specific personas — primary, secondary, edge cases. Not &apos;everyone.&apos;" },
  { section: "Core user flows", what: "Walk through 2–3 main flows (signup, activation, primary action). Note friction points." },
  { section: "Metrics they likely optimise for", what: "Based on UX patterns: engagement time? Referrals? Depth of use? Reasoned inference." },
  { section: "Monetisation model", what: "Free vs paid, tier breakdown, likely primary revenue driver." },
  { section: "Strengths", what: "3–5 things they do genuinely well. Specific — not &apos;good UX.&apos;" },
  { section: "Weaknesses", what: "3–5 concrete problems or gaps. Speak to the specific user or flow affected." },
  { section: "Strategic opportunities", what: "What you&apos;d do if you were their PM. What a competitor could exploit." },
];

const WHERE_TO_LOOK = [
  { area: "Their product itself", how: "Sign up, use it for 2 hours, take screenshots, map the full flow." },
  { area: "App Store / Play Store reviews", how: "Read the 1-star reviews — that&apos;s where the real user pain is." },
  { area: "Their changelog", how: "Reveals priorities — what they&apos;ve been shipping. Often public." },
  { area: "Their pricing page", how: "Their monetisation strategy is here. Compare tiers. Note what&apos;s gated." },
  { area: "Founders&apos; tweets/interviews", how: "Reveals strategy, pain points, what they&apos;re betting on next." },
  { area: "Job postings", how: "What they&apos;re hiring for = what they&apos;re investing in. Leading strategic signal." },
];

const COMMON_MISTAKES = [
  "Writing a feature list instead of analysis — boring and extractable from their site",
  "Imitating their strengths instead of questioning them — their decisions may not apply to your context",
  "Missing the second-order effects — why they chose certain trade-offs",
  "No hypothesis about what they&apos;d do next — forecasting is where real insight comes from",
  "Writing for length — a 3-page sharp teardown beats a 15-page feature dump",
  "Using only marketing copy — you need to actually use the product",
];

const FAQS = [
  {
    q: "How often should PMs do competitor teardowns?",
    a: "Quarterly deep teardowns of 2–3 direct competitors. Monthly light review (changelog + reviews). Your goal isn&apos;t to monitor — it&apos;s to spot strategic shifts. Constant monitoring leads to imitation; periodic deep analysis leads to genuine insight.",
  },
  {
    q: "Should PMs show competitor teardowns to their whole team?",
    a: "Yes — strategically. Teardowns shared broadly build team awareness of the competitive landscape and surface opportunities you might miss. Great teardowns educate the team even about non-competitor products — tearing down Linear or Figma teaches PM principles regardless of your domain.",
  },
  {
    q: "What&apos;s the biggest teardown mistake?",
    a: "Treating it as a feature comparison. Good teardowns reveal WHY a competitor made decisions — not just WHAT they did. Ask: what user problem does this solve? What trade-off did they make? What would I have done differently and why? Feature lists are data; analysis is insight.",
  },
];

export default function PmCompetitorTeardownPage() {
  const dates = pageDates("/pm-competitor-teardown");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Competitor Teardown", url: `${SITE_URL}/pm-competitor-teardown` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Competitor Teardown Guide (2026 Edition)",
        description:
          "The complete guide to competitor teardowns. What to look at, how to structure the write-up, and how to turn teardowns into strategic insight.",
        image: `${SITE_URL}/api/og?title=PM+Competitor+Teardown+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-competitor-teardown`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔍</span> Great teardowns reveal WHY — not just WHAT
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Competitor Teardown<br />Guide (2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            A PM competitor teardown works through eight sections — overview, target segments, core flows, likely
            metrics, monetisation, strengths, weaknesses, and strategic opportunities — built from signal gathered
            inside the product itself, its App Store reviews, changelog, pricing page, and job postings. Do this
            quarterly for two to three direct competitors, since the point is spotting strategic shifts, not
            producing a feature list.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The 8-section teardown framework, 6 places to gather competitive signal,
            and 6 mistakes that turn teardowns into shallow feature lists.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice Product Teardowns Daily — Free →
          </Link>
        </section>

        {/* Framework */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">The 8-Section Teardown Framework</h2>
          <div className="space-y-3">
            {FRAMEWORK.map((f, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-white text-sm mb-1">{i + 1}. {f.section}</p>
                <p className="text-xs text-white/60">{f.what}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Where to look */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Places to Gather Signal</h2>
            <div className="space-y-3">
              {WHERE_TO_LOOK.map((w, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-[#89e219] text-sm mb-1">{w.area}</p>
                  <p className="text-xs text-white/60">{w.how}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common mistakes */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Teardown Mistakes</h2>
          <div className="space-y-2">
            {COMMON_MISTAKES.map((m, i) => (
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

        <RelatedPages slug="pm-competitor-teardown" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Product Teardowns Daily</h2>
          <p className="text-white/60 mb-6">Teardown an app a week — your product sense compounds faster than you think.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
