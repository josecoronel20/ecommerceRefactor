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

    //referencia del usuario encontrado en la coleccion users
    const db = await readDbFile();
    const foundUser = db.users.find((eachUser: User) => eachUser.user === user);

    if (!foundUser) {
      return NextResponse.json({ error: 'invalid credentials' }, { status: 401 });
    }

    if (foundUser.password !== password) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const userToken = jwt.sign({ id: foundUser.id }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });

    //retorna el usuario
    return NextResponse.json({
      user: foundUser,
      token: userToken,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
