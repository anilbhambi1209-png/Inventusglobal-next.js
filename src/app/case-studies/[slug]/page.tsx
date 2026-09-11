import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Quote,
  ArrowLeft,
  Calendar,
  MapPin,
  Building,
  Sparkles,
} from "lucide-react";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/data/case-studies";
import { siteConfig } from "@/config/site";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import BottomCtaSection from "@/components/sections/BottomCtaSection";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const cases = getAllCaseStudies();
  return cases.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getCaseStudyBySlug(slug);

  if (!item) {
    return { title: "Case Study | Inventus Global" };
  }

  return {
    title: `${item.headline} | Inventus Global Case Study`,
    description: item.summary,
    openGraph: {
      title: item.headline,
      description: item.summary,
      url: `${siteConfig.url}/case-studies/${item.slug}`,
      images: [{ url: item.image, alt: item.client }],
    },
  };
}

export default async function CaseStudyDetailPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const item = getCaseStudyBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <div>
      {/* Header Banner */}
      <section style={{ background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)", padding: "64px 0 44px", borderBottom: "1px solid var(--border-light)" }}>
        <Container>
          <div style={{ marginBottom: "20px" }}>
            <Link
              href="/case-studies"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.88rem",
                fontWeight: 700,
                color: "var(--primary)",
              }}
            >
              <ArrowLeft size={15} />
              <span>Back to All Case Studies</span>
            </Link>
          </div>

          <div style={{ maxWidth: "880px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "14px" }}>
              <Badge variant="primary">{item.category}</Badge>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>
                {item.industry} • {item.location}
              </span>
            </div>

            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 900, color: "var(--text-heading)", lineHeight: 1.2, letterSpacing: "-0.5px", marginBottom: "18px" }}>
              {item.headline}
            </h1>

            <p style={{ fontSize: "1.1rem", color: "var(--text-body)", lineHeight: "1.75", margin: 0 }}>
              {item.summary}
            </p>
          </div>
        </Container>
      </section>

      {/* Hero Image & 4 Metrics Bar */}
      <section style={{ padding: "0 0 60px" }}>
        <Container>
          <div style={{ position: "relative", height: "420px", borderRadius: "var(--radius-xl)", overflow: "hidden", boxShadow: "var(--shadow-lg)", marginBottom: "36px" }}>
            <Image
              src={item.image}
              alt={item.client}
              fill
              priority
              style={{ objectFit: "cover" }}
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>

          {/* 4 Verified Metrics Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
            {item.metrics.map((m, i) => (
              <div
                key={i}
                style={{
                  background: "#ffffff",
                  border: "1px solid var(--border-light)",
                  borderRadius: "var(--radius-lg)",
                  padding: "24px",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "var(--primary)", lineHeight: 1 }}>
                  {m.value}
                </div>
                <div style={{ fontSize: "0.94rem", fontWeight: 800, color: "var(--text-heading)", margin: "6px 0 2px" }}>
                  {m.label}
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{m.subtext}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Narrative Breakdown: Challenge vs Strategy */}
      <section style={{ padding: "60px 0 80px", background: "#ffffff" }}>
        <Container size="narrow">
          <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
            {/* The Challenge */}
            <div>
              <span className="section-tag">01. The Problem</span>
              <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-heading)", margin: "6px 0 16px" }}>
                The Growth Bottleneck
              </h2>
              <p style={{ fontSize: "1.05rem", color: "var(--text-body)", lineHeight: "1.8" }}>
                {item.challenge}
              </p>
            </div>

            {/* The Strategy */}
            <div>
              <span className="section-tag">02. Strategic Pivot</span>
              <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-heading)", margin: "6px 0 16px" }}>
                The Inventus Global Growth Blueprint
              </h2>
              <p style={{ fontSize: "1.05rem", color: "var(--text-body)", lineHeight: "1.8", marginBottom: "24px" }}>
                {item.strategy}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {item.executionSteps.map((step, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      background: "#f9fafb",
                      padding: "16px",
                      borderRadius: "8px",
                      border: "1px solid var(--border-light)",
                    }}
                  >
                    <CheckCircle2 size={18} style={{ color: "var(--primary)", flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ fontSize: "0.94rem", color: "var(--text-heading)", lineHeight: "1.6", fontWeight: 500 }}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Client Testimonial Quote */}
            {item.testimonial && (
              <div
                style={{
                  background: "linear-gradient(135deg, #fef8f6 0%, #fff5f1 100%)",
                  border: "1px solid rgba(241, 99, 52, 0.2)",
                  borderRadius: "var(--radius-lg)",
                  padding: "36px",
                  position: "relative",
                }}
              >
                <Quote size={36} style={{ color: "var(--primary)", opacity: 0.35, marginBottom: "14px" }} />
                <p style={{ fontSize: "1.12rem", fontStyle: "italic", color: "var(--text-heading)", lineHeight: "1.75", marginBottom: "20px" }}>
                  &quot;{item.testimonial.quote}&quot;
                </p>
                <div>
                  <div style={{ fontWeight: 800, color: "var(--text-heading)" }}>{item.testimonial.author}</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--primary)", fontWeight: 600 }}>
                    {item.testimonial.role}, {item.testimonial.company}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <BottomCtaSection
        eyebrow="Replicate These Metrics"
        title="Ready to Scale Your Brand's Acquisition ROAS?"
        subtitle={`Connect with our growth architects at Satra Plaza, Vashi to discover how our ${item.category} systems can deliver predictable, scalable revenue for your company.`}
      />
    </div>
  );
}
