#!/bin/bash
# Convenience wrapper — delegates to publish_articles.sh with all seo-articles/.
# Uses CRON_SECRET from environment.
set -euo pipefail
DIR="$(dirname "$0")"
exec "$DIR/publish_articles.sh" "$@"
