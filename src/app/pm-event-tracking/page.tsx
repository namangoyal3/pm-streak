import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Event Tracking (2026) — How to Design Instrumentation That Answers Real Questions",
  description:
    "How PMs design event tracking that answers the questions they&apos;ll want to ask. Naming conventions, property design, and building a tracking plan before shipping.",
  keywords: [
    "PM event tracking", "tracking plan PM",
    "product instrumentation", "event naming PM",
    "analytics events 2026",
  ],
  alternates: { canonical: "/pm-event-tracking" },
  openGraph: {
    title: "PM Event Tracking 2026 — PM Streak",
    description: "How PMs design tracking plans that answer real questions — naming, properties, governance.",
    url: `${SITE_URL}/pm-event-tracking`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Event+Tracking+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Event Tracking 2026 — PM Streak",
    description: "How PMs design tracking plans that answer real questions — naming, properties, governance.",
    images: [`${SITE_URL}/api/og?title=PM+Event+Tracking+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DESIGN_PRINCIPLES = [
  "Start from the questions — what will you need to answer about this feature?",
  "Name events consistently — &apos;verb_noun&apos; like &apos;lesson_completed&apos;, &apos;payment_attempted&apos;",
  "Include enough properties to segment later — user_id, timestamp, plus 3–5 relevant dimensions",
  "Don&apos;t over-track — 100 events for one feature means no one will use them",
  "Track at points of user intent, not clicks — clicks are noise; intent is signal",
  "Document the tracking plan — searchable doc so you and others know what exists",
];

const EVENT_ANATOMY = [
  { component: "Event name", example: "&apos;lesson_completed&apos;", guidance: "verb_noun, past tense, lowercase with underscores" },
  { component: "User ID", example: "user_abc123", guidance: "Always include. Primary key for joining." },
  { component: "Timestamp", example: "2026-04-14T10:30:00Z", guidance: "Server-side preferred; client-side can drift." },
  { component: "Properties", example: "{lesson_id, duration_seconds, streak_day}", guidance: "Only include what you&apos;ll actually segment by. Avoid PII unless necessary." },
  { component: "Session / context", example: "{session_id, platform, app_version}", guidance: "Enables debugging and cross-session analysis." },
];

const COMMON_MISTAKES = [
  "Inconsistent naming — &apos;lesson_completed&apos; vs &apos;LessonComplete&apos; vs &apos;lessonDone&apos;",
  "Shipping features without tracking — &apos;we&apos;ll add it later&apos; rarely happens",
  "Over-tracking every click — creates noise that buries real signal",
  "Not tracking failure cases — only happy-path events mean you can&apos;t diagnose issues",
  "PII in properties — compliance risk and most analytics tools restrict this",
  "No tracking plan doc — tribal knowledge disappears with team turnover",
];

const WHEN_TO_INSTRUMENT = [
  "Before shipping a feature, never after — retrofitting is expensive and incomplete",
  "For every PRD, include the tracking plan — treat it as a deliverable, not an afterthought",
  "When defining success metrics, make sure the events to measure them exist",
  "When users complain, check if you have the tracking to diagnose — often the answer is no",
  "Annually — audit and deprecate stale events; keep tracking plan lean",
];

const FAQS = [
  {
    q: "Who should own event tracking — PM or engineering?",
    a: "PM owns the tracking plan; engineering implements it. The PM knows which questions will need answering; engineering knows how to instrument reliably. Joint ownership means neither side can ship without the other signing off. PMs who think &apos;tracking is engineering&apos;s job&apos; end up with broken instrumentation.",
  },
  {
    q: "What&apos;s the biggest event tracking mistake PMs make?",
    a: "Shipping without a tracking plan. Retrofitting events after launch takes 3–5x the effort AND you miss data for the weeks before instrumentation. The discipline: every PRD includes events + properties + sample queries. No tracking plan = no launch.",
  },
];

export default function PmEventTrackingPage() {
  const dates = pageDates("/pm-event-tracking");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Event Tracking", url: `${SITE_URL}/pm-event-tracking` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Event Tracking Guide (2026 Edition)",
        description:
          "How PMs design event tracking that answers the questions they&apos;ll want to ask. Naming conventions, property design, and building a tracking plan before shipping.",
        image: `${SITE_URL}/api/og?title=PM+Event+Tracking+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-event-tracking`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📏</span> Bad tracking = PMs guessing. Good tracking = PMs deciding.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Event Tracking Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Good event tracking starts from the questions a PM will need answered, then names each event consistently (verb_noun, like lesson_completed) and attaches a user ID, timestamp, and three-to-five properties worth segmenting by — never more, since over-tracking every click buries the signal. Skipping this before launch is costly: retrofitting instrumentation after shipping takes three to five times the effort and loses the pre-launch data entirely.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 design principles, 5 parts of a well-designed event, 6 common mistakes,
            and 5 moments to instrument or audit.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Data Skills Daily — Free →
          </Link>
        </section>

        {/* Principles */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Design Principles</h2>
          <div className="space-y-2">
            {DESIGN_PRINCIPLES.map((d, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Anatomy */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">Anatomy of a Well-Designed Event</h2>
            <div className="space-y-3">
              {EVENT_ANATOMY.map((e, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-white text-sm mb-1">{e.component}</p>
                  <p className="text-xs text-[#89e219] font-mono mb-1">{e.example}</p>
                  <p className="text-xs text-white/60">{e.guidance}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mistakes */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Common Mistakes</h2>
          <div className="space-y-2">
            {COMMON_MISTAKES.map((m, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-red-400 flex-shrink-0">❌</span>
                <p className="text-sm text-white/70">{m}</p>
              </div>
            ))}
          </div>
        </section>

        {/* When */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Moments to Instrument</h2>
            <div className="space-y-2">
              {WHEN_TO_INSTRUMENT.map((w, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
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

        <RelatedPages slug="pm-event-tracking" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Data Skills Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on tracking design, event planning, and data-driven decisions.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
