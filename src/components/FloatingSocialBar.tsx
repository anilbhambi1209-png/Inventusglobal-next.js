"use client";

import { Phone, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import styles from "./FloatingSocialBar.module.css";

export default function FloatingSocialBar() {
  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-contact-popup"));
    }
  };

  const socialItems = [
    {
      id: "facebook",
      label: "Facebook",
      sub: "Official Page",
      href: siteConfig.socials.facebook,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
      colorClass: styles.socialBarFb,
    },
    {
      id: "instagram",
      label: "Instagram",
      sub: "@globalinventus",
      href: siteConfig.socials.instagram,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
      colorClass: styles.socialBarIg,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      sub: "Company Updates",
      href: siteConfig.socials.linkedin,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
      colorClass: styles.socialBarLi,
    },
    {
      id: "call",
      label: "Call Direct",
      sub: siteConfig.contact.primaryPhone,
      href: `tel:${siteConfig.contact.primaryPhoneRaw}`,
      icon: <Phone size={19} />,
      colorClass: styles.socialBarCall,
    },
  ];

  return (
    <aside aria-label="Social and direct contact links" className={styles.floatingSocialRail}>
      <ul className={styles.floatingSocialList}>
        {/* Long Vertical Contact Us Tab */}
        <li className={styles.floatingSocialItem}>
          <a
            href="#proposal"
            onClick={handleContactClick}
            className={`${styles.floatingSocialLink} ${styles.floatingContactVerticalTab} ${styles.socialBarContact}`}
            aria-label="Contact Us"
            title="Contact Us"
          >
            <span className={styles.floatingSocialIcon}>
              <Mail size={17} />
            </span>
            {/* Idle vertical label like reference screenshot */}
            <span className={styles.floatingContactVerticalLabel}>Contact Us</span>
            {/* Hover expanding content */}
            <div className={styles.floatingSocialTooltip}>
              <span className={styles.floatingSocialTitle}>Contact Us</span>
              <span className={styles.floatingSocialSub}>Get Free Proposal</span>
            </div>
          </a>
        </li>

        {/* Social & Call Items with Hover Extending */}
        {socialItems.map((item) => (
          <li key={item.id} className={styles.floatingSocialItem}>
            <a
              href={item.href}
              target={item.href.startsWith("tel:") ? undefined : "_blank"}
              rel={item.href.startsWith("tel:") ? undefined : "noopener noreferrer"}
              className={`${styles.floatingSocialLink} ${item.colorClass}`}
              aria-label={item.label}
              title={item.label}
            >
              <span className={styles.floatingSocialIcon}>{item.icon}</span>
              <div className={styles.floatingSocialTooltip}>
                <span className={styles.floatingSocialTitle}>{item.label}</span>
                <span className={styles.floatingSocialSub}>{item.sub}</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
