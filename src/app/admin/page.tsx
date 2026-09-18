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
  Briefcase,
  Users,
  FileText,
  Eye,
  Check,
  X,
  Copy,
  Mail,
  Phone,
  Clock,
  Layers,
  Globe,
  ArrowRightLeft,
  Link2,
} from 'lucide-react';
import styles from './admin.module.css';
import { compressImage } from '@/utils/imageCompressor';
import { JobPosition, JobApplication } from '@/types/career';

// Dynamic import of RichTextEditor to ensure 100% client-side execution
const RichTextEditor = dynamic(
  () => import('@/components/editor/RichTextEditor'),
  {
    ssr: false,
    loading: () => (
      <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', border: '1px dashed #cbd5e1', borderRadius: '10px' }}>
        Loading Rich Text Studio...
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
  meta_title?: string;
  meta_description?: string;
  canonical_url?: string;
  focus_keywords?: string;
  is_published: number;
  published_at: string;
}

interface RedirectItem {
  id: number;
  source_url: string;
  destination_url: string;
  status_code: number;
  description?: string;
  is_active: number;
  hits: number;
  created_at: string;
}

interface MediaItem {
  id: string;
  filename: string;
  mime_type: string;
  size_bytes: number;
  created_at: string;
  url: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'articles' | 'careers' | 'applications' | 'media' | 'redirects'>('articles');
  const [loggingOut, setLoggingOut] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // ----------------------------------------------------
  // Blog Articles Studio State
  // ----------------------------------------------------
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [submittingBlog, setSubmittingBlog] = useState(false);
  const [blogSearchQuery, setBlogSearchQuery] = useState('');

  const coverFileInputRef = useRef<HTMLInputElement>(null);
  const [coverUploading, setCoverUploading] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('PPC & Paid Ads');
  const [coverImage, setCoverImage] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [authorName, setAuthorName] = useState('Inventus Team');
  const [authorRole, setAuthorRole] = useState('Growth Specialist');
  const [tags, setTags] = useState('Digital Marketing, Growth, SEO');
  const [content, setContent] = useState('');
  const [isPublished, setIsPublished] = useState(true);

  // SEO Fields State
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('');
  const [focusKeywords, setFocusKeywords] = useState('');

  // ----------------------------------------------------
  // 301 / 302 Redirects Manager State
  // ----------------------------------------------------
  const [redirects, setRedirects] = useState<RedirectItem[]>([]);
  const [loadingRedirects, setLoadingRedirects] = useState(false);
  const [redirectSearch, setRedirectSearch] = useState('');
  const [submittingRedirect, setSubmittingRedirect] = useState(false);
  const [redirectModalOpen, setRedirectModalOpen] = useState(false);
  const [editingRedirectId, setEditingRedirectId] = useState<number | null>(null);
  const [sourceUrl, setSourceUrl] = useState('');
  const [destinationUrl, setDestinationUrl] = useState('');
  const [statusCode, setStatusCode] = useState<number>(301);
  const [redirectDescription, setRedirectDescription] = useState('');

  // ----------------------------------------------------
  // Careers & Job Openings State
  // ----------------------------------------------------
  const [jobs, setJobs] = useState<JobPosition[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [editingJobId, setEditingJobId] = useState<number | string | null>(null);
  const [submittingJob, setSubmittingJob] = useState(false);

  const [jobTitle, setJobTitle] = useState('');
  const [jobDepartment, setJobDepartment] = useState('Paid Media');
  const [jobType, setJobType] = useState('Full-Time');
  const [jobLocation, setJobLocation] = useState('Vashi, Navi Mumbai (On-Site)');
  const [jobExperience, setJobExperience] = useState('2+ Years Experience');
  const [jobSalary, setJobSalary] = useState('Competitive + Performance Bonus');
  const [jobDescription, setJobDescription] = useState('');
  const [jobRequirements, setJobRequirements] = useState('');
  const [jobIsActive, setJobIsActive] = useState(true);

  // ----------------------------------------------------
  // Candidate Applications State
  // ----------------------------------------------------
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loadingApps, setLoadingApps] = useState(false);

  // ----------------------------------------------------
  // Media Gallery State
  // ----------------------------------------------------
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [copiedMediaId, setCopiedMediaId] = useState<string | null>(null);
  const galleryUploadRef = useRef<HTMLInputElement>(null);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  // ====================================================
  // Data Loaders
  // ====================================================
  const loadBlogs = async () => {
    try {
      setLoadingBlogs(true);
      const res = await fetch('/api/blogs?includeDrafts=true');
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      const data = await res.json();
      if (data.success) {
        setBlogs(data.blogs || []);
      }
    } catch (err) {
      console.error('Failed to load blogs:', err);
    } finally {
      setLoadingBlogs(false);
    }
  };

  const loadJobs = async () => {
    try {
      setLoadingJobs(true);
      const res = await fetch('/api/jobs?all=true');
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      const data = await res.json();
      if (data.success) {
        setJobs(data.jobs || []);
      }
    } catch (err) {
      console.error('Failed to load jobs:', err);
    } finally {
      setLoadingJobs(false);
    }
  };

  const loadApplications = async () => {
    try {
      setLoadingApps(true);
      const res = await fetch('/api/applications');
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      const data = await res.json();
      if (data.success) {
        setApplications(data.applications || []);
      }
    } catch (err) {
      console.error('Failed to load applications:', err);
    } finally {
      setLoadingApps(false);
    }
  };

  const loadMedia = async () => {
    try {
      setLoadingMedia(true);
      const res = await fetch('/api/media');
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      const data = await res.json();
      if (data.success) {
        setMediaList(data.media || []);
      }
    } catch (err) {
      console.error('Failed to load media items:', err);
    } finally {
      setLoadingMedia(false);
    }
  };

  useEffect(() => {
    loadBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When tab changes, load respective data
  useEffect(() => {
    if (activeTab === 'careers') loadJobs();
    if (activeTab === 'applications') loadApplications();
    if (activeTab === 'media') loadMedia();
    if (activeTab === 'redirects') loadRedirects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // ====================================================
  // 301 / 302 Redirect Handlers
  // ====================================================
  const loadRedirects = async () => {
    try {
      setLoadingRedirects(true);
      const res = await fetch('/api/redirects');
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      const data = await res.json();
      if (data.success) {
        setRedirects(data.redirects || []);
      }
    } catch (err) {
      console.error('Failed to load redirects:', err);
    } finally {
      setLoadingRedirects(false);
    }
  };

  const handleOpenNewRedirect = () => {
    setEditingRedirectId(null);
    setSourceUrl('');
    setDestinationUrl('');
    setStatusCode(301);
    setRedirectDescription('');
    setRedirectModalOpen(true);
  };

  const handleEditRedirectClick = (r: RedirectItem) => {
    setEditingRedirectId(r.id);
    setSourceUrl(r.source_url);
    setDestinationUrl(r.destination_url);
    setStatusCode(r.status_code || 301);
    setRedirectDescription(r.description || '');
    setRedirectModalOpen(true);
  };

  const handleDeleteRedirect = async (id: number) => {
    if (!confirm('Are you sure you want to delete this redirect rule?')) return;
    try {
      const res = await fetch(`/api/redirects/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setSuccessMessage('Redirect rule removed successfully');
        await loadRedirects();
      } else {
        alert(data.error || 'Failed to delete redirect rule');
      }
    } catch (err) {
      console.error('Delete redirect error:', err);
    }
  };

  const handleToggleRedirectActive = async (r: RedirectItem) => {
    try {
      const res = await fetch(`/api/redirects/${r.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !r.is_active }),
      });
      const data = await res.json();
      if (data.success) {
        await loadRedirects();
      }
    } catch (err) {
      console.error('Toggle redirect error:', err);
    }
  };

  const handleRedirectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourceUrl.trim() || !destinationUrl.trim()) {
      alert('Please fill in both Source URL and Destination URL.');
      return;
    }

    try {
      setSubmittingRedirect(true);
      const payload = {
        sourceUrl: sourceUrl.trim(),
        destinationUrl: destinationUrl.trim(),
        statusCode,
        description: redirectDescription.trim(),
      };

      let res;
      if (editingRedirectId) {
        res = await fetch(`/api/redirects/${editingRedirectId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch('/api/redirects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (!res.ok || !data.success) {
        alert(data.error || 'Failed to save redirect rule');
        return;
      }

      setRedirectModalOpen(false);
      setSuccessMessage(editingRedirectId ? 'Redirect updated' : 'Redirect created');
      await loadRedirects();
    } catch (err: any) {
      console.error('Save redirect error:', err);
      alert('Error saving redirect rule');
    } finally {
      setSubmittingRedirect(false);
    }
  };

  // ====================================================
  // Blog Handlers
  // ====================================================
  const handleCoverFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawFile = e.target.files?.[0];
    if (!rawFile) return;

    try {
      setCoverUploading(true);
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

  const resetBlogForm = () => {
    setEditingSlug(null);
    setTitle('');
    setSlug('');
    setExcerpt('');
    setContent('');
    setCoverImage('');
    setIsPublished(true);
    setTags('Digital Marketing, Growth, SEO');
    setMetaTitle('');
    setMetaDescription('');
    setCanonicalUrl('');
    setFocusKeywords('');
  };

  const handleEditBlogClick = async (blogItem: BlogItem) => {
    setEditingSlug(blogItem.slug);
    setTitle(blogItem.title);
    setSlug(blogItem.slug);
    setCategory(blogItem.category);
    setCoverImage(blogItem.cover_image || '');
    setAuthorName(blogItem.author_name || 'Inventus Team');
    setExcerpt(blogItem.excerpt || '');
    setIsPublished(blogItem.is_published === 1);
    setMetaTitle(blogItem.meta_title || '');
    setMetaDescription(blogItem.meta_description || '');
    setCanonicalUrl(blogItem.canonical_url || '');
    setFocusKeywords(blogItem.focus_keywords || '');

    try {
      const res = await fetch(`/api/blogs/${blogItem.slug}`);
      const data = await res.json();
      if (data.success && data.blog) {
        setContent(data.blog.content || '');
        if (data.blog.meta_title) setMetaTitle(data.blog.meta_title);
        if (data.blog.meta_description) setMetaDescription(data.blog.meta_description);
        if (data.blog.canonical_url) setCanonicalUrl(data.blog.canonical_url);
        if (data.blog.focus_keywords) setFocusKeywords(data.blog.focus_keywords);
      }
    } catch (err) {
      console.error('Failed to fetch blog content:', err);
    }

    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  const handleSubmitBlog = async (overridePublished?: boolean) => {
    if (!title.trim()) {
      alert('Please enter an Article Title.');
      return;
    }

    try {
      setSubmittingBlog(true);
      setErrorMessage(null);
      setSuccessMessage(null);

      const publishValue = overridePublished !== undefined ? overridePublished : isPublished;

      const payload = {
        title,
        slug: slug.trim() || undefined,
        category,
        coverImage,
        excerpt,
        authorName,
        authorRole,
        tags,
        content,
        isPublished: publishValue ? 1 : 0,
        metaTitle: metaTitle.trim() || null,
        metaDescription: metaDescription.trim() || null,
        canonicalUrl: canonicalUrl.trim() || null,
        focusKeywords: focusKeywords.trim() || null,
      };

      let res;
      if (editingSlug) {
        res = await fetch(`/api/blogs/${editingSlug}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch('/api/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMessage(data.error || 'Failed to save blog post.');
        return;
      }

      setSuccessMessage(editingSlug ? 'Article updated successfully!' : 'Article published successfully!');
      resetBlogForm();
      await loadBlogs();
    } catch (err: any) {
      setErrorMessage(err.message || 'Error communicating with database.');
    } finally {
      setSubmittingBlog(false);
    }
  };

  const handleDeleteBlog = async (slugToDelete: string, titleText: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${titleText}"?`)) return;

    try {
      const res = await fetch(`/api/blogs/${slugToDelete}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        if (editingSlug === slugToDelete) resetBlogForm();
        await loadBlogs();
      } else {
        alert(data.error || 'Failed to delete');
      }
    } catch (err) {
      alert('Error deleting post');
    }
  };

  // ====================================================
  // Careers Handlers
  // ====================================================
  const resetJobForm = () => {
    setEditingJobId(null);
    setJobTitle('');
    setJobDepartment('Paid Media');
    setJobType('Full-Time');
    setJobLocation('Vashi, Navi Mumbai (On-Site)');
    setJobExperience('2+ Years Experience');
    setJobSalary('Competitive + Performance Bonus');
    setJobDescription('');
    setJobRequirements('');
    setJobIsActive(true);
  };

  const handleOpenNewJob = () => {
    resetJobForm();
    setJobModalOpen(true);
  };

  const handleEditJobClick = (job: JobPosition) => {
    setEditingJobId(job.id);
    setJobTitle(job.title);
    setJobDepartment(job.department);
    setJobType(job.type);
    setJobLocation(job.location);
    setJobExperience(job.experience);
    setJobSalary(job.salary || '');
    setJobDescription(job.description);
    setJobRequirements(Array.isArray(job.requirements) ? job.requirements.join('\n') : '');
    setJobIsActive(Boolean(job.is_active));
    setJobModalOpen(true);
  };

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle.trim() || !jobDescription.trim()) {
      alert('Please fill in Job Title and Description.');
      return;
    }

    try {
      setSubmittingJob(true);
      const payload = {
        title: jobTitle,
        department: jobDepartment,
        type: jobType,
        location: jobLocation,
        experience: jobExperience,
        salary: jobSalary,
        description: jobDescription,
        requirements: jobRequirements,
        is_active: jobIsActive ? 1 : 0,
      };

      let res;
      if (editingJobId) {
        res = await fetch(`/api/jobs/${editingJobId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch('/api/jobs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (!res.ok || !data.success) {
        alert(data.error || 'Failed to save job opening');
        return;
      }

      setJobModalOpen(false);
      resetJobForm();
      await loadJobs();
    } catch (err: any) {
      alert('Network error saving job');
    } finally {
      setSubmittingJob(false);
    }
  };

  const handleToggleJobActive = async (job: JobPosition) => {
    try {
      const nextActive = !job.is_active;
      const res = await fetch(`/api/jobs/${job.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: nextActive ? 1 : 0 }),
      });
      if (res.ok) {
        await loadJobs();
      }
    } catch (err) {
      alert('Error updating status');
    }
  };

  const handleDeleteJob = async (id: number | string, titleText: string) => {
    if (!confirm(`Delete job opening "${titleText}"?`)) return;
    try {
      const res = await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
      if (res.ok) await loadJobs();
    } catch (err) {
      alert('Error deleting job');
    }
  };

  // ====================================================
  // Application Handlers
  // ====================================================
  const handleStatusChange = async (appId: number | string, newStatus: string) => {
    try {
      const res = await fetch(`/api/applications/${appId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setApplications((prev) =>
          prev.map((a) => (a.id === appId ? { ...a, status: newStatus as any } : a))
        );
      }
    } catch (err) {
      alert('Failed to update applicant status');
    }
  };

  const handleDeleteApp = async (id: number | string, candidateName: string) => {
    if (!confirm(`Remove application from "${candidateName}"?`)) return;
    try {
      const res = await fetch(`/api/applications/${id}`, { method: 'DELETE' });
      if (res.ok) await loadApplications();
    } catch (err) {
      alert('Error deleting application');
    }
  };

  // ====================================================
  // Media Gallery Handlers
  // ====================================================
  const handleCopyMediaUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(window.location.origin + url);
    setCopiedMediaId(id);
    setTimeout(() => setCopiedMediaId(null), 2000);
  };

  const handleDeleteMedia = async (id: string) => {
    if (!confirm('Permanently delete this image from MySQL?')) return;
    try {
      const res = await fetch(`/api/media?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      if (res.ok) await loadMedia();
    } catch (err) {
      alert('Error deleting media');
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawFile = e.target.files?.[0];
    if (!rawFile) return;

    try {
      setUploadingGallery(true);
      const file = await compressImage(rawFile);
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        await loadMedia();
      } else {
        alert(data.error || 'Failed to upload image');
      }
    } catch {
      alert('Error uploading to gallery');
    } finally {
      setUploadingGallery(false);
      if (galleryUploadRef.current) galleryUploadRef.current.value = '';
    }
  };

  // Filtered blogs for table
  const filteredBlogs = blogs.filter((b) =>
    b.title.toLowerCase().includes(blogSearchQuery.toLowerCase()) ||
    b.category.toLowerCase().includes(blogSearchQuery.toLowerCase())
  );

  return (
    <div className={styles.adminContainer}>
      {/* Header Bar */}
      <header className={styles.adminHeader}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className={styles.adminBadge}>Hostinger MySQL Live</span>
            <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Connected Database
            </span>
          </div>
          <h1 className={styles.title}>Inventus Control Studio</h1>
          <p className={styles.subtitle}>
            Manage editorial playbooks, live job postings, candidate applications, and media assets.
          </p>
        </div>

        <div className={styles.headerActions}>
          <Link href="/" className={styles.btnOutline} target="_blank">
            <ExternalLink size={15} /> Live Site
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
          >
            <LogOut size={15} /> {loggingOut ? 'Signing out...' : 'Sign Out'}
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className={styles.navTabs}>
        <button
          onClick={() => setActiveTab('articles')}
          className={`${styles.navTab} ${activeTab === 'articles' ? styles.navTabActive : ''}`}
        >
          <FileText size={17} />
          <span>Articles Studio</span>
          <span className={styles.tabBadge}>{blogs.length}</span>
        </button>

        <button
          onClick={() => setActiveTab('careers')}
          className={`${styles.navTab} ${activeTab === 'careers' ? styles.navTabActive : ''}`}
        >
          <Briefcase size={17} />
          <span>Careers &amp; Jobs</span>
          <span className={styles.tabBadge}>{jobs.length}</span>
        </button>

        <button
          onClick={() => setActiveTab('applications')}
          className={`${styles.navTab} ${activeTab === 'applications' ? styles.navTabActive : ''}`}
        >
          <Users size={17} />
          <span>Job Applicants</span>
          <span className={styles.tabBadge}>{applications.length}</span>
        </button>

        <button
          onClick={() => setActiveTab('media')}
          className={`${styles.navTab} ${activeTab === 'media' ? styles.navTabActive : ''}`}
        >
          <ImageIcon size={17} />
          <span>Media Gallery</span>
          <span className={styles.tabBadge}>{mediaList.length}</span>
        </button>

        <button
          onClick={() => setActiveTab('redirects')}
          className={`${styles.navTab} ${activeTab === 'redirects' ? styles.navTabActive : ''}`}
        >
          <ArrowRightLeft size={17} />
          <span>301 Redirects</span>
          <span className={styles.tabBadge}>{redirects.length}</span>
        </button>
      </nav>

      {/* Alert Messages */}
      {successMessage && (
        <div className={styles.alertSuccess}>
          <span>✓ {successMessage}</span>
          <button onClick={() => setSuccessMessage(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={16} />
          </button>
        </div>
      )}

      {errorMessage && (
        <div className={styles.alertError}>
          <span>⚠️ {errorMessage}</span>
        </div>
      )}

      {/* ==================================================== */}
      {/* TAB 1: ARTICLES STUDIO (Two-Panel Studio Layout)     */}
      {/* ==================================================== */}
      {activeTab === 'articles' && (
        <div>
          <div className={styles.studioLayout}>
            {/* Center Writing Canvas */}
            <div className={styles.editorCanvas}>
              <div>
                <input
                  type="text"
                  placeholder="Article Title..."
                  className={styles.titleInput}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label className={styles.label} style={{ marginBottom: '8px', display: 'block' }}>
                  Article Content (TipTap Rich Text Editor)
                </label>
                <RichTextEditor content={content} onChange={setContent} />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>SEO Excerpt &amp; Search Summary</label>
                <textarea
                  className={styles.textarea}
                  placeholder="A concise 1-2 sentence overview of this playbook..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                />
              </div>
            </div>

            {/* Right-Hand Sticky Publishing Sidebar */}
            <aside className={styles.publishingSidebar}>
              {/* Card 1: Publish Controls */}
              <div className={styles.sidebarCard}>
                <div className={styles.sidebarCardHeader}>
                  <h3 className={styles.sidebarCardTitle}>
                    <Sparkles size={16} color="#f16334" /> Publishing Studio
                  </h3>
                  {editingSlug ? (
                    <span className={styles.badgeActive}>Editing</span>
                  ) : (
                    <span className={styles.badgeClosed}>New Post</span>
                  )}
                </div>

                <div className={styles.publishStatusRow}>
                  <span className={styles.statusLabel}>Visibility Status:</span>
                  <button
                    type="button"
                    onClick={() => setIsPublished(!isPublished)}
                    className={isPublished ? styles.badgeActive : styles.badgeClosed}
                    style={{ border: 'none', cursor: 'pointer' }}
                  >
                    {isPublished ? '● Published' : '○ Draft'}
                  </button>
                </div>

                <div className={styles.sidebarActions}>
                  <button
                    type="button"
                    onClick={() => handleSubmitBlog(true)}
                    disabled={submittingBlog}
                    className={styles.btnPrimary}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    {submittingBlog ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={16} />
                        <span>{editingSlug ? 'Update Article' : 'Publish Article'}</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSubmitBlog(false)}
                    disabled={submittingBlog}
                    className={styles.btnOutline}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <span>Save as Draft</span>
                  </button>

                  {editingSlug && (
                    <button
                      type="button"
                      onClick={resetBlogForm}
                      className={styles.btnOutline}
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      <span>Cancel Editing</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Card 2: Cover Image */}
              <div className={styles.sidebarCard}>
                <div className={styles.sidebarCardHeader}>
                  <h3 className={styles.sidebarCardTitle}>
                    <ImageIcon size={16} /> Cover Image
                  </h3>
                  <button
                    type="button"
                    onClick={() => coverFileInputRef.current?.click()}
                    disabled={coverUploading}
                    className={styles.btnOutline}
                    style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                  >
                    {coverUploading ? 'Compressing...' : 'Upload'}
                  </button>
                  <input
                    ref={coverFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleCoverFileUpload}
                    style={{ display: 'none' }}
                  />
                </div>

                <div className={styles.coverPreviewBox}>
                  {coverImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={coverImage} alt="Cover Preview" />
                  ) : (
                    <span style={{ color: '#64748b', fontSize: '0.85rem' }}>No cover selected</span>
                  )}
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Image URL / MySQL Path</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="https://... or /api/media/..."
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                  />
                </div>
              </div>

              {/* Card 3: Categorization & Metadata */}
              <div className={styles.sidebarCard}>
                <div className={styles.sidebarCardHeader}>
                  <h3 className={styles.sidebarCardTitle}>
                    <Layers size={16} /> Organization
                  </h3>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Pillar / Category</label>
                  <select
                    className={styles.select}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="PPC & Paid Ads">PPC &amp; Paid Ads</option>
                    <option value="Organic SEO & AI Search">Organic SEO &amp; AI Search</option>
                    <option value="Social Media & Content">Social Media &amp; Content</option>
                    <option value="Conversion & Web Architecture">Conversion &amp; Web Architecture</option>
                    <option value="Influencer & Brand Growth">Influencer &amp; Brand Growth</option>
                  </select>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Topic Tags (Comma-separated)</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Author Name &amp; Role</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <input
                      type="text"
                      className={styles.input}
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="Author"
                    />
                    <input
                      type="text"
                      className={styles.input}
                      value={authorRole}
                      onChange={(e) => setAuthorRole(e.target.value)}
                      placeholder="Role"
                    />
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Custom URL Slug (Optional)</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="auto-generated-from-title"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                  />
                </div>
              </div>

              {/* Card 4: Search Engine Optimization (SEO & Meta) */}
              <div className={styles.sidebarCard}>
                <div className={styles.sidebarCardHeader}>
                  <h3 className={styles.sidebarCardTitle}>
                    <Globe size={16} /> SEO &amp; Metadata
                  </h3>
                  <span style={{ fontSize: '0.72rem', background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '9999px', fontWeight: 700 }}>
                    Google Ready
                  </span>
                </div>

                {/* Live Google Search Preview Box */}
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', marginBottom: '14px' }}>
                  <div style={{ fontSize: '0.74rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600 }}>inventusglobal.com</span>
                    <span>›</span>
                    <span style={{ color: '#64748b' }}>blog › {slug || 'article-slug'}</span>
                  </div>
                  <div style={{ fontSize: '0.94rem', fontWeight: 600, color: '#1a0dab', lineHeight: 1.25, marginBottom: '4px' }}>
                    {metaTitle || title || 'Your Article Title | Inventus Global'}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#4d5156', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {metaDescription || excerpt || 'Enter meta description to optimize snippet on Google search results...'}
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <label className={styles.label} style={{ margin: 0 }}>SEO Meta Title</label>
                    <span style={{ fontSize: '0.72rem', color: (metaTitle || title).length > 60 ? '#ef4444' : '#64748b' }}>
                      {(metaTitle || title).length}/60
                    </span>
                  </div>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Custom Google title (defaults to Article Title)"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <label className={styles.label} style={{ margin: 0 }}>SEO Meta Description</label>
                    <span style={{ fontSize: '0.72rem', color: (metaDescription || excerpt).length > 160 ? '#ef4444' : '#64748b' }}>
                      {(metaDescription || excerpt).length}/160
                    </span>
                  </div>
                  <textarea
                    className={styles.textarea}
                    rows={3}
                    placeholder="Brief 150-160 character description optimized for click-through rate..."
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Focus Keywords (Comma-separated)</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="e.g. PPC agency, Google ads Navi Mumbai"
                    value={focusKeywords}
                    onChange={(e) => setFocusKeywords(e.target.value)}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Canonical URL Override (Optional)</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="https://inventusglobal.com/blog/..."
                    value={canonicalUrl}
                    onChange={(e) => setCanonicalUrl(e.target.value)}
                  />
                </div>
              </div>
            </aside>
          </div>

          {/* All Articles Listing Table */}
          <div className={styles.tableCard}>
            <div className={styles.tableHeaderRow}>
              <div>
                <h3 className={styles.tableTitle}>Published &amp; Draft Playbooks</h3>
                <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                  Total {blogs.length} articles saved in MySQL
                </span>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="Search articles..."
                  className={styles.input}
                  style={{ width: '220px' }}
                  value={blogSearchQuery}
                  onChange={(e) => setBlogSearchQuery(e.target.value)}
                />
                <button onClick={loadBlogs} className={styles.btnOutline} title="Refresh">
                  <RefreshCw size={15} />
                </button>
              </div>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Article</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingBlogs ? (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', padding: '30px' }}>
                        Loading articles...
                      </td>
                    </tr>
                  ) : filteredBlogs.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                        No articles match your search query.
                      </td>
                    </tr>
                  ) : (
                    filteredBlogs.map((b) => (
                      <tr key={b.id}>
                        <td>
                          <strong>{b.title}</strong>
                          <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                            /{b.slug} • {b.author_name}
                          </div>
                        </td>
                        <td>
                          <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{b.category}</span>
                        </td>
                        <td>
                          {b.is_published ? (
                            <span className={styles.badgeActive}>Live</span>
                          ) : (
                            <span className={styles.badgeClosed}>Draft</span>
                          )}
                        </td>
                        <td style={{ fontSize: '0.82rem', color: '#64748b' }}>
                          {b.published_at ? new Date(b.published_at).toLocaleDateString() : '-'}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '6px' }}>
                            <Link
                              href={`/blog/${b.slug}`}
                              target="_blank"
                              className={styles.btnOutline}
                              style={{ padding: '6px 10px' }}
                              title="View on site"
                            >
                              <Eye size={14} />
                            </Link>
                            <button
                              onClick={() => handleEditBlogClick(b)}
                              className={styles.btnOutline}
                              style={{ padding: '6px 10px' }}
                              title="Edit article"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteBlog(b.slug, b.title)}
                              className={styles.btnOutline}
                              style={{ padding: '6px 10px', color: '#ef4444', borderColor: '#fca5a5' }}
                              title="Delete"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* TAB 2: CAREERS & JOB OPENINGS MANAGEMENT             */}
      {/* ==================================================== */}
      {activeTab === 'careers' && (
        <div>
          <div className={styles.tableCard} style={{ marginTop: 0 }}>
            <div className={styles.tableHeaderRow}>
              <div>
                <h3 className={styles.tableTitle}>Active Careers &amp; Job Openings</h3>
                <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                  Positions listed here appear live on the <strong>/careers</strong> page.
                </span>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={handleOpenNewJob} className={styles.btnPrimary}>
                  <PlusCircle size={16} />
                  <span>Post New Job Position</span>
                </button>
                <button onClick={loadJobs} className={styles.btnOutline} title="Refresh">
                  <RefreshCw size={15} />
                </button>
              </div>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Job Title &amp; Department</th>
                    <th>Type &amp; Location</th>
                    <th>Experience</th>
                    <th>Salary / Comp</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingJobs ? (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', padding: '30px' }}>
                        Loading job positions...
                      </td>
                    </tr>
                  ) : jobs.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                        No dynamic job positions found. Click <strong>&quot;Post New Job Position&quot;</strong> to publish your first role!
                      </td>
                    </tr>
                  ) : (
                    jobs.map((job) => (
                      <tr key={job.id}>
                        <td>
                          <strong>{job.title}</strong>
                          <div style={{ fontSize: '0.78rem', color: '#f16334', fontWeight: 600 }}>
                            {job.department}
                          </div>
                        </td>
                        <td>
                          <div>{job.type}</div>
                          <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{job.location}</div>
                        </td>
                        <td>{job.experience}</td>
                        <td style={{ fontSize: '0.85rem', color: '#475569' }}>{job.salary || 'Competitive'}</td>
                        <td>
                          <button
                            onClick={() => handleToggleJobActive(job)}
                            className={job.is_active ? styles.badgeActive : styles.badgeClosed}
                            style={{ border: 'none', cursor: 'pointer' }}
                            title="Click to toggle status"
                          >
                            {job.is_active ? '● Active' : '○ Closed'}
                          </button>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '6px' }}>
                            <button
                              onClick={() => handleEditJobClick(job)}
                              className={styles.btnOutline}
                              style={{ padding: '6px 10px' }}
                              title="Edit opening"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteJob(job.id, job.title)}
                              className={styles.btnOutline}
                              style={{ padding: '6px 10px', color: '#ef4444', borderColor: '#fca5a5' }}
                              title="Delete opening"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal for Creating / Editing Jobs */}
          {jobModalOpen && (
            <div className={styles.modalOverlay} onClick={() => setJobModalOpen(false)}>
              <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                  <h3 className={styles.modalTitle}>
                    {editingJobId ? 'Edit Job Opening' : 'Post New Job Position'}
                  </h3>
                  <button onClick={() => setJobModalOpen(false)} className={styles.modalCloseBtn}>
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleJobSubmit}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Job Title *</label>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="e.g. Senior Google Ads Strategist"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.label}>Department *</label>
                      <select
                        className={styles.select}
                        value={jobDepartment}
                        onChange={(e) => setJobDepartment(e.target.value)}
                      >
                        <option value="Paid Media">Paid Media (PPC / Meta)</option>
                        <option value="Earned & Organic">Earned &amp; Organic (SEO / PR)</option>
                        <option value="Creative Studio">Creative Studio (Video / Design)</option>
                        <option value="Data & Engineering">Data &amp; Engineering (Web / Next.js)</option>
                        <option value="Client Growth & Sales">Client Growth &amp; Accounts</option>
                      </select>
                    </div>

                    <div className={styles.fieldGroup}>
                      <label className={styles.label}>Employment Type *</label>
                      <select
                        className={styles.select}
                        value={jobType}
                        onChange={(e) => setJobType(e.target.value)}
                      >
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.label}>Location *</label>
                      <input
                        type="text"
                        className={styles.input}
                        value={jobLocation}
                        onChange={(e) => setJobLocation(e.target.value)}
                        required
                      />
                    </div>

                    <div className={styles.fieldGroup}>
                      <label className={styles.label}>Experience Level *</label>
                      <input
                        type="text"
                        className={styles.input}
                        placeholder="e.g. 2+ Years Experience"
                        value={jobExperience}
                        onChange={(e) => setJobExperience(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Salary / Compensation Package</label>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="e.g. ₹5L - ₹8L PA + Performance Perks"
                      value={jobSalary}
                      onChange={(e) => setJobSalary(e.target.value)}
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Job Overview / Role Description *</label>
                    <textarea
                      className={styles.textarea}
                      placeholder="Describe what the candidate will be doing and why this role matters..."
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      rows={3}
                      required
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Key Requirements (1 bullet point per line) *</label>
                    <textarea
                      className={styles.textarea}
                      placeholder="Enter each requirement on a new line:&#10;Proven track record managing ₹5L+ monthly spend&#10;Expertise in Google Ads and GA4&#10;Strong communication skills"
                      value={jobRequirements}
                      onChange={(e) => setJobRequirements(e.target.value)}
                      rows={4}
                      required
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '16px 0 24px' }}>
                    <input
                      type="checkbox"
                      id="job-active-checkbox"
                      checked={jobIsActive}
                      onChange={(e) => setJobIsActive(e.target.checked)}
                      style={{ width: '18px', height: '18px', accentColor: '#f16334' }}
                    />
                    <label htmlFor="job-active-checkbox" style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1e293b' }}>
                      Publish actively on /careers page immediately
                    </label>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={() => setJobModalOpen(false)}
                      className={styles.btnOutline}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submittingJob}
                      className={styles.btnPrimary}
                    >
                      {submittingJob ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Saving Position...</span>
                        </>
                      ) : (
                        <span>{editingJobId ? 'Update Job Opening' : 'Publish Job Opening'}</span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ==================================================== */}
      {/* TAB 3: CANDIDATE APPLICATIONS MANAGEMENT             */}
      {/* ==================================================== */}
      {activeTab === 'applications' && (
        <div className={styles.tableCard} style={{ marginTop: 0 }}>
          <div className={styles.tableHeaderRow}>
            <div>
              <h3 className={styles.tableTitle}>Candidate Job Applications</h3>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                Resumes and candidate details submitted via the <strong>/careers</strong> fast-track application form.
              </span>
            </div>

            <button onClick={loadApplications} className={styles.btnOutline} title="Refresh">
              <RefreshCw size={15} /> Refresh List
            </button>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Role Applied For</th>
                  <th>Contact Information</th>
                  <th>Experience</th>
                  <th>Portfolio / LinkedIn</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loadingApps ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '30px' }}>
                      Loading applicants...
                    </td>
                  </tr>
                ) : applications.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                      No candidate applications received yet. Submissions from <strong>/careers</strong> will appear here automatically.
                    </td>
                  </tr>
                ) : (
                  applications.map((app) => (
                    <tr key={app.id}>
                      <td>
                        <strong>{app.full_name}</strong>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                          Submitted {new Date(app.created_at).toLocaleDateString()}
                        </div>
                      </td>
                      <td>
                        <span className={styles.badgeActive} style={{ background: '#f1f5f9', color: '#0f172a' }}>
                          {app.role_applied}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                          <a href={`mailto:${app.email}`} style={{ color: '#f16334', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Mail size={12} /> {app.email}
                          </a>
                          <a href={`tel:${app.phone}`} style={{ color: '#475569', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Phone size={12} /> {app.phone}
                          </a>
                        </div>
                      </td>
                      <td style={{ fontSize: '0.85rem' }}>{app.experience}</td>
                      <td>
                        {app.portfolio ? (
                          <a
                            href={app.portfolio.startsWith('http') ? app.portfolio : `https://${app.portfolio}`}
                            target="_blank"
                            rel="noreferrer"
                            className={styles.btnOutline}
                            style={{ padding: '4px 8px', fontSize: '0.75rem', display: 'inline-flex', gap: '4px' }}
                          >
                            <ExternalLink size={12} /> View Link
                          </a>
                        ) : (
                          <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>None provided</span>
                        )}
                      </td>
                      <td>
                        <select
                          className={`${styles.statusSelect} ${styles[app.status] || ''}`}
                          value={app.status}
                          onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        >
                          <option value="new">New</option>
                          <option value="reviewing">Reviewing</option>
                          <option value="contacted">Contacted</option>
                          <option value="rejected">Archived</option>
                        </select>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          onClick={() => handleDeleteApp(app.id, app.full_name)}
                          className={styles.btnOutline}
                          style={{ padding: '6px 10px', color: '#ef4444', borderColor: '#fca5a5' }}
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* TAB 4: MEDIA GALLERY                                 */}
      {/* ==================================================== */}
      {activeTab === 'media' && (
        <div className={styles.tableCard} style={{ marginTop: 0 }}>
          <div className={styles.tableHeaderRow}>
            <div>
              <h3 className={styles.tableTitle}>MySQL Media Assets</h3>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                All images stored safely in your Hostinger MySQL database. Click &quot;Copy URL&quot; to use in articles.
              </span>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => galleryUploadRef.current?.click()}
                disabled={uploadingGallery}
                className={styles.btnPrimary}
              >
                <Upload size={16} />
                <span>{uploadingGallery ? 'Uploading...' : 'Upload Image to MySQL'}</span>
              </button>
              <input
                ref={galleryUploadRef}
                type="file"
                accept="image/*"
                onChange={handleGalleryUpload}
                style={{ display: 'none' }}
              />
              <button onClick={loadMedia} className={styles.btnOutline} title="Refresh">
                <RefreshCw size={15} />
              </button>
            </div>
          </div>

          {loadingMedia ? (
            <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
              Loading media gallery from database...
            </div>
          ) : mediaList.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
              <ImageIcon size={48} style={{ color: '#cbd5e1', margin: '0 auto 12px' }} />
              <h4>No media assets uploaded yet</h4>
              <p style={{ fontSize: '0.9rem' }}>Upload images here to get instant permanent URLs stored in MySQL.</p>
            </div>
          ) : (
            <div className={styles.mediaGrid}>
              {mediaList.map((item) => (
                <div key={item.id} className={styles.mediaCard}>
                  <div className={styles.mediaThumbBox}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.url} alt={item.filename} />
                  </div>
                  <div className={styles.mediaMeta}>
                    <span className={styles.mediaFilename} title={item.filename}>
                      {item.filename}
                    </span>
                    <span className={styles.mediaSize}>
                      {(item.size_bytes / 1024).toFixed(1)} KB • {new Date(item.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className={styles.mediaActionsRow}>
                    <button
                      onClick={() => handleCopyMediaUrl(item.url, item.id)}
                      className={styles.btnOutline}
                      style={{ padding: '5px 10px', fontSize: '0.78rem' }}
                    >
                      {copiedMediaId === item.id ? (
                        <>
                          <Check size={13} color="#16a34a" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy size={13} /> Copy URL
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleDeleteMedia(item.id)}
                      className={styles.btnOutline}
                      style={{ padding: '5px 8px', color: '#ef4444', borderColor: '#fca5a5' }}
                      title="Delete image"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ==================================================== */}
      {/* 5. 301 / 302 Redirections Manager Studio (SEO Migration) */}
      {/* ==================================================== */}
      {activeTab === 'redirects' && (
        <div style={{ animation: 'fadeIn 0.3s ease' }}>
          <div className={styles.tableCard} style={{ marginTop: 0 }}>
            <div className={styles.tableHeaderRow}>
              <div>
                <h3 className={styles.tableTitle} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ArrowRightLeft size={20} color="#f16334" />
                  <span>301 / 302 URL Redirections Manager</span>
                </h3>
                <span style={{ fontSize: '0.84rem', color: '#64748b' }}>
                  Manage legacy WordPress URLs, preserve Google search rankings, and prevent 404 broken links.
                </span>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Search redirect rules..."
                  value={redirectSearch}
                  onChange={(e) => setRedirectSearch(e.target.value)}
                  className={styles.input}
                  style={{ width: '240px', padding: '8px 12px', fontSize: '0.85rem' }}
                />

                <button
                  type="button"
                  onClick={handleOpenNewRedirect}
                  className={styles.btnPrimary}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  <PlusCircle size={16} />
                  <span>Add Redirect Rule</span>
                </button>
              </div>
            </div>

            {loadingRedirects ? (
              <div style={{ padding: '60px', textAlign: 'center', color: '#64748b' }}>
                <Loader2 size={32} className="animate-spin" style={{ margin: '0 auto 12px' }} />
                <p>Loading redirection rules from MySQL...</p>
              </div>
            ) : redirects.length === 0 ? (
              <div style={{ padding: '60px 20px', textAlign: 'center', background: '#f8fafc', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
                <Link2 size={36} color="#94a3b8" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ margin: '0 0 6px', color: '#0f172a', fontSize: '1.05rem' }}>No Redirect Rules Active</h4>
                <p style={{ margin: '0 0 16px', color: '#64748b', fontSize: '0.88rem' }}>
                  Add your first redirect rule to map any old WordPress URLs directly to new Next.js routes.
                </p>
                <button
                  type="button"
                  onClick={handleOpenNewRedirect}
                  className={styles.btnPrimary}
                >
                  <PlusCircle size={16} />
                  <span>Add First Redirect</span>
                </button>
              </div>
            ) : (
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th style={{ width: '30%' }}>Old URL (Source)</th>
                      <th style={{ width: '30%' }}>New URL (Destination)</th>
                      <th style={{ width: '10%' }}>Type</th>
                      <th style={{ width: '10%' }}>Hits</th>
                      <th style={{ width: '10%' }}>Status</th>
                      <th style={{ width: '10%', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {redirects
                      .filter(
                        (r) =>
                          r.source_url.toLowerCase().includes(redirectSearch.toLowerCase()) ||
                          r.destination_url.toLowerCase().includes(redirectSearch.toLowerCase()) ||
                          (r.description && r.description.toLowerCase().includes(redirectSearch.toLowerCase()))
                      )
                      .map((r) => (
                        <tr key={r.id}>
                          <td>
                            <code style={{ background: '#fee2e2', color: '#991b1b', padding: '3px 7px', borderRadius: '4px', fontSize: '0.82rem', fontWeight: 600 }}>
                              {r.source_url}
                            </code>
                            {r.description && (
                              <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '4px' }}>
                                {r.description}
                              </div>
                            )}
                          </td>
                          <td>
                            <code style={{ background: '#dcfce7', color: '#166534', padding: '3px 7px', borderRadius: '4px', fontSize: '0.82rem', fontWeight: 600 }}>
                              {r.destination_url}
                            </code>
                          </td>
                          <td>
                            <span
                              style={{
                                display: 'inline-block',
                                padding: '2px 8px',
                                borderRadius: '9999px',
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                background: r.status_code === 301 ? '#e0e7ff' : '#fef3c7',
                                color: r.status_code === 301 ? '#3730a3' : '#92400e',
                              }}
                            >
                              {r.status_code === 301 ? '301 Permanent' : '302 Temporary'}
                            </span>
                          </td>
                          <td>
                            <span style={{ fontSize: '0.84rem', fontWeight: 600, color: '#475569' }}>
                              {r.hits || 0}
                            </span>
                          </td>
                          <td>
                            <button
                              type="button"
                              onClick={() => handleToggleRedirectActive(r)}
                              className={r.is_active ? styles.badgeActive : styles.badgeDraft}
                              style={{ border: 'none', cursor: 'pointer' }}
                            >
                              {r.is_active ? '● Active' : '○ Disabled'}
                            </button>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <div style={{ display: 'inline-flex', gap: '6px' }}>
                              <button
                                type="button"
                                onClick={() => handleEditRedirectClick(r)}
                                className={styles.btnOutline}
                                style={{ padding: '4px 8px' }}
                                title="Edit rule"
                              >
                                <Edit size={13} />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteRedirect(r.id)}
                                className={styles.btnOutline}
                                style={{ padding: '4px 8px', color: '#ef4444', borderColor: '#fca5a5' }}
                                title="Delete rule"
                              >
                                <Trash2 size={13} />
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
      )}

      {/* Modal: Add/Edit 301 Redirect Rule */}
      {redirectModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '20px',
          }}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              maxWidth: '540px',
              width: '100%',
              padding: '28px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ArrowRightLeft size={18} color="#f16334" />
                <span>{editingRedirectId ? 'Edit Redirect Rule' : 'New 301 Redirect Rule'}</span>
              </h3>
              <button
                type="button"
                onClick={() => setRedirectModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleRedirectSubmit}>
              <div className={styles.fieldGroup} style={{ marginBottom: '14px' }}>
                <label className={styles.label}>Old URL / Path (Source) *</label>
                <input
                  type="text"
                  required
                  className={styles.input}
                  placeholder="/old-wordpress-slug or /services/old-name"
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                />
                <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
                  Relative path (e.g. <code>/sample-post</code>) or full legacy URL.
                </span>
              </div>

              <div className={styles.fieldGroup} style={{ marginBottom: '14px' }}>
                <label className={styles.label}>New Destination URL *</label>
                <input
                  type="text"
                  required
                  className={styles.input}
                  placeholder="/blog/new-slug or /services/google-ads-ppc"
                  value={destinationUrl}
                  onChange={(e) => setDestinationUrl(e.target.value)}
                />
                <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
                  Where the user and search engines should be redirected to.
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Redirect HTTP Code</label>
                  <select
                    className={styles.select}
                    value={statusCode}
                    onChange={(e) => setStatusCode(Number(e.target.value))}
                  >
                    <option value={301}>301 Permanent (SEO standard)</option>
                    <option value={302}>302 Temporary</option>
                  </select>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Internal Note (Optional)</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="e.g. WP Migration"
                    value={redirectDescription}
                    onChange={(e) => setRedirectDescription(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '24px' }}>
                <button
                  type="button"
                  onClick={() => setRedirectModalOpen(false)}
                  className={styles.btnOutline}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingRedirect}
                  className={styles.btnPrimary}
                >
                  {submittingRedirect ? 'Saving...' : editingRedirectId ? 'Update Rule' : 'Save Rule'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
