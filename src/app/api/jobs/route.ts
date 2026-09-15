import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';
import { isAuthenticated } from '@/lib/auth';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

let jobsTableInitialized = false;

async function ensureJobsTable() {
  if (jobsTableInitialized) return;

  const createJobsTableQuery = `
    CREATE TABLE IF NOT EXISTS \`jobs\` (
      \`id\` INT AUTO_INCREMENT PRIMARY KEY,
      \`title\` VARCHAR(255) NOT NULL,
      \`slug\` VARCHAR(255) NOT NULL UNIQUE,
      \`department\` VARCHAR(100) NOT NULL,
      \`type\` VARCHAR(50) NOT NULL DEFAULT 'Full-Time',
      \`location\` VARCHAR(150) NOT NULL DEFAULT 'Vashi, Navi Mumbai (On-Site)',
      \`experience\` VARCHAR(100) NOT NULL,
      \`salary\` VARCHAR(150) NULL,
      \`description\` TEXT NOT NULL,
      \`requirements\` TEXT NOT NULL,
      \`is_active\` TINYINT(1) NOT NULL DEFAULT 1,
      \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      \`updated_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX \`idx_active\` (\`is_active\`, \`created_at\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;
  await pool.query(createJobsTableQuery);
  jobsTableInitialized = true;
}

// GET all active jobs (or all jobs for admin)
export async function GET(request: Request) {
  try {
    await ensureJobsTable();

    const { searchParams } = new URL(request.url);
    const includeInactive = searchParams.get('all') === 'true';

    let sql = 'SELECT * FROM `jobs`';

    if (includeInactive) {
      const authorized = await isAuthenticated(request);
      if (!authorized) {
        sql += ' WHERE is_active = 1';
      }
    } else {
      sql += ' WHERE is_active = 1';
    }

    sql += ' ORDER BY created_at DESC';

    const [rows] = await pool.query<RowDataPacket[]>(sql);

    const jobs = rows.map((row) => ({
      ...row,
      requirements: row.requirements
        ? row.requirements.split('\n').map((r: string) => r.trim()).filter(Boolean)
        : [],
    }));

    return NextResponse.json({ success: true, count: jobs.length, jobs });
  } catch (error: any) {
    console.error('GET /api/jobs error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to retrieve jobs' },
      { status: 500 }
    );
  }
}

// POST create a new job opening (Admin only)
export async function POST(request: Request) {
  try {
    const authorized = await isAuthenticated(request);
    if (!authorized) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin login required' },
        { status: 401 }
      );
    }

    await ensureJobsTable();

    const body = await request.json();
    const {
      title,
      department = 'Paid Media',
      type = 'Full-Time',
      location = 'Vashi, Navi Mumbai (On-Site)',
      experience = '2+ Years Experience',
      salary = 'Competitive',
      description,
      requirements,
      is_active = 1,
    } = body;

    if (!title || !description) {
      return NextResponse.json(
        { success: false, error: 'Job title and description are required' },
        { status: 400 }
      );
    }

    let baseSlug = body.slug ? slugify(body.slug) : slugify(title);
    if (!baseSlug) baseSlug = `job-${Date.now()}`;

    // Ensure slug uniqueness
    const [existing] = await pool.query<RowDataPacket[]>(
      'SELECT id FROM `jobs` WHERE slug = ? LIMIT 1',
      [baseSlug]
    );

    let finalSlug = baseSlug;
    if (existing.length > 0) {
      finalSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
    }

    const reqString = Array.isArray(requirements)
      ? requirements.join('\n')
      : typeof requirements === 'string'
      ? requirements
      : '';

    const insertSql = `
      INSERT INTO \`jobs\` (
        title, slug, department, type, location, experience, salary, description, requirements, is_active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.execute<ResultSetHeader>(insertSql, [
      title,
      finalSlug,
      department,
      type,
      location,
      experience,
      salary,
      description,
      reqString,
      is_active ? 1 : 0,
    ]);

    return NextResponse.json({
      success: true,
      message: 'Job opening created successfully',
      id: result.insertId,
      slug: finalSlug,
    });
  } catch (error: any) {
    console.error('POST /api/jobs error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create job' },
      { status: 500 }
    );
  }
}
