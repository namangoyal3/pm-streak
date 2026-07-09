#!/usr/bin/env bash
# Publishes all pending SEO articles to learnanything.pro.
# Run from any machine with outbound HTTPS to learnanything.pro.
# Usage: bash scripts/seo-output/publish-pending.sh
#
# Pending articles (as of 2026-07-09):
#   3 from 2026-07-08: ai-product-manager-skills-stack, pm-job-market-2026, pm-to-senior-pm-promotion-playbook
#   2 from 2026-07-09: pm-metrics-stack-north-star-okr-kpi, how-to-break-into-apm-program-2026

set -euo pipefail

ENDPOINT="https://learnanything.pro/api/content/publish"
AUTH="Bearer ***REMOVED***"
DIR="$(cd "$(dirname "$0")" && pwd)"

publish_article() {
  local body_file="$1"
  local slug
  slug="$(basename "$body_file" .md)"

  python3 - "$body_file" <<'PYEOF'
import json, sys, urllib.request, urllib.error

body_file = sys.argv[1]
slug = body_file.rsplit("/", 1)[-1].replace(".md", "")

raw = open(body_file).read()

# Parse YAML frontmatter
lines = raw.split("\n")
fm = {}
content_lines = []
fm_count = 0
i = 0
while i < len(lines):
    line = lines[i]
    if line.strip() == "---":
        fm_count += 1
        i += 1
        continue
    if fm_count == 0:
        i += 1
        continue
    if fm_count == 1:
        # inside frontmatter
        if ":" in line:
            key, _, val = line.partition(":")
            val = val.strip().strip('"')
            if val.startswith("["):
                # inline list
                try:
                    fm[key.strip()] = json.loads(val)
                except Exception:
                    fm[key.strip()] = val
            elif not val:
                # multi-line list follows
                list_key = key.strip()
                items = []
                i += 1
                while i < len(lines) and lines[i].startswith("  - "):
                    items.append(lines[i].strip().lstrip("- ").strip())
                    i += 1
                fm[list_key] = items
                continue
            else:
                fm[key.strip()] = val
    if fm_count >= 2:
        content_lines.append(line)
    i += 1

body = "\n".join(content_lines).strip()

payload = {
    "title": fm.get("title", slug),
    "description": fm.get("description", ""),
    "body": body,
    "vertical": fm.get("vertical", "pm"),
    "tags": fm.get("tags", []),
    "primaryKeyword": fm.get("primaryKeyword", ""),
    "sourceUrls": fm.get("sourceUrls", []),
}

endpoint = "https://learnanything.pro/api/content/publish"
auth = "Bearer ***REMOVED***"

data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
req = urllib.request.Request(
    endpoint, data=data,
    headers={"Authorization": auth, "Content-Type": "application/json"},
    method="POST"
)

try:
    with urllib.request.urlopen(req, timeout=60) as r:
        resp = r.read().decode("utf-8")
        print(f"[OK] {slug} — HTTP {r.status}")
        try:
            parsed = json.loads(resp)
            print(f"     slug: {parsed.get('slug', 'n/a')}  score: {parsed.get('seoScore', 'n/a')}")
        except Exception:
            print(f"     {resp[:200]}")
except urllib.error.HTTPError as e:
    print(f"[FAIL] {slug} — HTTP {e.code}")
    print(f"       {e.read().decode('utf-8')[:300]}")
    sys.exit(1)
PYEOF
}

echo "Publishing pending SEO articles to learnanything.pro..."
echo ""

# 2026-07-08 batch
publish_article "$DIR/pm-job-market-2026.md"
publish_article "$DIR/pm-to-senior-pm-promotion-playbook.md"
publish_article "$DIR/ai-product-manager-skills-stack.md"

# 2026-07-09 batch
publish_article "$DIR/pm-metrics-stack-north-star-okr-kpi.md"
publish_article "$DIR/how-to-break-into-apm-program-2026.md"

echo ""
echo "Done. All 5 articles submitted."
