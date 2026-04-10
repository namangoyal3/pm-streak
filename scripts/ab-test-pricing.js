/**
 * A/B Testing Framework for PM Streak Pricing
 * Tests different pricing strategies to optimize conversion rate
 */

const fs = require('fs');
const path = require('path');

// A/B Test Variations
const PRICING_VARIATIONS = {
  // Control: Current pricing
  control: {
    name: 'Control (Current)',
    monthlyPrice: 249,
    quarterlyPrice: 699,
    yearlyPrice: 2499,
    features: {
      freeLessons: 12,
      proLessons: 292,
      freeCredits: 5,
      proCredits: 100,
      highlight: '70% OFF Launch Pricing'
    },
    ctaText: 'Upgrade to Pro'
  },
  
  // Variation A: Lower entry price
  variation_a: {
    name: 'Lower Entry',
    monthlyPrice: 199,
    quarterlyPrice: 549,
    yearlyPrice: 1999,
    features: {
      freeLessons: 7,
      proLessons: 292,
      freeCredits: 3,
      proCredits: 100,
      highlight: 'Best Value - 80% OFF'
    },
    ctaText: 'Get Started - ₹199/mo'
  },
  
  // Variation B: Premium positioning
  variation_b: {
    name: 'Premium',
    monthlyPrice: 399,
    quarterlyPrice: 1099,
    yearlyPrice: 3999,
    features: {
      freeLessons: 5,
      proLessons: 350, // Includes bonus content
      freeCredits: 3,
      proCredits: 150,
      highlight: 'Premium Content + Coaching'
    },
    ctaText: 'Go Premium - ₹399/mo'
  },
  
  // Variation C: Freemium focus
  variation_c: {
    name: 'Freemium Focus',
    monthlyPrice: 299,
    quarterlyPrice: 799,
    yearlyPrice: 2999,
    features: {
      freeLessons: 3, // Very limited free tier
      proLessons: 292,
      freeCredits: 2,
      proCredits: 100,
      highlight: 'Unlock Everything'
    },
    ctaText: 'Unlock All Access'
  }
};

// Test configuration
const TEST_CONFIG = {
  testName: 'pricing_strategy_q2_2026',
  startDate: '2026-04-10',
  durationDays: 30,
  targetSampleSize: 1000,
  primaryMetric: 'conversion_rate',
  secondaryMetrics: ['revenue_per_user', 'churn_rate'],
  allocation: {
    control: 0.25,
    variation_a: 0.25,
    variation_b: 0.25,
    variation_c: 0.25
  }
};

class ABTestManager {
  constructor() {
    this.resultsFile = path.join(__dirname, 'ab-test-results.json');
    this.loadResults();
  }
  
  loadResults() {
    try {
      if (fs.existsSync(this.resultsFile)) {
        this.results = JSON.parse(fs.readFileSync(this.resultsFile, 'utf8'));
      } else {
        this.results = {
          tests: {},
          participants: {}
        };
      }
    } catch (error) {
      console.error('Error loading results:', error);
      this.results = {
        tests: {},
        participants: {}
      };
    }
  }
  
  saveResults() {
    try {
      fs.writeFileSync(this.resultsFile, JSON.stringify(this.results, null, 2));
    } catch (error) {
      console.error('Error saving results:', error);
    }
  }
  
  assignVariation(userId) {
    // Simple hash-based assignment for consistency
    const hash = this.hashString(userId);
    const rand = hash % 100 / 100;
    
    let cumulative = 0;
    for (const [variation, allocation] of Object.entries(TEST_CONFIG.allocation)) {
      cumulative += allocation;
      if (rand <= cumulative) {
        return variation;
      }
    }
    
    return 'control'; // fallback
  }
  
  hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }
  
  recordParticipation(userId, variation) {
    if (!this.results.participants[TEST_CONFIG.testName]) {
      this.results.participants[TEST_CONFIG.testName] = {};
    }
    
    this.results.participants[TEST_CONFIG.testName][userId] = {
      variation,
      joinedAt: new Date().toISOString(),
      events: []
    };
    
    this.saveResults();
  }
  
  recordEvent(userId, eventType, data = {}) {
    const test = this.results.participants[TEST_CONFIG.testName];
    if (!test || !test[userId]) return;
    
    test[userId].events.push({
      type: eventType,
      timestamp: new Date().toISOString(),
      data
    });
    
    this.saveResults();
  }
  
  recordConversion(userId, amount, plan) {
    this.recordEvent(userId, 'conversion', { amount, plan });
    
    // Update test results
    if (!this.results.tests[TEST_CONFIG.testName]) {
      this.results.tests[TEST_CONFIG.testName] = {
        variations: {}
      };
    }
    
    const test = this.results.tests[TEST_CONFIG.testName];
    const participant = this.results.participants[TEST_CONFIG.testName][userId];
    const variation = participant.variation;
    
    if (!test.variations[variation]) {
      test.variations[variation] = {
        participants: 0,
        conversions: 0,
        revenue: 0,
        events: {}
      };
    }
    
    test.variations[variation].participants += 1;
    test.variations[variation].conversions += 1;
    test.variations[variation].revenue += amount;
    
    this.saveResults();
  }
  
  generateReport() {
    const test = this.results.tests[TEST_CONFIG.testName];
    if (!test) {
      console.log('No test data available');
      return;
    }
    
    console.log('='.repeat(60));
    console.log('A/B TEST REPORT:', TEST_CONFIG.testName);
    console.log('='.repeat(60));
    
    let totalParticipants = 0;
    let totalConversions = 0;
    let totalRevenue = 0;
    
    // Calculate totals
    for (const [variation, data] of Object.entries(test.variations)) {
      totalParticipants += data.participants;
      totalConversions += data.conversions;
      totalRevenue += data.revenue;
    }
    
    // Print results for each variation
    for (const [variation, data] of Object.entries(test.variations)) {
      const conversionRate = data.participants > 0 
        ? (data.conversions / data.participants) * 100 
        : 0;
      
      const avgRevenue = data.conversions > 0
        ? data.revenue / data.conversions
        : 0;
      
      console.log(`\n${PRICING_VARIATIONS[variation].name}:`);
      console.log(`  Participants: ${data.participants}`);
      console.log(`  Conversions: ${data.conversions}`);
      console.log(`  Conversion Rate: ${conversionRate.toFixed(2)}%`);
      console.log(`  Total Revenue: ₹${data.revenue}`);
      console.log(`  Avg Revenue/Conversion: ₹${avgRevenue.toFixed(2)}`);
      
      if (variation === 'control') {
        console.log(`  Monthly Price: ₹${PRICING_VARIATIONS[variation].monthlyPrice}`);
      }
    }
    
    // Statistical significance (simplified)
    console.log('\n' + '='.repeat(60));
    console.log('RECOMMENDATIONS:');
    
    // Find best performing variation
    let bestVariation = 'control';
    let bestConversionRate = 0;
    
    for (const [variation, data] of Object.entries(test.variations)) {
      const conversionRate = data.participants > 0 
        ? data.conversions / data.participants 
        : 0;
      
      if (conversionRate > bestConversionRate && variation !== 'control') {
        bestConversionRate = conversionRate;
        bestVariation = variation;
      }
    }
    
    const controlData = test.variations.control;
    const controlRate = controlData.participants > 0
      ? controlData.conversions / controlData.participants
      : 0;
    
    const bestData = test.variations[bestVariation];
    const bestRate = bestData ? bestConversionRate : 0;
    
    if (bestRate > controlRate * 1.1) { // 10% improvement
      console.log(`✅ RECOMMENDATION: Switch to ${PRICING_VARIATIONS[bestVariation].name}`);
      console.log(`   Expected improvement: ${((bestRate/controlRate - 1) * 100).toFixed(1)}%`);
    } else if (bestRate > controlRate) {
      console.log(`⚠️  CONSIDER: ${PRICING_VARIATIONS[bestVariation].name} shows potential`);
      console.log(`   Improvement: ${((bestRate/controlRate - 1) * 100).toFixed(1)}%`);
    } else {
      console.log(`✅ KEEP: Control variation is performing best`);
    }
    
    console.log('\n' + '='.repeat(60));
  }
  
  getPricingTemplate(variation) {
    const config = PRICING_VARIATIONS[variation] || PRICING_VARIATIONS.control;
    
    return {
      monthlyPrice: config.monthlyPrice,
      quarterlyPrice: config.quarterlyPrice,
      yearlyPrice: config.yearlyPrice,
      features: config.features,
      ctaText: config.ctaText,
      highlight: config.highlight
    };
  }
}

// Export for use in Next.js API
module.exports = {
  ABTestManager,
  PRICING_VARIATIONS,
  TEST_CONFIG
};

// Run report if called directly
if (require.main === module) {
  const manager = new ABTestManager();
  manager.generateReport();
  
  // Example: Simulate some test data
  console.log('\n\nExample test assignment:');
  const testUsers = ['user1@example.com', 'user2@example.com', 'user3@example.com'];
  testUsers.forEach(userId => {
    const variation = manager.assignVariation(userId);
    console.log(`${userId} → ${variation} (${PRICING_VARIATIONS[variation].name})`);
  });
}