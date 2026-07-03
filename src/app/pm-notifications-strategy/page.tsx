import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Notifications Strategy (2026) — Push, Email, In-App Done Right",
  description:
    "How PMs design notification systems that drive retention without burning trust. Push, email, in-app, SMS — when to use each and how to measure.",
  keywords: [
    "PM notifications", "push notification strategy",
    "notification PM", "retention notifications 2026",
  ],
  alternates: { canonical: "/pm-notifications-strategy" },
  openGraph: {
    title: "PM Notifications Strategy 2026 — PM Streak",
    description: "Push, email, in-app, SMS — how PMs design notification systems.",
    url: `${SITE_URL}/pm-notifications-strategy`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Notifications+Strategy+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Notifications Strategy 2026 — PM Streak",
    description: "Push, email, in-app, SMS — how PMs design notification systems.",
    images: [`${SITE_URL}/api/og?title=PM+Notifications+Strategy+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const CHANNELS = [
  { ch: "Push", use: "Time-sensitive, personal, action-required. Low volume or users disable." },
  { ch: "Email", use: "Digest, receipts, longer content. Forgiving on volume but trust burns slow." },
  { ch: "In-app", use: "Contextual nudges when user is already engaged. Highest conversion." },
  { ch: "SMS", use: "Critical transactional only — OTPs, deliveries. Never marketing." },
  { ch: "WhatsApp", use: "India-heavy consumer products. High open rates but regulatory constraints." },
];

const PRINCIPLES = [
  "Every notification must earn its send — if it doesn&apos;t drive a meaningful action, don&apos;t send",
  "Frequency caps at user level — not campaign level",
  "Personalisation &gt; broadcast — relevant-to-me beats clever-copy",
  "Quiet hours respected — no pushes at 2am unless truly urgent",
  "Unsubscribe should be one tap — friction breeds resentment",
  "Measure downstream, not just CTR — did the notification lead to retention?",
];

const FAQS = [
  {
    q: "What&apos;s a healthy push opt-in rate?",
    a: "Consumer apps: 40–60% on iOS, 80%+ on Android (auto-granted on older versions). If opt-in is below 30%, your permission prompt is wrong — you&apos;re asking too early or without context on why it matters.",
  },
  {
    q: "How many pushes per week is too many?",
    a: "Depends on product category. News/social: daily is fine. Most consumer apps: 2–4 per week maximum before uninstall risk spikes. B2B: 1–2 per week. Track uninstall rate by push frequency cohort — the data will tell you your threshold.",
  },
];

export default function PmNotificationsStrategyPage() {
  const dates = pageDates("/pm-notifications-strategy");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Notifications Strategy", url: `${SITE_URL}/pm-notifications-strategy` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Notifications Strategy (2026 Edition)",
        description:
          "How PMs design notification systems that drive retention without burning trust. Push, email, in-app, SMS — when to use each and how to measure.",
        image: `${SITE_URL}/api/og?title=PM+Notifications+Strategy+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-notifications-strategy`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔔</span> Every notification is a withdrawal from the trust bank
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Notifications Strategy<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            A sound notifications strategy treats push, email, in-app, SMS, and WhatsApp as different tools for different urgency levels — SMS for critical transactional only, in-app for the highest-converting contextual nudges — governed by frequency caps per user, quiet hours, and one-tap unsubscribe, with most consumer apps topping out around 2–4 pushes a week before uninstalls spike.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 channels compared and 6 principles that separate thoughtful notification PMs from spam.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice Notification Design — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Channels</h2>
          <div className="space-y-3">
            {CHANNELS.map((c, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-[#89e219] text-sm mb-1">{c.ch}</p>
                <p className="text-xs text-white/60">{c.use}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Principles</h2>
            <div className="space-y-2">
              {PRINCIPLES.map((p, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{p}</p>
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

        <RelatedPages slug="pm-notifications-strategy" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Notification PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
