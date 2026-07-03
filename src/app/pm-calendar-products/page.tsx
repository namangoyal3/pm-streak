import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Calendar Products (2026) — Google Calendar, Cron, Motion PM Lessons",
  description:
    "How PMs build calendar products. Scheduling UX, availability sharing, AI-assisted scheduling, and why calendar is the hardest switch in productivity.",
  keywords: [
    "PM calendar products", "Cron calendar PM",
    "Motion PM", "scheduling 2026",
  ],
  alternates: { canonical: "/pm-calendar-products" },
  openGraph: {
    title: "PM Calendar Products 2026 — PM Streak",
    description: "How PMs build calendar products.",
    url: `${SITE_URL}/pm-calendar-products`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Calendar+Products+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Calendar Products 2026 — PM Streak",
    description: "How PMs build calendar products.",
    images: [`${SITE_URL}/api/og?title=PM+Calendar+Products+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Calendar is the hardest switch — users protect it more than email",
  "Availability sharing (Calendly, Cal.com) is the real new product — not calendar itself",
  "AI scheduling is promising but reliability bar is brutal",
  "Interop with Google, Microsoft, Apple is table stakes",
  "Mobile-first for consumer, desktop-first for work is the split",
];

const METRICS = [
  "Events created per active user",
  "Scheduling link adoption",
  "Median time-to-schedule",
  "AI-suggested-slot acceptance rate",
  "Sync error rate across calendars",
];

const FAQS = [
  {
    q: "Is there still room for new calendar products?",
    a: "Horizontal calendar — no. Google, Microsoft, Apple dominate. But scheduling, availability sharing, and AI-assisted time blocking have produced real companies (Calendly, Cal.com, Motion, Reclaim). The pattern: build alongside calendars, not replace them.",
  },
];

export default function PmCalendarProductsPage() {
  const dates = pageDates("/pm-calendar-products");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Calendar Products", url: `${SITE_URL}/pm-calendar-products` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Calendar Products (2026 Edition)",
        description: "How PMs build calendar products. Scheduling UX, availability sharing, AI-assisted scheduling, and why calendar is the hardest switch in productivity.",
        image: `${SITE_URL}/api/og?title=PM+Calendar+Products+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-calendar-products`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📅</span> Build alongside calendars. Don&apos;t try to replace them.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Calendar Products<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-2">
            Calendar itself is a closed market — Google, Microsoft, and Apple already own it — but companies like Calendly, Cal.com, Motion, and Reclaim proved there&apos;s real room to build alongside the calendar rather than replace it, through availability sharing, AI-assisted scheduling, and deep interop, since users protect their calendar more than they protect email.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for calendar product PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Calendar PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Dynamics</h2>
          <div className="space-y-2">
            {DYNAMICS.map((d, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Metrics</h2>
            <div className="space-y-2">
              {METRICS.map((m, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
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

        <RelatedPages slug="pm-calendar-products" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Calendar PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
