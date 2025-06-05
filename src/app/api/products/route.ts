import { NextResponse } from "next/server";

export async function GET() {
    const response = await fetch('http://localhost:3001/api/products');
    
    const {data} = await response.json();
    
    console.log('response>>>', data);

    return NextResponse.json(data);
}
