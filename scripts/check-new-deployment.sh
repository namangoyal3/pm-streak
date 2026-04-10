#!/bin/bash

NEW_URL="https://duolingo-for-yutz32v7y-namangoyal21197gmailcoms-projects.vercel.app"
PROD_URL="https://learnanything.pro"

echo "🚀 Monitoring New Deployment"
echo "==========================="
echo "New: $NEW_URL"
echo "Prod: $PROD_URL"
echo ""

# Check new deployment
echo "🔍 Checking new deployment..."
if curl -s -f "$NEW_URL" > /dev/null; then
    echo "✅ New deployment is accessible"
    
    # Check for fixes in new deployment
    NEW_CONTENT=$(curl -s "$NEW_URL")
    OLD_COUNT=$(echo "$NEW_CONTENT" | grep -c "text-white/70")
    NEW_COUNT=$(echo "$NEW_CONTENT" | grep -c "text-white/80")
    
    echo "📊 New deployment stats:"
    echo "   text-white/70 (old): $OLD_COUNT"
    echo "   text-white/80 (new): $NEW_COUNT"
    
    if [ $NEW_COUNT -gt 0 ]; then
        echo ""
        echo "🎉 ✅ HOMEPAGE FIXES ARE IN NEW DEPLOYMENT!"
        echo "   The build SUCCESSFULLY includes the fixes"
        echo ""
        echo "🚀 Next step: Promote to production"
        echo "   Go to: https://vercel.com/namangoyal3/pm-streak"
        echo "   Find this deployment and click 'Promote to Production'"
    else
        echo ""
        echo "⚠️  Fixes NOT found in new deployment"
        echo "   Build may have failed or old code deployed"
    fi
else
    echo "❌ New deployment not ready yet"
    echo "   Build still in progress..."
fi

echo ""
echo "🔍 Current production status:"
PROD_CONTENT=$(curl -s "$PROD_URL")
PROD_OLD=$(echo "$PROD_CONTENT" | grep -c "text-white/70")
PROD_NEW=$(echo "$PROD_CONTENT" | grep -c "text-white/80")

echo "   Production text-white/70: $PROD_OLD"
echo "   Production text-white/80: $PROD_NEW"

if [ $PROD_NEW -gt 0 ]; then
    echo ""
    echo "🎉 🎉 🎉 PRODUCTION IS ALREADY UPDATED!"
    echo "   Homepage fixes are LIVE on production!"
else
    echo ""
    echo "⏳ Production still has old version"
    echo "   Need to promote new deployment"
fi