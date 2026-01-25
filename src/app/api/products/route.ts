import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

/**
 * GET /api/products - Get all products with optional filters
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const isActive = searchParams.get('isActive');
    const search = searchParams.get('search');

    // Build filter object
    interface ProductFilter {
      category?: string;
      isActive?: boolean;
      price?: {
        $gte?: number;
        $lte?: number;
      };
      $or?: Array<{
        name?: { $regex: string; $options: string };
        description?: { $regex: string; $options: string };
      }>;
    }
    
    const filter: ProductFilter = {};

    if (category) {
      filter.category = category;
    }

    if (isActive !== null) {
      filter.isActive = isActive === 'true';
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: products,
      total: products.length,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch products',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/products - Create a new product
 */
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { name, description, price, stock, category, imageUrl, isActive } = body;

    // Validation
    if (!name || !price || !category) {
      return NextResponse.json(
        {
          success: false,
          message: 'Name, price, and category are required',
        },
        { status: 400 }
      );
    }

    if (price < 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Price must be a positive number',
        },
        { status: 400 }
      );
    }

    if (stock !== undefined && stock < 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Stock must be a non-negative number',
        },
        { status: 400 }
      );
    }

    // Create product
    const product = await Product.create({
      name,
      description,
      price,
      stock: stock || 0,
      category,
      imageUrl,
      isActive: isActive !== undefined ? isActive : true,
    });

    return NextResponse.json(
      {
        success: true,
        data: product,
        message: 'Product created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create product',
      },
      { status: 500 }
    );
  }
}
