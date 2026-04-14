#!/bin/bash
# Run this from any machine with internet access (not the Claude Code sandbox).
# Publishes the two new SEO articles to learnanything.pro

AUTH="Authorization: Bearer ***REMOVED***"
ENDPOINT="https://learnanything.pro/api/content/publish"
DIR="$(cd "$(dirname "$0")" && pwd)"

echo "=== Publishing Article 6: North Star Metric ==="
curl -s -X POST "$ENDPOINT" \
  -H "$AUTH" \
  -H 'Content-Type: application/json' \
  --data-binary @"$DIR/article6-north-star-metric.json"
echo ""
echo ""

echo "=== Publishing Article 7: Software Engineer to PM ==="
curl -s -X POST "$ENDPOINT" \
  -H "$AUTH" \
  -H 'Content-Type: application/json' \
  --data-binary @"$DIR/article7-engineer-to-pm.json"
echo ""
