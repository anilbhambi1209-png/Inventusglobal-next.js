import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const authorized = await isAuthenticated(request);
    if (!authorized) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin authentication required to setup database.' },
        { status: 401 }
      );
    }

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS \`blogs\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`slug\` VARCHAR(255) NOT NULL UNIQUE,
        \`title\` VARCHAR(255) NOT NULL,
        \`excerpt\` TEXT NULL,
        \`content\` LONGTEXT NOT NULL,
        \`cover_image\` VARCHAR(1024) NULL,
        \`category\` VARCHAR(100) NOT NULL DEFAULT 'Digital Marketing',
        \`tags\` VARCHAR(255) NULL DEFAULT 'Marketing, SEO, Growth',
        \`author_name\` VARCHAR(100) NOT NULL DEFAULT 'Inventus Team',
        \`author_role\` VARCHAR(100) NOT NULL DEFAULT 'Growth Specialist',
        \`author_avatar\` VARCHAR(1024) NULL,
        \`reading_time\` VARCHAR(50) NULL DEFAULT '5 min read',
        \`is_published\` TINYINT(1) NOT NULL DEFAULT 1,
        \`published_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX \`idx_slug\` (\`slug\`),
        INDEX \`idx_published\` (\`is_published\`, \`published_at\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;

    // Execute blogs table creation
    await pool.query(createTableQuery);

    const createMediaTableQuery = `
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

    // Execute media table creation
    await pool.query(createMediaTableQuery);

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

    const createLeadsTableQuery = `
      CREATE TABLE IF NOT EXISTS \`leads\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`type\` VARCHAR(50) NOT NULL DEFAULT 'contact',
        \`name\` VARCHAR(255) NULL,
        \`email\` VARCHAR(255) NOT NULL,
        \`phone\` VARCHAR(50) NULL,
        \`service\` VARCHAR(255) NULL,
        \`message\` TEXT NULL,
        \`page_url\` VARCHAR(512) NULL,
        \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        INDEX \`idx_type\` (\`type\`),
        INDEX \`idx_created\` (\`created_at\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    await pool.query(createLeadsTableQuery);

    // Verify table structure
    const [columns] = await pool.query('DESCRIBE `blogs`');

    return NextResponse.json({
      success: true,
      message: 'Table `blogs` successfully initialized in Hostinger MySQL!',
      table: 'blogs',
      columns: columns,
    });
  } catch (error: any) {
    console.error('Database migration error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create blogs table.',
        error: error.message || 'Unknown database error',
        code: error.code || 'UNKNOWN_ERROR',
        hint:
          error.code === 'ETIMEDOUT' || error.code === 'ECONNREFUSED'
            ? 'If connecting locally to Hostinger, ensure your IP address is whitelisted under Hostinger hPanel -> Databases -> Remote MySQL.'
            : undefined,
      },
      { status: 500 }
    );
  }
}
