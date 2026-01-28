import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import Product from '@/models/Product';

/**
 * GET /api/orders/[id] - Get order by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const order = await Order.findById(params.id)
      .populate('userId', 'id name email')
      .populate('items.productId', 'id name imageUrl price')
      .lean();

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: 'Order not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch order',
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/orders/[id] - Update order (mainly status)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await request.json();
    const { status, shippingAddress, paymentMethod, notes } = body;

    // Check if order exists
    const existingOrder = await Order.findById(params.id);

    if (!existingOrder) {
      return NextResponse.json(
        {
          success: false,
          message: 'Order not found',
        },
        { status: 404 }
      );
    }

    // Validate status if provided
    const validStatuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Prepare update data
    const updateData: any = {};
    if (status !== undefined) updateData.status = status;
    if (shippingAddress !== undefined) updateData.shippingAddress = shippingAddress;
    if (paymentMethod !== undefined) updateData.paymentMethod = paymentMethod;
    if (notes !== undefined) updateData.notes = notes;

    // Update order
    const order = await Order.findByIdAndUpdate(params.id, updateData, { new: true })
      .populate('userId', 'id name email')
      .populate('items.productId', 'id name imageUrl price')
      .lean();

    return NextResponse.json({
      success: true,
      data: order,
      message: 'Order updated successfully',
    });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update order',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/orders/[id] - Delete/Cancel order
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if order exists
    const existingOrder = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        orderItems: true,
      },
    });

    if (!existingOrder) {
      return NextResponse.json(
        {
          success: false,
          message: 'Order not found',
        },
        { status: 404 }
      );
    }

    // Only allow deletion of pending orders
    if (existingOrder.status !== 'PENDING') {
      return NextResponse.json(
        {
          success: false,
          message: 'Only pending orders can be deleted. Use status update to cancel other orders.',
        },
        { status: 400 }
      );
    }

    // Delete order and restore stock in a transaction
    await prisma.$transaction(async (tx) => {
      // Restore product stock
      for (const item of existingOrder.orderItems) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              increment: item.quantity,
            },
          },
        });
      }

      // Delete order (cascade will delete order items)
      await tx.order.delete({
        where: { id: params.id },
      });
    });

    return NextResponse.json({
      success: true,
      message: 'Order deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting order:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete order',
      },
      { status: 500 }
    );
  }
}
