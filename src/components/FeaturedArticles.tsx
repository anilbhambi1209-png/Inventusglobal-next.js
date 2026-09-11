"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, BookOpen, Clock, Calendar, User } from "lucide-react";
import { BlogPost } from "@/types/blog";

interface FeaturedArticlesProps {
  blogs: BlogPost[];
}

export default function FeaturedArticles({ blogs }: FeaturedArticlesProps) {
  // Sort or pick high-value blogs (avoiding short dummy posts if richer ones exist)
  const validBlogs = [...blogs].sort((a, b) => {
    // Prefer posts with longer content or established IDs
    return (b.content?.length || 0) - (a.content?.length || 0);
  });

  const featured = validBlogs[0] || blogs[0];
  const secondaryBlogs = validBlogs.slice(1, 3);

  if (!featured) return null;

  return (
    <section id="featured-articles" className="articles-master-section">
      <div className="container">
        {/* Section Header */}
        <div className="articles-header-wrap">
          <div className="articles-header-left">
            <div className="articles-eyebrow">
              <BookOpen size={14} />
              <span>MARKETING PUBLICATIONS & PLAYBOOKS</span>
            </div>
            <h2 className="articles-main-headline">
              Latest Insights &amp; <span className="future-title-accent">Growth Playbooks</span>
            </h2>
            <p className="articles-main-sub">
              No surface-level theory. Actionable breakdowns of algorithm shifts, high-converting PPC funnels, and modern web architecture.
            </p>
          </div>

          <Link href="/blog" className="articles-view-all-btn">
            <span>Browse All Articles</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Editorial Bento Showcase Grid */}
        <div className="articles-bento-grid">
          {/* Main Featured Hero Article (Left) */}
          <Link href={`/blog/${featured.slug}`} className="articles-hero-card">
            <div className="articles-hero-image-wrap">
              <Image
                src={featured.coverImage}
                alt={featured.title}
                width={700}
                height={400}
                className="articles-hero-img"
              />
              <div className="articles-hero-overlay" />

              {/* Floating Meta Badges */}
              <div className="articles-hero-badge-row">
                <span className="articles-cat-badge">{featured.category}</span>
                <span className="articles-read-time-badge">
                  <Clock size={13} />
                  <span>{featured.readingTime || "5 min read"}</span>
                </span>
              </div>
            </div>

            <div className="articles-hero-content">
              <h3 className="articles-hero-title">{featured.title}</h3>
              <p className="articles-hero-excerpt">{featured.excerpt}</p>

              <div className="articles-hero-footer">
                <div className="articles-author-meta">
                  {featured.author?.avatar ? (
                    <Image
                      src={featured.author.avatar}
                      alt={featured.author.name}
                      width={38}
                      height={38}
                      className="articles-author-avatar"
                    />
                  ) : (
                    <div className="articles-author-avatar-fallback">
                      <User size={14} />
                    </div>
                  )}
                  <div>
                    <div className="articles-author-name">{featured.author?.name || "Inventus Team"}</div>
                    <div className="articles-publish-date">
                      <Calendar size={12} />
                      <span>{featured.publishedAt}</span>
                    </div>
                  </div>
                </div>

                <span className="articles-read-more-affordance">
                  <span>Read Guide</span>
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </div>
          </Link>

          {/* Secondary Stacked Articles (Right) */}
          <div className="articles-side-column">
            {secondaryBlogs.map((b) => (
              <Link
                key={b.id || b.slug}
                href={`/blog/${b.slug}`}
                className="articles-side-card"
              >
                <div className="articles-side-thumb-wrap">
                  <Image src={b.coverImage} alt={b.title} width={280} height={180} className="articles-side-thumb" />
                  <span className="articles-side-cat-pill">{b.category}</span>
                </div>

                <div className="articles-side-content">
                  <div className="articles-side-meta-top">
                    <span className="articles-side-time">
                      <Clock size={12} />
                      <span>{b.readingTime || "4 min read"}</span>
                    </span>
                    <span className="articles-side-dot">•</span>
                    <span className="articles-side-date">{b.publishedAt}</span>
                  </div>

                  <h4 className="articles-side-title">{b.title}</h4>
                  <p className="articles-side-excerpt">{b.excerpt}</p>

                  <div className="articles-side-footer">
                    <span className="articles-side-author">{b.author?.name || "Inventus Team"}</span>
                    <span className="articles-side-link-text">
                      <span>Read Story</span>
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
