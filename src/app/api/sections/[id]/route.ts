export const revalidate = 0;

import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Section from '@/lib/models/Section';
import type { SectionIdentifier } from '@/lib/content-types';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(
  _request: NextRequest,
  { params }: RouteParams,
) {
  try {
    await connectDB();

    const { id } = await params;

    const section = await Section.findOne({
      identifier: id as SectionIdentifier,
      isActive: true,
    }).lean();

    if (!section) {
      return NextResponse.json(
        { error: 'Section not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(section);
  } catch (error) {
    console.error('Error fetching section:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: RouteParams,
) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();
    const { title, subtitle, content, isActive } = body;

    const section = await Section.findOneAndUpdate(
      { identifier: id as SectionIdentifier },
      {
        title,
        subtitle,
        content,
        isActive: isActive !== undefined ? isActive : true,
        updatedAt: new Date(),
      },
      { new: true, upsert: true, runValidators: true },
    ).lean();

    return NextResponse.json(section);
  } catch (error) {
    console.error('Error updating section:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
