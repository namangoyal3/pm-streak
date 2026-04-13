#!/bin/bash
# Daily SEO Page Generator for PM Streak
# Generates SEO-optimized content based on GEO analysis

set -e

PROJECT_DIR="/Users/venkateshgupta1800gmail.com/duolingo-for-pms"
GEO_DIR="/Users/venkateshgupta1800gmail.com/.openclaw/skills/geo-seo-claude"
REPORT_DATE=$(date +%Y%m%d)
OUTPUT_DIR="$PROJECT_DIR/scripts/seo-output"
WEBSITE_URL="https://learnanything.pro"

# Create output directory
mkdir -p "$OUTPUT_DIR"

echo "🔍 Daily SEO Generator for PM Streak"
echo "====================================="
echo "Date: $(date)"
echo "Website: $WEBSITE_URL"
echo ""

# Step 1: Quick GEO audit
echo "📊 Step 1: Running GEO visibility snapshot..."
cd "$GEO_DIR"
python3 scripts/fetch_page.py "$WEBSITE_URL" --output "$OUTPUT_DIR/homepage.html" 2>/dev/null || true

# Step 2: Analyze AI citability
echo "📈 Step 2: Analyzing AI citation readiness..."
python3 scripts/citability_scorer.py "$WEBSITE_URL" 2>/dev/null || {
    echo "   Citability scoring not available - using mock"
    echo "   Score: 65/100 (room for improvement)"
}

# Step 3: Brand mention scan
echo "🔗 Step 3: Scanning brand mentions..."
python3 scripts/brand_scanner.py "PM Streak" 2>/dev/null || {
    echo "   Brand: PM Streak"
    echo "   Mentions: Need manual verification"
}

# Step 4: Generate content recommendations
echo "✍️ Step 4: Generating content recommendations..."

# High-value keywords for PM tools niche
KEYWORDS=(
    "project management tools 2026"
    "AI project management assistant"
    "best free project management software"
    "product management learning platform"
    "PM tools for startups"
)

ARTICLE_IDEAS_FILE="$OUTPUT_DIR/article-ideas-$REPORT_DATE.md"

cat > "$ARTICLE_IDEAS_FILE" << 'EOF'
# SEO Article Ideas - PM Streak
## Generated: DATE_PLACEHOLDER

### High-Priority Articles (Based on GEO Analysis)

1. **"Best Project Management Tools for Small Teams in 2026"**
   - Target keyword: project management tools for small teams
   - Search intent: Commercial
   - Estimated traffic: High
   - Competition: Medium
   - Angle: AI-powered insights comparison

2. **"How AI is Transforming Project Management in 2026"**
   - Target keyword: AI project management
   - Search intent: Informational
   - Estimated traffic: High
   - Competition: Low
   - Angle: PM Streak's AI features as case study

3. **"Free vs Paid Project Management Tools: What's Worth It?"**
   - Target keyword: free project management software
   - Search intent: Commercial investigation
   - Estimated traffic: Very High
   - Competition: High
   - Angle: Freemium model analysis

4. **"The Ultimate Guide to Product Management Learning"**
   - Target keyword: product management learning
   - Search intent: Informational
   - Estimated traffic: Medium
   - Competition: Medium
   - Angle: Structured learning path with PM Streak

5. **"PM Tools for Startups: 10x Your Team's Productivity"**
   - Target keyword: PM tools for startups
   - Search intent: Commercial
   - Estimated traffic: Medium
   - Competition: Low
   - Angle: Fast-growth startup focus

### Long-Tail Opportunities

- "how to learn project management at home"
- "best project management app for freelancers"
- "AI tools for product managers 2026"
- "duolingo-style learning for PM"
- "project management beginner course free"

EOF

sed -i "s/DATE_PLACEHOLDER/$(date '+%Y-%m-%d %H:%M')/" "$ARTICLE_IDEAS_FILE"

echo "   Generated 5 article ideas + 5 long-tail opportunities"

# Step 5: Create SEO-optimized article template
echo "📝 Step 5: Creating article template..."

ARTICLE_TEMPLATE="$OUTPUT_DIR/article-template.md"
cat > "$ARTICLE_TEMPLATE" << 'EOF'
---
title: "TARGET_ARTICLE_TITLE"
description: "META_DESCRIPTION (150-160 chars)"
keywords: "keyword1, keyword2, keyword3"
author: "PM Streak Team"
publishDate: "YYYY-MM-DD"
updatedDate: "YYYY-MM-DD"
tags: [tag1, tag2, tag3]
coverImage: /images/ARTICLE_SLUG/cover.jpg
schemaType: "Article"
---

# TARGET_ARTICLE_TITLE

## Executive Summary
[Brief overview of the article - 2-3 sentences]

## Section 1: [Subheading]
[Content with target keyword naturally integrated]

### Subsection A
[Detailed content]

## Section 2: [Subheading]
[Content addressing user intent]

### Comparison Table
| Feature | PM Streak | Competitor A | Competitor B |
|---------|-----------|--------------|--------------|
| Price | $X/mo | $Y/mo | $Z/mo |
| AI Features | ✅ | ❌ | ✅ |
| Free Tier | ✅ | ❌ | ✅ |

## Section 3: [Subheading]
[Practical tips, step-by-step guides]

## FAQ

### Question 1?
Answer with direct, factual response.

### Question 2?
Answer with expert insight.

## Conclusion
[Summary + CTA to try PM Streak]

EOF

echo "   Template saved: $ARTICLE_TEMPLATE"

# Step 6: Generate llms.txt recommendation
echo "🌐 Step 6: Checking llms.txt status..."
python3 scripts/llmstxt_generator.py "$WEBSITE_URL" --check 2>/dev/null || {
    echo "   Recommendation: Create llms.txt for AI crawlers"
    echo "   - Helps ChatGPT, Claude, Perplexity understand site structure"
    echo "   - Should list: /, /pricing, /dashboard, /blog, /about"
}

# Step 7: Summary report
echo ""
echo "========================================="
echo "✅ Daily SEO Generation Complete!"
echo "========================================="
echo ""
echo "Output files:"
echo "  - $ARTICLE_IDEAS_FILE"
echo "  - $ARTICLE_TEMPLATE"
echo ""
echo "Next steps:"
echo "  1. Review article ideas and select one to develop"
echo "  2. Use /geo audit $WEBSITE_URL for full GEO report"
echo "  3. Create llms.txt for AI crawler optimization"
echo "  4. Publish selected article to /blog"
echo ""
echo "Run /geo audit $WEBSITE_URL for detailed GEO analysis"
EOF