import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getBlogBySlug, getAllBlogs, slugify } from "@/utils/blogStore";
import ReadingProgress from "@/components/ReadingProgress";
import TableOfContents from "@/components/TableOfContents";
import ShareButtons from "@/components/ShareButtons";
import { ArrowLeft, Calendar, Clock, Sparkles } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const blogs = getAllBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Not Found | Inventus Global",
    };
  }

  return {
    title: `${blog.title} | Inventus Global`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: "article",
      publishedTime: blog.publishedAt,
      authors: [blog.author.name],
      images: [
        {
          url: blog.coverImage,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const allBlogs = getAllBlogs();
  const relatedBlogs = allBlogs
    .filter((b) => b.slug !== slug)
    .slice(0, 2);

  const renderFormattedContent = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let currentParagraph: string[] = [];
    let currentList: string[] = [];

    const flushParagraph = (keyPrefix: string) => {
      if (currentParagraph.length > 0) {
        const text = currentParagraph.join(" ").trim();
        if (text) {
          elements.push(
            <p key={`${keyPrefix}-p-${elements.length}`}>{text}</p>
          );
        }
        currentParagraph = [];
      }
    };

    const flushList = (keyPrefix: string) => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`${keyPrefix}-ul-${elements.length}`}>
            {currentList.map((item, idx) => (
              <li key={idx}>
                {item.includes("**") ? renderBoldText(item) : item}
              </li>
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    const renderBoldText = (text: string) => {
      const parts = text.split(/(\*\*.*?\*\*)/g);
      return parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      if (!trimmed) {
        flushParagraph(`line-${index}`);
        flushList(`line-${index}`);
        return;
      }

      if (trimmed.startsWith("### ")) {
        flushParagraph(`line-${index}`);
        flushList(`line-${index}`);
        const title = trimmed.replace("### ", "").trim();
        const id = slugify(title);
        elements.push(
          <h3 id={id} key={`h3-${index}`}>
            {title}
          </h3>
        );
      } else if (trimmed.startsWith("## ")) {
        flushParagraph(`line-${index}`);
        flushList(`line-${index}`);
        const title = trimmed.replace("## ", "").trim();
        const id = slugify(title);
        elements.push(
          <h2 id={id} key={`h2-${index}`}>
            {title}
          </h2>
        );
      } else if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
        flushParagraph(`line-${index}`);
        currentList.push(trimmed.slice(2).trim());
      } else if (/^\d+\.\s/.test(trimmed)) {
        flushParagraph(`line-${index}`);
        currentList.push(trimmed.replace(/^\d+\.\s/, "").trim());
      } else if (trimmed.startsWith("> ")) {
        flushParagraph(`line-${index}`);
        flushList(`line-${index}`);
        elements.push(
          <blockquote key={`quote-${index}`}>
            {trimmed.replace(/^>\s*/, "")}
          </blockquote>
        );
      } else {
        currentParagraph.push(trimmed);
      }
    });

    flushParagraph("final");
    flushList("final");

    return elements;
  };

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
              {blog.author.avatar && (
                <Image
                  src={blog.author.avatar}
                  alt={blog.author.name}
                  width={46}
                  height={46}
                  className="author-avatar-large"
                />
              )}
              <div>
                <div className="author-text-name">{blog.author.name}</div>
                <div className="author-text-role">{blog.author.role}</div>
              </div>
            </div>

            {/* Date & Read time */}
            <div className="article-stats">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                <Calendar size={15} />
                {blog.publishedAt}
              </span>
              <span>•</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                <Clock size={15} />
                {blog.readingTime}
              </span>
            </div>
          </div>

          {/* Hero Cover Image */}
          <div className="article-hero-image-wrap">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              width={1200}
              height={600}
              priority
              className="article-hero-image"
            />
          </div>
        </div>
      </header>

      {/* Main Article Section with Table of Contents Layout */}
      <div className="container">
        <div className="article-layout">
          {/* Sticky Table of Contents Sidebar */}
          <TableOfContents items={blog.tableOfContents || []} />

          {/* Article Main Body */}
          <main className="article-main">
            {/* Neil Patel Key Summary Callout Box */}
            <div
              style={{
                background: "#fffaf7",
                border: "1px solid #fed7aa",
                borderLeft: "4px solid var(--primary)",
                borderRadius: "var(--radius-sm)",
                padding: "20px 24px",
                marginBottom: "32px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 700, color: "var(--primary)", marginBottom: "6px", fontSize: "0.92rem" }}>
                <Sparkles size={16} />
                <span>Quick Summary</span>
              </div>
              <p style={{ color: "#374151", fontSize: "1rem", margin: 0, lineHeight: "1.65" }}>
                {blog.excerpt}
              </p>
            </div>

            {/* Formatted Article Content */}
            <div className="article-content">
              {renderFormattedContent(blog.content)}
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginTop: "36px" }}>
                <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>
                  Topics:
                </span>
                {blog.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: "#f4f4f5",
                      color: "#374151",
                      border: "1px solid #e5e7eb",
                      padding: "3px 10px",
                      borderRadius: "var(--radius-xs)",
                      fontSize: "0.8rem",
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
                marginTop: "44px",
                background: "#fafafa",
                border: "1px solid var(--border-light)",
                padding: "32px",
                borderRadius: "var(--radius-md)",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <span style={{ color: "var(--primary)", fontWeight: 800, fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "1px" }}>
                Inventus Global Marketing
              </span>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0, color: "var(--text-heading)", letterSpacing: "-0.3px" }}>
                Need Help Implementing These Strategies?
              </h3>
              <p style={{ color: "var(--text-body)", fontSize: "0.98rem", margin: 0, lineHeight: "1.6" }}>
                Our growth team based in Satra Plaza, Vashi builds and executes ROI-focused search, paid ad, and social campaigns for leading businesses.
              </p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <Link href="/blog" className="btn-primary" style={{ padding: "10px 20px" }}>
                  Explore More Guides
                </Link>
                <Link href="/admin" className="btn-outline" style={{ padding: "10px 20px" }}>
                  Add a New Post in Admin
                </Link>
              </div>
            </div>
          </main>
        </div>

        {/* Related Articles Section */}
        {relatedBlogs.length > 0 && (
          <section style={{ padding: "50px 0 70px", borderTop: "1px solid var(--border-light)" }}>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: "24px", color: "var(--text-heading)" }}>
              Recommended Articles
            </h2>
            <div className="blog-grid" style={{ marginTop: 0 }}>
              {relatedBlogs.map((item) => (
                <article key={item.id} className="blog-card">
                  <div className="blog-card-image-wrap">
                    <Image
                      src={item.coverImage}
                      alt={item.title}
                      width={400}
                      height={220}
                      className="blog-card-image"
                    />
                    <span className="blog-card-category">{item.category}</span>
                  </div>
                  <div className="blog-card-body">
                    <div className="blog-meta-row">
                      <span>{item.publishedAt}</span>
                      <span>•</span>
                      <span>{item.readingTime}</span>
                    </div>
                    <Link href={`/blog/${item.slug}`}>
                      <h3 className="blog-card-title">{item.title}</h3>
                    </Link>
                    <p className="blog-card-excerpt">{item.excerpt}</p>
                    <div className="blog-card-footer">
                      <span className="blog-author-name">{item.author.name}</span>
                      <Link href={`/blog/${item.slug}`} className="read-link">
                        Read <ArrowLeft size={13} style={{ transform: "rotate(180deg)" }} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
