'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import {
  PlusCircle,
  CheckCircle2,
  Trash2,
  ExternalLink,
  BookOpen,
  Sparkles,
  RefreshCw,
  Edit,
  Upload,
  Loader2,
  ImageIcon,
  LogOut,
} from 'lucide-react';
import styles from './admin.module.css';
import { compressImage } from '@/utils/imageCompressor';

// Dynamic import of RichTextEditor to ensure 100% client-side execution (no SSR / React 19 hydration issues)
const RichTextEditor = dynamic(
  () => import('@/components/editor/RichTextEditor'),
  {
    ssr: false,
    loading: () => (
      <div style={{ padding: '30px', textAlign: 'center', color: '#94a3b8', border: '1px dashed #cbd5e1', borderRadius: '8px' }}>
        Loading Rich Text Editor...
      </div>
    ),
  }
);

interface BlogItem {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  cover_image: string;
  author_name: string;
  reading_time: string;
  is_published: number;
  published_at: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<{
    text: string;
    slug?: string;
  } | null>(null);

  // Form State
  const coverFileInputRef = useRef<HTMLInputElement>(null);
  const [coverUploading, setCoverUploading] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('PPC & Paid Ads');
  const [coverImage, setCoverImage] = useState(
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
  );
  const [excerpt, setExcerpt] = useState('');
  const [authorName, setAuthorName] = useState('Inventus Team');
  const [authorRole, setAuthorRole] = useState('Growth Specialist');
  const [tags, setTags] = useState('Digital Marketing, Growth, SEO');
  const [content, setContent] = useState('');

  const presetImages = [
    {
      label: 'Analytics & Ads',
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    },
    {
      label: 'SEO & Growth',
      url: 'https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?auto=format&fit=crop&w=1200&q=80',
    },
    {
      label: 'Social Media',
      url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80',
    },
    {
      label: 'Web & Tech',
      url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/blogs?includeDrafts=true');
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      const data = await res.json();
      if (data.success) {
        setBlogs(data.blogs || []);
      } else {
        setErrorMessage(data.error || 'Failed to load blogs from MySQL database.');
      }
    } catch (err: any) {
      console.error('Failed to load blogs in admin:', err);
      setErrorMessage('Could not connect to database API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInsertTemplate = () => {
    setContent(
      `<h2>Overview of This Strategy</h2><p>Provide a clear introduction explaining why this marketing strategy matters for modern brands and what key outcomes to expect.</p><h2>Phase 1: Research and High-Intent Targeting</h2><p>Detail the exact tactical steps to capture demand:</p><ul><li>Identify high-converting keyword themes</li><li>Filter negative intent and audience waste</li><li>Establish baseline conversion tracking</li></ul><h2>Phase 2: Execution and Conversion Optimization</h2><p>Explain how to build compelling landing pages and ad copy that convert traffic into qualified inquiries.</p><blockquote>"Great marketing doesn't just drive traffic—it builds an engine of predictable qualified revenue."</blockquote><h2>Summary & Key Takeaways</h2><p>Wrap up the article with practical, actionable advice that readers can implement immediately.</p>`
    );
  };

  const handleCoverFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawFile = e.target.files?.[0];
    if (!rawFile) return;

    try {
      setCoverUploading(true);
      // Auto-compress large images down to web-optimized WebP (~150KB)
      const file = await compressImage(rawFile);
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setCoverImage(data.url);
      } else {
        alert(data.error || 'Failed to upload cover image');
      }
    } catch (err) {
      console.error('Cover upload error:', err);
      alert('Error uploading cover image');
    } finally {
      setCoverUploading(false);
      if (coverFileInputRef.current) {
        coverFileInputRef.current.value = '';
      }
    }
  };

  const resetForm = () => {
    setEditingSlug(null);
    setTitle('');
    setSlug('');
    setExcerpt('');
    setContent('');
    setTags('Digital Marketing, Growth, SEO');
  };

