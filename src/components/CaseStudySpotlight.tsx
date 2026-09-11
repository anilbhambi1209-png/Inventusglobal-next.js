"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Zap,
  Building2,
  Sparkles,
  HeartPulse,
  Laptop,
} from "lucide-react";

interface CaseStudy {
  id: string;
  tabLabel: string;
  tabIcon: React.ReactNode;
  client: string;
  location: string;
  sectorTag: string;
  title: string;
  challenge: string;
  solution: string;
  image: string;
  stats: {
    val: string;
    label: string;
    sub: string;
    color: string;
  }[];
  floatingBadgeTop: {
    icon: string;
    title: string;
    subtitle: string;
  };
  floatingBadgeBottom: {
    title: string;
    subtitle: string;
  };
}

const spotlightCases: CaseStudy[] = [
  {
    id: "case-realestate",
    tabLabel: "Real Estate (Vashi)",
    tabIcon: <Building2 size={16} />,
    client: "Luxury Palm Beach Road Developer",
    location: "Palm Beach Road, Vashi, Navi Mumbai",
    sectorTag: "PPC & Lead Acquisition Engine",
    title: "How We Generated +340% More Leads & Delivered ₹18.5 Cr+ in Inventory Sales",
    challenge:
      "The client was spending over ₹2.8L/month on broad-match Google ads through generic agencies, receiving junk inquiries from unqualified brokers with an exorbitant ₹3,200 Cost-Per-Acquisition.",
    solution:
      "Inventus Global deployed sub-second Next.js landing funnels, algorithmic commercial-intent keyword bidding, and automated WhatsApp CRM triage to convert high-net-worth buyers directly.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80",
    stats: [
      {
        val: "+340%",
        label: "Qualified Buyer Inquiries",
        sub: "3.4x Pipeline Increase",
        color: "#16a34a",
      },
      {
        val: "-38%",
        label: "Cost Per Lead (CPA)",
        sub: "Zero Ad Waste",
        color: "#f16334",
      },
      {
        val: "₹18.5 Cr+",
        label: "Verified Inventory Sold",
        sub: "Closed in 90 Days",
        color: "#0f172a",
      },
    ],
    floatingBadgeTop: {
      icon: "⚡",
      title: "Sub-Second Speed (0.8s)",
      subtitle: "Next.js Mobile-First Landing",
    },
    floatingBadgeBottom: {
      title: "₹18.5 Cr Revenue Attribution",
      subtitle: "Verified Sales Dashboard",
    },
  },
  {
    id: "case-d2c",
    tabLabel: "D2C E-Commerce",
    tabIcon: <Sparkles size={16} />,
    client: "Organic Wellness & Beauty Brand",
    location: "Mumbai / Pan-India",
    sectorTag: "Social Media & Meta Ads",
    title: "Scaling Monthly D2C Revenue from ₹8L to ₹42L at a 4.6x Verified ROAS",
    challenge:
      "High customer acquisition cost on Meta Ads due to creative fatigue and generic product photos that failed to stop the mobile scroll, capping growth at ₹8L/month.",
    solution:
      "Produced 24 viral UGC hook video variations, deployed 14-day warm dynamic retargeting, and optimized Shopify checkout friction to maximize average order value.",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80",
    stats: [
      {
        val: "4.6x",
        label: "Verified Blended ROAS",
        sub: "Scale Without Efficiency Drop",
        color: "#16a34a",
      },
      {
        val: "₹42L",
        label: "Monthly Revenue",
        sub: "Up from ₹8L/month",
        color: "#f16334",
      },
      {
        val: "-42%",
        label: "Customer Acquisition Cost",
        sub: "Lower Ad Spend per Unit",
        color: "#0f172a",
      },
    ],
    floatingBadgeTop: {
      icon: "📈",
      title: "4.6x ROAS Verified",
      subtitle: "Meta & Instagram Retargeting",
    },
    floatingBadgeBottom: {
      title: "₹42 Lakhs Monthly Scale",
      subtitle: "Organic Social + Paid Funnel",
    },
  },
  {
    id: "case-health",
    tabLabel: "Healthcare Chain",
    tabIcon: <HeartPulse size={16} />,
    client: "Multi-Specialty Diagnostic Network",
    location: "Vashi, Belapur & Kharghar",
    sectorTag: "Local & Technical SEO Growth",
    title: "#1 Google Search Rankings for 45+ Commercial Terms & +280% Patient Inquiries",
    challenge:
      "Struggling against massive national healthcare aggregators with zero organic visibility in local Google 3-Pack and Google Maps searches across Navi Mumbai.",
    solution:
      "Executed localized technical SEO, specialty JSON-LD schema, and structured Google Business Profile hyper-local authority clusters for all five diagnostic clinics.",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80",
    stats: [
      {
        val: "+280%",
        label: "Organic Patient Bookings",
        sub: "Inbound Search Appointments",
        color: "#16a34a",
      },
      {
        val: "45+",
        label: "#1 Google Rankings",
        sub: "Commercial Keywords",
        color: "#f16334",
      },
      {
        val: "₹14L",
        label: "Annual Ad Spend Saved",
        sub: "Free Organic Footfall",
        color: "#0f172a",
      },
    ],
    floatingBadgeTop: {
      icon: "🎯",
      title: "#1 Google 3-Pack Ranking",
      subtitle: "Vashi & Navi Mumbai Centers",
    },
    floatingBadgeBottom: {
      title: "+280% Direct Appointments",
      subtitle: "Zero Ongoing Ad Cost",
    },
  },
  {
    id: "case-saas",
    tabLabel: "B2B SaaS & Tech",
    tabIcon: <Laptop size={16} />,
    client: "Supply Chain Logistics SaaS",
    location: "Corporate Navi Mumbai",
    sectorTag: "Web Architecture & Paid PPC",
    title: "+190% Enterprise Demo Bookings with a Sub-Second Next.js Web Experience",
    challenge:
      "A sluggish 5.2-second WordPress site drove an 82% bounce rate from high-CPC LinkedIn and Google ads, leaving sales reps without qualified pipeline.",
    solution:
      "Engineered an enterprise Next.js platform with 0.8s load times, interactive ROI calculators, and a friction-free booking flow directly synced with HubSpot CRM.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80",
    stats: [
      {
        val: "+190%",
        label: "Demo Conversion Rate",
        sub: "Sub-Second UX Impact",
        color: "#16a34a",
      },
      {
        val: "0.8s",
        label: "Page Load Speed",
        sub: "Google PageSpeed 99/100",
        color: "#f16334",
      },
      {
        val: "₹3.2 Cr",
        label: "Pipeline Value Added",
        sub: "Enterprise Pipeline",
        color: "#0f172a",
      },
    ],
    floatingBadgeTop: {
      icon: "🚀",
      title: "99/100 Core Web Vitals",
      subtitle: "Lightning-Fast Next.js App",
    },
    floatingBadgeBottom: {
      title: "₹3.2 Cr Enterprise Pipeline",
      subtitle: "Qualified Demo Inquiries",
    },
  },
];

