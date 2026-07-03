import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, breadcrumbSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";

export const metadata: Metadata = {
  title: "About PM Streak & Naman Goyal",
  description:
    "PM Streak is an interactive PM-interview practice platform built by Naman Goyal — 400+ free guides covering PM interviews at Google, Meta, Amazon, Flipkart, and Indian + global tech companies.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About PM Streak & Naman Goyal",
    description:
      "Who builds PM Streak, what it is, and the editorial standards behind its 400+ free PM interview guides.",
    url: `${SITE_URL}/about`,
    images: [{ url: `${SITE_URL}/api/og?title=About+PM+Streak`, width: 1200, height: 630 }],
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${SITE_URL}/about#person`,
        name: AUTHOR_NAME,
        url: `${SITE_URL}/about`,
        jobTitle: "Product Manager",
        description:
          "Product manager and builder of PM Streak, an interactive PM-interview practice platform with 400+ free guides on product management interviews.",
        worksFor: { "@id": `${SITE_URL}/#organization` },
      }} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "About", url: `${SITE_URL}/about` },
      ])} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        {/* Hero / bio */}
        <section className="max-w-3xl mx-auto px-4 pt-20 pb-14">
          <p className="text-xs font-black uppercase tracking-widest text-[#89e219] mb-4">
            About
          </p>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.05] mb-6">
            About PM Streak &amp; {AUTHOR_NAME}
          </h1>
          <p className="text-base leading-relaxed text-white mb-4">
            Hi, I&apos;m {AUTHOR_NAME} — a product manager who built PM Streak because
            most PM interview prep is passive: long articles you read once and forget.
            I wanted something you could actually practice, a little every day.
          </p>
          <p className="text-base leading-relaxed text-[#a8a8a8]">
            {AUTHOR_CREDENTIAL}. I write and maintain the guides on this site, covering
            PM interviews at Google, Meta, Amazon, Flipkart, and dozens of Indian and
            global tech companies.
          </p>
        </section>

        {/* What PM Streak is */}
        <section className="bg-[#16181c] py-14 sm:py-20">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-4xl sm:text-5xl font-black leading-[1.05] mb-6">
              What PM Streak is
            </h2>
            <p className="text-base leading-relaxed text-white mb-4">
              PM Streak is an interactive PM-interview practice platform — think
              Duolingo, but for product management. Short daily lessons, streaks and XP
              to keep you consistent, and practice questions across product sense,
              metrics, execution, strategy, behavioral, and estimation.
            </p>
            <p className="text-base leading-relaxed text-[#a8a8a8]">
              Alongside the practice app, PM Streak publishes 400+ free guides on PM
              interviews and product management careers — from company-specific prep
              (Google, Meta, Amazon, Flipkart, Swiggy, Razorpay, and more) to
              frameworks, salary guides, and career transitions.
            </p>
          </div>
        </section>

        {/* Editorial standards */}
        <section className="max-w-3xl mx-auto px-4 py-14 sm:py-20">
          <h2 className="text-4xl sm:text-5xl font-black leading-[1.05] mb-6">
            Editorial standards
          </h2>
          <div className="bg-[#1f2228] border-2 border-[#2a2e35] rounded-3xl p-7">
            <ul className="space-y-4">
              <li className="text-base leading-relaxed text-white">
                <span className="font-black">Drafted with AI, reviewed by a human.</span>{" "}
                <span className="text-[#a8a8a8]">
                  Guides on this site are drafted with AI assistance, then reviewed,
                  edited, and maintained by me before and after publishing.
                </span>
              </li>
              <li className="text-base leading-relaxed text-white">
                <span className="font-black">Kept current.</span>{" "}
                <span className="text-[#a8a8a8]">
                  Interview processes change. When companies update their loops or
                  formats, the affected guides get updated too.
                </span>
              </li>
              <li className="text-base leading-relaxed text-white">
                <span className="font-black">Corrections welcome.</span>{" "}
                <span className="text-[#a8a8a8]">
                  If you spot something outdated or wrong, tell me — I&apos;d rather fix
                  a guide than have it mislead someone prepping for an interview.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-4xl sm:text-5xl font-black leading-[1.05] mb-3">
            Explore the guides
          </h2>
          <p className="text-[#a8a8a8] mb-6">
            400+ free guides on PM interviews, frameworks, and careers.
          </p>
          <Link
            href="/learn"
            className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all"
          >
            Browse Free PM Guides →
          </Link>
        </section>
      </main>
    </>
  );
}
