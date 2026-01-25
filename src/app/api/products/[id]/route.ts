import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import mongoose from 'mongoose';

/**
 * GET /api/products/[id] - Get product by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid product ID',
        },
        { status: 400 }
      );
    }

    const product = await Product.findById(params.id);

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: 'Product not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch product',
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/products/[id] - Update product
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid product ID',
        },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, description, price, stock, category, imageUrl, isActive } = body;

    // Check if product exists
    const existingProduct = await Product.findById(params.id);

    if (!existingProduct) {
      return NextResponse.json(
        {
          success: false,
          message: 'Product not found',
        },
        { status: 404 }
      );
    }

    // Validate price if provided
    if (price !== undefined && price < 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Price must be a positive number',
        },
        { status: 400 }
      );
    }

    // Validate stock if provided
    if (stock !== undefined && stock < 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Stock must be a non-negative number',
        },
        { status: 400 }
      );
    }

    // Prepare update data
    const updateData: Partial<{
      name: string;
      description: string;
      price: number;
      stock: number;
      category: string;
      imageUrl: string;
      isActive: boolean;
    }> = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = price;
    if (stock !== undefined) updateData.stock = stock;
    if (category !== undefined) updateData.category = category;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
    if (isActive !== undefined) updateData.isActive = isActive;

    // Update product
    const product = await Product.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true }
    );

    return NextResponse.json({
      success: true,
      data: product,
      message: 'Product updated successfully',
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update product',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/products/[id] - Delete product
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid product ID',
        },
        { status: 400 }
      );
    }

    // Check if product exists
    const existingProduct = await Product.findById(params.id);

    if (!existingProduct) {
      return NextResponse.json(
        {
          success: false,
          message: 'Product not found',
        },
        { status: 404 }
      );
    }

    // Delete product
    await Product.findByIdAndDelete(params.id);

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete product',
      },
      { status: 500 }
    );
  }
}
