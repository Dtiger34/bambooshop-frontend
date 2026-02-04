import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
dotenv.config();

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  phone: String,
  address: String,
  city: String,
  zipCode: String,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

async function seedUsers() {
  try {
    // Connect to MongoDB
    const dbUrl =
      process.env.DATABASE_URL || 'mongodb://localhost:27017/bambooshop';
    await mongoose.connect(dbUrl);
    console.log('Connected to MongoDB:', dbUrl);

    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Create sample users
    const testUsers = [
      {
        email: 'user@example.com',
        password: await bcrypt.hash('password123', 10),
        firstName: 'John',
        lastName: 'Doe',
        role: 'user',
        phone: '0123456789',
        address: '123 Main St',
        city: 'Ho Chi Minh',
        zipCode: '70000',
      },
      {
        email: 'admin@example.com',
        password: await bcrypt.hash('admin123', 10),
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        phone: '0987654321',
        address: '456 Admin St',
        city: 'Hanoi',
        zipCode: '100000',
      },
      {
        email: 'customer@example.com',
        password: await bcrypt.hash('customer123', 10),
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'user',
        phone: '0912345678',
        address: '789 Customer St',
        city: 'Da Nang',
        zipCode: '50000',
      },
    ];

    // Insert users
    const createdUsers = await User.insertMany(testUsers);
    console.log('✓ Created', createdUsers.length, 'users');

    // Display created users (without passwords)
    createdUsers.forEach((user) => {
      console.log(`  - ${user.email} (${user.role})`);
    });

    console.log('\n✓ Seed data created successfully!');
    console.log('\nYou can now login with:');
    console.log('  Email: user@example.com, Password: password123');
    console.log('  Email: admin@example.com, Password: admin123');
    console.log('  Email: customer@example.com, Password: customer123');

    await mongoose.connection.close();
    console.log('\n✓ Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedUsers();
