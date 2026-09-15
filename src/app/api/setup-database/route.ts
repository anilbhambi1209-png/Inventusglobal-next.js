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
