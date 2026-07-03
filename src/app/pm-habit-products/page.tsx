import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "How PMs Design Habit-Forming Products (2026) — The Hooked Framework Applied",
  description:
    "How PMs design products that form genuine habits — without dark patterns. Nir Eyal&apos;s Hooked framework, habit loops, and examples from Duolingo, WhatsApp, and others.",
  keywords: [
    "habit forming products", "Hooked framework PM",
    "habit loops product", "designing habits PM",
    "Nir Eyal PM 2026",
  ],
  alternates: { canonical: "/pm-habit-products" },
  openGraph: {
    title: "PM Habit-Forming Products 2026 — PM Streak",
    description: "How PMs design genuine habit-forming products — without dark patterns.",
    url: `${SITE_URL}/pm-habit-products`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Habit-Forming+Products+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Habit-Forming Products 2026 — PM Streak",
    description: "How PMs design genuine habit-forming products — without dark patterns.",
    images: [`${SITE_URL}/api/og?title=PM+Habit-Forming+Products+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const HOOK_MODEL = [
  { part: "Trigger", what: "External or internal cue that starts the behaviour. Notifications, emotions, daily context." },
  { part: "Action", what: "The simplest behaviour the user performs in anticipation of reward. Open app, tap button." },
  { part: "Variable reward", what: "A reward whose value or timing varies. Unpredictability keeps users engaged." },
  { part: "Investment", what: "User puts something into the product — time, data, content — that makes them more likely to return." },
];

const EXAMPLES = [
  { product: "Duolingo", trigger: "Daily streak notification at same time", action: "Start a lesson", reward: "XP, progress, streak extension", investment: "Accumulated progress, personalised difficulty" },
  { product: "WhatsApp", trigger: "Message notification", action: "Open chat", reward: "Message content + social response", investment: "Contacts, group memberships, chat history" },
  { product: "Instagram", trigger: "Boredom / internal trigger", action: "Open app, scroll", reward: "Variable content, likes", investment: "Posts, follows, saved content" },
  { product: "PM Streak (illustrative)", trigger: "Daily streak reminder", action: "Complete a 2-min PM scenario", reward: "XP, streak continuation, AI feedback", investment: "Accumulated streak, progress tracking" },
];

const ETHICAL_LINE = [
  "Build habits around genuine user value, not dark patterns",
  "Daily practice for learning = great habit; endless doom-scroll = exploitative",
  "Ask: would users thank you 1 year later for building this habit?",
  "Make exit frictionless — great products don&apos;t trap users",
  "Measure long-term satisfaction, not just short-term engagement",
];

const COMMON_MISTAKES = [
  "Adding streaks to a product that doesn&apos;t deliver real value — users notice",
  "Over-notifying to drive app opens — creates annoyance, not habit",
  "Variable rewards without predictable base — feels manipulative, not engaging",
  "Investment features that lock users in — creates resentment when users realise",
  "Treating &apos;habit&apos; as synonymous with &apos;engagement&apos; — they&apos;re not the same",
];

const FAQS = [
  {
    q: "Are habit-forming products inherently manipulative?",
    a: "No — but they can be. The difference is whether the habit serves genuine user value. Duolingo&apos;s streak helps people learn a language they want to learn — genuinely useful. Slot-machine games using the same mechanics to extract money from vulnerable users is exploitative. The framework is neutral; the application is a choice.",
  },
  {
    q: "How do PMs test whether a habit is genuine vs exploitative?",
    a: "Ask: if users paused for 30 days, would they miss it in a meaningful way? Genuine habits leave users slightly worse off when they stop (they miss practice, miss connection, miss learning). Exploitative habits leave users relieved when they stop. Long-term retention AFTER a pause is a strong signal.",
  },
];

export default function PmHabitProductsPage() {
  const dates = pageDates("/pm-habit-products");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Habit-Forming Products", url: `${SITE_URL}/pm-habit-products` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "How PMs Design Habit-Forming Products (2026 Edition)",
        description:
          "How PMs design products that form genuine habits — without dark patterns. Nir Eyal&apos;s Hooked framework, habit loops, and examples from Duolingo, WhatsApp, and others.",
        image: `${SITE_URL}/api/og?title=PM+Habit-Forming+Products+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-habit-products`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔁</span> Great habits serve users. Dark patterns exploit them.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            How PMs Design Habit-Forming<br />Products (2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Can a product build genuine habits without manipulating users? This guide applies Nir
            Eyal&apos;s four-part Hook model — trigger, action, variable reward, investment — to real
            examples like Duolingo&apos;s streak and WhatsApp&apos;s message notifications, then draws the
            ethical line: genuine habits serve real value, while dark patterns leave users relieved, not
            worse off, when they stop.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The 4-part Hook framework, 4 real product examples, the ethical line between habits and dark patterns,
            and 5 common mistakes.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Habit-Product Intuition Daily — Free →
          </Link>
        </section>

        {/* Hook model */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">The Hook Model (4 Parts)</h2>
          <div className="space-y-3">
            {HOOK_MODEL.map((h, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-white text-sm mb-1">{i + 1}. {h.part}</p>
                <p className="text-xs text-white/60">{h.what}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Examples */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">4 Real Product Examples</h2>
            <div className="space-y-5">
              {EXAMPLES.map((e, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                  <p className="font-bold text-white mb-3">{e.product}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    <div className="bg-[#0e1113] rounded p-2">
                      <span className="text-[#89e219] font-medium">Trigger: </span>
                      <span className="text-white/70">{e.trigger}</span>
                    </div>
                    <div className="bg-[#0e1113] rounded p-2">
                      <span className="text-[#89e219] font-medium">Action: </span>
                      <span className="text-white/70">{e.action}</span>
                    </div>
                    <div className="bg-[#0e1113] rounded p-2">
                      <span className="text-[#89e219] font-medium">Reward: </span>
                      <span className="text-white/70">{e.reward}</span>
                    </div>
                    <div className="bg-[#0e1113] rounded p-2">
                      <span className="text-[#89e219] font-medium">Investment: </span>
                      <span className="text-white/70">{e.investment}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ethical line */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">The Ethical Line</h2>
          <div className="space-y-2">
            {ETHICAL_LINE.map((e, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{e}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mistakes */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Common Mistakes</h2>
            <div className="space-y-2">
              {COMMON_MISTAKES.map((m, i) => (
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

        <RelatedPages slug="pm-habit-products" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Your Own PM Habit Daily</h2>
          <p className="text-white/60 mb-6">Daily 2-minute PM scenarios — the habit that compounds into career mastery.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
