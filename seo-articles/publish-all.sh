#!/bin/bash

# PM Streak SEO Article Publisher
# Run this script to publish all articles to learnanything.pro
# Usage: cd seo-articles && bash publish-all.sh

AUTH="Bearer 335644a93f2103b28f2a82c96b5ede6e3dadc39013877954b4a555fdd3c012c2"
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

# NEW articles from this run (April 9, 2026)
echo "=== Publishing Article 6: Opportunity Solution Trees (NEW) ==="
curl -s -X POST "$ENDPOINT" \
  -H "Authorization: $AUTH" \
  -H "Content-Type: application/json" \
  -d @article-ost-discovery.json
echo -e "\n"

echo "=== Publishing Article 7: B2B SaaS Metrics Playbook (NEW) ==="
curl -s -X POST "$ENDPOINT" \
  -H "Authorization: $AUTH" \
  -H "Content-Type: application/json" \
  -d @article-b2b-saas-metrics.json
echo -e "\n"

echo "=== Publishing Article 8: PM Resume Guide (NEW) ==="
curl -s -X POST "$ENDPOINT" \
  -H "Authorization: $AUTH" \
  -H "Content-Type: application/json" \
  -d @article-pm-resume.json
echo -e "\n"

# NEW articles from this run (April 16, 2026)
echo "=== Publishing Article 9: Product-Led Growth Strategy (NEW) ==="
curl -s -X POST "$ENDPOINT" \
  -H "Authorization: $AUTH" \
  -H "Content-Type: application/json" \
  -d @article-plg-strategy.json
echo -e "\n"

echo "=== Publishing Article 10: APM Program Guide (NEW) ==="
curl -s -X POST "$ENDPOINT" \
  -H "Authorization: $AUTH" \
  -H "Content-Type: application/json" \
  -d @article-apm-programs.json
echo -e "\n"

echo "=== Publishing Article 11: North Star Metric Framework (NEW) ==="
curl -s -X POST "$ENDPOINT" \
  -H "Authorization: $AUTH" \
  -H "Content-Type: application/json" \
  -d @article-north-star-metric.json
echo -e "\n"

echo "=== Done — 11 articles published ==="
