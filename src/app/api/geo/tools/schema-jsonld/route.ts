import { NextResponse } from "next/server";
import { z } from "zod";

const RequestSchema = z.object({
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  content: z.string(),
  author: z.string().optional(),
  datePublished: z.string().optional(),
  faqs: z
    .array(z.object({ question: z.string(), answer: z.string() }))
    .optional(),
});

export async function POST(req: Request) {
  if (req.headers.get("x-api-key") !== process.env.LYZR_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues }, { status: 400 });
  }

  const { title, description, slug, author, datePublished, faqs } = parsed.data;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://pmstreak.com";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${appUrl}/blog/${slug}`,
    author: {
      "@type": "Organization",
      name: author ?? "PM Streak",
      url: appUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "PM Streak",
      url: appUrl,
      logo: {
        "@type": "ImageObject",
        url: `${appUrl}/logo.png`,
      },
    },
    datePublished: datePublished ?? new Date().toISOString(),
    dateModified: new Date().toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${appUrl}/blog/${slug}`,
    },
  };

  const schemas: Record<string, unknown>[] = [articleSchema];

  if (faqs && faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    } as Record<string, unknown>);
  }

  return NextResponse.json({ schemas });
}
