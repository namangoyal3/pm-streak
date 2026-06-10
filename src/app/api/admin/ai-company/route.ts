import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;

  try {
    const { directive } = await req.json();
    const token = process.env.GITHUB_TOKEN;
    
    if (!token) {
      return NextResponse.json({ error: "GITHUB_TOKEN not configured in Vercel environment variables" }, { status: 500 });
    }

    // Trigger the GitHub Action workflow
    const response = await fetch("https://api.github.com/repos/namangoyal3/pm-streak/actions/workflows/ai-company-swarm.yml/dispatches", {
      method: "POST",
      headers: {
        "Accept": "application/vnd.github.v3+json",
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "PM-Streak-Admin"
      },
      body: JSON.stringify({
        ref: "main",
        inputs: {
          directive: directive || "Review our recent metrics and deploy a new A/B test to improve Pro conversion rates."
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: `GitHub API error: ${response.status} ${errorText}` }, { status: 500 });
    }

    return NextResponse.json({ ok: true, message: "✅ AI Board Meeting triggered successfully on GitHub Actions!" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
