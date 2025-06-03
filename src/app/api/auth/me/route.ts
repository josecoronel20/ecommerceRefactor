// /app/api/auth/me/route.ts

import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs/promises';
import { User } from '@/types/auth';

async function readDbFile() {
  const dbPath = path.join(process.cwd(), 'src', 'db.json');
  const data = await fs.readFile(dbPath, 'utf-8');
  return JSON.parse(data);
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) {
    return NextResponse.json({ error: 'No secret key provided' }, { status: 500 });
  }

  try {
    const decoded = jwt.verify(token, secretKey) as { id: number}

    const db = await readDbFile();
    const userFound = db.users.find((u: User) => u.id === decoded.id);

    if (!userFound) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      user: userFound,
    });
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
