import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Experimentation Culture (2026) — How to Build a Team That Ships, Measures, Learns",
  description:
    "How PMs build a team culture of experimentation. Habits, rituals, metrics, and how to shift a team from ship-and-hope to ship-and-learn.",
  keywords: [
    "PM experimentation culture", "team experimentation",
    "A/B testing culture", "ship and learn",
    "PM team culture 2026",
  ],
  alternates: { canonical: "/pm-experimentation-culture" },
  openGraph: {
    title: "PM Experimentation Culture 2026 — PM Streak",
    description: "How PMs build team cultures of experimentation — habits, rituals, metrics.",
    url: `${SITE_URL}/pm-experimentation-culture`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Experimentation+Culture+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Experimentation Culture 2026 — PM Streak",
    description: "How PMs build team cultures of experimentation — habits, rituals, metrics.",
    images: [`${SITE_URL}/api/og?title=PM+Experimentation+Culture+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const HABITS = [
  "Weekly experiment review — celebrate learnings, not just wins",
  "Pre-registered hypotheses — before running, not rationalised after",
  "Named owners for each experiment — accountability tied to outcomes",
  "Kill criteria upfront — &apos;if X doesn&apos;t happen by Y, we stop&apos;",
  "Share failures openly — failures are learnings, not embarrassments",
  "Track experiment velocity — not just count, but quality per experiment",
];

const RITUALS = [
  "Experimentation roadmap alongside feature roadmap — tests have space, not afterthought",
  "Launch-plus-measure tied together — don&apos;t ship without measurement plan",
  "Monthly experiment retrospective — what worked, what didn&apos;t, what we&apos;d change",
  "Quarterly learning doc — consolidate learnings across experiments",
  "Annual calibration — are our experiments still rigorous? Same standards over time?",
];

const METRICS_TO_TRACK = [
  "Experiments run per quarter — volume with quality",
  "% of experiments that pre-registered hypotheses — rigour signal",
  "% of winning experiments shipped within 2 weeks of conclusion — decision velocity",
  "% of killed experiments with written post-mortem — learning discipline",
  "Time from idea to first experiment — cycle time",
];

const CULTURAL_SHIFTS = [
  "Shift from &apos;are we right?&apos; to &apos;what did we learn?&apos; — frames experimentation positively",
  "Celebrate honest failures publicly — signals it&apos;s safe to run real experiments",
  "Reward kills as much as ships — killing a bad bet is PM excellence",
  "Make experimentation leadership visible — senior PMs running experiments sets the tone",
  "Tie promotion to learning velocity — not just shipping velocity",
];

const FAQS = [
  {
    q: "How do PMs build experimentation culture on a team that doesn&apos;t have one?",
    a: "Start small. Run ONE visible experiment well — pre-register, track, share both outcome and learnings. Show the team what good looks like. Then do it again next sprint. Culture shifts through repetition of good patterns, not announcements. Most teams adopt experimentation gradually, not through mandate.",
  },
  {
    q: "What&apos;s the biggest experimentation culture anti-pattern?",
    a: "Punishing failed experiments. If teams are penalised when experiments don&apos;t work out, they stop running real experiments — they run safe tests that confirm existing beliefs. Great PM leaders treat failed experiments as investment in learning and publicly celebrate what was learned.",
  },
];

export default function PmExperimentationCulturePage() {
  const dates = pageDates("/pm-experimentation-culture");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Experimentation Culture", url: `${SITE_URL}/pm-experimentation-culture` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Experimentation Culture (2026 Edition)",
        description:
          "How PMs build a team culture of experimentation. Habits, rituals, metrics, and how to shift a team from ship-and-hope to ship-and-learn.",
        image: `${SITE_URL}/api/og?title=PM+Experimentation+Culture+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-experimentation-culture`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🧪</span> Great PM cultures learn as fast as they ship
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Experimentation Culture<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            A team doesn&apos;t get an experimentation culture from a mandate — it builds one through weekly experiment reviews, pre-registered hypotheses, named owners, and upfront kill criteria, then reinforces it by shipping winners within two weeks and writing post-mortems on the kills. The cultural shift that matters most is treating an honest failure as a learning worth celebrating rather than a result to punish.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 team habits, 5 rituals, 5 metrics to track, and 5 cultural shifts that build ship-and-learn teams.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Experimentation Skills Daily — Free →
          </Link>
        </section>

        {/* Habits */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Team Habits</h2>
          <div className="space-y-2">
            {HABITS.map((h, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{h}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Rituals */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Rituals</h2>
            <div className="space-y-2">
              {RITUALS.map((r, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{r}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Metrics */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Metrics to Track</h2>
          <div className="space-y-2">
            {METRICS_TO_TRACK.map((m, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{m}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cultural shifts */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Cultural Shifts</h2>
            <div className="space-y-2">
              {CULTURAL_SHIFTS.map((c, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{c}</p>
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

        <RelatedPages slug="pm-experimentation-culture" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Experimentation Skills Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on hypothesis design, experiment metrics, and ship-and-learn thinking.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
