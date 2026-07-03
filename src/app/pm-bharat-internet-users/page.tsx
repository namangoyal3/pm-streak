import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM for Bharat Users (2026) — Designing for India&apos;s Next 500M",
  description:
    "How PMs design for Bharat — the next 500M Indian internet users. Vernacular, voice, video, and the mistakes urban-first PMs keep making.",
  keywords: [
    "PM Bharat", "next 500M India",
    "vernacular PM 2026",
  ],
  alternates: { canonical: "/pm-bharat-internet-users" },
  openGraph: {
    title: "PM for Bharat Users 2026 — PM Streak",
    description: "Designing for India&apos;s next 500M internet users.",
    url: `${SITE_URL}/pm-bharat-internet-users`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+for+Bharat+Users+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM for Bharat Users 2026 — PM Streak",
    description: "Designing for India&apos;s next 500M internet users.",
    images: [`${SITE_URL}/api/og?title=PM+for+Bharat+Users+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PRINCIPLES = [
  "Vernacular by default — Hindi, regional languages, transliteration",
  "Voice and video over text — literacy varies, video universal",
  "Trust signals matter more than UX polish",
  "Bandwidth-aware design — works on 2G/3G fallback",
  "Family-shared device flows — phone often used by 3–4 family members",
];

const MISTAKES = [
  "Translating English UX into Hindi without rethinking layout",
  "Assuming smartphone behaviour mirrors metros",
  "Ignoring offline-first patterns",
  "Overloading screens with English jargon",
];

const FAQS = [
  {
    q: "Why do urban-first PMs underestimate Bharat?",
    a: "Because their personal experience and friend circle differ fundamentally. Bharat users learn through video, transact through WhatsApp, share devices, and trust agents and shopkeepers more than apps. Building for Bharat requires field research, not assumption. PMs who shadow Bharat users for a week ship better products.",
  },
];

export default function PmBharatInternetUsersPage() {
  const dates = pageDates("/pm-bharat-internet-users");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Bharat", url: `${SITE_URL}/pm-bharat-internet-users` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM for Bharat Users (2026 Edition)",
        description:
          "How PMs design for Bharat — the next 500M Indian internet users. Vernacular, voice, video, and the mistakes urban-first PMs keep making.",
        image: `${SITE_URL}/api/og?title=PM+for+Bharat+Users+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-bharat-internet-users`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🇮🇳</span> Field-research before assumption when building for Bharat
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM for Bharat Users<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Designing for Bharat&apos;s next 500 million internet users requires defaulting to vernacular language, favoring voice and video over text since literacy varies, building bandwidth-aware experiences that fall back gracefully on 2G/3G, and accounting for a single phone shared across three or four family members. The most common mistake is porting English UX into Hindi without rethinking layout or assuming metro smartphone habits apply everywhere — field research beats assumption every time.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 design principles and 4 mistakes urban PMs keep making.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Bharat PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Principles</h2>
          <div className="space-y-2">
            {PRINCIPLES.map((p, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{p}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">4 Mistakes</h2>
            <div className="space-y-2">
              {MISTAKES.map((m, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-red-400 flex-shrink-0">❌</span>
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

        <RelatedPages slug="pm-bharat-internet-users" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Bharat PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
