import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import pool from '@/lib/db';
import type { RowDataPacket } from 'mysql2';
import sanitizeHtml from 'sanitize-html';
import ReadingProgress from '@/components/ReadingProgress';
import TableOfContents from '@/components/TableOfContents';
import ShareButtons from '@/components/ShareButtons';
import { TableOfContentItem } from '@/types/blog';
import { ArrowLeft, Calendar, Clock, Sparkles } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 0; // Fresh fetch from MySQL on request

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Parses HTML or markdown headings (h2, h3) to auto-generate the Table of Contents
 * and injects corresponding `id` attributes into the HTML.
 */
function processContentWithToc(rawHtml: string): {
  html: string;
  toc: TableOfContentItem[];
} {
  const toc: TableOfContentItem[] = [];

  // If content contains standard HTML headings (from TipTap)
  if (/<h[23][^>]*>/i.test(rawHtml)) {
    let headingCount = 0;
    const transformedHtml = rawHtml.replace(
      /<h([23])([^>]*)>(.*?)<\/h\1>/gi,
      (match, levelStr, existingAttrs, innerText) => {
        headingCount++;
        const level = parseInt(levelStr, 10);
        const plainText = innerText.replace(/<[^>]*>/g, '').trim();
        const id = slugify(plainText) || `section-${headingCount}`;

        toc.push({
          id,
          title: plainText,
          level,
        });

        // Strip existing id if present and inject our sanitized id
        const cleanAttrs = existingAttrs.replace(/\bid="[^"]*"/gi, '').trim();
        return `<h${level} id="${id}" ${cleanAttrs}>${innerText}</h${level}>`;
      }
    );

    return { html: transformedHtml, toc };
  }

  // Fallback for markdown-style ## and ### headings if any legacy post is stored
  const lines = rawHtml.split('\n');
  const processedLines: string[] = [];
  let headingCount = 0;

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('### ')) {
      headingCount++;
      const text = trimmed.replace('### ', '').trim();
      const id = slugify(text) || `section-${headingCount}`;
      toc.push({ id, title: text, level: 3 });
      processedLines.push(`<h3 id="${id}">${text}</h3>`);
    } else if (trimmed.startsWith('## ')) {
      headingCount++;
      const text = trimmed.replace('## ', '').trim();
      const id = slugify(text) || `section-${headingCount}`;
      toc.push({ id, title: text, level: 2 });
      processedLines.push(`<h2 id="${id}">${text}</h2>`);
    } else if (trimmed) {
      processedLines.push(`<p>${trimmed}</p>`);
    }
  });

  return { html: processedLines.join(''), toc };
}

async function getBlogBySlugFromDb(slug: string) {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM `blogs` WHERE slug = ? AND is_published = 1 LIMIT 1',
      [slug]
    );

    if (rows.length === 0) return null;
    return rows[0];
  } catch (error) {
    console.error('Error fetching blog post by slug from MySQL:', error);
    return null;
  }
}

