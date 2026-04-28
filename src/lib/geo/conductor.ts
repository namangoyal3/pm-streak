import { callAgent, callConductor, Agents } from "@/lib/lyzr";

export type GeoEvent =
  | { type: "opportunity_found"; query: string; intentScore: number }
  | { type: "draft_ready"; slug: string; citabilityScore: number }
  | { type: "rewrite_needed"; slug: string; reason: string }
  | { type: "page_published"; slug: string; url: string }
  | { type: "citation_drafted"; slug: string; source: string };

export async function routeEvent(event: GeoEvent, sessionId: string) {
  const message = JSON.stringify(event);
  return callConductor(
    `Route this GEO event to the appropriate worker(s): ${message}`,
    sessionId
  );
}

export async function triggerScout(sessionId: string) {
  return callAgent(
    Agents.scout(),
    "Run today's scan. Append new opportunities to opportunities.jsonl in the shared KB.",
    sessionId,
    { timeoutMs: 90_000 }
  );
}

export async function triggerPulseSnapshot(sessionId: string) {
  return callAgent(
    Agents.pulse(),
    "Take a daily performance snapshot. Write metrics to pulse_metrics.jsonl. Flag pages needing rewrites.",
    sessionId,
    { timeoutMs: 90_000 }
  );
}

export async function triggerRival(sessionId: string) {
  return callAgent(
    Agents.rival(),
    "Run weekly competitive scan. Update rival_gaps.json in the shared KB.",
    sessionId,
    { timeoutMs: 90_000 }
  );
}

export async function triggerAnchor(sessionId: string) {
  return callAgent(
    Agents.anchor(),
    "Run weekly authority scan. Draft citations for recently published pages. Output drafts only — never auto-send.",
    sessionId,
    { timeoutMs: 90_000 }
  );
}
