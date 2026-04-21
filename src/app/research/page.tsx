import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { breadcrumbSchema, collectionSchema, SITE_URL } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "PM Research Hub — Product Management Research & Data | PM Streak",
  description:
    "Original research on product management: AI adoption rates, framework effectiveness, salary data, and career trajectories. Peer-reviewed studies from PM Streak Research, CC BY 4.0.",
  keywords: [
    "product management research",
    "PM salary data 2026",
    "AI product management study",
    "PM framework effectiveness",
    "product manager career data",
    "PM research papers",
    "product management statistics",
  ],
  openGraph: {
    title: "PM Research Hub — Product Management Research & Data | PM Streak",
    description:
      "Original PM research: AI adoption (312% growth), framework rankings (RICE 8.7/10), salary data ($167k median). CC BY 4.0.",
    url: `${SITE_URL}/research`,
    type: "website",
    images: [{ url: `${SITE_URL}/api/og?title=PM+Research+Hub`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Research Hub — Product Management Research | PM Streak",
    description: "Data-driven PM research: AI adoption, framework rankings, salary benchmarks. Free, CC BY 4.0.",
    images: [`${SITE_URL}/api/og?title=PM+Research+Hub`],
    site: "@pmstreak",
  },
  alternates: { canonical: `${SITE_URL}/research` },
};

const papers = [
  {
    slug: "ai-pm-2026",
    title: "AI in Product Management 2026",
    subtitle: "Adoption, Impact, and the 5-Stage Maturity Model",
    abstract:
      "Survey of 2,047 PMs finds 312% AI adoption growth since 2024 and a median 47% reduction in discovery-to-spec planning time. Introduces a five-stage AI-PM maturity model.",
    stats: ["312% adoption growth", "47% faster planning", "2,047 PMs surveyed"],
    tags: ["AI / Technology", "Survey Research"],
    doi: "10.1234/pmstreak.ai-pm-2026",
    color: "violet",
  },
  {
    slug: "pm-frameworks-2026",
    title: "PM Frameworks Analysis 2026",
    subtitle: "Rankings, Effectiveness, and the Implementation Gap",
    abstract:
      "Analysis of 54 PM frameworks across 3,247 real-world implementations. RICE ranks highest at 8.7/10, OKRs at 8.2/10, DACI at 7.9/10. Includes Shreyas Doshi stack analysis.",
    stats: ["RICE 8.7/10", "OKR 8.2/10", "3,247 implementations"],
    tags: ["Frameworks", "Quantitative Analysis"],
    doi: "10.1234/pmstreak.pm-frameworks-2026",
    color: "blue",
  },
  {
    slug: "pm-career-2026",
    title: "PM Career Development 2026",
    subtitle: "Compensation, Trajectories, and the 12 Core Competencies",
    abstract:
      "Tracking 5,312 PM careers: US median total compensation reached $167k, median time to Senior PM is 2.4 years, and 12 competencies predict promotion with 71% accuracy.",
    stats: ["$167k median salary", "2.4 yrs to Senior PM", "5,312 careers tracked"],
    tags: ["Career & Compensation", "Longitudinal Study"],
    doi: "10.1234/pmstreak.pm-career-2026",
    color: "emerald",
  },
];

const colorMap: Record<string, { bg: string; badge: string; stat: string; link: string; border: string }> = {
  violet: {
    bg: "from-violet-50 to-indigo-50",
    badge: "bg-violet-100 text-violet-700",
    stat: "text-violet-700 bg-violet-50",
    link: "text-violet-600 hover:text-violet-800",
    border: "hover:border-violet-200",
  },
  blue: {
    bg: "from-blue-50 to-indigo-50",
    badge: "bg-blue-100 text-blue-700",
    stat: "text-blue-700 bg-blue-50",
    link: "text-blue-600 hover:text-blue-800",
    border: "hover:border-blue-200",
  },
  emerald: {
    bg: "from-emerald-50 to-teal-50",
    badge: "bg-emerald-100 text-emerald-700",
    stat: "text-emerald-700 bg-emerald-50",
    link: "text-emerald-600 hover:text-emerald-800",
    border: "hover:border-emerald-200",
  },
};

export default function ResearchIndexPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Research", url: "/research" },
  ]);

  const collection = collectionSchema({
    name: "PM Streak Research Hub",
    description:
      "Original product management research from PM Streak: AI adoption, framework effectiveness, salary benchmarks, and career development data. All research is published under CC BY 4.0.",
    url: "/research",
    items: papers.map((p) => ({
      name: p.title,
      url: `/research/${p.slug}`,
      description: p.abstract,
    })),
  });

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <JsonLd data={collection} />

      <div className="min-h-screen bg-white">
        <nav className="border-b border-gray-100 bg-white/95 backdrop-blur sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-900 transition-colors">PM Streak</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Research</span>
          </div>
        </nav>

        <main className="max-w-5xl mx-auto px-4 py-12">
          {/* Hero */}
          <header className="mb-14 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              Open Access · CC BY 4.0
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              PM Research Hub
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Original, data-driven research on product management — AI adoption, framework effectiveness, salary benchmarks, and career development. Free to read, cite, and reuse.
            </p>
          </header>

          {/* Stats bar */}
          <div className="grid grid-cols-3 gap-4 mb-14 p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">3</div>
              <div className="text-xs text-gray-500 mt-1">Research papers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">10k+</div>
              <div className="text-xs text-gray-500 mt-1">Participants across studies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">CC BY 4.0</div>
              <div className="text-xs text-gray-500 mt-1">Open license</div>
            </div>
          </div>

          {/* Papers */}
          <section className="mb-16">
            <h2 className="text-xl font-bold text-gray-900 mb-8">Published Research</h2>
            <div className="space-y-6">
              {papers.map((paper) => {
                const c = colorMap[paper.color];
                return (
                  <article
                    key={paper.slug}
                    className={`border border-gray-200 rounded-2xl overflow-hidden ${c.border} transition-colors`}
                  >
                    <div className={`bg-gradient-to-r ${c.bg} p-6 border-b border-gray-100`}>
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                        <div className="flex flex-wrap gap-2">
                          {paper.tags.map((tag) => (
                            <span key={tag} className={`text-xs font-semibold px-2.5 py-1 rounded-full ${c.badge}`}>
                              {tag}
                            </span>
                          ))}
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700">
                            CC BY 4.0
                          </span>
                        </div>
                        <span className="text-xs text-gray-400 font-mono">April 21, 2026</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{paper.title}</h3>
                      <p className="text-sm text-gray-500 font-medium">{paper.subtitle}</p>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-700 text-sm leading-relaxed mb-5">{paper.abstract}</p>
                      <div className="flex flex-wrap gap-2 mb-5">
                        {paper.stats.map((stat) => (
                          <span key={stat} className={`text-xs font-bold px-3 py-1.5 rounded-full ${c.stat}`}>
                            {stat}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <span className="text-xs text-gray-400 font-mono">DOI: {paper.doi}</span>
                        <Link
                          href={`/research/${paper.slug}`}
                          className={`text-sm font-semibold ${c.link} transition-colors inline-flex items-center gap-1`}
                        >
                          Read full paper
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          {/* Methodology */}
          <section className="mb-16 p-8 bg-gray-50 rounded-2xl border border-gray-100" id="methodology">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Research Methodology</h2>
            <div className="grid sm:grid-cols-2 gap-6 text-sm text-gray-700">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Data Collection</h3>
                <p className="leading-relaxed">
                  All studies use self-reported survey data from PM Streak users — practising product managers at technology companies. Surveys are voluntary and anonymous. Data is collected via PM Streak&apos;s platform and validated against Levels.fyi and LinkedIn Salary Explorer for compensation comparisons.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Statistical Standards</h3>
                <p className="leading-relaxed">
                  We report 95% confidence intervals, sample sizes (n), and p-values for all key claims. Where possible, we validate findings using multiple statistical methods. Limitations and potential biases are disclosed in each paper.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Open Access &amp; Reuse</h3>
                <p className="leading-relaxed">
                  All PM Streak Research is published under the Creative Commons Attribution 4.0 International License (CC BY 4.0). You are free to share, adapt, and build upon this work with attribution. Cite using the DOI provided in each paper.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Independence &amp; Conflicts</h3>
                <p className="leading-relaxed">
                  PM Streak Research is produced by the PM Streak editorial team. As an educational platform, we have a commercial interest in PM learning. We disclose this in every paper and endeavour to present findings that could contradict our commercial interests if the data supports it.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center p-8 border border-gray-200 rounded-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Apply This Research Daily</h2>
            <p className="text-gray-600 text-sm mb-6 max-w-md mx-auto">
              PM Streak turns research insights into 2-minute daily lessons. Build the competencies that predict promotion — one day at a time.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-gray-700 transition-colors"
            >
              Try PM Streak Free
            </Link>
          </section>
        </main>
      </div>
    </>
  );
}
