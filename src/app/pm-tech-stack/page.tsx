import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "The PM Tech Stack You Should Understand (2026) — APIs, Databases, Infra for PMs",
  description:
    "The technical concepts every PM needs to understand (without coding). APIs, databases, caches, queues, CDNs, observability — explained for PMs who work with engineers.",
  keywords: [
    "PM tech stack", "PM technical concepts",
    "technical concepts product manager", "APIs databases PM",
    "PM system design basics 2026",
  ],
  alternates: { canonical: "/pm-tech-stack" },
  openGraph: {
    title: "PM Tech Stack Guide 2026 — PM Streak",
    description: "The technical concepts every PM should understand — APIs, databases, infra, explained for PMs.",
    url: `${SITE_URL}/pm-tech-stack`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Tech+Stack+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Tech Stack Guide 2026 — PM Streak",
    description: "The technical concepts every PM should understand — APIs, databases, infra, explained for PMs.",
    images: [`${SITE_URL}/api/og?title=PM+Tech+Stack+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const CONCEPTS = [
  {
    concept: "API",
    what: "A way for software systems to talk to each other — sending requests, getting responses.",
    why: "Every integration with a third party, every mobile app, every front-end/back-end split runs through APIs. Every PM needs fluency here." ,
  },
  {
    concept: "REST vs GraphQL",
    what: "Two API styles. REST: fixed endpoints, multiple calls. GraphQL: one endpoint, flexible queries.",
    why: "GraphQL is more flexible but more complex. Understand the trade-off when your team is picking between them." ,
  },
  {
    concept: "Database (SQL vs NoSQL)",
    what: "Where data is stored. SQL (Postgres, MySQL): structured, relational. NoSQL (Mongo, DynamoDB): flexible, schema-less.",
    why: "Most product decisions have database implications. Knowing which type you&apos;re on shapes what&apos;s easy vs hard to build." ,
  },
  {
    concept: "Caching",
    what: "Storing frequently-accessed data closer to the user for speed. Redis, Memcached, CDN caches.",
    why: "Speed issues often come down to caching. Understanding caching helps you reason about performance trade-offs." ,
  },
  {
    concept: "Queues / Async processing",
    what: "Work deferred to run in the background (Kafka, RabbitMQ, SQS). Instead of doing work in real time.",
    why: "&apos;Why is this feature slow?&apos; often has an answer in queues — knowing this changes how you scope features." ,
  },
  {
    concept: "CDN (Content Delivery Network)",
    what: "Global network of servers that cache static content near users (Cloudflare, Akamai, Fastly).",
    why: "CDNs make apps feel fast globally. Understanding them matters for any user-facing product at scale." ,
  },
  {
    concept: "Load balancer",
    what: "Distributes incoming requests across multiple servers to handle scale.",
    why: "Scaling is basically load balancing + caching + databases done right. PMs who understand this model reason about capacity well." ,
  },
  {
    concept: "Observability (logs, metrics, traces)",
    what: "Instrumentation that lets engineers see what&apos;s happening inside running systems.",
    why: "Debugging production issues depends on this. PMs who understand observability write better instrumentation requirements." ,
  },
  {
    concept: "Microservices vs monolith",
    what: "Monolith: one big codebase. Microservices: many small services talking via APIs.",
    why: "Architecture decisions affect velocity, reliability, and what&apos;s easy vs hard to change. PMs should know the current architecture of their product." ,
  },
  {
    concept: "Auth (OAuth, JWT, SSO)",
    what: "How users log in and prove who they are. OAuth is the common standard for third-party login.",
    why: "Every integration, every user account, every permission system depends on this. Learn it once — you&apos;ll use it forever." ,
  },
];

const WHAT_TO_LEARN_FIRST = [
  "APIs — what they are, how REST works, what status codes mean (200, 400, 500)",
  "Databases — basic SQL queries (SELECT, FROM, WHERE, JOIN), what an index does",
  "Async processing — what queues are, why some operations are slow",
  "Caching — at a conceptual level; you don&apos;t need to implement it",
  "Observability — what logs, metrics, traces are; know how your product is monitored",
];

const HOW_TO_LEARN = [
  "Shadow an engineer for half a day when they&apos;re debugging — the best learning happens here",
  "Read architecture diagrams of your own product — ask an eng lead to walk you through",
  "Build a simple side project (even no-code) that uses an API, a DB, and auth",
  "Read system design interview prep content at a conceptual level (don&apos;t need to solve the problems)",
  "Subscribe to 1 engineering blog (AWS, Cloudflare, Stripe) — skim weekly",
];

const FAQS = [
  {
    q: "How technical does a PM actually need to be?",
    a: "Technical enough to have real conversations with engineers — not enough to write production code. The bar: you should be able to read an architecture diagram and understand 70% of it. You should be able to ask clarifying questions that aren&apos;t stupid. You should understand why some features are &apos;simple&apos; and others are &apos;complex&apos; without needing someone to explain every time.",
  },
  {
    q: "Do PMs need to know SQL?",
    a: "For most data-driven companies, yes. Basic SQL (SELECT, FROM, WHERE, JOIN, GROUP BY) covers 80% of PM use cases. You don&apos;t need to be fast; you need to be able to write a query to answer a simple question without waiting a week for an analyst. SQL fluency makes PMs 3x more self-sufficient on data questions.",
  },
  {
    q: "Is a PM expected to know every concept here?",
    a: "Conceptually, yes — deeply, no. You should understand what a CDN is, but you don&apos;t need to configure one. You should know what microservices are, but you don&apos;t need to design them. The test: can you discuss trade-offs (speed vs cost, flexibility vs complexity) without faking it? If yes, you&apos;re technical enough.",
  },
];

export default function PmTechStackPage() {
  const dates = pageDates("/pm-tech-stack");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Tech Stack", url: `${SITE_URL}/pm-tech-stack` },
      ])} />
      <JsonLd data={articleSchema({
        headline: "The PM Tech Stack You Should Understand (2026) — APIs, Databases, Infra for PMs",
        description:
          "The technical concepts every PM needs to understand (without coding). APIs, databases, caches, queues, CDNs, observability — explained for PMs who work with engineers.",
        image: `${SITE_URL}/api/og?title=PM+Tech+Stack+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-tech-stack`,
      })} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>⚙️</span> Engineers trust PMs who understand their world
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Tech Stack Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Without needing to write code, PMs can build technical fluency around ten
            concepts covered here — APIs, REST vs GraphQL, SQL vs NoSQL databases,
            caching, queues, CDNs, load balancers, observability, microservices vs
            monoliths, and auth — plus what to learn first and five concrete ways to
            build that fluency.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            10 technical concepts every PM should understand (conceptually, not as an engineer),
            what to learn first, and how to build technical fluency deliberately.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Technical Fluency Daily — Free →
          </Link>
        </section>

        {/* Concepts */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">10 Technical Concepts for PMs</h2>
          <div className="space-y-4">
            {CONCEPTS.map((c, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <p className="font-bold text-white mb-1">{i + 1}. {c.concept}</p>
                <p className="text-sm text-white/70 mb-2">{c.what}</p>
                <p className="text-xs text-[#89e219]">💡 Why PMs need this: <span className="text-white/70">{c.why}</span></p>
              </div>
            ))}
          </div>
        </section>

        {/* Learn first */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Things to Learn First</h2>
            <div className="space-y-2">
              {WHAT_TO_LEARN_FIRST.map((l, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to learn */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Ways to Build Technical Fluency</h2>
          <div className="space-y-2">
            {HOW_TO_LEARN.map((h, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{h}</p>
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

        <RelatedPages slug="pm-tech-stack" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Earn Engineering Trust Through Fluency</h2>
          <p className="text-white/60 mb-6">Daily PM scenarios that build technical intuition without requiring you to code.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
