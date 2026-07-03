import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Notifications Design (2026) — Notifications That Help Users, Not Annoy Them",
  description:
    "How PMs design notification systems that drive return visits without triggering uninstalls. Content, timing, frequency, and the ethical line.",
  keywords: [
    "PM notifications design", "push notification PM",
    "notification strategy PM", "engagement PM",
    "notification UX 2026",
  ],
  alternates: { canonical: "/pm-notifications-design" },
  openGraph: {
    title: "PM Notifications Design 2026 — PM Streak",
    description: "How PMs design notifications that help users — not annoy them into uninstalls.",
    url: `${SITE_URL}/pm-notifications-design`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Notifications+Design+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Notifications Design 2026 — PM Streak",
    description: "How PMs design notifications that help users — not annoy them into uninstalls.",
    images: [`${SITE_URL}/api/og?title=PM+Notifications+Design+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DIMENSIONS = [
  { dim: "Content", what: "Specific benefit, not vague nudge. &apos;Your lesson is ready&apos; &gt; &apos;Come back!&apos;" },
  { dim: "Timing", what: "Match user&apos;s natural rhythm — mornings for commuters, evenings for leisure apps" },
  { dim: "Frequency", what: "Max 1 per day for most apps. Over-notifying triggers disable/uninstall" },
  { dim: "Personalisation", what: "Segment-based timing and content. Power users tolerate more; new users need less" },
  { dim: "Channel", what: "Push, email, in-app, SMS — each has different intensity. Match to urgency" },
  { dim: "User control", what: "Easy to adjust preferences. Fine-grained opt-outs reduce mass disable" },
];

const WHAT_WORKS = [
  "Highly specific notifications — &apos;Priya sent you a message&apos; &gt; &apos;New activity&apos;",
  "Time-aware — send when user is likely to act, not when convenient for you",
  "Value-forward — the notification itself delivers value, not just a nudge",
  "Frequency caps — per day, per channel, with respect for user preferences",
  "Different tiers for different users — new, engaged, lapsed each get different treatment",
];

const WHAT_BACKFIRES = [
  "Vague notifications (&apos;You&apos;ve got a surprise!&apos;) — feel spammy",
  "Over-frequent notifications — trains users to ignore or disable",
  "Manipulative urgency (&apos;Last chance!&apos; for things that aren&apos;t) — erodes trust",
  "Notifications without deep links — opening app and searching is friction",
  "Same notification to everyone — ignores segmentation entirely",
  "No unsubscribe or fine-grained control — users disable everything instead of tuning",
];

const METRICS = [
  "Open rate — % of users who tap the notification",
  "Action rate — % who complete the intended action after opening",
  "Disable rate — % of users who disable notifications after receiving",
  "Uninstall correlation — do notifications precede uninstall spikes?",
  "Long-term retention — notifications that boost DAU but hurt D30 are net negative",
];

const FAQS = [
  {
    q: "How many notifications per day is too many?",
    a: "For most consumer products, 1–2 per day is sustainable. 3+ per day starts driving disable rates meaningfully. Messaging products (WhatsApp) can send many more because each is directly valuable. Generic engagement products (social, content) should be conservative — trust lost via spam takes months to recover.",
  },
  {
    q: "What&apos;s the biggest notification design mistake?",
    a: "Optimising for short-term open rates instead of long-term engagement. Manipulative notifications drive clicks today but disable rates tomorrow. The PMs who measure &apos;D30 retention&apos; alongside &apos;notification open rate&apos; make better long-term calls. Short-term engagement metrics can hide long-term damage.",
  },
];

export default function PmNotificationsDesignPage() {
  const dates = pageDates("/pm-notifications-design");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Notifications Design", url: `${SITE_URL}/pm-notifications-design` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Notifications Design (2026 Edition)",
        description:
          "How PMs design notification systems that drive return visits without triggering uninstalls. Content, timing, frequency, and the ethical line.",
        image: `${SITE_URL}/api/og?title=PM+Notifications+Design+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-notifications-design`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔔</span> Notifications can build trust or burn it. Rarely both.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Notifications Design<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Good PM notification design balances six dimensions — content specificity, timing, frequency, personalisation, channel choice, and user control — and succeeds when notifications stay specific, time-aware, and capped at roughly one per day, while it backfires when messages turn vague, over-frequent, or manipulative; the real test isn&apos;t open rate but whether disable rates and D30 retention stay healthy afterward.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 dimensions of notification design, 5 things that work, 6 things that backfire,
            and 5 metrics to track beyond open rate.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Engagement Skills Daily — Free →
          </Link>
        </section>

        {/* Dimensions */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Dimensions of Notification Design</h2>
          <div className="space-y-3">
            {DIMENSIONS.map((d, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-white text-sm mb-1">{i + 1}. {d.dim}</p>
                <p className="text-xs text-white/60">{d.what}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What works */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Things That Work</h2>
            <div className="space-y-2">
              {WHAT_WORKS.map((w, i) => (
                <div key={i} className="bg-[#111] border border-green-500/20 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <p className="text-sm text-white/70">{w}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Backfires */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Things That Backfire</h2>
          <div className="space-y-2">
            {WHAT_BACKFIRES.map((w, i) => (
              <div key={i} className="bg-[#111] border border-red-500/20 rounded-xl p-3 flex gap-3">
                <span className="text-red-400 flex-shrink-0">❌</span>
                <p className="text-sm text-white/70">{w}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Metrics */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Metrics Beyond Open Rate</h2>
            <div className="space-y-2">
              {METRICS.map((m, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
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

        <RelatedPages slug="pm-notifications-design" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Engagement Design Skills Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on notifications, habit loops, and ethical engagement.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
