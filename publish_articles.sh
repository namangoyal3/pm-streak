#!/bin/bash
# Publish GEO-generated articles to learnanything.pro via the signal/publish API.
# Uses CRON_SECRET from environment — never hardcode secrets.
#
# Usage: ./publish_articles.sh [article-slug...]
#   If no slugs given, scans seo-articles/ for .mdx files.

set -euo pipefail

: "${CRON_SECRET:?CRON_SECRET must be set}"
: "${NEXT_PUBLIC_APP_URL:?NEXT_PUBLIC_APP_URL must be set}"

AUTH="Authorization: Bearer $CRON_SECRET"
ENDPOINT="${NEXT_PUBLIC_APP_URL}/api/geo/signal/publish"
DIR="$(dirname "$0")"

publish_one() {
  local slug="$1"
  local mdx_file="$DIR/seo-articles/$slug.mdx"
  if [ ! -f "$mdx_file" ]; then
    echo "SKIP: $slug — no seo-articles/$slug.mdx found"
    return
  fi
  local body
  body=$(cat "$mdx_file")
  local title
  title=$(echo "$body" | head -1 | sed 's/^# //')

  echo "Publishing: $slug..."
  local resp
  resp=$(curl -s -X POST "$ENDPOINT" \
    -H "$AUTH" \
    -H 'Content-Type: application/json' \
    -d "$(jq -n --arg slug "$slug" --arg title "${title:-$slug}" --arg desc "PM Streak guide" --arg body "$body" '{slug: $slug, title: $title, description: $desc, body: $body}')")
  echo "  Response: $resp"
}

if [ $# -gt 0 ]; then
  for slug in "$@"; do
    publish_one "$slug"
  done
else
  echo "No slugs provided — scanning seo-articles/ for .mdx files..."
  for f in "$DIR/seo-articles"/*.mdx; do
    [ -f "$f" ] || { echo "No .mdx files found in seo-articles/"; exit 0; }
    slug=$(basename "$f" .mdx)
    publish_one "$slug"
  done
fi

echo "Done."
