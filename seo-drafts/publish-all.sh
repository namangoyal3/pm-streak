#!/bin/bash
# Run this locally to publish all SEO articles to learnanything.pro
# Usage: bash seo-drafts/publish-all.sh
# Note: run from the repo root

set -e
API="https://learnanything.pro/api/content/publish"
TOKEN="***REMOVED***"

ARTICLES=(
  "seo-drafts/pm-job-market-2026.json"
  "seo-drafts/how-to-get-promoted-senior-pm.json"
  "seo-drafts/ai-product-manager-skills-2026.json"
  "seo-drafts/article-pm-resume-2026.json"
  "seo-drafts/article-stakeholder-management-pm.json"
)

for file in "${ARTICLES[@]}"; do
  echo ""
  echo "Publishing: $file"
  response=$(curl -s -X POST "$API" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    --data-binary "@$file")
  echo "Response: $response"
  echo "---"
done

echo ""
echo "All articles submitted."
