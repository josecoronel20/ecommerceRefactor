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
