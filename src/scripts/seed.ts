/**
 * Database Seed Script
 * Run this script to populate the database with sample data
 * Usage: npm run seed
 */

import connectDB from '../lib/mongodb';
import User from '../models/User';
import Product from '../models/Product';
import Order from '../models/Order';
import { sampleUsers } from '../data/sampleUsers';
import { sampleProducts } from '../data/sampleProducts';
import bcrypt from 'bcryptjs';

async function seed() {
  try {
    console.log('🌱 Starting database seed...\n');

    // Connect to database
    await connectDB();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    console.log('✅ Existing data cleared\n');

    // Seed Users
    console.log('👥 Seeding users...');
    const createdUsers = [];
    for (const userData of sampleUsers) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await User.create({
        email: userData.email,
        name: userData.name,
        password: hashedPassword,
        role: userData.role,
      });
      createdUsers.push(user);
      console.log(`   ✓ Created user: ${user.email} (${user.role})`);
    }
    console.log(`✅ ${createdUsers.length} users created\n`);

    // Seed Products
    console.log('📦 Seeding products...');
    const createdProducts = [];
    for (const productData of sampleProducts) {
      const product = await Product.create(productData);
      createdProducts.push(product);
      console.log(`   ✓ Created product: ${product.name} - $${product.price}`);
    }
    console.log(`✅ ${createdProducts.length} products created\n`);

    // Seed Orders
    console.log('🛒 Seeding orders...');
    const sampleOrders = [
      {
        userId: createdUsers[1]._id.toString(), // John Doe
        orderItems: [
          {
            productId: createdProducts[4]._id.toString(), // Bamboo Cutting Board Set
            quantity: 2,
            price: createdProducts[4].price,
          },
          {
            productId: createdProducts[5]._id.toString(), // Bamboo Utensil Set
            quantity: 1,
            price: createdProducts[5].price,
          },
        ],
        totalAmount: createdProducts[4].price * 2 + createdProducts[5].price,
        status: 'DELIVERED',
        shippingAddress: '123 Main St, New York, NY 10001',
        paymentMethod: 'Credit Card',
        notes: 'Please deliver in the morning',
      },
      {
        userId: createdUsers[2]._id.toString(), // Jane Smith
        orderItems: [
          {
            productId: createdProducts[0]._id.toString(), // Bamboo Dining Table
            quantity: 1,
            price: createdProducts[0].price,
          },
          {
            productId: createdProducts[1]._id.toString(), // Bamboo Chair Set
            quantity: 1,
            price: createdProducts[1].price,
          },
        ],
        totalAmount: createdProducts[0].price + createdProducts[1].price,
        status: 'SHIPPED',
        shippingAddress: '456 Oak Ave, Los Angeles, CA 90001',
        paymentMethod: 'PayPal',
        notes: 'Gift wrap requested',
      },
      {
        userId: createdUsers[4]._id.toString(), // Alice Johnson
        orderItems: [
          {
            productId: createdProducts[2]._id.toString(), // Bamboo Coffee Table
            quantity: 1,
            price: createdProducts[2].price,
          },
          {
            productId: createdProducts[8]._id.toString(), // Bamboo Plant Pot
            quantity: 3,
            price: createdProducts[8].price,
          },
        ],
        totalAmount: createdProducts[2].price + createdProducts[8].price * 3,
        status: 'PROCESSING',
        shippingAddress: '789 Elm St, Chicago, IL 60601',
        paymentMethod: 'Credit Card',
      },
      {
        userId: createdUsers[5]._id.toString(), // Bob Williams
        orderItems: [
          {
            productId: createdProducts[6]._id.toString(), // Bamboo Bowl Set
            quantity: 2,
            price: createdProducts[6].price,
          },
          {
            productId: createdProducts[7]._id.toString(), // Bamboo Plate Set
            quantity: 1,
            price: createdProducts[7].price,
          },
        ],
        totalAmount: createdProducts[6].price * 2 + createdProducts[7].price,
        status: 'PENDING',
        shippingAddress: '321 Pine St, Seattle, WA 98101',
        paymentMethod: 'Debit Card',
      },
    ];

    const createdOrders = [];
    for (const orderData of sampleOrders) {
      const order = await Order.create(orderData);
      createdOrders.push(order);
      console.log(`   ✓ Created order: ${order._id} - $${order.totalAmount} (${order.status})`);
    }
    console.log(`✅ ${createdOrders.length} orders created\n`);

    // Summary
    console.log('═══════════════════════════════════════');
    console.log('🎉 Database seeded successfully!');
    console.log('═══════════════════════════════════════');
    console.log(`📊 Summary:`);
    console.log(`   • Users:    ${createdUsers.length}`);
    console.log(`   • Products: ${createdProducts.length}`);
    console.log(`   • Orders:   ${createdOrders.length}`);
    console.log('═══════════════════════════════════════\n');

    console.log('🔐 Sample Login Credentials:');
    console.log('   Admin:  admin@bambooshop.com / Admin@123');
    console.log('   User:   john.doe@example.com / User@123');
    console.log('═══════════════════════════════════════\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

// Run seed
seed();
