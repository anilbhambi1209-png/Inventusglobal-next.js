"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import {
  Phone,
  Mail,
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  Sprout,
  Rocket,
  LineChart,
  Gem,
} from "lucide-react";
import { siteConfig } from "@/config/site";

interface ServiceItem {
  title: string;
  href: string;
}

interface GrowthPillar {
  id: string;
  label: string;
  icon: React.ReactNode;
  services: ServiceItem[];
}

const growthPillars: GrowthPillar[] = [
  {
    id: "earned-media",
    label: "Earned & Organic",
    icon: <Sprout size={18} />,
    services: [
      { title: "Search Engine Optimization (SEO)", href: "/services/search-engine-optimization" },
      { title: "AI Search & GEO Optimization", href: "/services/search-engine-optimization" },
      { title: "Local SEO & Google Maps", href: "/services/local-seo" },
      { title: "Authority Content Marketing", href: "/services/search-engine-optimization" },
      { title: "Digital PR & High-DA Mentions", href: "/services/search-engine-optimization" },
      { title: "Influencer Brand Partnerships", href: "/services/influencer-marketing" },
      { title: "Organic Social Media Growth", href: "/services/social-media-content" },
      { title: "Email Marketing & CRM Funnels", href: "/services/conversion-rate-optimization" },
      { title: "Search Everywhere Optimization", href: "/services/search-engine-optimization" },
    ],
  },
  {
    id: "paid-media",
    label: "Paid Media",
    icon: <Rocket size={18} />,
    services: [
      { title: "Google Search & Intent Ads", href: "/services/google-ads-ppc" },
      { title: "Meta Instagram & Facebook Ads", href: "/services/meta-ads-instagram" },
      { title: "Performance Max & Shopping", href: "/services/google-ads-ppc" },
      { title: "High-ROAS Retargeting Funnels", href: "/services/google-ads-ppc" },
      { title: "Instant WhatsApp CRM Funnels", href: "/services/conversion-rate-optimization" },
      { title: "LinkedIn B2B Account Targeting", href: "/services/linkedin-b2b-marketing" },
      { title: "YouTube Video Ad Campaigns", href: "/services/google-ads-ppc" },
      { title: "Creative & Copy Split Testing", href: "/services/conversion-rate-optimization" },
      { title: "Paid Ad Audit & Account Teardown", href: "/contact" },
    ],
  },
  {
    id: "data-analytics",
    label: "Tech & Platforms",
    icon: <LineChart size={18} />,
    services: [
      { title: "Next.js 15 Web Applications", href: "/services/nextjs-web-development" },
      { title: "Conversion Rate Optimization (CRO)", href: "/services/conversion-rate-optimization" },
      { title: "High-Converting Landing Funnels", href: "/services/nextjs-web-development" },
      { title: "Core Web Vitals & Speed Optimization", href: "/services/nextjs-web-development" },
      { title: "Headless CMS & Custom Portals", href: "/services/nextjs-web-development" },
      { title: "E-Commerce Store Engineering", href: "/services/nextjs-web-development" },
      { title: "Interactive Lead Calculators", href: "/services/nextjs-web-development" },
      { title: "CRM & WhatsApp API Integrations", href: "/services/conversion-rate-optimization" },
      { title: "Security & Cloud Infrastructure", href: "/services/nextjs-web-development" },
    ],
  },
  {
    id: "creative",
    label: "Social & Creative",
    icon: <Gem size={18} />,
    services: [
      { title: "Direct-Response Copywriting", href: "/services/social-media-content" },
      { title: "Short-Form Video & UGC Hooks", href: "/services/social-media-content" },
      { title: "Brand Identity & Visual Guidelines", href: "/services/social-media-content" },
      { title: "Editorial Playbooks & Reports", href: "/blog" },
      { title: "Creator Matchmaking & Direction", href: "/services/influencer-marketing" },
      { title: "High-ROAS Ad Banner Creatives", href: "/services/google-ads-ppc" },
      { title: "Customer Video Proof & Stories", href: "/case-studies" },
      { title: "Brand Voice & Positioning Strategy", href: "/about" },
      { title: "Creative Refresh & Fatigue Shield", href: "/services/social-media-content" },
    ],
  },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [activePillar, setActivePillar] = useState(0);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleServicesEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsServicesOpen(true);
  };

  const handleServicesLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setIsServicesOpen(false);
  }, [pathname]);

  // Lock body scroll and set class when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add("menu-open");
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("menu-open");
      document.body.style.overflow = "";
    }
    return () => {
      document.body.classList.remove("menu-open");
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const currentPillar = growthPillars[activePillar] || growthPillars[0];

  return (
    <div className="header-container">
      {/* Top Bar (Orange) */}
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-inner">
            <div className="top-bar-left">
              <a href={`tel:${siteConfig.contact.primaryPhoneRaw}`} className="top-bar-link">
                <Phone size={14} /> {siteConfig.contact.primaryPhone}
              </a>
              <a href={`mailto:${siteConfig.contact.email}`} className="top-bar-link top-bar-email">
                <Mail size={14} /> {siteConfig.contact.email}
              </a>
            </div>
            <div className="top-bar-right">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="top-bar-icon"
                title="Instagram"
                aria-label="Instagram"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="top-bar-icon"
                title="Facebook"
                aria-label="Facebook"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="top-bar-icon"
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar (White with Shadow) */}
      <header className="header-wrapper">
        <div className="container">
          <div className="header-inner">
            {/* Official Inventus Global Brand Logo */}
            <Link href="/" className="header-logo-link" aria-label="Inventus Global Homepage">
              <Image
                src="/inventus-logo.png"
                alt="Inventus Global Logo"
                width={166}
                height={32}
                priority
                className="header-logo-img"
                style={{
                  height: "32px",
                  width: "auto",
                  maxWidth: "175px",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="header-nav header-desktop-nav">
              <Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>
                Home
              </Link>
              <Link href="/about" className={`nav-link ${pathname === "/about" ? "active" : ""}`}>
                About
              </Link>

              {/* Services Navigation Item with Dropdown Trigger */}
              <div
                className="nav-item-services-wrap"
                onMouseEnter={handleServicesEnter}
                onMouseLeave={handleServicesLeave}
              >
                <Link
                  href="/services"
                  className={`nav-link nav-link-services ${pathname.startsWith("/services") ? "active" : ""} ${isServicesOpen ? "services-open" : ""}`}
                >
                  <span>Services</span>
                  <ChevronDown size={14} className={`services-chevron ${isServicesOpen ? "rotate" : ""}`} />
                </Link>
              </div>

              <Link href="/careers" className={`nav-link ${pathname.startsWith("/careers") ? "active" : ""}`}>
                Careers
              </Link>
              <Link href="/blog" className={`nav-link ${pathname.startsWith("/blog") ? "active" : ""}`}>
                Blog
              </Link>
              <Link href="/why-us" className={`nav-link ${pathname.startsWith("/why-us") ? "active" : ""}`}>
                Why Us
              </Link>
            </nav>

            {/* Action CTA */}
            <div className="header-cta">
              <Link href="/contact" className="btn-connect">
                <span>CONNECT</span>
                <ArrowRight size={14} className="btn-connect-arrow" />
              </Link>
              <button
                className="mobile-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Services Centered Mega Menu Dropdown - Clean & Simple */}
        {isServicesOpen && (
          <div
            className="services-mega-menu"
            onMouseEnter={handleServicesEnter}
            onMouseLeave={handleServicesLeave}
          >
            {/* Top Horizontal Growth Pillar Tabs Bar */}
            <div className="mega-tabs-bar">
              <div className="container">
                <div className="mega-tabs-inner">
                  <div className="mega-brand-label">
                    INVENTUS GLOBAL <span>offers:</span>
                  </div>

                  <div className="mega-tabs-list">
                    {growthPillars.map((pillar, idx) => {
                      const isActive = activePillar === idx;
                      return (
                        <button
                          key={pillar.id}
                          type="button"
                          className={`mega-tab-btn ${isActive ? "active" : ""}`}
                          onMouseEnter={() => setActivePillar(idx)}
                          onClick={() => setActivePillar(idx)}
                        >
                          <div className="mega-tab-icon-box">{pillar.icon}</div>
                          <span className="mega-tab-label">{pillar.label}</span>
                          {isActive && <div className="mega-active-caret" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Body - Clean Centered 3x3 Services Grid */}
            <div className="mega-panel-body">
              <div className="container">
                <div className="mega-centered-content">
                  {/* Clean 3-Column Simple Services List */}
                  <div className="mega-services-simple-grid">
                    {currentPillar.services.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="mega-simple-link"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        <span className="mega-simple-chevron">›</span>
                        <span className="mega-simple-title">{item.title}</span>
                      </Link>
                    ))}
                  </div>

                  {/* Clean Bottom Simple View All */}
                  <div className="mega-simple-bottom">
                    <Link
                      href="/services"
                      className="mega-simple-viewall"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      <span>Explore All Capabilities</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Dedicated Mobile Navigation Drawer & Backdrop */}
      {mobileMenuOpen && (
        <>
          <div
            className="mobile-backdrop"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <aside className="mobile-drawer" aria-label="Mobile Navigation Menu">
            <div className="mobile-drawer-header">
              <span className="mobile-drawer-title">Navigation</span>
              <button
                className="mobile-drawer-close"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close Navigation"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mobile-drawer-body">
              <Link href="/" className={`mobile-nav-link ${pathname === "/" ? "active" : ""}`} onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="/about" className={`mobile-nav-link ${pathname === "/about" ? "active" : ""}`} onClick={() => setMobileMenuOpen(false)}>
                About
              </Link>

              {/* Mobile Services Accordion */}
              <div className="mobile-services-section">
                <div className="mobile-services-header-row">
                  <Link
                    href="/services"
                    className={`mobile-nav-link mobile-services-text ${pathname.startsWith("/services") ? "active" : ""}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Services
                  </Link>
                  <button
                    className="mobile-services-toggle-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileServicesExpanded(!mobileServicesExpanded);
                    }}
                    aria-label="Toggle Services list"
                  >
                    <ChevronDown size={18} className={`mobile-chevron ${mobileServicesExpanded ? "rotate" : ""}`} />
                  </button>
                </div>

                {mobileServicesExpanded && (
                  <div className="mobile-services-accordion">
                    {growthPillars.map((pillar) => (
                      <div key={pillar.id} className="mobile-pillar-group">
                        <div className="mobile-pillar-title">
                          {pillar.icon}
                          <span>{pillar.label}</span>
                        </div>
                        <div className="mobile-pillar-links">
                          {pillar.services.map((srv) => (
                            <Link
                              key={srv.title}
                              href={srv.href}
                              className="mobile-sub-link"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <span>›</span> {srv.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                    <Link
                      href="/services"
                      className="mobile-view-all-services"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>Explore All Capabilities →</span>
                    </Link>
                  </div>
                )}
              </div>

              <Link href="/careers" className={`mobile-nav-link ${pathname.startsWith("/careers") ? "active" : ""}`} onClick={() => setMobileMenuOpen(false)}>
                Careers
              </Link>
              <Link href="/blog" className={`mobile-nav-link ${pathname.startsWith("/blog") ? "active" : ""}`} onClick={() => setMobileMenuOpen(false)}>
                Blog
              </Link>
              <Link href="/why-us" className={`mobile-nav-link ${pathname.startsWith("/why-us") ? "active" : ""}`} onClick={() => setMobileMenuOpen(false)}>
                Why Us
              </Link>
            </div>

            <div className="mobile-drawer-footer">
              <Link href="/contact" className="btn-mobile-connect" onClick={() => setMobileMenuOpen(false)}>
                <span>CONNECT WITH US</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}