async function getRelatedBlogs(currentSlug: string) {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT id, slug, title, excerpt, cover_image, category, reading_time, published_at
       FROM \`blogs\`
       WHERE slug != ? AND is_published = 1
       ORDER BY published_at DESC LIMIT 2`,
      [currentSlug]
    );
    return rows;
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlugFromDb(slug);

  if (!blog) {
    return {
      title: 'Article Not Found | Inventus Global',
    };
  }

  return {
    title: `${blog.title} | Inventus Global`,
    description: blog.excerpt || blog.title,
    openGraph: {
      title: blog.title,
      description: blog.excerpt || blog.title,
      type: 'article',
      publishedTime: blog.published_at
        ? new Date(blog.published_at).toISOString()
        : undefined,
      authors: [blog.author_name || 'Inventus Team'],
      images: [
        {
          url:
            blog.cover_image ||
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  // Next.js 15: params is a Promise that must be awaited
  const { slug } = await params;
  const blog = await getBlogBySlugFromDb(slug);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = await getRelatedBlogs(slug);

  // Process HTML with table of contents & id attributes
  const { html: processedContent, toc } = processContentWithToc(blog.content || '');

  // Sanitize HTML output for security while allowing rich elements
  const cleanHtml = sanitizeHtml(processedContent, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      'h1',
      'h2',
      'h3',
      'h4',
      'img',
      'code',
      'pre',
      'blockquote',
      'table',
      'thead',
      'tbody',
      'tr',
      'th',
      'td',
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      '*': ['id', 'class', 'style'],
      a: ['href', 'name', 'target', 'rel'],
      img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
    },
  });

  const tagsList: string[] = blog.tags
    ? blog.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
    : [];

  const formattedDate = blog.published_at
    ? new Date(blog.published_at).toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0];

  return (
    <div>
      <ReadingProgress />

      {/* Article Header */}
      <header className="article-header">
        <div className="container">
          <Link href="/blog" className="back-link">
            <ArrowLeft size={15} /> Back to All Guides
          </Link>

          <div>
            <span className="article-category">{blog.category}</span>
            <h1 className="article-title">{blog.title}</h1>
          </div>

          <div className="article-meta-bar">
            {/* Author info */}
            <div className="article-author-info">
              {blog.author_avatar && (
                <Image
                  src={blog.author_avatar}
                  alt={blog.author_name || 'Inventus Team'}
                  width={46}
                  height={46}
                  className="author-avatar-large"
                />
              )}
              <div>
                <div className="author-text-name">{blog.author_name || 'Inventus Team'}</div>
                <div className="author-text-role">{blog.author_role || 'Growth Specialist'}</div>
              </div>
            </div>

            {/* Date & Read time */}
            <div className="article-stats">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <Calendar size={15} />
                {formattedDate}
              </span>
              <span>•</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <Clock size={15} />
                {blog.reading_time || '5 min read'}
              </span>
            </div>
          </div>

          {/* Hero Cover Image */}
          {blog.cover_image && (
            <div className="article-hero-image-wrap">
              <Image
                src={blog.cover_image}
                alt={blog.title}
                width={1200}
                height={600}
                priority
                unoptimized
                className="article-hero-image"
              />
            </div>
          )}
        </div>
      </header>

      {/* Main Article Section with Table of Contents Layout */}
      <div className="container">
        <div className="article-layout">
          {/* Article Main Body (Left side) */}
          <main className="article-main">
            {/* Quick Summary Callout Box */}
            {blog.excerpt && (
              <div
                style={{
                  background: '#fffaf7',
                  border: '1px solid #fed7aa',
                  borderLeft: '4px solid var(--primary)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '20px 24px',
                  marginBottom: '32px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontWeight: 700,
                    color: 'var(--primary)',
                    marginBottom: '6px',
                    fontSize: '0.92rem',
                  }}
                >
                  <Sparkles size={16} />
                  <span>Quick Summary</span>
                </div>
                <p style={{ color: '#374151', fontSize: '1rem', margin: 0, lineHeight: '1.65' }}>
                  {blog.excerpt}
                </p>
              </div>
            )}

            {/* Render TipTap HTML output */}
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: cleanHtml }}
            />

            {/* Tags */}
            {tagsList.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  flexWrap: 'wrap',
                  marginTop: '36px',
                }}
              >
                <span
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                  }}
                >
                  Topics:
                </span>
                {tagsList.map((tag, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: '#f4f4f5',
                      color: '#374151',
                      border: '1px solid #e5e7eb',
                      padding: '3px 10px',
                      borderRadius: 'var(--radius-xs)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Social Share Bar */}
            <ShareButtons title={blog.title} slug={blog.slug} />

            {/* Conversion CTA Block */}
            <div
              style={{
                marginTop: '44px',
                background: '#fafafa',
                border: '1px solid var(--border-light)',
                padding: '32px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <span
                style={{
                  color: 'var(--primary)',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                Inventus Global Marketing
              </span>
              <h3
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  margin: 0,
                  color: 'var(--text-heading)',
                  letterSpacing: '-0.3px',
                }}
              >
                Need Help Implementing These Strategies?
              </h3>
              <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.96rem', lineHeight: '1.6' }}>
                Schedule a complimentary 30-minute growth diagnostic session with our marketing architects.
              </p>
              <div>
                <Link
                  href="/contact"
                  className="btn-primary"
                  style={{ display: 'inline-flex', padding: '10px 22px' }}
                >
                  Book Free Strategy Consultation →
                </Link>
              </div>
            </div>
          </main>

          {/* Right Sidebar: Sticky Table of Contents */}
          <aside className="article-sidebar">
            <div className="sticky-toc-wrapper">
              <TableOfContents items={toc} />
            </div>
          </aside>
        </div>
      </div>

      {/* Related Articles Section */}
      {relatedBlogs.length > 0 && (
        <section
          style={{
            background: '#fafafa',
            borderTop: '1px solid var(--border-hairline)',
            padding: '60px 0',
            marginTop: '80px',
          }}
        >
          <div className="container">
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '24px', color: 'var(--text-heading)' }}>
              Explore Related Publications
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {relatedBlogs.map((related) => (
                <article
                  key={related.id}
                  style={{
                    background: '#ffffff',
                    border: '1px solid var(--border-hairline)',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {related.cover_image && (
                    <Link href={`/blog/${related.slug}`}>
                      <Image
                        src={related.cover_image}
                        alt={related.title}
                        width={400}
                        height={220}
                        style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                      />
                    </Link>
                  )}
                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: 'var(--primary)',
                        textTransform: 'uppercase',
                        marginBottom: '8px',
                      }}
                    >
                      {related.category}
                    </span>
                    <Link href={`/blog/${related.slug}`} style={{ textDecoration: 'none' }}>
                      <h3
                        style={{
                          fontSize: '1.08rem',
                          fontWeight: 700,
                          color: 'var(--text-heading)',
                          margin: '0 0 8px',
                          lineHeight: '1.4',
                        }}
                      >
                        {related.title}
                      </h3>
                    </Link>
                    <p
                      style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.88rem',
                        lineHeight: '1.5',
                        margin: '0 0 14px',
                        flex: 1,
                      }}
                    >
                      {related.excerpt}
                    </p>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {related.reading_time || '5 min read'}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
