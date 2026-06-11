/**
 * Reusable JSON-LD structured data component for SEO/GEO optimization.
 * Renders a <script type="application/ld+json"> tag with the given data.
 */

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export default function JsonLd({ data }: JsonLdProps) {
  // Escape `</` sequences so agent-authored content cannot break out of the script tag.
  const safeJson = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJson }}
    />
  );
}

/* ── Schema builder helpers ─────────────────────────────── */

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://learnanything.pro";
const SITE_NAME = "PM Streak";

export function breadcrumbSchema(
  items: { name: string; url: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export function faqSchema(
  pairs: { question: string; answer: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pairs.map((p) => ({
      "@type": "Question",
      name: p.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: p.answer,
      },
    })),
  };
}

export function howToSchema(opts: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
  totalTime?: string; // ISO 8601 duration e.g. "PT2M"
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    description: opts.description,
    ...(opts.totalTime ? { totalTime: opts.totalTime } : {}),
    step: opts.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export function courseSchema(opts: {
  name: string;
  description: string;
  provider: string;
  url: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: opts.name,
    description: opts.description,
    url: opts.url.startsWith("http") ? opts.url : `${SITE_URL}${opts.url}`,
    provider: {
      "@type": "Organization",
      name: opts.provider,
      url: SITE_URL,
    },
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      category: "Free",
    },
  };
}

export function speakableSchema(cssSelectors: string[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: cssSelectors,
    },
  };
}

export { SITE_URL, SITE_NAME };

export function articleSchema(opts: {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: { name: string; url: string };
  publisher: { name: string; url: string };
  url?: string;
  keywords?: string[];
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    image: {
      "@type": "ImageObject",
      url: opts.image,
      width: 1200,
      height: 630,
    },
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    inLanguage: "en-US",
    ...(opts.url ? { url: opts.url, mainEntityOfPage: { "@type": "WebPage", "@id": opts.url } } : {}),
    ...(opts.keywords ? { keywords: opts.keywords.join(", ") } : {}),
    author: {
      "@type": "Person",
      name: opts.author.name,
      url: opts.author.url,
    },
    publisher: {
      "@type": "Organization",
      name: opts.publisher.name,
      url: opts.publisher.url,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.svg`,
        width: 512,
        height: 512,
      },
    },
  };
}

export function webPageSchema(opts: {
  url: string;
  name: string;
  description: string;
  dateModified?: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${opts.url.startsWith("http") ? opts.url : `${SITE_URL}${opts.url}`}#webpage`,
    url: opts.url.startsWith("http") ? opts.url : `${SITE_URL}${opts.url}`,
    name: opts.name,
    description: opts.description,
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
    },
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
  };
}

export function researchPaperSchema(opts: {
  headline: string;
  description: string;
  url: string;
  doi: string;
  datePublished: string;
  keywords: string[];
  abstract: string;
  license?: string;
}): Record<string, unknown> {
  const fullUrl = opts.url.startsWith("http") ? opts.url : `${SITE_URL}${opts.url}`;
  return {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    "@id": `${fullUrl}#article`,
    headline: opts.headline,
    description: opts.description,
    abstract: opts.abstract,
    url: fullUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": fullUrl },
    datePublished: opts.datePublished,
    dateModified: opts.datePublished,
    inLanguage: "en-US",
    keywords: opts.keywords.join(", "),
    identifier: { "@type": "PropertyValue", propertyID: "doi", value: opts.doi },
    license: opts.license ?? "https://creativecommons.org/licenses/by/4.0/",
    author: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg`, width: 512, height: 512 },
    },
    isPartOf: {
      "@type": "Periodical",
      name: "PM Streak Research",
      url: `${SITE_URL}/research`,
    },
  };
}

export function datasetSchema(opts: {
  name: string;
  description: string;
  url: string;
  license?: string;
  keywords: string[];
  datePublished: string;
}): Record<string, unknown> {
  const fullUrl = opts.url.startsWith("http") ? opts.url : `${SITE_URL}${opts.url}`;
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: opts.name,
    description: opts.description,
    url: fullUrl,
    keywords: opts.keywords,
    license: opts.license ?? "https://creativecommons.org/licenses/by/4.0/",
    datePublished: opts.datePublished,
    creator: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    distribution: {
      "@type": "DataDownload",
      encodingFormat: "text/html",
      contentUrl: fullUrl,
    },
    isAccessibleForFree: true,
  };
}

export function collectionSchema(opts: {
  name: string;
  description: string;
  url: string;
  items: { name: string; url: string; description: string }[];
}): Record<string, unknown> {
  const fullUrl = opts.url.startsWith("http") ? opts.url : `${SITE_URL}${opts.url}`;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: opts.name,
    description: opts.description,
    url: fullUrl,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    hasPart: opts.items.map((item) => ({
      "@type": "ScholarlyArticle",
      name: item.name,
      description: item.description,
      url: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}
