import React from "react";
import styles from "./Container.module.css";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
  style?: React.CSSProperties;
}

export default function Container({
  children,
  className = "",
  size = "default",
  style,
}: ContainerProps) {
  const sizeClass = size === "narrow" ? styles.narrow : size === "wide" ? styles.wide : "";
  return (
    <div className={`${styles.container} ${sizeClass} ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}
