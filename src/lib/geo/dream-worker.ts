// dream-worker.ts — Orchestrates a Dreams run for the GEO swarm memory store.
//
// Dreams consolidate the Claude supplementary memory store (ANTHROPIC_GEO_MEMORY_STORE_ID).
// The primary Lyzr KB (pm_streak_shared_kb) is never touched.
//
// Typical schedule: weekly (Sunday 02:00 UTC) via /api/geo/dream/run.

import { createDream, getDreamStatus } from "@/lib/claude-memory";
import { writeCronLog } from "@/lib/geo/safe-prisma";

export type DreamRunResult = {
  dreamId: string;
  status: "created" | "completed" | "failed" | "timeout";
  outputStoreId?: string;
  pollCount: number;
  usage?: { input_tokens: number; output_tokens: number };
  error?: string;
};

export type DreamRunOptions = {
  // If true, create the dream and return immediately without polling.
  // Useful for long-running background jobs: the dream ID is stored and
  // /api/geo/dream/status polls it later.
  fireAndForget?: boolean;
  // Max time (ms) to poll before returning "timeout". Default: 10 minutes.
  timeoutMs?: number;
  sessionIds?: string[];
};

const POLL_INTERVAL_MS = 15_000;

export async function runDream(opts: DreamRunOptions = {}): Promise<DreamRunResult> {
  const timeoutMs = opts.timeoutMs ?? 10 * 60 * 1000;
  const deadline = Date.now() + timeoutMs;

  const dreamId = await createDream({ sessionIds: opts.sessionIds });

  if (opts.fireAndForget) {
    await writeCronLog({
      cronId: "dream/run",
      status: "ok",
      summary: `Dream created (fire-and-forget): ${dreamId}`,
      details: { dreamId },
    });
    return { dreamId, status: "created", pollCount: 0 };
  }

  // Poll until terminal or timeout.
  let pollCount = 0;
  while (Date.now() < deadline) {
    await sleep(POLL_INTERVAL_MS);
    pollCount++;
    const snap = await getDreamStatus(dreamId);

    if (snap.status === "completed") {
      await writeCronLog({
        cronId: "dream/run",
        status: "ok",
        summary: `Dream completed: ${dreamId} → output store ${snap.outputStoreId}`,
        details: { dreamId, outputStoreId: snap.outputStoreId, pollCount, usage: snap.usage },
      });
      return {
        dreamId,
        status: "completed",
        outputStoreId: snap.outputStoreId,
        pollCount,
        usage: snap.usage,
      };
    }

    if (snap.status === "failed" || snap.status === "canceled") {
      await writeCronLog({
        cronId: "dream/run",
        status: "error",
        summary: `Dream ${snap.status}: ${dreamId}`,
        details: { dreamId, error: snap.error, pollCount },
      });
      return {
        dreamId,
        status: "failed",
        pollCount,
        error: snap.error?.type ?? snap.status,
      };
    }
  }

  // Timed out — return dream ID so caller can poll via /api/geo/dream/status.
  await writeCronLog({
    cronId: "dream/run",
    status: "ok",
    summary: `Dream still running after ${timeoutMs / 1000}s, continuing async: ${dreamId}`,
    details: { dreamId, pollCount },
  });
  return { dreamId, status: "timeout", pollCount };
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
