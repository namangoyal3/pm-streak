#!/bin/bash
set -e

cd /Users/namangoyal/pmstreak

while IFS='=' read -r key value; do
  # Skip empty lines, comments, Vercel internal vars, Turbo vars
  [[ -z "$key" || "$key" =~ ^# ]] && continue
  [[ "$key" =~ ^VERCEL_ ]] && continue
  [[ "$key" =~ ^TURBO_ ]] && continue
  [[ "$key" =~ ^NX_ ]] && continue
  [[ "$key" == "VERCEL" ]] && continue

  # Strip quotes and trailing \n
  val=$(echo "$value" | sed 's/^"//;s/"$//;s/\\\\n$//;s/\\n$//')

  echo "Adding $key..."
  echo "$val" | npx vercel env add "$key" production --force 2>&1
done < <(grep -v '^#' .env.prod.test | grep -v '^$')
