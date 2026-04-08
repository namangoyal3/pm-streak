import os
import sys

# Add the current directory to python path
sys.path.append(os.path.dirname(__file__))

from crew import execute_company_mission
from memory import load_recent_memory, save_meeting_summary


def sanitize_directive(directive: str, max_length: int = 500) -> str:
    """Basic sanitization: strip shell metacharacters, cap length."""
    # Remove characters that could be used for injection
    bad_chars = set('$`\\;|&><!')
    cleaned = "".join(c for c in directive if c not in bad_chars)
    return cleaned[:max_length].strip()


def main():
    print("🚀 PM Streak Virtual Enterprise Swarm — Initializing Board Meeting...")

    raw_directive = os.getenv("BOARD_DIRECTIVE") or (
        "Review our recent metrics and deploy a new A/B test to improve Pro conversion rates."
    )
    directive = sanitize_directive(raw_directive)
    if directive != raw_directive:
        print(f"⚠️  Directive sanitized (removed shell metacharacters, capped at 500 chars)")

    ga4_property_id = os.getenv("GA4_PROPERTY_ID", "529697573")

    # Load memory from prior runs
    print("\n📚 Loading swarm memory...")
    memory_context = load_recent_memory(n=4)
    print(memory_context[:500] + ("..." if len(memory_context) > 500 else ""))

    print(f"\n📋 Directive: {directive}")
    print("─" * 60)

    output = execute_company_mission(
        directive=directive,
        ga4_property_id=ga4_property_id,
        memory_context=memory_context,
    )

    pr_url = output.get("pr_url", "")
    cqo_verdict = output.get("cqo_verdict", "UNKNOWN")
    result_str = output.get("result", "")

    # Extract A/B plan snippet from result for memory
    ab_plan = ""
    lines = result_str.splitlines()
    for i, line in enumerate(lines):
        if "a/b" in line.lower() or "ab test" in line.lower() or "hypothesis" in line.lower():
            ab_plan = " ".join(lines[i:i+3])
            break

    # Save this meeting to memory
    memory_path = save_meeting_summary(
        directive=directive,
        pr_url=pr_url,
        cqo_verdict=cqo_verdict,
        ab_plan=ab_plan,
    )
    print(f"\n💾 Meeting summary saved: {memory_path}")

    print("\n\n✅ Board Meeting Concluded. Final Outcomes:")
    print("=" * 60)
    print(f"PR URL:      {pr_url or 'None created'}")
    print(f"CQO Verdict: {cqo_verdict}")
    print("=" * 60)
    print(result_str)

    # Write CQO verdict to a file so GitHub Actions can read it
    verdict_path = os.path.join(os.path.dirname(__file__), "cqo_verdict.txt")
    with open(verdict_path, "w") as f:
        f.write(cqo_verdict)

    # Write PR URL to a file so GitHub Actions can auto-merge
    pr_url_path = os.path.join(os.path.dirname(__file__), "pr_url.txt")
    with open(pr_url_path, "w") as f:
        f.write(pr_url)

    print(f"\n📄 Verdict written to: {verdict_path}")

    # Exit with non-zero code if CQO rejected
    if cqo_verdict == "REJECT":
        print("❌ CQO rejected this implementation — PR will NOT be auto-merged.")
        sys.exit(1)


if __name__ == "__main__":
    main()
