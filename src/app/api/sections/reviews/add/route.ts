export const revalidate = 0;

import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Section from '@/lib/models/Section';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const newReview = await request.json();

    // 1. Intentamos actualizar con $push
    // upsert: true es la clave aquí. Si no existe el documento 'reviews', 
    // intentará crearlo, pero el $push en un documento nuevo puede ser problemático 
    // con Schemas complejos, así que usamos una lógica más segura:

    const result = await Section.findOneAndUpdate(
      { identifier: 'reviews' },
      { 
        $push: { "content.reviews": newReview } as any,
        $setOnInsert: { 
          isActive: true,
          title: "Reseñas", // Campos fuera de 'content' si los usas
          "content.title": "Lo que Opinan Nuestros Clientes" 
        }
      },
      { 
        new: true, 
        upsert: true, 
        runValidators: true 
      }
    );

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error('Error al guardar reseña en MongoDB:', error);
    return NextResponse.json(
      { error: 'Error interno al procesar la reseña', details: error.message }, 
      { status: 500 }
    );
  }
}