  const handleEditClick = async (blogItem: BlogItem) => {
    setEditingSlug(blogItem.slug);
    setTitle(blogItem.title);
    setSlug(blogItem.slug);
    setCategory(blogItem.category);
    setCoverImage(blogItem.cover_image || presetImages[0].url);
    setAuthorName(blogItem.author_name || 'Inventus Team');
    setExcerpt(blogItem.excerpt || '');

    // Fetch full post to populate TipTap editor
    try {
      const res = await fetch(`/api/blogs/${blogItem.slug}`);
      const data = await res.json();
      if (data.success && data.blog) {
        setContent(data.blog.content || '');
      }
    } catch (err) {
      console.error('Failed to fetch blog content for editing:', err);
    }

    // Scroll to form smoothly
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Please provide both Title and Content for the article.');
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const url = editingSlug ? `/api/blogs/${editingSlug}` : '/api/blogs';
      const method = editingSlug ? 'PUT' : 'POST';

      const payload = {
        title,
        slug: slug.trim() || undefined,
        category,
        coverImage,
        excerpt,
        content,
        tags,
        authorName,
        authorRole,
        isPublished: 1,
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        const postSlug = editingSlug || data.slug;
        setSuccessMessage({
          text: editingSlug
            ? `Post "${title}" updated successfully in Hostinger MySQL!`
            : `Post "${title}" created and published live!`,
          slug: postSlug,
        });

        resetForm();
        await loadBlogs();
      } else {
        setErrorMessage(data.error || 'Failed to save blog post.');
      }
    } catch (err: any) {
      console.error('Publish error:', err);
      setErrorMessage(err.message || 'An unexpected error occurred while saving.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (slugToDelete: string, titleText: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${titleText}" from the database?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/blogs/${slugToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        if (editingSlug === slugToDelete) {
          resetForm();
        }
        await loadBlogs();
      } else {
        alert(data.error || 'Failed to delete post');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Error connecting to delete API');
    }
  };

  return (
    <div className={styles.adminContainer}>
      {/* Header Bar */}
      <div className={styles.adminHeader}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span className={styles.adminBadge}>Hostinger MySQL Live</span>
            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
              Database: {process.env.NEXT_PUBLIC_DB_NAME || 'Connected'}
            </span>
          </div>
          <h1 className={styles.title}>Blog Admin Dashboard</h1>
          <p className={styles.subtitle}>
            Compose, format with TipTap WYSIWYG, and publish directly to Hostinger MySQL.
          </p>
        </div>

        <div className={styles.headerActions}>
          <button onClick={loadBlogs} className={styles.btnOutline} title="Refresh posts">
            <RefreshCw size={15} /> Refresh
          </button>
          <Link href="/blog" className={styles.btnOutline} target="_blank">
            <BookOpen size={16} /> Live Blog
          </Link>
          <button
            onClick={async () => {
              if (confirm('Are you sure you want to log out?')) {
                setLoggingOut(true);
                try {
                  await fetch('/api/auth/logout', { method: 'POST' });
                  router.push('/admin/login');
                  router.refresh();
                } catch {
                  router.push('/admin/login');
                } finally {
                  setLoggingOut(false);
                }
              }
            }}
            disabled={loggingOut}
            className={styles.btnOutline}
            style={{ color: '#ef4444', borderColor: '#fca5a5' }}
            title="Log out of admin session"
          >
            <LogOut size={15} /> {loggingOut ? 'Signing out...' : 'Sign Out'}
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className={styles.alertError}>
          <span>⚠️ {errorMessage}</span>
        </div>
      )}

      {/* Success Notification */}
      {successMessage && (
        <div className={styles.alertSuccess}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <CheckCircle2 size={24} />
            <div>
              <div style={{ fontWeight: 700 }}>{successMessage.text}</div>
              <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>
                Article HTML was stored in MySQL LONGTEXT and is live.
              </div>
            </div>
          </div>
          {successMessage.slug && (
            <Link
              href={`/blog/${successMessage.slug}`}
              className={styles.btnPrimary}
              style={{ background: '#059669', padding: '8px 16px', fontSize: '0.85rem' }}
              target="_blank"
            >
              View Post Now <ExternalLink size={14} />
            </Link>
          )}
        </div>
      )}

      {/* Form Card */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>
            <PlusCircle size={22} style={{ color: '#f16334' }} />
            {editingSlug ? `Edit Article: "${title}"` : 'Create New Blog Article'}
          </h2>

          <div style={{ display: 'flex', gap: '10px' }}>
            {editingSlug && (
              <button
                type="button"
                onClick={resetForm}
                className={styles.btnOutline}
                style={{ fontSize: '0.8rem', padding: '6px 12px' }}
              >
                Cancel Edit
              </button>
            )}
            <button
              type="button"
              onClick={handleInsertTemplate}
              className={styles.btnOutline}
              style={{ fontSize: '0.8rem', padding: '6px 12px' }}
            >
              <Sparkles size={14} /> Insert Headings Template
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Article Title *</label>
            <input
              type="text"
              placeholder="e.g. 7 High-Impact Google Ads Strategies for Navi Mumbai Businesses"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.formInput}
              required
            />
          </div>

          <div className={styles.formGrid}>
            {/* Slug */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Custom URL Slug{' '}
                <span style={{ fontWeight: 400, color: '#94a3b8' }}>(Leave empty to auto-generate)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. google-ads-strategies-navi-mumbai"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className={styles.formInput}
              />
            </div>

            {/* Category */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={styles.formSelect}
              >
                <option value="PPC & Paid Ads">PPC & Paid Ads</option>
                <option value="SEO & Organic">SEO & Organic</option>
                <option value="Social Media">Social Media</option>
                <option value="Web & Development">Web & Development</option>
                <option value="Digital Strategy">Digital Strategy</option>
              </select>
            </div>
          </div>

          {/* Cover Image File Upload */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Cover Image</label>
            <input
              type="file"
              ref={coverFileInputRef}
              onChange={handleCoverFileUpload}
              accept="image/*"
              style={{ display: 'none' }}
            />

            <div className={styles.uploadContainer}>
              <div className={styles.uploadRow}>
                <button
                  type="button"
                  onClick={() => coverFileInputRef.current?.click()}
                  disabled={coverUploading}
                  className={styles.uploadBtn}
                >
                  {coverUploading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Uploading Image...
                    </>
                  ) : (
                    <>
                      <Upload size={16} /> Upload Cover Image from Computer
                    </>
                  )}
                </button>
                <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                  Current URL: <code style={{ color: '#0f172a' }}>{coverImage}</code>
                </span>
              </div>

              {coverImage && (
                <div className={styles.coverPreview}>
                  <Image
                    src={coverImage}
                    alt="Cover Preview"
                    fill
                    sizes="(max-width: 768px) 100vw, 480px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}

              <div className={styles.presetsGrid}>
                <span style={{ fontSize: '0.78rem', color: '#94a3b8', alignSelf: 'center', marginRight: '4px' }}>
                  Or pick preset:
                </span>
                {presetImages.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => setCoverImage(p.url)}
                    className={`${styles.presetBtn} ${coverImage === p.url ? styles.presetActive : ''}`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Short Excerpt */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Article Excerpt{' '}
              <span style={{ fontWeight: 400, color: '#94a3b8' }}>(Optional short preview summary)</span>
            </label>
            <textarea
              rows={2}
              placeholder="Brief 1-2 sentence preview for cards and search results..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className={styles.formTextarea}
            />
          </div>

          <div className={styles.formGrid}>
            {/* Author */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Author Name</label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className={styles.formInput}
              />
            </div>

            {/* Tags */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Tags (comma-separated)</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className={styles.formInput}
              />
            </div>
          </div>

          {/* TipTap Rich Text Editor */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Article Content (WYSIWYG Editor) *
            </label>
            <RichTextEditor
              content={content}
              onChange={(newHtml) => setContent(newHtml)}
              placeholder="Write or paste your article here. Use H2/H3 for table of contents, bold/italic, lists, links, and inline images..."
            />
          </div>

          {/* Submit */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
            {editingSlug && (
              <button
                type="button"
                onClick={resetForm}
                className={styles.btnOutline}
                style={{ padding: '12px 24px' }}
              >
                Discard Changes
              </button>
            )}
            <button
              type="submit"
              disabled={submitting}
              className={styles.btnPrimary}
              style={{ padding: '12px 32px', fontSize: '1rem' }}
            >
              {submitting
                ? 'Saving to MySQL...'
                : editingSlug
                ? 'Update Post in MySQL'
                : 'Publish Post to Hostinger MySQL'}
            </button>
          </div>
        </form>
      </div>

      {/* Existing Blogs List */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h2 className={styles.cardTitle}>Articles in Hostinger Database</h2>
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '4px' }}>
              Fetched live from MySQL `blogs` table ({blogs.length} articles)
            </p>
          </div>
        </div>

        {loading ? (
          <p style={{ color: '#94a3b8', padding: '20px 0' }}>Fetching articles from MySQL...</p>
        ) : blogs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#64748b' }}>
            <p style={{ fontWeight: 600, fontSize: '1.05rem', marginBottom: '8px' }}>
              No articles found in Hostinger MySQL yet!
            </p>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
              Use the form above to compose and publish your first article.
            </p>
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Published</th>
                  <th>Reading Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((b) => (
                  <tr key={b.id || b.slug}>
                    <td>
                      <div style={{ fontWeight: 600, color: '#0f172a' }}>{b.title}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>/blog/{b.slug}</div>
                    </td>
                    <td>
                      <span className={styles.categoryTag}>{b.category}</span>
                    </td>
                    <td>{b.published_at ? new Date(b.published_at).toLocaleDateString() : 'Draft'}</td>
                    <td>{b.reading_time || '5 min read'}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          onClick={() => handleEditClick(b)}
                          className={styles.btnOutline}
                          style={{ padding: '5px 10px', fontSize: '0.75rem' }}
                          title="Edit Post"
                        >
                          <Edit size={13} /> Edit
                        </button>
                        <Link
                          href={`/blog/${b.slug}`}
                          className={styles.btnOutline}
                          style={{ padding: '5px 10px', fontSize: '0.75rem' }}
                          target="_blank"
                          title="Open Live Post"
                        >
                          <ExternalLink size={13} /> View
                        </Link>
                        <button
                          onClick={() => handleDelete(b.slug, b.title)}
                          className={styles.actionBtnDanger}
                          title="Delete from MySQL"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
