import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM MCP &amp; Connector Products (2026) — Building for Anthropic&apos;s MCP Ecosystem",
  description:
    "How PMs build on Model Context Protocol. Connector design, security, distribution, and what MCP means for the AI app stack.",
  keywords: [
    "PM MCP", "Model Context Protocol PM 2026",
  ],
  alternates: { canonical: "/pm-mcp-products" },
  openGraph: {
    title: "PM MCP Products 2026 — PM Streak",
    description: "Building for Anthropic&apos;s MCP ecosystem.",
    url: `${SITE_URL}/pm-mcp-products`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+MCP+Products+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM MCP Products 2026 — PM Streak",
    description: "Building for Anthropic&apos;s MCP ecosystem.",
    images: [`${SITE_URL}/api/og?title=PM+MCP+Products+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "MCP standardises tool/data access across LLM clients",
  "Connectors decide what the agent can actually do",
  "Auth, scopes, and audit are first-class concerns",
  "Distribution shifts from app stores to MCP registries",
  "Security review for connectors is the new procurement bar",
];

const FAQS = [
  {
    q: "Is MCP the new app store for AI?",
    a: "Trending that way. Anthropic&apos;s MCP, OpenAI&apos;s actions, and Google&apos;s extensions all converge on a similar idea: standardised connectors for LLM clients. Whether one protocol wins or several coexist is uncertain, but the &apos;tool layer&apos; is where most app-layer AI value will land in 2026–2028.",
  },
];

export default function PmMcpProductsPage() {
  const dates = pageDates("/pm-mcp-products");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM MCP Products", url: `${SITE_URL}/pm-mcp-products` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM MCP & Connector Products (2026 Edition)",
        description:
          "How PMs build on Model Context Protocol. Connector design, security, distribution, and what MCP means for the AI app stack.",
        image: `${SITE_URL}/api/og?title=PM+MCP+Products+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-mcp-products`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔌</span> The tool layer is where AI app value lands
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM MCP &amp; Connector Products<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            MCP standardises how LLM clients reach tools and data, which shifts the real product surface to connectors: what they&apos;re allowed to do, how auth and scopes are audited, and how they get distributed — increasingly through MCP registries rather than app stores. Security review of connectors is becoming the new procurement bar for AI tools.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics for PMs building MCP connectors.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build MCP PM Skills — Free →
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

        <RelatedPages slug="pm-mcp-products" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice MCP PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
