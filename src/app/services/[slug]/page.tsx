import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Clock,
  TrendingUp,
  Target,
  ShieldCheck,
  HelpCircle,
  MessageCircle,
} from "lucide-react";
import { getAllServices, getServiceBySlug } from "@/data/services";
import { getCaseStudyBySlug } from "@/data/case-studies";
import { siteConfig } from "@/config/site";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/ui/Container";
import BottomCtaSection from "@/components/sections/BottomCtaSection";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = getAllServices();
  return services.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: "Service | Inventus Global" };
  }

  return {
    title: `${service.title} | Inventus Global Navi Mumbai`,
    description: service.shortDesc,
    openGraph: {
      title: `${service.title} | Inventus Global`,
      description: service.shortDesc,
      url: `${siteConfig.url}/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const relatedCaseStudy = service.relatedCaseStudySlug
    ? getCaseStudyBySlug(service.relatedCaseStudySlug)
    : null;

  return (
    <div>
      {/* Service Hero Header */}
      <section style={{ background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)", padding: "72px 0 54px", borderBottom: "1px solid var(--border-light)" }}>
        <Container>
          <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
            <Badge variant="primary" style={{ marginBottom: "16px" }}>
              <Sparkles size={12} />
              <span>{service.category} Flagship Solution</span>
            </Badge>

            <h1 style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)", fontWeight: 900, color: "var(--text-heading)", lineHeight: 1.15, marginBottom: "18px", letterSpacing: "-0.5px" }}>
              {service.title}
            </h1>

            <p style={{ fontSize: "clamp(1.1rem, 2vw, 1.3rem)", fontWeight: 600, color: "var(--primary)", marginBottom: "18px" }}>
              {service.tagline}
            </p>

            <p style={{ fontSize: "1.05rem", color: "var(--text-body)", lineHeight: "1.75", marginBottom: "32px" }}>
              {service.heroDesc}
            </p>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", flexWrap: "wrap", marginBottom: "28px" }}>
              <Button
                href={siteConfig.contact.whatsappLink(
                  `Hi Inventus Global, I am interested in your ${service.title} services. Can we schedule a strategy discussion?`
                )}
                external
                variant="whatsapp"
                size="lg"
              >
                <MessageCircle size={17} />
                <span>Discuss on WhatsApp</span>
              </Button>

              <Button href="/contact" variant="primary" size="lg">
                <span>Book Strategy Consultation</span>
                <ArrowRight size={16} />
              </Button>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", flexWrap: "wrap", fontSize: "0.86rem", color: "var(--text-muted)" }}>
              <span>✓ <strong>Highlight:</strong> {service.metricsHighlight}</span>
              <span>•</span>
              <span>✓ <strong>Turnaround:</strong> {service.turnaroundTime}</span>
              <span>•</span>
              <span>✓ Office: Satra Plaza, Vashi</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Deliverables Grid */}
      <section style={{ padding: "80px 0", background: "#ffffff" }}>
        <Container>
          <SectionHeader
            eyebrow="Scope of Execution"
            eyebrowIcon={<CheckCircle2 size={14} />}
            title="What We Deliver in This Strategy"
            accentWord="Deliver"
            subtitle="Every deliverable is crafted with full transparency, rigorous testing, and direct attribution to bottom-line performance."
          />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {service.deliverables.map((item, idx) => (
              <Card key={idx} hoverable padding="default">
                <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "var(--primary-light)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)", marginBottom: "6px" }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-body)", lineHeight: "1.65", margin: 0 }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* 4-Step Strategic Process */}
      <section style={{ padding: "80px 0", background: "#f8fafc", borderTop: "1px solid var(--border-light)", borderBottom: "1px solid var(--border-light)" }}>
        <Container>
          <SectionHeader
            eyebrow="Our Methodology"
            eyebrowIcon={<Target size={14} />}
            title="Step-by-Step Strategic Roadmap"
            accentWord="Roadmap"
            subtitle="How we take your campaign from audit and hypothesis through deployment and profitable scale."
          />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
            {service.processSteps.map((step, idx) => (
              <div key={idx} style={{ background: "#ffffff", border: "1px solid var(--border-light)", borderRadius: "var(--radius-lg)", padding: "28px" }}>
                <span style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--primary)", display: "block", marginBottom: "8px", lineHeight: 1 }}>
                  {step.step}
                </span>
                <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--text-heading)", marginBottom: "8px" }}>
                  {step.title}
                </h4>
                <p style={{ fontSize: "0.88rem", color: "var(--text-body)", lineHeight: "1.65", margin: 0 }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Suitable For Checklist */}
      <section style={{ padding: "72px 0", background: "#ffffff" }}>
        <Container size="narrow">
          <SectionHeader
            eyebrow="Target Fit"
            eyebrowIcon={<ShieldCheck size={14} />}
            title="Who This Service is Built For"
            accentWord="Built For"
            subtitle="We partner with businesses where our systems can generate the highest multiple on investment."
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {service.suitableFor.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "16px 20px",
                  background: "#f9fafb",
                  border: "1px solid var(--border-light)",
                  borderRadius: "8px",
                }}
              >
                <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#f0fdf4", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <CheckCircle2 size={16} />
                </div>
                <span style={{ fontSize: "0.96rem", fontWeight: 600, color: "var(--text-heading)" }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Related Case Study Callout */}
      {relatedCaseStudy && (
        <section style={{ padding: "64px 0", background: "#0f172a", color: "#ffffff" }}>
          <Container>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "32px", alignItems: "center" }}>
              <div>
                <Badge variant="amber" style={{ marginBottom: "12px" }}>
                  Verified Case Study
                </Badge>
                <h3 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#ffffff", marginBottom: "8px" }}>
                  {relatedCaseStudy.client}: {relatedCaseStudy.headline}
                </h3>
                <p style={{ color: "#94a3b8", fontSize: "0.95rem", margin: 0, maxWidth: "680px" }}>
                  {relatedCaseStudy.summary}
                </p>
              </div>

              <Button href={`/case-studies/${relatedCaseStudy.slug}`} variant="primary" size="md">
                <span>Read Full Case Study</span>
                <ArrowRight size={15} />
              </Button>
            </div>
          </Container>
        </section>
      )}

      {/* Service FAQs */}
      {service.faqs.length > 0 && (
        <section style={{ padding: "80px 0", background: "#f8fafc", borderTop: "1px solid var(--border-light)" }}>
          <Container size="narrow">
            <SectionHeader
              eyebrow="Common Inquiries"
              eyebrowIcon={<HelpCircle size={14} />}
              title="Frequently Asked Questions"
              accentWord="Questions"
            />

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {service.faqs.map((faq, idx) => (
                <div key={idx} style={{ background: "#ffffff", border: "1px solid var(--border-light)", borderRadius: "var(--radius-md)", padding: "24px" }}>
                  <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--text-heading)", marginBottom: "8px" }}>
                    {faq.question}
                  </h4>
                  <p style={{ fontSize: "0.92rem", color: "var(--text-body)", lineHeight: "1.7", margin: 0 }}>
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Bottom Conversion CTA */}
      <BottomCtaSection
        eyebrow={`Scale Your ${service.shortTitle}`}
        title={`Ready to Dominate with ${service.shortTitle}?`}
        subtitle="Connect directly with our senior growth architects at Satra Plaza, Vashi to audit your numbers and deploy a high-ROI roadmap."
      />
    </div>
  );
}
