import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
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

export default function HomePage() {
  const allBlogs = getAllBlogs();

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
              <span>PHASE 01 • PROVEN GROWTH STRATEGY</span>
            </div>

            <h1 className="hero-title">
              Your trusted digital marketing agency in Navi Mumbai
            </h1>

            <p className="hero-subtitle">
              We help brands rank in Google, dominate social media, get cited by AI search, and turn visibility into qualified leads. Strategy, SEO, SMM, and conversion web platforms — one team, measured against results.
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
                <strong>{siteConfig.stats.revenueGenerated}</strong> <span>Revenue Generated</span>
              </div>
              <span className="hero-proof-sep">•</span>
              <div className="hero-proof-item">
                <strong>{siteConfig.stats.campaignsExecuted}</strong> <span>Campaigns Executed</span>
              </div>
              <span className="hero-proof-sep">•</span>
              <div className="hero-proof-item">
                <strong>{siteConfig.stats.averageRoas}</strong> <span>Average ROAS</span>
              </div>
              <span className="hero-proof-sep">•</span>
              <div className="hero-proof-item">
                <strong>{siteConfig.stats.clientRetention}</strong> <span>Client Retention</span>
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
      <FeaturedArticles blogs={allBlogs} />

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
