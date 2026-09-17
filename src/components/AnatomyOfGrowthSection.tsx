"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface FunnelStage {
  id: string;
  label: string;
  targetWidth: number; // Percentage
  valueText: string;
  gradient: string;
  isFinal?: boolean;
}

const FUNNEL_STAGES: FunnelStage[] = [
  {
    id: "impressions",
    label: "AD IMPRESSIONS",
    targetWidth: 100,
    valueText: "250,000 Impressions",
    gradient: "linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)",
  },
  {
    id: "traffic",
    label: "QUALIFIED TRAFFIC",
    targetWidth: 78,
    valueText: "12,500 Visits",
    gradient: "linear-gradient(90deg, #0ea5e9 0%, #0284c7 100%)",
  },
  {
    id: "leads",
    label: "INBOUND LEADS",
    targetWidth: 58,
    valueText: "850 Verified Leads",
    gradient: "linear-gradient(90deg, #f59e0b 0%, #d97706 100%)",
  },
  {
    id: "pipeline",
    label: "SALES PIPELINE",
    targetWidth: 42,
    valueText: "180 Booked Calls",
    gradient: "linear-gradient(90deg, #f16334 0%, #ea580c 100%)",
  },
  {
    id: "revenue",
    label: "CLOSED CLIENTS",
    targetWidth: 28,
    valueText: "42 Closed Deals",
    gradient: "linear-gradient(90deg, #10b981 0%, #059669 100%)",
    isFinal: true,
  },
];

export default function AnatomyOfGrowthSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = sectionRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="anatomy-of-growth"
      ref={sectionRef}
      className="anatomy-section"
    >
      <div className="anatomy-container">
        {/* Left Column: Editorial Narrative matching the luxury reference */}
        <div className="anatomy-narrative">
          <div className="anatomy-badge">
            <span className="anatomy-badge-dot" />
            <span>ANATOMY OF A GROWTH SPRINT</span>
          </div>

          <h2 className="anatomy-headline">
            From first click to <br />
            <span className="anatomy-headline-accent">closed contract.</span>
          </h2>

          <p className="anatomy-desc">
            Most agencies celebrate clicks that never buy. We engineer high-converting sales funnels that capture active market demand, weed out tire-kickers, and feed your pipeline with deal-ready decision-makers.
          </p>

          <p className="anatomy-desc">
            Every rupee you invest is tracked directly to qualified conversations, closed deals, and verifiable pipeline revenue.
          </p>
        </div>

        {/* Right Column: Animated Funnel Bars */}
        <div className="anatomy-funnel-wrap">
          {FUNNEL_STAGES.map((stage, idx) => {
            const delay = `${idx * 0.15}s`;
            const textDelay = `${idx * 0.15 + 0.35}s`;

            return (
              <div key={stage.id} className="anatomy-funnel-row">
                <div className="anatomy-funnel-label">{stage.label}</div>

                <div className="anatomy-track">
                  <div
                    className={`anatomy-bar-fill ${
                      stage.isFinal ? "anatomy-bar-final" : ""
                    } ${isVisible ? "is-animated" : ""}`}
                    style={{
                      width: isVisible ? `${stage.targetWidth}%` : "0%",
                      background: stage.gradient,
                      transitionDelay: isVisible ? delay : "0s",
                    }}
                  >
                    <span
                      className={`anatomy-bar-text ${
                        isVisible ? "is-visible" : ""
                      }`}
                      style={{
                        transitionDelay: isVisible ? textDelay : "0s",
                      }}
                    >
                      {stage.valueText}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="anatomy-footnote">
            <span className="anatomy-footnote-dot" />
            <span>MEASURABLE PIPELINE ARCHITECTURE ENGINEERED FOR CONSISTENT HIGH-ROAS SCALE.</span>
          </div>

          <div>
            <Link href="/contact" className="anatomy-cta-btn">
              <span>EXPLORE THE FUNNEL</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
