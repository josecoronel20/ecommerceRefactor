import path from "path";
import fs from "fs/promises";
import { NextResponse } from "next/server";

async function readDbFile() {
    const dbPath = path.join(process.cwd(), 'src', 'db.json');
    const data = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(data);
}

export async function GET() {
    const db = await readDbFile();
    const users = db.users;
    return NextResponse.json(users);
}