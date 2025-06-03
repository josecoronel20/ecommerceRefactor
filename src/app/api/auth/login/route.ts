import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/types/types';
import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs/promises';

async function readDbFile() {
  const dbPath = path.join(process.cwd(), 'src', 'db.json');
  const data = await fs.readFile(dbPath, 'utf-8');
  return JSON.parse(data);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user, password } = body;

    const db = await readDbFile();
    const foundUser = db.users.find((eachUser: User) => eachUser.user === user);

    if (!foundUser || foundUser.password !== password) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const userToken = jwt.sign(
      { foundUser },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    // Creamos la respuesta
    const response = NextResponse.json({
      user: {
        id: foundUser.id,
        user: foundUser.user,
      },
    });

    // ✅ Seteamos cookie segura desde el BACKEND
    response.cookies.set('token', userToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60, // 1 hora en segundos
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
