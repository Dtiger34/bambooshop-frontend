import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/services/auth.service';

/**
 * POST /api/auth/login - Login user
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const result = await AuthService.login(email, password);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.message,
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        user: result.user,
        message: result.message,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in login route:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
