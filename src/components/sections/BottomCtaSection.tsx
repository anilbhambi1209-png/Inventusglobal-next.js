import React from "react";
import { ArrowRight, Phone, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import Button from "@/components/ui/Button";
import styles from "./BottomCtaSection.module.css";

interface BottomCtaProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

export default function BottomCtaSection({
  eyebrow = "Get in Touch with Senior Strategists",
  title = "Ready to Accelerate Your Digital Revenue?",
  subtitle = "Connect directly with our senior growth architects at Satra Plaza, Vashi, or explore our proven execution frameworks to unlock your brand's full commercial potential.",
}: BottomCtaProps) {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <div className={styles.card}>
          <div className={styles.eyebrow}>
            <Sparkles size={14} />
            <span>{eyebrow}</span>
          </div>

          <h2 className={styles.title}>{title}</h2>
          <p className={styles.desc}>{subtitle}</p>

          <div className={styles.actions}>
            <Button href="/contact" size="lg" variant="primary">
              <span>Book Free Growth Consultation</span>
              <ArrowRight size={16} />
            </Button>

            <Button
              href={`tel:${siteConfig.contact.primaryPhoneRaw}`}
              size="lg"
              variant="outline"
              style={{ background: "transparent", color: "#ffffff", borderColor: "rgba(255,255,255,0.3)" }}
            >
              <Phone size={16} />
              <span>Call {siteConfig.contact.primaryPhone}</span>
            </Button>
          </div>

          <div className={styles.metaRow}>
            <span>✓ Office 1209, Satra Plaza, Vashi</span>
            <span className={styles.metaSep}>•</span>
            <span>✓ No Obligation Strategy Audit</span>
            <span className={styles.metaSep}>•</span>
            <span>✓ 4-Hour Response Guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
}
