"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, BookOpen, Clock, Calendar, User } from "lucide-react";
import { BlogPost } from "@/types/blog";

interface FeaturedArticlesProps {
  blogs: BlogPost[];
}

export default function FeaturedArticles({ blogs }: FeaturedArticlesProps) {
  if (!blogs || blogs.length === 0) return null;

  // Recent blogs delivered in chronological order (most recent first)
  const featured = blogs[0];
  const secondaryBlogs = blogs.slice(1, 3);
  const count = blogs.length;

  return (
    <section id="featured-articles" className="articles-master-section">
      <div className="container">
        {/* Section Header */}
        <div className="articles-header-wrap">
          <div className="articles-header-left">
            <div className="phase-badge phase-badge-light">
              <span className="phase-pulse-dot" />
              <span>WHAT&apos;S NEW TODAY</span>
            </div>
            <h2 className="articles-main-headline">
              Our Blogs
            </h2>
            <p className="articles-main-sub">
              Stay ahead with the latest insights and growth playbooks from Inventus Global – your edge in the digital marketing landscape.
            </p>
          </div>

          <Link href="/blog" className="articles-view-all-btn">
            <span>Browse All Blogs</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Dynamic Bento Showcase Grid adapting to 1, 2, or 3 articles */}
        <div
          className={`articles-bento-grid ${count === 1
            ? "articles-grid-single"
            : count === 2
              ? "articles-grid-dual"
              : "articles-grid-trio"
            }`}
        >
          {/* Main Featured Hero Article (Left or Primary) */}
          <Link
            href={`/blog/${featured.slug}`}
            className="articles-hero-card"
            title={featured.title}
          >
            <div className="articles-hero-image-wrap">
              <Image
                src={featured.coverImage || "/placeholder-blog.jpg"}
                alt={featured.title}
                width={700}
                height={400}
                className="articles-hero-img"
                unoptimized
              />
              <div className="articles-hero-overlay" />

              {/* Floating Meta Badges */}
              <div className="articles-hero-badge-row">
                <span className="articles-cat-badge">{featured.category || "Growth"}</span>
                <span className="articles-read-time-badge">
                  <Clock size={12} />
                  <span>{featured.readingTime || "5 min read"}</span>
                </span>
              </div>
            </div>

            <div className="articles-hero-content">
              <h3 className="articles-hero-title">{featured.title}</h3>
              <p className="articles-hero-excerpt">
                {featured.excerpt || "Explore the strategic frameworks, technical setups, and measurable tactics tested across real campaigns."}
              </p>

              <div className="articles-hero-footer">
                <div className="articles-author-meta">
                  {featured.author?.avatar ? (
                    <Image
                      src={featured.author.avatar}
                      alt={featured.author.name || "Inventus Team"}
                      width={36}
                      height={36}
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
                      <Calendar size={11} />
                      <span>{featured.publishedAt || "Recently Published"}</span>
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

          {/* Secondary Articles: if 1 secondary exists (2 total), or 2 secondaries exist (3 total) */}
          {secondaryBlogs.length > 0 && (
            <div className="articles-side-column">
              {secondaryBlogs.map((b) => (
                <Link
                  key={b.id || b.slug}
                  href={`/blog/${b.slug}`}
                  className="articles-side-card"
                  title={b.title}
                >
                  <div className="articles-side-thumb-wrap">
                    <Image
                      src={b.coverImage || "/placeholder-blog.jpg"}
                      alt={b.title}
                      width={500}
                      height={260}
                      className="articles-side-thumb"
                      unoptimized
                    />
                    <div className="articles-hero-overlay" />
                    <div className="articles-side-badge-row">
                      <span className="articles-cat-badge">{b.category || "Growth"}</span>
                      <span className="articles-read-time-badge">
                        <Clock size={11} />
                        <span>{b.readingTime || "4 min read"}</span>
                      </span>
                    </div>
                  </div>

                  <div className="articles-side-content">
                    <h4 className="articles-side-title">{b.title}</h4>
                    <p className="articles-side-excerpt">
                      {b.excerpt || "Actionable marketing insights and technical performance optimization."}
                    </p>

                    <div className="articles-side-footer">
                      <div className="articles-author-meta">
                        {b.author?.avatar ? (
                          <Image
                            src={b.author.avatar}
                            alt={b.author.name || "Inventus Team"}
                            width={28}
                            height={28}
                            className="articles-author-avatar"
                          />
                        ) : (
                          <div className="articles-author-avatar-fallback" style={{ width: 28, height: 28 }}>
                            <User size={12} />
                          </div>
                        )}
                        <div>
                          <div className="articles-author-name" style={{ fontSize: "0.78rem" }}>
                            {b.author?.name || "Inventus Team"}
                          </div>
                          <div className="articles-publish-date" style={{ fontSize: "0.68rem" }}>
                            <Calendar size={10} />
                            <span>{b.publishedAt || "Recently Published"}</span>
                          </div>
                        </div>
                      </div>

                      <span className="articles-read-more-affordance">
                        <span>Read Story</span>
                        <ArrowRight size={13} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
