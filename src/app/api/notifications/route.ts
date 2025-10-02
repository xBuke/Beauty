import { NextResponse } from 'next/server';
import { mockNotifications } from '@/data/mockData';

export async function GET() {
  return NextResponse.json(mockNotifications);
}

export async function PATCH(request: Request) {
  try {
    const { id, isRead } = await request.json();
    
    // TODO: Update notification read status in database
    
    return NextResponse.json({ id, isRead });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update notification' },
      { status: 500 }
    );
  }
}

