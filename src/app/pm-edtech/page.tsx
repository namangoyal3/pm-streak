import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Edtech (2026) — Byju's, Unacademy, PhysicsWallah PM Guide",
  description:
    "How PMs build edtech products in India. Learning outcomes, engagement, parent-student dynamics, and why retention is the real battle.",
  keywords: [
    "PM edtech", "Byju's PM",
    "Unacademy PM", "PhysicsWallah PM", "edtech india 2026",
  ],
  alternates: { canonical: "/pm-edtech" },
  openGraph: {
    title: "PM Edtech 2026 — PM Streak",
    description: "How PMs build edtech products in India — learning, engagement, retention.",
    url: `${SITE_URL}/pm-edtech`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Edtech+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Edtech 2026 — PM Streak",
    description: "How PMs build edtech products in India — learning, engagement, retention.",
    images: [`${SITE_URL}/api/og?title=PM+Edtech+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Three users: learner, parent (buyer), teacher — conflicting incentives",
  "Outcomes beat engagement — exam results > session minutes",
  "Seasonality is brutal — Jan–Mar and Jun–Aug drive most revenue",
  "Retention beyond 90 days is rare — the industry average drops off a cliff",
  "Tier-2/3 is the growth market — vernacular content wins here",
];

const METRICS = [
  "Completion rate of assigned content",
  "Weekly learning minutes per active learner",
  "Assessment improvement over a defined window",
  "Parent NPS — they pay; they must stay convinced",
  "Churn at renewal — renewal is where edtech lives or dies",
];

const QUESTIONS = [
  "Design a feature that increases daily practice time for JEE aspirants",
  "How would you improve renewal rate for a K-12 subscription?",
  "Design a feature for parents to stay engaged without being intrusive",
  "Tier-3 learners churn 2x faster — diagnose and design",
];

const FAQS = [
  {
    q: "Is Indian edtech recovering from the 2023 crash?",
    a: "Selectively. Offline+online hybrid players (PhysicsWallah, Aakash) and test-prep specialists are healthy. Pure-online K-12 (Byju&apos;s model) is still in rehab. The future is content + community + live instruction, not just video libraries.",
  },
];

export default function PmEdtechPage() {
  const dates = pageDates("/pm-edtech");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Edtech", url: `${SITE_URL}/pm-edtech` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Edtech (India Edition)",
        description:
          "How PMs build edtech products in India. Learning outcomes, engagement, parent-student dynamics, and why retention is the real battle.",
        image: `${SITE_URL}/api/og?title=PM+Edtech+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-edtech`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📚</span> Edtech is won on outcomes, not minutes
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Edtech<br />(India Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Three stakeholders complicate every edtech decision — the learner who uses the product, the parent who pays for it, and the teacher who delivers it — and with seasonality concentrating revenue into Jan–Mar and Jun–Aug while 90-day retention stays rare industry-wide, edtech PMs prioritise assessment improvement, completion rate, and renewal over raw engagement minutes.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics, 5 metrics, and 4 interview-style questions for edtech PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Edtech PM Skills — Free →
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
          <h2 className="text-2xl font-bold text-center mb-10">4 Interview Questions</h2>
          <div className="space-y-2">
            {QUESTIONS.map((q, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-white/30 flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{q}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
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

        <RelatedPages slug="pm-edtech" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Edtech PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