export default function CaseStudySpotlight() {
  const [activeTab, setActiveTab] = useState(0);
  const current = spotlightCases[activeTab];

  return (
    <section id="case-study-spotlight" className="spotlight-master-section">
      <div className="container">
        {/* Section Header */}
        <div className="spotlight-header-center">
          <div className="phase-badge phase-badge-dark">
            <span className="phase-pulse-dot" />
            <span>PHASE 03 // VERIFIED CLIENT ROI &amp; IMPACT</span>
          </div>
          <h2 className="spotlight-headline">
            Real Businesses. <span className="future-title-accent">Undeniable Numbers.</span>
          </h2>
          <p className="spotlight-subheadline">
            Explore how Inventus Global transforms marketing spend into predictable revenue, high-intent leads, and dominant market share.
          </p>
        </div>

        {/* Interactive Segmented Tabs */}
        <div className="spotlight-tab-bar">
          {spotlightCases.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(idx)}
              className={`spotlight-tab-btn ${activeTab === idx ? "active" : ""}`}
            >
              <span className="spotlight-tab-icon">{item.tabIcon}</span>
              <span className="spotlight-tab-text">{item.tabLabel}</span>
            </button>
          ))}
        </div>

        {/* Master Spotlight Card */}
        <div className="spotlight-card-box">
          <div className="spotlight-content-grid">
            {/* Left Narrative Column */}
            <div className="spotlight-text-side">
              <div className="spotlight-client-meta">
                <span className="spotlight-sector-pill">{current.sectorTag}</span>
                <span className="spotlight-verified-badge">
                  <ShieldCheck size={14} />
                  <span>Verified Impact</span>
                </span>
              </div>

              <h3 className="spotlight-case-title">{current.title}</h3>

              <div className="spotlight-story-wrap">
                <div className="spotlight-story-item">
                  <div className="spotlight-story-label">
                    <span className="spotlight-dot-challenge" />
                    <strong>The Bottleneck:</strong>
                  </div>
                  <p>{current.challenge}</p>
                </div>

                <div className="spotlight-story-item">
                  <div className="spotlight-story-label">
                    <span className="spotlight-dot-solution" />
                    <strong>The Growth Engine:</strong>
                  </div>
                  <p>{current.solution}</p>
                </div>
              </div>

              {/* Bento Metric Stats */}
              <div className="spotlight-bento-stats">
                {current.stats.map((stat, sIdx) => (
                  <div key={sIdx} className="spotlight-bento-stat">
                    <div className="spotlight-bento-val" style={{ color: stat.color }}>
                      {stat.val}
                    </div>
                    <div className="spotlight-bento-label">{stat.label}</div>
                    <div className="spotlight-bento-sub">{stat.sub}</div>
                  </div>
                ))}
              </div>

              {/* CTA Action Row */}
              <div className="spotlight-actions-row">
                <Link href="/case-studies" className="btn-primary spotlight-cta-primary">
                  <span>Explore All Case Studies</span>
                  <ArrowRight size={16} />
                </Link>

                <Link href="/contact" className="spotlight-cta-secondary">
                  <span>Replicate These Results</span>
                  <Zap size={15} />
                </Link>
              </div>
            </div>

            {/* Right Media Column */}
            <div className="spotlight-media-side">
              <div className="spotlight-img-frame">
                <Image
                  src={current.image}
                  alt={current.title}
                  width={600}
                  height={450}
                  className="spotlight-main-img"
                  style={{ objectFit: "cover" }}
                />
                <div className="spotlight-img-gradient-overlay" />

                {/* Floating Glass Badge Top-Right */}
                <div className="spotlight-floating-badge badge-top">
                  <div className="floating-badge-icon">{current.floatingBadgeTop.icon}</div>
                  <div>
                    <div className="floating-badge-title">{current.floatingBadgeTop.title}</div>
                    <div className="floating-badge-sub">{current.floatingBadgeTop.subtitle}</div>
                  </div>
                </div>

                {/* Floating Glass Badge Bottom-Left */}
                <div className="spotlight-floating-badge badge-bottom">
                  <div className="floating-badge-pulse-dot" />
                  <div>
                    <div className="floating-badge-title">{current.floatingBadgeBottom.title}</div>
                    <div className="floating-badge-sub">{current.floatingBadgeBottom.subtitle}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
