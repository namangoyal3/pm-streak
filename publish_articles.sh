#!/bin/bash
# Run this script outside the Claude Code sandbox to publish all 3 articles
# to learnanything.pro

AUTH="Authorization: Bearer ***REMOVED***"
ENDPOINT="https://learnanything.pro/api/content/publish"
DIR="$(dirname "$0")"

echo "Publishing Article 1: AI Product Manager Skill Stack..."
R1=$(curl -s -X POST "$ENDPOINT" \
  -H "$AUTH" \
  -H 'Content-Type: application/json' \
  --data-binary @"$DIR/article1.json")
echo "Response: $R1"
echo ""

echo "Publishing Article 2: How to Get Promoted to Senior PM..."
R2=$(curl -s -X POST "$ENDPOINT" \
  -H "$AUTH" \
  -H 'Content-Type: application/json' \
  --data-binary @"$DIR/article2.json")
echo "Response: $R2"
echo ""

echo "Publishing Article 3: RICE vs ICE vs MoSCoW..."
R3=$(curl -s -X POST "$ENDPOINT" \
  -H "$AUTH" \
  -H 'Content-Type: application/json' \
  --data-binary @"$DIR/article3.json")
echo "Response: $R3"
echo ""

echo "Done."
