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
  return NextResponse.json(
    {
      ok: missing.length === 0,
      missing,
      env,
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
