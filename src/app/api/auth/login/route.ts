import { NextRequest, NextResponse } from "next/server";
import fs from 'fs/promises';
import path from 'path';
import { Usuario } from "@/types/types";
import jwt from 'jsonwebtoken';


async function readDbFile() {
    const dbPath = path.join(process.cwd(), 'src', 'db.json');
    const data = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(data);
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { user, password } = body;

        // Read the database
        const db = await readDbFile();
        
        // Find the user
        const foundUser = db.users.find((u: Usuario) => u.user === user && u.password === password);
        
        if (!foundUser) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        console.log('Body JWT', {user: foundUser.user})
        const userToken = jwt.sign({ user: foundUser.user }, 'jose-falopero')
        console.log('User Token', userToken)
    
        return NextResponse.json({
            user: foundUser,
            token: userToken
        });

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}