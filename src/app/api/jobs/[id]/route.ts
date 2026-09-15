import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';
import { isAuthenticated } from '@/lib/auth';

// PUT update job
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
      'SELECT id FROM `jobs` WHERE id = ? LIMIT 1',
      [id]
    );

    if (existing.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Job opening not found' },
        { status: 404 }
      );
    }

    const updates: string[] = [];
    const values: any[] = [];

    const allowedFields = [
      'title',
      'department',
      'type',
      'location',
      'experience',
      'salary',
      'description',
      'is_active',
    ];

    allowedFields.forEach((field) => {
      if (body[field] !== undefined) {
        updates.push(`\`${field}\` = ?`);
        if (field === 'is_active') {
          values.push(body[field] ? 1 : 0);
        } else {
          values.push(body[field]);
        }
      }
    });

    if (body.requirements !== undefined) {
      updates.push('`requirements` = ?');
      values.push(
        Array.isArray(body.requirements)
          ? body.requirements.join('\n')
          : String(body.requirements)
      );
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No fields provided to update' },
        { status: 400 }
      );
    }

    values.push(id);
    const updateSql = `UPDATE \`jobs\` SET ${updates.join(', ')} WHERE id = ?`;

    await pool.execute<ResultSetHeader>(updateSql, values);

    return NextResponse.json({
      success: true,
      message: 'Job opening updated successfully',
    });
  } catch (error: any) {
    console.error('PUT /api/jobs/[id] error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update job' },
      { status: 500 }
    );
  }
}

// DELETE job
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
      'DELETE FROM `jobs` WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, error: 'Job opening not found or already deleted' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Job opening deleted successfully',
    });
  } catch (error: any) {
    console.error('DELETE /api/jobs/[id] error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete job' },
      { status: 500 }
    );
  }
}
