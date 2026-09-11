import type { Metadata } from "next";
import Link from "next/link";
import {
  Target,
  Search,
  Code2,
  Share2,
  TrendingUp,
  Sparkles,
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { getAllServices } from "@/data/services";
import SectionHeader from "@/components/ui/SectionHeader";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import RoiCalculator from "@/components/RoiCalculator";
import BottomCtaSection from "@/components/sections/BottomCtaSection";

export const metadata: Metadata = {
  title: "Growth & Performance Marketing Services | Inventus Global",
  description:
    "Explore Inventus Global's full spectrum of growth solutions: Google Ads PPC, Technical & Local SEO, Meta Ad Funnels, and Next.js Web Platforms in Navi Mumbai.",
};

const serviceIcons: Record<string, React.ReactNode> = {
  "google-ads-ppc": <Target size={24} />,
  "search-engine-optimization": <Search size={24} />,
  "local-seo": <Zap size={24} />,
  "meta-ads": <Share2 size={24} />,
  "web-development": <Code2 size={24} />,
  "social-media-growth": <Share2 size={24} />,
  "conversion-rate-optimization": <TrendingUp size={24} />,
  "content-marketing": <TrendingUp size={24} />,
  "influencer-marketing": <Sparkles size={24} />,
};

export default function ServicesPage() {
  const services = getAllServices();

  return (
    <div>
      {/* Services Hub Hero Header */}
      <section style={{ background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)", padding: "72px 0 48px", borderBottom: "1px solid var(--border-light)" }}>
        <Container>
          <div style={{ maxWidth: "780px" }}>
            <span className="section-tag">Enterprise Capabilities</span>
            <h1 style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)", fontWeight: 900, color: "var(--text-heading)", lineHeight: 1.15, marginBottom: "16px", letterSpacing: "-0.5px" }}>
              Data-Driven Growth Engines <span className="gradient-text">Engineered for Scale.</span>
            </h1>
            <p style={{ fontSize: "1.12rem", color: "var(--text-body)", lineHeight: "1.7", margin: 0 }}>
              We reject vanity impressions and fluffy agency retainers. Every service we deploy is calibrated around commercial buyer intent, customer acquisition efficiency, and verified bank revenue.
            </p>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <section style={{ padding: "72px 0", background: "#ffffff" }}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "28px" }}>
            {services.map((srv) => {
              const icon = serviceIcons[srv.id] || <Target size={24} />;
              return (
                <div
                  key={srv.id}
                  style={{
                    background: "#ffffff",
                    border: "1px solid var(--border-light)",
                    borderRadius: "var(--radius-lg)",
                    padding: "32px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "all 0.25s ease",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                      <div style={{ width: "48px", height: "48px", borderRadius: "10px", background: "var(--primary-light)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {icon}
                      </div>
                      <Badge variant="primary">{srv.category}</Badge>
                    </div>

                    <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-heading)", marginBottom: "8px", lineHeight: 1.3 }}>
                      {srv.title}
                    </h2>
                    <p style={{ fontSize: "0.92rem", color: "var(--text-body)", lineHeight: "1.65", marginBottom: "24px" }}>
                      {srv.shortDesc}
                    </p>
                  </div>

                  <div>
                    <div style={{ background: "#f8fafc", padding: "10px 14px", borderRadius: "8px", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-heading)", marginBottom: "20px" }}>
                      ✓ {srv.metricsHighlight}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "16px", borderTop: "1px solid var(--border-hairline)" }}>
                      <Link
                        href={`/services/${srv.slug}`}
                        style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--primary)", fontWeight: 700, fontSize: "0.9rem" }}
                      >
                        <span>View Strategy &amp; Deliverables</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Embedded ROI Calculator */}
      <section style={{ padding: "80px 0", background: "#f8fafc", borderTop: "1px solid var(--border-light)" }}>
        <Container>
          <RoiCalculator />
        </Container>
      </section>

      {/* Bottom Conversion CTA */}
      <BottomCtaSection />
    </div>
  );
}
