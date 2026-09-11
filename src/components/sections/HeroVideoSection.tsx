import React from "react";
import { Phone, ArrowRight, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import styles from "./HeroVideoSection.module.css";

export default function HeroVideoSection() {
  return (
    <section className={styles.heroSection}>
      {/* Background Video */}
      <video autoPlay loop muted playsInline className={styles.videoBg}>
        <source src="/hero_video.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className={styles.overlay} />

      {/* Content */}
      <Container>
        <div className={styles.content}>
          <div className={styles.eyebrow}>
            <Sparkles size={14} />
            <span>Digital marketing agency in Navi Mumbai, Mumbai &amp; Thane</span>
          </div>

          <h1 className={styles.title}>
            Your trusted digital marketing agency in{" "}
            <span className={styles.titleAccent}>Navi Mumbai</span>
          </h1>

          <p className={styles.subtitle}>
            We help ambitious brands rank #1 in Google, dominate social media, get cited by AI search,
            and convert visitors into qualified sales pipeline. Strategy, SEO, PPC, and Next.js web platforms
            measured against real bank revenue.
          </p>

          <div className={styles.actions}>
            <Button href="/contact" size="lg" variant="primary">
              <span>Get a Free Proposal</span>
              <ArrowRight size={16} />
            </Button>

            <a href={`tel:${siteConfig.contact.primaryPhoneRaw}`} className={styles.callBtn}>
              <Phone size={16} />
              <span>Call {siteConfig.contact.primaryPhone}</span>
            </a>
          </div>

          {/* Proof Row */}
          <div className={styles.proofRow}>
            <div className={styles.proofItem}>
              <span className={styles.proofValue}>{siteConfig.stats.revenueGenerated}</span>
              <span className={styles.proofLabel}>Revenue Generated</span>
            </div>
            <span className={styles.proofSep}>•</span>
            <div className={styles.proofItem}>
              <span className={styles.proofValue}>{siteConfig.stats.campaignsExecuted}</span>
              <span className={styles.proofLabel}>Campaigns Executed</span>
            </div>
            <span className={styles.proofSep}>•</span>
            <div className={styles.proofItem}>
              <span className={styles.proofValue}>{siteConfig.stats.averageRoas}</span>
              <span className={styles.proofLabel}>Average ROAS</span>
            </div>
            <span className={styles.proofSep}>•</span>
            <div className={styles.proofItem}>
              <span className={styles.proofValue}>{siteConfig.stats.clientRetention}</span>
              <span className={styles.proofLabel}>Client Retention</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
