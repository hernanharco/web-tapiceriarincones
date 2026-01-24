// web-tapiceria/src/app/api/local-session/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { accessToken, refreshToken } = await request.json();

    const response = NextResponse.json({ success: true });

    // 🚨 ESTA ES LA CLAVE: Seteamos la cookie en el dominio de la TAPICERÍA
    response.cookies.set('authToken', accessToken, {
      httpOnly: true, // Seguridad: El JS del navegador no puede leerla
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 semana
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear sesión local' }, { status: 500 });
  }
}