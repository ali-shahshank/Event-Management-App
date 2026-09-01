import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Event from '@/database/event.model';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();
    const event: Record<string, unknown> = Object.fromEntries(
      formData.entries(),
    );

    // Array fields need explicit extraction — formData collapses duplicate keys otherwise
    event.agenda = formData.getAll('agenda');
    event.tags = formData.getAll('tags');

    const createdEvent = await Event.create(event);

    return NextResponse.json(
      { message: 'Event Created Successfully', event: createdEvent },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: 'Event Creation Failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
