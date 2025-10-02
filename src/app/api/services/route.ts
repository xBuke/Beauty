import { NextResponse } from 'next/server';
import { mockServices } from '@/data/mockData';

export async function GET() {
  return NextResponse.json(mockServices);
}

