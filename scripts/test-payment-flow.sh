#!/bin/bash

echo "=== Testing PM Streak Payment Flow ==="
echo ""

# Check environment variables
echo "1. Checking Dodo Payments configuration..."
if [ -z "$DODO_PAYMENTS_API_KEY" ]; then
    echo "❌ DODO_PAYMENTS_API_KEY not set"
else
    echo "✅ DODO_PAYMENTS_API_KEY is set"
fi

if [ -z "$DODO_PAYMENTS_ENVIRONMENT" ]; then
    echo "❌ DODO_PAYMENTS_ENVIRONMENT not set"
else
    echo "✅ DODO_PAYMENTS_ENVIRONMENT: $DODO_PAYMENTS_ENVIRONMENT"
fi

echo ""
echo "2. Checking product IDs..."
PRODUCT_IDS=(
    "NEXT_PUBLIC_DODO_MONTHLY_PRODUCT_ID"
    "NEXT_PUBLIC_DODO_QUARTERLY_PRODUCT_ID"
    "NEXT_PUBLIC_DODO_YEARLY_PRODUCT_ID"
    "NEXT_PUBLIC_DODO_USD_MONTHLY_PRODUCT_ID"
    "NEXT_PUBLIC_DODO_USD_QUARTERLY_PRODUCT_ID"
    "NEXT_PUBLIC_DODO_USD_YEARLY_PRODUCT_ID"
)

for var in "${PRODUCT_IDS[@]}"; do
    value=$(grep "$var" .env 2>/dev/null | cut -d'=' -f2 | tr -d '"' | tr -d "'")
    if [ -z "$value" ] || [ "$value" = "" ]; then
        echo "❌ $var is empty"
    else
        echo "✅ $var is set"
    fi
done

echo ""
echo "3. Testing checkout API endpoint..."
# Try to access the checkout endpoint
CHECKOUT_URL="http://localhost:3000/api/checkout?productId=pdt_0NbFh4foH7E47jwYzA6vu"
echo "Testing: $CHECKOUT_URL"

# Check if server is running
if curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000" 2>/dev/null | grep -q "200\|302"; then
    echo "✅ Server is running"
    
    # Test checkout redirect
    response=$(curl -s -o /dev/null -w "%{http_code} %{redirect_url}" "$CHECKOUT_URL" 2>/dev/null)
    status=$(echo $response | cut -d' ' -f1)
    redirect=$(echo $response | cut -d' ' -f2-)
    
    if [ "$status" = "302" ] || [ "$status" = "307" ]; then
        echo "✅ Checkout redirects to: $redirect"
    else
        echo "❌ Checkout returned status: $status"
    fi
else
    echo "⚠️  Server not running. Start with: npm run dev"
fi

echo ""
echo "4. Checking pricing page accessibility..."
PRICING_URL="http://localhost:3000/pricing"
if curl -s -o /dev/null -w "%{http_code}" "$PRICING_URL" 2>/dev/null | grep -q "200"; then
    echo "✅ Pricing page is accessible"
else
    echo "❌ Pricing page not accessible"
fi

echo ""
echo "=== Summary ==="
echo "To fix conversion issues:"
echo "1. Ensure Dodo Payments is properly configured in production"
echo "2. Test checkout flow end-to-end"
echo "3. Add error tracking for failed payments"
echo "4. Monitor conversion funnel in GA4"
echo "5. Add upgrade prompts throughout the user journey"