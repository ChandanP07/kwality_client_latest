import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function verifySetup() {
  console.log('🔍 Verifying Print Care Setup...\n');
  
  try {
    // Test database connection
    console.log('1. Testing database connection...');
    await prisma.$connect();
    console.log('✅ Database connected successfully\n');

    // Check for users
    console.log('2. Checking users...');
    const users = await prisma.user.count();
    console.log(`✅ Found ${users} user(s)\n`);

    // Check for cities
    console.log('3. Checking cities...');
    const cities = await prisma.city.findMany();
    console.log(`✅ Found ${cities.length} cities: ${cities.map(c => c.name).join(', ')}\n`);

    // Check for branches
    console.log('4. Checking branches...');
    const branches = await prisma.branch.count();
    console.log(`✅ Found ${branches} branch(es)\n`);

    // Check for orders
    console.log('5. Checking orders...');
    const orders = await prisma.order.count();
    console.log(`✅ Found ${orders} order(s)\n`);

    // Check for complaints
    console.log('6. Checking complaints...');
    const complaints = await prisma.complaint.count();
    console.log(`✅ Found ${complaints} complaint(s)\n`);

    // Check for bills
    console.log('7. Checking bills...');
    const bills = await prisma.bill.count();
    console.log(`✅ Found ${bills} bill(s)\n`);

    // Verify test user
    console.log('8. Verifying test user...');
    const testUser = await prisma.user.findUnique({
      where: { email: 'rajesh@example.com' }
    });
    
    if (testUser) {
      const passwordValid = await bcrypt.compare('client123', testUser.password);
      if (passwordValid) {
        console.log('✅ Test user credentials valid\n');
      } else {
        console.log('❌ Test user password invalid\n');
      }
    } else {
      console.log('❌ Test user not found\n');
    }

    console.log('========================================');
    console.log('✨ Setup verification complete!');
    console.log('========================================');
    
  } catch (error) {
    console.error('❌ Error during verification:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verifySetup();