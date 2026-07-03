import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Retrospectives Guide (2026) — How to Run Retros That Actually Improve Things",
  description:
    "How PMs run retrospectives that change behaviour. Structure, facilitation, action items that get followed up, and why most retros are theatre.",
  keywords: [
    "PM retrospectives", "PM retro template",
    "sprint retro PM", "launch retrospective PM",
    "blameless postmortem 2026",
  ],
  alternates: { canonical: "/pm-retrospectives" },
  openGraph: {
    title: "PM Retrospectives Guide 2026 — PM Streak",
    description: "How PMs run retros that actually improve things — structure, facilitation, action follow-up.",
    url: `${SITE_URL}/pm-retrospectives`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Retrospectives+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Retrospectives Guide 2026 — PM Streak",
    description: "How PMs run retros that actually improve things — structure, facilitation, action follow-up.",
    images: [`${SITE_URL}/api/og?title=PM+Retrospectives+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const RETRO_TYPES = [
  { type: "Sprint retro", frequency: "Every 1–2 weeks", focus: "Process improvements, what went well, what to change" },
  { type: "Launch retro", frequency: "After every meaningful launch", focus: "What worked, what didn&apos;t, what to do differently next time" },
  { type: "Post-mortem (blameless)", frequency: "After incidents or failures", focus: "Root cause analysis, system fixes, prevention measures" },
  { type: "Quarterly retro", frequency: "End of each quarter", focus: "Strategic review — did we achieve what we set out to?" },
  { type: "Personal retro", frequency: "Weekly", focus: "Individual reflection on what you learned, what to do differently" },
];

const STRUCTURE = [
  { step: "Set the frame (2 min)", what: "This is blameless. We&apos;re here to improve, not blame." },
  { step: "Review data (5 min)", what: "Metrics, timeline, what happened — share same facts with everyone" },
  { step: "What went well (10 min)", what: "Celebrate wins. Prevents retros from feeling purely negative." },
  { step: "What could improve (15 min)", what: "Specific issues, not vague &apos;process.&apos; Root causes, not symptoms." },
  { step: "Action items (10 min)", what: "Each action gets an owner + deadline. Without both, nothing happens." },
  { step: "Follow-up next retro (3 min)", what: "Review previous retro&apos;s action items — did we follow through?" },
];

const FACILITATION = [
  "Use a shared doc so everyone sees the same thing",
  "Time-box ruthlessly — retros that run long lose energy",
  "Surface quiet voices — often the best insights come from junior team members",
  "Distinguish &apos;feedback&apos; from &apos;venting&apos; — venting is fine for 2 min, then move to action",
  "Never rehash old grievances — &apos;why was X decided&apos; is not a retro topic",
  "End with commitments, not just observations",
];

const MISTAKES = [
  "Blame instead of system thinking — &apos;Priya missed the deadline&apos; vs &apos;our estimation process produces unrealistic timelines&apos;",
  "Action items with no owner — &apos;we should&apos; never happens",
  "Never following up on prior retros — signals retros don&apos;t matter",
  "Same complaints every retro — means you&apos;re venting, not fixing",
  "PM dominates the conversation — retros are team events, not PM monologues",
  "Retros that run only when things go wrong — wins need examination too",
];

const FAQS = [
  {
    q: "How often should PMs run retros?",
    a: "Sprint retros every 1–2 weeks. Launch retros after each meaningful launch. Post-mortems after incidents. Quarterly retros for strategic reviews. Personal retros weekly. More than that overwhelms teams; less leaves gaps that compound. The biggest retro sin: skipping them when you&apos;re busy — that&apos;s when you most need them.",
  },
  {
    q: "Why do most retros feel like theatre?",
    a: "Action items don&apos;t get followed up. Teams identify good improvements, write them down, then never revisit. The fix: start each retro by reviewing last retro&apos;s action items. If you can&apos;t point to changes you actually made, retros stop being useful and become ritual. Follow-through is the whole game.",
  },
];

export default function PmRetrospectivesPage() {
  const dates = pageDates("/pm-retrospectives");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Retrospectives", url: `${SITE_URL}/pm-retrospectives` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Retrospectives Guide (2026 Edition)",
        description:
          "How PMs run retrospectives that change behaviour. Structure, facilitation, action items that get followed up, and why most retros are theatre.",
        image: `${SITE_URL}/api/og?title=PM+Retrospectives+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-retrospectives`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔄</span> Most retros are theatre. Great ones change behaviour.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Retrospectives Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Good PM retrospectives — whether sprint, launch, post-mortem, quarterly, or personal — follow a
            six-step arc: set a blameless frame, review shared data, name what went well, dig into what
            could improve, assign action items with an owner and deadline, then open the next retro by
            checking whether those actions actually happened. Skip that last step and a retro becomes
            theatre — good ideas written down and never revisited.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 retro types, 6-step structure, 6 facilitation rules, and 6 mistakes that make retros pointless.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Reflection Habit Daily — Free →
          </Link>
        </section>

        {/* Types */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Types of PM Retrospectives</h2>
          <div className="space-y-3">
            {RETRO_TYPES.map((r, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                  <p className="font-semibold text-white text-sm">{r.type}</p>
                  <span className="text-xs bg-[#58cc02]/20 text-[#89e219] px-2 py-0.5 rounded-full">{r.frequency}</span>
                </div>
                <p className="text-xs text-white/60">{r.focus}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Structure */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6-Step Retro Structure</h2>
            <div className="space-y-3">
              {STRUCTURE.map((s, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-white text-sm mb-1">{i + 1}. {s.step}</p>
                  <p className="text-xs text-white/60">{s.what}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Facilitation */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Facilitation Rules</h2>
          <div className="space-y-2">
            {FACILITATION.map((f, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{f}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mistakes */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Retro Mistakes</h2>
            <div className="space-y-2">
              {MISTAKES.map((m, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-red-400 flex-shrink-0">❌</span>
                  <p className="text-sm text-white/70">{m}</p>
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

        <RelatedPages slug="pm-retrospectives" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Reflection Habit Daily</h2>
          <p className="text-white/60 mb-6">2-minute daily reflection + weekly retros = the habit loop that compounds.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
