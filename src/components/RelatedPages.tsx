import Link from "next/link";
import { relatedSlugs } from "@/lib/seo/topic-map";

interface RelatedPagesProps {
  slug: string;
}

/**
 * Internal-linking block for static SEO landing pages.
 *
 * Server component — renders same-topic-cluster sibling guides from
 * `src/lib/seo/topic-map.ts`. Drop at the bottom of any SEO page:
 * `<RelatedPages slug="google-pm-interview" />`.
 * Renders nothing when the slug has fewer than 2 cluster siblings.
 */
export default function RelatedPages({ slug }: RelatedPagesProps) {
  const links = relatedSlugs(slug);
  if (links.length < 2) return null;

  return (
    <section aria-labelledby="related-guides-heading" className="max-w-4xl mx-auto px-4 py-14">
      <p className="text-xs font-black uppercase tracking-widest text-[var(--green-primary)] mb-2">
        Keep learning
      </p>
      <h2
        id="related-guides-heading"
        className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-6"
      >
        Related guides
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {links.map((link) => (
          <Link
            key={link.slug}
            href={`/${link.slug}`}
            className="group flex flex-col justify-between rounded-2xl border-2 border-b-4 border-[var(--border-color)] bg-[var(--bg-card)] p-5 transition-all hover:border-[var(--green-primary)] hover:-translate-y-0.5 active:translate-y-[2px] active:border-b-2"
          >
            <p className="text-base font-black leading-snug text-white transition-colors group-hover:text-[var(--green-primary)]">
              {link.title}
            </p>
            <p className="text-xs font-black uppercase tracking-widest text-[var(--text-secondary)] mt-3 transition-colors group-hover:text-[var(--green-primary)]">
              Read guide →
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
