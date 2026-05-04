#!/bin/bash
# Run this script from any machine with internet access to publish both articles.

AUTH="Authorization: Bearer ***REMOVED***"
ENDPOINT="https://learnanything.pro/api/content/publish"

echo "=== Publishing Article 1: PM to Senior PM Promotion System ==="
curl -s -X POST "$ENDPOINT" \
  -H "$AUTH" \
  -H 'Content-Type: application/json' \
  --data-binary @publish_article1.json
echo ""
echo ""

echo "=== Publishing Article 2: AI Product Manager Skills ==="
curl -s -X POST "$ENDPOINT" \
  -H "$AUTH" \
  -H 'Content-Type: application/json' \
  --data-binary @publish_article2.json
echo ""
