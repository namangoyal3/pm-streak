import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "Duolingo for Product Managers — PM Streak",
  description:
    "PM Streak is the Duolingo for PMs. Daily 2-minute lessons from 300+ real PM interviews, streak tracking, XP, leaderboards, and AI-powered practice — all in one app.",
  keywords: [
    "duolingo for product managers", "duolingo for PMs", "PM learning app",
    "product manager daily practice", "PM streak app", "learn product management daily",
    "product management habit", "PM skill building app",
  ],
  alternates: { canonical: "/duolingo-for-product-managers" },
  openGraph: {
    title: "Duolingo for Product Managers — PM Streak",
    description: "Daily 2-minute PM lessons with streaks, XP, and leaderboards. The habit app for product managers.",
    url: `${SITE_URL}/duolingo-for-product-managers`,
    images: [{ url: `${SITE_URL}/api/og?title=Duolingo+for+Product+Managers++PM+Streak`, width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Duolingo for Product Managers — PM Streak",
    description: "Daily 2-minute PM lessons with streaks, XP, and leaderboards. The habit app for product managers.",
    images: [`${SITE_URL}/api/og?title=Duolingo+for+Product+Managers++PM+Streak`],
    site: "@pmstreak",
  },
};

const COMPARISONS = [
  { feature: "Daily bite-sized lessons", duolingo: true, pmStreak: true },
  { feature: "Streak tracking", duolingo: true, pmStreak: true },
  { feature: "XP & levelling system", duolingo: true, pmStreak: true },
  { feature: "Leaderboards", duolingo: true, pmStreak: true },
  { feature: "Real PM interview content", duolingo: false, pmStreak: true },
  { feature: "AI-powered practice questions", duolingo: false, pmStreak: true },
  { feature: "Interview readiness score", duolingo: false, pmStreak: true },
  { feature: "JD-personalised prep", duolingo: false, pmStreak: true },
  { feature: "India pricing (₹299/mo)", duolingo: false, pmStreak: true },
];

const FAQS = [
  {
    q: "Is PM Streak really like Duolingo for product managers?",
    a: "Yes — deliberately. Duolingo proved that daily 5-minute lessons beat weekend cramming for language learning. PM Streak applies the same insight to product management: 2-minute daily lessons from real PM interviews, with streaks and XP to keep you consistent. The habit is the product.",
  },
  {
    q: "How is PM Streak different from reading PM books?",
    a: "Books give you theory. PM Streak gives you practice. Every lesson is extracted from a real PM interview — meaning you're learning what actually gets asked, not what someone thought should get asked. And the daily habit loop means you retain it.",
  },
  {
    q: "How long does it take to see results with PM Streak?",
    a: "Most users report feeling noticeably sharper in product conversations after 5–7 days of consistent practice. Interview confidence typically builds over 2–4 weeks. The streak mechanic is key — even 2 minutes a day compounds dramatically.",
  },
];

export default function DuolingoForProductManagersPage() {
  const dates = pageDates("/duolingo-for-product-managers");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Duolingo for Product Managers", url: `${SITE_URL}/duolingo-for-product-managers` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Duolingo for Product Managers",
        description: "PM Streak is the Duolingo for PMs. Daily 2-minute lessons from 300+ real PM interviews, streak tracking, XP, leaderboards, and AI-powered practice — all in one app.",
        image: `${SITE_URL}/api/og?title=Duolingo+for+Product+Managers++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/duolingo-for-product-managers`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🦉</span> The habit app product managers were waiting for
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Duolingo for Product Managers
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            PM Streak is the Duolingo for product managers: 2-minute daily lessons drawn from
            300+ real PM interviews, with streak tracking, XP, and leaderboards keeping you
            consistent. Where Duolingo builds a language habit, PM Streak builds product
            instinct — adding AI-powered practice questions, an interview readiness score,
            and India pricing at ₹299/month with a 7-day free trial.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Duolingo made language learning a daily habit through streaks, XP, and bite-sized lessons.
            PM Streak does the same for product management — with real content from 300+ PM interviews.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/signup" className="bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
              Start Your Streak — Free
            </Link>
            <Link href="/learn" className="bg-white/10 hover:bg-white/15 text-white font-semibold px-8 py-3 rounded-xl transition-colors">
              See Today&apos;s Lesson →
            </Link>
          </div>
          <p className="text-sm text-white/40 mt-4">7-day free trial · ₹299/month after</p>
        </section>

        {/* The Duolingo Insight */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Why the Duolingo Model Works for PMs</h2>
            <p className="text-white/60 max-w-2xl mx-auto mb-10">
              Duolingo&apos;s breakthrough wasn&apos;t the content — it was the consistency engine.
              A 2-minute daily habit beats a 2-hour weekend session every time.
              PM Streak applies this to product thinking.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                { icon: "🔥", title: "Daily Streaks", body: "Miss a day and your streak breaks. Simple, powerful, and surprisingly motivating — even for senior PMs." },
                { icon: "⭐", title: "XP & Levels", body: "Earn XP for every lesson. Level up from APM to Chief PM. Your progress is visible and satisfying." },
                { icon: "🏆", title: "Leaderboards", body: "Compete with other PMs in your weekly cohort. Friendly competition keeps you coming back." },
              ].map(c => (
                <div key={c.title} className="bg-[#111] border border-white/10 rounded-xl p-5">
                  <div className="text-3xl mb-3">{c.icon}</div>
                  <h3 className="font-semibold mb-2">{c.title}</h3>
                  <p className="text-sm text-white/60">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="max-w-2xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-8">PM Streak vs Duolingo</h2>
          <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 bg-[#16181c] border-b border-white/10 text-sm font-semibold">
              <div className="p-4 text-white/50">Feature</div>
              <div className="p-4 text-center text-white/50">Duolingo</div>
              <div className="p-4 text-center text-[#89e219]">PM Streak</div>
            </div>
            {COMPARISONS.map((row, i) => (
              <div key={i} className={`grid grid-cols-3 text-sm border-b border-white/5 last:border-0 ${i % 2 === 0 ? "" : "bg-[#16181c]"}`}>
                <div className="p-4 text-white/70">{row.feature}</div>
                <div className="p-4 text-center">{row.duolingo ? "✅" : "❌"}</div>
                <div className="p-4 text-center">{row.pmStreak ? "✅" : "❌"}</div>
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

        <RelatedPages slug="duolingo-for-product-managers" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Start Your PM Streak Today</h2>
          <p className="text-white/60 mb-6">2 minutes a day. Every day. That&apos;s all it takes.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free →
          </Link>
        </section>
      </main>
    </>
  );
}
