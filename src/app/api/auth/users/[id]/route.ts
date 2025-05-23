import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { TableColumnsSplitIcon } from "lucide-react";

async function readDbFile() {
  const dbPath = path.join(process.cwd(), "src", "db.json");
  const data = await fs.readFile(dbPath, "utf-8");
  return JSON.parse(data);
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const db = await readDbFile();
    const user = db.users.find((user: any) => user.id === id);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  //lee el archivo db.json
  const dbPath = path.join(process.cwd(), "src", "db.json");
  //obtiene el id del usuario
  const { id } = params;
  //convierte el id a un numero
  const idToNumber = parseInt(id);
  //lee el archivo db.json
  let db = await readDbFile();
  //obtiene los usuarios
  let users = db.users;
  //obtiene los datos del usuario
  const userUpdated = await request.json();
  console.log("funciona el put");
  //actualiza el usuario
  const usersUpdated = users.map((user: any) =>
    user.id === idToNumber ? { ...user, ...userUpdated } : user
  );

  db.users = usersUpdated;
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
  let data = await readDbFile();
  console.log(data);
  return NextResponse.json(usersUpdated);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const idToNumber = parseInt(id);
  const dbPath = path.join(process.cwd(), "src", "db.json");
  const db = await readDbFile();
  const users = db.users;
  const usersUpdated = users.filter((user: any) => user.id !== idToNumber);
  db.users = usersUpdated;
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
  return NextResponse.json(usersUpdated);
}
