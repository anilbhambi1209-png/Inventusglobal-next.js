"use client";

import { useState } from "react";
import Link from "next/link";
import { TrendingUp, Award, ArrowRight, CheckCircle2, DollarSign, Users, Target } from "lucide-react";

export default function CaseStudiesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const cases = [
    {
      id: "case-1",
      client: "Luxury Real Estate Developer",
      location: "Palm Beach Road, Vashi",
      category: "PPC & Paid Ads",
      headline: "+340% Increase in Qualified Buyer Inquiries with a 38% Drop in CPA",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80",
      challenge: "The client was spending over ₹2.5L/month on Google Ads with generic agencies, receiving junk inquiries from unqualified brokers.",
      solution: "We rebuilt the campaign with negative audience filters, commercial intent keyword matching, and a dedicated lightning-fast Next.js mobile landing page.",
      metrics: [
        { label: "Lead Volume", val: "+340%" },
        { label: "Cost Per Lead", val: "-38%" },
        { label: "Total Revenue Generated", val: "₹18.5 Cr+" },
      ],
    },
    {
      id: "case-2",
      client: "D2C Organic Wellness & Beauty Brand",
      location: "Mumbai / Pan-India",
      category: "Social Media & Meta Ads",
      headline: "Scaled Monthly Revenue from ₹8L to ₹42L at a 4.6x Verified ROAS",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80",
      challenge: "High cost-per-purchase on Meta Ads due to ad fatigue and generic product photography that failed to stop the scroll.",
      solution: "Deployed UGC creator video reels highlighting specific skin concerns, combined with 14-day dynamic retargeting for abandoned cart visitors.",
      metrics: [
        { label: "Verified ROAS", val: "4.6x" },
        { label: "Monthly Revenue", val: "₹42 Lakhs" },
        { label: "Customer Acquisition Cost", val: "-42%" },
      ],
    },
    {
      id: "case-3",
      client: "Multi-Specialty Healthcare & Diagnostic Chain",
      location: "Navi Mumbai (Vashi, Belapur, Kharghar)",
      category: "SEO Growth",
      headline: "#1 Google Search Rankings for 45+ Local Medical Terms & +280% Footfall",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80",
      challenge: "Struggling against massive healthcare aggregators with zero organic visibility in local Google Maps and organic pack.",
      solution: "Executed localized technical SEO, schema structured data for medical specialties, and optimized Google Business Profiles across 5 centers.",
      metrics: [
        { label: "Organic Patient Bookings", val: "+280%" },
        { label: "Top 3 Keywords", val: "45 Keywords" },
        { label: "Annual Ad Spend Saved", val: "₹14 Lakhs" },
      ],
    },
    {
      id: "case-4",
      client: "B2B Supply Chain & Cold Storage SaaS",
      location: "Corporate Navi Mumbai",
      category: "Web & PPC",
      headline: "+190% Increase in Enterprise Demo Bookings via High-Converting Next.js Platform",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80",
      challenge: "A slow, outdated WordPress site taking 5.2 seconds to load resulted in an 82% bounce rate from expensive LinkedIn ads.",
      solution: "Engineered a bespoke Next.js web platform with 0.8s load times, interactive ROI calculators, and friction-free calendar booking.",
      metrics: [
        { label: "Demo Conversion Rate", val: "+190%" },
        { label: "Average Page Speed", val: "0.8s" },
        { label: "Pipeline Value Created", val: "₹3.2 Cr" },
      ],
    },
  ];

  const categories = ["All", "PPC & Paid Ads", "Social Media & Meta Ads", "SEO Growth", "Web & PPC"];

  const filteredCases = cases.filter(
    (c) => selectedCategory === "All" || c.category === selectedCategory
  );

  return (
    <div>
      {/* Header */}
      <section className="blog-header-section" style={{ padding: "64px 0 40px" }}>
        <div className="container">
          <span className="section-tag">Proven Results</span>
          <h1 className="section-title case-hero-title">
            Real Case Studies. <span className="gradient-text">Undeniable Revenue.</span>
          </h1>
          <p className="section-desc" style={{ maxWidth: "660px", fontSize: "1.12rem" }}>
            Explore how we help ambitious businesses in Navi Mumbai, Mumbai, and across India dominate their markets through data-backed execution.
          </p>

          {/* Category Filter Pills */}
          <div className="category-pills" style={{ marginTop: "28px" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`category-pill ${selectedCategory === cat ? "active" : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Cards List */}
      <section className="section" style={{ background: "#ffffff" }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            {filteredCases.map((c) => (
              <div key={c.id} className="case-study-card">
                {/* Cover Image & Tag */}
                <div className="case-study-img-wrap">
                  <img
                    src={c.image}
                    alt={c.client}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "16px",
                      left: "16px",
                      background: "rgba(17, 24, 39, 0.88)",
                      backdropFilter: "blur(6px)",
                      color: "#fbbf24",
                      padding: "4px 12px",
                      borderRadius: "4px",
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      textTransform: "uppercase",
                    }}
                  >
                    {c.category}
                  </div>
                </div>

                {/* Details Body */}
                <div className="case-study-body">
                  <div>
                    <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", marginBottom: "4px" }}>
                      {c.client} • {c.location}
                    </div>

                    <h2 className="case-study-title">
                      {c.headline}
                    </h2>

                    <div style={{ marginBottom: "16px" }}>
                      <p style={{ fontSize: "0.9rem", color: "var(--text-body)", lineHeight: "1.6", margin: "0 0 8px" }}>
                        <strong>The Challenge:</strong> {c.challenge}
                      </p>
                      <p style={{ fontSize: "0.9rem", color: "var(--text-body)", lineHeight: "1.6", margin: 0 }}>
                        <strong>Our Solution:</strong> {c.solution}
                      </p>
                    </div>
                  </div>

                  {/* Highlights Bar */}
                  <div>
                    <div className="case-metrics-grid">
                      {c.metrics.map((m, i) => (
                        <div key={i}>
                          <div className="case-metric-val">
                            {m.val}
                          </div>
                          <div style={{ fontSize: "0.74rem", color: "var(--text-muted)", fontWeight: 600, marginTop: "4px" }}>
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <a
                      href={`https://api.whatsapp.com/send?phone=919987682853&text=Hi%20Inventus%20Global,%20I%20saw%20your%20case%20study%20for%20${encodeURIComponent(c.client)}.%20Can%20we%20replicate%20these%20results%20for%20my%20business?`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                      style={{ padding: "10px 18px", fontSize: "0.88rem" }}
                    >
                      Get Similar Results for Your Business <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Conversion Banner */}
      <section style={{ background: "#fafafa", borderTop: "1px solid var(--border-light)", padding: "70px 0", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: "700px" }}>
          <span className="section-tag">Your Turn to Scale</span>
          <h2 style={{ fontSize: "2.2rem", fontWeight: 800, margin: "10px 0 14px", color: "var(--text-heading)" }}>
            Ready to Be Our Next Success Story?
          </h2>
          <p style={{ color: "var(--text-body)", fontSize: "1rem", marginBottom: "28px", lineHeight: "1.65" }}>
            Schedule a free audit session with our leadership team at Satra Plaza, Vashi. We will review your current funnels and give you a step-by-step roadmap to scale.
          </p>
          <Link href="/contact" className="btn-primary" style={{ padding: "12px 28px" }}>
            Request Your Strategy Session Now
          </Link>
        </div>
      </section>
    </div>
  );
}
