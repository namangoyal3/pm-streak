import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Sprint Retrospectives (2026) — How to Run Retros That Change Behaviour",
  description:
    "How PMs run sprint retros that actually improve the team. Structure, facilitation, and why most retros feel like theatre.",
  keywords: [
    "PM sprint retro", "sprint retrospective PM",
    "agile retro PM", "team retrospective",
    "continuous improvement PM 2026",
  ],
  alternates: { canonical: "/pm-sprint-retrospectives" },
  openGraph: {
    title: "PM Sprint Retrospectives 2026 — PM Streak",
    description: "How PMs run retros that change behaviour — structure, facilitation, and action follow-up.",
    url: `${SITE_URL}/pm-sprint-retrospectives`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Sprint+Retrospectives+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Sprint Retrospectives 2026 — PM Streak",
    description: "How PMs run retros that change behaviour — structure, facilitation, and action follow-up.",
    images: [`${SITE_URL}/api/og?title=PM+Sprint+Retrospectives+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const STRUCTURE = [
  { step: "Review last sprint&apos;s action items (5 min)", what: "Did we actually do what we committed to? If no retro items get followed up, retros are theatre." },
  { step: "Data grounding (5 min)", what: "Quick look at what shipped vs committed, any outages, any key metrics." },
  { step: "What went well (10 min)", what: "Celebrate wins; reinforce good patterns. Don&apos;t skip this to get to &apos;what went wrong.&apos;" },
  { step: "What could improve (15 min)", what: "Specific issues, not vague &apos;communication.&apos; Root causes, not symptoms." },
  { step: "Action items (10 min)", what: "Named owner + deadline for each. Without both, nothing happens." },
  { step: "Commit &amp; close (5 min)", what: "Team verbally commits to action items. Creates accountability." },
];

const FACILITATION = [
  "Timebox each section — retros drift without it",
  "Use a shared doc so everyone sees the same thing",
  "Surface quiet voices — ask junior folks directly",
  "Distinguish &apos;venting&apos; from &apos;feedback&apos; — venting is fine briefly, then move to action",
  "PM doesn&apos;t dominate — retros are team events, not monologues",
  "End with commitments, not just observations",
];

const COMMON_FAILURES = [
  "Same complaints every retro — you&apos;re venting, not fixing",
  "Action items with no owner — &apos;we should&apos; never happens",
  "Never following up on last retro&apos;s actions — signals retros don&apos;t matter",
  "Too broad — &apos;improve communication&apos; — unactionable",
  "Blame individuals — kills psychological safety",
  "Skipping when busy — that&apos;s when you most need them",
];

const FORMATS = [
  { format: "Start / Stop / Continue", when: "Classic simple retro — good default" },
  { format: "Mad / Sad / Glad", when: "When team needs to process emotion first" },
  { format: "4Ls: Liked / Learned / Lacked / Longed for", when: "When you want broader reflection" },
  { format: "Sailboat (wind, anchors, rocks)", when: "Visual teams — metaphorical framing helps" },
  { format: "Timeline-based", when: "After a launch or major milestone — chronological review" },
];

const FAQS = [
  {
    q: "How often should PM teams run sprint retros?",
    a: "Every 1–2 weeks (tied to sprint length). Skipping retros when busy is a common trap — busy teams need reflection most. 45 minutes per retro is sustainable. Longer and energy drops; shorter and nothing gets resolved. Protect them like you&apos;d protect sprint planning.",
  },
  {
    q: "What&apos;s the biggest retro mistake?",
    a: "Not following up on action items. Retros generate good ideas; teams never implement them; next retro feels like déjà vu. The discipline: start each retro reviewing last retro&apos;s actions. If you can&apos;t point to changes you actually made, retros are theatre. Follow-through is the whole game.",
  },
];

export default function PmSprintRetrospectivesPage() {
  const dates = pageDates("/pm-sprint-retrospectives");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Sprint Retrospectives", url: `${SITE_URL}/pm-sprint-retrospectives` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Sprint Retrospectives (2026 Edition)",
        description:
          "How PMs run sprint retros that actually improve the team. Structure, facilitation, and why most retros feel like theatre.",
        image: `${SITE_URL}/api/og?title=PM+Sprint+Retrospectives+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-sprint-retrospectives`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔁</span> Retros that don&apos;t change behaviour are theatre
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Sprint Retrospectives<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-2">
            Sprint retros that change behaviour follow a fixed 45-minute structure — review last
            sprint&apos;s action items, ground in data, celebrate wins, dig into specific root causes,
            then assign named owners and deadlines before the team verbally commits. The biggest
            mistake is skipping that follow-up: teams generate good ideas, never implement them, and
            the next retro feels like déjà vu.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6-step retro structure, 6 facilitation rules, 6 common failures, and 5 retro formats to try.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Team Skills Daily — Free →
          </Link>
        </section>

        {/* Structure */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6-Step Retro Structure (45 min total)</h2>
          <div className="space-y-3">
            {STRUCTURE.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-white text-sm mb-1">{i + 1}. {s.step}</p>
                <p className="text-xs text-white/60">{s.what}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Facilitation */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Facilitation Rules</h2>
            <div className="space-y-2">
              {FACILITATION.map((f, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{f}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Failures */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Common Retro Failures</h2>
          <div className="space-y-2">
            {COMMON_FAILURES.map((c, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-red-400 flex-shrink-0">❌</span>
                <p className="text-sm text-white/70">{c}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Formats */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Retro Formats to Try</h2>
            <div className="space-y-3">
              {FORMATS.map((f, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-[#89e219] text-sm mb-1">{f.format}</p>
                  <p className="text-xs text-white/60">{f.when}</p>
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

        <RelatedPages slug="pm-sprint-retrospectives" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Team Skills Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on facilitation, team dynamics, and continuous improvement.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
