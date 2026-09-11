import React from "react";
import styles from "./SectionHeader.module.css";

interface SectionHeaderProps {
  eyebrow?: string;
  eyebrowIcon?: React.ReactNode;
  title: string;
  accentWord?: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  eyebrowIcon,
  title,
  accentWord,
  subtitle,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const alignClass = align === "left" ? styles.left : styles.center;

  // Split title if accentWord is provided
  let renderedTitle: React.ReactNode = title;
  if (accentWord && title.includes(accentWord)) {
    const parts = title.split(accentWord);
    renderedTitle = (
      <>
        {parts[0]}
        <span className={styles.accent}>{accentWord}</span>
        {parts.slice(1).join(accentWord)}
      </>
    );
  }

  return (
    <div className={`${styles.header} ${alignClass} ${className}`.trim()}>
      {eyebrow && (
        <div className={styles.eyebrow}>
          {eyebrowIcon}
          <span>{eyebrow}</span>
        </div>
      )}
      <h2 className={styles.title}>{renderedTitle}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
