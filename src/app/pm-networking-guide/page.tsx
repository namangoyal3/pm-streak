import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Networking Guide (2026) — How PMs Build Real Networks That Help Their Careers",
  description:
    "How PMs build real networks without being transactional. Where to meet other PMs, how to ask for coffee chats, and how to turn weak connections into strong ones.",
  keywords: [
    "PM networking", "product manager networking india",
    "how PMs build network", "coffee chat PM",
    "PM LinkedIn networking", "product manager community 2026",
  ],
  alternates: { canonical: "/pm-networking-guide" },
  openGraph: {
    title: "PM Networking Guide 2026 — PM Streak",
    description: "How PMs build real networks that help their careers — without being transactional.",
    url: `${SITE_URL}/pm-networking-guide`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Networking+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Networking Guide 2026 — PM Streak",
    description: "How PMs build real networks that help their careers — without being transactional.",
    images: [`${SITE_URL}/api/og?title=PM+Networking+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const WHY_NETWORK = [
  "Most PM jobs in India are filled through referrals — not cold applications. Your network is your pipeline.",
  "Career changes compound through relationships built years before you needed them.",
  "PM advice from operators is higher-quality than any blog — but you only get it through relationships.",
  "Reputation travels through networks. Being known as a great PM gets you opportunities you never applied for.",
];

const WHERE_TO_MEET = [
  { source: "Company alumni networks", what: "Ex-Flipkart, ex-Razorpay, ex-Google India have active alumni Slack/WhatsApp groups. Join them even if you haven&apos;t worked there yet — many welcome aspiring PMs." },
  { source: "PM-specific Slack/Discord communities", what: "Product Hunt Makers, PM School India, regional PM meetups. Active contributors get noticed and pulled into opportunities." },
  { source: "LinkedIn (with real engagement)", what: "Comment thoughtfully on PM posts for 3 months. You&apos;ll build visibility faster than with cold DMs. Follow 50 PMs you admire; engage weekly." },
  { source: "Twitter / X", what: "Smaller but denser PM community. Founders and senior PMs are reachable. Quality writing and thoughtful replies get you noticed." },
  { source: "Meetups and conferences", what: "ProductCon, Product Folks, SaaStr India, Fintech Nexus. In-person connections have 10x the staying power of online-only." },
  { source: "Writing publicly", what: "Blog, newsletter, LinkedIn articles — inverse networking. People reach out to YOU when your writing resonates." },
];

const COFFEE_CHAT_TEMPLATE = {
  outreach: "Hi [Name], I&apos;m [role] at [company] and I&apos;ve been following your work on [specific thing]. I&apos;m particularly curious about [specific question related to their expertise]. Would you have 20 minutes for a coffee chat in the next few weeks? Totally understand if you don&apos;t have bandwidth.",
  tips: [
    "Keep it short — 3 sentences max.",
    "Mention something specific you admire — &apos;your post about X&apos; or &apos;your work on Y.&apos; Generic flattery fails.",
    "Ask a specific question, not a vague &apos;I&apos;d love to pick your brain.&apos; The latter reads as extractive.",
    "Offer an easy out: &apos;understand if you don&apos;t have bandwidth.&apos;",
    "Never lead with what you want from them. Lead with curiosity and genuine interest.",
  ],
};

const COMMON_MISTAKES = [
  "Only reaching out when you need something (job, referral, introduction)",
  "Sending generic &apos;can we connect&apos; LinkedIn messages with no context",
  "Not following up after a coffee chat with a thank-you note and specific takeaways",
  "Treating senior PMs as oracle dispensers instead of humans worth a real relationship",
  "Ghosting people who helped you the moment you got what you needed",
  "Networking only when job-searching — it shows, and it&apos;s off-putting to operators",
];

const FAQS = [
  {
    q: "How do PMs network without being transactional?",
    a: "Lead with giving, not asking. Comment thoughtfully on others&apos; work. Share resources you found useful. Introduce people who&apos;d benefit from knowing each other. When you do ask for help, it feels like a continuation of an existing relationship, not an extractive first touch. The PMs with the strongest networks got there by being useful to others first — often for years before they needed anything back.",
  },
  {
    q: "How much time should PMs spend on networking?",
    a: "~2 hours/week sustainable, spread across: 1 coffee chat (in-person or virtual), 30 mins engaging on LinkedIn/Twitter with genuine thought, 30 mins participating in a community (Slack/Discord), 30 mins reading/sharing industry content. More than this and it becomes a job; less and relationships decay.",
  },
  {
    q: "I&apos;m an introvert. Can I still build a strong PM network?",
    a: "Absolutely — introverts often build deeper, higher-quality networks than extroverts because they prefer 1:1 depth over crowd breadth. The path that works for introverts: write publicly (your ideas become your outreach), focus on 5–10 meaningful relationships vs 100 weak ones, prefer written follow-ups (allows for thoughtful depth). Many of the most well-networked PMs in India are introverts who built networks deliberately through writing and 1:1 investment.",
  },
];

export default function PmNetworkingGuidePage() {
  const dates = pageDates("/pm-networking-guide");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Networking Guide", url: `${SITE_URL}/pm-networking-guide` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Networking Guide (2026)",
        description: "How PMs build real networks without being transactional. Where to meet other PMs, how to ask for coffee chats, and how to turn weak connections into strong ones.",
        image: `${SITE_URL}/api/og?title=PM+Networking+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-networking-guide`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🤝</span> Your network in 5 years is decided by what you do today
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Networking Guide<br />(India 2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Most PM jobs in India are filled through referrals rather than cold applications,
            which is why PMs build networks across six channels — alumni groups, PM-specific
            Slack/Discord communities, LinkedIn, Twitter/X, in-person meetups, and public writing —
            investing roughly two hours a week. The PMs with the strongest networks lead with
            giving years before they ever need anything back.
          </p>
          <p className="text-sm text-white/50 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Where to meet PMs, how to ask for coffee chats that actually convert,
            and how to build networks that compound over your career.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Skills Daily — Free →
          </Link>
        </section>

        {/* Why network */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">Why PM Networking Matters</h2>
          <div className="space-y-3">
            {WHY_NETWORK.map((w, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{w}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Where to meet */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Places PMs Meet Other PMs</h2>
            <div className="space-y-3">
              {WHERE_TO_MEET.map((w, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-white mb-1">{i + 1}. {w.source}</p>
                  <p className="text-xs text-white/60">{w.what}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Coffee chat */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">Coffee Chat Outreach Template</h2>
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6 mb-5">
            <p className="text-xs text-[#89e219] uppercase tracking-wider mb-3">Template</p>
            <p className="text-sm text-white/70 italic">&ldquo;{COFFEE_CHAT_TEMPLATE.outreach}&rdquo;</p>
          </div>
          <div>
            <p className="text-xs text-white/40 uppercase tracking-wider mb-2">5 Tips</p>
            <div className="space-y-2">
              {COFFEE_CHAT_TEMPLATE.tips.map((t, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <p className="text-sm text-white/70">{t}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mistakes */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Networking Mistakes</h2>
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

        <RelatedPages slug="pm-networking-guide" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Stay Interesting to Your Network</h2>
          <p className="text-white/60 mb-6">Daily PM practice builds the knowledge and stories that make you worth knowing.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
