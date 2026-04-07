"""
Swarm memory: persists board meeting decisions across runs.
Each run writes a JSON summary. Next run loads the last N summaries
so the CEO knows what was tried before and doesn't repeat experiments.
"""

import json
import os
import glob
from datetime import datetime, timezone

MEMORY_DIR = os.path.join(os.path.dirname(__file__), "swarm-memory")


def load_recent_memory(n: int = 4) -> str:
    """Load the last N meeting summaries as a formatted string for CEO context."""
    os.makedirs(MEMORY_DIR, exist_ok=True)
    files = sorted(glob.glob(os.path.join(MEMORY_DIR, "*.json")))[-n:]
    if not files:
        return "No prior board meetings on record. This is the first run."

    lines = ["Prior board meeting history (most recent last):"]
    for path in files:
        try:
            with open(path) as f:
                data = json.load(f)
            ts = data.get("timestamp", "unknown")
            directive = data.get("directive", "unknown")
            pr_url = data.get("pr_url") or "none"
            verdict = data.get("cqo_verdict", "UNKNOWN")
            ab_plan = data.get("ab_plan", "")
            lines.append(
                f"\n[{ts}]\n"
                f"  Directive: {directive}\n"
                f"  PR shipped: {pr_url}\n"
                f"  CQO verdict: {verdict}\n"
                f"  A/B plan: {ab_plan[:200] + '...' if len(ab_plan) > 200 else ab_plan}"
            )
        except Exception as e:
            lines.append(f"\n[{os.path.basename(path)}] Error reading: {e}")

    return "\n".join(lines)


def save_meeting_summary(
    directive: str,
    pr_url: str,
    cqo_verdict: str,
    ab_plan: str = "",
    extra: dict = None,
) -> str:
    """Save a meeting summary to disk. Returns the path written."""
    os.makedirs(MEMORY_DIR, exist_ok=True)
    ts = datetime.now(timezone.utc).strftime("%Y%m%d-%H%M%S")
    data = {
        "timestamp": ts,
        "directive": directive,
        "pr_url": pr_url,
        "cqo_verdict": cqo_verdict,
        "ab_plan": ab_plan,
    }
    if extra:
        data.update(extra)
    out_path = os.path.join(MEMORY_DIR, f"{ts}.json")
    with open(out_path, "w") as f:
        json.dump(data, f, indent=2)
    return out_path
