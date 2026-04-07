#!/bin/sh
# Called by Railway cron services.
# Required env vars:
#   APP_URL      — e.g. https://learnanything.pro
#   CRON_SECRET  — must match the server's CRON_SECRET env var
#   CRON_PATH    — e.g. /api/cron/scrape-jobs

set -e

if [ -z "$APP_URL" ] || [ -z "$CRON_SECRET" ] || [ -z "$CRON_PATH" ]; then
  echo "ERROR: APP_URL, CRON_SECRET, and CRON_PATH must all be set"
  exit 1
fi

ENDPOINT="${APP_URL}${CRON_PATH}"
echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] Calling ${ENDPOINT}"

RESPONSE=$(curl -s -w "\n%{http_code}" \
  -H "Authorization: Bearer ${CRON_SECRET}" \
  "${ENDPOINT}")

HTTP_BODY=$(echo "$RESPONSE" | head -n -1)
HTTP_CODE=$(echo "$RESPONSE" | tail -n 1)

echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] HTTP ${HTTP_CODE}: ${HTTP_BODY}"

if [ "$HTTP_CODE" -lt 200 ] || [ "$HTTP_CODE" -ge 300 ]; then
  echo "ERROR: Cron returned non-2xx status ${HTTP_CODE}"
  exit 1
fi
