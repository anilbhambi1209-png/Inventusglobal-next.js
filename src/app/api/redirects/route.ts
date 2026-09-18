import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';
import { isAuthenticated } from '@/lib/auth';

function normalizePath(path: string): string {
  if (!path) return '';
  let cleaned = path.trim().toLowerCase();
  // Remove protocol and domain if a full URL was pasted
  cleaned = cleaned.replace(/^https?:\/\/[^\/]+/i, '');
  // Ensure leading slash
  if (!cleaned.startsWith('/')) {
    cleaned = '/' + cleaned;
  }
  // Trim trailing slash for non-root paths so /old-path/ matches /old-path
  if (cleaned.length > 1 && cleaned.endsWith('/')) {
    cleaned = cleaned.slice(0, -1);
  }
  return cleaned;
}

// GET all redirects (with optional search)
export async function GET(request: Request) {
  try {
    const authorized = await isAuthenticated(request);
    if (!authorized) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin authentication required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    let sql = `
      SELECT id, source_url, destination_url, status_code, description, is_active, hits, created_at, updated_at
      FROM \`redirects\`
    `;
    const params: any[] = [];

    if (query) {
      sql += ` WHERE source_url LIKE ? OR destination_url LIKE ? OR description LIKE ?`;
      const pattern = `%${query}%`;
      params.push(pattern, pattern, pattern);
    }

    sql += ` ORDER BY created_at DESC`;

    const [rows] = await pool.query<RowDataPacket[]>(sql, params);

    return NextResponse.json({
      success: true,
      count: rows.length,
      redirects: rows,
    });
  } catch (error: any) {
    console.error('MySQL GET /api/redirects error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch redirects' },
      { status: 500 }
    );
  }
}

// POST create a new redirect
export async function POST(request: Request) {
  try {
    const authorized = await isAuthenticated(request);
    if (!authorized) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { sourceUrl, destinationUrl, statusCode = 301, description } = body;

    if (!sourceUrl || !destinationUrl) {
      return NextResponse.json(
        { success: false, error: 'Source URL and Destination URL are required' },
        { status: 400 }
      );
    }

    const normalizedSource = normalizePath(sourceUrl);
    const normalizedDest = normalizePath(destinationUrl);

    // Prevent direct self-loop
    if (normalizedSource === normalizedDest) {
      return NextResponse.json(
        { success: false, error: 'Source and Destination cannot be identical (prevents infinite redirect loop).' },
        { status: 400 }
      );
    }

    // Check if source_url already exists
    const [existing] = await pool.query<RowDataPacket[]>(
      'SELECT id FROM `redirects` WHERE source_url = ? LIMIT 1',
      [normalizedSource]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, error: `A redirect rule for "${normalizedSource}" already exists. Please edit or delete it instead.` },
        { status: 409 }
      );
    }

    const insertSql = `
      INSERT INTO \`redirects\` (source_url, destination_url, status_code, description, is_active)
      VALUES (?, ?, ?, ?, 1)
    `;

    const [result] = await pool.execute<ResultSetHeader>(insertSql, [
      normalizedSource,
      normalizedDest,
      Number(statusCode) === 302 ? 302 : 301,
      description || null,
    ]);

    return NextResponse.json(
      {
        success: true,
        message: 'Redirect rule created successfully',
        id: result.insertId,
        redirect: {
          id: result.insertId,
          source_url: normalizedSource,
          destination_url: normalizedDest,
          status_code: Number(statusCode) === 302 ? 302 : 301,
          description: description || null,
          is_active: 1,
          hits: 0,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('MySQL POST /api/redirects error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create redirect' },
      { status: 500 }
    );
  }
}
