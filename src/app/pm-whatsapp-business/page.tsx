import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM WhatsApp Business (2026) — Building Conversational Commerce in India",
  description:
    "How PMs build WhatsApp-first products. Conversational commerce, payments, CTWA ads, and why WhatsApp is the dominant consumer surface in India.",
  keywords: [
    "PM WhatsApp business", "conversational commerce",
    "WhatsApp PM india 2026",
  ],
  alternates: { canonical: "/pm-whatsapp-business" },
  openGraph: {
    title: "PM WhatsApp Business 2026 — PM Streak",
    description: "Building conversational commerce on WhatsApp.",
    url: `${SITE_URL}/pm-whatsapp-business`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+WhatsApp+Business+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM WhatsApp Business 2026 — PM Streak",
    description: "Building conversational commerce on WhatsApp.",
    images: [`${SITE_URL}/api/og?title=PM+WhatsApp+Business+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "WhatsApp is the default consumer surface in India — trust it",
  "Click-to-WhatsApp ads bridge Meta ads to conversational commerce",
  "Template messages are rigid but necessary — design around approval friction",
  "Catalogue and payments on WhatsApp enable full funnels",
  "Automation with AI agents reduces support cost dramatically",
];

const METRICS = [
  "Conversation conversion rate (inbound to purchase)",
  "Response time — users expect minutes, not hours",
  "Template approval rate and rejection reasons",
  "Cost per qualified conversation",
  "Handover rate from bot to human",
];

const FAQS = [
  {
    q: "Should Indian D2C brands start with WhatsApp or an app?",
    a: "WhatsApp, almost always. Users already have it, trust it, and transact on it. App installs are expensive and churn fast for most D2C. A WhatsApp-first funnel with CTWA ads, catalogues, and payments can outperform app-based funnels at a fraction of the CAC. Build an app later only if behaviour demands it.",
  },
];

export default function PmWhatsappBusinessPage() {
  const dates = pageDates("/pm-whatsapp-business");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM WhatsApp Business", url: `${SITE_URL}/pm-whatsapp-business` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM WhatsApp Business (India Edition)",
        description:
          "How PMs build WhatsApp-first products. Conversational commerce, payments, CTWA ads, and why WhatsApp is the dominant consumer surface in India.",
        image: `${SITE_URL}/api/og?title=PM+WhatsApp+Business+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-whatsapp-business`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>💬</span> WhatsApp is India&apos;s homescreen. Design for it.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM WhatsApp Business<br />(India Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Building WhatsApp-first products in India means treating WhatsApp as the default consumer surface: click-to-WhatsApp ads feed a conversational funnel, rigid template messages require designing around approval friction, and catalogues plus native payments turn conversations into completed purchases. PMs track conversation conversion, response time, template approval rate, cost per qualified conversation, and bot-to-human handover to know if it&apos;s working.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for WhatsApp-first PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build WhatsApp PM Skills — Free →
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

        <RelatedPages slug="pm-whatsapp-business" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice WhatsApp PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
