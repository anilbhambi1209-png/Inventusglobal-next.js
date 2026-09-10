import Link from "next/link";
import { getAllBlogs } from "@/utils/blogStore";
import OurServices from "@/components/OurServices";
import CaseStudySpotlight from "@/components/CaseStudySpotlight";
import ContinuousLearningMarquee from "@/components/ContinuousLearningMarquee";
import FeaturedArticles from "@/components/FeaturedArticles";
import { ArrowRight, Phone } from "lucide-react";

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
            <div className="hero-eyebrow">
              Digital marketing agency in Navi Mumbai, Mumbai &amp; Thane
            </div>

            <h1 className="hero-title">
              Your trusted digital marketing agency in Navi Mumbai
            </h1>

            <p className="hero-subtitle">
              We help brands rank in Google, dominate social media, get cited by AI search, and turn visibility into qualified leads. Strategy, SEO, SMM, and conversion web platforms — one team, measured against results.
            </p>

            {/* Hero Action Buttons - Reference Layout */}
            <div className="hero-actions-row">
              <Link href="/contact" className="hero-btn-proposal">
                Get a free proposal
              </Link>

              <a href="tel:+919987682853" className="hero-btn-call">
                <Phone size={17} />
                <span>Call +91 99876 82853</span>
              </a>
            </div>

            {/* Clean Editorial Proof Line */}
            <div className="hero-proof-row">
              <div className="hero-proof-item">
                <strong>₹18.5 Cr+</strong> <span>Revenue Generated</span>
              </div>
              <span className="hero-proof-sep">•</span>
              <div className="hero-proof-item">
                <strong>500+</strong> <span>Campaigns Executed</span>
              </div>
              <span className="hero-proof-sep">•</span>
              <div className="hero-proof-item">
                <strong>3.8x</strong> <span>Average ROAS</span>
              </div>
              <span className="hero-proof-sep">•</span>
              <div className="hero-proof-item">
                <strong>98%</strong> <span>Client Retention</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Our Services Section (SEO, SMM, Web Development) */}
      <OurServices />

      {/* Case Study Feature Spotlight (Interactive Multi-Industry Showcase) */}
      <CaseStudySpotlight />

      {/* We Grow by Continuous Learning - Continuous Marquee Section */}
      <ContinuousLearningMarquee />

      {/* Elevated Editorial Articles & Playbooks Section */}
      <FeaturedArticles blogs={allBlogs} />

      {/* Bottom Conversion Section */}
      <section className="home-bottom-cta-section">
        <div className="container">
          <div className="home-bottom-cta-card">
            <div className="home-bottom-cta-badge">
              <span>GET IN TOUCH WITH SENIOR STRATEGISTS</span>
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
              <a href="tel:+919987682853" className="home-cta-btn-secondary">
                <Phone size={17} />
                <span>Call +91 99876 82853</span>
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
    </div>
  );
}
