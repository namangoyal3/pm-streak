// Claude Managed Agents — memory store + dreams wrapper.
//
// This module maintains a supplementary Claude memory store alongside the
// primary Lyzr KB (pm_streak_shared_kb). The Lyzr KB is never touched here.
// Dreams periodically consolidate this store: deduplicate entries, resolve
// contradictions, and surface new insights from accumulated agent runs.
//
// Required env vars:
//   ANTHROPIC_API_KEY              — server-only, never NEXT_PUBLIC_*
//   ANTHROPIC_GEO_MEMORY_STORE_ID  — set once after createGeoMemoryStore()

import Anthropic from "@anthropic-ai/sdk";

function client() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
}

const BETA_HEADERS = "managed-agents-2026-04-01,dreaming-2026-04-21";

export function geoMemoryStoreId(): string {
  const id = process.env.ANTHROPIC_GEO_MEMORY_STORE_ID;
  if (!id) throw new Error("ANTHROPIC_GEO_MEMORY_STORE_ID is not set");
  return id;
}

// ── Memory store bootstrap (run once, then set env var) ───────────────────────

export async function createGeoMemoryStore(): Promise<string> {
  const store = await client().beta.memoryStores.create(
    {
      name: "pm_streak_geo_swarm",
      description:
        "GEO swarm insights: opportunities, published pages, citability metrics, competitor gaps.",
    },
    { headers: { "anthropic-beta": BETA_HEADERS } }
  );
  return store.id;
}

// ── Write an insight to the memory store ─────────────────────────────────────

export type MemoryEntry = {
  // File-system-style path, e.g. "/opportunity/pm-frameworks-2026-05-08"
  // Must start with "/".
  path: string;
  content: string;
};

export async function writeMemory(entry: MemoryEntry): Promise<void> {
  await client().beta.memoryStores.memories.create(
    geoMemoryStoreId(),
    { path: entry.path, content: entry.content },
    { headers: { "anthropic-beta": BETA_HEADERS } }
  );
}

// Batch write — fire-and-forget per entry; errors logged but never thrown.
export async function writeMemoryBatch(entries: MemoryEntry[]): Promise<void> {
  await Promise.allSettled(entries.map(writeMemory));
}

// ── Create a dream ────────────────────────────────────────────────────────────

export type DreamOptions = {
  sessionIds?: string[];
  instructions?: string;
  model?: "claude-opus-4-7" | "claude-sonnet-4-6";
};

export async function createDream(opts: DreamOptions = {}): Promise<string> {
  const storeId = geoMemoryStoreId();

  const inputs: object[] = [{ type: "memory_store", memory_store_id: storeId }];
  if (opts.sessionIds?.length) {
    inputs.push({ type: "sessions", session_ids: opts.sessionIds });
  }

  // Dreams is Research Preview — not in stable SDK types yet.
  // @ts-expect-error beta.dreams not typed in current SDK
  const dream = await client().beta.dreams.create(
    {
      inputs,
      model: opts.model ?? "claude-sonnet-4-6",
      instructions:
        opts.instructions ??
        "Consolidate GEO swarm insights for pm-streak. " +
        "Merge duplicate opportunities. Replace stale citability scores with the latest value. " +
        "Surface new patterns: which PM topics are gaining competitor gap momentum, " +
        "which pages are underperforming, which keyword clusters are unaddressed. " +
        "Discard one-off debug notes. Preserve all strategic facts.",
    },
    { headers: { "anthropic-beta": BETA_HEADERS } }
  );

  return dream.id as string;
}

// ── Poll a dream until terminal ───────────────────────────────────────────────

export type DreamStatus = {
  id: string;
  status: "pending" | "running" | "completed" | "failed" | "canceled";
  outputStoreId?: string;
  usage?: { input_tokens: number; output_tokens: number };
  error?: { type: string } | null;
};

export async function getDreamStatus(dreamId: string): Promise<DreamStatus> {
  // @ts-expect-error beta.dreams not typed in current SDK
  const dream = await client().beta.dreams.retrieve(dreamId, {
    headers: { "anthropic-beta": BETA_HEADERS },
  });

  const outputStore = (
    dream.outputs as { type: string; memory_store_id: string }[] | undefined
  )?.find((o) => o.type === "memory_store");

  return {
    id: dream.id as string,
    status: dream.status as DreamStatus["status"],
    outputStoreId: outputStore?.memory_store_id,
    usage: dream.usage as DreamStatus["usage"],
    error: dream.error as DreamStatus["error"],
  };
}

export async function cancelDream(dreamId: string): Promise<void> {
  // @ts-expect-error beta.dreams not typed in current SDK
  await client().beta.dreams.cancel(dreamId, {
    headers: { "anthropic-beta": BETA_HEADERS },
  });
}
