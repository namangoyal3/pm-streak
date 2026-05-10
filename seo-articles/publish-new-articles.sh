#!/bin/bash
# Publish the 3 new articles written in this session.
# Run from a machine whose IP is in learnanything.pro's allowlist.
# Requires CRON_SECRET in environment:  export CRON_SECRET="<secret>"

set -euo pipefail

: "${CRON_SECRET:?CRON_SECRET must be set}"

API_URL="https://learnanything.pro/api/content/publish"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

publish() {
  local file="$1"
  local label="$2"
  echo "Publishing: $label"
  response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X POST "$API_URL" \
    -H "Authorization: Bearer $CRON_SECRET" \
    -H "Content-Type: application/json" \
    --data-binary "@${SCRIPT_DIR}/${file}")
  http_status=$(echo "$response" | grep -o 'HTTP_STATUS:[0-9]*' | cut -d: -f2)
  body=$(echo "$response" | sed '/HTTP_STATUS:/d')
  echo "  HTTP: $http_status"
  echo "  Response: $body"
  echo ""
}

publish "the-product-sense-interview-framework-that-lands-offers-at-google-meta-and-strip.json" \
  "Product Sense Interview Framework (SEO: 95)"

publish "pm-behavioral-interview-questions-the-star-stories-that-actually-win-offers.json" \
  "PM Behavioral Interview STAR Method (SEO: 95)"

publish "continuous-discovery-for-product-managers-how-to-talk-to-users-every-week-withou.json" \
  "Continuous Discovery for PMs (SEO: 70)"

echo "Done. Check https://learnanything.pro/learn for published articles."
