import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Phone,
  Ticket,
  MapPin,
  Clock,
  ShieldCheck,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import styles from "./BottomConversionCta.module.css";

export interface BottomConversionCtaProps {
  badge?: string;
  subBadge?: string;
  titlePrefix?: string;
  titleHighlight?: string;
  description?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  officeLocation?: string;
}

export default function BottomConversionCta({
  badge = "ADMIT ONE • VIP PASS",
  subBadge = "NO. IG-2026-GROWTH",
  titlePrefix = "Ready to Accelerate Your",
  titleHighlight = "Digital Revenue?",
  description = "Your reserved strategy session with senior digital architects at Satra Plaza, Vashi. Zero junior handoffs, predictable multi-channel pipeline scale.",
  eyebrow,
  title,
  subtitle,
  officeLocation = "Satra Plaza, Vashi",
}: BottomConversionCtaProps) {
  let displayPrefix = titlePrefix;
  let displayHighlight = titleHighlight;

  if (title) {
    const trimmed = title.trim();
    if (trimmed.includes("Ready to Accelerate Your")) {
      displayPrefix = "Ready to Accelerate Your";
      displayHighlight = trimmed.replace("Ready to Accelerate Your", "").trim() || "Digital Revenue?";
    } else {
      const words = trimmed.split(" ");
      if (words.length >= 3) {
        displayHighlight = words.slice(-2).join(" ");
        displayPrefix = words.slice(0, -2).join(" ");
      } else {
        displayPrefix = trimmed;
        displayHighlight = "";
      }
    }
  }

  const displayBadge = eyebrow || badge;
  const displayDesc = subtitle || description;

  return (
    <section className={styles.sectionCta} id="conversion-stage" aria-label="VIP Movie Ticket Stage">
      {/* Overhead Marquee Spotlight Cone & Ambient Stage Glow */}
      <div className={styles.spotlightCone} aria-hidden="true" />
      <div className={styles.stageAura} aria-hidden="true" />
      <div className={styles.stageGridPattern} aria-hidden="true" />

      <div className={`container ${styles.container}`}>
        {/* The Master Movie Ticket */}
        <div className={styles.ticketCard}>
          {/* Top & Bottom Center Punch Cutouts (For mobile/tablet) */}
          <span className={styles.mobileNotchTop} aria-hidden="true" />
          <span className={styles.mobileNotchBottom} aria-hidden="true" />

          {/* Desktop Real Vector Ticket Silhouette (Unchanged on PC) */}
          <svg
            className={styles.ticketSvgDesktop}
            viewBox="0 0 1000 360"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M 24 0 H 682 A 18 18 0 0 1 718 0 H 976 A 24 24 0 0 1 1000 24 V 162 A 18 18 0 0 1 1000 198 V 336 A 24 24 0 0 1 976 360 H 718 A 18 18 0 0 1 682 360 H 24 A 24 24 0 0 1 0 336 V 198 A 18 18 0 0 1 0 162 V 24 A 24 24 0 0 1 24 0 Z"
              fill="#ffffff"
              stroke="rgba(241, 99, 52, 0.42)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
            <line
              x1="700"
              y1="18"
              x2="700"
              y2="342"
              stroke="rgba(241, 99, 52, 0.35)"
              strokeDasharray="6,6"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Ticket Content Layer */}
          <div className={styles.ticketContent}>
            {/* Left Side (Top on Mobile): Main Ticket Body */}
            <div className={styles.ticketMain}>
              {/* Ticket Header Bar */}
              <div className={styles.ticketHeader}>
                <div className={styles.admitOnePill}>
                  <Ticket size={13} className={styles.pillIcon} />
                  <span>{displayBadge}</span>
                </div>

                <div className={styles.ticketSerialWrap}>
                  <span className={styles.serialIndicator} />
                  <span className={styles.ticketSerial}>{subBadge}</span>
                </div>
              </div>

              {/* Cinematic Display Title */}
              <h2 className={styles.headline}>
                {displayPrefix}{" "}
                {displayHighlight && (
                  <span className={styles.headlineHighlight}>{displayHighlight}</span>
                )}
              </h2>

              {/* Direct Ticket Value Proposition */}
              <p className={styles.description}>{displayDesc}</p>

              {/* Cinema Ticket Metadata Chips */}
              <div className={styles.metaRow}>
                <div className={styles.metaItem}>
                  <div className={styles.metaLabel}>
                    <MapPin size={12} />
                    <span>VENUE</span>
                  </div>
                  <div className={styles.metaValue}>{officeLocation}</div>
                </div>

                <div className={styles.metaDivider} />

                <div className={styles.metaItem}>
                  <div className={styles.metaLabel}>
                    <Clock size={12} />
                    <span>SPEED</span>
                  </div>
                  <div className={styles.metaValue}>4-Hour Response</div>
                </div>

                <div className={styles.metaDivider} />

                <div className={styles.metaItem}>
                  <div className={styles.metaLabel}>
                    <ShieldCheck size={12} />
                    <span>ADMISSION</span>
                  </div>
                  <div className={styles.metaValueFree}>100% Free Audit</div>
                </div>
              </div>

              {/* Authentic Barcode Strip */}
              <div className={styles.barcodeStrip} aria-hidden="true">
                <div className={styles.barcodeBars}>
                  <span className={styles.bar1} />
                  <span className={styles.bar3} />
                  <span className={styles.bar2} />
                  <span className={styles.bar1} />
                  <span className={styles.bar4} />
                  <span className={styles.bar1} />
                  <span className={styles.bar2} />
                  <span className={styles.bar3} />
                  <span className={styles.bar1} />
                  <span className={styles.bar4} />
                  <span className={styles.bar2} />
                  <span className={styles.bar1} />
                  <span className={styles.bar3} />
                  <span className={styles.bar1} />
                  <span className={styles.bar2} />
                  <span className={styles.bar4} />
                  <span className={styles.bar1} />
                  <span className={styles.bar3} />
                  <span className={styles.bar2} />
                  <span className={styles.bar1} />
                  <span className={styles.bar4} />
                </div>
                <span className={styles.barcodeText}>
                  ★ 99876-82853 • SATRA-PLAZA-VASHI ★
                </span>
              </div>

              {/* Official Ink Rubber Stamp Watermark */}
              <div className={styles.ticketStamp} aria-hidden="true">
                <div className={styles.stampInner}>
                  <Sparkles size={11} />
                  <span>VERIFIED 100% ROI</span>
                  <span className={styles.stampSub}>INVENTUS</span>
                </div>
              </div>
            </div>

            {/* In-Flow Tear Perforation Strip (For Mobile & Tablet) */}
            <div className={styles.mobileTearStrip} aria-hidden="true">
              <span className={styles.mobileNotchLeft} />
              <span className={styles.mobileDashedLine} />
              <span className={styles.mobileNotchRight} />
            </div>

            {/* Right Side (Bottom on Mobile): Ticket Stub */}
            <div className={styles.ticketStub}>
              {/* Stub Header */}
              <div className={styles.stubHeader}>
                <span className={styles.stubTitle}>ADMIT ONE STUB</span>
                <span className={styles.stubSeat}>SEAT VIP-01</span>
              </div>

              <div className={styles.stubBranding}>
                <span className={styles.stubAgency}>INVENTUS GLOBAL</span>
                <span className={styles.stubSub}>GROWTH STRATEGY DESK</span>
              </div>

              {/* Action Zone */}
              <div className={styles.stubActions}>
                <Link href="/contact" className={styles.primaryBtn} id="claim-ticket-pass-btn">
                  <span>Claim Now</span>
                  <ArrowRight size={15} />
                </Link>

                <a
                  href={`tel:${siteConfig.contact.primaryPhoneRaw}`}
                  className={styles.phoneBtn}
                  title="Call Inventus Global"
                >
                  <Phone size={14} />
                  <span>Call: {siteConfig.contact.primaryPhone}</span>
                </a>

                <a
                  href={siteConfig.contact.whatsappLink(
                    "Hi Inventus Global, I would like to redeem my VIP Growth Consultation Pass."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.whatsappBtn}
                  title="Chat on WhatsApp"
                >
                  <MessageSquare size={14} />
                  <span>WhatsApp Desk</span>
                </a>
              </div>

              {/* Stub Footer Status */}
              <div className={styles.stubFooter}>
                <div className={styles.stubStatus}>
                  <span className={styles.statusDot} />
                  <span>READY TO REDEEM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
