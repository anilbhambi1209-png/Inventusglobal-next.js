import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Validate file type
    const mimeType = file.type;
    if (!mimeType.startsWith('image/')) {
      return NextResponse.json(
        { success: false, error: 'Only image files (JPEG, PNG, WebP, GIF, SVG) are allowed' },
        { status: 400 }
      );
    }

    // Convert file to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Target directory: public/uploads
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

    // Ensure directory exists
    await fs.mkdir(uploadsDir, { recursive: true });

    // Generate unique sanitized filename
    const originalName = file.name || 'image.jpg';
    const extension = path.extname(originalName) || '.jpg';
    const baseName = path
      .basename(originalName, extension)
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '-');
    const uniqueFileName = `${Date.now()}-${baseName}${extension}`;

    const filePath = path.join(uploadsDir, uniqueFileName);

    // Write file to public/uploads
    await fs.writeFile(filePath, buffer);

    // Return public access URL
    const publicUrl = `/uploads/${uniqueFileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: uniqueFileName,
    });
  } catch (error: any) {
    console.error('File upload error in /api/upload:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to upload image',
      },
      { status: 500 }
    );
  }
}
