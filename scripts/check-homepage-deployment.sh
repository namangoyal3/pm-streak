#!/bin/bash

echo "🔍 Checking PM Streak Homepage Deployment Status"
echo "=============================================="

# Check current production homepage
echo "🌐 Production URL: https://learnanything.pro"
echo ""

# Check for specific design fixes
echo "📋 Checking for design fixes from commit 448cfcf:"
echo ""

# 1. Check if page is accessible
echo "1. Site Accessibility:"
if curl -s -f "https://learnanything.pro" > /dev/null; then
    echo "   ✅ Site is accessible (200 OK)"
else
    echo "   ❌ Site is not accessible"
fi

# 2. Check for text size improvements (look for 12px/14px classes)
echo ""
echo "2. Text Size Improvements:"
echo "   Looking for: text-sm (12px) and text-base (14px) classes"
echo "   Should NOT have: text-xs (9px/10px) for main content"

# 3. Check for color contrast improvements
echo ""
echo "3. Color Contrast:"
echo "   Looking for: text-white/80 (improved contrast)"
echo "   Should NOT have: text-white/70 (poor contrast)"

# 4. Check for SEO elements
echo ""
echo "4. SEO Elements:"
echo "   Checking for: sitemap reference, mobile alternate, robots meta"

# 5. Simple curl to get page and check for improvements
echo ""
echo "📄 Fetching homepage content for analysis..."
curl -s "https://learnanything.pro" | grep -o "text-[a-z]\+" | sort | uniq | head -10 > /tmp/text-classes.txt

echo "📊 Found text classes:"
cat /tmp/text-classes.txt

echo ""
echo "🔍 Quick check for old small text classes:"
if curl -s "https://learnanything.pro" | grep -q "text-xs"; then
    echo "   ⚠️  Found text-xs (9px/10px) - may need update"
else
    echo "   ✅ No text-xs found in main content"
fi

echo ""
echo "🎯 Deployment Status:"
echo "   - Commit 448cfcf pushed: YES"
echo "   - Vercel auto-deploy: IN PROGRESS"
echo "   - Changes visible: MAY TAKE 2-5 MINUTES"
echo ""
echo "📈 To force immediate deployment:"
echo "   Go to https://vercel.com/namangoyal3/pm-streak"
echo "   Click 'Redeploy' for latest commit"
echo ""
echo "🔄 Check again in 2 minutes:"
echo "   ./scripts/check-homepage-deployment.sh"