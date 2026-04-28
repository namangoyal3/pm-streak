import { NextResponse } from "next/server";
import { z } from "zod";
import { createCitation } from "@/lib/geo/safe-prisma";

const ALLOWED_DIRECTORIES = ["g2", "capterra", "alternativeto", "producthunt"] as const;

const RequestSchema = z.object({
  pageSlug: z.string(),
  directory: z.enum(ALLOWED_DIRECTORIES),
  title: z.string(),
  description: z.string(),
  category: z.string().optional(),
  url: z.string().url(),
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

  const { pageSlug, directory, title, description, category, url } = parsed.data;

  // Build draft body based on directory
  const draftBody = JSON.stringify({
    directory,
    title,
    description,
    category: category ?? "Product Management",
    url,
    submissionUrl: getDirectorySubmitUrl(directory),
    instructions: getDirectoryInstructions(directory),
  });

  // Save as draft — NEVER auto-submit
  const citation = await createCitation({
    pageSlug,
    source: `directory:${directory}`,
    url,
    status: "drafted",
    draftBody,
  });

  return NextResponse.json({
    ok: true,
    id: citation.id,
    status: "drafted",
    message: "Draft saved. Requires human approval before submission.",
    directory,
  });
}

function getDirectorySubmitUrl(directory: string): string {
  switch (directory) {
    case "g2":
      return "https://www.g2.com/products/new";
    case "capterra":
      return "https://www.capterra.com/vendors/sign-up";
    case "alternativeto":
      return "https://alternativeto.net/manage/add-app/";
    case "producthunt":
      return "https://www.producthunt.com/posts/new";
    default:
      return "";
  }
}

function getDirectoryInstructions(directory: string): string {
  switch (directory) {
    case "g2":
      return "1. Go to G2 vendor portal. 2. Claim your product listing. 3. Fill in the details from this draft. 4. Submit for review.";
    case "capterra":
      return "1. Sign up as a vendor on Capterra. 2. Add your product listing. 3. Use the description from this draft. 4. Submit.";
    case "alternativeto":
      return "1. Go to AlternativeTo. 2. Click 'Add Application'. 3. Fill in details. 4. Submit for community review.";
    case "producthunt":
      return "1. Go to Product Hunt. 2. Click 'Post a product'. 3. Use the title and description. 4. Schedule your launch.";
    default:
      return "";
  }
}
