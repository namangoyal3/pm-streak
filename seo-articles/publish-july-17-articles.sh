#!/bin/bash
# Publish the 2 articles written on July 17, 2026.
# Run from a machine with access to learnanything.pro.
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

publish "pm-salary-negotiation-framework.json" \
  "PM Salary Negotiation Framework"

publish "amplitude-vs-mixpanel-vs-heap-vs-posthog-2026.json" \
  "Amplitude vs Mixpanel vs Heap vs PostHog 2026"

echo "Done. Check https://learnanything.pro/learn for published articles."
