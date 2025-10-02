import { NextResponse } from 'next/server';
import { mockClients } from '@/data/mockData';

export async function GET() {
  // TODO: Replace with actual database query
  // This could integrate with n8n webhook for real-time client sync
  return NextResponse.json(mockClients);
}

export async function POST(request: Request) {
  try {
    const clientData = await request.json();
    
    // TODO: Validate client data
    // TODO: Save to database
    // TODO: Trigger n8n webhook for client creation
    
    const newClient = {
      id: Date.now().toString(),
      totalVisits: 0,
      ...clientData
    };
    
    return NextResponse.json(newClient, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create client' },
      { status: 500 }
    );
  }
}

