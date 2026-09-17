"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";

interface TimelineStep {
  step: string;
  duration: string;
  title: string;
  badge: string;
  description: string;
  color: string;
}

const timelineSteps: TimelineStep[] = [
  {
    step: "01",
    duration: "DAYS 1–7",
    title: "Commercial Audit & Strategy",
    badge: "FOUNDATION",
    description: "We analyze your audience, audit historical ad performance, and engineer your bespoke multi-channel acquisition roadmap.",
    color: "#3b82f6",
  },
  {
    step: "02",
    duration: "DAYS 8–14",
    title: "High-Converting Architecture",
    badge: "SUB-SECOND TECH",
    description: "We launch lightning-fast Next.js landing pages, integrate conversion APIs (CAPI), and configure automated CRM pipelines.",
    color: "#0ea5e9",
  },
  {
    step: "03",
    duration: "DAYS 15–30",
    title: "Targeted Ad Deployment",
    badge: "ALGORITHMIC INTENT",
    description: "We deploy precision Google & Meta campaigns targeted exclusively at high-intent buyers, eliminating ad spend waste.",
    color: "#f59e0b",
  },
  {
    step: "04",
    duration: "MONTH 2+",
    title: "Pipeline Triage & Optimization",
    badge: "LEAD FILTERING",
    description: "Our systems filter tire-kickers and route sales-qualified leads straight to your sales team via automated WhatsApp and CRM flows.",
    color: "#f16334",
  },
  {
    step: "05",
    duration: "ONGOING",
    title: "Revenue Scale & Client Success",
    badge: "HIGH ROAS",
    description: "You enjoy predictable revenue growth, transparent weekly attribution reports, and direct access to senior strategists.",
    color: "#10b981",
  },
];

export default function CaseStudySpotlight() {
  return (
    <section id="inventus-standard" className="manifesto-master-section">
      <div className="container manifesto-container">
        {/* Split Grid: Left Manifesto, Right Timeline */}
        <div className="manifesto-split-layout">
          {/* Left Column: The Strategic Thesis */}
          <div className="manifesto-left-col">
            <div className="manifesto-eyebrow">
              <span className="manifesto-eyebrow-dot" />
              <span>THE CLIENT SUCCESS BLUEPRINT</span>
            </div>

            <h2 className="manifesto-headline">
              How We Guide You <br />
              From First Call <br />
              To <span className="manifesto-headline-accent">Scalable Revenue.</span>
            </h2>

            <p className="manifesto-thesis">
              We eliminate guesswork. Our step-by-step roadmap takes you from onboarding to a predictable, revenue-generating acquisition engine with complete transparency at every stage.
            </p>

            {/* Left Action Footer */}
            <div className="manifesto-left-footer">
              <div className="manifesto-location-pill">
                <MapPin size={14} />
                <span>Satra Plaza, Vashi, Navi Mumbai</span>
              </div>

              <Link href="/contact" className="manifesto-cta-btn">
                <span>Start Your Growth Journey</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* Right Column: The Client Success Timeline */}
          <div className="manifesto-right-col">
            <div className="manifesto-ledger-header">
              <span className="ledger-header-label">ACQUISITION ROADMAP</span>
              <span className="ledger-header-label">OUTCOME</span>
            </div>

            <div className="manifesto-timeline-list">
              {timelineSteps.map((step, idx) => (
                <div key={idx} className="manifesto-timeline-item">
                  <div className="timeline-marker-col">
                    <div
                      className="timeline-step-badge"
                      style={{ borderColor: step.color, color: step.color }}
                    >
                      {step.step}
                    </div>
                    {idx < timelineSteps.length - 1 && (
                      <div className="timeline-connector-line" />
                    )}
                  </div>

                  <div className="timeline-content-col">
                    <div className="timeline-step-header">
                      <div className="timeline-title-wrap">
                        <span className="timeline-duration">{step.duration}</span>
                        <h3 className="timeline-title">{step.title}</h3>
                      </div>
                      <span
                        className="timeline-badge"
                        style={{
                          color: step.color,
                          backgroundColor: `${step.color}14`,
                          borderColor: `${step.color}35`,
                        }}
                      >
                        <CheckCircle2 size={11} />
                        <span>{step.badge}</span>
                      </span>
                    </div>
                    <p className="timeline-desc">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
