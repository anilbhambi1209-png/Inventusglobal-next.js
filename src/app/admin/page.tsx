"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BlogPost } from "@/types/blog";
import {
  ShieldCheck,
  PlusCircle,
  CheckCircle2,
  Trash2,
  ExternalLink,
  BookOpen,
  ArrowRight,
  Sparkles,
  FileText,
} from "lucide-react";

export default function AdminPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<{
    text: string;
    slug?: string;
  } | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("PPC & Paid Ads");
  const [coverImage, setCoverImage] = useState(
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
  );
  const [excerpt, setExcerpt] = useState("");
  const [authorName, setAuthorName] = useState("Inventus Team");
  const [authorRole, setAuthorRole] = useState("Growth Specialist");
  const [tags, setTags] = useState("Digital Marketing, Growth");
  const [content, setContent] = useState("");

  const presetImages = [
    {
      label: "Analytics & Ads",
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    },
    {
      label: "SEO & Growth",
      url: "https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?auto=format&fit=crop&w=1200&q=80",
    },
    {
      label: "Social Media",
      url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80",
    },
    {
      label: "Modern Web Tech",
      url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  // Fetch blogs list
  const loadBlogs = async () => {
    try {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      if (data.success) {
        setBlogs(data.blogs);
      }
    } catch (err) {
      console.error("Failed to load blogs in admin:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleInsertTemplate = () => {
    setContent(
      `## Overview of This Strategy\nProvide a clear introduction explaining the core problem and why this matters for brands.\n\n## Step 1: Research and Execution\nExplain the specific step-by-step tactics to achieve results.\n\n### Critical Factors to Consider\n* High-intent audience selection\n* Budget distribution\n* Continuous A/B testing\n\n## Step 2: Measuring ROI and Conversion\nTrack how many inquiries, leads, and sales were generated from the campaign.\n\n## Summary & Key Takeaways\nWrap up the article with practical, actionable advice for your readers.`
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Please fill in both the Title and the Content.");
      return;
    }

    setSubmitting(true);
    setSuccessMessage(null);

    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          coverImage,
          excerpt,
          content,
          tags,
          author: {
            name: authorName,
            role: authorRole,
            avatar:
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
          },
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMessage({
          text: `Blog post "${data.blog.title}" published successfully!`,
          slug: data.blog.slug,
        });

        // Reset form
        setTitle("");
        setExcerpt("");
        setContent("");

        // Refresh post list
        await loadBlogs();
      } else {
        alert(data.error || "Failed to publish post.");
      }
    } catch (err) {
      console.error("Publish error:", err);
      alert("An error occurred while publishing.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (slug: string, titleText: string) => {
    if (!confirm(`Are you sure you want to delete "${titleText}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/blogs/${slug}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        await loadBlogs();
      } else {
        alert(data.error || "Failed to delete post");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="admin-container">
      {/* Top Header */}
      <div className="admin-header">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
            <div className="admin-badge">Admin Portal</div>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              Dummy Local Storage Active
            </span>
          </div>
          <h1 style={{ fontSize: "2rem", fontWeight: 800 }}>Blog Management Dashboard</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            Create and publish articles directly to the Inventus Global blog section.
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <Link href="/blog" className="btn-outline">
            <BookOpen size={16} /> View Live Blog
          </Link>
          <Link href="/" className="btn-outline">
            View Homepage
          </Link>
        </div>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="admin-alert-success">
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <CheckCircle2 size={22} />
            <div>
              <div style={{ fontWeight: 700 }}>{successMessage.text}</div>
              <div style={{ fontSize: "0.85rem", opacity: 0.9 }}>
                It is now visible on the live blog grid and has its own generated Table of Contents!
              </div>
            </div>
          </div>
          {successMessage.slug && (
            <Link
              href={`/blog/${successMessage.slug}`}
              className="btn-primary"
              style={{ background: "#059669", padding: "8px 16px", fontSize: "0.85rem" }}
            >
              View Post Now <ExternalLink size={14} />
            </Link>
          )}
        </div>
      )}

      {/* Create Blog Card */}
      <div className="admin-card">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "24px",
            paddingBottom: "16px",
            borderBottom: "1px solid var(--border-light)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <PlusCircle size={22} style={{ color: "var(--primary)" }} />
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700 }}>Add New Blog Article</h2>
          </div>

          <button
            type="button"
            onClick={handleInsertTemplate}
            className="btn-outline"
            style={{ fontSize: "0.82rem", padding: "6px 12px" }}
          >
            <Sparkles size={14} /> Insert Headings Template
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Post Title */}
          <div className="form-group">
            <label className="form-label">Article Title *</label>
            <input
              type="text"
              placeholder="e.g. 5 High-Impact Google Ads Strategies for Navi Mumbai Businesses"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {/* Category */}
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-select"
              >
                <option value="PPC & Paid Ads">PPC & Paid Ads</option>
                <option value="SEO">SEO</option>
                <option value="Social Media Marketing">Social Media Marketing</option>
                <option value="Web Development">Web Development</option>
                <option value="Content Marketing">Content Marketing</option>
                <option value="General">General Growth</option>
              </select>
            </div>

            {/* Tags */}
            <div className="form-group">
              <label className="form-label">Tags (comma-separated)</label>
              <input
                type="text"
                placeholder="PPC, ROI, Google Ads, Leads"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          {/* Cover Image */}
          <div className="form-group">
            <label className="form-label">Cover Image URL</label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="form-input"
            />
            <div style={{ display: "flex", gap: "8px", marginTop: "8px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", alignSelf: "center" }}>
                Quick Presets:
              </span>
              {presetImages.map((img, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setCoverImage(img.url)}
                  style={{
                    fontSize: "0.75rem",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    background: coverImage === img.url ? "var(--primary-light)" : "var(--bg-muted)",
                    color: coverImage === img.url ? "var(--primary)" : "var(--text-muted)",
                    border: "1px solid var(--border-light)",
                  }}
                >
                  {img.label}
                </button>
              ))}
            </div>
          </div>

          {/* Excerpt */}
          <div className="form-group">
            <label className="form-label">Short Excerpt / Summary</label>
            <textarea
              rows={2}
              placeholder="A brief 1-2 sentence overview shown on blog cards and Google search preview..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="form-input"
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {/* Author Name */}
            <div className="form-group">
              <label className="form-label">Author Name</label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="form-input"
              />
            </div>

            {/* Author Role */}
            <div className="form-group">
              <label className="form-label">Author Role</label>
              <input
                type="text"
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          {/* Full Content */}
          <div className="form-group">
            <label className="form-label">
              Article Content *{" "}
              <span style={{ fontWeight: 400, color: "var(--text-muted)" }}>
                (Tip: Use <code>## Section Heading</code> and <code>### Sub-heading</code> to automatically generate the Table of Contents)
              </span>
            </label>
            <textarea
              rows={12}
              placeholder="Write your article here...&#10;&#10;## Introduction&#10;Explain the problem...&#10;&#10;## The Strategy&#10;Detail the action steps..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="form-textarea"
              required
            />
          </div>

          {/* Submit Button */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "24px" }}>
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary"
              style={{ padding: "12px 32px", fontSize: "1rem" }}
            >
              {submitting ? "Publishing..." : "Publish Blog Post Now"}
            </button>
          </div>
        </form>
      </div>

      {/* Existing Blogs List */}
      <div className="admin-card">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <div>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700 }}>Published Articles</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
              Currently live in dummy storage: {blogs.length} posts
            </p>
          </div>
        </div>

        {loading ? (
          <p style={{ color: "var(--text-muted)", padding: "20px 0" }}>Loading posts...</p>
        ) : blogs.length === 0 ? (
          <p style={{ color: "var(--text-muted)", padding: "20px 0" }}>No posts created yet.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Article Title</th>
                  <th>Category</th>
                  <th>Published Date</th>
                  <th>Reading Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((b) => (
                  <tr key={b.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: "var(--text-main)" }}>{b.title}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-subtle)" }}>/blog/{b.slug}</div>
                    </td>
                    <td>
                      <span
                        style={{
                          background: "var(--primary-light)",
                          color: "var(--primary)",
                          padding: "3px 8px",
                          borderRadius: "4px",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                        }}
                      >
                        {b.category}
                      </span>
                    </td>
                    <td>{b.publishedAt}</td>
                    <td>{b.readingTime}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <Link
                          href={`/blog/${b.slug}`}
                          className="btn-outline"
                          style={{ padding: "4px 8px", fontSize: "0.75rem" }}
                          target="_blank"
                          title="Open Live Post"
                        >
                          <ExternalLink size={13} /> View
                        </Link>
                        <button
                          onClick={() => handleDelete(b.slug, b.title)}
                          className="action-btn-danger"
                          title="Delete Post"
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
