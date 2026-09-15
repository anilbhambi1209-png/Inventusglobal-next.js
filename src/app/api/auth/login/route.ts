import { NextResponse } from 'next/server';
import {
  createSessionToken,
  validateAdminCredentials,
  ADMIN_COOKIE_NAME,
  SESSION_DURATION_SECONDS,
} from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const isValid = validateAdminCredentials(username, password);

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials. Access denied.' },
        { status: 401 }
      );
    }

    const token = await createSessionToken(username);
    const isProduction = process.env.NODE_ENV === 'production';

    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
    });

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_DURATION_SECONDS,
    });

    return response;
  } catch (error: any) {
    console.error('Login error in /api/auth/login:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected authentication error occurred.' },
      { status: 500 }
    );
  }
}
