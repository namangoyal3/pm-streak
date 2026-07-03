import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "User Research for Product Managers (2026) — Interviews, Surveys, Usability Tests",
  description:
    "The complete user research playbook for PMs. When to use interviews vs surveys vs usability tests, how to recruit, how to analyse, and how to turn research into product decisions.",
  keywords: [
    "user research for PMs", "user research product manager",
    "user interview guide PM", "PM user research methods",
    "how to conduct user interviews", "usability testing PM 2026",
  ],
  alternates: { canonical: "/user-research-for-pms" },
  openGraph: {
    title: "User Research for Product Managers 2026 — PM Streak",
    description: "Interviews, surveys, usability tests — the research methods every PM should know.",
    url: `${SITE_URL}/user-research-for-pms`,
    images: [{ url: `${SITE_URL}/api/og?title=User+Research+for+Product+Managers+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "User Research for Product Managers 2026 — PM Streak",
    description: "Interviews, surveys, usability tests — the research methods every PM should know.",
    images: [`${SITE_URL}/api/og?title=User+Research+for+Product+Managers+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const METHODS = [
  {
    method: "User Interviews (1:1)",
    icon: "🎤",
    bestFor: "Understanding why users do what they do. Uncovering pain points. Learning about context of use.",
    sampleSize: "5–8 per persona. Patterns emerge after 5. Returns diminish after 10.",
    avoid: "Asking 'would you use X?' — users are bad at predicting their future behaviour. Ask about past behaviour instead.",
    goodFor: "Early-stage discovery, post-launch learning, persona development",
    badFor: "Feature prioritisation (use quant), UX validation (use usability tests)",
  },
  {
    method: "Surveys",
    icon: "📝",
    bestFor: "Quantifying something you already qualitatively understand. Measuring perceptions at scale.",
    sampleSize: "Minimum 100 responses for meaningful inference. 300+ for segment cuts.",
    avoid: "Asking leading questions. 10+ questions (completion rate drops). Free-text when multi-choice would work.",
    goodFor: "NPS, CSAT, feature importance ranking, persona attribute validation",
    badFor: "Understanding WHY users do things (surveys reveal what, not why)",
  },
  {
    method: "Usability Testing",
    icon: "🖱️",
    bestFor: "Validating that users can actually use a design. Finding UX friction.",
    sampleSize: "5 users catches ~85% of usability issues (Nielsen's rule).",
    avoid: "Leading users through tasks. Asking them what they're thinking instead of letting them think aloud naturally.",
    goodFor: "New flows before launch, redesign validation, complex feature testing",
    badFor: "Understanding demand for a feature (they'll comply even if they wouldn't use it)",
  },
  {
    method: "Diary Studies",
    icon: "📔",
    bestFor: "Understanding behaviour over time, in natural context, without researcher present.",
    sampleSize: "10–15 participants for 1–2 weeks.",
    avoid: "Asking for too much effort per entry. Forgetting to send reminders.",
    goodFor: "Habits, long-feedback-loop products, mobile behaviour, multi-touchpoint journeys",
    badFor: "Quick insights, large-scale trends, features you need to ship next sprint",
  },
  {
    method: "Session Recordings & Heatmaps",
    icon: "📹",
    bestFor: "Passive observation at scale. Spotting unexpected user behaviour.",
    sampleSize: "Review 20–50 sessions per hypothesis. Use heatmaps at aggregate level.",
    avoid: "Relying on it alone — session recordings show behaviour without context. Pair with interviews.",
    goodFor: "Funnel diagnosis, unexpected error behaviour, spotting design dead zones",
    badFor: "Understanding user goals or intent (you see what, not why)",
  },
  {
    method: "Card Sorting / Tree Testing",
    icon: "🗂️",
    bestFor: "Information architecture decisions. What should be grouped with what?",
    sampleSize: "15–30 participants for meaningful clustering.",
    avoid: "Using closed sorts when you don't know user mental models yet. Use open sorts first.",
    goodFor: "Menu redesigns, navigation structure, category taxonomy",
    badFor: "Everything else — it's a specialised method for IA only",
  },
];

const GOOD_INTERVIEW_QS = [
  { q: "Walk me through the last time you [did X]. What happened?", purpose: "Gets a specific story, not a generalisation" },
  { q: "What was the hardest part of that?", purpose: "Surfaces the real pain point" },
  { q: "What did you try to do about it?", purpose: "Reveals current workarounds (often the real competitor)" },
  { q: "How did that work out?", purpose: "Gets context on why existing solutions aren't enough" },
  { q: "What happened next?", purpose: "Keeps the story going; reveals downstream consequences" },
  { q: "Is there anything else you think I should know?", purpose: "Catches unexpected insights and closes respectfully" },
];

const FAQS = [
  {
    q: "How much user research should a PM do?",
    a: "At least 1 user interview per week per product area is the minimum sustainable cadence (Teresa Torres' continuous discovery recommendation). This is ~2 hours per week and dramatically improves product quality. PMs who do zero research outside of what UX researchers provide ship products that miss user nuance. PMs who do research continuously build intuition that no amount of data can replicate.",
  },
  {
    q: "Do PMs need to run user research themselves or rely on UX researchers?",
    a: "Both. Work with UX researchers for complex studies (diary studies, segmentation, ethnography). Run lightweight research yourself for ongoing learning (weekly user calls, informal usability tests, PM-run interviews for feature validation). PMs who outsource ALL research to UXR end up with slower feedback loops and weaker user intuition.",
  },
  {
    q: "How do you recruit users for interviews in India?",
    a: "For existing users: in-product invites (best conversion, most representative), email outreach to segments, or post-support-ticket follow-ups. For non-users or new segments: UserTesting.com, Respondent.io (for paid panels), LinkedIn outreach, subreddits/communities where your target users hang out, or your personal network with a clear ask. Offer ₹500–₹2000 incentive depending on interview length.",
  },
];

export default function UserResearchForPmsPage() {
  const dates = pageDates("/user-research-for-pms");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "User Research for PMs", url: `${SITE_URL}/user-research-for-pms` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "User Research for PMs (2026 Edition)",
        description:
          "The complete user research playbook for PMs. When to use interviews vs surveys vs usability tests, how to recruit, how to analyse, and how to turn research into product decisions.",
        image: `${SITE_URL}/api/og?title=User+Research+for+Product+Managers+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/user-research-for-pms`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔍</span> The PM who talks to users weekly ships the best products
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            User Research for PMs<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            User research for PMs means choosing from six methods — interviews, surveys, usability tests, diary
            studies, session recordings, and card sorting — based on what you need to learn, not habit. Interviews
            reveal why users struggle; surveys quantify what you already suspect; usability tests catch friction
            before launch. The baseline cadence: at least one user interview per week.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The 6 research methods every PM should know, when to use each, how many users you actually need,
            and how to turn research into product decisions — not reports.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice User Research Scenarios — Free →
          </Link>
        </section>

        {/* Methods */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="space-y-5">
            {METHODS.map((m) => (
              <div key={m.method} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{m.icon}</span>
                  <h2 className="text-lg font-bold text-white">{m.method}</h2>
                </div>
                <p className="text-sm text-white/70 mb-3">{m.bestFor}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <div className="bg-[#0e1113] rounded-lg p-3">
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Sample size</p>
                    <p className="text-xs text-white/70">{m.sampleSize}</p>
                  </div>
                  <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-3">
                    <p className="text-xs text-yellow-400">⚠️ Avoid: {m.avoid}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3">
                    <p className="text-xs text-green-400 mb-1">✅ Good for</p>
                    <p className="text-xs text-white/60">{m.goodFor}</p>
                  </div>
                  <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3">
                    <p className="text-xs text-red-400 mb-1">❌ Bad for</p>
                    <p className="text-xs text-white/60">{m.badFor}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interview questions */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-3">6 User Interview Questions That Work</h2>
            <p className="text-white/60 text-center mb-8">Ask these in order. Let silence breathe. Never lead.</p>
            <div className="space-y-3">
              {GOOD_INTERVIEW_QS.map((item, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <div className="flex gap-3 items-start">
                    <span className="w-6 h-6 rounded-full bg-[#58cc02]/20 text-[#89e219] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                    <div>
                      <p className="text-sm text-white font-medium mb-1 italic">&ldquo;{item.q}&rdquo;</p>
                      <p className="text-xs text-white/50">{item.purpose}</p>
                    </div>
                  </div>
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

        <RelatedPages slug="user-research-for-pms" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build User Empathy in 2 Minutes a Day</h2>
          <p className="text-white/60 mb-6">Daily PM scenarios that sharpen user intuition and research-based decision making.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
