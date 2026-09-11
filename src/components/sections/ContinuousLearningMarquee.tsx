import React from "react";
import {
  Sparkles,
  TrendingUp,
  Cpu,
  Target,
  Search,
  ShieldCheck,
  Zap,
  BarChart,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import styles from "./ContinuousLearningMarquee.module.css";

const learningPillars = [
  { icon: <Target size={18} />, title: "Negative Keyword Automation", sub: "Zero Ad Waste" },
  { icon: <Search size={18} />, title: "Topical Cluster SEO", sub: "Commercial Intent" },
  { icon: <Cpu size={18} />, title: "Server-Side Tracking", sub: "Meta CAPI & GA4" },
  { icon: <Zap size={18} />, title: "Next.js 15 Sub-Second Speed", sub: "99 PageSpeed" },
  { icon: <BarChart size={18} />, title: "Looker Studio Dashboards", sub: "Real-Time ROAS" },
  { icon: <TrendingUp size={18} />, title: "UGC Video Reel Hooks", sub: "Scroll-Stopping" },
  { icon: <ShieldCheck size={18} />, title: "Conversion Web Vitals", sub: "Zero CLS Shift" },
  { icon: <Sparkles size={18} />, title: "AI Search & GEO Ranking", sub: "ChatGPT Citations" },
];

export default function ContinuousLearningMarquee() {
  return (
    <section className={styles.marqueeSection}>
      <div className="container">
        <SectionHeader
          eyebrow="Continuous Innovation Engine"
          eyebrowIcon={<Sparkles size={14} />}
          title="We Grow by Continuous Learning & Rapid Execution"
          accentWord="Continuous Learning"
          subtitle="Our playbooks are stress-tested against algorithm updates, auction shifts, and conversion behavioral psychology every single week."
        />
      </div>

      <div className={styles.marqueeTrack}>
        {/* First Loop */}
        <div className={styles.itemGroup}>
          {learningPillars.map((item, idx) => (
            <div key={`p1-${idx}`} className={styles.marqueeCard}>
              <div className={styles.cardIcon}>{item.icon}</div>
              <div>
                <span className={styles.cardTitle}>{item.title}</span>
                <span className={styles.cardSub}>• {item.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Second Duplicate Loop for Infinite Scroll */}
        <div className={styles.itemGroup}>
          {learningPillars.map((item, idx) => (
            <div key={`p2-${idx}`} className={styles.marqueeCard}>
              <div className={styles.cardIcon}>{item.icon}</div>
              <div>
                <span className={styles.cardTitle}>{item.title}</span>
                <span className={styles.cardSub}>• {item.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
