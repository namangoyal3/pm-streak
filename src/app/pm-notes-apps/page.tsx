import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Notes Apps (2026) — Notion, Obsidian, Apple Notes PM Lessons",
  description:
    "How PMs build notes and knowledge apps. Blocks vs pages, sync, AI-assisted writing, and why notes apps compound through personal daily use.",
  keywords: [
    "PM notes apps", "Notion PM",
    "Obsidian PM", "notes app 2026",
  ],
  alternates: { canonical: "/pm-notes-apps" },
  openGraph: {
    title: "PM Notes Apps 2026 — PM Streak",
    description: "How PMs build notes and knowledge apps.",
    url: `${SITE_URL}/pm-notes-apps`,
    type: "article",
  },
};

const DYNAMICS = [
  "Speed of capture beats depth of structure — fast opens, fast writes",
  "Sync reliability is non-negotiable — lost notes kill trust instantly",
  "Blocks vs pages shape extensibility — Notion chose blocks; Apple chose pages",
  "AI-assisted writing and retrieval is the new baseline",
  "Daily active use is the only metric that matters — weekly users don&apos;t retain",
];

const METRICS = [
  "Daily active users (DAU)",
  "Notes created per DAU per week",
  "Sync success rate and median sync latency",
  "Time-to-capture from app open",
  "AI feature usage rate",
];

const FAQS = [
  {
    q: "Is the notes app market still winnable in 2026?",
    a: "Barely — Notion, Apple Notes, and Obsidian dominate. New entrants succeed on specific wedges (voice-first, AI-native, privacy-first, developer-focused). A horizontal &apos;better Notion&apos; is a graveyard category. Pick a niche, build deep, expand later.",
  },
];

export default function PmNotesAppsPage() {
  const dates = pageDates("/pm-notes-apps");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Notes Apps", url: `${SITE_URL}/pm-notes-apps` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Notes Apps (2026 Edition)",
        description: "How PMs build notes and knowledge apps. Blocks vs pages, sync, AI-assisted writing, and why notes apps compound through personal daily use.",
        image: `${SITE_URL}/api/og?title=PM+Notes+Apps+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-notes-apps`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📓</span> Speed of capture beats depth of structure
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Notes Apps<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-2">
            Building a notes app in 2026 means competing against Notion, Apple Notes, and Obsidian on a market that&apos;s barely winnable head-on — the wedge is picking a specific niche like voice-first, AI-native, or privacy-first capture, then optimizing for speed of capture, sync reliability, and daily active use rather than trying to out-structure the incumbents.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for notes app PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Notes App PM Skills — Free →
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

        <RelatedPages slug="pm-notes-apps" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Notes App Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
