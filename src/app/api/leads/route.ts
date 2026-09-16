import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import fs from 'fs';
import path from 'path';

let leadsTableInitialized = false;

async function ensureLeadsTable() {
  if (leadsTableInitialized) return;

  const createTableSql = `
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

  await pool.query(createTableSql);
  leadsTableInitialized = true;
}

function saveLeadToBackup(leadData: Record<string, any>) {
  try {
    const backupDir = path.join(process.cwd(), 'src', 'data');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    const backupFile = path.join(backupDir, 'leads-backup.jsonl');
    const entry = JSON.stringify({ ...leadData, recorded_at: new Date().toISOString() }) + '\n';
    fs.appendFileSync(backupFile, entry, 'utf8');
  } catch (err) {
    console.error('Failed to append lead to backup file:', err);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { name, email, phone, service, message, type = 'contact', page_url } = body;

    // Email validation
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    const cleanLead = {
      type: String(type || 'contact').slice(0, 50),
      name: name ? String(name).slice(0, 255) : null,
      email: String(email).trim().toLowerCase().slice(0, 255),
      phone: phone ? String(phone).slice(0, 50) : null,
      service: service ? String(service).slice(0, 255) : null,
      message: message ? String(message).slice(0, 5000) : null,
      page_url: page_url ? String(page_url).slice(0, 512) : null,
    };

    // Attempt to persist to MySQL
    let dbSaved = false;
    try {
      await ensureLeadsTable();
      await pool.execute(
        `INSERT INTO \`leads\` (\`type\`, \`name\`, \`email\`, \`phone\`, \`service\`, \`message\`, \`page_url\`)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          cleanLead.type,
          cleanLead.name,
          cleanLead.email,
          cleanLead.phone,
          cleanLead.service,
          cleanLead.message,
          cleanLead.page_url,
        ]
      );
      dbSaved = true;
    } catch (dbError) {
      console.error('Failed to save lead in MySQL, writing to persistent backup:', dbError);
    }

    // Always record to persistent backup file to guarantee zero data loss
    saveLeadToBackup({ ...cleanLead, db_saved: dbSaved });

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your inquiry has been received. Our team will get in touch shortly.',
    });
  } catch (error: any) {
    console.error('Error processing lead submission:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred. Please try again or reach us on WhatsApp.' },
      { status: 500 }
    );
  }
}
