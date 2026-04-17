#!/bin/bash
# Run this from any machine with internet access (not the Claude Code sandbox).
# Publishes articles 8 and 9 to learnanything.pro

AUTH="Authorization: Bearer ***REMOVED***"
ENDPOINT="https://learnanything.pro/api/content/publish"
DIR="$(cd "$(dirname "$0")" && pwd)"

echo "=== Publishing Article 8: PM Interview Question Framework ==="
curl -s -X POST "$ENDPOINT" \
  -H "$AUTH" \
  -H 'Content-Type: application/json' \
  --data-binary @"$DIR/article8-pm-interview-questions.json"
echo ""
echo ""

echo "=== Publishing Article 9: Jobs to Be Done Framework ==="
curl -s -X POST "$ENDPOINT" \
  -H "$AUTH" \
  -H 'Content-Type: application/json' \
  --data-binary @"$DIR/article9-jtbd-framework.json"
echo ""
