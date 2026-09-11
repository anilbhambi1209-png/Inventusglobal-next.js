import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { TrendingUp, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { getAllCaseStudies } from "@/data/case-studies";
import SectionHeader from "@/components/ui/SectionHeader";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import BottomCtaSection from "@/components/sections/BottomCtaSection";

export const metadata: Metadata = {
  title: "Verified Case Studies & ROI Proof | Inventus Global",
  description:
    "Explore verified client case studies from Inventus Global across luxury real estate, D2C health, healthcare chains, and B2B SaaS in Navi Mumbai and Mumbai.",
};

export default function CaseStudiesPage() {
  const cases = getAllCaseStudies();

  return (
    <div>
      {/* Header */}
      <section style={{ background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)", padding: "72px 0 48px", borderBottom: "1px solid var(--border-light)" }}>
        <Container>
          <div style={{ maxWidth: "760px" }}>
            <span className="section-tag">Undeniable Proof</span>
            <h1 style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)", fontWeight: 900, color: "var(--text-heading)", lineHeight: 1.15, marginBottom: "16px", letterSpacing: "-0.5px" }}>
              Real Case Studies. <span className="gradient-text">Verified Bank Revenue.</span>
            </h1>
            <p style={{ fontSize: "1.12rem", color: "var(--text-body)", lineHeight: "1.7", margin: 0 }}>
              Explore how we help ambitious businesses in Navi Mumbai, Mumbai, and across India dominate their markets through data-backed execution and transparent attribution.
            </p>
          </div>
        </Container>
      </section>

      {/* Case Studies Cards List */}
      <section style={{ padding: "72px 0", background: "#ffffff" }}>
        <Container>
          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            {cases.map((c) => (
              <div
                key={c.id}
                style={{
                  background: "#ffffff",
                  border: "1px solid var(--border-light)",
                  borderRadius: "var(--radius-xl)",
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                  display: "grid",
                  gridTemplateColumns: "1fr 1.2fr",
                }}
              >
                {/* Cover Image */}
                <div style={{ position: "relative", minHeight: "340px", background: "#111827" }}>
                  <Image
                    src={c.image}
                    alt={c.client}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 992px) 100vw, 45vw"
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "16px",
                      left: "16px",
                      background: "rgba(17, 24, 39, 0.85)",
                      backdropFilter: "blur(6px)",
                      color: "#ffffff",
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.8px",
                      padding: "4px 12px",
                      borderRadius: "6px",
                    }}
                  >
                    {c.category}
                  </div>
                </div>

                {/* Content Side */}
                <div style={{ padding: "36px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600, marginBottom: "8px" }}>
                      {c.client} • {c.location}
                    </div>

                    <h2 style={{ fontSize: "clamp(1.25rem, 2vw, 1.6rem)", fontWeight: 800, color: "var(--text-heading)", lineHeight: 1.3, marginBottom: "14px" }}>
                      {c.headline}
                    </h2>

                    <p style={{ color: "var(--text-body)", fontSize: "0.94rem", lineHeight: "1.65", marginBottom: "24px" }}>
                      {c.summary}
                    </p>

                    {/* 3 Metrics Pills */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "28px" }}>
                      {c.metrics.slice(0, 3).map((m, i) => (
                        <div key={i} style={{ background: "#f8fafc", padding: "12px", borderRadius: "8px", border: "1px solid var(--border-light)", textAlign: "center" }}>
                          <div style={{ fontSize: "1.25rem", fontWeight: 900, color: "var(--primary)" }}>{m.value}</div>
                          <div style={{ fontSize: "0.74rem", fontWeight: 700, color: "var(--text-heading)", marginTop: "2px" }}>{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
                    <Button href={`/case-studies/${c.slug}`} variant="primary" size="md">
                      <span>View Full Breakdown</span>
                      <ArrowRight size={14} />
                    </Button>
                    <Button href="/contact" variant="outline" size="md">
                      <span>Replicate Metrics</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <BottomCtaSection />
    </div>
  );
}
