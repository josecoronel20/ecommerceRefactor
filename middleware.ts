// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const isLoginPage = req.nextUrl.pathname.startsWith('/login');
  const isRegisterPage = req.nextUrl.pathname.startsWith('/register');
  const isProfilePage = req.nextUrl.pathname.startsWith('/profile');

  // Si está logeado y va al login, redirigir al home
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Si está logeado y va al registro, redirigir al home
  if (token && isRegisterPage) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Si NO está logeado y va a la pagina de perfil, redirigir al login
  if (!token && isProfilePage) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}
