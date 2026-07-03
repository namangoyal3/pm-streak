import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Design Tools (2026) — Figma, Canva, Framer PM Lessons",
  description:
    "How PMs build design tools. Multiplayer, plugin ecosystems, AI-assisted design, and why design tools compound faster than almost any SaaS category.",
  keywords: [
    "PM design tools", "Figma PM",
    "Canva PM", "Framer PM 2026",
  ],
  alternates: { canonical: "/pm-design-tools" },
  openGraph: {
    title: "PM Design Tools 2026 — PM Streak",
    description: "How PMs build design tools.",
    url: `${SITE_URL}/pm-design-tools`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Design+Tools+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Design Tools 2026 — PM Streak",
    description: "How PMs build design tools.",
    images: [`${SITE_URL}/api/og?title=PM+Design+Tools+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Multiplayer live-editing is table stakes — Figma set the bar",
  "Plugin / community ecosystems multiply value",
  "AI-assisted design (Figma AI, Canva Magic) is the new layer",
  "Template marketplaces drive acquisition",
  "Education content (YouTube, courses) builds long-term brand",
];

const METRICS = [
  "Seats per account expansion",
  "Weekly active editors",
  "Files created per user",
  "Plugin install rate",
  "Template downloads and customisation",
];

const FAQS = [
  {
    q: "Why did Figma eat Sketch&apos;s lunch?",
    a: "Multiplayer. Sketch was Mac-only, file-based, single-player. Figma was browser-based, real-time collaborative, cross-platform. The collaboration unlock changed how design teams worked — async review, live handoff, comments in context. Sketch couldn&apos;t retrofit that architecture without rewriting from scratch.",
  },
];

export default function PmDesignToolsPage() {
  const dates = pageDates("/pm-design-tools");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Design Tools", url: `${SITE_URL}/pm-design-tools` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Design Tools (2026 Edition)",
        description:
          "How PMs build design tools. Multiplayer, plugin ecosystems, AI-assisted design, and why design tools compound faster than almost any SaaS category.",
        image: `${SITE_URL}/api/og?title=PM+Design+Tools+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-design-tools`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🎨</span> Multiplayer + plugins = design tools compound
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Design Tools<br />(2026 Edition)
          </h1>
          <p className="text-base text-white/80 max-w-2xl mx-auto mb-3">
            Figma displaced Sketch by shipping real-time, browser-based multiplayer editing where Sketch stayed Mac-only, file-based, and single-player — async review, live handoff, and in-context comments changed how design teams actually worked, and Sketch couldn&apos;t retrofit that architecture without a rewrite. Design tool PMs now compound growth through plugin ecosystems, AI-assisted design layers, and template marketplaces, tracking seats per account, weekly active editors, and plugin install rate.
          </p>
          <p className="text-xs text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for design tool PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Design Tool PM Skills — Free →
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

        <RelatedPages slug="pm-design-tools" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Design Tool PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
