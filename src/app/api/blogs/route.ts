import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function calculateReadingTime(htmlContent: string): string {
  const text = htmlContent.replace(/<[^>]*>/g, ' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

// GET all published blogs
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeDrafts = searchParams.get('includeDrafts') === 'true';

    let sql = `
      SELECT 
        id, slug, title, excerpt, cover_image, category, tags,
        author_name, author_role, author_avatar, reading_time,
        is_published, published_at, created_at, updated_at
      FROM \`blogs\`
    `;

    if (!includeDrafts) {
      sql += ` WHERE is_published = 1`;
    }

    sql += ` ORDER BY published_at DESC, created_at DESC`;

    const [rows] = await pool.query<RowDataPacket[]>(sql);

    // Format tags array for consumer convenience
    const blogs = rows.map((row) => ({
      ...row,
      tags: row.tags ? row.tags.split(',').map((t: string) => t.trim()) : [],
    }));

    return NextResponse.json({ success: true, count: blogs.length, blogs });
  } catch (error: any) {
    console.error('MySQL GET /api/blogs error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to retrieve blogs',
        code: error.code || 'DB_ERROR',
      },
      { status: 500 }
    );
  }
}

// POST create a new blog
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      content,
      excerpt,
      coverImage,
      category = 'Digital Marketing',
      tags = 'Marketing, SEO, Growth',
      authorName = 'Inventus Team',
      authorRole = 'Growth Specialist',
      authorAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      isPublished = 1,
    } = body;

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: 'Title and content are required' },
        { status: 400 }
      );
    }

    // Determine slug
    let baseSlug = body.slug ? generateSlug(body.slug) : generateSlug(title);
    if (!baseSlug) baseSlug = `post-${Date.now()}`;

    // Ensure slug uniqueness
    const [existing] = await pool.query<RowDataPacket[]>(
      'SELECT id FROM `blogs` WHERE slug = ? LIMIT 1',
      [baseSlug]
    );

    let finalSlug = baseSlug;
    if (existing.length > 0) {
      finalSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
    }

    // Excerpt calculation if not provided
    const plainText = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const finalExcerpt = excerpt || (plainText.slice(0, 160) + (plainText.length > 160 ? '...' : ''));
    const readingTime = body.readingTime || calculateReadingTime(content);
    const tagsString = Array.isArray(tags) ? tags.join(', ') : tags;

    const insertQuery = `
      INSERT INTO \`blogs\` (
        slug, title, excerpt, content, cover_image, category, tags,
        author_name, author_role, author_avatar, reading_time, is_published
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.execute<ResultSetHeader>(insertQuery, [
      finalSlug,
      title,
      finalExcerpt,
      content,
      coverImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      category,
      tagsString,
      authorName,
      authorRole,
      authorAvatar,
      readingTime,
      isPublished ? 1 : 0,
    ]);

    return NextResponse.json(
      {
        success: true,
        message: 'Blog post created successfully',
        id: result.insertId,
        slug: finalSlug,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('MySQL POST /api/blogs error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to create blog post',
        code: error.code || 'DB_ERROR',
      },
      { status: 500 }
    );
  }
}
