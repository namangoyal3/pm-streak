#!/bin/bash
echo "🚀 Triggering Vercel deployment for A/B experiment system..."

# Add a deployment marker
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
echo "// Deployment marker: $TIMESTAMP - A/B Experiment System" >> src/app/layout.tsx

# Commit and push
git add .
git commit -m "deploy: Trigger Vercel build for A/B experiment system"
git push

echo "✅ Deployment triggered. Check https://vercel.com/namangoyal3/pm-streak"
echo "📊 New system will track:"
echo "   - Experiment assignments (pro_trial_cta_v1)"
echo "   - Trial conversions"
echo "   - User segmentation"
echo "   - GA4 events"