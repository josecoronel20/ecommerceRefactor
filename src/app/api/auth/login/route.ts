import { NextRequest, NextResponse } from "next/server";
import fs from 'fs/promises';
import path from 'path';
import { User } from "@/types/types";
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie'


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
        const foundUser: User = db.users.find((u: User) => u.user === user && u.password === password);
        
        if (!foundUser) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        const userToken = jwt.sign({ user: foundUser.user }, 'secret-key')

        //retorna el usuario
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