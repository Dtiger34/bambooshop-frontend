import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import User from '@/models/User';
import Product from '@/models/Product';

/**
 * GET /api/orders - Get all orders with optional filters
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');

    // Build filter object
    const filter: any = {};

    if (userId) {
      filter.userId = userId;
    }

    if (status) {
      filter.status = status;
    }

    const orders = await Order.find(filter)
      .populate('userId', 'id name email')
      .populate('items.productId', 'id name imageUrl price')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: orders,
      total: orders.length,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch orders',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/orders - Create a new order
 */
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { userId, items, shippingAddress, paymentMethod, notes } = body;

    // Validation
    if (!userId || !items || items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'User ID and items are required',
        },
        { status: 400 }
      );
    }

    // Verify user exists
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'User not found',
        },
        { status: 404 }
      );
    }

    // Verify all products exist and have sufficient stock
    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return NextResponse.json(
          {
            success: false,
            message: `Product ${item.productId} not found`,
          },
          { status: 404 }
        );
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          {
            success: false,
            message: `Insufficient stock for product: ${product.name}`,
          },
          { status: 400 }
        );
      }
    }

    // Calculate total amount
    const totalAmount = items.reduce((sum: number, item: { productId: string; quantity: number; price: number }) => {
      return sum + (item.price * item.quantity);
    }, 0);

    // Create order with items
    const orderItems = items.map((item: any) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));

    const order = await Order.create({
      userId,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentMethod,
      notes,
      status: 'PENDING',
    });

    // Update product stock
    for (const item of items) {
      await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { stock: -item.quantity } },
        { new: true }
      );
    }

    const populatedOrder = await order.populate('userId', 'id name email').populate('items.productId', 'id name imageUrl price');

    return NextResponse.json(
      {
        success: true,
        data: populatedOrder,
        message: 'Order created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create order',
      },
      { status: 500 }
    );
  }
}
