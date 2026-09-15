import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Award,
  Target,
  Users,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  TrendingUp,
  Phone,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { teamData } from "@/data/team";
import { milestonesData } from "@/data/milestones";

export const metadata: Metadata = {
  title: "About Us | Inventus Global - Navi Mumbai Marketing Agency",
  description:
    "Learn about Inventus Global: our history at Satra Plaza, Vashi, our leadership team, and our philosophy of revenue-driven digital growth.",
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero Header */}
      <section className="blog-header-section" style={{ padding: "72px 0 48px", background: "#f8fafc", borderBottom: "1px solid var(--border-hairline)" }}>
        <div className="container">
          <span className="section-tag">About Inventus Global</span>
          <h1 className="section-title about-hero-title">
            We Replace Marketing Vanity Metrics with <span className="gradient-text">Real Bank Revenue.</span>
          </h1>
          <p className="section-desc" style={{ maxWidth: "720px", fontSize: "1.15rem", lineHeight: "1.7" }}>
            Founded at Satra Plaza, Vashi, Inventus Global was built on a single conviction: marketing should never be an expense line item—it must be an accountable, revenue-generating engine.
          </p>

          {/* Key Proof Strip */}
          <div style={{ display: "flex", gap: "28px", marginTop: "32px", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--primary)" }}>{siteConfig.stats.experienceYears}</div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>Agency Experience</div>
            </div>
            <div style={{ width: "1px", background: "var(--border-hairline)" }} />
            <div>
              <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--primary)" }}>{siteConfig.stats.attribution}</div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>Transparent Attribution</div>
            </div>
            <div style={{ width: "1px", background: "var(--border-hairline)" }} />
            <div>
              <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--primary)" }}>{siteConfig.stats.targetRoas}</div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>Target Campaign ROAS</div>
            </div>
            <div style={{ width: "1px", background: "var(--border-hairline)" }} />
            <div>
              <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--primary)" }}>{siteConfig.stats.clientSatisfaction}</div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="section" style={{ background: "#ffffff", padding: "80px 0" }}>
        <div className="container">
          <div className="about-story-grid">
            <div>
              <span className="section-tag">Our Story &amp; Philosophy</span>
              <h2 className="about-story-title">
                Built by Practitioners, Not Sales Pitchers
              </h2>
              <p style={{ color: "var(--text-body)", fontSize: "1.05rem", lineHeight: "1.75", marginBottom: "18px" }}>
                Too many agencies promise &quot;brand buzz&quot; and deliver monthly reports full of impressions and social likes while client revenue stays flat. At Inventus Global, we operate differently.
              </p>
              <p style={{ color: "var(--text-body)", fontSize: "1.05rem", lineHeight: "1.75", marginBottom: "28px" }}>
                Every strategy we deploy—from a high-intent Google Ads PPC ad group to an enterprise Next.js web application—is engineered to attract qualified inquiries, lower customer acquisition costs, and maximize net profit margins.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <CheckCircle2 size={20} style={{ color: "var(--primary)", flexShrink: 0 }} />
                  <span style={{ fontWeight: 600, color: "var(--text-heading)", fontSize: "0.98rem" }}>100% Transparent, Real-Time ROAS &amp; Revenue Reporting</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <CheckCircle2 size={20} style={{ color: "var(--primary)", flexShrink: 0 }} />
                  <span style={{ fontWeight: 600, color: "var(--text-heading)", fontSize: "0.98rem" }}>Custom Performance Strategies Tailored to Your Specific Margins</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <CheckCircle2 size={20} style={{ color: "var(--primary)", flexShrink: 0 }} />
                  <span style={{ fontWeight: 600, color: "var(--text-heading)", fontSize: "0.98rem" }}>Direct Access to Senior Growth Architects, Never Junior Trainees</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <CheckCircle2 size={20} style={{ color: "var(--primary)", flexShrink: 0 }} />
                  <span style={{ fontWeight: 600, color: "var(--text-heading)", fontSize: "0.98rem" }}>Server-Side Conversion Infrastructure (Meta CAPI, GA4 First-Party)</span>
                </div>
              </div>
            </div>

            <div className="about-standard-card">
              <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-heading)", marginBottom: "22px" }}>
                The Inventus Global Standard
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ display: "flex", gap: "16px" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "8px", background: "rgba(241, 99, 52, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Target size={22} style={{ color: "var(--primary)" }} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1.02rem", fontWeight: 700, margin: "0 0 4px", color: "var(--text-heading)" }}>
                      Precision Commercial Intent
                    </h4>
                    <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: "1.55" }}>
                      We focus marketing budget strictly on prospects actively searching with purchasing intent, eliminating informational click waste.
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "16px" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "8px", background: "rgba(241, 99, 52, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <TrendingUp size={22} style={{ color: "var(--primary)" }} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1.02rem", fontWeight: 700, margin: "0 0 4px", color: "var(--text-heading)" }}>
                      Conversion Rate Architecture
                    </h4>
                    <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: "1.55" }}>
                      Traffic without high-converting landing funnels is wasted ad spend. We engineer sub-second Next.js pages that convert.
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "16px" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "8px", background: "rgba(241, 99, 52, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <HeartHandshake size={22} style={{ color: "var(--primary)" }} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1.02rem", fontWeight: 700, margin: "0 0 4px", color: "var(--text-heading)" }}>
                      True Partnership Mindset
                    </h4>
                    <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: "1.55" }}>
                      We grow only when our clients scale profitably. That is why our long-term client retention exceeds 98%.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="section" style={{ background: "#f8fafc", borderTop: "1px solid var(--border-hairline)", borderBottom: "1px solid var(--border-hairline)", padding: "80px 0" }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 48px" }}>
            <span className="section-tag">Leadership Team</span>
            <h2 className="section-title">Meet the Minds Driving Your Growth</h2>
            <p className="section-desc">
              Senior performance marketers, search architects, and creative directors committed to scaling your brand.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px" }}>
            {teamData.map((member) => (
              <div
                key={member.name}
                style={{
                  background: "#ffffff",
                  borderRadius: "14px",
                  border: "1px solid var(--border-hairline)",
                  overflow: "hidden",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.04)",
                  transition: "all 0.25s ease",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ height: "260px", overflow: "hidden", background: "#f1f5f9", position: "relative" }}>
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={400}
                    height={260}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div style={{ padding: "26px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 800, margin: "0 0 4px", color: "var(--text-heading)" }}>
                    {member.name}
                  </h3>
                  <div style={{ fontSize: "0.88rem", color: "var(--primary)", fontWeight: 700, marginBottom: "12px" }}>
                    {member.role}
                  </div>
                  <p style={{ color: "var(--text-body)", fontSize: "0.92rem", lineHeight: "1.6", margin: "0 0 18px", flexGrow: 1 }}>
                    {member.bio}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", borderTop: "1px solid #f1f5f9", paddingTop: "14px" }}>
                    {member.expertise.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          padding: "3px 10px",
                          borderRadius: "50px",
                          background: "var(--primary-light)",
                          color: "var(--primary)",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agency Milestones */}
      <section className="section" style={{ background: "#ffffff", padding: "80px 0" }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 48px" }}>
            <span className="section-tag">Our Journey</span>
            <h2 className="section-title">A Decade of Measurable Results</h2>
            <p className="section-desc">
              From our first office in Vashi to managing multi-crore ad portfolios and high-converting Next.js platforms.
            </p>
          </div>

          <div style={{ maxWidth: "820px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px" }}>
            {milestonesData.map((m) => (
              <div key={m.year} className="about-milestone-item">
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", flexShrink: 0, minWidth: "75px" }}>
                  <div
                    style={{
                      background: "linear-gradient(135deg, #f16334 0%, #ea580c 100%)",
                      color: "#ffffff",
                      fontWeight: 800,
                      fontSize: "0.95rem",
                      padding: "6px 14px",
                      borderRadius: "6px",
                      textAlign: "center",
                      boxShadow: "0 2px 8px rgba(241, 99, 52, 0.3)",
                    }}
                  >
                    {m.year}
                  </div>
                  <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase" }}>
                    {m.badge}
                  </span>
                </div>
                <div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-heading)", margin: "0 0 6px" }}>
                    {m.title}
                  </h3>
                  <p style={{ margin: 0, color: "var(--text-body)", fontSize: "0.94rem", lineHeight: "1.6" }}>
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "54px" }}>
            <Link href="/services" className="btn-primary" style={{ padding: "14px 32px", fontSize: "1rem" }}>
              <span>Explore All Capabilities</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom Conversion Section */}
      <section className="home-bottom-cta-section">
        <div className="container">
          <div className="home-bottom-cta-card">
            <div className="home-bottom-cta-badge">
              <span>SCALE WITH INVENTUS GLOBAL</span>
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
    </div>
  );
}
