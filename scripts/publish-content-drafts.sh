#!/bin/bash
# Publish JSON content drafts directly to learnanything.pro/api/content/publish
# Run this locally (network access to learnanything.pro required).
#
# Usage:
#   PUBLISH_TOKEN=<bearer-token> ./scripts/publish-content-drafts.sh [slug...]
#   If no slugs given, publishes all *.json in seo-drafts/ that have a "body" field.
#
# Example:
#   PUBLISH_TOKEN=abc123 ./scripts/publish-content-drafts.sh how-to-run-user-interviews-product-manager

set -euo pipefail

: "${PUBLISH_TOKEN:?Set PUBLISH_TOKEN to your learnanything.pro API bearer token}"

ENDPOINT="https://learnanything.pro/api/content/publish"
DIR="$(cd "$(dirname "$0")/.." && pwd)"
DRAFTS_DIR="$DIR/seo-drafts"

publish_one() {
  local slug="$1"
  local file="$DRAFTS_DIR/$slug.json"
  if [ ! -f "$file" ]; then
    echo "SKIP: $slug — file not found: $file"
    return
  fi

  local body
  body=$(python3 -c "import json,sys; d=json.load(open('$file')); print(d.get('body',''))" 2>/dev/null)
  if [ -z "$body" ]; then
    echo "SKIP: $slug — no body field in JSON"
    return
  fi

  echo "Publishing: $slug ..."
  local resp
  resp=$(curl -s -X POST "$ENDPOINT" \
    -H "Authorization: Bearer $PUBLISH_TOKEN" \
    -H 'Content-Type: application/json' \
    --data @"$file")
  echo "  Response: $resp"
}

if [ $# -gt 0 ]; then
  for slug in "$@"; do
    publish_one "$slug"
  done
else
  echo "Publishing all JSON drafts with body content from $DRAFTS_DIR/ ..."
  published=0
  for f in "$DRAFTS_DIR"/*.json; do
    [ -f "$f" ] || continue
    slug=$(basename "$f" .json)
    has_body=$(python3 -c "import json; d=json.load(open('$f')); print('yes' if d.get('body') else 'no')" 2>/dev/null || echo no)
    if [ "$has_body" = "yes" ]; then
      publish_one "$slug"
      published=$((published + 1))
    fi
  done
  echo "Done. Attempted to publish $published articles."
fi
