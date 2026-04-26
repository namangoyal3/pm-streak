#!/bin/bash
# Run this from your local machine to publish all 3 articles to learnanything.pro
# The sandbox environment's IP is not in the server's allowlist, so publishing must happen locally.

API_URL="https://learnanything.pro/api/content/publish"
AUTH="Bearer ***REMOVED***"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

publish() {
  local file="$1"
  local label="$2"
  echo "Publishing: $label"
  response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X POST "$API_URL" \
    -H "Authorization: $AUTH" \
    -H "Content-Type: application/json" \
    --data-binary "@${SCRIPT_DIR}/${file}")
  http_status=$(echo "$response" | grep -o 'HTTP_STATUS:[0-9]*' | cut -d: -f2)
  body=$(echo "$response" | sed '/HTTP_STATUS:/d')
  echo "  Status: $http_status"
  echo "  Response: $body"
  echo ""
}

publish "article1-ai-pm-skills.json"       "Article 1: AI PM Skills Stack"
publish "article2-pm-senior-pm-promotion.json" "Article 2: PM to Senior PM Promotion"
publish "article3-pm-job-market-2026.json"  "Article 3: PM Job Market 2026"

echo "Done."
