import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Team Rituals (2026) — The Recurring Meetings Great PM Teams Use",
  description:
    "The recurring rituals great PM teams use. Product reviews, metric reviews, roadmap reviews — when each matters, how long they should take, and which to skip.",
  keywords: [
    "PM rituals", "product team rituals",
    "product review meeting", "metric review PM",
    "PM team cadence 2026",
  ],
  alternates: { canonical: "/pm-rituals" },
  openGraph: {
    title: "PM Team Rituals 2026 — PM Streak",
    description: "Recurring rituals great PM teams use — product, metric, and roadmap reviews.",
    url: `${SITE_URL}/pm-rituals`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Team+Rituals+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Team Rituals 2026 — PM Streak",
    description: "Recurring rituals great PM teams use — product, metric, and roadmap reviews.",
    images: [`${SITE_URL}/api/og?title=PM+Team+Rituals+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const RITUALS = [
  { ritual: "Weekly metric review", cadence: "Weekly, 30 min", attendees: "PM + eng lead + design lead + data", purpose: "Review north star + input metrics. Diagnose anomalies, decide actions." },
  { ritual: "Sprint planning", cadence: "Every 1–2 weeks, 90 min", attendees: "Full squad", purpose: "Commit to sprint scope, align on approach." },
  { ritual: "Sprint retro", cadence: "Every 1–2 weeks, 45 min", attendees: "Full squad", purpose: "Reflect on what worked, action items for next sprint." },
  { ritual: "Product review", cadence: "Every 2 weeks, 60 min", attendees: "PM + leadership + adjacent PMs", purpose: "Demo + discussion of shipped + upcoming work at strategic level." },
  { ritual: "Roadmap review", cadence: "Monthly, 60 min", attendees: "PM + cross-functional leads", purpose: "Review next 90 days of priorities, decide deferrals." },
  { ritual: "Quarterly planning", cadence: "Quarterly, 4–8 hours", attendees: "PM + eng + design + leadership", purpose: "Set OKRs and big bets for the quarter." },
  { ritual: "All-hands / town hall", cadence: "Monthly, 30–60 min", attendees: "Full PM org", purpose: "Broad updates, recognition, Q&amp;A with leadership." },
  { ritual: "1:1s with manager", cadence: "Weekly, 30 min", attendees: "PM + manager", purpose: "Career, feedback, alignment on priorities." },
];

const WHICH_TO_SKIP = [
  "Status meetings — if nothing will be decided, use async update",
  "&apos;Update&apos; meetings with no agenda — skip or ask for agenda first",
  "Meetings where you&apos;re the 8th PM — too many cooks, likely unnecessary for you",
  "Weekly cross-PM sync if it&apos;s consistently low-signal — move to bi-weekly",
  "Any meeting where you attend but don&apos;t speak — convert to async or decline",
];

const MAKE_THEM_BETTER = [
  "Pre-read always — meetings that start with context-setting waste 15 min",
  "Shared doc with agenda and notes — async-first discussion before meeting",
  "Clear outcome stated upfront — &apos;We&apos;re here to decide X&apos; beats vague framing",
  "Parking lot for tangents — &apos;let&apos;s take that offline&apos;",
  "End 5 min early with recap — decisions, owners, next steps",
  "Quarterly audit — kill rituals that stopped earning their time",
];

const FAQS = [
  {
    q: "How many hours per week should PMs spend in rituals?",
    a: "8–15 hours is typical. Beyond 20 and you&apos;re likely in too many. Track your actual time for 2 weeks — you&apos;ll be surprised where it goes. The PMs with the strongest output consistently protect deep work by being aggressive about which rituals they attend.",
  },
  {
    q: "Which ritual is most important?",
    a: "Weekly 1:1 with manager and weekly metric review. These compound — missing them erodes alignment and metric awareness faster than missing others. Quarterly planning is important but easier to recover from; weekly rituals are the steady drumbeat of PM work.",
  },
];

export default function PmRitualsPage() {
  const dates = pageDates("/pm-rituals");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Team Rituals", url: `${SITE_URL}/pm-rituals` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Team Rituals (2026 Edition)",
        description:
          "The recurring rituals great PM teams use. Product reviews, metric reviews, roadmap reviews — when each matters, how long they should take, and which to skip.",
        image: `${SITE_URL}/api/og?title=PM+Team+Rituals+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-rituals`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔔</span> Rituals are scaffolding — skip the ones that don&apos;t hold up work
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Team Rituals<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Great PM teams run eight recurring rituals — weekly metric reviews, sprint planning and retros,
            product and roadmap reviews, quarterly planning, all-hands, and manager 1:1s — typically totaling
            8 to 15 hours a week, with the weekly 1:1 and metric review mattering most because missing them
            erodes alignment fastest. Just as important is knowing which to skip: status meetings,
            agenda-less updates, and any meeting you attend but never speak in.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            8 recurring rituals great PM teams use, 5 you can skip, and 6 moves to make the ones you keep better.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Habits Daily — Free →
          </Link>
        </section>

        {/* Rituals */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">8 Rituals Great PM Teams Use</h2>
          <div className="space-y-4">
            {RITUALS.map((r, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <p className="font-bold text-white">{i + 1}. {r.ritual}</p>
                  <span className="text-xs bg-[#58cc02]/20 text-[#89e219] px-2 py-0.5 rounded-full">{r.cadence}</span>
                </div>
                <p className="text-xs text-white/60 mb-1">Attendees: {r.attendees}</p>
                <p className="text-xs text-[#89e219]">Purpose: <span className="text-white/70">{r.purpose}</span></p>
              </div>
            ))}
          </div>
        </section>

        {/* Which to skip */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Rituals You Can Skip</h2>
            <div className="space-y-2">
              {WHICH_TO_SKIP.map((w, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-red-400 flex-shrink-0">🚫</span>
                  <p className="text-sm text-white/70">{w}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Make them better */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Moves to Make Rituals Better</h2>
          <div className="space-y-2">
            {MAKE_THEM_BETTER.map((m, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
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

        <RelatedPages slug="pm-rituals" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Habits Daily</h2>
          <p className="text-white/60 mb-6">Daily PM scenarios — the most high-leverage habit you can add to your week.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
