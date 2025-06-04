<<<<<<< HEAD
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://fakestoreapi.in/api/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching products' },
      { status: 500 }
    );
  }
}
=======
import { NextResponse } from "next/server";

export async function GET() {
    const response = await fetch('http://localhost:3000/products');
    
    const {data} = await response.json();
    
    console.log('response>>>', data);

    return NextResponse.json(data);
}
>>>>>>> e92342ccaed7bd8e62daaf866c6c8cbff82254c2
