import { prisma } from "@/lib/prisma";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import JsonLd, { breadcrumbSchema, faqSchema, howToSchema, speakableSchema, SITE_URL } from "@/components/JsonLd";

// Articles are added by the SEO agent without deploys — render on-demand but cache for 24h
export const revalidate = 86400;

interface Props {
  params: Promise<{ vertical: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, vertical } = await params;
  const article = await prisma.article.findUnique({
    where: { slug, published: true },
    select: { title: true, description: true, publishedAt: true, updatedAt: true },
  });
  if (!article) return { title: "Article not found" };
  const canonicalUrl = `${SITE_URL}/learn/${vertical}/${slug}`;
  const ogImageUrl = `${SITE_URL}/api/og?title=${encodeURIComponent(article.title)}&vertical=${encodeURIComponent(vertical)}`;
  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url: canonicalUrl,
      type: "article",
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: article.title }],
      ...(article.publishedAt ? { publishedTime: article.publishedAt.toISOString() } : {}),
      modifiedTime: article.updatedAt.toISOString(),
      authors: ["PM Streak Editorial"],
      siteName: "PM Streak",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [ogImageUrl],
      site: "@pmstreak",
    },
    other: {
      "article:modified_time": article.updatedAt.toISOString(),
      ...(article.publishedAt ? { "article:published_time": article.publishedAt.toISOString() } : {}),
    },
  };
}

export async function generateStaticParams() {
  try {
    const articles = await prisma.article.findMany({
      where: { published: true },
      select: { slug: true, vertical: true },
    });
    return articles.map((a) => ({ vertical: a.vertical, slug: a.slug }));
  } catch {
    return [];
  }
}

const VERTICAL_LABELS: Record<string, string> = {
  pm: "Product Management",
  design: "Design",
  engineering: "Engineering",
  growth: "Growth",
};

