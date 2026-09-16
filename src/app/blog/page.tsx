import type { Metadata } from 'next';
import pool from '@/lib/db';
import type { RowDataPacket } from 'mysql2';
import BlogListing from '@/components/BlogListing';
import { BlogPost } from '@/types/blog';

import { getAllBlogs } from '@/utils/blogStore';

export const metadata: Metadata = {
  title: 'Marketing Insights & Playbooks | Inventus Global',
  description:
    'Step-by-step performance marketing blueprints, search engine optimization frameworks, and paid advertising analysis from Inventus Global.',
};

export const revalidate = 1800; // 30-minute ISR edge caching for high performance

async function getPublishedBlogs(): Promise<BlogPost[]> {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT 
        id, slug, title, excerpt, content, cover_image, category, tags,
        author_name, author_role, author_avatar, reading_time,
        published_at
       FROM \`blogs\`
       WHERE is_published = 1
       ORDER BY published_at DESC, created_at DESC`
    );

    if (rows && rows.length > 0) {
      return rows.map((row) => ({
        id: String(row.id),
        slug: row.slug,
        title: row.title,
        excerpt: row.excerpt || '',
        content: row.content || '',
        coverImage:
          row.cover_image ||
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
        category: row.category || 'Digital Marketing',
        tags: row.tags ? row.tags.split(',').map((t: string) => t.trim()) : [],
        author: {
          name: row.author_name || 'Inventus Team',
          role: row.author_role || 'Growth Specialist',
          avatar:
            row.author_avatar ||
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        },
        readingTime: row.reading_time || '5 min read',
        publishedAt: row.published_at
          ? new Date(row.published_at).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
      }));
    }
  } catch (error) {
    console.error('Failed to load blogs from MySQL in /blog page, using static store fallback:', error);
  }

  // Graceful fallback to static blogs so visitors never see a blank page
  return getAllBlogs();
}

export default async function BlogPage() {
  const blogs = await getPublishedBlogs();

  return (
    <div>
      {/* Blog Page Hero Header */}
      <section
        style={{
          padding: '64px 0 36px',
          borderBottom: '1px solid var(--border-hairline)',
          background: '#ffffff',
        }}
      >
        <div className="container">
          <div style={{ marginBottom: '28px' }}>
            <span className="section-tag">Marketing Publications</span>
            <h1 className="section-title blog-page-title">
              The Inventus Global <span style={{ color: 'var(--primary)' }}>Journal</span>
            </h1>
            <p className="section-desc" style={{ maxWidth: '600px' }}>
              Step-by-step performance marketing blueprints, search engine optimization frameworks, and paid advertising analysis.
            </p>
          </div>

          <BlogListing initialBlogs={blogs} />
        </div>
      </section>
    </div>
  );
}
