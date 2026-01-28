import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

/**
 * GET /api/users - Lấy danh sách người dùng
 */
export async function GET() {
  try {
    await connectDB();
    const users = await User.find({}, { password: 0 }).lean();

    return NextResponse.json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error('Lỗi khi lấy người dùng:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Lấy danh sách người dùng thất bại',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/users - Tạo người dùng mới
 */
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { email, name, password, role } = body;

    // Kiểm tra dữ liệu
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email và mật khẩu là bắt buộc',
        },
        { status: 400 }
      );
    }

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Định dạng email không hợp lệ',
        },
        { status: 400 }
      );
    }

    // Kiểm tra mật khẩu
    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: 'Mật khẩu phải có ít nhất 6 ký tự',
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: 'Người dùng với email này đã tồn tại',
        },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      email,
      name,
      password: hashedPassword,
      role: role || 'USER',
    });

    const { password: _, ...userObj } = user.toObject();

    return NextResponse.json(
      {
        success: true,
        data: userObj,
        message: 'Tạo người dùng thành công',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Lỗi khi tạo người dùng:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Tạo người dùng thất bại',
      },
      { status: 500 }
    );
  }
}
