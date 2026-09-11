import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Award, Target, Users, MapPin, CheckCircle2, ArrowRight, ShieldCheck, HeartHandshake } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Inventus Global - Navi Mumbai Marketing Agency",
  description:
    "Learn about Inventus Global: our history at Satra Plaza, Vashi, our leadership team, and our philosophy of revenue-driven digital growth.",
};

export default function AboutPage() {
  const team = [
    {
      name: "Anil Bhambi",
      role: "Founder & Chief Growth Strategist",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      bio: "10+ years architecting full-funnel paid advertising campaigns and enterprise digital growth frameworks.",
    },
    {
      name: "Vishal K",
      role: "Head of Technical SEO & Search Architecture",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      bio: "Specializes in algorithmic recovery, semantic content clusters, and high-authority digital PR.",
    },
    {
      name: "Priya Sharma",
      role: "Creative Director & Social Media Lead",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
      bio: "Crafts high-converting video reels, influencer partnerships, and organic brand storytelling campaigns.",
    },
  ];

  const milestones = [
    { year: "2016", title: "Founded in Navi Mumbai", desc: "Started operations at Satra Plaza, Vashi with a focus on high-ROI performance marketing." },
    { year: "2019", title: "100+ Campaigns Milestone", desc: "Expanded core capabilities into custom web development and enterprise search engine optimization." },
    { year: "2022", title: "Proprietary Tracking Engine", desc: "Built server-side conversion tracking frameworks ensuring 100% data fidelity for client Google Ads." },
    { year: "2026", title: "500+ Clients & 3.8x Avg ROAS", desc: "Ranked as a premier digital marketing and web performance agency across Navi Mumbai and Mumbai." },
  ];

  return (
    <div>
      {/* Hero Header */}
      <section className="blog-header-section" style={{ padding: "64px 0 44px" }}>
        <div className="container">
          <span className="section-tag">About Inventus Global</span>
          <h1 className="section-title about-hero-title">
            We Replace Marketing Vanity Metrics with <span className="gradient-text">Real Bank Revenue.</span>
          </h1>
          <p className="section-desc" style={{ maxWidth: "680px", fontSize: "1.12rem" }}>
            Founded in Vashi, Navi Mumbai, Inventus Global was built on a simple conviction: marketing should never be an expense—it must be an accountable growth investment.
          </p>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="section" style={{ background: "#ffffff" }}>
        <div className="container">
          <div className="about-story-grid">
            <div>
              <span className="section-tag">Our Story</span>
              <h2 className="about-story-title">
                Built by Practitioners, Not Sales Pitchers
              </h2>
              <p style={{ color: "var(--text-body)", fontSize: "1.02rem", lineHeight: "1.75", marginBottom: "16px" }}>
                Too many agencies promise &quot;brand buzz&quot; and deliver reports full of impressions and likes while client sales stay flat. At Inventus Global, we do things differently.
              </p>
              <p style={{ color: "var(--text-body)", fontSize: "1.02rem", lineHeight: "1.75", marginBottom: "24px" }}>
                Every strategy we deploy—from a high-intent Google PPC ad group to an in-depth technical SEO topic cluster—is built to drive qualified inquiries, lower customer acquisition costs, and maximize bottom-line profit.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <CheckCircle2 size={18} style={{ color: "var(--primary)" }} />
                  <span style={{ fontWeight: 600, color: "var(--text-heading)" }}>100% Transparent, Real-Time ROAS Reporting</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <CheckCircle2 size={18} style={{ color: "var(--primary)" }} />
                  <span style={{ fontWeight: 600, color: "var(--text-heading)" }}>Custom Strategies Tailored to Your Specific Margins</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <CheckCircle2 size={18} style={{ color: "var(--primary)" }} />
                  <span style={{ fontWeight: 600, color: "var(--text-heading)" }}>Direct Access to Senior Strategists, Never Junior Trainees</span>
                </div>
              </div>
            </div>

            <div className="about-standard-card">
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-heading)", marginBottom: "18px" }}>
                The Inventus Global Standard
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <div style={{ display: "flex", gap: "14px" }}>
                  <Target size={24} style={{ color: "var(--primary)", flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <h4 style={{ fontSize: "1rem", fontWeight: 700, margin: "0 0 4px", color: "var(--text-heading)" }}>
                      Precision Audience Targeting
                    </h4>
                    <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--text-muted)" }}>
                      We only show ads and rank content for prospects with immediate buying intent.
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "14px" }}>
                  <Award size={24} style={{ color: "var(--primary)", flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <h4 style={{ fontSize: "1rem", fontWeight: 700, margin: "0 0 4px", color: "var(--text-heading)" }}>
                      Full Conversion Rate Optimization
                    </h4>
                    <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--text-muted)" }}>
                      Traffic without landing page conversion is waste. We optimize every step of your funnel.
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "14px" }}>
                  <HeartHandshake size={24} style={{ color: "var(--primary)", flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <h4 style={{ fontSize: "1rem", fontWeight: 700, margin: "0 0 4px", color: "var(--text-heading)" }}>
                      Partnership Mindset
                    </h4>
                    <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--text-muted)" }}>
                      We win only when you win. That&apos;s why our average client retention exceeds 98%.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="section" style={{ background: "#fafafa", borderTop: "1px solid var(--border-light)", borderBottom: "1px solid var(--border-light)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Leadership Team</span>
            <h2 className="section-title">Meet the Minds Driving Your Growth</h2>
            <p className="section-desc">
              Seasoned marketers, search specialists, and creatives committed to scaling your brand.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "28px" }}>
            {team.map((member, idx) => (
              <div
                key={idx}
                style={{
                  background: "#ffffff",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-light)",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-xs)",
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ height: "240px", overflow: "hidden", background: "#f3f4f6", position: "relative" }}>
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={400}
                    height={240}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div style={{ padding: "24px" }}>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: "0 0 4px", color: "var(--text-heading)" }}>
                    {member.name}
                  </h3>
                  <div style={{ fontSize: "0.85rem", color: "var(--primary)", fontWeight: 700, marginBottom: "12px" }}>
                    {member.role}
                  </div>
                  <p style={{ color: "var(--text-body)", fontSize: "0.9rem", lineHeight: "1.6", margin: 0 }}>
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agency Milestones */}
      <section className="section" style={{ background: "#ffffff" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Journey</span>
            <h2 className="section-title">A Decade of Measurable Results</h2>
            <p className="section-desc">
              From our first office in Vashi to managing millions in profitable ad spend.
            </p>
          </div>

          <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px" }}>
            {milestones.map((m, idx) => (
              <div key={idx} className="about-milestone-item">
                <div
                  style={{
                    background: "var(--primary)",
                    color: "#ffffff",
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    padding: "6px 14px",
                    borderRadius: "4px",
                    flexShrink: 0,
                  }}
                >
                  {m.year}
                </div>
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-heading)", margin: "0 0 4px" }}>
                    {m.title}
                  </h3>
                  <p style={{ margin: 0, color: "var(--text-body)", fontSize: "0.92rem", lineHeight: "1.55" }}>
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <Link href="/services" className="btn-primary" style={{ padding: "12px 28px", fontSize: "0.98rem" }}>
              Explore Our Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
