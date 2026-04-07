#!/bin/bash

# PM Streak SEO Article Publisher
# Run this script to publish all articles to learnanything.pro
# Usage: cd seo-articles && bash publish-all.sh

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

echo "=== Publishing Article 4: Senior PM Promotion Playbook ==="
curl -s -X POST "$ENDPOINT" \
  -H "Authorization: $AUTH" \
  -H "Content-Type: application/json" \
  -d @article4-senior-pm-promotion.json
echo -e "\n"

echo "=== Publishing Article 5: RICE vs MoSCoW vs Kano ==="
curl -s -X POST "$ENDPOINT" \
  -H "Authorization: $AUTH" \
  -H "Content-Type: application/json" \
  -d @article5-rice-moscow-kano.json
echo -e "\n"

echo "=== Done — 5 articles published ==="
