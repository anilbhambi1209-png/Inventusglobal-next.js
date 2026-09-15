import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';
import { isAuthenticated } from '@/lib/auth';

let appTableInitialized = false;

async function ensureApplicationsTable() {
  if (appTableInitialized) return;

  const createAppTableQuery = `
    CREATE TABLE IF NOT EXISTS \`job_applications\` (
      \`id\` INT AUTO_INCREMENT PRIMARY KEY,
      \`job_id\` INT NULL,
      \`role_applied\` VARCHAR(255) NOT NULL,
      \`full_name\` VARCHAR(255) NOT NULL,
      \`email\` VARCHAR(255) NOT NULL,
      \`phone\` VARCHAR(50) NOT NULL,
      \`experience\` VARCHAR(100) NULL,
      \`portfolio\` VARCHAR(500) NULL,
      \`status\` VARCHAR(50) NOT NULL DEFAULT 'new',
      \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      INDEX \`idx_created\` (\`created_at\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;
  await pool.query(createAppTableQuery);
  appTableInitialized = true;
}

// GET all applicant submissions (Admin only)
export async function GET(request: Request) {
  try {
    const authorized = await isAuthenticated(request);
    if (!authorized) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin login required' },
        { status: 401 }
      );
    }

    await ensureApplicationsTable();

    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM `job_applications` ORDER BY created_at DESC'
    );

    return NextResponse.json({
      success: true,
      count: rows.length,
      applications: rows,
    });
  } catch (error: any) {
    console.error('GET /api/applications error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to retrieve applications' },
      { status: 500 }
    );
  }
}

// POST submit a job application (Public candidate submission)
export async function POST(request: Request) {
  try {
    await ensureApplicationsTable();

    const body = await request.json();
    const {
      role_applied,
      full_name,
      email,
      phone,
      experience = 'Fresher',
      portfolio = '',
      job_id = null,
    } = body;

    if (!full_name || !email || !phone || !role_applied) {
      return NextResponse.json(
        { success: false, error: 'Name, email, phone number, and position are required' },
        { status: 400 }
      );
    }

    // Basic email validation
    if (!email.includes('@') || !email.includes('.')) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    const insertSql = `
      INSERT INTO \`job_applications\` (
        job_id, role_applied, full_name, email, phone, experience, portfolio, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 'new')
    `;

    const [result] = await pool.execute<ResultSetHeader>(insertSql, [
      job_id,
      role_applied,
      full_name.trim(),
      email.trim(),
      phone.trim(),
      experience,
      portfolio.trim(),
    ]);

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      id: result.insertId,
    });
  } catch (error: any) {
    console.error('POST /api/applications error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to submit application' },
      { status: 500 }
    );
  }
}
