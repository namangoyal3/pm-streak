import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "Product Growth Loops (2026) — PM Guide to Viral, Content & Paid Loops",
  description:
    "Master product growth loops as a PM. Viral loops, content loops, paid acquisition loops, and how to identify and strengthen the loops in your product — with real company examples.",
  keywords: [
    "product growth loops", "viral growth loops PM",
    "product led growth loops", "growth loop framework product manager",
    "how to build growth loops", "growth loop examples PM 2026",
    "product growth strategy loops",
  ],
  alternates: { canonical: "/product-growth-loops" },
  openGraph: {
    title: "Product Growth Loops 2026 — PM Guide | PM Streak",
    description: "Viral, content, and paid growth loops — how PMs identify and strengthen them with real examples.",
    url: `${SITE_URL}/product-growth-loops`,
    images: [{ url: `${SITE_URL}/api/og?title=Product+Growth+Loops+2026++PM+Guide++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Growth Loops 2026 — PM Guide | PM Streak",
    description: "Viral, content, and paid growth loops — how PMs identify and strengthen them with real examples.",
    images: [`${SITE_URL}/api/og?title=Product+Growth+Loops+2026++PM+Guide++PM+Streak`],
    site: "@pmstreak",
  },
};

const LOOPS = [
  {
    name: "Viral Loop",
    icon: "🔄",
    definition: "Users invite other users as a natural consequence of using the product — not as a forced referral mechanic.",
    howItWorks: "User gets value → Shares with others (to collaborate, show off, or because sharing IS the product) → New users join → They get value → Repeat.",
    examples: [
      { company: "WhatsApp", loop: "You join because your contacts are there. You join contacts, so more people join." },
      { company: "Figma", loop: "Designer shares a file for review. Reviewer has to create an account to comment. Now they're a Figma user." },
      { company: "Calendly", loop: "User sends a Calendly link to schedule a meeting. Recipient sees the product, wants it for themselves." },
    ],
    howToStrengthen: "Identify the natural sharing moment in your product. Remove friction from that moment. Make the shared artefact compelling enough that the recipient wants to join.",
    pmSignal: "Viral coefficient (K-factor) > 1 means the product is self-sustaining. K < 1 means you need paid or content loops to sustain growth.",
  },
  {
    name: "Content Loop",
    icon: "📝",
    definition: "Users create content that attracts new users through search or social — who then become content creators themselves.",
    howItWorks: "User creates content → Content is indexed/shared → New users find it → They join and create content → More content is indexed → Repeat.",
    examples: [
      { company: "Stack Overflow", loop: "Developers answer questions. Questions rank on Google. Developers searching Google land on Stack Overflow. Some become answerers." },
      { company: "Quora", loop: "Users answer questions. Questions rank on Google. Readers join to ask follow-up questions or write answers." },
      { company: "LinkedIn", loop: "Users post content. Posts get indexed. People searching for topics find the posts. They join to see more." },
    ],
    howToStrengthen: "Optimise content for SEO at the time of creation. Make contribution easy (reduce editor friction). Notify users when their content gets engagement — reinforces creation behaviour.",
    pmSignal: "Track the organic/SEO channel as % of new signups. Growing SEO share means the content loop is working.",
  },
  {
    name: "Product-Led Growth Loop",
    icon: "🛠️",
    definition: "The product's free tier delivers enough value that users naturally expand usage and eventually convert to paid — and bring their teams with them.",
    howItWorks: "Individual uses free tier → Gets value → Wants more or shares with team → Team starts using → Org sees usage → IT approves company account → Upgrade.",
    examples: [
      { company: "Slack", loop: "One team uses free Slack. Other teams in the org notice. Org-wide adoption happens organically. IT upgrades to enterprise." },
      { company: "Notion", loop: "Individual creates a workspace. Invites teammates. Team adopts. Company-wide rollout follows." },
      { company: "Zoom", loop: "One person uses free Zoom for a meeting. Participants join without an account. Some create free accounts. Some upgrade." },
    ],
    howToStrengthen: "The free tier must deliver genuine value — not crippled functionality. Design the natural collaboration moment where inviting teammates benefits the original user. Make the upgrade trigger obvious and tied to a moment of high value realisation.",
    pmSignal: "Track 'teams per account' and 'expansion MRR'. PLG is working when individual seats naturally expand to team accounts.",
  },
  {
    name: "Paid Acquisition Loop",
    icon: "💰",
    definition: "Revenue from existing users funds paid acquisition of new users profitably — the CAC:LTV ratio improves over time.",
    howItWorks: "User pays → Revenue goes to paid ads → Ads acquire new users → New users pay → More revenue → More ads → Repeat.",
    examples: [
      { company: "Swiggy / Zomato", loop: "Order commission → Funds performance marketing → New users order → More commission → More marketing." },
      { company: "Zepto", loop: "Gross margin per order → Funds Google/Meta ads → New user acquired → Repeat orders → Higher LTV → Scale the loop." },
      { company: "CRED", loop: "Merchant pays for offers on CRED → Funds user acquisition → More users → More merchant demand → Repeat." },
    ],
    howToStrengthen: "Improve LTV through retention and upsell. Reduce CAC through better targeting and creative. Identify which user segment has the best LTV:CAC ratio and focus acquisition spend there.",
    pmSignal: "CAC payback period. If it's > 12 months, the paid loop is unsustainable. < 6 months is healthy for most Indian consumer companies.",
  },
];

const FAQS = [
  {
    q: "What's the difference between a growth loop and a funnel?",
    a: "A funnel is linear — acquire → activate → retain → monetise. It ends. A growth loop is circular — each pass through generates inputs for the next pass. Funnels describe where users go; loops describe how growth compounds. The best products have at least one strong loop layered on top of a funnel.",
  },
  {
    q: "How do you identify the growth loop in an existing product?",
    a: "Ask: where does new user acquisition come from? Now trace that source back to an existing user action. If organic signups come from word-of-mouth, trace what triggers sharing. If SEO is the driver, trace what generates the content. The loop is the causal chain from 'user gets value' to 'new user discovers product' back to 'user gets value.'",
  },
  {
    q: "Should every product have a viral loop?",
    a: "No — forced virality is worse than no virality. Not every product naturally benefits from sharing. B2B tools, highly personal apps, and utility products often grow better through content or paid loops. The most important question is: what growth motion is natural to how users get value? Build the loop that matches user behaviour — don't bolt on a referral programme as a substitute.",
  },
];

export default function ProductGrowthLoopsPage() {
  const dates = pageDates("/product-growth-loops");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Product Growth Loops", url: `${SITE_URL}/product-growth-loops` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Product Growth Loops (PM Guide 2026)",
        description:
          "Master product growth loops as a PM. Viral loops, content loops, paid acquisition loops, and how to identify and strengthen the loops in your product — with real company examples.",
        image: `${SITE_URL}/api/og?title=Product+Growth+Loops+2026++PM+Guide++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/product-growth-loops`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔄</span> Funnels fill a bucket. Loops fill it and make it overflow.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Product Growth Loops<br />(PM Guide 2026)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            A product growth loop is a self-reinforcing cycle — unlike a linear funnel — where each user who
            gets value generates the input for the next user&apos;s acquisition. This guide covers four loop
            types product managers use: viral, content, product-led growth, and paid acquisition, each with
            real examples from WhatsApp, Stack Overflow, Slack, and Zepto.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Viral, content, product-led, and paid growth loops — what they are, how they compound,
            real company examples, and how PMs identify and strengthen them.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice Growth Questions Daily — Free →
          </Link>
        </section>

        {/* Loops */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="space-y-8">
            {LOOPS.map((loop, i) => (
              <div key={loop.name} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{loop.icon}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white/20 font-bold text-sm">{String(i + 1).padStart(2, "0")}</span>
                    <h2 className="text-lg font-bold text-white">{loop.name}</h2>
                  </div>
                </div>
                <p className="text-sm text-white/70 mb-3">{loop.definition}</p>
                <div className="bg-[#0e1113] rounded-lg p-3 mb-4">
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-1">How it works</p>
                  <p className="text-xs text-white/60 font-mono">{loop.howItWorks}</p>
                </div>
                <div className="mb-4">
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Real Examples</p>
                  <div className="space-y-2">
                    {loop.examples.map((ex, j) => (
                      <div key={j} className="flex gap-3 text-sm">
                        <span className="font-semibold text-[#89e219] flex-shrink-0 w-20">{ex.company}</span>
                        <span className="text-white/60">{ex.loop}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-lg p-3">
                    <p className="text-xs text-[#89e219] mb-1">🔧 How to strengthen it</p>
                    <p className="text-xs text-white/60">{loop.howToStrengthen}</p>
                  </div>
                  <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3">
                    <p className="text-xs text-green-400 mb-1">📊 PM signal to track</p>
                    <p className="text-xs text-white/60">{loop.pmSignal}</p>
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

        <RelatedPages slug="product-growth-loops" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Growth Intuition in 2 Minutes a Day</h2>
          <p className="text-white/60 mb-6">Daily PM growth scenarios — loops, metrics, and strategy questions with AI feedback.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
