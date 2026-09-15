import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

let mediaTableInitialized = false;

async function ensureMediaTable() {
  if (mediaTableInitialized) return;

  const createTableSql = `
    CREATE TABLE IF NOT EXISTS \`media\` (
      \`id\` VARCHAR(128) PRIMARY KEY,
      \`filename\` VARCHAR(255) NOT NULL,
      \`mime_type\` VARCHAR(100) NOT NULL,
      \`data\` LONGBLOB NOT NULL,
      \`size_bytes\` INT NOT NULL,
      \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      INDEX \`idx_created\` (\`created_at\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  await pool.query(createTableSql);
  mediaTableInitialized = true;
}

export async function POST(request: Request) {
  try {
    const authorized = await isAuthenticated(request);
    if (!authorized) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin authentication required to upload files' },
        { status: 401 }
      );
    }

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

    // Convert file to binary Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Limit maximum upload size to 10MB
    if (buffer.length > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'Image size exceeds maximum limit of 10MB' },
        { status: 400 }
      );
    }

    // Ensure database table exists
    await ensureMediaTable();

    // Generate unique ID and clean filename
    const originalName = file.name || 'image.jpg';
    const cleanName = originalName
      .toLowerCase()
      .replace(/[^a-z0-9._-]/g, '-');
    const mediaId = `${Date.now()}-${cleanName}`;

    // Store binary in Hostinger MySQL
    const insertSql = `
      INSERT INTO \`media\` (\`id\`, \`filename\`, \`mime_type\`, \`data\`, \`size_bytes\`)
      VALUES (?, ?, ?, ?, ?)
    `;

    await pool.execute(insertSql, [
      mediaId,
      originalName,
      mimeType,
      buffer,
      buffer.length,
    ]);

    // Return public access URL served from MySQL
    const publicUrl = `/api/media/${mediaId}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: mediaId,
      size: buffer.length,
    });
  } catch (error: any) {
    console.error('File upload error in /api/upload:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to upload image to database',
      },
      { status: 500 }
    );
  }
}
