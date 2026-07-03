import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Communication Skills (2026) — How Great PMs Communicate",
  description:
    "The communication skills that separate great PMs from average ones. Presenting to executives, leading meetings, async writing, giving hard feedback, and public speaking.",
  keywords: [
    "PM communication skills", "product manager communication",
    "how PMs present to executives", "PM meeting skills",
    "async communication PM", "PM public speaking 2026",
  ],
  alternates: { canonical: "/pm-communication-skills" },
  openGraph: {
    title: "PM Communication Skills 2026 — PM Streak",
    description: "How great PMs communicate — executive presentations, meetings, async, and feedback.",
    url: `${SITE_URL}/pm-communication-skills`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Communication+Skills+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Communication Skills 2026 — PM Streak",
    description: "How great PMs communicate — executive presentations, meetings, async, and feedback.",
    images: [`${SITE_URL}/api/og?title=PM+Communication+Skills+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const COMMUNICATION_CHANNELS = [
  {
    channel: "Executive Presentations",
    goal: "Persuade in minutes, not hours",
    rules: ["Lead with recommendation, not context", "Use one number per slide — not ten", "Prepare to answer the unasked question: &apos;what do you need from me?&apos;", "Know your 2-minute, 5-minute, and 15-minute versions of the same story"],
  },
  {
    channel: "Team Meetings",
    goal: "Align, decide, or inform — not update",
    rules: ["State the purpose of the meeting in the first 30 seconds", "Start with the decision you need, not the background", "Send a pre-read for anything complex — don&apos;t waste meeting time on context", "End with a recap: decisions, owners, deadlines"],
  },
  {
    channel: "Async Written Updates",
    goal: "Keep stakeholders informed without stealing their time",
    rules: ["Headline the status first: green, yellow, or red", "3 bullets: what moved, what&apos;s blocked, what&apos;s next", "Include metrics, not adjectives", "Send on a predictable cadence — people should expect it"],
  },
  {
    channel: "1:1s with Manager",
    goal: "Build alignment, get support, surface risks early",
    rules: ["Drive the agenda — don&apos;t let it be a status update", "Bring 1 hard problem you want advice on", "Proactively surface risks — don&apos;t let them find out later", "Ask for feedback at every 1:1 — small bites build a picture"],
  },
  {
    channel: "Giving Hard Feedback",
    goal: "Improve behaviour without destroying the relationship",
    rules: ["Use SBI: Situation, Behaviour, Impact", "Be specific: &apos;In yesterday&apos;s meeting...&apos;, not &apos;You always...&apos;", "Focus on behaviour, not character", "End with a forward-looking ask: &apos;Next time, could you...&apos;"],
  },
  {
    channel: "Public Speaking / Conference Talks",
    goal: "Build external credibility that compounds",
    rules: ["Prepare one strong POV — not a feature dump", "Tell stories, not just data — audiences remember narratives", "Practise out loud 10+ times — not in your head", "End with something memorable — a question, a challenge, a concrete next step"],
  },
];

const COMMON_MISTAKES = [
  { mistake: "Leading with context instead of answer", fix: "Start with the takeaway. Context comes after, for those who want it." },
  { mistake: "Using adjectives instead of numbers", fix: "&apos;Retention improved significantly&apos; → &apos;Retention improved from 22% to 28%.&apos;" },
  { mistake: "Filling silence after an ask", fix: "After you ask, let the silence hang. The other person will respond — often with more than you&apos;d have asked for." },
  { mistake: "Hedging when you&apos;re confident", fix: "&apos;I think maybe we could potentially consider...&apos; → &apos;I recommend we ship by Friday.&apos; Directness signals conviction." },
  { mistake: "Over-apologising", fix: "Every &apos;sorry to bother&apos; in an email is a concession. Respectful directness beats excessive deference." },
  { mistake: "Mismatching audience", fix: "Exec presentation ≠ engineering sync. Match density, tone, and detail to the audience. Nothing loses more credibility than a hour-long slides-laden exec presentation on a technical issue." },
];

const FAQS = [
  {
    q: "How important is communication vs technical skill for PM success?",
    a: "At junior levels: roughly equal — you need both. At senior levels: communication becomes 60%+ of the job. Senior PMs don&apos;t ship products directly; they influence teams to ship through clarity of thought and communication. PMs who neglect communication in their first 3 years hit a ceiling at Senior PM — it&apos;s the most common reason for stuck careers.",
  },
  {
    q: "How do you improve PM communication deliberately?",
    a: "Three habits compound: (1) write publicly — blog, LinkedIn, or internal docs — and get feedback, (2) record yourself presenting and watch it back once a month (excruciating but the fastest way to improve), (3) study great communicators — Shreyas Doshi, Jeff Weiner, Satya Nadella — and steal structures. Reading about communication without practising doesn&apos;t move the needle.",
  },
  {
    q: "Should PMs work on public speaking specifically?",
    a: "Yes — at senior levels it&apos;s nearly mandatory. Senior PMs present to exec teams, lead large stakeholder meetings, and increasingly speak at conferences. Public speaking skills transfer to every communication context. The fastest improvement path: Toastmasters, improv classes, or internal speaking opportunities (demos, lunch-and-learns). All three force reps in low-stakes settings.",
  },
];

export default function PmCommunicationSkillsPage() {
  const dates = pageDates("/pm-communication-skills");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Communication Skills", url: `${SITE_URL}/pm-communication-skills` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Communication Skills (2026 Edition)",
        description:
          "The communication skills that separate great PMs from average ones. Presenting to executives, leading meetings, async writing, giving hard feedback, and public speaking.",
        image: `${SITE_URL}/api/og?title=PM+Communication+Skills+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-communication-skills`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🎤</span> Great ideas die from bad communication every day
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Communication Skills<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            This guide treats PM communication as six distinct channels — executive presentations, team meetings, async
            written updates, manager 1:1s, hard feedback, and public speaking — since each demands its own rules, from
            leading a deck with the recommendation to using SBI (situation, behaviour, impact) for feedback. Skipping the
            six mistakes below it, like leading with context instead of the takeaway, is what keeps a PM from sounding junior.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The 6 communication channels PMs must master, rules for each,
            and the 6 mistakes that make average PMs feel junior.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice PM Communication Daily — Free →
          </Link>
        </section>

        {/* Channels */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Communication Channels to Master</h2>
          <div className="space-y-5">
            {COMMUNICATION_CHANNELS.map((c, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <p className="font-bold text-white mb-1">{i + 1}. {c.channel}</p>
                <p className="text-sm text-[#89e219] mb-3">🎯 Goal: {c.goal}</p>
                <ul className="space-y-1">
                  {c.rules.map((r, j) => (
                    <li key={j} className="flex gap-2 text-sm">
                      <span className="text-white/30 flex-shrink-0">→</span>
                      <span className="text-white/70">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Mistakes */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Communication Mistakes to Avoid</h2>
            <div className="space-y-3">
              {COMMON_MISTAKES.map((m, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <div className="flex gap-3 items-start">
                    <span className="text-red-400 text-sm flex-shrink-0 mt-0.5">❌</span>
                    <div>
                      <p className="text-sm text-white/70 mb-1">{m.mistake}</p>
                      <p className="text-sm text-green-400">→ {m.fix}</p>
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

        <RelatedPages slug="pm-communication-skills" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Communication Muscle Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on presenting, writing, and giving feedback — with AI feedback.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
