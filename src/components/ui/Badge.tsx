import React from "react";
import styles from "./Badge.module.css";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "amber" | "dark" | "glass" | "success";
  className?: string;
  style?: React.CSSProperties;
}

export default function Badge({
  children,
  variant = "primary",
  className = "",
  style,
}: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[variant]} ${className}`.trim()} style={style}>
      {children}
    </span>
  );
}
