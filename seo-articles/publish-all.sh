#!/bin/bash

# PM Streak SEO Article Publisher
# Run this script to publish all 3 articles to learnanything.pro
# Usage: bash publish-all.sh

AUTH="Bearer ***REMOVED***"
ENDPOINT="https://learnanything.pro/api/content/publish"

echo "=== Publishing Article 1: AI PM Evals Playbook ==="
curl -s -X POST "$ENDPOINT" \
  -H "Authorization: $AUTH" \
  -H "Content-Type: application/json" \
  -d @article1-ai-pm-evals.json
echo -e "\n"

echo "=== Publishing Article 2: RICE vs ICE Prioritization ==="
curl -s -X POST "$ENDPOINT" \
  -H "Authorization: $AUTH" \
  -H "Content-Type: application/json" \
  -d @article2-rice-ice-prioritization.json
echo -e "\n"

echo "=== Publishing Article 3: PM Job Market 2026 ==="
curl -s -X POST "$ENDPOINT" \
  -H "Authorization: $AUTH" \
  -H "Content-Type: application/json" \
  -d @article3-pm-job-market-2026.json
echo -e "\n"

echo "=== Done ==="
