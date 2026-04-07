import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const runId = url.searchParams.get("runId");
    if (!runId) return NextResponse.json({ error: "Missing runId param" }, { status: 400 });

    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      return NextResponse.json({ error: "No GITHUB_TOKEN configured" }, { status: 500 });
    }

    // 1. Get the job ID for the run
    const jobsRes = await fetch(`https://api.github.com/repos/namangoyal3/pm-streak/actions/runs/${runId}/jobs`, {
      headers: {
        "Accept": "application/vnd.github.v3+json",
        "Authorization": `Bearer ${token}`,
        "User-Agent": "PM-Streak-Admin"
      }
    });

    if (!jobsRes.ok) throw new Error(await jobsRes.text());
    const jobsData = await jobsRes.json();
    if (!jobsData.jobs || jobsData.jobs.length === 0) {
      return NextResponse.json({ logs: "No jobs found for this run." });
    }

    const jobId = jobsData.jobs[0].id;

    // 2. Fetch the text logs
    const logsRes = await fetch(`https://api.github.com/repos/namangoyal3/pm-streak/actions/jobs/${jobId}/logs`, {
      headers: {
        "Accept": "application/vnd.github.v3+json",
        "Authorization": `Bearer ${token}`,
        "User-Agent": "PM-Streak-Admin"
      }
    });

    if (!logsRes.ok) {
      if (logsRes.status === 404 || logsRes.status === 410) {
        return NextResponse.json({ logs: "Logs are not available yet (the job may still be initializing constraints)." });
      }
      throw new Error(`Failed to fetch logs: ${logsRes.status}`);
    }

    const rawLogs = await logsRes.text();
    
    // Clean up timestamps and action boilerplate for better readability
    const cleanedLogs = rawLogs.split("\\n")
        .map(line => line.replace(/^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d+Z\\s/, ""))
        .join("\\n");

    return NextResponse.json({ logs: cleanedLogs });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
