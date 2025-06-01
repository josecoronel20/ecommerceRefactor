import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/types/types';
import jwt from 'jsonwebtoken';
import { db } from '@/lib/firebase';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user, password } = body;

    //referencia del usuario encontrado en la coleccion users
    const userRef = doc(db, 'users', user);

    //obtener los datos de la coleccion
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return NextResponse.json({ error: 'invalid credentials' }, { status: 401 });
    }

    const foundUser = userSnap.data() as User;

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
