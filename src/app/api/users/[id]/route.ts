import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

/**
 * GET /api/users/[id] - Get user by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const user = await User.findById(params.id, { password: 0 }).lean();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'User not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch user',
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/users/[id] - Update user
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await request.json();
    const { email, name, password, role } = body;

    // Check if user exists
    const existingUser = await User.findById(params.id);

    if (!existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: 'User not found',
        },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData: {
      email?: string;
      name?: string;
      role?: string;
      password?: string;
    } = {};
    
    if (email) {
      // Check if email is already taken by another user
      const emailExists = await User.findOne({
        email,
        _id: { $ne: params.id },
      });

      if (emailExists) {
        return NextResponse.json(
          {
            success: false,
            message: 'Email already in use',
          },
          { status: 409 }
        );
      }

      updateData.email = email;
    }

    if (name !== undefined) updateData.name = name;
    if (role) updateData.role = role;
    
    if (password) {
      if (password.length < 6) {
        return NextResponse.json(
          {
            success: false,
            message: 'Password must be at least 6 characters',
          },
          { status: 400 }
        );
      }
      updateData.password = await bcrypt.hash(password, 10);
    }

    // Update user
    const user = await User.findByIdAndUpdate(params.id, updateData, { new: true }).select('-password').lean();

    return NextResponse.json({
      success: true,
      data: user,
      message: 'User updated successfully',
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update user',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/users/[id] - Delete user
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    // Check if user exists
    const existingUser = await User.findById(params.id);

    if (!existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: 'User not found',
        },
        { status: 404 }
      );
    }

    // Delete user
    await User.findByIdAndDelete(params.id);

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete user',
      },
      { status: 500 }
    );
  }
}
