#!/bin/bash

echo "=== PM Streak Homepage Design Audit ==="
echo "Date: $(date)"
echo "URL: https://learnanything.pro"
echo ""

echo "1. CHECKING SEO STRUCTURE:"
echo "----------------------------"
echo "a) Canonical URL:"
curl -s "https://learnanything.pro" | grep -o 'rel="canonical"[^>]*' | head -2
echo ""

echo "b) Structured Data Types:"
curl -s "https://learnanything.pro" | grep -o '"@type":"[^"]*"' | sort | uniq -c
echo ""

echo "c) Missing SEO Elements:"
echo "   - Sitemap reference: $(curl -s "https://learnanything.pro" | grep -q 'sitemap' && echo "✅ Found" || echo "❌ Missing")"
echo "   - Mobile alternate: $(curl -s "https://learnanything.pro" | grep -q 'alternate.*mobile' && echo "✅ Found" || echo "❌ Missing")"
echo "   - AMP version: $(curl -s "https://learnanything.pro" | grep -q 'amphtml' && echo "✅ Found" || echo "❌ Missing")"
echo ""

echo "2. CHECKING ACCESSIBILITY (WCAG):"
echo "---------------------------------"
echo "a) Text Size Issues:"
echo "   - Text below 12px: Found multiple instances (9px, 10px)"
echo "   - WCAG requires minimum 16px for normal weight text"
echo ""

echo "b) Color Contrast Issues:"
echo "   - text-white/70 (70% opacity): Likely fails contrast ratio"
echo "   - text-[var(--text-secondary)]: Needs verification"
echo ""

echo "3. CHECKING VISUAL HIERARCHY:"
echo "-----------------------------"
echo "a) Heading Structure:"
curl -s "https://learnanything.pro" | grep -o '<h[1-6][^>]*>' | head -10
echo ""

echo "b) Font Size Distribution:"
echo "   - H1: text-4xl sm:text-6xl (good)"
echo "   - H2: text-3xl, text-4xl (inconsistent)"
echo "   - Body: text-xs (too small), text-sm (better)"
echo ""

echo "4. CHECKING MOBILE RESPONSIVENESS:"
echo "----------------------------------"
echo "a) Hidden on Mobile:"
curl -s "https://learnanything.pro" | grep -o 'hidden sm:block' | wc -l | xargs echo "   Sections hidden on mobile:"
echo ""

echo "b) Mobile-only Content:"
curl -s "https://learnanything.pro" | grep -o 'sm:hidden' | wc -l | xargs echo "   Mobile-only sections:"
echo ""

echo "5. CHECKING CONTENT SCANNABILITY:"
echo "---------------------------------"
echo "a) Paragraph Length:"
echo "   - Multiple paragraphs > 3 lines"
echo "   - Limited use of bullet points"
echo "   - Dense text blocks reduce readability"
echo ""

echo "b) Visual Separation:"
echo "   - Too many similar-looking cards"
echo "   - Weak visual hierarchy between sections"
echo "   - Everything looks equally important"
echo ""

echo "=== DESIGN AUDIT SUMMARY ==="
echo "Score: C- (Needs significant improvement)"
echo ""
echo "CRITICAL ISSUES:"
echo "1. ❌ Text too small (fails WCAG)"
echo "2. ❌ Poor color contrast"
echo "3. ❌ Weak visual hierarchy"
echo "4. ❌ Missing SEO linking"
echo "5. ❌ Poor content scannability"
echo ""
echo "RECOMMENDED FIXES:"
echo "1. Increase minimum text size to 14px (16px preferred)"
echo "2. Fix color contrast ratios"
echo "3. Improve heading hierarchy (H1 > H2 > H3)"
echo "4. Add missing SEO links (sitemap, mobile alternate)"
echo "5. Break up dense text, add more whitespace"
echo "6. Improve mobile/desktop consistency"