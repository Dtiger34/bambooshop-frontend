import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/services/auth.service';

/**
 * POST /api/auth/register - Register a new user
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, password, role } = body;

    const result = await AuthService.register({
      email,
      name,
      password,
      role,
    });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        user: result.user,
        message: result.message,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in register route:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
