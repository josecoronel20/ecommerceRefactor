import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

async function readDbFile() {
  const dbPath = path.join(process.cwd(), 'src', 'db.json');
  const data = await fs.readFile(dbPath, 'utf-8');
  return JSON.parse(data);
}

const dbPath = path.join(process.cwd(), 'src', 'db.json');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user, email, password } = body;

    const db = await readDbFile();
    const users = db.users;
    const newId = users.length + 1;
    const newUser = { id: newId, user, email, password };
    const userExists = users.find((u: any) => u.user === user);

    if (userExists) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    users.push(newUser);
    db.users = users;

    await fs.writeFile(dbPath, JSON.stringify(db, null, 2));

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error registering user' }, { status: 500 });
  }
}
