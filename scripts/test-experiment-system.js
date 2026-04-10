const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testExperimentSystem() {
  console.log('🧪 Testing A/B Experiment System...\n');
  
  try {
    // 1. Check database schema
    console.log('📊 Database Schema Check:');
    const userColumns = await prisma.$queryRaw`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'User' 
      AND column_name IN ('abExperiments', 'trialEndsAt')
      ORDER BY column_name;
    `;
    console.log('User table columns:', userColumns);
    
    // 2. Check ExperimentEvent table
    const experimentEventExists = await prisma.$queryRaw`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'ExperimentEvent'
      );
    `;
    console.log('ExperimentEvent table exists:', experimentEventExists[0].exists);
    
    // 3. Check current trial users
    const activeTrials = await prisma.user.count({
      where: {
        trialEndsAt: {
          gt: new Date()
        }
      }
    });
    console.log(`\n🎯 Active trials: ${activeTrials}`);
    
    // 4. Check users in experiment (should be 0 initially)
    const experimentUsers = await prisma.user.findMany({
      where: {
        abExperiments: {
          has: 'pro_trial_cta_v1'
        }
      },
      take: 5,
      select: { id: true, email: true, abExperiments: true }
    });
    console.log(`\n📈 Users in pro_trial_cta_v1 experiment: ${experimentUsers.length}`);
    
    if (experimentUsers.length > 0) {
      console.log('Sample users:');
      experimentUsers.forEach(user => {
        console.log(`  - ${user.email || user.id}: ${JSON.stringify(user.abExperiments)}`);
      });
    }
    
    // 5. Check total users for context
    const totalUsers = await prisma.user.count();
    console.log(`\n👥 Total users: ${totalUsers}`);
    
    // 6. Check experiment events
    const experimentEvents = await prisma.experimentEvent.count();
    console.log(`\n📊 Experiment events recorded: ${experimentEvents}`);
    
    // 7. Summary
    console.log('\n✅ SYSTEM STATUS:');
    console.log(`   - Database schema: ${userColumns.length >= 2 ? 'OK' : 'INCOMPLETE'}`);
    console.log(`   - ExperimentEvent table: ${experimentEventExists[0].exists ? 'OK' : 'MISSING'}`);
    console.log(`   - Active trials: ${activeTrials}`);
    console.log(`   - Experiment tracking: ${experimentUsers.length > 0 ? 'ACTIVE' : 'NOT STARTED'}`);
    console.log(`   - Event tracking: ${experimentEvents > 0 ? 'ACTIVE' : 'NOT STARTED'}`);
    
    if (activeTrials > 0 && experimentUsers.length === 0) {
      console.log('\n⚠️  WARNING: Trials exist but not tracked in experiments!');
      console.log('   This means the old system was running without proper tracking.');
      console.log('   New system will track future experiments properly.');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
  } finally {
    await prisma.$disconnect();
  }
}

testExperimentSystem();