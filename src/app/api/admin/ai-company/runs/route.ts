import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      return NextResponse.json({ error: "No GITHUB_TOKEN configured" }, { status: 500 });
    }

    const response = await fetch("https://api.github.com/repos/namangoyal3/pm-streak/actions/workflows/ai-company-swarm.yml/runs?per_page=10", {
      headers: {
        "Accept": "application/vnd.github.v3+json",
        "Authorization": `Bearer ${token}`,
        "User-Agent": "PM-Streak-Admin"
      }
    });

    if (!response.ok) {
      return NextResponse.json({ error: await response.text() }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({
      runs: data.workflow_runs.map((r: any) => ({
        id: r.id,
        status: r.status,
        conclusion: r.conclusion,
        createdAt: r.created_at,
        url: r.html_url
      }))
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
