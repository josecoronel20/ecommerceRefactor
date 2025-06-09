// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;
  
  console.log('Middleware ejecutándose');
  console.log('Token:', token);
  console.log('Pathname:', pathname);

  // Si está en /login o /register con token, redirigir a home
  if ((pathname.startsWith('/login') || pathname.startsWith('/register')) && token) {
    console.log('Redirigiendo a home porque hay token');
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Si está en /profile sin token, redirigir a login
  if (pathname.startsWith('/profile') && !token) {
    console.log('Redirigiendo a login porque no hay token');
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Permitir acceso a /register sin token
  if (pathname.startsWith('/register')) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/login/:path*', '/register/:path*']
};
