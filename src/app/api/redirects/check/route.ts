import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const rawPath = searchParams.get('path');

    if (!rawPath) {
      return NextResponse.json({ found: false });
    }

    const path = normalizePath(rawPath);

    // Query active redirects where source_url matches either normalized path or with trailing slash
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT destination_url, status_code, id FROM \`redirects\` 
       WHERE is_active = 1 AND (source_url = ? OR source_url = ?) 
       LIMIT 1`,
      [path, `${path}/`]
    );

    if (rows.length > 0) {
      const match = rows[0];

      // Asynchronously increment hits counter without blocking response
      pool.execute<ResultSetHeader>(
        'UPDATE `redirects` SET hits = hits + 1 WHERE id = ?',
        [match.id]
      ).catch(() => {});

      return NextResponse.json({
        found: true,
        destination: match.destination_url,
        statusCode: match.status_code || 301,
      });
    }

    return NextResponse.json({ found: false });
  } catch (error) {
    console.error('Check redirect query error:', error);
    return NextResponse.json({ found: false });
  }
}
