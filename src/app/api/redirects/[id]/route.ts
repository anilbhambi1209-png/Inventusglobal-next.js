import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';
import { isAuthenticated } from '@/lib/auth';

function normalizePath(path: string): string {
  if (!path) return '';
  let cleaned = path.trim().toLowerCase();
  cleaned = cleaned.replace(/^https?:\/\/[^\/]+/i, '');
  if (!cleaned.startsWith('/')) {
    cleaned = '/' + cleaned;
  }
  if (cleaned.length > 1 && cleaned.endsWith('/')) {
    cleaned = cleaned.slice(0, -1);
  }
  return cleaned;
}

// DELETE a redirect
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authorized = await isAuthenticated(request);
    if (!authorized) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin authentication required' },
        { status: 401 }
      );
    }

    const { id } = await params;

    const [result] = await pool.execute<ResultSetHeader>(
      'DELETE FROM `redirects` WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, error: 'Redirect rule not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Redirect rule deleted successfully',
    });
  } catch (error: any) {
    console.error('MySQL DELETE /api/redirects/[id] error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete redirect' },
      { status: 500 }
    );
  }
}

// PUT / PATCH update a redirect
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authorized = await isAuthenticated(request);
    if (!authorized) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin authentication required' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    const [existing] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM `redirects` WHERE id = ? LIMIT 1',
      [id]
    );

    if (existing.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Redirect rule not found' },
        { status: 404 }
      );
    }

    const current = existing[0];
    const source = body.sourceUrl !== undefined ? normalizePath(body.sourceUrl) : current.source_url;
    const dest = body.destinationUrl !== undefined ? normalizePath(body.destinationUrl) : current.destination_url;
    const statusCode = body.statusCode !== undefined ? (Number(body.statusCode) === 302 ? 302 : 301) : current.status_code;
    const description = body.description !== undefined ? body.description : current.description;
    const isActive = body.isActive !== undefined ? (body.isActive ? 1 : 0) : current.is_active;

    if (source === dest) {
      return NextResponse.json(
        { success: false, error: 'Source and Destination cannot be identical.' },
        { status: 400 }
      );
    }

    await pool.execute<ResultSetHeader>(
      `UPDATE \`redirects\` SET source_url = ?, destination_url = ?, status_code = ?, description = ?, is_active = ? WHERE id = ?`,
      [source, dest, statusCode, description, isActive, id]
    );

    return NextResponse.json({
      success: true,
      message: 'Redirect rule updated successfully',
    });
  } catch (error: any) {
    console.error('MySQL PUT /api/redirects/[id] error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update redirect' },
      { status: 500 }
    );
  }
}
