import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone, TrendingUp, ShieldCheck, Award, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import pool from "@/lib/db";
import type { RowDataPacket } from "mysql2";
import { BlogPost } from "@/types/blog";
import { getAllBlogs } from "@/utils/blogStore";
import OurServices from "@/components/OurServices";
import CaseStudySpotlight from "@/components/CaseStudySpotlight";
import ContinuousLearningMarquee from "@/components/ContinuousLearningMarquee";
import FeaturedArticles from "@/components/FeaturedArticles";
import ScrollContactModal from "@/components/ScrollContactModal";

export const metadata: Metadata = {
  title: "Inventus Global | Digital Marketing & Growth Agency Navi Mumbai",
  description:
    "Data-driven digital marketing, Google PPC campaigns, ROI-focused organic SEO, social media marketing, and Next.js web applications in Satra Plaza, Vashi, Navi Mumbai.",
};

export const revalidate = 0; // Fetch fresh blogs on page visit

async function getRecentBlogs(): Promise<BlogPost[]> {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT 
        id, slug, title, excerpt, content, cover_image, category, tags,
        author_name, author_role, author_avatar, reading_time,
        published_at
       FROM \`blogs\`
       WHERE is_published = 1
       ORDER BY published_at DESC, created_at DESC
       LIMIT 3`
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
    console.error('Failed to load recent blogs for home page from MySQL:', error);
  }

  // Fallback to static blogs if database returns no records
  return getAllBlogs().slice(0, 3);
}

export default async function HomePage() {
  const recentBlogs = await getRecentBlogs();

  return (
    <div>
      {/* Hero Section - Full 100vh Video Background */}
      <section className="hero-video-section">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hero-video-bg"
        >
          <source src="/hero_video.mp4" type="video/mp4" />
        </video>

        <div className="hero-overlay" />

        <div className="container">
          <div className="hero-content">
            <div className="phase-badge phase-badge-dark">
              <span className="phase-pulse-dot" />
              <span>PROVEN GROWTH STRATEGY</span>
            </div>

            <h1 className="hero-title">
              We don&apos;t just do Digital Marketing. We scale businesses.
            </h1>

            <p className="hero-subtitle">
              Inventus Global is a performance-driven digital marketing agency based in Navi Mumbai, specializing in scalable growth strategies that deliver measurable results.
            </p>

            {/* Hero Action Buttons */}
            <div className="hero-actions-row">
              <Link href="/contact" className="hero-btn-proposal">
                Get a free proposal
              </Link>

              <a href={`tel:${siteConfig.contact.primaryPhoneRaw}`} className="hero-btn-call">
                <Phone size={17} />
                <span>Call {siteConfig.contact.primaryPhone}</span>
              </a>
            </div>

            {/* Clean Editorial Proof Line */}
            <div className="hero-proof-row">
              <div className="hero-proof-item">
                <TrendingUp size={15} className="hero-proof-icon" />
                <div className="hero-proof-text">
                  <strong>4.8x</strong> <span>Target ROAS</span>
                </div>
              </div>
              <span className="hero-proof-sep">•</span>
              <div className="hero-proof-item">
                <ShieldCheck size={15} className="hero-proof-icon" />
                <div className="hero-proof-text">
                  <strong>100%</strong> <span>Transparent Attribution</span>
                </div>
              </div>
              <span className="hero-proof-sep">•</span>
              <div className="hero-proof-item">
                <Award size={15} className="hero-proof-icon" />
                <div className="hero-proof-text">
                  <strong>Google &amp; Meta</strong> <span>Certified</span>
                </div>
              </div>
              <span className="hero-proof-sep">•</span>
              <div className="hero-proof-item">
                <Sparkles size={15} className="hero-proof-icon" />
                <div className="hero-proof-text">
                  <strong>98%</strong> <span>Client Satisfaction</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="phase-boundary-line" />

      {/* Phase 02: Our Services Section (Future-Proof Carousel) */}
      <OurServices />

      <div className="phase-boundary-line" />

      {/* Phase 03: Case Study Feature Spotlight (Interactive Multi-Industry Showcase) */}
      <CaseStudySpotlight />

      <div className="phase-boundary-line" />

      {/* Phase 04: We Grow by Continuous Learning - Continuous Marquee Section */}
      <ContinuousLearningMarquee />

      <div className="phase-boundary-line" />

      {/* Phase 05: Elevated Editorial Articles & Playbooks Section (Bento Grid) */}
      <FeaturedArticles blogs={recentBlogs} />

      <div className="phase-boundary-line" />

      {/* Phase 06: Bottom Conversion Section */}
      <section className="home-bottom-cta-section">
        <div className="container">
          <div className="home-bottom-cta-card">
            <div className="phase-badge phase-badge-dark" style={{ margin: "0 auto 20px" }}>
              <span className="phase-pulse-dot" />
              <span>PHASE 06 • INITIATE GROWTH PARTNERSHIP</span>
            </div>
            <h2 className="home-bottom-cta-title">
              Ready to Accelerate Your <span className="future-title-accent">Digital Revenue?</span>
            </h2>
            <p className="home-bottom-cta-desc">
              Connect directly with our senior growth team at Satra Plaza, Vashi, or explore our proven playbooks to unlock your brand&apos;s full potential.
            </p>
            <div className="home-bottom-cta-actions">
              <Link href="/contact" className="home-cta-btn-primary">
                <span>Book Free Growth Consultation</span>
                <ArrowRight size={17} />
              </Link>
              <a href={`tel:${siteConfig.contact.primaryPhoneRaw}`} className="home-cta-btn-secondary">
                <Phone size={17} />
                <span>Call {siteConfig.contact.primaryPhone}</span>
              </a>
            </div>
            <div className="home-bottom-cta-meta">
              <span className="home-cta-meta-item">✓ Office 1209, Satra Plaza, Vashi</span>
              <span className="home-cta-meta-sep">•</span>
              <span className="home-cta-meta-item">✓ No Obligation Strategy Audit</span>
              <span className="home-cta-meta-sep">•</span>
              <span className="home-cta-meta-item">✓ 4-Hour Response Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll-Triggered Growth Audit & Contact Popup (Activates between Phase 02 and Phase 03) */}
      <ScrollContactModal />
    </div>
  );
}
