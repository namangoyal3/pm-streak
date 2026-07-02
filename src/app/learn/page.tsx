import { prisma } from "@/lib/prisma";
import Link from "next/link";
import type { Metadata } from "next";
import JsonLd, { breadcrumbSchema, courseSchema } from "@/components/JsonLd";

// Always server-render — content is added continuously by the SEO agent
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Learn Product Management — Free PM Articles & Guides",
  description:
    "Free in-depth articles on product management, PM interviews, roadmaps, metrics, career growth, and leadership. Expert-reviewed PM guides from 300+ PM interviews, updated weekly.",
  alternates: { canonical: "https://learnanything.pro/learn" },
  openGraph: {
    title: "Learn Product Management — Free PM Articles & Guides",
    description: "300+ free expert-reviewed articles on PM interviews, roadmaps, metrics, career growth, and leadership. Updated weekly.",
    url: "https://learnanything.pro/learn",
    type: "website",
    siteName: "PM Streak",
    images: [{ url: "https://learnanything.pro/api/og?title=Learn+Product+Management", width: 1200, height: 630, alt: "Learn Product Management — PM Streak" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn Product Management — Free PM Articles | PM Streak",
    description: "300+ free PM articles on strategy, metrics, roadmaps, and career growth. Expert-reviewed, updated weekly.",
    images: ["https://learnanything.pro/api/og?title=Learn+Product+Management"],
    site: "@pmstreak",
  },
};

const VERTICAL_LABELS: Record<string, string> = {
  pm: "Product Management",
  design: "Design",
  engineering: "Engineering",
  growth: "Growth",
};

export default async function LearnPage() {
  const articles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      vertical: true,
      wordCount: true,
      publishedAt: true,
      tags: true,
    },
  });

  const verticals = [...new Set(articles.map((a) => a.vertical))];

  if (articles.length === 0) {
    return (
      <main className="min-h-screen bg-[var(--bg-primary)] text-white px-4 py-16 max-w-3xl mx-auto">
        <h1 className="text-3xl font-black tracking-tight mb-4">Learn</h1>
        <p className="text-[var(--text-secondary)]">
          Articles coming soon — new expert-reviewed PM guides publish weekly.
        </p>
        <Link
          href="/dashboard"
          className="mt-8 inline-block text-sm font-bold text-[var(--text-secondary)] hover:text-white transition-colors"
        >
          Back to app
        </Link>
      </main>
    );
  }

  const learnBreadcrumbs = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Learn", url: "/learn" },
  ]);

  const pmCourse = courseSchema({
    name: "Product Management Fundamentals",
    description:
      "Free articles and guides covering product management, PM interviews, roadmaps, metrics, career growth, and leadership.",
    provider: "PM Streak",
    url: "/learn",
  });

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-white px-4 py-12 max-w-4xl mx-auto">
      <JsonLd data={learnBreadcrumbs} />
      <JsonLd data={pmCourse} />
      <div className="mb-10">
        <h1 className="text-3xl font-black tracking-tight mb-2">Learn</h1>
        <p className="text-[var(--text-secondary)] text-sm">
          Practical articles on product management, career growth, and PM skills. New content added weekly.
        </p>
      </div>

      {verticals.map((vertical) => {
        const verticalArticles = articles.filter((a) => a.vertical === vertical);
        return (
          <section key={vertical} className="mb-12">
            <h2 className="text-xs font-black uppercase tracking-widest text-[var(--green-primary)] mb-4">
              {VERTICAL_LABELS[vertical] ?? vertical}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {verticalArticles.map((article) => {
                const readTime = Math.ceil(article.wordCount / 200);
                return (
                  <Link
                    key={article.id}
                    href={`/learn/${article.vertical}/${article.slug}`}
                    className="block bg-[var(--bg-card)] rounded-2xl border-2 border-b-4 border-[var(--border-color)] p-5 hover:bg-[var(--bg-secondary)] active:border-b-2 active:translate-y-[2px] transition-all"
                  >
                    <p className="text-[10px] text-[var(--text-secondary)] font-black mb-2 uppercase tracking-wide">
                      {VERTICAL_LABELS[vertical] ?? vertical} &middot; {readTime} min read
                    </p>
                    <h3 className="text-base font-bold mb-1 leading-snug">{article.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)] line-clamp-2">{article.description}</p>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}

      <div className="mt-16 border-t-2 border-[var(--border-color)] pt-8 text-center">
        <p className="text-[var(--text-secondary)] text-sm mb-4">
          Want to apply what you learn? Practice daily with PM Streak.
        </p>
        <Link
          href="/signup"
          className="inline-block rounded-2xl bg-[var(--green-primary)] hover:bg-[var(--green-dark)] border-b-4 border-[var(--green-dark)] active:border-b-2 active:translate-y-[2px] text-white font-black px-6 py-3 text-sm uppercase tracking-wide transition-all"
        >
          Start your PM streak
        </Link>
      </div>
    </main>
  );
}
