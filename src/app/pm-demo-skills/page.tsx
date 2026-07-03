import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Demo Skills Guide (2026) — How to Present Products That Land",
  description:
    "How PMs give demos that convert. Structure, storytelling, live demo traps, and what executives actually pay attention to.",
  keywords: [
    "PM demo skills", "product demo presentation",
    "how to demo a product PM", "sales demo PM",
    "exec demo PM 2026",
  ],
  alternates: { canonical: "/pm-demo-skills" },
  openGraph: {
    title: "PM Demo Skills Guide 2026 — PM Streak",
    description: "How PMs give demos that land — structure, storytelling, and live demo traps.",
    url: `${SITE_URL}/pm-demo-skills`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Demo+Skills+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Demo Skills Guide 2026 — PM Streak",
    description: "How PMs give demos that land — structure, storytelling, and live demo traps.",
    images: [`${SITE_URL}/api/og?title=PM+Demo+Skills+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const STRUCTURE = [
  { part: "Hook (30 sec)", what: "Open with the problem or user — not the feature. Get the audience leaning in." },
  { part: "Context (1 min)", what: "Who this is for, why now, what&apos;s changed. Sets up why to care." },
  { part: "Live demo (3–4 min)", what: "Show the happy path end-to-end. ONE clear moment where the value lands." },
  { part: "Impact framing (1 min)", what: "Metric it moves, user quote, business outcome. Numbers with context." },
  { part: "What&apos;s next (30 sec)", what: "Honest: what&apos;s coming, what we&apos;re investigating, what we&apos;re deprioritising." },
  { part: "Q&amp;A handoff (remainder)", what: "Turn it into a conversation — your audience&apos;s questions are data." },
];

const STORYTELLING_MOVES = [
  "Start with a specific user (Priya, 32) — not &apos;our users&apos;",
  "Show the &apos;before state&apos; painfully — then the demo lands harder",
  "Narrate what you&apos;re doing as you do it — don&apos;t demo in silence",
  "Pause for reactions — silence signals you care about the audience",
  "Use one metric for impact — not five. One specific number is memorable",
  "End with one takeaway the audience can repeat verbatim",
];

const LIVE_DEMO_TRAPS = [
  "Demo fails live — always have a 60-second video fallback ready",
  "Slow internet — pre-load all pages, use local data if possible",
  "Unfamiliar hardware — test your demo on the actual device/projector beforehand",
  "&apos;Let me find that one feature...&apos; — rehearse until navigation is automatic",
  "Getting derailed by questions mid-demo — park them, finish the demo, return to questions",
  "Over-demoing — showing 10 features dilutes attention. Show 1 really well",
];

const FAQS = [
  {
    q: "Should PMs give demos or leave that to sales?",
    a: "Both. PMs demo internally (leadership, cross-functional teams, board meetings) and to key customers during discovery or high-value accounts. Sales demos at scale. PMs who can&apos;t demo their own product well signal weakness — it&apos;s your product, you should be the best person to show it off.",
  },
  {
    q: "What&apos;s the biggest demo mistake PMs make?",
    a: "Leading with features instead of users. &apos;We built a new dashboard with 6 charts&apos; is boring. &apos;Priya was missing 3 hours/week reconciling reports. Now she doesn&apos;t — watch how.&apos; The demo is the same; the framing completely different. Audiences care about users and outcomes, not your architecture.",
  },
];

export default function PmDemoSkillsPage() {
  const dates = pageDates("/pm-demo-skills");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Demo Skills", url: `${SITE_URL}/pm-demo-skills` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Demo Skills Guide (2026 Edition)",
        description:
          "How PMs give demos that convert. Structure, storytelling, live demo traps, and what executives actually pay attention to.",
        image: `${SITE_URL}/api/og?title=PM+Demo+Skills+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-demo-skills`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🎬</span> A great demo makes people remember the product. A bad one makes them forget it.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Demo Skills Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            A PM demo that lands runs about six minutes across six parts: a hook on the problem,
            brief context, a focused live walkthrough of the happy path, impact framing with one
            clear metric, an honest look at what&apos;s next, and a handoff to Q&amp;A. Demos
            that fail usually skip the user story for a feature dump, or get derailed by an
            unrehearsed live-demo trap like slow internet.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The 6-part demo structure, 6 storytelling moves, 6 live demo traps,
            and how to land with specificity instead of feature dumps.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Communication Daily — Free →
          </Link>
        </section>

        {/* Structure */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6-Part Demo Structure (~6 min total)</h2>
          <div className="space-y-3">
            {STRUCTURE.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-white text-sm mb-1">{i + 1}. {s.part}</p>
                <p className="text-xs text-white/60">{s.what}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Storytelling moves */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Storytelling Moves</h2>
            <div className="space-y-2">
              {STORYTELLING_MOVES.map((m, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{m}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live demo traps */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Live Demo Traps</h2>
          <div className="space-y-2">
            {LIVE_DEMO_TRAPS.map((t, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-red-400 flex-shrink-0">⚠️</span>
                <p className="text-sm text-white/70">{t}</p>
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

        <RelatedPages slug="pm-demo-skills" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Communication Muscle Daily</h2>
          <p className="text-white/60 mb-6">Scenarios that sharpen how you frame problems, users, and outcomes.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
