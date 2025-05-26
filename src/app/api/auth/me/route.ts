import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  //recupera el token de la cabecera de la petición
  const authHeader = request.headers.get("Authorization");

  if (!authHeader) {
    return NextResponse.json({ error: "No token provided" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 401 });
  }

  //recupera la clave secreta de la variable de entorno
  const secretKey = `${process.env.JWT_SECRET}`

  if (!secretKey) {
    return NextResponse.json(
      { error: "No secret key provided" },
      { status: 500 }
    );
  }

  //verifica si el token es válido
  const decoded = jwt.verify(token as string, secretKey );

  if (!decoded) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  //recupera el id del usuario del token
  const id = (decoded as { id: number }).id;

  if (!id) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  //devuelve el id del usuario
  return NextResponse.json(id);
}
