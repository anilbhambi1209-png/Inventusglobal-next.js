import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import type { ResultSetHeader } from 'mysql2';
import { isAuthenticated } from '@/lib/auth';

// PATCH update application status
export async function PATCH(
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
    const { status } = body;

    if (!['new', 'reviewing', 'contacted', 'rejected'].includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status value' },
        { status: 400 }
      );
    }

    await pool.execute<ResultSetHeader>(
      'UPDATE `job_applications` SET status = ? WHERE id = ?',
      [status, id]
    );

    return NextResponse.json({ success: true, message: 'Status updated' });
  } catch (error: any) {
    console.error('PATCH /api/applications/[id] error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update application' },
      { status: 500 }
    );
  }
}

// DELETE application
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

    await pool.execute<ResultSetHeader>(
      'DELETE FROM `job_applications` WHERE id = ?',
      [id]
    );

    return NextResponse.json({
      success: true,
      message: 'Application deleted successfully',
    });
  } catch (error: any) {
    console.error('DELETE /api/applications/[id] error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete application' },
      { status: 500 }
    );
  }
}
