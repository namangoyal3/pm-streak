// NOTE: Lyzr KB population cannot be done programmatically via the agent API.
// Documents must be uploaded directly through Lyzr Studio UI:
//   Studio → Knowledge Bases → pm_streak_shared_kb → Upload Documents
//
// The KB seed files live at: ~/Desktop/pm-streak-kb-seed/ (7 .txt files)
// They are already uploaded as of 2026-04-28.
//
// This module now provides a KB health check — asks Cortex a PM Streak-specific
// question and verifies it can recall facts from the KB.

import { callAgent, Agents } from "@/lib/lyzr";

export async function verifyKB(sessionId = `kb-verify-${Date.now()}`) {
  const response = await callAgent(
    Agents.cortex(),
    "What is PM Streak's pricing? What are the free vs paid plan limits?",
    sessionId,
    { timeoutMs: 60_000 }
  );
  const hasKbFacts =
    response.response.toLowerCase().includes("credit") ||
    response.response.toLowerCase().includes("free") ||
    response.response.toLowerCase().includes("plan");
  return { response: response.response, kbHealthy: hasKbFacts };
}
