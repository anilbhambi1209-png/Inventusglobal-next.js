"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";

interface BenchmarkRow {
  index: string;
  category: string;
  metric: string;
  metricColor: string;
  title: string;
  description: string;
  tag: string;
}

const benchmarkRows: BenchmarkRow[] = [
  {
    index: "01",
    category: "VELOCITY",
    metric: "0.8s",
    metricColor: "#f16334",
    title: "Sub-Second Funnel Velocity",
    description: "Next.js edge-rendered platforms that convert high-intent traffic before sluggish WordPress competitors even load.",
    tag: "Core Web Vitals 99/100",
  },
  {
    index: "02",
    category: "EFFICIENCY",
    metric: "-38%",
    metricColor: "#16a34a",
    title: "Algorithmic Intent Bidding",
    description: "Zero broad-match ad waste. We target documented commercial intent on Google & Meta, backed by automated WhatsApp CRM triage.",
    tag: "Verified Buyer Pipeline",
  },
  {
    index: "03",
    category: "INTEGRITY",
    metric: "100%",
    metricColor: "#0284c7",
    title: "Direct Revenue Attribution",
    description: "Every campaign rupee is tracked through CRM integration directly to closed deals, verified inventory, and measurable enterprise ROI.",
    tag: "₹48 Cr+ Pipeline Generated",
  },
  {
    index: "04",
    category: "GOVERNANCE",
    metric: "1:1",
    metricColor: "#7c3aed",
    title: "Zero Junior Account Layers",
    description: "Your brand never gets handed off to interns. Campaigns are architected and optimized directly by senior strategists in Vashi.",
    tag: "4-Hour Response SLA",
  },
];

export default function CaseStudySpotlight() {
  return (
    <section id="inventus-standard" className="manifesto-master-section">
      <div className="container manifesto-container">
        {/* Split Grid: Left Manifesto, Right Ledger */}
        <div className="manifesto-split-layout">
          {/* Left Column: The Strategic Thesis */}
          <div className="manifesto-left-col">
            <div className="manifesto-eyebrow">
              <span className="manifesto-eyebrow-dot" />
              <span>PHASE 04 • THE OPERATIONAL BLUEPRINT</span>
            </div>

            <h2 className="manifesto-headline">
              Not Just Campaigns. <br />
              A Deterministic <br />
              <span className="manifesto-headline-accent">Revenue Engine.</span>
            </h2>

            <p className="manifesto-thesis">
              Most marketing agencies treat growth as creative guesswork—buying broad-match clicks and celebrating vanity impressions. Inventus Global was built on an engineering principle: every rupee deployed must yield measurable, closed-loop pipeline revenue.
            </p>

            {/* The Growth Equation Box */}
            <div className="manifesto-equation-box">
              <div className="manifesto-equation-label">THE INVENTUS GROWTH EQUATION</div>
              <div className="manifesto-equation-text">
                <span className="eq-val">PREDICTABLE REVENUE</span> = <br />
                <span className="eq-term">COMMERCIAL INTENT</span> × <span className="eq-term">0.8s NEXT.JS</span> × <span className="eq-term">CRM TRIAGE</span>
              </div>
            </div>

            {/* Left Action Footer */}
            <div className="manifesto-left-footer">
              <div className="manifesto-location-pill">
                <MapPin size={14} />
                <span>Satra Plaza, Vashi, Navi Mumbai</span>
              </div>

              <Link href="/contact" className="manifesto-cta-btn">
                <span>Audit Your Infrastructure</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* Right Column: The Architectural Ledger (Rows, NOT Cards!) */}
          <div className="manifesto-right-col">
            <div className="manifesto-ledger-header">
              <span className="ledger-header-label">OPERATIONAL BENCHMARK</span>
              <span className="ledger-header-label">THE INVENTUS STANDARD</span>
            </div>

            <div className="manifesto-ledger-list">
              {benchmarkRows.map((row, idx) => (
                <div key={idx} className="manifesto-ledger-row">
                  <div className="ledger-col-metric">
                    <div className="ledger-row-num">{row.index} / {row.category}</div>
                    <div className="ledger-row-val" style={{ color: row.metricColor }}>
                      {row.metric}
                    </div>
                  </div>

                  <div className="ledger-col-content">
                    <div className="ledger-row-head">
                      <h3 className="ledger-row-title">{row.title}</h3>
                      <span className="ledger-row-tag">
                        <CheckCircle2 size={12} />
                        <span>{row.tag}</span>
                      </span>
                    </div>
                    <p className="ledger-row-desc">{row.description}</p>
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
