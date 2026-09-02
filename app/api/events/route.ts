import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Event from '@/database/event.model';
import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from 'cloudinary';

// Check if CLOUDINARY_URL is set and log its status
console.log('CLOUDINARY_URL exists:', !!process.env.CLOUDINARY_URL);

// Max image upload size
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

// Type guard for MongoDB duplicate key errors (E11000)
function isDuplicateKeyError(
  error: unknown,
): error is { code: number; keyValue: Record<string, unknown> } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    (error as { code: unknown }).code === 11000
  );
}

export async function POST(req: NextRequest) {
  // Declared here so it's accessible in the catch block for cleanup
  let uploadResult: UploadApiResponse | undefined;

  try {
    await connectDB();
    const formData = await req.formData();
    const event: Record<string, unknown> = Object.fromEntries(
      formData.entries(),
    );

    // Array fields need explicit extraction — formData collapses duplicate keys otherwise
    event.agenda = formData.getAll('agenda');
    event.tags = formData.getAll('tags');

    // Validate image file presence and constraints before uploading
    const file = formData.get('image') as File | null;
    if (!file) {
      return NextResponse.json(
        { message: 'Image file is required' },
        { status: 400 },
      );
    }
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { message: 'File must be an image' },
        { status: 400 },
      );
    }
    if (file.size > MAX_IMAGE_SIZE) {
      return NextResponse.json(
        { message: 'Image exceeds 5MB limit' },
        { status: 400 },
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary via stream
    uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: 'image', folder: 'DevEvent' },
          (
            error: UploadApiErrorResponse | undefined,
            result: UploadApiResponse | undefined,
          ) => {
            if (error) {
              reject(error);
            } else if (result) {
              resolve(result);
            } else {
              reject(new Error('Cloudinary upload returned no result'));
            }
          },
        )
        .end(buffer);
    });

    event.image = uploadResult.secure_url;

    // Create event in the database
    const createdEvent = await Event.create(event);

    return NextResponse.json(
      { message: 'Event Created Successfully', event: createdEvent },
      { status: 201 },
    );
  } catch (error) {
    // Clean up the uploaded image if event creation failed after upload succeeded
    if (uploadResult?.public_id) {
      await cloudinary.uploader.destroy(uploadResult.public_id).catch(() => {});
    }

    if (isDuplicateKeyError(error)) {
      const duplicateField = Object.keys(error.keyValue)[0];
      return NextResponse.json(
        {
          message: 'Event Creation Failed',
          error: `An event with this ${duplicateField} already exists. Please use a different title.`,
        },
        { status: 409 },
      );
    }

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
