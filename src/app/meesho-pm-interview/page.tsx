import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "Meesho PM Interview Guide (2026) — Bharat Commerce Questions & Rounds",
  description:
    "Crack the Meesho PM interview. All rounds, Bharat (Tier-2/3) user questions, social commerce product thinking, and real interview examples from Meesho PMs in 2026.",
  keywords: [
    "Meesho PM interview", "Meesho product manager interview questions",
    "Meesho PM interview prep", "social commerce PM india",
    "Bharat PM interview", "Meesho product manager interview 2026",
  ],
  alternates: { canonical: "/meesho-pm-interview" },
  openGraph: {
    title: "Meesho PM Interview Guide 2026 — PM Streak",
    description: "All Meesho PM interview rounds, Bharat-first questions, and a structured prep plan.",
    url: `${SITE_URL}/meesho-pm-interview`,
    images: [{ url: `${SITE_URL}/api/og?title=Meesho+PM+Interview+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meesho PM Interview Guide 2026 — PM Streak",
    description: "All Meesho PM interview rounds, Bharat-first questions, and a structured prep plan.",
    images: [`${SITE_URL}/api/og?title=Meesho+PM+Interview+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const MEESHO_CONTEXT = [
  { label: "Core business", value: "Social commerce, 0% commission seller platform, focused on Bharat (Tier-2/3/4 cities)" },
  { label: "PM culture", value: "User-obsessed, Bharat-first thinking, high ownership, fast iteration" },
  { label: "Users to know", value: "Price-sensitive buyers in Tier-2/3 cities, resellers (women entrepreneurs), small manufacturers, first-time online shoppers" },
  { label: "Key metrics", value: "GMV, seller retention, buyer repeat rate, order value, return rate, cost per order" },
  { label: "Unique challenge", value: "Many users have low digital literacy, limited English, first-time e-commerce experience — product must work for them" },
];

const ROUNDS = [
  {
    name: "Bharat Product Thinking Round",
    what: "Design or improve a product for Meesho's core user — Tier-2/3 buyers and small-town resellers. Empathy for non-English, first-time digital users is essential.",
    sample: [
      "Design a product for a first-time online shopper in a Tier-3 city who doesn't trust online platforms.",
      "How would you improve Meesho's reseller experience — women running small WhatsApp-based businesses?",
      "A Hindi-speaking buyer returns 40% of their orders. Investigate and propose a product fix.",
    ],
    tip: "Never assume your user speaks English, has a credit card, or trusts online transactions. Design for voice/vernacular, cash on delivery, extreme trust-building UX. Solutions designed for metro users fail here.",
  },
  {
    name: "Metrics & Operations Round",
    what: "Diagnose e-commerce metrics, understand Meesho's cost structure, and reason about operational trade-offs.",
    sample: [
      "Meesho's return rate increases from 28% to 35%. Walk through your diagnosis.",
      "How would you measure the success of vernacular language support?",
      "Define the north star metric for Meesho's reseller product.",
    ],
    tip: "Meesho's unit economics are brutal at low price points. Every metric conversation should connect to contribution margin per order. 'More orders' isn't good if each order loses money after logistics and returns.",
  },
  {
    name: "Strategy & Business Round",
    what: "Competitive positioning (vs Flipkart, Amazon, Shopsy), market expansion, and social commerce model defence.",
    sample: [
      "Flipkart's Shopsy directly copies Meesho's 0-commission reseller model. How do you respond?",
      "Should Meesho expand aggressively to metros, or defend Bharat and deepen?",
      "What's the most durable moat Meesho has, and how do you strengthen it?",
    ],
    tip: "Meesho's moat is its reseller network and Bharat distribution. Strategy answers that suggest abandoning Bharat to chase metros are likely to fail — understand why Meesho deliberately avoided that path.",
  },
  {
    name: "Behavioural & Culture Round",
    what: "Ownership, customer obsession, fast iteration. Meesho culture values getting close to the user and shipping quickly.",
    sample: [
      "Tell me about a time you designed a product for a user very different from yourself.",
      "Describe a situation where you shipped something fast and fixed edge cases post-launch.",
      "Tell me about a product decision you made based on a user insight that surprised you.",
    ],
    tip: "Meesho specifically looks for PMs who've spent time with users unlike themselves. Stories about field visits, WhatsApp conversations with resellers, or unexpected user insights score higher than purely data-driven narratives.",
  },
];

const FAQS = [
  {
    q: "How is Meesho PM interview different from Flipkart or Amazon?",
    a: "User segment and product complexity shift significantly. Flipkart/Amazon serve metro + Tier-2 users who are used to e-commerce; Meesho serves Bharat users who often make their first online purchase on Meesho. PMs at Meesho must design for low digital literacy, language diversity, cash on delivery reliance, and trust-gap products. Interviewers specifically test whether you can design for users unlike yourself.",
  },
  {
    q: "Do I need to speak Hindi to be a Meesho PM?",
    a: "Not mandatory, but being able to speak at least one regional language meaningfully helps — user research sessions often happen in Hindi, Tamil, Telugu, or Bengali. At minimum, PMs must be comfortable running research through translators and building genuine intuition for users who don't operate in English. Tier-1 metro-born PMs can absolutely succeed at Meesho but must actively work to bridge the empathy gap.",
  },
  {
    q: "What's unique about the Meesho PM interview culture?",
    a: "It's more informal and ownership-focused than most larger tech companies. Expect fewer structured frameworks and more deep discussion. Interviewers probe for whether you've genuinely met or talked to Bharat users before — candidates who haven't can struggle in product design rounds where metro-user assumptions fail.",
  },
];

export default function MeeshoPmInterviewPage() {
  const dates = pageDates("/meesho-pm-interview");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Meesho PM Interview", url: `${SITE_URL}/meesho-pm-interview` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Meesho PM Interview Guide (2026 Edition)",
        description:
          "Crack the Meesho PM interview. All rounds, Bharat (Tier-2/3) user questions, social commerce product thinking, and real interview examples from Meesho PMs in 2026.",
        image: `${SITE_URL}/api/og?title=Meesho+PM+Interview+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/meesho-pm-interview`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🛍️</span> Bharat-first · Reseller-powered · Non-metro product design
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Meesho PM Interview Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            What does a Meesho PM interview actually test? Four rounds — Bharat product thinking, metrics
            and operations, strategy against Flipkart&apos;s Shopsy, and behavioural culture fit — all circle
            back to one throughline: can you design for Tier-2/3 resellers and first-time online shoppers rather than assume a metro-user mental model.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            All Meesho PM interview rounds, the Bharat-user thinking the interviewers reward,
            and real questions on social commerce, resellers, and non-metro product design.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Start Meesho PM Prep — Free →
          </Link>
        </section>

        <section className="max-w-4xl mx-auto px-4 pb-10">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-5">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Know Before You Interview</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {MEESHO_CONTEXT.map((item, i) => (
                <div key={i} className="flex gap-2 text-sm">
                  <span className="text-[#89e219] font-medium flex-shrink-0">{item.label}:</span>
                  <span className="text-white/60">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">The Meesho PM Interview Rounds</h2>
          <div className="space-y-6">
            {ROUNDS.map((round, i) => (
              <div key={round.name} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-7 h-7 rounded-full bg-[#58cc02]/20 text-[#89e219] font-bold text-sm flex items-center justify-center">{i + 1}</span>
                  <h3 className="text-lg font-bold text-white">{round.name}</h3>
                </div>
                <p className="text-sm text-white/60 mb-4">{round.what}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Sample Questions</p>
                    <ul className="space-y-1.5">
                      {round.sample.map((q, j) => (
                        <li key={j} className="flex gap-2 text-sm">
                          <span className="text-white/30">•</span>
                          <span className="text-white/70">{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-xl p-3">
                    <p className="text-xs text-[#89e219] mb-1">💡 Prep tip</p>
                    <p className="text-sm text-white/60">{round.tip}</p>
                  </div>
                </div>
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

        <RelatedPages slug="meesho-pm-interview" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Train for the Bharat PM Bar Daily</h2>
          <p className="text-white/60 mb-6">Social commerce, reseller, and Tier-2/3 user scenarios with AI feedback.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
