"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface FunnelStage {
  id: string;
  label: string;
  targetWidth: number; // Percentage (e.g. 100, 68, 38, 20, 14)
  valueText: string;
  isFinal?: boolean;
}

const FUNNEL_STAGES: FunnelStage[] = [
  {
    id: "market",
    label: "MARKET MAPPED",
    targetWidth: 100,
    valueText: "100,000 target buyers",
  },
  {
    id: "traffic",
    label: "APPROACHED WITH INTENT",
    targetWidth: 68,
    valueText: "4,800 qualified clicks",
  },
  {
    id: "funnel",
    label: "ASSESSED IN DEPTH",
    targetWidth: 38,
    valueText: "920 engaged sessions",
  },
  {
    id: "leads",
    label: "SHORTLIST PRESENTED",
    targetWidth: 20,
    valueText: "160 verified leads",
  },
  {
    id: "revenue",
    label: "OFFER ACCEPTED",
    targetWidth: 14,
    valueText: "18 closed clients",
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
            What a single <span className="anatomy-headline-accent">high-yield growth campaign</span> looks like from the inside.
          </h2>

          <p className="anatomy-desc">
            Most digital marketing agencies show you vanity clicks and impression graphs. This is the rigorous conversion architecture behind actual revenue: the market we map, the high-intent buyers we approach with precision, and the qualified deals that reach your table.
          </p>

          <p className="anatomy-desc">
            Around 100,000 potential buyers exist in a typical commercial target market. Only the most profitable reach your sales team.
          </p>
        </div>

        {/* Right Column: Animated Funnel Bars matching the image */}
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
                    }`}
                    style={{
                      width: isVisible ? `${stage.targetWidth}%` : "0%",
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
            <span>REPRESENTATIVE SHAPE OF A COMPLETED GROWTH SPRINT. VOLUMES VARY BY SECTOR AND BUDGET.</span>
          </div>

          <div>
            <Link href="/contact" className="anatomy-cta-btn">
              <span>SEE THE FIVE-STAGE METHOD</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
