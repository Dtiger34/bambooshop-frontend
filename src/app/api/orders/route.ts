import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Prisma, OrderStatus } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * GET /api/orders - Get all orders with optional filters
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');

    // Build filter object
    const where: Prisma.OrderWhereInput = {};

    if (userId) {
      where.userId = userId;
    }

    if (status) {
      where.status = status;
    }

    const orders = await prisma.order.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        orderItems: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                imageUrl: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Transform data to include product names in order items
    const transformedOrders = orders.map(order => ({
      ...order,
      userName: order.user.name,
      userEmail: order.user.email,
      orderItems: order.orderItems.map(item => ({
        ...item,
        productName: item.product.name,
      })),
    }));

    return NextResponse.json({
      success: true,
      data: transformedOrders,
      total: transformedOrders.length,
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
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

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
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

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

    // Create order with items in a transaction
    const order = await prisma.$transaction(async (tx) => {
      // Create the order
      const newOrder = await tx.order.create({
        data: {
          userId,
          totalAmount,
          shippingAddress,
          paymentMethod,
          notes,
          status: 'PENDING',
        },
      });

      // Create order items and update product stock
      for (const item of items) {
        await tx.orderItem.create({
          data: {
            orderId: newOrder.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          },
        });

        // Decrease product stock
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      // Fetch complete order with relations
      return await tx.order.findUnique({
        where: { id: newOrder.id },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          orderItems: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  imageUrl: true,
                },
              },
            },
          },
        },
      });
    });

    return NextResponse.json(
      {
        success: true,
        data: order,
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
