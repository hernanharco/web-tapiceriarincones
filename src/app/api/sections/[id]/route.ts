export const revalidate = 0; // Deshabilita el cache para esta API

import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Section from '@/lib/models/Section';

// Definimos la interfaz para los parámetros asíncronos de Next.js 15
interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    await connectDB();
    
    // IMPORTANTE: En Next.js 15, params debe ser esperado con await
    const { id } = await params;
    
    const section = await Section.findOne({ 
      identifier: id,
      isActive: true 
    });

    if (!section) {
      return NextResponse.json(
        { error: 'Section not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(section);
  } catch (error) {
    console.error('Error fetching section:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    await connectDB();
    
    // Esperamos los parámetros
    const { id } = await params;
    
    const body = await request.json();
    const { title, subtitle, content, isActive } = body;

    // Actualizamos o creamos (upsert) la sección
    const section = await Section.findOneAndUpdate(
      { identifier: id },
      { 
        title, 
        subtitle, 
        content, 
        isActive: isActive !== undefined ? isActive : true,
        updatedAt: new Date()
      },
      { 
        new: true, 
        upsert: true,
        runValidators: true 
      }
    );

    return NextResponse.json(section);
  } catch (error) {
    console.error('Error updating section:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}