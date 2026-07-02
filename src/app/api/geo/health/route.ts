import { NextResponse } from "next/server";
import { agentSwarm } from "@/lib/agentic-site";

const requiredEnv = [
  "LYZR_API_KEY",
  "LYZR_KB_ID",
  "LYZR_AGENT_CORTEX",
  "LYZR_AGENT_BLUEPRINT",
  "LYZR_AGENT_SCOUT",
  "LYZR_AGENT_FORGE",
  "LYZR_AGENT_RIVAL",
  "LYZR_AGENT_SIGNAL",
  "LYZR_AGENT_ANCHOR",
  "LYZR_AGENT_PULSE",
  "LYZR_CONDUCTOR_ID",
  "CRON_SECRET",
];

export async function GET() {
  const env = Object.fromEntries(requiredEnv.map((key) => [key, Boolean(process.env[key])]));
  const missing = requiredEnv.filter((key) => !process.env[key]);
  const ga4 = {
    client: Boolean(process.env.NEXT_PUBLIC_GA_ID),
    server_events: Boolean(process.env.GA4_MEASUREMENT_SECRET),
    posthog: Boolean(process.env.NEXT_PUBLIC_POSTHOG_KEY),
    indexnow: Boolean(process.env.INDEXNOW_KEY),
    gsc: Boolean(process.env.GA4_SERVICE_ACCOUNT_KEY) && Boolean(process.env.GSC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL),
  };

  return NextResponse.json(
    {
      ok: missing.length === 0,
      missing,
      env,
      ga4,
      agents: agentSwarm.map(({ id, name, visibility, trigger, cadence }) => ({
        id,
        name,
        visibility,
        trigger,
        cadence,
      })),
    },
    {
      headers: {
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    }
  );
}
