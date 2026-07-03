import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Incident Management (2026) — The PM Role When Production Is on Fire",
  description:
    "How PMs show up during incidents. Severity triage, customer communication, post-mortem, and what PMs should and shouldn&apos;t do on-call.",
  keywords: [
    "PM incident management", "on-call PM",
    "incident PM 2026",
  ],
  alternates: { canonical: "/pm-incident-management" },
  openGraph: {
    title: "PM Incident Management 2026 — PM Streak",
    description: "The PM role when production is on fire.",
    url: `${SITE_URL}/pm-incident-management`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Incident+Management+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Incident Management 2026 — PM Streak",
    description: "The PM role when production is on fire.",
    images: [`${SITE_URL}/api/og?title=PM+Incident+Management+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DURING = [
  "Don&apos;t debug — let eng work; don&apos;t spectate in the channel",
  "Own customer communication — status page, support macros, exec updates",
  "Triage severity with eng — honest sev level avoids alert fatigue",
  "Track scope — who&apos;s affected, which surfaces, how long",
  "Handle escalations — protect eng from interruptions while they&apos;re fixing",
];

const AFTER = [
  "Co-author blameless post-mortem with TL",
  "Commit to follow-ups — action items with owners and dates",
  "Communicate to customers — transparency builds trust after incidents",
  "Update runbooks and docs — the next responder benefits",
  "Retro the response itself — not just the root cause",
];

const FAQS = [
  {
    q: "Should PMs be on the incident rotation?",
    a: "Usually no for technical rotation, yes for communications rotation. During an incident, engineers debug; PMs handle stakeholders, status pages, and comms. In small teams, PMs may wear both hats briefly — but long-term, separating these is healthier for speed of resolution and clarity of roles.",
  },
];

export default function PmIncidentManagementPage() {
  const dates = pageDates("/pm-incident-management");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Incident Management", url: `${SITE_URL}/pm-incident-management` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Incident Management (2026 Edition)",
        description:
          "How PMs show up during incidents. Severity triage, customer communication, post-mortem, and what PMs should and shouldn&apos;t do on-call.",
        image: `${SITE_URL}/api/og?title=PM+Incident+Management+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-incident-management`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🚨</span> In incidents, PMs manage signal. Engineers manage code.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Incident Management<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            During an incident a PM&apos;s job is to manage signal, not code: own customer communication, triage severity with engineering, track scope, and handle escalations while engineers debug. Afterward, that role continues into a blameless post-mortem, follow-up commitments, and updated runbooks — which is also why PMs typically join the communications rotation rather than the technical one.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 during-incident behaviours and 5 after-incident follow-ups.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Incident PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">During the Incident (5)</h2>
          <div className="space-y-2">
            {DURING.map((d, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">After the Incident (5)</h2>
            <div className="space-y-2">
              {AFTER.map((a, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{a}</p>
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

        <RelatedPages slug="pm-incident-management" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Incident PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