export default async function ArticlePage({ params }: Props) {
  const { slug, vertical } = await params;
  const article = await prisma.article.findUnique({
    where: { slug, published: true },
  });

  if (!article) notFound();

  const readTime = Math.ceil(article.wordCount / 200);
  const publishedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const faqPairs: { question: string; answer: string }[] = [];
  const howToSteps: { name: string; text: string }[] = [];
  const articleUrl = `${SITE_URL}/learn/${vertical}/${slug}`;

  const ogImageUrl = `${SITE_URL}/api/og?title=${encodeURIComponent(article.title)}&vertical=${encodeURIComponent(vertical)}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": articleUrl,
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt?.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    url: articleUrl,
    image: {
      "@type": "ImageObject",
      url: ogImageUrl,
      width: 1200,
      height: 630,
    },
    publisher: {
      "@type": "Organization",
      name: "PM Streak",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.svg`,
        width: 512,
        height: 512,
      },
    },
    author: {
      "@type": "Organization",
      name: "PM Streak Editorial",
      url: SITE_URL,
    },
    keywords: article.tags.join(", "),
    inLanguage: "en-US",
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "PM Streak",
      url: SITE_URL,
    },
  };

  const related = await prisma.article.findMany({
    where: { published: true, vertical, slug: { not: slug } },
    take: 3,
    orderBy: { publishedAt: "desc" },
    select: { slug: true, title: true, description: true, wordCount: true, vertical: true },
  });

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Learn", url: "/learn" },
        { name: VERTICAL_LABELS[vertical] ?? vertical, url: `/learn/${vertical}` },
        { name: article.title, url: `/learn/${vertical}/${slug}` },
      ])} />
      {faqPairs.length > 0 && <JsonLd data={faqSchema(faqPairs)} />}
      {howToSteps.length > 0 && <JsonLd data={howToSchema({
        name: article.title,
        description: article.description,
        steps: howToSteps,
      })} />}
      <JsonLd data={speakableSchema(["h1", ".prose-article p:first-of-type"])} />
      <main className="min-h-screen bg-[var(--bg-primary)] text-white">
        <div className="max-w-2xl mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <nav className="text-xs text-[var(--text-secondary)] mb-8 flex gap-2">
            <Link href="/learn" className="hover:text-white">
              Learn
            </Link>
            <span>/</span>
            <span>{VERTICAL_LABELS[vertical] ?? vertical}</span>
          </nav>

          {/* Header */}
          <header className={`mb-8 pb-6 border-b ${article.pageType === "framework" ? "border-blue-500/20" : article.pageType === "interview_guide" ? "border-purple-500/20" : "border-white/10"}`}>
            <p className="text-xs font-bold text-[var(--green-primary)] uppercase tracking-wider mb-3">
              {VERTICAL_LABELS[vertical] ?? vertical} 
              {article.pageType !== "blog" && ` · ${article.pageType.replace("_", " ")}`}
              &middot; {readTime} min read
              {publishedDate && ` · ${publishedDate}`}
            </p>
            <h1 className="text-3xl font-black leading-tight mb-3 tracking-tight">{article.title}</h1>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed">{article.description}</p>
            <div className="flex items-center gap-2 mt-4 text-xs text-[var(--text-secondary)]">
              <span className="font-semibold text-white">PM Streak Editorial</span>
              <span>·</span>
              <span>Expert-reviewed PM content sourced from 300+ Lenny&apos;s Podcast episodes</span>
            </div>
          </header>

          {/* Article body */}
          <article className={`prose-article ${article.pageType === "framework" ? "prose-framework" : ""}`}>
            <ReactMarkdown
              components={{
                h2: ({ children }) => (
                  <h2 className="text-xl font-black mt-8 mb-3 text-white">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg font-bold mt-6 mb-2 text-white">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="text-[var(--text-secondary)] leading-relaxed mb-4">{children}</p>
                ),
                strong: ({ children }) => (
                  <strong className="text-white font-bold">{children}</strong>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside mb-4 space-y-1 text-[var(--text-secondary)]">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside mb-4 space-y-1 text-[var(--text-secondary)]">
                    {children}
                  </ol>
                ),
                li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-[var(--green-primary)] underline hover:opacity-80"
                    target={href?.startsWith("http") ? "_blank" : undefined}
                    rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {children}
                  </a>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-[var(--green-primary)] pl-4 my-4 italic text-[var(--text-secondary)]">
                    {children}
                  </blockquote>
                ),
                code: ({ children }) => (
                  <code className="bg-[var(--bg-secondary)] px-1.5 py-0.5 rounded text-sm font-mono text-[var(--green-primary)]">
                    {children}
                  </code>
                ),
                img: ({ src, alt }) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={src}
                    alt={alt ?? ""}
                    className="w-full rounded-xl my-6 object-cover max-h-[400px]"
                    loading="eager"
                    fetchPriority="high"
                  />
                ),
              }}
            >
              {article.body}
            </ReactMarkdown>
          </article>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-8 mb-10">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[var(--bg-secondary)] text-xs px-3 py-1 rounded-full text-[var(--text-secondary)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 my-10 text-center">
            <p className="font-black text-lg mb-1">Practice what you just learned</p>
            <p className="text-[var(--text-secondary)] text-sm mb-4">
              PM Streak gives you daily 3-minute lessons with streaks, XP, and a leaderboard.
            </p>
            <Link
              href="/signup"
              className="inline-block bg-[var(--green-primary)] text-white font-black px-6 py-3 rounded-2xl text-sm hover:opacity-90 transition-opacity"
            >
              Start your streak &mdash; it&apos;s free
            </Link>
          </div>

          {/* Related articles */}
          {related.length > 0 && (
            <section className="mt-12">
              <h2 className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-4">
                Related Articles
              </h2>
              <div className="space-y-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/learn/${r.vertical}/${r.slug}`}
                    className="block bg-[var(--bg-secondary)] rounded-xl p-4 hover:bg-[var(--bg-tertiary)] transition-colors"
                  >
                    <p className="text-sm font-bold mb-1">{r.title}</p>
                    <p className="text-xs text-[var(--text-secondary)] line-clamp-1">{r.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
