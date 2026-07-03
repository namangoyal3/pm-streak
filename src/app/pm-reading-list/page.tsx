import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Reading List (2026) — Books, Essays, and Newsletters That Shaped Great PMs",
  description:
    "The essential PM reading list. Books, essays, newsletters, and podcasts — the canon that sharpens product thinking over years.",
  keywords: [
    "PM reading list", "product manager books",
    "best PM books", "PM newsletter",
    "PM podcast", "product management canon 2026",
  ],
  alternates: { canonical: "/pm-reading-list" },
  openGraph: {
    title: "PM Reading List 2026 — PM Streak",
    description: "The canon of PM books, essays, newsletters, and podcasts.",
    url: `${SITE_URL}/pm-reading-list`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Reading+List+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Reading List 2026 — PM Streak",
    description: "The canon of PM books, essays, newsletters, and podcasts.",
    images: [`${SITE_URL}/api/og?title=PM+Reading+List+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const BOOKS = [
  { title: "Inspired", author: "Marty Cagan", why: "The foundational modern PM book — what great product teams actually do." },
  { title: "Continuous Discovery Habits", author: "Teresa Torres", why: "Practical framework for ongoing user research and decision-making." },
  { title: "The Lean Product Playbook", author: "Dan Olsen", why: "Step-by-step guide from market sizing to MVP." },
  { title: "Good Strategy / Bad Strategy", author: "Richard Rumelt", why: "What strategy is and isn&apos;t — essential reading beyond PM." },
  { title: "Cracking the PM Interview", author: "Gayle McDowell &amp; Jackie Bavaro", why: "Still the canonical interview prep book — dated but comprehensive." },
  { title: "The Mom Test", author: "Rob Fitzpatrick", why: "How to do user interviews without leading questions. Short and essential." },
  { title: "High Output Management", author: "Andy Grove", why: "Management classic — applies deeply to PM work and managing without authority." },
  { title: "Hooked", author: "Nir Eyal", why: "Habit loops and product psychology — how addictive products work." },
  { title: "Working Backwards", author: "Colin Bryar &amp; Bill Carr", why: "Amazon&apos;s PR/FAQ process and product philosophy from the inside." },
  { title: "Competing Against Luck", author: "Clayton Christensen", why: "The Jobs-to-be-Done framework, directly from the source." },
];

const ESSAYS = [
  { source: "Reforge (Casey Winters, Elena Verna)", why: "Deep essays on growth, retention, and PLG — the canonical resource for growth PMs" },
  { source: "Shreyas Doshi (Twitter/X)", why: "High-signal frameworks for strategic PM thinking, under-rated weekly" },
  { source: "First Round Review", why: "Long-form operator interviews with top PMs and founders" },
  { source: "Stratechery (Ben Thompson)", why: "Strategic analysis of tech companies — trains strategic thinking over time" },
  { source: "a16z Podcast / Blog", why: "Trends, frameworks, and company deep dives" },
];

const NEWSLETTERS = [
  { source: "Lenny&apos;s Newsletter", cadence: "Weekly", why: "Case studies, frameworks, PM career advice — most popular PM newsletter globally" },
  { source: "Product Growth (Aakash Gupta)", cadence: "Weekly", why: "India-relevant growth and career content for PMs" },
  { source: "Elena&apos;s Growth Scoop", cadence: "Weekly", why: "Growth operator lessons from Elena Verna (ex-Miro, SurveyMonkey)" },
  { source: "Out of Pocket Health", cadence: "Weekly", why: "Healthtech PM perspectives — niche but excellent if you&apos;re in the space" },
  { source: "Product Habits (Hiten Shah)", cadence: "Weekly", why: "Short insights on PM craft and product thinking" },
];

const PODCASTS = [
  "Lenny&apos;s Podcast — interviews with top PMs and founders",
  "Masters of Scale (Reid Hoffman) — strategic product stories",
  "Acquired — deep dives on iconic companies and their product bets",
  "The Tim Ferriss Show — occasional PM-relevant episodes",
  "Invest Like the Best — business and product strategy perspectives",
];

const FAQS = [
  {
    q: "Should PMs read PM books or operator content?",
    a: "Both, at different times. Books are foundational — give you mental models that compound. Operator content (Twitter, newsletters, podcasts) keeps you current on tactics. Ratio: 30% books (long-form, deep), 70% operator content (current, tactical). Pure book readers get theoretical; pure Twitter readers miss foundations.",
  },
  {
    q: "How much should a PM read per week?",
    a: "2–3 hours of high-quality PM content per week is sustainable for most working PMs. That&apos;s 1 podcast episode, 2–3 newsletter issues, and maybe a book chapter. More than 5 hours/week likely starts taking away from actually doing PM work. Apply what you read to weekly work — reading without application is mental gym with no transfer to actual performance.",
  },
];

export default function PmReadingListPage() {
  const dates = pageDates("/pm-reading-list");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Reading List", url: `${SITE_URL}/pm-reading-list` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Reading List (2026 Edition)",
        description:
          "The essential PM reading list. Books, essays, newsletters, and podcasts — the canon that sharpens product thinking over years.",
        image: `${SITE_URL}/api/og?title=PM+Reading+List+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-reading-list`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📚</span> The canon of PM books, essays, newsletters, and podcasts
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Reading List<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            The PM reading canon splits into four layers: foundational books like Inspired, The Mom Test, and Working Backwards for mental models; essay sources like Stratechery and Shreyas Doshi for strategic thinking; weekly newsletters like Lenny&apos;s for tactics and career advice; and podcasts for operator stories. A sustainable mix is roughly 30% books and 70% current operator content, at about 2–3 hours a week.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            10 essential books, 5 essay sources, 5 newsletters, and 5 podcasts that shape
            great PM thinking over years.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Pair Reading with Daily Practice — Free →
          </Link>
        </section>

        {/* Books */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">10 Essential PM Books</h2>
          <div className="space-y-3">
            {BOOKS.map((b, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-white text-sm mb-1">{i + 1}. {b.title}</p>
                <p className="text-xs text-[#89e219] mb-1">{b.author}</p>
                <p className="text-xs text-white/60">{b.why}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Essays */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Essay Sources Worth Following</h2>
            <div className="space-y-3">
              {ESSAYS.map((e, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-white text-sm mb-1">{e.source}</p>
                  <p className="text-xs text-white/60">{e.why}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletters */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Newsletters to Subscribe To</h2>
          <div className="space-y-3">
            {NEWSLETTERS.map((n, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                  <p className="font-semibold text-white text-sm">{n.source}</p>
                  <span className="text-xs bg-[#58cc02]/20 text-[#89e219] px-2 py-0.5 rounded-full">{n.cadence}</span>
                </div>
                <p className="text-xs text-white/60">{n.why}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Podcasts */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Podcasts for PMs</h2>
            <div className="space-y-2">
              {PODCASTS.map((p, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
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

        <RelatedPages slug="pm-reading-list" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Reading + Daily Practice = Compounding</h2>
          <p className="text-white/60 mb-6">Internalise what you read through daily PM scenarios that force application.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
