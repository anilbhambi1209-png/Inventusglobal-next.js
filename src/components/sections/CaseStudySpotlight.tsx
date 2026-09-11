"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Building2,
  HeartPulse,
  Laptop,
  ShoppingBag,
  CheckCircle2,
} from "lucide-react";
import { caseStudiesData } from "@/data/case-studies";
import SectionHeader from "@/components/ui/SectionHeader";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import styles from "./CaseStudySpotlight.module.css";

const industryIcons: Record<string, React.ReactNode> = {
  "Luxury Real Estate": <Building2 size={16} />,
  "D2C E-Commerce & Health": <ShoppingBag size={16} />,
  "Healthcare & Diagnostics": <HeartPulse size={16} />,
  "B2B Logistics & SaaS": <Laptop size={16} />,
};

export default function CaseStudySpotlight() {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = caseStudiesData[activeIdx] || caseStudiesData[0];

  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeader
          eyebrow="Verified Growth Proof"
          eyebrowIcon={<ShieldCheck size={14} />}
          title="Revenue-First Case Studies From Real Businesses"
          accentWord="Revenue-First"
          subtitle="We measure our agency against verified customer acquisition cost (CAC), pipeline volume, and bank revenue."
        />

        {/* Industry Switcher Tabs */}
        <div className={styles.tabBar}>
          {caseStudiesData.map((item, idx) => {
            const isActive = activeIdx === idx;
            const icon = industryIcons[item.industry] || <TrendingUp size={16} />;
            return (
              <button
                key={item.id}
                onClick={() => setActiveIdx(idx)}
                className={`${styles.tabBtn} ${isActive ? styles.activeTab : ""}`}
              >
                {icon}
                <span>{item.industry}</span>
              </button>
            );
          })}
        </div>

        {/* Featured Showcase Card */}
        <div className={styles.showcaseCard}>
          {/* Content Column */}
          <div className={styles.contentSide}>
            <div>
              <div className={styles.clientMeta}>
                <Badge variant="primary">{current.category}</Badge>
                <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: 600 }}>
                  {current.client} • {current.location}
                </span>
              </div>

              <h3 className={styles.headline}>{current.headline}</h3>
              <p className={styles.summary}>{current.summary}</p>

              {/* 4 Metrics Grid */}
              <div className={styles.metricsGrid}>
                {current.metrics.map((m, i) => (
                  <div key={i}>
                    <div className={styles.metricVal}>{m.value}</div>
                    <div className={styles.metricLabel}>{m.label}</div>
                    <div className={styles.metricSub}>{m.subtext}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.cardActions}>
              <Button href={`/case-studies/${current.slug}`} variant="primary">
                <span>View Full Case Breakdown</span>
                <ArrowRight size={15} />
              </Button>
              <Button href="/contact" variant="outline">
                <span>Replicate These Results</span>
              </Button>
            </div>
          </div>

          {/* Media Column */}
          <div className={styles.mediaSide}>
            <Image
              src={current.image}
              alt={current.headline}
              fill
              className={styles.mediaImg}
              sizes="(max-width: 992px) 100vw, 50vw"
            />
            <div className={styles.mediaOverlay} />

            {/* Floating Proof Badge */}
            <div className={styles.floatingBadge}>
              <div>
                <div className={styles.badgeLeft}>{current.client}</div>
                <div className={styles.badgeLocation}>{current.location}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#16a34a", fontWeight: 700, fontSize: "0.82rem" }}>
                <CheckCircle2 size={16} />
                <span>Verified ROAS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
