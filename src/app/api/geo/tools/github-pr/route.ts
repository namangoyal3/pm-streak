import { NextResponse } from "next/server";
import { z } from "zod";

const RequestSchema = z.object({
  slug: z.string(),
  title: z.string(),
  body: z.string().optional(),
  citabilityScore: z.number().optional(),
  labels: z.array(z.string()).optional(),
});

async function githubApi(path: string, method: string, body?: unknown) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN not configured");

  const res = await fetch(`https://api.github.com/repos/namangoyal3/pm-streak${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API ${res.status}: ${text.slice(0, 300)}`);
  }
  return res.json();
}

export async function POST(req: Request) {
  if (req.headers.get("x-api-key") !== process.env.LYZR_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues }, { status: 400 });
  }

  const { slug, title, citabilityScore } = parsed.data;
  const prBody = parsed.data.body ?? `Auto-generated GEO page: ${slug}\n\nCitability score: ${citabilityScore ?? "N/A"}`;

  try {
    // Create a branch
    const branchName = `geo/publish-${slug}-${Date.now()}`;

    // Get main branch SHA
    const mainRef = await githubApi("/git/ref/heads/main", "GET");
    const mainSha = mainRef.object.sha;

    // Create branch
    await githubApi("/git/refs", "POST", {
      ref: `refs/heads/${branchName}`,
      sha: mainSha,
    });

    // Create PR
    const labels = parsed.data.labels ?? [];
    if (citabilityScore && citabilityScore >= 80) {
      labels.push("geo:auto");
    } else if (citabilityScore && citabilityScore >= 70) {
      labels.push("geo:review");
    }

    const pr = await githubApi("/pulls", "POST", {
      title: `[GEO] ${title}`,
      body: prBody,
      head: branchName,
      base: "main",
    });

    // Add labels if any
    if (labels.length > 0) {
      await githubApi(`/issues/${pr.number}/labels`, "POST", { labels }).catch(() => {
        // Labels might not exist yet, that's ok
      });
    }

    return NextResponse.json({
      ok: true,
      pr_number: pr.number,
      pr_url: pr.html_url,
      branch: branchName,
      labels,
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: (e as Error).message.slice(0, 500) },
      { status: 500 }
    );
  }
}
