import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

/**
 * POST /api/revalidate
 *
 * Endpoint para revalidación bajo demanda (On-Demand Revalidation).
 * Cuando el admin guarda contenido, llama a esta ruta para que Next.js
 * invalide el caché de la página principal y sirva datos frescos.
 *
 * Uso desde el hook useAdminSections (ya integrado).
 */
export async function POST(request: NextRequest) {
  try {
    // Validación simple: aceptamos requests del mismo origen
    const referer = request.headers.get('referer') || '';
    const host = request.headers.get('host') || '';

    if (!referer.includes(host) && process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Revalidamos la ruta principal
    revalidatePath('/', 'layout');

    return NextResponse.json({
      revalidated: true,
      message: 'Caché invalidado correctamente',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error during revalidation:', error);
    return NextResponse.json(
      { error: 'Error revalidating' },
      { status: 500 },
    );
  }
}
