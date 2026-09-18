import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';
import { isAuthenticated } from '@/lib/auth';

function calculateReadingTime(htmlContent: string): string {
  const text = htmlContent.replace(/<[^>]*>/g, ' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

// GET single blog by slug
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM `blogs` WHERE slug = ? LIMIT 1',
      [slug]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    const blog = rows[0];
    const formattedBlog = {
      ...blog,
      tags: blog.tags ? blog.tags.split(',').map((t: string) => t.trim()) : [],
    };

    return NextResponse.json({ success: true, blog: formattedBlog });
  } catch (error: any) {
    console.error('MySQL GET /api/blogs/[slug] error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error retrieving blog',
        code: error.code || 'DB_ERROR',
      },
      { status: 500 }
    );
  }
}

// PUT update existing blog
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const authorized = await isAuthenticated(request);
    if (!authorized) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin authentication required' },
        { status: 401 }
      );
    }

    const { slug } = await params;
    const body = await request.json();

    const {
      title,
      content,
      excerpt,
      coverImage,
      category,
      tags,
      authorName,
      authorRole,
      authorAvatar,
      isPublished,
    } = body;

    // Verify existing record
    const [existing] = await pool.query<RowDataPacket[]>(
      'SELECT id FROM `blogs` WHERE slug = ? LIMIT 1',
      [slug]
    );

    if (existing.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }

    const updates: string[] = [];
    const values: any[] = [];

    if (title !== undefined) {
      updates.push('title = ?');
      values.push(title);
    }
    if (content !== undefined) {
      updates.push('content = ?');
      values.push(content);

      if (!body.readingTime) {
        updates.push('reading_time = ?');
        values.push(calculateReadingTime(content));
      }
    }
    if (body.readingTime !== undefined) {
      updates.push('reading_time = ?');
      values.push(body.readingTime);
    }
    if (excerpt !== undefined) {
      updates.push('excerpt = ?');
      values.push(excerpt);
    }
    if (coverImage !== undefined) {
      updates.push('cover_image = ?');
      values.push(coverImage);
    }
    if (category !== undefined) {
      updates.push('category = ?');
      values.push(category);
    }
    if (tags !== undefined) {
      updates.push('tags = ?');
      values.push(Array.isArray(tags) ? tags.join(', ') : tags);
    }
    if (authorName !== undefined) {
      updates.push('author_name = ?');
      values.push(authorName);
    }
    if (authorRole !== undefined) {
      updates.push('author_role = ?');
      values.push(authorRole);
    }
    if (authorAvatar !== undefined) {
      updates.push('author_avatar = ?');
      values.push(authorAvatar);
    }
    if (isPublished !== undefined) {
      updates.push('is_published = ?');
      values.push(isPublished ? 1 : 0);
    }
    if (body.metaTitle !== undefined) {
      updates.push('meta_title = ?');
      values.push(body.metaTitle || null);
    }
    if (body.metaDescription !== undefined) {
      updates.push('meta_description = ?');
      values.push(body.metaDescription || null);
    }
    if (body.canonicalUrl !== undefined) {
      updates.push('canonical_url = ?');
      values.push(body.canonicalUrl || null);
    }
    if (body.focusKeywords !== undefined) {
      updates.push('focus_keywords = ?');
      values.push(body.focusKeywords || null);
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No fields provided for update' },
        { status: 400 }
      );
    }

    values.push(slug);
    const updateSql = `UPDATE \`blogs\` SET ${updates.join(', ')} WHERE slug = ?`;

    await pool.execute<ResultSetHeader>(updateSql, values);

    return NextResponse.json({
      success: true,
      message: 'Blog updated successfully',
      slug,
    });
  } catch (error: any) {
    console.error('MySQL PUT /api/blogs/[slug] error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to update blog',
        code: error.code || 'DB_ERROR',
      },
      { status: 500 }
    );
  }
}

// DELETE a blog
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const authorized = await isAuthenticated(request);
    if (!authorized) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin authentication required' },
        { status: 401 }
      );
    }

    const { slug } = await params;

    const [result] = await pool.execute<ResultSetHeader>(
      'DELETE FROM \`blogs\` WHERE slug = ?',
      [slug]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found or already deleted' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully from MySQL',
    });
  } catch (error: any) {
    console.error('MySQL DELETE /api/blogs/[slug] error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to delete blog',
        code: error.code || 'DB_ERROR',
      },
      { status: 500 }
    );
  }
}
