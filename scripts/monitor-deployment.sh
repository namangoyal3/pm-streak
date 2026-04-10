#!/bin/bash

echo "🚀 PM Streak Deployment Monitor"
echo "==============================="
echo "Monitoring: https://learnanything.pro"
echo ""

# Check every 30 seconds for changes
for i in {1..20}; do
    echo "🔍 Check #$i - $(date '+%H:%M:%S')"
    echo "--------------------------------"
    
    # Fetch homepage
    CONTENT=$(curl -s "https://learnanything.pro")
    
    # Check for old vs new
    OLD_COUNT=$(echo "$CONTENT" | grep -c "text-white/70")
    NEW_COUNT=$(echo "$CONTENT" | grep -c "text-white/80")
    TEXT_XS_COUNT=$(echo "$CONTENT" | grep -c "text-xs")
    
    echo "📊 Current State:"
    echo "   text-white/70 (old): $OLD_COUNT occurrences"
    echo "   text-white/80 (new): $NEW_COUNT occurrences"
    echo "   text-xs (small text): $TEXT_XS_COUNT occurrences"
    
    # Check for specific fixes
    if [ $NEW_COUNT -gt 0 ] && [ $OLD_COUNT -eq 0 ]; then
        echo ""
        echo "🎉 ✅ DEPLOYMENT SUCCESSFUL!"
        echo "   Homepage fixes are now LIVE"
        echo "   Color contrast improved: text-white/80"
        exit 0
    elif [ $NEW_COUNT -gt 0 ] && [ $OLD_COUNT -gt 0 ]; then
        echo ""
        echo "🔄 ⚠️  DEPLOYMENT IN PROGRESS"
        echo "   Mix of old and new - propagation happening"
    else
        echo ""
        echo "⏳ ❌ OLD VERSION STILL SERVED"
        echo "   Waiting for deployment to complete..."
    fi
    
    # Check for SEO elements
    if echo "$CONTENT" | grep -q "sitemap.xml"; then
        echo "   ✅ SEO: sitemap reference found"
    else
        echo "   ⚠️  SEO: sitemap reference missing"
    fi
    
    # Wait 30 seconds
    if [ $i -lt 20 ]; then
        echo ""
        echo "⏰ Next check in 30 seconds..."
        sleep 30
        echo ""
    fi
done

echo ""
echo "⚠️  DEPLOYMENT TIMEOUT"
echo "   Changes not visible after 10 minutes"
echo "   Please check Vercel dashboard for errors"
echo "   URL: https://vercel.com/namangoyal3/pm-streak"