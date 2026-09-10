"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BlogPost } from "@/types/blog";
import { Search, PlusCircle, ArrowRight, BookOpen } from "lucide-react";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch("/api/blogs");
        const data = await res.json();
        if (data.success) {
          setBlogs(data.blogs);
        }
      } catch (err) {
        console.error("Error loading blogs:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  const categories = ["All", ...Array.from(new Set(blogs.map((b) => b.category)))];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featured = filteredBlogs[0];
  const listPosts = filteredBlogs.slice(1);

  return (
    <div>
      {/* Blog Page Hero Header */}
      <section style={{ padding: "64px 0 36px", borderBottom: "1px solid var(--border-hairline)", background: "#ffffff" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
            <div>
              <span className="section-tag">Marketing Publications</span>
              <h1 className="section-title blog-page-title">
                The Inventus Global <span style={{ color: "var(--primary)" }}>Journal</span>
              </h1>
              <p className="section-desc" style={{ maxWidth: "600px" }}>
                Step-by-step performance marketing blueprints, search engine optimization frameworks, and paid advertising analysis.
              </p>
            </div>

            <Link href="/admin" className="btn-primary" style={{ padding: "10px 20px" }}>
              <PlusCircle size={16} />
              Publish Article in Admin
            </Link>
          </div>

          {/* Search & Minimalist Filter Bar */}
          <div className="blog-filter-bar">
            <div className="blog-search-box" style={{ position: "relative", flex: 1, maxWidth: "380px", minWidth: "240px" }}>
              <Search size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
              <input
                type="text"
                placeholder="Search by topic, keyword, or title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px 10px 40px",
                  border: "1px solid var(--border-hairline)",
                  borderRadius: "6px",
                  fontSize: "0.92rem",
                  outline: "none",
                  fontFamily: "inherit",
                }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "6px",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      background: isActive ? "var(--primary)" : "transparent",
                      color: isActive ? "#ffffff" : "var(--text-body)",
                      border: `1px solid ${isActive ? "var(--primary)" : "var(--border-hairline)"}`,
                      transition: "all 0.15s ease",
                      cursor: "pointer",
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Magazine Editorial Layout */}
      <section className="section" style={{ background: "#ffffff", paddingTop: "50px" }}>
        <div className="container">
          {loading ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-muted)" }}>
              <p style={{ fontSize: "1.1rem" }}>Loading articles...</p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 20px" }}>
              <BookOpen size={44} style={{ color: "#94a3b8", margin: "0 auto 14px" }} />
              <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "6px" }}>No articles match your search</h3>
              <p style={{ color: "var(--text-muted)", marginBottom: "18px" }}>
                Try adjusting your search query or switching to another category.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="btn-outline"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div>
              {/* Featured Headline Story */}
              {featured && !searchQuery && selectedCategory === "All" && (
                <article className="blog-featured-article">
                  <Link href={`/blog/${featured.slug}`} className="blog-featured-img">
                    <img src={featured.coverImage} alt={featured.title} />
                  </Link>

                  <div>
                    <span className="magazine-tag">{featured.category}</span>
                    <Link href={`/blog/${featured.slug}`}>
                      <h2 className="blog-featured-title">
                        {featured.title}
                      </h2>
                    </Link>
                    <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: "1.7", marginBottom: "20px" }}>
                      {featured.excerpt}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                      <span style={{ fontWeight: 700, color: "var(--text-heading)" }}>{featured.author.name}</span>
                      <span>•</span>
                      <span>{featured.publishedAt}</span>
                      <span>•</span>
                      <span>{featured.readingTime}</span>
                    </div>
                  </div>
                </article>
              )}

              {/* Editorial Article Feed */}
              <div style={{ display: "flex", flexDirection: "column", gap: "32px", maxWidth: "900px" }}>
                {(searchQuery || selectedCategory !== "All" ? filteredBlogs : listPosts).map((blog) => (
                  <article key={blog.id} className="blog-list-item">
                    <div>
                      <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.8px", display: "block", marginBottom: "6px" }}>
                        {blog.category}
                      </span>
                      <Link href={`/blog/${blog.slug}`}>
                        <h3 className="blog-list-title">
                          {blog.title}
                        </h3>
                      </Link>
                      <p style={{ color: "var(--text-body)", fontSize: "0.94rem", lineHeight: "1.65", margin: "0 0 12px" }}>
                        {blog.excerpt}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.82rem", color: "var(--text-muted)" }}>
                        <span style={{ fontWeight: 600, color: "var(--text-heading)" }}>{blog.author.name}</span>
                        <span>•</span>
                        <span>{blog.publishedAt}</span>
                        <span>•</span>
                        <span>{blog.readingTime}</span>
                      </div>
                    </div>

                    <Link href={`/blog/${blog.slug}`} className="blog-list-img">
                      <img src={blog.coverImage} alt={blog.title} />
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
