const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkTrials() {
  try {
    console.log('🔍 Checking trial status and A/B experiment...\n');
    
    // 1. Check active trials
    const activeTrials = await prisma.user.count({
      where: {
        trialEndsAt: {
          gt: new Date()
        }
      }
    });
    console.log(`✅ Active trials: ${activeTrials}`);
    
    // 2. Check trialEndsAt field exists
    const sampleUser = await prisma.user.findFirst({
      select: { trialEndsAt: true, email: true }
    });
    console.log(`📊 Sample user trialEndsAt: ${sampleUser?.trialEndsAt || 'null'}`);
    
    // 3. Check experiment exposure
    const experimentUsers = await prisma.user.findMany({
      where: {
        abExperiments: {
          contains: 'pro_trial_cta_v1'
        }
      },
      take: 5
    });
    console.log(`🧪 Users in pro_trial_cta_v1 experiment: ${experimentUsers.length}`);
    
    if (experimentUsers.length > 0) {
      console.log('\n📋 Experiment users sample:');
      experimentUsers.forEach((user, i) => {
        console.log(`  ${i+1}. ${user.email || user.id} - ${user.abExperiments}`);
      });
    }
    
    // 4. Check trial conversions
    const trialConversions = await prisma.user.count({
      where: {
        trialEndsAt: {
          gt: new Date('2026-01-01')
        },
        subscriptionStatus: 'active'
      }
    });
    console.log(`💰 Trial → Paid conversions: ${trialConversions}`);
    
    // 5. Check total users for context
    const totalUsers = await prisma.user.count();
    console.log(`👥 Total users: ${totalUsers}`);
    
    // 6. Check if experiment is properly tracked
    console.log('\n🔬 Experiment Analysis:');
    console.log(`   - Experiment exists in code: ${experimentUsers.length > 0 ? 'YES' : 'NO'}`);
    console.log(`   - Active trials: ${activeTrials}`);
    console.log(`   - Trial conversion rate: ${totalUsers > 0 ? ((trialConversions / totalUsers * 100).toFixed(1) + '%') : 'N/A'}`);
    
    if (activeTrials === 0 && experimentUsers.length === 0) {
      console.log('\n⚠️  WARNING: Experiment appears inactive or not properly tracked!');
      console.log('   - No active trials found');
      console.log('   - No users tracked in experiment');
      console.log('   - Likely need to implement proper A/B testing system');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
  } finally {
    await prisma.$disconnect();
  }
}

checkTrials();