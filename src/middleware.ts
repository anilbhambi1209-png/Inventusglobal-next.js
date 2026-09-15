import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ADMIN_COOKIE_NAME, verifySessionToken } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Read session cookie
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const session = await verifySessionToken(token);
  const isAuthenticated = session !== null;

  // If user is trying to access the login page
  if (pathname === '/admin/login') {
    // If already logged in, redirect straight to /admin dashboard
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    // Otherwise allow viewing the login screen
    return NextResponse.next();
  }

  // For any other /admin routes (e.g. /admin, /admin/editor, etc.)
  if (pathname.startsWith('/admin')) {
    if (!isAuthenticated) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
