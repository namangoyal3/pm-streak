import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Remote Interview Guide (2026) — How to Crack Video PM Interviews",
  description:
    "How to crack remote PM interviews on video. Setup, body language, handling silence, timezone handling, and the technical preparation that separates strong remote candidates.",
  keywords: [
    "PM remote interview", "PM video interview",
    "remote PM interview tips", "Zoom PM interview",
    "async PM interview 2026",
  ],
  alternates: { canonical: "/pm-remote-interview" },
  openGraph: {
    title: "PM Remote Interview Guide 2026 — PM Streak",
    description: "How to crack video PM interviews — setup, body language, and technical prep.",
    url: `${SITE_URL}/pm-remote-interview`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Remote+Interview+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Remote Interview Guide 2026 — PM Streak",
    description: "How to crack video PM interviews — setup, body language, and technical prep.",
    images: [`${SITE_URL}/api/og?title=PM+Remote+Interview+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const SETUP = [
  { item: "Camera at eye level", detail: "Stack books if needed. Camera below eye line makes you look tired; above makes you look small. Eye level = natural and engaged." },
  { item: "Lighting facing you, not behind", detail: "A window or lamp facing your face. Backlighting makes you a silhouette — immediate strike." },
  { item: "Wired or strong WiFi", detail: "Connection drops mid-interview kill momentum. Test 2 days before on the same network you&apos;ll use." },
  { item: "Good external mic if possible", detail: "Audio matters more than video. Laptop mics pick up echo; a ₹2K USB mic changes perception dramatically." },
  { item: "Clean, simple background", detail: "Blurred backgrounds are fine but can lag on weak hardware. A genuine clean background (plain wall, few books) is safest." },
  { item: "Close all distracting apps", detail: "Notifications during an interview are a credibility hit. Full-screen Zoom; silence everything else." },
];

const BODY_LANGUAGE = [
  "Look at the camera, not the screen — it creates eye contact for the interviewer",
  "Nod slightly when interviewer is speaking — shows engagement on video",
  "Keep hands visible when gesturing — grounds your voice with visual energy",
  "Don&apos;t fill silence with &apos;um&apos; — silence on video is less awkward than it feels to you",
  "Smile occasionally, not constantly — natural warmth beats performed cheer",
  "Sit slightly forward in your chair — signals engagement, avoids slouching",
];

const TECHNIQUES = [
  { technique: "Take notes visibly", detail: "Let the interviewer see you writing down their question. Signals you&apos;re taking it seriously, not just reacting." },
  { technique: "Pause before answering", detail: "A 3-second pause feels long to you but natural to the interviewer. Pausing signals thought; snapping back signals canned answers." },
  { technique: "Use the chat for links", detail: "If relevant, share your portfolio/github/case study link in chat. Shows you&apos;ve prepared artefacts to reference." },
  { technique: "Ask clarifying questions early", detail: "In remote interviews, you can&apos;t read body language as well. Get clarification early to avoid long answers in the wrong direction." },
  { technique: "Have notes on screen for behavioural", detail: "Not to read from — as a fallback if you freeze. A bullet list of your STAR stories is safe to have open in a second window." },
  { technique: "Record a practice run", detail: "Record yourself answering a practice question on Zoom. Watch back. You&apos;ll catch 10 things that are invisible without the recording." },
];

const TIMEZONE = [
  "Confirm the timezone in writing before the interview — US companies default to PT; India defaults to IST; confusion is common",
  "Convert explicitly in your calendar — never rely on mental conversion day-of",
  "Test your setup 24 hours before — not 30 minutes before",
  "Log in 5 minutes early; don&apos;t hang in the Zoom waiting room for 20 minutes stressed",
  "If interviewing across a large time gap (India ↔ US), don&apos;t take 3 interviews in a row — fatigue shows on video",
];

const FAQS = [
  {
    q: "Are remote PM interviews easier or harder than in-person?",
    a: "Different, not universally harder. Remote strips away some non-verbal signal — both good (your hesitation is less visible) and bad (your enthusiasm is harder to convey). Best remote candidates over-index on audio clarity, structured thinking, and concise answers. The biggest risk is technical failures; prepare for them before they happen.",
  },
  {
    q: "Should I dress formally for a remote PM interview?",
    a: "Match the company culture. For a startup: polished casual (a clean collared shirt, no logos). For a traditional company: business casual. Avoid: bold patterns (they strobe on camera), very bright colours, logos. The top half is what matters — wear whatever you want below the desk.",
  },
  {
    q: "How do I handle technical issues mid-interview?",
    a: "Stay calm and specific. &apos;Sorry, my video cut out for 10 seconds — could you repeat the last question?&apos; is totally fine. What kills candidates is flailing or pretending the glitch didn&apos;t happen. Interviewers understand remote issues; how you handle them tells them more than avoiding them.",
  },
];

export default function PmRemoteInterviewPage() {
  const dates = pageDates("/pm-remote-interview");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Remote Interview", url: `${SITE_URL}/pm-remote-interview` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Remote Interview Guide (2026 Edition)",
        description:
          "How to crack remote PM interviews on video. Setup, body language, handling silence, timezone handling, and the technical preparation that separates strong remote candidates.",
        image: `${SITE_URL}/api/og?title=PM+Remote+Interview+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-remote-interview`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📹</span> Remote interviews are won on setup and structure
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Remote Interview Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Remote PM interviews aren&apos;t universally harder than in-person ones — they
            strip away some non-verbal signal, which masks hesitation but also makes
            enthusiasm harder to convey. Success rests on four pillars: a six-point setup
            checklist (eye-level camera, front-facing light, stable connection, external mic),
            six body-language habits like camera eye contact and pausing before answering, six
            remote-specific techniques such as visible note-taking, and five timezone
            safeguards against last-minute confusion.
          </p>
          <p className="text-sm text-white/50 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 setup essentials, 6 body language cues, 6 remote-specific techniques,
            and how to handle timezone gaps without losing momentum.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice PM Interviews Daily — Free →
          </Link>
        </section>

        {/* Setup */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Setup Essentials</h2>
          <div className="space-y-3">
            {SETUP.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-white text-sm mb-1">{i + 1}. {s.item}</p>
                <p className="text-xs text-white/60">{s.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Body language */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Body Language Cues</h2>
            <div className="space-y-2">
              {BODY_LANGUAGE.map((b, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Techniques */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Remote-Specific Techniques</h2>
          <div className="space-y-3">
            {TECHNIQUES.map((t, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-white text-sm mb-1">{i + 1}. {t.technique}</p>
                <p className="text-xs text-white/60">{t.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Timezone */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Timezone &amp; Logistics Tips</h2>
            <div className="space-y-2">
              {TIMEZONE.map((t, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{t}</p>
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

        <RelatedPages slug="pm-remote-interview" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Remote Interviews Daily</h2>
          <p className="text-white/60 mb-6">AI-graded PM scenarios — the ideal way to rehearse video interview answers.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
