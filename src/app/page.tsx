import type { Metadata } from "next";
import pool from "@/lib/db";
import type { RowDataPacket } from "mysql2";
import { BlogPost } from "@/types/blog";
import { getAllBlogs } from "@/utils/blogStore";
import InteractiveParticleHero from "@/components/InteractiveParticleHero";
import OurServices from "@/components/OurServices";
import AnatomyOfGrowthSection from "@/components/AnatomyOfGrowthSection";
import CaseStudySpotlight from "@/components/CaseStudySpotlight";
import ContinuousLearningMarquee from "@/components/ContinuousLearningMarquee";
import FeaturedArticles from "@/components/FeaturedArticles";
import BottomConversionCta from "@/components/BottomConversionCta";
import ScrollContactModal from "@/components/ScrollContactModal";

export const metadata: Metadata = {
  title: "Inventus Global | Digital Marketing & Growth Agency Navi Mumbai",
  description:
    "Data-driven digital marketing, Google PPC campaigns, ROI-focused organic SEO, social media marketing, and Next.js web applications in Satra Plaza, Vashi, Navi Mumbai.",
};

export const revalidate = 1800; // 30-minute ISR edge caching (super-fast TTFB, protects database)

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
      {/* Phase 01: Hero Interactive Particle Engine (Atom Network Physics) */}
      <InteractiveParticleHero />

      <div className="phase-boundary-line" />

      {/* Phase 02: Anatomy of a Growth Campaign (Editorial Funnel) */}
      <AnatomyOfGrowthSection />

      <div className="phase-boundary-line" />

      {/* Phase 03: Our Services Section (Future-Proof Carousel) */}
      <OurServices />

      <div className="phase-boundary-line" />

      {/* Phase 04: Case Study Feature Spotlight (Interactive Multi-Industry Showcase) */}
      <CaseStudySpotlight />

      <div className="phase-boundary-line" />

      {/* Phase 05: We Grow by Continuous Learning - Continuous Marquee Section */}
      <ContinuousLearningMarquee />

      <div className="phase-boundary-line" />

      {/* Phase 06: Elevated Editorial Articles & Playbooks Section (Bento Grid) */}
      <FeaturedArticles blogs={recentBlogs} />

      <div className="phase-boundary-line" />

      {/* Phase 07: High-Impact Conversion Command Stage */}
      <BottomConversionCta />

      {/* Scroll-Triggered Growth Audit & Contact Popup (Activates between Phase 02 and Phase 03) */}
      <ScrollContactModal />
    </div>
  );
}
