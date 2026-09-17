"use client";

import styles from "./ContinuousLearningMarquee.module.css";

export default function ContinuousLearningMarquee() {
  const brands = [
    { name: "Brand 1", image: "/brands/17.png" },
    { name: "Brand 2", image: "/brands/16.png" },
    { name: "Brand 3", image: "/brands/15.png" },
    { name: "Brand 4", image: "/brands/14.png" },
    { name: "Brand 5", image: "/brands/13.png" },
    { name: "Brand 6", image: "/brands/7-1.png" },
    { name: "Brand 7", image: "/brands/8-1.png" },
    { name: "Brand 8", image: "/brands/9.png" },
    { name: "Brand 9", image: "/brands/10.png" },
    { name: "Brand 10", image: "/brands/11.png" },
    { name: "Brand 11", image: "/brands/12.png" },
    { name: "Brand 12", image: "/brands/6-1.png" },
    { name: "Brand 13", image: "/brands/5.png" },
    { name: "Brand 14", image: "/brands/4-1.png" },
    { name: "Brand 15", image: "/brands/3-1.png" },
    { name: "Brand 16", image: "/brands/2-1.png" },
    { name: "Brand 17", image: "/brands/1-2.png" },
    { name: "Brand 18", image: "/brands/19.png" },
    { name: "Brand 19", image: "/brands/18.png" },
  ];

  const credentials = [
    { text: "35+ CERTIFIED SPECIALISTS", icon: "⚡", color: "#f16334" },
    { text: "GOOGLE PREMIER ADS PARTNER", icon: "🎯", color: "#38bdf8" },
    { text: "META CAPI & HIGH-ROAS FUNNELS", icon: "📈", color: "#22c55e" },
    { text: "SUB-SECOND NEXT.JS ARCHITECTURE", icon: "🚀", color: "#f59e0b" },
    { text: "HUBSPOT CRM AUTOMATION", icon: "📊", color: "#ec4899" },
    { text: "TECHNICAL SEO & LOCAL AUTHORITY", icon: "🔍", color: "#a855f7" },
    { text: "ZERO AD SPEND WASTE STANDARD", icon: "🛡️", color: "#22c55e" },
    { text: "CLOSED-LOOP REVENUE ATTRIBUTION", icon: "💰", color: "#38bdf8" },
    { text: "REAL-TIME ALGORITHM ADAPTATION", icon: "🔄", color: "#f16334" },
  ];

  // Tripled items to ensure mathematically seamless, endless infinite looping
  const ribbon1Items = [...brands, ...brands, ...brands];
  const ribbon2Items = [...credentials, ...credentials, ...credentials, ...credentials];

  return (
    <section id="continuous-learning" className="learning-marquee-section">
      <div className="container">
        <div className="learning-header">
          <div className="learning-eyebrow">
            <span className="learning-eyebrow-dot" />
            <span>CONTINUOUS UPSKILLING &amp; TECH ECOSYSTEM</span>
          </div>
          <h2 className="learning-title">
            We grow by <br />
            <span className="learning-title-accent">continuous learning</span>
          </h2>
          <div className="learning-accent-bar" />
          <p className="learning-subtitle">
            Trusted by ambitious brands and global partners—empowered with enterprise-grade performance and measurable growth.
          </p>
        </div>
      </div>

      {/* Kinetic X-Crossing Dual Marquee Stage */}
      <div className="marquee-x-stage">
        {/* Ribbon 1: Slanted -2.8deg, Scrolling LEFT (Vibrant Orange Band with Brand Partner Logos) */}
        <div className="marquee-band-1">
          <div className="marquee-track-left">
            {ribbon1Items.map((brand, idx) => (
              <div
                key={`brand-${brand.image}-${idx}`}
                className={`learning-brand-tile ${styles['learning-brand-tile']}`}
                title={brand.name}
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  loading="lazy"
                  className={styles['brand-tile-img']}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Ribbon 2: Slanted +2.8deg, Scrolling RIGHT in the OPPOSITE DIRECTION (Obsidian Glass Band with Badges) */}
        <div className="marquee-band-2">
          <div className="marquee-track-right">
            {ribbon2Items.map((badge, idx) => (
              <div
                key={`cred-${idx}`}
                className="learning-badge-pill"
              >
                <span className="badge-pill-icon">{badge.icon}</span>
                <span className="badge-pill-text" style={{ color: badge.color }}>
                  {badge.text}
                </span>
                <span className="badge-pill-dot" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
