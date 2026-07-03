import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Mentorship Guide (2026) — How to Find Mentors and Be One",
  description:
    "How PMs find mentors, get the most from mentorship, and become mentors themselves. What works, what doesn&apos;t, and the compounding career value of mentorship.",
  keywords: [
    "PM mentorship", "finding PM mentor",
    "how to be PM mentor", "mentee mentor PM",
    "PM career mentoring 2026",
  ],
  alternates: { canonical: "/pm-mentorship" },
  openGraph: {
    title: "PM Mentorship Guide 2026 — PM Streak",
    description: "How PMs find mentors and become mentors — what works, what doesn&apos;t.",
    url: `${SITE_URL}/pm-mentorship`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Mentorship+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Mentorship Guide 2026 — PM Streak",
    description: "How PMs find mentors and become mentors — what works, what doesn&apos;t.",
    images: [`${SITE_URL}/api/og?title=PM+Mentorship+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const FINDING_MENTORS = [
  { source: "Your current / past manager", how: "Often your best mentor by default — invest in the relationship beyond formal 1:1s" },
  { source: "Senior PMs 1–2 levels above you", how: "Ask for a quarterly coffee chat. Most will say yes to occasional chats." },
  { source: "Alumni of companies you&apos;ve worked at", how: "Shared context makes connection easier. Reach out via LinkedIn or alumni Slack." },
  { source: "Public PM writers you admire", how: "Cold DM with a specific question — 20% reply rate for specific, respectful outreach" },
  { source: "Formal mentorship programs", how: "Reforge, On Deck, company-internal programs. Structure helps some people more than ad-hoc." },
];

const HOW_TO_MENTEE = [
  "Come prepared with a specific question — &apos;I&apos;d love to pick your brain&apos; fails",
  "Respect their time — 30 min meetings, stay within scope",
  "Send a clear follow-up with takeaways — shows you valued their time",
  "Report back in 3 months on what changed — mentors invest more in mentees who show growth",
  "Don&apos;t ask for help getting a job at their company — it&apos;s transactional and backfires",
  "Build the relationship before you need something — asks land better in existing relationships",
];

const HOW_TO_MENTOR = [
  "Ask more questions than you give answers — their situation is different from yours",
  "Share your mistakes, not just your successes — mistakes teach more",
  "Be specific in feedback — &apos;Say &apos;X&apos; instead of &apos;Y&apos; in your next 1:1&apos; beats generic advice",
  "Set expectations: monthly 30-min chats is sustainable, daily access is not",
  "Introduce your mentee to 1–2 people in your network — amplifies your mentorship 10x",
  "Decline gracefully when you don&apos;t have bandwidth — overcommitting hurts both sides",
];

const WHY_MENTORSHIP_COMPOUNDS = [
  "Mentoring clarifies your own thinking — explaining frameworks forces you to refine them",
  "Mentees become future collaborators, references, and hiring managers",
  "Mentoring signals leadership to your own manager — a promotion signal",
  "Giving advice builds your public brand over time — thought leadership grows",
  "The PMs with the strongest networks in year 10 usually started mentoring in year 3",
];

const FAQS = [
  {
    q: "How many mentors should a PM have?",
    a: "2–4 across different dimensions. One senior PM for craft advice. One operator in an adjacent domain for broader perspective. One peer at your level for solidarity and reality-checking. Optionally, one career coach for structured career planning. A single mentor has blind spots; triangulating across multiple perspectives produces better decisions.",
  },
  {
    q: "Should PMs pay for mentorship?",
    a: "Sometimes. Paid coaching through platforms (GrowthMentor, Mentorcruise) can be high-value when the mentor has specific expertise you need fast. Free mentorship through organic relationships is usually richer over the long term. Both have a place — paid for immediate help on a specific skill, free for long-term relationship building.",
  },
];

export default function PmMentorshipPage() {
  const dates = pageDates("/pm-mentorship");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Mentorship", url: `${SITE_URL}/pm-mentorship` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Mentorship Guide (2026 Edition)",
        description:
          "How PMs find mentors, get the most from mentorship, and become mentors themselves. What works, what doesn&apos;t, and the compounding career value of mentorship.",
        image: `${SITE_URL}/api/og?title=PM+Mentorship+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-mentorship`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🌱</span> Mentorship compounds for both sides — start earlier than you think
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Mentorship Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            PM mentorship works best as a mix of two to four relationships — a manager or senior PM for craft advice, a peer for reality-checking, and mentors reached through specific, respectful outreach — built before you need anything from them. It compounds both ways: mentoring sharpens your own thinking and signals leadership to your manager.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 sources of PM mentors, 6 rules for being a great mentee, 6 rules for being a great mentor,
            and 5 reasons mentorship compounds both ways.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Skills Daily — Free →
          </Link>
        </section>

        {/* Finding mentors */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Sources of PM Mentors</h2>
          <div className="space-y-4">
            {FINDING_MENTORS.map((f, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <p className="font-bold text-white mb-1">{i + 1}. {f.source}</p>
                <p className="text-xs text-white/60">{f.how}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mentee */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Rules for Being a Great Mentee</h2>
            <div className="space-y-2">
              {HOW_TO_MENTEE.map((h, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{h}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mentor */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Rules for Being a Great Mentor</h2>
          <div className="space-y-2">
            {HOW_TO_MENTOR.map((h, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{h}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Compounds */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Reasons Mentorship Compounds</h2>
            <div className="space-y-2">
              {WHY_MENTORSHIP_COMPOUNDS.map((w, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
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

        <RelatedPages slug="pm-mentorship" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Become the PM Your Mentor Thinks You Can Be</h2>
          <p className="text-white/60 mb-6">Daily PM practice turns mentorship advice into shipped skills.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
