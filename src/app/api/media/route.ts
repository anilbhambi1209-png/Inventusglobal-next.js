import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';
import { isAuthenticated } from '@/lib/auth';

// GET list of all media items (Admin only)
export async function GET(request: Request) {
  try {
    const authorized = await isAuthenticated(request);
    if (!authorized) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin authentication required' },
        { status: 401 }
      );
    }

    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT id, filename, mime_type, size_bytes, created_at FROM `media` ORDER BY created_at DESC'
    );

    const media = rows.map((r) => ({
      ...r,
      url: `/api/media/${r.id}`,
    }));

    return NextResponse.json({ success: true, count: media.length, media });
  } catch (error: any) {
    console.error('GET /api/media error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to retrieve media items' },
      { status: 500 }
    );
  }
}

// DELETE media item by id from query or body
export async function DELETE(request: Request) {
  try {
    const authorized = await isAuthenticated(request);
    if (!authorized) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin authentication required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    let id = searchParams.get('id');

    if (!id) {
      const body = await request.json().catch(() => ({}));
      id = body.id;
    }

    if (!id) {
      return NextResponse.json({ error: 'Media ID required' }, { status: 400 });
    }

    await pool.execute<ResultSetHeader>(
      'DELETE FROM `media` WHERE id = ?',
      [id]
    );

    return NextResponse.json({
      success: true,
      message: 'Media deleted successfully from MySQL',
    });
  } catch (error: any) {
    console.error('DELETE /api/media error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete media' },
      { status: 500 }
    );
  }
}
