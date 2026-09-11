import type { Metadata } from "next";
import Link from "next/link";
import {
  TrendingUp,
  ShieldCheck,
  Zap,
  Check,
  X,
  ArrowRight,
  Phone,
  BarChart3,
  Clock,
  Award,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import styles from "./why-us.module.css";

export const metadata: Metadata = {
  title: "Why Inventus Global | Performance Guarantee & Methodology",
  description:
    "Discover why ambitious businesses in Navi Mumbai and Mumbai partner with Inventus Global. Monthly rolling agreements, 4.8x average ROAS, and zero long-term lock-ins.",
};

export default function WhyUsPage() {
  const pillars = [
    {
      icon: <TrendingUp size={24} />,
      title: "Revenue-First Engineering",
      desc: "We don't optimize for vanity impressions or meaningless clicks. Every rupee you invest is tracked to real leads, pipeline value, and bankable sales.",
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "No Long-Term Lock-Ins",
      desc: "We believe retainers should be earned every month. Our agreements operate on simple 30-day notice periods with zero predatory lock-in clauses.",
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Live Looker Studio Dashboards",
      desc: "Get 24/7 transparent visibility into your campaigns. Raw conversion data, cost-per-acquisition (CPA), and return on ad spend (ROAS) in real time.",
    },
    {
      icon: <Zap size={24} />,
      title: "Sub-Second Next.js Platforms",
      desc: "We build custom Next.js 15 web funnels that load in under 800ms. Faster page loads directly lower Google Ads CPC and skyrocket conversion rates.",
    },
    {
      icon: <Clock size={24} />,
      title: "4-Hour Response Guarantee",
      desc: "No waiting days for support tickets. Your dedicated growth team responds to strategic inquiries, campaign tweaks, and approvals within 4 business hours.",
    },
    {
      icon: <Award size={24} />,
      title: "Local Satra Plaza Presence",
      desc: "Based at Office 1209, Satra Plaza, Vashi. You can meet our senior growth strategists in person whenever you need a face-to-face strategy audit.",
    },
  ];

  const comparisonRows = [
    { feature: "Contract Terms", inventus: "Monthly Rolling (30-day notice)", others: "6 to 12 Month Forced Lock-In" },
    { feature: "Ad Account Ownership", inventus: "100% Owned by Client", others: "Held Hostage by Agency" },
    { feature: "Reporting Transparency", inventus: "24/7 Live Looker Studio Data", others: "Vague End-of-Month PDF Reports" },
    { feature: "Speed & Tech Stack", inventus: "Modern Next.js 15 Web Engines", others: "Bloated, Slow WordPress Plugins" },
    { feature: "Response Guarantee", inventus: "4-Hour Dedicated WhatsApp/Email", others: "2 to 3 Business Days" },
    { feature: "Campaign Optimization", inventus: "Weekly A/B Testing & Negative Filtering", others: "Set & Forget Routine" },
    { feature: "Client Retention Rate", inventus: "98% Sustained Retention", others: "High Churn After Contract Ends" },
  ];

  return (
    <div className={styles.whyUsWrap}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroContent}>
            <span className="section-tag">THE INVENTUS DIFFERENCE</span>
            <h1 className={styles.heroTitle}>
              Why Ambitious Brands Choose <span className="gradient-text">Inventus Global</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Traditional agencies sell vanity traffic and lock you into rigid contracts. 
              We build high-intent performance funnels, transparent attribution, and measurable revenue engines.
            </p>
          </div>
        </div>
      </section>

      {/* 6 Core Pillars Grid */}
      <section className={styles.pillarsSection}>
        <div className="container">
          <div className={styles.pillarsGrid}>
            {pillars.map((pillar, i) => (
              <div key={i} className={styles.pillarCard}>
                <div className={styles.pillarIconWrap}>{pillar.icon}</div>
                <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                <p className={styles.pillarDesc}>{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Direct Comparison Section */}
      <section className={styles.comparisonSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="section-tag">HONEST COMPARISON</span>
            <h2 className={styles.sectionTitle}>Inventus Global vs Traditional Agencies</h2>
            <p className={styles.sectionDesc}>
              See how our transparent, performance-driven partnership model stacks up against conventional agencies.
            </p>
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.comparisonTable}>
              <thead>
                <tr>
                  <th className={styles.thFeature}>Strategic Capability</th>
                  <th className={styles.thInventus}>Inventus Global</th>
                  <th className={styles.thOthers}>Traditional Agencies</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, idx) => (
                  <tr key={idx}>
                    <td className={styles.tdFeature}>{row.feature}</td>
                    <td className={styles.tdInventus}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                        <Check size={16} color="#16a34a" /> {row.inventus}
                      </span>
                    </td>
                    <td className={styles.tdOthers}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                        <X size={15} color="#ef4444" /> {row.others}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Guarantees & CTA Box */}
      <section className={styles.guaranteesSection}>
        <div className="container">
          <div className={styles.guaranteesCard}>
            <span className={styles.guaranteesBadge}>ZERO-RISK PARTNERSHIP</span>
            <h2 className={styles.guaranteesTitle}>Experience the Inventus Growth Standard</h2>
            <p className={styles.guaranteesDesc}>
              No lock-in contracts. 100% transparent attribution. Direct support from our senior growth team at Satra Plaza, Vashi.
            </p>
            <div className={styles.guaranteesActions}>
              <Link href="/contact" className={styles.btnPrimary}>
                <span>Book Free Strategy Consultation</span>
                <ArrowRight size={16} />
              </Link>
              <a href={`tel:${siteConfig.contact.primaryPhoneRaw}`} className={styles.btnSecondary}>
                <Phone size={16} />
                <span>Call {siteConfig.contact.primaryPhone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
