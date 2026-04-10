#!/bin/bash

echo "=== PM Streak Deployment Monitor ==="
echo "Checking if conversion fixes are live..."
echo ""

# Check production site
echo "1. Production Site Status:"
curl -s -o /dev/null -w "   Status: %{http_code}\n" "https://learnanything.pro"

# Check pricing page
echo -e "\n2. Pricing Page Status:"
curl -s -o /dev/null -w "   Status: %{http_code}\n" "https://learnanything.pro/pricing"

# Check for new social proof text
echo -e "\n3. Checking for Conversion Optimizations:"
echo "   a) Social proof text:"
if curl -s "https://learnanything.pro/pricing" | grep -q "Join 500+ PMs already learning"; then
    echo "      ✅ FOUND: Social proof is live"
else
    echo "      ⏳ NOT FOUND: Changes still deploying"
fi

echo -e "\n   b) Urgency messaging:"
if curl -s "https://learnanything.pro/pricing" | grep -q "70% OFF launch pricing"; then
    echo "      ✅ FOUND: Urgency messaging is live"
else
    echo "      ⏳ NOT FOUND: Changes still deploying"
fi

# Check payment configuration
echo -e "\n4. Payment Configuration:"
if grep -q "DODO_PAYMENTS_API_KEY" .vercel/.env.production.local 2>/dev/null; then
    echo "   ✅ Dodo Payments configured in production"
else
    echo "   ❌ Dodo Payments NOT configured"
fi

# Check GA4 cron job
echo -e "\n5. GA4 Monitoring:"
if openclaw cron list 2>/dev/null | grep -q "Daily GA4 Summary.*ok"; then
    echo "   ✅ GA4 cron job is healthy"
else
    echo "   ⚠️  GA4 cron job status unknown"
fi

echo -e "\n=== Deployment Status Summary ==="
echo "Site: https://learnanything.pro"
echo "Pricing: https://learnanything.pro/pricing"
echo "Next GA4 Report: Tomorrow 9:00 AM (Asia/Calcutta)"
echo ""
echo "To monitor conversion rate:"
echo "1. Check GA4 dashboard daily"
echo "2. Run: ./scripts/monitor-conversions.py"
echo "3. Check OpenClaw heartbeat logs"