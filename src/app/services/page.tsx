"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import RoiCalculator from "@/components/RoiCalculator";
import {
  Target,
  Search,
  Share2,
  Code2,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Zap,
  BarChart,
  Layers,
} from "lucide-react";

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const services = [
    {
      id: "ppc",
      title: "Paid Advertising (Google & Meta PPC)",
      icon: <Target size={20} />,
      tagline: "Turn Ad Spend Into Predictable Lead Generation & High-Ticket Sales",
      desc: "We don't simply bid on keywords; we construct comprehensive paid acquisition funnels. From negative keyword automation to high-converting landing page variants, our campaigns are engineered to maximize your return on ad spend (ROAS).",
      deliverables: [
        "Full competitor ad analysis & high-intent keyword mapping",
        "A/B testing of ad creative copies, headlines, and callout assets",
        "Server-side tracking & Google Tag Manager (GTM) setup for 100% conversion accuracy",
        "Weekly bid optimizations and continuous negative keyword pruning",
        "Transparent real-time performance dashboard",
      ],
      metrics: "Average 3.8x ROAS across 180+ campaigns",
      timeline: "Campaigns live in 5–7 business days",
    },
    {
      id: "seo",
      title: "Search Engine Optimization (SEO)",
      icon: <Search size={20} />,
      tagline: "Dominate Google Rankings for Keywords That Actually Drive Revenue",
      desc: "Forget keyword stuffing and low-quality spam backlinks. Modern SEO requires deep technical hygiene, semantic content clusters, and authoritative digital PR that positions your brand as the definitive authority in your industry.",
      deliverables: [
        "In-depth Technical SEO audit (Core Web Vitals, crawl budget, canonicals)",
        "Topic cluster content roadmap targeting commercial search intent",
        "High-authority digital PR and editorial backlink acquisition",
        "JSON-LD Schema implementation for rich snippets and AI search visibility",
        "Monthly keyword movement and organic pipeline attribution reports",
      ],
      metrics: "Average +240% organic traffic growth within 6 months",
      timeline: "Initial ranking improvements typically visible in 60–90 days",
    },
    {
      id: "smm",
      title: "Social Media Growth & Retargeting",
      icon: <Share2 size={20} />,
      tagline: "Build a Loyal Audience and Retarget Hot Prospects on Autopilot",
      desc: "We transform your social media channels from an empty broadcast feed into a customer acquisition machine. We pair high-retention short-form video content with hyper-targeted retargeting pixels to recapture engaged visitors.",
      deliverables: [
        "Short-form video reel scripting, editing, and hook optimization",
        "Custom carousel design engineered for high save and share rates",
        "Meta & LinkedIn retargeting funnel setup for warm visitors",
        "Community management and inbound lead triage",
        "Monthly follower-to-lead conversion analytics",
      ],
      metrics: "Average +180% engagement rate and 35% higher follower-to-lead rate",
      timeline: "Content calendar launched bi-weekly",
    },
    {
      id: "webdev",
      title: "Conversion Web Platforms (Next.js)",
      icon: <Code2 size={20} />,
      tagline: "Fast, Modern Websites Built Specifically to Convert Traffic into Leads",
      desc: "A beautiful website that loads in 4 seconds will lose 50% of its visitors before they even read your headline. We engineer custom, ultra-fast Next.js websites with sleek aesthetics, seamless mobile responsiveness, and high-converting CTAs.",
      deliverables: [
        "Custom UI/UX design wireframes focused on conversion rate optimization",
        "Modern Next.js (App Router) + TypeScript clean-code architecture",
        "Sub-second page load times with 95+ Google PageSpeed scores",
        "Built-in dynamic blog system with Table of Contents and SEO metadata",
        "Complete lead form integration with email/WhatsApp notifications",
      ],
      metrics: "95+ Google PageSpeed Score & 30% higher on-page conversion",
      timeline: "Typical turnkey website completed in 3–4 weeks",
    },
    {
      id: "content",
      title: "Content Marketing & Authority Copy",
      icon: <TrendingUp size={20} />,
      tagline: "Authoritative Copywriting That Educates, Persuades, and Sells",
      desc: "Great content does not just entertain; it systematically removes customer objections and establishes your business as the trusted industry leader. We create search-optimized articles, whitepapers, and sales pages.",
      deliverables: [
        "In-depth industry research and competitor gap identification",
        "SEO-optimized long-form articles with structured headings and key takeaways",
        "High-converting landing page copywriting that speaks to buyer psychology",
        "Email nurture sequences that warm up leads over 30 days",
        "Complete content distribution across LinkedIn and industry portals",
      ],
      metrics: "3x longer time-on-page and higher organic backlink attraction",
      timeline: "Published weekly or bi-weekly according to plan",
    },
    {
      id: "influencer",
      title: "Influencer Brand Campaigns",
      icon: <Sparkles size={20} />,
      tagline: "Vetted Creator Partnerships Delivering Explosive Social Endorsements",
      desc: "Stop wasting money on influencers with fake followers. We identify, negotiate with, and manage niche creators whose audiences directly match your target demographics for genuine social proof and rapid brand recognition.",
      deliverables: [
        "Influencer authenticity and audience demographic vetting",
        "Campaign creative brief preparation and contract negotiation",
        "Tracking link and custom discount code attribution setup",
        "Content approval, scheduling, and multi-channel amplification",
        "Comprehensive ROI and brand lift post-campaign report",
      ],
      metrics: "Over 2M+ combined impressions across creator networks",
      timeline: "Campaigns planned and launched within 14 days",
    },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const serviceParam = params.get("service");
      if (serviceParam) {
        const foundIdx = services.findIndex((s) => s.id === serviceParam);
        if (foundIdx !== -1) {
          setActiveTab(foundIdx);
        }
      }
    }
  }, []);

  const current = services[activeTab];

  return (
    <div>
      {/* Header */}
      <section className="blog-header-section" style={{ padding: "64px 0 44px" }}>
        <div className="container">
          <span className="section-tag">Performance Services</span>
          <h1 className="section-title services-hero-title">
            Engineered For Measurable <span className="gradient-text">ROI & Scale.</span>
          </h1>
          <p className="section-desc" style={{ maxWidth: "660px", fontSize: "1.12rem" }}>
            We combine high-intent paid traffic, organic search dominance, and conversion web development to build reliable growth engines.
          </p>
        </div>
      </section>

      {/* Interactive Tabbed Services Switcher */}
      <section className="section" style={{ background: "#ffffff" }}>
        <div className="container">
          {/* Tabs row */}
          <div className="services-tabs-bar">
            {services.map((srv, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={srv.id}
                  onClick={() => setActiveTab(idx)}
                  className="services-tab-btn"
                  style={{
                    background: isActive ? "var(--primary)" : "#f9fafb",
                    color: isActive ? "#ffffff" : "var(--text-heading)",
                    border: `1px solid ${isActive ? "var(--primary)" : "var(--border-light)"}`,
                  }}
                >
                  {srv.icon}
                  <span>{srv.title.split(" (")[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Active Service Details Card */}
          <div className="services-detail-card">
            <div>
              <span style={{ fontSize: "0.82rem", fontWeight: 800, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "1px" }}>
                Service Deep Dive
              </span>
              <h2 className="services-detail-title">
                {current.title}
              </h2>
              <p style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--primary)", marginBottom: "14px" }}>
                {current.tagline}
              </p>
              <p style={{ color: "var(--text-body)", fontSize: "0.98rem", lineHeight: "1.7", marginBottom: "24px" }}>
                {current.desc}
              </p>

              <div className="services-cta-row">
                <a
                  href={`https://api.whatsapp.com/send?phone=919987682853&text=Hi%20Inventus%20Global,%20I%20am%20interested%20in%20your%20${encodeURIComponent(current.title)}%20services.%20Can%20we%20discuss?`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ padding: "11px 22px" }}
                >
                  Inquire for This Service <ArrowRight size={15} />
                </a>

                <Link href="/case-studies" className="btn-outline" style={{ padding: "10px 20px" }}>
                  View Related Case Studies
                </Link>
              </div>
            </div>

            {/* Deliverables & Timelines */}
            <div className="services-deliverables-box">
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)", marginBottom: "16px" }}>
                Key Deliverables Included:
              </h3>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: "10px" }}>
                {current.deliverables.map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "0.9rem", color: "var(--text-body)", lineHeight: "1.5" }}>
                    <CheckCircle2 size={16} style={{ color: "var(--primary)", flexShrink: 0, marginTop: "3px" }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  <strong>Benchmark Metric:</strong> {current.metrics}
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  <strong>Turnaround Timeline:</strong> {current.timeline}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Interactive ROI Calculator */}
      <section className="section" style={{ background: "#fafafa", borderTop: "1px solid var(--border-light)" }}>
        <div className="container">
          <RoiCalculator />
        </div>
      </section>

      {/* Bottom Consultation CTA */}
      <section style={{ background: "#111827", color: "#ffffff", padding: "64px 0", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: "720px" }}>
          <span style={{ color: "#f59e0b", fontWeight: 800, fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "1px" }}>
            Custom Retainers Available
          </span>
          <h2 style={{ fontSize: "2.2rem", fontWeight: 800, margin: "12px 0 14px", color: "#ffffff" }}>
            Not Sure Which Channel is Right For You?
          </h2>
          <p style={{ color: "#9ca3af", fontSize: "1rem", marginBottom: "28px", lineHeight: "1.6" }}>
            Let our senior growth architects at Satra Plaza, Vashi analyze your current numbers and recommend the exact channel mix to maximize your ROI.
          </p>
          <Link href="/contact" className="btn-primary" style={{ padding: "13px 28px", fontSize: "0.98rem" }}>
            Book a Free 30-Minute Growth Audit
          </Link>
        </div>
      </section>
    </div>
  );
}
